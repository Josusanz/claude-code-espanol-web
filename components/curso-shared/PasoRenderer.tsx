import React, { useState } from 'react'
import { THEMES } from '../../lib/themes-data'
import type { PasoClase, BloqueCodigo } from '../../lib/curso-pizarra-data'
import { CopyButton } from './ContentRenderer'

// ============= CodeBlock =============

export function CodeBlock({ codigo, label }: { codigo: string; label?: string }) {
  const [copiado, setCopiado] = useState(false)
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(codigo)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = codigo
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div style={{ position: 'relative', marginTop: '8px' }}>
      {label && (
        <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px', fontWeight: 500 }}>{label}</div>
      )}
      <div style={{
        position: 'relative',
        background: '#0f172a',
        borderRadius: '8px',
        padding: '14px 60px 14px 16px',
        overflow: 'auto',
      }}>
        <button
          onClick={copiar}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            padding: '6px 12px',
            background: copiado ? '#22c55e' : 'rgba(255,255,255,0.1)',
            color: copiado ? 'white' : '#94a3b8',
            border: `1px solid ${copiado ? '#22c55e' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'inherit',
          }}
        >
          {copiado ? '✓ Copiado' : 'Copiar'}
        </button>
        <pre style={{
          margin: 0,
          fontSize: '13px',
          lineHeight: 1.7,
          color: '#e2e8f0',
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {codigo}
        </pre>
      </div>
    </div>
  )
}

// ============= BloqueCodigoComponent =============

export function BloqueCodigoComponent({ bloque }: { bloque: BloqueCodigo }) {
  return (
    <div style={{ position: 'relative', marginTop: '12px' }}>
      {bloque.archivo && (
        <div style={{
          background: '#1e293b',
          padding: '6px 14px',
          borderRadius: '8px 8px 0 0',
          fontSize: '12px',
          color: '#94a3b8',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {bloque.archivo}
        </div>
      )}
      <div style={{
        position: 'relative',
        background: '#0f172a',
        borderRadius: bloque.archivo ? '0 0 8px 8px' : '8px',
        padding: '16px 60px 16px 16px',
        overflow: 'auto',
      }}>
        <CopyButton texto={bloque.codigo} />
        <pre style={{
          margin: 0,
          fontSize: '14px',
          lineHeight: 1.7,
          color: '#e2e8f0',
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {bloque.codigo}
        </pre>
      </div>
    </div>
  )
}

// ============= StepNumber =============

function StepNumber({ n, done }: { n: number; done: boolean }) {
  return (
    <div style={{
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: done ? '#22c55e' : '#e2e8f0',
      color: done ? 'white' : '#64748b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 700,
      flexShrink: 0,
    }}>
      {done ? '✓' : n}
    </div>
  )
}

// ============= Dia2Setup =============

const CATEGORIA_COLORS: Record<string, { bg: string; text: string }> = {
  Landing: { bg: '#dbeafe', text: '#1e40af' },
  Dashboard: { bg: '#fce7f3', text: '#9d174d' },
  SaaS: { bg: '#d1fae5', text: '#065f46' },
  Blog: { bg: '#fef3c7', text: '#92400e' },
  Portfolio: { bg: '#ede9fe', text: '#5b21b6' },
  Docs: { bg: '#e0e7ff', text: '#3730a3' },
}

const TONOS = [
  { id: 'profesional', label: 'Profesional', desc: 'Serio, confiable, corporativo' },
  { id: 'moderno', label: 'Moderno y fresco', desc: 'Startup, tech, innovador' },
  { id: 'cercano', label: 'Cercano y cálido', desc: 'Amigable, personal, humano' },
  { id: 'bold', label: 'Bold y atrevido', desc: 'Impactante, disruptivo, llamativo' },
]

export function Dia2Setup() {
  const [selectedTheme, setSelectedTheme] = useState('')
  const [projectName, setProjectName] = useState('')
  const [nombre, setNombre] = useState('')
  const [queHace, setQueHace] = useState('')
  const [paraQuien, setParaQuien] = useState('')
  const [beneficios, setBeneficios] = useState('')
  const [tono, setTono] = useState('moderno')
  const [colores, setColores] = useState('')

  const theme = THEMES.find(t => t.slug === selectedTheme)
  const folder = projectName || (selectedTheme ? `mi-${selectedTheme.replace(/-next$/, '')}` : 'mi-proyecto')

  const step1Done = !!selectedTheme
  const step2Done = step1Done && !!folder
  const step3Done = step2Done
  const step4Done = !!nombre && !!queHace && !!paraQuien && !!beneficios

  const prompt = `Mira la web actual y personalízala completamente para mi proyecto.

## Mi proyecto
- **Nombre**: ${nombre || '[nombre de tu proyecto]'}
- **Qué es**: ${queHace || '[descripción del producto]'}
- **Para quién**: ${paraQuien || '[tu público objetivo]'}

## Beneficios principales que quiero destacar
${beneficios ? beneficios.split('\n').filter(l => l.trim()).map(l => `- ${l.trim()}`).join('\n') : '- [beneficio 1]\n- [beneficio 2]\n- [beneficio 3]'}

## Estilo y tono
- Tono: ${TONOS.find(t => t.id === tono)?.label || 'Moderno y fresco'}${colores ? `\n- Colores preferidos: ${colores}` : ''}

## Lo que necesito que hagas
1. Cambia el título del hero por algo que enganche y describa "${nombre || 'mi producto'}"
2. Cambia el subtítulo por una frase que explique el valor para ${paraQuien || 'mi público'}
3. Reemplaza los textos de features/beneficios por los míos
4. Añade un formulario de captura de email (input + botón "Unirme a la waitlist") bien visible en el hero o justo debajo. Si ya existe un formulario, asegúrate de que funcione
5. Adapta el footer con el nombre del proyecto
6. Mantén el diseño profesional del theme, solo personaliza el contenido y los textos`

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: '#1e293b',
    background: 'white',
    outline: 'none',
  } as const

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600 as const,
    color: '#374151',
    marginBottom: '6px',
  }

  const hintStyle = {
    fontSize: '12px',
    color: '#9ca3af',
    marginTop: '4px',
    lineHeight: 1.4,
    margin: '4px 0 0',
  }

  const sectionStyle = {
    padding: '20px',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    background: '#fafafa',
  }

  return (
    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column' as const, gap: '20px' }}>
      {/* PASO 1: Theme */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <StepNumber n={1} done={step1Done} />
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>¿Qué theme elegiste en la pre-clase?</div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: '8px',
        }}>
          {THEMES.map(t => {
            const cat = CATEGORIA_COLORS[t.categoria] || { bg: '#f1f5f9', text: '#475569' }
            return (
              <button
                key={t.slug}
                onClick={() => {
                  setSelectedTheme(t.slug)
                  setProjectName(`mi-${t.slug.replace(/-next$/, '')}`)
                }}
                style={{
                  padding: '10px 8px',
                  border: selectedTheme === t.slug ? '2px solid #6366f1' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: selectedTheme === t.slug ? '#eef2ff' : 'white',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 600, color: selectedTheme === t.slug ? '#4338ca' : '#374151' }}>
                  {t.nombre}
                </div>
                <span style={{
                  display: 'inline-block',
                  marginTop: '4px',
                  fontSize: '10px',
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: cat.bg,
                  color: cat.text,
                }}>
                  {t.categoria}
                </span>
              </button>
            )
          })}
        </div>
        {theme && (
          <div style={{
            marginTop: '12px',
            padding: '12px 16px',
            background: '#eef2ff',
            borderRadius: '8px',
            border: '1px solid #c7d2fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            <div>
              <span style={{ fontWeight: 600, color: '#4338ca', fontSize: '14px' }}>{theme.nombre}</span>
              <span style={{ color: '#6366f1', fontSize: '13px' }}> — {theme.descripcion.split('.')[0]}</span>
            </div>
            <a
              href={theme.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '4px 12px',
                background: '#6366f1',
                color: 'white',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Ver demo
            </a>
          </div>
        )}
      </div>

      {/* PASO 2: Nombre carpeta */}
      <div style={{ ...sectionStyle, opacity: step1Done ? 1 : 0.4, pointerEvents: step1Done ? 'auto' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <StepNumber n={2} done={step2Done} />
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>Nombre de tu carpeta</div>
        </div>
        <input
          style={inputStyle}
          value={projectName}
          onChange={e => setProjectName(e.target.value.replace(/\s+/g, '-').toLowerCase())}
          placeholder="mi-proyecto"
        />
        <p style={hintStyle}>Este es el nombre de la carpeta dentro de ~/curso-ia/. Puedes cambiarlo si le pusiste otro nombre.</p>
      </div>

      {/* PASO 3: Comandos */}
      <div style={{ ...sectionStyle, opacity: step2Done ? 1 : 0.4, pointerEvents: step2Done ? 'auto' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <StepNumber n={3} done={step3Done} />
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>Abre tu proyecto y lanza Claude Code</div>
        </div>

        <CodeBlock
          label="Terminal 1: Abre tu proyecto y lanza Claude Code"
          codigo={`cd ~/curso-ia/${folder}\nclaude --dangerously-skip-permissions`}
        />

        <CodeBlock
          label="Terminal 2: Arranca el servidor (en otra ventana de terminal)"
          codigo={`cd ~/curso-ia/${folder}\nnpm run dev`}
        />

        <div style={{
          marginTop: '12px',
          padding: '10px 14px',
          background: '#fef9c3',
          border: '1px solid #fde047',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#854d0e',
          lineHeight: 1.5,
        }}>
          <strong>💡</strong> Abre <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" style={{ color: '#854d0e', fontWeight: 600 }}>localhost:3000</a> en tu navegador. Verás el theme {theme?.nombre || ''} tal cual. Ahora vamos a personalizarlo.
        </div>
      </div>

      {/* PASO 4: Describe tu proyecto */}
      <div style={{ ...sectionStyle, opacity: step3Done ? 1 : 0.4, pointerEvents: step3Done ? 'auto' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <StepNumber n={4} done={step4Done} />
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>Describe tu proyecto para Claude</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>🏷️ Nombre de tu producto</label>
            <input style={inputStyle} placeholder="Ej: VeganSpot, FitTracker, MiTienda..." value={nombre} onChange={e => setNombre(e.target.value)} />
            <p style={hintStyle}>El nombre comercial, no la carpeta. Puede ser diferente.</p>
          </div>
          <div>
            <label style={labelStyle}>💡 ¿Qué hace? (en una frase)</label>
            <input style={inputStyle} placeholder="Ej: Encuentra restaurantes veganos cerca de ti en segundos" value={queHace} onChange={e => setQueHace(e.target.value)} />
            <p style={hintStyle}>Si alguien te pregunta &quot;¿qué es?&quot;, ¿qué le dirías en 10 segundos?</p>
          </div>
          <div>
            <label style={labelStyle}>👥 ¿Para quién es?</label>
            <input style={inputStyle} placeholder="Ej: Personas veganas que viajan mucho y quieren comer bien" value={paraQuien} onChange={e => setParaQuien(e.target.value)} />
            <p style={hintStyle}>Cuanto más específico tu público, mejor resultado genera Claude.</p>
          </div>
          <div>
            <label style={labelStyle}>✨ 3-4 beneficios principales (uno por línea)</label>
            <textarea
              style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' as const }}
              placeholder={`Ej:\nEncuentra restaurantes en 3 clics\nReseñas de la comunidad vegana\nFunciona sin conexión`}
              value={beneficios}
              onChange={e => setBeneficios(e.target.value)}
            />
            <p style={hintStyle}>No features técnicas, sino valor para el usuario. ¿Qué gana tu usuario?</p>
          </div>
          <div>
            <label style={labelStyle}>🎨 Tono y estilo</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {TONOS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTono(t.id)}
                  style={{
                    padding: '10px 14px',
                    border: tono === t.id ? '2px solid #6366f1' : '1px solid #d1d5db',
                    borderRadius: '8px',
                    background: tono === t.id ? '#eef2ff' : 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 600, color: tono === t.id ? '#4338ca' : '#374151' }}>{t.label}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>🎯 Colores preferidos <span style={{ fontWeight: 400, color: '#9ca3af' }}>(opcional)</span></label>
            <input style={inputStyle} placeholder="Ej: azul oscuro y verde, tonos cálidos, blanco y negro..." value={colores} onChange={e => setColores(e.target.value)} />
          </div>
        </div>
      </div>

      {/* PASO 5: Prompt generado */}
      <div style={{ ...sectionStyle, opacity: step3Done ? 1 : 0.4, pointerEvents: step3Done ? 'auto' : 'none', background: '#f0fdf4', borderColor: step4Done ? '#86efac' : '#e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <StepNumber n={5} done={step4Done} />
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
            Copia y pega en Claude Code
            {step4Done && <span style={{ color: '#22c55e', fontWeight: 500, fontSize: '13px', marginLeft: '8px' }}>✓ Listo</span>}
          </div>
        </div>
        <CodeBlock codigo={prompt} />
        <div style={{
          marginTop: '12px',
          padding: '10px 14px',
          background: '#fef9c3',
          border: '1px solid #fde047',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#854d0e',
          lineHeight: 1.5,
        }}>
          <strong>💡</strong> Pega el prompt en Claude Code y espera. Refresca localhost:3000 para ver los cambios. Si algo no te gusta, pídele ajustes en el siguiente paso.
        </div>
      </div>
    </div>
  )
}

// ============= Visualizacion =============

const VISU_STEPS = [
  {
    texto: 'Si te sientes cómodo, cierra los ojos. Si no, simplemente mira hacia abajo.',
    pausa: 'Respira profundo... inhala... exhala...',
  },
  {
    texto: 'Imagina que han pasado 10 semanas. Es abril de 2026. Estás sentado exactamente donde estás ahora, pero algo es diferente.',
  },
  {
    texto: 'Tu proyecto existe. Está en internet. Tiene usuarios reales. Gente que nunca conociste está usando algo que TÚ creaste.',
    pausa: '¿Cómo se siente eso? Nota las sensaciones en tu cuerpo...',
  },
  {
    texto: 'Mira hacia atrás estas 10 semanas. ¿Qué obstáculos superaste? ¿Qué aprendiste sobre ti mismo?',
  },
  {
    texto: '¿Quién eres ahora que no eras hace 10 semanas?',
  },
]

function EnvConfigurator() {
  const [url, setUrl] = useState('')
  const [anonKey, setAnonKey] = useState('')
  const [copiado, setCopiado] = useState(false)
  const [creado, setCreado] = useState(false)

  const envContent = `NEXT_PUBLIC_SUPABASE_URL=${url || 'https://xxxxx.supabase.co'}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey || 'eyJhbGciOiJIUzI1NiIs...'}`

  const isValid = url.includes('supabase.co') && anonKey.length > 20

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(envContent)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = envContent
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div style={{ marginTop: '16px' }}>
      {/* Step 1: Instructions */}
      <div style={{
        background: '#fffbeb',
        border: '1px solid #fde68a',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '16px',
        fontSize: '14px',
        color: '#92400e',
        lineHeight: 1.7,
      }}>
        <strong>¿Dónde encuentro mis keys?</strong>
        <ol style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li>Ve a <a href="https://supabase.com/dashboard/project/_/settings/api" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', fontWeight: 600 }}>Supabase → Settings → API</a></li>
          <li>Copia la <strong>Project URL</strong> (empieza por https://)</li>
          <li>Copia la <strong>anon public</strong> key (empieza por eyJ...)</li>
        </ol>
      </div>

      {/* Step 2: Inputs */}
      <div style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '14px',
        padding: '20px',
        marginBottom: '16px',
      }}>
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
            Project URL
          </label>
          <input
            type="text"
            value={url}
            onChange={e => { setUrl(e.target.value); setCreado(false) }}
            placeholder="https://abcdef123.supabase.co"
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              border: `2px solid ${url && url.includes('supabase.co') ? '#22c55e' : '#e2e8f0'}`,
              borderRadius: '10px',
              outline: 'none',
              fontFamily: "'JetBrains Mono', monospace",
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
            Anon Key (public)
          </label>
          <input
            type="text"
            value={anonKey}
            onChange={e => { setAnonKey(e.target.value); setCreado(false) }}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              border: `2px solid ${anonKey.length > 20 ? '#22c55e' : '#e2e8f0'}`,
              borderRadius: '10px',
              outline: 'none',
              fontFamily: "'JetBrains Mono', monospace",
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
          />
        </div>
      </div>

      {/* Step 3: Generated file */}
      <div style={{
        background: '#1e293b',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '16px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: '#0f172a',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>.env.local</span>
          <button
            onClick={copiar}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 600,
              color: copiado ? '#22c55e' : '#94a3b8',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
          >
            {copiado ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre style={{
          margin: 0,
          padding: '16px',
          fontSize: '13px',
          color: '#e2e8f0',
          fontFamily: "'JetBrains Mono', monospace",
          lineHeight: 1.7,
          overflowX: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
        }}>
          {envContent}
        </pre>
      </div>

      {/* Step 4: Create file command */}
      {isValid && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#374151', fontWeight: 500 }}>
            Pega esto en el terminal para crear el archivo:
          </p>
          <CodeBlock
            codigo={`cat > .env.local << 'EOF'\n${envContent}\nEOF`}
            label="Terminal"
          />
          {!creado && (
            <button
              onClick={() => setCreado(true)}
              style={{
                alignSelf: 'flex-start',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)',
              }}
            >
              ✓ Ya lo he creado
            </button>
          )}
          {creado && (
            <div style={{
              padding: '14px 18px',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '10px',
              fontSize: '14px',
              color: '#166534',
              fontWeight: 500,
            }}>
              ✅ ¡Perfecto! Tu archivo .env.local está listo. Recuerda: este archivo NO se sube a GitHub (ya está en .gitignore).
            </div>
          )}
        </div>
      )}

      {!isValid && (url || anonKey) && (
        <p style={{ margin: 0, fontSize: '13px', color: '#f59e0b' }}>
          ⚠️ Pega tus keys reales de Supabase para generar el archivo.
        </p>
      )}
    </div>
  )
}

function Visualizacion() {
  const [step, setStep] = useState(-1) // -1 = no empezado
  const [palabras, setPalabras] = useState(['', '', ''])
  const [guardado, setGuardado] = useState(false)

  const started = step >= 0
  const finished = step >= VISU_STEPS.length
  const allWords = palabras.every(p => p.trim().length > 0)

  const updatePalabra = (idx: number, val: string) => {
    const next = [...palabras]
    next[idx] = val
    setPalabras(next)
  }

  if (!started) {
    return (
      <div style={{ marginTop: '16px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b, #312e81, #3730a3)',
          borderRadius: '16px',
          padding: '40px 32px',
          textAlign: 'center',
          color: 'white',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🧘</div>
          <p style={{ fontSize: '17px', lineHeight: 1.7, margin: '0 0 8px', opacity: 0.9 }}>
            Un ejercicio guiado para conectar con tu yo del futuro.
          </p>
          <p style={{ fontSize: '14px', margin: '0 0 24px', opacity: 0.6 }}>
            ~5 minutos · Puedes cerrar los ojos si quieres
          </p>
          <button
            onClick={() => setStep(0)}
            style={{
              padding: '14px 36px',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.2s',
            }}
          >
            Empezar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b, #312e81, #3730a3)',
        borderRadius: '16px',
        padding: '32px',
        color: 'white',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {/* Pasos de la visualización */}
        {!finished && (
          <>
            <div style={{
              display: 'flex',
              gap: '6px',
              justifyContent: 'center',
              marginBottom: '32px',
            }}>
              {VISU_STEPS.map((_, i) => (
                <div key={i} style={{
                  width: '32px',
                  height: '4px',
                  borderRadius: '2px',
                  background: i <= step ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)',
                  transition: 'background 0.5s',
                }} />
              ))}
            </div>

            <div style={{
              textAlign: 'center',
              maxWidth: '500px',
              margin: '0 auto',
            }}>
              <p style={{
                fontSize: '20px',
                lineHeight: 1.8,
                margin: 0,
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}>
                {VISU_STEPS[step].texto}
              </p>
              {VISU_STEPS[step].pausa && (
                <p style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  margin: '20px 0 0',
                  opacity: 0.6,
                  fontStyle: 'italic',
                }}>
                  {VISU_STEPS[step].pausa}
                </p>
              )}
            </div>

            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <button
                onClick={() => setStep(step + 1)}
                style={{
                  padding: '12px 32px',
                  background: 'rgba(255,255,255,0.12)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
              >
                {step < VISU_STEPS.length - 1 ? 'Siguiente →' : 'Terminar →'}
              </button>
            </div>
          </>
        )}

        {/* Pantalla final: 3 palabras */}
        {finished && !guardado && (
          <div style={{ textAlign: 'center', maxWidth: '460px', margin: '0 auto' }}>
            <p style={{
              fontSize: '18px',
              lineHeight: 1.7,
              margin: '0 0 24px',
              opacity: 0.9,
            }}>
              Cuando estés listo, escribe <strong>3 palabras</strong> que describan a ese tú del futuro.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {palabras.map((p, i) => (
                <input
                  key={i}
                  value={p}
                  onChange={e => updatePalabra(i, e.target.value)}
                  placeholder={['Palabra 1', 'Palabra 2', 'Palabra 3'][i]}
                  style={{
                    width: '130px',
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: 500,
                    textAlign: 'center',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
              ))}
            </div>
            {allWords && (
              <button
                onClick={() => setGuardado(true)}
                style={{
                  marginTop: '24px',
                  padding: '12px 32px',
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
              >
                ✨ Guardar mis palabras
              </button>
            )}
          </div>
        )}

        {/* Resultado final */}
        {finished && guardado && (
          <div style={{ textAlign: 'center', maxWidth: '460px', margin: '0 auto' }}>
            <p style={{
              fontSize: '15px',
              margin: '0 0 20px',
              opacity: 0.6,
            }}>
              Tu yo del futuro en 3 palabras:
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {palabras.map((p, i) => (
                <span key={i} style={{
                  padding: '10px 22px',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '24px',
                  fontSize: '17px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}>
                  {p.trim()}
                </span>
              ))}
            </div>
            <p style={{
              fontSize: '14px',
              margin: '24px 0 0',
              opacity: 0.5,
              lineHeight: 1.6,
            }}>
              Recuerda estas palabras. En 10 semanas volveremos a este momento.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ============= ProjectPromptBuilder =============

function ProjectPromptBuilder() {
  const [tieneIdea, setTieneIdea] = useState<null | boolean>(null)

  // Campos para "NO tengo idea"
  const [intereses, setIntereses] = useState('')
  const [problemas, setProblemas] = useState('')

  // Campos para "SÍ tengo idea"
  const [idea, setIdea] = useState('')

  const [copiado, setCopiado] = useState(false)

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: '#1e293b',
    background: 'white',
    outline: 'none',
    resize: 'vertical' as const,
    minHeight: '80px',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600 as const,
    color: '#374151',
    marginBottom: '6px',
  }

  const hintStyle = {
    fontSize: '12px',
    color: '#9ca3af',
    margin: '4px 0 0',
    lineHeight: 1.4,
  }

  // Generar prompt para "NO tengo idea"
  const promptNoIdea = intereses.trim() && problemas.trim()
    ? `Soy un alumno de un curso de 10 semanas donde voy a crear un SaaS (software como servicio) usando Claude Code. No necesito saber programar — la IA escribe el código.

Mis intereses: ${intereses.trim()}
Problemas que tengo en mi día a día: ${problemas.trim()}

Sugiere 3 ideas de proyecto que:
- Pueda construir en 10 semanas
- Tenga un modelo de negocio claro (suscripción, pago único, etc.)
- Resuelva un problema real

Para cada idea dame: nombre, qué problema resuelve, quién pagaría por esto, y modelo de negocio.`
    : null

  // Generar prompt para "SÍ tengo idea"
  const promptSiIdea = idea.trim()
    ? `Soy un alumno de un curso de 10 semanas donde voy a crear un SaaS con Claude Code.

Mi idea de proyecto: ${idea.trim()}

Evalúa mi idea:
1. ¿Es viable para construir en 10 semanas con IA?
2. ¿Qué funcionalidades son imprescindibles (MVP)?
3. ¿Cómo puedo cobrar? (suscripción, freemium, pago único)
4. ¿Quién es mi usuario ideal?
5. Sugiéreme un nombre si no tengo uno.`
    : null

  const promptFinal = tieneIdea ? promptSiIdea : promptNoIdea

  const copiar = async () => {
    if (!promptFinal) return
    try {
      await navigator.clipboard.writeText(promptFinal)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = promptFinal
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2500)
  }

  const sectionStyle = {
    padding: '20px',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    background: '#fafafa',
  }

  return (
    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
      {/* Pregunta inicial */}
      <div style={sectionStyle}>
        <p style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>
          ¿Ya tienes claro qué proyecto quieres crear?
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { val: true, label: 'Sí, tengo una idea', emoji: '💡' },
            { val: false, label: 'No, necesito ayuda', emoji: '🔍' },
          ].map(opt => (
            <button
              key={String(opt.val)}
              onClick={() => { setTieneIdea(opt.val); setCopiado(false) }}
              style={{
                flex: 1,
                padding: '14px 16px',
                border: tieneIdea === opt.val ? '2px solid #6366f1' : '1px solid #d1d5db',
                borderRadius: '10px',
                background: tieneIdea === opt.val ? '#eef2ff' : 'white',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: tieneIdea === opt.val ? 600 : 400,
                color: tieneIdea === opt.val ? '#4338ca' : '#374151',
                transition: 'all 0.15s',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '20px', display: 'block', marginBottom: '4px' }}>{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Formulario: NO tengo idea */}
      {tieneIdea === false && (
        <div style={{ ...sectionStyle, background: '#fefce8', borderColor: '#fde047' }}>
          <p style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 600, color: '#854d0e' }}>
            🔍 Vamos a descubrir tu proyecto ideal
          </p>
          <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#a16207' }}>
            Responde estas dos preguntas y Claude te sugerirá 3 ideas de proyecto perfectas para ti.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '14px' }}>
            <div>
              <label style={labelStyle}>¿Cuáles son tus intereses? (3-4 cosas)</label>
              <textarea
                style={inputStyle}
                placeholder="Ej: cocina saludable, fitness, viajes, fotografía, marketing digital..."
                value={intereses}
                onChange={e => { setIntereses(e.target.value); setCopiado(false) }}
              />
              <p style={hintStyle}>Hobbies, pasiones, temas que te apasionan o en los que tienes experiencia.</p>
            </div>
            <div>
              <label style={labelStyle}>¿Qué problemas tienes en tu día a día? (2-3)</label>
              <textarea
                style={inputStyle}
                placeholder="Ej: me cuesta organizar mis recetas, pierdo tiempo buscando gimnasios nuevos, no encuentro vuelos baratos fácilmente..."
                value={problemas}
                onChange={e => { setProblemas(e.target.value); setCopiado(false) }}
              />
              <p style={hintStyle}>Los mejores proyectos nacen de problemas reales que tú mismo tienes.</p>
            </div>
          </div>
        </div>
      )}

      {/* Formulario: SÍ tengo idea */}
      {tieneIdea === true && (
        <div style={{ ...sectionStyle, background: '#f0fdf4', borderColor: '#86efac' }}>
          <p style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 600, color: '#166534' }}>
            💡 Vamos a validar tu idea
          </p>
          <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#15803d' }}>
            Describe tu idea y Claude te dirá si es viable, qué necesitas para el MVP y cómo monetizarla.
          </p>
          <div>
            <label style={labelStyle}>Describe tu idea de proyecto</label>
            <textarea
              style={{ ...inputStyle, minHeight: '100px' }}
              placeholder="Ej: Una app donde los dueños de perros pueden encontrar paseadores de confianza cerca de su zona. Los paseadores se registran, ponen su precio y disponibilidad, y los dueños reservan y pagan desde la app."
              value={idea}
              onChange={e => { setIdea(e.target.value); setCopiado(false) }}
            />
            <p style={hintStyle}>Cuanto más detalle des, mejor será la evaluación de Claude.</p>
          </div>
        </div>
      )}

      {/* Prompt generado */}
      {tieneIdea !== null && promptFinal && (
        <div style={{
          ...sectionStyle,
          background: '#eef2ff',
          borderColor: '#a5b4fc',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#3730a3' }}>
              ✨ Tu prompt personalizado
            </p>
            <button
              onClick={copiar}
              style={{
                padding: '8px 20px',
                background: copiado ? '#22c55e' : '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
            >
              {copiado ? '✓ Copiado' : '📋 Copiar prompt'}
            </button>
          </div>
          <div style={{
            background: '#0f172a',
            borderRadius: '8px',
            padding: '16px',
            overflow: 'auto',
          }}>
            <pre style={{
              margin: 0,
              fontSize: '13px',
              lineHeight: 1.7,
              color: '#e2e8f0',
              fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {promptFinal}
            </pre>
          </div>
          <div style={{
            marginTop: '12px',
            padding: '10px 14px',
            background: '#dbeafe',
            border: '1px solid #93c5fd',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#1e40af',
            lineHeight: 1.5,
          }}>
            <strong>Siguiente paso:</strong> Abre <strong>Claude.ai</strong> o <strong>Claude Code</strong>, pega el prompt y lee lo que te sugiere. Luego comparte con el grupo.
          </div>
        </div>
      )}

      {/* Hint cuando no ha rellenado */}
      {tieneIdea !== null && !promptFinal && (
        <div style={{
          padding: '16px',
          background: '#f8fafc',
          border: '1px dashed #cbd5e1',
          borderRadius: '10px',
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '14px',
        }}>
          Rellena los campos de arriba y tu prompt aparecerá aquí automáticamente ↑
        </div>
      )}
    </div>
  )
}

// ============= PasoComponent =============

export function PasoComponent({ paso, index }: { paso: PasoClase; index: number }) {
  const esSeparador = paso.titulo.startsWith('📋')

  if (esSeparador) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        borderRadius: '16px',
        padding: '32px',
        color: 'white',
        marginTop: index > 0 ? '48px' : '0',
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: 700,
          lineHeight: 1.3,
        }}>
          {paso.titulo}
        </h2>
        {paso.descripcion && (
          <p style={{
            margin: '12px 0 0',
            fontSize: '16px',
            opacity: 0.9,
            lineHeight: 1.6,
          }}>
            {paso.descripcion}
          </p>
        )}
      </div>
    )
  }

  return (
    <div
      id={`paso-${index}`}
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <h3 style={{
        margin: 0,
        fontSize: '18px',
        fontWeight: 600,
        color: '#1e293b',
        lineHeight: 1.4,
      }}>
        {paso.titulo}
      </h3>

      {paso.descripcion && (
        <p style={{
          margin: '10px 0 0',
          fontSize: '15px',
          color: '#64748b',
          lineHeight: 1.6,
        }}>
          {paso.descripcion}
        </p>
      )}

      {paso.componente === 'dia2-setup' && <Dia2Setup />}
      {paso.componente === 'prompt-builder' && <ProjectPromptBuilder />}
      {paso.componente === 'visualizacion' && <Visualizacion />}
      {paso.componente === 'env-configurator' && <EnvConfigurator />}

      {paso.bloques?.map((bloque, i) => (
        <BloqueCodigoComponent key={i} bloque={bloque} />
      ))}

      {!paso.componente && paso.tip && (
        <div style={{
          marginTop: '14px',
          padding: '12px 16px',
          background: '#fef9c3',
          border: '1px solid #fde047',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#854d0e',
          lineHeight: 1.6,
        }}>
          <strong>💡 Tip:</strong> {paso.tip}
        </div>
      )}

      {paso.links && paso.links.length > 0 && (
        <div style={{
          marginTop: '14px',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}>
          {paso.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: '#f0f9ff',
                color: '#0369a1',
                border: '1px solid #bae6fd',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              🔗 {link.texto}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
