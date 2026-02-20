import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ThemeColors {
  bg: string
  bgSecondary: string
  bgTertiary: string
  text: string
  textSecondary: string
  textTertiary: string
  border: string
  borderHover: string
  accent: string
  accentHover: string
  glow: string
  glowStrong: string
  navBg: string
}

interface OnboardingChecklistProps {
  isDark: boolean
  t: ThemeColors
}

type Step = 'experiencia' | 'herramientas' | 'proyecto' | 'resultado'

interface Answers {
  experiencia: string | null
  nodeJs: boolean | null
  claudeCode: boolean | null
  claudePro: boolean | null
  proyecto: string | null
}

const STORAGE_KEY = 'autoguiado-onboarding'

export default function OnboardingChecklist({ isDark, t }: OnboardingChecklistProps) {
  const [visible, setVisible] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [step, setStep] = useState<Step>('experiencia')
  const [answers, setAnswers] = useState<Answers>({
    experiencia: null,
    nodeJs: null,
    claudeCode: null,
    claudePro: null,
    proyecto: null,
  })

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        if (data.completed) {
          setCompleted(true)
          setAnswers(data.answers || answers)
        }
      }
    } catch { /* ignore */ }
  }, [])

  const saveCompleted = (ans: Answers) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: true, answers: ans }))
    } catch { /* ignore */ }
    setCompleted(true)
  }

  const reset = () => {
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
    setCompleted(false)
    setVisible(true)
    setStep('experiencia')
    setAnswers({ experiencia: null, nodeJs: null, claudeCode: null, claudePro: null, proyecto: null })
  }

  // Count missing tools
  const missingTools: string[] = []
  if (answers.nodeJs === false) missingTools.push('Node.js')
  if (answers.claudeCode === false) missingTools.push('Claude Code')
  if (answers.claudePro === false) missingTools.push('Claude Pro')

  const allToolsReady = answers.nodeJs && answers.claudeCode && answers.claudePro
  const isReady = allToolsReady && answers.proyecto !== null

  // Collapsed state: show compact banner
  if (completed && !visible) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        background: allToolsReady
          ? (isDark ? 'rgba(34,197,94,0.08)' : '#ecfdf5')
          : (isDark ? 'rgba(251,191,36,0.08)' : '#fefce8'),
        border: `1px solid ${allToolsReady
          ? (isDark ? 'rgba(34,197,94,0.2)' : '#a7f3d0')
          : (isDark ? 'rgba(251,191,36,0.15)' : '#fde047')}`,
        borderRadius: '12px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>{allToolsReady ? '✅' : '⚠️'}</span>
          <span style={{
            fontSize: '14px',
            fontWeight: 600,
            color: allToolsReady
              ? (isDark ? '#4ade80' : '#065f46')
              : (isDark ? '#fbbf24' : '#92400e'),
          }}>
            {allToolsReady
              ? 'Preparacion completada — listo para el Modulo 0'
              : `Te falta: ${missingTools.join(', ')}`}
          </span>
        </div>
        <button
          onClick={reset}
          style={{
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 500,
            color: t.textTertiary,
            background: 'transparent',
            border: `1px solid ${t.border}`,
            borderRadius: '6px',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Repetir
        </button>
      </div>
    )
  }

  // Not started and not visible: show CTA to start
  if (!visible && !completed) {
    return (
      <div
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #1a1a2e, #16213e)'
            : 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
          border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : '#bae6fd'}`,
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🧭</div>
        <h3 style={{
          margin: '0 0 8px',
          fontSize: '18px',
          fontWeight: 700,
          color: t.text,
        }}>
          ¿Primera vez aqui?
        </h3>
        <p style={{
          margin: '0 0 20px',
          fontSize: '14px',
          color: t.textSecondary,
          lineHeight: 1.6,
          maxWidth: '460px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Comprueba en 1 minuto si tienes todo lo necesario para empezar.
          Te guiamos paso a paso.
        </p>
        <button
          onClick={() => setVisible(true)}
          style={{
            padding: '12px 28px',
            fontSize: '15px',
            fontWeight: 600,
            color: '#fff',
            background: t.accent,
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: `0 2px 8px ${t.glowStrong}`,
            transition: 'all 0.2s',
          }}
        >
          Comprobar preparacion
        </button>
      </div>
    )
  }

  // ===== Active checklist =====

  const cardStyle = {
    background: t.bgSecondary,
    border: `1px solid ${t.border}`,
    borderRadius: '14px',
    padding: '24px',
    marginBottom: '24px',
  }

  const optionBase = (selected: boolean) => ({
    display: 'block' as const,
    width: '100%',
    padding: '14px 16px',
    border: selected ? `2px solid ${t.accent}` : `1px solid ${t.border}`,
    borderRadius: '10px',
    background: selected ? (isDark ? 'rgba(99,102,241,0.1)' : '#eef2ff') : t.bgSecondary,
    cursor: 'pointer' as const,
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: selected ? 600 : 400,
    color: selected ? t.accent : t.text,
    textAlign: 'left' as const,
    transition: 'all 0.15s',
    marginBottom: '8px',
  })

  const progressSteps: Step[] = ['experiencia', 'herramientas', 'proyecto', 'resultado']
  const currentIdx = progressSteps.indexOf(step)

  return (
    <div style={{
      background: isDark
        ? 'linear-gradient(135deg, #1a1a2e, #16213e)'
        : 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
      border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : '#bae6fd'}`,
      borderRadius: '16px',
      padding: '28px',
      marginBottom: '24px',
    }}>
      {/* Header + progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🧭</span>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: t.text }}>
            Preparacion
          </h3>
        </div>
        <button
          onClick={() => { setVisible(false); if (!completed) setStep('experiencia') }}
          style={{
            padding: '4px 10px',
            fontSize: '12px',
            color: t.textTertiary,
            background: 'transparent',
            border: `1px solid ${t.border}`,
            borderRadius: '6px',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Cerrar
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {progressSteps.map((s, i) => (
          <div key={s} style={{
            flex: 1,
            height: '4px',
            borderRadius: '2px',
            background: i <= currentIdx
              ? t.accent
              : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'),
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      {/* STEP 1: Experiencia */}
      {step === 'experiencia' && (
        <div>
          <p style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600, color: t.text }}>
            ¿Cual es tu experiencia con programacion?
          </p>
          {[
            { id: 'ninguna', emoji: '🌱', label: 'Nunca he programado', desc: 'Y no pasa nada — este curso está hecho para ti' },
            { id: 'algo', emoji: '🌿', label: 'Se algo de programacion', desc: 'HTML, CSS, algo de JavaScript o similar' },
            { id: 'claude', emoji: '⚡', label: 'Ya he usado Claude Code', desc: 'He creado algo con IA anteriormente' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => {
                setAnswers(a => ({ ...a, experiencia: opt.id }))
                setTimeout(() => setStep('herramientas'), 300)
              }}
              style={optionBase(answers.experiencia === opt.id)}
            >
              <span style={{ marginRight: '8px' }}>{opt.emoji}</span>
              <strong>{opt.label}</strong>
              <span style={{ display: 'block', fontSize: '12px', color: t.textTertiary, marginTop: '2px', marginLeft: '26px' }}>
                {opt.desc}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* STEP 2: Herramientas */}
      {step === 'herramientas' && (
        <div>
          <p style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 600, color: t.text }}>
            ¿Tienes las herramientas instaladas?
          </p>
          <p style={{ margin: '0 0 20px', fontSize: '13px', color: t.textTertiary }}>
            Marca las que ya tengas. Si te falta alguna, te decimos como instalarla.
          </p>

          {/* Node.js */}
          <ToolCheck
            label="Node.js"
            description="El motor que necesita Claude Code para funcionar"
            command="node --version"
            helpText="Si no lo tienes, descárgalo de nodejs.org (versión LTS)"
            helpUrl="https://nodejs.org"
            checked={answers.nodeJs}
            onChange={val => setAnswers(a => ({ ...a, nodeJs: val }))}
            isDark={isDark}
            t={t}
          />
          {/* Claude Code */}
          <ToolCheck
            label="Claude Code"
            description="La herramienta de Anthropic que escribe código por ti"
            command="claude --version"
            helpText="Instálalo con: npm install -g @anthropic-ai/claude-code"
            checked={answers.claudeCode}
            onChange={val => setAnswers(a => ({ ...a, claudeCode: val }))}
            isDark={isDark}
            t={t}
          />
          {/* Claude Pro */}
          <ToolCheck
            label="Cuenta Claude Pro ($20/mes)"
            description="Necesaria para usar Claude Code — incluye acceso completo"
            helpText="Suscríbete en claude.ai → Upgrade to Pro"
            helpUrl="https://claude.ai"
            checked={answers.claudePro}
            onChange={val => setAnswers(a => ({ ...a, claudePro: val }))}
            isDark={isDark}
            t={t}
          />

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={() => setStep('experiencia')}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 500,
                color: t.textSecondary,
                background: 'transparent',
                border: `1px solid ${t.border}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              ← Atras
            </button>
            {answers.nodeJs !== null && answers.claudeCode !== null && answers.claudePro !== null && (
              <button
                onClick={() => setStep('proyecto')}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#fff',
                  background: t.accent,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Siguiente →
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: Proyecto */}
      {step === 'proyecto' && (
        <div>
          <p style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600, color: t.text }}>
            ¿Sabes que proyecto quieres crear?
          </p>
          {[
            { id: 'clara', emoji: '🎯', label: 'Si, tengo una idea clara', desc: 'Sé qué quiero construir y para quién' },
            { id: 'algo', emoji: '💭', label: 'Tengo algo en mente', desc: 'Pero necesito definirlo mejor' },
            { id: 'nada', emoji: '🔍', label: 'No tengo ni idea', desc: 'Y está totalmente bien — el curso te ayuda a encontrarla' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => {
                const newAnswers = { ...answers, proyecto: opt.id }
                setAnswers(newAnswers)
                setTimeout(() => {
                  setStep('resultado')
                  saveCompleted(newAnswers)
                }, 300)
              }}
              style={optionBase(answers.proyecto === opt.id)}
            >
              <span style={{ marginRight: '8px' }}>{opt.emoji}</span>
              <strong>{opt.label}</strong>
              <span style={{ display: 'block', fontSize: '12px', color: t.textTertiary, marginTop: '2px', marginLeft: '26px' }}>
                {opt.desc}
              </span>
            </button>
          ))}

          <button
            onClick={() => setStep('herramientas')}
            style={{
              marginTop: '12px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 500,
              color: t.textSecondary,
              background: 'transparent',
              border: `1px solid ${t.border}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            ← Atras
          </button>
        </div>
      )}

      {/* STEP 4: Resultado */}
      {step === 'resultado' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '36px' }}>{allToolsReady ? '🚀' : '🛠️'}</span>
          </div>

          {allToolsReady ? (
            <>
              <h4 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700, color: t.text, textAlign: 'center' }}>
                ¡Estas listo!
              </h4>
              <p style={{ margin: '0 0 20px', fontSize: '14px', color: t.textSecondary, textAlign: 'center', lineHeight: 1.6 }}>
                Tienes todas las herramientas instaladas.
                {answers.proyecto === 'nada'
                  ? ' No te preocupes por no tener idea de proyecto — en el Modulo 0 y la primera clase te ayudamos a encontrarla.'
                  : answers.proyecto === 'algo'
                    ? ' Tu idea se irá definiendo conforme avances. Lo importante es empezar.'
                    : ' Genial que ya tengas tu idea. Vamos a hacerla realidad.'}
              </p>
              <div style={{ textAlign: 'center' }}>
                <Link href="/curso-crea-tu-software/modulo/0" style={{
                  display: 'inline-block',
                  padding: '14px 32px',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#fff',
                  background: '#059669',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 12px rgba(5, 150, 105, 0.3)',
                }}>
                  Empezar Modulo 0 →
                </Link>
              </div>
            </>
          ) : (
            <>
              <h4 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700, color: t.text, textAlign: 'center' }}>
                Casi listo — te falta:
              </h4>
              <div style={{ maxWidth: '400px', margin: '0 auto 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {!answers.nodeJs && (
                  <MissingToolCard
                    emoji="📦"
                    label="Instalar Node.js"
                    action="Descargar de nodejs.org (version LTS)"
                    url="https://nodejs.org"
                    isDark={isDark}
                    t={t}
                  />
                )}
                {!answers.claudeCode && (
                  <MissingToolCard
                    emoji="🤖"
                    label="Instalar Claude Code"
                    action="npm install -g @anthropic-ai/claude-code"
                    isDark={isDark}
                    t={t}
                  />
                )}
                {!answers.claudePro && (
                  <MissingToolCard
                    emoji="💳"
                    label="Cuenta Claude Pro"
                    action="Suscribete en claude.ai → Upgrade to Pro"
                    url="https://claude.ai"
                    isDark={isDark}
                    t={t}
                  />
                )}
              </div>
              <p style={{ margin: '0 0 16px', fontSize: '13px', color: t.textTertiary, textAlign: 'center' }}>
                Instala lo que te falta y vuelve cuando estes listo.
                Tambien puedes leer el Modulo 0 mientras tanto.
              </p>
              <div style={{ textAlign: 'center' }}>
                <Link href="/curso-crea-tu-software/modulo/0" style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: t.accent,
                  background: isDark ? 'rgba(99,102,241,0.1)' : '#eef2ff',
                  border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : '#c7d2fe'}`,
                  borderRadius: '10px',
                  textDecoration: 'none',
                }}>
                  Ver Modulo 0 de todas formas →
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ===== Sub-components =====

function ToolCheck({ label, description, command, helpText, helpUrl, checked, onChange, isDark, t }: {
  label: string
  description: string
  command?: string
  helpText: string
  helpUrl?: string
  checked: boolean | null
  onChange: (val: boolean) => void
  isDark: boolean
  t: ThemeColors
}) {
  return (
    <div style={{
      padding: '16px',
      border: `1px solid ${checked === true ? (isDark ? 'rgba(34,197,94,0.3)' : '#a7f3d0') : checked === false ? (isDark ? 'rgba(239,68,68,0.3)' : '#fecaca') : t.border}`,
      borderRadius: '10px',
      marginBottom: '10px',
      background: checked === true
        ? (isDark ? 'rgba(34,197,94,0.05)' : '#f0fdf4')
        : checked === false
          ? (isDark ? 'rgba(239,68,68,0.05)' : '#fef2f2')
          : t.bgSecondary,
      transition: 'all 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: 600, color: t.text }}>{label}</p>
          <p style={{ margin: 0, fontSize: '12px', color: t.textTertiary }}>{description}</p>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => onChange(true)}
            style={{
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: 600,
              color: checked === true ? '#fff' : (isDark ? '#4ade80' : '#059669'),
              background: checked === true ? '#059669' : 'transparent',
              border: `1px solid ${checked === true ? '#059669' : (isDark ? 'rgba(34,197,94,0.3)' : '#a7f3d0')}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            ✓ Lo tengo
          </button>
          <button
            onClick={() => onChange(false)}
            style={{
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: 600,
              color: checked === false ? '#fff' : (isDark ? '#f87171' : '#dc2626'),
              background: checked === false ? '#dc2626' : 'transparent',
              border: `1px solid ${checked === false ? '#dc2626' : (isDark ? 'rgba(239,68,68,0.3)' : '#fecaca')}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            No
          </button>
        </div>
      </div>

      {/* Command hint */}
      {command && checked === null && (
        <div style={{
          marginTop: '10px',
          padding: '8px 12px',
          background: isDark ? 'rgba(0,0,0,0.3)' : '#f8fafc',
          borderRadius: '6px',
          fontSize: '12px',
          color: t.textTertiary,
        }}>
          Compruebalo: abre el terminal y escribe <code style={{
            padding: '2px 6px',
            background: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
            borderRadius: '4px',
            fontFamily: "'JetBrains Mono', monospace",
          }}>{command}</code>
        </div>
      )}

      {/* Help when missing */}
      {checked === false && (
        <div style={{
          marginTop: '10px',
          padding: '10px 12px',
          background: isDark ? 'rgba(251,191,36,0.08)' : '#fefce8',
          border: `1px solid ${isDark ? 'rgba(251,191,36,0.15)' : '#fde047'}`,
          borderRadius: '6px',
          fontSize: '13px',
          color: isDark ? '#fbbf24' : '#92400e',
          lineHeight: 1.5,
        }}>
          {helpUrl ? (
            <a href={helpUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontWeight: 600 }}>
              {helpText} →
            </a>
          ) : (
            <span>{helpText}</span>
          )}
        </div>
      )}
    </div>
  )
}

function MissingToolCard({ emoji, label, action, url, isDark, t }: {
  emoji: string
  label: string
  action: string
  url?: string
  isDark: boolean
  t: ThemeColors
}) {
  return (
    <div style={{
      padding: '14px 16px',
      background: isDark ? 'rgba(251,191,36,0.06)' : '#fffbeb',
      border: `1px solid ${isDark ? 'rgba(251,191,36,0.15)' : '#fde68a'}`,
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <span style={{ fontSize: '20px' }}>{emoji}</span>
      <div>
        <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: 600, color: t.text }}>{label}</p>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" style={{
            fontSize: '13px',
            color: isDark ? '#fbbf24' : '#b45309',
            textDecoration: 'underline',
          }}>
            {action}
          </a>
        ) : (
          <code style={{
            fontSize: '12px',
            color: isDark ? '#fbbf24' : '#92400e',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {action}
          </code>
        )}
      </div>
    </div>
  )
}
