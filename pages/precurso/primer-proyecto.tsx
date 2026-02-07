import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import PrecursoEmailGate from '../../components/PrecursoEmailGate'
import { usePrecursoProgress, useTheme } from './index'

const themes = {
  light: {
    bg: '#ffffff',
    bgSecondary: '#f8fafc',
    bgTertiary: '#f1f5f9',
    text: '#1e293b',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    border: '#e2e8f0',
    accent: '#6366f1',
    accentLight: '#eef2ff',
    success: '#22c55e',
    successLight: '#f0fdf4',
  },
  dark: {
    bg: '#0f172a',
    bgSecondary: '#1e293b',
    bgTertiary: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    border: '#334155',
    accent: '#818cf8',
    accentLight: 'rgba(129, 140, 248, 0.1)',
    success: '#4ade80',
    successLight: 'rgba(74, 222, 128, 0.1)',
  }
}

const PASOS = [
  {
    id: 1,
    titulo: 'Abre el Terminal',
    descripcion: 'Primero necesitamos abrir la terminal donde escribiremos comandos.',
    instrucciones: [
      { os: 'macOS', text: 'Pulsa Cmd + Espacio, escribe "Terminal" y pulsa Enter' },
      { os: 'Windows', text: 'Pulsa Win + R, escribe "cmd" y pulsa Enter' },
      { os: 'Linux', text: 'Pulsa Ctrl + Alt + T' }
    ],
    comando: null,
    resultado: null,
    tip: 'Si ya lo tienes abierto de antes, ¡perfecto!'
  },
  {
    id: 2,
    titulo: 'Crea una carpeta para el proyecto',
    descripcion: 'Vamos a crear una carpeta donde vivirá tu primer proyecto.',
    instrucciones: null,
    comando: 'mkdir mi-primer-proyecto && cd mi-primer-proyecto',
    resultado: null,
    tip: 'Este comando crea la carpeta y entra en ella automáticamente.'
  },
  {
    id: 3,
    titulo: 'Inicia Claude Code',
    descripcion: 'Ahora vamos a abrir Claude Code en esta carpeta.',
    instrucciones: null,
    comando: 'claude',
    resultado: '╭─────────────────────────────────────────────╮\n│   ✨ Welcome to Claude Code!                │\n╰─────────────────────────────────────────────╯',
    tip: 'Si ves este mensaje, ¡Claude Code está funcionando!'
  },
  {
    id: 4,
    titulo: 'Pide tu primera página web',
    descripcion: 'Ahora viene lo mágico. Vamos a pedirle a Claude que cree una página web.',
    instrucciones: null,
    comando: null,
    prompt: 'Crea una página web simple que diga "¡Hola Mundo!" con un diseño bonito. El fondo debe ser azul oscuro y el texto blanco centrado.',
    resultado: 'Claude creará un archivo index.html con tu página',
    tip: 'Puedes escribir en español, Claude te entiende perfectamente.'
  },
  {
    id: 5,
    titulo: 'Mira lo que Claude ha creado',
    descripcion: 'Claude habrá creado un archivo index.html. Vamos a verlo.',
    instrucciones: null,
    comando: null,
    prompt: 'Abre el archivo index.html en el navegador',
    resultado: 'Se abrirá tu navegador mostrando "¡Hola Mundo!"',
    tip: 'También puedes abrir el archivo haciendo doble clic en él desde el Finder/Explorador.'
  },
  {
    id: 6,
    titulo: 'Pide un cambio',
    descripcion: 'Ahora vamos a pedirle a Claude que modifique algo.',
    instrucciones: null,
    comando: null,
    prompt: 'Añade un botón que cuando lo pulses muestre una alerta diciendo "¡Funciona!"',
    resultado: 'Claude modificará el archivo para añadir el botón',
    tip: 'Así es como trabajarás: pides cambios en español y Claude los implementa.'
  },
  {
    id: 7,
    titulo: '¡Felicidades! 🎉',
    descripcion: 'Has completado tu primer proyecto con Claude Code.',
    instrucciones: null,
    comando: null,
    prompt: null,
    resultado: null,
    tip: null,
    final: true
  }
]

function PrimerProyectoContent() {
  const { completed, toggle } = usePrecursoProgress()
  const { theme, toggleTheme } = useTheme()
  const t = themes[theme]

  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const paso = PASOS[currentStep]

  const markComplete = () => {
    if (!completedSteps.includes(paso.id)) {
      setCompletedSteps([...completedSteps, paso.id])
    }
    if (currentStep < PASOS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else if (!completed['primer-proyecto']) {
      toggle('primer-proyecto')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: t.text
    }}>
      <Head>
        <title>Tu Primer Proyecto | Precurso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: t.bg,
        borderBottom: `1px solid ${t.border}`,
        padding: '16px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/precurso" style={{
            color: t.textMuted,
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
          <span style={{ fontWeight: 600, fontSize: '17px' }}>Tu primer proyecto</span>
          <span style={{
            background: t.accentLight,
            color: t.accent,
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            ⏱️ 10 min
          </span>
        </div>

        <button
          onClick={toggleTheme}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            border: `1px solid ${t.border}`,
            background: t.bgSecondary,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px'
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Progress */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', color: t.textSecondary }}>
              Paso {currentStep + 1} de {PASOS.length}
            </span>
            <span style={{ fontSize: '14px', color: t.textMuted }}>
              {completedSteps.length} completados
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {PASOS.map((_, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  height: '6px',
                  borderRadius: '3px',
                  background: index <= currentStep ? t.accent : t.bgTertiary,
                  transition: 'background 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Step card */}
        <div style={{
          background: paso.final ? t.successLight : t.bgSecondary,
          borderRadius: '20px',
          padding: '40px 32px',
          border: `1px solid ${paso.final ? t.success : t.border}`
        }}>
          {/* Step number */}
          {!paso.final && (
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: t.accent,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '20px'
            }}>
              {paso.id}
            </div>
          )}

          {paso.final && (
            <div style={{ fontSize: '64px', marginBottom: '20px', textAlign: 'center' }}>
              🎉
            </div>
          )}

          <h2 style={{
            fontSize: paso.final ? '32px' : '28px',
            fontWeight: 700,
            marginBottom: '16px',
            textAlign: paso.final ? 'center' : 'left',
            color: paso.final ? t.success : t.text
          }}>
            {paso.titulo}
          </h2>

          <p style={{
            fontSize: '17px',
            color: t.textSecondary,
            lineHeight: 1.7,
            marginBottom: '28px',
            textAlign: paso.final ? 'center' : 'left'
          }}>
            {paso.descripcion}
          </p>

          {/* OS Instructions */}
          {paso.instrucciones && (
            <div style={{ marginBottom: '24px' }}>
              {paso.instrucciones.map((inst, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  background: t.bgTertiary,
                  borderRadius: '10px',
                  marginBottom: '10px'
                }}>
                  <span style={{ fontSize: '20px' }}>
                    {inst.os === 'macOS' ? '🍎' : inst.os === 'Windows' ? '🪟' : '🐧'}
                  </span>
                  <div>
                    <strong style={{ color: t.text }}>{inst.os}:</strong>
                    <span style={{ color: t.textSecondary, marginLeft: '8px' }}>{inst.text}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Command */}
          {paso.comando && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: t.textMuted, marginBottom: '8px' }}>
                ESCRIBE ESTE COMANDO:
              </div>
              <div style={{
                background: '#1e1e1e',
                borderRadius: '12px',
                padding: '20px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '15px',
                color: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <code>$ {paso.comando}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(paso.comando!)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  📋 Copiar
                </button>
              </div>
            </div>
          )}

          {/* Prompt */}
          {paso.prompt && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: t.textMuted, marginBottom: '8px' }}>
                ESCRIBE ESTO A CLAUDE:
              </div>
              <div style={{
                background: t.accentLight,
                borderRadius: '12px',
                padding: '20px',
                border: `2px solid ${t.accent}`,
                fontSize: '16px',
                color: t.text,
                lineHeight: 1.6,
                fontStyle: 'italic'
              }}>
                "{paso.prompt}"
              </div>
            </div>
          )}

          {/* Result */}
          {paso.resultado && (
            <div style={{
              background: t.bgTertiary,
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: t.textMuted, marginBottom: '8px' }}>
                RESULTADO ESPERADO:
              </div>
              <pre style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '14px',
                color: t.textSecondary,
                margin: 0,
                whiteSpace: 'pre-wrap'
              }}>
                {paso.resultado}
              </pre>
            </div>
          )}

          {/* Tip */}
          {paso.tip && (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '16px',
              background: t.bg,
              borderRadius: '10px',
              marginBottom: '28px'
            }}>
              <span style={{ fontSize: '20px' }}>💡</span>
              <p style={{ fontSize: '14px', color: t.textMuted, margin: 0, lineHeight: 1.6 }}>
                {paso.tip}
              </p>
            </div>
          )}

          {/* Action button */}
          {!paso.final ? (
            <button
              onClick={markComplete}
              style={{
                width: '100%',
                padding: '18px',
                background: t.accent,
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '17px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              ✓ Hecho, siguiente paso
            </button>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '18px', color: t.textSecondary, marginBottom: '24px' }}>
                Has creado tu primera página web con Claude Code.<br />
                <strong>¡Ya estás listo para empezar el curso!</strong>
              </p>
              <Link href="/empezar/introduccion" style={{
                display: 'inline-block',
                padding: '18px 48px',
                background: t.success,
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '17px',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                🚀 Empezar el curso
              </Link>
            </div>
          )}
        </div>

        {/* Step navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '24px'
        }}>
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            style={{
              padding: '12px 20px',
              background: t.bgSecondary,
              border: `1px solid ${t.border}`,
              borderRadius: '10px',
              color: currentStep === 0 ? t.textMuted : t.textSecondary,
              fontSize: '14px',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            ← Anterior
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            {PASOS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: `2px solid ${idx === currentStep ? t.accent : t.border}`,
                  background: completedSteps.includes(idx + 1) ? t.success : (idx === currentStep ? t.accentLight : t.bg),
                  color: completedSteps.includes(idx + 1) ? 'white' : t.text,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {completedSteps.includes(idx + 1) ? '✓' : idx + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentStep(Math.min(PASOS.length - 1, currentStep + 1))}
            disabled={currentStep === PASOS.length - 1}
            style={{
              padding: '12px 20px',
              background: t.bgSecondary,
              border: `1px solid ${t.border}`,
              borderRadius: '10px',
              color: currentStep === PASOS.length - 1 ? t.textMuted : t.textSecondary,
              fontSize: '14px',
              cursor: currentStep === PASOS.length - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Siguiente →
          </button>
        </div>

        {/* Back link */}
        <div style={{ marginTop: '32px' }}>
          <Link href="/precurso/quiz" style={{
            padding: '14px 24px',
            background: t.bgSecondary,
            border: `1px solid ${t.border}`,
            borderRadius: '12px',
            color: t.textSecondary,
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 500
          }}>
            ← Volver al quiz
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function PrimerProyectoPage() {
  return (
    <PrecursoEmailGate>
      <PrimerProyectoContent />
    </PrecursoEmailGate>
  )
}
