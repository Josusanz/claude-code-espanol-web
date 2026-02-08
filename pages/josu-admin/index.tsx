import Head from 'next/head'
import { useState, useEffect, FormEvent } from 'react'

interface UserProgress {
  email: string
  addedAt: string
  progress: Record<string, boolean>
  lastSyncAt?: string
  completedCount: number
  totalSections: number
  progressPercent: number
  isCompleted: boolean
}

interface Stats {
  totalUsers: number
  completedUsers: number
  averageProgress: number
}

export default function PrecursoAdminPage() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [secret, setSecret] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Data states
  const [stats, setStats] = useState<Stats | null>(null)
  const [users, setUsers] = useState<UserProgress[]>([])
  const [sections, setSections] = useState<Record<string, string>>({})

  // Add email states
  const [newEmails, setNewEmails] = useState('')
  const [addingEmails, setAddingEmails] = useState(false)
  const [addResult, setAddResult] = useState<{ added: number; skipped: number } | null>(null)

  // Search/filter
  const [search, setSearch] = useState('')

  // Expanded user detail
  const [expandedUser, setExpandedUser] = useState<string | null>(null)

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/precurso/auth')
      const data = await res.json()
      setAuthenticated(data.authenticated)
      if (data.authenticated) {
        loadData()
      }
    } catch {
      // Not authenticated
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)

    try {
      const res = await fetch('/api/admin/precurso/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret })
      })

      if (res.ok) {
        setAuthenticated(true)
        loadData()
      } else {
        setAuthError('Secret incorrecto')
      }
    } catch {
      setAuthError('Error de conexión')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/precurso/auth', { method: 'DELETE' })
    setAuthenticated(false)
    setStats(null)
    setUsers([])
  }

  const loadData = async () => {
    try {
      const res = await fetch('/api/admin/precurso/progress')
      if (res.ok) {
        const data = await res.json()
        setStats(data.stats)
        setUsers(data.users)
        setSections(data.sections)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleAddEmails = async (e: FormEvent) => {
    e.preventDefault()
    if (!newEmails.trim()) return

    setAddingEmails(true)
    setAddResult(null)

    try {
      const res = await fetch('/api/admin/precurso/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails: newEmails })
      })

      if (res.ok) {
        const data = await res.json()
        setAddResult({ added: data.added, skipped: data.skipped })
        setNewEmails('')
        loadData()
      }
    } catch (error) {
      console.error('Error adding emails:', error)
    } finally {
      setAddingEmails(false)
    }
  }

  const handleDeleteEmail = async (email: string) => {
    if (!confirm(`¿Eliminar a ${email} del precurso?`)) return

    try {
      const res = await fetch('/api/admin/precurso/emails', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (res.ok) {
        loadData()
      }
    } catch (error) {
      console.error('Error deleting email:', error)
    }
  }

  // Filter users by search
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase())
  )

  // Calculate section stats
  const sectionStats = Object.keys(sections).map(sectionId => {
    const completedCount = users.filter(u => u.progress[sectionId]).length
    return {
      id: sectionId,
      label: sections[sectionId],
      completedCount,
      percent: users.length > 0 ? Math.round((completedCount / users.length) * 100) : 0
    }
  })

  // Users with activity (have synced at least once)
  const activeUsers = users.filter(u => u.lastSyncAt)
  const usersStarted = users.filter(u => u.completedCount > 0)

  // Format relative time
  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Ahora'
    if (diffMins < 60) return `Hace ${diffMins} min`
    if (diffHours < 24) return `Hace ${diffHours}h`
    if (diffDays < 7) return `Hace ${diffDays}d`
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
  }

  // Loading state
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: "'Inter', -apple-system, sans-serif"
      }}>
        <p style={{ color: '#64748b' }}>Cargando...</p>
      </div>
    )
  }

  // Login form
  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: "'Inter', -apple-system, sans-serif"
      }}>
        <Head>
          <title>Admin - Precurso</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '24px',
            color: '#1e293b',
            textAlign: 'center'
          }}>
            Admin Precurso
          </h1>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              placeholder="Contraseña"
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                marginBottom: '16px',
                boxSizing: 'border-box'
              }}
            />

            {authError && (
              <p style={{
                color: '#dc2626',
                fontSize: '14px',
                marginBottom: '16px'
              }}>
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '16px',
                fontWeight: 600,
                color: 'white',
                background: '#6366f1',
                border: 'none',
                borderRadius: '8px',
                cursor: authLoading ? 'not-allowed' : 'pointer',
                opacity: authLoading ? 0.7 : 1
              }}
            >
              {authLoading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: "'Inter', -apple-system, sans-serif"
    }}>
      <Head>
        <title>Admin - Precurso</title>
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
        justifyContent: 'space-between'
      }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#1e293b',
          margin: 0
        }}>
          Panel Admin - Precurso
        </h1>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={loadData}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              color: '#6366f1',
              background: '#eef2ff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Actualizar
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              color: '#64748b',
              background: 'transparent',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Salir
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
            marginBottom: '24px'
          }}>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                {stats.totalUsers}
              </p>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                Alumnos registrados
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#f59e0b', margin: 0 }}>
                {usersStarted.length}
              </p>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                Han empezado
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#22c55e', margin: 0 }}>
                {stats.completedUsers}
              </p>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                Completados 100%
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#6366f1', margin: 0 }}>
                {stats.averageProgress}%
              </p>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                Progreso promedio
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#8b5cf6', margin: 0 }}>
                {activeUsers.length}
              </p>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                Con actividad
              </p>
            </div>
          </div>
        )}

        {/* Progress by Section */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#1e293b',
            margin: '0 0 16px'
          }}>
            Progreso por módulo
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {sectionStats.map(section => (
              <div key={section.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '200px', fontSize: '13px', color: '#64748b', flexShrink: 0 }}>
                  {section.label}
                </div>
                <div style={{
                  flex: 1,
                  height: '8px',
                  background: '#e2e8f0',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${section.percent}%`,
                    height: '100%',
                    background: section.percent === 100 ? '#22c55e' : '#6366f1',
                    borderRadius: '4px',
                    transition: 'width 0.3s'
                  }} />
                </div>
                <div style={{ width: '80px', fontSize: '13px', color: '#64748b', textAlign: 'right' }}>
                  {section.completedCount}/{users.length} ({section.percent}%)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add emails */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#1e293b',
            margin: '0 0 12px'
          }}>
            Añadir emails
          </h2>

          <form onSubmit={handleAddEmails} style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={newEmails}
              onChange={e => setNewEmails(e.target.value)}
              placeholder="email1@gmail.com, email2@outlook.com..."
              style={{
                flex: 1,
                padding: '10px 14px',
                fontSize: '14px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <button
              type="submit"
              disabled={addingEmails}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
                background: '#6366f1',
                border: 'none',
                borderRadius: '8px',
                cursor: addingEmails ? 'not-allowed' : 'pointer',
                opacity: addingEmails ? 0.7 : 1
              }}
            >
              {addingEmails ? 'Añadiendo...' : 'Añadir'}
            </button>
          </form>

          {addResult && (
            <p style={{ fontSize: '13px', color: '#22c55e', marginTop: '8px' }}>
              {addResult.added} email(s) añadido(s)
              {addResult.skipped > 0 && `, ${addResult.skipped} ya existía(n)`}
            </p>
          )}
        </div>

        {/* Users list */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <h2 style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#1e293b',
              margin: 0
            }}>
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
                width: '200px'
              }}
            />
          </div>

          {filteredUsers.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <p style={{ color: '#64748b' }}>
                {search ? 'No se encontraron resultados' : 'No hay alumnos todavía'}
              </p>
            </div>
          ) : (
            <div>
              {filteredUsers.map(user => (
                <div key={user.email} style={{ borderTop: '1px solid #e2e8f0' }}>
                  {/* User row */}
                  <div
                    onClick={() => setExpandedUser(expandedUser === user.email ? null : user.email)}
                    style={{
                      padding: '14px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      cursor: 'pointer',
                      background: expandedUser === user.email ? '#f8fafc' : 'white',
                      transition: 'background 0.15s'
                    }}
                  >
                    {/* Expand icon */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      style={{
                        transform: expandedUser === user.email ? 'rotate(90deg)' : 'rotate(0)',
                        transition: 'transform 0.15s',
                        flexShrink: 0
                      }}
                    >
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>

                    {/* Email */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '14px', color: '#1e293b', margin: 0, fontWeight: 500 }}>
                        {user.email}
                      </p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0' }}>
                        Registrado {new Date(user.addedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {user.lastSyncAt && ` · Última actividad ${formatRelativeTime(user.lastSyncAt)}`}
                      </p>
                    </div>

                    {/* Progress */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '100px',
                        height: '6px',
                        background: '#e2e8f0',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${user.progressPercent}%`,
                          height: '100%',
                          background: user.isCompleted ? '#22c55e' : user.progressPercent > 0 ? '#6366f1' : '#e2e8f0',
                          borderRadius: '3px'
                        }} />
                      </div>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: user.isCompleted ? '#22c55e' : '#64748b',
                        minWidth: '45px',
                        textAlign: 'right'
                      }}>
                        {user.progressPercent}%
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteEmail(user.email)
                      }}
                      style={{
                        padding: '6px 10px',
                        fontSize: '12px',
                        color: '#dc2626',
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                    >
                      Eliminar
                    </button>
                  </div>

                  {/* Expanded detail */}
                  {expandedUser === user.email && (
                    <div style={{
                      padding: '16px 20px 20px 52px',
                      background: '#f8fafc',
                      borderTop: '1px solid #e2e8f0'
                    }}>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', margin: '0 0 12px' }}>
                        Módulos completados ({user.completedCount}/{user.totalSections})
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {Object.entries(sections).map(([sectionId, label]) => {
                          const isCompleted = user.progress[sectionId]
                          return (
                            <span
                              key={sectionId}
                              style={{
                                padding: '6px 12px',
                                fontSize: '12px',
                                background: isCompleted ? '#dcfce7' : 'white',
                                color: isCompleted ? '#16a34a' : '#94a3b8',
                                borderRadius: '6px',
                                border: `1px solid ${isCompleted ? '#bbf7d0' : '#e2e8f0'}`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              {isCompleted ? '✓' : '○'} {label}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
