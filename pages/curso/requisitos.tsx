import Head from 'next/head'
import Link from 'next/link'
import CursoEmailGate from '../../components/CursoEmailGate'
import { usePrecursoProgress } from '../../lib/precurso-data'

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

// Componente especial para la seccion de Terminal
const TerminalSection = () => (
  <div style={{
    background: 'white',
    borderRadius: '16px',
    border: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden',
    marginBottom: '20px'
  }}>
    <div style={{
      padding: '20px 24px',
      background: '#f1f5f9',
      borderBottom: '1px solid rgba(0,0,0,0.06)'
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
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
              Como abrir la Terminal
            </h3>
          </div>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>
            Necesitas saber esto antes de instalar Node.js y Claude Code
          </p>
        </div>
      </div>
    </div>

    <div style={{ padding: '24px' }}>
      <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '20px', lineHeight: 1.7 }}>
        La terminal es donde escribiras comandos. Parece intimidante pero es muy facil.
        Solo tienes que abrirla y copiar/pegar lo que te diga.
      </p>

      {/* macOS */}
      <div style={{
        background: '#f1f5f9',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '20px' }}>🍎</span>
          <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', margin: 0 }}>macOS</h4>
        </div>
        <ol style={{ margin: 0, padding: '0 0 0 20px', color: '#64748b', lineHeight: 2 }}>
          <li>Pulsa <strong style={{ color: '#1e293b' }}>Cmd + Espacio</strong> (abre Spotlight)</li>
          <li>Escribe <strong style={{ color: '#1e293b' }}>"Terminal"</strong></li>
          <li>Pulsa Enter</li>
        </ol>
        <div style={{
          marginTop: '12px',
          padding: '12px',
          background: '#fafbfc',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#94a3b8'
        }}>
          💡 Tambien la encuentras en: Aplicaciones → Utilidades → Terminal
        </div>
      </div>

      {/* Windows */}
      <div style={{
        background: '#f1f5f9',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '20px' }}>🪟</span>
          <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', margin: 0 }}>Windows</h4>
        </div>
        <ol style={{ margin: 0, padding: '0 0 0 20px', color: '#64748b', lineHeight: 2 }}>
          <li>Pulsa <strong style={{ color: '#1e293b' }}>Windows + R</strong></li>
          <li>Escribe <strong style={{ color: '#1e293b' }}>"cmd"</strong> o <strong style={{ color: '#1e293b' }}>"powershell"</strong></li>
          <li>Pulsa Enter</li>
        </ol>
        <div style={{
          marginTop: '12px',
          padding: '12px',
          background: '#fafbfc',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#94a3b8'
        }}>
          💡 Alternativa: Click derecho en el menu inicio → "Terminal" o "PowerShell"
        </div>
      </div>

      {/* Linux */}
      <div style={{
        background: '#f1f5f9',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '20px' }}>🐧</span>
          <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', margin: 0 }}>Linux</h4>
        </div>
        <ol style={{ margin: 0, padding: '0 0 0 20px', color: '#64748b', lineHeight: 2 }}>
          <li>Pulsa <strong style={{ color: '#1e293b' }}>Ctrl + Alt + T</strong></li>
          <li>¡Listo! (funciona en Ubuntu, Debian, y la mayoria de distros)</li>
        </ol>
      </div>

      {/* Video 1: Como abrir el terminal */}
      <div style={{
        marginTop: '20px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.06)'
      }}>
        <div style={{
          background: '#f1f5f9',
          padding: '12px 16px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>🎬</span>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>
            Video 1: Como abrir el terminal
          </span>
        </div>
        <video
          controls
          style={{
            width: '100%',
            display: 'block',
            background: '#1a1a2e'
          }}
        >
          <source src="/videos/abrir-terminal.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div style={{
          padding: '12px 16px',
          background: '#fafbfc',
          fontSize: '13px',
          color: '#94a3b8'
        }}>
          🔊 Narracion en espanol (43 seg)
        </div>
      </div>

      {/* Video 2: Como instalar las herramientas */}
      <div style={{
        marginTop: '16px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.06)'
      }}>
        <div style={{
          background: '#f1f5f9',
          padding: '12px 16px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>🎬</span>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>
            Video 2: Como instalar Node.js y Claude Code
          </span>
        </div>
        <video
          controls
          style={{
            width: '100%',
            display: 'block',
            background: '#1a1a2e'
          }}
        >
          <source src="/videos/instalar-herramientas.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div style={{
          padding: '12px 16px',
          background: '#fafbfc',
          fontSize: '13px',
          color: '#94a3b8'
        }}>
          🔊 Narracion en espanol (72 seg)
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
    description: 'El editor donde veras los archivos que Claude Code crea.',
    Logo: VSCodeLogo,
    color: '#007ACC',
    steps: [
      { text: 'Descarga VS Code', url: 'https://code.visualstudio.com/download' },
      { text: 'Instalalo (siguiente, siguiente, finalizar)' },
      { text: 'Abrelo para verificar que funciona' }
    ],
    verify: 'Abre VS Code y veras una pantalla de bienvenida.'
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
      { text: 'Instalalo con las opciones por defecto' },
      { text: 'Abre la terminal (ver instrucciones arriba)' },
      { text: 'Escribe: node --version y pulsa Enter' }
    ],
    verify: 'Deberias ver algo como v20.x.x o v22.x.x'
  },
  {
    id: 'req-github',
    anchorId: 'requisitos-github',
    title: 'Cuenta de GitHub',
    description: 'Donde guardaras tu codigo en la nube.',
    Logo: GitHubLogo,
    color: '#24292f',
    steps: [
      { text: 'Crea tu cuenta', url: 'https://github.com/signup' },
      { text: 'Verifica tu email' },
      { text: 'Inicia sesion para confirmar' }
    ],
    verify: 'Puedes acceder a github.com con tu cuenta.'
  },
  {
    id: 'req-vercel',
    anchorId: 'requisitos-vercel',
    title: 'Cuenta de Vercel',
    description: 'Donde publicaras tus apps.',
    Logo: VercelLogo,
    color: '#000000',
    steps: [
      { text: 'Registrate con GitHub', url: 'https://vercel.com/signup' },
      { text: 'Autoriza la conexion' },
      { text: 'Completa el registro' }
    ],
    verify: 'Puedes acceder al dashboard de Vercel.'
  },
  {
    id: 'req-claude',
    anchorId: 'requisitos-claude',
    title: 'Claude Code + Suscripcion',
    description: 'La herramienta de IA (con Opus 4.6 y Sonnet 4.5) que usaras para crear software.',
    Logo: ClaudeLogo,
    color: '#D97706',
    isPaid: true,
    price: '$20/mes',
    steps: [
      { text: 'Suscribete a Claude Pro o Max', url: 'https://claude.ai/upgrade' },
      { text: 'Abre la terminal' },
      { text: 'Ejecuta: npm install -g @anthropic-ai/claude-code' },
      { text: 'Ejecuta: claude' },
      { text: 'Inicia sesion con tu cuenta de Anthropic' }
    ],
    verify: 'Al escribir "claude" en la terminal, se abre Claude Code.',
    note: 'Claude Code requiere una suscripcion activa de Claude Pro ($20/mes) o Claude Max ($100/mes). Tendras acceso a modelos como Opus 4.6, Sonnet 4.5 y Haiku 4.5. Sin suscripcion, no podras usar la herramienta.'
  },
  {
    id: 'req-pencil',
    anchorId: 'requisitos-pencil',
    title: 'Pencil (extension de diseno)',
    description: 'Canvas de diseno que se integra con Claude Code para crear interfaces visuales.',
    Logo: () => (
      <svg viewBox="0 0 24 24" width="32" height="32">
        <path fill="#6366f1" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
    ),
    color: '#6366f1',
    steps: [
      { text: 'Abre VS Code' },
      { text: 'Ve a Extensiones (Cmd/Ctrl + Shift + X)' },
      { text: 'Busca "Pencil" e instalalo' },
      { text: 'Crea un archivo test.pen para verificar que funciona' },
    ],
    verify: 'Al abrir un archivo .pen en VS Code, veras el canvas de diseno de Pencil.',
    note: 'Pencil es gratuito. Se conecta con Claude Code via MCP para que puedas disenar interfaces visualmente y generar codigo directamente desde el diseno.'
  }
]

function RequisitosContent() {
  const { completed, toggle, progress } = usePrecursoProgress()

  const completedCount = REQUISITOS.filter(req => completed[req.id]).length
  const allCompleted = completedCount === REQUISITOS.length

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafbfc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#1e293b',
    }}>
      <Head>
        <title>Requisitos | Curso</title>
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
          <Link href="/curso" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </Link>
          <span style={{ fontWeight: 600, fontSize: '16px', color: '#0f172a' }}>Requisitos</span>
        </div>
        <button onClick={() => { localStorage.removeItem('precurso-access'); window.location.href = '/curso' }} style={{ padding: '8px 18px', fontSize: '13px', fontWeight: 600, color: '#64748b', background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>Salir</button>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px', color: '#1e293b' }}>
            Requisitos tecnicos 🛠️
          </h1>
          <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7 }}>
            Instala estas herramientas antes de la primera clase. Marca cada paso cuando lo completes.
          </p>
        </div>

        {/* Terminal Section - Before Node.js */}
        <div id="como-abrir-terminal">
          <TerminalSection />
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {REQUISITOS.map((req, index) => {
            const isStepCompleted = completed[req.id]
            return (
              <div key={req.id} id={req.anchorId} style={{
                background: isStepCompleted ? '#f0fdf4' : 'white',
                borderRadius: '16px',
                border: `1px solid ${isStepCompleted ? '#22c55e' : 'rgba(0,0,0,0.06)'}`,
                overflow: 'hidden',
                transition: 'all 0.2s'
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 24px',
                  background: isStepCompleted ? 'transparent' : '#f1f5f9',
                  borderBottom: `1px solid ${isStepCompleted ? '#22c55e' + '40' : 'rgba(0,0,0,0.06)'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      background: isStepCompleted ? '#22c55e' : '#fafbfc',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      color: isStepCompleted ? 'white' : '#1e293b',
                      fontWeight: 600,
                      border: isStepCompleted ? 'none' : '1px solid rgba(0,0,0,0.06)'
                    }}>
                      {isStepCompleted ? '✓' : <req.Logo />}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: isStepCompleted ? '#22c55e' : '#94a3b8',
                          background: isStepCompleted ? '#22c55e' + '20' : '#fafbfc',
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
                        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                          {req.title}
                        </h3>
                      </div>
                      <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>
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
                      <li key={i} style={{ fontSize: '15px', color: '#64748b' }}>
                        {step.url ? (
                          <a href={step.url} target="_blank" rel="noopener noreferrer" style={{
                            color: '#5e6ad2',
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
                    background: isStepCompleted ? '#22c55e' + '15' : '#f1f5f9',
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: '#94a3b8',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginBottom: '16px'
                  }}>
                    <span style={{ fontSize: '16px' }}>✅</span>
                    <span><strong style={{ color: '#1e293b' }}>Verificar:</strong> {req.verify}</span>
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
                      background: isStepCompleted ? '#fafbfc' : '#22c55e',
                      border: `1px solid ${isStepCompleted ? 'rgba(0,0,0,0.06)' : '#22c55e'}`,
                      borderRadius: '10px',
                      color: isStepCompleted ? '#64748b' : 'white',
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
          background: allCompleted ? '#f0fdf4' : 'white',
          borderRadius: '16px',
          border: `1px solid ${allCompleted ? '#22c55e' : 'rgba(0,0,0,0.06)'}`,
          textAlign: 'center'
        }}>
          {allCompleted ? (
            <>
              <span style={{ fontSize: '48px' }}>🎉</span>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#22c55e', margin: '12px 0 8px' }}>
                ¡Todo listo!
              </h3>
              <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
                Tienes todo lo necesario para la primera clase.
              </p>
            </>
          ) : (
            <>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#f1f5f9',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '24px',
                fontWeight: 700,
                color: '#5e6ad2'
              }}>
                {completedCount}/6
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: '0 0 8px' }}>
                {completedCount === 0 ? 'Empieza por el primer paso' : `Te faltan ${6 - completedCount} herramientas`}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Marca cada herramienta como instalada cuando la tengas lista.
              </p>
            </>
          )}
        </div>

        {/* Navigation */}
        <div style={{
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Link href="/curso/glosario" style={{
            padding: '14px 24px',
            background: 'white',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '10px',
            color: '#64748b',
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
          <Link href="/curso" style={{
            padding: '14px 24px',
            background: progress === 100 ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
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
  )
}

export default function RequisitosPage() {
  return (
    <CursoEmailGate>
      <RequisitosContent />
    </CursoEmailGate>
  )
}
