import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { MODULOS_AUTOGUIADO } from '../../../lib/curso-autoguiado-data'

interface AutoguiadoStats {
  totalAlumnos: number
  alumnosActivos: number
  promedioProgreso: number
  porModulo: Record<number, number>
}

interface UserAutoguiado {
  email: string
  enrolledAt: string
  lastSyncAt?: string
  autoguiadoCompleted: number
  unlockStatus: Record<number, { unlocked: boolean; availableDate: string; daysRemaining: number }>
  autoguiadoOverrides: Record<number, boolean>
}

export default function AdminAutoguiadoDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<AutoguiadoStats | null>(null)
  const [users, setUsers] = useState<UserAutoguiado[]>([])
  const [search, setSearch] = useState('')
  const [overrideLoading, setOverrideLoading] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Use stored password for auth
      const password = localStorage.getItem('josu-admin-password')
      if (password) {
        await fetch('/api/admin/precurso/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ secret: password })
        })
      }

      const res = await fetch('/api/admin/autoguiado/progress')
      if (res.ok) {
        const data = await res.json()
        setStats(data.stats || null)
        setUsers(data.users || [])
      } else if (res.status === 401) {
        window.location.href = '/josu-admin'
        return
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOverride = async (email: string, moduloNum: number, unlock: boolean) => {
    setOverrideLoading(`${email}-${moduloNum}`)
    try {
      const res = await fetch('/api/admin/autoguiado/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, moduloNum, unlock })
      })
      if (res.ok) {
        loadData()
      }
    } catch (error) {
      console.error('Error setting override:', error)
    } finally {
      setOverrideLoading(null)
    }
  }

  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / 86400000)
    if (diffDays < 1) return 'Hoy'
    if (diffDays < 7) return `Hace ${diffDays}d`
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
  }

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}>
        <p style={{ color: '#64748b' }}>Cargando...</p>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <Head>
        <title>Admin - Curso Autoguiado</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', margin: 0 }}>
          Admin - Curso Autoguiado
        </h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link href="/josu-admin" style={{
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#64748b',
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            textDecoration: 'none',
          }}>
            Panel Precurso
          </Link>
          <Link href="/josu-admin/curso" style={{
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'white',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            border: 'none',
            borderRadius: '6px',
            textDecoration: 'none',
          }}>
            Panel Curso 10 Semanas
          </Link>
          <button onClick={loadData} style={{
            padding: '8px 16px',
            fontSize: '14px',
            color: '#6366f1',
            background: '#eef2ff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}>
            Actualizar
          </button>
        </div>
      </header>

      <main style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Stats Grid */}
        {stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}>
            {[
              { value: stats.totalAlumnos, label: 'Alumnos autoguiado', color: '#1e293b' },
              { value: stats.alumnosActivos, label: 'Activos (7d)', color: '#22c55e' },
              { value: `${Math.round(stats.promedioProgreso)}%`, label: 'Progreso promedio', color: '#6366f1' },
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
              }}>
                <p style={{ fontSize: '28px', fontWeight: 700, color: stat.color, margin: 0 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Module Funnel */}
        {stats && (
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            marginBottom: '24px',
          }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: '0 0 16px' }}>
              Funnel por modulo
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {MODULOS_AUTOGUIADO.map(modulo => {
                const count = stats.porModulo[modulo.num] || 0
                const maxCount = Math.max(...Object.values(stats.porModulo), 1)
                const percent = (count / maxCount) * 100

                return (
                  <div key={modulo.num} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '140px', fontSize: '13px', color: '#64748b', flexShrink: 0 }}>
                      {modulo.emoji} M{modulo.num}: {modulo.titulo.slice(0, 15)}{modulo.titulo.length > 15 ? '...' : ''}
                    </div>
                    <div style={{
                      flex: 1,
                      height: '24px',
                      background: '#f1f5f9',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      <div style={{
                        width: `${percent}%`,
                        height: '100%',
                        background: modulo.gratis ? '#22c55e' : '#6366f1',
                        borderRadius: '6px',
                        transition: 'width 0.3s',
                        minWidth: count > 0 ? '24px' : '0',
                      }} />
                      {count > 0 && (
                        <span style={{
                          position: 'absolute',
                          left: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: percent > 20 ? '#fff' : '#64748b',
                        }}>
                          {count}
                        </span>
                      )}
                    </div>
                    <div style={{ width: '50px', fontSize: '13px', color: '#64748b', textAlign: 'right' }}>
                      {count}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Users Table */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
              Alumnos ({filteredUsers.length})
            </h2>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar email..."
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                width: '200px',
              }}
            />
          </div>

          {filteredUsers.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <p style={{ color: '#64748b' }}>
                {search ? 'No se encontraron resultados' : 'No hay alumnos con progreso autoguiado'}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Email</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Inscripcion</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Completados</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Ultimo acceso</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Override</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.email} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1e293b' }}>
                        {user.email}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#64748b' }}>
                        {new Date(user.enrolledAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          fontSize: '13px',
                          fontWeight: 600,
                          borderRadius: '12px',
                          background: user.autoguiadoCompleted >= 10 ? '#dcfce7' : '#f1f5f9',
                          color: user.autoguiadoCompleted >= 10 ? '#16a34a' : '#64748b',
                        }}>
                          {user.autoguiadoCompleted}/11
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                        {user.lastSyncAt ? formatRelativeTime(user.lastSyncAt) : 'Sin actividad'}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <select
                          onChange={(e) => {
                            const moduloNum = parseInt(e.target.value)
                            if (!isNaN(moduloNum)) {
                              handleOverride(user.email, moduloNum, true)
                              e.target.value = ''
                            }
                          }}
                          style={{
                            padding: '6px 10px',
                            fontSize: '12px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            background: '#fff',
                          }}
                          disabled={overrideLoading === `${user.email}-override`}
                        >
                          <option value="">Desbloquear...</option>
                          {MODULOS_AUTOGUIADO.filter(m => m.num > 0).map(m => {
                            const status = user.unlockStatus[m.num]
                            if (status?.unlocked) return null
                            return (
                              <option key={m.num} value={m.num}>
                                M{m.num}: {m.titulo}
                              </option>
                            )
                          })}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
