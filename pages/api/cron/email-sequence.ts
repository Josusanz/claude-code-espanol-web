import type { NextApiRequest, NextApiResponse } from 'next'
import { processEmailSequence, getSequenceStats } from '../../../lib/email/sequences'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.authorization
  const cronSecret = process.env.CRON_SECRET

  // Allow in development or with correct secret
  if (process.env.NODE_ENV !== 'development') {
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }

  try {
    if (req.method === 'GET') {
      // Return stats
      const stats = await getSequenceStats()
      return res.status(200).json({ stats })
    }

    if (req.method === 'POST') {
      // Process email sequence
      console.log('Starting email sequence processing...')
      const result = await processEmailSequence()
      console.log('Email sequence processing complete:', result)

      return res.status(200).json({
        success: true,
        ...result,
        timestamp: new Date().toISOString(),
      })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Email sequence cron error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
    })
  }
}
