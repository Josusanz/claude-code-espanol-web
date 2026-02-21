import Link from 'next/link'
import Modulo0Layout from '../../components/Modulo0Layout'
import { usePrecursoProgress } from '../../lib/precurso-data'
import { useState } from 'react'

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

function ReglasContent() {
  const [expandedRegla, setExpandedRegla] = useState<number | null>(1)
  const { completed, toggle } = usePrecursoProgress()
  const isCompleted = completed['reglas-prompting']

  const handleMarkComplete = () => {
    if (!isCompleted) {
      toggle('reglas-prompting')
    }
  }

  return (
    <>
        {/* Hero */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: '#eef2ff',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#5e6ad2',
            marginBottom: '16px'
          }}>
            🎯 Fundamental para el curso
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px', lineHeight: 1.2 }}>
            Las 7 Reglas de Prompting
          </h1>
          <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.6 }}>
            Con Claude Opus 4.6, el prompting funciona diferente. Estas reglas marcan la diferencia entre <strong style={{ color: '#1e293b' }}>usar</strong> Claude Code y <strong style={{ color: '#1e293b' }}>dominar</strong> Claude Code.
          </p>
        </div>

        {/* Reglas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {REGLAS.map(regla => (
            <div
              key={regla.num}
              style={{
                background: 'white',
                borderRadius: '16px',
                border: `1px solid ${expandedRegla === regla.num ? '#5e6ad2' : 'rgba(0,0,0,0.06)'}`,
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
                  background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
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
                  <div style={{ fontSize: '17px', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>
                    {regla.titulo}
                  </div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>
                    {regla.descripcion}
                  </div>
                </div>
                <svg
                  width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="#94a3b8" strokeWidth="2"
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
                  borderTop: '1px solid rgba(0,0,0,0.06)'
                }}>
                  <div style={{ paddingTop: '20px' }}>
                    {/* Mal vs Bien */}
                    {regla.mal && regla.bien && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                        <div style={{
                          padding: '14px 16px',
                          background: '#fef2f2',
                          borderRadius: '10px',
                          border: '1px solid #ef444430'
                        }}>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: '#ef4444', marginBottom: '6px' }}>
                            ❌ MAL
                          </div>
                          <div style={{ fontSize: '14px', color: '#1e293b', fontFamily: 'monospace' }}>
                            {regla.mal}
                          </div>
                        </div>
                        <div style={{
                          padding: '14px 16px',
                          background: '#f0fdf4',
                          borderRadius: '10px',
                          border: '1px solid #22c55e30'
                        }}>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: '#22c55e', marginBottom: '6px' }}>
                            ✅ BIEN
                          </div>
                          <div style={{ fontSize: '14px', color: '#1e293b', fontFamily: 'monospace' }}>
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
                            background: '#f1f5f9',
                            borderRadius: '8px',
                            marginBottom: '8px',
                            fontSize: '14px'
                          }}>
                            <span style={{ color: '#5e6ad2' }}>•</span>
                            {tip}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Ejemplos */}
                    {regla.ejemplos && (
                      <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '10px' }}>
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
                                background: '#f1f5f9',
                                borderRadius: '8px',
                                fontFamily: 'monospace'
                              }}>{ej.prompt}</div>
                              <div style={{
                                padding: '10px 12px',
                                background: '#eef2ff',
                                borderRadius: '8px',
                                color: '#5e6ad2'
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
                              background: '#f1f5f9',
                              borderRadius: '10px'
                            }}>
                              <span style={{ fontSize: '20px' }}>{n.emoji}</span>
                              <div style={{
                                padding: '4px 10px',
                                background: '#eef2ff',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#5e6ad2',
                                minWidth: '60px',
                                textAlign: 'center'
                              }}>{n.nivel}</div>
                              <span style={{ fontSize: '14px', color: '#64748b' }}>{n.cuando}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Prompts */}
                    {regla.prompts && (
                      <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '10px' }}>
                          PROMPTS QUE PUEDES USAR
                        </div>
                        {regla.prompts.map((prompt, i) => (
                          <div key={i} style={{
                            padding: '12px 14px',
                            background: '#f1f5f9',
                            borderRadius: '8px',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontFamily: 'monospace',
                            color: '#5e6ad2'
                          }}>
                            {prompt}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Explicacion */}
                    <div style={{
                      padding: '14px 16px',
                      background: '#fffbeb',
                      borderRadius: '10px',
                      border: '1px solid #f59e0b30'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ fontSize: '16px' }}>💡</span>
                        <p style={{ margin: 0, fontSize: '14px', color: '#1e293b', lineHeight: 1.5 }}>
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
          background: isCompleted ? '#f0fdf4' : 'linear-gradient(135deg, #5e6ad210, #5e6ad205)',
          borderRadius: '16px',
          border: `1px solid ${isCompleted ? '#22c55e' : '#5e6ad2'}30`,
          textAlign: 'center'
        }}>
          {isCompleted ? (
            <>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>✅</div>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600, color: '#22c55e' }}>
                ¡Sección completada!
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#64748b' }}>
                Ya dominas las 7 reglas de prompting
              </p>
            </>
          ) : (
            <>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600 }}>
                ¿Has leído las 7 reglas?
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#64748b' }}>
                Marca esta sección como completada para continuar
              </p>
              <button
                onClick={handleMarkComplete}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: '#22c55e',
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
          <Link href="/curso" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: isCompleted ? '#5e6ad2' : 'transparent',
            color: isCompleted ? 'white' : '#5e6ad2',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '15px',
            border: isCompleted ? 'none' : '1px solid #5e6ad2'
          }}>
            Volver al Curso →
          </Link>
        </div>
    </>
  )
}

export default function ReglasPromptingPage() {
  return (
    <Modulo0Layout title="Las 7 Reglas de Prompting">
      <ReglasContent />
    </Modulo0Layout>
  )
}
