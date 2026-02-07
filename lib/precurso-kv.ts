import { kv } from '@vercel/kv'

// Tipos
export interface PrecursoUser {
  email: string
  addedAt: string
  progress: Record<string, boolean>
  lastSyncAt?: string
}

// Keys en Vercel KV
const EMAILS_SET_KEY = 'precurso:emails'
const USER_KEY_PREFIX = 'precurso:user:'

// ============= Emails autorizados =============

export async function getAuthorizedEmails(): Promise<string[]> {
  const emails = await kv.smembers(EMAILS_SET_KEY)
  return emails as string[]
}

export async function isEmailAuthorized(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim()
  const result = await kv.sismember(EMAILS_SET_KEY, normalizedEmail)
  return result === 1
}

export async function addAuthorizedEmail(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim()

  // Añadir al set de emails
  await kv.sadd(EMAILS_SET_KEY, normalizedEmail)

  // Crear registro de usuario si no existe
  const existingUser = await kv.get<PrecursoUser>(`${USER_KEY_PREFIX}${normalizedEmail}`)
  if (!existingUser) {
    const newUser: PrecursoUser = {
      email: normalizedEmail,
      addedAt: new Date().toISOString(),
      progress: {}
    }
    await kv.set(`${USER_KEY_PREFIX}${normalizedEmail}`, newUser)
  }

  return true
}

export async function addAuthorizedEmails(emails: string[]): Promise<{ added: number; skipped: number }> {
  let added = 0
  let skipped = 0

  for (const email of emails) {
    const normalizedEmail = email.toLowerCase().trim()
    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      skipped++
      continue
    }

    const wasNew = await kv.sadd(EMAILS_SET_KEY, normalizedEmail)
    if (wasNew) {
      added++
      // Crear registro de usuario
      const newUser: PrecursoUser = {
        email: normalizedEmail,
        addedAt: new Date().toISOString(),
        progress: {}
      }
      await kv.set(`${USER_KEY_PREFIX}${normalizedEmail}`, newUser)
    } else {
      skipped++
    }
  }

  return { added, skipped }
}

export async function removeAuthorizedEmail(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim()
  await kv.srem(EMAILS_SET_KEY, normalizedEmail)
  await kv.del(`${USER_KEY_PREFIX}${normalizedEmail}`)
  return true
}

// ============= Progreso de usuarios =============

export async function getUserProgress(email: string): Promise<PrecursoUser | null> {
  const normalizedEmail = email.toLowerCase().trim()
  return await kv.get<PrecursoUser>(`${USER_KEY_PREFIX}${normalizedEmail}`)
}

export async function syncUserProgress(
  email: string,
  progress: Record<string, boolean>
): Promise<PrecursoUser> {
  const normalizedEmail = email.toLowerCase().trim()
  const existingUser = await kv.get<PrecursoUser>(`${USER_KEY_PREFIX}${normalizedEmail}`)

  const updatedUser: PrecursoUser = {
    email: normalizedEmail,
    addedAt: existingUser?.addedAt || new Date().toISOString(),
    progress: { ...existingUser?.progress, ...progress },
    lastSyncAt: new Date().toISOString()
  }

  await kv.set(`${USER_KEY_PREFIX}${normalizedEmail}`, updatedUser)
  return updatedUser
}

export async function getAllUsersWithProgress(): Promise<PrecursoUser[]> {
  const emails = await getAuthorizedEmails()
  const users: PrecursoUser[] = []

  for (const email of emails) {
    const user = await kv.get<PrecursoUser>(`${USER_KEY_PREFIX}${email}`)
    if (user) {
      users.push(user)
    } else {
      // Si hay un email pero no tiene registro de usuario, crearlo
      users.push({
        email,
        addedAt: new Date().toISOString(),
        progress: {}
      })
    }
  }

  // Ordenar por fecha de registro (más recientes primero)
  return users.sort((a, b) =>
    new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  )
}
