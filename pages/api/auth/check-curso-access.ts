import type { NextApiRequest, NextApiResponse } from 'next'
import { verifySession } from '../../../lib/auth'
import { isEmailAuthorized } from '../../../lib/precurso-kv'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sessionToken = req.cookies.session

  if (!sessionToken) {
    return res.status(401).json({ authorized: false, error: 'No session' })
  }

  try {
    const email = await verifySession(sessionToken)

    if (!email) {
      return res.status(401).json({ authorized: false, error: 'Invalid session' })
    }

    const authorized = await isEmailAuthorized(email)

    return res.status(200).json({ authorized, email })
  } catch (error) {
    console.error('Error checking curso access:', error)
    return res.status(500).json({ authorized: false, error: 'Error verificando acceso' })
  }
}
