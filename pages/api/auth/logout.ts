import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sessionToken = req.cookies.session

  if (sessionToken) {
    // Eliminar sesión de KV
    await kv.del(`session:${sessionToken}`)
  }

  // Eliminar cookie
  res.setHeader('Set-Cookie', [
    `session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
  ])

  return res.status(200).json({ success: true })
}
