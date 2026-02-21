import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import CursoLayout from '../../../components/CursoLayout'
import type { NextPageWithLayout } from '../../_app'
import type { Proyecto, ProyectoHito } from '../../api/curso/proyectos'
import { HITO_EMOJIS } from '../../api/curso/proyectos'

const HITO_TIPOS = [
  { value: 'localhost', label: 'En localhost', emoji: '🖥️' },
  { value: 'database', label: 'Base de datos', emoji: '🗄️' },
  { value: 'auth', label: 'Autenticación', emoji: '🔐' },
  { value: 'design', label: 'Diseño/UI', emoji: '🎨' },
  { value: 'payments', label: 'Pagos', emoji: '💳' },
  { value: 'deploy', label: 'Deploy', emoji: '🚀' },
  { value: 'production', label: 'En producción', emoji: '🌍' },
  { value: 'custom', label: 'Otro', emoji: '⭐' },
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

function ProyectoDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [proyecto, setProyecto] = useState<Proyecto | null>(null)
  const [loading, setLoading] = useState(true)
  const [showHitoForm, setShowHitoForm] = useState(false)
  const [hitoTipo, setHitoTipo] = useState('custom')
  const [hitoTitulo, setHitoTitulo] = useState('')
  const [hitoDesc, setHitoDesc] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const userEmail = getUserEmail()

  const loadProyecto = async () => {
    if (!id) return
    try {
      const res = await fetch(`/api/curso/proyectos/${id}`)
      if (res.ok) {
        const data = await res.json()
        setProyecto(data.proyecto)
      }
    } catch { /* ignore */ }
    setLoading(false)
  }

  useEffect(() => { loadProyecto() }, [id])

  const handleAddHito = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hitoTitulo.trim() || !userEmail || !id) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/curso/proyectos/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, tipo: hitoTipo, titulo: hitoTitulo, descripcion: hitoDesc }),
      })
      if (res.ok) {
        setHitoTitulo('')
        setHitoDesc('')
        setShowHitoForm(false)
        loadProyecto()
      }
    } catch { /* ignore */ }
    setSubmitting(false)
  }

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Cargando...</div>
  }

  if (!proyecto) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: '#64748b' }}>Proyecto no encontrado</p>
        <Link href="/curso/proyectos" style={{ color: '#5e6ad2' }}>← Volver a proyectos</Link>
      </div>
    )
  }

  const isOwner = userEmail === proyecto.email

  return (
    <div style={{ padding: '32px 40px', maxWidth: '800px' }}>
      <Head><title>{proyecto.nombre} | Proyectos</title></Head>

      <Link href="/curso/proyectos" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontSize: '13px', color: '#94a3b8', textDecoration: 'none', marginBottom: '20px',
      }}>← Volver a proyectos</Link>

      {/* Project header */}
      <div style={{
        background: 'white', borderRadius: '16px', padding: '32px',
        border: '1px solid rgba(0,0,0,0.06)', marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h1 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: 700, color: '#0f172a' }}>
              {proyecto.nombre}
            </h1>
            <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
              por {proyecto.email.split('@')[0]} · creado {new Date(proyecto.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
            </p>
          </div>
          {isOwner && (
            <Link href="/curso/mi-proyecto" style={{
              padding: '8px 16px', background: '#f1f5f9', borderRadius: '8px',
              fontSize: '13px', fontWeight: 500, color: '#64748b', textDecoration: 'none',
            }}>Editar</Link>
          )}
        </div>

        <p style={{ margin: '0 0 20px', fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
          {proyecto.descripcion}
        </p>

        {/* Tech */}
        {proyecto.tecnologias.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {proyecto.tecnologias.map(t => (
              <span key={t} style={{
                padding: '4px 12px', borderRadius: '8px', fontSize: '13px',
                fontWeight: 500, background: '#f1f5f9', color: '#475569',
              }}>{t}</span>
            ))}
          </div>
        )}

        {/* Links */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {proyecto.produccionUrl && (
            <a href={proyecto.produccionUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', background: '#eef2ff', borderRadius: '8px',
              fontSize: '13px', fontWeight: 600, color: '#5e6ad2', textDecoration: 'none',
            }}>🌍 Ver en producción</a>
          )}
          {proyecto.repoUrl && (
            <a href={proyecto.repoUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', background: '#f8fafc', borderRadius: '8px',
              fontSize: '13px', fontWeight: 500, color: '#64748b', textDecoration: 'none',
              border: '1px solid rgba(0,0,0,0.06)',
            }}>📦 Repositorio</a>
          )}
        </div>
      </div>

      {/* Milestones */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>
          Timeline de hitos ({proyecto.hitos.length})
        </h3>
        {isOwner && (
          <button
            onClick={() => setShowHitoForm(!showHitoForm)}
            style={{
              padding: '8px 16px', background: '#5e6ad2', color: 'white', border: 'none',
              borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}
          >+ Añadir hito</button>
        )}
      </div>

      {/* Add milestone form */}
      {showHitoForm && (
        <form onSubmit={handleAddHito} style={{
          background: 'white', borderRadius: '14px', padding: '24px',
          border: '1px solid rgba(0,0,0,0.06)', marginBottom: '20px',
        }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Tipo de hito</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {HITO_TIPOS.map(h => (
                <button key={h.value} type="button" onClick={() => setHitoTipo(h.value)} style={{
                  padding: '8px 14px', borderRadius: '8px', fontSize: '13px',
                  border: `1px solid ${hitoTipo === h.value ? '#5e6ad2' : 'rgba(0,0,0,0.06)'}`,
                  background: hitoTipo === h.value ? '#eef2ff' : 'white',
                  color: hitoTipo === h.value ? '#5e6ad2' : '#64748b',
                  cursor: 'pointer',
                }}>
                  {h.emoji} {h.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Título</label>
            <input value={hitoTitulo} onChange={e => setHitoTitulo(e.target.value)}
              placeholder="ej: Supabase conectado y tablas creadas" style={{
              width: '100%', padding: '10px 14px', fontSize: '14px', border: '1px solid #e2e8f0',
              borderRadius: '10px', background: '#f8fafc', boxSizing: 'border-box',
            }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Descripción (opcional)</label>
            <textarea value={hitoDesc} onChange={e => setHitoDesc(e.target.value)}
              placeholder="Detalles adicionales..." rows={2} style={{
              width: '100%', padding: '10px 14px', fontSize: '14px', border: '1px solid #e2e8f0',
              borderRadius: '10px', background: '#f8fafc', resize: 'vertical', boxSizing: 'border-box',
            }} />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setShowHitoForm(false)} style={{
              padding: '10px 18px', background: '#f1f5f9', border: 'none', borderRadius: '10px',
              fontSize: '14px', color: '#64748b', cursor: 'pointer',
            }}>Cancelar</button>
            <button type="submit" disabled={submitting || !hitoTitulo.trim()} style={{
              padding: '10px 18px', background: '#5e6ad2', color: 'white', border: 'none',
              borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              opacity: submitting || !hitoTitulo.trim() ? 0.6 : 1,
            }}>{submitting ? 'Añadiendo...' : 'Añadir hito (+10 pts)'}</button>
          </div>
        </form>
      )}

      {/* Timeline */}
      {proyecto.hitos.length === 0 ? (
        <div style={{
          padding: '40px', textAlign: 'center', background: '#f8fafc', borderRadius: '12px',
        }}>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            {isOwner ? 'Añade tu primer hito para mostrar tu progreso' : 'Este proyecto aún no tiene hitos'}
          </p>
        </div>
      ) : (
        <div style={{ position: 'relative', paddingLeft: '32px' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: '11px', top: '8px', bottom: '8px',
            width: '2px', background: '#e2e8f0',
          }} />

          {proyecto.hitos.map((hito, i) => (
            <div key={hito.id} style={{ position: 'relative', paddingBottom: i < proyecto.hitos.length - 1 ? '20px' : '0' }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: '-27px', top: '4px',
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'white', border: '2px solid #5e6ad2',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px',
              }}>
                {HITO_EMOJIS[hito.tipo] || '⭐'}
              </div>

              {/* Content */}
              <div style={{
                background: 'white', borderRadius: '12px', padding: '16px 20px',
                border: '1px solid rgba(0,0,0,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{hito.titulo}</span>
                </div>
                {hito.descripcion && (
                  <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                    {hito.descripcion}
                  </p>
                )}
                <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#94a3b8' }}>
                  {new Date(hito.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const Page: NextPageWithLayout = () => <ProyectoDetailPage />

Page.getLayout = (page: ReactElement) => (
  <CursoLayout activeNav="proyectos">{page}</CursoLayout>
)

export default Page
