import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import CursoEmailGate from '../../components/CursoEmailGate'
import { CURSO_SEMANAS, getCursoTrackingIds } from '../../lib/curso-data'

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
  const [userEmail, setUserEmail] = useState('')
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
        <title>Curso | Crea tu Software con IA</title>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>🚀</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Crea tu Software con IA</h1>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Primera Promoción</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>{userEmail}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 500,
              color: '#94a3b8',
              background: 'transparent',
              border: '1px solid #334155',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Salir
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Welcome section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700 }}>
            Bienvenido al curso 👋
          </h2>
          <p style={{ margin: 0, fontSize: '16px', color: '#94a3b8' }}>
            Primera Promoción • Semana {currentWeek} de 10
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          background: '#1e293b',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid #334155'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Tu progreso</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#6366f1' }}>
              {Math.round(totalPercentage)}% ({completedItems}/{totalItems})
            </span>
          </div>
          <div style={{
            height: '12px',
            background: '#334155',
            borderRadius: '100px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${totalPercentage}%`,
              background: totalPercentage === 100
                ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              borderRadius: '100px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          {totalPercentage === 100 && (
            <p style={{ margin: '12px 0 0', fontSize: '14px', color: '#22c55e', fontWeight: 500 }}>
              🎉 ¡Has completado el curso!
            </p>
          )}
        </div>

        {/* Rueda del Creador */}
        <Link href="/curso/rueda" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(249, 115, 22, 0.1))',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '16px',
          marginBottom: '32px',
          textDecoration: 'none',
          transition: 'all 0.2s'
        }}>
          <span style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            flexShrink: 0
          }}>
            🎯
          </span>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 600, color: '#f1f5f9' }}>
              Rueda del Creador
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
              Evalúa tus 8 áreas clave y ve tu transformación
            </p>
          </div>
          <span style={{ color: '#f59e0b', fontSize: '20px' }}>→</span>
        </Link>

        {/* Próxima clase */}
        {proximaSemana && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📌 Próxima clase
              </span>
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 600 }}>
              Semana {proximaSemana.num}: {proximaSemana.titulo}
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#94a3b8' }}>
              {proximaSemana.clase.fecha} • {proximaSemana.clase.hora}
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href={`/curso/semana/${proximaSemana.num}`} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
              }}>
                Ver contenido
              </Link>
            </div>
          </div>
        )}

        {/* Semanas grid */}
        <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 600 }}>
          📅 Semanas
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px'
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
                style={{
                  background: isComplete ? 'rgba(34, 197, 94, 0.1)' : '#1e293b',
                  border: `1px solid ${isComplete ? 'rgba(34, 197, 94, 0.3)' : isUnlocked ? '#334155' : '#1e293b'}`,
                  borderRadius: '14px',
                  padding: '20px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  opacity: isUnlocked ? 1 : 0.5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    width: '40px',
                    height: '40px',
                    background: isComplete
                      ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                      : isUnlocked
                        ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                        : '#334155',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    {isComplete ? '✓' : isUnlocked ? semana.emoji : '🔒'}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: isComplete ? '#22c55e' : '#64748b'
                  }}>
                    {isUnlocked ? (isComplete ? '100%' : `${completed}/3`) : 'Bloq.'}
                  </span>
                </div>

                <div>
                  <p style={{
                    margin: '0 0 4px',
                    fontSize: '12px',
                    color: '#64748b',
                    fontWeight: 500
                  }}>
                    SEMANA {semana.num}
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#f1f5f9',
                    lineHeight: 1.3
                  }}>
                    {semana.titulo}
                  </p>
                </div>

                {isUnlocked && (
                  <div style={{
                    height: '4px',
                    background: '#334155',
                    borderRadius: '100px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${percentage}%`,
                      background: isComplete ? '#22c55e' : '#6366f1',
                      borderRadius: '100px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                )}
              </Link>
            )
          })}
        </div>

        {/* Quick links */}
        <div style={{
          marginTop: '40px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          fontSize: '14px'
        }}>
          <Link href="/precurso" style={{
            color: '#64748b',
            textDecoration: 'underline'
          }}>
            ← Ir al precurso
          </Link>
        </div>
      </main>

      <style jsx global>{`
        @media (max-width: 640px) {
          main { padding: 20px 16px !important; }
          h2 { font-size: 24px !important; }
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
