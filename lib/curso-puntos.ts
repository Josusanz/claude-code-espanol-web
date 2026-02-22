import { kv } from '@vercel/kv'

// ============= Admin =============

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'j.sanzuriz@gmail.com').toLowerCase().trim()

// ============= Tipos =============

export interface PuntosHistorial {
  puntos: number
  razon: string
  itemId?: string
  createdAt: string
}

export interface PuntosData {
  total: number
  historial: PuntosHistorial[]
}

export interface NivelInfo {
  nivel: number
  nombre: string
  emoji: string
  puntosMin: number
  puntosNext: number | null // null = max level
}

export interface RankingEntry {
  email: string
  total: number
  nivel: NivelInfo
}

// ============= Niveles =============

const NIVELES: { nivel: number; nombre: string; emoji: string; puntosMin: number }[] = [
  { nivel: 1, nombre: 'Principiante', emoji: '🌱', puntosMin: 0 },
  { nivel: 2, nombre: 'Explorador', emoji: '🧭', puntosMin: 50 },
  { nivel: 3, nombre: 'Constructor', emoji: '🔨', puntosMin: 150 },
  { nivel: 4, nombre: 'Creador', emoji: '🎨', puntosMin: 300 },
  { nivel: 5, nombre: 'Maker', emoji: '🚀', puntosMin: 500 },
]

// ============= Tabla de puntos =============

export const PUNTOS_TABLE = {
  'modulo0-leccion': 10,
  'preclase-semanal': 15,
  'clase-semanal': 15,
  'entregable-semanal': 20,
  'bonus-semana-completa': 10,
  'bonus-modulo0-completo': 20,
  'publicar-duda': 5,
  'responder-duda': 5,
  'crear-proyecto': 20,
  'añadir-hito': 10,
} as const

// ============= KV Keys =============

const PUNTOS_KEY_PREFIX = 'curso:puntos:'
const RANKING_KEY = 'curso:puntos:ranking'

// ============= Funciones =============

export function getLevel(total: number): NivelInfo {
  let current = NIVELES[0]
  for (const nivel of NIVELES) {
    if (total >= nivel.puntosMin) {
      current = nivel
    } else {
      break
    }
  }

  const currentIdx = NIVELES.findIndex(n => n.nivel === current.nivel)
  const next = currentIdx < NIVELES.length - 1 ? NIVELES[currentIdx + 1] : null

  return {
    ...current,
    puntosNext: next ? next.puntosMin : null,
  }
}

export async function getPoints(email: string): Promise<PuntosData & { nivel: NivelInfo }> {
  const normalizedEmail = email.toLowerCase().trim()
  const data = await kv.get<PuntosData>(`${PUNTOS_KEY_PREFIX}${normalizedEmail}`)

  const result = data || { total: 0, historial: [] }
  return {
    ...result,
    nivel: getLevel(result.total),
  }
}

export async function awardPoints(
  email: string,
  puntos: number,
  razon: string,
  itemId?: string
): Promise<PuntosData & { nivel: NivelInfo }> {
  const normalizedEmail = email.toLowerCase().trim()
  const current = await kv.get<PuntosData>(`${PUNTOS_KEY_PREFIX}${normalizedEmail}`)
  const data = current || { total: 0, historial: [] }

  // Deduplicación por itemId
  if (itemId && data.historial.some(h => h.itemId === itemId)) {
    return { ...data, nivel: getLevel(data.total) }
  }

  const entry: PuntosHistorial = {
    puntos,
    razon,
    itemId,
    createdAt: new Date().toISOString(),
  }

  data.historial.push(entry)
  data.total += puntos

  // Guardar datos
  await kv.set(`${PUNTOS_KEY_PREFIX}${normalizedEmail}`, data)

  // Actualizar ranking (sorted set, score = total)
  await kv.zadd(RANKING_KEY, { score: data.total, member: normalizedEmail })

  return { ...data, nivel: getLevel(data.total) }
}

export async function getRanking(limit: number = 20): Promise<RankingEntry[]> {
  // Fetch extra to account for admin being filtered out
  const members = await kv.zrange<string[]>(RANKING_KEY, 0, limit + 1, { rev: true, withScores: true })

  if (!members || members.length === 0) return []

  // zrange con withScores devuelve [member, score, member, score, ...]
  const entries: RankingEntry[] = []
  for (let i = 0; i < members.length; i += 2) {
    const email = members[i] as string
    const total = Number(members[i + 1])
    // Excluir admin del ranking público
    if (email === ADMIN_EMAIL) continue
    entries.push({
      email,
      total,
      nivel: getLevel(total),
    })
  }

  return entries.slice(0, limit)
}

// Helper para calcular puntos de progreso completado
export async function awardProgressPoints(
  email: string,
  newProgress: Record<string, boolean>,
  oldProgress: Record<string, boolean>
): Promise<void> {
  // Detectar items recién completados
  for (const [key, value] of Object.entries(newProgress)) {
    if (!value || oldProgress[key]) continue // ya estaba completado o no es true

    // Módulo 0 lecciones
    if (key.startsWith('intro-') || key.startsWith('glosario-') || key.startsWith('req-') ||
        key === 'reglas-prompting' || key === 'quiz-aprobado' || key === 'primer-proyecto' ||
        key === 'errores-completo' || key === 'discord-completo' || key === 'requisitos-completo') {
      await awardPoints(email, PUNTOS_TABLE['modulo0-leccion'], 'Lección del Módulo 0 completada', `m0:${key}`)
    }

    // Preclase semanal (single-day: semana-X-preclase, multi-day: semana-X-dY-preclase)
    if (key.match(/^semana-\d+-preclase$/) || key.match(/^semana-\d+-d\d+-preclase$/)) {
      const semNum = key.match(/^semana-(\d+)/)![1]
      const dayMatch = key.match(/d(\d+)/)
      const label = dayMatch ? `Pre-clase Semana ${semNum} Día ${dayMatch[1]}` : `Pre-clase Semana ${semNum}`
      await awardPoints(email, PUNTOS_TABLE['preclase-semanal'], label, key)
    }

    // Clase semanal (single-day + multi-day)
    if (key.match(/^semana-\d+-clase$/) || key.match(/^semana-\d+-d\d+-clase$/)) {
      const semNum = key.match(/^semana-(\d+)/)![1]
      const dayMatch = key.match(/d(\d+)/)
      const label = dayMatch ? `Clase Semana ${semNum} Día ${dayMatch[1]}` : `Clase Semana ${semNum}`
      await awardPoints(email, PUNTOS_TABLE['clase-semanal'], label, key)
    }

    // Entregable semanal (single-day + multi-day)
    if (key.match(/^semana-\d+-entregable$/) || key.match(/^semana-\d+-d\d+-entregable$/)) {
      const semNum = key.match(/^semana-(\d+)/)![1]
      const dayMatch = key.match(/d(\d+)/)
      const label = dayMatch ? `Entregable Semana ${semNum} Día ${dayMatch[1]}` : `Entregable Semana ${semNum}`
      await awardPoints(email, PUNTOS_TABLE['entregable-semanal'], label, key)
    }
  }

  // Bonus semana completa — check all tracking IDs for the week
  const { getCursoTrackingIdsForSemana } = await import('./curso-data')
  for (let i = 1; i <= 10; i++) {
    const ids = getCursoTrackingIdsForSemana(i)
    const wasComplete = ids.every(id => oldProgress[id])
    const isComplete = ids.every(id => newProgress[id])

    if (isComplete && !wasComplete) {
      await awardPoints(email, PUNTOS_TABLE['bonus-semana-completa'], `Bonus: Semana ${i} completa`, `bonus-semana-${i}`)
    }
  }

  // Bonus Módulo 0 completo (8 páginas del precurso)
  const m0Keys = ['intro-completo', 'glosario-completo', 'requisitos-completo', 'reglas-prompting', 'errores-completo', 'quiz-aprobado', 'primer-proyecto', 'discord-completo']
  const m0WasComplete = m0Keys.every(k => oldProgress[k])
  const m0IsComplete = m0Keys.every(k => newProgress[k])

  if (m0IsComplete && !m0WasComplete) {
    await awardPoints(email, PUNTOS_TABLE['bonus-modulo0-completo'], 'Bonus: Módulo 0 completo', 'bonus-modulo0')
  }
}
