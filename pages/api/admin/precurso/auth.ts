import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyAdminSecret, setAdminCookie, clearAdminCookie, isAdminAuthenticated } from '../../../../lib/admin-auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POST: Login
  if (req.method === 'POST') {
    const { secret } = req.body

    if (!secret || typeof secret !== 'string') {
      return res.status(400).json({ error: 'Secret requerido' })
    }

    if (!verifyAdminSecret(secret)) {
      return res.status(401).json({ error: 'Secret incorrecto' })
    }

    setAdminCookie(res)
    return res.status(200).json({ success: true })
  }

  // GET: Check auth status
  if (req.method === 'GET') {
    const authenticated = isAdminAuthenticated(req)
    return res.status(200).json({ authenticated })
  }

  // DELETE: Logout
  if (req.method === 'DELETE') {
    clearAdminCookie(res)
    return res.status(200).json({ success: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
