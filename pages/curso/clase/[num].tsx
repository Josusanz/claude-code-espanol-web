import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import CursoEmailGate from '../../../components/CursoEmailGate'
import { getPizarra, getPizarrasForSemana } from '../../../lib/curso-pizarra-data'
import { PasoComponent } from '../../../components/curso-shared/PasoRenderer'
import type { NextPageWithLayout } from '../../_app'

const PizarraClasePage: NextPageWithLayout = () => {
  return <PizarraClaseContent />
}

PizarraClasePage.getLayout = (page: ReactElement) => (
  <CursoEmailGate>{page}</CursoEmailGate>
)

export default PizarraClasePage

function PizarraClaseContent() {
  const router = useRouter()
  const { num, dia } = router.query
  const semanaNum = parseInt(num as string, 10)
  const diaNum = dia ? parseInt(dia as string, 10) : undefined

  if (!num || isNaN(semanaNum)) {
    return null
  }

  const pizarra = getPizarra(semanaNum, diaNum)
  const allPizarras = getPizarrasForSemana(semanaNum)
  const hasMultipleDays = allPizarras.length > 1

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
        <title>Clase S{pizarra.semanaNum}{pizarra.dia ? ` D${pizarra.dia}` : ''}: {pizarra.titulo}</title>
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
            <Link href={`/curso/semana/${semanaNum}`} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              color: '#6366f1', textDecoration: 'none', fontSize: '13px', fontWeight: 500,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              Semana {semanaNum}
            </Link>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <span style={{ fontSize: '20px' }}>{pizarra.emoji}</span>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '15px',
                fontWeight: 700,
                color: '#1e293b',
              }}>
                {pizarra.titulo}
              </h1>
              <p style={{
                margin: 0,
                fontSize: '12px',
                color: '#64748b',
              }}>
                {pasosReales.length} pasos
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {/* Day tabs for multi-day weeks */}
            {hasMultipleDays && allPizarras.map((p) => {
              const isActive = p.dia === pizarra.dia
              return (
                <Link
                  key={p.dia}
                  href={`/curso/clase/${semanaNum}?dia=${p.dia}`}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#fff' : '#64748b',
                    background: isActive ? '#6366f1' : '#f8fafc',
                    border: `1px solid ${isActive ? '#6366f1' : '#e2e8f0'}`,
                    borderRadius: '6px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {p.emoji} Día {p.dia}
                </Link>
              )
            })}

            {/* Prev/next semana nav */}
            {!hasMultipleDays && (
              <>
                {semanaNum > 1 && (
                  <Link href={`/curso/clase/${semanaNum - 1}`} style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    color: '#64748b',
                    textDecoration: 'none',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontWeight: 500,
                  }}>
                    ← S{semanaNum - 1}
                  </Link>
                )}
                {semanaNum < 10 && (
                  <Link href={`/curso/clase/${semanaNum + 1}`} style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    color: '#64748b',
                    textDecoration: 'none',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontWeight: 500,
                  }}>
                    S{semanaNum + 1} →
                  </Link>
                )}
              </>
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

        {/* Video embed */}
        {pizarra.videoEmbed && (
          <div style={{
            marginTop: '32px',
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{
              margin: '0 0 16px',
              fontSize: '18px',
              fontWeight: 600,
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span>🎬</span> Grabación de la clase
            </h3>
            <div style={{
              position: 'relative',
              paddingBottom: '62.5%',
              height: 0,
              background: '#0f172a',
              borderRadius: '10px',
              overflow: 'hidden',
            }}>
              <iframe
                src={pizarra.videoEmbed}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: '48px',
          textAlign: 'center',
          padding: '24px',
          color: '#94a3b8',
          fontSize: '14px',
        }}>
          <p style={{ margin: '0 0 12px' }}>
            ¿Atascado? Pregunta en el Discord del curso o levanta la mano en clase.
          </p>
          <Link href={`/curso/semana/${semanaNum}`} style={{
            color: '#6366f1', textDecoration: 'none', fontWeight: 500,
          }}>
            ← Volver a Semana {semanaNum}
          </Link>
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
