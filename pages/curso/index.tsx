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
      background: 'linear-gradient(135deg, #f8fafc 0%, #eef2f6 100%)',
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
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)'
          }}>🚀</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Crea tu Software con IA</h1>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Primera Promoción</p>
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
          <h2 style={{ margin: '0 0 8px', fontSize: '32px', fontWeight: 700, color: '#0f172a' }}>
            Bienvenido al curso 👋
          </h2>
          <p style={{ margin: 0, fontSize: '16px', color: '#64748b', fontWeight: 500 }}>
            Primera Promoción • Semana {currentWeek} de 10
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '28px',
          marginBottom: '24px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.02)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#374151' }}>Tu progreso</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#6366f1' }}>
              {Math.round(totalPercentage)}% ({completedItems}/{totalItems})
            </span>
          </div>
          <div style={{
            height: '12px',
            background: '#f1f5f9',
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
              transition: 'width 0.3s ease',
              boxShadow: '0 2px 4px rgba(99, 102, 241, 0.3)'
            }} />
          </div>
          {totalPercentage === 100 && (
            <p style={{ margin: '16px 0 0', fontSize: '14px', color: '#22c55e', fontWeight: 600 }}>
              🎉 ¡Has completado el curso!
            </p>
          )}
        </div>

        {/* Rueda del Creador */}
        <Link href="/curso/rueda" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '24px',
          background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          borderRadius: '20px',
          marginBottom: '24px',
          textDecoration: 'none',
          transition: 'all 0.2s',
          boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.08)'
        }}>
          <span style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
          }}>
            🎯
          </span>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: 700, color: '#92400e' }}>
              Rueda del Creador
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#a16207', fontWeight: 500 }}>
              Evalúa tus 8 áreas clave y ve tu transformación
            </p>
          </div>
          <span style={{ color: '#f59e0b', fontSize: '24px', fontWeight: 600 }}>→</span>
        </Link>

        {/* Próxima clase */}
        {proximaSemana && (
          <div style={{
            background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '20px',
            padding: '28px',
            marginBottom: '32px',
            boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.08)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: 'rgba(99, 102, 241, 0.15)',
              borderRadius: '100px',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '12px' }}>🚀</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Próxima clase
              </span>
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 700, color: '#1e1b4b' }}>
              Semana {proximaSemana.num}: {proximaSemana.titulo}
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: '15px', color: '#4338ca', fontWeight: 500 }}>
              {proximaSemana.clase.fecha} • {proximaSemana.clase.hora}
            </p>
            <Link href={`/curso/semana/${proximaSemana.num}`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 24px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 600,
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
              transition: 'all 0.2s'
            }}>
              Ver contenido
            </Link>
          </div>
        )}

        {/* Semanas header */}
        <h3 style={{ margin: '0 0 20px', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
          📅 Semanas del curso
        </h3>

        {/* Semanas grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
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
                  background: isComplete
                    ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)'
                    : 'white',
                  border: `1px solid ${isComplete ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0,0,0,0.06)'}`,
                  borderRadius: '16px',
                  padding: '20px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  opacity: isUnlocked ? 1 : 0.6,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: isUnlocked
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.02)'
                    : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    width: '44px',
                    height: '44px',
                    background: isComplete
                      ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                      : isUnlocked
                        ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                        : '#e2e8f0',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    color: 'white',
                    boxShadow: isUnlocked
                      ? isComplete
                        ? '0 4px 12px rgba(34, 197, 94, 0.25)'
                        : '0 4px 12px rgba(99, 102, 241, 0.25)'
                      : 'none'
                  }}>
                    {isComplete ? '✓' : isUnlocked ? semana.emoji : '🔒'}
                  </span>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: isComplete ? '#16a34a' : isUnlocked ? '#6366f1' : '#94a3b8',
                    background: isComplete
                      ? 'rgba(34, 197, 94, 0.1)'
                      : isUnlocked
                        ? 'rgba(99, 102, 241, 0.1)'
                        : '#f1f5f9',
                    padding: '4px 10px',
                    borderRadius: '100px'
                  }}>
                    {isUnlocked ? (isComplete ? '100%' : `${completed}/3`) : 'Bloq.'}
                  </span>
                </div>

                <div>
                  <p style={{
                    margin: '0 0 4px',
                    fontSize: '12px',
                    color: '#94a3b8',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Semana {semana.num}
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#1e293b',
                    lineHeight: 1.4
                  }}>
                    {semana.titulo}
                  </p>
                </div>

                {isUnlocked && (
                  <div style={{
                    height: '6px',
                    background: '#f1f5f9',
                    borderRadius: '100px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${percentage}%`,
                      background: isComplete
                        ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                        : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
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
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          fontSize: '14px'
        }}>
          <Link href="/precurso" style={{
            color: '#64748b',
            textDecoration: 'none',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            ← Ir al precurso
          </Link>
        </div>
      </main>

      <style jsx global>{`
        @media (max-width: 640px) {
          main { padding: 24px 16px !important; }
          h2 { font-size: 26px !important; }
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
