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

              <Link
                href="/"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium"
              >
                Volver al inicio
              </Link>
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
                  <span className="text-slate-700 dark:text-slate-300">6 modulos paso a paso</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl">&#10003;</span>
                  <span className="text-slate-700 dark:text-slate-300">Comandos slash interactivos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl">&#10003;</span>
                  <span className="text-slate-700 dark:text-slate-300">Templates reutilizables</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl">&#10003;</span>
                  <span className="text-slate-700 dark:text-slate-300">Sistema de web automatica</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl">&#10003;</span>
                  <span className="text-slate-700 dark:text-slate-300">Acceso a actualizaciones futuras</span>
                </li>
              </ul>

              <a
                href="https://buy.stripe.com/14A3cwbKXh201XdcuVaIM05"
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
            </div>
          </div>

          {/* What you'll learn */}
          <section className="max-w-4xl mx-auto px-6 pb-24">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
              Lo que vas a aprender
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: 'architecture',
                  title: 'Arquitectura de comandos',
                  desc: 'Disena lecciones interactivas con comandos slash que guian al alumno paso a paso.'
                },
                {
                  icon: 'psychology',
                  title: 'CLAUDE.md efectivo',
                  desc: 'Configura el contexto perfecto para que Claude entienda tu curso y responda correctamente.'
                },
                {
                  icon: 'web',
                  title: 'Web automatica',
                  desc: 'Genera documentacion web profesional con Nextra que se actualiza con tu contenido.'
                },
                {
                  icon: 'rocket_launch',
                  title: 'Distribucion y releases',
                  desc: 'Empaqueta y distribuye tu curso con GitHub Releases de forma profesional.'
                },
                {
                  icon: 'payments',
                  title: 'Monetizacion',
                  desc: 'Integra Stripe para vender tu curso y automatiza la entrega del contenido.'
                },
                {
                  icon: 'update',
                  title: 'Actualizaciones',
                  desc: 'Mantiene tu curso actualizado y gestiona versiones sin perder alumnos.'
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-600/20 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
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
                href="https://buy.stripe.com/14A3cwbKXh201XdcuVaIM05"
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
              </p>
              <p className="text-sm">
                &copy; 2026 Josu Sanz
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}
