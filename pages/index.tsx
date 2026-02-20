import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const MODULOS_PREVIEW = [
  { emoji: '🌱', title: 'Modo Fácil', desc: 'Usa Claude desde el navegador, sin terminal', lessons: 8, href: '/modo-facil' },
  { emoji: '⚡', title: 'Instalación', desc: 'Instala Claude Code y crea tu primer proyecto', lessons: 3, href: '/empezar' },
  { emoji: '📚', title: 'Fundamentos', desc: 'Domina los conceptos clave de Claude Code', lessons: 11, href: '/fundamentos' },
  { emoji: '🛠️', title: 'Proyectos', desc: '4 proyectos reales paso a paso', lessons: 11, href: '/proyectos' },
  { emoji: '🔌', title: 'MCP', desc: 'Conecta Claude con APIs y servicios externos', lessons: 6, href: '/mcp' },
  { emoji: '🦞', title: 'Clawdbot', desc: 'Tu asistente IA para WhatsApp y Telegram', lessons: 7, href: '/clawdbot' },
]

// SVG Icons (Linear/Stripe style)
const Icons = {
  check: (color: string) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  terminal: (color: string) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17L10 11L4 5"/>
      <path d="M12 19H20"/>
    </svg>
  ),
  zap: (color: string) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} stroke="none">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [terminalStep, setTerminalStep] = useState(0)
  const [typedCommand, setTypedCommand] = useState('')
  const [typedResponse, setTypedResponse] = useState('')
  const terminalRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  const command = 'claude "crea una landing page en español"'
  const response = '¡Hola! He analizado tu solicitud. Estoy creando una landing page profesional en español optimizada para conversión. ¿Deseas que añada soporte para modo oscuro?'

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme-curso')
    if (saved) setIsDark(saved === 'dark')
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          startTerminalAnimation()
        }
      },
      { threshold: 0.5 }
    )
    if (terminalRef.current) observer.observe(terminalRef.current)
    return () => observer.disconnect()
  }, [])

  const startTerminalAnimation = () => {
    let i = 0
    const typeCommand = setInterval(() => {
      if (i < command.length) {
        setTypedCommand(command.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeCommand)
        setTimeout(() => setTerminalStep(1), 300)
        setTimeout(() => setTerminalStep(2), 1000)
        setTimeout(() => {
          setTerminalStep(3)
          let j = 0
          const typeResponse = setInterval(() => {
            if (j < response.length) {
              setTypedResponse(response.slice(0, j + 1))
              j++
            } else {
              clearInterval(typeResponse)
              setTimeout(() => setTerminalStep(4), 500)
            }
          }, 15)
        }, 1800)
      }
    }, 40)
  }

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('theme-curso', next ? 'dark' : 'light')
  }

  // Theme colors (same system as /curso-negocio)
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
  }

  if (!mounted) return null

  return (
    <>
      <Head>
        <title>Aprende Claude Code en Español | 47 Lecciones Gratis</title>
        <meta name="description" content="Crea software con IA sin experiencia previa. 47 lecciones gratuitas en español. 7 módulos desde cero hasta proyectos reales con Claude Code." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="claude code, curso claude code, aprender ia, inteligencia artificial español, claude anthropic, programar con ia, curso gratis ia, vibe coding" />
        <meta name="author" content="Josu Sanz" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.aprende.software/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aprende.software/" />
        <meta property="og:title" content="Crea Software con IA — 47 Lecciones Gratis en Español" />
        <meta property="og:description" content="Aprende Claude Code sin experiencia previa. 47 lecciones gratuitas, 7 módulos, proyectos reales." />
        <meta property="og:site_name" content="aprende.software" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:image" content="https://www.aprende.software/images/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crea Software con IA — 47 Lecciones Gratis" />
        <meta name="twitter:description" content="Aprende Claude Code en español. Sin experiencia previa." />
        <meta name="twitter:image" content="https://www.aprende.software/images/og-image.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "Claude Code en Español",
              "description": "Curso gratuito para aprender Claude Code. 47 lecciones en 7 módulos. Diseñado para personas sin experiencia en programación.",
              "provider": { "@type": "Person", "name": "Josu Sanz", "url": "https://www.josusanz.com" },
              "url": "https://www.aprende.software/",
              "educationalLevel": "Beginner",
              "inLanguage": "es",
              "isAccessibleForFree": true,
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
              "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "Online", "courseWorkload": "PT20H" }
            })
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * { box-sizing: border-box; }
        body {
          margin: 0; padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }
        html { overflow-x: hidden; scroll-behavior: smooth; }
        ::selection { background: rgba(94, 106, 210, 0.3); }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        .delay-4 { animation-delay: 0.4s; opacity: 0; }

        @keyframes pulse { 50% { opacity: 0.4; } }
        .animate-pulse { animation: pulse 1s ease-in-out infinite; }

        .module-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important;
          border-color: ${t.borderHover} !important;
        }

        @media (max-width: 640px) {
          .nav-links { display: none !important; }
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
          borderBottom: `1px solid ${t.border}`,
        }}>
          <nav style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 24px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: t.text,
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
                color: 'white',
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
                  padding: 0,
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
                  fontSize: '12px',
                }}>
                  {isDark ? '🌙' : '☀️'}
                </div>
              </button>
              <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link href="/curso-gratis" style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  border: `1px solid ${t.border}`,
                  background: 'transparent',
                  color: t.text,
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}>
                  Curso Gratis
                </Link>
                <Link href="/premium" style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  background: t.accent,
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}>
                  Premium
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero */}
          <section style={{
            paddingTop: '100px',
            paddingBottom: '80px',
            textAlign: 'center',
            position: 'relative',
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
              pointerEvents: 'none',
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
                fontWeight: 500,
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px rgba(34,197,94,0.6)',
                }} />
                47 lecciones gratuitas · 7 modulos · En espanol
              </div>

              {/* Title */}
              <h1 className="animate-fade-in delay-1" style={{
                fontSize: 'clamp(40px, 6vw, 64px)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                margin: '0 0 24px 0',
                color: t.text,
              }}>
                Crea software con<br />inteligencia artificial
              </h1>

              {/* Subtitle */}
              <p className="animate-fade-in delay-2" style={{
                fontSize: '18px',
                lineHeight: 1.6,
                color: t.textSecondary,
                margin: '0 0 40px 0',
                maxWidth: '560px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                Aprende <span style={{ color: t.text }}>Claude Code</span> haciendo proyectos reales.
                Desde tu primera web hasta automatizaciones y bots de IA. Todo gratis, todo en espanol.
              </p>

              {/* CTAs */}
              <div className="animate-fade-in delay-3" style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
                <Link href="/curso-gratis" style={{
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
                  boxShadow: isDark ? `0 0 40px ${t.glowStrong}` : '0 4px 14px rgba(94,106,210,0.25)',
                }}>
                  Empieza gratis <span style={{ opacity: 0.7 }}>→</span>
                </Link>
                <Link href="/curso" style={{
                  padding: '14px 28px',
                  fontSize: '15px',
                  borderRadius: '10px',
                  border: `1px solid ${isDark ? t.border : '#e2e8f0'}`,
                  background: isDark ? 'transparent' : '#ffffff',
                  color: t.text,
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
                }}>
                  Ya tengo cuenta
                </Link>
              </div>

              {/* Trust line */}
              <div className="animate-fade-in delay-4" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '24px',
                fontSize: '13px',
                color: t.textTertiary,
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {Icons.check('white')}
                </div>
                100% gratis · Sin tarjeta de credito · Acceso inmediato
              </div>

              {/* Product Hunt */}
              <div className="animate-fade-in delay-4" style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                <a href="https://www.producthunt.com/products/claude-code-en-espanol?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-claude-code-en-espanol" target="_blank" rel="noopener noreferrer">
                  {isDark ? (
                    <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1063751&theme=dark&t=1768701681086" alt="Claude Code en Español on Product Hunt" width="250" height="54" />
                  ) : (
                    <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1063751&theme=light&t=1768701681086" alt="Claude Code en Español on Product Hunt" width="250" height="54" />
                  )}
                </a>
              </div>

              {/* Stats */}
              <div className="animate-fade-in delay-4" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '48px',
                marginTop: '64px',
                flexWrap: 'wrap',
              }}>
                {[
                  { value: '47', label: 'lecciones gratis' },
                  { value: '7', label: 'modulos' },
                  { value: '20h+', label: 'de contenido' },
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

          {/* Terminal Demo */}
          <section style={{ padding: '80px 24px' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <p style={{ fontSize: '13px', fontWeight: 500, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  Asi funciona
                </p>
                <h2 style={{ fontSize: '36px', fontWeight: 600, letterSpacing: '-0.02em', margin: 0, color: t.text }}>
                  Pidelo y Claude lo crea
                </h2>
              </div>

              <div ref={terminalRef} style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  inset: '-16px',
                  background: `radial-gradient(ellipse, ${t.glowStrong} 0%, transparent 70%)`,
                  borderRadius: '28px',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'relative',
                  background: isDark ? '#0f1011' : '#ffffff',
                  borderRadius: '20px',
                  border: `1px solid ${isDark ? t.border : '#e8ecf4'}`,
                  overflow: 'hidden',
                  boxShadow: isDark ? `0 0 60px ${t.glowStrong}` : '0 8px 32px rgba(0,0,0,0.08)',
                }}>
                  {/* Terminal header */}
                  <div style={{
                    height: '40px',
                    borderBottom: `1px solid ${isDark ? t.border : '#e8ecf4'}`,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    gap: '8px',
                    background: isDark ? t.bgTertiary : '#f8fafc',
                  }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <span style={{ fontSize: '11px', color: t.textTertiary, fontWeight: 500 }}>Terminal — claude-code</span>
                    </div>
                  </div>
                  {/* Terminal body */}
                  <div style={{
                    padding: '24px',
                    fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                    fontSize: '13px',
                    lineHeight: 1.8,
                    background: isDark ? '#0a0b0c' : '#1a1a2e',
                    color: '#e2e8f0',
                    minHeight: '220px',
                  }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                      <span style={{ color: '#22c55e' }}>➜</span>
                      <span style={{ color: '#60a5fa' }}>~/proyecto</span>
                      <span style={{ color: '#f1f5f9' }}>
                        {typedCommand}
                        {terminalStep === 0 && <span className="animate-pulse" style={{ display: 'inline-block', width: '8px', height: '16px', background: '#94a3b8', marginLeft: '2px', verticalAlign: 'text-bottom' }} />}
                      </span>
                    </div>
                    {terminalStep >= 1 && (
                      <div style={{ color: '#94a3b8', marginBottom: '4px' }}>
                        <span style={{ color: '#eab308' }}>●</span> Analizando estructura del proyecto...
                      </div>
                    )}
                    {terminalStep >= 2 && (
                      <div style={{ color: '#94a3b8', marginBottom: '12px' }}>
                        <span style={{ color: '#eab308' }}>●</span> Claude esta pensando...
                      </div>
                    )}
                    {terminalStep >= 3 && (
                      <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        marginBottom: '12px',
                      }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <span style={{ color: '#a78bfa', fontWeight: 600, flexShrink: 0 }}>Claude:</span>
                          <span style={{ color: '#e2e8f0', lineHeight: 1.6 }}>
                            {typedResponse}
                            {terminalStep === 3 && <span className="animate-pulse" style={{ display: 'inline-block', width: '8px', height: '16px', background: '#a78bfa', marginLeft: '2px', verticalAlign: 'text-bottom' }} />}
                          </span>
                        </div>
                      </div>
                    )}
                    {terminalStep >= 4 && (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ color: '#22c55e' }}>➜</span>
                        <span style={{ color: '#60a5fa' }}>~/proyecto</span>
                        <span className="animate-pulse" style={{ display: 'inline-block', width: '8px', height: '16px', background: '#94a3b8' }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div style={{ height: '1px', background: t.border, maxWidth: '1100px', margin: '0 auto' }} />

          {/* Modules */}
          <section style={{ padding: '80px 24px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <p style={{ fontSize: '13px', fontWeight: 500, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  7 modulos gratuitos
                </p>
                <h2 style={{ fontSize: '36px', fontWeight: 600, letterSpacing: '-0.02em', margin: 0, color: t.text }}>
                  Empieza por donde quieras
                </h2>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '12px',
              }}>
                {MODULOS_PREVIEW.map((mod, i) => (
                  <Link
                    key={mod.title}
                    href={mod.href}
                    className="module-card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '20px 24px',
                      background: isDark ? t.bgSecondary : '#ffffff',
                      border: `1px solid ${isDark ? t.border : '#e8ecf4'}`,
                      borderRadius: '14px',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.2s ease',
                      boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(94,106,210,0.15), rgba(94,106,210,0.05))'
                        : 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      flexShrink: 0,
                      border: `1px solid ${isDark ? 'rgba(94,106,210,0.2)' : '#c7d2fe'}`,
                    }}>
                      {mod.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: t.text, marginBottom: '2px' }}>
                        {mod.title}
                      </div>
                      <div style={{ fontSize: '13px', color: t.textSecondary, lineHeight: 1.5 }}>
                        {mod.desc}
                      </div>
                    </div>
                    <div style={{
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: isDark ? '#4ade80' : '#065f46',
                      background: isDark ? 'rgba(34,197,94,0.15)' : '#d1fae5',
                      borderRadius: '6px',
                      flexShrink: 0,
                    }}>
                      {mod.lessons}
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <Link href="/curso-gratis" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  fontSize: '15px',
                  borderRadius: '10px',
                  background: t.accent,
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  boxShadow: isDark ? `0 0 40px ${t.glowStrong}` : '0 4px 14px rgba(94,106,210,0.25)',
                }}>
                  Ver los 7 modulos →
                </Link>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div style={{ height: '1px', background: t.border, maxWidth: '1100px', margin: '0 auto' }} />

          {/* Premium CTA */}
          <section style={{ padding: '80px 24px', textAlign: 'center', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              height: '300px',
              background: `radial-gradient(ellipse, ${t.glow} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: isDark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.12)',
                border: '1px solid rgba(245,158,11,0.25)',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 500,
                color: isDark ? '#fbbf24' : '#b45309',
                marginBottom: '24px',
              }}>
                {Icons.zap(isDark ? '#fbbf24' : '#d97706')}
                Cursos avanzados disponibles
              </div>

              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                margin: '0 0 16px 0',
                color: t.text,
              }}>
                ¿Quieres crear un SaaS completo?
              </h2>

              <p style={{
                fontSize: '16px',
                color: t.textSecondary,
                margin: '0 0 32px 0',
                lineHeight: 1.6,
              }}>
                El curso de pago te lleva de cero a lanzar tu propio producto en 10 semanas.<br />
                Con base de datos, auth, pagos y deploy.
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/curso-crea-tu-software" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  fontSize: '15px',
                  borderRadius: '10px',
                  background: t.accent,
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  boxShadow: `0 0 40px ${t.glowStrong}`,
                }}>
                  Ver curso premium →
                </Link>
                <Link href="/premium" style={{
                  padding: '14px 28px',
                  fontSize: '15px',
                  borderRadius: '10px',
                  border: `1px solid ${isDark ? t.border : '#e2e8f0'}`,
                  background: isDark ? 'transparent' : '#ffffff',
                  color: t.text,
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}>
                  Todos los cursos
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer style={{
          borderTop: `1px solid ${t.border}`,
          padding: '40px 24px',
        }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
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
                color: 'white',
              }}>AS</div>
              <span style={{ fontWeight: 600, fontSize: '14px', color: t.text }}>aprende.software</span>
            </div>

            <div style={{ display: 'flex', gap: '24px', fontSize: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/curso-gratis" style={{ color: t.textTertiary, textDecoration: 'none' }}>Curso Gratis</Link>
              <Link href="/premium" style={{ color: t.textTertiary, textDecoration: 'none' }}>Premium</Link>
              <Link href="/blog" style={{ color: t.textTertiary, textDecoration: 'none' }}>Blog</Link>
              <a href="https://discord.gg/PeqyDhSBEh" target="_blank" rel="noopener noreferrer" style={{ color: t.textTertiary, textDecoration: 'none' }}>Discord</a>
              <Link href="/privacidad" style={{ color: t.textTertiary, textDecoration: 'none' }}>Privacidad</Link>
            </div>

            <p style={{ fontSize: '13px', color: t.textTertiary, margin: 0 }}>
              © 2026 Josu Sanz ·{' '}
              <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer" style={{ color: t.textTertiary, textDecoration: 'none' }}>
                CC BY-NC-SA 4.0
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
