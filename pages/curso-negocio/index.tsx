import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

// Estructura del curso completo (10 semanas)
const SEMANAS = [
  { num: 1, titulo: 'LaunchPad - Proyecto Conjunto', entregable: 'Waitlist profesional en producción', emoji: '🚀' },
  { num: 2, titulo: 'Tu Proyecto - Setup + UI', entregable: 'Diseño completo en shadcn/ui', emoji: '🎨' },
  { num: 3, titulo: 'Base de Datos con Supabase', entregable: 'Schema + CRUD funcionando', emoji: '🗄️' },
  { num: 4, titulo: 'Autenticación', entregable: 'Login/registro completo', emoji: '🔐' },
  { num: 5, titulo: 'Feature Principal', entregable: 'Tu feature core funcionando', emoji: '⭐' },
  { num: 6, titulo: 'Features Secundarias', entregable: '2-3 features adicionales', emoji: '✨' },
  { num: 7, titulo: 'Dashboard y Analytics', entregable: 'Panel de métricas + Sentry', emoji: '📊' },
  { num: 8, titulo: 'Pagos con Stripe', entregable: 'Checkout + páginas legales', emoji: '💳' },
  { num: 9, titulo: 'Skills, Testing y Automatización', entregable: 'Tests + Skills propios', emoji: '🤖' },
  { num: 10, titulo: 'Lanzamiento', entregable: 'Software en producción con SEO', emoji: '🎯' },
]

const STACK = [
  { herramienta: 'Claude Code', uso: 'Tu programador IA personal', url: 'https://claude.ai' },
  { herramienta: 'VS Code', uso: 'Editor de código', url: 'https://code.visualstudio.com' },
  { herramienta: 'Next.js 14+', uso: 'Framework React con App Router', url: 'https://nextjs.org' },
  { herramienta: 'TypeScript', uso: 'JavaScript con tipos', url: 'https://typescriptlang.org' },
  { herramienta: 'Tailwind CSS', uso: 'Estilos utility-first', url: 'https://tailwindcss.com' },
  { herramienta: 'shadcn/ui', uso: 'Componentes de alta calidad', url: 'https://ui.shadcn.com' },
  { herramienta: 'Supabase', uso: 'Base de datos + Auth + Storage', url: 'https://supabase.com' },
  { herramienta: 'Stripe', uso: 'Pagos y suscripciones', url: 'https://stripe.com' },
  { herramienta: 'Vercel', uso: 'Deploy y hosting', url: 'https://vercel.com' },
  { herramienta: 'Sentry', uso: 'Monitoreo de errores', url: 'https://sentry.io' },
  { herramienta: 'Resend', uso: 'Emails transaccionales', url: 'https://resend.com' },
  { herramienta: 'Vitest', uso: 'Testing', url: 'https://vitest.dev' },
]

const REGLAS_PROMPTING = [
  {
    num: 1,
    titulo: 'Dale Contexto, No Roles',
    descripcion: 'Claude infiere automáticamente el nivel de expertise necesario. No necesitas decirle quién ser.',
    mal: '"Actúa como un experto en React con 20 años de experiencia..."',
    bien: '[Sube tu contexto real] + "Analiza esto y dame los 3 problemas principales"'
  },
  {
    num: 2,
    titulo: 'Dilo Una Vez y Confía',
    descripcion: 'Claude sigue instrucciones con precisión a la primera. Si añades "recuerda que..." 5 veces, el resultado será PEOR.',
    tips: ['No repitas instrucciones', 'No insistas ni refuerces', 'Sé claro y directo una sola vez']
  },
  {
    num: 3,
    titulo: 'Explica el Por Qué, No Solo el Qué',
    descripcion: 'Cuando Claude entiende el POR QUÉ, generaliza mejor y adapta su comportamiento.',
    mal: '"NUNCA uses puntos suspensivos"',
    bien: '"Tu respuesta será leída por text-to-speech, evita puntos suspensivos porque no sabe pronunciarlos"'
  },
  {
    num: 4,
    titulo: 'Sé Explícito con las Acciones',
    descripcion: 'Claude sigue instrucciones al pie de la letra. La ambigüedad es tu enemigo.',
    tips: ['"Sugiere mejoras" → Te da una lista SIN tocar nada', '"Modifica esta función" → Hace los cambios directamente', '"Crea el componente" vs "Explícame cómo crear" → Resultados MUY diferentes']
  },
  {
    num: 5,
    titulo: 'Usa el Control de Esfuerzo',
    descripcion: 'Claude decide automáticamente cuánto necesita razonar según la complejidad.',
    niveles: [
      { nivel: 'Max', cuando: 'Problemas muy difíciles, arquitectura compleja' },
      { nivel: 'High', cuando: 'Buen equilibrio, desarrollo normal (defecto)' },
      { nivel: 'Medium', cuando: 'Cuando sobre-piensa tareas simples' },
      { nivel: 'Low', cuando: 'Respuestas rápidas y concisas' },
    ]
  },
  {
    num: 6,
    titulo: 'Marca Puntos de Control',
    descripcion: 'Claude es persistente y no para hasta terminar. Si quieres mantenerte involucrado:',
    tips: ['"Antes de hacer cualquier cambio, muéstrame tu plan y espera mi confirmación"', '"Trabajemos paso a paso. Consulta conmigo después de cada paso principal"']
  },
  {
    num: 7,
    titulo: 'Pídele que Te Destruya las Ideas',
    descripcion: 'Claude tiene criterio propio. NO es un "yes-man" que siempre te da la razón. Aprovéchalo:',
    tips: ['"¿Qué hay de malo en este plan? Sé implacable."', '"Dame 3 formas completamente diferentes de abordar esto"', '"¿Qué no estoy viendo?"']
  },
]

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
    warning: '#f59e0b',
    warningLight: '#fffbeb',
    error: '#ef4444',
    errorLight: '#fef2f2',
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
    warning: '#fbbf24',
    warningLight: 'rgba(251, 191, 36, 0.1)',
    error: '#f87171',
    errorLight: 'rgba(248, 113, 113, 0.1)',
  }
}

type SectionId = 'resumen' | 'precurso' | 'reglas' | 'semanas' | 'stack' | 'tecnicas' | 'mentorias' | 'mejoras'

export default function CursoNegocioPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [activeSection, setActiveSection] = useState<SectionId>('resumen')
  const [expandedSemana, setExpandedSemana] = useState<number | null>(1)
  const t = themes[theme]

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const sections: { id: SectionId; emoji: string; title: string }[] = [
    { id: 'resumen', emoji: '📋', title: 'Resumen' },
    { id: 'precurso', emoji: '📚', title: 'Pre-Curso' },
    { id: 'reglas', emoji: '🎯', title: '7 Reglas' },
    { id: 'semanas', emoji: '📅', title: '10 Semanas' },
    { id: 'stack', emoji: '🛠️', title: 'Stack' },
    { id: 'tecnicas', emoji: '⚡', title: 'Técnicas' },
    { id: 'mentorias', emoji: '👤', title: 'Mentorías' },
    { id: 'mejoras', emoji: '🆕', title: 'Extras' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: t.text,
      transition: 'background 0.2s, color 0.2s'
    }}>
      <Head>
        <title>Crea tu Software con IA | Curso Completo 10 Semanas</title>
        <meta name="description" content="De idea a software en producción. Curso de 10 semanas para lanzar tu SaaS con Claude Code, Next.js, Supabase y Stripe." />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: t.bg,
        borderBottom: `1px solid ${t.border}`,
        padding: '12px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '14px'
          }}>CC</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px' }}>Crea tu Software con IA</div>
            <div style={{ fontSize: '12px', color: t.textMuted }}>Segunda Promoción • 23 abril - 19 junio 2026</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            {theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.textSecondary} strokeWidth="2">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.textSecondary} strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <Link href="/" style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 500,
            color: t.textSecondary,
            textDecoration: 'none',
            border: `1px solid ${t.border}`,
            borderRadius: '8px'
          }}>
            Volver
          </Link>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 73px)' }}>
        {/* Sidebar */}
        <aside className="sidebar-desktop" style={{
          width: '220px',
          background: t.bgSecondary,
          borderRight: `1px solid ${t.border}`,
          padding: '20px 0',
          position: 'sticky',
          top: '73px',
          height: 'calc(100vh - 73px)',
          overflowY: 'auto',
          flexShrink: 0
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 20px',
                  background: activeSection === section.id ? t.accentLight : 'transparent',
                  border: 'none',
                  borderLeft: activeSection === section.id ? `3px solid ${t.accent}` : '3px solid transparent',
                  color: activeSection === section.id ? t.accent : t.text,
                  fontSize: '14px',
                  fontWeight: activeSection === section.id ? 600 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <span>{section.emoji}</span>
                {section.title}
              </button>
            ))}
          </nav>

          <div style={{
            margin: '24px 16px 0',
            padding: '16px',
            background: t.bgTertiary,
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: t.accent }}>997€</div>
            <div style={{ fontSize: '12px', color: t.textMuted, textDecoration: 'line-through' }}>1.999€</div>
            <div style={{ fontSize: '13px', color: t.textSecondary, marginTop: '8px' }}>10 plazas máximo</div>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: '32px 24px', maxWidth: '900px' }}>

          {/* RESUMEN */}
          {activeSection === 'resumen' && (
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
                Crea tu Software con IA 🚀
              </h1>
              <p style={{ fontSize: '17px', color: t.textSecondary, marginBottom: '32px' }}>
                De idea a software en producción en 10 semanas
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                {[
                  { label: 'Duración', value: '10 semanas', icon: '📅' },
                  { label: 'Formato', value: 'Clases en vivo', icon: '🎥' },
                  { label: 'Horario', value: '2h/semana (jueves)', icon: '⏰' },
                  { label: 'Mentorías', value: '3 sesiones 1:1', icon: '👤' },
                  { label: 'Plazas', value: 'Máximo 10', icon: '👥' },
                  { label: 'Precio', value: '997€', icon: '💰' },
                ].map(item => (
                  <div key={item.label} style={{
                    padding: '20px',
                    background: t.bgSecondary,
                    borderRadius: '12px',
                    border: `1px solid ${t.border}`
                  }}>
                    <div style={{ fontSize: '20px', marginBottom: '8px' }}>{item.icon}</div>
                    <div style={{ fontSize: '12px', color: t.textMuted, marginBottom: '4px' }}>{item.label}</div>
                    <div style={{ fontSize: '16px', fontWeight: 600 }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
                ¿Qué vas a conseguir?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Tu propio SaaS funcionando con usuarios reales',
                  'Pagos integrados con Stripe',
                  'Base de datos y autenticación profesional',
                  'Dominio propio desplegado en Vercel',
                  'Dominar Claude Code como tu programador personal',
                  'Portfolio real para mostrar',
                  'Monitoreo de errores con Sentry',
                  'Tests automatizados con Vitest',
                  'Emails transaccionales con Resend',
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: t.successLight,
                    borderRadius: '8px',
                    border: `1px solid ${t.success}20`
                  }}>
                    <span style={{ color: t.success, fontSize: '16px' }}>✓</span>
                    <span style={{ fontSize: '14px' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRE-CURSO */}
          {activeSection === 'precurso' && (
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
                Pre-Curso Obligatorio 📚
              </h1>
              <p style={{ fontSize: '17px', color: t.textSecondary, marginBottom: '24px' }}>
                Debe completarse ANTES de la primera clase (5-6 horas)
              </p>

              <div style={{
                padding: '20px',
                background: t.warningLight,
                borderRadius: '12px',
                border: `1px solid ${t.warning}40`,
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>⚠️</span>
                  <span style={{ fontWeight: 600 }}>Requisito obligatorio</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: t.textSecondary }}>
                  No podrás seguir el ritmo del curso sin completar el pre-curso. Planifica hacerlo con tiempo.
                </p>
              </div>

              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Contenido curado (4-5h)</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  { tema: 'Qué es programar', recurso: 'Código Facilito - Nunca He Programado', duracion: '45 min' },
                  { tema: 'Frontend/Backend/DB', recurso: 'EDteam - Analogía del restaurante', duracion: '25 min' },
                  { tema: 'Instalar VS Code', recurso: 'Udemy - Curso gratuito VS Code', duracion: '20 min' },
                  { tema: 'Terminal básico', recurso: 'FreeCodeCamp - 10 comandos esenciales', duracion: '30 min' },
                  { tema: 'Instalar Node.js', recurso: 'FreeCodeCamp - Solo sección instalación', duracion: '20 min' },
                  { tema: 'Git y GitHub', recurso: 'MoureDev - Lecciones 1-15', duracion: '60 min' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: t.bgSecondary,
                    borderRadius: '10px',
                    border: `1px solid ${t.border}`
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: t.accentLight,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: t.accent,
                      fontWeight: 600,
                      fontSize: '14px'
                    }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.tema}</div>
                      <div style={{ fontSize: '13px', color: t.textSecondary }}>{item.recurso}</div>
                    </div>
                    <div style={{ fontSize: '13px', color: t.textMuted }}>{item.duracion}</div>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Contenido propio (1h)</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {[
                  { titulo: 'Bienvenida al curso y metodología', duracion: '10 min' },
                  { titulo: 'Cómo la IA cambia el desarrollo de software', duracion: '15 min' },
                  { titulo: 'Instalar y configurar Claude Code', duracion: '20 min' },
                  { titulo: 'Qué son los Skills y cómo usarlos', duracion: '10 min' },
                  { titulo: 'Las 7 Reglas de Prompting', duracion: '15 min' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: t.accentLight,
                    borderRadius: '10px',
                    border: `1px solid ${t.accent}30`
                  }}>
                    <span style={{ color: t.accent, fontSize: '16px' }}>▶️</span>
                    <span style={{ flex: 1, fontWeight: 500, fontSize: '14px' }}>{item.titulo}</span>
                    <span style={{ fontSize: '13px', color: t.textMuted }}>{item.duracion}</span>
                  </div>
                ))}
              </div>

              <Link href="/precurso" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: t.accent,
                color: 'white',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '15px'
              }}>
                Ir al Pre-Curso →
              </Link>
            </div>
          )}

          {/* 7 REGLAS */}
          {activeSection === 'reglas' && (
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
                Las 7 Reglas de Prompting 🎯
              </h1>
              <p style={{ fontSize: '17px', color: t.textSecondary, marginBottom: '32px' }}>
                Con Claude Opus 4, el prompting funciona diferente. Estas reglas son FUNDAMENTALES.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {REGLAS_PROMPTING.map(regla => (
                  <div key={regla.num} style={{
                    padding: '24px',
                    background: t.bgSecondary,
                    borderRadius: '14px',
                    border: `1px solid ${t.border}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        background: `linear-gradient(135deg, ${t.accent}, #8b5cf6)`,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '14px'
                      }}>{regla.num}</div>
                      <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 600 }}>{regla.titulo}</h3>
                    </div>
                    <p style={{ margin: '0 0 16px', fontSize: '14px', color: t.textSecondary, lineHeight: 1.6 }}>
                      {regla.descripcion}
                    </p>

                    {regla.mal && regla.bien && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{
                          padding: '12px',
                          background: t.errorLight,
                          borderRadius: '8px',
                          fontSize: '13px'
                        }}>
                          <span style={{ color: t.error, fontWeight: 600 }}>❌ MAL:</span>{' '}
                          <span style={{ color: t.textSecondary }}>{regla.mal}</span>
                        </div>
                        <div style={{
                          padding: '12px',
                          background: t.successLight,
                          borderRadius: '8px',
                          fontSize: '13px'
                        }}>
                          <span style={{ color: t.success, fontWeight: 600 }}>✅ BIEN:</span>{' '}
                          <span style={{ color: t.textSecondary }}>{regla.bien}</span>
                        </div>
                      </div>
                    )}

                    {regla.tips && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {regla.tips.map((tip, i) => (
                          <div key={i} style={{
                            padding: '10px 12px',
                            background: t.bgTertiary,
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: t.textSecondary
                          }}>
                            {tip}
                          </div>
                        ))}
                      </div>
                    )}

                    {regla.niveles && (
                      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px' }}>
                        {regla.niveles.map(n => (
                          <React.Fragment key={n.nivel}>
                            <div style={{
                              padding: '8px',
                              background: t.accentLight,
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: t.accent,
                              textAlign: 'center'
                            }}>{n.nivel}</div>
                            <div style={{
                              padding: '8px 12px',
                              background: t.bgTertiary,
                              borderRadius: '6px',
                              fontSize: '13px',
                              color: t.textSecondary
                            }}>{n.cuando}</div>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10 SEMANAS */}
          {activeSection === 'semanas' && (
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
                Estructura de 10 Semanas 📅
              </h1>
              <p style={{ fontSize: '17px', color: t.textSecondary, marginBottom: '32px' }}>
                Cada semana terminas con un entregable concreto
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {SEMANAS.map(semana => (
                  <div
                    key={semana.num}
                    onClick={() => setExpandedSemana(expandedSemana === semana.num ? null : semana.num)}
                    style={{
                      padding: '20px',
                      background: expandedSemana === semana.num ? t.accentLight : t.bgSecondary,
                      borderRadius: '14px',
                      border: `1px solid ${expandedSemana === semana.num ? t.accent : t.border}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: semana.num <= 1 ? `linear-gradient(135deg, ${t.accent}, #8b5cf6)` : t.bgTertiary,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px'
                      }}>{semana.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', color: t.textMuted, marginBottom: '4px' }}>
                          Semana {semana.num}
                          {semana.num === 1 && ' • 2 clases (miércoles + jueves)'}
                          {[1, 5, 8].includes(semana.num) && <span style={{ color: t.accent, marginLeft: '8px' }}>+ Mentoría 1:1</span>}
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 600 }}>{semana.titulo}</div>
                      </div>
                      <svg
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke={t.textMuted} strokeWidth="2"
                        style={{ transform: expandedSemana === semana.num ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>

                    {expandedSemana === semana.num && (
                      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${t.border}` }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 14px',
                          background: t.successLight,
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}>
                          <span style={{ color: t.success }}>📦</span>
                          <span style={{ fontWeight: 500 }}>Entregable:</span>
                          <span style={{ color: t.textSecondary }}>{semana.entregable}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STACK */}
          {activeSection === 'stack' && (
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
                Stack Tecnológico 🛠️
              </h1>
              <p style={{ fontSize: '17px', color: t.textSecondary, marginBottom: '32px' }}>
                Herramientas modernas y probadas en producción
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {STACK.map(item => (
                  <a
                    key={item.herramienta}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '16px',
                      background: t.bgSecondary,
                      borderRadius: '12px',
                      border: `1px solid ${t.border}`,
                      textDecoration: 'none',
                      color: t.text,
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: t.accentLight,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: t.accent,
                      fontWeight: 700,
                      fontSize: '14px'
                    }}>{item.herramienta.slice(0, 2).toUpperCase()}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.herramienta}</div>
                      <div style={{ fontSize: '13px', color: t.textSecondary }}>{item.uso}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* TECNICAS */}
          {activeSection === 'tecnicas' && (
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
                Técnicas Avanzadas ⚡
              </h1>
              <p style={{ fontSize: '17px', color: t.textSecondary, marginBottom: '32px' }}>
                Lo que diferencia USAR Claude Code de DOMINAR Claude Code
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* CLAUDE.md */}
                <div style={{
                  padding: '24px',
                  background: t.bgSecondary,
                  borderRadius: '14px',
                  border: `1px solid ${t.border}`
                }}>
                  <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>📄</span>
                    El Archivo CLAUDE.md
                  </h3>
                  <p style={{ margin: '0 0 16px', fontSize: '14px', color: t.textSecondary }}>
                    Cada proyecto debe tener un archivo CLAUDE.md en la raíz. Claude lo lee automáticamente.
                  </p>
                  <div style={{
                    padding: '16px',
                    background: t.bgTertiary,
                    borderRadius: '10px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    color: t.textSecondary
                  }}>
{`# Proyecto: [Nombre de tu SaaS]

## Stack
- Framework: Next.js 14 con App Router
- Estilos: Tailwind CSS + shadcn/ui
- Base de datos: Supabase (PostgreSQL)
- Auth: Supabase Auth
- Pagos: Stripe
- Deploy: Vercel

## Contexto
[Qué hace tu app en 2-3 líneas]

## Reglas
- Usar App Router, NO Pages Router
- Componentes en /components
- Server Actions para mutaciones
- Comentarios en español
- TypeScript estricto`}
                  </div>
                </div>

                {/* Plan Mode */}
                <div style={{
                  padding: '24px',
                  background: t.bgSecondary,
                  borderRadius: '14px',
                  border: `1px solid ${t.border}`
                }}>
                  <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>📋</span>
                    Plan Mode
                  </h3>
                  <p style={{ margin: '0 0 16px', fontSize: '14px', color: t.textSecondary }}>
                    Antes de que Claude haga cambios grandes, pídele que planifique:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ padding: '12px', background: t.errorLight, borderRadius: '8px', fontSize: '13px' }}>
                      <span style={{ color: t.error, fontWeight: 600 }}>❌</span> "Implementa el sistema de pagos con Stripe"
                    </div>
                    <div style={{ padding: '12px', background: t.successLight, borderRadius: '8px', fontSize: '13px' }}>
                      <span style={{ color: t.success, fontWeight: 600 }}>✅</span> "Antes de implementar Stripe, muéstrame tu plan: qué archivos vas a crear, qué endpoints, qué tablas. Espera mi OK antes de empezar."
                    </div>
                  </div>
                </div>

                {/* Gestión de Contexto */}
                <div style={{
                  padding: '24px',
                  background: t.bgSecondary,
                  borderRadius: '14px',
                  border: `1px solid ${t.border}`
                }}>
                  <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>🧠</span>
                    Gestión de Contexto
                  </h3>
                  <p style={{ margin: '0 0 16px', fontSize: '14px', color: t.textSecondary }}>
                    Cuándo empezar un chat NUEVO:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {[
                      'Cuando cambias de feature (ej: de auth a pagos)',
                      'Cuando la conversación supera 50+ mensajes',
                      'Cuando Claude empieza a "olvidar" cosas',
                      'Cuando quieres un enfoque fresco sin sesgo previo'
                    ].map((item, i) => (
                      <div key={i} style={{
                        padding: '10px 14px',
                        background: t.bgTertiary,
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: t.textSecondary
                      }}>• {item}</div>
                    ))}
                  </div>
                </div>

                {/* GSD */}
                <div style={{
                  padding: '24px',
                  background: `linear-gradient(135deg, ${t.accent}10, ${t.accent}05)`,
                  borderRadius: '14px',
                  border: `1px solid ${t.accent}30`
                }}>
                  <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>🎯</span>
                    GSD: Get Shit Done
                  </h3>
                  <p style={{ margin: '0 0 16px', fontSize: '14px', color: t.textSecondary }}>
                    La mentalidad correcta para trabajar con Claude Code:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      'No busques perfección en el primer intento → Itera rápido',
                      'Si algo no funciona, describe el error exacto → Claude lo arregla',
                      'Divide tareas grandes en pequeñas → Más control',
                      'Usa el chat como un "pair programmer" → Piensa en voz alta',
                      'Revisa el código que genera → Aprende mientras avanzas'
                    ].map((item, i) => (
                      <div key={i} style={{
                        padding: '10px 14px',
                        background: t.bg,
                        borderRadius: '8px',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <span style={{ color: t.accent }}>→</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MENTORIAS */}
          {activeSection === 'mentorias' && (
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
                Mentorías 1:1 👤
              </h1>
              <p style={{ fontSize: '17px', color: t.textSecondary, marginBottom: '32px' }}>
                3 sesiones de 30 minutos en puntos clave del curso
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { semana: 1, titulo: 'Validación de idea', descripcion: 'Validar tu idea de software y definir las 3 features principales' },
                  { semana: 5, titulo: 'Revisión de arquitectura', descripcion: 'Revisar arquitectura del proyecto y resolver bloqueos técnicos' },
                  { semana: 8, titulo: 'Plan de lanzamiento', descripcion: 'Definir plan de lanzamiento y estrategia de monetización' },
                ].map(mentoria => (
                  <div key={mentoria.semana} style={{
                    padding: '24px',
                    background: t.bgSecondary,
                    borderRadius: '14px',
                    border: `1px solid ${t.border}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: `linear-gradient(135deg, ${t.accent}, #8b5cf6)`,
                      borderRadius: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      <div style={{ fontSize: '10px', opacity: 0.8 }}>Semana</div>
                      <div style={{ fontSize: '20px', fontWeight: 700 }}>{mentoria.semana}</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>{mentoria.titulo}</div>
                      <div style={{ fontSize: '14px', color: t.textSecondary }}>{mentoria.descripcion}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '32px',
                padding: '20px',
                background: t.accentLight,
                borderRadius: '12px',
                border: `1px solid ${t.accent}30`
              }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 600 }}>Sistema de soporte adicional</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Grupo de WhatsApp exclusivo',
                    'Respuesta en 24h entre clases',
                    'Grabación de todas las sesiones',
                    'Acceso de por vida al material'
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                      <span style={{ color: t.accent }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MEJORAS / EXTRAS */}
          {activeSection === 'mejoras' && (
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
                Extras del Curso 🆕
              </h1>
              <p style={{ fontSize: '17px', color: t.textSecondary, marginBottom: '32px' }}>
                Lo que añadimos para que tu software sea profesional de verdad
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  {
                    emoji: '🧪',
                    titulo: 'Testing con Vitest',
                    descripcion: 'Tests unitarios y de integración. Especialmente importante para pagos.',
                    semana: 9
                  },
                  {
                    emoji: '🔴',
                    titulo: 'Monitoreo con Sentry',
                    descripcion: 'Cuando algo falle en producción, lo sabrás inmediatamente.',
                    semana: 7
                  },
                  {
                    emoji: '🔍',
                    titulo: 'SEO y Performance',
                    descripcion: 'Meta tags dinámicos, OpenGraph images, Lighthouse optimization.',
                    semana: 10
                  },
                  {
                    emoji: '⚖️',
                    titulo: 'Páginas Legales',
                    descripcion: 'Política de privacidad, términos de servicio, cookies consent.',
                    semana: 8
                  },
                  {
                    emoji: '📧',
                    titulo: 'Emails Transaccionales',
                    descripcion: 'Bienvenida, confirmación de pago, reset de contraseña, notificaciones.',
                    semana: 4
                  },
                  {
                    emoji: '🔄',
                    titulo: 'CI/CD y Preview Deploys',
                    descripcion: 'Flujo profesional con Vercel: cada PR tiene su preview.',
                    semana: 2
                  },
                  {
                    emoji: '💾',
                    titulo: 'Backups Automáticos',
                    descripcion: 'Configurar backups de Supabase y plan de recuperación.',
                    semana: 3
                  },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '20px',
                    background: t.bgSecondary,
                    borderRadius: '14px',
                    border: `1px solid ${t.border}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: t.successLight,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      flexShrink: 0
                    }}>{item.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 600, fontSize: '15px' }}>{item.titulo}</span>
                        <span style={{
                          padding: '2px 8px',
                          background: t.accentLight,
                          borderRadius: '4px',
                          fontSize: '11px',
                          color: t.accent,
                          fontWeight: 500
                        }}>Semana {item.semana}</span>
                      </div>
                      <div style={{ fontSize: '14px', color: t.textSecondary }}>{item.descripcion}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '32px',
                padding: '24px',
                background: `linear-gradient(135deg, ${t.success}15, ${t.success}05)`,
                borderRadius: '14px',
                border: `1px solid ${t.success}30`,
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600 }}>
                  ¿Listo para crear tu software?
                </h3>
                <p style={{ margin: '0 0 16px', fontSize: '14px', color: t.textSecondary }}>
                  Empieza por el pre-curso para llegar preparado a la primera clase
                </p>
                <Link href="/precurso" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: t.success,
                  color: 'white',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '15px'
                }}>
                  Ir al Pre-Curso →
                </Link>
              </div>
            </div>
          )}

        </main>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
        }
      `}</style>
    </div>
  )
}

// React import for Fragment
import React from 'react'
