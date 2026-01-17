import type { NextApiRequest, NextApiResponse } from 'next'
import { verifySession, updateUserProgress } from '../../../lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sessionToken = req.cookies.session

  if (!sessionToken) {
    return res.status(401).json({ error: 'No autenticado' })
  }

  const { lessonId } = req.body

  if (!lessonId || typeof lessonId !== 'string') {
    return res.status(400).json({ error: 'lessonId requerido' })
  }

  try {
    const email = await verifySession(sessionToken)

    if (!email) {
      return res.status(401).json({ error: 'Sesión inválida' })
    }

    await updateUserProgress(email, lessonId)

    return res.status(200).json({ success: true })

  } catch (error) {
    console.error('Error updating progress:', error)
    return res.status(500).json({ error: 'Error actualizando progreso' })
  }
}
