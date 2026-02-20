import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import UserNav from '../components/UserNav'

const MODULE_PREVIEW = [
  { emoji: '🌱', title: 'Modo Fácil', desc: 'Usa Claude desde el navegador, sin terminal', lessons: 8, href: '/modo-facil' },
  { emoji: '📚', title: 'Fundamentos', desc: 'Domina los conceptos clave de Claude Code', lessons: 11, href: '/fundamentos' },
  { emoji: '🛠️', title: 'Proyectos', desc: '4 proyectos reales paso a paso', lessons: 11, href: '/proyectos' },
]

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

  const toggleDarkMode = () => {
    const newState = !isDark
    setIsDark(newState)
    document.documentElement.classList.toggle('dark', newState)
    localStorage.setItem('theme', newState ? 'dark' : 'light')
  }

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

        <script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>
        <script dangerouslySetInnerHTML={{ __html: `tailwind.config = { darkMode: 'class' }` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        body { font-family: 'Inter', sans-serif; background: #f8fafc; }
        .dark body { background: #020617; }
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
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
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
        .module-preview:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(0,0,0,0.15); }
      `}</style>

      <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
        {/* Nav */}
        <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
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
                <Link href="/curso-gratis" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium">
                  Curso Gratis
                </Link>
                <Link href="/premium" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium">
                  Premium
                </Link>
                <Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium">
                  Blog
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <UserNav />
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

            {mobileMenuOpen && (
              <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-4 px-2 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md">
                <div className="flex flex-col space-y-1">
                  <Link href="/curso-gratis" className="text-indigo-600 font-semibold py-2 px-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                    Curso Gratis (47 lecciones)
                  </Link>
                  <Link href="/premium" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 py-2 px-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                    Cursos Premium
                  </Link>
                  <Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 py-2 px-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                    Blog
                  </Link>
                  <Link href="/curso" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 py-2 px-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                    Ya tengo cuenta
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero */}
        <main className="relative overflow-hidden pb-20 lg:pb-28 hero-section">
          <div className="max-w-4xl mx-auto px-6 pt-16 lg:pt-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-indigo-500/20 border border-blue-100 dark:border-indigo-400/30 text-blue-600 dark:text-indigo-300 text-sm font-semibold mb-6 shadow-sm">
              47 lecciones gratuitas · 7 módulos · En español
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-slate-950 dark:text-white">
              Crea software con IA<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                sin experiencia previa
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Aprende Claude Code haciendo proyectos reales. Desde tu primera web hasta automatizaciones y bots de IA. Todo gratis, todo en español.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/curso-gratis"
                className="btn-cta-primary w-full sm:w-auto font-bold py-4 px-10 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 text-lg"
              >
                <span className="material-symbols-outlined">rocket_launch</span>
                Empieza gratis
              </Link>
              <Link
                href="/curso"
                className="w-full sm:w-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 font-medium py-4 px-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                Ya tengo cuenta
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-emerald-500">check_circle</span>
              <span>100% gratis · Sin tarjeta de crédito · Acceso inmediato</span>
            </div>

            {/* Product Hunt */}
            <div className="mt-6 flex justify-center">
              <a href="https://www.producthunt.com/products/claude-code-en-espanol?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-claude-code-en-espanol" target="_blank" rel="noopener noreferrer">
                <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1063751&theme=light&t=1768701681086" alt="Claude Code en Español on Product Hunt" width="250" height="54" className="dark:hidden" />
                <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1063751&theme=dark&t=1768701681086" alt="Claude Code en Español on Product Hunt" width="250" height="54" className="hidden dark:block" />
              </a>
            </div>

            {/* Terminal Demo */}
            <div className="mt-16 relative" ref={terminalRef}>
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
                  <div className="flex gap-3 mb-4">
                    <span className="text-emerald-500">➜</span>
                    <span className="text-blue-400">~/proyecto</span>
                    <span className="text-white">
                      {typedCommand}
                      {terminalStep === 0 && <span className="inline-block h-4 w-2 bg-slate-400 animate-pulse ml-0.5"></span>}
                    </span>
                  </div>
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

        {/* Module Preview */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Empieza por donde quieras
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                7 módulos gratuitos, desde usar Claude en el navegador hasta crear proyectos completos.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {MODULE_PREVIEW.map((mod) => (
                <Link
                  key={mod.title}
                  href={mod.href}
                  className="module-preview block bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-2xl mb-4">
                    {mod.emoji}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{mod.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{mod.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{mod.lessons} lecciones</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">Gratis</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/curso-gratis"
                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                Ver los 7 módulos
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Upgrade CTA */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <h2 className="text-2xl md:text-3xl font-bold mb-3 relative">
                ¿Quieres crear un SaaS completo?
              </h2>
              <p className="text-indigo-100 mb-8 max-w-lg mx-auto relative">
                El curso de pago te lleva de cero a lanzar tu propio producto en 10 semanas. Con base de datos, auth, pagos y deploy.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
                <Link href="/curso-crea-tu-software" className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
                  Ver curso premium
                </Link>
                <Link href="/premium" className="text-white/80 hover:text-white font-medium underline underline-offset-4 transition-colors">
                  Todos los cursos avanzados
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 py-12">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <div className="bg-indigo-600 p-1.5 rounded-lg">
                    <span className="material-symbols-outlined text-white text-lg">terminal</span>
                  </div>
                  Claude Code en Español
                </h3>
                <p className="text-sm">
                  Curso gratuito para la comunidad hispanohablante. 47 lecciones, 7 módulos.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Curso</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/curso-gratis" className="hover:text-white transition-colors">Curso Gratis</Link></li>
                  <li><Link href="/fundamentos/que-es" className="hover:text-white transition-colors">Fundamentos</Link></li>
                  <li><Link href="/proyectos" className="hover:text-white transition-colors">Proyectos</Link></li>
                  <li><Link href="/clawdbot" className="hover:text-white transition-colors">Clawdbot</Link></li>
                  <li><Link href="/mcp" className="hover:text-white transition-colors">MCP</Link></li>
                  <li><Link href="/recursos" className="hover:text-white transition-colors">Recursos</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Más</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/premium" className="hover:text-white transition-colors">Cursos Premium</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><a href="https://discord.gg/PeqyDhSBEh" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a></li>
                  <li><a href="https://www.josusanz.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Josu Sanz</a></li>
                  <li><a href="https://github.com/Josusanz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-sm">
              <p>
                © 2026 Josu Sanz ·{' '}
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  CC BY-NC-SA 4.0
                </a>
                {' '}·{' '}
                <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
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
