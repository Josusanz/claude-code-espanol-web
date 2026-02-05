import Head from 'next/head'
import Link from 'next/link'
import PrecursoEmailGate from '../../components/PrecursoEmailGate'

function PageContent() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafbfc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <Head>
        <title>Instalar Node.js | Precurso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link href="/precurso" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#64748b',
            fontSize: '14px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Volver al índice
          </Link>
          <span style={{ fontSize: '13px', color: '#5e6ad2', fontWeight: 500 }}>
            Módulo 5 de 6
          </span>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: '#eef2ff',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#5e6ad2',
            fontWeight: 500,
            marginBottom: '16px'
          }}>
            ⏱️ ~20 minutos
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 16px 0' }}>
            Instalar Node.js
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            Node.js permite ejecutar JavaScript fuera del navegador. Es necesario para muchas herramientas modernas.
          </p>
        </div>

        {/* Download button */}
        <div style={{
          background: 'linear-gradient(135deg, #68a063 0%, #3c873a 100%)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⬢</div>
          <h2 style={{ margin: '0 0 8px 0', fontWeight: 600 }}>Descarga Node.js</h2>
          <p style={{ margin: '0 0 16px 0', opacity: 0.9 }}>Descarga la versión LTS (recomendada)</p>
          <a
            href="https://nodejs.org/es"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: 'white',
              color: '#3c873a',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '16px'
            }}
          >
            Ir a nodejs.org
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>

        {/* Steps */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 20px 0' }}>
          📋 Pasos de instalación
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {[
            { step: 1, title: 'Descargar el instalador', desc: 'Ve a nodejs.org y descarga la versión LTS (Long Term Support)' },
            { step: 2, title: 'Ejecutar el instalador', desc: 'Sigue los pasos del asistente de instalación (acepta los defaults)' },
            { step: 3, title: 'Verificar la instalación', desc: 'Abre una terminal nueva y ejecuta: node -v' },
            { step: 4, title: 'Verificar npm', desc: 'Ejecuta también: npm -v (npm viene incluido con Node.js)' }
          ].map(item => (
            <div
              key={item.step}
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                background: '#dcfce7',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#166534',
                flexShrink: 0
              }}>
                {item.step}
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontWeight: 600, color: '#1a1a2e' }}>{item.title}</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Verification */}
        <div style={{
          background: '#1e1e1e',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '32px'
        }}>
          <div style={{
            background: '#323232',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ marginLeft: '8px', color: '#888', fontSize: '12px' }}>Verificación</span>
          </div>
          <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '14px', color: '#d4d4d4' }}>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ color: '#27c93f' }}>~</span> node -v
            </div>
            <div style={{ color: '#6a9955', marginBottom: '16px' }}>
              v20.11.0
            </div>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ color: '#27c93f' }}>~</span> npm -v
            </div>
            <div style={{ color: '#6a9955' }}>
              10.2.4
            </div>
          </div>
        </div>

        {/* Video */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 20px 0' }}>
          🎥 Tutorial en vídeo
        </h2>

        <div style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
            borderRadius: '12px',
            background: '#000',
            marginBottom: '16px'
          }}>
            <iframe
              src="https://www.youtube.com/embed/czFj5zoI5uc"
              title="Instalar Node.js"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
            />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 8px 0' }}>
            Cómo instalar Node.js en tu computadora
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Tutorial paso a paso de instalación y verificación.
          </p>
        </div>

        {/* What is npm */}
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '32px'
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#166534' }}>
            📦 ¿Qué es npm?
          </h4>
          <p style={{ margin: 0, color: '#166534', fontSize: '14px', lineHeight: 1.6 }}>
            npm (Node Package Manager) es el gestor de paquetes de Node.js. Permite instalar librerías y herramientas
            que otras personas han creado. Cuando ejecutes <code style={{ background: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>npm install</code>,
            estás descargando código que tu proyecto necesita para funcionar.
          </p>
        </div>

        {/* Resources */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '40px 0 20px 0' }}>
          📚 Recursos adicionales
        </h2>
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <ul style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <a href="https://www.freecodecamp.org/espanol/news/aprende-node-js-y-express-curso-desde-cero/" target="_blank" rel="noopener noreferrer" style={{ color: '#5e6ad2', fontWeight: 500 }}>
                FreeCodeCamp Español
              </a>
              <span style={{ color: '#64748b' }}> - Curso de Node.js desde cero</span>
            </li>
            <li>
              <a href="https://carlosazaustre.es/nodejs" target="_blank" rel="noopener noreferrer" style={{ color: '#5e6ad2', fontWeight: 500 }}>
                Carlos Azaustre
              </a>
              <span style={{ color: '#64748b' }}> - Curso de Node.js gratis</span>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <Link href="/precurso/terminal" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Anterior
          </Link>
          <Link href="/precurso/git-github" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #5e6ad2 0%, #7c3aed 100%)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500
          }}>
            Siguiente: Git y GitHub
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function NodejsPage() {
  return (
    <PrecursoEmailGate>
      <PageContent />
    </PrecursoEmailGate>
  )
}
