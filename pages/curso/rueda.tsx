import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import CursoEmailGate from '../../components/CursoEmailGate'
import RuedaCreador from '../../components/RuedaCreador'

interface RuedaData {
  scores: number[]
  savedAt: string
}

interface UserRuedas {
  antes?: RuedaData
  despues?: RuedaData
}

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

function RuedaPageContent() {
  const [loading, setLoading] = useState(true)
  const [ruedas, setRuedas] = useState<UserRuedas>({})
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'antes' | 'despues' | 'comparar'>('antes')

  useEffect(() => {
    const email = getUserEmail()
    setUserEmail(email)

    if (email) {
      loadRuedas(email)
    } else {
      setLoading(false)
    }
  }, [])

  const loadRuedas = async (email: string) => {
    try {
      const res = await fetch(`/api/curso/rueda?email=${encodeURIComponent(email)}`)
      if (res.ok) {
        const data = await res.json()
        setRuedas(data.ruedas || {})

        // Si ya tiene la rueda "antes", mostrar comparación si también tiene "después"
        if (data.ruedas?.antes && data.ruedas?.despues) {
          setActiveTab('comparar')
        } else if (data.ruedas?.antes) {
          setActiveTab('antes')
        }
      }
    } catch (error) {
      console.error('Error loading ruedas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveRueda = async (tipo: 'antes' | 'despues', scores: number[]) => {
    if (!userEmail) return

    try {
      const res = await fetch('/api/curso/rueda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, tipo, scores })
      })

      if (res.ok) {
        const data = await res.json()
        setRuedas(data.ruedas || {})
      }
    } catch (error) {
      console.error('Error saving rueda:', error)
      throw error
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #334155',
          borderTop: '4px solid #6366f1',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#f1f5f9'
    }}>
      <Head>
        <title>Rueda del Creador | Curso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #334155',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/curso" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#94a3b8',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            ← Volver al curso
          </Link>
          <div style={{
            width: '1px',
            height: '24px',
            background: '#334155'
          }} />
          <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
            🎯 Rueda del Creador
          </h1>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Intro */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
          borderRadius: '16px',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}>
          <h2 style={{ margin: '0 0 12px', fontSize: '24px', fontWeight: 700 }}>
            Conoce tu punto de partida
          </h2>
          <p style={{ margin: 0, fontSize: '15px', color: '#94a3b8', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Esta rueda te ayuda a evaluar 8 áreas clave para crear tu proyecto.
            Complétala al inicio del curso y al final para ver tu transformación.
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('antes')}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 600,
              color: activeTab === 'antes' ? '#f1f5f9' : '#94a3b8',
              background: activeTab === 'antes' ? '#6366f1' : 'transparent',
              border: `1px solid ${activeTab === 'antes' ? '#6366f1' : '#334155'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            📍 Inicio del curso
            {ruedas.antes && <span style={{ marginLeft: '8px', opacity: 0.7 }}>✓</span>}
          </button>

          <button
            onClick={() => setActiveTab('despues')}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 600,
              color: activeTab === 'despues' ? '#f1f5f9' : '#94a3b8',
              background: activeTab === 'despues' ? '#22c55e' : 'transparent',
              border: `1px solid ${activeTab === 'despues' ? '#22c55e' : '#334155'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            🏆 Final del curso
            {ruedas.despues && <span style={{ marginLeft: '8px', opacity: 0.7 }}>✓</span>}
          </button>

          {ruedas.antes && ruedas.despues && (
            <button
              onClick={() => setActiveTab('comparar')}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 600,
                color: activeTab === 'comparar' ? '#1e293b' : '#94a3b8',
                background: activeTab === 'comparar' ? '#f59e0b' : 'transparent',
                border: `1px solid ${activeTab === 'comparar' ? '#f59e0b' : '#334155'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              📊 Comparar
            </button>
          )}
        </div>

        {/* Content based on tab */}
        {activeTab === 'antes' && (
          <div>
            {ruedas.antes ? (
              <div>
                <p style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#22c55e',
                  marginBottom: '16px'
                }}>
                  ✓ Completada el {formatDate(ruedas.antes.savedAt)}
                </p>
                <RuedaCreador
                  tipo="antes"
                  initialScores={ruedas.antes.scores}
                  onSave={(scores) => handleSaveRueda('antes', scores)}
                  readOnly={false}
                />
              </div>
            ) : (
              <RuedaCreador
                tipo="antes"
                onSave={(scores) => handleSaveRueda('antes', scores)}
              />
            )}
          </div>
        )}

        {activeTab === 'despues' && (
          <div>
            {!ruedas.antes ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: '#1e293b',
                borderRadius: '16px',
                border: '1px solid #334155'
              }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🔒</span>
                <h3 style={{ margin: '0 0 8px', fontSize: '18px' }}>
                  Primero completa tu rueda inicial
                </h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>
                  Necesitas tener un punto de partida para poder comparar al final del curso.
                </p>
                <button
                  onClick={() => setActiveTab('antes')}
                  style={{
                    marginTop: '20px',
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#f1f5f9',
                    background: '#6366f1',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                >
                  Ir a completar rueda inicial
                </button>
              </div>
            ) : ruedas.despues ? (
              <div>
                <p style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#22c55e',
                  marginBottom: '16px'
                }}>
                  ✓ Completada el {formatDate(ruedas.despues.savedAt)}
                </p>
                <RuedaCreador
                  tipo="despues"
                  initialScores={ruedas.despues.scores}
                  onSave={(scores) => handleSaveRueda('despues', scores)}
                  compareTo={ruedas.antes?.scores}
                />
              </div>
            ) : (
              <RuedaCreador
                tipo="despues"
                onSave={(scores) => handleSaveRueda('despues', scores)}
                compareTo={ruedas.antes?.scores}
              />
            )}
          </div>
        )}

        {activeTab === 'comparar' && ruedas.antes && ruedas.despues && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {/* Rueda Antes */}
              <div>
                <h3 style={{
                  textAlign: 'center',
                  margin: '0 0 16px',
                  fontSize: '16px',
                  color: '#6366f1'
                }}>
                  📍 Inicio ({formatDate(ruedas.antes.savedAt)})
                </h3>
                <RuedaCreador
                  tipo="antes"
                  initialScores={ruedas.antes.scores}
                  readOnly={true}
                />
              </div>

              {/* Rueda Después */}
              <div>
                <h3 style={{
                  textAlign: 'center',
                  margin: '0 0 16px',
                  fontSize: '16px',
                  color: '#22c55e'
                }}>
                  🏆 Final ({formatDate(ruedas.despues.savedAt)})
                </h3>
                <RuedaCreador
                  tipo="despues"
                  initialScores={ruedas.despues.scores}
                  readOnly={true}
                  compareTo={ruedas.antes.scores}
                />
              </div>
            </div>

            {/* Resumen de cambios */}
            <div style={{
              marginTop: '32px',
              padding: '24px',
              background: '#1e293b',
              borderRadius: '16px',
              border: '1px solid #334155'
            }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '18px', textAlign: 'center' }}>
                📈 Tu transformación
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px'
              }}>
                {['Claridad de visión', 'Habilidades técnicas', 'Tiempo disponible', 'Energía y salud', 'Apoyo social', 'Finanzas', 'Mentalidad', 'Propósito'].map((cat, i) => {
                  const antes = ruedas.antes!.scores[i]
                  const despues = ruedas.despues!.scores[i]
                  const diff = despues - antes

                  return (
                    <div key={i} style={{
                      padding: '12px',
                      background: '#0f172a',
                      borderRadius: '10px',
                      textAlign: 'center'
                    }}>
                      <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#94a3b8' }}>
                        {cat}
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 700,
                        color: diff > 0 ? '#22c55e' : diff < 0 ? '#f87171' : '#94a3b8'
                      }}>
                        {diff > 0 ? '+' : ''}{diff}
                      </p>
                      <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#64748b' }}>
                        {antes} → {despues}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @media (max-width: 640px) {
          main { padding: 20px 16px !important; }
        }
      `}</style>
    </div>
  )
}

export default function RuedaPage() {
  return (
    <CursoEmailGate>
      <RuedaPageContent />
    </CursoEmailGate>
  )
}
