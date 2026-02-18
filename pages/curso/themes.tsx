import Head from 'next/head'
import { useState, useEffect } from 'react'
import CursoEmailGate from '../../components/CursoEmailGate'
import { THEMES, CATEGORIAS, type Theme } from '../../lib/themes-data'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '13px',
        color: copied ? '#22c55e' : '#94a3b8',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => { if (!copied) e.currentTarget.style.color = '#6366f1' }}
      onMouseLeave={e => { if (!copied) e.currentTarget.style.color = '#94a3b8' }}
    >
      {copied ? '✓ Copiado' : 'Copiar'}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{
      position: 'relative',
      background: '#1e293b',
      borderRadius: '12px',
      padding: '16px 20px',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: '13px',
      color: '#e2e8f0',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '4px',
      }}>
        <CopyButton text={code} />
      </div>
      <code style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: '1.6' }}>{code}</code>
    </div>
  )
}

function GitHubAccessBanner() {
  const [githubUser, setGithubUser] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'invited' | 'already' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Check if user already requested access
  useEffect(() => {
    const saved = localStorage.getItem('themes-github-user')
    if (saved) {
      setGithubUser(saved)
      setStatus('invited')
    }
  }, [])

  const handleRequest = async () => {
    if (!githubUser.trim()) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/themes/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ githubUsername: githubUser.trim() }),
      })
      const data = await res.json()

      if (data.success) {
        localStorage.setItem('themes-github-user', githubUser.trim().replace(/^@/, ''))
        setStatus(data.status === 'already_collaborator' ? 'already' : 'invited')
      } else {
        setErrorMsg(data.error || 'Error al pedir acceso')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Error de conexión. Inténtalo de nuevo.')
      setStatus('error')
    }
  }

  if (status === 'invited' || status === 'already') {
    const savedUser = localStorage.getItem('themes-github-user') || githubUser
    return (
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '14px',
        padding: '20px',
        backdropFilter: 'blur(8px)',
        maxWidth: '600px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '12px',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            background: '#22c55e',
            borderRadius: '50%',
          }} />
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>
            {status === 'already' ? 'Ya tienes acceso' : 'Invitación enviada'}
          </span>
        </div>
        <p style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.7)',
          margin: '0 0 14px 0',
          lineHeight: '1.5',
        }}>
          {status === 'already'
            ? `Tu usuario @${savedUser} ya tiene acceso al repo. Clona y empieza:`
            : `Revisa tu email de GitHub (@${savedUser}) y acepta la invitación. Después clona:`}
        </p>
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '10px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}>
          <code style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.9)',
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          }}>
            git clone https://github.com/Josusanz/aprende-themes.git
          </code>
          <CopyButton text="git clone https://github.com/Josusanz/aprende-themes.git" />
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: 'rgba(0,0,0,0.2)',
      borderRadius: '14px',
      padding: '20px',
      backdropFilter: 'blur(8px)',
      maxWidth: '600px',
    }}>
      <p style={{
        fontSize: '14px',
        fontWeight: 600,
        color: 'white',
        margin: '0 0 6px 0',
      }}>
        Pide acceso al repositorio
      </p>
      <p style={{
        fontSize: '13px',
        color: 'rgba(255,255,255,0.65)',
        margin: '0 0 14px 0',
        lineHeight: '1.5',
      }}>
        Introduce tu usuario de GitHub y te daremos acceso automáticamente al repo con los 20 themes.
      </p>
      <div style={{
        display: 'flex',
        gap: '10px',
      }}>
        <input
          type="text"
          value={githubUser}
          onChange={e => setGithubUser(e.target.value)}
          placeholder="tu-usuario-github"
          onKeyDown={e => { if (e.key === 'Enter') handleRequest() }}
          style={{
            flex: 1,
            padding: '12px 16px',
            fontSize: '14px',
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: '10px',
            outline: 'none',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            transition: 'border-color 0.2s ease',
          }}
          onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.4)' }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)' }}
        />
        <button
          onClick={handleRequest}
          disabled={status === 'loading' || !githubUser.trim()}
          style={{
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#4338ca',
            background: status === 'loading' ? 'rgba(255,255,255,0.5)' : 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: status === 'loading' || !githubUser.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {status === 'loading' ? 'Enviando...' : 'Pedir acceso'}
        </button>
      </div>
      {status === 'error' && (
        <p style={{
          fontSize: '13px',
          color: '#fca5a5',
          margin: '10px 0 0 0',
        }}>
          {errorMsg}
        </p>
      )}
    </div>
  )
}

const CATEGORIA_COLORES: Record<string, { bg: string; text: string }> = {
  Landing: { bg: '#ede9fe', text: '#7c3aed' },
  Dashboard: { bg: '#dbeafe', text: '#2563eb' },
  SaaS: { bg: '#d1fae5', text: '#059669' },
  Blog: { bg: '#fef3c7', text: '#d97706' },
  Portfolio: { bg: '#fce7f3', text: '#db2777' },
  Docs: { bg: '#e0e7ff', text: '#4338ca' },
}

function ThemeCard({ theme, onUsar }: { theme: Theme; onUsar: (slug: string) => void }) {
  const [imgError, setImgError] = useState(false)
  const colores = CATEGORIA_COLORES[theme.categoria]

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Preview Image */}
      <div style={{
        width: '100%',
        height: '220px',
        background: '#f1f5f9',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {!imgError ? (
          <img
            src={theme.imagen}
            alt={`Preview de ${theme.nombre}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            gap: '8px',
          }}>
            <span style={{ fontSize: '36px' }}>
              {theme.categoria === 'Dashboard' ? '📊' :
               theme.categoria === 'Portfolio' ? '🎨' :
               theme.categoria === 'Blog' ? '📝' :
               theme.categoria === 'Docs' ? '📚' :
               theme.categoria === 'SaaS' ? '⚡' : '🌐'}
            </span>
            <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 500 }}>
              {theme.nombre}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px 24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '10px',
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#0f172a',
            margin: 0,
          }}>
            {theme.nombre}
          </h3>
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: '100px',
            background: colores.bg,
            color: colores.text,
            letterSpacing: '0.3px',
            textTransform: 'uppercase',
          }}>
            {theme.categoria}
          </span>
        </div>

        <p style={{
          fontSize: '14px',
          color: '#64748b',
          margin: '0 0 20px 0',
          lineHeight: '1.6',
        }}>
          {theme.descripcion}
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
        }}>
          <a
            href={theme.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#6366f1',
              background: '#eef2ff',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              textAlign: 'center',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#e0e7ff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#eef2ff'
            }}
          >
            Ver Demo
          </a>
          <a
            href={`#usar-${theme.slug}`}
            onClick={(e) => {
              e.preventDefault()
              onUsar(theme.slug)
              const el = document.getElementById('como-usar')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'white',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              textAlign: 'center',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(99, 102, 241, 0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.3)'
            }}
          >
            Usar con Claude
          </a>
        </div>
      </div>
    </div>
  )
}

function ThemesGallery() {
  const [categoriaActiva, setCategoriaActiva] = useState<string>('Todos')
  const [selectedSlug, setSelectedSlug] = useState<string>('simple-next')

  const themesFiltrados = categoriaActiva === 'Todos'
    ? THEMES
    : THEMES.filter(t => t.categoria === categoriaActiva)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <Head>
        <title>Themes Premium | aprende.software</title>
        <meta name="description" content="Galería de themes premium Next.js + Tailwind para alumnos del curso" />
      </Head>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 40%, #8b5cf6 100%)',
        padding: '60px 24px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-40px',
          width: '300px',
          height: '300px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-20px',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '50%',
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '100px',
            marginBottom: '20px',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ fontSize: '14px' }}>🎨</span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
              20 themes premium incluidos
            </span>
          </div>

          <h1 style={{
            fontSize: '36px',
            fontWeight: 800,
            color: 'white',
            margin: '0 0 12px 0',
            letterSpacing: '-0.5px',
          }}>
            Themes Premium
          </h1>
          <p style={{
            fontSize: '17px',
            color: 'rgba(255,255,255,0.8)',
            margin: '0 0 24px 0',
            lineHeight: '1.6',
            maxWidth: '600px',
          }}>
            Templates profesionales de Next.js + Tailwind listos para personalizar con Claude Code.
            Clona el repositorio y empieza a construir.
          </p>

          {/* GitHub access */}
          <GitHubAccessBanner />
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px 60px' }}>

        {/* Category filters */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}>
          {CATEGORIAS.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '100px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: categoriaActiva === cat
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'white',
                color: categoriaActiva === cat ? 'white' : '#64748b',
                boxShadow: categoriaActiva === cat
                  ? '0 4px 14px rgba(99, 102, 241, 0.3)'
                  : '0 1px 3px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={e => {
                if (categoriaActiva !== cat) {
                  e.currentTarget.style.color = '#6366f1'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                }
              }}
              onMouseLeave={e => {
                if (categoriaActiva !== cat) {
                  e.currentTarget.style.color = '#64748b'
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'
                }
              }}
            >
              {cat}
              {cat !== 'Todos' && (
                <span style={{
                  marginLeft: '6px',
                  fontSize: '12px',
                  opacity: 0.7,
                }}>
                  {THEMES.filter(t => t.categoria === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Themes grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '24px',
          marginBottom: '60px',
        }}>
          {themesFiltrados.map(theme => (
            <ThemeCard key={theme.slug} theme={theme} onUsar={setSelectedSlug} />
          ))}
        </div>

        {themesFiltrados.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 24px',
            color: '#94a3b8',
          }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🔍</span>
            <p style={{ fontSize: '16px', fontWeight: 500 }}>
              No hay themes en esta categoría
            </p>
          </div>
        )}

        {/* How to use section */}
        <div id="como-usar" style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#0f172a',
            margin: '0 0 8px 0',
          }}>
            Cómo usar los themes
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#64748b',
            margin: '0 0 32px 0',
            lineHeight: '1.6',
          }}>
            Sigue estos pasos para empezar a construir con cualquier theme.
          </p>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                flexShrink: 0,
              }}>
                1
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', margin: '0 0 8px 0' }}>
                  Clona el repositorio de themes
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 12px 0' }}>
                  Introduce tu usuario de GitHub arriba para obtener acceso automático al repo privado.
                </p>
                <CodeBlock code="git clone https://github.com/Josusanz/aprende-themes.git" />
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                flexShrink: 0,
              }}>
                2
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', margin: '0 0 8px 0' }}>
                  Copia el theme que quieras a tu proyecto
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 12px 0' }}>
                  Cada theme es una carpeta independiente con su propio package.json.
                </p>
                <CodeBlock code={`cp -r aprende-themes/${selectedSlug} mi-proyecto`} />
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                flexShrink: 0,
              }}>
                3
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', margin: '0 0 8px 0' }}>
                  Instala dependencias y arranca
                </h3>
                <CodeBlock code="cd mi-proyecto && npm install && npm run dev" />
              </div>
            </div>

            {/* Step 4 */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                flexShrink: 0,
              }}>
                4
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', margin: '0 0 8px 0' }}>
                  Personaliza con Claude Code
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 12px 0' }}>
                  Abre Claude Code en tu proyecto y dile qué quieres cambiar.
                </p>
                <CodeBlock code='claude "Cambia los colores a azul oscuro, actualiza el hero con mi producto y añade una sección de pricing con 3 planes"' />
              </div>
            </div>
          </div>

          {/* Tip */}
          <div style={{
            marginTop: '32px',
            padding: '20px 24px',
            background: 'linear-gradient(135deg, #eef2ff 0%, #ede9fe 100%)',
            borderRadius: '16px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>💡</span>
            <div>
              <p style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#4338ca',
                margin: '0 0 4px 0',
              }}>
                Consejo
              </p>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: 0,
                lineHeight: '1.6',
              }}>
                Antes de pedirle cambios a Claude, abre la demo del theme y describe exactamente
                qué secciones quieres mantener, cuáles eliminar y qué contenido añadir. Cuanto
                más específico seas, mejor resultado obtendrás.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 480px) {
          h1 { font-size: 28px !important; }
        }
      `}</style>
      <style jsx>{`
        @media (max-width: 840px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default function ThemesPage() {
  return (
    <CursoEmailGate>
      <ThemesGallery />
    </CursoEmailGate>
  )
}
