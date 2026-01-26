import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { verifySession, updateUserProgress, getUser } from '../../../lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
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

  const { lessonId } = req.body

  if (!lessonId || typeof lessonId !== 'string') {
    return res.status(400).json({ error: 'lessonId required' })
  }

  try {
    // Update progress
    await updateUserProgress(email, lessonId)

    // Get updated user data
    const user = await getUser(email)

    return res.status(200).json({
      success: true,
      completedLessons: user?.progress?.completedLessons || []
    })
  } catch (error) {
    console.error('Error marking lesson complete:', error)
    return res.status(500).json({ error: 'Failed to update progress' })
  }
}
