import type { NextApiRequest, NextApiResponse } from 'next'
import { getCursoUser, createOrGetCursoUser, getAllModulosUnlockStatus } from '../../../lib/curso-kv'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.query

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email requerido' })
  }

  try {
    const normalizedEmail = email.toLowerCase().trim()
    const user = await createOrGetCursoUser(normalizedEmail)

    const status = getAllModulosUnlockStatus(
      user.enrolledAt,
      user.autoguiadoOverrides
    )

    return res.status(200).json({
      success: true,
      enrolledAt: user.enrolledAt,
      modulos: status,
    })
  } catch (error) {
    console.error('Error getting unlock status:', error)
    return res.status(500).json({ error: 'Error obteniendo estado de desbloqueo' })
  }
}
