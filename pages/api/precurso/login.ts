import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyPrecursoPassword } from '../../../lib/precurso-auth'
import { isEmailAuthorized, addAuthorizedEmail, getUserProgress } from '../../../lib/precurso-kv'

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

  // Verificar que el email esté autorizado y crear registro si no existe
  try {
    const authorized = await isEmailAuthorized(normalizedEmail)
    if (!authorized) {
      console.log(`[Precurso Login] Email no autorizado: ${normalizedEmail}`)
      return res.status(403).json({
        success: false,
        error: 'Tu email no está autorizado para este curso. Contacta al instructor.'
      })
    }

    // Asegurar que existe el registro del usuario (por si solo estaba en el set)
    const userExists = await getUserProgress(normalizedEmail)
    if (!userExists) {
      await addAuthorizedEmail(normalizedEmail)
      console.log(`[Precurso Login] Creado registro para: ${normalizedEmail}`)
    }

  } catch (error) {
    // Si hay error de conexión a KV, bloquear acceso para evitar inconsistencias
    console.error('[Precurso Login] Error de KV:', error)
    return res.status(500).json({
      success: false,
      error: 'Error del servidor. Inténtalo de nuevo.'
    })
  }

  // Éxito
  console.log(`[Precurso Login] ${normalizedEmail} accedió al precurso`)

  return res.status(200).json({
    success: true,
    email: normalizedEmail
  })
}
