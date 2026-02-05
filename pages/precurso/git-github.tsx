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
        <title>Git y GitHub | Precurso</title>
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
            Módulo 6 de 6
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
            ⏱️ ~60 minutos
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 16px 0' }}>
            Git y GitHub Básico
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            Control de versiones y cómo guardar tu código en la nube. Esencial para cualquier proyecto.
          </p>
        </div>

        {/* Visual explanation */}
        <div style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
            flexWrap: 'wrap',
            marginBottom: '24px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#f97316',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                fontSize: '36px'
              }}>
                📁
              </div>
              <div style={{ fontWeight: 600, color: '#1a1a2e' }}>Git</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Control de versiones local</div>
            </div>
            <div style={{ fontSize: '24px', color: '#94a3b8' }}>→</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#1a1a2e',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                fontSize: '36px'
              }}>
                🐙
              </div>
              <div style={{ fontWeight: 600, color: '#1a1a2e' }}>GitHub</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Tu código en la nube</div>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748b', margin: 0 }}>
            Git guarda el historial de cambios • GitHub almacena tu código online
          </p>
        </div>

        {/* Main video - MoureDev course */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #312e81 100%)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <span style={{
              background: '#fbbf24',
              color: '#1a1a2e',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600
            }}>
              ⭐ RECURSO PRINCIPAL
            </span>
          </div>
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
              src="https://www.youtube.com/embed/3GymExBkKjE"
              title="Curso de Git y GitHub - MoureDev"
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
          <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px 0' }}>
            Curso de Git y GitHub desde cero - MoureDev
          </h3>
          <p style={{ fontSize: '14px', opacity: 0.9, margin: '0 0 16px 0' }}>
            El mejor curso de Git en español. Mira las primeras lecciones (~1 hora) para aprender los comandos esenciales.
          </p>
          <a
            href="https://github.com/mouredev/hello-git"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            Ver repositorio del curso
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>

        {/* Essential commands */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '40px 0 20px 0' }}>
          🎯 Los 5 comandos que debes saber
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
              </tr>
            </thead>
            <tbody>
              {[
                { cmd: 'git init', desc: 'Inicia un nuevo repositorio Git en tu carpeta' },
                { cmd: 'git add .', desc: 'Prepara todos los archivos para guardar' },
                { cmd: 'git commit -m "mensaje"', desc: 'Guarda los cambios con un mensaje descriptivo' },
                { cmd: 'git push', desc: 'Sube los cambios a GitHub' },
                { cmd: 'git pull', desc: 'Descarga los cambios desde GitHub' }
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create GitHub account */}
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '12px',
          padding: '24px',
          marginTop: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#166534' }}>
              ✅ Crea tu cuenta de GitHub
            </h4>
            <p style={{ margin: 0, color: '#166534', fontSize: '14px' }}>
              Necesitarás una cuenta de GitHub para guardar tu código y desplegar tu proyecto.
            </p>
          </div>
          <a
            href="https://github.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#1a1a2e',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '14px'
            }}
          >
            Crear cuenta en GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>

        {/* Tip */}
        <div style={{
          background: '#dbeafe',
          border: '1px solid #93c5fd',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '24px'
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#1e40af' }}>
            💡 Claude Code y Git
          </h4>
          <p style={{ margin: 0, color: '#1e40af', fontSize: '14px' }}>
            Claude Code puede ejecutar comandos de Git por ti automáticamente.
            Solo necesitas entender los conceptos básicos para revisar lo que está haciendo
            y resolver conflictos cuando sea necesario.
          </p>
        </div>

        {/* Alternatives */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '40px 0 20px 0' }}>
          📚 Recursos alternativos
        </h2>
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <ul style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <a href="https://www.freecodecamp.org/espanol/news/aprende-git-y-github-curso-desde-cero/" target="_blank" rel="noopener noreferrer" style={{ color: '#5e6ad2', fontWeight: 500 }}>
                FreeCodeCamp Español
              </a>
              <span style={{ color: '#64748b' }}> - Aprende Git y GitHub (5+ horas, muy completo)</span>
            </li>
            <li>
              <a href="https://www.udemy.com/course/git-github-completo/" target="_blank" rel="noopener noreferrer" style={{ color: '#5e6ad2', fontWeight: 500 }}>
                Udemy
              </a>
              <span style={{ color: '#64748b' }}> - Git y GitHub Completo desde Cero (4h 17min)</span>
            </li>
          </ul>
        </div>

        {/* Completion */}
        <div style={{
          background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
          borderRadius: '16px',
          padding: '32px',
          marginTop: '48px',
          textAlign: 'center',
          border: '1px solid #c7d2fe'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
          <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#3730a3', margin: '0 0 12px 0' }}>
            ¡Has completado el Precurso!
          </h3>
          <p style={{ fontSize: '16px', color: '#4338ca', margin: '0 0 24px 0' }}>
            Ahora vuelve al índice y completa el checklist de verificación antes de la primera clase.
          </p>
          <Link href="/precurso" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #5e6ad2 0%, #7c3aed 100%)',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '16px'
          }}>
            Ir al checklist
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
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
          <Link href="/precurso/nodejs" style={{
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
          <Link href="/precurso" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: '#22c55e',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500
          }}>
            Completar checklist
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function GitGithubPage() {
  return (
    <PrecursoEmailGate>
      <PageContent />
    </PrecursoEmailGate>
  )
}
