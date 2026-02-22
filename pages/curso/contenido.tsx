import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import CursoLayout from '../../components/CursoLayout'
import { CURSO_SEMANAS, getCursoTrackingIdsForSemana, getCursoTotalItems } from '../../lib/curso-data'
import { PRECURSO_PAGES, usePrecursoProgress } from '../../lib/precurso-data'
import type { NextPageWithLayout } from '../_app'

function getUserEmail(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const saved = localStorage.getItem('precurso-access')
    if (saved) {
      const data = JSON.parse(saved)
      return data.email ? data.email.toLowerCase().trim() : null
    }
  } catch { /* ignore */ }
  return null
}

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
              setProgress(prev => {
                // Merge: true always wins (never downgrade a local completion)
                const merged = { ...data.progress }
                for (const key of Object.keys(prev)) {
                  if (prev[key] === true) merged[key] = true
                  else if (!(key in merged)) merged[key] = prev[key]
                }
                localStorage.setItem('curso-progress', JSON.stringify(merged))
                return merged
              })
            }
          }
        } catch { /* ignore */ }
      }

      setLoading(false)
    }

    loadData()
  }, [])

  const getSemanaProgress = (semanaNum: number) => {
    const ids = getCursoTrackingIdsForSemana(semanaNum)
    const completed = ids.filter(id => progress[id]).length
    const total = ids.length
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 }
  }

  const totalItems = getCursoTotalItems()
  const completedItems = CURSO_SEMANAS.reduce((acc, s) => {
    const ids = getCursoTrackingIdsForSemana(s.num)
    return acc + ids.filter(id => progress[id]).length
  }, 0)
  const totalPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

  return { progress, semanasStatus, loading, getSemanaProgress, totalPercentage, completedItems, totalItems }
}

function CursoContenido() {
  const { semanasStatus, loading, getSemanaProgress, totalPercentage, completedItems, totalItems } = useCursoProgress()
  const precurso = usePrecursoProgress()
  const [modulo0Open, setModulo0Open] = useState(false)

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
    <div style={{ padding: '32px 40px' }}>
      <Head>
        <title>Curso | Contenido</title>
      </Head>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 6px', fontSize: 'clamp(24px, 3.5vw, 30px)', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em' }}>
          Contenido del curso
        </h2>
        <p style={{ margin: 0, fontSize: '15px', color: '#64748b' }}>
          Módulo 0 + 10 semanas de contenido
        </p>
      </div>

      {/* Progress bar */}
      <div style={{
        background: 'white',
        borderRadius: '14px',
        padding: '20px',
        marginBottom: '24px',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Progreso general</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#5e6ad2' }}>
            {Math.round(totalPercentage)}% · {completedItems}/{totalItems} items
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
                    {completed}/{getSemanaProgress(semana.num).total}
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
      `}</style>
    </div>
  )
}

const ContenidoPage: NextPageWithLayout = () => {
  return <CursoContenido />
}

ContenidoPage.getLayout = (page: ReactElement) => (
  <CursoLayout activeNav="curso">{page}</CursoLayout>
)

export default ContenidoPage
