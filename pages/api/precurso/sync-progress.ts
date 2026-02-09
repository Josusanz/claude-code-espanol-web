import type { NextApiRequest, NextApiResponse } from 'next'
import { syncUserProgress, getUserProgress, isEmailAuthorized, addAuthorizedEmail } from '../../../lib/precurso-kv'

// Módulos requeridos para completar el precurso
const PRECURSO_MODULES = [
  'modulo-0', 'modulo-1', 'modulo-2', 'modulo-3', 'modulo-4'
]

function isPrecursoComplete(progress: Record<string, boolean>): boolean {
  return PRECURSO_MODULES.every(mod => progress[mod] === true)
}

async function assignPrecursoRoleIfComplete(email: string, progress: Record<string, boolean>): Promise<void> {
  if (!isPrecursoComplete(progress)) return

  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aprende.software'}/api/discord/assign-precurso-role`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-secret': process.env.INTERNAL_API_SECRET || ''
      },
      body: JSON.stringify({ email })
    })
  } catch (error) {
    console.error('Error assigning precurso role:', error)
  }
}

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

    const normalizedEmail = email.toLowerCase().trim()

    try {
      // Verificar que el email esté autorizado
      const authorized = await isEmailAuthorized(normalizedEmail)
      if (!authorized) {
        console.log(`[Sync Progress] Email no autorizado, ignorando: ${normalizedEmail}`)
        // No devolver error, simplemente no guardar (el usuario puede seguir usando localStorage)
        return res.status(200).json({
          success: false,
          message: 'Email no autorizado para sincronización',
          progress: progress
        })
      }

      const updatedUser = await syncUserProgress(normalizedEmail, progress)
      console.log(`[Sync Progress] Guardado para ${normalizedEmail}: ${Object.keys(progress).length} items`)

      // Si completó el precurso, asignar rol en Discord (en background)
      assignPrecursoRoleIfComplete(normalizedEmail, updatedUser.progress).catch(console.error)

      return res.status(200).json({
        success: true,
        progress: updatedUser.progress,
        precursoComplete: isPrecursoComplete(updatedUser.progress)
      })
    } catch (error) {
      console.error('[Sync Progress] Error:', error)
      // No fallar, devolver el progreso local
      return res.status(200).json({
        success: false,
        message: 'Error de servidor, usando datos locales',
        progress: progress
      })
    }
  }

  // GET: Obtener progreso
  if (req.method === 'GET') {
    const { email } = req.query

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email requerido' })
    }

    const normalizedEmail = (email as string).toLowerCase().trim()

    try {
      const user = await getUserProgress(normalizedEmail)
      if (!user) {
        console.log(`[Sync Progress] Sin datos para: ${normalizedEmail}`)
        return res.status(200).json({ progress: {} })
      }

      console.log(`[Sync Progress] Cargado para ${normalizedEmail}: ${Object.keys(user.progress).length} items`)
      return res.status(200).json({ progress: user.progress })
    } catch (error) {
      console.error('[Sync Progress] Error cargando:', error)
      return res.status(200).json({ progress: {} })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
