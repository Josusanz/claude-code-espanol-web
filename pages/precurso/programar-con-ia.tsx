import Head from 'next/head'
import Link from 'next/link'
import PrecursoEmailGate from '../../components/PrecursoEmailGate'
import { usePrecursoProgress, useTheme } from './index'

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

function ProgramarConIAContent() {
  const { completed, toggle } = usePrecursoProgress()
  const { theme, toggleTheme } = useTheme()
  const t = themes[theme]

  const isCompleted = completed['intro-completo']

  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: t.text,
      transition: 'background 0.2s, color 0.2s'
    }}>
      <Head>
        <title>Programar con IA | Precurso</title>
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
          <Link href="/precurso" style={{
            color: t.textMuted,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '8px',
            marginRight: '4px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </Link>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '14px'
          }}>P</div>
          <span style={{ fontWeight: 600, fontSize: '17px' }}>Programar con IA</span>
        </div>

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
            fontSize: '18px'
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 73px)' }}>
        {/* Sidebar */}
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
            <Link href="/precurso" style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px',
              color: t.textSecondary, textDecoration: 'none', fontSize: '14px', fontWeight: 600,
              borderLeft: '3px solid transparent'
            }}>
              <span>🏠</span> Inicio
            </Link>

            {/* This page - ACTIVE */}
            <div style={{ marginTop: '16px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 20px',
                color: t.accent, fontSize: '13px', fontWeight: 600, textTransform: 'uppercase',
                letterSpacing: '0.3px', background: t.accentLight, borderLeft: `3px solid ${t.accent}`, marginLeft: '-1px'
              }}>
                <span>🤖</span> Programar con IA
              </div>
              <a href="#el-cambio" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px'
              }}>El gran cambio</a>
              <a href="#que-necesitas" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px'
              }}>Qué necesitas saber</a>
              <a href="#tu-rol" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px'
              }}>Tu nuevo rol</a>
            </div>

            <div style={{ marginTop: '16px' }}>
              <Link href="/precurso/glosario" style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 20px',
                color: t.text, textDecoration: 'none', fontSize: '13px', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.3px'
              }}>
                <span>📚</span> Glosario
              </Link>
            </div>

            <div style={{ marginTop: '16px' }}>
              <Link href="/precurso/requisitos" style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 20px',
                color: t.text, textDecoration: 'none', fontSize: '13px', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.3px'
              }}>
                <span>🛠️</span> Requisitos
              </Link>
            </div>
          </nav>

          <div style={{
            margin: '24px 16px 0',
            padding: '16px',
            background: t.warningLight,
            borderRadius: '12px',
            border: `1px solid ${t.warning}30`
          }}>
            <p style={{ margin: 0, fontSize: '13px', color: t.warning }}>
              ¿Problemas? Escríbeme a{' '}
              <a href="mailto:josu@yenze.io" style={{ color: t.warning, fontWeight: 500 }}>
                josu@yenze.io
              </a>
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: '40px 56px', maxWidth: '800px' }}>
          {/* Hero */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{
              display: 'inline-block',
              padding: '6px 12px',
              background: t.warningLight,
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: 600,
              color: t.warning,
              marginBottom: '16px'
            }}>
              Lectura: 5 minutos
            </div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 700,
              marginBottom: '16px',
              color: t.text,
              lineHeight: 1.2
            }}>
              ¿Por qué ya no necesitas saber programar?
            </h1>
            <p style={{
              fontSize: '18px',
              color: t.textSecondary,
              lineHeight: 1.8
            }}>
              La IA ha cambiado las reglas del juego. Ahora puedes crear software sin escribir código —
              pero necesitas entender cómo funciona para dirigir a la IA correctamente.
            </p>
          </div>

          {/* Video tutorial */}
          <div style={{
            marginBottom: '48px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${t.border}`,
            background: t.bgSecondary
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: `1px solid ${t.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '24px' }}>🎬</span>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: t.text }}>
                  Video explicativo completo
                </div>
                <div style={{ fontSize: '13px', color: t.textSecondary }}>
                  Si prefieres ver en vez de leer (2 min)
                </div>
              </div>
            </div>
            <video
              controls
              style={{
                width: '100%',
                display: 'block',
                background: '#1a1a2e'
              }}
            >
              <source src="/videos/programar-con-ia.mp4" type="video/mp4" />
              Tu navegador no soporta videos HTML5.
            </video>
            <div style={{
              padding: '12px 20px',
              background: t.bgTertiary,
              fontSize: '13px',
              color: t.textMuted,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>🔊</span>
              <span>Este video incluye narración en español</span>
            </div>
          </div>

          {/* Section 1: El gran cambio */}
          <section id="el-cambio" style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: t.text,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                background: `linear-gradient(135deg, ${t.accent}, #8b5cf6)`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                color: 'white'
              }}>1</span>
              El gran cambio
            </h2>

            <div style={{
              background: t.bgSecondary,
              borderRadius: '16px',
              padding: '28px',
              marginBottom: '24px',
              border: `1px solid ${t.border}`
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: t.text, marginBottom: '16px' }}>
                Antes (programación tradicional)
              </h3>
              <ul style={{ margin: 0, padding: '0 0 0 20px', color: t.textSecondary, lineHeight: 2 }}>
                <li>Años aprendiendo sintaxis y lenguajes</li>
                <li>Memorizar funciones, librerías y frameworks</li>
                <li>Depurar errores crípticos durante horas</li>
                <li>Escribir cada línea de código manualmente</li>
              </ul>
            </div>

            <div style={{
              background: t.successLight,
              borderRadius: '16px',
              padding: '28px',
              border: `1px solid ${t.success}`
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: t.success, marginBottom: '16px' }}>
                Ahora (programación con IA)
              </h3>
              <ul style={{ margin: 0, padding: '0 0 0 20px', color: t.textSecondary, lineHeight: 2 }}>
                <li><strong style={{ color: t.text }}>Describes lo que quieres</strong> en lenguaje natural</li>
                <li><strong style={{ color: t.text }}>La IA escribe el código</strong> por ti</li>
                <li><strong style={{ color: t.text }}>Tú supervisas y diriges</strong> el resultado</li>
                <li><strong style={{ color: t.text }}>Iteras rápidamente</strong> hasta conseguir lo que buscas</li>
              </ul>
            </div>

            <p style={{
              marginTop: '24px',
              fontSize: '16px',
              color: t.textSecondary,
              lineHeight: 1.8,
              padding: '20px',
              background: t.bgTertiary,
              borderRadius: '12px',
              borderLeft: `4px solid ${t.accent}`
            }}>
              <strong style={{ color: t.text }}>Piensa en ello así:</strong> No necesitas saber construir un coche
              para conducir. Pero sí necesitas saber qué hacen los pedales, el volante, y las señales de tráfico.
            </p>
          </section>

          {/* Section 2: Qué necesitas saber */}
          <section id="que-necesitas" style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: t.text,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                background: `linear-gradient(135deg, ${t.accent}, #8b5cf6)`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                color: 'white'
              }}>2</span>
              Lo que SÍ necesitas saber
            </h2>

            <p style={{
              fontSize: '16px',
              color: t.textSecondary,
              lineHeight: 1.8,
              marginBottom: '24px'
            }}>
              No vas a escribir código, pero necesitas entender estos conceptos para comunicarte
              efectivamente con la IA:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                {
                  icon: '📂',
                  title: 'Estructura de archivos',
                  desc: 'Cómo se organizan las carpetas y archivos en un proyecto. La IA te preguntará "¿dónde quieres que ponga esto?"'
                },
                {
                  icon: '🌐',
                  title: 'Frontend vs Backend',
                  desc: 'Qué parte ve el usuario (frontend) y qué parte procesa datos (backend). Para saber qué pedir.'
                },
                {
                  icon: '🔀',
                  title: 'Git y versiones',
                  desc: 'Cómo guardar tu trabajo y volver atrás si algo sale mal. Es tu "Ctrl+Z" para proyectos enteros.'
                },
                {
                  icon: '🚀',
                  title: 'Deploy y producción',
                  desc: 'Cómo publicar tu app para que otros la usen. El paso final para mostrar tu creación al mundo.'
                },
                {
                  icon: '💬',
                  title: 'Saber explicar lo que quieres',
                  desc: 'Cuanto mejor describas tu idea, mejor código creará la IA. Es la habilidad más importante.'
                }
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '20px',
                  background: t.bgSecondary,
                  borderRadius: '12px',
                  border: `1px solid ${t.border}`
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    background: t.bgTertiary,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: t.text, margin: '0 0 4px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '14px', color: t.textSecondary, margin: 0, lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '24px',
              padding: '20px',
              background: t.accentLight,
              borderRadius: '12px',
              border: `1px solid ${t.accent}40`
            }}>
              <p style={{ margin: 0, fontSize: '15px', color: t.text }}>
                <strong>Todo esto lo aprenderás en el Glosario.</strong> Son conceptos, no código.
                No tienes que memorizar sintaxis ni comandos complicados.
              </p>
            </div>
          </section>

          {/* Section 3: Tu nuevo rol */}
          <section id="tu-rol" style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: t.text,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                background: `linear-gradient(135deg, ${t.accent}, #8b5cf6)`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                color: 'white'
              }}>3</span>
              Tu nuevo rol: Director de IA
            </h2>

            <p style={{
              fontSize: '16px',
              color: t.textSecondary,
              lineHeight: 1.8,
              marginBottom: '24px'
            }}>
              Piensa en Claude Code como un programador muy talentoso que trabaja para ti.
              Tu trabajo es ser un buen jefe:
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              {[
                { emoji: '🎯', title: 'Define el objetivo', desc: 'Qué quieres conseguir' },
                { emoji: '📋', title: 'Da contexto', desc: 'Información relevante' },
                { emoji: '👀', title: 'Revisa el trabajo', desc: 'Verifica que funcione' },
                { emoji: '🔄', title: 'Pide cambios', desc: 'Ajusta hasta que esté bien' }
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '20px',
                  background: t.bgSecondary,
                  borderRadius: '12px',
                  border: `1px solid ${t.border}`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.emoji}</div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: t.text, margin: '0 0 4px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: t.textSecondary, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              padding: '24px',
              background: `linear-gradient(135deg, ${t.accent}15, #8b5cf615)`,
              borderRadius: '16px',
              border: `1px solid ${t.accent}30`
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: t.text, margin: '0 0 12px' }}>
                Ejemplo real de cómo trabajarás:
              </h4>
              <div style={{
                background: t.bg,
                borderRadius: '8px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: t.textSecondary,
                lineHeight: 1.8
              }}>
                <p style={{ margin: '0 0 8px', color: t.accent }}>Tú:</p>
                <p style={{ margin: '0 0 16px', color: t.text }}>
                  "Crea una página web con un formulario de contacto. Que tenga campos para nombre,
                  email y mensaje. Cuando envíen el formulario, que me llegue un email."
                </p>
                <p style={{ margin: '0 0 8px', color: t.success }}>Claude Code:</p>
                <p style={{ margin: 0, color: t.text }}>
                  *Crea todos los archivos, configura el envío de emails, y te explica qué ha hecho*
                </p>
              </div>
            </div>
          </section>

          {/* Call to action */}
          <div style={{
            marginTop: '40px',
            padding: '32px',
            background: isCompleted ? t.successLight : t.bgSecondary,
            borderRadius: '16px',
            border: `1px solid ${isCompleted ? t.success : t.border}`,
            textAlign: 'center'
          }}>
            {isCompleted ? (
              <>
                <span style={{ fontSize: '48px' }}>🎉</span>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: t.success, margin: '12px 0 8px' }}>
                  ¡Entendido!
                </h3>
                <p style={{ fontSize: '15px', color: t.textSecondary, margin: '0 0 20px' }}>
                  Ahora ya sabes por qué puedes crear software sin saber programar.
                </p>
                <button
                  onClick={() => toggle('intro-completo')}
                  style={{
                    padding: '12px 24px',
                    background: t.bg,
                    border: `1px solid ${t.border}`,
                    borderRadius: '10px',
                    color: t.textSecondary,
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  Desmarcar
                </button>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: t.text, margin: '0 0 8px' }}>
                  ¿Lo tienes claro?
                </h3>
                <p style={{ fontSize: '14px', color: t.textSecondary, margin: '0 0 20px' }}>
                  No necesitas saber código, solo entender los conceptos para dirigir a la IA.
                </p>
                <button
                  onClick={() => toggle('intro-completo')}
                  style={{
                    padding: '16px 32px',
                    background: `linear-gradient(135deg, ${t.accent}, #8b5cf6)`,
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  ✓ Entendido, vamos al glosario
                </button>
              </>
            )}
          </div>

          {/* Navigation */}
          <div style={{
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: `1px solid ${t.border}`,
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Link href="/precurso" style={{
              padding: '14px 24px',
              background: t.bgSecondary,
              border: `1px solid ${t.border}`,
              borderRadius: '10px',
              color: t.textSecondary,
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Inicio
            </Link>
            <Link href="/precurso/glosario" style={{
              padding: '14px 24px',
              background: `linear-gradient(135deg, ${t.accent}, #8b5cf6)`,
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Siguiente: Glosario
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
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

export default function ProgramarConIAPage() {
  return (
    <PrecursoEmailGate>
      <ProgramarConIAContent />
    </PrecursoEmailGate>
  )
}
