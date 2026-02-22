import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllCursoUsers, getCursoStats } from '../../../../lib/curso-kv'
import { isAdminAuthenticated } from '../../../../lib/admin-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar admin auth (cookie-based, mismo sistema que precurso admin)
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const users = await getAllCursoUsers()
    const stats = await getCursoStats(users)

    return res.status(200).json({
      success: true,
      users,
      stats
    })
  } catch (error) {
    console.error('Error getting curso progress:', error)
    return res.status(500).json({ error: 'Error obteniendo progreso', details: String(error) })
  }
}
