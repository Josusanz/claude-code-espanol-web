import Head from 'next/head'
import Link from 'next/link'
import PrecursoEmailGate from '../../components/PrecursoEmailGate'

function VideoEmbed({ url, title }: { url: string; title: string }) {
  let embedUrl = url
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0]
    embedUrl = `https://www.youtube.com/embed/${videoId}`
  } else if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    embedUrl = `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <div style={{
      position: 'relative',
      paddingBottom: '56.25%',
      height: 0,
      overflow: 'hidden',
      borderRadius: '12px',
      background: '#000'
    }}>
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none'
        }}
      />
    </div>
  )
}

function PageContent() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafbfc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <Head>
        <title>Qué es Programar | Precurso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link href="/precurso" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#64748b',
            fontSize: '14px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Volver al índice
          </Link>
          <span style={{ fontSize: '13px', color: '#5e6ad2', fontWeight: 500 }}>
            Módulo 1 de 6
          </span>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Title */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: '#eef2ff',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#5e6ad2',
            fontWeight: 500,
            marginBottom: '16px'
          }}>
            ⏱️ ~20 minutos
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#1a1a2e',
            margin: '0 0 16px 0'
          }}>
            ¿Qué es programar? 🤔
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#64748b',
            margin: 0,
            lineHeight: 1.6
          }}>
            Una introducción súper simple. No necesitas memorizar nada, solo entender la idea general.
          </p>
        </div>

        {/* Reassurance */}
        <div style={{
          background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid #86efac'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <span style={{ fontSize: '32px' }}>🎯</span>
            <div>
              <h3 style={{ margin: '0 0 8px 0', color: '#166534', fontSize: '16px', fontWeight: 600 }}>
                Tranquilo, no vas a programar tú
              </h3>
              <p style={{ margin: 0, color: '#166534', fontSize: '14px', lineHeight: 1.6 }}>
                En el curso, <strong>Claude Code escribirá el código por ti</strong>. Este módulo solo te ayuda a entender
                de qué va todo esto para que puedas comunicarte mejor con la IA. Es como aprender qué es una cocina
                antes de usar una thermomix.
              </p>
            </div>
          </div>
        </div>

        {/* Main Video */}
        <div style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <span style={{
              background: '#fbbf24',
              color: '#1a1a2e',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase'
            }}>
              Video principal
            </span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>~12 min</span>
          </div>

          <VideoEmbed
            url="https://www.youtube.com/watch?v=X5Sfu8WmFxk"
            title="¿Qué es programar?"
          />

          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', margin: '16px 0 8px 0' }}>
            ¿Qué es la programación? - Explicado fácil
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Una explicación clara y visual de qué significa programar, sin tecnicismos innecesarios.
          </p>
        </div>

        {/* Simple analogy */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 16px 0' }}>
            🍳 La analogía más simple
          </h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{ margin: 0, color: '#475569', fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Programar es como escribir una receta de cocina:</strong>
              </p>
              <ul style={{ margin: '12px 0 0 0', paddingLeft: '20px', color: '#64748b', fontSize: '14px', lineHeight: 1.8 }}>
                <li>Los <strong>ingredientes</strong> son los datos (texto, números, imágenes)</li>
                <li>Los <strong>pasos de la receta</strong> son las instrucciones del código</li>
                <li>El <strong>plato final</strong> es tu app funcionando</li>
                <li>El <strong>cocinero</strong> es el ordenador siguiendo tus instrucciones</li>
              </ul>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid #c7d2fe'
            }}>
              <p style={{ margin: 0, color: '#4338ca', fontSize: '14px' }}>
                💡 <strong>Y aquí viene lo bueno:</strong> Con Claude Code, tú solo describes el plato que quieres
                ("hazme una tortilla de patatas") y la IA escribe la receta completa por ti.
              </p>
            </div>
          </div>
        </div>

        {/* Key concepts - simplified */}
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#1a1a2e',
          margin: '0 0 20px 0'
        }}>
          📝 4 conceptos que es útil conocer
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
          No necesitas memorizarlos. Solo familiarizarte con las palabras.
        </p>

        <div style={{ display: 'grid', gap: '12px', marginBottom: '32px' }}>
          {[
            {
              emoji: '📦',
              term: 'Variable',
              simple: 'Una caja con nombre donde guardas cosas',
              example: 'nombre = "María", edad = 25'
            },
            {
              emoji: '🔧',
              term: 'Función',
              simple: 'Una tarea con nombre que puedes repetir',
              example: 'enviarEmail(), calcularPrecio()'
            },
            {
              emoji: '🔌',
              term: 'API',
              simple: 'La forma de que dos programas se hablen',
              example: 'Tu app habla con Stripe para cobrar'
            },
            {
              emoji: '❓',
              term: 'Condicional',
              simple: '"Si pasa esto, haz aquello"',
              example: 'Si el usuario pagó → mostrar contenido'
            }
          ].map(item => (
            <div
              key={item.term}
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}
            >
              <span style={{ fontSize: '24px' }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: '#1a1a2e' }}>{item.term}</span>
                  <span style={{ color: '#94a3b8' }}>→</span>
                  <span style={{ color: '#64748b', fontSize: '14px' }}>{item.simple}</span>
                </div>
                <code style={{
                  fontSize: '12px',
                  color: '#5e6ad2',
                  background: '#f1f5f9',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {item.example}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Optional extra video */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 12px 0' }}>
            🎬 Opcional: Si quieres profundizar más
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#64748b', fontSize: '14px', lineHeight: 2 }}>
            <li>
              <a
                href="https://www.youtube.com/watch?v=6W2wYwHQNT4"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#5e6ad2', fontWeight: 500 }}
              >
                Curso de programación básica
              </a> - Código Facilito (más técnico, ~45 min)
            </li>
            <li>
              <a
                href="https://www.freecodecamp.org/espanol/news/que-es-programacion-manual-para-principiantes/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#5e6ad2', fontWeight: 500 }}
              >
                ¿Qué es programación? Manual para principiantes
              </a> - FreeCodeCamp (lectura)
            </li>
          </ul>
        </div>

        {/* Completion message */}
        <div style={{
          background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          border: '1px solid #c7d2fe'
        }}>
          <span style={{ fontSize: '32px' }}>✅</span>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#3730a3', margin: '12px 0 8px 0' }}>
            ¡Eso es todo por ahora!
          </h3>
          <p style={{ fontSize: '14px', color: '#4338ca', margin: 0 }}>
            No necesitas saber más. En el curso, Claude Code se encarga del código.
          </p>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <Link href="/precurso" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Índice
          </Link>
          <Link href="/precurso/frontend-backend" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #5e6ad2 0%, #7c3aed 100%)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500
          }}>
            Siguiente: Frontend vs Backend
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function QueEsProgramarPage() {
  return (
    <PrecursoEmailGate>
      <PageContent />
    </PrecursoEmailGate>
  )
}
