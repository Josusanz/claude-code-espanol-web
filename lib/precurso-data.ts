import { useState, useEffect } from 'react'

// Estructura del precurso (tracking IDs)
export const PRECURSO_SECTIONS = {
  'intro-completo': 'Introducción completada',
  'glosario-completo': 'Glosario completado',
  'req-vscode': 'VS Code instalado',
  'req-nodejs': 'Node.js instalado',
  'req-github': 'Cuenta GitHub creada',
  'req-vercel': 'Cuenta Vercel creada',
  'req-claude': 'Claude Code instalado',
  'req-pencil': 'Pencil instalado',
  'requisitos-completo': 'Requisitos completados',
  'reglas-prompting': '7 Reglas de Prompting',
  'errores-completo': 'Errores comunes leído',
  'quiz-aprobado': 'Quiz aprobado',
  'primer-proyecto': 'Primer proyecto completado',
  'discord-completo': 'Guía Discord leída',
}

// Páginas del precurso (ahora bajo /curso/)
export const PRECURSO_PAGES = [
  { href: '/curso/programar-con-ia', title: 'Programar con IA', emoji: '🤖', tiempo: '5 min', subtitle: 'Entiende cómo la IA ha cambiado las reglas del juego', trackingId: 'intro-completo', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { href: '/curso/glosario', title: 'Glosario', emoji: '📚', tiempo: '10 min', subtitle: 'Los conceptos esenciales para entender lo que hace Claude Code', trackingId: 'glosario-completo', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
  { href: '/curso/requisitos', title: 'Requisitos técnicos', emoji: '🛠️', tiempo: '15 min', subtitle: 'Las herramientas y cuentas que necesitas antes de empezar', trackingId: 'requisitos-completo', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)' },
  { href: '/curso/reglas-prompting', title: 'Las 7 Reglas de Prompting', emoji: '🎯', tiempo: '15 min', subtitle: 'Cómo hablar con Claude para obtener los mejores resultados', trackingId: 'reglas-prompting', gradient: 'linear-gradient(135deg, #f97316, #ea580c)' },
  { href: '/curso/errores-comunes', title: 'Errores comunes', emoji: '🔧', tiempo: '5 min', subtitle: 'Soluciones a los problemas más frecuentes', trackingId: 'errores-completo', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { href: '/curso/quiz', title: 'Quiz de conceptos', emoji: '✅', tiempo: '5 min', subtitle: 'Verifica que entiendes lo básico (80% para aprobar)', trackingId: 'quiz-aprobado', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
  { href: '/curso/primer-proyecto', title: 'Tu primer proyecto', emoji: '🚀', tiempo: '10 min', subtitle: 'Crea tu primera página web con Claude Code', trackingId: 'primer-proyecto', gradient: 'linear-gradient(135deg, #ec4899, #db2777)' },
  { href: '/curso/discord', title: 'Guía del Discord', emoji: '💬', tiempo: '5 min', subtitle: 'Aprende a usar el servidor: canales, comandos, logros y más', trackingId: 'discord-completo', gradient: 'linear-gradient(135deg, #5865F2, #7289DA)' },
]

// Helper para obtener el email del usuario desde localStorage
export function getUserEmail(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const savedAccess = localStorage.getItem('precurso-access')
    if (savedAccess) {
      const data = JSON.parse(savedAccess)
      return data.email ? data.email.toLowerCase().trim() : null
    }
  } catch {
    // Ignore
  }
  return null
}

// Helper para sincronizar progreso con el servidor (con retry)
async function syncProgressToServer(email: string, progress: Record<string, boolean>, retries = 2): Promise<boolean> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch('/api/precurso/sync-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, progress })
      })
      const data = await res.json()
      if (data.success) {
        return true
      }
    } catch (error) {
      console.error(`[Precurso] Sync attempt ${i + 1} failed:`, error)
      if (i < retries) {
        await new Promise(r => setTimeout(r, 1000 * (i + 1)))
      }
    }
  }
  return false
}

// Helper para cargar progreso del servidor
async function loadProgressFromServer(email: string): Promise<Record<string, boolean> | null> {
  try {
    const res = await fetch(`/api/precurso/sync-progress?email=${encodeURIComponent(email)}`)
    if (res.ok) {
      const data = await res.json()
      return data.progress || null
    }
  } catch (error) {
    console.error('[Precurso] Error loading progress:', error)
  }
  return null
}

export function usePrecursoProgress() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [initialized, setInitialized] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle')

  useEffect(() => {
    const email = getUserEmail()
    setUserEmail(email)

    const loadProgress = async () => {
      let localProgress: Record<string, boolean> = {}
      try {
        const saved = localStorage.getItem('precurso-progress')
        if (saved) {
          localProgress = JSON.parse(saved)
          setCompleted(localProgress)
        }
      } catch {
        // localStorage inválido, ignorar
      }

      if (email) {
        setSyncStatus('syncing')
        const serverProgress = await loadProgressFromServer(email)

        if (serverProgress && Object.keys(serverProgress).length > 0) {
          const merged: Record<string, boolean> = {}
          const allKeys = new Set([...Object.keys(localProgress), ...Object.keys(serverProgress)])
          allKeys.forEach(key => {
            merged[key] = localProgress[key] || serverProgress[key] || false
          })

          setCompleted(merged)
          localStorage.setItem('precurso-progress', JSON.stringify(merged))

          const hasLocalOnlyChanges = Object.keys(localProgress).some(
            key => localProgress[key] && !serverProgress[key]
          )
          if (hasLocalOnlyChanges) {
            await syncProgressToServer(email, merged)
          }
          setSyncStatus('synced')
        } else if (Object.keys(localProgress).length > 0) {
          const synced = await syncProgressToServer(email, localProgress)
          setSyncStatus(synced ? 'synced' : 'error')
        } else {
          setSyncStatus('synced')
        }
      }

      setInitialized(true)
    }

    loadProgress()
  }, [])

  const toggle = (id: string) => {
    const newCompleted = { ...completed, [id]: !completed[id] }
    setCompleted(newCompleted)

    try {
      localStorage.setItem('precurso-progress', JSON.stringify(newCompleted))
    } catch {
      // localStorage lleno o no disponible
    }

    if (userEmail) {
      syncProgressToServer(userEmail, newCompleted)
    }
  }

  const completedCount = PRECURSO_PAGES.filter(p => p.trackingId && completed[p.trackingId]).length
  const totalCount = PRECURSO_PAGES.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return { completed, toggle, completedCount, totalCount, progress, initialized }
}
