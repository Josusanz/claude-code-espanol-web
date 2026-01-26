import { useState, useEffect } from 'react'
import Link from 'next/link'

const LESSONS = [
  { slug: 'que-es-ralph', title: '3.1 ¿Qué es Ralph Loop?', duration: '~15 min', description: 'Concepto de loops autónomos y cuándo usarlos' },
  { slug: 'context-rot', title: '3.2 El Problema del Context Rot', duration: '~15 min', description: 'Por qué reiniciar el contexto mejora los resultados' },
  { slug: 'anatomia', title: '3.3 Anatomía de un Ralph Loop', duration: '~20 min', description: 'Los 4 archivos clave del sistema' },
  { slug: 'fase-specs', title: '3.4 Fase 1: Definir Specs', duration: '~30 min', description: 'Cómo definir especificaciones claras' },
  { slug: 'fase-plan', title: '3.5 Fase 2: El Plan', duration: '~20 min', description: 'Crear un plan de tareas atómicas' },
  { slug: 'fase-ejecutar', title: '3.6 Fase 3: Ejecutar el Loop', duration: '~30 min', description: 'Lanzar, monitorear e intervenir' },
  { slug: 'proyecto-practico', title: '3.7 Proyecto Práctico', duration: '~45 min', description: 'Construir una app completa con Ralph' },
  { slug: 'consejos-avanzados', title: '3.8 Consejos Avanzados', duration: '~20 min', description: 'Seguridad, Docker, múltiples agentes' },
]

interface AccessState {
  loading: boolean
  authenticated: boolean
  hasAccess: boolean
  email: string | null
}

export default function RalphAccessGate() {
  const [state, setState] = useState<AccessState>({
    loading: true,
    authenticated: false,
    hasAccess: false,
    email: null
  })

  useEffect(() => {
    async function checkAccess() {
      try {
        // Check session
        const sessionRes = await fetch('/api/auth/session')
        const sessionData = await sessionRes.json()

        if (!sessionData.authenticated || !sessionData.user?.email) {
          setState({ loading: false, authenticated: false, hasAccess: false, email: null })
          return
        }

        const email = sessionData.user.email

        // Check Ralph access
        const accessRes = await fetch('/api/check-ralph-access', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        })
        const accessData = await accessRes.json()

        setState({
          loading: false,
          authenticated: true,
          hasAccess: accessData.hasAccess === true,
          email
        })
      } catch (error) {
        console.error('Error checking access:', error)
        setState({ loading: false, authenticated: false, hasAccess: false, email: null })
      }
    }

    checkAccess()
  }, [])

  if (state.loading) {
    return (
      <div className="my-8 p-8 bg-gray-800/50 rounded-xl text-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Verificando acceso...</p>
      </div>
    )
  }

  // User has access - show lessons
  if (state.hasAccess) {
    return (
      <div className="my-8">
        <div className="mb-6 p-4 bg-green-900/30 border border-green-500/30 rounded-lg flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-semibold text-green-300">Tienes acceso completo</p>
            <p className="text-sm text-green-400/70">Sesión: {state.email}</p>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4">Tus lecciones</h3>

        <div className="space-y-3">
          {LESSONS.map((lesson, idx) => (
            <Link
              key={lesson.slug}
              href={`/ralph/leccion/${lesson.slug}`}
              className="block p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-purple-500/50 rounded-lg transition group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 flex items-center justify-center bg-purple-600/20 text-purple-400 rounded-full text-sm font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-purple-300 transition">
                      {lesson.title}
                    </h4>
                    <p className="text-sm text-gray-500">{lesson.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{lesson.duration}</span>
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <h4 className="font-semibold text-purple-300 mb-2">📦 Descargar materiales</h4>
          <p className="text-sm text-gray-400 mb-3">Templates, scripts y proyecto de ejemplo incluido</p>
          <a
            href="https://github.com/Josusanz/claude-code-espanol-web/releases/download/modulo3-v1.0.0/modulo3-ralph-v1.0.0.zip"
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-semibold"
          >
            Descargar ZIP →
          </a>
        </div>

        <div className="mt-4 p-4 bg-gray-800/30 rounded-lg text-center">
          <p className="text-gray-400 text-sm">
            ¿Problemas con el acceso? <a href="mailto:soporte@aprende.software" className="text-purple-400 hover:underline">Contáctanos</a>
          </p>
        </div>
      </div>
    )
  }

  // User doesn't have access - show purchase CTA
  return (
    <div className="my-8 p-8 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl border border-purple-500/30 text-center">
      <h3 className="text-3xl font-bold mb-4">Ralph Loop: Claude en Piloto Automático</h3>
      <p className="text-gray-300 mb-6 max-w-lg mx-auto">
        8 lecciones + proyecto práctico + archivos de ejemplo descargables
      </p>

      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="text-4xl font-bold text-white">$47</span>
        <span className="text-gray-400 line-through">$97</span>
        <span className="px-2 py-1 text-sm bg-green-600 text-white rounded">50% OFF</span>
      </div>

      <a
        href="https://yenze.lemonsqueezy.com/checkout/buy/f398f2ed-ce79-4107-8275-ce647357aea0"
        className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-lg font-semibold"
        target="_blank"
      >
        🔓 Obtener Acceso Ahora
      </a>

      <p className="text-sm text-gray-500 mt-4">
        Pago único • Acceso de por vida • Actualizaciones incluidas
      </p>

      {state.authenticated ? (
        <p className="text-sm text-gray-500 mt-4">
          Sesión activa: {state.email}
        </p>
      ) : (
        <p className="text-sm text-gray-500 mt-4">
          ¿Ya compraste? <Link href="/acceso" className="text-purple-400 hover:underline">Inicia sesión</Link> para ver tu contenido
        </p>
      )}
    </div>
  )
}
