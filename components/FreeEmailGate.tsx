import { useState, useEffect, ReactNode, FormEvent } from 'react'

interface FreeEmailGateProps {
  children: ReactNode
}

const STORAGE_KEY = 'autoguiado-free-email'

export default function FreeEmailGate({ children }: FreeEmailGateProps) {
  const [loading, setLoading] = useState(true)
  const [hasEmail, setHasEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Check if already gave email (either via this gate or via curso login)
    const freeEmail = localStorage.getItem(STORAGE_KEY)
    if (freeEmail) {
      setHasEmail(true)
      setLoading(false)
      return
    }
    // Also check if logged into the full curso
    try {
      const savedAccess = localStorage.getItem('precurso-access')
      if (savedAccess) {
        const data = JSON.parse(savedAccess)
        if (data.authenticated && data.email) {
          setHasEmail(true)
        }
      }
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()
    if (!trimmed) return

    setSubmitting(true)
    try {
      // Save lead to backend
      await fetch('/api/autoguiado/free-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
    } catch { /* non-blocking */ }

    // Save locally
    localStorage.setItem(STORAGE_KEY, trimmed)
    // Also save as precurso-access so other parts of the app can use it
    localStorage.setItem('precurso-access', JSON.stringify({
      authenticated: true,
      email: trimmed,
    }))
    setHasEmail(true)
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #d1fae5',
          borderTop: '3px solid #059669',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (hasEmail) {
    return <>{children}</>
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(5, 150, 105, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '-30%', left: '-15%',
          width: '800px', height: '800px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 16px', background: 'white', borderRadius: '100px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            fontSize: '13px', fontWeight: 600, color: '#059669',
          }}>
            ✨ 100% Gratis
          </span>
        </div>

        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '48px 40px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.04)',
        }}>
          {/* Icon + Title */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '80px', height: '80px',
              background: 'linear-gradient(135deg, #059669, #10b981)',
              borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: '36px',
              boxShadow: '0 10px 40px rgba(5, 150, 105, 0.3)',
            }}>
              🌐
            </div>
            <h1 style={{
              fontSize: '26px', fontWeight: 700, color: '#0f172a',
              margin: '0 0 8px', letterSpacing: '-0.5px',
            }}>
              Tu Primera Web con IA
            </h1>
            <p style={{ fontSize: '15px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
              Crea y publica una web profesional en 1 hora.<br />
              Solo necesitamos tu email para empezar.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block', fontSize: '13px', fontWeight: 600,
                color: '#374151', marginBottom: '8px',
              }}>
                Tu email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                style={{
                  width: '100%', padding: '16px 18px', fontSize: '15px',
                  border: '2px solid #d1fae5', borderRadius: '14px',
                  outline: 'none', transition: 'all 0.2s',
                  boxSizing: 'border-box', background: '#f0fdf4',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#059669'
                  e.target.style.background = '#fff'
                  e.target.style.boxShadow = '0 0 0 4px rgba(5, 150, 105, 0.1)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#d1fae5'
                  e.target.style.background = '#f0fdf4'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%', padding: '18px', fontSize: '16px', fontWeight: 600,
                color: 'white',
                background: submitting ? '#94a3b8' : 'linear-gradient(135deg, #059669, #10b981)',
                border: 'none', borderRadius: '14px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: submitting ? 'none' : '0 4px 14px rgba(5, 150, 105, 0.4)',
                letterSpacing: '0.3px',
              }}
            >
              {submitting ? 'Accediendo...' : 'Acceder al modulo gratis →'}
            </button>
          </form>

          {/* What you'll learn */}
          <div style={{ marginTop: '28px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', margin: '0 0 16px', gap: '16px',
            }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                En este modulo
              </span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { icon: '⚡', text: 'Instalar Claude Code' },
                { icon: '🎨', text: 'Landing profesional' },
                { icon: '📱', text: 'Diseño responsive' },
                { icon: '🌍', text: 'Publicar en internet' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 12px', background: '#f0fdf4', borderRadius: '10px',
                  fontSize: '13px', color: '#065f46', fontWeight: 500,
                }}>
                  <span>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center', marginTop: '20px',
          fontSize: '13px', color: '#94a3b8',
        }}>
          Sin spam. Solo te avisaremos de novedades del curso.
        </p>
      </div>
    </div>
  )
}
