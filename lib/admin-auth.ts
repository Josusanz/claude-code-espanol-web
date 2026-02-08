import { NextApiRequest, NextApiResponse } from 'next'
import { serialize, parse } from 'cookie'

const ADMIN_SECRET = process.env.ADMIN_SECRET || '32403240'
const COOKIE_NAME = 'admin-session'
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 // 30 días en segundos

export function verifyAdminSecret(secret: string): boolean {
  return secret === ADMIN_SECRET
}

export function setAdminCookie(res: NextApiResponse): void {
  const cookie = serialize(COOKIE_NAME, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/'
  })
  res.setHeader('Set-Cookie', cookie)
}

export function clearAdminCookie(res: NextApiResponse): void {
  const cookie = serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/'
  })
  res.setHeader('Set-Cookie', cookie)
}

export function isAdminAuthenticated(req: NextApiRequest): boolean {
  const cookies = parse(req.headers.cookie || '')
  return cookies[COOKIE_NAME] === 'authenticated'
}

export function requireAdmin(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isAdminAuthenticated(req)) {
      return res.status(401).json({ error: 'No autorizado' })
    }
    return handler(req, res)
  }
}
