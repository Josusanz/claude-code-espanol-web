import { useState, useEffect, ReactNode, FormEvent } from 'react'

interface CursoGateProps {
  children: ReactNode
}

export default function CursoEmailGate({ children }: CursoGateProps) {
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Check if already authenticated (reutilizamos la sesión del precurso)
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
      // Reutilizamos el endpoint del precurso
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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #f1f5f9',
            borderTop: '3px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto'
          }} />
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

  // Login form - Premium Light Design
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-15%',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
      </div>

      <div style={{
        width: '100%',
        maxWidth: '440px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'white',
            borderRadius: '100px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            marginBottom: '24px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              background: '#22c55e',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }} />
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>
              Primera Promoción
            </span>
          </div>
          <style jsx>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}</style>
        </div>

        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '48px 40px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0,0,0,0.04)'
        }}>
          {/* Logo & Title */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '36px',
              boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}>
              🚀
            </div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#0f172a',
              margin: '0 0 8px 0',
              letterSpacing: '-0.5px'
            }}>
              Crea tu Software con IA
            </h1>
            <p style={{
              fontSize: '15px',
              color: '#64748b',
              margin: 0,
              fontWeight: 400
            }}>
              Accede a tu cuenta para continuar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '8px',
                letterSpacing: '0.3px'
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
                  padding: '16px 18px',
                  fontSize: '15px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '14px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  background: '#f8fafc'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#6366f1'
                  e.target.style.background = '#ffffff'
                  e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#e2e8f0'
                  e.target.style.background = '#f8fafc'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '8px',
                letterSpacing: '0.3px'
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
                  padding: '16px 18px',
                  fontSize: '15px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '14px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  background: '#f8fafc'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#6366f1'
                  e.target.style.background = '#ffffff'
                  e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#e2e8f0'
                  e.target.style.background = '#f8fafc'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {error && (
              <div style={{
                background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                border: '1px solid #fecaca',
                borderRadius: '12px',
                padding: '14px 18px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '16px' }}>⚠️</span>
                <p style={{
                  fontSize: '14px',
                  color: '#dc2626',
                  margin: 0,
                  fontWeight: 500
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
                padding: '18px',
                fontSize: '16px',
                fontWeight: 600,
                color: 'white',
                background: submitting
                  ? '#94a3b8'
                  : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '14px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: submitting
                  ? 'none'
                  : '0 4px 14px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                transform: submitting ? 'none' : 'translateY(0)',
                letterSpacing: '0.3px'
              }}
              onMouseEnter={e => {
                if (!submitting) {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
                }
              }}
              onMouseLeave={e => {
                if (!submitting) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }
              }}
            >
              {submitting ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  Verificando...
                </span>
              ) : (
                'Acceder al Curso'
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '28px 0',
            gap: '16px'
          }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>10 SEMANAS</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          </div>

          {/* Features */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            {[
              { icon: '🎯', text: 'Proyecto real' },
              { icon: '🤖', text: 'Claude Code' },
              { icon: '💳', text: 'Pagos con Stripe' },
              { icon: '🚀', text: 'Deploy en Vercel' }
            ].map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                background: '#f8fafc',
                borderRadius: '10px',
                fontSize: '13px',
                color: '#475569',
                fontWeight: 500
              }}>
                <span>{feature.icon}</span>
                {feature.text}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            ¿Necesitas ayuda?{' '}
            <a href="mailto:josu@yenze.io" style={{
              color: '#6366f1',
              fontWeight: 600,
              textDecoration: 'none'
            }}>
              josu@yenze.io
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
