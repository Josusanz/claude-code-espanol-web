import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import CursoLayout from '../../components/CursoLayout'
import CursoEmailGate from '../../components/CursoEmailGate'
import { CURSO_SEMANAS, getCursoTrackingIds } from '../../lib/curso-data'
import { PRECURSO_PAGES, usePrecursoProgress } from '../../lib/precurso-data'
import { getLevel } from '../../lib/curso-puntos'
import type { NextPageWithLayout } from '../_app'

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
      try {
        const saved = localStorage.getItem('curso-progress')
        if (saved) setProgress(JSON.parse(saved))
      } catch { /* ignore */ }

      try {
        const res = await fetch('/api/curso/config')
        if (res.ok) {
          const data = await res.json()
          setSemanasStatus(data.semanasStatus || {})
        }
      } catch {
        setSemanasStatus({ 1: true })
      }

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
        } catch { /* ignore */ }
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
      } catch { /* ignore */ }
    }
  }

  const getSemanaProgress = (semanaNum: number) => {
    const ids = getCursoTrackingIds(semanaNum)
    const completed = [ids.preclase, ids.clase, ids.entregable].filter(id => progress[id]).length
    return { completed, total: 3, percentage: (completed / 3) * 100 }
  }

  const totalItems = 30
  const completedItems = Object.values(progress).filter(Boolean).length
  const totalPercentage = (completedItems / totalItems) * 100

  return {
    progress, semanasStatus, loading, toggleProgress, getSemanaProgress,
    totalPercentage, completedItems, totalItems
  }
}

function getCurrentWeek(): number {
  const SEMANAS_FECHAS: Record<number, string> = {
    1: '2026-02-19', 2: '2026-02-27', 3: '2026-03-06', 4: '2026-03-13',
    5: '2026-03-20', 6: '2026-03-27', 7: '2026-04-03', 8: '2026-04-10',
    9: '2026-04-17', 10: '2026-04-24',
  }
  const hoy = new Date()
  let currentWeek = 1
  for (let i = 10; i >= 1; i--) {
    if (hoy >= new Date(SEMANAS_FECHAS[i])) { currentWeek = i; break }
  }
  return currentWeek
}

function CursoDashboard() {
  const { semanasStatus, loading, getSemanaProgress, totalPercentage, completedItems, totalItems } = useCursoProgress()
  const precurso = usePrecursoProgress()
  const [modulo0Open, setModulo0Open] = useState(false)
  const [puntos, setPuntos] = useState(0)
  const currentWeek = getCurrentWeek()

  useEffect(() => {
    const email = getUserEmail()
    if (email) {
      fetch(`/api/curso/puntos?email=${encodeURIComponent(email)}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data?.total != null) setPuntos(data.total) })
        .catch(() => {})
    }
  }, [])

  const proximaSemana = CURSO_SEMANAS.find(s => semanasStatus[s.num] && getSemanaProgress(s.num).percentage < 100) || CURSO_SEMANAS[0]
  const nivel = getLevel(puntos)

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '48px', height: '48px',
          border: '4px solid #e2e8f0', borderTop: '4px solid #6366f1',
          borderRadius: '50%', animation: 'spin 1s linear infinite',
        }} />
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ padding: '32px 40px', maxWidth: '960px' }}>
      <Head>
        <title>Dashboard | Curso</title>
      </Head>

      {/* Welcome */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ margin: '0 0 6px', fontSize: 'clamp(24px, 3.5vw, 30px)', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em' }}>
          Bienvenido al curso
        </h2>
        <p style={{ margin: 0, fontSize: '15px', color: '#64748b' }}>
          Primera Promoción · Semana {currentWeek} de 10
        </p>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px',
      }}>
        {/* Puntos */}
        <div style={{
          background: 'linear-gradient(135deg, #eef2ff, #e8e0ff)',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid rgba(94,106,210,0.12)',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#8b8fa3', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Puntos</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#5e6ad2' }}>{puntos}</div>
          <div style={{ fontSize: '12px', color: '#7c3aed', marginTop: '2px' }}>{nivel.emoji} {nivel.nombre}</div>
        </div>
        {/* Progreso */}
        <div style={{
          background: 'white',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#8b8fa3', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Progreso</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>{Math.round(totalPercentage)}%</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{completedItems}/{totalItems} items</div>
        </div>
        {/* Semana */}
        <div style={{
          background: 'white',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#8b8fa3', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Semana</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>{currentWeek}</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>de 10</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        background: 'white',
        borderRadius: '14px',
        padding: '20px',
        marginBottom: '20px',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Tu progreso</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#5e6ad2' }}>
            {Math.round(totalPercentage)}%
          </span>
        </div>
        <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
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
      </div>

      {/* Quick links row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px',
      }}>
        <Link href="/curso/dudas" className="quick-link-card" style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
          background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '14px',
          textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            width: '40px', height: '40px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', flexShrink: 0, border: '1px solid #fbbf24'
          }}>❓</div>
          <div>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Dudas</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Pregunta y aprende</p>
          </div>
        </Link>

        <Link href="/curso/proyectos" className="quick-link-card" style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
          background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '14px',
          textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            width: '40px', height: '40px', background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', flexShrink: 0, border: '1px solid #93c5fd'
          }}>🏗️</div>
          <div>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Proyectos</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Galería de alumnos</p>
          </div>
        </Link>

        <a href="https://discord.gg/RFU7P2vpqa" target="_blank" rel="noopener noreferrer"
          className="quick-link-card" style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
          background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '14px',
          textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            width: '40px', height: '40px', background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', flexShrink: 0, border: '1px solid #c7d2fe'
          }}>💬</div>
          <div>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Discord</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Comunidad</p>
          </div>
        </a>
      </div>

      {/* Continuar */}
      {proximaSemana && (
        <div style={{
          background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '14px',
          padding: '20px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          display: 'flex', alignItems: 'center', gap: '16px',
        }}>
          <div style={{
            width: '48px', height: '48px', background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', flexShrink: 0, color: 'white', fontWeight: 700,
          }}>{proximaSemana.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: '0 0 2px', fontSize: '11px', fontWeight: 600, color: '#5e6ad2', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Continuar
            </p>
            <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>
              Semana {proximaSemana.num}: {proximaSemana.titulo}
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
              {proximaSemana.clase.fecha} · {proximaSemana.clase.hora}
            </p>
          </div>
          <Link href={`/curso/semana/${proximaSemana.num}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '10px 20px', background: '#5e6ad2', color: 'white',
            textDecoration: 'none', borderRadius: '10px', fontSize: '14px',
            fontWeight: 500, flexShrink: 0,
          }}>Abrir →</Link>
        </div>
      )}

      {/* Módulo 0 */}
      <div
        className="semana-card"
        onClick={() => setModulo0Open(!modulo0Open)}
        style={{
          background: precurso.progress === 100 ? '#f0fdf4' : 'white',
          border: `1px solid ${precurso.progress === 100 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(0,0,0,0.06)'}`,
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: modulo0Open ? '0' : '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          borderBottomLeftRadius: modulo0Open ? 0 : '12px',
          borderBottomRightRadius: modulo0Open ? 0 : '12px',
        }}
      >
        <div style={{
          width: '38px', height: '38px',
          background: precurso.progress === 100
            ? 'linear-gradient(135deg, #22c55e, #16a34a)'
            : 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
          borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: precurso.progress === 100 ? '14px' : '13px', fontWeight: 700, color: 'white', flexShrink: 0,
        }}>
          {precurso.progress === 100 ? '✓' : '0'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>
            Módulo 0 · Preparación
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
            {PRECURSO_PAGES.length} lecciones · {precurso.completedCount} completadas
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {precurso.completedCount > 0 && (
            <>
              <div style={{ width: '60px', height: '4px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${precurso.progress}%`,
                  background: precurso.progress === 100 ? '#22c55e' : '#5e6ad2',
                  borderRadius: '100px', transition: 'width 0.3s ease'
                }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: precurso.progress === 100 ? '#16a34a' : '#5e6ad2', minWidth: '24px', textAlign: 'right' }}>
                {precurso.completedCount}/{PRECURSO_PAGES.length}
              </span>
            </>
          )}
          <span style={{ fontSize: '16px', color: '#94a3b8', transition: 'transform 0.2s', transform: modulo0Open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
        </div>
      </div>

      {/* Módulo 0 lecciones */}
      {modulo0Open && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '20px',
          background: 'rgba(0,0,0,0.04)', borderRadius: '0 0 12px 12px', overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.06)', borderTop: 'none',
        }}>
          {PRECURSO_PAGES.map((page) => {
            const isComplete = page.trackingId ? precurso.completed[page.trackingId] : false
            return (
              <Link key={page.href} href={page.href} style={{
                background: isComplete ? '#f0fdf4' : 'white', padding: '11px 18px',
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <span style={{ fontSize: '15px', flexShrink: 0 }}>{isComplete ? '✅' : page.emoji}</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: isComplete ? '#16a34a' : '#1e293b', flex: 1 }}>{page.title}</span>
                <span style={{ fontSize: '11px', color: isComplete ? '#16a34a' : '#94a3b8', flexShrink: 0 }}>{isComplete ? 'Completado' : page.tiempo}</span>
              </Link>
            )
          })}
        </div>
      )}

      {/* Semanas header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>Semanas del curso</h3>
        <span style={{ fontSize: '13px', color: '#64748b' }}>10 semanas</span>
      </div>

      {/* Semanas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                borderRadius: '12px', padding: '14px 18px', textDecoration: 'none',
                transition: 'all 0.2s', cursor: isUnlocked ? 'pointer' : 'default',
                opacity: isUnlocked ? 1 : 0.5, display: 'flex', alignItems: 'center', gap: '14px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{
                width: '38px', height: '38px',
                background: isComplete ? 'linear-gradient(135deg, #22c55e, #16a34a)' : isUnlocked ? 'linear-gradient(135deg, #eef2ff, #e0e7ff)' : '#f1f5f9',
                borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: isComplete ? '14px' : '13px', fontWeight: 600,
                color: isComplete ? 'white' : isUnlocked ? '#5e6ad2' : '#94a3b8', flexShrink: 0,
                border: isComplete ? 'none' : isUnlocked ? '1px solid #c7d2fe' : '1px solid #e2e8f0'
              }}>
                {isComplete ? '✓' : isUnlocked ? semana.num : '🔒'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>
                  {isComplete && <span style={{ marginRight: '4px' }}>✓</span>}
                  {semana.titulo}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                  Semana {semana.num} · {semana.descripcion.slice(0, 50)}{semana.descripcion.length > 50 ? '...' : ''}
                </div>
              </div>
              {isUnlocked && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <div style={{ width: '60px', height: '4px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${percentage}%`,
                      background: isComplete ? '#22c55e' : '#5e6ad2',
                      borderRadius: '100px', transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: isComplete ? '#16a34a' : '#5e6ad2', minWidth: '24px', textAlign: 'right' }}>
                    {completed}/3
                  </span>
                </div>
              )}
              {!isUnlocked && (
                <span style={{ fontSize: '12px', color: '#94a3b8', flexShrink: 0 }}>Bloqueada</span>
              )}
            </Link>
          )
        })}
      </div>

      <style jsx global>{`
        .semana-card:hover {
          border-color: rgba(0,0,0,0.12) !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
        }
        .quick-link-card:hover {
          border-color: rgba(0,0,0,0.12) !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
        }
        @media (max-width: 768px) {
          .quick-link-card h3 { font-size: 13px !important; }
          .quick-link-card p { font-size: 11px !important; }
        }
        @media (max-width: 640px) {
          .quick-link-card { padding: 12px !important; }
        }
      `}</style>
    </div>
  )
}

const CursoPage: NextPageWithLayout = () => {
  return <CursoDashboard />
}

CursoPage.getLayout = (page: ReactElement) => (
  <CursoLayout activeNav="dashboard">{page}</CursoLayout>
)

export default CursoPage
