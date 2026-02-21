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
          maxWidth: '900px',
          margin: '0 auto',
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
            <span>Volver al curso</span>
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

      {/* Main content — full width, centered */}
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px 24px 60px',
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

      <style jsx global>{`
        ${THEME_GLOBAL_CSS}

        /* Reset Nextra wrappers when inside CursoGratisLayout */
        .curso-gratis-content article {
          padding: 0 !important;
          margin: 0 !important;
          max-width: none !important;
        }
        .curso-gratis-content > article > main {
          padding: 0 !important;
          margin: 0 !important;
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
        .curso-gratis-content a {
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

        /* Nextra Callout styling in custom theme */
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

        /* Mobile */
        @media (max-width: 768px) {
          .curso-gratis-content h1 { font-size: 24px !important; }
          .curso-gratis-content h2 { font-size: 19px !important; }
        }
      `}</style>
    </div>
  )
}
