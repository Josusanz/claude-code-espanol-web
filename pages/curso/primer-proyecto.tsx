import Link from 'next/link'
import { useState } from 'react'
import Modulo0Layout from '../../components/Modulo0Layout'
import { usePrecursoProgress } from '../../lib/precurso-data'

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
    <>
        {/* Progress */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', color: '#64748b' }}>
              Paso {currentStep + 1} de {PASOS.length}
            </span>
            <span style={{ fontSize: '14px', color: '#94a3b8' }}>
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
                  background: index <= currentStep ? '#5e6ad2' : '#f1f5f9',
                  transition: 'background 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Step card */}
        <div style={{
          background: paso.final ? '#f0fdf4' : 'white',
          borderRadius: '20px',
          padding: '40px 32px',
          border: `1px solid ${paso.final ? '#22c55e' : 'rgba(0,0,0,0.06)'}`
        }}>
          {/* Step number */}
          {!paso.final && (
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#5e6ad2',
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
            color: paso.final ? '#22c55e' : '#1e293b'
          }}>
            {paso.titulo}
          </h2>

          <p style={{
            fontSize: '17px',
            color: '#64748b',
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
                  background: '#f1f5f9',
                  borderRadius: '10px',
                  marginBottom: '10px'
                }}>
                  <span style={{ fontSize: '20px' }}>
                    {inst.os === 'macOS' ? '🍎' : inst.os === 'Windows' ? '🪟' : '🐧'}
                  </span>
                  <div>
                    <strong style={{ color: '#1e293b' }}>{inst.os}:</strong>
                    <span style={{ color: '#64748b', marginLeft: '8px' }}>{inst.text}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Command */}
          {paso.comando && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
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
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
                ESCRIBE ESTO A CLAUDE:
              </div>
              <div style={{
                background: '#eef2ff',
                borderRadius: '12px',
                padding: '20px',
                border: '2px solid #5e6ad2',
                fontSize: '16px',
                color: '#1e293b',
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
              background: '#f1f5f9',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
                RESULTADO ESPERADO:
              </div>
              <pre style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '14px',
                color: '#64748b',
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
              background: '#fafbfc',
              borderRadius: '10px',
              marginBottom: '28px'
            }}>
              <span style={{ fontSize: '20px' }}>💡</span>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
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
                background: '#5e6ad2',
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
              <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '24px' }}>
                Has creado tu primera página web con Claude Code usando "vibe coding" — describir lo que quieres y dejar que la IA lo construya.<br />
                <strong>¡Ya estás listo para empezar el curso!</strong>
              </p>
              <Link href="/curso/semana/1" style={{
                display: 'inline-block',
                padding: '18px 48px',
                background: '#22c55e',
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
              background: 'white',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '10px',
              color: currentStep === 0 ? '#94a3b8' : '#64748b',
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
                  border: `2px solid ${idx === currentStep ? '#5e6ad2' : 'rgba(0,0,0,0.06)'}`,
                  background: completedSteps.includes(idx + 1) ? '#22c55e' : (idx === currentStep ? '#eef2ff' : '#fafbfc'),
                  color: completedSteps.includes(idx + 1) ? 'white' : '#1e293b',
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
              background: 'white',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '10px',
              color: currentStep === PASOS.length - 1 ? '#94a3b8' : '#64748b',
              fontSize: '14px',
              cursor: currentStep === PASOS.length - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Siguiente →
          </button>
        </div>

        {/* Back link */}
        <div style={{ marginTop: '32px' }}>
          <Link href="/curso/quiz" style={{
            padding: '14px 24px',
            background: 'white',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '12px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 500
          }}>
            ← Volver al quiz
          </Link>
        </div>
    </>
  )
}

export default function PrimerProyectoPage() {
  return (
    <Modulo0Layout title="Tu primer proyecto">
      <PrimerProyectoContent />
    </Modulo0Layout>
  )
}
