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
        <title>Terminal Básico | Precurso</title>
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
            Módulo 4 de 6
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
            ⏱️ ~30 minutos
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 16px 0' }}>
            Terminal / Línea de Comandos
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            Comandos esenciales que usarás a diario. Es más fácil de lo que parece.
          </p>
        </div>

        {/* Terminal visual */}
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
            <span style={{ marginLeft: '8px', color: '#888', fontSize: '12px' }}>Terminal</span>
          </div>
          <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '14px', color: '#d4d4d4' }}>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ color: '#27c93f' }}>~</span> <span style={{ color: '#569cd6' }}>cd</span> mi-proyecto
            </div>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ color: '#27c93f' }}>~/mi-proyecto</span> <span style={{ color: '#569cd6' }}>ls</span>
            </div>
            <div style={{ color: '#888', marginBottom: '8px' }}>
              index.html  styles.css  script.js  images/
            </div>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ color: '#27c93f' }}>~/mi-proyecto</span> <span style={{ color: '#569cd6' }}>mkdir</span> nueva-carpeta
            </div>
            <div>
              <span style={{ color: '#27c93f' }}>~/mi-proyecto</span> <span style={{ color: '#ccc' }}>▋</span>
            </div>
          </div>
        </div>

        {/* Commands table */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 20px 0' }}>
          📋 Los 10 comandos que necesitas saber
        </h2>

        <div style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Comando</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Qué hace</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cmd: 'pwd', desc: 'Muestra dónde estás', example: 'pwd → /Users/tu/carpeta' },
                { cmd: 'ls', desc: 'Lista archivos', example: 'ls → index.html styles.css' },
                { cmd: 'cd', desc: 'Cambia de carpeta', example: 'cd mi-proyecto' },
                { cmd: 'cd ..', desc: 'Sube una carpeta', example: 'cd ..' },
                { cmd: 'mkdir', desc: 'Crea carpeta', example: 'mkdir nueva-carpeta' },
                { cmd: 'touch', desc: 'Crea archivo vacío', example: 'touch index.html' },
                { cmd: 'cp', desc: 'Copia archivo', example: 'cp archivo.txt copia.txt' },
                { cmd: 'mv', desc: 'Mueve/renombra', example: 'mv viejo.txt nuevo.txt' },
                { cmd: 'rm', desc: 'Elimina archivo', example: 'rm archivo.txt' },
                { cmd: 'clear', desc: 'Limpia pantalla', example: 'clear' }
              ].map((row, i) => (
                <tr key={row.cmd} style={{ background: i % 2 === 0 ? 'white' : '#fafbfc' }}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
                    <code style={{
                      background: '#1e1e1e',
                      color: '#d4d4d4',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '13px'
                    }}>
                      {row.cmd}
                    </code>
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '14px' }}>{row.desc}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px', fontFamily: 'monospace' }}>{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Video */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '40px 0 20px 0' }}>
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
              src="https://www.youtube.com/embed/RuCXnfcH9y8"
              title="Comandos básicos de terminal"
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
            Comandos básicos de terminal para principiantes
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Aprende a navegar y gestionar archivos desde la línea de comandos.
          </p>
        </div>

        {/* Tip */}
        <div style={{
          background: '#dcfce7',
          border: '1px solid #86efac',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '32px'
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#166534', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ✅ Buena noticia
          </h4>
          <p style={{ margin: 0, color: '#166534', fontSize: '14px' }}>
            Claude Code ejecutará la mayoría de comandos por ti automáticamente.
            Solo necesitas saber lo básico para entender qué está haciendo y poder navegar cuando lo necesites.
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
              <a href="https://www.freecodecamp.org/espanol/news/comandos-de-linux/" target="_blank" rel="noopener noreferrer" style={{ color: '#5e6ad2', fontWeight: 500 }}>
                FreeCodeCamp Español
              </a>
              <span style={{ color: '#64748b' }}> - Manual completo de comandos de Linux</span>
            </li>
            <li>
              <a href="https://labsmac.es/tutorial-terminal-mac/" target="_blank" rel="noopener noreferrer" style={{ color: '#5e6ad2', fontWeight: 500 }}>
                labsmac.es
              </a>
              <span style={{ color: '#64748b' }}> - Tutorial de la Terminal de Mac</span>
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
          <Link href="/precurso/vscode" style={{
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
          <Link href="/precurso/nodejs" style={{
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
            Siguiente: Instalar Node.js
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function TerminalPage() {
  return (
    <PrecursoEmailGate>
      <PageContent />
    </PrecursoEmailGate>
  )
}
