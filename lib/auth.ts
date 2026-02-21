import { kv } from '@vercel/kv'

export interface User {
  email: string
  createdAt: string
  lastLoginAt: string
  progress?: {
    completedLessons: string[]
    currentLesson?: string
  }
}

export interface MagicLinkToken {
  email: string
  createdAt: string
  expiresAt: string
  redirect?: string
}

// Generar token único para magic link
export function generateToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Guardar token de magic link (expira en 15 minutos)
export async function saveMagicLinkToken(email: string, token: string, redirect?: string): Promise<void> {
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 15 * 60 * 1000) // 15 min

  const tokenData: MagicLinkToken = {
    email: email.toLowerCase(),
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    ...(redirect && { redirect })
  }

  // Guardar con TTL de 15 minutos
  await kv.set(`magic_link:${token}`, tokenData, { ex: 900 })
}

// Verificar y consumir token
export async function verifyMagicLinkToken(token: string): Promise<{ email: string; redirect?: string } | null> {
  const tokenData = await kv.get<MagicLinkToken>(`magic_link:${token}`)

  if (!tokenData) return null

  // Verificar que no haya expirado
  if (new Date(tokenData.expiresAt) < new Date()) {
    await kv.del(`magic_link:${token}`)
    return null
  }

  // Eliminar token (single use)
  await kv.del(`magic_link:${token}`)

  return { email: tokenData.email, redirect: tokenData.redirect }
}

// Crear o actualizar usuario
export async function upsertUser(email: string): Promise<User> {
  const normalizedEmail = email.toLowerCase()
  const existingUser = await kv.get<User>(`user:${normalizedEmail}`)

  const now = new Date().toISOString()

  if (existingUser) {
    const updatedUser: User = {
      ...existingUser,
      lastLoginAt: now
    }
    await kv.set(`user:${normalizedEmail}`, updatedUser)
    return updatedUser
  }

  const newUser: User = {
    email: normalizedEmail,
    createdAt: now,
    lastLoginAt: now,
    progress: {
      completedLessons: []
    }
  }

  await kv.set(`user:${normalizedEmail}`, newUser)

  // También guardar en lista de emails para poder exportar
  await kv.sadd('users:emails', normalizedEmail)

  return newUser
}

// Obtener usuario por email
export async function getUser(email: string): Promise<User | null> {
  return await kv.get<User>(`user:${email.toLowerCase()}`)
}

// Crear sesión de usuario (cookie token)
export async function createSession(email: string): Promise<string> {
  const sessionToken = generateToken()
  const normalizedEmail = email.toLowerCase()

  // Sesión válida por 30 días
  await kv.set(`session:${sessionToken}`, normalizedEmail, { ex: 30 * 24 * 60 * 60 })

  return sessionToken
}

// Verificar sesión
export async function verifySession(sessionToken: string): Promise<string | null> {
  return await kv.get<string>(`session:${sessionToken}`)
}

// Actualizar progreso del usuario
export async function updateUserProgress(email: string, lessonId: string): Promise<void> {
  const user = await getUser(email)
  if (!user) return

  const completedLessons = user.progress?.completedLessons || []
  if (!completedLessons.includes(lessonId)) {
    completedLessons.push(lessonId)
  }

  const updatedUser: User = {
    ...user,
    progress: {
      ...user.progress,
      completedLessons,
      currentLesson: lessonId
    }
  }

  await kv.set(`user:${email.toLowerCase()}`, updatedUser)
}
