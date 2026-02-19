import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { MODULOS_AUTOGUIADO } from '../../lib/curso-autoguiado-data'
import { useTheme, ThemeToggleButton, THEME_GLOBAL_CSS } from '../../lib/theme-utils'
import OnboardingChecklist from '../../components/OnboardingChecklist'

interface ModuloUnlockStatus {
  unlocked: boolean
  availableDate: string
  daysRemaining: number
}

const NIVEL_BADGE: Record<string, { label: string }> = {
  principiante: { label: 'Principiante' },
  intermedio: { label: 'Intermedio' },
  avanzado: { label: 'Avanzado' },
}

function formatUnlockDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
}

function Dashboard() {
  const { isDark, toggleTheme, t, mounted } = useTheme()
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [unlockStatus, setUnlockStatus] = useState<Record<number, ModuloUnlockStatus> | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('autoguiado-progress')
      if (saved) {
        setProgress(JSON.parse(saved))
      }
    } catch {
      // Ignore
    }
    try {
      const savedAccess = localStorage.getItem('precurso-access')
      if (savedAccess) {
        const data = JSON.parse(savedAccess)
        if (data.authenticated && data.email) {
          setIsLoggedIn(true)
          setUserEmail(data.email.toLowerCase().trim())
        }
      }
    } catch {
      // Ignore
    }
  }, [])

  // Fetch unlock status when logged in
  useEffect(() => {
    if (!userEmail) return
    fetch(`/api/autoguiado/unlock-status?email=${encodeURIComponent(userEmail)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.modulos) {
          setUnlockStatus(data.modulos)
        }
      })
      .catch(() => {})
  }, [userEmail])

  const completedCount = MODULOS_AUTOGUIADO.filter(m => progress[`autoguiado-modulo-${m.num}`]).length
  const totalModulos = MODULOS_AUTOGUIADO.length
  const progressPercent = Math.round((completedCount / totalModulos) * 100)

  const handleLogout = () => {
    localStorage.removeItem('precurso-access')
    window.location.href = '/curso'
  }

  if (!mounted) return null

  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: t.text,
      transition: 'background 0.3s, color 0.3s',
    }}>
      <Head>
        <title>Crea tu Software con IA | Curso Autoguiado</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Sticky Nav */}
      <header style={{
        background: t.navBg,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${t.border}`,
        padding: '14px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'all 0.3s',
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: `linear-gradient(135deg, ${t.accent}, ${t.accentHover})`,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}>
              🚀
            </div>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 700,
                color: t.text,
                letterSpacing: '-0.02em',
              }}>
                Crea tu Software con IA
              </h1>
              <p style={{ margin: 0, fontSize: '12px', color: t.textTertiary }}>
                Curso autoguiado
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ThemeToggleButton isDark={isDark} toggleTheme={toggleTheme} />
            {isLoggedIn && (
              <Link href="/curso/themes" style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                color: t.accent,
                background: t.glow,
                border: `1px solid ${t.border}`,
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}>
                🎨 Themes
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: t.textSecondary,
                  background: 'transparent',
                  border: `1px solid ${t.border}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Salir
              </button>
            ) : (
              <Link href="/precurso" style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#fff',
                background: t.accent,
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: `0 2px 8px ${t.glowStrong}`,
                transition: 'all 0.2s',
              }}>
                Iniciar sesion
              </Link>
            )}
          </div>
        </div>
      </header>

      <main style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '32px 24px 80px',
      }}>
        {/* Hero section */}
        <div className="animate-fade-in" style={{
          background: `linear-gradient(135deg, ${t.accent}, ${t.accentHover})`,
          borderRadius: '20px',
          padding: '40px 32px',
          color: 'white',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />
          <h2 style={{
            margin: '0 0 8px',
            fontSize: 'clamp(22px, 4vw, 28px)',
            fontWeight: 800,
            position: 'relative',
            letterSpacing: '-0.02em',
          }}>
            Tu camino para crear software con IA
          </h2>
          <p style={{
            margin: '0 0 24px',
            fontSize: '16px',
            opacity: 0.9,
            maxWidth: '600px',
            lineHeight: 1.6,
            position: 'relative',
          }}>
            11 modulos, a tu ritmo. Desde cero hasta lanzar tu propio SaaS.
          </p>

          {/* Progress bar */}
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '13px',
              fontWeight: 600,
            }}>
              <span>Progreso total</span>
              <span>{completedCount}/{totalModulos} modulos</span>
            </div>
            <div style={{
              height: '10px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '5px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: 'white',
                borderRadius: '5px',
                transition: 'width 0.5s ease',
              }} />
            </div>
          </div>
        </div>

        {/* Onboarding checklist */}
        {!isLoggedIn && (
          <div className="animate-fade-in delay-1">
            <OnboardingChecklist isDark={isDark} t={t} />
          </div>
        )}

        {/* Welcome banner for non-logged users */}
        {!isLoggedIn && (
          <div className="animate-fade-in delay-1" style={{
            background: isDark ? '#0a1f0a' : 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
            border: `1px solid ${isDark ? 'rgba(34,197,94,0.2)' : '#a7f3d0'}`,
            borderRadius: '16px',
            padding: '24px 28px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: isDark ? '#4ade80' : '#065f46' }}>
                Empieza gratis con el Modulo 0
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: isDark ? '#86efac' : '#047857', lineHeight: 1.5 }}>
                Construye y publica tu primera web con IA en menos de 1 hora. Sin experiencia previa.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
              <Link href="/curso-crea-tu-software/modulo/0" style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                background: '#059669',
                borderRadius: '10px',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)',
              }}>
                Empezar gratis
              </Link>
              <Link href="/precurso" style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 500,
                color: isDark ? '#86efac' : '#065f46',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
                border: `1px solid ${isDark ? 'rgba(34,197,94,0.2)' : '#a7f3d0'}`,
                borderRadius: '10px',
                textDecoration: 'none',
              }}>
                Ya tengo acceso
              </Link>
            </div>
          </div>
        )}

        {/* Quick links */}
        <div className="animate-fade-in delay-2" style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}>
          <a
            href="https://discord.gg/PeqyDhSBEh"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: t.bgSecondary,
              border: `1px solid ${t.border}`,
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#5865F2',
              textDecoration: 'none',
              boxShadow: `0 1px 3px ${t.glow}`,
              transition: 'all 0.2s',
            }}
          >
            💬 Discord del curso
          </a>
          <Link href="/fundamentos" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: t.bgSecondary,
            border: `1px solid ${t.border}`,
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 500,
            color: t.textSecondary,
            textDecoration: 'none',
            boxShadow: `0 1px 3px ${t.glow}`,
            transition: 'all 0.2s',
          }}>
            📚 Lecciones gratuitas
          </Link>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: t.border,
          marginBottom: '28px',
        }} />

        {/* Module grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {MODULOS_AUTOGUIADO.map((modulo, index) => {
            const isCompleted = progress[`autoguiado-modulo-${modulo.num}`]
            const badge = NIVEL_BADGE[modulo.nivel]
            const moduloUnlock = unlockStatus?.[modulo.num]
            const isLocked = isLoggedIn && !modulo.gratis && moduloUnlock && !moduloUnlock.unlocked

            return (
              <Link
                key={modulo.num}
                href={isLocked ? '#' : `/curso-crea-tu-software/modulo/${modulo.num}`}
                onClick={isLocked ? (e: React.MouseEvent) => e.preventDefault() : undefined}
                className={`animate-fade-in delay-${Math.min(index % 4 + 1, 4)} module-card`}
                style={{
                  display: 'block',
                  background: isLocked ? t.bgTertiary : t.bgSecondary,
                  border: isCompleted
                    ? `2px solid ${isDark ? '#16a34a' : '#22c55e'}`
                    : `1px solid ${t.border}`,
                  borderRadius: '16px',
                  padding: '24px',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: `0 1px 3px ${t.glow}`,
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: isLocked ? 0.6 : 1,
                  cursor: isLocked ? 'default' : 'pointer',
                }}
              >
                {/* Status indicator */}
                {isCompleted ? (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '28px',
                    height: '28px',
                    background: '#22c55e',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 700,
                  }}>
                    ✓
                  </div>
                ) : modulo.gratis ? (
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: isDark ? '#4ade80' : '#065f46',
                    background: isDark ? 'rgba(34,197,94,0.15)' : '#d1fae5',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Gratis
                  </span>
                ) : isLocked && moduloUnlock ? (
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: isDark ? '#fbbf24' : '#92400e',
                    background: isDark ? 'rgba(251,191,36,0.12)' : '#fef3c7',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    🔒 {formatUnlockDate(moduloUnlock.availableDate)}
                  </span>
                ) : !isLoggedIn ? (
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    fontSize: '18px',
                    opacity: 0.4,
                  }}>
                    🔒
                  </span>
                ) : null}

                {/* Module number + emoji */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                }}>
                  <span style={{
                    width: '44px',
                    height: '44px',
                    background: isCompleted
                      ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                      : `linear-gradient(135deg, ${t.accent}, ${t.accentHover})`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    flexShrink: 0,
                  }}>
                    {modulo.emoji}
                  </span>
                  <div>
                    <p style={{
                      margin: 0,
                      fontSize: '11px',
                      fontWeight: 600,
                      color: t.textTertiary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Modulo {modulo.num}
                    </p>
                    <h3 style={{
                      margin: 0,
                      fontSize: '16px',
                      fontWeight: 700,
                      color: t.text,
                      lineHeight: 1.3,
                      letterSpacing: '-0.01em',
                    }}>
                      {modulo.titulo}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  margin: '0 0 16px',
                  fontSize: '14px',
                  color: t.textSecondary,
                  lineHeight: 1.5,
                }}>
                  {modulo.descripcion}
                </p>

                {/* Footer: badges */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 600,
                    borderRadius: '6px',
                    background: t.glow,
                    color: t.accent,
                    border: `1px solid ${t.border}`,
                  }}>
                    {badge.label}
                  </span>
                  <span style={{
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 500,
                    borderRadius: '6px',
                    background: t.bgTertiary,
                    color: t.textTertiary,
                  }}>
                    ⏱ {modulo.duracion}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Recommended order note */}
        <div className="animate-fade-in delay-4" style={{
          marginTop: '32px',
          padding: '16px 20px',
          background: isDark ? 'rgba(251,191,36,0.08)' : '#fef9c3',
          border: `1px solid ${isDark ? 'rgba(251,191,36,0.15)' : '#fde047'}`,
          borderRadius: '12px',
          fontSize: '14px',
          color: isDark ? '#fbbf24' : '#854d0e',
          lineHeight: 1.6,
        }}>
          <strong>💡 Orden recomendado:</strong> Los modulos estan ordenados de forma progresiva (0 → 10). Puedes acceder a cualquiera en cualquier momento, pero te recomendamos seguir el orden para no perderte nada.
        </div>
      </main>

      <style jsx global>{`
        ${THEME_GLOBAL_CSS}
        .module-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px ${t.glowStrong} !important;
          border-color: ${t.borderHover} !important;
        }
        @media (max-width: 640px) {
          h2 { font-size: 22px !important; }
        }
      `}</style>
    </div>
  )
}

export default function CursoAutoguiadoPage() {
  return <Dashboard />
}
