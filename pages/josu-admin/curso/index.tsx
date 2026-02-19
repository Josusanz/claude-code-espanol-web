import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CURSO_SEMANAS, getCursoTrackingIds } from '../../../lib/curso-data'
import type { CursoUser, CursoStats } from '../../../lib/curso-kv'

export default function AdminCursoDashboard() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<CursoUser[]>([])
  const [stats, setStats] = useState<CursoStats | null>(null)
  const [semanasStatus, setSemanasStatus] = useState<Record<number, boolean>>({})
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<number | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Cargar usuarios y stats (auth por cookie)
      const progressRes = await fetch('/api/admin/curso/progress')
      if (progressRes.ok) {
        const data = await progressRes.json()
        setUsers(data.users || [])
        setStats(data.stats || null)
      }

      // Cargar estado de semanas
      const configRes = await fetch('/api/curso/config')
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
        body: JSON.stringify({
          semanaNum,
          unlock: !semanasStatus[semanaNum]
        })
      })

      if (res.ok) {
        const data = await res.json()
        setSemanasStatus(data.semanasStatus || {})
      } else {
        const err = await res.json().catch(() => ({}))
        alert(`Error: ${err.error || 'No se pudo cambiar el estado'}`)
      }
    } catch (err) {
      console.error('Error toggling semana:', err)
      alert('Error de conexión')
    } finally {
      setActionLoading(null)
    }
  }

  // Calcular semana actual
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

  // Calcular progreso de un usuario
  const getUserProgress = (user: CursoUser) => {
    const completed = Object.values(user.progress).filter(Boolean).length
    return { completed, total: 30, percentage: (completed / 30) * 100 }
  }

  // Calcular progreso por semana de un usuario
  const getUserSemanaStatus = (user: CursoUser, semanaNum: number) => {
    const ids = getCursoTrackingIds(semanaNum)
    const completed = [ids.preclase, ids.clase, ids.entregable].filter(id => user.progress[id]).length
    if (completed === 3) return 'complete'
    if (completed > 0) return 'in-progress'
    return 'pending'
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
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

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <Head>
        <title>Panel Instructor | Curso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>👨‍🏫</span>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: '#1e293b' }}>
            Panel Instructor
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/josu-admin/curso/videos" style={{
            padding: '8px 16px',
            fontSize: '14px',
            color: 'white',
            background: '#6366f1',
            textDecoration: 'none',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 500
          }}>
            🎬 Videos
          </Link>
          <Link href="/josu-admin" style={{
            padding: '8px 16px',
            fontSize: '14px',
            color: '#64748b',
            textDecoration: 'none',
            border: '1px solid #e2e8f0',
            borderRadius: '8px'
          }}>
            ← Volver a Admin
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            color: '#dc2626'
          }}>
            {error}
          </div>
        )}

        {/* Stats cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#64748b' }}>Alumnos</p>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#1e293b' }}>
              {stats?.totalAlumnos || users.length}
            </p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#64748b' }}>Semana actual</p>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#6366f1' }}>
              S{currentWeek}
            </p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#64748b' }}>Progreso promedio</p>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#22c55e' }}>
              {Math.round(stats?.promedioProgreso || 0)}%
            </p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#64748b' }}>Activos (7d)</p>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#f59e0b' }}>
              {stats?.alumnosActivos || 0}
            </p>
          </div>
        </div>

        {/* Videos por grabar */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600 }}>
                🎬 Videos por grabar
              </h2>
              <p style={{ margin: '0 0 16px', opacity: 0.9, fontSize: '14px' }}>
                13 videos en total: 3 precurso + 10 intros semanales
              </p>
              <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
                <div>
                  <span style={{ opacity: 0.7 }}>Precurso:</span>
                  <span style={{ marginLeft: '8px', fontWeight: 600 }}>~20 min</span>
                </div>
                <div>
                  <span style={{ opacity: 0.7 }}>Intros:</span>
                  <span style={{ marginLeft: '8px', fontWeight: 600 }}>~25 min</span>
                </div>
                <div>
                  <span style={{ opacity: 0.7 }}>Total:</span>
                  <span style={{ marginLeft: '8px', fontWeight: 600 }}>~45 min</span>
                </div>
              </div>
            </div>
            <Link href="/josu-admin/curso/videos" style={{
              padding: '12px 24px',
              background: 'white',
              color: '#6366f1',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '14px'
            }}>
              Ver guiones →
            </Link>
          </div>
        </div>

        {/* Semanas control */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          marginBottom: '32px'
        }}>
          <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
            📅 Semanas (click para ver guía)
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '12px',
            marginBottom: '24px'
          }}>
            {CURSO_SEMANAS.map(semana => {
              const isUnlocked = semanasStatus[semana.num]
              const isLoading = actionLoading === semana.num

              return (
                <Link
                  key={semana.num}
                  href={`/josu-admin/curso/semana/${semana.num}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px',
                    background: isUnlocked ? '#f0fdf4' : '#f8fafc',
                    border: `2px solid ${isUnlocked ? '#22c55e' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{semana.emoji}</span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isUnlocked ? '#16a34a' : '#64748b'
                  }}>
                    S{semana.num}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    color: isUnlocked ? '#22c55e' : '#94a3b8'
                  }}>
                    {isUnlocked ? '✓ Abierta' : 'Cerrada'}
                  </span>
                </Link>
              )
            })}
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '16px'
          }}>
            {CURSO_SEMANAS.map(semana => {
              const isUnlocked = semanasStatus[semana.num]
              const isLoading = actionLoading === semana.num

              return (
                <button
                  key={semana.num}
                  onClick={(e) => { e.stopPropagation(); toggleSemana(semana.num) }}
                  disabled={isLoading}
                  style={{
                    padding: '10px 16px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: isUnlocked ? '#dc2626' : '#16a34a',
                    background: isUnlocked ? '#fef2f2' : '#f0fdf4',
                    border: `1px solid ${isUnlocked ? '#fecaca' : '#bbf7d0'}`,
                    borderRadius: '8px',
                    cursor: isLoading ? 'wait' : 'pointer',
                    opacity: isLoading ? 0.5 : 1
                  }}
                >
                  {isLoading ? '...' : (isUnlocked ? `🔒 Bloquear S${semana.num}` : `🔓 Desbloquear S${semana.num}`)}
                </button>
              )
            })}
          </div>

          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {CURSO_SEMANAS.map(semana => (
              <Link
                key={semana.num}
                href={`/curso/semana/${semana.num}`}
                target="_blank"
                style={{
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#6366f1',
                  background: '#eef2ff',
                  border: '1px solid #c7d2fe',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                👁 Vista alumno S{semana.num}
              </Link>
            ))}
          </div>
        </div>

        {/* Progreso por alumno */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e2e8f0'
        }}>
          <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
            👥 Progreso por alumno
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 500 }}>Email</th>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <th key={n} style={{ textAlign: 'center', padding: '12px 4px', color: '#64748b', fontWeight: 500, minWidth: '40px' }}>
                      S{n}
                    </th>
                  ))}
                  <th style={{ textAlign: 'center', padding: '12px 8px', color: '#64748b', fontWeight: 500 }}>Total</th>
                  <th style={{ textAlign: 'right', padding: '12px 8px', color: '#64748b', fontWeight: 500 }}>Última act.</th>
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
                      <td style={{ padding: '12px 8px', color: '#1e293b' }}>
                        {user.email}
                      </td>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => {
                        const status = getUserSemanaStatus(user, n)
                        return (
                          <td key={n} style={{ textAlign: 'center', padding: '8px 4px' }}>
                            <span style={{
                              display: 'inline-block',
                              width: '24px',
                              height: '24px',
                              borderRadius: '6px',
                              background: status === 'complete' ? '#22c55e' :
                                         status === 'in-progress' ? '#f59e0b' : '#e2e8f0',
                              color: status === 'pending' ? '#94a3b8' : 'white',
                              fontSize: '11px',
                              lineHeight: '24px',
                              fontWeight: 600
                            }}>
                              {status === 'complete' ? '✓' :
                               status === 'in-progress' ? '🔵' : '-'}
                            </span>
                          </td>
                        )
                      })}
                      <td style={{ textAlign: 'center', padding: '12px 8px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          background: progress.percentage === 100 ? '#dcfce7' :
                                       progress.percentage > 50 ? '#fef9c3' : '#f1f5f9',
                          color: progress.percentage === 100 ? '#16a34a' :
                                 progress.percentage > 50 ? '#ca8a04' : '#64748b',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600
                        }}>
                          {Math.round(progress.percentage)}%
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', padding: '12px 8px', color: '#64748b' }}>
                        {lastSync}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <p style={{
              textAlign: 'center',
              padding: '40px',
              color: '#94a3b8'
            }}>
              No hay alumnos registrados todavía
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
