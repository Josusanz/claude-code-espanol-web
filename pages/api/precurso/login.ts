import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyPrecursoPassword } from '../../../lib/precurso-auth'
import { isEmailAuthorized, addAuthorizedEmail } from '../../../lib/precurso-kv'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  // Validar email
  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Email requerido'
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Email inválido'
    })
  }

  // Validar contraseña
  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Contraseña requerida'
    })
  }

  // Verificar contraseña primero
  if (!verifyPrecursoPassword(password)) {
    return res.status(401).json({
      success: false,
      error: 'Contraseña incorrecta'
    })
  }

  const normalizedEmail = email.toLowerCase().trim()

  // Verificar que el email esté autorizado
  try {
    const authorized = await isEmailAuthorized(normalizedEmail)
    if (!authorized) {
      return res.status(403).json({
        success: false,
        error: 'Tu email no está autorizado para este curso. Contacta al instructor.'
      })
    }
  } catch (error) {
    // Si hay error de conexión a KV, permitir acceso (fallback graceful)
    // y añadir el email para tracking
    console.error('[Precurso Login] Error checking email authorization:', error)
    try {
      await addAuthorizedEmail(normalizedEmail)
    } catch {
      // Ignorar error de añadir
    }
  }

  // Éxito
  console.log(`[Precurso Login] ${normalizedEmail} accedió al precurso`)

  return res.status(200).json({
    success: true,
    email: normalizedEmail
  })
}
