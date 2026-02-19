import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getPizarra } from '../../../lib/curso-pizarra-data'
import { PasoComponent } from '../../../components/curso-shared/PasoRenderer'

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
