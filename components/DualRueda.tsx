import { useState, useEffect } from 'react'
import RuedaCreador from './RuedaCreador'
import RuedaVida from './RuedaVida'

interface RuedaData {
  scores: number[]
  savedAt: string
}

export interface DualRuedaState {
  creador?: { antes?: RuedaData; despues?: RuedaData }
  vida?: { antes?: RuedaData; despues?: RuedaData }
  // Backward compat: old format
  antes?: RuedaData
  despues?: RuedaData
}

// Migrate old format { antes, despues } → { creador: { antes, despues } }
export function migrateDualRueda(data: DualRuedaState): DualRuedaState {
  if (data.antes || data.despues) {
    return {
      creador: {
        antes: data.antes,
        despues: data.despues,
      },
      vida: data.vida,
    }
  }
  return data
}

interface DualRuedaProps {
  ruedas: DualRuedaState
  onSave: (ruedaType: 'creador' | 'vida', tipo: 'antes' | 'despues', scores: number[]) => Promise<void>
}

export default function DualRueda({ ruedas, onSave }: DualRuedaProps) {
  const [activeWheel, setActiveWheel] = useState<'creador' | 'vida'>('creador')
  const [activeTime, setActiveTime] = useState<'antes' | 'despues' | 'comparar'>('antes')

  const migrated = migrateDualRueda(ruedas)
  const creador = migrated.creador || {}
  const vida = migrated.vida || {}
  const activeRueda = activeWheel === 'creador' ? creador : vida

  // Auto-select tab based on what's filled
  useEffect(() => {
    if (activeRueda.antes && activeRueda.despues) {
      setActiveTime('comparar')
    } else if (activeRueda.antes) {
      setActiveTime('antes')
    } else {
      setActiveTime('antes')
    }
  }, [activeWheel])

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })

  // Global score
  const calcPromedio = (data?: RuedaData) =>
    data ? Math.round((data.scores.reduce((a, b) => a + b, 0) / data.scores.length) * 10) / 10 : null

  const creadorAntes = calcPromedio(creador.antes)
  const creadorDespues = calcPromedio(creador.despues)
  const vidaAntes = calcPromedio(vida.antes)
  const vidaDespues = calcPromedio(vida.despues)

  const globalAntes = creadorAntes !== null || vidaAntes !== null
    ? Math.round(((creadorAntes || 0) + (vidaAntes || 0)) / ((creadorAntes !== null ? 1 : 0) + (vidaAntes !== null ? 1 : 0)) * 10) / 10
    : null
  const globalDespues = creadorDespues !== null || vidaDespues !== null
    ? Math.round(((creadorDespues || 0) + (vidaDespues || 0)) / ((creadorDespues !== null ? 1 : 0) + (vidaDespues !== null ? 1 : 0)) * 10) / 10
    : null

  const RuedaComponent = activeWheel === 'creador' ? RuedaCreador : RuedaVida

  return (
    <div>
      {/* Global score */}
      {(globalAntes !== null || globalDespues !== null) && (
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}>
          {globalAntes !== null && (
            <div style={{
              padding: '12px 20px',
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.06)',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Puntuacion global (inicio)</p>
              <p style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: 700, color: '#6366f1' }}>{globalAntes}</p>
            </div>
          )}
          {globalDespues !== null && (
            <div style={{
              padding: '12px 20px',
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.06)',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Puntuacion global (final)</p>
              <p style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: 700, color: '#22c55e' }}>{globalDespues}</p>
            </div>
          )}
        </div>
      )}

      {/* Wheel tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        marginBottom: '16px',
      }}>
        <button
          onClick={() => setActiveWheel('creador')}
          style={{
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 600,
            color: activeWheel === 'creador' ? '#fff' : '#64748b',
            background: activeWheel === 'creador' ? '#6366f1' : '#fff',
            border: `1px solid ${activeWheel === 'creador' ? '#6366f1' : 'rgba(0,0,0,0.1)'}`,
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          🎯 Creador
          {creador.antes && <span style={{ marginLeft: '6px', opacity: 0.7 }}>✓</span>}
        </button>
        <button
          onClick={() => setActiveWheel('vida')}
          style={{
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 600,
            color: activeWheel === 'vida' ? '#fff' : '#64748b',
            background: activeWheel === 'vida' ? '#22c55e' : '#fff',
            border: `1px solid ${activeWheel === 'vida' ? '#22c55e' : 'rgba(0,0,0,0.1)'}`,
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          🌿 Vida Personal
          {vida.antes && <span style={{ marginLeft: '6px', opacity: 0.7 }}>✓</span>}
        </button>
      </div>

      {/* Time tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        marginBottom: '24px',
      }}>
        <button
          onClick={() => setActiveTime('antes')}
          style={{
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: 600,
            color: activeTime === 'antes' ? '#fff' : '#64748b',
            background: activeTime === 'antes' ? '#5e6ad2' : '#f8fafc',
            border: `1px solid ${activeTime === 'antes' ? '#5e6ad2' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          📍 Inicio del curso
        </button>
        <button
          onClick={() => setActiveTime('despues')}
          style={{
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: 600,
            color: activeTime === 'despues' ? '#fff' : '#64748b',
            background: activeTime === 'despues' ? '#16a34a' : '#f8fafc',
            border: `1px solid ${activeTime === 'despues' ? '#16a34a' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          🏆 Final del curso
        </button>
        {activeRueda.antes && activeRueda.despues && (
          <button
            onClick={() => setActiveTime('comparar')}
            style={{
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: 600,
              color: activeTime === 'comparar' ? '#fff' : '#64748b',
              background: activeTime === 'comparar' ? '#f59e0b' : '#f8fafc',
              border: `1px solid ${activeTime === 'comparar' ? '#f59e0b' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            📊 Comparar
          </button>
        )}
      </div>

      {/* Content */}
      {activeTime === 'antes' && (
        <div>
          {activeRueda.antes && (
            <p style={{ textAlign: 'center', fontSize: '14px', color: '#22c55e', marginBottom: '16px' }}>
              ✓ Completada el {formatDate(activeRueda.antes.savedAt)}
            </p>
          )}
          <RuedaComponent
            tipo="antes"
            initialScores={activeRueda.antes?.scores}
            onSave={(scores) => onSave(activeWheel, 'antes', scores)}
            readOnly={false}
          />
        </div>
      )}

      {activeTime === 'despues' && (
        <div>
          {!activeRueda.antes ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
            }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🔒</span>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#0f172a' }}>
                Primero completa tu rueda inicial
              </h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                Necesitas un punto de partida para comparar al final.
              </p>
              <button
                onClick={() => setActiveTime('antes')}
                style={{
                  marginTop: '20px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#fff',
                  background: '#6366f1',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                Completar rueda inicial
              </button>
            </div>
          ) : (
            <div>
              {activeRueda.despues && (
                <p style={{ textAlign: 'center', fontSize: '14px', color: '#22c55e', marginBottom: '16px' }}>
                  ✓ Completada el {formatDate(activeRueda.despues.savedAt)}
                </p>
              )}
              <RuedaComponent
                tipo="despues"
                initialScores={activeRueda.despues?.scores}
                onSave={(scores) => onSave(activeWheel, 'despues', scores)}
                compareTo={activeRueda.antes?.scores}
              />
            </div>
          )}
        </div>
      )}

      {activeTime === 'comparar' && activeRueda.antes && activeRueda.despues && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            <div>
              <h3 style={{ textAlign: 'center', margin: '0 0 16px', fontSize: '16px', color: '#6366f1' }}>
                📍 Inicio ({formatDate(activeRueda.antes.savedAt)})
              </h3>
              <RuedaComponent tipo="antes" initialScores={activeRueda.antes.scores} readOnly={true} />
            </div>
            <div>
              <h3 style={{ textAlign: 'center', margin: '0 0 16px', fontSize: '16px', color: '#22c55e' }}>
                🏆 Final ({formatDate(activeRueda.despues.savedAt)})
              </h3>
              <RuedaComponent
                tipo="despues"
                initialScores={activeRueda.despues.scores}
                readOnly={true}
                compareTo={activeRueda.antes.scores}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
