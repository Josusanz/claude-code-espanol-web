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
  // Try as Redis Set first, then as JSON string value
  try {
    const emails = await kv.smembers(EMAILS_SET_KEY)
    return emails as string[]
  } catch {
    // smembers failed — try reading as plain value
  }
  try {
    const data = await kv.get<string[]>(EMAILS_SET_KEY)
    return Array.isArray(data) ? data : []
  } catch {
    // get also failed
  }
  return []
}

export async function isEmailAuthorized(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim()
  try {
    const result = await kv.sismember(EMAILS_SET_KEY, normalizedEmail)
    return result === 1
  } catch {
    // sismember failed — fallback to full list check
  }
  const emails = await getAuthorizedEmails()
  return emails.includes(normalizedEmail)
}

export async function addAuthorizedEmail(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim()

  // Añadir al set de emails (o al array si la key es de tipo incorrecto)
  try {
    await kv.sadd(EMAILS_SET_KEY, normalizedEmail)
  } catch {
    // sadd failed — key is probably a JSON string, migrate to Set
    try {
      const existing = await kv.get<string[]>(EMAILS_SET_KEY) || []
      if (!existing.includes(normalizedEmail)) {
        existing.push(normalizedEmail)
      }
      await kv.del(EMAILS_SET_KEY)
      for (const e of existing) {
        await kv.sadd(EMAILS_SET_KEY, e)
      }
    } catch {
      // Migration also failed, ignore
    }
  }

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

  // Check if key needs migration first
  let needsMigration = false
  try {
    await kv.sismember(EMAILS_SET_KEY, '__test__')
  } catch {
    needsMigration = true
  }

  if (needsMigration) {
    const existing = await kv.get<string[]>(EMAILS_SET_KEY) || []
    await kv.del(EMAILS_SET_KEY)
    for (const e of existing) {
      await kv.sadd(EMAILS_SET_KEY, e)
    }
  }

  for (const email of emails) {
    const normalizedEmail = email.toLowerCase().trim()
    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      skipped++
      continue
    }

    const wasNew = await kv.sadd(EMAILS_SET_KEY, normalizedEmail)
    if (wasNew) {
      added++
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
  try {
    await kv.srem(EMAILS_SET_KEY, normalizedEmail)
  } catch {
    // srem failed — try reading as JSON, filtering, and recreating as Set
    try {
      const existing = await kv.get<string[]>(EMAILS_SET_KEY) || []
      const filtered = existing.filter(e => e !== normalizedEmail)
      await kv.del(EMAILS_SET_KEY)
      for (const e of filtered) {
        await kv.sadd(EMAILS_SET_KEY, e)
      }
    } catch {
      // Migration also failed, ignore
    }
  }
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
