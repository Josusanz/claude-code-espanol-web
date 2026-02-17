import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CURSO_SEMANAS } from '../../../../lib/curso-data'
import { getGuiaInstructor, GuiaInstructor } from '../../../../lib/curso-instructor-data'

function GuiaContent({ semana, guia }: { semana: typeof CURSO_SEMANAS[0], guia: GuiaInstructor }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <Head>
        <title>Guía S{semana.num}: {semana.titulo} | Instructor</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/josu-admin/curso" style={{
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            ← Volver
          </Link>
          <div style={{
            width: '1px',
            height: '24px',
            background: '#e2e8f0'
          }} />
          <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
            📋 Guía Semana {semana.num}: {semana.titulo}
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href={`/curso/clase/${semana.num}`} target="_blank" style={{
            padding: '6px 14px',
            background: '#6366f1',
            color: 'white',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
          }}>
            📺 Abrir Pizarra
          </Link>
          <span style={{
            padding: '6px 12px',
            background: '#f0f9ff',
            color: '#0369a1',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 500
          }}>
            {semana.clase.fecha} • {semana.clase.hora}
          </span>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Antes de la clase */}
        <section style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}>
          <h2 style={{
            margin: '0 0 20px',
            fontSize: '18px',
            fontWeight: 600,
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            ⏰ ANTES DE LA CLASE (30 min antes)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {guia.antesDeClase.map((item, i) => (
              <label key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: '#f8fafc',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                color: '#334155'
              }}>
                <input
                  type="checkbox"
                  style={{
                    width: '20px',
                    height: '20px',
                    accentColor: '#6366f1'
                  }}
                />
                {item.texto}
              </label>
            ))}
          </div>
        </section>

        {/* Agenda de la clase */}
        <section style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}>
          <h2 style={{
            margin: '0 0 20px',
            fontSize: '18px',
            fontWeight: 600,
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            📚 AGENDA DE LA CLASE ({semana.clase.duracion})
          </h2>

          <div style={{
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}>
            {guia.agenda.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '20px',
                  borderBottom: i < guia.agenda.length - 1 ? '1px solid #e2e8f0' : 'none',
                  background: item.titulo.includes('DESCANSO') ? '#fef3c7' : 'transparent'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}>
                  <span style={{
                    flexShrink: 0,
                    padding: '4px 10px',
                    background: item.titulo.includes('DESCANSO') ? '#f59e0b' : '#6366f1',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: 'monospace'
                  }}>
                    {item.tiempo}
                  </span>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      margin: '0 0 8px',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#1e293b'
                    }}>
                      {item.titulo}
                    </h4>
                    {item.detalles.length > 0 && (
                      <ul style={{
                        margin: 0,
                        padding: '0 0 0 20px',
                        color: '#64748b',
                        fontSize: '14px',
                        lineHeight: 1.7
                      }}>
                        {item.detalles.map((detalle, j) => (
                          <li key={j} style={{ marginBottom: '4px' }}>{detalle}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Frases clave */}
        <section style={{
          background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #bae6fd',
          marginBottom: '24px'
        }}>
          <h2 style={{
            margin: '0 0 16px',
            fontSize: '18px',
            fontWeight: 600,
            color: '#0369a1',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            💬 FRASES CLAVE
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {guia.frasesClave.map((frase, i) => (
              <div key={i} style={{
                padding: '12px 16px',
                background: 'white',
                borderRadius: '8px',
                fontSize: '15px',
                color: '#0c4a6e',
                fontStyle: 'italic',
                borderLeft: '3px solid #0ea5e9'
              }}>
                "{frase}"
              </div>
            ))}
          </div>
        </section>

        {/* Errores comunes */}
        <section style={{
          background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #fecaca',
          marginBottom: '24px'
        }}>
          <h2 style={{
            margin: '0 0 16px',
            fontSize: '18px',
            fontWeight: 600,
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            ⚠️ ERRORES COMUNES DE ALUMNOS
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {guia.erroresComunes.map((error, i) => (
              <div key={i} style={{
                padding: '12px 16px',
                background: 'white',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#991b1b',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <span style={{ fontSize: '16px' }}>❌</span>
                {error}
              </div>
            ))}
          </div>
        </section>

        {/* Después de la clase */}
        <section style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}>
          <h2 style={{
            margin: '0 0 20px',
            fontSize: '18px',
            fontWeight: 600,
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            🎯 DESPUÉS DE LA CLASE
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {guia.despuesDeClase.map((item, i) => (
              <label key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: '#f0fdf4',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                color: '#166534'
              }}>
                <input
                  type="checkbox"
                  style={{
                    width: '20px',
                    height: '20px',
                    accentColor: '#22c55e'
                  }}
                />
                {item.texto}
              </label>
            ))}
          </div>
        </section>

        {/* Notas adicionales */}
        {guia.notasAdicionales && (
          <section style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{
              margin: '0 0 16px',
              fontSize: '18px',
              fontWeight: 600,
              color: '#1e293b'
            }}>
              📝 Notas adicionales
            </h2>

            <div style={{
              background: '#f8fafc',
              borderRadius: '8px',
              padding: '20px',
              fontSize: '14px',
              lineHeight: 1.7,
              color: '#475569',
              whiteSpace: 'pre-wrap'
            }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: guia.notasAdicionales
                    .replace(/^## (.+)$/gm, '<h3 style="font-size: 16px; font-weight: 600; color: #1e293b; margin: 20px 0 10px;">$1</h3>')
                    .replace(/^### (.+)$/gm, '<h4 style="font-size: 14px; font-weight: 600; color: #334155; margin: 16px 0 8px;">$4</h4>')
                    .replace(/^- (.+)$/gm, '<li style="margin-left: 16px;">$1</li>')
                    .replace(/\n\n/g, '<br/>')
                }}
              />
            </div>
          </section>
        )}

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid #e2e8f0'
        }}>
          {semana.num > 1 ? (
            <Link href={`/josu-admin/curso/semana/${semana.num - 1}`} style={{
              color: '#64748b',
              textDecoration: 'none',
              fontSize: '14px',
              padding: '10px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px'
            }}>
              ← Semana {semana.num - 1}
            </Link>
          ) : <div />}

          {semana.num < 10 ? (
            <Link href={`/josu-admin/curso/semana/${semana.num + 1}`} style={{
              color: '#64748b',
              textDecoration: 'none',
              fontSize: '14px',
              padding: '10px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px'
            }}>
              Semana {semana.num + 1} →
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  )
}

export default function GuiaInstructorPage() {
  const router = useRouter()
  const { num } = router.query
  const semanaNum = parseInt(num as string, 10)

  if (!num || isNaN(semanaNum) || semanaNum < 1 || semanaNum > 10) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#1e293b' }}>
            Semana no encontrada
          </h1>
          <Link href="/josu-admin/curso" style={{ color: '#6366f1' }}>
            ← Volver al panel
          </Link>
        </div>
      </div>
    )
  }

  const semana = CURSO_SEMANAS.find(s => s.num === semanaNum)
  const guia = getGuiaInstructor(semanaNum)

  if (!semana || !guia) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#1e293b' }}>
            Guía no disponible
          </h1>
          <p style={{ color: '#64748b', marginBottom: '16px' }}>
            La guía para la semana {semanaNum} aún no está creada.
          </p>
          <Link href="/josu-admin/curso" style={{ color: '#6366f1' }}>
            ← Volver al panel
          </Link>
        </div>
      </div>
    )
  }

  return <GuiaContent semana={semana} guia={guia} />
}
