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

// SVG Logos
const VSCodeLogo = () => (
  <svg viewBox="0 0 100 100" width="32" height="32">
    <path fill="#007ACC" d="M74.9 17.2L53.4 0l-27 21.4L15.6 13l-9 8.3v57.4l9 8.3 10.8-8.4 27 21.4 21.5-17.2V17.2zM50 69.2L26.4 50 50 30.8V69.2zM60.6 80l-6.4-5V25l6.4-5 13.8 11v38l-13.8 11z"/>
  </svg>
)

const NodeLogo = () => (
  <svg viewBox="0 0 256 289" width="32" height="32">
    <path fill="#539E43" d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.155.795-.53 1.855-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.075c0-1.325-.53-2.385-1.59-2.915l-105.74-60.952c-1.06-.53-2.385-.53-3.18 0L20.705 80.16c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.635 7.95 25.44-1.325 25.44-10.6V93.41c0-1.59 1.325-3.18 3.18-3.18h13.51c1.59 0 3.18 1.325 3.18 3.18v120.58c0 20.936-11.395 33.126-31.27 33.126-6.095 0-10.865 0-24.38-6.625l-27.827-15.9C4.24 220.086 0 212.14 0 203.66V81.49c0-8.48 4.24-16.43 11.13-20.67L116.87 0c6.625-3.71 15.635-3.71 22.26 0l105.74 60.82c6.89 3.975 11.13 12.19 11.13 20.67v122.17c0 8.48-4.24 16.43-11.13 20.67l-105.74 61.22c-3.445 1.59-7.42 2.915-11.13 2.915z"/>
  </svg>
)

const GitHubLogo = ({ color = '#24292f' }: { color?: string }) => (
  <svg viewBox="0 0 98 96" width="32" height="32">
    <path fill={color} d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
  </svg>
)

const VercelLogo = ({ color = '#000' }: { color?: string }) => (
  <svg viewBox="0 0 76 65" width="32" height="32">
    <path fill={color} d="M37.5274 0L75.0548 65H0L37.5274 0Z"/>
  </svg>
)

const ClaudeLogo = () => (
  <svg viewBox="0 0 24 24" width="32" height="32">
    <path fill="#D97706" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
)

// Componente especial para la sección de Terminal
const TerminalSection = ({ t, theme }: { t: typeof themes.light, theme: 'light' | 'dark' }) => (
  <div style={{
    background: t.bgSecondary,
    borderRadius: '16px',
    border: `1px solid ${t.border}`,
    overflow: 'hidden',
    marginBottom: '20px'
  }}>
    <div style={{
      padding: '20px 24px',
      background: t.bgTertiary,
      borderBottom: `1px solid ${t.border}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '52px',
          height: '52px',
          background: '#1e1e1e',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          ⬛
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#f59e0b',
              background: '#fffbeb',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              IMPORTANTE
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: t.text, margin: 0 }}>
              Cómo abrir la Terminal
            </h3>
          </div>
          <p style={{ fontSize: '14px', color: t.textSecondary, margin: '4px 0 0' }}>
            Necesitas saber esto antes de instalar Node.js y Claude Code
          </p>
        </div>
      </div>
    </div>

    <div style={{ padding: '24px' }}>
      <p style={{ fontSize: '15px', color: t.textSecondary, marginBottom: '20px', lineHeight: 1.7 }}>
        La terminal es donde escribirás comandos. Parece intimidante pero es muy fácil.
        Solo tienes que abrirla y copiar/pegar lo que te diga.
      </p>

      {/* macOS */}
      <div style={{
        background: t.bgTertiary,
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '20px' }}>🍎</span>
          <h4 style={{ fontSize: '16px', fontWeight: 600, color: t.text, margin: 0 }}>macOS</h4>
        </div>
        <ol style={{ margin: 0, padding: '0 0 0 20px', color: t.textSecondary, lineHeight: 2 }}>
          <li>Pulsa <strong style={{ color: t.text }}>Cmd + Espacio</strong> (abre Spotlight)</li>
          <li>Escribe <strong style={{ color: t.text }}>"Terminal"</strong></li>
          <li>Pulsa Enter</li>
        </ol>
        <div style={{
          marginTop: '12px',
          padding: '12px',
          background: t.bg,
          borderRadius: '8px',
          fontSize: '13px',
          color: t.textMuted
        }}>
          💡 También la encuentras en: Aplicaciones → Utilidades → Terminal
        </div>
      </div>

      {/* Windows */}
      <div style={{
        background: t.bgTertiary,
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '20px' }}>🪟</span>
          <h4 style={{ fontSize: '16px', fontWeight: 600, color: t.text, margin: 0 }}>Windows</h4>
        </div>
        <ol style={{ margin: 0, padding: '0 0 0 20px', color: t.textSecondary, lineHeight: 2 }}>
          <li>Pulsa <strong style={{ color: t.text }}>Windows + R</strong></li>
          <li>Escribe <strong style={{ color: t.text }}>"cmd"</strong> o <strong style={{ color: t.text }}>"powershell"</strong></li>
          <li>Pulsa Enter</li>
        </ol>
        <div style={{
          marginTop: '12px',
          padding: '12px',
          background: t.bg,
          borderRadius: '8px',
          fontSize: '13px',
          color: t.textMuted
        }}>
          💡 Alternativa: Click derecho en el menú inicio → "Terminal" o "PowerShell"
        </div>
      </div>

      {/* Linux */}
      <div style={{
        background: t.bgTertiary,
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '20px' }}>🐧</span>
          <h4 style={{ fontSize: '16px', fontWeight: 600, color: t.text, margin: 0 }}>Linux</h4>
        </div>
        <ol style={{ margin: 0, padding: '0 0 0 20px', color: t.textSecondary, lineHeight: 2 }}>
          <li>Pulsa <strong style={{ color: t.text }}>Ctrl + Alt + T</strong></li>
          <li>¡Listo! (funciona en Ubuntu, Debian, y la mayoría de distros)</li>
        </ol>
      </div>

      {/* Video tutorial */}
      <div style={{
        marginTop: '20px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${t.border}`
      }}>
        <div style={{
          background: theme === 'dark' ? '#1a1a2e' : '#f1f5f9',
          padding: '12px 16px',
          borderBottom: `1px solid ${t.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>🎬</span>
          <span style={{ fontSize: '14px', fontWeight: 500, color: t.text }}>
            Video tutorial: Cómo verificar la instalación
          </span>
        </div>
        <video
          controls
          style={{
            width: '100%',
            display: 'block',
            background: '#1a1a2e'
          }}
          poster="/images/precurso/terminal.png"
        >
          <source src="/videos/terminal-tutorial.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div style={{
          padding: '12px 16px',
          background: t.bg,
          fontSize: '13px',
          color: t.textMuted
        }}>
          🔊 Este video incluye narración en español
        </div>
      </div>
    </div>
  </div>
)

const REQUISITOS = [
  {
    id: 'req-vscode',
    anchorId: 'requisitos-vscode',
    title: 'VS Code',
    description: 'El editor donde verás los archivos que Claude Code crea.',
    Logo: VSCodeLogo,
    color: '#007ACC',
    steps: [
      { text: 'Descarga VS Code', url: 'https://code.visualstudio.com/download' },
      { text: 'Instálalo (siguiente, siguiente, finalizar)' },
      { text: 'Ábrelo para verificar que funciona' }
    ],
    verify: 'Abre VS Code y verás una pantalla de bienvenida.'
  },
  {
    id: 'req-nodejs',
    anchorId: 'requisitos-nodejs',
    title: 'Node.js',
    description: 'El motor que ejecuta JavaScript. Claude Code lo necesita.',
    Logo: NodeLogo,
    color: '#539E43',
    steps: [
      { text: 'Descarga Node.js LTS', url: 'https://nodejs.org/' },
      { text: 'Instálalo con las opciones por defecto' },
      { text: 'Abre la terminal (ver instrucciones arriba)' },
      { text: 'Escribe: node --version y pulsa Enter' }
    ],
    verify: 'Deberías ver algo como v20.x.x o v22.x.x'
  },
  {
    id: 'req-github',
    anchorId: 'requisitos-github',
    title: 'Cuenta de GitHub',
    description: 'Donde guardarás tu código en la nube.',
    Logo: GitHubLogo,
    color: '#24292f',
    steps: [
      { text: 'Crea tu cuenta', url: 'https://github.com/signup' },
      { text: 'Verifica tu email' },
      { text: 'Inicia sesión para confirmar' }
    ],
    verify: 'Puedes acceder a github.com con tu cuenta.'
  },
  {
    id: 'req-vercel',
    anchorId: 'requisitos-vercel',
    title: 'Cuenta de Vercel',
    description: 'Donde publicarás tus apps.',
    Logo: VercelLogo,
    color: '#000000',
    steps: [
      { text: 'Regístrate con GitHub', url: 'https://vercel.com/signup' },
      { text: 'Autoriza la conexión' },
      { text: 'Completa el registro' }
    ],
    verify: 'Puedes acceder al dashboard de Vercel.'
  },
  {
    id: 'req-claude',
    anchorId: 'requisitos-claude',
    title: 'Claude Code + Suscripción',
    description: 'La herramienta de IA que usarás para programar.',
    Logo: ClaudeLogo,
    color: '#D97706',
    isPaid: true,
    price: '$20/mes',
    steps: [
      { text: 'Suscríbete a Claude Pro o Max', url: 'https://claude.ai/upgrade' },
      { text: 'Abre la terminal' },
      { text: 'Ejecuta: npm install -g @anthropic-ai/claude-code' },
      { text: 'Ejecuta: claude' },
      { text: 'Inicia sesión con tu cuenta de Anthropic' }
    ],
    verify: 'Al escribir "claude" en la terminal, se abre Claude Code.',
    note: 'Claude Code requiere una suscripción activa de Claude Pro ($20/mes) o Claude Max ($100/mes). Sin suscripción, no podrás usar la herramienta.'
  }
]

function RequisitosContent() {
  const { completed, toggle, progress } = usePrecursoProgress()
  const { theme, toggleTheme } = useTheme()
  const t = themes[theme]

  const completedCount = REQUISITOS.filter(req => completed[req.id]).length
  const allCompleted = completedCount === REQUISITOS.length

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
              <a href="#como-abrir-terminal" style={{
                display: 'block', padding: '8px 20px 8px 48px', color: '#f59e0b',
                textDecoration: 'none', fontSize: '13px', fontWeight: 500
              }}>⚡ Cómo abrir Terminal</a>
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

          {/* Terminal Section - Before Node.js */}
          <div id="como-abrir-terminal">
            <TerminalSection t={t} theme={theme} />
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {REQUISITOS.map((req, index) => {
              const isStepCompleted = completed[req.id]
              return (
                <div key={req.id} id={req.anchorId} style={{
                  background: isStepCompleted ? t.successLight : t.bgSecondary,
                  borderRadius: '16px',
                  border: `1px solid ${isStepCompleted ? t.success : t.border}`,
                  overflow: 'hidden',
                  transition: 'all 0.2s'
                }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 24px',
                    background: isStepCompleted ? 'transparent' : t.bgTertiary,
                    borderBottom: `1px solid ${isStepCompleted ? t.success + '40' : t.border}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '52px',
                        height: '52px',
                        background: isStepCompleted ? t.success : t.bg,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        color: isStepCompleted ? 'white' : t.text,
                        fontWeight: 600,
                        border: isStepCompleted ? 'none' : `1px solid ${t.border}`
                      }}>
                        {isStepCompleted ? '✓' : <req.Logo color={theme === 'dark' ? '#fff' : undefined} />}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: isStepCompleted ? t.success : t.textMuted,
                            background: isStepCompleted ? t.success + '20' : t.bg,
                            padding: '2px 8px',
                            borderRadius: '4px'
                          }}>
                            {isStepCompleted ? '✓ Hecho' : `Paso ${index + 1}`}
                          </span>
                          {req.isPaid && (
                            <span style={{
                              fontSize: '12px',
                              fontWeight: 600,
                              color: '#dc2626',
                              background: '#fef2f2',
                              padding: '2px 8px',
                              borderRadius: '4px'
                            }}>
                              💳 PAGO REQUERIDO: {req.price}
                            </span>
                          )}
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
                      background: isStepCompleted ? t.success + '15' : t.bgTertiary,
                      borderRadius: '10px',
                      fontSize: '14px',
                      color: t.textMuted,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      marginBottom: '16px'
                    }}>
                      <span style={{ fontSize: '16px' }}>✅</span>
                      <span><strong style={{ color: t.text }}>Verificar:</strong> {req.verify}</span>
                    </div>

                    {req.note && (
                      <div style={{
                        padding: '14px 18px',
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '10px',
                        fontSize: '14px',
                        color: '#991b1b',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom: '16px'
                      }}>
                        <span style={{ fontSize: '16px' }}>⚠️</span>
                        <span>{req.note}</span>
                      </div>
                    )}

                    {/* Individual completion button */}
                    <button
                      onClick={() => toggle(req.id)}
                      style={{
                        width: '100%',
                        padding: '14px 20px',
                        background: isStepCompleted ? t.bg : t.success,
                        border: `1px solid ${isStepCompleted ? t.border : t.success}`,
                        borderRadius: '10px',
                        color: isStepCompleted ? t.textSecondary : 'white',
                        fontSize: '15px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isStepCompleted ? (
                        <>Desmarcar</>
                      ) : (
                        <>✓ {req.title} instalado</>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Progress summary */}
          <div style={{
            marginTop: '40px',
            padding: '32px',
            background: allCompleted ? t.successLight : t.bgSecondary,
            borderRadius: '16px',
            border: `1px solid ${allCompleted ? t.success : t.border}`,
            textAlign: 'center'
          }}>
            {allCompleted ? (
              <>
                <span style={{ fontSize: '48px' }}>🎉</span>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: t.success, margin: '12px 0 8px' }}>
                  ¡Todo listo!
                </h3>
                <p style={{ fontSize: '15px', color: t.textSecondary, margin: 0 }}>
                  Tienes todo lo necesario para la primera clase.
                </p>
              </>
            ) : (
              <>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: t.bgTertiary,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: t.accent
                }}>
                  {completedCount}/5
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: t.text, margin: '0 0 8px' }}>
                  {completedCount === 0 ? 'Empieza por el primer paso' : `Te faltan ${5 - completedCount} herramientas`}
                </h3>
                <p style={{ fontSize: '14px', color: t.textSecondary, margin: 0 }}>
                  Marca cada herramienta como instalada cuando la tengas lista.
                </p>
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
