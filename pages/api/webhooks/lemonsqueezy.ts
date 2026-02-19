import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { kv } from '@vercel/kv'
import { Resend } from 'resend'
import { LemonSqueezyWebhookPayload } from '../../../lib/lemonsqueezy'

const resend = new Resend(process.env.RESEND_API_KEY)

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

async function sendWelcomeEmail(email: string, productName: string) {
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aprende.software'

  const isRalph = productName.toLowerCase().includes('ralph')

  await resend.emails.send({
    from: `Claude Code en Español <${fromEmail}>`,
    to: email,
    subject: isRalph ? '🎉 ¡Bienvenido a Ralph Loop!' : '🎉 ¡Gracias por tu compra!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #7c3aed; margin-bottom: 10px;">¡Gracias por tu compra!</h1>
            <p style="color: #64748b; font-size: 16px;">Tu acceso a <strong>${isRalph ? 'Ralph Loop' : 'Curso Premium'}</strong> está activado</p>
          </div>

          <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px;">
            <p style="color: white; font-size: 18px; margin-bottom: 20px;">
              Accede a tu contenido ahora:
            </p>
            <a href="${isRalph ? `${baseUrl}/ralph` : `${baseUrl}/premium`}" style="display: inline-block; background: white; color: #7c3aed; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px;">
              ${isRalph ? 'Ir a Ralph Loop' : 'Acceder al Curso'}
            </a>
          </div>

          ${isRalph ? `
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin-top: 0; color: #1e293b;">¿Qué incluye Ralph Loop?</h3>
            <ul style="color: #64748b; padding-left: 20px;">
              <li>8 lecciones paso a paso</li>
              <li>Proyecto práctico completo</li>
              <li>Archivos de ejemplo descargables</li>
              <li>Acceso de por vida + actualizaciones</li>
            </ul>
          </div>
          ` : ''}

          <div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>📧 Importante:</strong> Guarda este email. Usa el mismo correo (<strong>${email}</strong>) para acceder siempre a tu contenido.
            </p>
          </div>

          <div style="text-align: center; color: #94a3b8; font-size: 12px;">
            <p>¿Tienes preguntas? Responde a este email o escríbenos a soporte@aprende.software</p>
            <p style="margin-top: 20px;">
              Hecho con cariño por <a href="https://yenze.io" style="color: #7c3aed;">Josu Sanz</a>
            </p>
          </div>
        </body>
      </html>
    `
  })
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
      const { user_email, status, product_id, product_name } = payload.data.attributes
      const customEmail = payload.meta.custom_data?.user_email

      const email = customEmail || user_email

      if (status === 'paid' && email) {
        const purchaseData = {
          purchasedAt: new Date().toISOString(),
          orderId: payload.data.id,
          productId: product_id,
          productName: product_name,
        }

        // Determinar qué producto se compró y guardar en la clave correcta
        const RALPH_PRODUCT_ID = 793440
        const AUTOGUIADO_PRODUCT_ID = parseInt(process.env.LEMONSQUEEZY_AUTOGUIADO_PRODUCT_ID || '0', 10)

        if (AUTOGUIADO_PRODUCT_ID && product_id === AUTOGUIADO_PRODUCT_ID) {
          // Curso autoguiado — añadir a precurso:emails para acceso via CursoEmailGate
          const normalizedEmail = email.toLowerCase().trim()
          await kv.sadd('precurso:emails', normalizedEmail)
          await kv.set(`autoguiado:${normalizedEmail}`, purchaseData)
          console.log(`Autoguiado purchase recorded for: ${normalizedEmail}`)

          try {
            await sendWelcomeEmail(email, 'Crea tu Software con IA')
            console.log(`Welcome email sent to: ${email}`)
          } catch (emailError) {
            console.error('Error sending welcome email:', emailError)
          }
        } else if (product_id === RALPH_PRODUCT_ID) {
          // Ralph Loop
          const ralphKey = `ralph_loop:${email.toLowerCase()}`
          await kv.set(ralphKey, purchaseData)
          console.log(`Ralph Loop purchase recorded for: ${email}`)

          // Enviar email de bienvenida
          try {
            await sendWelcomeEmail(email, 'Ralph Loop')
            console.log(`Welcome email sent to: ${email}`)
          } catch (emailError) {
            console.error('Error sending welcome email:', emailError)
            // No fallar el webhook por error de email
          }
        } else {
          // Curso interactivo (producto principal)
          const purchaseKey = `curso_interactivo:${email.toLowerCase()}`
          await kv.set(purchaseKey, purchaseData)
          console.log(`Curso purchase recorded for: ${email}`)

          // Enviar email de bienvenida
          try {
            await sendWelcomeEmail(email, product_name || 'Curso Premium')
            console.log(`Welcome email sent to: ${email}`)
          } catch (emailError) {
            console.error('Error sending welcome email:', emailError)
          }
        }
      }
    }

    return res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}
