import Head from 'next/head'
import Link from 'next/link'
import PrecursoEmailGate from '../../components/PrecursoEmailGate'

function VideoEmbed({ url, title }: { url: string; title: string }) {
  // Convert YouTube URL to embed URL
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
      background: '#000',
      marginBottom: '16px'
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

function ResourceCard({
  title,
  source,
  duration,
  url,
  description,
  videoUrl
}: {
  title: string
  source: string
  duration: string
  url: string
  description: string
  videoUrl?: string
}) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px'
    }}>
      {videoUrl && <VideoEmbed url={videoUrl} title={title} />}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#1a1a2e',
            margin: '0 0 8px 0'
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            margin: '0 0 12px 0'
          }}>
            {description}
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '13px',
            color: '#94a3b8'
          }}>
            <span>📺 {source}</span>
            <span>⏱️ {duration}</span>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            background: '#f1f5f9',
            color: '#475569',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            whiteSpace: 'nowrap'
          }}
        >
          Ver recurso
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
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
          <span style={{
            fontSize: '13px',
            color: '#5e6ad2',
            fontWeight: 500
          }}>
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
            ⏱️ ~45 minutos
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#1a1a2e',
            margin: '0 0 16px 0'
          }}>
            Qué es Programar y Cómo Funciona
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#64748b',
            margin: 0,
            lineHeight: 1.6
          }}>
            Entiende los conceptos básicos del software antes de empezar a crear con IA.
          </p>
        </div>

        {/* Intro */}
        <div style={{
          background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid #c7d2fe'
        }}>
          <p style={{
            fontSize: '15px',
            color: '#4338ca',
            margin: 0,
            lineHeight: 1.7
          }}>
            <strong>¿Por qué esto importa?</strong> Aunque la IA va a escribir el código por ti,
            necesitas entender los conceptos básicos para poder comunicarte con ella y entender
            lo que está haciendo. Es como aprender los ingredientes básicos de cocina antes de
            usar una thermomix.
          </p>
        </div>

        {/* Resources */}
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#1a1a2e',
          marginBottom: '20px'
        }}>
          📚 Recurso Principal
        </h2>

        <ResourceCard
          title="Curso Programación Básica - Nunca He Programado"
          source="Código Facilito"
          duration="45 min (vídeos 1-6)"
          url="https://www.youtube.com/playlist?list=PLpOqH6AE0tNgqknxjMAKVId3rDOnuTqOl"
          description="Explica desde cero qué es un lenguaje, variables, funciones, objetos y APIs. Muy bien estructurado y en español."
          videoUrl="https://www.youtube.com/watch?v=6W2wYwHQNT4"
        />

        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#1a1a2e',
          marginBottom: '20px'
        }}>
          🔄 Alternativas
        </h2>

        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <ul style={{
            margin: 0,
            padding: '0 0 0 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <li>
              <a
                href="https://www.youtube.com/c/paborras"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#5e6ad2', fontWeight: 500 }}
              >
                Píldoras Informáticas
              </a>
              <span style={{ color: '#64748b' }}> - Canal con explicaciones muy didácticas</span>
            </li>
            <li>
              <a
                href="https://www.freecodecamp.org/espanol/news/que-es-programacion-manual-para-principiantes/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#5e6ad2', fontWeight: 500 }}
              >
                FreeCodeCamp Español
              </a>
              <span style={{ color: '#64748b' }}> - Artículo: ¿Qué es programación? Manual para principiantes</span>
            </li>
          </ul>
        </div>

        {/* Key concepts */}
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#1a1a2e',
          margin: '40px 0 20px 0'
        }}>
          🎯 Conceptos Clave que Debes Entender
        </h2>

        <div style={{
          display: 'grid',
          gap: '12px'
        }}>
          {[
            { term: 'Variable', def: 'Un contenedor para guardar datos (como una caja con etiqueta)' },
            { term: 'Función', def: 'Un conjunto de instrucciones reutilizables (como una receta)' },
            { term: 'API', def: 'Una forma de que dos programas se comuniquen entre sí' },
            { term: 'Objeto', def: 'Una estructura que agrupa datos relacionados' },
            { term: 'Loop/Bucle', def: 'Repetir una acción múltiples veces' },
            { term: 'Condicional', def: 'Tomar decisiones: "si pasa X, haz Y"' }
          ].map(item => (
            <div
              key={item.term}
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '16px 20px',
                display: 'flex',
                gap: '12px'
              }}
            >
              <span style={{
                fontWeight: 600,
                color: '#5e6ad2',
                minWidth: '100px'
              }}>
                {item.term}
              </span>
              <span style={{ color: '#475569' }}>{item.def}</span>
            </div>
          ))}
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
