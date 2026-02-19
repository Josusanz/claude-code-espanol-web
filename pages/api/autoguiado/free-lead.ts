import type { NextApiRequest, NextApiResponse } from 'next'
import { createOrGetCursoUser } from '../../../lib/curso-kv'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email requerido' })
  }

  const normalizedEmail = email.toLowerCase().trim()
  if (!normalizedEmail.includes('@')) {
    return res.status(400).json({ error: 'Email no válido' })
  }

  try {
    await createOrGetCursoUser(normalizedEmail)
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error saving free lead:', error)
    return res.status(200).json({ success: true }) // non-blocking
  }
}
