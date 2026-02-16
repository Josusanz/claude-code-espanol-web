import Head from 'next/head'
import Link from 'next/link'
import PrecursoEmailGate from '../../components/PrecursoEmailGate'
import { usePrecursoProgress } from './index'
import { useState, useEffect } from 'react'

const REGLAS = [
  {
    num: 1,
    titulo: 'Dale Contexto, No Roles',
    descripcion: 'Claude infiere automáticamente el nivel de expertise necesario. No necesitas decirle quién ser.',
    mal: '"Actúa como un experto en React con 20 años de experiencia..."',
    bien: '[Sube tu contexto real] + "Analiza esto y dame los 3 problemas principales"',
    explicacion: 'Claude ya sabe cuándo necesita ser experto. Lo que necesita es CONTEXTO: qué estás haciendo, qué problema tienes, qué has intentado.'
  },
  {
    num: 2,
    titulo: 'Dilo Una Vez y Confía',
    descripcion: 'Claude sigue instrucciones con precisión a la primera. Si añades "recuerda que..." 5 veces, el resultado será PEOR.',
    tips: ['No repitas instrucciones', 'No insistas ni refuerces', 'Sé claro y directo una sola vez'],
    explicacion: 'Repetir instrucciones le confunde. Es como si le gritaras. Una instrucción clara > diez instrucciones repetidas.'
  },
  {
    num: 3,
    titulo: 'Explica el Por Qué, No Solo el Qué',
    descripcion: 'Cuando Claude entiende el POR QUÉ, generaliza mejor y adapta su comportamiento.',
    mal: '"NUNCA uses puntos suspensivos"',
    bien: '"Tu respuesta será leída por text-to-speech, evita puntos suspensivos porque no sabe pronunciarlos"',
    explicacion: 'Con el "por qué", Claude puede aplicar la misma lógica a casos similares que no habías pensado.'
  },
  {
    num: 4,
    titulo: 'Sé Explícito con las Acciones',
    descripcion: 'Claude sigue instrucciones al pie de la letra. La ambigüedad es tu enemigo.',
    ejemplos: [
      { prompt: '"Sugiere mejoras"', resultado: 'Te da una lista SIN tocar nada' },
      { prompt: '"Modifica esta función"', resultado: 'Hace los cambios directamente' },
      { prompt: '"Crea el componente"', resultado: 'Lo crea' },
      { prompt: '"Explícame cómo crear el componente"', resultado: 'Te explica sin crear nada' },
    ],
    explicacion: 'Hay una GRAN diferencia entre "sugiere" y "hazlo". Sé específico sobre lo que quieres.'
  },
  {
    num: 5,
    titulo: 'Usa el Control de Esfuerzo',
    descripcion: 'Claude decide automáticamente cuánto necesita razonar según la complejidad.',
    niveles: [
      { nivel: 'Max', cuando: 'Problemas muy difíciles, arquitectura compleja', emoji: '🔥' },
      { nivel: 'High', cuando: 'Buen equilibrio, desarrollo normal (defecto)', emoji: '⚡' },
      { nivel: 'Medium', cuando: 'Cuando sobre-piensa tareas simples', emoji: '🎯' },
      { nivel: 'Low', cuando: 'Respuestas rápidas y concisas', emoji: '💨' },
    ],
    explicacion: 'Para tareas simples puedes pedirle que vaya al grano. Para problemas complejos, déjalo pensar.'
  },
  {
    num: 6,
    titulo: 'Marca Puntos de Control',
    descripcion: 'Claude es persistente y no para hasta terminar. Si quieres mantenerte involucrado, dilo.',
    prompts: [
      '"Antes de hacer cualquier cambio, muéstrame tu plan y espera mi confirmación"',
      '"Trabajemos paso a paso. Consulta conmigo después de cada paso principal"',
      '"Dame primero el outline, luego desarrollaremos cada sección"'
    ],
    explicacion: 'Por defecto Claude va a intentar resolverlo todo. Si prefieres ir paso a paso, pídeselo explícitamente.'
  },
  {
    num: 7,
    titulo: 'Pídele que Te Destruya las Ideas',
    descripcion: 'Claude tiene criterio propio. NO es un "yes-man" que siempre te da la razón. Aprovéchalo.',
    prompts: [
      '"¿Qué hay de malo en este plan? Sé implacable."',
      '"Dame 3 formas completamente diferentes de abordar esto"',
      '"¿Qué no estoy viendo?"',
      '"Actúa como abogado del diablo"'
    ],
    explicacion: 'Uno de los superpoderes de Claude es su capacidad de criticar constructivamente. Úsalo.'
  },
]

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
    error: '#ef4444',
    errorLight: '#fef2f2',
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
    error: '#f87171',
    errorLight: 'rgba(248, 113, 113, 0.1)',
  }
}

function ReglasContent() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [expandedRegla, setExpandedRegla] = useState<number | null>(1)
  const { completed, toggle } = usePrecursoProgress()
  const t = themes[theme]
  const isCompleted = completed['reglas-prompting']

  useEffect(() => {
    const saved = localStorage.getItem('precurso-theme') as 'light' | 'dark' | null
    if (saved) setTheme(saved)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('precurso-theme', newTheme)
  }

  const handleMarkComplete = () => {
    if (!isCompleted) {
      toggle('reglas-prompting')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: t.text
    }}>
      <Head>
        <title>7 Reglas de Prompting | Precurso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: t.bg,
        borderBottom: `1px solid ${t.border}`,
        padding: '12px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link href="/precurso" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          color: t.text
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.textSecondary} strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span style={{ fontSize: '14px', color: t.textSecondary }}>Volver al precurso</span>
        </Link>

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
            justifyContent: 'center'
          }}
        >
          {theme === 'light' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.textSecondary} strokeWidth="2">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.textSecondary} strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Hero */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: t.accentLight,
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 500,
            color: t.accent,
            marginBottom: '16px'
          }}>
            🎯 Fundamental para el curso
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px', lineHeight: 1.2 }}>
            Las 7 Reglas de Prompting
          </h1>
          <p style={{ fontSize: '17px', color: t.textSecondary, lineHeight: 1.6 }}>
            Con Claude Opus 4.6, el prompting funciona diferente. Estas reglas marcan la diferencia entre <strong style={{ color: t.text }}>usar</strong> Claude Code y <strong style={{ color: t.text }}>dominar</strong> Claude Code.
          </p>
        </div>

        {/* Reglas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {REGLAS.map(regla => (
            <div
              key={regla.num}
              style={{
                background: t.bgSecondary,
                borderRadius: '16px',
                border: `1px solid ${expandedRegla === regla.num ? t.accent : t.border}`,
                overflow: 'hidden',
                transition: 'all 0.2s'
              }}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedRegla(expandedRegla === regla.num ? null : regla.num)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: `linear-gradient(135deg, ${t.accent}, #8b5cf6)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '18px',
                  flexShrink: 0
                }}>{regla.num}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '17px', fontWeight: 600, color: t.text, marginBottom: '4px' }}>
                    {regla.titulo}
                  </div>
                  <div style={{ fontSize: '14px', color: t.textSecondary }}>
                    {regla.descripcion}
                  </div>
                </div>
                <svg
                  width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke={t.textMuted} strokeWidth="2"
                  style={{
                    transform: expandedRegla === regla.num ? 'rotate(180deg)' : 'rotate(0)',
                    transition: '0.2s',
                    flexShrink: 0
                  }}
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {/* Content */}
              {expandedRegla === regla.num && (
                <div style={{
                  padding: '0 24px 24px',
                  borderTop: `1px solid ${t.border}`
                }}>
                  <div style={{ paddingTop: '20px' }}>
                    {/* Mal vs Bien */}
                    {regla.mal && regla.bien && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                        <div style={{
                          padding: '14px 16px',
                          background: t.errorLight,
                          borderRadius: '10px',
                          border: `1px solid ${t.error}30`
                        }}>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: t.error, marginBottom: '6px' }}>
                            ❌ MAL
                          </div>
                          <div style={{ fontSize: '14px', color: t.text, fontFamily: 'monospace' }}>
                            {regla.mal}
                          </div>
                        </div>
                        <div style={{
                          padding: '14px 16px',
                          background: t.successLight,
                          borderRadius: '10px',
                          border: `1px solid ${t.success}30`
                        }}>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: t.success, marginBottom: '6px' }}>
                            ✅ BIEN
                          </div>
                          <div style={{ fontSize: '14px', color: t.text, fontFamily: 'monospace' }}>
                            {regla.bien}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tips */}
                    {regla.tips && (
                      <div style={{ marginBottom: '20px' }}>
                        {regla.tips.map((tip, i) => (
                          <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 14px',
                            background: t.bgTertiary,
                            borderRadius: '8px',
                            marginBottom: '8px',
                            fontSize: '14px'
                          }}>
                            <span style={{ color: t.accent }}>•</span>
                            {tip}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Ejemplos */}
                    {regla.ejemplos && (
                      <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: t.textMuted, marginBottom: '10px' }}>
                          EJEMPLOS
                        </div>
                        <div style={{ display: 'grid', gap: '8px' }}>
                          {regla.ejemplos.map((ej, i) => (
                            <div key={i} style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                              gap: '8px',
                              fontSize: '13px'
                            }}>
                              <div style={{
                                padding: '10px 12px',
                                background: t.bgTertiary,
                                borderRadius: '8px',
                                fontFamily: 'monospace'
                              }}>{ej.prompt}</div>
                              <div style={{
                                padding: '10px 12px',
                                background: t.accentLight,
                                borderRadius: '8px',
                                color: t.accent
                              }}>→ {ej.resultado}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Niveles */}
                    {regla.niveles && (
                      <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'grid', gap: '8px' }}>
                          {regla.niveles.map(n => (
                            <div key={n.nivel} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '12px 14px',
                              background: t.bgTertiary,
                              borderRadius: '10px'
                            }}>
                              <span style={{ fontSize: '20px' }}>{n.emoji}</span>
                              <div style={{
                                padding: '4px 10px',
                                background: t.accentLight,
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: t.accent,
                                minWidth: '60px',
                                textAlign: 'center'
                              }}>{n.nivel}</div>
                              <span style={{ fontSize: '14px', color: t.textSecondary }}>{n.cuando}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Prompts */}
                    {regla.prompts && (
                      <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: t.textMuted, marginBottom: '10px' }}>
                          PROMPTS QUE PUEDES USAR
                        </div>
                        {regla.prompts.map((prompt, i) => (
                          <div key={i} style={{
                            padding: '12px 14px',
                            background: t.bgTertiary,
                            borderRadius: '8px',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontFamily: 'monospace',
                            color: t.accent
                          }}>
                            {prompt}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Explicación */}
                    <div style={{
                      padding: '14px 16px',
                      background: t.warningLight,
                      borderRadius: '10px',
                      border: `1px solid ${t.warning}30`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ fontSize: '16px' }}>💡</span>
                        <p style={{ margin: 0, fontSize: '14px', color: t.text, lineHeight: 1.5 }}>
                          {regla.explicacion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mark as complete + CTA */}
        <div style={{
          marginTop: '40px',
          padding: '24px',
          background: isCompleted ? t.successLight : `linear-gradient(135deg, ${t.accent}10, ${t.accent}05)`,
          borderRadius: '16px',
          border: `1px solid ${isCompleted ? t.success : t.accent}30`,
          textAlign: 'center'
        }}>
          {isCompleted ? (
            <>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>✅</div>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600, color: t.success }}>
                ¡Sección completada!
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: '14px', color: t.textSecondary }}>
                Ya dominas las 7 reglas de prompting
              </p>
            </>
          ) : (
            <>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600 }}>
                ¿Has leído las 7 reglas?
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: '14px', color: t.textSecondary }}>
                Marca esta sección como completada para continuar
              </p>
              <button
                onClick={handleMarkComplete}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: t.success,
                  color: 'white',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '15px',
                  marginBottom: '12px'
                }}
              >
                ✓ Marcar como completado
              </button>
              <br />
            </>
          )}
          <Link href="/precurso" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: isCompleted ? t.accent : 'transparent',
            color: isCompleted ? 'white' : t.accent,
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '15px',
            border: isCompleted ? 'none' : `1px solid ${t.accent}`
          }}>
            Volver al Precurso →
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function ReglasPromptingPage() {
  return (
    <PrecursoEmailGate>
      <ReglasContent />
    </PrecursoEmailGate>
  )
}
