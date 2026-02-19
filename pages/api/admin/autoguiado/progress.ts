import type { NextApiRequest, NextApiResponse } from 'next'
import { isAdminAuthenticated } from '../../../../lib/admin-auth'
import {
  getAllCursoUsers,
  getAutoguiadoStats,
  setAutoguiadoOverride,
  getAllModulosUnlockStatus,
} from '../../../../lib/curso-kv'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  // GET: stats + users with autoguiado progress
  if (req.method === 'GET') {
    try {
      const allUsers = await getAllCursoUsers()
      const stats = await getAutoguiadoStats()

      // Enrich users with unlock status
      const usersWithUnlock = allUsers.map(user => {
        const unlockStatus = getAllModulosUnlockStatus(
          user.enrolledAt,
          user.autoguiadoOverrides
        )
        const autoguiadoCompleted = Object.keys(user.progress)
          .filter(k => k.startsWith('autoguiado-modulo-') && user.progress[k])
          .length

        return {
          email: user.email,
          enrolledAt: user.enrolledAt,
          lastSyncAt: user.lastSyncAt,
          autoguiadoCompleted,
          unlockStatus,
          autoguiadoOverrides: user.autoguiadoOverrides || {},
        }
      }).filter(u => u.autoguiadoCompleted > 0 || Object.keys(u.autoguiadoOverrides).length > 0)

      return res.status(200).json({
        success: true,
        stats,
        users: usersWithUnlock,
      })
    } catch (error) {
      console.error('Error getting autoguiado progress:', error)
      return res.status(500).json({ error: 'Error obteniendo progreso' })
    }
  }

  // POST: override unlock for a specific user/module
  if (req.method === 'POST') {
    const { email, moduloNum, unlock } = req.body

    if (!email || typeof moduloNum !== 'number' || typeof unlock !== 'boolean') {
      return res.status(400).json({ error: 'email, moduloNum y unlock requeridos' })
    }

    try {
      const user = await setAutoguiadoOverride(email, moduloNum, unlock)
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }
      return res.status(200).json({ success: true, user })
    } catch (error) {
      console.error('Error setting override:', error)
      return res.status(500).json({ error: 'Error actualizando override' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
