import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import CursoEmailGate from '../../../components/CursoEmailGate'
import { CURSO_SEMANAS, getCursoTrackingIds, Semana } from '../../../lib/curso-data'

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

function useSemanaProgress(semanaNum: number) {
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const ids = getCursoTrackingIds(semanaNum)

  useEffect(() => {
    const email = getUserEmail()
    setUserEmail(email)

    // Cargar progreso de localStorage
    try {
      const saved = localStorage.getItem('curso-progress')
      if (saved) {
        setProgress(JSON.parse(saved))
      }
    } catch {
      // Ignore
    }

    // Cargar del servidor si hay email
    if (email) {
      fetch(`/api/curso/sync-progress?email=${encodeURIComponent(email)}`)
        .then(res => res.json())
        .then(data => {
          if (data.progress) {
            setProgress(prev => ({ ...prev, ...data.progress }))
          }
        })
        .catch(() => {})
    }

    setLoading(false)
  }, [semanaNum])

  const toggle = async (id: string) => {
    const newProgress = { ...progress, [id]: !progress[id] }
    setProgress(newProgress)
    localStorage.setItem('curso-progress', JSON.stringify(newProgress))

    if (userEmail) {
      try {
        await fetch('/api/curso/sync-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, progress: newProgress })
        })
      } catch {
        // Ignore
      }
    }
  }

  return {
    progress,
    loading,
    toggle,
    ids,
    preclaseCompleted: progress[ids.preclase] || false,
    claseCompleted: progress[ids.clase] || false,
    entregableCompleted: progress[ids.entregable] || false
  }
}

function useChecklist(semanaNum: number, totalItems: number) {
  const [checked, setChecked] = useState<Record<number, boolean>>({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem('curso-checklist')
      if (saved) {
        const all = JSON.parse(saved)
        if (all[semanaNum]) {
          setChecked(all[semanaNum])
        }
      }
    } catch {
      // Ignore
    }
  }, [semanaNum])

  const toggleItem = (index: number) => {
    const newChecked = { ...checked, [index]: !checked[index] }
    setChecked(newChecked)
    try {
      const saved = localStorage.getItem('curso-checklist')
      const all = saved ? JSON.parse(saved) : {}
      all[semanaNum] = newChecked
      localStorage.setItem('curso-checklist', JSON.stringify(all))
    } catch {
      // Ignore
    }
  }

  const completedCount = Object.values(checked).filter(Boolean).length

  return { checked, toggleItem, completedCount, totalItems }
}

function ProgressStepper({ preclaseCompleted, claseCompleted, entregableCompleted }: {
  preclaseCompleted: boolean
  claseCompleted: boolean
  entregableCompleted: boolean
}) {
  const steps = [
    { label: 'Pre-clase', completed: preclaseCompleted },
    { label: 'Clase', completed: claseCompleted },
    { label: 'Entregable', completed: entregableCompleted },
  ]

  // Determine current step (first non-completed)
  let currentIndex = steps.findIndex(s => !s.completed)
  if (currentIndex === -1) currentIndex = steps.length // all done

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0',
      padding: '24px 0',
      marginBottom: '8px'
    }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
          {/* Circle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div className="stepper-circle" style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.3s',
              ...(step.completed
                ? { background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff' }
                : i === currentIndex
                  ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff' }
                  : { background: '#e2e8f0', color: '#94a3b8' }
              )
            }}>
              {step.completed ? '✓' : i + 1}
            </div>
            <span style={{
              fontSize: '12px',
              fontWeight: 500,
              color: step.completed ? '#16a34a' : i === currentIndex ? '#6366f1' : '#94a3b8'
            }}>
              {step.label}
            </span>
          </div>
          {/* Connector line */}
          {i < steps.length - 1 && (
            <div style={{
              width: '60px',
              height: '2px',
              background: steps[i + 1].completed || step.completed && steps[i + 1].completed
                ? '#22c55e'
                : step.completed
                  ? '#22c55e'
                  : '#e2e8f0',
              marginBottom: '22px',
              marginLeft: '8px',
              marginRight: '8px',
              borderRadius: '1px'
            }} />
          )}
        </div>
      ))}
    </div>
  )
}

function SemanaContent({ semana }: { semana: Semana }) {
  const { toggle, ids, preclaseCompleted, claseCompleted, entregableCompleted } = useSemanaProgress(semana.num)
  const checklist = useChecklist(semana.num, semana.entregable.checklist.length)

  const handleLogout = () => {
    localStorage.removeItem('precurso-access')
    localStorage.removeItem('curso-progress')
    window.location.href = '/curso'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#0f172a'
    }}>
      <Head>
        <title>Semana {semana.num}: {semana.titulo} | Curso</title>
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
            ← Volver
          </Link>
          <div style={{
            width: '1px',
            height: '24px',
            background: 'rgba(0,0,0,0.08)'
          }} />
          <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#0f172a' }}>
            Semana {semana.num}: {semana.titulo}
          </h1>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#64748b',
            background: 'transparent',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Salir
        </button>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Hero */}
        <div style={{
          marginBottom: '8px',
          paddingBottom: '24px',
          borderBottom: '1px solid rgba(0,0,0,0.06)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#64748b',
            marginBottom: '16px'
          }}>
            <span>{semana.emoji}</span>
            SEMANA {semana.num}
          </div>
          <h2 style={{ margin: '0 0 12px', fontSize: '32px', fontWeight: 700, color: '#0f172a' }}>
            {semana.titulo}
          </h2>
          <p style={{ margin: 0, fontSize: '17px', color: '#64748b', lineHeight: 1.6 }}>
            {semana.descripcion}
          </p>
        </div>

        {/* Stepper */}
        <ProgressStepper
          preclaseCompleted={preclaseCompleted}
          claseCompleted={claseCompleted}
          entregableCompleted={entregableCompleted}
        />

        {/* Pre-clase */}
        <section style={{
          background: preclaseCompleted
            ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)'
            : '#fff',
          border: `1px solid ${preclaseCompleted ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0,0,0,0.06)'}`,
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px'
              }}>
                <span style={{
                  width: '32px',
                  height: '32px',
                  background: preclaseCompleted
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : 'linear-gradient(135deg, #f59e0b, #d97706)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}>
                  {preclaseCompleted ? '✓' : '📚'}
                </span>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>Pre-clase</h3>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                {semana.preclase.titulo} • {semana.preclase.duracion}
              </p>
            </div>
            <button
              onClick={() => toggle(ids.preclase)}
              style={{
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: 600,
                color: preclaseCompleted ? '#22c55e' : '#fff',
                background: preclaseCompleted ? 'rgba(34, 197, 94, 0.1)' : '#334155',
                border: `1px solid ${preclaseCompleted ? 'rgba(34, 197, 94, 0.3)' : '#475569'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {preclaseCompleted ? '✓ Completado' : 'Marcar completado'}
            </button>
          </div>

          {/* Contenido markdown */}
          <div style={{
            background: 'rgba(0,0,0,0.02)',
            border: '1px solid rgba(0,0,0,0.04)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            fontSize: '15px',
            lineHeight: 1.7,
            color: '#374151'
          }}>
            <div
              dangerouslySetInnerHTML={{
                __html: semana.preclase.contenido
                  .replace(/^## (.+)$/gm, '<h4 style="font-size: 17px; font-weight: 600; color: #0f172a; margin: 24px 0 12px;">$1</h4>')
                  .replace(/^### (.+)$/gm, '<h5 style="font-size: 15px; font-weight: 600; color: #1e293b; margin: 20px 0 10px;">$1</h5>')
                  .replace(/^- (.+)$/gm, '<li style="margin-left: 20px; margin-bottom: 6px;">$1</li>')
                  .replace(/^\d+\. (.+)$/gm, '<li style="margin-left: 20px; margin-bottom: 6px;">$1</li>')
                  .replace(/`([^`]+)`/g, '<code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 13px; color: #0f172a;">$1</code>')
                  .replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #0f172a;">$1</strong>')
                  .replace(/> (.+)/g, '<blockquote style="border-left: 3px solid #6366f1; padding-left: 16px; margin: 16px 0; color: #6366f1; font-style: italic;">$1</blockquote>')
                  .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre style="background: #1e293b; color: #e2e8f0; border: 1px solid #334155; border-radius: 8px; padding: 16px; overflow-x: auto; font-size: 13px; margin: 16px 0;"><code>$2</code></pre>')
                  .replace(/\n\n/g, '<br/><br/>')
              }}
            />
          </div>

          {/* Recursos */}
          {semana.preclase.recursos.length > 0 && (
            <div>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
                📎 Recursos
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {semana.preclase.recursos.map((recurso, i) => (
                  <a
                    key={i}
                    href={recurso.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 16px',
                      background: 'rgba(0,0,0,0.02)',
                      border: '1px solid rgba(0,0,0,0.06)',
                      borderRadius: '10px',
                      color: '#6366f1',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>
                      {recurso.tipo === 'pdf' ? '📄' :
                       recurso.tipo === 'video' ? '🎥' :
                       recurso.tipo === 'github' ? '💻' : '🔗'}
                    </span>
                    {recurso.titulo}
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Clase en vivo */}
        <section style={{
          background: claseCompleted
            ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)'
            : '#fff',
          border: `1px solid ${claseCompleted ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0,0,0,0.06)'}`,
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px'
              }}>
                <span style={{
                  width: '32px',
                  height: '32px',
                  background: claseCompleted
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}>
                  {claseCompleted ? '✓' : '🎥'}
                </span>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>Clase en vivo</h3>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                {semana.clase.fecha} • {semana.clase.hora} • {semana.clase.duracion}
              </p>
            </div>
            <button
              onClick={() => toggle(ids.clase)}
              style={{
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: 600,
                color: claseCompleted ? '#22c55e' : '#fff',
                background: claseCompleted ? 'rgba(34, 197, 94, 0.1)' : '#334155',
                border: `1px solid ${claseCompleted ? 'rgba(34, 197, 94, 0.3)' : '#475569'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {claseCompleted ? '✓ Vista' : 'Marcar como vista'}
            </button>
          </div>

          {/* Video embed placeholder */}
          {semana.clase.videoUrl ? (
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              background: '#0f172a',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '20px'
            }}>
              <iframe
                src={semana.clase.videoUrl}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div style={{
              background: 'rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>📹</span>
              <p style={{ margin: 0, fontSize: '15px', color: '#64748b' }}>
                El video de la clase se publicará después de la sesión en vivo
              </p>
            </div>
          )}

          {/* Botón Abrir Pizarra */}
          <Link href={`/curso/clase/${semana.num}`} className="pizarra-btn" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '14px 24px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            fontSize: '15px',
            fontWeight: 600,
            borderRadius: '12px',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            transition: 'all 0.2s',
            marginBottom: '20px'
          }}>
            📋 Abrir Pizarra
          </Link>

          {/* Notas de la clase */}
          {semana.clase.notas && (
            <div>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
                📝 Notas de la clase
              </h4>
              <div style={{
                background: 'rgba(0,0,0,0.02)',
                border: '1px solid rgba(0,0,0,0.04)',
                borderRadius: '10px',
                padding: '16px',
                fontSize: '14px',
                lineHeight: 1.7,
                color: '#374151'
              }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: semana.clase.notas
                      .replace(/^### (.+)$/gm, '<h5 style="font-size: 14px; font-weight: 600; color: #1e293b; margin: 16px 0 8px;">$1</h5>')
                      .replace(/^- (.+)$/gm, '<li style="margin-left: 16px; margin-bottom: 4px;">$1</li>')
                      .replace(/\n\n/g, '<br/>')
                  }}
                />
              </div>
            </div>
          )}
        </section>

        {/* Entregable */}
        <section style={{
          background: entregableCompleted
            ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)'
            : '#fff',
          border: `1px solid ${entregableCompleted ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0,0,0,0.06)'}`,
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px'
              }}>
                <span style={{
                  width: '32px',
                  height: '32px',
                  background: entregableCompleted
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : 'linear-gradient(135deg, #ec4899, #db2777)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}>
                  {entregableCompleted ? '✓' : '📦'}
                </span>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>Entregable</h3>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                {semana.entregable.titulo} • Fecha límite: {semana.entregable.fechaLimite}
              </p>
            </div>
            <button
              onClick={() => toggle(ids.entregable)}
              style={{
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: 600,
                color: entregableCompleted ? '#22c55e' : '#fff',
                background: entregableCompleted ? 'rgba(34, 197, 94, 0.1)' : '#334155',
                border: `1px solid ${entregableCompleted ? 'rgba(34, 197, 94, 0.3)' : '#475569'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {entregableCompleted ? '✓ Completado' : 'Marcar completado'}
            </button>
          </div>

          <p style={{
            margin: '0 0 20px',
            fontSize: '15px',
            color: '#374151',
            lineHeight: 1.6
          }}>
            {semana.entregable.descripcion}
          </p>

          <div style={{
            background: 'rgba(0,0,0,0.02)',
            border: '1px solid rgba(0,0,0,0.04)',
            borderRadius: '10px',
            padding: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
                Checklist
              </h4>
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: checklist.completedCount === checklist.totalItems ? '#22c55e' : '#64748b',
                background: checklist.completedCount === checklist.totalItems ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.04)',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                {checklist.completedCount}/{checklist.totalItems}
              </span>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {semana.entregable.checklist.map((item, i) => (
                <li
                  key={i}
                  onClick={() => checklist.toggleItem(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginBottom: '10px',
                    fontSize: '14px',
                    color: checklist.checked[i] ? '#94a3b8' : '#374151',
                    textDecoration: checklist.checked[i] ? 'line-through' : 'none',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.15s'
                  }}
                >
                  <span style={{
                    width: '18px',
                    height: '18px',
                    border: checklist.checked[i] ? 'none' : '2px solid #cbd5e1',
                    background: checklist.checked[i] ? '#22c55e' : 'transparent',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                    fontSize: '11px',
                    color: '#fff',
                    transition: 'all 0.15s'
                  }}>
                    {checklist.checked[i] ? '✓' : ''}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(0,0,0,0.06)'
        }}>
          {semana.num > 1 ? (
            <Link href={`/curso/semana/${semana.num - 1}`} style={{
              color: '#64748b',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              ← Semana {semana.num - 1}
            </Link>
          ) : <div />}

          {semana.num < 10 ? (
            <Link href={`/curso/semana/${semana.num + 1}`} style={{
              color: '#64748b',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Semana {semana.num + 1} →
            </Link>
          ) : <div />}
        </div>
      </main>

      <style jsx global>{`
        .pizarra-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4) !important;
        }
        @media (max-width: 640px) {
          main { padding: 20px 16px !important; }
          h2 { font-size: 24px !important; }
          section { padding: 20px !important; }
          .stepper-circle { width: 32px !important; height: 32px !important; font-size: 12px !important; }
          .pizarra-btn { width: 100% !important; }
        }
      `}</style>
    </div>
  )
}

function SemanaPage() {
  const router = useRouter()
  const { num } = router.query
  const semanaNum = parseInt(num as string, 10)

  if (!num || isNaN(semanaNum) || semanaNum < 1 || semanaNum > 10) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0f172a',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Semana no encontrada</h1>
          <Link href="/curso" style={{ color: '#6366f1' }}>← Volver al curso</Link>
        </div>
      </div>
    )
  }

  const semana = CURSO_SEMANAS.find(s => s.num === semanaNum)

  if (!semana) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0f172a',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Semana no encontrada</h1>
          <Link href="/curso" style={{ color: '#6366f1' }}>← Volver al curso</Link>
        </div>
      </div>
    )
  }

  return (
    <CursoEmailGate>
      <SemanaContent semana={semana} />
    </CursoEmailGate>
  )
}

export default SemanaPage
