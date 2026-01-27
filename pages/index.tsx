import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import UserNav from '../components/UserNav'

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [terminalStep, setTerminalStep] = useState(0)
  const [typedCommand, setTypedCommand] = useState('')
  const [typedResponse, setTypedResponse] = useState('')
  const terminalRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  const command = 'claude "crea una landing page en español"'
  const response = '¡Hola! He analizado tu solicitud. Estoy creando una landing page profesional en español optimizada para conversión. ¿Deseas que añada soporte para modo oscuro?'

  useEffect(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      const isDarkMode = savedTheme === 'dark'
      setIsDark(isDarkMode)
      document.documentElement.classList.toggle('dark', isDarkMode)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Terminal animation with Intersection Observer
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

    if (terminalRef.current) {
      observer.observe(terminalRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const startTerminalAnimation = () => {
    // Step 1: Type command
    let i = 0
    const typeCommand = setInterval(() => {
      if (i < command.length) {
        setTypedCommand(command.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeCommand)
        // Step 2: Show "thinking" messages
        setTimeout(() => setTerminalStep(1), 300)
        setTimeout(() => setTerminalStep(2), 1000)
        setTimeout(() => {
          setTerminalStep(3)
          // Step 3: Type response
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

  const toggleDarkMode = () => {
    const newState = !isDark
    setIsDark(newState)
    document.documentElement.classList.toggle('dark', newState)
    localStorage.setItem('theme', newState ? 'dark' : 'light')
  }

  return (
    <>
      <Head>
        <title>Aprende Claude Code en Español | Curso Gratis de IA para No Programadores</title>
        <meta name="description" content="Curso gratuito de Claude Code en español. Aprende a usar la herramienta de IA más potente sin saber programar. 8 lecciones prácticas, proyectos reales y certificado." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="claude code, curso claude code, aprender ia, inteligencia artificial español, claude anthropic, programar con ia, curso gratis ia, no code, automatización ia" />
        <meta name="author" content="Josu Sanz" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.aprende.software/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aprende.software/" />
        <meta property="og:title" content="Aprende Claude Code en Español | Curso Gratis de IA" />
        <meta property="og:description" content="Curso gratuito de Claude Code en español. Aprende a usar la herramienta de IA más potente sin saber programar. 8 lecciones prácticas." />
        <meta property="og:site_name" content="aprende.software" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:image" content="https://www.aprende.software/images/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aprende Claude Code en Español | Curso Gratis" />
        <meta name="twitter:description" content="Curso gratuito de Claude Code en español. Aprende IA sin saber programar." />
        <meta name="twitter:image" content="https://www.aprende.software/images/og-image.png" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "Claude Code en Español",
              "description": "Curso gratuito para aprender Claude Code, la herramienta de IA de Anthropic. Diseñado para personas sin experiencia en programación.",
              "provider": {
                "@type": "Person",
                "name": "Josu Sanz",
                "url": "https://www.josusanz.com"
              },
              "url": "https://www.aprende.software/",
              "educationalLevel": "Beginner",
              "inLanguage": "es",
              "isAccessibleForFree": true,
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock"
              },
              "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "Online",
                "courseWorkload": "PT4H"
              }
            })
          }}
        />

        <script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class'
              }
            `
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
        }
        .dark body {
          background: #020617;
        }
        .hero-section {
          background: linear-gradient(180deg, rgba(79, 70, 229, 0.08) 0%, rgba(79, 70, 229, 0.03) 30%, transparent 60%);
        }
        .dark .hero-section {
          background: linear-gradient(180deg, rgba(79, 70, 229, 0.15) 0%, rgba(79, 70, 229, 0.05) 30%, transparent 60%);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        /* Botón principal - fix para Tailwind CDN */
        .btn-cta-primary {
          background: linear-gradient(to right, #4f46e5, #7c3aed) !important;
          color: white !important;
          box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4), 0 8px 10px -6px rgba(99, 102, 241, 0.3) !important;
        }
        .btn-cta-primary:hover {
          background: linear-gradient(to right, #4338ca, #6d28d9) !important;
          box-shadow: 0 20px 35px -5px rgba(99, 102, 241, 0.5), 0 10px 15px -6px rgba(99, 102, 241, 0.4) !important;
          transform: translateY(-2px);
        }
        /* Botón Premium nav */
        .btn-premium-nav {
          background: linear-gradient(to right, #f59e0b, #ea580c) !important;
          color: white !important;
        }
        .btn-premium-nav:hover {
          background: linear-gradient(to right, #d97706, #dc2626) !important;
        }
      `}</style>

      <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="bg-slate-900 dark:bg-white p-1 rounded-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-white dark:text-slate-900 text-[20px]">terminal</span>
                </div>
                <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
                  Claude Code <span className="text-slate-500 dark:text-slate-400 font-normal">en Español</span>
                </span>
              </div>

              <div className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-indigo-600 font-medium text-sm">
                  Inicio
                </Link>

                {/* Mega Menu: Curso */}
                <div className="relative group">
                  <button className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium py-4">
                    Curso
                    <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-6 min-w-[600px]">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Columna izquierda - Aprendizaje */}
                        <div>
                          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Aprende</h3>
                          <div className="space-y-1">
                            <Link href="/modo-facil" className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all group/item">
                              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">touch_app</span>
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400">Modo Fácil</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Sin instalar nada, desde el navegador</div>
                              </div>
                            </Link>
                            <Link href="/empezar/introduccion" className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 transition-all group/item">
                              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-green-600 dark:text-green-400">rocket_launch</span>
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white group-hover/item:text-green-600 dark:group-hover/item:text-green-400">Empezar</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Instalación y primeros pasos</div>
                              </div>
                            </Link>
                            <Link href="/fundamentos/que-es" className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 dark:hover:from-violet-900/20 dark:hover:to-purple-900/20 transition-all group/item">
                              <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-violet-600 dark:text-violet-400">school</span>
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white group-hover/item:text-violet-600 dark:group-hover/item:text-violet-400">Fundamentos</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Domina los conceptos clave</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                        {/* Columna derecha - Práctica */}
                        <div>
                          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Practica</h3>
                          <div className="space-y-1">
                            <Link href="/proyectos" className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-900/20 transition-all group/item">
                              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">folder_open</span>
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400">Proyectos</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">4 proyectos reales paso a paso</div>
                              </div>
                            </Link>
                            <Link href="/recursos" className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-gray-50 dark:hover:from-slate-800/50 dark:hover:to-gray-800/50 transition-all group/item">
                              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">description</span>
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300">Recursos</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Cheatsheets, prompts y más</div>
                              </div>
                            </Link>
                          </div>
                          {/* CTA */}
                          <div className="mt-4 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                            <div className="text-white font-semibold text-sm mb-1">100% Gratis</div>
                            <div className="text-indigo-100 text-xs mb-3">4 módulos, 27 lecciones</div>
                            <Link href="/empezar/introduccion" className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
                              Empezar ahora <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mega Menu: Premium */}
                <div className="relative group">
                  <button className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium py-4">
                    Premium
                    <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-6 min-w-[500px]">
                      <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Cursos Premium</h3>
                      <div className="space-y-3">
                        {/* Ralph Loop Card */}
                        <Link href="/ralph" className="block p-4 rounded-xl border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 transition-all group/item">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/25">
                              <span className="material-symbols-outlined text-white text-2xl">loop</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 dark:text-white">Ralph Loop</span>
                                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-2 py-0.5 rounded-full">$47</span>
                              </div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">Claude en piloto automático</div>
                            </div>
                            <span className="material-symbols-outlined text-purple-400 group-hover/item:translate-x-1 transition-transform">arrow_forward</span>
                          </div>
                        </Link>
                        {/* Course Builder Card */}
                        <Link href="/course-builder" className="block p-4 rounded-xl border-2 border-transparent hover:border-amber-300 dark:hover:border-amber-700 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 transition-all group/item">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25">
                              <span className="material-symbols-outlined text-white text-2xl">school</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 dark:text-white">Course Builder</span>
                                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 rounded-full">$147</span>
                              </div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">Crea y vende cursos con IA</div>
                            </div>
                            <span className="material-symbols-outlined text-amber-400 group-hover/item:translate-x-1 transition-transform">arrow_forward</span>
                          </div>
                        </Link>
                      </div>
                      {/* Footer */}
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                        <Link href="/premium" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1">
                          Ver todos los cursos <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                        <a href="https://yenze.lemonsqueezy.com/affiliates" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">handshake</span>
                          Afiliados 20%
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blog link */}
                <Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium">
                  Blog
                </Link>
              </div>

              <div className="flex items-center gap-3">
                {/* Search - hidden on mobile */}
                <div className="relative hidden lg:block">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-sm">search</span>
                  </div>
                  <input
                    className="bg-slate-100 dark:bg-slate-800/50 border-none rounded-full py-1.5 pl-10 pr-12 text-sm focus:ring-2 focus:ring-indigo-600/50 w-64 placeholder-slate-500 dark:placeholder-slate-400"
                    placeholder="Search documentation..."
                    type="text"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded shadow-sm">
                      ⌘ K
                    </kbd>
                  </div>
                </div>

                {/* Premium button - always visible */}
                <Link
                  href="/premium"
                  className="btn-premium-nav flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  <span>✨</span>
                  <span className="hidden sm:inline">Premium</span>
                </Link>

                {/* User nav - shows account or login */}
                <UserNav />

                {/* Hamburger menu button - mobile only */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  aria-label="Abrir menú"
                >
                  <span className="material-symbols-outlined text-2xl">
                    {mobileMenuOpen ? 'close' : 'menu'}
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-4 px-4 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md">
                <div className="flex flex-col space-y-1">
                  <Link href="/" className="text-indigo-600 font-medium py-2 px-2" onClick={() => setMobileMenuOpen(false)}>
                    Inicio
                  </Link>

                  {/* Curso section */}
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">Curso Gratuito</span>
                    <div className="mt-1 space-y-1">
                      <Link href="/modo-facil" className="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 py-2 px-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                        Modo Fácil
                      </Link>
                      <Link href="/empezar/introduccion" className="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 py-2 px-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                        Empezar
                      </Link>
                      <Link href="/fundamentos/que-es" className="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 py-2 px-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                        Fundamentos
                      </Link>
                      <Link href="/proyectos" className="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 py-2 px-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                        Proyectos
                      </Link>
                      <Link href="/recursos" className="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 py-2 px-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                        Recursos
                      </Link>
                    </div>
                  </div>

                  {/* Premium section */}
                  <div className="pt-3">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">Premium</span>
                    <div className="mt-1 space-y-1">
                      <Link href="/ralph" className="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 py-2 px-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                        Ralph Loop
                        <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">$47</span>
                      </Link>
                      <Link href="/course-builder" className="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 py-2 px-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                        Course Builder
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">$147</span>
                      </Link>
                    </div>
                  </div>

                  {/* Blog link */}
                  <div className="pt-3">
                    <Link href="/blog" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 py-2 px-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                      <span className="material-symbols-outlined text-lg">rss_feed</span>
                      Blog
                    </Link>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                    <Link
                      href="/premium"
                      className="btn-premium-nav flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base font-semibold transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ✨ Acceder a Premium
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <main className="relative overflow-hidden pb-24 lg:pb-32 hero-section">
          <div className="max-w-4xl mx-auto px-6 pt-16 lg:pt-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-indigo-500/20 border border-blue-100 dark:border-indigo-400/30 text-blue-600 dark:text-indigo-300 text-sm font-semibold mb-6 shadow-sm">
              <span>✨</span>
              Primer curso completo en español
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.1] text-slate-950 dark:text-white">
              Domina Claude Code <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                sin escribir código
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 font-medium">
              Aprende la herramienta de IA más potente{' '}
              <span className="text-slate-900 dark:text-slate-200 font-bold">haciendo, no mirando.</span>
            </p>

            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-12">
              Curso interactivo 100% en español diseñado para no programadores que quieren potenciar su productividad.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/acceso"
                className="btn-cta-primary w-full sm:w-auto font-bold py-4 px-8 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">rocket_launch</span>
                Empezar Curso Gratis
              </Link>
              <Link
                href="/empezar/introduccion"
                className="w-full sm:w-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 font-bold py-4 px-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">library_books</span>
                Ver Documentaci&oacute;n
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-emerald-500">check_circle</span>
              <span>100% gratis &middot; Sin tarjeta de cr&eacute;dito &middot; Acceso inmediato</span>
            </div>

            {/* Product Hunt Badge */}
            <div className="mt-8 flex justify-center">
              <a
                href="https://www.producthunt.com/products/claude-code-en-espanol?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-claude-code-en-espanol"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1063751&theme=light&t=1768701681086"
                  alt="Claude Code en Español - Learn AI-assisted coding in Spanish — Free & hands-on | Product Hunt"
                  width="250"
                  height="54"
                  className="dark:hidden"
                />
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1063751&theme=dark&t=1768701681086"
                  alt="Claude Code en Español - Learn AI-assisted coding in Spanish — Free & hands-on | Product Hunt"
                  width="250"
                  height="54"
                  className="hidden dark:block"
                />
              </a>
            </div>

            {/* Terminal Demo - Interactive */}
            <div className="mt-24 relative" ref={terminalRef}>
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-600/30 to-purple-500/30 blur-3xl opacity-60"></div>
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden aspect-[16/9] flex flex-col">
                <div className="h-10 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-[10px] text-slate-400 font-medium">Terminal — claude-code</span>
                  </div>
                </div>
                <div className="flex-1 p-6 text-left font-mono text-sm bg-slate-950 text-slate-100 overflow-hidden">
                  {/* Command line */}
                  <div className="flex gap-3 mb-4">
                    <span className="text-emerald-500">➜</span>
                    <span className="text-blue-400">~/proyecto</span>
                    <span className="text-white">
                      {typedCommand}
                      {terminalStep === 0 && <span className="inline-block h-4 w-2 bg-slate-400 animate-pulse ml-0.5"></span>}
                    </span>
                  </div>

                  {/* Thinking messages */}
                  {terminalStep >= 1 && (
                    <div className="text-slate-400 mb-2 animate-fade-in">
                      <span className="text-yellow-500">●</span> Analizando estructura del proyecto...
                    </div>
                  )}
                  {terminalStep >= 2 && (
                    <div className="text-slate-400 mb-4 animate-fade-in">
                      <span className="text-yellow-500">●</span> Claude está pensando...
                    </div>
                  )}

                  {/* Claude response */}
                  {terminalStep >= 3 && (
                    <div className="text-slate-200 mb-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700 animate-fade-in">
                      <div className="flex gap-2 items-start">
                        <span className="text-purple-400 font-semibold shrink-0">Claude:</span>
                        <span className="leading-relaxed">
                          {typedResponse}
                          {terminalStep === 3 && <span className="inline-block h-4 w-2 bg-purple-400 animate-pulse ml-0.5"></span>}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* New prompt */}
                  {terminalStep >= 4 && (
                    <div className="flex gap-3 animate-fade-in">
                      <span className="text-emerald-500">➜</span>
                      <span className="text-blue-400">~/proyecto</span>
                      <span className="inline-block h-4 w-2 bg-slate-400 animate-pulse"></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Video Demos Section */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Aprende con nosotros
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Cursos y recursos para dominar Claude Code
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Video 1: Course Builder */}
              <Link href="/premium/course-builder" className="group relative bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition-all hover:shadow-xl cursor-pointer">
                <div className="aspect-video relative bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                  <div className="relative z-10 text-center">
                    <span className="material-symbols-outlined text-white text-5xl mb-2 opacity-90">school</span>
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded">$147</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Course Builder</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Crea y vende cursos con IA</p>
                </div>
              </Link>

              {/* Video 2: Automation */}
              <Link href="/proyectos/automatizaciones-intro" className="group relative bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-xl cursor-pointer">
                <div className="aspect-video relative bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                  <div className="relative z-10 text-center">
                    <span className="material-symbols-outlined text-white text-5xl mb-2 opacity-90">bolt</span>
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">Tutorial</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Automatizar Tareas</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Organiza 500 archivos en segundos</p>
                </div>
              </Link>

              {/* Video 3: Ralph Loop */}
              <Link href="/ralph" className="group relative bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500 transition-all hover:shadow-xl cursor-pointer">
                <div className="aspect-video relative bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                  <div className="relative z-10 text-center">
                    <span className="material-symbols-outlined text-white text-5xl mb-2 opacity-90">loop</span>
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">$47</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Ralph Loop</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Claude en piloto automático 24/7</p>
                </div>
              </Link>
            </div>

            <p className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-base align-middle mr-1">arrow_forward</span>
              Haz clic para ver mas detalles
            </p>
          </div>
        </section>

        {/* Simple Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800"></div>

        {/* Modo Fácil Section - For beginners */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-5xl">🌱</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mb-3">
                  <span className="material-symbols-outlined text-sm">new_releases</span>
                  Nuevo
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                  ¿No sabes usar la terminal? No hay problema
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  <strong className="text-slate-800 dark:text-slate-200">Modo Fácil</strong> te enseña a usar Claude desde el navegador,
                  sin instalar nada. Perfecto para empezar desde cero o si la terminal te intimida.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                  <Link
                    href="/modo-facil"
                    className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">play_arrow</span>
                    Empezar Modo Fácil
                  </Link>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    100% gratis · 8 lecciones · Sin terminal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Claude Pro Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-indigo-200 dark:border-indigo-800 p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-2xl">workspace_premium</span>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Necesitas Claude Pro para empezar
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Claude Code requiere una suscripción a Claude Pro ($20/mes). Acceso ilimitado a Claude Sonnet 4.5 y Opus 4.5.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-emerald-600 dark:text-emerald-400 text-xl">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">Uso ilimitado de Claude</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-emerald-600 dark:text-emerald-400 text-xl">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">Proyectos sin límites</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-emerald-600 dark:text-emerald-400 text-xl">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">Modelos más potentes</span>
                </div>
              </div>

              <a
                href="https://claude.ai/upgrade"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">open_in_new</span>
                Obtener Claude Pro
              </a>
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                4 módulos, 33 lecciones prácticas
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Aprende haciendo. Desde fundamentos hasta crear y monetizar tus propios cursos.
              </p>
            </div>

            {/* Módulo 1 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📚</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Módulo 1: Fundamentos</h3>
                <span className="text-sm text-slate-500 dark:text-slate-400 ml-auto">9 lecciones · ~4h</span>
              </div>
              <div className="space-y-2 pl-4 border-l-2 border-indigo-200 dark:border-indigo-800">
                {[
                  { title: '¿Qué es Claude Code?', desc: 'Diferencia con chat normal' },
                  { title: 'Exploración de archivos', desc: 'Navega proyectos con IA' },
                  { title: 'Crear y modificar', desc: 'Genera código y documentos' },
                  { title: 'Visualizar creaciones', desc: 'Previsualiza resultados' },
                  { title: 'Comandos slash', desc: 'Atajos personalizados' },
                  { title: 'Agentes paralelos', desc: 'Tareas simultáneas' },
                  { title: 'Sub-agentes', desc: 'Delega tareas complejas' },
                  { title: 'Memoria (CLAUDE.md)', desc: 'Contexto persistente' },
                  { title: 'Próximos pasos', desc: 'Recursos avanzados' },
                ].map((lesson, i) => (
                  <div key={i} className="py-2 text-sm">
                    <span className="font-medium text-slate-900 dark:text-white">{lesson.title}</span>
                    <span className="text-slate-500 dark:text-slate-400"> — {lesson.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Módulo 2 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🛠️</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Módulo 2: Proyectos Prácticos</h3>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full">Nuevo</span>
                <span className="text-sm text-slate-500 dark:text-slate-400 ml-auto">10 lecciones · ~3.5h</span>
              </div>
              <div className="space-y-2 pl-4 border-l-2 border-emerald-200 dark:border-emerald-800">
                {[
                  { title: 'Landing Page', desc: 'Crea una web profesional sin código' },
                  { title: 'Automatizaciones', desc: 'Organiza archivos y tareas' },
                  { title: 'Tareas programadas', desc: 'Backups automáticos con cron' },
                  { title: 'Investigación', desc: 'Claude como asistente de research' },
                  { title: 'Análisis de datos', desc: 'Procesa CSVs y genera insights' },
                ].map((lesson, i) => (
                  <div key={i} className="py-2 text-sm">
                    <span className="font-medium text-slate-900 dark:text-white">{lesson.title}</span>
                    <span className="text-slate-500 dark:text-slate-400"> — {lesson.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Módulo 3 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🤖</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Módulo 3: Ralph Loop</h3>
                <span className="px-2 py-0.5 text-xs font-semibold bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full">Premium $47</span>
                <span className="text-sm text-slate-500 dark:text-slate-400 ml-auto">8 lecciones · ~3.5h</span>
              </div>
              <div className="space-y-2 pl-4 border-l-2 border-purple-200 dark:border-purple-800">
                {[
                  { title: '¿Qué es Ralph Loop?', desc: 'Automatización autónoma' },
                  { title: 'Context Rot', desc: 'Por qué reiniciar el contexto' },
                  { title: 'Anatomía del loop', desc: 'Los 4 archivos clave' },
                  { title: 'Definir specs', desc: 'La conversación inicial' },
                  { title: 'Crear el plan', desc: 'Tareas atómicas' },
                  { title: 'Ejecutar el loop', desc: 'Lanzar y monitorear' },
                  { title: 'Proyecto práctico', desc: 'Construye una app con Ralph' },
                  { title: 'Consejos avanzados', desc: 'Seguridad y casos especiales' },
                ].map((lesson, i) => (
                  <div key={i} className="py-2 text-sm">
                    <span className="font-medium text-slate-900 dark:text-white">{lesson.title}</span>
                    <span className="text-slate-500 dark:text-slate-400"> — {lesson.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Módulo 4 */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🎓</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Módulo 4: Course Builder</h3>
                <span className="px-2 py-0.5 text-xs font-semibold bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full">Premium $147</span>
                <span className="text-sm text-slate-500 dark:text-slate-400 ml-auto">6 lecciones · ~3h</span>
              </div>
              <div className="space-y-2 pl-4 border-l-2 border-amber-200 dark:border-amber-800">
                {[
                  { title: 'Arquitectura de comandos', desc: 'Diseña lecciones interactivas' },
                  { title: 'CLAUDE.md efectivo', desc: 'Configura el tutor perfecto' },
                  { title: 'Sistema de progreso', desc: 'Trackea el avance del alumno' },
                  { title: 'Web con Nextra', desc: 'Documentación profesional' },
                  { title: 'Distribución GitHub', desc: 'Releases y versiones' },
                  { title: 'Monetización', desc: 'Vende con LemonSqueezy' },
                ].map((lesson, i) => (
                  <div key={i} className="py-2 text-sm">
                    <span className="font-medium text-slate-900 dark:text-white">{lesson.title}</span>
                    <span className="text-slate-500 dark:text-slate-400"> — {lesson.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Empieza gratis hoy
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Solo necesitas tu email. Acceso instant&aacute;neo al curso completo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/acceso"
                className="btn-cta-primary w-full sm:w-auto font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">rocket_launch</span>
                Acceder al Curso
              </Link>
              <Link
                href="/empezar/introduccion"
                className="w-full sm:w-auto border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">library_books</span>
                Ver Documentaci&oacute;n
              </Link>
            </div>

            <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
              Para practicar necesitas Claude Pro ($20/mes)
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <div className="bg-indigo-600 p-1.5 rounded-lg">
                    <span className="material-symbols-outlined text-white text-lg">terminal</span>
                  </div>
                  Claude Code en Español
                </h3>
                <p className="text-sm">
                  Curso gratuito de código abierto para la comunidad hispanohablante.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Enlaces</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/empezar/introduccion" className="hover:text-white transition-colors">Empezar</Link></li>
                  <li><Link href="/fundamentos/que-es" className="hover:text-white transition-colors">Fundamentos</Link></li>
                  <li><Link href="/proyectos" className="hover:text-white transition-colors">Proyectos</Link></li>
                  <li><Link href="/ralph" className="hover:text-white transition-colors">Ralph Loop</Link></li>
                  <li><Link href="/course-builder" className="hover:text-white transition-colors">Course Builder</Link></li>
                  <li><Link href="/recursos" className="hover:text-white transition-colors">Recursos</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Proyectos de Josu Sanz</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://www.josusanz.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">josusanz.com</a></li>
                  <li><a href="https://yenze.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Yenze.io</a></li>
                  <li><a href="https://www.sacredevents.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sacred Events</a></li>
                  <li><a href="https://github.com/Josusanz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-sm">
              <p>
                © 2026 Josu Sanz ·{' '}
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Licencia CC BY-NC-SA 4.0
                </a>
                {' '}·{' '}
                <Link href="/privacidad" className="hover:text-white transition-colors">
                  Privacidad
                </Link>
              </p>
            </div>
          </div>
        </footer>

        {/* Dark Mode Toggle */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={toggleDarkMode}
            aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
            className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300 text-[20px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
