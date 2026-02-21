import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import CursoLayout from '../../../components/CursoLayout'
import type { NextPageWithLayout } from '../../_app'
import type { Proyecto } from '../../api/curso/proyectos'
import { HITO_EMOJIS } from '../../api/curso/proyectos'

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

function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [loading, setLoading] = useState(true)
  const userEmail = getUserEmail()
  const myProject = proyectos.find(p => p.email === userEmail)

  useEffect(() => {
    fetch('/api/curso/proyectos')
      .then(r => r.ok ? r.json() : { proyectos: [] })
      .then(data => setProyectos(data.proyectos || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ padding: '32px 40px', maxWidth: '960px' }}>
      <Head><title>Proyectos | Curso</title></Head>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: 700, color: '#0f172a' }}>Proyectos</h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
            Galería de proyectos de los alumnos · {proyectos.length} proyecto{proyectos.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/curso/mi-proyecto" style={{
          padding: '10px 20px', background: '#5e6ad2', color: 'white',
          borderRadius: '10px', fontSize: '14px', fontWeight: 600,
          textDecoration: 'none',
        }}>
          {myProject ? 'Editar mi proyecto' : '+ Mi proyecto'}
        </Link>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Cargando proyectos...</div>
      ) : proyectos.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px', background: 'white',
          borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏗️</div>
          <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '16px' }}>
            No hay proyectos todavía. ¡Crea el tuyo!
          </p>
          <Link href="/curso/mi-proyecto" style={{
            display: 'inline-block', padding: '10px 20px', background: '#5e6ad2', color: 'white',
            borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none',
          }}>Crear mi proyecto (+20 pts)</Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {proyectos.map(p => (
            <Link key={p.id} href={`/curso/proyectos/${p.id}`} className="proyecto-card" style={{
              background: 'white', borderRadius: '14px', padding: '24px',
              border: '1px solid rgba(0,0,0,0.06)', textDecoration: 'none',
              transition: 'all 0.15s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Name + author */}
              <h3 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: 600, color: '#0f172a' }}>
                {p.nombre}
              </h3>
              <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#94a3b8' }}>
                por {p.email.split('@')[0]}
              </p>

              {/* Description */}
              <p style={{
                margin: '0 0 16px', fontSize: '14px', color: '#475569', lineHeight: 1.6,
                overflow: 'hidden', textOverflow: 'ellipsis',
                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const,
                flex: 1,
              }}>
                {p.descripcion}
              </p>

              {/* Tech tags */}
              {p.tecnologias.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  {p.tecnologias.slice(0, 5).map(t => (
                    <span key={t} style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px',
                      fontWeight: 500, background: '#f1f5f9', color: '#64748b',
                    }}>{t}</span>
                  ))}
                </div>
              )}

              {/* Hitos progress */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {p.hitos.slice(-5).map(h => (
                    <span key={h.id} title={h.titulo} style={{ fontSize: '14px' }}>
                      {HITO_EMOJIS[h.tipo] || '⭐'}
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: 'auto' }}>
                  {p.hitos.length} hito{p.hitos.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Links */}
              {(p.produccionUrl || p.repoUrl) && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  {p.produccionUrl && (
                    <span style={{ fontSize: '12px', color: '#5e6ad2', fontWeight: 500 }}>
                      🌍 En producción
                    </span>
                  )}
                  {p.repoUrl && (
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      📦 Repo
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      <style jsx global>{`
        .proyecto-card:hover {
          border-color: rgba(0,0,0,0.12) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  )
}

const Page: NextPageWithLayout = () => <ProyectosPage />

Page.getLayout = (page: ReactElement) => (
  <CursoLayout activeNav="proyectos">{page}</CursoLayout>
)

export default Page
