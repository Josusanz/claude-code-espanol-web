import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import CursoEmailGate from '../../../components/CursoEmailGate'
import FreeEmailGate from '../../../components/FreeEmailGate'
import { MODULOS_AUTOGUIADO, getModuloAutoguiado } from '../../../lib/curso-autoguiado-data'
import { CURSO_SEMANAS } from '../../../lib/curso-data'
import { getPizarra } from '../../../lib/curso-pizarra-data'
import { renderPreclaseContent, parseContentBlocks } from '../../../components/curso-shared/ContentRenderer'
import { PasoComponent } from '../../../components/curso-shared/PasoRenderer'
import { useTheme, ThemeToggleButton, THEME_GLOBAL_CSS } from '../../../lib/theme-utils'

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

interface ModuloUnlockStatus {
  unlocked: boolean
  availableDate: string
  daysRemaining: number
}

function UnlockCountdown({ availableDate, daysRemaining }: { availableDate: string; daysRemaining: number }) {
  const formattedDate = new Date(availableDate).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        maxWidth: '480px',
        textAlign: 'center',
        background: '#fff',
        borderRadius: '24px',
        padding: '48px 40px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '36px',
          boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)',
        }}>
          🔒
        </div>
        <h2 style={{ margin: '0 0 12px', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
          Este modulo aun no esta disponible
        </h2>
        <p style={{ margin: '0 0 24px', fontSize: '16px', color: '#64748b', lineHeight: 1.6 }}>
          Se desbloquea el <strong style={{ color: '#0f172a' }}>{formattedDate}</strong>
        </p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          background: '#fef3c7',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 700,
          color: '#92400e',
          marginBottom: '32px',
        }}>
          {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'} restantes
        </div>
        <div>
          <Link href="/curso-crea-tu-software" style={{
            display: 'inline-block',
            padding: '14px 28px',
            fontSize: '15px',
            fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '12px',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
          }}>
            ← Volver a los modulos
          </Link>
        </div>
      </div>
    </div>
  )
}

function ModuloContent({ moduloNum }: { moduloNum: number }) {
  const modulo = getModuloAutoguiado(moduloNum)
  const { progress, toggle } = useAutoguiadoProgress()
  const [unlockStatus, setUnlockStatus] = useState<Record<number, ModuloUnlockStatus> | null>(null)
  const [unlockChecked, setUnlockChecked] = useState(false)

  // Check unlock status for paid modules
  useEffect(() => {
    if (!modulo || modulo.gratis) {
      setUnlockChecked(true)
      return
    }
    const email = getUserEmail()
    if (!email) {
      setUnlockChecked(true)
      return
    }
    fetch(`/api/autoguiado/unlock-status?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.modulos) {
          setUnlockStatus(data.modulos)
        }
      })
      .catch(() => {})
      .finally(() => setUnlockChecked(true))
  }, [modulo])

  const { isDark, toggleTheme, t, mounted } = useTheme()

  // Compute these before early returns so hooks are always called in the same order
  const semana = modulo?.semanaNum ? CURSO_SEMANAS.find(s => s.num === modulo.semanaNum) : null
  const pizarra = modulo?.semanaNum ? getPizarra(modulo.semanaNum) : null
  const isCompleted = progress[`autoguiado-modulo-${modulo?.num ?? -1}`] || false
  const checklist = useChecklist(modulo?.num ?? -1, semana?.entregable.checklist.length || 0)

  if (!modulo) return null

  // Show countdown if module is locked
  if (unlockChecked && !modulo.gratis && unlockStatus) {
    const status = unlockStatus[moduloNum]
    if (status && !status.unlocked) {
      return <UnlockCountdown availableDate={status.availableDate} daysRemaining={status.daysRemaining} />
    }
  }

  // Still checking unlock or theme not mounted
  if ((!unlockChecked && !modulo.gratis) || !mounted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #e2e8f0',
          borderTop: '3px solid #6366f1',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const prevModulo = MODULOS_AUTOGUIADO.find(m => m.num === modulo.num - 1)
  const nextModulo = MODULOS_AUTOGUIADO.find(m => m.num === modulo.num + 1)

  const handleLogout = () => {
    localStorage.removeItem('precurso-access')
    window.location.href = '/curso'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: t.text,
      transition: 'background 0.3s, color 0.3s',
    }}>
      <Head>
        <title>Modulo {modulo.num}: {modulo.titulo} | Crea tu Software</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* Sticky header */}
      <header style={{
        background: t.navBg,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${t.border}`,
        padding: '12px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'all 0.3s',
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
              color: t.textTertiary,
              textDecoration: 'none',
              fontSize: '14px',
            }}>
              ← Modulos
            </Link>
            <div style={{ width: '1px', height: '24px', background: t.border }} />
            <span style={{ fontSize: '20px' }}>{modulo.emoji}</span>
            <h1 className="header-title" style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: t.text }}>
              Modulo {modulo.num}: {modulo.titulo}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ThemeToggleButton isDark={isDark} toggleTheme={toggleTheme} />
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                color: t.textSecondary,
                background: 'transparent',
                border: `1px solid ${t.border}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '32px 20px 80px',
      }}>
        {/* Module hero */}
        <div className="animate-fade-in" style={{
          background: `linear-gradient(135deg, ${t.accent}, ${t.accentHover})`,
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
                color: t.accent,
                background: t.glow,
                border: `1px solid ${t.border}`,
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s',
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

        {/* ===== VIDEOS SECTION (from clase) ===== */}
        {semana && semana.clase.videos && semana.clase.videos.length > 0 && (
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
                🎥
              </span>
              <div>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: t.text }}>
                  Grabaciones de clase
                </h2>
                <p style={{ margin: '2px 0 0', fontSize: '13px', color: t.textSecondary }}>
                  {semana.clase.fecha} · {semana.clase.duracion}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {semana.clase.videos.map((video, vi) => (
                video.tipo === 'embed' ? (
                  <div key={vi}>
                    {semana.clase.videos!.length > 1 && (
                      <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600, color: t.text }}>
                        🎬 {video.titulo}
                      </p>
                    )}
                    <div style={{
                      position: 'relative',
                      paddingBottom: '56.25%',
                      height: 0,
                      background: '#0f172a',
                      borderRadius: '12px',
                      overflow: 'hidden',
                    }}>
                      <iframe
                        src={video.url}
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
                  </div>
                ) : (
                  <a
                    key={vi}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '18px 20px',
                      background: t.bgSecondary,
                      border: `1px solid ${t.border}`,
                      borderRadius: '14px',
                      textDecoration: 'none',
                      boxShadow: `0 1px 3px ${t.glow}`,
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      flexShrink: 0,
                    }}>
                      ▶️
                    </span>
                    <div>
                      <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: t.text }}>
                        {video.titulo}
                      </p>
                      <p style={{ margin: '2px 0 0', fontSize: '13px', color: t.textSecondary }}>
                        {video.passcode ? `Código: ${video.passcode} · ` : ''}Click para ver la grabación
                      </p>
                    </div>
                    <span style={{ marginLeft: 'auto', fontSize: '18px', color: t.textTertiary }}>↗</span>
                  </a>
                )
              ))}
            </div>
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
          background: t.bgSecondary,
          border: `1px solid ${t.border}`,
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          boxShadow: `0 1px 3px ${t.glow}`,
          marginBottom: '32px',
          transition: 'all 0.3s',
        }}>
          <button
            onClick={() => toggle(`autoguiado-modulo-${modulo.num}`)}
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 600,
              color: isCompleted ? '#22c55e' : '#fff',
              background: isCompleted
                ? isDark ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)'
                : `linear-gradient(135deg, ${t.accent}, ${t.accentHover})`,
              border: isCompleted ? '2px solid rgba(34, 197, 94, 0.3)' : 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: isCompleted ? 'none' : `0 4px 14px ${t.glowStrong}`,
            }}
          >
            {isCompleted ? '✓ Modulo completado' : 'Marcar modulo como completado'}
          </button>
        </div>

        {/* ===== CTA for module 0 ===== */}
        {modulo.gratis && (
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
            borderRadius: '20px',
            padding: '40px 32px',
            color: 'white',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: '-40%',
              right: '-10%',
              width: '350px',
              height: '350px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
              borderRadius: '50%',
            }} />
            <div style={{ position: 'relative' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '24px', fontWeight: 800 }}>
                Has construido tu primera web con IA
              </h3>
              <p style={{ margin: '0 0 24px', fontSize: '16px', opacity: 0.9, lineHeight: 1.6, maxWidth: '600px' }}>
                En el curso completo aprenderas a crear un SaaS completo: base de datos, autenticacion, pagos, testing y deploy profesional. De cero a lanzamiento.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '10px',
                marginBottom: '28px',
              }}>
                {MODULOS_AUTOGUIADO.filter(m => m.num >= 1).map(m => (
                  <div key={m.num} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    background: 'rgba(255,255,255,0.12)',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 500,
                  }}>
                    <span>{m.emoji}</span>
                    <span>M{m.num}: {m.titulo}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <a
                  href="https://aprende.software/curso-crea-tu-software#comprar"
                  style={{
                    display: 'inline-block',
                    padding: '16px 32px',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#6366f1',
                    background: 'white',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s',
                  }}
                >
                  Acceder al curso completo
                </a>
                <span style={{ fontSize: '14px', opacity: 0.8 }}>
                  10 modulos · Proyecto real · A tu ritmo
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ===== NAVIGATION ===== */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
          borderTop: `1px solid ${t.border}`,
        }}>
          {prevModulo ? (
            <Link href={`/curso-crea-tu-software/modulo/${prevModulo.num}`} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: 500,
              color: t.textSecondary,
              background: t.bgSecondary,
              border: `1px solid ${t.border}`,
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}>
              ← {prevModulo.emoji} Modulo {prevModulo.num}
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
              background: `linear-gradient(135deg, ${t.accent}, ${t.accentHover})`,
              border: 'none',
              borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: `0 2px 8px ${t.glowStrong}`,
              transition: 'all 0.2s',
            }}>
              Modulo {nextModulo.num} {nextModulo.emoji} →
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
        ${THEME_GLOBAL_CSS}
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

  if (modulo?.gratis) {
    return (
      <FreeEmailGate>
        <ModuloContent moduloNum={moduloNum} />
      </FreeEmailGate>
    )
  }

  return (
    <CursoEmailGate>
      <ModuloContent moduloNum={moduloNum} />
    </CursoEmailGate>
  )
}
