import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function PremiumPage() {
  return (
    <>
      <Head>
        <title>Claude Code Course Builder - Crea y Vende Cursos con IA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Claude Code Course Builder" />
        <meta property="og:description" content="Aprende a crear y vender cursos interactivos con IA. El mismo sistema que usamos para crear el curso gratuito." />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.lemonSqueezyAffiliateConfig = { store: "yenze" };`
          }}
        />
        <script src="https://lmsqueezy.com/affiliate.js" defer />
      </Head>

      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
        }
        .dark body {
          background: #020617;
        }
        .hero-premium {
          background: linear-gradient(180deg, rgba(234, 179, 8, 0.08) 0%, rgba(234, 179, 8, 0.03) 30%, transparent 60%);
        }
        .dark .hero-premium {
          background: linear-gradient(180deg, rgba(234, 179, 8, 0.15) 0%, rgba(234, 179, 8, 0.05) 30%, transparent 60%);
        }
      `}</style>

      <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-slate-900 dark:bg-white p-1 rounded-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-white dark:text-slate-900 text-[20px]">terminal</span>
                </div>
                <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
                  Claude Code <span className="text-slate-500 dark:text-slate-400 font-normal">en Espanol</span>
                </span>
              </Link>

              <div className="flex items-center gap-4">
                <a
                  href="https://yenze.lemonsqueezy.com/affiliates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">handshake</span>
                  Afiliados 20%
                </a>
                <Link
                  href="/"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium"
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="hero-premium">
          <div className="max-w-4xl mx-auto px-6 pt-16 lg:pt-24 pb-16 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-600/10 border border-amber-200 dark:border-amber-600/20 text-amber-700 dark:text-amber-400 text-sm font-semibold mb-8">
              <span className="material-symbols-outlined text-lg">workspace_premium</span>
              Curso Premium
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] text-slate-950 dark:text-white">
              Claude Code<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Course Builder
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4">
              Aprende a crear y vender cursos interactivos con IA.
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-500 max-w-xl mx-auto mb-12">
              El mismo sistema que use para crear el curso gratuito, ahora en tus manos.
            </p>

            {/* Price Card */}
            <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 mb-16">
              <div className="flex items-baseline justify-center gap-2 mb-6">
                <span className="text-5xl font-extrabold text-slate-900 dark:text-white">$147</span>
                <span className="text-slate-500 dark:text-slate-400">USD</span>
              </div>

              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl">&#10003;</span>
                  <span className="text-slate-700 dark:text-slate-300">6 modulos completos y detallados</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl">&#10003;</span>
                  <span className="text-slate-700 dark:text-slate-300">2 cursos de ejemplo completos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl">&#10003;</span>
                  <span className="text-slate-700 dark:text-slate-300">Templates y plantillas reutilizables</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl">&#10003;</span>
                  <span className="text-slate-700 dark:text-slate-300">Checklist de lanzamiento</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl">&#10003;</span>
                  <span className="text-slate-700 dark:text-slate-300">Secuencia de emails de venta</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl">&#10003;</span>
                  <span className="text-slate-700 dark:text-slate-300">Acceso a actualizaciones futuras</span>
                </li>
              </ul>

              <a
                href="https://yenze.lemonsqueezy.com/checkout/buy/ad2dd995-abce-41a0-be77-1420f8d0bb4a"
                className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transform hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">shopping_cart</span>
                  Comprar Ahora
                </span>
              </a>

              <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
                Pago seguro con Stripe. Acceso inmediato tras la compra.
              </p>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Ya compraste?{' '}
                  <Link href="/curso-premium" className="text-amber-600 hover:underline font-medium">
                    Acceder al curso
                  </Link>
                </p>
              </div>
            </div>

            {/* Cómo funciona */}
            <div className="max-w-md mx-auto bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 text-left">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500">info</span>
                Como funciona
              </h3>
              <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex gap-3">
                  <span className="font-bold text-amber-600">1.</span>
                  Compra el curso con el boton de arriba
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-amber-600">2.</span>
                  Recibiras un email con tu licencia
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-amber-600">3.</span>
                  Ve a <Link href="/curso-premium" className="text-amber-600 hover:underline">Area de Miembros</Link> e ingresa tu licencia
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-amber-600">4.</span>
                  Descarga los materiales y empieza a aprender
                </li>
              </ol>
            </div>
          </div>

          {/* El proceso completo */}
          <section className="max-w-5xl mx-auto px-6 pb-24">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-slate-900 dark:text-white">
              El proceso completo
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              De la idea al curso vendiendo. Todo lo que necesitas en 5 pasos.
            </p>

            {/* 5 pasos visuales */}
            <div className="grid md:grid-cols-5 gap-4 mb-16">
              {[
                { num: '1', icon: 'edit_document', title: 'Crear', desc: 'Comandos slash + CLAUDE.md', color: 'amber' },
                { num: '2', icon: 'trending_up', title: 'Seguimiento', desc: 'Sistema de progreso', color: 'amber' },
                { num: '3', icon: 'language', title: 'Publicar', desc: 'Web con Nextra', color: 'amber' },
                { num: '4', icon: 'cloud_upload', title: 'Distribuir', desc: 'GitHub Releases', color: 'amber' },
                { num: '5', icon: 'payments', title: 'Vender', desc: 'LemonSqueezy', color: 'amber' },
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-center h-full">
                    <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                      {step.num}
                    </div>
                    <span className="material-symbols-outlined text-3xl text-amber-600 dark:text-amber-400 mb-2 block">{step.icon}</span>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{step.desc}</p>
                  </div>
                  {i < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-slate-300 dark:text-slate-600 z-10">
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Que incluye - desglose */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-center mb-8 text-slate-900 dark:text-white">
                Que incluye el curso
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-amber-100 dark:bg-amber-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="material-symbols-outlined text-2xl text-amber-600">menu_book</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">6</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Modulos detallados</div>
                  <div className="text-xs text-slate-500 mt-1">+2800 lineas de contenido</div>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="material-symbols-outlined text-2xl text-emerald-600">folder_copy</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">2</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Cursos de ejemplo</div>
                  <div className="text-xs text-slate-500 mt-1">Productividad + Python</div>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="material-symbols-outlined text-2xl text-blue-600">description</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">4</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Recursos extra</div>
                  <div className="text-xs text-slate-500 mt-1">Checklist, emails, landing...</div>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-purple-100 dark:bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="material-symbols-outlined text-2xl text-purple-600">content_copy</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">5+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Templates</div>
                  <div className="text-xs text-slate-500 mt-1">Copia, pega y personaliza</div>
                </div>
              </div>
            </div>
          </section>

          {/* Los 6 modulos */}
          <section className="max-w-4xl mx-auto px-6 pb-24">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
              Los 6 modulos del curso
            </h2>

            <div className="space-y-4">
              {[
                {
                  num: '01',
                  icon: 'terminal',
                  title: 'Arquitectura de comandos slash',
                  desc: 'Aprende a disenar lecciones interactivas que guian al alumno paso a paso. Estructura, nomenclatura y errores comunes.',
                  topics: ['Estructura de comandos', 'Nomenclatura', 'Ejercicios practicos']
                },
                {
                  num: '02',
                  icon: 'psychology',
                  title: 'CLAUDE.md efectivo',
                  desc: 'Configura el contexto perfecto para que Claude entienda tu curso y responda como tu quieres.',
                  topics: ['Anatomia del archivo', 'Instrucciones de tono', 'Manejo de errores']
                },
                {
                  num: '03',
                  icon: 'trending_up',
                  title: 'Sistema de progreso',
                  desc: 'Implementa seguimiento del avance del alumno. Motivacion y engagement.',
                  topics: ['3 opciones de implementacion', 'Diseno visual', 'Logros y badges']
                },
                {
                  num: '04',
                  icon: 'language',
                  title: 'Web profesional con Nextra',
                  desc: 'Genera una web de documentacion automatica que da credibilidad y SEO a tu curso.',
                  topics: ['Setup paso a paso', 'Personalizacion', 'Deploy en Vercel']
                },
                {
                  num: '05',
                  icon: 'cloud_upload',
                  title: 'Distribucion con GitHub',
                  desc: 'Empaqueta y versiona tu curso de forma profesional. Actualizaciones sin friccion.',
                  topics: ['GitHub Releases', 'Versionado semantico', 'Script de automatizacion']
                },
                {
                  num: '06',
                  icon: 'payments',
                  title: 'Monetizacion',
                  desc: 'Vende tu curso con LemonSqueezy. Precios, landing pages y estrategia de lanzamiento.',
                  topics: ['Setup de LemonSqueezy', 'Licencias', 'Estrategia de precios']
                }
              ].map((mod, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-amber-300 dark:hover:border-amber-600 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <span className="text-amber-500 font-mono text-sm font-bold">{mod.num}</span>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-amber-600/20 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">{mod.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">{mod.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{mod.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {mod.topics.map((topic, j) => (
                          <span key={j} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Problem/Solution */}
          <section className="bg-slate-100 dark:bg-slate-900/50 py-24">
            <div className="max-w-4xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">close</span>
                    Cursos tradicionales
                  </h3>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">&#10005;</span>
                      Videos que se quedan obsoletos en meses
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">&#10005;</span>
                      Alumnos pasivos que solo miran
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">&#10005;</span>
                      Horas de grabacion y edicion
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">&#10005;</span>
                      Plataformas que cobran comisiones altas
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">check</span>
                    Cursos interactivos con IA
                  </h3>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500">&#10003;</span>
                      Contenido que se actualiza facilmente
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500">&#10003;</span>
                      Alumnos que aprenden haciendo
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500">&#10003;</span>
                      Creacion rapida con Claude Code
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500">&#10003;</span>
                      100% de las ventas son tuyas
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Who is it for */}
          <section className="py-24">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-12 text-slate-900 dark:text-white">
                Para quien es este curso
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: 'edit_note',
                    title: 'Creadores de contenido',
                    desc: 'Que quieren monetizar su conocimiento de forma innovadora'
                  },
                  {
                    icon: 'support_agent',
                    title: 'Consultores',
                    desc: 'Que quieren escalar su expertise mas alla de 1:1'
                  },
                  {
                    icon: 'school',
                    title: 'Educadores',
                    desc: 'Que buscan formas mas efectivas de ensenar'
                  }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-3xl text-amber-600 dark:text-amber-400">{item.icon}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-24 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
            <div className="max-w-2xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Empieza a crear tu curso hoy
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Acceso inmediato. Aprende a tu ritmo. Crea cursos que se venden.
              </p>

              <a
                href="https://yenze.lemonsqueezy.com/checkout/buy/ad2dd995-abce-41a0-be77-1420f8d0bb4a"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Comprar por $147
              </a>

              <p className="mt-6 text-sm text-slate-500 dark:text-slate-500">
                Pago unico. Sin suscripciones. Acceso de por vida.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-slate-900 text-slate-400 py-12">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <p className="mb-4">
                <Link href="/" className="hover:text-white transition-colors">
                  Claude Code en Espanol
                </Link>
                {' '}&middot;{' '}
                <Link href="/premium" className="hover:text-white transition-colors">
                  Course Builder
                </Link>
                {' '}&middot;{' '}
                <a
                  href="https://yenze.lemonsqueezy.com/affiliates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Afiliados
                </a>
                {' '}&middot;{' '}
                <Link href="/privacidad" className="hover:text-white transition-colors">
                  Privacidad
                </Link>
              </p>
              <p className="text-sm">
                &copy; 2026 Josu Sanz &middot;{' '}
                <a
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Licencia CC BY-NC-SA 4.0
                </a>
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}
