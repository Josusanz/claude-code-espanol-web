import type { NextApiRequest, NextApiResponse } from 'next'
import { unlockSemana, getSemanasStatus } from '../../../../lib/curso-kv'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar admin auth
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const authHeader = req.headers.authorization

  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { semanaNum, unlock } = req.body

  if (typeof semanaNum !== 'number' || semanaNum < 1 || semanaNum > 10) {
    return res.status(400).json({ error: 'Número de semana inválido' })
  }

  if (typeof unlock !== 'boolean') {
    return res.status(400).json({ error: 'unlock debe ser boolean' })
  }

  try {
    await unlockSemana(semanaNum, unlock)
    const semanasStatus = await getSemanasStatus()

    return res.status(200).json({
      success: true,
      semanasStatus
    })
  } catch (error) {
    console.error('Error unlocking week:', error)
    return res.status(500).json({ error: 'Error desbloqueando semana' })
  }
}
