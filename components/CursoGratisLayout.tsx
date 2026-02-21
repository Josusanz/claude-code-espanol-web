import { useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTheme, ThemeToggleButton, THEME_GLOBAL_CSS } from '../lib/theme-utils'
import { MODULOS_GRATIS } from '../lib/curso-gratis-data'

const PROGRESS_KEY = 'curso-gratis-progress'

function getLessonKey(moduleId: string, href: string): string {
  return `${moduleId}:${href}`
}

export default function CursoGratisLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { isDark, toggleTheme, t, mounted } = useTheme()
  const [progress, setProgress] = useState<Record<string, boolean>>({})

  const path = router.asPath.split(/[?#]/)[0]

  // Find current module and lesson
  const modulo = MODULOS_GRATIS.find(
    m => m.href !== '/curso-crea-tu-software/modulo/0' && (path.startsWith(m.href + '/') || path === m.href)
  )
  const leccionIdx = modulo ? modulo.lecciones.findIndex(l => l.href === path) : -1
  const leccion = modulo && leccionIdx >= 0 ? modulo.lecciones[leccionIdx] : null
  const prevLeccion = modulo && leccionIdx > 0 ? modulo.lecciones[leccionIdx - 1] : null
  const nextLeccion = modulo && leccionIdx >= 0 && leccionIdx < modulo.lecciones.length - 1
    ? modulo.lecciones[leccionIdx + 1]
    : null
  const lessonKey = modulo && leccion ? getLessonKey(modulo.id, leccion.href) : null

  // Is this an index page? (module overview, not a sub-lesson)
  const isIndex = modulo ? path === modulo.href || path === modulo.href + '/' : false
  // modo-facil index IS a lesson; other indexes are overviews
  const showProgress = modulo
    ? (!isIndex || modulo.id === 'modo-facil') && !!lessonKey
    : false

  const isCompleted = lessonKey ? !!progress[lessonKey] : false

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY)
      if (saved) setProgress(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [])

  const handleToggleProgress = () => {
    if (!lessonKey) return
    try {
      const saved = localStorage.getItem(PROGRESS_KEY)
      const current = saved ? JSON.parse(saved) : {}
      if (isCompleted) {
        delete current[lessonKey]
      } else {
        current[lessonKey] = true
      }
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(current))
      setProgress(current)
    } catch { /* ignore */ }
  }

  if (!mounted) return null

  const completedCount = modulo
    ? modulo.lecciones.filter(l => progress[getLessonKey(modulo.id, l.href)]).length
    : 0

  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: t.text,
      transition: 'background 0.3s, color 0.3s',
    }}>
      {/* Sticky header */}
      <header style={{
        background: t.navBg,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${t.border}`,
        padding: '12px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 200,
        transition: 'all 0.3s',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link
            href="/curso-gratis"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: t.textSecondary,
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
          >
            <span style={{ fontSize: '16px' }}>←</span>
            <span className="cgl-back-text">Volver al curso</span>
          </Link>

          {/* Breadcrumb center */}
          {modulo && leccion && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: t.textTertiary,
            }}>
              <span>{modulo.emoji}</span>
              <span style={{ color: t.textSecondary, fontWeight: 500 }}>
                {leccionIdx + 1}/{modulo.totalLecciones}
              </span>
            </div>
          )}

          <ThemeToggleButton isDark={isDark} toggleTheme={toggleTheme} />
        </div>
      </header>

      {/* Body with sidebar + content */}
      <div style={{
        display: 'flex',
        minHeight: 'calc(100vh - 57px)',
      }}>
        {/* Left sidebar */}
        {modulo && (
          <aside className="cgl-sidebar" style={{
            width: '260px',
            flexShrink: 0,
            borderRight: `1px solid ${t.border}`,
            background: t.bgSecondary,
            position: 'sticky',
            top: '57px',
            height: 'calc(100vh - 57px)',
            overflowY: 'auto',
            padding: '16px 0',
            transition: 'background 0.3s',
          }}>
            {/* Module header */}
            <div style={{ padding: '0 16px 12px', borderBottom: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{
                  width: '32px',
                  height: '32px',
                  background: `linear-gradient(135deg, ${t.accent}, ${t.accentHover})`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  flexShrink: 0,
                }}>
                  {modulo.emoji}
                </span>
                <div>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Módulo {modulo.num}
                  </p>
                  <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: t.text }}>
                    {modulo.titulo}
                  </h3>
                </div>
              </div>

              {completedCount > 0 && (
                <div>
                  <div style={{
                    height: '4px',
                    background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.round((completedCount / modulo.totalLecciones) * 100)}%`,
                      background: completedCount === modulo.totalLecciones ? '#22c55e' : t.accent,
                      borderRadius: '2px',
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: '11px', color: t.textTertiary }}>
                    {completedCount}/{modulo.totalLecciones} completadas
                  </p>
                </div>
              )}
            </div>

            {/* Lesson list */}
            <nav style={{ padding: '8px' }}>
              {modulo.lecciones.map((l, i) => {
                const key = getLessonKey(modulo.id, l.href)
                const done = !!progress[key]
                const isCurrent = l.href === path
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="cgl-nav-item"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '13px',
                      lineHeight: 1.4,
                      color: isCurrent ? t.accent : done ? t.textTertiary : t.textSecondary,
                      fontWeight: isCurrent ? 600 : 400,
                      background: isCurrent
                        ? isDark ? 'rgba(94,106,210,0.12)' : 'rgba(94,106,210,0.06)'
                        : 'transparent',
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
                          ? { background: t.accent, color: '#fff' }
                          : { background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', color: t.textTertiary }
                      ),
                    }}>
                      {done ? '✓' : isCurrent ? '→' : i + 1}
                    </span>
                    <span style={{
                      textDecoration: done && !isCurrent ? 'line-through' : 'none',
                      opacity: done && !isCurrent ? 0.6 : 1,
                    }}>
                      {l.titulo}
                    </span>
                  </Link>
                )
              })}
            </nav>

            {/* Back link */}
            <div style={{ padding: '12px 16px', borderTop: `1px solid ${t.border}`, marginTop: '8px' }}>
              <Link
                href="/curso-gratis"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: t.textTertiary,
                  textDecoration: 'none',
                }}
              >
                ← Todos los módulos
              </Link>
            </div>
          </aside>
        )}

        {/* Main content — fills remaining width */}
        <main className="cgl-main" style={{
          flex: 1,
          minWidth: 0,
          padding: '40px 48px 60px',
        }}>
          {/* MDX content */}
          <div className="curso-gratis-content">
            {children}
          </div>

          {/* Mark as completed button */}
          {showProgress && (
            <div style={{
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: `1px solid ${t.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <button
                onClick={handleToggleProgress}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: isCompleted ? '#fff' : '#059669',
                  background: isCompleted
                    ? 'linear-gradient(135deg, #059669, #047857)'
                    : 'transparent',
                  border: `2px solid ${isCompleted ? '#059669' : isDark ? 'rgba(5,150,105,0.3)' : '#d1fae5'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: isCompleted ? '0 2px 8px rgba(5,150,105,0.3)' : 'none',
                }}
              >
                <span style={{ fontSize: '18px' }}>{isCompleted ? '✓' : '○'}</span>
                {isCompleted ? 'Completada' : 'Marcar como completada'}
              </button>
            </div>
          )}

          {/* Prev / Next navigation */}
          {modulo && (prevLeccion || nextLeccion) && (
            <div style={{
              marginTop: '32px',
              display: 'grid',
              gridTemplateColumns: prevLeccion && nextLeccion ? '1fr 1fr' : '1fr',
              gap: '12px',
            }}>
              {prevLeccion && (
                <Link
                  href={prevLeccion.href}
                  className="cgl-nav-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    padding: '16px 20px',
                    background: t.bgSecondary,
                    border: `1px solid ${t.border}`,
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: '12px', color: t.textTertiary, fontWeight: 500 }}>
                    ← Anterior
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: t.text }}>
                    {prevLeccion.titulo}
                  </span>
                </Link>
              )}
              {nextLeccion && (
                <Link
                  href={nextLeccion.href}
                  className="cgl-nav-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px',
                    padding: '16px 20px',
                    background: t.bgSecondary,
                    border: `1px solid ${t.border}`,
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s',
                    gridColumn: !prevLeccion ? '1' : undefined,
                  }}
                >
                  <span style={{ fontSize: '12px', color: t.textTertiary, fontWeight: 500 }}>
                    Siguiente →
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: t.text }}>
                    {nextLeccion.titulo}
                  </span>
                </Link>
              )}
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        ${THEME_GLOBAL_CSS}

        /* Reset Nextra wrappers when inside CursoGratisLayout */
        .curso-gratis-content,
        .curso-gratis-content article,
        .curso-gratis-content main,
        .curso-gratis-content > div,
        .curso-gratis-content > article > main {
          padding: 0 !important;
          margin: 0 !important;
          max-width: none !important;
          width: 100% !important;
        }

        /* Typography in custom theme */
        .curso-gratis-content h1 {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 0;
          margin-bottom: 24px;
          line-height: 1.2;
          color: ${t.text};
        }
        .curso-gratis-content h2 {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-top: 40px;
          margin-bottom: 16px;
          color: ${t.text};
        }
        .curso-gratis-content h3 {
          font-size: 18px;
          font-weight: 600;
          margin-top: 32px;
          margin-bottom: 12px;
          color: ${t.text};
        }
        .curso-gratis-content p {
          color: ${t.textSecondary};
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .curso-gratis-content a:not([class*="bg-"]) {
          color: ${t.accent};
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .curso-gratis-content strong {
          color: ${t.text};
          font-weight: 600;
        }
        .curso-gratis-content ul, .curso-gratis-content ol {
          color: ${t.textSecondary};
          line-height: 1.7;
          margin-bottom: 16px;
          padding-left: 24px;
        }
        .curso-gratis-content li {
          margin-bottom: 4px;
        }
        .curso-gratis-content hr {
          border: none;
          border-top: 1px solid ${t.border};
          margin: 32px 0;
        }
        .curso-gratis-content blockquote {
          border-left: 3px solid ${t.accent};
          padding-left: 16px;
          margin: 16px 0;
          color: ${t.textSecondary};
          font-style: italic;
        }

        /* Code blocks */
        .curso-gratis-content pre {
          background: ${isDark ? '#161718' : '#f6f8fa'} !important;
          border: 1px solid ${t.border};
          border-radius: 10px;
          padding: 16px !important;
          margin: 16px 0 !important;
          overflow-x: auto;
          font-size: 14px;
        }
        .curso-gratis-content code {
          font-size: 0.9em;
        }
        .curso-gratis-content :not(pre) > code {
          background: ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'};
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.875em;
          color: ${t.text};
        }

        /* Tables */
        .curso-gratis-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
          font-size: 14px;
        }
        .curso-gratis-content th {
          background: ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'};
          font-weight: 600;
          color: ${t.text};
          text-align: left;
          padding: 10px 14px;
          border-bottom: 2px solid ${t.border};
        }
        .curso-gratis-content td {
          padding: 10px 14px;
          border-bottom: 1px solid ${t.border};
          color: ${t.textSecondary};
        }

        /* Nextra Callout styling */
        .curso-gratis-content .nextra-callout,
        .curso-gratis-content [class*="callout"] {
          border-radius: 10px !important;
          border: 1px solid ${t.border} !important;
        }

        /* Nextra Steps, Tabs */
        .curso-gratis-content .nextra-steps {
          border-left-color: ${t.accent} !important;
        }

        /* Images */
        .curso-gratis-content img {
          border-radius: 10px;
          max-width: 100%;
          height: auto;
        }

        /* FileTree styling */
        .curso-gratis-content .nextra-filetree {
          border-radius: 10px;
          border-color: ${t.border};
        }

        /* Sidebar hover */
        .cgl-nav-item:hover {
          background: ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'} !important;
        }
        .cgl-nav-card:hover {
          border-color: ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'} !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
        }

        /* Scrollbar */
        .cgl-sidebar::-webkit-scrollbar {
          width: 4px;
        }
        .cgl-sidebar::-webkit-scrollbar-thumb {
          background: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          border-radius: 2px;
        }

        /* Mobile: hide sidebar */
        @media (max-width: 768px) {
          .cgl-sidebar { display: none !important; }
          .cgl-main { padding: 24px 16px 40px !important; }
          .curso-gratis-content h1 { font-size: 24px !important; }
          .curso-gratis-content h2 { font-size: 19px !important; }
        }
      `}</style>
    </div>
  )
}
