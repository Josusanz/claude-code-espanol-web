import Head from 'next/head'
import Link from 'next/link'
import CursoEmailGate from '../../components/CursoEmailGate'
import { usePrecursoProgress } from '../../lib/precurso-data'

function ProgramarConIAContent() {
  const { completed, toggle } = usePrecursoProgress()

  const isCompleted = completed['intro-completo']

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafbfc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#1e293b',
    }}>
      <Head>
        <title>Programar con IA | Curso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'rgba(250, 251, 252, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '12px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/curso" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '8px',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </Link>
          <span style={{ fontWeight: 600, fontSize: '16px', color: '#0f172a' }}>Programar con IA</span>
        </div>
        <button
          onClick={() => { localStorage.removeItem('precurso-access'); window.location.href = '/curso' }}
          style={{
            padding: '8px 18px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#64748b',
            background: 'white',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
          }}
        >
          Salir
        </button>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Hero */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 12px',
            background: '#fffbeb',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#f59e0b',
            marginBottom: '16px'
          }}>
            Lectura: 5 minutos
          </div>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1e293b',
            lineHeight: 1.2
          }}>
            ¿Por qué ya no necesitas saber programar?
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#64748b',
            lineHeight: 1.8
          }}>
            La IA ha cambiado las reglas del juego. En 2026, el 78% de las organizaciones ya usan IA en desarrollo — es lo que se llama "vibe coding". Ahora puedes crear software sin escribir código,
            pero necesitas entender cómo funciona para dirigir a la IA correctamente.
          </p>
        </div>

        {/* Video tutorial */}
        <div style={{
          marginBottom: '48px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.06)',
          background: 'white'
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '24px' }}>🎬</span>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                Video explicativo completo
              </div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                Si prefieres ver en vez de leer (2 min)
              </div>
            </div>
          </div>
          <video
            controls
            style={{
              width: '100%',
              display: 'block',
              background: '#1a1a2e'
            }}
          >
            <source src="/videos/programar-con-ia.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
          <div style={{
            padding: '12px 20px',
            background: '#f1f5f9',
            fontSize: '13px',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>🔊</span>
            <span>Este video incluye narración en español</span>
          </div>
        </div>

        {/* Section 1: El gran cambio */}
        <section id="el-cambio" style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: 'white'
            }}>1</span>
            El gran cambio
          </h2>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '28px',
            marginBottom: '24px',
            border: '1px solid rgba(0,0,0,0.06)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
              Antes (programación tradicional)
            </h3>
            <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#64748b', lineHeight: 2 }}>
              <li>Años aprendiendo sintaxis y lenguajes</li>
              <li>Memorizar funciones, librerías y frameworks</li>
              <li>Depurar errores crípticos durante horas</li>
              <li>Escribir cada línea de código manualmente</li>
            </ul>
          </div>

          <div style={{
            background: '#f0fdf4',
            borderRadius: '16px',
            padding: '28px',
            border: '1px solid #22c55e'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#22c55e', marginBottom: '16px' }}>
              Ahora (programación con IA)
            </h3>
            <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#64748b', lineHeight: 2 }}>
              <li><strong style={{ color: '#1e293b' }}>Describes lo que quieres</strong> en lenguaje natural</li>
              <li><strong style={{ color: '#1e293b' }}>La IA escribe el código</strong> por ti</li>
              <li><strong style={{ color: '#1e293b' }}>Tú supervisas y diriges</strong> el resultado</li>
              <li><strong style={{ color: '#1e293b' }}>Iteras rápidamente</strong> hasta conseguir lo que buscas</li>
            </ul>
          </div>

          <p style={{
            marginTop: '24px',
            fontSize: '16px',
            color: '#64748b',
            lineHeight: 1.8,
            padding: '20px',
            background: '#f1f5f9',
            borderRadius: '12px',
            borderLeft: '4px solid #5e6ad2'
          }}>
            <strong style={{ color: '#1e293b' }}>Piensa en ello así:</strong> No necesitas saber construir un coche
            para conducir. Pero sí necesitas saber qué hacen los pedales, el volante, y las señales de tráfico.
          </p>
        </section>

        {/* Section 2: Qué necesitas saber */}
        <section id="que-necesitas" style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: 'white'
            }}>2</span>
            Lo que SÍ necesitas saber
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#64748b',
            lineHeight: 1.8,
            marginBottom: '24px'
          }}>
            No vas a escribir código, pero necesitas entender estos conceptos para comunicarte
            efectivamente con la IA:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                icon: '📂',
                title: 'Estructura de archivos',
                desc: 'Cómo se organizan las carpetas y archivos en un proyecto. La IA te preguntará "¿dónde quieres que ponga esto?"'
              },
              {
                icon: '🌐',
                title: 'Frontend vs Backend',
                desc: 'Qué parte ve el usuario (frontend) y qué parte procesa datos (backend). Para saber qué pedir.'
              },
              {
                icon: '🔀',
                title: 'Git y versiones',
                desc: 'Cómo guardar tu trabajo y volver atrás si algo sale mal. Es tu "Ctrl+Z" para proyectos enteros.'
              },
              {
                icon: '🚀',
                title: 'Deploy y producción',
                desc: 'Cómo publicar tu app para que otros la usen. El paso final para mostrar tu creación al mundo.'
              },
              {
                icon: '💬',
                title: 'Saber explicar lo que quieres',
                desc: 'Cuanto mejor describas tu idea, mejor código creará la IA. Es la habilidad más importante.'
              }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '16px',
                padding: '20px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.06)'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: '#f1f5f9',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', margin: '0 0 4px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '24px',
            padding: '20px',
            background: '#eef2ff',
            borderRadius: '12px',
            border: '1px solid #5e6ad240'
          }}>
            <p style={{ margin: 0, fontSize: '15px', color: '#1e293b' }}>
              <strong>Todo esto lo aprenderás en el Glosario.</strong> Son conceptos, no código.
              No tienes que memorizar sintaxis ni comandos complicados.
            </p>
          </div>
        </section>

        {/* Section 3: Tu nuevo rol */}
        <section id="tu-rol" style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: 'white'
            }}>3</span>
            Tu nuevo rol: Director de IA
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#64748b',
            lineHeight: 1.8,
            marginBottom: '24px'
          }}>
            Piensa en Claude Code como un programador muy talentoso que trabaja para ti.
            Tu trabajo es ser un buen jefe:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {[
              { emoji: '🎯', title: 'Define el objetivo', desc: 'Qué quieres conseguir' },
              { emoji: '📋', title: 'Da contexto', desc: 'Información relevante' },
              { emoji: '👀', title: 'Revisa el trabajo', desc: 'Verifica que funcione' },
              { emoji: '🔄', title: 'Pide cambios', desc: 'Ajusta hasta que esté bien' }
            ].map((item, i) => (
              <div key={i} style={{
                padding: '20px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.06)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.emoji}</div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: '0 0 4px' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            padding: '24px',
            background: 'linear-gradient(135deg, #5e6ad215, #8b5cf615)',
            borderRadius: '16px',
            border: '1px solid #5e6ad230'
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', margin: '0 0 12px' }}>
              Ejemplo real de cómo trabajarás:
            </h4>
            <div style={{
              background: '#fafbfc',
              borderRadius: '8px',
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#64748b',
              lineHeight: 1.8
            }}>
              <p style={{ margin: '0 0 8px', color: '#5e6ad2' }}>Tú:</p>
              <p style={{ margin: '0 0 16px', color: '#1e293b' }}>
                "Crea una página web con un formulario de contacto. Que tenga campos para nombre,
                email y mensaje. Cuando envíen el formulario, que me llegue un email."
              </p>
              <p style={{ margin: '0 0 8px', color: '#22c55e' }}>Claude Code:</p>
              <p style={{ margin: 0, color: '#1e293b' }}>
                *Crea todos los archivos, configura el envío de emails, y te explica qué ha hecho*
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <div style={{
          marginTop: '40px',
          padding: '32px',
          background: isCompleted ? '#f0fdf4' : 'white',
          borderRadius: '16px',
          border: `1px solid ${isCompleted ? '#22c55e' : 'rgba(0,0,0,0.06)'}`,
          textAlign: 'center'
        }}>
          {isCompleted ? (
            <>
              <span style={{ fontSize: '48px' }}>🎉</span>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#22c55e', margin: '12px 0 8px' }}>
                ¡Entendido!
              </h3>
              <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 20px' }}>
                Ahora ya sabes por qué puedes crear software sin saber programar.
              </p>
              <button
                onClick={() => toggle('intro-completo')}
                style={{
                  padding: '12px 24px',
                  background: '#fafbfc',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '10px',
                  color: '#64748b',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Desmarcar
              </button>
            </>
          ) : (
            <>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: '0 0 8px' }}>
                ¿Lo tienes claro?
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px' }}>
                No necesitas saber código, solo entender los conceptos para dirigir a la IA.
              </p>
              <button
                onClick={() => toggle('intro-completo')}
                style={{
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ✓ Entendido, vamos al glosario
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <div style={{
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Link href="/curso" style={{
            padding: '14px 24px',
            background: 'white',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '10px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Inicio
          </Link>
          <Link href="/curso/glosario" style={{
            padding: '14px 24px',
            background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            Siguiente: Glosario
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function ProgramarConIAPage() {
  return (
    <CursoEmailGate>
      <ProgramarConIAContent />
    </CursoEmailGate>
  )
}
