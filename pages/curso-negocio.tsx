import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function CursoNegocioLanding() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme-curso')
    if (saved) setIsDark(saved === 'dark')
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('theme-curso', next ? 'dark' : 'light')
  }

  const curriculum = [
    { week: '1', title: 'Validación de tu idea', desc: 'Análisis de mercado con IA y propuesta de valor' },
    { week: '2', title: 'Marca e identidad', desc: 'Logo, branding y materiales con IA' },
    { week: '3', title: 'Tu web profesional', desc: 'Diseño y lanzamiento sin código' },
    { week: '4', title: 'Contenido que vende', desc: 'Copywriting y estrategia con IA' },
    { week: '5', title: 'Automatización', desc: 'Email, CRM y atención al cliente' },
    { week: '6', title: 'Producto digital', desc: 'Creación de tu primera oferta' },
    { week: '7', title: 'Sistema de ventas', desc: 'Funnels y pagos automatizados' },
    { week: '8', title: 'Marketing con IA', desc: 'Publicidad y growth hacking' },
    { week: '9', title: 'Escalar', desc: 'Multiplicar sin multiplicar trabajo' },
    { week: '10', title: 'Lanzamiento', desc: 'Tu negocio listo para facturar' }
  ]

  const features = [
    { icon: '📹', title: 'Clases en vivo', desc: '10 sesiones de 2h trabajando en tu proyecto real' },
    { icon: '👤', title: 'Mentoría 1:1', desc: 'Seguimiento individual cada semana' },
    { icon: '👥', title: 'Grupo reducido', desc: 'Máximo 10 personas para atención personalizada' },
    { icon: '🚀', title: 'De 0 a lanzamiento', desc: 'Terminas con tu negocio funcionando' }
  ]

  const faqs = [
    { q: '¿Necesito saber programar?', a: 'No. Usarás herramientas no-code e IA para crear todo.' },
    { q: '¿Qué pasa si no puedo asistir?', a: 'Las sesiones quedan grabadas y tienes acceso de por vida.' },
    { q: '¿Cuánto tiempo necesito?', a: '5-8 horas semanales: 2h de clase + práctica.' },
    { q: '¿Cuándo empieza?', a: 'Marzo 2026. Las plazas son limitadas a 10 personas.' }
  ]

  // Theme colors
  const t = {
    bg: isDark ? '#08090a' : '#fafbfc',
    bgSecondary: isDark ? '#0f1011' : '#ffffff',
    bgTertiary: isDark ? '#161718' : '#f1f5f9',
    text: isDark ? '#f5f5f5' : '#1a1a2e',
    textSecondary: isDark ? '#a1a1a1' : '#4a5568',
    textTertiary: isDark ? '#6b6b6b' : '#718096',
    accent: '#5e6ad2',
    accentHover: '#7c85e3',
    border: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
    borderHover: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
    glow: isDark ? 'rgba(94,106,210,0.08)' : 'rgba(94,106,210,0.04)',
    glowStrong: isDark ? 'rgba(94,106,210,0.15)' : 'rgba(94,106,210,0.08)',
    navBg: isDark ? 'rgba(8,9,10,0.8)' : 'rgba(255,255,255,0.9)',
    cardHover: isDark ? '#161718' : '#f8fafc'
  }

  return (
    <>
      <Head>
        <title>Crea tu Negocio Digital con IA | Curso Presencial Online</title>
        <meta name="description" content="De idea a negocio rentable en 10 semanas. Curso práctico con mentoría personalizada." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease forwards;
        }

        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        .delay-4 { animation-delay: 0.4s; opacity: 0; }

        /* Scroll smooth */
        html { scroll-behavior: smooth; }

        /* Selection */
        ::selection {
          background: rgba(94, 106, 210, 0.3);
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: t.bg, color: t.text, transition: 'all 0.3s ease' }}>
        {/* Navigation */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: t.navBg,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${t.border}`
        }}>
          <nav style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 24px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: t.text
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                color: 'white'
              }}>AS</div>
              <span style={{ fontWeight: 600, fontSize: '15px' }}>aprende.software</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Theme toggle switch */}
              <button
                onClick={toggleTheme}
                style={{
                  width: '56px',
                  height: '28px',
                  borderRadius: '14px',
                  border: 'none',
                  background: isDark ? t.accent : '#e2e8f0',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
                aria-label="Cambiar tema"
              >
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: isDark ? '31px' : '3px',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: 'white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}>
                  {isDark ? '🌙' : '☀️'}
                </div>
              </button>
              <a href="#programa" style={{
                padding: '8px 16px',
                fontSize: '14px',
                borderRadius: '8px',
                border: `1px solid ${t.border}`,
                background: 'transparent',
                color: t.text,
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}>
                Programa
              </a>
              <a href="#aplicar" style={{
                padding: '8px 16px',
                fontSize: '14px',
                borderRadius: '8px',
                background: t.accent,
                color: 'white',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}>
                Aplicar
              </a>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero */}
          <section style={{
            paddingTop: '100px',
            paddingBottom: '80px',
            textAlign: 'center',
            position: 'relative'
          }}>
            {/* Subtle glow background */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '400px',
              background: `radial-gradient(ellipse, ${t.glow} 0%, transparent 70%)`,
              pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
              {/* Badge */}
              <div className="animate-fade-in" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: isDark ? t.bgSecondary : '#f0f4ff',
                border: `1px solid ${isDark ? t.border : 'rgba(94,106,210,0.15)'}`,
                borderRadius: '100px',
                fontSize: '13px',
                color: isDark ? t.textSecondary : '#4338ca',
                marginBottom: '32px',
                fontWeight: 500
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                Marzo 2026 · Solo 10 plazas
              </div>

              {/* Title */}
              <h1 className="animate-fade-in delay-1" style={{
                fontSize: 'clamp(40px, 6vw, 64px)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                margin: '0 0 24px 0',
                color: t.text
              }}>
                Crea tu negocio digital<br />con inteligencia artificial
              </h1>

              {/* Subtitle */}
              <p className="animate-fade-in delay-2" style={{
                fontSize: '18px',
                lineHeight: 1.6,
                color: t.textSecondary,
                margin: '0 0 40px 0',
                maxWidth: '560px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                De idea a negocio rentable en <span style={{ color: t.text }}>10 semanas</span>.
                Curso práctico con mentoría personalizada para lanzar sin escribir código.
              </p>

              {/* CTAs */}
              <div className="animate-fade-in delay-3" style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <a href="#aplicar" style={{
                  padding: '14px 28px',
                  fontSize: '15px',
                  borderRadius: '10px',
                  background: t.accent,
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: isDark ? `0 0 40px ${t.glowStrong}` : '0 4px 14px rgba(94,106,210,0.25)'
                }}>
                  Reservar plaza <span style={{ opacity: 0.7 }}>→</span>
                </a>
                <a href="#programa" style={{
                  padding: '14px 28px',
                  fontSize: '15px',
                  borderRadius: '10px',
                  border: `1px solid ${isDark ? t.border : '#e2e8f0'}`,
                  background: isDark ? 'transparent' : '#ffffff',
                  color: t.text,
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
                }}>
                  Ver programa
                </a>
              </div>

              {/* Stats */}
              <div className="animate-fade-in delay-4" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '48px',
                marginTop: '64px',
                flexWrap: 'wrap'
              }}>
                {[
                  { value: '20+', label: 'años en tech' },
                  { value: '500+', label: 'webs creadas' },
                  { value: '10', label: 'plazas máx.' }
                ].map((stat, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: 600, color: t.text }}>{stat.value}</div>
                    <div style={{ fontSize: '13px', color: t.textTertiary, marginTop: '4px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Divider */}
          <div style={{ height: '1px', background: t.border, maxWidth: '1100px', margin: '0 auto' }} />

          {/* Features */}
          <section style={{ padding: '80px 24px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <p style={{ fontSize: '13px', fontWeight: 500, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  Metodología
                </p>
                <h2 style={{ fontSize: '36px', fontWeight: 600, letterSpacing: '-0.02em', margin: 0, color: t.text }}>
                  Todo lo que necesitas para lanzar
                </h2>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px'
              }}>
                {features.map((feature, i) => (
                  <div key={i} style={{
                    background: isDark ? t.bgSecondary : '#ffffff',
                    border: `1px solid ${isDark ? t.border : '#e8ecf4'}`,
                    borderRadius: '16px',
                    padding: '28px',
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                    boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)'
                  }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      background: isDark ? t.bgTertiary : '#f0f4ff',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      marginBottom: '16px'
                    }}>
                      {feature.icon}
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0', color: t.text }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: t.textSecondary, margin: 0, lineHeight: 1.6 }}>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Divider */}
          <div style={{ height: '1px', background: t.border, maxWidth: '1100px', margin: '0 auto' }} />

          {/* Program */}
          <section id="programa" style={{ padding: '80px 24px' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <p style={{ fontSize: '13px', fontWeight: 500, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  10 semanas
                </p>
                <h2 style={{ fontSize: '36px', fontWeight: 600, letterSpacing: '-0.02em', margin: 0, color: t.text }}>
                  Programa completo
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {curriculum.map((week, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                    background: i === 9
                      ? (isDark ? 'rgba(94,106,210,0.1)' : '#f0f4ff')
                      : (isDark ? t.bgSecondary : '#ffffff'),
                    border: `1px solid ${i === 9 ? (isDark ? 'rgba(94,106,210,0.3)' : '#c7d2fe') : (isDark ? t.border : '#e8ecf4')}`,
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    boxShadow: isDark ? 'none' : '0 1px 2px rgba(0,0,0,0.03)'
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: i === 9 ? t.accent : (isDark ? t.bgTertiary : '#f0f4ff'),
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: i === 9 ? 'white' : (isDark ? t.textSecondary : '#5e6ad2'),
                      flexShrink: 0
                    }}>
                      {week.week}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '15px', fontWeight: 500, color: t.text }}>
                        {i === 9 && '🎉 '}{week.title}
                      </div>
                      <div style={{ fontSize: '13px', color: t.textTertiary, marginTop: '2px' }}>
                        {week.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Divider */}
          <div style={{ height: '1px', background: t.border, maxWidth: '1100px', margin: '0 auto' }} />

          {/* Mentor */}
          <section style={{ padding: '80px 24px' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '24px'
              }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src="/images/josu-sanz.jpg"
                    alt="Josu Sanz"
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `3px solid ${t.bgTertiary}`
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '-4px',
                    right: '-4px',
                    width: '36px',
                    height: '36px',
                    background: t.accent,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    border: `3px solid ${t.bg}`
                  }}>
                    👨‍💻
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    Tu mentor
                  </p>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 12px 0', color: t.text }}>Josu Sanz</h3>
                  <p style={{ fontSize: '15px', color: t.textSecondary, lineHeight: 1.6, margin: 0, maxWidth: '480px' }}>
                    +20 años construyendo productos digitales. Más de 500 webs y +20 proyectos propios lanzados.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <span style={{
                    padding: '6px 12px',
                    background: t.bgSecondary,
                    border: `1px solid ${t.border}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: t.textSecondary
                  }}>Fundador de Yenze</span>
                  <span style={{
                    padding: '6px 12px',
                    background: t.bgSecondary,
                    border: `1px solid ${t.border}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: t.textSecondary
                  }}>Creador de aprende.software</span>
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div style={{ height: '1px', background: t.border, maxWidth: '1100px', margin: '0 auto' }} />

          {/* Pricing */}
          <section id="precio" style={{ padding: '80px 24px' }}>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <p style={{ fontSize: '13px', fontWeight: 500, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  Inversión
                </p>
                <h2 style={{ fontSize: '36px', fontWeight: 600, letterSpacing: '-0.02em', margin: 0, color: t.text }}>
                  Una decisión que cambia todo
                </h2>
              </div>

              <div style={{
                padding: '40px',
                textAlign: 'center',
                background: isDark ? t.bgSecondary : '#ffffff',
                border: `1px solid ${isDark ? t.border : '#e8ecf4'}`,
                borderRadius: '20px',
                boxShadow: isDark ? `0 0 60px ${t.glowStrong}` : '0 4px 24px rgba(94,106,210,0.1)'
              }}>
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ fontSize: '16px', color: t.textTertiary, textDecoration: 'line-through', marginBottom: '8px' }}>1.997€</div>
                  <div style={{ fontSize: '56px', fontWeight: 600, letterSpacing: '-0.02em', color: t.text }}>997€</div>
                  <div style={{ fontSize: '14px', color: t.textTertiary, marginTop: '8px' }}>pago único · IVA incluido</div>
                </div>

                <div style={{ height: '1px', background: t.border, margin: '0 0 32px 0' }} />

                <div style={{ textAlign: 'left', marginBottom: '32px' }}>
                  {[
                    '10 clases en vivo de 2 horas',
                    '10 sesiones de mentoría individual',
                    'Acceso de por vida a materiales',
                    'Comunidad privada exclusiva',
                    'Plantillas y recursos premium'
                  ].map((feature, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 0',
                      borderBottom: i < 4 ? `1px solid ${t.border}` : 'none'
                    }}>
                      <span style={{ color: '#22c55e', fontSize: '16px' }}>✓</span>
                      <span style={{ fontSize: '14px', color: t.textSecondary }}>{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://yenze.lemonsqueezy.com/checkout/buy/4bec4db6-6245-4822-a577-4fba37c541de"
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    padding: '16px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    background: t.accent,
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                >
                  Reservar mi plaza →
                </a>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div style={{ height: '1px', background: t.border, maxWidth: '1100px', margin: '0 auto' }} />

          {/* For Who */}
          <section style={{ padding: '80px 24px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <h2 style={{ fontSize: '36px', fontWeight: 600, letterSpacing: '-0.02em', margin: 0, color: t.text }}>
                  Este curso es para ti si...
                </h2>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '12px'
              }}>
                {[
                  { icon: '💡', text: 'Tienes una idea pero no sabes cómo empezar' },
                  { icon: '⏰', text: 'Quieres dejar de postergar y lanzar de una vez' },
                  { icon: '🚫', text: 'No sabes programar (ni quieres aprender)' },
                  { icon: '🤖', text: 'Quieres aprovechar la IA para ir más rápido' },
                  { icon: '👥', text: 'Prefieres aprender con apoyo personalizado' },
                  { icon: '🎯', text: 'Buscas resultados reales, no solo teoría' }
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '18px 22px',
                    background: isDark ? t.bgSecondary : '#ffffff',
                    border: `1px solid ${isDark ? t.border : '#e8ecf4'}`,
                    borderRadius: '12px',
                    boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)'
                  }}>
                    <span style={{ fontSize: '22px' }}>{item.icon}</span>
                    <span style={{ fontSize: '14px', color: t.textSecondary, fontWeight: 450 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Divider */}
          <div style={{ height: '1px', background: t.border, maxWidth: '1100px', margin: '0 auto' }} />

          {/* Application Form */}
          <section id="aplicar" style={{ padding: '80px 24px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <p style={{ fontSize: '13px', fontWeight: 500, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  Plazas limitadas
                </p>
                <h2 style={{ fontSize: '36px', fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 16px 0', color: t.text }}>
                  Aplica a la próxima edición
                </h2>
                <p style={{ fontSize: '15px', color: t.textSecondary, margin: 0 }}>
                  Completa este breve cuestionario para reservar tu plaza.
                </p>
              </div>

              <div style={{
                background: t.bgSecondary,
                border: `1px solid ${t.border}`,
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <iframe
                  src="https://qualifyform.com/f/0fcpkwpr"
                  width="100%"
                  height="800"
                  frameBorder="0"
                  style={{ border: 'none', minHeight: '800px', width: '100%' }}
                  allow="camera; microphone"
                />
              </div>
            </div>
          </section>

          {/* Divider */}
          <div style={{ height: '1px', background: t.border, maxWidth: '1100px', margin: '0 auto' }} />

          {/* FAQ */}
          <section style={{ padding: '80px 24px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <h2 style={{ fontSize: '36px', fontWeight: 600, letterSpacing: '-0.02em', margin: 0, color: t.text }}>
                  Preguntas frecuentes
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {faqs.map((faq, i) => (
                  <div key={i} style={{
                    background: isDark ? t.bgSecondary : '#ffffff',
                    border: `1px solid ${isDark ? t.border : '#e8ecf4'}`,
                    borderRadius: '14px',
                    padding: '24px',
                    transition: 'all 0.3s ease',
                    boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)'
                  }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0', color: t.text }}>
                      {faq.q}
                    </h3>
                    <p style={{ fontSize: '14px', color: t.textSecondary, margin: 0, lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section style={{
            padding: '80px 24px',
            textAlign: 'center',
            position: 'relative'
          }}>
            {/* Subtle glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              height: '300px',
              background: `radial-gradient(ellipse, ${t.glow} 0%, transparent 70%)`,
              pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: isDark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.15)',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: '100px',
                fontSize: '13px',
                color: isDark ? '#fbbf24' : '#b45309',
                marginBottom: '24px'
              }}>
                ⚡ Solo quedan 10 plazas
              </div>

              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                margin: '0 0 16px 0',
                color: t.text
              }}>
                Tu negocio digital te espera
              </h2>

              <p style={{
                fontSize: '16px',
                color: t.textSecondary,
                margin: '0 0 32px 0',
                lineHeight: 1.6
              }}>
                En 10 semanas podrías estar facturando con tu propio negocio.<br />
                La próxima edición empieza en marzo 2026.
              </p>

              <a href="#precio" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                fontSize: '16px',
                borderRadius: '8px',
                background: t.accent,
                color: 'white',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                boxShadow: `0 0 40px ${t.glowStrong}`
              }}>
                Reservar mi plaza ahora →
              </a>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer style={{
          borderTop: `1px solid ${t.border}`,
          padding: '40px 24px'
        }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                color: 'white'
              }}>AS</div>
              <span style={{ fontWeight: 600, fontSize: '14px', color: t.text }}>aprende.software</span>
            </div>

            <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
              <Link href="/" style={{ color: t.textTertiary, textDecoration: 'none' }}>Inicio</Link>
              <a href="#programa" style={{ color: t.textTertiary, textDecoration: 'none' }}>Programa</a>
              <a href="#precio" style={{ color: t.textTertiary, textDecoration: 'none' }}>Precio</a>
              <Link href="/privacidad" style={{ color: t.textTertiary, textDecoration: 'none' }}>Privacidad</Link>
            </div>

            <p style={{ fontSize: '13px', color: t.textTertiary, margin: 0 }}>
              © 2026 Josu Sanz
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
