import Head from 'next/head'
import Link from 'next/link'
import PrecursoEmailGate from '../../components/PrecursoEmailGate'
import { useState, useEffect } from 'react'

// Checklist items
const CHECKLIST_ITEMS = [
  { id: 'modulo1', label: 'Módulo 1: Qué es programar', type: 'module' },
  { id: 'modulo2', label: 'Módulo 2: Frontend vs Backend', type: 'module' },
  { id: 'modulo3', label: 'Módulo 3: VS Code instalado', type: 'module' },
  { id: 'modulo4', label: 'Módulo 4: Terminal básico', type: 'module' },
  { id: 'modulo5', label: 'Módulo 5: Node.js instalado', type: 'module' },
  { id: 'modulo6', label: 'Módulo 6: Git y GitHub', type: 'module' },
  { id: 'divider1', label: '', type: 'divider' },
  { id: 'vscode', label: 'VS Code funcionando', type: 'check' },
  { id: 'nodejs', label: 'node -v funciona', type: 'check' },
  { id: 'git', label: 'git --version funciona', type: 'check' },
  { id: 'github', label: 'Cuenta GitHub creada', type: 'check' },
  { id: 'supabase', label: 'Cuenta Supabase creada', type: 'check' },
  { id: 'vercel', label: 'Cuenta Vercel creada', type: 'check' },
]

function PrecursoContent() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('precurso-checklist')
    if (saved) setChecked(JSON.parse(saved))
  }, [])

  const toggle = (id: string) => {
    const newChecked = { ...checked, [id]: !checked[id] }
    setChecked(newChecked)
    localStorage.setItem('precurso-checklist', JSON.stringify(newChecked))
  }

  const completedCount = CHECKLIST_ITEMS.filter(i => i.type !== 'divider' && checked[i.id]).length
  const totalCount = CHECKLIST_ITEMS.filter(i => i.type !== 'divider').length
  const progress = (completedCount / totalCount) * 100

  const modules = [
    {
      number: 1,
      id: 'modulo1',
      title: '¿Qué es programar?',
      desc: 'Explicación súper simple. No vas a programar tú, solo entender la idea.',
      href: '/precurso/que-es-programar',
      duration: '15 min',
      emoji: '🤔'
    },
    {
      number: 2,
      id: 'modulo2',
      title: 'Frontend vs Backend',
      desc: 'La arquitectura web explicada con la analogía del restaurante.',
      href: '/precurso/frontend-backend',
      duration: '10 min',
      emoji: '🏗️'
    },
    {
      number: 3,
      id: 'modulo3',
      title: 'Instalar VS Code',
      desc: 'Tu editor de código. Donde verás lo que hace Claude Code.',
      href: '/precurso/vscode',
      duration: '15 min',
      emoji: '💻'
    },
    {
      number: 4,
      id: 'modulo4',
      title: 'Terminal Básico',
      desc: 'Los 10 comandos que necesitas. Claude ejecutará la mayoría por ti.',
      href: '/precurso/terminal',
      duration: '15 min',
      emoji: '⌨️'
    },
    {
      number: 5,
      id: 'modulo5',
      title: 'Instalar Node.js',
      desc: 'Instalación rápida + verificación. 3 pasos y listo.',
      href: '/precurso/nodejs',
      duration: '10 min',
      emoji: '⬢'
    },
    {
      number: 6,
      id: 'modulo6',
      title: 'Git y GitHub',
      desc: 'Guardar tu código en la nube. Lo esencial para empezar.',
      href: '/precurso/git-github',
      duration: '20 min',
      emoji: '🐙'
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <Head>
        <title>Precurso | Crea tu Software con IA</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Mobile header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #5e6ad2, #7c3aed)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '12px'
          }}>IA</div>
          <span style={{ fontWeight: 600, fontSize: '15px', color: '#1a1a2e' }}>Precurso</span>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            display: 'none',
            padding: '8px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
          className="mobile-menu-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>

        {/* Progress badge - desktop */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          background: progress === 100 ? '#dcfce7' : '#f1f5f9',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 500,
          color: progress === 100 ? '#166534' : '#64748b'
        }}>
          {progress === 100 ? '✅' : '📋'} {completedCount}/{totalCount}
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 57px)' }}>
        {/* Left Sidebar - Checklist */}
        <aside style={{
          width: '280px',
          background: 'white',
          borderRight: '1px solid #e2e8f0',
          padding: '24px 16px',
          position: 'sticky',
          top: '57px',
          height: 'calc(100vh - 57px)',
          overflowY: 'auto',
          flexShrink: 0
        }} className="sidebar-desktop">
          {/* Progress */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a2e' }}>Tu progreso</span>
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: progress === 100 ? '#22c55e' : '#5e6ad2'
              }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div style={{
              height: '6px',
              background: '#e2e8f0',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: progress === 100
                  ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                  : 'linear-gradient(90deg, #5e6ad2, #7c3aed)',
                borderRadius: '3px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {CHECKLIST_ITEMS.map(item => {
              if (item.type === 'divider') {
                return (
                  <div key={item.id} style={{
                    height: '1px',
                    background: '#e2e8f0',
                    margin: '12px 0'
                  }} />
                )
              }

              const isModule = item.type === 'module'
              return (
                <label
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: checked[item.id] ? '#f0fdf4' : 'transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked[item.id] || false}
                    onChange={() => toggle(item.id)}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: '#22c55e',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  />
                  <span style={{
                    fontSize: '13px',
                    color: checked[item.id] ? '#166534' : '#475569',
                    textDecoration: checked[item.id] ? 'line-through' : 'none',
                    fontWeight: isModule ? 500 : 400
                  }}>
                    {item.label}
                  </span>
                </label>
              )
            })}
          </div>

          {/* Completion message */}
          {progress === 100 && (
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid #86efac'
            }}>
              <span style={{ fontSize: '24px' }}>🎉</span>
              <p style={{
                margin: '8px 0 0 0',
                fontSize: '13px',
                fontWeight: 600,
                color: '#166534'
              }}>
                ¡Listo para la clase!
              </p>
            </div>
          )}

          {/* Help */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
              ¿Dudas? Escríbeme a{' '}
              <a href="mailto:josu@yenze.io" style={{ color: '#5e6ad2' }}>
                josu@yenze.io
              </a>
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: '32px 24px', maxWidth: '800px' }}>
          {/* Welcome */}
          <div style={{
            background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
            borderRadius: '16px',
            padding: '28px',
            marginBottom: '32px',
            border: '1px solid #c7d2fe'
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#3730a3',
              margin: '0 0 12px 0'
            }}>
              ¡Bienvenido! 🚀
            </h1>
            <p style={{
              fontSize: '15px',
              color: '#4338ca',
              margin: 0,
              lineHeight: 1.6
            }}>
              Estos módulos te preparan para la primera clase. <strong>Son cortitos y fáciles</strong> -
              no necesitas memorizar nada. Claude Code escribirá el código, tú solo tienes que entender la idea general.
            </p>
            <div style={{
              marginTop: '16px',
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              fontSize: '13px'
            }}>
              <span style={{ color: '#6366f1' }}>⏱️ ~1.5 horas total</span>
              <span style={{ color: '#6366f1' }}>📱 Hazlo a tu ritmo</span>
            </div>
          </div>

          {/* Modules */}
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#1a1a2e',
            marginBottom: '16px'
          }}>
            Módulos
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {modules.map(module => (
              <Link
                key={module.number}
                href={module.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px',
                  background: checked[module.id] ? '#f0fdf4' : 'white',
                  border: `1px solid ${checked[module.id] ? '#86efac' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: checked[module.id]
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0
                }}>
                  {checked[module.id] ? '✓' : module.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#1a1a2e',
                    margin: '0 0 4px 0'
                  }}>
                    {module.number}. {module.title}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: '#64748b',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {module.desc}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#94a3b8',
                  fontSize: '12px',
                  flexShrink: 0
                }}>
                  <span>{module.duration}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Accounts section */}
          <div style={{
            marginTop: '32px',
            padding: '24px',
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '12px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#1a1a2e',
              margin: '0 0 16px 0'
            }}>
              📋 Cuentas que necesitas crear
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { name: 'GitHub', url: 'https://github.com/signup', desc: 'Guardar tu código' },
                { name: 'Supabase', url: 'https://supabase.com', desc: 'Base de datos' },
                { name: 'Vercel', url: 'https://vercel.com/signup', desc: 'Publicar tu app' },
              ].map(account => (
                <a
                  key={account.name}
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 500, color: '#1a1a2e', fontSize: '14px' }}>{account.name}</span>
                    <span style={{ color: '#64748b', fontSize: '13px', marginLeft: '8px' }}>- {account.desc}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .sidebar-desktop {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  )
}

export default function PrecursoPage() {
  return (
    <PrecursoEmailGate>
      <PrecursoContent />
    </PrecursoEmailGate>
  )
}
