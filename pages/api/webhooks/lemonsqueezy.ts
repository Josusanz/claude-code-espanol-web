import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { kv } from '@vercel/kv'
import { LemonSqueezyWebhookPayload } from '../../../lib/lemonsqueezy'

// Desactivar el body parser de Next.js para obtener el raw body
export const config = {
  api: {
    bodyParser: false,
  },
}

async function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      resolve(data)
    })
    req.on('error', reject)
  })
}

function verifySignature(rawBody: string, signature: string): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(rawBody).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const rawBody = await getRawBody(req)
    const signature = req.headers['x-signature'] as string

    if (!signature || !verifySignature(rawBody, signature)) {
      console.error('Invalid webhook signature')
      return res.status(401).json({ error: 'Invalid signature' })
    }

    const payload: LemonSqueezyWebhookPayload = JSON.parse(rawBody)
    const eventName = payload.meta.event_name

    console.log('Lemon Squeezy webhook:', eventName)

    // Manejar eventos de orden
    if (eventName === 'order_created' || eventName === 'order_paid') {
      const { user_email, status, product_id } = payload.data.attributes
      const customEmail = payload.meta.custom_data?.user_email

      const email = customEmail || user_email

      if (status === 'paid' && email) {
        // Guardar en KV que este usuario ha comprado el curso
        const purchaseKey = `curso_interactivo:${email.toLowerCase()}`
        await kv.set(purchaseKey, {
          purchasedAt: new Date().toISOString(),
          orderId: payload.data.id,
          productId: product_id,
        })

        console.log(`Purchase recorded for: ${email}`)
      }
    }

    return res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}
