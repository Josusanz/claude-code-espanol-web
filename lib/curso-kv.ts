import { kv } from '@vercel/kv'
import { getCursoTrackingIdsForSemana, getCursoTotalItems } from './curso-data'

// Tipos
export interface CursoUser {
  email: string
  enrolledAt: string
  progress: Record<string, boolean> // semana-1-preclase, semana-1-clase, etc.
  lastSyncAt?: string
  nombre?: string
  autoguiadoOverrides?: Record<number, boolean> // admin overrides per autoguiado module
}

export interface CursoConfig {
  currentWeek: number
  startDate: string
  weekUnlocks: Record<number, boolean> // override manual de desbloqueo
  isActive: boolean
}

// Keys en Vercel KV
const EMAILS_SET_KEY = 'curso:emails'
const USER_KEY_PREFIX = 'curso:user:'
const CONFIG_KEY = 'curso:config'

// ============= Config del curso =============

export async function getCursoConfig(): Promise<CursoConfig> {
  const config = await kv.get<CursoConfig>(CONFIG_KEY)
  return config || {
    currentWeek: 1,
    startDate: '2026-02-19',
    weekUnlocks: {},
    isActive: true,
  }
}

export async function updateCursoConfig(updates: Partial<CursoConfig>): Promise<CursoConfig> {
  const current = await getCursoConfig()
  const updated: CursoConfig = { ...current, ...updates }
  await kv.set(CONFIG_KEY, updated)
  return updated
}

// ============= Emails autorizados (reutiliza los del precurso) =============

export async function getCursoEmails(): Promise<string[]> {
  // Usamos los mismos emails que el precurso
  const emails = await kv.smembers('precurso:emails')
  return emails as string[]
}

export async function isEmailAuthorizedForCurso(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim()
  // Verificamos contra el set de precurso
  const result = await kv.sismember('precurso:emails', normalizedEmail)
  return result === 1
}

// ============= Usuarios del curso =============

export async function getCursoUser(email: string): Promise<CursoUser | null> {
  const normalizedEmail = email.toLowerCase().trim()
  return await kv.get<CursoUser>(`${USER_KEY_PREFIX}${normalizedEmail}`)
}

export async function createOrGetCursoUser(email: string): Promise<CursoUser> {
  const normalizedEmail = email.toLowerCase().trim()
  const existing = await getCursoUser(normalizedEmail)

  if (existing) {
    return existing
  }

  const newUser: CursoUser = {
    email: normalizedEmail,
    enrolledAt: new Date().toISOString(),
    progress: {},
  }

  await kv.set(`${USER_KEY_PREFIX}${normalizedEmail}`, newUser)
  await kv.sadd(EMAILS_SET_KEY, normalizedEmail)

  return newUser
}

export async function syncCursoProgress(
  email: string,
  progress: Record<string, boolean>
): Promise<CursoUser> {
  const normalizedEmail = email.toLowerCase().trim()
  const existingUser = await getCursoUser(normalizedEmail)

  const updatedUser: CursoUser = {
    email: normalizedEmail,
    enrolledAt: existingUser?.enrolledAt || new Date().toISOString(),
    progress: { ...existingUser?.progress, ...progress },
    lastSyncAt: new Date().toISOString(),
    nombre: existingUser?.nombre,
  }

  await kv.set(`${USER_KEY_PREFIX}${normalizedEmail}`, updatedUser)
  return updatedUser
}

export async function getAllCursoUsers(): Promise<CursoUser[]> {
  // Primero obtener emails del curso, si no hay, usar los del precurso
  let emails = await kv.smembers(EMAILS_SET_KEY) as string[]

  if (emails.length === 0) {
    emails = await getCursoEmails()
  }

  const users: CursoUser[] = []

  for (const email of emails) {
    const user = await getCursoUser(email)
    if (user) {
      users.push(user)
    } else {
      // Si hay un email pero no tiene registro de usuario del curso, crear uno básico
      users.push({
        email,
        enrolledAt: new Date().toISOString(),
        progress: {},
      })
    }
  }

  // Ordenar por fecha de registro (más recientes primero)
  return users.sort((a, b) =>
    new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime()
  )
}

// ============= Desbloqueo de semanas =============

export async function isSemanaUnlocked(semanaNum: number): Promise<boolean> {
  const config = await getCursoConfig()

  // Override manual tiene prioridad
  if (config.weekUnlocks[semanaNum] !== undefined) {
    return config.weekUnlocks[semanaNum]
  }

  // Desbloqueo por fecha
  const SEMANAS_FECHAS: Record<number, string> = {
    1: '2026-02-19',
    2: '2026-02-27',
    3: '2026-03-06',
    4: '2026-03-13',
    5: '2026-03-20',
    6: '2026-03-27',
    7: '2026-04-03',
    8: '2026-04-10',
    9: '2026-04-17',
    10: '2026-04-24',
  }

  const fechaInicio = SEMANAS_FECHAS[semanaNum]
  if (!fechaInicio) return false

  const hoy = new Date()
  const fechaSemana = new Date(fechaInicio)

  return hoy >= fechaSemana
}

export async function unlockSemana(semanaNum: number, unlock: boolean): Promise<void> {
  const config = await getCursoConfig()
  config.weekUnlocks[semanaNum] = unlock
  await kv.set(CONFIG_KEY, config)
}

export async function getSemanasStatus(): Promise<Record<number, boolean>> {
  const status: Record<number, boolean> = {}
  for (let i = 1; i <= 10; i++) {
    status[i] = await isSemanaUnlocked(i)
  }
  return status
}

// ============= Estadísticas =============

export interface CursoStats {
  totalAlumnos: number
  alumnosActivos: number // con actividad en última semana
  promedioProgreso: number
  porSemana: Record<number, { completados: number; enProgreso: number }>
}

export async function getCursoStats(): Promise<CursoStats> {
  const users = await getAllCursoUsers()
  const ahora = new Date()
  const haceUnaSemana = new Date(ahora.getTime() - 7 * 24 * 60 * 60 * 1000)

  let totalProgreso = 0
  let alumnosActivos = 0
  const porSemana: Record<number, { completados: number; enProgreso: number }> = {}

  // Inicializar por semana
  for (let i = 1; i <= 10; i++) {
    porSemana[i] = { completados: 0, enProgreso: 0 }
  }

  const totalItems = getCursoTotalItems()

  for (const user of users) {
    // Verificar si es activo
    if (user.lastSyncAt && new Date(user.lastSyncAt) >= haceUnaSemana) {
      alumnosActivos++
    }

    // Calcular progreso de este usuario usando IDs dinámicos
    let userCompleted = 0
    for (let i = 1; i <= 10; i++) {
      const ids = getCursoTrackingIdsForSemana(i)
      const semanaCompleted = ids.filter(id => user.progress[id]).length
      userCompleted += semanaCompleted

      if (semanaCompleted === ids.length) {
        porSemana[i].completados++
      } else if (semanaCompleted > 0) {
        porSemana[i].enProgreso++
      }
    }
    const userProgress = totalItems > 0 ? (userCompleted / totalItems) * 100 : 0
    totalProgreso += userProgress
  }

  return {
    totalAlumnos: users.length,
    alumnosActivos,
    promedioProgreso: users.length > 0 ? totalProgreso / users.length : 0,
    porSemana,
  }
}

// ============= Desbloqueo autoguiado (por alumno) =============

export function isModuloAutoguiadoUnlocked(
  moduloNum: number,
  enrolledAt: string,
  overrides?: Record<number, boolean>
): boolean {
  if (moduloNum === 0) return true // siempre gratis
  // Admin override tiene prioridad
  if (overrides && overrides[moduloNum] !== undefined) {
    return overrides[moduloNum]
  }
  const daysSinceEnrollment = (Date.now() - new Date(enrolledAt).getTime()) / (1000 * 60 * 60 * 24)
  const daysRequired = (moduloNum - 1) * 7
  return daysSinceEnrollment >= daysRequired
}

export interface ModuloUnlockStatus {
  unlocked: boolean
  availableDate: string // ISO string
  daysRemaining: number
}

export function getAllModulosUnlockStatus(
  enrolledAt: string,
  overrides?: Record<number, boolean>
): Record<number, ModuloUnlockStatus> {
  const result: Record<number, ModuloUnlockStatus> = {}
  const enrolledTime = new Date(enrolledAt).getTime()

  for (let i = 0; i <= 10; i++) {
    if (i === 0) {
      result[i] = { unlocked: true, availableDate: enrolledAt, daysRemaining: 0 }
      continue
    }

    // Admin override
    if (overrides && overrides[i] !== undefined) {
      result[i] = {
        unlocked: overrides[i],
        availableDate: overrides[i] ? enrolledAt : '',
        daysRemaining: overrides[i] ? 0 : -1,
      }
      continue
    }

    const daysRequired = (i - 1) * 7
    const availableTime = enrolledTime + daysRequired * 24 * 60 * 60 * 1000
    const availableDate = new Date(availableTime).toISOString()
    const daysRemaining = Math.max(0, Math.ceil((availableTime - Date.now()) / (1000 * 60 * 60 * 24)))

    result[i] = {
      unlocked: Date.now() >= availableTime,
      availableDate,
      daysRemaining,
    }
  }

  return result
}

export async function setAutoguiadoOverride(
  email: string,
  moduloNum: number,
  unlock: boolean
): Promise<CursoUser | null> {
  const normalizedEmail = email.toLowerCase().trim()
  const user = await getCursoUser(normalizedEmail)
  if (!user) return null

  const overrides = { ...user.autoguiadoOverrides, [moduloNum]: unlock }
  const updatedUser: CursoUser = { ...user, autoguiadoOverrides: overrides }
  await kv.set(`${USER_KEY_PREFIX}${normalizedEmail}`, updatedUser)
  return updatedUser
}

// ============= Stats autoguiado =============

export interface AutoguiadoStats {
  totalAlumnos: number
  alumnosActivos: number
  promedioProgreso: number
  porModulo: Record<number, number> // módulo -> cuántos lo completaron
}

export async function getAutoguiadoStats(): Promise<AutoguiadoStats> {
  const users = await getAllCursoUsers()
  const ahora = new Date()
  const haceUnaSemana = new Date(ahora.getTime() - 7 * 24 * 60 * 60 * 1000)

  let totalProgreso = 0
  let alumnosActivos = 0
  const porModulo: Record<number, number> = {}

  for (let i = 0; i <= 10; i++) {
    porModulo[i] = 0
  }

  for (const user of users) {
    // Solo contar usuarios que tienen progreso autoguiado
    const autoguiadoKeys = Object.keys(user.progress).filter(k => k.startsWith('autoguiado-'))
    if (autoguiadoKeys.length === 0) continue

    if (user.lastSyncAt && new Date(user.lastSyncAt) >= haceUnaSemana) {
      alumnosActivos++
    }

    const completedModulos = autoguiadoKeys.filter(k => user.progress[k]).length
    totalProgreso += (completedModulos / 11) * 100

    for (let i = 0; i <= 10; i++) {
      if (user.progress[`autoguiado-modulo-${i}`]) {
        porModulo[i]++
      }
    }
  }

  const alumnosAutoguiado = users.filter(u =>
    Object.keys(u.progress).some(k => k.startsWith('autoguiado-'))
  ).length

  return {
    totalAlumnos: alumnosAutoguiado,
    alumnosActivos,
    promedioProgreso: alumnosAutoguiado > 0 ? totalProgreso / alumnosAutoguiado : 0,
    porModulo,
  }
}
