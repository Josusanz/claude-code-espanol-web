import { useState, useEffect, ReactNode, FormEvent } from 'react'

interface McpEmailGateProps {
  children: ReactNode
}

const STORAGE_KEY = 'autoguiado-free-email'

export default function McpEmailGate({ children }: McpEmailGateProps) {
  const [loading, setLoading] = useState(true)
  const [hasEmail, setHasEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const freeEmail = localStorage.getItem(STORAGE_KEY)
    if (freeEmail) {
      setHasEmail(true)
      setLoading(false)
      return
    }
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
      await fetch('/api/autoguiado/free-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'mcp' }),
      })
    } catch { /* non-blocking */ }

    localStorage.setItem(STORAGE_KEY, trimmed)
    localStorage.setItem('precurso-access', JSON.stringify({
      authenticated: true,
      email: trimmed,
    }))
    setHasEmail(true)
    setSubmitting(false)
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem 0' }}>Cargando...</div>

  if (hasEmail) return <>{children}</>

  return (
    <div style={{
      maxWidth: '440px',
      margin: '3rem auto',
      padding: '0 1rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <div style={{
        background: 'var(--nextra-bg, #fff)',
        borderRadius: '16px',
        padding: '32px',
        border: '1px solid var(--nextra-border, #e5e7eb)',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '28px',
          }}>
            🔌
          </div>
          <h2 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 700 }}>
            MCP: Model Context Protocol
          </h2>
          <p style={{ margin: 0, fontSize: '14px', opacity: 0.7, lineHeight: 1.5 }}>
            Introduce tu email para acceder a las 6 lecciones de MCP. Es gratis.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              border: '2px solid var(--nextra-border, #e5e7eb)',
              borderRadius: '10px',
              outline: 'none',
              boxSizing: 'border-box',
              marginBottom: '12px',
              background: 'var(--nextra-bg, #fff)',
              color: 'var(--nextra-text, #000)',
            }}
          />
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'white',
              background: submitting ? '#94a3b8' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: '10px',
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? 'Accediendo...' : 'Acceder gratis →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', opacity: 0.5 }}>
          Sin spam. Solo novedades del curso.
        </p>
      </div>
    </div>
  )
}
