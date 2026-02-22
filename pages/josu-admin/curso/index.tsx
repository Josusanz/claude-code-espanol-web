import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { CURSO_SEMANAS, getCursoTrackingIdsForSemana, getCursoTotalItems } from '../../../lib/curso-data'
import type { CursoUser, CursoStats } from '../../../lib/curso-kv'

type View = 'dashboard' | `semana-${number}`

export default function AdminCursoDashboard() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<CursoUser[]>([])
  const [stats, setStats] = useState<CursoStats | null>(null)
  const [semanasStatus, setSemanasStatus] = useState<Record<number, boolean>>({})
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [attendanceLoading, setAttendanceLoading] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<View>('dashboard')

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    try {
      const [progressRes, configRes] = await Promise.all([
        fetch('/api/admin/curso/progress'),
        fetch('/api/curso/config'),
      ])
      if (progressRes.ok) {
        const data = await progressRes.json()
        setUsers(data.users || [])
        setStats(data.stats || null)
      }
      if (configRes.ok) {
        const data = await configRes.json()
        setSemanasStatus(data.semanasStatus || {})
      }
    } catch (err) {
      setError('Error cargando datos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleSemana = async (semanaNum: number) => {
    setActionLoading(semanaNum)
    try {
      const res = await fetch('/api/admin/curso/unlock-week', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ semanaNum, unlock: !semanasStatus[semanaNum] })
      })
      if (res.ok) {
        const data = await res.json()
        setSemanasStatus(data.semanasStatus || {})
      } else {
        const err = await res.json().catch(() => ({}))
        alert(`Error: ${err.error || 'No se pudo cambiar el estado'}`)
      }
    } catch {
      alert('Error de conexión')
    } finally {
      setActionLoading(null)
    }
  }

  const toggleAttendance = async (email: string, semanaNum: number, dayNum?: number) => {
    const key = `${email}-${semanaNum}-${dayNum || 0}`
    setAttendanceLoading(key)

    // Check current attendance state
    const trackingKey = dayNum
      ? `semana-${semanaNum}-d${dayNum}-clase`
      : `semana-${semanaNum}-clase`
    const user = users.find(u => u.email === email)
    const currentlyAttended = user?.progress[trackingKey] || false

    try {
      const res = await fetch('/api/admin/curso/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, semanaNum, dayNum, attended: !currentlyAttended })
      })
      if (res.ok) {
        // Update local state
        setUsers(prev => prev.map(u => {
          if (u.email !== email) return u
          return { ...u, progress: { ...u.progress, [trackingKey]: !currentlyAttended } }
        }))
      } else {
        alert('Error al marcar asistencia')
      }
    } catch {
      alert('Error de conexión')
    } finally {
      setAttendanceLoading(null)
    }
  }

  const getCurrentWeek = () => {
    const SEMANAS_FECHAS: Record<number, string> = {
      1: '2026-02-19', 2: '2026-02-27', 3: '2026-03-06', 4: '2026-03-13',
      5: '2026-03-20', 6: '2026-03-27', 7: '2026-04-03', 8: '2026-04-10',
      9: '2026-04-17', 10: '2026-04-24',
    }
    const hoy = new Date()
    for (let i = 10; i >= 1; i--) {
      if (hoy >= new Date(SEMANAS_FECHAS[i])) return i
    }
    return 1
  }

  const currentWeek = getCurrentWeek()
  const totalItems = getCursoTotalItems()

  const getUserProgress = (user: CursoUser) => {
    const completed = CURSO_SEMANAS.reduce((acc, s) => {
      const ids = getCursoTrackingIdsForSemana(s.num)
      return acc + ids.filter(id => user.progress[id]).length
    }, 0)
    return { completed, total: totalItems, percentage: totalItems > 0 ? (completed / totalItems) * 100 : 0 }
  }

  const getUserSemanaProgress = (user: CursoUser, semanaNum: number) => {
    const ids = getCursoTrackingIdsForSemana(semanaNum)
    const completed = ids.filter(id => user.progress[id]).length
    return { completed, total: ids.length }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid #e2e8f0', borderTop: '4px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const activeSemanaNum = activeView.startsWith('semana-') ? parseInt(activeView.split('-')[1]) : null
  const activeSemana = activeSemanaNum ? CURSO_SEMANAS.find(s => s.num === activeSemanaNum) : null

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", display: 'flex' }}>
      <Head>
        <title>Panel Instructor | Curso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Sidebar */}
      <aside style={{
        width: '240px', flexShrink: 0, background: '#fff', borderRight: '1px solid #e2e8f0',
        position: 'fixed', top: 0, left: 0, height: '100vh', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', zIndex: 50,
      }}>
        {/* Sidebar header */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '20px' }}>👨‍🏫</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>Panel Instructor</span>
          </div>
          <Link href="/josu-admin" style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'none' }}>
            ← Volver a Admin
          </Link>
        </div>

        {/* Dashboard link */}
        <nav style={{ padding: '8px', flex: 1 }}>
          <button
            onClick={() => setActiveView('dashboard')}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
              padding: '10px 12px', fontSize: '14px', fontWeight: activeView === 'dashboard' ? 600 : 400,
              color: activeView === 'dashboard' ? '#6366f1' : '#64748b',
              background: activeView === 'dashboard' ? '#eef2ff' : 'transparent',
              border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
            }}
          >
            <span style={{ fontSize: '16px' }}>📊</span> Dashboard
          </button>

          {/* Divider */}
          <div style={{ height: '1px', background: '#e2e8f0', margin: '8px 12px' }} />

          {/* Semanas */}
          <p style={{ margin: '8px 12px 4px', fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Curso
          </p>
          {CURSO_SEMANAS.map(semana => {
            const viewKey: View = `semana-${semana.num}`
            const isActive = activeView === viewKey
            const isUnlocked = semanasStatus[semana.num]
            return (
              <button
                key={semana.num}
                onClick={() => setActiveView(viewKey)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                  padding: '8px 12px', fontSize: '13px', fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#6366f1' : '#64748b',
                  background: isActive ? '#eef2ff' : 'transparent',
                  border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '14px' }}>{semana.emoji}</span>
                <span style={{ flex: 1 }}>S{semana.num} {semana.titulo.split(' ')[0]}</span>
                {isUnlocked && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />}
              </button>
            )
          })}

          {/* Divider */}
          <div style={{ height: '1px', background: '#e2e8f0', margin: '8px 12px' }} />

          {/* Quick links */}
          <Link href="/josu-admin/curso/videos" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px 12px', fontSize: '13px', color: '#64748b',
            textDecoration: 'none', borderRadius: '8px',
          }}>
            <span style={{ fontSize: '14px' }}>🎬</span> Videos
          </Link>
          <Link href="/curso/ranking" target="_blank" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px 12px', fontSize: '13px', color: '#64748b',
            textDecoration: 'none', borderRadius: '8px',
          }}>
            <span style={{ fontSize: '14px' }}>🏆</span> Ranking
          </Link>
          <Link href="/curso/dudas" target="_blank" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px 12px', fontSize: '13px', color: '#64748b',
            textDecoration: 'none', borderRadius: '8px',
          }}>
            <span style={{ fontSize: '14px' }}>❓</span> Dudas
          </Link>
          <Link href="/curso/proyectos" target="_blank" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px 12px', fontSize: '13px', color: '#64748b',
            textDecoration: 'none', borderRadius: '8px',
          }}>
            <span style={{ fontSize: '14px' }}>🏗️</span> Proyectos
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: '240px', padding: '32px', maxWidth: '1100px' }}>
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px', marginBottom: '24px', color: '#dc2626' }}>
            {error}
          </div>
        )}

        {/* ===== DASHBOARD VIEW ===== */}
        {activeView === 'dashboard' && (
          <>
            <h1 style={{ margin: '0 0 24px', fontSize: '22px', fontWeight: 700, color: '#1e293b' }}>
              Dashboard
            </h1>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Alumnos</p>
                <p style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#1e293b' }}>{stats?.totalAlumnos || users.length}</p>
              </div>
              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Semana</p>
                <p style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#6366f1' }}>S{currentWeek}</p>
              </div>
              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Progreso prom.</p>
                <p style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#22c55e' }}>{Math.round(stats?.promedioProgreso || 0)}%</p>
              </div>
              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Activos (7d)</p>
                <p style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#f59e0b' }}>{stats?.alumnosActivos || 0}</p>
              </div>
            </div>

            {/* Current week quick card */}
            {(() => {
              const cw = CURSO_SEMANAS.find(s => s.num === currentWeek)
              if (!cw) return null
              const isUnlocked = semanasStatus[currentWeek]
              return (
                <div style={{
                  background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0',
                  marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '16px',
                }}>
                  <span style={{ fontSize: '32px' }}>{cw.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                      Semana {cw.num}: {cw.titulo}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
                      {cw.clase.fecha} · {cw.clase.hora} · {isUnlocked ? '✅ Desbloqueada' : '🔒 Bloqueada'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveView(`semana-${currentWeek}`)}
                    style={{
                      padding: '10px 20px', fontSize: '14px', fontWeight: 600,
                      color: '#fff', background: '#6366f1', border: 'none',
                      borderRadius: '8px', cursor: 'pointer',
                    }}
                  >
                    Ver semana →
                  </button>
                </div>
              )
            })()}

            {/* Alumnos table (simplified) */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <h2 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                👥 Alumnos ({users.length})
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ textAlign: 'left', padding: '10px 8px', color: '#64748b', fontWeight: 500 }}>Email</th>
                      {CURSO_SEMANAS.map(s => (
                        <th key={s.num} style={{ textAlign: 'center', padding: '10px 2px', color: '#64748b', fontWeight: 500, minWidth: '36px' }}>
                          S{s.num}
                        </th>
                      ))}
                      <th style={{ textAlign: 'center', padding: '10px 8px', color: '#64748b', fontWeight: 500 }}>%</th>
                      <th style={{ textAlign: 'right', padding: '10px 8px', color: '#64748b', fontWeight: 500 }}>Última act.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => {
                      const progress = getUserProgress(user)
                      const lastSync = user.lastSyncAt
                        ? new Date(user.lastSyncAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
                        : '-'
                      return (
                        <tr key={user.email} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 8px', color: '#1e293b', whiteSpace: 'nowrap' }}>
                            {user.email.split('@')[0]}
                          </td>
                          {CURSO_SEMANAS.map(s => {
                            const sp = getUserSemanaProgress(user, s.num)
                            const pct = sp.total > 0 ? sp.completed / sp.total : 0
                            return (
                              <td key={s.num} style={{ textAlign: 'center', padding: '6px 2px' }}>
                                <span style={{
                                  display: 'inline-block', width: '22px', height: '22px', borderRadius: '5px',
                                  background: pct === 1 ? '#22c55e' : pct > 0 ? '#f59e0b' : '#e2e8f0',
                                  color: pct === 0 ? '#94a3b8' : 'white',
                                  fontSize: '10px', lineHeight: '22px', fontWeight: 600,
                                }}>
                                  {pct === 1 ? '✓' : pct > 0 ? sp.completed : '-'}
                                </span>
                              </td>
                            )
                          })}
                          <td style={{ textAlign: 'center', padding: '10px 8px' }}>
                            <span style={{
                              padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                              background: progress.percentage === 100 ? '#dcfce7' : progress.percentage > 50 ? '#fef9c3' : '#f1f5f9',
                              color: progress.percentage === 100 ? '#16a34a' : progress.percentage > 50 ? '#ca8a04' : '#64748b',
                            }}>
                              {Math.round(progress.percentage)}%
                            </span>
                          </td>
                          <td style={{ textAlign: 'right', padding: '10px 8px', color: '#94a3b8', fontSize: '12px' }}>
                            {lastSync}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              {users.length === 0 && (
                <p style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No hay alumnos registrados todavía</p>
              )}
            </div>
          </>
        )}

        {/* ===== SEMANA VIEW ===== */}
        {activeSemana && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '32px' }}>{activeSemana.emoji}</span>
              <div>
                <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#1e293b' }}>
                  Semana {activeSemana.num}: {activeSemana.titulo}
                </h1>
                <p style={{ margin: '2px 0 0', fontSize: '14px', color: '#64748b' }}>
                  {activeSemana.clase.fecha} · {activeSemana.clase.hora} · {activeSemana.clase.duracion}
                  {activeSemana.dias ? ` · ${activeSemana.dias.length} días` : ''}
                </p>
              </div>
            </div>

            {/* Lock/unlock + quick links */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <button
                onClick={() => toggleSemana(activeSemana.num)}
                disabled={actionLoading === activeSemana.num}
                style={{
                  padding: '10px 18px', fontSize: '13px', fontWeight: 600,
                  color: semanasStatus[activeSemana.num] ? '#dc2626' : '#16a34a',
                  background: semanasStatus[activeSemana.num] ? '#fef2f2' : '#f0fdf4',
                  border: `1px solid ${semanasStatus[activeSemana.num] ? '#fecaca' : '#bbf7d0'}`,
                  borderRadius: '8px', cursor: actionLoading === activeSemana.num ? 'wait' : 'pointer',
                  opacity: actionLoading === activeSemana.num ? 0.5 : 1,
                }}
              >
                {actionLoading === activeSemana.num ? '...'
                  : semanasStatus[activeSemana.num] ? '🔒 Bloquear semana' : '🔓 Desbloquear semana'}
              </button>
              <Link href={`/josu-admin/curso/semana/${activeSemana.num}`} style={{
                padding: '10px 18px', fontSize: '13px', fontWeight: 500,
                color: '#6366f1', background: '#eef2ff', border: '1px solid #c7d2fe',
                borderRadius: '8px', textDecoration: 'none',
              }}>
                📋 Guía instructor
              </Link>
              <Link href={`/curso/semana/${activeSemana.num}`} target="_blank" style={{
                padding: '10px 18px', fontSize: '13px', fontWeight: 500,
                color: '#64748b', background: '#f8fafc', border: '1px solid #e2e8f0',
                borderRadius: '8px', textDecoration: 'none',
              }}>
                👁 Vista alumno
              </Link>
              <Link href={`/curso/clase/${activeSemana.num}`} target="_blank" style={{
                padding: '10px 18px', fontSize: '13px', fontWeight: 500,
                color: '#64748b', background: '#f8fafc', border: '1px solid #e2e8f0',
                borderRadius: '8px', textDecoration: 'none',
              }}>
                📝 Pizarra
              </Link>
            </div>

            {/* Attendance + Progress table */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <h2 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                Asistencia y progreso
              </h2>

              {activeSemana.dias ? (
                // Multi-day attendance table
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ textAlign: 'left', padding: '10px 8px', color: '#64748b', fontWeight: 500 }}>Alumno</th>
                        {activeSemana.dias.map((dia, di) => (
                          <th key={di} colSpan={3} style={{
                            textAlign: 'center', padding: '10px 4px', color: '#64748b', fontWeight: 600,
                            borderLeft: di > 0 ? '2px solid #e2e8f0' : 'none',
                          }}>
                            {dia.emoji} Día {di + 1}
                          </th>
                        ))}
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '6px 8px' }} />
                        {activeSemana.dias.map((_, di) => (
                          <React.Fragment key={`hdr-${di}`}>
                            <th style={{ textAlign: 'center', padding: '6px 2px', color: '#94a3b8', fontWeight: 400, fontSize: '11px', borderLeft: di > 0 ? '2px solid #e2e8f0' : 'none' }}>Prep</th>
                            <th style={{ textAlign: 'center', padding: '6px 2px', color: '#94a3b8', fontWeight: 400, fontSize: '11px' }}>Clase</th>
                            <th style={{ textAlign: 'center', padding: '6px 2px', color: '#94a3b8', fontWeight: 400, fontSize: '11px' }}>Entreg</th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.email} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 8px', color: '#1e293b', whiteSpace: 'nowrap' }}>
                            {user.email.split('@')[0]}
                          </td>
                          {activeSemana.dias!.map((_, di) => {
                            const dayNum = di + 1
                            const preKey = `semana-${activeSemana.num}-d${dayNum}-preclase`
                            const clsKey = `semana-${activeSemana.num}-d${dayNum}-clase`
                            const entKey = `semana-${activeSemana.num}-d${dayNum}-entregable`
                            const loadKey = `${user.email}-${activeSemana.num}-${dayNum}`

                            return (
                              <React.Fragment key={`day-${di}`}>
                                <td style={{ textAlign: 'center', padding: '6px 2px', borderLeft: di > 0 ? '2px solid #e2e8f0' : 'none' }}>
                                  <span style={{
                                    display: 'inline-block', width: '22px', height: '22px', borderRadius: '5px',
                                    background: user.progress[preKey] ? '#22c55e' : '#e2e8f0',
                                    color: user.progress[preKey] ? 'white' : '#94a3b8',
                                    fontSize: '10px', lineHeight: '22px', fontWeight: 600,
                                  }}>
                                    {user.progress[preKey] ? '✓' : '-'}
                                  </span>
                                </td>
                                <td style={{ textAlign: 'center', padding: '6px 2px' }}>
                                  <button
                                    onClick={() => toggleAttendance(user.email, activeSemana.num, dayNum)}
                                    disabled={attendanceLoading === loadKey}
                                    title={user.progress[clsKey] ? 'Desmarcar asistencia' : 'Marcar asistencia'}
                                    style={{
                                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                      width: '26px', height: '26px', borderRadius: '6px',
                                      background: user.progress[clsKey] ? '#22c55e' : '#fff',
                                      border: `2px solid ${user.progress[clsKey] ? '#22c55e' : '#cbd5e1'}`,
                                      color: user.progress[clsKey] ? 'white' : '#94a3b8',
                                      fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                                      opacity: attendanceLoading === loadKey ? 0.4 : 1,
                                    }}
                                  >
                                    {user.progress[clsKey] ? '✓' : ''}
                                  </button>
                                </td>
                                <td style={{ textAlign: 'center', padding: '6px 2px' }}>
                                  <span style={{
                                    display: 'inline-block', width: '22px', height: '22px', borderRadius: '5px',
                                    background: user.progress[entKey] ? '#22c55e' : '#e2e8f0',
                                    color: user.progress[entKey] ? 'white' : '#94a3b8',
                                    fontSize: '10px', lineHeight: '22px', fontWeight: 600,
                                  }}>
                                    {user.progress[entKey] ? '✓' : '-'}
                                  </span>
                                </td>
                              </React.Fragment>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                // Single-day attendance table
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ textAlign: 'left', padding: '10px 8px', color: '#64748b', fontWeight: 500 }}>Alumno</th>
                        <th style={{ textAlign: 'center', padding: '10px 8px', color: '#64748b', fontWeight: 500 }}>Preparación</th>
                        <th style={{ textAlign: 'center', padding: '10px 8px', color: '#64748b', fontWeight: 500 }}>Clase (asistencia)</th>
                        <th style={{ textAlign: 'center', padding: '10px 8px', color: '#64748b', fontWeight: 500 }}>Entregable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => {
                        const preKey = `semana-${activeSemana.num}-preclase`
                        const clsKey = `semana-${activeSemana.num}-clase`
                        const entKey = `semana-${activeSemana.num}-entregable`
                        const loadKey = `${user.email}-${activeSemana.num}-0`

                        return (
                          <tr key={user.email} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 8px', color: '#1e293b' }}>
                              {user.email.split('@')[0]}
                            </td>
                            <td style={{ textAlign: 'center', padding: '12px 8px' }}>
                              <span style={{
                                display: 'inline-block', width: '26px', height: '26px', borderRadius: '6px',
                                background: user.progress[preKey] ? '#22c55e' : '#e2e8f0',
                                color: user.progress[preKey] ? 'white' : '#94a3b8',
                                fontSize: '12px', lineHeight: '26px', fontWeight: 600,
                              }}>
                                {user.progress[preKey] ? '✓' : '-'}
                              </span>
                            </td>
                            <td style={{ textAlign: 'center', padding: '12px 8px' }}>
                              <button
                                onClick={() => toggleAttendance(user.email, activeSemana.num)}
                                disabled={attendanceLoading === loadKey}
                                title={user.progress[clsKey] ? 'Desmarcar asistencia' : 'Marcar asistencia'}
                                style={{
                                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                  width: '30px', height: '30px', borderRadius: '6px',
                                  background: user.progress[clsKey] ? '#22c55e' : '#fff',
                                  border: `2px solid ${user.progress[clsKey] ? '#22c55e' : '#cbd5e1'}`,
                                  color: user.progress[clsKey] ? 'white' : '#94a3b8',
                                  fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                                  opacity: attendanceLoading === loadKey ? 0.4 : 1,
                                }}
                              >
                                {user.progress[clsKey] ? '✓' : ''}
                              </button>
                            </td>
                            <td style={{ textAlign: 'center', padding: '12px 8px' }}>
                              <span style={{
                                display: 'inline-block', width: '26px', height: '26px', borderRadius: '6px',
                                background: user.progress[entKey] ? '#22c55e' : '#e2e8f0',
                                color: user.progress[entKey] ? 'white' : '#94a3b8',
                                fontSize: '12px', lineHeight: '26px', fontWeight: 600,
                              }}>
                                {user.progress[entKey] ? '✓' : '-'}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {users.length === 0 && (
                <p style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No hay alumnos registrados todavía</p>
              )}
            </div>
          </>
        )}
      </main>

      <style jsx global>{`
        aside button:hover { background: #f1f5f9 !important; }
        aside a:hover { background: #f1f5f9 !important; }
      `}</style>
    </div>
  )
}
