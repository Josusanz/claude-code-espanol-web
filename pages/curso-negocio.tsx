import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function CursoNegocioLanding() {
  const [isDark, setIsDark] = useState(true) // Dark by default
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-curso')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      // Dark mode por defecto
      setIsDark(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const toggleDarkMode = () => {
    const newState = !isDark
    setIsDark(newState)
    localStorage.setItem('theme-curso', newState ? 'dark' : 'light')
  }

  const curriculum = [
    { week: '1', title: 'Validación de tu idea de negocio', desc: 'Análisis de mercado con IA y definición de tu propuesta de valor única' },
    { week: '2', title: 'Tu marca e identidad digital', desc: 'Creación de marca, logo y materiales con herramientas de IA' },
    { week: '3', title: 'Tu web profesional sin código', desc: 'Diseño y lanzamiento de tu web con IA en menos de una semana' },
    { week: '4', title: 'Contenido que vende', desc: 'Estrategia de contenidos y copywriting con IA para atraer clientes' },
    { week: '5', title: 'Automatización inteligente', desc: 'Flujos automáticos de email, CRM y atención al cliente con IA' },
    { week: '6', title: 'Tu primer producto digital', desc: 'Creación y empaquetado de tu oferta con IA generativa' },
    { week: '7', title: 'Estrategia de ventas', desc: 'Funnels de venta y sistemas de pago automatizados' },
    { week: '8', title: 'Marketing con IA', desc: 'Publicidad y growth hacking potenciado con inteligencia artificial' },
    { week: '9', title: 'Escalar tu negocio', desc: 'Sistemas para multiplicar ingresos sin multiplicar trabajo' },
    { week: '10', title: 'Lanzamiento y celebración', desc: 'Lanzas tu negocio al mundo con todo listo para facturar', highlight: true }
  ]

  const faqs = [
    { q: '¿Necesito saber programar?', a: 'No. El curso está diseñado para personas sin conocimientos técnicos. Aprenderás a usar herramientas no-code y a orquestar IA para crear software sin escribir código.' },
    { q: '¿Qué pasa si no puedo asistir a una clase?', a: 'Todas las sesiones quedan grabadas. Además, puedes resolver dudas en la comunidad privada o en las mentorías semanales.' },
    { q: '¿Cuánto tiempo necesito dedicar?', a: 'Entre 5-8 horas semanales: 2 horas de clase en directo + 3-6 horas de práctica con tu proyecto personal.' },
    { q: '¿Qué tipo de negocios puedo crear?', a: 'SaaS, marketplaces, apps, herramientas de productividad, cursos online, servicios de automatización... Las posibilidades son infinitas.' },
    { q: '¿Hay garantía de devolución?', a: 'Sí. Tienes 14 días para probar el curso. Si no es lo que esperabas, te devolvemos el 100% sin preguntas.' },
    { q: '¿Cuándo empieza la próxima edición?', a: 'La próxima edición arranca en marzo de 2026. Las plazas son limitadas a 10 personas para garantizar atención personalizada.' }
  ]

  return (
    <>
      <Head>
        <title>Crea tu Negocio Digital con IA | Curso Presencial Online</title>
        <meta name="description" content="Aprende a crear tu negocio digital sin escribir código. Curso presencial online de 10 semanas. Domina las herramientas de IA para construir, lanzar y escalar." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        .landing-premium {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          --gradient-start: #3B82F6;
          --gradient-end: #8B5CF6;
        }

        /* Mesh gradient background */
        .mesh-bg {
          background-color: #09090B;
          background-image:
            radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.15) 0, transparent 50%),
            radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.1) 0, transparent 50%),
            radial-gradient(at 50% 100%, rgba(59, 130, 246, 0.1) 0, transparent 50%);
        }

        .light .mesh-bg {
          background-color: #FFFFFF;
          background-image:
            radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.07) 0, transparent 50%),
            radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.05) 0, transparent 50%),
            radial-gradient(at 50% 100%, rgba(59, 130, 246, 0.04) 0, transparent 50%);
        }

        /* Text gradient */
        .text-gradient {
          background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Gradient button with glow */
        .btn-gradient {
          background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
          box-shadow: 0 10px 40px -10px rgba(139, 92, 246, 0.5);
          transition: all 0.3s ease;
        }

        .btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 50px -10px rgba(139, 92, 246, 0.6);
        }

        /* Glass card */
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
        }

        .light .glass-card {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        /* Light mode gradient button adjustments */
        .light .btn-gradient {
          box-shadow: 0 10px 40px -10px rgba(99, 102, 241, 0.4);
        }

        .light .btn-gradient:hover {
          box-shadow: 0 20px 50px -10px rgba(99, 102, 241, 0.5);
        }

        /* Bento card */
        .bento-card {
          background: #18181B;
          border: 1px solid #27272A;
          transition: all 0.4s ease;
        }

        .light .bento-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
        }

        .light .bento-card:hover {
          box-shadow: 0 10px 40px -10px rgba(99, 102, 241, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .bento-card:hover {
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-4px);
        }

        /* Bento highlight card */
        .bento-highlight {
          background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%);
          border: 1px solid rgba(99, 102, 241, 0.3);
        }

        .light .bento-highlight {
          background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);
          border: 1px solid rgba(99, 102, 241, 0.25);
          box-shadow: 0 4px 20px -4px rgba(99, 102, 241, 0.2);
        }

        /* Week item */
        .week-item {
          background: #18181B;
          border: 1px solid #27272A;
          transition: all 0.3s ease;
        }

        .light .week-item {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        }

        .light .week-item:hover {
          background: #F8FAFC;
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 4px 12px -2px rgba(99, 102, 241, 0.1);
        }

        .week-item:hover {
          border-color: rgba(139, 92, 246, 0.3);
        }

        .week-item-highlight {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
        }

        .week-item-highlight::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #3B82F6, #8B5CF6);
          border-radius: 14px;
          z-index: -1;
        }

        /* Pricing glassmorphism */
        .pricing-glass {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
        }

        .light .pricing-glass {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.15), 0 10px 20px -10px rgba(0, 0, 0, 0.1);
        }

        /* Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-in {
          animation: fadeInUp 0.8s ease forwards;
        }

        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        .delay-4 { animation-delay: 0.4s; opacity: 0; }

        /* Smooth scroll */
        html { scroll-behavior: smooth; }

        /* Check icon */
        .check-circle {
          width: 24px;
          height: 24px;
          border-radius: 100%;
          background: rgba(34, 197, 94, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .check-circle span {
          color: #22C55E;
          font-size: 14px;
          font-weight: 700;
        }

        /* Pulse animation for urgency */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        /* Gradient border animation */
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-border {
          background: linear-gradient(90deg, #3B82F6, #8B5CF6, #3B82F6);
          background-size: 200% auto;
          animation: gradientBorder 3s linear infinite;
        }

        /* Scroll indicator */
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        .bounce {
          animation: bounce 2s ease-in-out infinite;
        }

        /* Light mode photo ring */
        .light .mentor-photo-ring {
          --tw-ring-offset-color: #FFFFFF;
        }

        /* Light mode sections with subtle backgrounds */
        .light .section-alt {
          background: linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%);
        }

        /* Light mode trust badges */
        .light .trust-badge {
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
        }
      `}</style>

      <div className={`landing-premium min-h-screen transition-colors duration-300 ${isDark ? 'mesh-bg text-white' : 'light mesh-bg text-slate-900'}`}>
        {/* Navigation */}
        <header className={`sticky top-0 z-50 backdrop-blur-xl ${isDark ? 'bg-[#09090B]/80 border-b border-white/5' : 'bg-white/80 border-b border-slate-200/50'}`}>
          <nav className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <span className="text-white font-black text-sm">AS</span>
                </div>
                <span className="text-lg font-semibold tracking-tight hidden sm:block">
                  aprende<span className="text-[#3B82F6]">.software</span>
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-8">
                <a href="#programa" className={`text-sm font-medium ${isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>Programa</a>
                <a href="#precio" className={`text-sm font-medium ${isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>Precio</a>
                <a href="#aplicar" className={`text-sm font-medium ${isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>Aplicar</a>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleDarkMode}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'} transition-colors`}
                  aria-label="Cambiar tema"
                >
                  {isDark ? '☀️' : '🌙'}
                </button>
                <a href="#aplicar" className="hidden sm:flex btn-gradient text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
                  Aplicar →
                </a>
              </div>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section className="pt-20 lg:pt-32 pb-16 lg:pb-24 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100'} mb-8 animate-in`}>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className={`text-sm font-medium ${isDark ? 'text-zinc-300' : 'text-indigo-900'}`}>
                  🚀 Próxima edición: Marzo 2026 · Solo 10 plazas
                </span>
              </div>

              {/* Headline */}
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 animate-in delay-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Crea tu Negocio<br />Digital con IA
              </h1>

              {/* Subheadline with highlight */}
              <p className={`text-xl sm:text-2xl mb-4 animate-in delay-2 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                De idea a negocio rentable en <span className="text-gradient font-bold">10 semanas</span>
              </p>

              <p className={`text-lg mb-10 max-w-2xl mx-auto animate-in delay-2 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                Curso práctico con mentoría personalizada.<br className="hidden sm:block" />
                Transforma tu idea en un negocio que factura usando inteligencia artificial.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-in delay-3">
                <a href="#aplicar" className="btn-gradient text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2">
                  Reservar mi plaza <span>→</span>
                </a>
                <a href="#programa" className={`px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transition-all ${isDark ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 text-slate-800'}`}>
                  Ver programa
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-3 animate-in delay-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/5' : 'bg-white border border-slate-200 shadow-sm'}`}>
                  <span className="text-green-500">✓</span>
                  <span className={`text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-slate-700'}`}>Clases en directo</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/5' : 'bg-white border border-slate-200 shadow-sm'}`}>
                  <span className="text-green-500">✓</span>
                  <span className={`text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-slate-700'}`}>Grupo de 10 personas</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/5' : 'bg-white border border-slate-200 shadow-sm'}`}>
                  <span className="text-green-500">✓</span>
                  <span className={`text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-slate-700'}`}>Mentoría 1:1</span>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="mt-16 bounce">
                <a href="#metodologia" className={`inline-flex flex-col items-center gap-2 ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>
                  <span className="text-xs font-medium uppercase tracking-wider">Descubre más</span>
                  <span className="text-2xl">↓</span>
                </a>
              </div>
            </div>
          </section>

          {/* Logo Cloud */}
          <section className={`py-12 px-4 sm:px-6 ${isDark ? 'border-y border-white/5' : 'border-y border-slate-200'}`}>
            <div className="max-w-4xl mx-auto">
              <p className={`text-center text-xs font-semibold uppercase tracking-widest mb-6 ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>
                Herramientas que dominarás
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
                {['Claude AI', 'ChatGPT', 'Cursor', 'v0.dev', 'Stripe', 'Vercel'].map((tool) => (
                  <span key={tool} className={`text-base font-semibold ${isDark ? 'text-zinc-600' : 'text-slate-500'}`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className={`py-16 px-4 sm:px-6 ${isDark ? 'bg-[#0F0F12]' : 'bg-gradient-to-b from-slate-50 to-white'}`}>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { value: '20+', label: 'años en tech' },
                  { value: '500+', label: 'webs creadas' },
                  { value: '20+', label: 'proyectos lanzados' },
                  { value: '10', label: 'plazas máximo', highlight: true }
                ].map((stat, i) => (
                  <div key={i} className={`text-center py-8 rounded-2xl ${isDark ? '' : 'bg-white/50'}`}>
                    <div className={`text-5xl lg:text-6xl font-extrabold mb-2 ${stat.highlight ? 'text-gradient' : isDark ? '' : 'text-slate-800'}`}>
                      {stat.value}
                    </div>
                    <div className={`text-sm font-medium ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bento Grid - Methodology */}
          <section id="metodologia" className="py-20 lg:py-28 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#8B5CF6] text-xs font-bold uppercase tracking-widest mb-4 block">
                  METODOLOGÍA
                </span>
                <h2 className={`text-3xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Todo lo que necesitas para lanzar
                </h2>
                <p className={`text-lg ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                  Aprende haciendo. Cada semana construyes algo real para tu negocio.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1 - Classes */}
                <div className="bento-card rounded-3xl p-8 min-h-[280px] flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center mb-6">
                    <span className="text-2xl">📹</span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Clases en vivo semanales</h3>
                  <p className={`${isDark ? 'text-zinc-400' : 'text-slate-600'} leading-relaxed`}>
                    Sesiones de 2 horas donde trabajamos juntos en tu proyecto real. Nada de teoría aburrida, solo práctica.
                  </p>
                </div>

                {/* Card 2 - Mentoring */}
                <div className="bento-card rounded-3xl p-8 min-h-[280px] flex flex-col">
                  <div className={`w-12 h-12 rounded-xl ${isDark ? 'bg-zinc-800' : 'bg-slate-100'} flex items-center justify-center mb-6`}>
                    <span className="text-2xl">👤</span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Mentoría 1:1 semanal</h3>
                  <p className={`${isDark ? 'text-zinc-400' : 'text-slate-600'} leading-relaxed`}>
                    Seguimiento individual para resolver dudas y acelerar tu progreso.
                  </p>
                </div>

                {/* Card 3 - Community */}
                <div className="bento-card rounded-3xl p-8 min-h-[200px] flex flex-col">
                  <div className={`w-12 h-12 rounded-xl ${isDark ? 'bg-zinc-800' : 'bg-slate-100'} flex items-center justify-center mb-6`}>
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Comunidad exclusiva</h3>
                  <p className={`${isDark ? 'text-zinc-400' : 'text-slate-600'} leading-relaxed`}>
                    Grupo privado de máximo 10 personas para networking y apoyo mutuo.
                  </p>
                </div>

                {/* Card 4 - Highlight */}
                <div className="bento-highlight rounded-3xl p-8 min-h-[200px] flex flex-col">
                  <div className={`w-12 h-12 rounded-xl ${isDark ? 'bg-white/10' : 'bg-indigo-100'} flex items-center justify-center mb-6`}>
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-indigo-900'}`}>De 0 a lanzamiento</h3>
                  <p className={`${isDark ? 'text-indigo-200' : 'text-indigo-700'} leading-relaxed mb-4`}>
                    En 10 semanas tendrás tu negocio funcionando: web, producto, sistema de ventas y primeros clientes.
                  </p>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium w-fit ${isDark ? 'bg-white/10 text-white' : 'bg-white text-indigo-700 shadow-sm'}`}>
                    ✨ Garantía de resultados
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Program Section */}
          <section id="programa" className={`py-20 lg:py-28 px-4 sm:px-6 ${isDark ? 'bg-[#0F0F12]' : 'bg-gradient-to-b from-white to-slate-50'}`}>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-4 block">
                  10 SEMANAS INTENSIVAS
                </span>
                <h2 className={`text-3xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Programa completo
                </h2>
                <p className={`text-lg ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                  De la idea al negocio facturando en 10 semanas
                </p>
              </div>

              <div className="space-y-3">
                {curriculum.map((week, i) => (
                  <div
                    key={i}
                    className={`${week.highlight ? 'week-item-highlight' : 'week-item'} rounded-xl px-5 py-4 flex items-center gap-4`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{week.week}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {week.highlight && '🎉 '}{week.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-slate-500'} truncate`}>
                        {week.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Instructor Section */}
          <section className={`py-20 lg:py-28 px-4 sm:px-6 ${isDark ? 'bg-[#0F0F12]' : 'bg-slate-50/50'}`}>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="relative flex-shrink-0">
                  <div className={`w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden ring-4 ring-offset-4 ring-[#8B5CF6]/30 ${isDark ? 'ring-offset-[#0F0F12]' : 'ring-offset-white'}`}>
                    <img
                      src="/images/josu-sanz.jpg"
                      alt="Josu Sanz"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-full flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-500/30">
                    👨‍💻
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <span className="text-[#8B5CF6] text-xs font-bold uppercase tracking-widest mb-2 block">
                    TU MENTOR
                  </span>
                  <h3 className={`text-2xl lg:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Josu Sanz</h3>
                  <p className={`text-lg mb-4 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                    +20 años construyendo productos digitales. He creado más de 500 webs y lanzado +20 proyectos propios.
                    Ahora ayudo a otros a hacer lo mismo usando IA.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${isDark ? 'bg-white/5 text-zinc-400' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                      Fundador de Yenze
                    </span>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${isDark ? 'bg-white/5 text-zinc-400' : 'bg-purple-50 text-purple-700 border border-purple-100'}`}>
                      Creador de aprende.software
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="precio" className="py-20 lg:py-28 px-4 sm:px-6 relative overflow-hidden">
            {/* Background mesh for pricing */}
            <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent' : 'bg-gradient-to-b from-transparent via-indigo-50/50 to-transparent'}`}></div>

            <div className="max-w-xl mx-auto relative">
              <div className="text-center mb-12">
                <span className="text-[#8B5CF6] text-xs font-bold uppercase tracking-widest mb-4 block">
                  INVERSIÓN
                </span>
                <h2 className={`text-3xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Una decisión que cambia todo
                </h2>
                <p className={`text-lg ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                  Inversión que se recupera con tu primer cliente
                </p>
              </div>

              <div className="pricing-glass rounded-3xl p-8 lg:p-10 text-center">
                {/* Price */}
                <div className="mb-8">
                  <div className={`text-xl line-through mb-1 ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>1.997€</div>
                  <div className={`text-6xl lg:text-7xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>997€</div>
                  <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                    pago único · IVA incluido
                  </p>
                  <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
                    <span className={`text-sm font-semibold ${isDark ? 'text-green-500' : 'text-green-700'}`}>Ahorras 1.000€</span>
                  </div>
                </div>

                {/* Divider */}
                <div className={`h-px w-full ${isDark ? 'bg-white/10' : 'bg-slate-200'} mb-8`}></div>

                {/* Features */}
                <div className="space-y-4 mb-8 text-left">
                  {[
                    '10 clases en vivo de 2 horas',
                    '10 sesiones de mentoría individual',
                    'Acceso de por vida a materiales',
                    'Comunidad privada exclusiva',
                    'Plantillas y recursos premium'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="check-circle">
                        <span>✓</span>
                      </div>
                      <span className={isDark ? 'text-zinc-300' : 'text-slate-700'}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="https://yenze.lemonsqueezy.com/checkout/buy/4bec4db6-6245-4822-a577-4fba37c541de"
                  className="btn-gradient w-full text-white py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 mb-4"
                >
                  Reservar mi plaza ahora →
                </a>

                <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                  🔒 Garantía de devolución de 14 días
                </p>
              </div>
            </div>
          </section>

          {/* For Who Section */}
          <section className="py-20 lg:py-28 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#8B5CF6] text-xs font-bold uppercase tracking-widest mb-4 block">
                  ¿ES PARA TI?
                </span>
                <h2 className={`text-3xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Este curso es para ti si...
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '💡', text: 'Tienes una idea de negocio pero no sabes cómo empezar' },
                  { icon: '⏰', text: 'Quieres dejar de postergar y lanzar de una vez' },
                  { icon: '🚫', text: 'No sabes programar (ni quieres aprender)' },
                  { icon: '🤖', text: 'Quieres aprovechar la IA para ir más rápido' },
                  { icon: '👥', text: 'Prefieres aprender en grupo con apoyo personalizado' },
                  { icon: '🎯', text: 'Buscas resultados reales, no solo teoría' }
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 ${isDark ? 'bg-white/5 border border-white/5 hover:border-white/10' : 'bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200'}`}>
                    <span className="text-2xl">{item.icon}</span>
                    <span className={`font-medium ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <a href="#aplicar" className="btn-gradient inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl text-lg font-semibold">
                  Quiero aplicar →
                </a>
              </div>
            </div>
          </section>

          {/* Application Form */}
          <section id="aplicar" className={`py-20 lg:py-28 px-4 sm:px-6 ${isDark ? 'bg-[#0F0F12]' : 'bg-gradient-to-b from-slate-50 to-white'}`}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-4 block">
                  PLAZAS LIMITADAS
                </span>
                <h2 className={`text-3xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Aplica a la próxima edición
                </h2>
                <p className={`text-lg ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                  Completa este breve cuestionario para reservar tu plaza.
                </p>
              </div>

              <div className={`${isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50'} rounded-3xl border overflow-hidden`}>
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

          {/* FAQ Section */}
          <section className="py-20 lg:py-28 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Preguntas frecuentes
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bento-card rounded-2xl p-6">
                    <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{faq.q}</h3>
                    <p className={isDark ? 'text-zinc-400' : 'text-slate-600'}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className={`py-20 lg:py-28 px-4 sm:px-6 ${isDark ? 'bg-[#0F0F12]' : 'bg-gradient-to-b from-white to-indigo-50/30'}`}>
            <div className="max-w-2xl mx-auto text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 pulse ${isDark ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'}`}>
                <span className={`text-sm font-semibold ${isDark ? 'text-amber-500' : 'text-amber-700'}`}>⚡ Solo quedan 10 plazas</span>
              </div>
              <h2 className={`text-3xl lg:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Tu negocio digital te espera
              </h2>
              <p className={`text-lg mb-10 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                En 10 semanas podrías estar facturando con tu propio negocio.<br className="hidden sm:block" />
                La próxima edición empieza en marzo 2026.
              </p>
              <a
                href="#precio"
                className="btn-gradient inline-flex items-center gap-2 text-white px-10 py-5 rounded-2xl text-lg font-semibold"
              >
                Reservar mi plaza ahora →
              </a>
              <p className={`text-sm mt-4 ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>
                🔒 Garantía de devolución de 14 días
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className={`py-12 px-4 sm:px-6 ${isDark ? 'border-t border-white/5' : 'border-t border-slate-200'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AS</span>
                </div>
                <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>aprende.software</span>
              </div>

              <div className={`flex gap-8 text-sm ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                <Link href="/" className="hover:text-[#3B82F6] transition-colors">Inicio</Link>
                <a href="#programa" className="hover:text-[#3B82F6] transition-colors">Programa</a>
                <a href="#precio" className="hover:text-[#3B82F6] transition-colors">Precios</a>
                <Link href="/privacidad" className="hover:text-[#3B82F6] transition-colors">Privacidad</Link>
              </div>

              <p className={`text-sm ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>
                © 2026 Josu Sanz
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
