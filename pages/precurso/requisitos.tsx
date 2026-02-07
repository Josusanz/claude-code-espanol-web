import Head from 'next/head'
import Link from 'next/link'
import PrecursoEmailGate from '../../components/PrecursoEmailGate'
import { usePrecursoProgress, useTheme, PRECURSO_SECTIONS } from './index'

const themes = {
  light: {
    bg: '#ffffff',
    bgSecondary: '#f8fafc',
    bgTertiary: '#f1f5f9',
    text: '#1e293b',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    border: '#e2e8f0',
    accent: '#6366f1',
    accentLight: '#eef2ff',
    success: '#22c55e',
    successLight: '#f0fdf4',
    warning: '#f59e0b',
    warningLight: '#fffbeb',
  },
  dark: {
    bg: '#0f172a',
    bgSecondary: '#1e293b',
    bgTertiary: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    border: '#334155',
    accent: '#818cf8',
    accentLight: 'rgba(129, 140, 248, 0.1)',
    success: '#4ade80',
    successLight: 'rgba(74, 222, 128, 0.1)',
    warning: '#fbbf24',
    warningLight: 'rgba(251, 191, 36, 0.1)',
  }
}

const REQUISITOS = [
  {
    id: 'requisitos-vscode',
    title: 'VS Code',
    description: 'El editor donde verás los archivos que Claude Code crea.',
    icon: '💻',
    color: '#007ACC',
    steps: [
      { text: 'Descarga VS Code', url: 'https://code.visualstudio.com/download' },
      { text: 'Instálalo (siguiente, siguiente, finalizar)' },
      { text: 'Ábrelo para verificar que funciona' }
    ],
    verify: 'Abre VS Code y verás una pantalla de bienvenida.'
  },
  {
    id: 'requisitos-nodejs',
    title: 'Node.js',
    description: 'El motor que ejecuta JavaScript. Claude Code lo necesita.',
    icon: '⬢',
    color: '#339933',
    steps: [
      { text: 'Descarga Node.js LTS', url: 'https://nodejs.org/' },
      { text: 'Instálalo con las opciones por defecto' },
      { text: 'Abre la terminal y escribe: node --version' }
    ],
    verify: 'Deberías ver algo como v20.x.x o v22.x.x'
  },
  {
    id: 'requisitos-github',
    title: 'Cuenta de GitHub',
    description: 'Donde guardarás tu código en la nube.',
    icon: '🐙',
    color: '#6e5494',
    steps: [
      { text: 'Crea tu cuenta', url: 'https://github.com/signup' },
      { text: 'Verifica tu email' },
      { text: 'Inicia sesión para confirmar' }
    ],
    verify: 'Puedes acceder a github.com con tu cuenta.'
  },
  {
    id: 'requisitos-vercel',
    title: 'Cuenta de Vercel',
    description: 'Donde publicarás tus apps.',
    icon: '▲',
    color: '#000000',
    steps: [
      { text: 'Regístrate con GitHub', url: 'https://vercel.com/signup' },
      { text: 'Autoriza la conexión' },
      { text: 'Completa el registro' }
    ],
    verify: 'Puedes acceder al dashboard de Vercel.'
  },
  {
    id: 'requisitos-claude',
    title: 'Claude Code',
    description: 'La herramienta de IA que usarás.',
    icon: '🤖',
    color: '#D97706',
    steps: [
      { text: 'Abre la terminal' },
      { text: 'Ejecuta: npm install -g @anthropic-ai/claude-code' },
      { text: 'Ejecuta: claude' },
      { text: 'Sigue las instrucciones para conectar tu cuenta' }
    ],
    verify: 'Al escribir "claude" en la terminal, se abre Claude Code.'
  }
]

function RequisitosContent() {
  const { completed, toggle, progress } = usePrecursoProgress()
  const { theme, toggleTheme } = useTheme()
  const t = themes[theme]

  const isCompleted = completed['requisitos-completo']

  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: t.text,
      transition: 'background 0.2s, color 0.2s'
    }}>
      <Head>
        <title>Requisitos | Precurso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: t.bg,
        borderBottom: `1px solid ${t.border}`,
        padding: '16px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/precurso" style={{
            color: t.textMuted,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '8px',
            marginRight: '4px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </Link>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '14px'
          }}>P</div>
          <span style={{ fontWeight: 600, fontSize: '17px' }}>Requisitos</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            padding: '8px 16px',
            background: progress === 100 ? t.successLight : t.bgSecondary,
            borderRadius: '100px',
            fontSize: '14px',
            fontWeight: 500,
            color: progress === 100 ? t.success : t.textSecondary
          }}>
            {Math.round(progress)}%
          </div>
          <button
            onClick={toggleTheme}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: `1px solid ${t.border}`,
              background: t.bgSecondary,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 73px)' }}>
        {/* Sidebar */}
        <aside style={{
          width: '260px',
          background: t.bgSecondary,
          borderRight: `1px solid ${t.border}`,
          padding: '24px 0',
          position: 'sticky',
          top: '73px',
          height: 'calc(100vh - 73px)',
          overflowY: 'auto',
          flexShrink: 0
        }} className="sidebar-desktop">
          <nav>
            {/* Inicio */}
            <Link href="/precurso" style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px',
              color: t.textSecondary, textDecoration: 'none', fontSize: '14px', fontWeight: 600,
              borderLeft: '3px solid transparent'
            }}>
              <span>🏠</span> Inicio
            </Link>

            {/* Glosario section */}
            <div style={{ marginTop: '16px' }}>
              <Link href="/precurso/glosario" style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 20px',
                color: t.text, textDecoration: 'none', fontSize: '13px', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.3px'
              }}>
                <span>📚</span> Glosario
              </Link>
            </div>

            {/* Requisitos section - ACTIVE */}
            <div style={{ marginTop: '16px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 20px',
                color: t.accent, fontSize: '13px', fontWeight: 600, textTransform: 'uppercase',
                letterSpacing: '0.3px', background: t.accentLight, borderLeft: `3px solid ${t.accent}`, marginLeft: '-1px'
              }}>
                <span>🛠️</span> Requisitos
              </div>
              <a href="#requisitos-vscode" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px'
              }}>1. VS Code</a>
              <a href="#requisitos-nodejs" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px'
              }}>2. Node.js</a>
              <a href="#requisitos-github" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px'
              }}>3. GitHub</a>
              <a href="#requisitos-vercel" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px'
              }}>4. Vercel</a>
              <a href="#requisitos-claude" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: t.textSecondary,
                textDecoration: 'none', fontSize: '13px'
              }}>5. Claude Code</a>
            </div>
          </nav>

          {/* Help */}
          <div style={{
            margin: '24px 16px 0',
            padding: '16px',
            background: t.warningLight,
            borderRadius: '12px',
            border: `1px solid ${t.warning}30`
          }}>
            <p style={{ margin: 0, fontSize: '13px', color: t.warning }}>
              ¿Problemas? Escríbeme a{' '}
              <a href="mailto:josu@yenze.io" style={{ color: t.warning, fontWeight: 500 }}>
                josu@yenze.io
              </a>
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: '40px 56px', maxWidth: '900px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px', color: t.text }}>
              Requisitos técnicos 🛠️
            </h1>
            <p style={{ fontSize: '16px', color: t.textSecondary, lineHeight: 1.7 }}>
              Instala estas herramientas antes de la primera clase. Marca cada paso cuando lo completes.
            </p>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {REQUISITOS.map((req, index) => (
              <div key={req.id} id={req.id} style={{
                background: t.bgSecondary,
                borderRadius: '16px',
                border: `1px solid ${t.border}`,
                overflow: 'hidden'
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px 24px',
                  background: t.bgTertiary,
                  borderBottom: `1px solid ${t.border}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: t.bg,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      color: t.text,
                      fontWeight: 600,
                      border: `1px solid ${t.border}`
                    }}>
                      {req.icon}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: t.textMuted,
                          background: t.bg,
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          Paso {index + 1}
                        </span>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, color: t.text, margin: 0 }}>
                          {req.title}
                        </h3>
                      </div>
                      <p style={{ fontSize: '14px', color: t.textSecondary, margin: '4px 0 0' }}>
                        {req.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px' }}>
                  <ol style={{
                    margin: '0 0 16px',
                    padding: '0 0 0 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {req.steps.map((step, i) => (
                      <li key={i} style={{ fontSize: '15px', color: t.textSecondary }}>
                        {step.url ? (
                          <a href={step.url} target="_blank" rel="noopener noreferrer" style={{
                            color: t.accent,
                            textDecoration: 'none',
                            fontWeight: 500
                          }}>
                            {step.text} ↗
                          </a>
                        ) : (
                          <span>{step.text}</span>
                        )}
                      </li>
                    ))}
                  </ol>

                  <div style={{
                    padding: '14px 18px',
                    background: t.bgTertiary,
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: t.textMuted,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '16px' }}>✅</span>
                    <span><strong style={{ color: t.text }}>Verificar:</strong> {req.verify}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Completion button at the end */}
          <div style={{
            marginTop: '40px',
            padding: '32px',
            background: isCompleted ? t.successLight : t.bgSecondary,
            borderRadius: '16px',
            border: `1px solid ${isCompleted ? t.success : t.border}`,
            textAlign: 'center'
          }}>
            {isCompleted ? (
              <>
                <span style={{ fontSize: '48px' }}>🎉</span>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: t.success, margin: '12px 0 8px' }}>
                  ¡Todo listo!
                </h3>
                <p style={{ fontSize: '15px', color: t.textSecondary, margin: '0 0 20px' }}>
                  Tienes todo lo necesario para la primera clase.
                </p>
                <button
                  onClick={() => toggle('requisitos-completo')}
                  style={{
                    padding: '12px 24px',
                    background: t.bg,
                    border: `1px solid ${t.border}`,
                    borderRadius: '10px',
                    color: t.textSecondary,
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  Desmarcar
                </button>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: t.text, margin: '0 0 8px' }}>
                  ¿Has instalado todo?
                </h3>
                <p style={{ fontSize: '14px', color: t.textSecondary, margin: '0 0 20px' }}>
                  Marca como completado cuando tengas todas las herramientas listas.
                </p>
                <button
                  onClick={() => toggle('requisitos-completo')}
                  style={{
                    padding: '16px 32px',
                    background: `linear-gradient(135deg, ${t.success}, #16a34a)`,
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(34, 197, 94, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  ✓ Todo instalado, siguiente paso
                </button>
              </>
            )}
          </div>

          {/* Navigation */}
          <div style={{
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: `1px solid ${t.border}`,
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Link href="/precurso/glosario" style={{
              padding: '14px 24px',
              background: t.bgSecondary,
              border: `1px solid ${t.border}`,
              borderRadius: '10px',
              color: t.textSecondary,
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Glosario
            </Link>
            <Link href="/precurso" style={{
              padding: '14px 24px',
              background: progress === 100 ? `linear-gradient(135deg, ${t.success}, #16a34a)` : `linear-gradient(135deg, ${t.accent}, #8b5cf6)`,
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {progress === 100 ? '¡Completado!' : 'Volver al inicio'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
        }
      `}</style>
    </div>
  )
}

export default function RequisitosPage() {
  return (
    <PrecursoEmailGate>
      <RequisitosContent />
    </PrecursoEmailGate>
  )
}
