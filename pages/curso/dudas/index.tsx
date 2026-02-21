import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import CursoLayout from '../../../components/CursoLayout'
import type { NextPageWithLayout } from '../../_app'
import type { Duda } from '../../api/curso/dudas'

const CATEGORIAS = [
  { value: 'todas', label: 'Todas' },
  { value: 'general', label: 'General' },
  { value: 'setup', label: 'Setup' },
  { value: 'proyecto', label: 'Mi proyecto' },
  { value: 'supabase', label: 'Supabase' },
  { value: 'auth', label: 'Auth' },
  { value: 'api', label: 'APIs' },
  { value: 'pagos', label: 'Pagos' },
  { value: 'deploy', label: 'Deploy' },
  { value: 'diseño', label: 'Diseño' },
  { value: 'otro', label: 'Otro' },
]

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

function DudasPage() {
  const [dudas, setDudas] = useState<Duda[]>([])
  const [loading, setLoading] = useState(true)
  const [categoria, setCategoria] = useState('todas')
  const [showForm, setShowForm] = useState(false)
  const [pregunta, setPregunta] = useState('')
  const [catForm, setCatForm] = useState('general')
  const [submitting, setSubmitting] = useState(false)
  const userEmail = getUserEmail()

  const loadDudas = async () => {
    try {
      const params = new URLSearchParams({ categoria, limit: '50' })
      const res = await fetch(`/api/curso/dudas?${params}`)
      if (res.ok) {
        const data = await res.json()
        setDudas(data.dudas || [])
      }
    } catch { /* ignore */ }
    setLoading(false)
  }

  useEffect(() => { loadDudas() }, [categoria])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pregunta.trim() || !userEmail) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/curso/dudas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, pregunta, categoria: catForm }),
      })
      if (res.ok) {
        setPregunta('')
        setShowForm(false)
        loadDudas()
      }
    } catch { /* ignore */ }
    setSubmitting(false)
  }

  const handleVote = async (dudaId: string) => {
    if (!userEmail) return
    try {
      await fetch(`/api/curso/dudas/${dudaId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, action: 'votar' }),
      })
      loadDudas()
    } catch { /* ignore */ }
  }

  return (
    <div style={{ padding: '32px 40px' }}>
      <Head><title>Dudas | Curso</title></Head>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: 700, color: '#0f172a' }}>Dudas</h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Pregunta lo que necesites, la comunidad te ayuda</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '10px 20px', background: '#5e6ad2', color: 'white', border: 'none',
            borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          }}
        >
          + Nueva duda
        </button>
      </div>

      {/* New duda form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{
          background: 'white', borderRadius: '14px', padding: '24px',
          border: '1px solid rgba(0,0,0,0.06)', marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>Nueva duda</h3>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Categoría
            </label>
            <select
              value={catForm}
              onChange={e => setCatForm(e.target.value)}
              style={{
                width: '100%', padding: '10px 14px', fontSize: '14px', border: '1px solid #e2e8f0',
                borderRadius: '10px', background: '#f8fafc', color: '#1e293b',
              }}
            >
              {CATEGORIAS.filter(c => c.value !== 'todas').map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Tu pregunta
            </label>
            <textarea
              value={pregunta}
              onChange={e => setPregunta(e.target.value)}
              placeholder="Describe tu duda con el mayor detalle posible..."
              rows={4}
              style={{
                width: '100%', padding: '12px 14px', fontSize: '14px', border: '1px solid #e2e8f0',
                borderRadius: '10px', background: '#f8fafc', color: '#1e293b', resize: 'vertical',
                lineHeight: 1.6, boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setShowForm(false)} style={{
              padding: '10px 18px', background: '#f1f5f9', border: 'none', borderRadius: '10px',
              fontSize: '14px', fontWeight: 500, color: '#64748b', cursor: 'pointer',
            }}>Cancelar</button>
            <button type="submit" disabled={submitting || !pregunta.trim()} style={{
              padding: '10px 18px', background: '#5e6ad2', color: 'white', border: 'none',
              borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              opacity: submitting || !pregunta.trim() ? 0.6 : 1,
            }}>
              {submitting ? 'Publicando...' : 'Publicar duda (+5 pts)'}
            </button>
          </div>
        </form>
      )}

      {/* Category filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {CATEGORIAS.map(c => (
          <button
            key={c.value}
            onClick={() => setCategoria(c.value)}
            style={{
              padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
              border: `1px solid ${categoria === c.value ? '#5e6ad2' : 'rgba(0,0,0,0.06)'}`,
              background: categoria === c.value ? '#eef2ff' : 'white',
              color: categoria === c.value ? '#5e6ad2' : '#64748b',
              cursor: 'pointer',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Dudas list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Cargando dudas...</div>
      ) : dudas.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px', background: 'white',
          borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>❓</div>
          <p style={{ color: '#64748b', fontSize: '15px' }}>No hay dudas todavía. ¡Sé el primero en preguntar!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {dudas.map(duda => (
            <Link key={duda.id} href={`/curso/dudas/${duda.id}`} style={{
              display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '18px 20px',
              background: 'white', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)',
              textDecoration: 'none', transition: 'all 0.15s', boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}
            className="duda-card"
            >
              {/* Votes */}
              <div
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleVote(duda.id) }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                  padding: '8px 6px', borderRadius: '8px', background: '#f8fafc',
                  cursor: 'pointer', minWidth: '40px', flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
                <span style={{ fontSize: '14px', fontWeight: 700, color: duda.votos > 0 ? '#5e6ad2' : '#94a3b8' }}>
                  {duda.votos || 0}
                </span>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600,
                    background: '#f1f5f9', color: '#64748b', textTransform: 'uppercase',
                  }}>{duda.categoria}</span>
                  {duda.resuelta && (
                    <span style={{
                      padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600,
                      background: '#f0fdf4', color: '#16a34a',
                    }}>✓ Resuelta</span>
                  )}
                </div>
                <p style={{
                  margin: '0 0 6px', fontSize: '15px', fontWeight: 500, color: '#1e293b',
                  lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                }}>
                  {duda.pregunta}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#94a3b8' }}>
                  <span>{duda.nombre}</span>
                  <span>·</span>
                  <span>{new Date(duda.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                  <span>·</span>
                  <span>{duda.respuestas.length} respuesta{duda.respuestas.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <style jsx global>{`
        .duda-card:hover {
          border-color: rgba(0,0,0,0.12) !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
        }
      `}</style>
    </div>
  )
}

const Page: NextPageWithLayout = () => <DudasPage />

Page.getLayout = (page: ReactElement) => (
  <CursoLayout activeNav="dudas">{page}</CursoLayout>
)

export default Page
