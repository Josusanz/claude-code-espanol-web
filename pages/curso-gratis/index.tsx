import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { MODULOS_GRATIS, TOTAL_LECCIONES_GRATIS } from '../../lib/curso-gratis-data'
import { useTheme, ThemeToggleButton, THEME_GLOBAL_CSS } from '../../lib/theme-utils'

const PROGRESS_KEY = 'curso-gratis-progress'

const NIVEL_COLORS: Record<string, { light: string; dark: string; text: string; textDark: string }> = {
  principiante: { light: '#d1fae5', dark: 'rgba(34,197,94,0.15)', text: '#065f46', textDark: '#4ade80' },
  intermedio: { light: '#dbeafe', dark: 'rgba(59,130,246,0.15)', text: '#1e40af', textDark: '#60a5fa' },
}

function Dashboard() {
  const { isDark, toggleTheme, t, mounted } = useTheme()
  const [progress, setProgress] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY)
      if (saved) setProgress(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [])

  const completedLessons = Object.values(progress).filter(Boolean).length
  const progressPercent = Math.round((completedLessons / TOTAL_LECCIONES_GRATIS) * 100)

  const getModuleProgress = (moduleId: string, lecciones: { href: string }[]) => {
    const completed = lecciones.filter(l => progress[`${moduleId}:${l.href}`]).length
    return { completed, total: lecciones.length }
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
        <title>Curso Gratis de Claude Code en Español | 47 lecciones</title>
        <meta name="description" content="Aprende a crear software con IA — 47 lecciones gratuitas en español. Desde cero hasta proyectos reales con Claude Code." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.aprende.software/curso-gratis" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aprende.software/curso-gratis" />
        <meta property="og:title" content="Curso Gratis de Claude Code en Español | 47 lecciones" />
        <meta property="og:description" content="Aprende a crear software con IA — 47 lecciones gratuitas. Desde cero hasta proyectos reales." />
        <meta property="og:site_name" content="aprende.software" />
        <meta property="og:locale" content="es_ES" />

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
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
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
              📚
            </div>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 700,
                color: t.text,
                letterSpacing: '-0.02em',
              }}>
                Curso Gratis
              </h1>
              <p style={{ margin: 0, fontSize: '12px', color: t.textTertiary }}>
                aprende.software
              </p>
            </div>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ThemeToggleButton isDark={isDark} toggleTheme={toggleTheme} />
            <Link href="/curso-negocio" style={{
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
              Curso Premium
            </Link>
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

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: '16px',
            position: 'relative',
          }}>
            ✨ 100% Gratis
          </div>

          <h2 style={{
            margin: '0 0 8px',
            fontSize: 'clamp(22px, 4vw, 30px)',
            fontWeight: 800,
            position: 'relative',
            letterSpacing: '-0.02em',
          }}>
            Aprende a crear software con IA
          </h2>
          <p style={{
            margin: '0 0 24px',
            fontSize: '16px',
            opacity: 0.9,
            maxWidth: '600px',
            lineHeight: 1.6,
            position: 'relative',
          }}>
            {TOTAL_LECCIONES_GRATIS} lecciones gratuitas en 7 modulos. Desde cero hasta proyectos reales. En espanol.
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
              <span>{completedLessons}/{TOTAL_LECCIONES_GRATIS} lecciones</span>
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

        {/* Quick links */}
        <div className="animate-fade-in delay-1" style={{
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
            💬 Discord
          </a>
          <Link href="/" style={{
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
            🏠 Inicio
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
          {MODULOS_GRATIS.map((modulo, index) => {
            const moduleProgress = getModuleProgress(modulo.id, modulo.lecciones)
            const isCompleted = moduleProgress.completed === moduleProgress.total && moduleProgress.total > 0
            const nivelColors = NIVEL_COLORS[modulo.nivel]

            return (
              <Link
                key={modulo.id}
                href={modulo.href}
                className={`animate-fade-in delay-${Math.min(index % 4 + 1, 4)} module-card`}
                style={{
                  display: 'block',
                  background: t.bgSecondary,
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
                ) : (
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
                )}

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

                {/* Progress bar per module */}
                {moduleProgress.completed > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{
                      height: '4px',
                      background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${Math.round((moduleProgress.completed / moduleProgress.total) * 100)}%`,
                        background: isCompleted ? '#22c55e' : t.accent,
                        borderRadius: '2px',
                        transition: 'width 0.3s ease',
                      }} />
                    </div>
                    <p style={{
                      margin: '4px 0 0',
                      fontSize: '11px',
                      color: t.textTertiary,
                    }}>
                      {moduleProgress.completed}/{moduleProgress.total} completadas
                    </p>
                  </div>
                )}

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
                    background: isDark ? nivelColors.dark : nivelColors.light,
                    color: isDark ? nivelColors.textDark : nivelColors.text,
                  }}>
                    {modulo.nivel === 'principiante' ? 'Principiante' : 'Intermedio'}
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
                  <span style={{
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 500,
                    borderRadius: '6px',
                    background: t.bgTertiary,
                    color: t.textTertiary,
                  }}>
                    {modulo.totalLecciones} {modulo.totalLecciones === 1 ? 'leccion' : 'lecciones'}
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
          <strong>💡 Orden recomendado:</strong> Los modulos estan ordenados de forma progresiva (1 → 7). Empieza por Modo Facil si nunca has usado IA, o por Instalacion si quieres usar la terminal directamente.
        </div>

        {/* Upgrade CTA */}
        <div className="animate-fade-in delay-4" style={{
          marginTop: '24px',
          padding: '24px 28px',
          background: isDark ? 'rgba(94,106,210,0.08)' : 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
          border: `1px solid ${isDark ? 'rgba(94,106,210,0.15)' : '#c7d2fe'}`,
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: isDark ? '#a5b4fc' : '#3730a3' }}>
              ¿Quieres crear un SaaS completo?
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: isDark ? '#818cf8' : '#4338ca', lineHeight: 1.5 }}>
              El curso de pago te lleva de cero a lanzar tu propio producto en 10 semanas.
            </p>
          </div>
          <Link href="/curso-negocio" style={{
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#fff',
            background: t.accent,
            borderRadius: '10px',
            textDecoration: 'none',
            boxShadow: `0 2px 8px ${t.glowStrong}`,
            flexShrink: 0,
          }}>
            Ver curso premium →
          </Link>
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

export default function CursoGratisPage() {
  return <Dashboard />
}

// Bypass Nextra layout — standalone page
CursoGratisPage.getLayout = (page: React.ReactElement) => page
