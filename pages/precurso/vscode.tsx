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
        <title>Instalar VS Code | Precurso</title>
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
            Módulo 3 de 6
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
            Instalar Visual Studio Code
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            Tu editor de código principal. Es donde verás y editarás el código que Claude Code genera.
          </p>
        </div>

        {/* Download button */}
        <div style={{
          background: 'linear-gradient(135deg, #0078d4 0%, #005a9e 100%)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>💻</div>
          <h2 style={{ margin: '0 0 16px 0', fontWeight: 600 }}>Descarga VS Code</h2>
          <a
            href="https://code.visualstudio.com/download"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: 'white',
              color: '#0078d4',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '16px'
            }}
          >
            Ir a la descarga oficial
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>

        {/* Video tutorial */}
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
              src="https://www.youtube.com/embed/ITxcbrfEcIY"
              title="Instalar VS Code"
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
            Cómo instalar Visual Studio Code paso a paso
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Tutorial completo de instalación y configuración inicial.
          </p>
        </div>

        {/* Steps */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '40px 0 20px 0' }}>
          📋 Pasos a seguir
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { step: 1, title: 'Descargar VS Code', desc: 'Ve a code.visualstudio.com y descarga la versión para tu sistema operativo' },
            { step: 2, title: 'Instalar', desc: 'Ejecuta el instalador y sigue las instrucciones (acepta los defaults)' },
            { step: 3, title: 'Abrir VS Code', desc: 'Abre la aplicación para verificar que funciona correctamente' },
            { step: 4, title: 'Ponerlo en español', desc: 'Instala la extensión "Spanish Language Pack" desde el menú de extensiones' },
            { step: 5, title: 'Explorar la interfaz', desc: 'Familiarízate con el explorador de archivos, terminal integrado y barra lateral' }
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
                background: '#eef2ff',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#5e6ad2',
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

        {/* Tips */}
        <div style={{
          background: '#fef3c7',
          border: '1px solid #fcd34d',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '32px'
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#92400e', display: 'flex', alignItems: 'center', gap: '8px' }}>
            💡 Tip importante
          </h4>
          <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
            VS Code es donde verás el código que Claude Code genera y edita. No necesitas entender todo el código,
            pero sí familiarizarte con la interfaz para poder navegar entre archivos.
          </p>
        </div>

        {/* Alternatives */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '40px 0 20px 0' }}>
          📚 Recursos Alternativos
        </h2>
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <ul style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <a href="https://www.tutorialesprogramacionya.com/vscodeya/" target="_blank" rel="noopener noreferrer" style={{ color: '#5e6ad2', fontWeight: 500 }}>
                VSCode Ya
              </a>
              <span style={{ color: '#64748b' }}> - Tutorial escrito paso a paso</span>
            </li>
            <li>
              <a href="https://keepcoding.io/blog/como-poner-visual-studio-code-en-espanol/" target="_blank" rel="noopener noreferrer" style={{ color: '#5e6ad2', fontWeight: 500 }}>
                KeepCoding
              </a>
              <span style={{ color: '#64748b' }}> - Cómo poner VS Code en español</span>
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
          <Link href="/precurso/frontend-backend" style={{
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
          <Link href="/precurso/terminal" style={{
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
            Siguiente: Terminal Básico
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function VSCodePage() {
  return (
    <PrecursoEmailGate>
      <PageContent />
    </PrecursoEmailGate>
  )
}
