import type { NextApiRequest, NextApiResponse } from 'next'
import { getCursoUser, syncCursoProgress, isEmailAuthorizedForCurso } from '../../../lib/curso-kv'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: obtener progreso
  if (req.method === 'GET') {
    const { email } = req.query

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email requerido' })
    }

    try {
      const user = await getCursoUser(email)
      // Filter only autoguiado keys
      const autoguiadoProgress: Record<string, boolean> = {}
      if (user?.progress) {
        for (const [key, value] of Object.entries(user.progress)) {
          if (key.startsWith('autoguiado-')) {
            autoguiadoProgress[key] = value
          }
        }
      }
      return res.status(200).json({
        success: true,
        progress: autoguiadoProgress
      })
    } catch (error) {
      console.error('Error getting autoguiado progress:', error)
      return res.status(200).json({
        success: true,
        progress: {}
      })
    }
  }

  // POST: sincronizar progreso
  if (req.method === 'POST') {
    const { email, progress } = req.body

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email requerido' })
    }

    if (!progress || typeof progress !== 'object') {
      return res.status(400).json({ error: 'Progreso requerido' })
    }

    try {
      const isAuthorized = await isEmailAuthorizedForCurso(email)
      if (!isAuthorized) {
        return res.status(403).json({ error: 'Email no autorizado' })
      }

      // Only sync autoguiado keys to KV (merged into the same user progress)
      const autoguiadoOnly: Record<string, boolean> = {}
      for (const [key, value] of Object.entries(progress)) {
        if (key.startsWith('autoguiado-')) {
          autoguiadoOnly[key] = value as boolean
        }
      }

      const user = await syncCursoProgress(email, autoguiadoOnly)

      return res.status(200).json({
        success: true,
        user
      })
    } catch (error) {
      console.error('Error syncing autoguiado progress:', error)
      return res.status(500).json({ error: 'Error sincronizando progreso' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
