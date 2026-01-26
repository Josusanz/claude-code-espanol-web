import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'

const RALPH_PRODUCT_ID = '793440'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email required' })
  }

  try {
    // Verificar compra de Ralph Loop específicamente
    const ralphKey = `ralph_loop:${email.toLowerCase()}`
    const purchase = await kv.get(ralphKey)

    if (purchase) {
      return res.status(200).json({
        hasAccess: true,
        purchase
      })
    }

    return res.status(200).json({ hasAccess: false })
  } catch (error) {
    console.error('Error checking Ralph access:', error)
    return res.status(500).json({ error: 'Failed to check access status' })
  }
}
