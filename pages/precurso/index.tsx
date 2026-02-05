import Head from 'next/head'
import Link from 'next/link'
import PrecursoEmailGate from '../../components/PrecursoEmailGate'
import { useState, useEffect } from 'react'

// Checklist items with localStorage persistence
const CHECKLIST_ITEMS = [
  { id: 'vscode', label: 'VS Code instalado y en español' },
  { id: 'nodejs', label: 'Node.js instalado (verificar con node -v)' },
  { id: 'git', label: 'Git instalado (verificar con git --version)' },
  { id: 'github', label: 'Cuenta de GitHub creada' },
  { id: 'supabase', label: 'Cuenta de Supabase creada' },
  { id: 'vercel', label: 'Cuenta de Vercel creada' },
  { id: 'claudepro', label: 'Suscripción Claude Pro activa' },
  { id: 'claudecode', label: 'Claude Code instalado' },
  { id: 'proyecto', label: 'Documento de proyecto completado' },
  { id: 'terminal', label: 'Terminal básico: sabes usar cd, ls, mkdir' },
  { id: 'gitbasico', label: 'Git básico: sabes hacer git add, commit, push' },
  { id: 'videos', label: 'Has visto todos los vídeos del pre-curso' }
]

function ProgressChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const saved = localStorage.getItem('precurso-checklist')
    if (saved) {
      setChecked(JSON.parse(saved))
    }
  }, [])

  const toggle = (id: string) => {
    const newChecked = { ...checked, [id]: !checked[id] }
    setChecked(newChecked)
    localStorage.setItem('precurso-checklist', JSON.stringify(newChecked))
  }

  const completedCount = Object.values(checked).filter(Boolean).length
  const progress = (completedCount / CHECKLIST_ITEMS.length) * 100

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '28px',
      marginBottom: '32px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0, color: '#1a1a2e' }}>
          Checklist de Verificación
        </h3>
        <span style={{
          fontSize: '14px',
          fontWeight: 600,
          color: progress === 100 ? '#22c55e' : '#5e6ad2'
        }}>
          {completedCount}/{CHECKLIST_ITEMS.length}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{
        height: '8px',
        background: '#e2e8f0',
        borderRadius: '4px',
        marginBottom: '24px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: progress === 100
            ? 'linear-gradient(90deg, #22c55e, #16a34a)'
            : 'linear-gradient(90deg, #5e6ad2, #7c3aed)',
          borderRadius: '4px',
          transition: 'width 0.3s ease'
        }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {CHECKLIST_ITEMS.map(item => (
          <label
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '8px',
              background: checked[item.id] ? '#f0fdf4' : '#f8fafc',
              border: `1px solid ${checked[item.id] ? '#bbf7d0' : '#e2e8f0'}`,
              transition: 'all 0.2s ease'
            }}
          >
            <input
              type="checkbox"
              checked={checked[item.id] || false}
              onChange={() => toggle(item.id)}
              style={{
                width: '20px',
                height: '20px',
                accentColor: '#22c55e',
                cursor: 'pointer'
              }}
            />
            <span style={{
              fontSize: '14px',
              color: checked[item.id] ? '#15803d' : '#475569',
              textDecoration: checked[item.id] ? 'line-through' : 'none'
            }}>
              {item.label}
            </span>
          </label>
        ))}
      </div>

      {progress === 100 && (
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '24px' }}>🎉</span>
          <p style={{
            margin: '8px 0 0 0',
            fontWeight: 600,
            color: '#15803d'
          }}>
            ¡Estás listo para la primera clase!
          </p>
        </div>
      )}
    </div>
  )
}

function PrecursoContent() {
  const modules = [
    {
      number: 1,
      title: 'Qué es Programar',
      desc: 'Entiende los conceptos básicos del software',
      href: '/precurso/que-es-programar',
      duration: '45 min'
    },
    {
      number: 2,
      title: 'Frontend, Backend y Bases de Datos',
      desc: 'La arquitectura de las aplicaciones modernas',
      href: '/precurso/frontend-backend',
      duration: '25 min'
    },
    {
      number: 3,
      title: 'Instalar VS Code',
      desc: 'Tu editor de código principal',
      href: '/precurso/vscode',
      duration: '20 min'
    },
    {
      number: 4,
      title: 'Terminal Básico',
      desc: 'Comandos esenciales que usarás a diario',
      href: '/precurso/terminal',
      duration: '30 min'
    },
    {
      number: 5,
      title: 'Instalar Node.js',
      desc: 'El runtime de JavaScript',
      href: '/precurso/nodejs',
      duration: '20 min'
    },
    {
      number: 6,
      title: 'Git y GitHub',
      desc: 'Control de versiones y colaboración',
      href: '/precurso/git-github',
      duration: '60 min'
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafbfc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <Head>
        <title>Precurso | Crea tu Negocio Digital con IA</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link href="/precurso" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#1a1a2e'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #5e6ad2, #7c3aed)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '14px'
            }}>IA</div>
            <span style={{ fontWeight: 600 }}>Precurso</span>
          </Link>
          <span style={{
            fontSize: '13px',
            color: '#64748b',
            background: '#f1f5f9',
            padding: '6px 12px',
            borderRadius: '6px'
          }}>
            Zona privada
          </span>
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Welcome banner */}
        <div style={{
          background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '40px',
          border: '1px solid #c7d2fe'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#3730a3',
            marginBottom: '12px'
          }}>
            Bienvenido al Precurso 🚀
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#4338ca',
            margin: 0,
            lineHeight: 1.6
          }}>
            Antes de la primera clase, completa estos módulos para tener las bases necesarias.
            Hemos curado los mejores recursos gratuitos en español para los fundamentos.
          </p>
        </div>

        {/* Checklist */}
        <ProgressChecklist />

        {/* Modules */}
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#1a1a2e',
          marginBottom: '20px'
        }}>
          Módulos del Precurso
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
                padding: '20px 24px',
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = '#5e6ad2'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(94, 106, 210, 0.15)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = '#e2e8f0'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '16px',
                color: '#5e6ad2',
                flexShrink: 0
              }}>
                {module.number}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1a1a2e',
                  margin: '0 0 4px 0'
                }}>
                  {module.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#64748b',
                  margin: 0
                }}>
                  {module.desc}
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#64748b',
                fontSize: '13px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {module.duration}
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          ))}
        </div>

        {/* Help section */}
        <div style={{
          marginTop: '48px',
          padding: '24px',
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            ¿Tienes dudas? Escríbeme a{' '}
            <a href="mailto:josu@yenze.io" style={{ color: '#5e6ad2', fontWeight: 500 }}>
              josu@yenze.io
            </a>
          </p>
        </div>
      </main>
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
