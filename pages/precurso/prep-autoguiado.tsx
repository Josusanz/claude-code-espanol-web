import Head from 'next/head'
import Link from 'next/link'
import PrecursoEmailGate from '../../components/PrecursoEmailGate'

function PrepContent() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#0f172a',
    }}>
      <Head>
        <title>Prepara tu proyecto | Precurso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <Link href="/precurso" style={{
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '14px',
          }}>
            ← Precurso
          </Link>
          <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.08)' }} />
          <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#0f172a' }}>
            🎯 Prepara tu proyecto
          </h1>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* Hero */}
        <div style={{
          background: 'linear-gradient(135deg, #5e6ad2, #7c85e3)',
          borderRadius: '20px',
          padding: '40px 32px',
          color: 'white',
          marginBottom: '32px',
        }}>
          <h2 style={{ margin: '0 0 12px', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Antes de empezar a construir
          </h2>
          <p style={{ margin: 0, fontSize: '16px', opacity: 0.9, lineHeight: 1.6 }}>
            Los 10 modulos del curso te guiaran paso a paso, pero necesitas empezar con una idea clara.
            Este modulo de preparacion te ayuda a definir que vas a construir y por que.
          </p>
        </div>

        {/* Step 1: Define tu idea */}
        <section style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{
              width: '36px', height: '36px',
              background: '#5e6ad2', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '16px', fontWeight: 700,
            }}>1</span>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Define tu idea de software</h3>
          </div>
          <p style={{ margin: '0 0 16px', fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
            No necesitas una idea revolucionaria. Necesitas algo que <strong>te importe</strong> lo suficiente como
            para dedicarle tiempo durante 10 modulos. Piensa en:
          </p>
          <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: '15px', color: '#374151', lineHeight: 2 }}>
            <li>Un problema que tu mismo tienes y te gustaria resolver</li>
            <li>Una herramienta que usas a diario pero le faltan cosas</li>
            <li>Un servicio que podrias ofrecer a traves de una web app</li>
            <li>Una comunidad que necesita una plataforma propia</li>
          </ul>
          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: '#f1f5f9',
            borderRadius: '10px',
            fontSize: '14px',
            color: '#475569',
            lineHeight: 1.6,
          }}>
            <strong>Ejemplos de proyectos de alumnos anteriores:</strong> app de gestion de recetas,
            plataforma de reservas para un negocio local, tracker de habitos, dashboard de finanzas
            personales, directorio de servicios.
          </div>
        </section>

        {/* Step 2: Configura tu entorno */}
        <section style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{
              width: '36px', height: '36px',
              background: '#5e6ad2', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '16px', fontWeight: 700,
            }}>2</span>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Comprueba tu entorno</h3>
          </div>
          <p style={{ margin: '0 0 16px', fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
            Si completaste el precurso base, ya tienes todo instalado. Verifica que todo sigue funcionando:
          </p>
          <div style={{
            background: '#1e293b',
            borderRadius: '10px',
            padding: '20px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '14px',
            color: '#e2e8f0',
            lineHeight: 1.8,
            overflowX: 'auto',
          }}>
            <div>node --version</div>
            <div>claude --version</div>
            <div>git --version</div>
          </div>
          <p style={{ margin: '12px 0 0', fontSize: '14px', color: '#64748b' }}>
            Si algo no funciona, vuelve a la seccion de{' '}
            <Link href="/precurso/requisitos" style={{ color: '#5e6ad2', fontWeight: 500 }}>Requisitos</Link>.
          </p>
        </section>

        {/* Step 3: Crea tu CLAUDE.md */}
        <section style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{
              width: '36px', height: '36px',
              background: '#5e6ad2', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '16px', fontWeight: 700,
            }}>3</span>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Escribe tu brief de proyecto</h3>
          </div>
          <p style={{ margin: '0 0 16px', fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
            Antes del modulo 1, escribe un parrafo corto respondiendo estas preguntas.
            Lo usaras como base para tu CLAUDE.md en la primera semana:
          </p>
          <div style={{
            background: '#f1f5f9',
            borderRadius: '10px',
            padding: '20px',
            fontSize: '15px',
            color: '#374151',
            lineHeight: 1.8,
          }}>
            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Mi brief de proyecto:</p>
            <ol style={{ margin: 0, padding: '0 0 0 20px' }}>
              <li>¿Que problema resuelve mi software?</li>
              <li>¿Para quien es? (describe a tu usuario ideal)</li>
              <li>¿Que 3 funcionalidades son imprescindibles?</li>
              <li>¿Como voy a cobrar? (suscripcion, pago unico, freemium)</li>
              <li>¿Que nombre le pongo?</li>
            </ol>
          </div>
        </section>

        {/* CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          padding: '24px',
        }}>
          <p style={{ fontSize: '16px', color: '#374151', marginBottom: '20px' }}>
            ¿Ya tienes tu idea? Empieza a construir.
          </p>
          <Link href="/curso" style={{
            display: 'inline-block',
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: 700,
            color: '#fff',
            background: 'linear-gradient(135deg, #5e6ad2, #7c85e3)',
            borderRadius: '12px',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(94, 106, 210, 0.3)',
          }}>
            Ir al curso →
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function PrepAutoguiadoPage() {
  return (
    <PrecursoEmailGate>
      <PrepContent />
    </PrecursoEmailGate>
  )
}
