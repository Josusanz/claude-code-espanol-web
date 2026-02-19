import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import CursoEmailGate from '../../components/CursoEmailGate'
import { MODULOS_AUTOGUIADO } from '../../lib/curso-autoguiado-data'

const NIVEL_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  principiante: { bg: '#d1fae5', text: '#065f46', label: 'Principiante' },
  intermedio: { bg: '#dbeafe', text: '#1e40af', label: 'Intermedio' },
  avanzado: { bg: '#ede9fe', text: '#5b21b6', label: 'Avanzado' },
}

function Dashboard() {
  const [progress, setProgress] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem('autoguiado-progress')
      if (saved) {
        setProgress(JSON.parse(saved))
      }
    } catch {
      // Ignore
    }
  }, [])

  const completedCount = MODULOS_AUTOGUIADO.filter(m => progress[`autoguiado-modulo-${m.num}`]).length
  const totalModulos = MODULOS_AUTOGUIADO.length
  const progressPercent = Math.round((completedCount / totalModulos) * 100)

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
        <title>Crea tu Software con IA | Curso Autoguiado</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🚀</span>
            <div>
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                Crea tu Software con IA
              </h1>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                Curso autoguiado
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/curso/themes" style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 500,
              color: '#6366f1',
              background: '#eef2ff',
              border: '1px solid #c7d2fe',
              borderRadius: '8px',
              textDecoration: 'none',
            }}>
              🎨 Themes
            </Link>
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
        </div>
      </header>

      <main style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '32px 24px 80px',
      }}>
        {/* Hero section */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '20px',
          padding: '40px 32px',
          color: 'white',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />
          <h2 style={{
            margin: '0 0 8px',
            fontSize: '28px',
            fontWeight: 800,
            position: 'relative',
          }}>
            Tu camino para crear software con IA
          </h2>
          <p style={{
            margin: '0 0 24px',
            fontSize: '16px',
            opacity: 0.9,
            maxWidth: '600px',
            lineHeight: 1.6,
            position: 'relative',
          }}>
            11 módulos, a tu ritmo. Desde cero hasta lanzar tu propio SaaS.
          </p>

          {/* Progress bar */}
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '13px',
              fontWeight: 600,
            }}>
              <span>Progreso total</span>
              <span>{completedCount}/{totalModulos} módulos</span>
            </div>
            <div style={{
              height: '10px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '5px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: 'white',
                borderRadius: '5px',
                transition: 'width 0.5s ease',
              }} />
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}>
          <a
            href="https://discord.gg/PeqyDhSBEh"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#5865F2',
              textDecoration: 'none',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            💬 Discord del curso
          </a>
          <Link href="/fundamentos" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#475569',
            textDecoration: 'none',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            📚 Lecciones gratuitas
          </Link>
        </div>

        {/* Module grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {MODULOS_AUTOGUIADO.map(modulo => {
            const isCompleted = progress[`autoguiado-modulo-${modulo.num}`]
            const badge = NIVEL_BADGE[modulo.nivel]

            return (
              <Link
                key={modulo.num}
                href={`/curso-crea-tu-software/modulo/${modulo.num}`}
                style={{
                  display: 'block',
                  background: '#fff',
                  border: isCompleted ? '2px solid #22c55e' : '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '16px',
                  padding: '24px',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Completed indicator */}
                {isCompleted && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '28px',
                    height: '28px',
                    background: '#22c55e',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 700,
                  }}>
                    ✓
                  </div>
                )}

                {/* Module number + emoji */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                }}>
                  <span style={{
                    width: '44px',
                    height: '44px',
                    background: isCompleted
                      ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                      : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    flexShrink: 0,
                  }}>
                    {modulo.emoji}
                  </span>
                  <div>
                    <p style={{
                      margin: 0,
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Módulo {modulo.num}
                    </p>
                    <h3 style={{
                      margin: 0,
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#0f172a',
                      lineHeight: 1.3,
                    }}>
                      {modulo.titulo}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  margin: '0 0 16px',
                  fontSize: '14px',
                  color: '#64748b',
                  lineHeight: 1.5,
                }}>
                  {modulo.descripcion}
                </p>

                {/* Footer: badges */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 600,
                    borderRadius: '6px',
                    background: badge.bg,
                    color: badge.text,
                  }}>
                    {badge.label}
                  </span>
                  <span style={{
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 500,
                    borderRadius: '6px',
                    background: '#f1f5f9',
                    color: '#64748b',
                  }}>
                    ⏱ {modulo.duracion}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Recommended order note */}
        <div style={{
          marginTop: '32px',
          padding: '16px 20px',
          background: '#fef9c3',
          border: '1px solid #fde047',
          borderRadius: '12px',
          fontSize: '14px',
          color: '#854d0e',
          lineHeight: 1.6,
        }}>
          <strong>💡 Orden recomendado:</strong> Los módulos están ordenados de forma progresiva (0 → 10). Puedes acceder a cualquiera en cualquier momento, pero te recomendamos seguir el orden para no perderte nada.
        </div>
      </main>

      <style jsx global>{`
        a[href^="/curso-crea-tu-software/modulo/"]:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
        }
        @media (max-width: 640px) {
          h2 { font-size: 22px !important; }
        }
      `}</style>
    </div>
  )
}

export default function CursoAutoguiadoPage() {
  return (
    <CursoEmailGate>
      <Dashboard />
    </CursoEmailGate>
  )
}
