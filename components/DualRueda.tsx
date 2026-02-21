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
  const [activeTab, setActiveTab] = useState<'vida' | 'creador' | 'estadisticas'>('vida')
  const [activeTime, setActiveTime] = useState<'antes' | 'despues' | 'comparar'>('antes')

  const migrated = migrateDualRueda(ruedas)
  const creador = migrated.creador || {}
  const vida = migrated.vida || {}

  const activeWheel: 'creador' | 'vida' = activeTab === 'creador' ? 'creador' : 'vida'
  const activeRueda = activeTab === 'creador' ? creador : vida

  // Auto-select time tab only on initial mount
  useEffect(() => {
    const initial = migrateDualRueda(ruedas)
    const initialVida = initial.vida || {}
    if (initialVida.antes && initialVida.despues) {
      setActiveTime('comparar')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })

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

  const hasAnyData = creador.antes || vida.antes

  const RuedaComponent = activeTab === 'creador' ? RuedaCreador : RuedaVida

  const tabs: { key: 'vida' | 'creador' | 'estadisticas'; label: string; emoji: string; color: string; show: boolean }[] = [
    { key: 'vida', label: 'Persona', emoji: '🌿', color: '#22c55e', show: true },
    { key: 'creador', label: 'Creador', emoji: '🎯', color: '#6366f1', show: true },
    { key: 'estadisticas', label: 'Estadisticas', emoji: '📊', color: '#f59e0b', show: !!hasAnyData },
  ]

  return (
    <div>
      {/* Main tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        marginBottom: '20px',
      }}>
        {tabs.filter(t => t.show).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 600,
              color: activeTab === tab.key ? '#fff' : '#64748b',
              background: activeTab === tab.key ? tab.color : '#fff',
              border: `1px solid ${activeTab === tab.key ? tab.color : 'rgba(0,0,0,0.1)'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tab.emoji} {tab.label}
            {tab.key === 'vida' && vida.antes && <span style={{ marginLeft: '6px', opacity: 0.7 }}>✓</span>}
            {tab.key === 'creador' && creador.antes && <span style={{ marginLeft: '6px', opacity: 0.7 }}>✓</span>}
          </button>
        ))}
      </div>

      {/* Vida / Creador content */}
      {(activeTab === 'vida' || activeTab === 'creador') && (
        <>
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

          {/* Wheel content */}
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
                    compareTo={activeRueda.despues ? activeRueda.antes?.scores : undefined}
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
        </>
      )}

      {/* Estadísticas tab */}
      {activeTab === 'estadisticas' && (
        <div>
          {/* Global scores */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}>
            {globalAntes !== null && (
              <div style={{
                padding: '16px 28px',
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.06)',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                minWidth: '160px',
              }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Puntuacion global (inicio)</p>
                <p style={{ margin: '6px 0 0', fontSize: '32px', fontWeight: 700, color: '#6366f1' }}>{globalAntes}</p>
              </div>
            )}
            {globalDespues !== null && (
              <div style={{
                padding: '16px 28px',
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.06)',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                minWidth: '160px',
              }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Puntuacion global (final)</p>
                <p style={{ margin: '6px 0 0', fontSize: '32px', fontWeight: 700, color: '#22c55e' }}>{globalDespues}</p>
              </div>
            )}
            {globalAntes !== null && globalDespues !== null && (
              <div style={{
                padding: '16px 28px',
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.06)',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                minWidth: '160px',
              }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Cambio</p>
                <p style={{
                  margin: '6px 0 0',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: globalDespues > globalAntes ? '#22c55e' : globalDespues < globalAntes ? '#ef4444' : '#64748b',
                }}>
                  {globalDespues > globalAntes ? '+' : ''}{(globalDespues - globalAntes).toFixed(1)}
                </p>
              </div>
            )}
          </div>

          {/* Per-wheel breakdown */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '20px',
            marginBottom: '24px',
          }}>
            {/* Vida Personal stats */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: '#22c55e' }}>
                🌿 Persona
              </h3>
              {vida.antes ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>Inicio</span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#6366f1' }}>{vidaAntes}</span>
                  </div>
                  {vida.despues && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>Final</span>
                        <span style={{ fontSize: '15px', fontWeight: 700, color: '#22c55e' }}>{vidaDespues}</span>
                      </div>
                      <div style={{
                        padding: '10px',
                        background: '#f0fdf4',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: vidaDespues! > vidaAntes! ? '#16a34a' : vidaDespues! < vidaAntes! ? '#dc2626' : '#64748b',
                      }}>
                        {vidaDespues! > vidaAntes!
                          ? `📈 +${(vidaDespues! - vidaAntes!).toFixed(1)} puntos`
                          : vidaDespues! < vidaAntes!
                            ? `📉 ${(vidaDespues! - vidaAntes!).toFixed(1)} puntos`
                            : '➡️ Sin cambios'}
                      </div>
                    </>
                  )}
                  {!vida.despues && (
                    <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>
                      Completa la rueda final para ver tu progreso
                    </p>
                  )}
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>
                  Aun no has completado esta rueda
                </p>
              )}
            </div>

            {/* Creador stats */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: '#6366f1' }}>
                🎯 Creador
              </h3>
              {creador.antes ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>Inicio</span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#6366f1' }}>{creadorAntes}</span>
                  </div>
                  {creador.despues && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>Final</span>
                        <span style={{ fontSize: '15px', fontWeight: 700, color: '#22c55e' }}>{creadorDespues}</span>
                      </div>
                      <div style={{
                        padding: '10px',
                        background: '#eef2ff',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: creadorDespues! > creadorAntes! ? '#16a34a' : creadorDespues! < creadorAntes! ? '#dc2626' : '#64748b',
                      }}>
                        {creadorDespues! > creadorAntes!
                          ? `📈 +${(creadorDespues! - creadorAntes!).toFixed(1)} puntos`
                          : creadorDespues! < creadorAntes!
                            ? `📉 ${(creadorDespues! - creadorAntes!).toFixed(1)} puntos`
                            : '➡️ Sin cambios'}
                      </div>
                    </>
                  )}
                  {!creador.despues && (
                    <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>
                      Completa la rueda final para ver tu progreso
                    </p>
                  )}
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>
                  Aun no has completado esta rueda
                </p>
              )}
            </div>
          </div>

          {/* Side-by-side wheels (read-only) */}
          {(vida.antes || creador.antes) && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}>
              {vida.antes && (
                <div>
                  <h4 style={{ textAlign: 'center', margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#22c55e' }}>
                    🌿 Persona — {vida.despues ? 'Final' : 'Inicio'}
                  </h4>
                  <RuedaVida
                    tipo={vida.despues ? 'despues' : 'antes'}
                    initialScores={(vida.despues || vida.antes).scores}
                    readOnly={true}
                    compareTo={vida.despues ? vida.antes.scores : undefined}
                  />
                </div>
              )}
              {creador.antes && (
                <div>
                  <h4 style={{ textAlign: 'center', margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#6366f1' }}>
                    🎯 Creador — {creador.despues ? 'Final' : 'Inicio'}
                  </h4>
                  <RuedaCreador
                    tipo={creador.despues ? 'despues' : 'antes'}
                    initialScores={(creador.despues || creador.antes).scores}
                    readOnly={true}
                    compareTo={creador.despues ? creador.antes.scores : undefined}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
