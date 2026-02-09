import type { NextApiRequest, NextApiResponse } from 'next'
import { getCursoConfig, getSemanasStatus } from '../../../lib/curso-kv'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const config = await getCursoConfig()
    const semanasStatus = await getSemanasStatus()

    return res.status(200).json({
      success: true,
      config,
      semanasStatus
    })
  } catch (error) {
    console.error('Error getting curso config:', error)

    // Default response if KV fails
    return res.status(200).json({
      success: true,
      config: {
        currentWeek: 1,
        startDate: '2026-02-19',
        weekUnlocks: {},
        isActive: true
      },
      semanasStatus: { 1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false }
    })
  }
}
