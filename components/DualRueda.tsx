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
  const [activeTab, setActiveTab] = useState<'antes' | 'despues' | 'estadisticas'>('antes')

  const migrated = migrateDualRueda(ruedas)
  const creador = migrated.creador || {}
  const vida = migrated.vida || {}

  // Auto-select tab on mount
  useEffect(() => {
    const initial = migrateDualRueda(ruedas)
    const initialVida = initial.vida || {}
    const initialCreador = initial.creador || {}
    if ((initialVida.antes && initialVida.despues) || (initialCreador.antes && initialCreador.despues)) {
      setActiveTab('estadisticas')
    } else if (initialVida.antes || initialCreador.antes) {
      // If already filled "antes", go to "despues" or stay on "antes"
      setActiveTab('antes')
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

  const hasAnyAntes = !!(creador.antes || vida.antes)
  const hasAnyDespues = !!(creador.despues || vida.despues)
  const hasComparison = hasAnyAntes && hasAnyDespues

  const tabs: { key: 'antes' | 'despues' | 'estadisticas'; label: string; emoji: string; color: string; show: boolean }[] = [
    { key: 'antes', label: 'Antes del curso', emoji: '📍', color: '#6366f1', show: true },
    { key: 'despues', label: 'Final del curso', emoji: '🏆', color: '#16a34a', show: true },
    { key: 'estadisticas', label: 'Estadísticas', emoji: '📊', color: '#f59e0b', show: hasAnyAntes },
  ]

  return (
    <div>
      {/* Main tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
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
            {tab.key === 'antes' && hasAnyAntes && <span style={{ marginLeft: '6px', opacity: 0.7 }}>✓</span>}
            {tab.key === 'despues' && hasAnyDespues && <span style={{ marginLeft: '6px', opacity: 0.7 }}>✓</span>}
            {tab.key === 'estadisticas' && hasComparison && <span style={{ marginLeft: '6px', opacity: 0.7 }}>✓</span>}
          </button>
        ))}
      </div>

      {/* ===== ANTES DEL CURSO ===== */}
      {activeTab === 'antes' && (
        <div>
          <p style={{
            textAlign: 'center',
            fontSize: '15px',
            color: '#64748b',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>
            Evalúa cómo te sientes ahora, al inicio del curso. Rellena ambas ruedas.
          </p>

          {/* Persona wheel */}
          <div style={{
            marginBottom: '32px',
            padding: '24px',
            background: '#fff',
            borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{
              margin: '0 0 4px',
              fontSize: '18px',
              fontWeight: 700,
              color: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              🌿 Persona
              {vida.antes && (
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '2px 10px', borderRadius: '6px' }}>
                  ✓ Completada{vida.antes.savedAt ? ` el ${formatDate(vida.antes.savedAt)}` : ''}
                </span>
              )}
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#94a3b8' }}>
              Tu bienestar personal: salud, relaciones, finanzas, propósito...
            </p>
            <RuedaVida
              tipo="antes"
              initialScores={vida.antes?.scores}
              onSave={(scores) => onSave('vida', 'antes', scores)}
              readOnly={false}
            />
          </div>

          {/* Creador wheel */}
          <div style={{
            padding: '24px',
            background: '#fff',
            borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{
              margin: '0 0 4px',
              fontSize: '18px',
              fontWeight: 700,
              color: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              🎯 Creador
              {creador.antes && (
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '2px 10px', borderRadius: '6px' }}>
                  ✓ Completada{creador.antes.savedAt ? ` el ${formatDate(creador.antes.savedAt)}` : ''}
                </span>
              )}
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#94a3b8' }}>
              Tus habilidades como creador: técnicas, negocio, marketing, producto...
            </p>
            <RuedaCreador
              tipo="antes"
              initialScores={creador.antes?.scores}
              onSave={(scores) => onSave('creador', 'antes', scores)}
              readOnly={false}
            />
          </div>
        </div>
      )}

      {/* ===== FINAL DEL CURSO ===== */}
      {activeTab === 'despues' && (
        <div>
          {!hasAnyAntes ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
            }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🔒</span>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#0f172a' }}>
                Primero completa tus ruedas iniciales
              </h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                Necesitas un punto de partida para comparar al final del curso.
              </p>
              <button
                onClick={() => setActiveTab('antes')}
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
                Completar ruedas iniciales
              </button>
            </div>
          ) : (
            <>
              <p style={{
                textAlign: 'center',
                fontSize: '15px',
                color: '#64748b',
                marginBottom: '24px',
                lineHeight: 1.6,
              }}>
                Evalúa cómo te sientes al final del curso. ¿Cuánto has crecido?
              </p>

              {/* Persona wheel */}
              <div style={{
                marginBottom: '32px',
                padding: '24px',
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                <h3 style={{
                  margin: '0 0 4px',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  🌿 Persona
                  {vida.despues && (
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '2px 10px', borderRadius: '6px' }}>
                      ✓ Completada{vida.despues.savedAt ? ` el ${formatDate(vida.despues.savedAt)}` : ''}
                    </span>
                  )}
                </h3>
                <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#94a3b8' }}>
                  Tu bienestar personal ahora. Compara con tu punto de partida.
                </p>
                {vida.antes ? (
                  <RuedaVida
                    tipo="despues"
                    initialScores={vida.despues?.scores}
                    onSave={(scores) => onSave('vida', 'despues', scores)}
                    compareTo={vida.despues ? vida.antes?.scores : undefined}
                  />
                ) : (
                  <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '14px', padding: '24px' }}>
                    Completa primero la rueda Persona en "Antes del curso"
                  </p>
                )}
              </div>

              {/* Creador wheel */}
              <div style={{
                padding: '24px',
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                <h3 style={{
                  margin: '0 0 4px',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#6366f1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  🎯 Creador
                  {creador.despues && (
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '2px 10px', borderRadius: '6px' }}>
                      ✓ Completada{creador.despues.savedAt ? ` el ${formatDate(creador.despues.savedAt)}` : ''}
                    </span>
                  )}
                </h3>
                <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#94a3b8' }}>
                  Tus habilidades como creador ahora. Compara con tu punto de partida.
                </p>
                {creador.antes ? (
                  <RuedaCreador
                    tipo="despues"
                    initialScores={creador.despues?.scores}
                    onSave={(scores) => onSave('creador', 'despues', scores)}
                    compareTo={creador.despues ? creador.antes?.scores : undefined}
                  />
                ) : (
                  <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '14px', padding: '24px' }}>
                    Completa primero la rueda Creador en "Antes del curso"
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ===== ESTADÍSTICAS ===== */}
      {activeTab === 'estadisticas' && (
        <div>
          {!hasAnyAntes ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
            }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>📊</span>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#0f172a' }}>
                No hay datos todavía
              </h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                Completa tus ruedas iniciales para ver estadísticas.
              </p>
            </div>
          ) : (
            <>
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
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Puntuación global (inicio)</p>
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
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Puntuación global (final)</p>
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
                              ? `+${(vidaDespues! - vidaAntes!).toFixed(1)} puntos`
                              : vidaDespues! < vidaAntes!
                                ? `${(vidaDespues! - vidaAntes!).toFixed(1)} puntos`
                                : 'Sin cambios'}
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
                      Aún no has completado esta rueda
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
                              ? `+${(creadorDespues! - creadorAntes!).toFixed(1)} puntos`
                              : creadorDespues! < creadorAntes!
                                ? `${(creadorDespues! - creadorAntes!).toFixed(1)} puntos`
                                : 'Sin cambios'}
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
                      Aún no has completado esta rueda
                    </p>
                  )}
                </div>
              </div>

              {/* Side-by-side comparison wheels */}
              {hasComparison && (
                <>
                  <h3 style={{ textAlign: 'center', margin: '32px 0 20px', fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                    Comparación visual
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px',
                  }}>
                    {vida.antes && vida.despues && (
                      <div>
                        <h4 style={{ textAlign: 'center', margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#22c55e' }}>
                          🌿 Persona — Final vs Inicio
                        </h4>
                        <RuedaVida
                          tipo="despues"
                          initialScores={vida.despues.scores}
                          readOnly={true}
                          compareTo={vida.antes.scores}
                        />
                      </div>
                    )}
                    {creador.antes && creador.despues && (
                      <div>
                        <h4 style={{ textAlign: 'center', margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#6366f1' }}>
                          🎯 Creador — Final vs Inicio
                        </h4>
                        <RuedaCreador
                          tipo="despues"
                          initialScores={creador.despues.scores}
                          readOnly={true}
                          compareTo={creador.antes.scores}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Read-only wheels if only antes exists */}
              {!hasComparison && (
                <>
                  <h3 style={{ textAlign: 'center', margin: '32px 0 20px', fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                    Tus ruedas actuales
                  </h3>
                  <p style={{ textAlign: 'center', fontSize: '14px', color: '#94a3b8', marginBottom: '20px' }}>
                    Completa las ruedas finales para ver la comparación
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px',
                  }}>
                    {vida.antes && (
                      <div>
                        <h4 style={{ textAlign: 'center', margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#22c55e' }}>
                          🌿 Persona — Inicio
                        </h4>
                        <RuedaVida
                          tipo="antes"
                          initialScores={vida.antes.scores}
                          readOnly={true}
                        />
                      </div>
                    )}
                    {creador.antes && (
                      <div>
                        <h4 style={{ textAlign: 'center', margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#6366f1' }}>
                          🎯 Creador — Inicio
                        </h4>
                        <RuedaCreador
                          tipo="antes"
                          initialScores={creador.antes.scores}
                          readOnly={true}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
