import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <>
      <Head>
        <title>Claude Code en Español - Domina la IA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Claude Code en Español - Domina la IA" />
        <meta property="og:description" content="Aprende la herramienta de IA más potente haciendo, no mirando. Curso interactivo 100% en español." />
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
        .hero-gradient {
          background: radial-gradient(circle at top center, rgba(79, 70, 229, 0.08) 0%, transparent 70%);
        }
        .dark .hero-gradient {
          background: radial-gradient(circle at top center, rgba(79, 70, 229, 0.15) 0%, transparent 70%);
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

              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-indigo-600 font-medium">
                  Inicio
                </Link>
                <Link href="/empezar/introduccion" className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium">
                  🚀 Empezar
                </Link>
                <Link href="/fundamentos/que-es" className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium">
                  📚 Módulo 1
                </Link>
                <Link href="/proyectos" className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium">
                  🛠️ Módulo 2
                </Link>
                <Link href="/recursos" className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium">
                  📋 Recursos
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-sm">search</span>
                  </div>
                  <input
                    className="bg-slate-100 dark:bg-slate-800/50 border-none rounded-full py-1.5 pl-10 pr-12 text-sm focus:ring-2 focus:ring-indigo-600/50 w-64"
                    placeholder="Search documentation..."
                    type="text"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-sm">
                      ⌘ K
                    </kbd>
                  </div>
                </div>

                <a href="https://github.com/Josusanz/claude-code-espanol-web" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-slate-50 dark:bg-slate-950">
          <div className="absolute top-0 inset-x-0 h-[800px] hero-gradient pointer-events-none"></div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-indigo-600/10 border border-blue-100 dark:border-indigo-600/20 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-12 shadow-sm">
              <span>✨</span>
              Primer curso completo en español
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.1] text-slate-950 dark:text-white">
              Domina Claude Code <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                sin escribir código
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 font-medium">
              Aprende la herramienta de IA más potente{' '}
              <span className="text-slate-900 dark:text-slate-200 font-bold">haciendo, no mirando.</span>
            </p>

            <p className="text-lg text-slate-500 dark:text-slate-500 max-w-xl mx-auto mb-12">
              Curso interactivo 100% en español diseñado para no programadores que quieren potenciar su productividad.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://github.com/Josusanz/claude-code-espanol-web/releases/latest"
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-600 hover:from-indigo-700 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">download</span>
                Descargar Curso Gratis
              </Link>
              <Link
                href="/empezar/introduccion"
                className="w-full sm:w-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 font-bold py-4 px-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">library_books</span>
                Ver Documentación
              </Link>
            </div>

            {/* Email Capture - ConvertKit */}
            <div className="mt-12 max-w-md mx-auto">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Recibe actualizaciones del curso y recursos exclusivos:
              </p>
              <form
                action="https://app.convertkit.com/forms/TU_FORM_ID/subscriptions"
                method="post"
                className="flex gap-2"
              >
                <input
                  type="email"
                  name="email_address"
                  placeholder="tu@email.com"
                  required
                  className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors text-sm"
                >
                  Suscribirme
                </button>
              </form>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-600">
                Tu email está seguro. Sin spam, cancela cuando quieras.
              </p>
            </div>

            {/* Terminal Demo */}
            <div className="mt-24 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-600/20 to-purple-500/20 blur-3xl opacity-50"></div>
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden aspect-[16/9] flex flex-col">
                <div className="h-10 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-[10px] text-slate-400 font-medium">claude-code-tutorial — 120x45</span>
                  </div>
                </div>
                <div className="flex-1 p-6 text-left font-mono text-sm bg-slate-950 text-slate-100">
                  <div className="flex gap-3 mb-4">
                    <span className="text-emerald-500">➜</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white">claude launch-project "landing-page-espanol"</span>
                  </div>
                  <div className="text-slate-400 mb-2">Analyzing project structure...</div>
                  <div className="text-slate-400 mb-2">Claude is thinking...</div>
                  <div className="flex gap-3 text-slate-200 mb-4 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                    <span className="text-purple-400">Claude:</span>
                    <span>
                      ¡Hola! He analizado tu solicitud. Estoy creando una landing page profesional en español
                      optimizada para conversión. ¿Deseas que añada soporte para modo oscuro?
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-emerald-500">➜</span>
                    <span className="text-blue-400">~</span>
                    <span className="inline-block h-5 w-2 bg-slate-400 animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Simple Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800"></div>

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
                8 lecciones prácticas
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Aprende haciendo. Cada lección incluye teoría y práctica.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { num: '01', title: 'Explorar archivos', desc: 'Navega y analiza proyectos con comandos de IA', time: '30 min' },
                { num: '02', title: 'Crear contenido', desc: 'Genera código, docs y archivos automáticamente', time: '30 min' },
                { num: '03', title: 'Comandos slash', desc: 'Crea tus propios comandos personalizados', time: '30 min' },
                { num: '04', title: 'Agentes paralelos', desc: 'Ejecuta múltiples tareas simultáneamente', time: '30 min' },
                { num: '05', title: 'Sub-agentes', desc: 'Delega tareas complejas a agentes especializados', time: '30 min' },
                { num: '06', title: 'Memoria persistente', desc: 'Configura el contexto con CLAUDE.md', time: '30 min' },
                { num: '07', title: 'Proyecto final', desc: 'Construye tu primer proyecto completo', time: '45 min' },
                { num: '08', title: 'Próximos pasos', desc: 'Recursos y caminos avanzados', time: '15 min' },
              ].map((lesson, i) => (
                <div
                  key={i}
                  className="border-b border-slate-200 dark:border-slate-800 py-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors px-4 -mx-4 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 text-slate-400 dark:text-slate-600 font-mono text-sm font-semibold">
                      {lesson.num}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-0.5">
                        {lesson.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {lesson.desc}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-sm text-slate-500 dark:text-slate-500 font-medium">
                      {lesson.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Descarga gratis y empieza hoy
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Sin registros. Sin suscripciones. Solo descarga y aprende.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://github.com/Josusanz/claude-code-espanol-web/releases/latest"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">download</span>
                Descargar Curso
              </Link>
              <Link
                href="/empezar/introduccion"
                className="w-full sm:w-auto border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">library_books</span>
                Ver Documentación
              </Link>
            </div>

            <p className="mt-8 text-sm text-slate-500 dark:text-slate-500">
              Compatible con Mac, Windows y Linux · Requiere Claude Pro ($20/mes)
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12">
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
                  <li><Link href="/recursos" className="hover:text-white transition-colors">Recursos</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Proyectos de Josu Sanz</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://yenze.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Yenze.io</a></li>
                  <li><a href="https://sacred.events" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sacred Events</a></li>
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
              </p>
            </div>
          </div>
        </footer>

        {/* Dark Mode Toggle */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={toggleDarkMode}
            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-lg hover:scale-110 transition-transform"
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
