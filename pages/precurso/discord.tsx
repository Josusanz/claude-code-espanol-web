import Head from 'next/head'
import Link from 'next/link'
import PrecursoEmailGate from '../../components/PrecursoEmailGate'
import { useTheme } from './index'

const themes = {
  light: {
    bg: '#ffffff',
    bgSecondary: '#f8fafc',
    bgTertiary: '#f1f5f9',
    text: '#1e293b',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    border: '#e2e8f0',
    accent: '#6366f1',
    accentLight: '#eef2ff',
    success: '#22c55e',
    successLight: '#f0fdf4',
    discord: '#5865F2',
    discordLight: 'rgba(88, 101, 242, 0.1)',
  },
  dark: {
    bg: '#0f172a',
    bgSecondary: '#1e293b',
    bgTertiary: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    border: '#334155',
    accent: '#818cf8',
    accentLight: 'rgba(129, 140, 248, 0.1)',
    success: '#4ade80',
    successLight: 'rgba(74, 222, 128, 0.1)',
    discord: '#5865F2',
    discordLight: 'rgba(88, 101, 242, 0.15)',
  }
}

function DiscordContent() {
  const { theme, toggleTheme } = useTheme()
  const t = themes[theme]

  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: t.text
    }}>
      <Head>
        <title>Guía de Discord | Precurso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: t.bg,
        borderBottom: `1px solid ${t.border}`,
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link href="/precurso" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: t.textSecondary,
          textDecoration: 'none',
          fontSize: '14px'
        }}>
          ← Volver al precurso
        </Link>
        <button
          onClick={toggleTheme}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: `1px solid ${t.border}`,
            background: t.bgSecondary,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: `linear-gradient(135deg, ${t.discord}, #7289DA)`,
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '40px'
          }}>
            💬
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>
            Guía del servidor Discord
          </h1>
          <p style={{ fontSize: '18px', color: t.textSecondary, maxWidth: '500px', margin: '0 auto' }}>
            Todo lo que necesitas saber para sacar el máximo partido a nuestra comunidad
          </p>
        </div>

        {/* Join button */}
        <a
          href="https://discord.gg/RFU7P2vpqa"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '16px 24px',
            background: t.discord,
            borderRadius: '12px',
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '48px'
          }}
        >
          Unirse al servidor Discord
        </a>

        {/* Section: Verificación */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: t.discordLight, padding: '8px', borderRadius: '8px' }}>1️⃣</span>
            Cómo verificarte
          </h2>
          <div style={{ background: t.bgSecondary, borderRadius: '12px', padding: '24px', border: `1px solid ${t.border}` }}>
            <p style={{ marginBottom: '16px', color: t.textSecondary }}>
              Al entrar al servidor, solo verás 2 canales. Para acceder a todo el contenido:
            </p>
            <ol style={{ margin: 0, paddingLeft: '20px', color: t.text }}>
              <li style={{ marginBottom: '12px' }}>
                Ve al canal <code style={{ background: t.bgTertiary, padding: '2px 8px', borderRadius: '4px' }}>#✅-verificar</code>
              </li>
              <li style={{ marginBottom: '12px' }}>
                Escribe el comando:
                <div style={{
                  background: t.bgTertiary,
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginTop: '8px',
                  fontFamily: 'monospace',
                  fontSize: '14px'
                }}>
                  /verificar email:tu@email.com
                </div>
              </li>
              <li style={{ marginBottom: '12px' }}>
                Usa <strong>el mismo email</strong> con el que accediste al precurso
              </li>
              <li>
                ¡Listo! Se te asignará el rol <strong>Alumno</strong> y verás todos los canales
              </li>
            </ol>
          </div>
        </section>

        {/* Section: Canales */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: t.discordLight, padding: '8px', borderRadius: '8px' }}>2️⃣</span>
            Estructura de canales
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Bienvenida */}
            <div style={{ background: t.bgSecondary, borderRadius: '12px', padding: '20px', border: `1px solid ${t.border}` }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: t.accent }}>
                👋 BIENVENIDA
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <div><code style={{ background: t.bgTertiary, padding: '2px 6px', borderRadius: '4px' }}>#📢-anuncios</code> — Novedades importantes del curso</div>
                <div><code style={{ background: t.bgTertiary, padding: '2px 6px', borderRadius: '4px' }}>#✅-verificar</code> — Verifica tu email</div>
                <div><code style={{ background: t.bgTertiary, padding: '2px 6px', borderRadius: '4px' }}>#🎉-presentaciones</code> — ¡Preséntate!</div>
              </div>
            </div>

            {/* Primera Promoción */}
            <div style={{ background: t.bgSecondary, borderRadius: '12px', padding: '20px', border: `1px solid ${t.border}` }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: t.accent }}>
                🚀 PRIMERA PROMOCIÓN
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <div><code style={{ background: t.bgTertiary, padding: '2px 6px', borderRadius: '4px' }}>#💬-general</code> — Charla general</div>
                <div><code style={{ background: t.bgTertiary, padding: '2px 6px', borderRadius: '4px' }}>#🏆-logros</code> — Celebra tus avances</div>
                <div><code style={{ background: t.bgTertiary, padding: '2px 6px', borderRadius: '4px' }}>#📸-capturas</code> — Comparte tu progreso</div>
                <div><code style={{ background: t.bgTertiary, padding: '2px 6px', borderRadius: '4px' }}>#🛠️-proyectos</code> — Crea un hilo para tu proyecto</div>
                <div><code style={{ background: t.bgTertiary, padding: '2px 6px', borderRadius: '4px' }}>#☕-off-topic</code> — Charla informal</div>
              </div>
            </div>

            {/* Semanas */}
            <div style={{ background: t.bgSecondary, borderRadius: '12px', padding: '20px', border: `1px solid ${t.border}` }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: t.accent }}>
                📅 SEMANAS
              </h3>
              <p style={{ fontSize: '14px', color: t.textSecondary, margin: 0 }}>
                Un canal por cada semana del curso (1-10). Cada uno tiene un mensaje fijado con los objetivos, contenido y entregable de la semana.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Comandos */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: t.discordLight, padding: '8px', borderRadius: '8px' }}>3️⃣</span>
            Comandos del bot
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { cmd: '/verificar email:tu@email.com', desc: 'Verifica tu email para acceder a los canales' },
              { cmd: '/horario', desc: 'Ver la próxima clase con link de Zoom' },
              { cmd: '/horario todas:true', desc: 'Ver el calendario completo de clases' },
              { cmd: '/recurso', desc: 'Lista de todos los recursos disponibles' },
              { cmd: '/recurso supabase', desc: 'Link a documentación de Supabase' },
              { cmd: '/recurso nextjs', desc: 'Link a documentación de Next.js' },
              { cmd: '/recurso zoom', desc: 'Link directo a la clase de Zoom' },
              { cmd: '/miproyecto nombre:MiSaaS', desc: 'Crea un hilo para tu proyecto en #proyectos' },
              { cmd: '/info', desc: 'Información básica del curso' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '16px',
                background: t.bgSecondary,
                borderRadius: '10px',
                border: `1px solid ${t.border}`
              }}>
                <code style={{
                  background: t.bgTertiary,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}>
                  {item.cmd}
                </code>
                <span style={{ color: t.textSecondary, fontSize: '14px' }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Logros */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: t.discordLight, padding: '8px', borderRadius: '8px' }}>4️⃣</span>
            Sistema de logros
          </h2>
          <div style={{ background: t.bgSecondary, borderRadius: '12px', padding: '24px', border: `1px solid ${t.border}` }}>
            <p style={{ marginBottom: '16px', color: t.textSecondary }}>
              En el canal <code style={{ background: t.bgTertiary, padding: '2px 6px', borderRadius: '4px' }}>#🏆-logros</code> hay un mensaje con emojis. <strong>Haz click en el emoji</strong> cuando completes cada logro:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { emoji: '🚀', text: 'Primer deploy' },
                { emoji: '💡', text: 'Idea validada' },
                { emoji: '🎨', text: 'UI completada' },
                { emoji: '🗄️', text: 'Base de datos' },
                { emoji: '🔐', text: 'Auth implementado' },
                { emoji: '💳', text: 'Primer pago' },
                { emoji: '🤖', text: 'IA integrada' },
                { emoji: '🏁', text: 'MVP lanzado' },
                { emoji: '🎓', text: 'Graduado' },
              ].map((item, i) => (
                <span key={i} style={{
                  padding: '6px 12px',
                  background: t.bgTertiary,
                  borderRadius: '20px',
                  fontSize: '13px'
                }}>
                  {item.emoji} {item.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Roles */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: t.discordLight, padding: '8px', borderRadius: '8px' }}>5️⃣</span>
            Roles de progreso
          </h2>
          <div style={{ background: t.bgSecondary, borderRadius: '12px', padding: '24px', border: `1px solid ${t.border}` }}>
            <p style={{ marginBottom: '16px', color: t.textSecondary }}>
              Tu rol cambiará según tu avance en el curso:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { role: '🌱 Precurso', desc: 'Completaste el precurso' },
                { role: '🚀 Despegando', desc: 'Semanas 1-3' },
                { role: '⚡ En racha', desc: 'Semanas 4-6' },
                { role: '🔥 Imparable', desc: 'Semanas 7-9' },
                { role: '🎓 Graduado', desc: '¡Terminaste el curso!' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    padding: '6px 12px',
                    background: t.accentLight,
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}>
                    {item.role}
                  </span>
                  <span style={{ color: t.textSecondary, fontSize: '14px' }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Tips */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: t.discordLight, padding: '8px', borderRadius: '8px' }}>💡</span>
            Tips para aprovechar la comunidad
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              '🎉 Preséntate en #presentaciones — ¡queremos conocerte!',
              '📸 Sube capturas de tu progreso — motiva a otros y recibes feedback',
              '🛠️ Crea tu hilo en #proyectos con /miproyecto',
              '🆘 No tengas miedo de preguntar — todos empezamos de cero',
              '👏 Celebra los logros de otros — la comunidad crece juntos',
              '📅 Recibirás recordatorios 1h antes de cada clase',
              '💡 Cada mañana hay un "tip del día" en #general',
            ].map((tip, i) => (
              <div key={i} style={{
                padding: '16px',
                background: t.bgSecondary,
                borderRadius: '10px',
                border: `1px solid ${t.border}`,
                fontSize: '14px'
              }}>
                {tip}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <div style={{
          textAlign: 'center',
          padding: '32px',
          background: t.discordLight,
          borderRadius: '16px',
          border: `1px solid ${t.discord}30`
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
            ¿Listo para unirte?
          </h3>
          <p style={{ color: t.textSecondary, marginBottom: '20px' }}>
            La comunidad te espera. No olvides verificar tu email al entrar.
          </p>
          <a
            href="https://discord.gg/RFU7P2vpqa"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: t.discord,
              borderRadius: '10px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            Unirse al Discord
          </a>
        </div>
      </main>
    </div>
  )
}

export default function DiscordPage() {
  return (
    <PrecursoEmailGate>
      <DiscordContent />
    </PrecursoEmailGate>
  )
}
