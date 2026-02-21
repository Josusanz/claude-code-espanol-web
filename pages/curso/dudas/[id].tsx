import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import CursoLayout from '../../../components/CursoLayout'
import type { NextPageWithLayout } from '../../_app'
import type { Duda } from '../../api/curso/dudas'

function getUserEmail(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const saved = localStorage.getItem('precurso-access')
    if (saved) {
      const data = JSON.parse(saved)
      return data.email ? data.email.toLowerCase().trim() : null
    }
  } catch { /* ignore */ }
  return null
}

function DudaDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [duda, setDuda] = useState<Duda | null>(null)
  const [loading, setLoading] = useState(true)
  const [respuesta, setRespuesta] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const userEmail = getUserEmail()

  const loadDuda = async () => {
    if (!id) return
    try {
      const res = await fetch(`/api/curso/dudas/${id}`)
      if (res.ok) {
        const data = await res.json()
        setDuda(data.duda)
      }
    } catch { /* ignore */ }
    setLoading(false)
  }

  useEffect(() => { loadDuda() }, [id])

  const handleResponder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!respuesta.trim() || !userEmail || !id) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/curso/dudas/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, contenido: respuesta }),
      })
      if (res.ok) {
        setRespuesta('')
        loadDuda()
      }
    } catch { /* ignore */ }
    setSubmitting(false)
  }

  const handleResolver = async () => {
    if (!userEmail || !id) return
    try {
      await fetch(`/api/curso/dudas/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, action: 'resolver' }),
      })
      loadDuda()
    } catch { /* ignore */ }
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Cargando...</div>
    )
  }

  if (!duda) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: '#64748b' }}>Duda no encontrada</p>
        <Link href="/curso/dudas" style={{ color: '#5e6ad2' }}>← Volver a dudas</Link>
      </div>
    )
  }

  const isOwner = userEmail === duda.email

  return (
    <div style={{ padding: '32px 40px', maxWidth: '800px' }}>
      <Head><title>{duda.pregunta.slice(0, 60)} | Dudas</title></Head>

      {/* Back link */}
      <Link href="/curso/dudas" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontSize: '13px', color: '#94a3b8', textDecoration: 'none', marginBottom: '20px',
      }}>
        ← Volver a dudas
      </Link>

      {/* Duda */}
      <div style={{
        background: 'white', borderRadius: '14px', padding: '28px',
        border: '1px solid rgba(0,0,0,0.06)', marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{
            padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
            background: '#f1f5f9', color: '#64748b', textTransform: 'uppercase',
          }}>{duda.categoria}</span>
          {duda.resuelta && (
            <span style={{
              padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
              background: '#f0fdf4', color: '#16a34a',
            }}>✓ Resuelta</span>
          )}
        </div>

        <p style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 600, color: '#0f172a', lineHeight: 1.6 }}>
          {duda.pregunta}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#94a3b8' }}>
            <span style={{ fontWeight: 500 }}>{duda.nombre}</span>
            <span>·</span>
            <span>{new Date(duda.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>·</span>
            <span>{duda.votos} voto{duda.votos !== 1 ? 's' : ''}</span>
          </div>

          {isOwner && (
            <button onClick={handleResolver} style={{
              padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
              border: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer',
              background: duda.resuelta ? '#f1f5f9' : '#f0fdf4',
              color: duda.resuelta ? '#64748b' : '#16a34a',
            }}>
              {duda.resuelta ? 'Reabrir' : '✓ Marcar resuelta'}
            </button>
          )}
        </div>
      </div>

      {/* Respuestas */}
      <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600, color: '#0f172a' }}>
        {duda.respuestas.length} respuesta{duda.respuestas.length !== 1 ? 's' : ''}
      </h3>

      {duda.respuestas.length === 0 && (
        <div style={{
          padding: '40px', textAlign: 'center', background: '#f8fafc',
          borderRadius: '12px', marginBottom: '24px',
        }}>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            Todavía no hay respuestas. ¡Sé el primero!
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {duda.respuestas.map(r => (
          <div key={r.id} style={{
            background: r.isInstructor ? 'linear-gradient(135deg, #eef2ff, #f5f3ff)' : 'white',
            borderRadius: '12px', padding: '20px',
            border: `1px solid ${r.isInstructor ? 'rgba(94,106,210,0.15)' : 'rgba(0,0,0,0.06)'}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: r.isInstructor ? '#5e6ad2' : '#374151' }}>
                {r.autor}
              </span>
              {r.isInstructor && (
                <span style={{
                  padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700,
                  background: '#5e6ad2', color: 'white',
                }}>INSTRUCTOR</span>
              )}
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                {new Date(r.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
              {r.contenido}
            </p>
          </div>
        ))}
      </div>

      {/* Responder form */}
      <form onSubmit={handleResponder} style={{
        background: 'white', borderRadius: '14px', padding: '24px',
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <h4 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 600 }}>Tu respuesta</h4>
        <textarea
          value={respuesta}
          onChange={e => setRespuesta(e.target.value)}
          placeholder="Escribe tu respuesta..."
          rows={3}
          style={{
            width: '100%', padding: '12px 14px', fontSize: '14px', border: '1px solid #e2e8f0',
            borderRadius: '10px', background: '#f8fafc', color: '#1e293b', resize: 'vertical',
            lineHeight: 1.6, boxSizing: 'border-box', marginBottom: '12px',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={submitting || !respuesta.trim()} style={{
            padding: '10px 20px', background: '#5e6ad2', color: 'white', border: 'none',
            borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            opacity: submitting || !respuesta.trim() ? 0.6 : 1,
          }}>
            {submitting ? 'Enviando...' : 'Responder (+5 pts)'}
          </button>
        </div>
      </form>
    </div>
  )
}

const Page: NextPageWithLayout = () => <DudaDetailPage />

Page.getLayout = (page: ReactElement) => (
  <CursoLayout activeNav="dudas">{page}</CursoLayout>
)

export default Page
