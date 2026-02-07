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
        // Reload data to show new users
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
              placeholder="ADMIN_SECRET"
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
          Logout
        </button>
      </header>

      <main style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Stats */}
        {stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{ fontSize: '32px', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                {stats.totalUsers}
              </p>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>
                Alumnos
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{ fontSize: '32px', fontWeight: 700, color: '#22c55e', margin: 0 }}>
                {stats.completedUsers}
              </p>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>
                Completos
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{ fontSize: '32px', fontWeight: 700, color: '#6366f1', margin: 0 }}>
                {stats.averageProgress}%
              </p>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>
                Promedio
              </p>
            </div>
          </div>
        )}

        {/* Add emails */}
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#1e293b',
            margin: '0 0 16px'
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
                padding: '12px 16px',
                fontSize: '14px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <button
              type="submit"
              disabled={addingEmails}
              style={{
                padding: '12px 24px',
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
            <p style={{
              fontSize: '14px',
              color: '#22c55e',
              marginTop: '12px'
            }}>
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
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2 style={{
              fontSize: '16px',
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
              placeholder="Buscar..."
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
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{
                    textAlign: 'left',
                    padding: '12px 24px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#64748b',
                    textTransform: 'uppercase'
                  }}>
                    Email
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: '12px 24px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#64748b',
                    textTransform: 'uppercase'
                  }}>
                    Registro
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: '12px 24px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#64748b',
                    textTransform: 'uppercase'
                  }}>
                    Progreso
                  </th>
                  <th style={{
                    textAlign: 'right',
                    padding: '12px 24px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#64748b',
                    textTransform: 'uppercase'
                  }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.email} style={{ borderTop: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ fontSize: '14px', color: '#1e293b' }}>
                        {user.email}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ fontSize: '14px', color: '#64748b' }}>
                        {new Date(user.addedAt).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          flex: 1,
                          maxWidth: '120px',
                          height: '8px',
                          background: '#e2e8f0',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${user.progressPercent}%`,
                            height: '100%',
                            background: user.isCompleted ? '#22c55e' : '#6366f1',
                            borderRadius: '4px'
                          }} />
                        </div>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: user.isCompleted ? '#22c55e' : '#64748b',
                          minWidth: '40px'
                        }}>
                          {user.progressPercent}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleDeleteEmail(user.email)}
                        style={{
                          padding: '6px 12px',
                          fontSize: '12px',
                          color: '#dc2626',
                          background: '#fef2f2',
                          border: '1px solid #fecaca',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Sections reference */}
        {Object.keys(sections).length > 0 && (
          <div style={{
            marginTop: '32px',
            padding: '20px 24px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#64748b',
              margin: '0 0 12px'
            }}>
              Secciones del precurso ({Object.keys(sections).length})
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {Object.entries(sections).map(([key, label]) => (
                <span
                  key={key}
                  style={{
                    padding: '4px 10px',
                    fontSize: '12px',
                    background: 'white',
                    borderRadius: '4px',
                    border: '1px solid #e2e8f0',
                    color: '#64748b'
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
