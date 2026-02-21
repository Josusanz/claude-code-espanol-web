import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import CursoEmailGate from '../../components/CursoEmailGate'
import { CURSO_SEMANAS, getCursoTrackingIds } from '../../lib/curso-data'
import { PRECURSO_PAGES, PRECURSO_SECTIONS, usePrecursoProgress } from '../../lib/precurso-data'

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

// Hook para el progreso del curso
function useCursoProgress() {
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [semanasStatus, setSemanasStatus] = useState<Record<number, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const email = getUserEmail()
    setUserEmail(email)

    const loadData = async () => {
      // Cargar progreso de localStorage primero
      try {
        const saved = localStorage.getItem('curso-progress')
        if (saved) {
          setProgress(JSON.parse(saved))
        }
      } catch {
        // Ignore
      }

      // Cargar estado de semanas desbloqueadas
      try {
        const res = await fetch('/api/curso/config')
        if (res.ok) {
          const data = await res.json()
          setSemanasStatus(data.semanasStatus || {})
        }
      } catch {
        // En caso de error, desbloquear semana 1 por defecto
        setSemanasStatus({ 1: true })
      }

      // Cargar progreso del servidor si hay email
      if (email) {
        try {
          const res = await fetch(`/api/curso/sync-progress?email=${encodeURIComponent(email)}`)
          if (res.ok) {
            const data = await res.json()
            if (data.progress) {
              setProgress(prev => ({ ...prev, ...data.progress }))
              localStorage.setItem('curso-progress', JSON.stringify({ ...data.progress }))
            }
          }
        } catch {
          // Ignore
        }
      }

      setLoading(false)
    }

    loadData()
  }, [])

  const toggleProgress = async (id: string) => {
    const newProgress = { ...progress, [id]: !progress[id] }
    setProgress(newProgress)
    localStorage.setItem('curso-progress', JSON.stringify(newProgress))

    if (userEmail) {
      try {
        await fetch('/api/curso/sync-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, progress: newProgress })
        })
      } catch {
        // Ignore
      }
    }
  }

  // Calcular progreso por semana
  const getSemanaProgress = (semanaNum: number) => {
    const ids = getCursoTrackingIds(semanaNum)
    const completed = [ids.preclase, ids.clase, ids.entregable].filter(id => progress[id]).length
    return { completed, total: 3, percentage: (completed / 3) * 100 }
  }

  // Calcular progreso total
  const totalItems = 30 // 3 items por semana * 10 semanas
  const completedItems = Object.values(progress).filter(Boolean).length
  const totalPercentage = (completedItems / totalItems) * 100

  return {
    progress,
    semanasStatus,
    loading,
    toggleProgress,
    getSemanaProgress,
    totalPercentage,
    completedItems,
    totalItems
  }
}

// Determinar la semana actual basada en fecha
function getCurrentWeek(): number {
  const SEMANAS_FECHAS: Record<number, string> = {
    1: '2026-02-19', 2: '2026-02-27', 3: '2026-03-06', 4: '2026-03-13',
    5: '2026-03-20', 6: '2026-03-27', 7: '2026-04-03', 8: '2026-04-10',
    9: '2026-04-17', 10: '2026-04-24',
  }

  const hoy = new Date()
  let currentWeek = 1

  for (let i = 10; i >= 1; i--) {
    const fecha = new Date(SEMANAS_FECHAS[i])
    if (hoy >= fecha) {
      currentWeek = i
      break
    }
  }

  return currentWeek
}

function CursoDashboard() {
  const { semanasStatus, loading, getSemanaProgress, totalPercentage, completedItems, totalItems } = useCursoProgress()
  const precurso = usePrecursoProgress()
  const [userEmail, setUserEmail] = useState('')
  const [modulo0Open, setModulo0Open] = useState(false)
  const currentWeek = getCurrentWeek()

  useEffect(() => {
    const email = getUserEmail()
    if (email) setUserEmail(email)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('precurso-access')
    localStorage.removeItem('curso-progress')
    window.location.reload()
  }

  // Encontrar próxima clase
  const proximaSemana = CURSO_SEMANAS.find(s => semanasStatus[s.num] && getSemanaProgress(s.num).percentage < 100) || CURSO_SEMANAS[0]

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e2e8f0',
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
      background: '#fafbfc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#1e293b'
    }}>
      <Head>
        <title>Curso | Crea tu Software con IA</title>
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
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 700,
            color: 'white',
          }}>AS</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.01em' }}>Crea tu Software con IA</h1>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Primera Promoción</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{userEmail}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#64748b',
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}
          >
            Salir
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Welcome section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 'clamp(26px, 4vw, 32px)', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Bienvenido al curso
          </h2>
          <p style={{ margin: 0, fontSize: '15px', color: '#64748b', fontWeight: 500 }}>
            Primera Promoción · Semana {currentWeek} de 10
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px'
          }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Tu progreso</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#5e6ad2' }}>
              {Math.round(totalPercentage)}% ({completedItems}/{totalItems})
            </span>
          </div>
          <div style={{
            height: '8px',
            background: '#f1f5f9',
            borderRadius: '100px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${totalPercentage}%`,
              background: totalPercentage === 100
                ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                : 'linear-gradient(90deg, #5e6ad2, #8b5cf6)',
              borderRadius: '100px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          {totalPercentage === 100 && (
            <p style={{ margin: '14px 0 0', fontSize: '13px', color: '#22c55e', fontWeight: 600 }}>
              Has completado el curso
            </p>
          )}
        </div>

        {/* Quick links row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '20px',
        }}>
          {/* Discord */}
          <a
            href="https://discord.gg/RFU7P2vpqa"
            target="_blank"
            rel="noopener noreferrer"
            className="quick-link-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '20px',
              background: 'white',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '14px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0,
              border: '1px solid #c7d2fe'
            }}>
              💬
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>
                Discord
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                Comunidad del curso
              </p>
            </div>
            <span style={{ color: '#94a3b8', fontSize: '18px' }}>→</span>
          </a>

          {/* Rueda del Creador */}
          <Link href="/curso/rueda" className="quick-link-card" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '20px',
            background: 'white',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '14px',
            textDecoration: 'none',
            transition: 'all 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0,
              border: '1px solid #fde68a'
            }}>
              🎯
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>
                Rueda del Creador
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                Evalúa tus 8 áreas
              </p>
            </div>
            <span style={{ color: '#94a3b8', fontSize: '18px' }}>→</span>
          </Link>
        </div>

        {/* Próxima clase */}
        {proximaSemana && (
          <div style={{
            background: 'white',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              flexShrink: 0,
              color: 'white',
              fontWeight: 700,
            }}>
              {proximaSemana.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: '0 0 2px', fontSize: '12px', fontWeight: 600, color: '#5e6ad2', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Continuar
              </p>
              <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 600, color: '#1e293b', letterSpacing: '-0.01em' }}>
                Semana {proximaSemana.num}: {proximaSemana.titulo}
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                {proximaSemana.clase.fecha} · {proximaSemana.clase.hora}
              </p>
            </div>
            <Link href={`/curso/semana/${proximaSemana.num}`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              background: '#5e6ad2',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all 0.2s',
              flexShrink: 0,
            }}>
              Abrir →
            </Link>
          </div>
        )}

        {/* Módulo 0 — Preparación (colapsable) */}
        <div
          className="semana-card"
          onClick={() => setModulo0Open(!modulo0Open)}
          style={{
            background: precurso.progress === 100 ? '#f0fdf4' : 'white',
            border: `1px solid ${precurso.progress === 100 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(0,0,0,0.06)'}`,
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: modulo0Open ? '0' : '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            borderBottomLeftRadius: modulo0Open ? 0 : '12px',
            borderBottomRightRadius: modulo0Open ? 0 : '12px',
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            background: precurso.progress === 100
              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
              : 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: precurso.progress === 100 ? '14px' : '13px',
            fontWeight: 700,
            color: 'white',
            flexShrink: 0,
          }}>
            {precurso.progress === 100 ? '✓' : '0'}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '15px', fontWeight: 500, color: '#1e293b' }}>
              Módulo 0 · Preparación
            </div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>
              {PRECURSO_PAGES.length} lecciones · {precurso.completedCount} completadas
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {precurso.completedCount > 0 && (
              <>
                <div style={{
                  width: '60px',
                  height: '4px',
                  background: '#f1f5f9',
                  borderRadius: '100px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${precurso.progress}%`,
                    background: precurso.progress === 100 ? '#22c55e' : '#5e6ad2',
                    borderRadius: '100px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: precurso.progress === 100 ? '#16a34a' : '#5e6ad2',
                  minWidth: '24px',
                  textAlign: 'right'
                }}>
                  {precurso.completedCount}/{PRECURSO_PAGES.length}
                </span>
              </>
            )}
            <span style={{
              fontSize: '16px',
              color: '#94a3b8',
              transition: 'transform 0.2s',
              transform: modulo0Open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}>
              ▾
            </span>
          </div>
        </div>

        {/* Lecciones del Módulo 0 (expandidas) */}
        {modulo0Open && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            marginBottom: '20px',
            background: 'rgba(0,0,0,0.04)',
            borderRadius: '0 0 12px 12px',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.06)',
            borderTop: 'none',
          }}>
            {PRECURSO_PAGES.map((page) => {
              const isComplete = page.trackingId ? precurso.completed[page.trackingId] : false

              return (
                <Link
                  key={page.href}
                  href={page.href}
                  style={{
                    background: isComplete ? '#f0fdf4' : 'white',
                    padding: '12px 20px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'background 0.15s',
                  }}
                >
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>
                    {isComplete ? '✅' : page.emoji}
                  </span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: isComplete ? '#16a34a' : '#1e293b',
                    flex: 1,
                  }}>
                    {page.title}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: isComplete ? '#16a34a' : '#94a3b8',
                    flexShrink: 0,
                  }}>
                    {isComplete ? 'Completado' : page.tiempo}
                  </span>
                </Link>
              )
            })}
          </div>
        )}

        {/* Semanas header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.01em' }}>
            Semanas del curso
          </h3>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            10 semanas
          </span>
        </div>

        {/* Semanas list */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {CURSO_SEMANAS.map(semana => {
            const isUnlocked = semanasStatus[semana.num]
            const { percentage, completed } = getSemanaProgress(semana.num)
            const isComplete = percentage === 100

            return (
              <Link
                key={semana.num}
                href={isUnlocked ? `/curso/semana/${semana.num}` : '#'}
                onClick={e => { if (!isUnlocked) e.preventDefault() }}
                className="semana-card"
                style={{
                  background: isComplete ? '#f0fdf4' : 'white',
                  border: `1px solid ${isComplete ? 'rgba(34, 197, 94, 0.15)' : 'rgba(0,0,0,0.06)'}`,
                  borderRadius: '12px',
                  padding: '16px 20px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: isUnlocked ? 'pointer' : 'default',
                  opacity: isUnlocked ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: isComplete
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : isUnlocked
                      ? 'linear-gradient(135deg, #eef2ff, #e0e7ff)'
                      : '#f1f5f9',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isComplete ? '14px' : '13px',
                  fontWeight: 600,
                  color: isComplete ? 'white' : isUnlocked ? '#5e6ad2' : '#94a3b8',
                  flexShrink: 0,
                  border: isComplete ? 'none' : isUnlocked ? '1px solid #c7d2fe' : '1px solid #e2e8f0'
                }}>
                  {isComplete ? '✓' : isUnlocked ? semana.num : '🔒'}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#1e293b',
                  }}>
                    {isComplete && <span style={{ marginRight: '4px' }}>✓</span>}
                    {semana.titulo}
                  </div>
                  <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>
                    Semana {semana.num} · {semana.descripcion.slice(0, 50)}{semana.descripcion.length > 50 ? '...' : ''}
                  </div>
                </div>

                {isUnlocked && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    flexShrink: 0,
                  }}>
                    <div style={{
                      width: '60px',
                      height: '4px',
                      background: '#f1f5f9',
                      borderRadius: '100px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${percentage}%`,
                        background: isComplete
                          ? '#22c55e'
                          : '#5e6ad2',
                        borderRadius: '100px',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: isComplete ? '#16a34a' : '#5e6ad2',
                      minWidth: '24px',
                      textAlign: 'right'
                    }}>
                      {completed}/3
                    </span>
                  </div>
                )}

                {!isUnlocked && (
                  <span style={{ fontSize: '12px', color: '#94a3b8', flexShrink: 0 }}>
                    Bloqueada
                  </span>
                )}
              </Link>
            )
          })}
        </div>

      </main>

      <style jsx global>{`
        .semana-card:hover {
          border-color: rgba(0,0,0,0.12) !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
        }
        .quick-link-card:hover {
          border-color: rgba(0,0,0,0.12) !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
        }
        @media (max-width: 640px) {
          main { padding: 24px 16px !important; }
          .quick-link-card { padding: 16px !important; }
        }
        @media (max-width: 480px) {
          .quick-link-card h3 { font-size: 14px !important; }
          .quick-link-card p { font-size: 12px !important; }
        }
      `}</style>
    </div>
  )
}

export default function CursoPage() {
  return (
    <CursoEmailGate>
      <CursoDashboard />
    </CursoEmailGate>
  )
}
