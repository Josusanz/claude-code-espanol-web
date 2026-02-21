import { kv } from '@vercel/kv'

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
  // zrange con rev para obtener de mayor a menor
  const members = await kv.zrange<string[]>(RANKING_KEY, 0, limit - 1, { rev: true, withScores: true })

  if (!members || members.length === 0) return []

  // zrange con withScores devuelve [member, score, member, score, ...]
  const entries: RankingEntry[] = []
  for (let i = 0; i < members.length; i += 2) {
    const email = members[i] as string
    const total = Number(members[i + 1])
    entries.push({
      email,
      total,
      nivel: getLevel(total),
    })
  }

  return entries
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

    // Preclase semanal
    if (key.match(/^semana-\d+-preclase$/)) {
      const num = key.match(/\d+/)![0]
      await awardPoints(email, PUNTOS_TABLE['preclase-semanal'], `Pre-clase Semana ${num}`, key)
    }

    // Clase semanal
    if (key.match(/^semana-\d+-clase$/)) {
      const num = key.match(/\d+/)![0]
      await awardPoints(email, PUNTOS_TABLE['clase-semanal'], `Clase Semana ${num}`, key)
    }

    // Entregable semanal
    if (key.match(/^semana-\d+-entregable$/)) {
      const num = key.match(/\d+/)![0]
      await awardPoints(email, PUNTOS_TABLE['entregable-semanal'], `Entregable Semana ${num}`, key)
    }
  }

  // Bonus semana completa (3/3)
  for (let i = 1; i <= 10; i++) {
    const pre = `semana-${i}-preclase`
    const cls = `semana-${i}-clase`
    const ent = `semana-${i}-entregable`

    const wasComplete = oldProgress[pre] && oldProgress[cls] && oldProgress[ent]
    const isComplete = newProgress[pre] && newProgress[cls] && newProgress[ent]

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
