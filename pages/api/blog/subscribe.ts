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

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email invalido' })
  }

  try {
    // Store subscriber in KV
    // Key: blog:subscribers (set of emails)
    // Also store subscription date
    await kv.sadd('blog:subscribers', email)
    await kv.hset(`blog:subscriber:${email}`, {
      email,
      subscribedAt: new Date().toISOString(),
      source: 'blog',
    })

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error subscribing:', error)
    res.status(500).json({ error: 'Error al suscribirse' })
  }
}
