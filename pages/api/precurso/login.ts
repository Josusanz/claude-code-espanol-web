import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyPrecursoPassword } from '../../../lib/precurso-auth'

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

  // Verificar contraseña
  if (!verifyPrecursoPassword(password)) {
    return res.status(401).json({
      success: false,
      error: 'Contraseña incorrecta'
    })
  }

  // Éxito - guardar email para analytics (opcional: enviar a un servicio)
  console.log(`[Precurso Login] ${email} accedió al precurso`)

  return res.status(200).json({
    success: true,
    email: email.toLowerCase()
  })
}
