import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import CursoLayout from '../../components/CursoLayout'
import DualRueda, { DualRuedaState } from '../../components/DualRueda'
import type { NextPageWithLayout } from '../_app'

function getUserEmail(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const savedAccess = localStorage.getItem('precurso-access')
    if (savedAccess) {
      const data = JSON.parse(savedAccess)
      return data.email ? data.email.toLowerCase().trim() : null
    }
  } catch {
    // Ignore
  }
  return null
}

function RuedaPageContent() {
  const [loading, setLoading] = useState(true)
  const [ruedas, setRuedas] = useState<DualRuedaState>({})
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const email = getUserEmail()
    setUserEmail(email)

    if (email) {
      loadRuedas(email)
    } else {
      setLoading(false)
    }
  }, [])

  const loadRuedas = async (email: string) => {
    try {
      const res = await fetch(`/api/curso/rueda?email=${encodeURIComponent(email)}`)
      if (res.ok) {
        const data = await res.json()
        setRuedas(data.ruedas || {})
      }
    } catch (error) {
      console.error('Error loading ruedas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveRueda = async (ruedaType: 'creador' | 'vida', tipo: 'antes' | 'despues', scores: number[]) => {
    if (!userEmail) return

    try {
      const res = await fetch('/api/curso/rueda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, tipo, scores, ruedaType })
      })

      if (res.ok) {
        const data = await res.json()
        setRuedas(data.ruedas || {})
      }
    } catch (error) {
      console.error('Error saving rueda:', error)
      throw error
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
      background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#0f172a'
    }}>
      <Head>
        <title>Ruedas del Creador y Vida | Curso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/curso" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            ← Volver al curso
          </Link>
          <div style={{
            width: '1px',
            height: '24px',
            background: 'rgba(0,0,0,0.08)'
          }} />
          <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#0f172a' }}>
            🎯 Mis Ruedas
          </h1>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Intro */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
          padding: '24px',
          background: '#fff',
          borderRadius: '16px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ margin: '0 0 12px', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
            Conoce tu punto de partida
          </h2>
          <p style={{ margin: 0, fontSize: '15px', color: '#64748b', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Dos ruedas para evaluar tu vida como creador y tu bienestar personal.
            Completalas al inicio y al final del curso para ver tu transformacion.
          </p>
        </div>

        {/* Dual Rueda */}
        <DualRueda ruedas={ruedas} onSave={handleSaveRueda} />
      </main>

      <style jsx global>{`
        @media (max-width: 640px) {
          main { padding: 20px 16px !important; }
        }
      `}</style>
    </div>
  )
}

const RuedaPage: NextPageWithLayout = () => <RuedaPageContent />

RuedaPage.getLayout = (page: ReactElement) => (
  <CursoLayout activeNav="rueda">{page}</CursoLayout>
)

export default RuedaPage
