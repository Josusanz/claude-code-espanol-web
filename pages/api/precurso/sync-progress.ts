import type { NextApiRequest, NextApiResponse } from 'next'
import { syncUserProgress, getUserProgress, isEmailAuthorized } from '../../../lib/precurso-kv'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POST: Sincronizar progreso
  if (req.method === 'POST') {
    const { email, progress } = req.body

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email requerido' })
    }

    if (!progress || typeof progress !== 'object') {
      return res.status(400).json({ error: 'Progreso requerido' })
    }

    try {
      // Verificar que el email esté autorizado
      const authorized = await isEmailAuthorized(email)
      if (!authorized) {
        return res.status(403).json({ error: 'Email no autorizado' })
      }

      const updatedUser = await syncUserProgress(email, progress)
      return res.status(200).json({
        success: true,
        progress: updatedUser.progress
      })
    } catch (error) {
      console.error('Error syncing progress:', error)
      return res.status(500).json({ error: 'Error al sincronizar progreso' })
    }
  }

  // GET: Obtener progreso
  if (req.method === 'GET') {
    const { email } = req.query

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email requerido' })
    }

    try {
      const user = await getUserProgress(email)
      if (!user) {
        return res.status(200).json({ progress: {} })
      }

      return res.status(200).json({ progress: user.progress })
    } catch (error) {
      console.error('Error fetching progress:', error)
      return res.status(500).json({ error: 'Error al obtener progreso' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
