import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import CursoLayout from '../../components/CursoLayout'
import { CURSO_SEMANAS, getCursoTrackingIdsForSemana, getCursoTotalItems } from '../../lib/curso-data'
import { getLevel } from '../../lib/curso-puntos'
import type { NextPageWithLayout } from '../_app'

function getUserEmail(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const savedAccess = localStorage.getItem('precurso-access')
    if (savedAccess) {
      const data = JSON.parse(savedAccess)
      return data.email ? data.email.toLowerCase().trim() : null
    }
  } catch { /* ignore */ }
  return null
}

function useCursoProgress() {
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [semanasStatus, setSemanasStatus] = useState<Record<number, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const email = getUserEmail()

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

  return { semanasStatus, loading, getSemanaProgress, totalPercentage, completedItems, totalItems }
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
  const semanaProgress = proximaSemana ? getSemanaProgress(proximaSemana.num) : null

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
        <title>Dashboard | Curso</title>
      </Head>

      {/* Welcome */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 6px', fontSize: 'clamp(24px, 3.5vw, 30px)', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em' }}>
          Bienvenido al curso
        </h2>
        <p style={{ margin: 0, fontSize: '15px', color: '#64748b' }}>
          Primera Promoción · Semana {currentWeek} de 10
        </p>
      </div>

      {/* Hero: Continuar — most prominent element */}
      {proximaSemana && (
        <Link href={`/curso/semana/${proximaSemana.num}`} className="hero-continue" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '24px 28px',
          background: 'linear-gradient(135deg, #5e6ad2, #7c3aed)',
          borderRadius: '16px',
          textDecoration: 'none',
          marginBottom: '20px',
          boxShadow: '0 4px 24px rgba(94,106,210,0.25)',
          transition: 'all 0.2s',
        }}>
          <div style={{
            width: '56px', height: '56px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', flexShrink: 0,
          }}>{proximaSemana.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Continuar donde lo dejaste
            </p>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 700, color: 'white' }}>
              Semana {proximaSemana.num}: {proximaSemana.titulo}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ flex: 1, maxWidth: '200px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${semanaProgress?.percentage || 0}%`,
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: '100px',
                  transition: 'width 0.3s ease',
                }} />
              </div>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}>
                {semanaProgress?.completed || 0}/{semanaProgress?.total || 0}
              </span>
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: 600,
            color: 'white',
            flexShrink: 0,
          }}>
            Abrir
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </Link>
      )}

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px',
      }}>
        {/* Puntos + Nivel */}
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

      {/* Quick actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
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

      <style jsx global>{`
        .hero-continue:hover {
          box-shadow: 0 6px 32px rgba(94,106,210,0.35) !important;
          transform: translateY(-1px);
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
