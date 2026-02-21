import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyMagicLinkToken, upsertUser, createSession } from '../../../lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token } = req.query

  if (!token || typeof token !== 'string') {
    return res.redirect('/acceso?error=token_invalido')
  }

  try {
    // Verificar token
    const result = await verifyMagicLinkToken(token)

    if (!result) {
      return res.redirect('/acceso?error=token_expirado')
    }

    // Crear o actualizar usuario
    await upsertUser(result.email)

    // Crear sesión
    const sessionToken = await createSession(result.email)

    // Establecer cookie de sesión
    res.setHeader('Set-Cookie', [
      `session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    ])

    // Redirigir al contenido (usar redirect del token si existe)
    const redirectUrl = result.redirect || '/empezar/introduccion'
    return res.redirect(redirectUrl)

  } catch (error) {
    console.error('Error verifying magic link:', error)
    return res.redirect('/acceso?error=error_verificacion')
  }
}
