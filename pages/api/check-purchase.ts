import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'

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
    const purchaseKey = `curso_interactivo:${email.toLowerCase()}`
    const purchase = await kv.get(purchaseKey)

    if (purchase) {
      return res.status(200).json({
        hasPurchased: true,
        purchase
      })
    }

    return res.status(200).json({ hasPurchased: false })
  } catch (error) {
    console.error('Error checking purchase:', error)
    return res.status(500).json({ error: 'Failed to check purchase status' })
  }
}
