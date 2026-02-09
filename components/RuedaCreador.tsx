import { useState, useEffect } from 'react'

const categories = [
  'Claridad de visión',
  'Habilidades técnicas',
  'Tiempo disponible',
  'Energía y salud',
  'Apoyo social',
  'Finanzas',
  'Mentalidad',
  'Propósito',
]

const colors = [
  '#6366f1', // Claridad - indigo
  '#8b5cf6', // Habilidades - violet
  '#a855f7', // Tiempo - purple
  '#22c55e', // Energía - green
  '#f59e0b', // Apoyo - amber
  '#14b8a6', // Finanzas - teal
  '#ec4899', // Mentalidad - pink
  '#f97316', // Propósito - orange
]

const descriptions: Record<string, string> = {
  'Claridad de visión': '¿Sabes exactamente qué quieres crear y por qué?',
  'Habilidades técnicas': '¿Tienes las herramientas para ejecutar tu idea?',
  'Tiempo disponible': '¿Tienes bloques de tiempo protegidos para crear?',
  'Energía y salud': '¿Tu cuerpo y mente están listos para el reto?',
  'Apoyo social': '¿Tienes personas que creen en ti y te apoyan?',
  'Finanzas': '¿Tienes runway o ingresos que te permitan enfocarte?',
  'Mentalidad': '¿Crees genuinamente que puedes lograrlo?',
  'Propósito': '¿Este proyecto está alineado con quién eres?',
}

interface RuedaCreadorProps {
  tipo: 'antes' | 'despues'
  initialScores?: number[]
  onSave?: (scores: number[]) => Promise<void>
  readOnly?: boolean
  compareTo?: number[] // Para mostrar comparación con otra rueda
}

export default function RuedaCreador({
  tipo,
  initialScores,
  onSave,
  readOnly = false,
  compareTo,
}: RuedaCreadorProps) {
  const [scores, setScores] = useState<number[]>(initialScores || Array(categories.length).fill(5))
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  useEffect(() => {
    if (initialScores) {
      setScores(initialScores)
    }
  }, [initialScores])

  const updateScore = (index: number, value: string) => {
    if (readOnly) return
    const newScores = [...scores]
    newScores[index] = parseInt(value)
    setScores(newScores)
    setSaved(false)
  }

  const handleSave = async () => {
    if (!onSave) return
    setSaving(true)
    try {
      await onSave(scores)
      setSaved(true)
    } catch (error) {
      console.error('Error saving:', error)
    } finally {
      setSaving(false)
    }
  }

  const promedio = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10
  const promedioAnterior = compareTo
    ? Math.round((compareTo.reduce((a, b) => a + b, 0) / compareTo.length) * 10) / 10
    : null

  const radius = 140
  const labelOffset = 55
  const center = 250
  const svgSize = 500
  const angleStep = (2 * Math.PI) / categories.length

  // Encontrar áreas más bajas
  const sortedScores = scores.map((score, i) => ({ score, index: i })).sort((a, b) => a.score - b.score)
  const areasTrabajar = sortedScores.slice(0, 2).map(s => categories[s.index])

  return (
    <div style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#1e293b',
      borderRadius: '16px',
      border: '1px solid #334155',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h3 style={{
          margin: '0 0 8px',
          fontSize: '20px',
          fontWeight: 600,
          color: '#f1f5f9',
        }}>
          {tipo === 'antes' ? '🎯 Tu Rueda del Creador' : '🏆 Tu Rueda Final'}
        </h3>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: '#94a3b8',
        }}>
          {tipo === 'antes'
            ? 'Evalúa cada área del 1 al 10. Sé honesto contigo mismo.'
            : 'Después de 10 semanas, ¿cómo han cambiado tus áreas?'}
        </p>
      </div>

      {/* SVG Wheel */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          width="100%"
          height="auto"
          style={{ display: 'block', maxWidth: '400px' }}
        >
          {/* Círculos de referencia */}
          {[...Array(10)].map((_, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={(radius / 10) * (i + 1)}
              stroke="#334155"
              strokeWidth={i === 4 || i === 9 ? 2 : 1}
              fill="none"
              strokeDasharray={i === 4 ? '4,4' : 'none'}
            />
          ))}

          {/* Líneas y etiquetas */}
          {categories.map((label, i) => {
            const angleStart = i * angleStep - Math.PI / 2
            const angleEnd = (i + 1) * angleStep - Math.PI / 2
            const angleMid = (angleStart + angleEnd) / 2

            const labelRadius = radius + labelOffset
            const lx = center + labelRadius * Math.cos(angleMid)
            const ly = center + labelRadius * Math.sin(angleMid)

            const anchor =
              Math.cos(angleMid) > 0.3
                ? 'start'
                : Math.cos(angleMid) < -0.3
                  ? 'end'
                  : 'middle'

            return (
              <g key={i}>
                <line
                  x1={center}
                  y1={center}
                  x2={center + radius * Math.cos(angleMid)}
                  y2={center + radius * Math.sin(angleMid)}
                  stroke="#475569"
                  strokeWidth={1}
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  fontSize="11"
                  fontFamily="Inter, sans-serif"
                  fontWeight={hoveredCategory === i ? 600 : 400}
                  fill={hoveredCategory === i ? colors[i] : '#94a3b8'}
                  style={{ transition: 'fill 0.2s' }}
                >
                  {label}
                </text>
              </g>
            )
          })}

          {/* Rueda de comparación (si existe) */}
          {compareTo && (
            <g opacity={0.3}>
              {compareTo.map((score, i) => {
                const angle1 = i * angleStep - Math.PI / 2
                const angle2 = (i + 1) * angleStep - Math.PI / 2
                const r = (score / 10) * radius

                const x1 = center + r * Math.cos(angle1)
                const y1 = center + r * Math.sin(angle1)
                const x2 = center + r * Math.cos(angle2)
                const y2 = center + r * Math.sin(angle2)

                const pathData = `
                  M ${center},${center}
                  L ${x1},${y1}
                  A ${r} ${r} 0 0 1 ${x2} ${y2}
                  Z
                `

                return (
                  <path
                    key={i}
                    d={pathData}
                    fill="#64748b"
                    stroke="#475569"
                    strokeWidth={1}
                  />
                )
              })}
            </g>
          )}

          {/* Rueda actual */}
          {scores.map((score, i) => {
            const angle1 = i * angleStep - Math.PI / 2
            const angle2 = (i + 1) * angleStep - Math.PI / 2
            const r = (score / 10) * radius

            const x1 = center + r * Math.cos(angle1)
            const y1 = center + r * Math.sin(angle1)
            const x2 = center + r * Math.cos(angle2)
            const y2 = center + r * Math.sin(angle2)

            const pathData = `
              M ${center},${center}
              L ${x1},${y1}
              A ${r} ${r} 0 0 1 ${x2} ${y2}
              Z
            `

            return (
              <path
                key={i}
                d={pathData}
                fill={colors[i]}
                fillOpacity={hoveredCategory === i ? 0.9 : 0.6}
                stroke="#fff"
                strokeWidth={hoveredCategory === i ? 2 : 1}
                style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                onMouseEnter={() => setHoveredCategory(i)}
                onMouseLeave={() => setHoveredCategory(null)}
              />
            )
          })}

          {/* Centro con promedio */}
          <circle
            cx={center}
            cy={center}
            r={30}
            fill="#0f172a"
            stroke="#334155"
            strokeWidth={2}
          />
          <text
            x={center}
            y={center - 5}
            textAnchor="middle"
            fontSize="18"
            fontWeight="bold"
            fill="#f1f5f9"
          >
            {promedio}
          </text>
          <text
            x={center}
            y={center + 12}
            textAnchor="middle"
            fontSize="9"
            fill="#64748b"
          >
            promedio
          </text>
        </svg>
      </div>

      {/* Tooltip de categoría */}
      {hoveredCategory !== null && (
        <div style={{
          marginTop: '-10px',
          marginBottom: '10px',
          padding: '10px 16px',
          background: '#0f172a',
          borderRadius: '8px',
          border: `2px solid ${colors[hoveredCategory]}`,
          textAlign: 'center',
          maxWidth: '300px',
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#f1f5f9', fontWeight: 600 }}>
            {categories[hoveredCategory]}: {scores[hoveredCategory]}/10
          </p>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>
            {descriptions[categories[hoveredCategory]]}
          </p>
        </div>
      )}

      {/* Sliders */}
      {!readOnly && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          width: '100%',
          maxWidth: '600px',
          marginTop: '16px',
        }}>
          {categories.map((category, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
                background: hoveredCategory === i ? '#334155' : '#0f172a',
                borderRadius: '10px',
                border: `1px solid ${hoveredCategory === i ? colors[i] : '#334155'}`,
                transition: 'all 0.2s',
              }}
              onMouseEnter={() => setHoveredCategory(i)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <label style={{
                fontWeight: 500,
                fontSize: '11px',
                color: colors[i],
                textAlign: 'center',
                marginBottom: '6px',
              }}>
                {category}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={scores[i]}
                onChange={(e) => updateScore(i, e.target.value)}
                style={{
                  width: '100%',
                  accentColor: colors[i],
                  cursor: 'pointer',
                }}
              />
              <span style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#f1f5f9',
                marginTop: '4px',
              }}>
                {scores[i]}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Resumen de áreas a trabajar */}
      <div style={{
        marginTop: '20px',
        padding: '16px',
        background: '#0f172a',
        borderRadius: '12px',
        border: '1px solid #334155',
        width: '100%',
        maxWidth: '600px',
      }}>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: '#94a3b8',
          textAlign: 'center',
        }}>
          <strong style={{ color: '#f59e0b' }}>Áreas a fortalecer:</strong>{' '}
          <span style={{ color: '#f1f5f9' }}>{areasTrabajar.join(' y ')}</span>
        </p>

        {compareTo && promedioAnterior !== null && (
          <p style={{
            margin: '12px 0 0',
            fontSize: '14px',
            textAlign: 'center',
            color: promedio > promedioAnterior ? '#22c55e' : promedio < promedioAnterior ? '#f87171' : '#94a3b8',
          }}>
            {promedio > promedioAnterior
              ? `📈 +${(promedio - promedioAnterior).toFixed(1)} puntos desde el inicio`
              : promedio < promedioAnterior
                ? `📉 ${(promedio - promedioAnterior).toFixed(1)} puntos desde el inicio`
                : '➡️ Sin cambios desde el inicio'}
          </p>
        )}
      </div>

      {/* Botón guardar */}
      {!readOnly && onSave && (
        <button
          onClick={handleSave}
          disabled={saving || saved}
          style={{
            marginTop: '20px',
            padding: '14px 32px',
            fontSize: '15px',
            fontWeight: 600,
            backgroundColor: saved ? '#22c55e' : '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: saving || saved ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1,
            transition: 'all 0.2s',
            boxShadow: saved ? 'none' : '0 4px 14px rgba(99, 102, 241, 0.3)',
          }}
        >
          {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar mi rueda'}
        </button>
      )}
    </div>
  )
}
