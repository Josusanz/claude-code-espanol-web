import type { NextApiRequest, NextApiResponse } from 'next'
import { isAdminAuthenticated } from '../../../../lib/admin-auth'
import { getCursoUser, syncCursoProgress } from '../../../../lib/curso-kv'
import { awardProgressPoints } from '../../../../lib/curso-puntos'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, semanaNum, dayNum, attended } = req.body

    if (!email || !semanaNum || typeof attended !== 'boolean') {
      return res.status(400).json({ error: 'Faltan campos: email, semanaNum, attended' })
    }

    // Build the tracking key
    const trackingKey = dayNum
      ? `semana-${semanaNum}-d${dayNum}-clase`
      : `semana-${semanaNum}-clase`

    // Get current user progress
    const user = await getCursoUser(email)
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const oldProgress = { ...user.progress }

    // Update the specific attendance key
    const updatedProgress = { ...user.progress, [trackingKey]: attended }

    // Sync progress
    await syncCursoProgress(email, updatedProgress)

    // Award points for the new attendance (best-effort)
    if (attended) {
      awardProgressPoints(email, updatedProgress, oldProgress).catch(err => {
        console.error('Error awarding attendance points:', err)
      })
    }

    return res.json({ success: true, trackingKey, attended })
  } catch (err) {
    console.error('Error updating attendance:', err)
    return res.status(500).json({ error: 'Error interno' })
  }
}
