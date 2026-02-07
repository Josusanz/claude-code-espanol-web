import type { NextApiRequest, NextApiResponse } from 'next'
import { requireAdmin } from '../../../../lib/admin-auth'
import { getAllUsersWithProgress } from '../../../../lib/precurso-kv'
import { PRECURSO_SECTIONS } from '../../../precurso'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const users = await getAllUsersWithProgress()
    const totalSections = Object.keys(PRECURSO_SECTIONS).length

    // Calcular estadísticas
    const usersWithProgress = users.map(user => {
      const completedCount = Object.values(user.progress).filter(Boolean).length
      const progressPercent = totalSections > 0
        ? Math.round((completedCount / totalSections) * 100)
        : 0

      return {
        ...user,
        completedCount,
        totalSections,
        progressPercent,
        isCompleted: progressPercent === 100
      }
    })

    const totalUsers = users.length
    const completedUsers = usersWithProgress.filter(u => u.isCompleted).length
    const averageProgress = totalUsers > 0
      ? Math.round(usersWithProgress.reduce((sum, u) => sum + u.progressPercent, 0) / totalUsers)
      : 0

    return res.status(200).json({
      stats: {
        totalUsers,
        completedUsers,
        averageProgress
      },
      users: usersWithProgress,
      sections: PRECURSO_SECTIONS
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return res.status(500).json({ error: 'Error al obtener progreso' })
  }
}

export default requireAdmin(handler)
