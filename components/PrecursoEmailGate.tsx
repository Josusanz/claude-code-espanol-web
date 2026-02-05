import { useState, useEffect, ReactNode, FormEvent } from 'react'
import Link from 'next/link'

interface PrecursoGateProps {
  children: ReactNode
}

export default function PrecursoEmailGate({ children }: PrecursoGateProps) {
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Check if already authenticated
    const savedAccess = localStorage.getItem('precurso-access')
    if (savedAccess) {
      try {
        const data = JSON.parse(savedAccess)
        if (data.authenticated && data.email) {
          setHasAccess(true)
        }
      } catch {
        // Invalid data, ignore
      }
    }
    setLoading(false)
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const res = await fetch('/api/precurso/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      })

      const data = await res.json()

      if (data.success) {
        localStorage.setItem('precurso-access', JSON.stringify({
          authenticated: true,
          email: email.trim().toLowerCase()
        }))
        setHasAccess(true)
      } else {
        setError(data.error || 'Credenciales incorrectas')
      }
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #5e6ad2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#64748b' }}>Cargando...</p>
          <style jsx>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  // User has access - show content
  if (hasAccess) {
    return <>{children}</>
  }

  // Login form
  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafbfc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px 32px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0'
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #5e6ad2, #7c3aed)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '28px'
            }}>
              🎓
            </div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#1a1a2e',
              margin: '0 0 8px 0'
            }}>
              Acceso al Precurso
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              margin: 0
            }}>
              Crea tu Negocio Digital con IA
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '8px'
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={e => e.target.style.borderColor = '#5e6ad2'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '8px'
              }}>
                Contraseña del curso
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={e => e.target.style.borderColor = '#5e6ad2'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
              <p style={{
                fontSize: '12px',
                color: '#94a3b8',
                marginTop: '8px'
              }}>
                Usa la contraseña que te enviamos al matricularte
              </p>
            </div>

            {error && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '20px'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#dc2626',
                  margin: 0
                }}>
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                fontWeight: 600,
                color: 'white',
                background: submitting
                  ? '#94a3b8'
                  : 'linear-gradient(135deg, #5e6ad2 0%, #7c3aed 100%)',
                border: 'none',
                borderRadius: '10px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: submitting ? 'none' : '0 4px 14px rgba(94, 106, 210, 0.4)'
              }}
            >
              {submitting ? 'Verificando...' : 'Acceder al Precurso'}
            </button>
          </form>
        </div>

        {/* Help text */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            ¿Aún no eres alumno?{' '}
            <Link href="/curso-negocio" style={{
              color: '#5e6ad2',
              fontWeight: 500,
              textDecoration: 'underline'
            }}>
              Ver información del curso
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
