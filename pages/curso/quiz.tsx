import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import CursoEmailGate from '../../components/CursoEmailGate'
import { usePrecursoProgress } from '../../lib/precurso-data'

const PREGUNTAS = [
  {
    id: 1,
    pregunta: '¿Qué es el Terminal?',
    opciones: [
      'Un programa para ver películas',
      'Una pantalla donde escribes comandos para hablar con tu computadora',
      'Un editor de texto',
      'Un navegador web'
    ],
    correcta: 1,
    explicacion: 'El terminal es como un chat con tu computadora. Escribes comandos y ella responde.'
  },
  {
    id: 2,
    pregunta: '¿Qué es el Frontend?',
    opciones: [
      'La base de datos',
      'El servidor',
      'Todo lo que el usuario ve: botones, colores, formularios',
      'El código secreto'
    ],
    correcta: 2,
    explicacion: 'Frontend es la parte visual de una app: lo que ves y tocas.'
  },
  {
    id: 3,
    pregunta: '¿Qué es el Backend?',
    opciones: [
      'El diseño de la página',
      'Lo que pasa detrás: guardar datos, enviar emails, procesar pagos',
      'Los colores de la app',
      'El logo de la empresa'
    ],
    correcta: 1,
    explicacion: 'Backend es la "trastienda": donde se procesa la información que el usuario no ve.'
  },
  {
    id: 4,
    pregunta: '¿Para qué sirve Git?',
    opciones: [
      'Para navegar por internet',
      'Para guardar versiones de tu código (como Ctrl+Z para proyectos)',
      'Para enviar emails',
      'Para hacer videollamadas'
    ],
    correcta: 1,
    explicacion: 'Git guarda el historial de cambios. Si algo se rompe, puedes volver atrás.'
  },
  {
    id: 5,
    pregunta: '¿Qué es un Commit en Git?',
    opciones: [
      'Un error en el código',
      'Una carpeta',
      'Un punto de guardado con un mensaje descriptivo',
      'Un tipo de archivo'
    ],
    correcta: 2,
    explicacion: 'Un commit es como "guardar partida" en un videojuego. Capturas el estado actual.'
  },
  {
    id: 6,
    pregunta: '¿Qué es npm?',
    opciones: [
      'Un lenguaje de programación',
      'La tienda de paquetes de JavaScript (código que otros crearon)',
      'Un navegador web',
      'Una red social'
    ],
    correcta: 1,
    explicacion: 'npm es como la App Store pero para código. Descargas paquetes que otros programadores crearon.'
  },
  {
    id: 7,
    pregunta: '¿Qué significa "Deploy"?',
    opciones: [
      'Borrar un archivo',
      'Publicar tu app para que cualquiera en el mundo pueda acceder',
      'Descargar una imagen',
      'Reiniciar la computadora'
    ],
    correcta: 1,
    explicacion: 'Deploy es "abrir las puertas" de tu app al público. Pasa de localhost a una URL real.'
  },
  {
    id: 8,
    pregunta: '¿Qué es localhost?',
    opciones: [
      'Un servidor en la nube',
      'Tu computadora actuando como servidor (solo tú puedes ver la app)',
      'Una página de Google',
      'Un tipo de virus'
    ],
    correcta: 1,
    explicacion: 'localhost es tu "servidor local". La app corre en tu máquina mientras desarrollas.'
  },
  {
    id: 9,
    pregunta: '¿Cuál es tu rol al programar con Claude Code?',
    opciones: [
      'Escribir todo el código manualmente',
      'Memorizar sintaxis de programación',
      'Ser el director: definir objetivos, dar contexto y revisar el trabajo',
      'No hacer nada'
    ],
    correcta: 2,
    explicacion: 'Tú eres el director. Defines qué quieres, das contexto, y Claude Code escribe el código.'
  },
  {
    id: 10,
    pregunta: '¿Qué necesitas para usar Claude Code?',
    opciones: [
      'Solo un navegador',
      'Una suscripción de Claude Pro ($20/mes) o Max ($100/mes)',
      'Saber programar en 5 lenguajes',
      'Un título universitario'
    ],
    correcta: 1,
    explicacion: 'Claude Code requiere una suscripción activa. Sin ella, no podrás usar la herramienta.'
  }
]

function QuizContent() {
  const { completed, toggle } = usePrecursoProgress()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const pregunta = PREGUNTAS[currentQuestion]
  const selectedAnswer = answers[pregunta.id]
  const isCorrect = selectedAnswer === pregunta.correcta

  const correctCount = PREGUNTAS.filter(p => answers[p.id] === p.correcta).length
  const percentage = Math.round((correctCount / PREGUNTAS.length) * 100)
  const passed = percentage >= 80

  const handleAnswer = (index: number) => {
    if (showExplanation) return
    setAnswers({ ...answers, [pregunta.id]: index })
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    setShowExplanation(false)
    if (currentQuestion < PREGUNTAS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      if (passed && !completed['quiz-aprobado']) {
        toggle('quiz-aprobado')
      }
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setShowExplanation(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafbfc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#1e293b'
    }}>
      <Head>
        <title>Quiz | Curso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'rgba(250, 251, 252, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '12px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/curso" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '8px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </Link>
          <span style={{ fontWeight: 600, fontSize: '16px', color: '#0f172a' }}>Quiz</span>
        </div>
        <button onClick={() => { localStorage.removeItem('precurso-access'); window.location.href = '/curso' }} style={{ padding: '8px 18px', fontSize: '13px', fontWeight: 600, color: '#64748b', background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>Salir</button>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        {!showResults ? (
          <>
            {/* Progress bar */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>
                  Pregunta {currentQuestion + 1} de {PREGUNTAS.length}
                </span>
                <span style={{ fontSize: '14px', color: '#94a3b8' }}>
                  {Object.keys(answers).length} respondidas
                </span>
              </div>
              <div style={{
                height: '8px',
                background: '#f1f5f9',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${((currentQuestion + 1) / PREGUNTAS.length) * 100}%`,
                  background: '#5e6ad2',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Question card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(0,0,0,0.06)'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '28px', lineHeight: 1.4 }}>
                {pregunta.pregunta}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pregunta.opciones.map((opcion, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrectAnswer = index === pregunta.correcta

                  let bgColor = '#fafbfc'
                  let borderColor = 'rgba(0,0,0,0.06)'

                  if (showExplanation) {
                    if (isCorrectAnswer) {
                      bgColor = '#f0fdf4'
                      borderColor = '#22c55e'
                    } else if (isSelected && !isCorrectAnswer) {
                      bgColor = '#fef2f2'
                      borderColor = '#ef4444'
                    }
                  } else if (isSelected) {
                    bgColor = '#eef2ff'
                    borderColor = '#5e6ad2'
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showExplanation}
                      style={{
                        padding: '18px 20px',
                        background: bgColor,
                        border: `2px solid ${borderColor}`,
                        borderRadius: '12px',
                        textAlign: 'left',
                        fontSize: '16px',
                        color: '#1e293b',
                        cursor: showExplanation ? 'default' : 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: showExplanation && isCorrectAnswer ? '#22c55e' : '#f1f5f9',
                        color: showExplanation && isCorrectAnswer ? 'white' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        flexShrink: 0
                      }}>
                        {showExplanation && isCorrectAnswer ? '✓' : String.fromCharCode(65 + index)}
                      </span>
                      {opcion}
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div style={{
                  marginTop: '24px',
                  padding: '20px',
                  background: isCorrect ? '#f0fdf4' : '#fef2f2',
                  borderRadius: '12px',
                  borderLeft: `4px solid ${isCorrect ? '#22c55e' : '#ef4444'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{isCorrect ? '✅' : '❌'}</span>
                    <span style={{ fontWeight: 600, color: isCorrect ? '#22c55e' : '#ef4444' }}>
                      {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                    {pregunta.explicacion}
                  </p>
                </div>
              )}

              {/* Next button */}
              {showExplanation && (
                <button
                  onClick={nextQuestion}
                  style={{
                    marginTop: '24px',
                    width: '100%',
                    padding: '16px',
                    background: '#5e6ad2',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {currentQuestion < PREGUNTAS.length - 1 ? 'Siguiente pregunta →' : 'Ver resultados'}
                </button>
              )}
            </div>
          </>
        ) : (
          /* Results */
          <div style={{
            background: passed ? '#f0fdf4' : '#fef2f2',
            borderRadius: '24px',
            padding: '48px 32px',
            textAlign: 'center',
            border: `2px solid ${passed ? '#22c55e' : '#ef4444'}`
          }}>
            <div style={{ fontSize: '80px', marginBottom: '24px' }}>
              {passed ? '🎉' : '📚'}
            </div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: passed ? '#22c55e' : '#ef4444',
              marginBottom: '16px'
            }}>
              {passed ? '¡Quiz aprobado!' : 'Necesitas repasar'}
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '32px' }}>
              Has acertado <strong>{correctCount}</strong> de <strong>{PREGUNTAS.length}</strong> preguntas ({percentage}%)
            </p>

            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {!passed && (
                <button
                  onClick={resetQuiz}
                  style={{
                    padding: '16px 32px',
                    background: '#5e6ad2',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  🔄 Intentar de nuevo
                </button>
              )}
              {passed && (
                <Link href="/curso/primer-proyecto" style={{
                  padding: '16px 32px',
                  background: '#22c55e',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}>
                  🚀 Ir a tu primer proyecto
                </Link>
              )}
              <Link href="/curso/glosario" style={{
                padding: '16px 32px',
                background: 'white',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '12px',
                color: '#1e293b',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer',
                textDecoration: 'none'
              }}>
                📚 Repasar glosario
              </Link>
            </div>

            {passed && (
              <p style={{ marginTop: '32px', fontSize: '14px', color: '#94a3b8' }}>
                Necesitas 80% para aprobar. ¡Lo has conseguido!
              </p>
            )}
            {!passed && (
              <p style={{ marginTop: '32px', fontSize: '14px', color: '#94a3b8' }}>
                Necesitas 80% para aprobar. Repasa el glosario y vuelve a intentarlo.
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Link href="/curso/requisitos" style={{
            padding: '14px 24px',
            background: 'white',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '12px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 500
          }}>
            ← Requisitos
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function QuizPage() {
  return (
    <CursoEmailGate>
      <QuizContent />
    </CursoEmailGate>
  )
}
