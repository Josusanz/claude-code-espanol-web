import Modulo0Layout from '../../components/Modulo0Layout'
import { usePrecursoProgress } from '../../lib/precurso-data'

function DiscordContent() {
  const { completed, toggle } = usePrecursoProgress()
  const isPageComplete = completed['discord-completo']
  return (
    <>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #5865F2, #7289DA)',
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
        <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '500px', margin: '0 auto' }}>
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
          background: '#5865F2',
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
          <span style={{ background: 'rgba(88, 101, 242, 0.1)', padding: '8px', borderRadius: '8px' }}>1️⃣</span>
          Cómo verificarte
        </h2>
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p style={{ marginBottom: '16px', color: '#64748b' }}>
            Al entrar al servidor, solo verás 2 canales. Para acceder a todo el contenido:
          </p>
          <ol style={{ margin: 0, paddingLeft: '20px', color: '#1e293b' }}>
            <li style={{ marginBottom: '12px' }}>
              Ve al canal <code style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>#✅-verificar</code>
            </li>
            <li style={{ marginBottom: '12px' }}>
              Escribe el comando:
              <div style={{
                background: '#f1f5f9',
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
              Usa <strong>el mismo email</strong> con el que accediste al curso
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
          <span style={{ background: 'rgba(88, 101, 242, 0.1)', padding: '8px', borderRadius: '8px' }}>2️⃣</span>
          Estructura de canales
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Bienvenida */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#5e6ad2' }}>
              👋 BIENVENIDA
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <div><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>#📢-anuncios</code> — Novedades importantes del curso</div>
              <div><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>#✅-verificar</code> — Verifica tu email</div>
              <div><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>#🎉-presentaciones</code> — ¡Preséntate!</div>
            </div>
          </div>

          {/* Primera Promoción */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#5e6ad2' }}>
              🚀 PRIMERA PROMOCIÓN
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <div><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>#💬-general</code> — Charla general</div>
              <div><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>#🏆-logros</code> — Celebra tus avances</div>
              <div><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>#📸-capturas</code> — Comparte tu progreso</div>
              <div><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>#🛠️-proyectos</code> — Crea un hilo para tu proyecto</div>
              <div><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>#☕-off-topic</code> — Charla informal</div>
            </div>
          </div>

          {/* Semanas */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#5e6ad2' }}>
              📅 SEMANAS
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
              Un canal por cada semana del curso (1-10). Cada uno tiene un mensaje fijado con los objetivos, contenido y entregable de la semana.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Comandos */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ background: 'rgba(88, 101, 242, 0.1)', padding: '8px', borderRadius: '8px' }}>3️⃣</span>
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
              background: 'white',
              borderRadius: '10px',
              border: '1px solid rgba(0,0,0,0.06)'
            }}>
              <code style={{
                background: '#f1f5f9',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}>
                {item.cmd}
              </code>
              <span style={{ color: '#64748b', fontSize: '14px' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Logros */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ background: 'rgba(88, 101, 242, 0.1)', padding: '8px', borderRadius: '8px' }}>4️⃣</span>
          Sistema de logros
        </h2>
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p style={{ marginBottom: '16px', color: '#64748b' }}>
            En el canal <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>#🏆-logros</code> hay un mensaje con emojis. <strong>Haz click en el emoji</strong> cuando completes cada logro:
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
                background: '#f1f5f9',
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
          <span style={{ background: 'rgba(88, 101, 242, 0.1)', padding: '8px', borderRadius: '8px' }}>5️⃣</span>
          Roles de progreso
        </h2>
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p style={{ marginBottom: '16px', color: '#64748b' }}>
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
                  background: '#eef2ff',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '14px'
                }}>
                  {item.role}
                </span>
                <span style={{ color: '#64748b', fontSize: '14px' }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Tips */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ background: 'rgba(88, 101, 242, 0.1)', padding: '8px', borderRadius: '8px' }}>💡</span>
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
              background: 'white',
              borderRadius: '10px',
              border: '1px solid rgba(0,0,0,0.06)',
              fontSize: '14px'
            }}>
              {tip}
            </div>
          ))}
        </div>
      </section>

      {/* Completion button */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <button
          onClick={() => toggle('discord-completo')}
          style={{
            width: '100%',
            padding: '16px 24px',
            background: isPageComplete ? '#f0fdf4' : '#22c55e',
            border: `1px solid ${isPageComplete ? '#22c55e' : '#22c55e'}`,
            borderRadius: '12px',
            color: isPageComplete ? '#16a34a' : 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {isPageComplete ? '✓ Completado' : '✓ Marcar como completado'}
        </button>
      </div>

      {/* CTA Final */}
      <div style={{
        textAlign: 'center',
        padding: '32px',
        background: 'rgba(88, 101, 242, 0.1)',
        borderRadius: '16px',
        border: '1px solid #5865F230'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
          ¿Listo para unirte?
        </h3>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>
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
            background: '#5865F2',
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
    </>
  )
}

export default function DiscordPage() {
  return (
    <Modulo0Layout title="Guía del Discord">
      <DiscordContent />
    </Modulo0Layout>
  )
}
