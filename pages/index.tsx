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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
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
        <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <span className="material-symbols-outlined text-white text-xl">terminal</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-indigo-600">Claude Code en Español</span>
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
        <main className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
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

        {/* Features Section */}
        <section className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-950 dark:text-white">
                ¿Por qué este curso es diferente?
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                No es otro tutorial más. Es la forma más efectiva de dominar Claude Code.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Aprendes haciendo</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  No videos aburridos. Ejecutas comandos, ves resultados reales, y construyes proyectos desde el primer día.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-4">🇪🇸</div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">100% en español</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  El único curso completo de Claude Code en español. Sin barreras de idioma, sin traducciones automáticas.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Sin experiencia necesaria</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Diseñado para personas no técnicas. Si sabes mantener una conversación, puedes usar Claude Code.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-950 dark:text-white">
                ¿Qué aprenderás?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                  <span className="text-3xl">📚</span>
                  Módulo 1: Fundamentos (~4 horas)
                </h3>
                <ul className="space-y-4">
                  {[
                    '🔍 Explorar archivos y proyectos',
                    '✏️ Crear y editar contenido',
                    '⚡ Comandos slash personalizados',
                    '🤖 Agentes paralelos',
                    '🎭 Sub-agentes especializados',
                    '🧠 Memoria persistente (CLAUDE.md)',
                    '🚀 Próximos pasos y proyecto final'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <span className="text-emerald-500 font-bold text-xl">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                  <span className="text-3xl">🛠️</span>
                  Módulo 2: Proyectos (Próximamente)
                </h3>
                <ul className="space-y-4">
                  {[
                    'Crear una landing page desde cero',
                    'Automatizar flujos de trabajo',
                    'Investigación y análisis con IA',
                    'Proyectos reales del mundo laboral'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <span className="text-slate-400 font-bold text-xl">○</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
              Comienza hoy mismo
            </h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Descarga el curso gratis y empieza a dominar Claude Code en menos de 15 minutos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://github.com/Josusanz/claude-code-espanol-web/releases/latest"
                className="w-full sm:w-auto bg-white text-indigo-600 font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">download</span>
                Descargar Curso Gratis
              </Link>
              <Link
                href="/empezar/introduccion"
                className="w-full sm:w-auto bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-4 px-8 rounded-2xl border-2 border-indigo-500 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">library_books</span>
                Ver Documentación
              </Link>
            </div>
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
            className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
