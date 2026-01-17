import type { NextApiRequest, NextApiResponse } from 'next'
import { verifySession, getUser } from '../../../lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sessionToken = req.cookies.session

  if (!sessionToken) {
    return res.status(401).json({ authenticated: false })
  }

  try {
    const email = await verifySession(sessionToken)

    if (!email) {
      return res.status(401).json({ authenticated: false })
    }

    const user = await getUser(email)

    return res.status(200).json({
      authenticated: true,
      user: {
        email: user?.email,
        progress: user?.progress
      }
    })

  } catch (error) {
    console.error('Error checking session:', error)
    return res.status(500).json({ error: 'Error verificando sesión' })
  }
}
