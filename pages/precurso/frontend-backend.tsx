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
        <title>Frontend vs Backend | Precurso</title>
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
            Módulo 2 de 6
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
            ⏱️ ~25 minutos
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 16px 0' }}>
            Frontend, Backend y Bases de Datos
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            La arquitectura de las aplicaciones modernas explicada con la analogía del restaurante.
          </p>
        </div>

        {/* Visual diagram */}
        <div style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '24px'
          }}>
            <div style={{
              padding: '20px 24px',
              background: '#dbeafe',
              borderRadius: '12px',
              minWidth: '140px'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🖥️</div>
              <div style={{ fontWeight: 600, color: '#1e40af' }}>Frontend</div>
              <div style={{ fontSize: '12px', color: '#3b82f6' }}>Las mesas del restaurante</div>
            </div>
            <div style={{ fontSize: '24px', color: '#94a3b8' }}>↔️</div>
            <div style={{
              padding: '20px 24px',
              background: '#dcfce7',
              borderRadius: '12px',
              minWidth: '140px'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚙️</div>
              <div style={{ fontWeight: 600, color: '#166534' }}>Backend</div>
              <div style={{ fontSize: '12px', color: '#22c55e' }}>La cocina</div>
            </div>
            <div style={{ fontSize: '24px', color: '#94a3b8' }}>↔️</div>
            <div style={{
              padding: '20px 24px',
              background: '#fef3c7',
              borderRadius: '12px',
              minWidth: '140px'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🗄️</div>
              <div style={{ fontWeight: 600, color: '#92400e' }}>Base de Datos</div>
              <div style={{ fontSize: '12px', color: '#d97706' }}>La despensa</div>
            </div>
          </div>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            El <strong>mesero (API)</strong> comunica las mesas con la cocina
          </p>
        </div>

        {/* Video embed */}
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
              src="https://www.youtube.com/embed/50RbVujPPGs"
              title="Frontend vs Backend"
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
            Frontend y Backend explicado (EDteam)
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Explicación clara con la analogía del restaurante.
          </p>
        </div>

        {/* Key concepts */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '40px 0 20px 0' }}>
          🎯 Resumen
        </h2>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{
            background: '#dbeafe',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>🖥️ Frontend (lo que ve el usuario)</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#1e40af' }}>
              <li>La interfaz visual: botones, textos, imágenes</li>
              <li>Se ejecuta en el navegador del usuario</li>
              <li>Tecnologías: HTML, CSS, JavaScript, React</li>
            </ul>
          </div>

          <div style={{
            background: '#dcfce7',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#166534' }}>⚙️ Backend (la lógica oculta)</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534' }}>
              <li>Procesa datos, aplica reglas de negocio</li>
              <li>Se ejecuta en un servidor</li>
              <li>Tecnologías: Node.js, Python, APIs</li>
            </ul>
          </div>

          <div style={{
            background: '#fef3c7',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>🗄️ Base de Datos (donde se guarda todo)</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#92400e' }}>
              <li>Almacena información permanentemente</li>
              <li>Usuarios, productos, pedidos, etc.</li>
              <li>Tecnologías: PostgreSQL, Supabase, MongoDB</li>
            </ul>
          </div>
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
              <a href="https://platzi.com/blog/que-es-frontend-y-backend/" target="_blank" rel="noopener noreferrer" style={{ color: '#5e6ad2', fontWeight: 500 }}>
                Platzi Blog
              </a>
              <span style={{ color: '#64748b' }}> - Qué es Frontend y Backend: principal diferencia</span>
            </li>
            <li>
              <a href="https://www.hackaboss.com/blog/frontend-backend-explicacion" target="_blank" rel="noopener noreferrer" style={{ color: '#5e6ad2', fontWeight: 500 }}>
                HACK A BOSS
              </a>
              <span style={{ color: '#64748b' }}> - Frontend y Backend explicados en 5 pasos</span>
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
          <Link href="/precurso/que-es-programar" style={{
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
          <Link href="/precurso/vscode" style={{
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
            Siguiente: Instalar VS Code
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function FrontendBackendPage() {
  return (
    <PrecursoEmailGate>
      <PageContent />
    </PrecursoEmailGate>
  )
}
