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
      return data.email || null
    }
  } catch {
    // Ignore
  }
  return null
}

// Helper para sincronizar progreso con el servidor
async function syncProgressToServer(email: string, progress: Record<string, boolean>) {
  try {
    await fetch('/api/precurso/sync-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, progress })
    })
  } catch (error) {
    console.error('[Precurso] Error syncing progress:', error)
  }
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

  // Cargar progreso (localStorage primero, luego servidor)
  useEffect(() => {
    const email = getUserEmail()
    setUserEmail(email)

    const loadProgress = async () => {
      // Primero cargar de localStorage para mostrar algo rápido
      const saved = localStorage.getItem('precurso-progress')
      if (saved) {
        setCompleted(JSON.parse(saved))
      }

      // Si hay email, intentar cargar del servidor y hacer merge
      if (email) {
        const serverProgress = await loadProgressFromServer(email)
        if (serverProgress) {
          const localProgress = saved ? JSON.parse(saved) : {}
          // Merge: tomar el valor true de cualquiera de los dos
          const merged: Record<string, boolean> = {}
          const allKeys = new Set([...Object.keys(localProgress), ...Object.keys(serverProgress)])
          allKeys.forEach(key => {
            merged[key] = localProgress[key] || serverProgress[key] || false
          })

          setCompleted(merged)
          localStorage.setItem('precurso-progress', JSON.stringify(merged))

          // Si hay diferencias, sincronizar el merge de vuelta al servidor
          if (JSON.stringify(merged) !== JSON.stringify(serverProgress)) {
            syncProgressToServer(email, merged)
          }
        }
      }

      setInitialized(true)
    }

    loadProgress()
  }, [])

  const toggle = (id: string) => {
    const newCompleted = { ...completed, [id]: !completed[id] }
    setCompleted(newCompleted)
    localStorage.setItem('precurso-progress', JSON.stringify(newCompleted))

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
      <header style={{
        background: t.bg,
        borderBottom: `1px solid ${t.border}`,
        padding: '16px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '14px'
          }}>P</div>
          <span style={{ fontWeight: 600, fontSize: '17px' }}>Precurso</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Progress pill */}
          <div style={{
            padding: '8px 16px',
            background: progress === 100 ? t.successLight : t.bgSecondary,
            borderRadius: '100px',
            fontSize: '14px',
            fontWeight: 500,
            color: progress === 100 ? t.success : t.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: progress === 100 ? t.success : t.accent
            }} />
            {completedCount}/{totalCount} completado
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: `1px solid ${t.border}`,
              background: t.bgSecondary,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              transition: 'all 0.2s'
            }}
            title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
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
        <main style={{ flex: 1, padding: '40px 56px', maxWidth: '900px' }}>
          {/* Hero */}
          <div style={{ marginBottom: '48px' }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 700,
              marginBottom: '16px',
              color: t.text,
              lineHeight: 1.2
            }}>
              Bienvenido al Precurso 👋
            </h1>
            <p style={{
              fontSize: '18px',
              color: t.textSecondary,
              lineHeight: 1.7,
              maxWidth: '600px'
            }}>
              Antes de crear software con IA, necesitas conocer algunos términos y tener las herramientas instaladas. <strong style={{ color: t.text }}>No vas a programar</strong> — solo entender lo básico.
            </p>
          </div>

          {/* Progress bar */}
          <div style={{
            marginBottom: '40px',
            padding: '24px',
            background: t.bgSecondary,
            borderRadius: '16px',
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Intro: Programar con IA */}
            <Link href="/precurso/programar-con-ia" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '28px',
              background: introCompleted ? t.successLight : t.bgSecondary,
              border: `1px solid ${introCompleted ? t.success : t.border}`,
              borderRadius: '16px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: introCompleted
                  ? t.success
                  : 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0,
                color: 'white'
              }}>
                {introCompleted ? '✓' : '🤖'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{
                    padding: '2px 8px',
                    background: t.warningLight,
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: t.warning
                  }}>EMPIEZA AQUÍ</span>
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 6px 0'
                }}>
                  ¿Por qué ya no necesitas saber programar?
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: t.textSecondary,
                  margin: 0
                }}>
                  Entiende cómo la IA ha cambiado las reglas del juego
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: introCompleted ? t.success : t.textMuted,
                  fontWeight: 500
                }}>
                  {introCompleted ? 'Completado' : '5 min'}
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={introCompleted ? t.success : t.textMuted} strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </Link>

            {/* Glosario */}
            <Link href="/precurso/glosario" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '28px',
              background: glosarioCompleted ? t.successLight : t.bgSecondary,
              border: `1px solid ${glosarioCompleted ? t.success : t.border}`,
              borderRadius: '16px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: glosarioCompleted
                  ? t.success
                  : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0,
                color: 'white'
              }}>
                {glosarioCompleted ? '✓' : '📚'}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 6px 0'
                }}>
                  Glosario de términos
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: t.textSecondary,
                  margin: 0
                }}>
                  Los conceptos esenciales para entender lo que hace Claude Code
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: glosarioCompleted ? t.success : t.textMuted,
                  fontWeight: 500
                }}>
                  {glosarioCompleted ? 'Completado' : '6 secciones'}
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={glosarioCompleted ? t.success : t.textMuted} strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </Link>

            {/* Requisitos */}
            <Link href="/precurso/requisitos" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '28px',
              background: requisitosCompleted ? t.successLight : t.bgSecondary,
              border: `1px solid ${requisitosCompleted ? t.success : t.border}`,
              borderRadius: '16px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: requisitosCompleted
                  ? t.success
                  : 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0,
                color: 'white'
              }}>
                {requisitosCompleted ? '✓' : '🛠️'}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 6px 0'
                }}>
                  Requisitos técnicos
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: t.textSecondary,
                  margin: 0
                }}>
                  Las herramientas y cuentas que necesitas antes de empezar
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: requisitosCompleted ? t.success : t.textMuted,
                  fontWeight: 500
                }}>
                  {requisitosCompleted ? 'Completado' : `${reqCompletedCount}/5 instalados`}
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={requisitosCompleted ? t.success : t.textMuted} strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </Link>

            {/* Errores Comunes */}
            <Link href="/precurso/errores-comunes" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '28px',
              background: t.bgSecondary,
              border: `1px solid ${t.border}`,
              borderRadius: '16px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0,
                color: 'white'
              }}>
                🔧
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 6px 0'
                }}>
                  Errores comunes
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: t.textSecondary,
                  margin: 0
                }}>
                  Soluciones a los problemas más frecuentes
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: t.textMuted,
                  fontWeight: 500
                }}>
                  ⏱️ 5 min
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </Link>

            {/* Quiz */}
            <Link href="/precurso/quiz" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '28px',
              background: completed['quiz-aprobado'] ? t.successLight : t.bgSecondary,
              border: `1px solid ${completed['quiz-aprobado'] ? t.success : t.border}`,
              borderRadius: '16px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: completed['quiz-aprobado']
                  ? t.success
                  : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0,
                color: 'white'
              }}>
                {completed['quiz-aprobado'] ? '✓' : '✅'}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 6px 0'
                }}>
                  Quiz de conceptos
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: t.textSecondary,
                  margin: 0
                }}>
                  Verifica que entiendes lo básico (80% para aprobar)
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: completed['quiz-aprobado'] ? t.success : t.textMuted,
                  fontWeight: 500
                }}>
                  {completed['quiz-aprobado'] ? 'Aprobado' : '10 preguntas'}
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={completed['quiz-aprobado'] ? t.success : t.textMuted} strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </Link>

            {/* Primer Proyecto */}
            <Link href="/precurso/primer-proyecto" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '28px',
              background: completed['primer-proyecto'] ? t.successLight : t.bgSecondary,
              border: `1px solid ${completed['primer-proyecto'] ? t.success : t.border}`,
              borderRadius: '16px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: completed['primer-proyecto']
                  ? t.success
                  : 'linear-gradient(135deg, #ec4899, #db2777)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0,
                color: 'white'
              }}>
                {completed['primer-proyecto'] ? '✓' : '🚀'}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: t.text,
                  margin: '0 0 6px 0'
                }}>
                  Tu primer proyecto
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: t.textSecondary,
                  margin: 0
                }}>
                  Crea tu primera página web con Claude Code
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: completed['primer-proyecto'] ? t.success : t.textMuted,
                  fontWeight: 500
                }}>
                  {completed['primer-proyecto'] ? 'Completado' : '⏱️ 10 min'}
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={completed['primer-proyecto'] ? t.success : t.textMuted} strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </Link>
          </div>

          {/* Time estimate */}
          <div style={{
            marginTop: '32px',
            display: 'flex',
            gap: '24px',
            color: t.textMuted,
            fontSize: '14px'
          }}>
            <span>⏱️ ~50 minutos en total</span>
            <span>📱 Hazlo a tu ritmo</span>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
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
