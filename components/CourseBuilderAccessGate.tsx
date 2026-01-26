import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'

const LESSONS = [
  { slug: 'arquitectura-comandos', title: '4.1 Arquitectura de Comandos', duration: '~30 min', description: 'Diseñar lecciones con comandos slash' },
  { slug: 'claude-md-efectivo', title: '4.2 CLAUDE.md Efectivo', duration: '~25 min', description: 'Configurar el contexto perfecto' },
  { slug: 'sistema-progreso', title: '4.3 Sistema de Progreso', duration: '~20 min', description: 'Trackear el avance del alumno' },
  { slug: 'web-nextra', title: '4.4 Web con Nextra', duration: '~35 min', description: 'Documentación profesional automática' },
  { slug: 'distribucion-github', title: '4.5 Distribución GitHub', duration: '~25 min', description: 'Releases y control de versiones' },
  { slug: 'monetizacion', title: '4.6 Monetización', duration: '~30 min', description: 'Vende tu curso con LemonSqueezy' },
]

interface AccessState {
  loading: boolean
  authenticated: boolean
  hasAccess: boolean
  email: string | null
}

interface Props {
  children?: ReactNode
}

export default function CourseBuilderAccessGate({ children }: Props) {
  const [state, setState] = useState<AccessState>({
    loading: true,
    authenticated: false,
    hasAccess: false,
    email: null
  })

  useEffect(() => {
    async function checkAccess() {
      try {
        // Check license in localStorage first
        const savedLicense = localStorage.getItem('course_license')
        if (savedLicense) {
          const licenseRes = await fetch('/api/validate-license', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ licenseKey: savedLicense })
          })
          const licenseData = await licenseRes.json()

          if (licenseData.valid) {
            setState({
              loading: false,
              authenticated: true,
              hasAccess: true,
              email: licenseData.email || 'Licencia válida'
            })
            return
          }
        }

        // Check session
        const sessionRes = await fetch('/api/auth/session')
        const sessionData = await sessionRes.json()

        if (!sessionData.authenticated || !sessionData.user?.email) {
          setState({ loading: false, authenticated: false, hasAccess: false, email: null })
          return
        }

        const email = sessionData.user.email

        // Check Course Builder access
        const accessRes = await fetch('/api/check-course-builder-access', {
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
      <div className="my-8 p-8 bg-slate-100 dark:bg-gray-800/50 rounded-xl text-center">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600 dark:text-gray-400">Verificando acceso...</p>
      </div>
    )
  }

  // User has access - show content or lessons
  if (state.hasAccess) {
    // If children provided, show them (for lesson pages)
    if (children) {
      return <>{children}</>
    }

    // Otherwise show lesson list (for index page)
    return (
      <div className="my-8">
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-500/30 rounded-lg flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-semibold text-green-700 dark:text-green-300">Tienes acceso completo</p>
            <p className="text-sm text-green-600 dark:text-green-400/70">Sesión: {state.email}</p>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Tus módulos</h3>

        <div className="space-y-3">
          {LESSONS.map((lesson, idx) => (
            <Link
              key={lesson.slug}
              href={`/course-builder/${lesson.slug}`}
              className="block p-4 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-500/50 rounded-lg transition group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 flex items-center justify-center bg-amber-100 dark:bg-amber-600/20 text-amber-600 dark:text-amber-400 rounded-full text-sm font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition">
                      {lesson.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-gray-500">{lesson.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 dark:text-gray-500">{lesson.duration}</span>
                  <svg className="w-5 h-5 text-slate-400 dark:text-gray-500 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30 rounded-lg">
          <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">📦 Descargar materiales</h4>
          <p className="text-sm text-slate-600 dark:text-gray-400 mb-3">Templates, comandos y proyecto de ejemplo incluido</p>
          <a
            href="/api/download/course-builder"
            className="inline-block px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm font-semibold"
          >
            Descargar ZIP →
          </a>
        </div>

        <div className="mt-4 p-4 bg-slate-100 dark:bg-gray-800/30 rounded-lg text-center">
          <p className="text-slate-600 dark:text-gray-400 text-sm">
            ¿Problemas con el acceso? <a href="mailto:josu@yenze.io" className="text-amber-600 dark:text-amber-400 hover:underline">Contáctanos</a>
          </p>
        </div>
      </div>
    )
  }

  // User doesn't have access - show purchase CTA
  return (
    <div className="my-8 p-8 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 rounded-2xl border border-amber-300 dark:border-amber-500/30 text-center">
      <h3 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">Course Builder: Crea Cursos con IA</h3>
      <p className="text-slate-700 dark:text-gray-300 mb-6 max-w-lg mx-auto">
        6 módulos completos + templates + proyecto práctico
      </p>

      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="text-4xl font-bold text-slate-800 dark:text-white">$147</span>
        <span className="text-slate-500 dark:text-gray-400 line-through">$297</span>
        <span className="px-2 py-1 text-sm bg-green-600 text-white rounded">50% OFF</span>
      </div>

      <a
        href="https://yenze.lemonsqueezy.com/checkout/buy/course-builder"
        className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-lg font-semibold"
        target="_blank"
      >
        🔓 Obtener Acceso Ahora
      </a>

      <p className="text-sm text-slate-500 dark:text-gray-500 mt-4">
        Pago único • Acceso de por vida • Actualizaciones incluidas
      </p>

      {state.authenticated ? (
        <p className="text-sm text-slate-500 dark:text-gray-500 mt-4">
          Sesión activa: {state.email}
        </p>
      ) : (
        <p className="text-sm text-slate-500 dark:text-gray-500 mt-4">
          ¿Ya compraste? <Link href="/curso-premium" className="text-amber-600 dark:text-amber-400 hover:underline">Ingresa tu licencia</Link>
        </p>
      )}
    </div>
  )
}
