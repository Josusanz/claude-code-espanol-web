import type { NextApiRequest, NextApiResponse } from 'next'
import { verifySession, getUser } from '../../../lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get session from cookie
  const sessionToken = req.cookies.session
  if (!sessionToken) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  // Verify session
  const email = await verifySession(sessionToken)
  if (!email) {
    return res.status(401).json({ error: 'Invalid session' })
  }

  try {
    const user = await getUser(email)

    return res.status(200).json({
      completedLessons: user?.progress?.completedLessons || [],
      currentLesson: user?.progress?.currentLesson || null
    })
  } catch (error) {
    console.error('Error getting progress:', error)
    return res.status(500).json({ error: 'Failed to get progress' })
  }
}
