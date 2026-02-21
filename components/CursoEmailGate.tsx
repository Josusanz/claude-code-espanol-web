import { useState, useEffect, ReactNode, FormEvent } from 'react'

interface CursoGateProps {
  children: ReactNode
}

type GateState = 'loading' | 'login' | 'email_sent' | 'no_access' | 'access'

export default function CursoEmailGate({ children }: CursoGateProps) {
  const [state, setState] = useState<GateState>('loading')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function checkAccess() {
      // Primero comprobar sesión con cookie
      try {
        const sessionRes = await fetch('/api/auth/session')
        const sessionData = await sessionRes.json()

        if (sessionData.authenticated && sessionData.user?.email) {
          // Tiene sesión, comprobar autorización
          const accessRes = await fetch('/api/auth/check-curso-access')
          const accessData = await accessRes.json()

          if (accessData.authorized) {
            // Guardar en localStorage para compatibilidad con sync-progress
            localStorage.setItem('precurso-access', JSON.stringify({
              authenticated: true,
              email: sessionData.user.email
            }))
            setState('access')
            return
          } else {
            setState('no_access')
            return
          }
        }
      } catch {
        // Error de red, continuar al login
      }

      // Sin sesión, comprobar localStorage como fallback
      const savedAccess = localStorage.getItem('precurso-access')
      if (savedAccess) {
        try {
          const data = JSON.parse(savedAccess)
          if (data.authenticated && data.email) {
            setState('access')
            return
          }
        } catch {
          // Invalid data
        }
      }

      setState('login')
    }

    checkAccess()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const res = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          redirect: '/curso'
        })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setState('email_sent')
      } else {
        setError(data.error || 'Error enviando el email. Inténtalo de nuevo.')
      }
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  // Loading state
  if (state === 'loading') {
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
  if (state === 'access') {
    return <>{children}</>
  }

  // No access - email not authorized
  if (state === 'no_access') {
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
        <div style={{
          width: '100%',
          maxWidth: '440px',
          background: 'white',
          borderRadius: '24px',
          padding: '48px 40px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0,0,0,0.04)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '36px',
            boxShadow: '0 10px 40px rgba(239, 68, 68, 0.3)'
          }}>
            🔒
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#0f172a',
            margin: '0 0 12px 0'
          }}>
            Sin acceso al curso
          </h1>
          <p style={{
            fontSize: '15px',
            color: '#64748b',
            margin: '0 0 24px 0',
            lineHeight: 1.6
          }}>
            Tu email no está autorizado para este curso.
            Si crees que es un error, contacta al instructor.
          </p>
          <a href="mailto:josu@yenze.io" style={{
            display: 'inline-block',
            padding: '14px 28px',
            fontSize: '15px',
            fontWeight: 600,
            color: 'white',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            border: 'none',
            borderRadius: '14px',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
          }}>
            Contactar a Josu
          </a>
        </div>
      </div>
    )
  }

  // Email sent - check your inbox
  if (state === 'email_sent') {
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
        <div style={{
          width: '100%',
          maxWidth: '440px',
          background: 'white',
          borderRadius: '24px',
          padding: '48px 40px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0,0,0,0.04)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '36px',
            boxShadow: '0 10px 40px rgba(34, 197, 94, 0.3)'
          }}>
            📧
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#0f172a',
            margin: '0 0 12px 0'
          }}>
            Revisa tu email
          </h1>
          <p style={{
            fontSize: '15px',
            color: '#64748b',
            margin: '0 0 8px 0',
            lineHeight: 1.6
          }}>
            Hemos enviado un enlace de acceso a:
          </p>
          <p style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#6366f1',
            margin: '0 0 24px 0'
          }}>
            {email}
          </p>
          <p style={{
            fontSize: '14px',
            color: '#94a3b8',
            margin: 0,
            lineHeight: 1.6
          }}>
            El enlace expira en 15 minutos.
            <br />
            Revisa también la carpeta de spam.
          </p>
          <button
            onClick={() => { setState('login'); setError('') }}
            style={{
              marginTop: '24px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#6366f1',
              background: 'transparent',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Usar otro email
          </button>
        </div>
      </div>
    )
  }

  // Login form - email only (magic link)
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
              Introduce tu email para acceder
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '28px' }}>
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
                  Enviando...
                </span>
              ) : (
                'Enviar enlace de acceso'
              )}
              <style jsx>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
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
