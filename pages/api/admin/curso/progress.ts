import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllCursoUsers, getCursoStats } from '../../../../lib/curso-kv'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar admin auth (simple password check)
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const authHeader = req.headers.authorization

  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    // Verificar también query param para requests simples
    const { password } = req.query
    if (password !== adminPassword) {
      return res.status(401).json({ error: 'No autorizado' })
    }
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const users = await getAllCursoUsers()
    const stats = await getCursoStats()

    return res.status(200).json({
      success: true,
      users,
      stats
    })
  } catch (error) {
    console.error('Error getting curso progress:', error)
    return res.status(500).json({ error: 'Error obteniendo progreso' })
  }
}
