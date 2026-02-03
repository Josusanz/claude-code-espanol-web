import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function CursoNegocioLanding() {
  const [isDark, setIsDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      const isDarkMode = savedTheme === 'dark'
      setIsDark(isDarkMode)
      document.documentElement.classList.toggle('dark', isDarkMode)
    } else {
      // Light mode por defecto
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach((section) => observerRef.current?.observe(section))

    return () => observerRef.current?.disconnect()
  }, [])

  const toggleDarkMode = () => {
    const newState = !isDark
    setIsDark(newState)
    document.documentElement.classList.toggle('dark', newState)
    localStorage.setItem('theme', newState ? 'dark' : 'light')
  }

  const curriculum = [
    {
      week: 'Semana 1-2',
      title: 'Fundamentos de IA para Negocios',
      lessons: [
        'Introducción al ecosistema de herramientas IA',
        'Prompt Engineering avanzado',
        'Cómo pensar como un "orquestador de IA"',
        'Setup de tu entorno de trabajo'
      ]
    },
    {
      week: 'Semana 3-4',
      title: 'Construcción Sin Código',
      lessons: [
        'Desarrollo con Cursor y Replit',
        'Automatización con Make y Zapier',
        'Bases de datos sin SQL (Airtable, Notion)',
        'APIs y webhooks simplificados'
      ]
    },
    {
      week: 'Semana 5-6',
      title: 'Tu Primer Producto Digital',
      lessons: [
        'Validación de ideas en 48 horas',
        'MVP funcional con IA en 1 semana',
        'Landing pages que convierten',
        'Sistemas de pago integrados'
      ]
    },
    {
      week: 'Semana 7-8',
      title: 'Marketing y Adquisición',
      lessons: [
        'Marketing con contenido generado por IA',
        'SEO y posicionamiento automático',
        'Embudos de venta optimizados',
        'Estrategias de growth hacking'
      ]
    },
    {
      week: 'Semana 9-10',
      title: 'Escalado y Automatización Total',
      lessons: [
        'Automatización de operaciones',
        'Atención al cliente con chatbots',
        'Métricas y optimización continua',
        'Preparación para escalar'
      ]
    }
  ]

  return (
    <>
      <Head>
        <title>Crea tu Negocio Digital con IA | Curso Presencial Online</title>
        <meta name="description" content="Aprende a crear tu negocio digital sin escribir código. Curso presencial online de 10 semanas. Domina las herramientas de IA para construir, lanzar y escalar." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="curso ia negocio, crear negocio con ia, no code, automatización, emprendimiento digital, curso online presencial" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Crea tu Negocio Digital con IA | Curso Presencial Online" />
        <meta property="og:description" content="Aprende a crear tu negocio digital sin escribir código. 10 semanas de formación intensiva." />
        <meta property="og:site_name" content="aprende.software" />
        <meta property="og:locale" content="es_ES" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crea tu Negocio Digital con IA" />
        <meta name="twitter:description" content="Curso presencial online de 8 semanas para crear tu negocio digital con IA." />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        .landing-curso {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          --primary: #06b6d4;
          --primary-light: #a78bfa;
          --accent-blue: #0891b2;
          --bg-light: #fafafa;
          --bg-dark: #050505;
        }

        .landing-curso .font-serif-accent {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        /* Noise texture overlay */
        .noise-bg {
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 1;
        }

        .dark .noise-bg {
          opacity: 0.05;
        }

        /* Mesh gradient */
        .mesh-gradient {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(at 0% 0%, rgba(137, 90, 246, 0.08) 0, transparent 50%),
            radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.08) 0, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .dark .mesh-gradient {
          background:
            radial-gradient(at 0% 0%, rgba(137, 90, 246, 0.15) 0, transparent 50%),
            radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.15) 0, transparent 50%);
        }

        /* Grid lines */
        .grid-lines {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .dark .grid-lines {
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }

        /* Bento card styles */
        .bento-card {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(20px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dark .bento-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .bento-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 50px -12px rgba(137, 90, 246, 0.15);
          border-color: rgba(137, 90, 246, 0.3);
        }

        .dark .bento-card:hover {
          box-shadow: 0 25px 50px -12px rgba(137, 90, 246, 0.25);
        }

        /* Animated gradient border for pricing */
        .pricing-card {
          position: relative;
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
        }

        .dark .pricing-card {
          background: #0a0a0a;
        }

        .pricing-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #06b6d4, #0891b2, #06b6d4, #0891b2);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          z-index: -1;
          border-radius: 1.6rem;
          opacity: 0.6;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Glow effect */
        .glow-primary {
          box-shadow: 0 0 60px rgba(137, 90, 246, 0.3);
        }

        .dark .glow-primary {
          box-shadow: 0 0 80px rgba(137, 90, 246, 0.4);
        }

        /* Text gradient */
        .text-gradient {
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Pulse animation for live indicator */
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }

        .pulse-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: #06b6d4;
          animation: pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Counter animation */
        @keyframes countUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-count {
          animation: countUp 0.6s ease-out forwards;
        }

        /* Accordion transition */
        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .accordion-content.open {
          max-height: 500px;
        }

        /* Button shine effect */
        .btn-shine {
          position: relative;
          overflow: hidden;
        }

        .btn-shine::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          transform: rotate(45deg) translateX(-100%);
          transition: transform 0.6s;
        }

        .btn-shine:hover::after {
          transform: rotate(45deg) translateX(100%);
        }

        /* Scroll animations */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-on-scroll.delay-1 { transition-delay: 0.1s; }
        .animate-on-scroll.delay-2 { transition-delay: 0.2s; }
        .animate-on-scroll.delay-3 { transition-delay: 0.3s; }
        .animate-on-scroll.delay-4 { transition-delay: 0.4s; }

        /* Floating animation for hero elements */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Stagger animation for cards */
        @keyframes staggerIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .stagger-in {
          animation: staggerIn 0.5s ease-out forwards;
          opacity: 0;
        }

        .stagger-in:nth-child(1) { animation-delay: 0s; }
        .stagger-in:nth-child(2) { animation-delay: 0.1s; }
        .stagger-in:nth-child(3) { animation-delay: 0.2s; }
        .stagger-in:nth-child(4) { animation-delay: 0.3s; }

        /* Hero text reveal */
        @keyframes revealText {
          from {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .reveal-text {
          animation: revealText 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .reveal-text.delay-1 { animation-delay: 0.1s; opacity: 0; }
        .reveal-text.delay-2 { animation-delay: 0.2s; opacity: 0; }
        .reveal-text.delay-3 { animation-delay: 0.3s; opacity: 0; }
        .reveal-text.delay-4 { animation-delay: 0.4s; opacity: 0; }
        .reveal-text.delay-5 { animation-delay: 0.5s; opacity: 0; }

        /* Gradient border animation */
        @keyframes borderGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .border-glow::before {
          animation: borderGlow 2s ease-in-out infinite;
        }

        /* Card hover lift */
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-8px);
        }

        /* Number counter animation */
        @keyframes numberPop {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        .number-pop {
          animation: numberPop 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Testimonial card special effect */
        .testimonial-card {
          position: relative;
        }

        .testimonial-card::after {
          content: '"';
          position: absolute;
          top: 20px;
          right: 30px;
          font-size: 120px;
          font-family: 'Instrument Serif', Georgia, serif;
          color: currentColor;
          opacity: 0.05;
          line-height: 1;
          pointer-events: none;
        }
      `}</style>

      <div className={`landing-curso min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-[#050505] text-white' : 'bg-[#fafafa] text-slate-900'}`}>
        {/* Background layers */}
        <div className="noise-bg"></div>
        <div className="mesh-gradient"></div>
        <div className="grid-lines"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Navigation */}
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-slate-200/50 dark:border-white/5">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 lg:h-20">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <span className="text-white font-black text-sm sm:text-base">AS</span>
                  </div>
                  <span className="text-base sm:text-lg font-bold tracking-tight">
                    <span className="hidden min-[400px]:inline">aprende</span>
                    <span className="text-[#06b6d4] hidden min-[400px]:inline">.software</span>
                  </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                  <a href="#programa" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#06b6d4] dark:hover:text-[#06b6d4] transition-colors">Programa</a>
                  <a href="#metodologia" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#06b6d4] dark:hover:text-[#06b6d4] transition-colors">Metodología</a>
                  <a href="#aplicar" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#06b6d4] dark:hover:text-[#06b6d4] transition-colors">Aplicar</a>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={toggleDarkMode}
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                    aria-label="Cambiar tema"
                  >
                    <span className="material-symbols-outlined text-lg sm:text-xl">
                      {isDark ? 'light_mode' : 'dark_mode'}
                    </span>
                  </button>
                  <a
                    href="#aplicar"
                    className="hidden sm:flex btn-shine bg-[#06b6d4] hover:bg-[#0e7490] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-cyan-500/25 items-center gap-1"
                  >
                    Aplicar
                  </a>

                  {/* Mobile menu button */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
                    aria-label="Menú"
                  >
                    <span className="material-symbols-outlined text-xl sm:text-2xl">
                      {mobileMenuOpen ? 'close' : 'menu'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Mobile menu */}
              {mobileMenuOpen && (
                <div className="md:hidden py-4 border-t border-slate-200 dark:border-white/10">
                  <div className="flex flex-col gap-2">
                    <a href="#programa" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-600 dark:text-slate-400 hover:text-[#06b6d4]">Programa</a>
                    <a href="#metodologia" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-600 dark:text-slate-400 hover:text-[#06b6d4]">Metodología</a>
                    <a href="#aplicar" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-600 dark:text-slate-400 hover:text-[#06b6d4]">Aplicar</a>
                  </div>
                </div>
              )}
            </nav>
          </header>

          <main>
            {/* Hero Section */}
            <section className="relative pt-16 lg:pt-24 pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/20 mb-8 reveal-text">
                  <span className="relative flex h-2.5 w-2.5 pulse-ring">
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#06b6d4]"></span>
                  </span>
                  <span className="text-[#06b6d4] text-xs font-bold uppercase tracking-widest">
                    Próxima edición: Marzo 2026
                  </span>
                </div>

                {/* Main headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight mb-8 reveal-text delay-1">
                  Crea tu{' '}
                  <span className="font-serif-accent italic font-normal text-gradient">
                    negocio digital
                  </span>
                  <br />
                  con IA
                </h1>

                {/* Subheadline */}
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed reveal-text delay-2">
                  Curso <strong className="text-slate-900 dark:text-white">presencial online</strong> de 10 semanas.
                  Sin escribir código. Domina las herramientas que te permiten construir software real
                  <span className="text-gradient font-semibold"> a la velocidad de tu pensamiento</span>.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 reveal-text delay-3">
                  <a
                    href="#aplicar"
                    className="btn-shine bg-[#06b6d4] hover:bg-[#0e7490] text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    Aplicar ahora
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </a>
                  <a
                    href="#programa"
                    className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[#06b6d4]/50 text-slate-900 dark:text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-2"
                  >
                    Ver programa completo
                  </a>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-500 dark:text-slate-400 reveal-text delay-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500">verified</span>
                    <span>Clases en directo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500">verified</span>
                    <span>Grupo reducido (máx. 10)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500">verified</span>
                    <span>Soporte personalizado</span>
                  </div>
                </div>

                {/* Tool logos */}
                <div className="mt-16 pt-12 border-t border-slate-200 dark:border-white/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
                    Herramientas que dominarás
                  </p>
                  <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10 opacity-70 hover:opacity-100 transition-opacity">
                    {/* Claude */}
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.709 15.955l4.72-2.647.08-.08 2.726-1.529 6.676-3.744c.588-.33 1.584.125 1.584.843v6.091c0 .45-.238.866-.627 1.096l-6.139 3.457a2.263 2.263 0 01-2.229-.012l-6.163-3.469a1.27 1.27 0 01-.628-1.096v-.91z"/>
                        <path d="M9.508 13.228l-4.8 2.727v-5.647c0-.718.997-1.173 1.585-.843l3.215 1.803v1.96z" opacity=".5"/>
                      </svg>
                      <span className="text-sm lg:text-base font-semibold">Claude</span>
                    </div>
                    {/* Terminal */}
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 17 10 11 4 5"></polyline>
                        <line x1="12" y1="19" x2="20" y2="19"></line>
                      </svg>
                      <span className="text-sm lg:text-base font-semibold">Terminal</span>
                    </div>
                    {/* n8n (Stitch alternative - automation) */}
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                      <span className="text-sm lg:text-base font-semibold">n8n</span>
                    </div>
                    {/* GitHub */}
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      <span className="text-sm lg:text-base font-semibold">GitHub</span>
                    </div>
                    {/* Notion */}
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.934-.56.934-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.887c-.56.047-.748.327-.748.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM2.523 1.128l13.588-.933c1.68-.14 2.101.093 2.802.606l3.87 2.707c.467.326.607.42.607.793v15.904c0 .98-.373 1.587-1.68 1.68l-15.458.933c-.98.047-1.448-.093-1.962-.747l-3.127-4.053c-.56-.747-.793-1.307-.793-1.96V2.895c0-.84.373-1.54 1.353-1.767z"/>
                      </svg>
                      <span className="text-sm lg:text-base font-semibold">Notion</span>
                    </div>
                    {/* Vercel */}
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 22.525H0l12-21.05 12 21.05z"/>
                      </svg>
                      <span className="text-sm lg:text-base font-semibold">Vercel</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {[
                    { value: '20+', label: 'Años en tech', icon: 'code' },
                    { value: '500+', label: 'Webs creadas', icon: 'web' },
                    { value: '20+', label: 'Proyectos lanzados', icon: 'rocket_launch' },
                    { value: '10', label: 'Plazas máximo', icon: 'group' }
                  ].map((stat, i) => (
                    <div key={i} className="bento-card rounded-2xl p-6 lg:p-8 text-center">
                      <span className="material-symbols-outlined text-[#06b6d4] text-3xl mb-3">{stat.icon}</span>
                      <div className="text-3xl lg:text-4xl font-black mb-1">{stat.value}</div>
                      <div className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Bento Grid - Methodology */}
            <section id="metodologia" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="mb-12 lg:mb-16">
                  <span className="text-[#06b6d4] font-bold text-sm tracking-widest uppercase block mb-3">
                    Metodología Bento
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold max-w-2xl">
                    Un sistema diseñado para{' '}
                    <span className="text-gradient">ejecutar</span>
                  </h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
                  {/* Large card - spans 2 cols and 2 rows */}
                  <div className="md:col-span-2 md:row-span-2 bento-card rounded-3xl p-8 lg:p-10 relative overflow-hidden group min-h-[400px] flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/5 to-[#0891b2]/5 dark:from-[#06b6d4]/10 dark:to-[#0891b2]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center text-[#06b6d4] mb-6">
                        <span className="material-symbols-outlined text-3xl">psychology</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ejecución con IA</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                        Aprende a orquestar múltiples agentes de IA para desarrollar, testear y desplegar aplicaciones completas en días, no meses.
                      </p>
                    </div>
                    <div className="relative z-10 flex flex-wrap gap-2 mt-6">
                      <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wide">
                        Prompt Engineering
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wide">
                        Automations
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wide">
                        No-Code
                      </span>
                    </div>
                  </div>

                  {/* Medium card - spans 2 cols */}
                  <div className="md:col-span-2 bento-card rounded-3xl p-8 flex items-center justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold mb-2">Clases en Directo</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm lg:text-base">
                        1 clase semanal en directo + seguimiento individual. Construimos proyectos reales desde cero, juntos.
                      </p>
                    </div>
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-[#06b6d4]/20 flex items-center justify-center bg-[#06b6d4]/5 flex-shrink-0">
                      <span className="material-symbols-outlined text-[#06b6d4] text-3xl lg:text-4xl">videocam</span>
                    </div>
                  </div>

                  {/* Small card 1 */}
                  <div className="bento-card rounded-3xl p-6 flex flex-col justify-center items-center text-center">
                    <div className="text-4xl font-black text-gradient mb-2">10</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tight">Plazas máximo</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2">Grupos reducidos para máxima atención</p>
                  </div>

                  {/* Small card 2 */}
                  <div className="bento-card rounded-3xl p-6 flex flex-col justify-center items-center text-center">
                    <span className="material-symbols-outlined text-4xl text-[#0891b2] mb-3">support_agent</span>
                    <h3 className="text-sm font-bold">Soporte 24/7</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Comunidad privada + mentorías</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Curriculum Section */}
            <section id="programa" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-black/50">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <span className="text-[#06b6d4] font-bold text-sm tracking-widest uppercase block mb-3">
                    Programa completo
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                    10 semanas de transformación
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    De cero a lanzar tu primer producto digital. Cada semana es práctica, con entregables reales.
                  </p>
                </div>

                {/* Accordion */}
                <div className="space-y-4">
                  {curriculum.map((module, index) => (
                    <div
                      key={index}
                      className="bento-card rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                        className="w-full p-6 lg:p-8 flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-4 lg:gap-6">
                          <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg ${
                            index === 0 ? 'bg-[#06b6d4]' :
                            index === 1 ? 'bg-[#0891b2]' :
                            index === 2 ? 'bg-emerald-500' :
                            'bg-amber-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                              {module.week}
                            </div>
                            <h3 className="text-lg lg:text-xl font-bold">{module.title}</h3>
                          </div>
                        </div>
                        <span className={`material-symbols-outlined text-2xl transition-transform ${activeAccordion === index ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>
                      <div className={`accordion-content ${activeAccordion === index ? 'open' : ''}`}>
                        <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0">
                          <div className="pl-16 lg:pl-20 border-l-2 border-slate-200 dark:border-white/10 ml-6 lg:ml-7">
                            <ul className="space-y-3">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                                  <span className="material-symbols-outlined text-emerald-500 text-lg mt-0.5">check_circle</span>
                                  <span>{lesson}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            {/* Lead Capture Form */}
            <section id="aplicar" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-[#06b6d4] font-bold text-sm tracking-widest uppercase block mb-3">
                    Plazas limitadas
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                    ¿Es este curso para ti?
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Completa este breve cuestionario para ver si encajas en el perfil y reservar tu plaza en la próxima edición.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <iframe
                    src="https://qualifyform.com/f/0fcpkwpr"
                    width="100%"
                    height="800"
                    frameBorder="0"
                    style={{ border: 'none', minHeight: '800px', width: '100%' }}
                    allow="camera; microphone"
                  ></iframe>
                </div>
              </div>
            </section>

            {/* Pricing Section */}
            <section id="precio" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-black/50">
              <div className="max-w-4xl mx-auto">
                <div className="pricing-card p-8 lg:p-12 glow-primary">
                  <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1 text-center lg:text-left">
                      <div className="inline-block px-4 py-1.5 rounded-full bg-[#06b6d4]/10 text-[#06b6d4] text-xs font-black uppercase tracking-widest mb-6">
                        Oferta de Lanzamiento
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-black mb-6">
                        Únete a la próxima edición
                      </h2>
                      <ul className="space-y-4 mb-8 text-left">
                        {[
                          '10 semanas de formación intensiva',
                          '10 clases en directo (1 por semana)',
                          'Seguimiento individual semanal',
                          'Acceso a comunidad privada de por vida',
                          'Pack de plantillas y recursos premium',
                          'Certificado de finalización',
                          'Garantía de devolución 14 días'
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                            <span className="material-symbols-outlined text-[#06b6d4]">check_circle</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="w-full lg:w-auto text-center lg:text-right flex-shrink-0">
                      <div className="mb-2 line-through text-slate-400 font-bold text-xl">1.999€</div>
                      <div className="text-6xl lg:text-7xl font-black mb-2">999€</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                        o 3 cuotas de 349€
                      </div>
                      <a
                        href="https://yenze.lemonsqueezy.com/checkout/buy/4bec4db6-6245-4822-a577-4fba37c541de"
                        className="btn-shine block w-full lg:w-auto bg-white dark:bg-white text-[#050505] hover:bg-slate-100 px-10 py-5 rounded-2xl text-lg font-extrabold transition-all shadow-xl"
                      >
                        Reservar mi plaza
                      </a>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                        Solo 10 plazas disponibles
                      </p>
                    </div>
                  </div>
                </div>

                {/* Guarantee */}
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                    <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-2xl">verified_user</span>
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                      Garantía de devolución del 100% durante los primeros 14 días
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-black/50">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    Preguntas frecuentes
                  </h2>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      q: '¿Necesito saber programar?',
                      a: 'No. El curso está diseñado específicamente para personas sin conocimientos técnicos. Aprenderás a usar herramientas no-code y a orquestar IA para crear software sin escribir código.'
                    },
                    {
                      q: '¿Qué pasa si no puedo asistir a una clase en directo?',
                      a: 'Todas las sesiones quedan grabadas y disponibles en tu área de estudiante. Además, puedes resolver dudas en la comunidad privada o en las mentorías semanales.'
                    },
                    {
                      q: '¿Cuánto tiempo necesito dedicar por semana?',
                      a: 'Recomendamos dedicar entre 6-8 horas semanales: 4 horas de clases en directo + 2-4 horas de práctica con los ejercicios y tu proyecto personal.'
                    },
                    {
                      q: '¿Qué tipo de negocios puedo crear?',
                      a: 'SaaS, marketplaces, apps móviles, herramientas de productividad, cursos online, servicios de automatización... Las posibilidades son infinitas con las herramientas que aprenderás.'
                    }
                  ].map((faq, i) => (
                    <div key={i} className="bento-card rounded-2xl p-6">
                      <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  ¿Listo para crear tu negocio digital?
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
                  La próxima edición empieza en marzo 2026. Plazas limitadas.
                </p>
                <a
                  href="#precio"
                  className="btn-shine inline-flex items-center gap-2 bg-[#06b6d4] hover:bg-[#0e7490] text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-cyan-500/30 transition-all hover:scale-[1.02]"
                >
                  Reservar mi plaza ahora
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200 dark:border-white/5 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-lg flex items-center justify-center">
                    <span className="text-white font-black text-xs">AS</span>
                  </div>
                  <span className="font-bold">aprende<span className="text-[#06b6d4]">.software</span></span>
                </div>

                <div className="flex gap-8 text-sm text-slate-500 dark:text-slate-400">
                  <Link href="/privacidad" className="hover:text-[#06b6d4] transition-colors">Privacidad</Link>
                  <Link href="/" className="hover:text-[#06b6d4] transition-colors">Curso gratuito</Link>
                  <a href="https://twitter.com/josusanz" target="_blank" rel="noopener noreferrer" className="hover:text-[#06b6d4] transition-colors">Twitter</a>
                </div>

                <p className="text-xs text-slate-400 dark:text-slate-500">
                  © 2025 aprende.software
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>

          </>
  )
}
