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
      return res.status(200).json({
        success: true,
        progress: user?.progress || {}
      })
    } catch (error) {
      console.error('Error getting curso progress:', error)
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
      // Verificar que el email está autorizado
      const isAuthorized = await isEmailAuthorizedForCurso(email)
      if (!isAuthorized) {
        return res.status(403).json({ error: 'Email no autorizado' })
      }

      const user = await syncCursoProgress(email, progress)

      return res.status(200).json({
        success: true,
        user
      })
    } catch (error) {
      console.error('Error syncing curso progress:', error)
      return res.status(500).json({ error: 'Error sincronizando progreso' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
