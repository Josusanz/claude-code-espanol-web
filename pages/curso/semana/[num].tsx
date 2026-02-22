import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react'
import type { ReactElement } from 'react'
import CursoEmailGate from '../../../components/CursoEmailGate'
import { CURSO_SEMANAS, getCursoTrackingIds, getCursoTrackingIdsForSemana, Semana, DiaSemana } from '../../../lib/curso-data'
import { renderPreclaseContent } from '../../../components/curso-shared/ContentRenderer'
import type { NextPageWithLayout } from '../../_app'

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

function useSemanaProgress(semanaNum: number) {
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const ids = getCursoTrackingIds(semanaNum)
  const allIds = getCursoTrackingIdsForSemana(semanaNum)
  const semana = CURSO_SEMANAS.find(s => s.num === semanaNum)
  const isMultiDay = !!semana?.dias

  useEffect(() => {
    const email = getUserEmail()
    setUserEmail(email)

    try {
      const saved = localStorage.getItem('curso-progress')
      if (saved) {
        setProgress(JSON.parse(saved))
      }
    } catch {
      // Ignore
    }

    if (email) {
      fetch(`/api/curso/sync-progress?email=${encodeURIComponent(email)}`)
        .then(res => res.json())
        .then(data => {
          if (data.progress) {
            setProgress(prev => {
              const merged = { ...prev, ...data.progress }
              try { localStorage.setItem('curso-progress', JSON.stringify(merged)) } catch {}
              return merged
            })
          }
        })
        .catch(() => {})
    }

    setLoading(false)
  }, [semanaNum])

  const toggle = async (id: string) => {
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

  const markComplete = async (id: string) => {
    let shouldSync = false
    let newProgress: Record<string, boolean> = {}

    setProgress(prev => {
      if (prev[id]) return prev // Already completed
      shouldSync = true
      newProgress = { ...prev, [id]: true }
      return newProgress
    })

    if (!shouldSync) return

    try { localStorage.setItem('curso-progress', JSON.stringify(newProgress)) } catch {}

    if (userEmail) {
      try {
        await fetch('/api/curso/sync-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, progress: newProgress })
        })
      } catch {}
    }
  }

  const markIncomplete = async (id: string) => {
    let shouldSync = false
    let newProgress: Record<string, boolean> = {}

    setProgress(prev => {
      if (!prev[id]) return prev // Already not completed
      shouldSync = true
      newProgress = { ...prev, [id]: false }
      return newProgress
    })

    if (!shouldSync) return

    try { localStorage.setItem('curso-progress', JSON.stringify(newProgress)) } catch {}

    if (userEmail) {
      try {
        await fetch('/api/curso/sync-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, progress: newProgress })
        })
      } catch {}
    }
  }

  // Multi-day helpers
  const getDayIds = (dayNum: number) => ({
    preclase: `semana-${semanaNum}-d${dayNum}-preclase`,
    clase: `semana-${semanaNum}-d${dayNum}-clase`,
    entregable: `semana-${semanaNum}-d${dayNum}-entregable`,
  })

  // Backward compat: for multi-day weeks, old IDs (semana-X-preclase) count as day 1
  const checkProgress = (id: string, fallbackId?: string) =>
    progress[id] || (fallbackId ? progress[fallbackId] : false) || false

  return {
    progress,
    loading,
    toggle,
    markComplete,
    markIncomplete,
    ids,
    allIds,
    isMultiDay,
    getDayIds,
    checkProgress,
    preclaseCompleted: progress[ids.preclase] || false,
    claseCompleted: progress[ids.clase] || false,
    entregableCompleted: progress[ids.entregable] || false,
  }
}

function useChecklist(checklistKey: string | number, totalItems: number, onAllCompleted?: () => void, onIncomplete?: () => void) {
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const key = String(checklistKey)
  const firedCompleteRef = useRef(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('curso-checklist')
      if (saved) {
        const all = JSON.parse(saved)
        if (all[key]) {
          setChecked(all[key])
          // Initialize firedCompleteRef based on whether all items are already checked
          const savedCount = Object.values(all[key] as Record<number, boolean>).filter(Boolean).length
          firedCompleteRef.current = savedCount >= totalItems
        } else {
          setChecked({})
          firedCompleteRef.current = false
        }
      } else {
        setChecked({})
        firedCompleteRef.current = false
      }
    } catch {
      // Ignore
      firedCompleteRef.current = false
    }
  }, [key, totalItems])

  const toggleItem = (index: number) => {
    const newChecked = { ...checked, [index]: !checked[index] }
    setChecked(newChecked)
    try {
      const saved = localStorage.getItem('curso-checklist')
      const all = saved ? JSON.parse(saved) : {}
      all[key] = newChecked
      localStorage.setItem('curso-checklist', JSON.stringify(all))
    } catch {
      // Ignore
    }
    const newCount = Object.values(newChecked).filter(Boolean).length
    // Auto-complete when all items checked
    if (newCount === totalItems && !firedCompleteRef.current && onAllCompleted) {
      firedCompleteRef.current = true
      onAllCompleted()
    }
    // Un-complete when items unchecked
    if (newCount < totalItems && firedCompleteRef.current && onIncomplete) {
      firedCompleteRef.current = false
      onIncomplete()
    }
  }

  const completedCount = Object.values(checked).filter(Boolean).length

  return { checked, toggleItem, completedCount, totalItems }
}

function PrepReadyButton({ storageKey }: { storageKey: string }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved === 'true') setReady(true)
    } catch { /* ignore */ }
  }, [storageKey])

  const toggle = () => {
    const next = !ready
    setReady(next)
    try { localStorage.setItem(storageKey, String(next)) } catch { /* ignore */ }
  }

  return (
    <div style={{
      marginTop: '24px', padding: '20px',
      background: ready ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : '#fff',
      border: `2px solid ${ready ? '#22c55e' : '#e2e8f0'}`,
      borderRadius: '14px', textAlign: 'center',
      transition: 'all 0.3s',
    }}>
      <button
        onClick={toggle}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          padding: '14px 28px', fontSize: '15px', fontWeight: 700,
          color: ready ? '#fff' : '#16a34a',
          background: ready ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'transparent',
          border: `2px solid ${ready ? '#22c55e' : '#22c55e'}`,
          borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s',
          boxShadow: ready ? '0 4px 12px rgba(34,197,94,0.3)' : 'none',
        }}
      >
        <span style={{ fontSize: '20px' }}>{ready ? '✓' : '🚀'}</span>
        {ready ? '¡Preparado!' : 'Estoy preparado para la sesión'}
      </button>
      {ready && (
        <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#16a34a', fontWeight: 500 }}>
          ¡Genial! Nos vemos en la clase
        </p>
      )}
    </div>
  )
}

type SectionKey = 'preclase' | 'clase' | 'entregable'

const SECTIONS: { key: SectionKey; label: string; icon: string; completedIcon: string }[] = [
  { key: 'preclase', label: 'Pre-clase', icon: '📚', completedIcon: '✓' },
  { key: 'clase', label: 'Clase en vivo', icon: '🎥', completedIcon: '✓' },
  { key: 'entregable', label: 'Entregable', icon: '📦', completedIcon: '✓' },
]

// === Multi-day layout (for LaunchPad-style weeks) ===
// Sub-section keys: d1-prep, d1-clase, d1-grab, d1-entregable, d2-prep, d2-clase, d2-grab, d2-entregable
type MultiDayNavKey = string

const DAY_SUB_SECTIONS = [
  { suffix: 'prep', label: 'Preparación', icon: '📚' },
  { suffix: 'clase', label: 'Clase en vivo', icon: '🎥' },
  { suffix: 'grab', label: 'Grabación', icon: '📹' },
  { suffix: 'entregable', label: 'Entregable', icon: '📦' },
]

function SemanaContentMultiDay({ semana }: { semana: Semana }) {
  const { toggle, markComplete, markIncomplete, progress, getDayIds } = useSemanaProgress(semana.num)
  const [activeKey, setActiveKey] = useState<MultiDayNavKey>('d1-prep')
  const dias = semana.dias!

  // Per-day checklist: use key like "1-d1", "1-d2" for multi-day
  const activeDayIdx = parseInt(activeKey.split('-')[0].replace('d', '')) - 1
  const activeDayEntregable = dias[activeDayIdx]?.entregable
  const checklistKey = `${semana.num}-d${activeDayIdx + 1}`
  const dayIds = getDayIds(activeDayIdx + 1)
  const checklist = useChecklist(checklistKey, activeDayEntregable?.checklist.length || 0, () => markComplete(dayIds.entregable), () => markIncomplete(dayIds.entregable))

  // Per-day progress
  const dayProgress = (dayNum: number) => {
    const dIds = getDayIds(dayNum)
    return {
      preclase: progress[dIds.preclase] || false,
      clase: progress[dIds.clase] || false,
      entregable: progress[dIds.entregable] || false,
    }
  }
  const currentDayProgress = dayProgress(activeDayIdx + 1)
  const totalCompleted = dias.reduce((acc, _, i) => {
    const dp = dayProgress(i + 1)
    return acc + [dp.preclase, dp.clase, dp.entregable].filter(Boolean).length
  }, 0)
  const totalItems = dias.length * 3

  // Build flat nav list for prev/next navigation
  const allNavKeys: MultiDayNavKey[] = []
  dias.forEach((d, i) => {
    DAY_SUB_SECTIONS.forEach(sub => {
      // Only add entregable sub-section if the day has one
      if (sub.suffix === 'entregable' && !d.entregable) return
      allNavKeys.push(`d${i + 1}-${sub.suffix}`)
    })
  })

  const navIndex = allNavKeys.indexOf(activeKey)

  const navigate = (key: MultiDayNavKey) => {
    setActiveKey(key)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goNext = () => { if (navIndex < allNavKeys.length - 1) navigate(allNavKeys[navIndex + 1]) }
  const goPrev = () => { if (navIndex > 0) navigate(allNavKeys[navIndex - 1]) }

  const handleLogout = () => {
    localStorage.removeItem('precurso-access')
    localStorage.removeItem('curso-progress')
    window.location.href = '/curso'
  }

  // Parse active key (format: d1-prep, d1-clase, d1-grab, d1-entregable, d2-prep, etc.)
  const activeDayIndex = parseInt(activeKey.split('-')[0].replace('d', '')) - 1
  const activeSubSection = activeKey.split('-')[1] // prep | clase | grab | entregable
  const activeDia = dias[activeDayIndex] || null

  // Get next nav label for button
  const getNavLabel = (key: MultiDayNavKey) => {
    const parts = key.split('-')
    const dayNum = parseInt(parts[0].replace('d', ''))
    const sub = DAY_SUB_SECTIONS.find(s => s.suffix === parts[1])
    return `D${dayNum} · ${sub?.label || ''}`
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#0f172a'
    }}>
      <Head>
        <title>Semana {semana.num}: {semana.titulo} | Curso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* Mobile header */}
      <header className="mobile-header" style={{
        display: 'none',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 200,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/curso" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Curso
        </Link>
        <span className="header-title" style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>
          {semana.emoji} S{semana.num}: {semana.titulo}
        </span>
        <button onClick={handleLogout} style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 500, color: '#64748b', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', cursor: 'pointer' }}>
          Salir
        </button>
      </header>

      {/* Mobile tabs */}
      <div className="mobile-tabs" style={{
        display: 'none', gap: '4px', padding: '8px 12px', background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.06)', overflowX: 'auto',
      }}>
        {dias.map((d, di) => (
          <React.Fragment key={di}>
            {DAY_SUB_SECTIONS.map(sub => {
              if (sub.suffix === 'entregable' && !d.entregable) return null
              const key = `d${di + 1}-${sub.suffix}`
              const isActive = activeKey === key
              return (
                <button
                  key={key}
                  onClick={() => navigate(key)}
                  style={{
                    padding: '6px 10px', fontSize: '12px', fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#fff' : '#64748b',
                    background: isActive ? (di === 0 ? '#6366f1' : '#f59e0b') : '#f8fafc',
                    border: `1px solid ${isActive ? 'transparent' : 'rgba(0,0,0,0.06)'}`,
                    borderRadius: '6px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                  }}
                >
                  {sub.icon} D{di + 1}
                </button>
              )
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="layout-wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar with nested day navigation */}
        <aside className="sidebar" style={{
          width: '260px', flexShrink: 0, borderRight: '1px solid rgba(0,0,0,0.06)',
          background: '#f8f9fa', position: 'fixed', top: 0, left: 0, height: '100vh',
          overflowY: 'auto', display: 'flex', flexDirection: 'column', zIndex: 50,
        }}>
          {/* Back link + title */}
          <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <Link href="/curso" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: 500,
              marginBottom: '16px',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              Volver al curso
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>{semana.emoji}</span>
              <div>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Semana {semana.num}</p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{semana.titulo}</p>
              </div>
            </div>
          </div>

          {/* Nested navigation */}
          <nav style={{ padding: '8px', flex: 1 }}>
            {dias.map((d, di) => {
              const dayColor = di === 0 ? '#6366f1' : '#f59e0b'
              const dayActive = activeDayIndex === di
              return (
                <div key={di} style={{ marginBottom: '4px' }}>
                  {/* Day header */}
                  <div style={{
                    padding: '10px 12px 6px',
                    fontSize: '12px', fontWeight: 700, color: dayActive ? dayColor : '#94a3b8',
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                    <span style={{ fontSize: '14px' }}>{d.emoji}</span>
                    Día {di + 1} — {d.titulo}
                  </div>
                  {/* Sub-sections */}
                  {DAY_SUB_SECTIONS.map(sub => {
                    if (sub.suffix === 'entregable' && !d.entregable) return null
                    const key = `d${di + 1}-${sub.suffix}`
                    const isActive = activeKey === key
                    return (
                      <button
                        key={key}
                        onClick={() => navigate(key)}
                        className="sidebar-btn"
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '8px 12px 8px 28px', fontSize: '13px', width: '100%',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? dayColor : '#64748b',
                          background: isActive ? `${dayColor}10` : 'transparent',
                          border: 'none',
                          borderLeft: isActive ? `3px solid ${dayColor}` : '3px solid transparent',
                          borderRadius: '0 8px 8px 0', cursor: 'pointer', textAlign: 'left',
                          transition: 'all 0.15s',
                        }}
                      >
                        <span style={{ fontSize: '13px', width: '20px', textAlign: 'center' }}>{sub.icon}</span>
                        {sub.label}
                      </button>
                    )
                  })}
                </div>
              )
            })}

          </nav>

          {/* Progress */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>Progreso</p>
            <div style={{ display: 'flex', gap: '4px' }}>
              {dias.map((_, i) => {
                const dp = dayProgress(i + 1)
                return [dp.preclase, dp.clase, dp.entregable].map((done, j) => (
                  <div key={`${i}-${j}`} style={{ flex: 1, height: '6px', borderRadius: '3px', background: done ? '#22c55e' : '#e2e8f0', transition: 'background 0.3s' }} />
                ))
              })}
            </div>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#64748b' }}>
              {totalCompleted}/{totalItems} completados
            </p>
          </div>
        </aside>

        {/* Spacer for fixed sidebar */}
        <div className="sidebar-spacer" style={{ width: '260px', flexShrink: 0 }} />

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0, padding: '32px 40px 80px' }}>
          {/* === PREPARACIÓN === */}
          {activeDia && activeSubSection === 'prep' && (
            <section>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                    📚 Preparación — Día {activeDayIndex + 1}
                  </h2>
                  <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                    {activeDia.preclase.titulo} • {activeDia.preclase.duracion}
                  </p>
                </div>
                {currentDayProgress.preclase && (
                  <span style={{
                    padding: '8px 14px', fontSize: '12px', fontWeight: 600,
                    color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '8px', whiteSpace: 'nowrap'
                  }}>
                    ✓ Completada
                  </span>
                )}
              </div>

              {renderPreclaseContent(activeDia.preclase.contenido, () => markComplete(dayIds.preclase))}

              {activeDia.preclase.recursos.length > 0 && (
                <div style={{
                  background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '16px',
                  padding: '20px', marginTop: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>📎 Recursos</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activeDia.preclase.recursos.map((recurso, i) => (
                      <a key={i} href={recurso.url} target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '12px 16px', background: '#f8fafc',
                        border: '1px solid rgba(0,0,0,0.06)', borderRadius: '10px',
                        color: '#6366f1', textDecoration: 'none', fontSize: '14px',
                      }}>
                        <span>{recurso.tipo === 'pdf' ? '📄' : recurso.tipo === 'video' ? '🎥' : recurso.tipo === 'github' ? '💻' : '🔗'}</span>
                        {recurso.titulo}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual mark-complete button (for preps without checkboxes) */}
              {!currentDayProgress.preclase && (
                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                  <button
                    onClick={() => markComplete(dayIds.preclase)}
                    className="complete-btn"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '12px 24px', fontSize: '14px', fontWeight: 600,
                      color: '#fff', background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      border: 'none', borderRadius: '10px', cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(34,197,94,0.3)',
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>✓</span>
                    Marcar preparación como completada
                  </button>
                </div>
              )}

              <PrepReadyButton storageKey={`prep-ready-${semana.num}-d${activeDayIndex + 1}`} />
            </section>
          )}

          {/* === CLASE EN VIVO === */}
          {activeDia && activeSubSection === 'clase' && (
            <section>
              <div style={{ marginBottom: '28px' }}>
                <h2 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                  🎥 Clase en vivo — Día {activeDayIndex + 1}
                </h2>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                  {activeDia.clase.fecha} • {activeDia.clase.hora} • {activeDia.clase.duracion}
                </p>
              </div>

              {/* Attendance status (readonly — marked by instructor) */}
              <div style={{
                background: currentDayProgress.clase ? '#f0fdf4' : '#fffbeb',
                border: `1px solid ${currentDayProgress.clase ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`,
                borderRadius: '12px', padding: '14px 18px', marginBottom: '12px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ fontSize: '18px' }}>{currentDayProgress.clase ? '✅' : '⏳'}</span>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: currentDayProgress.clase ? '#16a34a' : '#92400e' }}>
                    {currentDayProgress.clase ? 'Asistencia confirmada' : 'Pendiente de confirmación'}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: currentDayProgress.clase ? '#22c55e' : '#b45309' }}>
                    {currentDayProgress.clase ? 'El instructor ha confirmado tu asistencia' : 'El instructor confirmará tu asistencia después de la clase'}
                  </p>
                </div>
              </div>

              {/* Zoom card */}
              <div style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '16px',
                padding: '20px 24px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px', height: '44px',
                    background: 'linear-gradient(135deg, #2D8CFF, #0066DC)',
                    borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14"/><rect x="1" y="6" width="14" height="12" rx="2" ry="2"/></svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>{activeDia.titulo}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                      {activeDia.clase.fecha} · {activeDia.clase.hora} · {activeDia.clase.duracion}
                    </p>
                  </div>
                  {activeDia.clase.zoomUrl ? (
                    <a href={activeDia.clase.zoomUrl} target="_blank" rel="noopener noreferrer" className="zoom-btn" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '7px',
                      padding: '9px 18px', flexShrink: 0,
                      background: '#2D8CFF', color: '#fff', fontSize: '13px', fontWeight: 600,
                      borderRadius: '8px', textDecoration: 'none',
                      boxShadow: '0 2px 6px rgba(45, 140, 255, 0.25)',
                      transition: 'all 0.2s',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14"/><rect x="1" y="6" width="14" height="12" rx="2" ry="2"/></svg>
                      Unirse a Zoom
                    </a>
                  ) : (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px', flexShrink: 0,
                      padding: '8px 14px', background: '#f8fafc',
                      border: '1px dashed #cbd5e1', borderRadius: '8px',
                      fontSize: '12px', color: '#94a3b8',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      Próximamente
                    </span>
                  )}
                </div>
              </div>

              {/* Pizarra card */}
              <Link href={`/curso/clase/${semana.num}?dia=${activeDayIndex + 1}`} className="pizarra-btn" style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '20px 24px',
                background: '#fff', borderRadius: '16px', textDecoration: 'none',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                transition: 'all 0.2s',
              }}>
                <div style={{
                  width: '44px', height: '44px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>Pizarra de clase</p>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#94a3b8' }}>Notas y contenido de la sesión en vivo</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
            </section>
          )}

          {/* === GRABACIÓN === */}
          {activeDia && activeSubSection === 'grab' && (
            <section>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                  📹 Grabación — Día {activeDayIndex + 1}
                </h2>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                  {activeDia.titulo} • {activeDia.clase.fecha}
                </p>
              </div>

              {activeDia.clase.videos && activeDia.clase.videos.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {activeDia.clase.videos.map((video, vi) => (
                    video.tipo === 'embed' ? (
                      <div key={vi}>
                        {activeDia.clase.videos!.length > 1 && (
                          <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>🎬 {video.titulo}</p>
                        )}
                        <div style={{
                          position: 'relative', paddingBottom: '56.25%', height: 0,
                          background: '#0f172a', borderRadius: '12px', overflow: 'hidden',
                        }}>
                          <iframe
                            src={video.url}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ) : (
                      <a key={vi} href={video.url} target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex', alignItems: 'center', gap: '14px',
                        padding: '18px 20px', background: '#fff',
                        border: '1px solid rgba(0,0,0,0.06)', borderRadius: '14px',
                        textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                      }}>
                        <span style={{
                          width: '48px', height: '48px',
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '22px', flexShrink: 0,
                        }}>▶️</span>
                        <div>
                          <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>{video.titulo}</p>
                          <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
                            {video.passcode ? `Código: ${video.passcode} · ` : ''}Click para ver
                          </p>
                        </div>
                        <span style={{ marginLeft: 'auto', fontSize: '18px', color: '#94a3b8' }}>↗</span>
                      </a>
                    )
                  ))}
                </div>
              ) : (
                <div style={{
                  background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '16px',
                  padding: '40px', textAlign: 'center', marginBottom: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>📹</span>
                  <p style={{ margin: 0, fontSize: '15px', color: '#64748b' }}>
                    El video se publicará después de la sesión en vivo
                  </p>
                </div>
              )}

              {/* Notas */}
              {activeDia.clase.notas && (
                <div style={{
                  background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '16px',
                  padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>📝 Notas de la clase</h4>
                  <div style={{ fontSize: '14px', lineHeight: 1.7, color: '#374151' }}>
                    <div dangerouslySetInnerHTML={{
                      __html: activeDia.clase.notas
                        .replace(/^### (.+)$/gm, '<h5 style="font-size: 15px; font-weight: 600; color: #1e293b; margin: 20px 0 8px;">$1</h5>')
                        .replace(/^- (.+)$/gm, '<li style="margin-left: 16px; margin-bottom: 4px;">$1</li>')
                        .replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #0f172a;">$1</strong>')
                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #6366f1; text-decoration: underline;">$1</a>')
                        .replace(/\n\n/g, '<br/>')
                    }} />
                  </div>
                </div>
              )}
            </section>
          )}

          {/* === ENTREGABLE (per-day) === */}
          {activeDia && activeSubSection === 'entregable' && activeDia.entregable && (
            <section>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                    📦 Entregable — Día {activeDayIndex + 1}
                  </h2>
                  <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                    {activeDia.entregable.titulo} • Fecha límite: {activeDia.entregable.fechaLimite}
                  </p>
                </div>
                {currentDayProgress.entregable && (
                  <span style={{
                    padding: '10px 16px', fontSize: '13px', fontWeight: 600,
                    color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '8px', whiteSpace: 'nowrap'
                  }}>
                    ✓ Completado
                  </span>
                )}
              </div>

              <p style={{
                margin: '0 0 20px', fontSize: '15px', color: '#374151', lineHeight: 1.6,
                background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '16px',
                padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                {activeDia.entregable.descripcion}
              </p>

              <div style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '16px',
                padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>Checklist</h4>
                  <span style={{
                    fontSize: '13px', fontWeight: 600,
                    color: checklist.completedCount === checklist.totalItems ? '#22c55e' : '#64748b',
                    background: checklist.completedCount === checklist.totalItems ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.04)',
                    padding: '4px 10px', borderRadius: '6px'
                  }}>
                    {checklist.completedCount}/{checklist.totalItems}
                  </span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {activeDia.entregable.checklist.map((item, i) => (
                    <li key={i} onClick={() => checklist.toggleItem(i)} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 0',
                      borderBottom: i < activeDia.entregable!.checklist.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                      fontSize: '14px', color: checklist.checked[i] ? '#94a3b8' : '#374151',
                      textDecoration: checklist.checked[i] ? 'line-through' : 'none',
                      cursor: 'pointer', userSelect: 'none',
                    }}>
                      <span style={{
                        width: '20px', height: '20px',
                        border: checklist.checked[i] ? 'none' : '2px solid #cbd5e1',
                        background: checklist.checked[i] ? '#22c55e' : 'transparent',
                        borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: '1px', fontSize: '12px', color: '#fff',
                      }}>
                        {checklist.checked[i] ? '✓' : ''}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Navigation prev/next */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.06)',
          }}>
            {navIndex > 0 ? (
              <button onClick={goPrev} className="nav-section-btn" style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 20px', fontSize: '14px', fontWeight: 500, color: '#64748b',
                background: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', cursor: 'pointer',
              }}>
                ← {getNavLabel(allNavKeys[navIndex - 1])}
              </button>
            ) : <div />}

            {navIndex < allNavKeys.length - 1 ? (
              <button onClick={goNext} className="nav-section-btn next-btn" style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 20px', fontSize: '14px', fontWeight: 600, color: '#fff',
                background: '#6366f1', border: 'none', borderRadius: '10px', cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}>
                {getNavLabel(allNavKeys[navIndex + 1])} →
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '12px' }}>
                {semana.num < 10 && (
                  <Link href={`/curso/semana/${semana.num + 1}`} className="nav-section-btn next-btn" style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '12px 20px', fontSize: '14px', fontWeight: 600, color: '#fff',
                    background: '#6366f1', borderRadius: '10px', textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>
                    Semana {semana.num + 1} →
                  </Link>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      <style jsx global>{`
        .pizarra-btn:hover { background: #f5f3ff !important; border-color: #c7d2fe !important; box-shadow: 0 2px 8px rgba(99,102,241,0.1) !important; }
        .zoom-btn:hover { box-shadow: 0 4px 14px rgba(45, 140, 255, 0.35) !important; transform: translateY(-1px); }
        .nav-section-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.12) !important; }
        .sidebar-btn:hover { background: rgba(0,0,0,0.04) !important; }
        .complete-btn:hover { opacity: 0.9; }
        .video-link:hover { border-color: rgba(99,102,241,0.3) !important; box-shadow: 0 2px 8px rgba(99,102,241,0.1) !important; }
        .sidebar::-webkit-scrollbar { width: 4px; }
        .sidebar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 2px; }
        @media (min-width: 769px) {
          .mobile-tabs { display: none !important; }
          .mobile-header { display: none !important; }
          .sidebar { display: flex !important; }
        }
        @media (max-width: 768px) {
          .mobile-tabs { display: flex !important; }
          .mobile-header { display: flex !important; }
          .sidebar { display: none !important; }
          .sidebar-spacer { display: none !important; }
          .layout-wrapper { padding: 0 !important; }
          main { padding: 20px 16px 60px !important; }
          h2 { font-size: 20px !important; }
          .complete-btn { padding: 8px 12px !important; font-size: 12px !important; }
        }
      `}</style>
    </div>
  )
}

// === Standard single-day layout ===
function SemanaContent({ semana }: { semana: Semana }) {
  const { toggle, markComplete, markIncomplete, ids, progress, preclaseCompleted, claseCompleted, entregableCompleted } = useSemanaProgress(semana.num)
  const checklist = useChecklist(semana.num, semana.entregable.checklist.length, () => markComplete(ids.entregable), () => markIncomplete(ids.entregable))
  const [activeSection, setActiveSection] = useState<SectionKey>('preclase')

  const completedMap: Record<SectionKey, boolean> = {
    preclase: preclaseCompleted,
    clase: claseCompleted,
    entregable: entregableCompleted,
  }

  const sectionIndex = SECTIONS.findIndex(s => s.key === activeSection)

  const goNext = () => {
    if (sectionIndex < SECTIONS.length - 1) {
      setActiveSection(SECTIONS[sectionIndex + 1].key)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goPrev = () => {
    if (sectionIndex > 0) {
      setActiveSection(SECTIONS[sectionIndex - 1].key)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('precurso-access')
    localStorage.removeItem('curso-progress')
    window.location.href = '/curso'
  }

  const sidebarColors: Record<SectionKey, string> = {
    preclase: '#f59e0b',
    clase: '#6366f1',
    entregable: '#ec4899',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#0f172a'
    }}>
      <Head>
        <title>Semana {semana.num}: {semana.titulo} | Curso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* Mobile header */}
      <header className="mobile-header" style={{
        display: 'none',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 200,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/curso" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Curso
        </Link>
        <span className="header-title" style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>
          {semana.emoji} S{semana.num}: {semana.titulo}
        </span>
        <button onClick={handleLogout} style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 500, color: '#64748b', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', cursor: 'pointer' }}>
          Salir
        </button>
      </header>

      {/* Mobile tabs */}
      <div className="mobile-tabs" style={{
        display: 'none',
        gap: '6px',
        padding: '10px 16px',
        background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        overflowX: 'auto',
      }}>
        {SECTIONS.map((s) => {
          const isActive = activeSection === s.key
          const isCompleted = completedMap[s.key]
          return (
            <button
              key={s.key}
              onClick={() => { setActiveSection(s.key); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#fff' : isCompleted ? '#16a34a' : '#64748b',
                background: isActive ? sidebarColors[s.key] : isCompleted ? 'rgba(34,197,94,0.08)' : '#f8fafc',
                border: `1px solid ${isActive ? sidebarColors[s.key] : isCompleted ? 'rgba(34,197,94,0.2)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '14px' }}>{isCompleted ? '✓' : s.icon}</span>
              {s.label}
            </button>
          )
        })}
      </div>

      <div className="layout-wrapper" style={{
        display: 'flex',
        minHeight: '100vh',
      }}>
        {/* Sidebar — fixed contextual */}
        <aside className="sidebar" style={{
          width: '260px', flexShrink: 0, borderRight: '1px solid rgba(0,0,0,0.06)',
          background: '#f8f9fa', position: 'fixed', top: 0, left: 0, height: '100vh',
          overflowY: 'auto', display: 'flex', flexDirection: 'column', zIndex: 50,
        }}>
          {/* Back link + semana info */}
          <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <Link href="/curso" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: 500,
              marginBottom: '16px',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              Volver al curso
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>{semana.emoji}</span>
              <div>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Semana {semana.num}
                </p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                  {semana.titulo}
                </p>
              </div>
            </div>
          </div>

          {/* Section tabs */}
          <nav style={{ padding: '12px 8px', flex: 1 }}>
            {SECTIONS.map((s) => {
              const isActive = activeSection === s.key
              const isCompleted = completedMap[s.key]
              return (
                <button
                  key={s.key}
                  onClick={() => { setActiveSection(s.key); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="sidebar-btn"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 16px', fontSize: '14px', width: '100%',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? sidebarColors[s.key] : isCompleted ? '#16a34a' : '#64748b',
                    background: isActive ? `${sidebarColors[s.key]}10` : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? `3px solid ${sidebarColors[s.key]}` : '3px solid transparent',
                    borderRadius: '0 10px 10px 0', cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.15s', marginBottom: '2px',
                  }}
                >
                  <span style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: isCompleted ? '14px' : '16px',
                    background: isCompleted ? 'linear-gradient(135deg, #22c55e, #16a34a)' : isActive ? `${sidebarColors[s.key]}18` : '#e2e8f0',
                    color: isCompleted ? '#fff' : 'inherit',
                    flexShrink: 0, transition: 'all 0.15s',
                  }}>
                    {isCompleted ? '✓' : s.icon}
                  </span>
                  <span>
                    <span style={{ display: 'block' }}>{s.label}</span>
                    {s.key === 'preclase' && (
                      <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: 400, marginTop: '1px' }}>
                        {semana.preclase.duracion}
                      </span>
                    )}
                    {s.key === 'clase' && (
                      <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: 400, marginTop: '1px' }}>
                        {semana.clase.duracion}
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Progress */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>Progreso</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {SECTIONS.map(s => (
                <div key={s.key} style={{
                  flex: 1, height: '6px', borderRadius: '3px',
                  background: completedMap[s.key] ? '#22c55e' : '#e2e8f0',
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#64748b' }}>
              {Object.values(completedMap).filter(Boolean).length}/3 completados
            </p>
          </div>
        </aside>

        {/* Spacer for fixed sidebar */}
        <div className="sidebar-spacer" style={{ width: '260px', flexShrink: 0 }} />

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0, padding: '32px 40px 80px' }}>
          {/* ===== PRE-CLASE ===== */}
          {activeSection === 'preclase' && (
            <section>
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <h2 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                    Pre-clase
                  </h2>
                  <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                    {semana.preclase.titulo} • {semana.preclase.duracion}
                  </p>
                </div>
                {preclaseCompleted && (
                  <span style={{
                    padding: '10px 16px', fontSize: '13px', fontWeight: 600,
                    color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '8px', whiteSpace: 'nowrap'
                  }}>
                    ✓ Completado
                  </span>
                )}
              </div>

              {/* Content cards */}
              <div style={{ marginBottom: '20px' }}>
                {renderPreclaseContent(semana.preclase.contenido, () => markComplete(ids.preclase))}
              </div>

              {/* Resources */}
              {semana.preclase.recursos.length > 0 && (
                <div style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '16px',
                  padding: '20px',
                  marginBottom: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
                    📎 Recursos
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {semana.preclase.recursos.map((recurso, i) => (
                      <a
                        key={i}
                        href={recurso.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '12px 16px',
                          background: '#f8fafc',
                          border: '1px solid rgba(0,0,0,0.06)',
                          borderRadius: '10px',
                          color: '#6366f1',
                          textDecoration: 'none',
                          fontSize: '14px',
                          transition: 'all 0.2s'
                        }}
                      >
                        <span>
                          {recurso.tipo === 'pdf' ? '📄' :
                           recurso.tipo === 'video' ? '🎥' :
                           recurso.tipo === 'github' ? '💻' : '🔗'}
                        </span>
                        {recurso.titulo}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual mark-complete button */}
              {!preclaseCompleted && (
                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                  <button
                    onClick={() => markComplete(ids.preclase)}
                    className="complete-btn"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '12px 24px', fontSize: '14px', fontWeight: 600,
                      color: '#fff', background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      border: 'none', borderRadius: '10px', cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(34,197,94,0.3)',
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>✓</span>
                    Marcar preparación como completada
                  </button>
                </div>
              )}

              <PrepReadyButton storageKey={`prep-ready-${semana.num}`} />
            </section>
          )}

          {/* ===== CLASE EN VIVO ===== */}
          {activeSection === 'clase' && (
            <section>
              <div style={{ marginBottom: '28px' }}>
                <h2 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                  Clase en vivo
                </h2>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                  {semana.clase.fecha} • {semana.clase.hora} • {semana.clase.duracion}
                </p>
              </div>

              {/* Attendance status (readonly — marked by instructor) */}
              <div style={{
                background: claseCompleted ? '#f0fdf4' : '#fffbeb',
                border: `1px solid ${claseCompleted ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`,
                borderRadius: '12px', padding: '14px 18px', marginBottom: '12px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ fontSize: '18px' }}>{claseCompleted ? '✅' : '⏳'}</span>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: claseCompleted ? '#16a34a' : '#92400e' }}>
                    {claseCompleted ? 'Asistencia confirmada' : 'Pendiente de confirmación'}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: claseCompleted ? '#22c55e' : '#b45309' }}>
                    {claseCompleted ? 'El instructor ha confirmado tu asistencia' : 'El instructor confirmará tu asistencia después de la clase'}
                  </p>
                </div>
              </div>

              {/* Zoom card */}
              <div style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '16px',
                padding: '20px 24px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px', height: '44px',
                    background: 'linear-gradient(135deg, #2D8CFF, #0066DC)',
                    borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14"/><rect x="1" y="6" width="14" height="12" rx="2" ry="2"/></svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>{semana.titulo}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                      {semana.clase.fecha} · {semana.clase.hora} · {semana.clase.duracion}
                    </p>
                  </div>
                  {semana.clase.zoomUrl ? (
                    <a href={semana.clase.zoomUrl} target="_blank" rel="noopener noreferrer" className="zoom-btn" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '7px',
                      padding: '9px 18px', flexShrink: 0,
                      background: '#2D8CFF', color: '#fff', fontSize: '13px', fontWeight: 600,
                      borderRadius: '8px', textDecoration: 'none',
                      boxShadow: '0 2px 6px rgba(45, 140, 255, 0.25)',
                      transition: 'all 0.2s',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14"/><rect x="1" y="6" width="14" height="12" rx="2" ry="2"/></svg>
                      Unirse a Zoom
                    </a>
                  ) : (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px', flexShrink: 0,
                      padding: '8px 14px', background: '#f8fafc',
                      border: '1px dashed #cbd5e1', borderRadius: '8px',
                      fontSize: '12px', color: '#94a3b8',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      Próximamente
                    </span>
                  )}
                </div>
              </div>

              {/* Pizarra card */}
              <Link href={`/curso/clase/${semana.num}`} className="pizarra-btn" style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '20px 24px', marginBottom: '16px',
                background: '#fff', borderRadius: '16px', textDecoration: 'none',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                transition: 'all 0.2s',
              }}>
                <div style={{
                  width: '44px', height: '44px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>Pizarra de clase</p>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#94a3b8' }}>Notas y contenido de la sesión en vivo</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>

              {/* Videos */}
              {semana.clase.videos && semana.clase.videos.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                  {semana.clase.videos.map((video, vi) => (
                    video.tipo === 'embed' ? (
                      <div key={vi}>
                        {semana.clase.videos!.length > 1 && (
                          <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
                            🎬 {video.titulo}
                          </p>
                        )}
                        <div style={{
                          position: 'relative',
                          paddingBottom: '56.25%',
                          height: 0,
                          background: '#0f172a',
                          borderRadius: '12px',
                          overflow: 'hidden',
                        }}>
                          <iframe
                            src={video.url}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              border: 'none'
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ) : (
                      <a
                        key={vi}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="video-link"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '16px 20px',
                          background: '#fff',
                          border: '1px solid rgba(0,0,0,0.06)',
                          borderRadius: '14px',
                          textDecoration: 'none',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span style={{
                          width: '44px',
                          height: '44px',
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          flexShrink: 0,
                        }}>
                          ▶️
                        </span>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>
                            {video.titulo}
                          </p>
                          <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
                            {video.passcode ? `Contraseña: ${video.passcode}` : 'Click para ver la grabación'}
                          </p>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                      </a>
                    )
                  ))}
                </div>
              ) : semana.clase.videoUrl ? (
                <div style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  background: '#0f172a',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '16px'
                }}>
                  <iframe
                    src={semana.clase.videoUrl}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '16px',
                  padding: '32px',
                  textAlign: 'center',
                  marginBottom: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>📹</span>
                  <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
                    El video se publicará después de la sesión en vivo
                  </p>
                </div>
              )}

              {/* Notas */}
              {semana.clase.notas && (
                <div style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
                    📝 Notas de la clase
                  </h4>
                  <div style={{
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: '#374151'
                  }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: semana.clase.notas
                          .replace(/^### (.+)$/gm, '<h5 style="font-size: 15px; font-weight: 600; color: #1e293b; margin: 20px 0 8px;">$1</h5>')
                          .replace(/^- (.+)$/gm, '<li style="margin-left: 16px; margin-bottom: 4px;">$1</li>')
                          .replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #0f172a;">$1</strong>')
                          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #6366f1; text-decoration: underline;">$1</a>')
                          .replace(/\n\n/g, '<br/>')
                      }}
                    />
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ===== ENTREGABLE ===== */}
          {activeSection === 'entregable' && (
            <section>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <h2 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                    Entregable
                  </h2>
                  <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                    {semana.entregable.titulo} • Fecha límite: {semana.entregable.fechaLimite}
                  </p>
                </div>
                {entregableCompleted && (
                  <span style={{
                    padding: '10px 16px', fontSize: '13px', fontWeight: 600,
                    color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '8px', whiteSpace: 'nowrap'
                  }}>
                    ✓ Completado
                  </span>
                )}
              </div>

              <p style={{
                margin: '0 0 20px',
                fontSize: '15px',
                color: '#374151',
                lineHeight: 1.6,
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                {semana.entregable.descripcion}
              </p>

              {/* Checklist */}
              <div style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>
                    Checklist
                  </h4>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: checklist.completedCount === checklist.totalItems ? '#22c55e' : '#64748b',
                    background: checklist.completedCount === checklist.totalItems ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.04)',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}>
                    {checklist.completedCount}/{checklist.totalItems}
                  </span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {semana.entregable.checklist.map((item, i) => (
                    <li
                      key={i}
                      onClick={() => checklist.toggleItem(i)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '10px 0',
                        borderBottom: i < semana.entregable.checklist.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                        fontSize: '14px',
                        color: checklist.checked[i] ? '#94a3b8' : '#374151',
                        textDecoration: checklist.checked[i] ? 'line-through' : 'none',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'all 0.15s'
                      }}
                    >
                      <span style={{
                        width: '20px',
                        height: '20px',
                        border: checklist.checked[i] ? 'none' : '2px solid #cbd5e1',
                        background: checklist.checked[i] ? '#22c55e' : 'transparent',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px',
                        fontSize: '12px',
                        color: '#fff',
                        transition: 'all 0.15s'
                      }}>
                        {checklist.checked[i] ? '✓' : ''}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Section navigation: Anterior / Siguiente */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}>
            {sectionIndex > 0 ? (
              <button
                onClick={goPrev}
                className="nav-section-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#64748b',
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                ← {SECTIONS[sectionIndex - 1].label}
              </button>
            ) : <div />}

            {sectionIndex < SECTIONS.length - 1 ? (
              <button
                onClick={goNext}
                className="nav-section-btn next-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#fff',
                  background: sidebarColors[SECTIONS[sectionIndex + 1].key],
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                {SECTIONS[sectionIndex + 1].label} →
              </button>
            ) : (
              /* Last section: show link to next/prev semana */
              <div style={{ display: 'flex', gap: '12px' }}>
                {semana.num < 10 && (
                  <Link href={`/curso/semana/${semana.num + 1}`} className="nav-section-btn next-btn" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#fff',
                    background: '#6366f1',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>
                    Semana {semana.num + 1} →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Semana nav (bottom) */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '16px',
            fontSize: '13px',
          }}>
            {semana.num > 1 ? (
              <Link href={`/curso/semana/${semana.num - 1}`} style={{
                color: '#94a3b8',
                textDecoration: 'none',
              }}>
                ← Semana {semana.num - 1}
              </Link>
            ) : <div />}

            {semana.num < 10 ? (
              <Link href={`/curso/semana/${semana.num + 1}`} style={{
                color: '#94a3b8',
                textDecoration: 'none',
              }}>
                Semana {semana.num + 1} →
              </Link>
            ) : <div />}
          </div>
        </main>
      </div>

      <style jsx global>{`
        .pizarra-btn:hover { background: #f5f3ff !important; border-color: #c7d2fe !important; box-shadow: 0 2px 8px rgba(99,102,241,0.1) !important; }
        .zoom-btn:hover { box-shadow: 0 4px 14px rgba(45, 140, 255, 0.35) !important; transform: translateY(-1px); }
        .nav-section-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.12) !important; }
        .sidebar-btn:hover { background: rgba(0,0,0,0.04) !important; }
        .complete-btn:hover { opacity: 0.9; }
        .video-link:hover { border-color: rgba(99,102,241,0.3) !important; box-shadow: 0 2px 8px rgba(99,102,241,0.1) !important; }
        .sidebar::-webkit-scrollbar { width: 4px; }
        .sidebar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 2px; }
        @media (min-width: 769px) {
          .mobile-tabs { display: none !important; }
          .mobile-header { display: none !important; }
          .sidebar { display: flex !important; }
        }
        @media (max-width: 768px) {
          .mobile-tabs { display: flex !important; }
          .mobile-header { display: flex !important; }
          .sidebar { display: none !important; }
          .sidebar-spacer { display: none !important; }
          .layout-wrapper { padding: 0 !important; }
          main { padding: 20px 16px 60px !important; }
          h2 { font-size: 20px !important; }
          .complete-btn { padding: 8px 12px !important; font-size: 12px !important; }
        }
      `}</style>
    </div>
  )
}

function SemanaLockGuard({ semana, children }: { semana: Semana; children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check admin bypass
    const adminPass = localStorage.getItem('josu-admin-password')
    if (adminPass) {
      setIsAdmin(true)
      setUnlocked(true)
      return
    }

    // Check if week is unlocked via API
    fetch('/api/curso/config')
      .then(res => res.json())
      .then(data => {
        setUnlocked(data.semanasStatus?.[semana.num] || false)
      })
      .catch(() => setUnlocked(false))
  }, [semana.num])

  if (unlocked === null) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif"
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

  if (!unlocked) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#0f172a',
        padding: '24px'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '440px',
          background: '#fff',
          borderRadius: '20px',
          padding: '48px 32px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
        }}>
          <span style={{ fontSize: '56px', display: 'block', marginBottom: '20px' }}>🔒</span>
          <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
            Semana {semana.num} bloqueada
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, marginBottom: '28px' }}>
            Esta semana aún no está disponible. Se desbloqueará cuando el instructor la active.
          </p>
          <Link href="/curso" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: 600,
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
          }}>
            ← Volver al curso
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {isAdmin && (
        <div style={{
          background: '#fef3c7',
          borderBottom: '1px solid #fde047',
          padding: '8px 24px',
          fontSize: '13px',
          color: '#92400e',
          fontWeight: 500,
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif"
        }}>
          👨‍🏫 Vista de admin — Los alumnos ven esto mismo
        </div>
      )}
      {children}
    </>
  )
}

function SemanaPage() {
  const router = useRouter()
  const { num } = router.query
  const semanaNum = parseInt(num as string, 10)

  if (!num || isNaN(semanaNum) || semanaNum < 1 || semanaNum > 10) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0f172a',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Semana no encontrada</h1>
          <Link href="/curso" style={{ color: '#6366f1' }}>← Volver al curso</Link>
        </div>
      </div>
    )
  }

  const semana = CURSO_SEMANAS.find(s => s.num === semanaNum)

  if (!semana) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0f172a',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Semana no encontrada</h1>
          <Link href="/curso" style={{ color: '#6366f1' }}>← Volver al curso</Link>
        </div>
      </div>
    )
  }

  return (
    <SemanaLockGuard semana={semana}>
      {semana.dias ? <SemanaContentMultiDay semana={semana} /> : <SemanaContent semana={semana} />}
    </SemanaLockGuard>
  )
}

(SemanaPage as NextPageWithLayout).getLayout = (page: ReactElement) => (
  <CursoEmailGate>{page}</CursoEmailGate>
)

export default SemanaPage
