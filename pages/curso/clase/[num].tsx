import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PIZARRAS, getPizarra } from '../../../lib/curso-pizarra-data'
import type { PasoClase, BloqueCodigo } from '../../../lib/curso-pizarra-data'
import { THEMES } from '../../../lib/themes-data'

function CopyButton({ texto }: { texto: string }) {
  const [copiado, setCopiado] = useState(false)

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      // Fallback para navegadores que no soportan clipboard API
      const textarea = document.createElement('textarea')
      textarea.value = texto
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  return (
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
  )
}

function BloqueCodigoComponent({ bloque }: { bloque: BloqueCodigo }) {
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

function CodeBlock({ codigo, label }: { codigo: string; label?: string }) {
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

function Dia2Setup() {
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
            <input
              style={inputStyle}
              placeholder="Ej: VeganSpot, FitTracker, MiTienda..."
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
            <p style={hintStyle}>El nombre comercial, no la carpeta. Puede ser diferente.</p>
          </div>

          <div>
            <label style={labelStyle}>💡 ¿Qué hace? (en una frase)</label>
            <input
              style={inputStyle}
              placeholder="Ej: Encuentra restaurantes veganos cerca de ti en segundos"
              value={queHace}
              onChange={e => setQueHace(e.target.value)}
            />
            <p style={hintStyle}>Si alguien te pregunta "¿qué es?", ¿qué le dirías en 10 segundos?</p>
          </div>

          <div>
            <label style={labelStyle}>👥 ¿Para quién es?</label>
            <input
              style={inputStyle}
              placeholder="Ej: Personas veganas que viajan mucho y quieren comer bien"
              value={paraQuien}
              onChange={e => setParaQuien(e.target.value)}
            />
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
                  <div style={{ fontSize: '13px', fontWeight: 600, color: tono === t.id ? '#4338ca' : '#374151' }}>
                    {t.label}
                  </div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                    {t.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>🎯 Colores preferidos <span style={{ fontWeight: 400, color: '#9ca3af' }}>(opcional)</span></label>
            <input
              style={inputStyle}
              placeholder="Ej: azul oscuro y verde, tonos cálidos, blanco y negro..."
              value={colores}
              onChange={e => setColores(e.target.value)}
            />
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

function PasoComponent({ paso, index }: { paso: PasoClase; index: number }) {
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

export default function PizarraClasePage() {
  const router = useRouter()
  const { num } = router.query
  const semanaNum = parseInt(num as string, 10)

  if (!num || isNaN(semanaNum)) {
    return null
  }

  const pizarra = getPizarra(semanaNum)

  if (!pizarra) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '12px' }}>
            Semana {semanaNum} no disponible
          </h1>
          <Link href="/curso" style={{ color: '#6366f1', textDecoration: 'none' }}>
            ← Volver al curso
          </Link>
        </div>
      </div>
    )
  }

  // Contar pasos reales (sin separadores)
  const pasosReales = pizarra.pasos.filter(p => !p.titulo.startsWith('📋'))

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f1f5f9',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <Head>
        <title>Clase S{pizarra.semanaNum}: {pizarra.titulo}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Sticky header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '12px 24px',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>{pizarra.emoji}</span>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 700,
                color: '#1e293b',
              }}>
                Semana {pizarra.semanaNum}: {pizarra.titulo}
              </h1>
              <p style={{
                margin: 0,
                fontSize: '13px',
                color: '#64748b',
              }}>
                {pasosReales.length} pasos
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {semanaNum > 1 && (
              <Link href={`/curso/clase/${semanaNum - 1}`} style={{
                padding: '8px 14px',
                fontSize: '13px',
                color: '#64748b',
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontWeight: 500,
              }}>
                ← S{semanaNum - 1}
              </Link>
            )}
            {semanaNum < 10 && (
              <Link href={`/curso/clase/${semanaNum + 1}`} style={{
                padding: '8px 14px',
                fontSize: '13px',
                color: '#64748b',
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontWeight: 500,
              }}>
                S{semanaNum + 1} →
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '32px 20px 80px',
      }}>
        {/* Subtitle */}
        <p style={{
          textAlign: 'center',
          fontSize: '18px',
          color: '#64748b',
          marginBottom: '32px',
          lineHeight: 1.5,
        }}>
          {pizarra.subtitulo}
        </p>

        {/* Steps */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {pizarra.pasos.map((paso, i) => (
            <PasoComponent key={i} paso={paso} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '48px',
          textAlign: 'center',
          padding: '24px',
          color: '#94a3b8',
          fontSize: '14px',
        }}>
          <p style={{ margin: 0 }}>
            ¿Atascado? Pregunta en el Discord del curso o levanta la mano en clase.
          </p>
        </div>
      </main>

      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; -webkit-font-smoothing: antialiased; }
        a:hover { opacity: 0.8; }
        @media (max-width: 640px) {
          pre { font-size: 12px !important; }
        }
        @media print {
          header { position: relative !important; }
          button { display: none !important; }
        }
      `}</style>
    </div>
  )
}
