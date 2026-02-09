import Head from 'next/head'
import Link from 'next/link'
import PrecursoEmailGate from '../../components/PrecursoEmailGate'
import { useState, useEffect } from 'react'

// Estructura del precurso
export const PRECURSO_SECTIONS = {
  'intro-completo': 'Introducción completada',
  'glosario-completo': 'Glosario completado',
  'req-vscode': 'VS Code instalado',
  'req-nodejs': 'Node.js instalado',
  'req-github': 'Cuenta GitHub creada',
  'req-vercel': 'Cuenta Vercel creada',
  'req-claude': 'Claude Code instalado',
  'reglas-prompting': '7 Reglas de Prompting',
  'quiz-aprobado': 'Quiz aprobado',
  'primer-proyecto': 'Primer proyecto completado',
}

// Páginas del precurso con tiempos estimados
export const PRECURSO_PAGES = [
  { href: '/precurso/programar-con-ia', title: 'Programar con IA', emoji: '🤖', tiempo: '5 min' },
  { href: '/precurso/glosario', title: 'Glosario', emoji: '📚', tiempo: '10 min' },
  { href: '/precurso/requisitos', title: 'Requisitos', emoji: '🔧', tiempo: '15 min' },
  { href: '/precurso/errores-comunes', title: 'Errores comunes', emoji: '🔧', tiempo: '5 min' },
  { href: '/precurso/quiz', title: 'Quiz', emoji: '✅', tiempo: '5 min' },
  { href: '/precurso/primer-proyecto', title: 'Tu primer proyecto', emoji: '🚀', tiempo: '10 min' },
]

// Helper para obtener el email del usuario desde localStorage
function getUserEmail(): string | null {
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
        await new Promise(r => setTimeout(r, 1000 * (i + 1))) // Exponential backoff
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

  // Cargar progreso (localStorage primero, luego servidor)
  useEffect(() => {
    const email = getUserEmail()
    setUserEmail(email)

    const loadProgress = async () => {
      // Primero cargar de localStorage para mostrar algo rápido
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

      // Si hay email, intentar cargar del servidor y hacer merge
      if (email) {
        setSyncStatus('syncing')
        const serverProgress = await loadProgressFromServer(email)

        if (serverProgress && Object.keys(serverProgress).length > 0) {
          // Merge: tomar el valor true de cualquiera de los dos
          const merged: Record<string, boolean> = {}
          const allKeys = new Set([...Object.keys(localProgress), ...Object.keys(serverProgress)])
          allKeys.forEach(key => {
            merged[key] = localProgress[key] || serverProgress[key] || false
          })

          setCompleted(merged)
          localStorage.setItem('precurso-progress', JSON.stringify(merged))

          // Si hay diferencias locales, sincronizar de vuelta al servidor
          const hasLocalOnlyChanges = Object.keys(localProgress).some(
            key => localProgress[key] && !serverProgress[key]
          )
          if (hasLocalOnlyChanges) {
            await syncProgressToServer(email, merged)
          }
          setSyncStatus('synced')
        } else if (Object.keys(localProgress).length > 0) {
          // No hay datos en servidor pero sí locales, subir al servidor
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

    // Guardar en localStorage inmediatamente
    try {
      localStorage.setItem('precurso-progress', JSON.stringify(newCompleted))
    } catch {
      // localStorage lleno o no disponible
    }

    // Sincronizar con el servidor si hay email
    if (userEmail) {
      syncProgressToServer(userEmail, newCompleted)
    }
  }

  const completedCount = Object.values(completed).filter(Boolean).length
  const totalCount = Object.keys(PRECURSO_SECTIONS).length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return { completed, toggle, completedCount, totalCount, progress, initialized }
}

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const saved = localStorage.getItem('precurso-theme') as 'light' | 'dark' | null
    if (saved) setTheme(saved)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('precurso-theme', newTheme)
  }

  return { theme, toggleTheme }
}

const themes = {
  light: {
    bg: '#ffffff',
    bgSecondary: '#f8fafc',
    bgTertiary: '#f1f5f9',
    text: '#1e293b',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    border: '#e2e8f0',
    accent: '#6366f1',
    accentLight: '#eef2ff',
    success: '#22c55e',
    successLight: '#f0fdf4',
    warning: '#f59e0b',
    warningLight: '#fffbeb',
  },
  dark: {
    bg: '#0f172a',
    bgSecondary: '#1e293b',
    bgTertiary: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    border: '#334155',
    accent: '#818cf8',
    accentLight: 'rgba(129, 140, 248, 0.1)',
    success: '#4ade80',
    successLight: 'rgba(74, 222, 128, 0.1)',
    warning: '#fbbf24',
    warningLight: 'rgba(251, 191, 36, 0.1)',
  }
}

function PrecursoContent() {
  const { completed, completedCount, totalCount, progress } = usePrecursoProgress()
  const { theme, toggleTheme } = useTheme()
  const t = themes[theme]
  const [userEmail, setUserEmail] = useState<string>('')

  useEffect(() => {
    const savedAccess = localStorage.getItem('precurso-access')
    if (savedAccess) {
      try {
        const data = JSON.parse(savedAccess)
        if (data.email) setUserEmail(data.email)
      } catch { /* ignore */ }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('precurso-access')
    window.location.reload()
  }

  const introCompleted = completed['intro-completo']
  const glosarioCompleted = completed['glosario-completo']

  // Requisitos: check if all 5 steps are done
  const reqSteps = ['req-vscode', 'req-nodejs', 'req-github', 'req-vercel', 'req-claude']
  const reqCompletedCount = reqSteps.filter(key => completed[key]).length
  const requisitosCompleted = reqCompletedCount === 5

  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: t.text,
      transition: 'background 0.2s, color 0.2s'
    }}>
      <Head>
        <title>Precurso | Crea tu Software con IA</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header className="precurso-header" style={{
        background: t.bg,
        borderBottom: `1px solid ${t.border}`,
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '13px'
          }}>P</div>
          <span className="header-title" style={{ fontWeight: 600, fontSize: '16px' }}>Precurso</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Progress pill - compact on mobile */}
          <div className="progress-pill" style={{
            padding: '6px 12px',
            background: progress === 100 ? t.successLight : t.bgSecondary,
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 500,
            color: progress === 100 ? t.success : t.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: progress === 100 ? t.success : t.accent
            }} />
            <span className="progress-text-full">{completedCount}/{totalCount}</span>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: `1px solid ${t.border}`,
              background: t.bgSecondary,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0
            }}
            title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
          >
            {theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 12px',
              fontSize: '13px',
              fontWeight: 500,
              color: t.textSecondary,
              background: 'transparent',
              border: `1px solid ${t.border}`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flexShrink: 0
            }}
            title={userEmail ? `Cerrar sesión (${userEmail})` : 'Cerrar sesión'}
          >
            Salir
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 73px)' }}>
        {/* Sidebar - Solo navegación */}
        <aside style={{
          width: '260px',
          background: t.bgSecondary,
          borderRight: `1px solid ${t.border}`,
          padding: '24px 0',
          position: 'sticky',
          top: '73px',
          height: 'calc(100vh - 73px)',
          overflowY: 'auto',
          flexShrink: 0
        }} className="sidebar-desktop">
          <nav>
            {/* Inicio */}
            <Link href="/precurso" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              color: t.accent,
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
              background: t.accentLight,
              borderLeft: `3px solid ${t.accent}`,
              marginLeft: '-1px'
            }}>
              <span>🏠</span>
              Inicio
            </Link>

            {/* Intro section */}
            <div style={{ marginTop: '20px' }}>
              <Link href="/precurso/programar-con-ia" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 20px',
                color: t.text,
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.3px'
              }}>
                <span>🤖</span>
                Programar con IA
              </Link>
            </div>

            {/* Glosario section */}
            <div style={{ marginTop: '20px' }}>
              <Link href="/precurso/glosario" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 20px',
                color: t.text,
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.3px'
              }}>
                <span>📚</span>
                Glosario
              </Link>
              <Link href="/precurso/glosario#glosario-basicos" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px', borderLeft: '3px solid transparent'
              }}>
                Conceptos básicos
              </Link>
              <Link href="/precurso/glosario#glosario-frontend" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px', borderLeft: '3px solid transparent'
              }}>
                Frontend y Backend
              </Link>
              <Link href="/precurso/glosario#glosario-git" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px', borderLeft: '3px solid transparent'
              }}>
                Git y versiones
              </Link>
              <Link href="/precurso/glosario#glosario-deploy" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px', borderLeft: '3px solid transparent'
              }}>
                Deploy y producción
              </Link>
            </div>

            {/* Requisitos section */}
            <div style={{ marginTop: '20px' }}>
              <Link href="/precurso/requisitos" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 20px',
                color: t.text,
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.3px'
              }}>
                <span>🛠️</span>
                Requisitos
              </Link>
              <Link href="/precurso/requisitos#requisitos-vscode" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px', borderLeft: '3px solid transparent'
              }}>
                1. VS Code
              </Link>
              <Link href="/precurso/requisitos#requisitos-nodejs" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px', borderLeft: '3px solid transparent'
              }}>
                2. Node.js
              </Link>
              <Link href="/precurso/requisitos#requisitos-github" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px', borderLeft: '3px solid transparent'
              }}>
                3. GitHub
              </Link>
              <Link href="/precurso/requisitos#requisitos-vercel" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px', borderLeft: '3px solid transparent'
              }}>
                4. Vercel
              </Link>
              <Link href="/precurso/requisitos#requisitos-claude" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px', borderLeft: '3px solid transparent'
              }}>
                5. Claude Code
              </Link>
            </div>
          </nav>

          {/* 7 Reglas Prompting */}
          <div style={{ marginTop: '20px' }}>
            <Link href="/precurso/reglas-prompting" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              color: t.text,
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.3px'
            }}>
              <span>🎯</span>
              7 Reglas Prompting
            </Link>
          </div>

          {/* Checklist link */}
          <div style={{ marginTop: '20px' }}>
            <Link href="/precurso/checklist" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              color: t.textSecondary,
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500
            }}>
              <span>📋</span>
              Checklist (PDF)
            </Link>
          </div>

          {/* Help box */}
          <div style={{
            margin: '24px 16px 0',
            padding: '16px',
            background: t.bgTertiary,
            borderRadius: '12px'
          }}>
            <p style={{ margin: 0, fontSize: '13px', color: t.textMuted }}>
              ¿Dudas? Escríbeme a{' '}
              <a href="mailto:josu@yenze.io" style={{ color: t.accent }}>
                josu@yenze.io
              </a>
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main className="precurso-main" style={{ flex: 1, padding: '24px 20px', maxWidth: '900px' }}>
          {/* Hero */}
          <div style={{ marginBottom: '32px' }}>
            <h1 className="precurso-title" style={{
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: '12px',
              color: t.text,
              lineHeight: 1.2
            }}>
              Bienvenido al Precurso 👋
            </h1>
            <p className="precurso-subtitle" style={{
              fontSize: '16px',
              color: t.textSecondary,
              lineHeight: 1.6,
              maxWidth: '600px'
            }}>
              Antes de crear software con IA, necesitas conocer algunos términos y tener las herramientas instaladas. <strong style={{ color: t.text }}>No vas a programar</strong> — solo entender lo básico.
            </p>
          </div>

          {/* Progress bar */}
          <div style={{
            marginBottom: '24px',
            padding: '16px',
            background: t.bgSecondary,
            borderRadius: '12px',
            border: `1px solid ${t.border}`
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: t.text }}>
                Tu progreso
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: t.accent }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div style={{
              height: '8px',
              background: t.bgTertiary,
              borderRadius: '100px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: progress === 100
                  ? `linear-gradient(90deg, ${t.success}, #16a34a)`
                  : `linear-gradient(90deg, ${t.accent}, #8b5cf6)`,
                borderRadius: '100px',
                transition: 'width 0.3s ease'
              }} />
            </div>
            {progress === 100 && (
              <p style={{
                margin: '12px 0 0',
                fontSize: '14px',
                color: t.success,
                fontWeight: 500
              }}>
                🎉 ¡Estás listo para la primera clase!
              </p>
            )}
          </div>

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Intro: Programar con IA */}
            <Link href="/precurso/programar-con-ia" className="precurso-card" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '20px',
              background: introCompleted ? t.successLight : t.bgSecondary,
              border: `1px solid ${introCompleted ? t.success : t.border}`,
              borderRadius: '14px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: introCompleted
                  ? t.success
                  : 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
                color: 'white'
              }}>
                {introCompleted ? '✓' : '🤖'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '2px 8px',
                    background: t.warningLight,
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: t.warning
                  }}>EMPIEZA AQUÍ</span>
                  <span style={{
                    fontSize: '12px',
                    color: introCompleted ? t.success : t.textMuted,
                    fontWeight: 500
                  }}>
                    {introCompleted ? '✓ Completado' : '5 min'}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 4px 0',
                  lineHeight: 1.3
                }}>
                  ¿Por qué ya no necesitas saber programar?
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: t.textSecondary,
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  Entiende cómo la IA ha cambiado las reglas del juego
                </p>
              </div>
            </Link>

            {/* Glosario */}
            <Link href="/precurso/glosario" className="precurso-card" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '20px',
              background: glosarioCompleted ? t.successLight : t.bgSecondary,
              border: `1px solid ${glosarioCompleted ? t.success : t.border}`,
              borderRadius: '14px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: glosarioCompleted
                  ? t.success
                  : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
                color: 'white'
              }}>
                {glosarioCompleted ? '✓' : '📚'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '12px',
                    color: glosarioCompleted ? t.success : t.textMuted,
                    fontWeight: 500
                  }}>
                    {glosarioCompleted ? '✓ Completado' : '6 secciones'}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 4px 0',
                  lineHeight: 1.3
                }}>
                  Glosario de términos
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: t.textSecondary,
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  Los conceptos esenciales para entender lo que hace Claude Code
                </p>
              </div>
            </Link>

            {/* Requisitos */}
            <Link href="/precurso/requisitos" className="precurso-card" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '20px',
              background: requisitosCompleted ? t.successLight : t.bgSecondary,
              border: `1px solid ${requisitosCompleted ? t.success : t.border}`,
              borderRadius: '14px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: requisitosCompleted
                  ? t.success
                  : 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
                color: 'white'
              }}>
                {requisitosCompleted ? '✓' : '🛠️'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '12px',
                    color: requisitosCompleted ? t.success : t.textMuted,
                    fontWeight: 500
                  }}>
                    {requisitosCompleted ? '✓ Completado' : `${reqCompletedCount}/5 instalados`}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 4px 0',
                  lineHeight: 1.3
                }}>
                  Requisitos técnicos
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: t.textSecondary,
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  Las herramientas y cuentas que necesitas antes de empezar
                </p>
              </div>
            </Link>

            {/* 7 Reglas de Prompting */}
            <Link href="/precurso/reglas-prompting" className="precurso-card" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '20px',
              background: completed['reglas-prompting'] ? t.successLight : t.bgSecondary,
              border: `1px solid ${completed['reglas-prompting'] ? t.success : t.border}`,
              borderRadius: '14px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: completed['reglas-prompting']
                  ? t.success
                  : 'linear-gradient(135deg, #f97316, #ea580c)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
                color: 'white'
              }}>
                {completed['reglas-prompting'] ? '✓' : '🎯'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '2px 8px',
                    background: t.accentLight,
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: t.accent
                  }}>FUNDAMENTAL</span>
                  <span style={{
                    fontSize: '12px',
                    color: completed['reglas-prompting'] ? t.success : t.textMuted,
                    fontWeight: 500
                  }}>
                    {completed['reglas-prompting'] ? '✓ Completado' : '15 min'}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 4px 0',
                  lineHeight: 1.3
                }}>
                  Las 7 Reglas de Prompting
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: t.textSecondary,
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  Cómo hablar con Claude para obtener los mejores resultados
                </p>
              </div>
            </Link>

            {/* Errores Comunes */}
            <Link href="/precurso/errores-comunes" className="precurso-card" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '20px',
              background: t.bgSecondary,
              border: `1px solid ${t.border}`,
              borderRadius: '14px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
                color: 'white'
              }}>
                🔧
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '12px',
                    color: t.textMuted,
                    fontWeight: 500
                  }}>
                    5 min
                  </span>
                </div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 4px 0',
                  lineHeight: 1.3
                }}>
                  Errores comunes
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: t.textSecondary,
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  Soluciones a los problemas más frecuentes
                </p>
              </div>
            </Link>

            {/* Quiz */}
            <Link href="/precurso/quiz" className="precurso-card" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '20px',
              background: completed['quiz-aprobado'] ? t.successLight : t.bgSecondary,
              border: `1px solid ${completed['quiz-aprobado'] ? t.success : t.border}`,
              borderRadius: '14px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: completed['quiz-aprobado']
                  ? t.success
                  : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
                color: 'white'
              }}>
                {completed['quiz-aprobado'] ? '✓' : '✅'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '12px',
                    color: completed['quiz-aprobado'] ? t.success : t.textMuted,
                    fontWeight: 500
                  }}>
                    {completed['quiz-aprobado'] ? '✓ Aprobado' : '10 preguntas'}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 4px 0',
                  lineHeight: 1.3
                }}>
                  Quiz de conceptos
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: t.textSecondary,
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  Verifica que entiendes lo básico (80% para aprobar)
                </p>
              </div>
            </Link>

            {/* Primer Proyecto */}
            <Link href="/precurso/primer-proyecto" className="precurso-card" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '20px',
              background: completed['primer-proyecto'] ? t.successLight : t.bgSecondary,
              border: `1px solid ${completed['primer-proyecto'] ? t.success : t.border}`,
              borderRadius: '14px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: completed['primer-proyecto']
                  ? t.success
                  : 'linear-gradient(135deg, #ec4899, #db2777)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
                color: 'white'
              }}>
                {completed['primer-proyecto'] ? '✓' : '🚀'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '12px',
                    color: completed['primer-proyecto'] ? t.success : t.textMuted,
                    fontWeight: 500
                  }}>
                    {completed['primer-proyecto'] ? '✓ Completado' : '10 min'}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 4px 0',
                  lineHeight: 1.3
                }}>
                  Tu primer proyecto
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: t.textSecondary,
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  Crea tu primera página web con Claude Code
                </p>
              </div>
            </Link>

            {/* Discord */}
            <a
              href="https://discord.gg/RFU7P2vpqa"
              target="_blank"
              rel="noopener noreferrer"
              className="precurso-card"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.1), rgba(88, 101, 242, 0.05))',
                border: '1px solid rgba(88, 101, 242, 0.3)',
                borderRadius: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #5865F2, #7289DA)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
                color: 'white'
              }}>
                💬
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    padding: '2px 8px',
                    background: 'rgba(88, 101, 242, 0.2)',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#5865F2'
                  }}>COMUNIDAD</span>
                </div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 4px 0',
                  lineHeight: 1.3
                }}>
                  Únete al Discord
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: t.textSecondary,
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  Conecta con otros alumnos. Usa <code style={{ background: t.bgTertiary, padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>/verificar email:tu@email.com</code> para acceder
                </p>
              </div>
            </a>

            {/* Calendario */}
            <a
              href="https://calendar.google.com/calendar/u/0/r?cid=43979bc920a7c33e572266e10021d4934f9ce7eea323fa948471566d5f25d11f@group.calendar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="precurso-card"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.1), rgba(66, 133, 244, 0.05))',
                border: '1px solid rgba(66, 133, 244, 0.3)',
                borderRadius: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #4285F4, #34A853)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
                color: 'white'
              }}>
                📅
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    padding: '2px 8px',
                    background: 'rgba(66, 133, 244, 0.2)',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#4285F4'
                  }}>CALENDARIO</span>
                </div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 4px 0',
                  lineHeight: 1.3
                }}>
                  Añade las clases a tu calendario
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: t.textSecondary,
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  Sincroniza todas las clases en vivo con Google Calendar
                </p>
              </div>
            </a>
          </div>

          {/* Time estimate */}
          <div style={{
            marginTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            color: t.textMuted,
            fontSize: '13px'
          }}>
            <span>⏱️ ~65 min total</span>
            <span>📱 A tu ritmo</span>
          </div>

          {/* Link al curso completo */}
          {progress === 100 && (
            <Link href="/curso" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '32px',
              padding: '20px 24px',
              background: `linear-gradient(135deg, ${t.accent}, #8b5cf6)`,
              borderRadius: '14px',
              textDecoration: 'none',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: `0 8px 32px ${t.accent}40`
            }}>
              🚀 Ir al Curso Completo
            </Link>
          )}
        </main>
      </div>

      <style jsx global>{`
        @media (min-width: 769px) {
          .precurso-header { padding: 16px 32px !important; }
          .precurso-main { padding: 40px 56px !important; }
          .precurso-title { font-size: 32px !important; }
          .precurso-subtitle { font-size: 17px !important; }
          .precurso-card { padding: 24px !important; gap: 20px !important; }
          .precurso-card > div:first-child { width: 56px !important; height: 56px !important; font-size: 24px !important; }
          .precurso-card h3 { font-size: 18px !important; }
          .precurso-card p { font-size: 15px !important; }
        }
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .header-title { display: none !important; }
        }
      `}</style>
    </div>
  )
}

export default function PrecursoPage() {
  return (
    <PrecursoEmailGate>
      <PrecursoContent />
    </PrecursoEmailGate>
  )
}
