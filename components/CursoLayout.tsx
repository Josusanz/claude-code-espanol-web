import { ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import CursoEmailGate from './CursoEmailGate'
import { getLevel } from '../lib/curso-puntos'

type NavItem = 'dashboard' | 'curso' | 'dudas' | 'proyectos' | 'rueda' | 'ranking'

interface CursoLayoutProps {
  children: ReactNode
  activeNav?: NavItem
}

const NAV_ITEMS: { id: NavItem; label: string; href: string; emoji: string }[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/curso', emoji: '📊' },
  { id: 'curso', label: 'Curso', href: '/curso/contenido', emoji: '📚' },
  { id: 'dudas', label: 'Dudas', href: '/curso/dudas', emoji: '❓' },
  { id: 'proyectos', label: 'Proyectos', href: '/curso/proyectos', emoji: '🏗️' },
  { id: 'rueda', label: 'Rueda del Creador', href: '/curso/rueda', emoji: '🎯' },
  { id: 'ranking', label: 'Ranking', href: '/curso/ranking', emoji: '🏆' },
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

function CursoLayoutInner({ children, activeNav }: CursoLayoutProps) {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')
  const [puntos, setPuntos] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Detect activeNav from current path if not provided
  const currentPath = router.asPath.split(/[?#]/)[0]
  const detectedNav = activeNav || NAV_ITEMS.find(n => {
    if (n.href === '/curso') return currentPath === '/curso'
    return currentPath.startsWith(n.href)
  })?.id || 'dashboard'

  useEffect(() => {
    const email = getUserEmail()
    if (email) {
      setUserEmail(email)
      // Load points
      fetch(`/api/curso/puntos?email=${encodeURIComponent(email)}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data?.total != null) setPuntos(data.total) })
        .catch(() => {})
    }
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [currentPath])

  const nivel = getLevel(puntos)

  const handleLogout = () => {
    localStorage.removeItem('precurso-access')
    localStorage.removeItem('curso-progress')
    window.location.href = '/'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafbfc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#1e293b',
    }}>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Mobile header */}
      <header className="curso-mobile-header" style={{
        display: 'none',
        background: 'rgba(250, 251, 252, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 200,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2">
            {mobileMenuOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            ) : (
              <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            )}
          </svg>
        </button>
        <span style={{ fontWeight: 600, fontSize: '15px', color: '#0f172a' }}>Curso</span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
          borderRadius: '100px',
          fontSize: '12px',
          fontWeight: 600,
          color: '#5e6ad2',
        }}>
          {nivel.emoji} {puntos}
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="curso-mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 250,
          }}
        />
      )}

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <aside
          className={`curso-sidebar ${mobileMenuOpen ? 'curso-sidebar-open' : ''}`}
          style={{
            width: '260px',
            flexShrink: 0,
            borderRight: '1px solid rgba(0,0,0,0.06)',
            background: '#f8f9fa',
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Logo area */}
          <div style={{
            padding: '20px 20px 16px',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}>
            <Link href="/curso" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                color: 'white',
                flexShrink: 0,
              }}>AS</div>
              <div>
                <h1 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>
                  Crea tu Software
                </h1>
                <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>
                  con IA · 1a Promoción
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav style={{ padding: '12px 8px', flex: 1 }}>
            {NAV_ITEMS.map(item => {
              const isActive = detectedNav === item.id
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="curso-nav-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#5e6ad2' : '#475569',
                    background: isActive ? 'rgba(94,106,210,0.08)' : 'transparent',
                    transition: 'all 0.15s',
                    marginBottom: '2px',
                  }}
                >
                  <span style={{ fontSize: '16px', width: '24px', textAlign: 'center' }}>{item.emoji}</span>
                  {item.label}
                </Link>
              )
            })}

            {/* Discord external link */}
            <a
              href="https://discord.gg/RFU7P2vpqa"
              target="_blank"
              rel="noopener noreferrer"
              className="curso-nav-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 400,
                color: '#475569',
                background: 'transparent',
                transition: 'all 0.15s',
                marginBottom: '2px',
              }}
            >
              <span style={{ fontSize: '16px', width: '24px', textAlign: 'center' }}>💬</span>
              Discord
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ marginLeft: 'auto' }}>
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </nav>

          {/* Points badge */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}>
            <Link href="/curso/ranking" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: 'linear-gradient(135deg, #eef2ff, #e8e0ff)',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}>
              <span style={{ fontSize: '24px' }}>{nivel.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#5e6ad2' }}>
                  {puntos} puntos
                </div>
                <div style={{ fontSize: '11px', color: '#8b8fa3' }}>
                  Nivel {nivel.nivel}: {nivel.nombre}
                </div>
              </div>
              {nivel.puntosNext && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: `conic-gradient(#5e6ad2 ${((puntos - nivel.puntosMin) / (nivel.puntosNext - nivel.puntosMin)) * 360}deg, rgba(0,0,0,0.06) 0deg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#eef2ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#5e6ad2',
                  }}>
                    {nivel.nivel}
                  </div>
                </div>
              )}
            </Link>
          </div>

          {/* User info */}
          <div style={{
            padding: '12px 16px 16px',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 600,
              color: '#64748b',
              flexShrink: 0,
            }}>
              {userEmail ? userEmail[0].toUpperCase() : '?'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                margin: 0,
                fontSize: '13px',
                fontWeight: 500,
                color: '#374151',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {userEmail || 'Alumno'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                color: '#94a3b8',
                borderRadius: '6px',
                transition: 'color 0.15s',
              }}
              title="Salir"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="curso-main" style={{
          flex: 1,
          minWidth: 0,
          minHeight: '100vh',
        }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        .curso-nav-item:hover {
          background: rgba(0,0,0,0.04) !important;
        }
        .curso-sidebar::-webkit-scrollbar {
          width: 4px;
        }
        .curso-sidebar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 2px;
        }
        @media (max-width: 768px) {
          .curso-mobile-header { display: flex !important; }
          .curso-sidebar {
            position: fixed !important;
            top: 0;
            left: -280px;
            z-index: 300;
            height: 100vh !important;
            transition: left 0.25s ease;
            box-shadow: none;
          }
          .curso-sidebar-open {
            left: 0 !important;
            box-shadow: 4px 0 24px rgba(0,0,0,0.12) !important;
          }
          .curso-main {
            min-height: calc(100vh - 57px) !important;
          }
        }
      `}</style>
    </div>
  )
}

export default function CursoLayout({ children, activeNav }: CursoLayoutProps) {
  return (
    <CursoEmailGate>
      <CursoLayoutInner activeNav={activeNav}>{children}</CursoLayoutInner>
    </CursoEmailGate>
  )
}
