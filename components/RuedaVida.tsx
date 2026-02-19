import { useState, useEffect } from 'react'

const categories = [
  'Salud',
  'Familia',
  'Amigxs',
  'Vinculos',
  'Crecimiento',
  'Diversion',
  'Ambiente',
  'Carrera',
  'Economia',
]

const colors = [
  '#ef4444', // Salud - red
  '#f97316', // Familia - orange
  '#eab308', // Amigxs - yellow
  '#84cc16', // Vinculos - lime
  '#22c55e', // Crecimiento - green
  '#06b6d4', // Diversion - cyan
  '#6366f1', // Ambiente - indigo
  '#ec4899', // Carrera - pink
  '#f9a8d4', // Economia - pink-light
]

const descriptions: Record<string, string> = {
  'Salud': '¿Como esta tu salud fisica y mental? ¿Haces ejercicio, duermes bien?',
  'Familia': '¿Como es tu relacion con tu familia? ¿Te sientes conectado?',
  'Amigxs': '¿Tienes amigos de confianza? ¿Pasas tiempo de calidad con ellos?',
  'Vinculos': '¿Tienes relaciones afectivas que te nutren?',
  'Crecimiento': '¿Estas aprendiendo y creciendo como persona?',
  'Diversion': '¿Dedicas tiempo a pasarlo bien y disfrutar?',
  'Ambiente': '¿Tu espacio fisico te inspira? ¿Te sientes a gusto donde vives?',
  'Carrera': '¿Estas satisfecho con tu trabajo o tu camino profesional?',
  'Economia': '¿Tienes estabilidad financiera? ¿Ahorras?',
}

interface RuedaVidaProps {
  tipo: 'antes' | 'despues'
  initialScores?: number[]
  onSave?: (scores: number[]) => Promise<void>
  readOnly?: boolean
  compareTo?: number[]
}

export default function RuedaVida({
  tipo,
  initialScores,
  onSave,
  readOnly = false,
  compareTo,
}: RuedaVidaProps) {
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

  const sortedScores = scores.map((score, i) => ({ score, index: i })).sort((a, b) => a.score - b.score)
  const areasTrabajar = sortedScores.slice(0, 2).map(s => categories[s.index])

  return (
    <div style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#fff',
      borderRadius: '16px',
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 600, color: '#0f172a' }}>
          {tipo === 'antes' ? '🌿 Tu Rueda de la Vida' : '🏆 Tu Rueda Final'}
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
          {tipo === 'antes'
            ? 'Evalua cada area del 1 al 10. Se honesto contigo mismo.'
            : 'Despues de 10 semanas, ¿como han cambiado tus areas?'}
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
          {[...Array(10)].map((_, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={(radius / 10) * (i + 1)}
              stroke="#e2e8f0"
              strokeWidth={i === 4 || i === 9 ? 2 : 1}
              fill="none"
              strokeDasharray={i === 4 ? '4,4' : 'none'}
            />
          ))}

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
                  stroke="#cbd5e1"
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
                  fill={hoveredCategory === i ? colors[i] : '#64748b'}
                  style={{ transition: 'fill 0.2s' }}
                >
                  {label}
                </text>
              </g>
            )
          })}

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

                return (
                  <path
                    key={i}
                    d={`M ${center},${center} L ${x1},${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                    fill="#94a3b8"
                    stroke="#cbd5e1"
                    strokeWidth={1}
                  />
                )
              })}
            </g>
          )}

          {scores.map((score, i) => {
            const angle1 = i * angleStep - Math.PI / 2
            const angle2 = (i + 1) * angleStep - Math.PI / 2
            const r = (score / 10) * radius

            const x1 = center + r * Math.cos(angle1)
            const y1 = center + r * Math.sin(angle1)
            const x2 = center + r * Math.cos(angle2)
            const y2 = center + r * Math.sin(angle2)

            return (
              <path
                key={i}
                d={`M ${center},${center} L ${x1},${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                fill={colors[i]}
                fillOpacity={hoveredCategory === i ? 0.9 : 0.6}
                stroke="#fff"
                strokeWidth={hoveredCategory === i ? 2.5 : 1.5}
                style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                onMouseEnter={() => setHoveredCategory(i)}
                onMouseLeave={() => setHoveredCategory(null)}
              />
            )
          })}

          <circle cx={center} cy={center} r={30} fill="#fff" stroke="#e2e8f0" strokeWidth={2} />
          <text x={center} y={center - 5} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">
            {promedio}
          </text>
          <text x={center} y={center + 12} textAnchor="middle" fontSize="9" fill="#94a3b8">
            promedio
          </text>
        </svg>
      </div>

      {/* Tooltip */}
      <div style={{
        height: '54px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '-10px',
        marginBottom: '10px',
      }}>
        {hoveredCategory !== null ? (
          <div style={{
            padding: '10px 16px',
            background: '#f8fafc',
            borderRadius: '8px',
            border: `2px solid ${colors[hoveredCategory]}`,
            textAlign: 'center',
            maxWidth: '300px',
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#0f172a', fontWeight: 600 }}>
              {categories[hoveredCategory]}: {scores[hoveredCategory]}/10
            </p>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>
              {descriptions[categories[hoveredCategory]]}
            </p>
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
            Pasa el raton por encima de la rueda para ver detalles
          </p>
        )}
      </div>

      {/* Sliders */}
      {!readOnly && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '10px',
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
                background: hoveredCategory === i ? '#f8fafc' : '#fff',
                borderRadius: '10px',
                border: `1px solid ${hoveredCategory === i ? colors[i] : 'rgba(0,0,0,0.08)'}`,
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
                style={{ width: '100%', accentColor: colors[i], cursor: 'pointer' }}
              />
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>
                {scores[i]}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Resumen */}
      <div style={{
        marginTop: '20px',
        padding: '16px',
        background: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid rgba(0,0,0,0.06)',
        width: '100%',
        maxWidth: '600px',
      }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b', textAlign: 'center' }}>
          <strong style={{ color: '#d97706' }}>Areas a fortalecer:</strong>{' '}
          <span style={{ color: '#0f172a' }}>{areasTrabajar.join(' y ')}</span>
        </p>
        {compareTo && promedioAnterior !== null && (
          <p style={{
            margin: '12px 0 0',
            fontSize: '14px',
            textAlign: 'center',
            color: promedio > promedioAnterior ? '#16a34a' : promedio < promedioAnterior ? '#dc2626' : '#64748b',
          }}>
            {promedio > promedioAnterior
              ? `📈 +${(promedio - promedioAnterior).toFixed(1)} puntos desde el inicio`
              : promedio < promedioAnterior
                ? `📉 ${(promedio - promedioAnterior).toFixed(1)} puntos desde el inicio`
                : '➡️ Sin cambios desde el inicio'}
          </p>
        )}
      </div>

      {/* Save button */}
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
