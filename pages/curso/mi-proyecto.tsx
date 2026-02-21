import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import CursoLayout from '../../components/CursoLayout'
import type { NextPageWithLayout } from '../_app'
import type { Proyecto } from '../api/curso/proyectos'

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

function MiProyectoPage() {
  const router = useRouter()
  const userEmail = getUserEmail()
  const [existingProject, setExistingProject] = useState<Proyecto | null>(null)
  const [loading, setLoading] = useState(true)

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [tecnologias, setTecnologias] = useState('')
  const [repoUrl, setRepoUrl] = useState('')
  const [produccionUrl, setProduccionUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Check if user already has a project
    fetch('/api/curso/proyectos')
      .then(r => r.ok ? r.json() : { proyectos: [] })
      .then(data => {
        const mine = (data.proyectos || []).find((p: Proyecto) => p.email === userEmail)
        if (mine) {
          setExistingProject(mine)
          setNombre(mine.nombre)
          setDescripcion(mine.descripcion)
          setTecnologias(mine.tecnologias.join(', '))
          setRepoUrl(mine.repoUrl || '')
          setProduccionUrl(mine.produccionUrl || '')
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [userEmail])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre.trim() || !descripcion.trim() || !userEmail) return
    setSubmitting(true)

    const techs = tecnologias.split(',').map(t => t.trim()).filter(Boolean)

    try {
      if (existingProject) {
        // Update existing
        const res = await fetch(`/api/curso/proyectos/${existingProject.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, nombre, descripcion, tecnologias: techs, repoUrl: repoUrl || undefined, produccionUrl: produccionUrl || undefined }),
        })
        if (res.ok) {
          router.push(`/curso/proyectos/${existingProject.id}`)
        }
      } else {
        // Create new
        const res = await fetch('/api/curso/proyectos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, nombre, descripcion, tecnologias: techs, repoUrl: repoUrl || undefined, produccionUrl: produccionUrl || undefined }),
        })
        if (res.ok) {
          const data = await res.json()
          router.push(`/curso/proyectos/${data.proyecto.id}`)
        }
      }
    } catch { /* ignore */ }
    setSubmitting(false)
  }

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Cargando...</div>
  }

  return (
    <div style={{ padding: '32px 40px', maxWidth: '700px' }}>
      <Head><title>{existingProject ? 'Editar' : 'Crear'} mi proyecto | Curso</title></Head>

      <Link href="/curso/proyectos" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontSize: '13px', color: '#94a3b8', textDecoration: 'none', marginBottom: '20px',
      }}>← Volver a proyectos</Link>

      <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
        {existingProject ? 'Editar mi proyecto' : 'Crear mi proyecto'}
      </h2>
      <p style={{ margin: '0 0 28px', fontSize: '14px', color: '#64748b' }}>
        {existingProject ? 'Actualiza la información de tu proyecto.' : 'Comparte tu proyecto con la comunidad y gana 20 puntos.'}
      </p>

      <form onSubmit={handleSubmit} style={{
        background: 'white', borderRadius: '16px', padding: '32px',
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
            Nombre del proyecto *
          </label>
          <input value={nombre} onChange={e => setNombre(e.target.value)}
            placeholder="ej: TaskFlow, MiTienda, FitTracker..."
            style={{
              width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #e2e8f0',
              borderRadius: '10px', background: '#f8fafc', boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
            Descripción *
          </label>
          <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)}
            placeholder="¿Qué hace tu proyecto? ¿Qué problema resuelve? ¿Para quién es?"
            rows={4}
            style={{
              width: '100%', padding: '12px 16px', fontSize: '14px', border: '1px solid #e2e8f0',
              borderRadius: '10px', background: '#f8fafc', resize: 'vertical', lineHeight: 1.6,
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
            Tecnologías
          </label>
          <input value={tecnologias} onChange={e => setTecnologias(e.target.value)}
            placeholder="Next.js, Supabase, Stripe... (separadas por comas)"
            style={{
              width: '100%', padding: '12px 16px', fontSize: '14px', border: '1px solid #e2e8f0',
              borderRadius: '10px', background: '#f8fafc', boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
              URL del repositorio
            </label>
            <input value={repoUrl} onChange={e => setRepoUrl(e.target.value)}
              placeholder="https://github.com/..." type="url"
              style={{
                width: '100%', padding: '12px 16px', fontSize: '14px', border: '1px solid #e2e8f0',
                borderRadius: '10px', background: '#f8fafc', boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
              URL en producción
            </label>
            <input value={produccionUrl} onChange={e => setProduccionUrl(e.target.value)}
              placeholder="https://miapp.vercel.app" type="url"
              style={{
                width: '100%', padding: '12px 16px', fontSize: '14px', border: '1px solid #e2e8f0',
                borderRadius: '10px', background: '#f8fafc', boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        <button type="submit" disabled={submitting || !nombre.trim() || !descripcion.trim()} style={{
          width: '100%', padding: '16px', background: '#5e6ad2', color: 'white', border: 'none',
          borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer',
          opacity: submitting || !nombre.trim() || !descripcion.trim() ? 0.6 : 1,
        }}>
          {submitting ? 'Guardando...' : existingProject ? 'Guardar cambios' : 'Crear proyecto (+20 pts)'}
        </button>
      </form>
    </div>
  )
}

const Page: NextPageWithLayout = () => <MiProyectoPage />

Page.getLayout = (page: ReactElement) => (
  <CursoLayout activeNav="proyectos">{page}</CursoLayout>
)

export default Page
