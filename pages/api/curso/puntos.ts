import type { NextApiRequest, NextApiResponse } from 'next'
import { getPoints, getRanking } from '../../../lib/curso-puntos'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { email, ranking } = req.query

    // GET /api/curso/puntos?ranking=true — leaderboard
    if (ranking === 'true') {
      try {
        const entries = await getRanking(20)
        return res.status(200).json({ entries })
      } catch (error) {
        console.error('Error getting ranking:', error)
        return res.status(200).json({ entries: [] })
      }
    }

    // GET /api/curso/puntos?email=... — puntos de un usuario
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email requerido' })
    }

    try {
      const data = await getPoints(email)
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error getting points:', error)
      return res.status(200).json({ total: 0, historial: [], nivel: { nivel: 1, nombre: 'Principiante', emoji: '🌱', puntosMin: 0, puntosNext: 50 } })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
