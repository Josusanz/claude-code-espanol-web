import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import CursoEmailGate from '../../../components/CursoEmailGate'
import { MODULOS_AUTOGUIADO, getModuloAutoguiado } from '../../../lib/curso-autoguiado-data'
import { CURSO_SEMANAS } from '../../../lib/curso-data'
import { getPizarra } from '../../../lib/curso-pizarra-data'
import { renderPreclaseContent, parseContentBlocks } from '../../../components/curso-shared/ContentRenderer'
import { PasoComponent } from '../../../components/curso-shared/PasoRenderer'

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

function useAutoguiadoProgress() {
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const email = getUserEmail()
    setUserEmail(email)

    try {
      const saved = localStorage.getItem('autoguiado-progress')
      if (saved) {
        setProgress(JSON.parse(saved))
      }
    } catch {
      // Ignore
    }

    if (email) {
      fetch(`/api/autoguiado/sync-progress?email=${encodeURIComponent(email)}`)
        .then(res => res.json())
        .then(data => {
          if (data.progress) {
            setProgress(prev => ({ ...prev, ...data.progress }))
          }
        })
        .catch(() => {})
    }
  }, [])

  const toggle = async (id: string) => {
    const newProgress = { ...progress, [id]: !progress[id] }
    setProgress(newProgress)
    localStorage.setItem('autoguiado-progress', JSON.stringify(newProgress))

    if (userEmail) {
      try {
        await fetch('/api/autoguiado/sync-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, progress: newProgress })
        })
      } catch {
        // Ignore
      }
    }
  }

  return { progress, toggle }
}

function useChecklist(moduloNum: number, totalItems: number) {
  const [checked, setChecked] = useState<Record<number, boolean>>({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem('autoguiado-checklist')
      if (saved) {
        const all = JSON.parse(saved)
        if (all[moduloNum]) {
          setChecked(all[moduloNum])
        }
      }
    } catch {
      // Ignore
    }
  }, [moduloNum])

  const toggleItem = (index: number) => {
    const newChecked = { ...checked, [index]: !checked[index] }
    setChecked(newChecked)
    try {
      const saved = localStorage.getItem('autoguiado-checklist')
      const all = saved ? JSON.parse(saved) : {}
      all[moduloNum] = newChecked
      localStorage.setItem('autoguiado-checklist', JSON.stringify(all))
    } catch {
      // Ignore
    }
  }

  const completedCount = Object.values(checked).filter(Boolean).length
  return { checked, toggleItem, completedCount, totalItems }
}

// Render module 0 custom content (markdown-like)
function renderCustomContent(contenido: string) {
  return renderPreclaseContent(contenido)
}

function ModuloContent({ moduloNum }: { moduloNum: number }) {
  const modulo = getModuloAutoguiado(moduloNum)
  const { progress, toggle } = useAutoguiadoProgress()

  if (!modulo) return null

  const semana = modulo.semanaNum ? CURSO_SEMANAS.find(s => s.num === modulo.semanaNum) : null
  const pizarra = modulo.semanaNum ? getPizarra(modulo.semanaNum) : null
  const isCompleted = progress[`autoguiado-modulo-${modulo.num}`] || false

  const checklist = useChecklist(modulo.num, semana?.entregable.checklist.length || 0)

  const prevModulo = MODULOS_AUTOGUIADO.find(m => m.num === modulo.num - 1)
  const nextModulo = MODULOS_AUTOGUIADO.find(m => m.num === modulo.num + 1)

  const handleLogout = () => {
    localStorage.removeItem('precurso-access')
    window.location.href = '/curso'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#0f172a',
    }}>
      <Head>
        <title>Módulo {modulo.num}: {modulo.titulo} | Crea tu Software</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* Sticky header */}
      <header style={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '12px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/curso-crea-tu-software" style={{
              color: '#64748b',
              textDecoration: 'none',
              fontSize: '14px',
            }}>
              ← Módulos
            </Link>
            <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.08)' }} />
            <span style={{ fontSize: '20px' }}>{modulo.emoji}</span>
            <h1 className="header-title" style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>
              Módulo {modulo.num}: {modulo.titulo}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 500,
              color: '#64748b',
              background: 'transparent',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Salir
          </button>
        </div>
      </header>

      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '32px 20px 80px',
      }}>
        {/* Module hero */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '20px',
          padding: '32px',
          color: 'white',
          marginBottom: '32px',
        }}>
          <p style={{
            margin: '0 0 4px',
            fontSize: '13px',
            fontWeight: 600,
            opacity: 0.8,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Módulo {modulo.num} · {modulo.duracion}
          </p>
          <h2 style={{ margin: '0 0 12px', fontSize: '28px', fontWeight: 800 }}>
            {modulo.emoji} {modulo.titulo}
          </h2>
          <p style={{ margin: 0, fontSize: '16px', opacity: 0.9, lineHeight: 1.6 }}>
            {modulo.intro}
          </p>
        </div>

        {/* Related lessons */}
        {modulo.leccionesRelacionadas && modulo.leccionesRelacionadas.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            {modulo.leccionesRelacionadas.map((l, i) => (
              <Link key={i} href={l.url} style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#6366f1',
                background: '#eef2ff',
                border: '1px solid #c7d2fe',
                borderRadius: '8px',
                textDecoration: 'none',
              }}>
                📚 {l.titulo}
              </Link>
            ))}
          </div>
        )}

        {/* ===== MODULE 0: Custom content ===== */}
        {modulo.contenidoCustom && (
          <section style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '2px solid #6366f1',
            }}>
              <span style={{
                width: '36px',
                height: '36px',
                background: '#6366f1',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 700,
              }}>
                📖
              </span>
              <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>
                Contenido
              </h2>
            </div>
            {renderCustomContent(modulo.contenidoCustom)}
          </section>
        )}

        {/* ===== THEORY SECTION (from preclase) ===== */}
        {semana && (
          <section style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '2px solid #f59e0b',
            }}>
              <span style={{
                width: '36px',
                height: '36px',
                background: '#f59e0b',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 700,
              }}>
                📚
              </span>
              <div>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>
                  Teoría
                </h2>
                <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
                  {semana.preclase.titulo} · {semana.preclase.duracion}
                </p>
              </div>
            </div>

            {renderPreclaseContent(semana.preclase.contenido)}

            {/* Resources */}
            {semana.preclase.recursos.length > 0 && (
              <div style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '16px',
                padding: '20px',
                marginTop: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
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
                        background: '#f8fafc',
                        border: '1px solid rgba(0,0,0,0.06)',
                        borderRadius: '10px',
                        color: '#6366f1',
                        textDecoration: 'none',
                        fontSize: '14px',
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
        )}

        {/* ===== PRACTICE SECTION (from pizarra) ===== */}
        {pizarra && (
          <section style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '2px solid #6366f1',
            }}>
              <span style={{
                width: '36px',
                height: '36px',
                background: '#6366f1',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 700,
              }}>
                🛠️
              </span>
              <div>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>
                  Práctica paso a paso
                </h2>
                <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
                  {pizarra.subtitulo}
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              {pizarra.pasos.map((paso, i) => (
                <PasoComponent key={i} paso={paso} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* ===== ENTREGABLE SECTION ===== */}
        {semana && (
          <section style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '2px solid #ec4899',
            }}>
              <span style={{
                width: '36px',
                height: '36px',
                background: '#ec4899',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 700,
              }}>
                📦
              </span>
              <div>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>
                  Entregable
                </h2>
                <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
                  {semana.entregable.titulo}
                </p>
              </div>
            </div>

            <p style={{
              margin: '0 0 20px',
              fontSize: '15px',
              color: '#374151',
              lineHeight: 1.6,
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              {semana.entregable.descripcion}
            </p>

            {/* Checklist */}
            <div style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>
                  Checklist
                </h4>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: checklist.completedCount === checklist.totalItems ? '#22c55e' : '#64748b',
                  background: checklist.completedCount === checklist.totalItems ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.04)',
                  padding: '4px 10px',
                  borderRadius: '6px',
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
                      gap: '12px',
                      padding: '10px 0',
                      borderBottom: i < semana.entregable.checklist.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                      fontSize: '14px',
                      color: checklist.checked[i] ? '#94a3b8' : '#374151',
                      textDecoration: checklist.checked[i] ? 'line-through' : 'none',
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span style={{
                      width: '20px',
                      height: '20px',
                      border: checklist.checked[i] ? 'none' : '2px solid #cbd5e1',
                      background: checklist.checked[i] ? '#22c55e' : 'transparent',
                      borderRadius: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '1px',
                      fontSize: '12px',
                      color: '#fff',
                      transition: 'all 0.15s',
                    }}>
                      {checklist.checked[i] ? '✓' : ''}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ===== MARK AS COMPLETED ===== */}
        <div style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          marginBottom: '32px',
        }}>
          <button
            onClick={() => toggle(`autoguiado-modulo-${modulo.num}`)}
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 600,
              color: isCompleted ? '#22c55e' : '#fff',
              background: isCompleted
                ? 'rgba(34, 197, 94, 0.1)'
                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: isCompleted ? '2px solid rgba(34, 197, 94, 0.3)' : 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: isCompleted ? 'none' : '0 4px 14px rgba(99, 102, 241, 0.3)',
            }}
          >
            {isCompleted ? '✓ Módulo completado' : 'Marcar módulo como completado'}
          </button>
        </div>

        {/* ===== NAVIGATION ===== */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}>
          {prevModulo ? (
            <Link href={`/curso-crea-tu-software/modulo/${prevModulo.num}`} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#64748b',
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}>
              ← {prevModulo.emoji} Módulo {prevModulo.num}
            </Link>
          ) : <div />}

          {nextModulo ? (
            <Link href={`/curso-crea-tu-software/modulo/${nextModulo.num}`} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.2s',
            }}>
              Módulo {nextModulo.num} {nextModulo.emoji} →
            </Link>
          ) : (
            <Link href="/curso-crea-tu-software" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#fff',
              background: '#22c55e',
              border: 'none',
              borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)',
            }}>
              🎉 Volver al dashboard
            </Link>
          )}
        </div>
      </main>

      <style jsx global>{`
        * { box-sizing: border-box; }
        @media (max-width: 640px) {
          .header-title { font-size: 13px !important; }
          h2 { font-size: 20px !important; }
          pre { font-size: 12px !important; }
        }
      `}</style>
    </div>
  )
}

export default function ModuloPage() {
  const router = useRouter()
  const { num } = router.query
  const moduloNum = parseInt(num as string, 10)

  if (!num || isNaN(moduloNum) || moduloNum < 0 || moduloNum > 10) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Módulo no encontrado</h1>
          <Link href="/curso-crea-tu-software" style={{ color: '#6366f1' }}>← Volver a los módulos</Link>
        </div>
      </div>
    )
  }

  const modulo = getModuloAutoguiado(moduloNum)

  if (!modulo) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Módulo no encontrado</h1>
          <Link href="/curso-crea-tu-software" style={{ color: '#6366f1' }}>← Volver a los módulos</Link>
        </div>
      </div>
    )
  }

  return (
    <CursoEmailGate>
      <ModuloContent moduloNum={moduloNum} />
    </CursoEmailGate>
  )
}
