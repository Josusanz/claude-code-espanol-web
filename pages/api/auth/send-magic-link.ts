import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'
import { kv } from '@vercel/kv'
import { generateToken, saveMagicLinkToken } from '../../../lib/auth'

const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting: 3 requests per email per hour
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW = 60 * 60 // 1 hour in seconds

async function checkRateLimit(email: string): Promise<{ allowed: boolean; remaining: number }> {
  const key = `rate_limit:magic_link:${email.toLowerCase()}`
  const current = await kv.get<number>(key) || 0

  if (current >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 }
  }

  // Increment counter
  await kv.incr(key)

  // Set expiry on first request
  if (current === 0) {
    await kv.expire(key, RATE_LIMIT_WINDOW)
  }

  return { allowed: true, remaining: RATE_LIMIT_MAX - current - 1 }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email requerido' })
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email inválido' })
  }

  // Check rate limit
  const { allowed, remaining } = await checkRateLimit(email)
  if (!allowed) {
    return res.status(429).json({
      error: 'Demasiados intentos. Espera una hora antes de solicitar otro enlace.',
      retryAfter: RATE_LIMIT_WINDOW
    })
  }

  try {
    // Generar token
    const token = generateToken()

    // Guardar token en KV
    await saveMagicLinkToken(email, token)

    // URL del magic link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aprende.software'
    const magicLink = `${baseUrl}/api/auth/verify?token=${token}`

    // Enviar email con Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

    await resend.emails.send({
      from: `Claude Code en Español <${fromEmail}>`,
      to: email,
      subject: '🚀 Tu acceso al curso de Claude Code',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #4f46e5; margin-bottom: 10px;">Claude Code en Español</h1>
              <p style="color: #64748b; font-size: 14px;">Tu curso gratuito te espera</p>
            </div>

            <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px;">
              <p style="color: white; font-size: 18px; margin-bottom: 20px;">
                Haz clic en el botón para acceder al curso:
              </p>
              <a href="${magicLink}" style="display: inline-block; background: white; color: #4f46e5; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px;">
                Acceder al Curso
              </a>
            </div>

            <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
              <p style="margin: 0; color: #64748b; font-size: 14px;">
                <strong>¿No funciona el botón?</strong><br>
                Copia y pega este enlace en tu navegador:
              </p>
              <p style="margin: 10px 0 0 0; word-break: break-all; font-size: 12px; color: #4f46e5;">
                ${magicLink}
              </p>
            </div>

            <div style="text-align: center; color: #94a3b8; font-size: 12px;">
              <p>Este enlace expira en 15 minutos.</p>
              <p>Si no solicitaste este acceso, puedes ignorar este email.</p>
              <p style="margin-top: 20px;">
                Hecho con cariño por <a href="https://yenze.io" style="color: #4f46e5;">Josu Sanz</a>
              </p>
            </div>
          </body>
        </html>
      `
    })

    return res.status(200).json({
      success: true,
      message: 'Email enviado',
      remaining // Tell user how many requests they have left
    })

  } catch (error: unknown) {
    console.error('Error sending magic link:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return res.status(500).json({
      error: 'Error enviando el email. Inténtalo de nuevo.',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    })
  }
}
