import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import CursoEmailGate from './CursoEmailGate'
import { PRECURSO_PAGES, usePrecursoProgress } from '../lib/precurso-data'

interface Modulo0LayoutProps {
  title: string
  children: ReactNode
}

function Modulo0LayoutInner({ title, children }: Modulo0LayoutProps) {
  const router = useRouter()
  const { completed } = usePrecursoProgress()
  const path = router.asPath.split(/[?#]/)[0]

  const currentIdx = PRECURSO_PAGES.findIndex(p => p.href === path)
  const prevPage = currentIdx > 0 ? PRECURSO_PAGES[currentIdx - 1] : null
  const nextPage = currentIdx >= 0 && currentIdx < PRECURSO_PAGES.length - 1 ? PRECURSO_PAGES[currentIdx + 1] : null

  const completedCount = PRECURSO_PAGES.filter(p => p.trackingId && completed[p.trackingId]).length

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafbfc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#1e293b',
    }}>
      <Head>
        <title>{title} | Curso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'rgba(250, 251, 252, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '12px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/curso" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '8px',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </Link>
          <span style={{ fontWeight: 600, fontSize: '16px', color: '#0f172a' }}>{title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {currentIdx >= 0 && (
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
              {currentIdx + 1}/{PRECURSO_PAGES.length}
            </span>
          )}
          <button
            onClick={() => { localStorage.removeItem('precurso-access'); window.location.href = '/curso' }}
            style={{
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#64748b',
              background: 'white',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}
          >
            Salir
          </button>
        </div>
      </header>

      {/* Body with sidebar + content */}
      <div className="m0-body" style={{
        display: 'flex',
        minHeight: 'calc(100vh - 57px)',
      }}>
        {/* Sidebar */}
        <aside className="m0-sidebar" style={{
          width: '260px',
          flexShrink: 0,
          borderRight: '1px solid rgba(0,0,0,0.06)',
          background: '#f8f9fa',
          position: 'sticky',
          top: '57px',
          height: 'calc(100vh - 57px)',
          overflowY: 'auto',
          padding: '16px 0',
        }}>
          {/* Module header */}
          <div style={{ padding: '0 16px 12px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 700,
                color: 'white',
              }}>
                0
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Módulo 0
                </p>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                  Preparación
                </h3>
              </div>
            </div>

            {completedCount > 0 && (
              <div>
                <div style={{
                  height: '4px',
                  background: 'rgba(0,0,0,0.06)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.round((completedCount / PRECURSO_PAGES.length) * 100)}%`,
                    background: completedCount === PRECURSO_PAGES.length ? '#22c55e' : '#5e6ad2',
                    borderRadius: '2px',
                    transition: 'width 0.3s ease',
                  }} />
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#94a3b8' }}>
                  {completedCount}/{PRECURSO_PAGES.length} completadas
                </p>
              </div>
            )}
          </div>

          {/* Lesson list */}
          <nav style={{ padding: '8px' }}>
            {PRECURSO_PAGES.map((page, i) => {
              const isCurrent = page.href === path
              const done = page.trackingId ? !!completed[page.trackingId] : false
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="m0-nav-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '13px',
                    lineHeight: 1.4,
                    color: isCurrent ? '#5e6ad2' : done ? '#94a3b8' : '#64748b',
                    fontWeight: isCurrent ? 600 : 400,
                    background: isCurrent ? 'rgba(94,106,210,0.06)' : 'transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    flexShrink: 0,
                    ...(done
                      ? { background: '#059669', color: '#fff' }
                      : isCurrent
                        ? { background: '#5e6ad2', color: '#fff' }
                        : { background: 'rgba(0,0,0,0.06)', color: '#94a3b8' }
                    ),
                  }}>
                    {done ? '✓' : isCurrent ? '→' : i + 1}
                  </span>
                  <span style={{
                    textDecoration: done && !isCurrent ? 'line-through' : 'none',
                    opacity: done && !isCurrent ? 0.6 : 1,
                  }}>
                    {page.title}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Back link */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: '8px' }}>
            <Link
              href="/curso"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 500,
                color: '#94a3b8',
                textDecoration: 'none',
              }}
            >
              ← Volver al curso
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="m0-main" style={{
          flex: 1,
          minWidth: 0,
          padding: '40px 48px 60px',
          maxWidth: '900px',
        }}>
          {children}

          {/* Prev / Next navigation */}
          {(prevPage || nextPage) && (
            <div style={{
              marginTop: '48px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              display: 'grid',
              gridTemplateColumns: prevPage && nextPage ? '1fr 1fr' : '1fr',
              gap: '12px',
            }}>
              {prevPage && (
                <Link href={prevPage.href} className="m0-nav-card" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  padding: '16px 20px',
                  background: '#f8f9fa',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s',
                }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>← Anterior</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{prevPage.title}</span>
                </Link>
              )}
              {nextPage && (
                <Link href={nextPage.href} className="m0-nav-card" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px',
                  padding: '16px 20px',
                  background: '#f8f9fa',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s',
                  gridColumn: !prevPage ? '1' : undefined,
                }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>Siguiente →</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{nextPage.title}</span>
                </Link>
              )}
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        .m0-nav-item:hover {
          background: rgba(0,0,0,0.03) !important;
        }
        .m0-nav-card:hover {
          border-color: rgba(0,0,0,0.12) !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
        }
        .m0-sidebar::-webkit-scrollbar {
          width: 4px;
        }
        .m0-sidebar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 2px;
        }
        @media (max-width: 768px) {
          .m0-sidebar { display: none !important; }
          .m0-main { padding: 24px 16px 40px !important; }
        }
      `}</style>
    </div>
  )
}

export default function Modulo0Layout({ title, children }: Modulo0LayoutProps) {
  return (
    <CursoEmailGate>
      <Modulo0LayoutInner title={title}>{children}</Modulo0LayoutInner>
    </CursoEmailGate>
  )
}
