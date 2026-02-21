import Head from 'next/head'
import Link from 'next/link'
import type { ReactElement } from 'react'
import CursoLayout from '../../components/CursoLayout'
import type { NextPageWithLayout } from '../_app'

const CHECKLIST_ITEMS = [
  {
    categoria: 'Cuentas necesarias',
    items: [
      { text: 'Cuenta de GitHub (gratis)', url: 'https://github.com/signup' },
      { text: 'Cuenta de Vercel (gratis)', url: 'https://vercel.com/signup' },
      { text: 'Suscripcion Claude Pro ($20/mes)', url: 'https://claude.ai' },
    ]
  },
  {
    categoria: 'Software a instalar',
    items: [
      { text: 'VS Code', url: 'https://code.visualstudio.com/download' },
      { text: 'Node.js (version LTS)', url: 'https://nodejs.org/' },
      { text: 'Claude Code (npm install -g @anthropic-ai/claude-code)', url: null },
    ]
  },
  {
    categoria: 'Verificar instalacion',
    items: [
      { text: 'node --version → debe mostrar v20.x.x o similar', url: null },
      { text: 'npm --version → debe mostrar un numero de version', url: null },
      { text: 'claude → debe mostrar mensaje de bienvenida', url: null },
    ]
  },
  {
    categoria: 'Conceptos clave',
    items: [
      { text: 'Se que es Terminal y como abrirlo', url: '/curso/glosario#lo-basico' },
      { text: 'Entiendo Frontend vs Backend', url: '/curso/glosario#arquitectura-web' },
      { text: 'Se que es Git y para que sirve', url: '/curso/glosario#git-versiones' },
      { text: 'Entiendo que significa "Deploy"', url: '/curso/glosario#deploy-produccion' },
    ]
  }
]

function ChecklistContent() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafbfc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#1e293b'
    }}>
      <Head>
        <title>Checklist | Curso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          @media print {
            header, .no-print { display: none !important; }
            body { background: white !important; }
            main { padding: 20px !important; max-width: 100% !important; }
            .print-only { display: block !important; }
            a { color: #1e293b !important; text-decoration: none !important; }
          }
          .print-only { display: none; }
        `}</style>
      </Head>

      {/* Header */}
      <header className="no-print" style={{
        background: 'rgba(250, 251, 252, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '12px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/curso" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '8px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </Link>
          <span style={{ fontWeight: 600, fontSize: '16px', color: '#0f172a' }}>Checklist</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handlePrint}
            style={{
              padding: '8px 18px',
              background: '#5e6ad2',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Imprimir / Guardar PDF
          </button>
          <button
            onClick={() => { localStorage.removeItem('precurso-access'); window.location.href = '/curso' }}
            style={{
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#64748b',
              background: 'white',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}
          >
            Salir
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Print header */}
        <div className="print-only" style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
            Checklist del Curso
          </h1>
          <p style={{ color: '#64748b' }}>
            aprende.software/curso
          </p>
        </div>

        {/* Hero */}
        <div className="no-print" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>
            Checklist del Curso
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', lineHeight: 1.7 }}>
            Imprime esta pagina o guardala como PDF para tenerla a mano mientras instalas todo.
          </p>
        </div>

        {/* Checklist sections */}
        {CHECKLIST_ITEMS.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 600,
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '2px solid rgba(0,0,0,0.06)'
            }}>
              {section.categoria}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '16px',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}
                >
                  {/* Checkbox */}
                  <div style={{
                    width: '24px',
                    height: '24px',
                    border: '2px solid rgba(0,0,0,0.06)',
                    borderRadius: '6px',
                    flexShrink: 0,
                    marginTop: '2px'
                  }} />

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '16px',
                      color: '#1e293b',
                      fontWeight: 500
                    }}>
                      {item.text}
                    </div>
                    {item.url && (
                      <a
                        href={item.url}
                        target={item.url.startsWith('http') ? '_blank' : undefined}
                        rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{
                          fontSize: '14px',
                          color: '#5e6ad2',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginTop: '6px'
                        }}
                      >
                        {item.url.startsWith('http') ? item.url.replace('https://', '') : 'Ver en el glosario'}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Notes section */}
        <div style={{
          marginTop: '40px',
          padding: '24px',
          background: 'white',
          borderRadius: '16px',
          border: '1px solid rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
            Notas
          </h3>
          <div style={{
            minHeight: '120px',
            background: '#fafbfc',
            borderRadius: '8px',
            border: '1px dashed rgba(0,0,0,0.06)',
            padding: '12px'
          }}>
            {/* Empty space for notes when printed */}
          </div>
        </div>

        {/* Help section */}
        <div className="no-print" style={{
          marginTop: '40px',
          padding: '32px',
          background: 'white',
          borderRadius: '20px',
          border: '1px solid rgba(0,0,0,0.06)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '12px' }}>
            ¿Necesitas ayuda?
          </h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            Si algo no funciona, consulta la seccion de errores comunes.
          </p>
          <Link href="/curso/errores-comunes" style={{
            padding: '14px 28px',
            background: '#5e6ad2',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 600
          }}>
            Ver errores comunes
          </Link>
        </div>

        {/* Print button mobile */}
        <div className="no-print" style={{
          marginTop: '32px',
          textAlign: 'center'
        }}>
          <button
            onClick={handlePrint}
            style={{
              padding: '16px 32px',
              background: '#5e6ad2',
              border: 'none',
              borderRadius: '14px',
              color: 'white',
              fontSize: '17px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            Imprimir / Guardar como PDF
          </button>
          <p style={{
            marginTop: '12px',
            fontSize: '14px',
            color: '#94a3b8'
          }}>
            Tip: En el dialogo de impresion, selecciona "Guardar como PDF" como destino
          </p>
        </div>

        {/* Navigation */}
        <div className="no-print" style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Link href="/curso" style={{
            padding: '14px 24px',
            background: 'white',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '12px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 500
          }}>
            ← Volver al curso
          </Link>
        </div>
      </main>
    </div>
  )
}

const ChecklistPage: NextPageWithLayout = () => <ChecklistContent />

ChecklistPage.getLayout = (page: ReactElement) => (
  <CursoLayout>{page}</CursoLayout>
)

export default ChecklistPage
