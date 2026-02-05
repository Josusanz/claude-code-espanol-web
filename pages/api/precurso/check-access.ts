import type { NextApiRequest, NextApiResponse } from 'next'
import { parse } from 'cookie'
import { hasAccessToPrecurso } from '../../../lib/precurso-whitelist'
import { verifyToken } from '../../../lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get session token from cookie
    const cookies = parse(req.headers.cookie || '')
    const sessionToken = cookies['session_token']

    if (!sessionToken) {
      return res.status(200).json({
        hasAccess: false,
        reason: 'no_session',
        email: null
      })
    }

    // Verify the session token
    const session = await verifyToken(sessionToken)

    if (!session || !session.email) {
      return res.status(200).json({
        hasAccess: false,
        reason: 'invalid_session',
        email: null
      })
    }

    // Check if email is in whitelist
    const hasAccess = hasAccessToPrecurso(session.email)

    return res.status(200).json({
      hasAccess,
      reason: hasAccess ? 'authorized' : 'not_in_whitelist',
      email: session.email
    })

  } catch (error) {
    console.error('Error checking precurso access:', error)
    return res.status(500).json({
      hasAccess: false,
      reason: 'error',
      email: null
    })
  }
}
