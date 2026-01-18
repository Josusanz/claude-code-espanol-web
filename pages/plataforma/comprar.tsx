import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

const LEMONSQUEEZY_CHECKOUT_URL = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL || '#'

const features = [
  {
    icon: '🎓',
    title: 'Curso Interactivo Completo',
    description: 'Aprende paso a paso con terminal simulado y tutor IA que te guía en tiempo real.',
  },
  {
    icon: '💻',
    title: 'Código Fuente Completo',
    description: 'Acceso al repositorio privado con todo el código para deployar tu propia plataforma.',
  },
  {
    icon: '🚀',
    title: 'Deploy en 5 Minutos',
    description: 'Instrucciones detalladas para deployar en Vercel con tu propio dominio.',
  },
  {
    icon: '🔑',
    title: 'Licencia Comercial',
    description: 'Usa el código para crear y vender tus propios cursos interactivos.',
  },
  {
    icon: '🤖',
    title: 'Integración Claude API',
    description: 'El tutor IA usa Claude para dar feedback personalizado a tus estudiantes.',
  },
  {
    icon: '♾️',
    title: 'Actualizaciones de por Vida',
    description: 'Acceso a todas las mejoras y nuevas funcionalidades que añadamos.',
  },
]

const modules = [
  {
    number: '01',
    title: 'Fundamentos',
    lessons: [
      'Arquitectura del sistema',
      'Setup de Next.js + Tailwind',
      'Configuración de APIs',
    ],
  },
  {
    number: '02',
    title: 'Terminal Interactivo',
    lessons: [
      'Crear el componente terminal',
      'Sistema de comandos simulados',
      'Validación de respuestas',
    ],
  },
  {
    number: '03',
    title: 'Tutor IA',
    lessons: [
      'Integración Claude API',
      'Streaming de respuestas',
      'Prompts efectivos para enseñar',
    ],
  },
  {
    number: '04',
    title: 'Sistema de Lecciones',
    lessons: [
      'Estructura de datos del curso',
      'Progreso del estudiante',
      'Navegación entre lecciones',
    ],
  },
  {
    number: '05',
    title: 'Monetización',
    lessons: [
      'Integración Lemon Squeezy',
      'Webhooks de compra',
      'Protección de contenido',
    ],
  },
  {
    number: '06',
    title: 'Deploy',
    lessons: [
      'Configuración Vercel',
      'Variables de entorno',
      'Dominio personalizado',
    ],
  },
]

export default function ComprarPage() {
  const [email, setEmail] = useState('')

  const handleCheckout = () => {
    // Añadir email como parámetro para el checkout
    const checkoutUrl = email
      ? `${LEMONSQUEEZY_CHECKOUT_URL}?checkout[email]=${encodeURIComponent(email)}`
      : LEMONSQUEEZY_CHECKOUT_URL
    window.open(checkoutUrl, '_blank')
  }

  return (
    <>
      <Head>
        <title>Comprar Curso | Crea tu Plataforma de Cursos con IA</title>
        <meta
          name="description"
          content="Aprende a crear una plataforma de cursos interactivos con IA. Incluye código fuente y licencia comercial."
        />
      </Head>

      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">a</span>
                </div>
                <span className="text-xl font-bold">aprende.software</span>
              </Link>

              <Link
                href="/plataforma/demo"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Probar Demo →
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Incluye código fuente + licencia comercial
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Crea tu Plataforma de
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Cursos Interactivos con IA
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Un curso completo donde aprendes creando. Al terminar tendrás tu propia plataforma
              funcionando, lista para vender tus cursos.
            </p>

            {/* Price Card */}
            <div className="max-w-md mx-auto bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 rounded-2xl p-8 mb-8">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-slate-500 line-through text-2xl">99€</span>
                <span className="text-5xl font-bold">49€</span>
              </div>
              <p className="text-slate-400 text-sm mb-6">Pago único · Acceso de por vida</p>

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                >
                  Comprar Ahora →
                </button>
              </div>

              <p className="text-slate-500 text-xs mt-4">
                Pago seguro con Lemon Squeezy · Reembolso en 14 días
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Acceso inmediato
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Código fuente incluido
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Soporte por email
              </span>
            </div>
          </div>
        </section>

        {/* Demo Preview */}
        <section className="py-16 px-4 bg-slate-900/50 border-y border-slate-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">Mira cómo funciona</h2>
            <p className="text-slate-400 text-center mb-8">
              El mismo sistema que usarás para enseñar a tus estudiantes
            </p>

            <div className="aspect-video bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <Link
                  href="/plataforma/demo"
                  className="flex flex-col items-center gap-4 text-slate-400 hover:text-white transition-colors"
                >
                  <div className="w-20 h-20 bg-indigo-600/20 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="font-medium">Probar Demo Interactiva</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">¿Qué incluye?</h2>
            <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              Todo lo que necesitas para crear y vender tu propia plataforma de cursos interactivos
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-indigo-500/50 transition-colors"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-20 px-4 bg-slate-900/50 border-y border-slate-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Contenido del Curso</h2>
            <p className="text-slate-400 text-center mb-12">
              6 módulos · +20 lecciones interactivas · Proyecto real
            </p>

            <div className="space-y-4">
              {modules.map((module) => (
                <div
                  key={module.number}
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
                >
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400 font-bold">
                      {module.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{module.title}</h3>
                      <p className="text-slate-400 text-sm">{module.lessons.length} lecciones</p>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <ul className="space-y-2">
                      {module.lessons.map((lesson, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>

            <div className="space-y-6">
              {[
                {
                  q: '¿Necesito saber programar?',
                  a: 'Conocimientos básicos de JavaScript/React son recomendados. El curso te guía paso a paso, pero no es para principiantes absolutos.',
                },
                {
                  q: '¿Puedo vender cursos con esta plataforma?',
                  a: 'Sí, la licencia comercial te permite usar el código para crear y vender tus propios cursos interactivos.',
                },
                {
                  q: '¿Qué servicios necesito para deployar?',
                  a: 'Vercel (gratis), Vercel KV ($0-5/mes), Claude API (pago por uso ~$0.01-0.05 por interacción), y Lemon Squeezy para pagos.',
                },
                {
                  q: '¿Hay soporte si me atasco?',
                  a: 'Sí, tienes acceso a soporte por email. Respondo en menos de 24 horas en días laborables.',
                },
                {
                  q: '¿Hay garantía de reembolso?',
                  a: 'Sí, tienes 14 días para pedir un reembolso completo si el curso no cumple tus expectativas.',
                },
              ].map((faq, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <h3 className="font-bold mb-2">{faq.q}</h3>
                  <p className="text-slate-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para crear tu plataforma?</h2>
            <p className="text-slate-400 mb-8">
              Únete a otros creadores que ya están vendiendo cursos interactivos con IA.
            </p>

            <button
              onClick={handleCheckout}
              className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 text-lg"
            >
              Comprar por 49€ →
            </button>

            <p className="text-slate-500 text-sm mt-4">
              Pago único · Acceso de por vida · Reembolso en 14 días
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-slate-800">
          <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
            © 2026 Josu Sanz · <Link href="/" className="hover:text-white">aprende.software</Link>
          </div>
        </footer>
      </div>
    </>
  )
}
