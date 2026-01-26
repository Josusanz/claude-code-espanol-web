import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  price: number
  icon: string
  color: string
  features: string[]
  href: string
  badge?: string
  popular?: boolean
}

const courses: Course[] = [
  {
    id: 'ralph-loop',
    title: 'Ralph Loop',
    subtitle: 'Claude en piloto automatico',
    description: 'Aprende a configurar Claude Code para que trabaje de forma autonoma durante horas, construyendo proyectos completos mientras tu solo supervisas.',
    price: 47,
    icon: 'loop',
    color: 'purple',
    features: [
      '8 lecciones detalladas',
      'Templates listos para usar',
      'Proyecto practico incluido',
      'Tecnicas avanzadas',
      'Acceso de por vida',
    ],
    href: '/ralph',
    badge: 'Modulo 3',
    popular: true,
  },
  {
    id: 'course-builder',
    title: 'Course Builder',
    subtitle: 'Crea y vende cursos con IA',
    description: 'Aprende a crear cursos interactivos como este usando Claude Code. Incluye templates, estrategias de monetizacion y el sistema completo.',
    price: 147,
    icon: 'school',
    color: 'amber',
    features: [
      '6 modulos detallados',
      '2 cursos de ejemplo completos',
      'Templates y plantillas',
      'Secuencia de emails de venta',
      'Checklist de lanzamiento',
    ],
    href: '/premium/course-builder',
  },
]

export default function PremiumHubPage() {
  return (
    <>
      <Head>
        <title>Cursos Premium | Claude Code en Espanol</title>
        <meta name="description" content="Cursos premium de Claude Code. Aprende a crear cursos con IA, monetizar tu conocimiento y dominar herramientas avanzadas." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
                <Link
                  href="/"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium"
                >
                  Volver al inicio
                </Link>
                <a
                  href="https://yenze.lemonsqueezy.com/affiliates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  <span className="material-symbols-outlined text-lg">handshake</span>
                  Afiliados 20%
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="py-16 lg:py-24 text-center px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-700/50 text-amber-700 dark:text-amber-400 text-sm font-semibold mb-8">
              <span className="material-symbols-outlined text-lg">workspace_premium</span>
              Cursos Premium
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-950 dark:text-white">
              Lleva tus habilidades al{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                siguiente nivel
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Cursos avanzados para dominar Claude Code y crear productos que generan ingresos.
            </p>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="pb-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`relative bg-white dark:bg-slate-900 rounded-3xl border-2 ${
                    course.popular && course.color === 'purple'
                      ? 'border-purple-400 dark:border-purple-500 shadow-xl shadow-purple-500/10'
                      : course.popular
                      ? 'border-amber-400 dark:border-amber-500 shadow-xl shadow-amber-500/10'
                      : 'border-slate-200 dark:border-slate-800'
                  } overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1`}
                >
                  {course.badge && (
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        course.popular && course.color === 'purple'
                          ? 'bg-purple-500 text-white'
                          : course.popular
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {course.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                      course.color === 'amber'
                        ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                        : course.color === 'purple'
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                        : 'bg-gradient-to-br from-indigo-500 to-purple-500'
                    }`}>
                      <span className="material-symbols-outlined text-white text-2xl">{course.icon}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                      {course.title}
                    </h2>
                    <p className={`text-sm font-medium mb-4 ${
                      course.color === 'amber'
                        ? 'text-amber-600 dark:text-amber-400'
                        : course.color === 'purple'
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-indigo-600 dark:text-indigo-400'
                    }`}>
                      {course.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {course.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-8">
                      {course.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <span className={`${
                            course.color === 'amber' ? 'text-amber-500' : course.color === 'purple' ? 'text-purple-500' : 'text-indigo-500'
                          }`}>&#10003;</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-extrabold text-slate-900 dark:text-white">${course.price}</span>
                        <span className="text-slate-500 dark:text-slate-400 ml-1">USD</span>
                      </div>
                      <Link
                        href={course.href}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                          course.color === 'amber'
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/20'
                            : course.color === 'purple'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/20'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20'
                        }`}
                      >
                        Ver curso
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coming Soon */}
            <div className="mt-12 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Mas cursos proximamente...
              </p>
            </div>
          </div>
        </section>

        {/* FAQ / Trust */}
        <section className="py-16 bg-slate-100 dark:bg-slate-900/50 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              Preguntas frecuentes
            </h2>

            <div className="space-y-4 text-left">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  ¿Necesito saber programar?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  No. Los cursos estan disenados para que cualquier persona pueda seguirlos, incluso sin experiencia tecnica. Claude Code hace el trabajo pesado.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  ¿El acceso es de por vida?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Si. Pagas una vez y tienes acceso para siempre, incluyendo todas las actualizaciones futuras.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  ¿Hay garantia?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Si no estas satisfecho, contactanos en los primeros 14 dias y te devolvemos el dinero sin preguntas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Claude Code en Espanol
              </Link>
              {' '}&middot;{' '}
              <Link href="/premium" className="hover:text-white transition-colors">
                Cursos Premium
              </Link>
              {' '}&middot;{' '}
              <Link href="/privacidad" className="hover:text-white transition-colors">
                Privacidad
              </Link>
            </p>
            <p className="text-sm">
              &copy; 2026 Josu Sanz
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
