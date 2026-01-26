import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

// Lessons per module for completion check
const MODULE_LESSONS: Record<string, string[]> = {
  fundamentos: [
    'que-es', 'exploracion', 'crear-modificar', 'visualizar',
    'slash-commands', 'agentes-paralelos', 'subagentes', 'memoria', 'siguientes-pasos'
  ],
  proyectos: [
    'landing-intro', 'landing-estructura', 'landing-estilos',
    'automatizaciones-intro', 'automatizaciones-scripts', 'automatizaciones-cron',
    'investigacion-intro', 'investigacion-proyecto',
    'datos-intro', 'datos-proyecto'
  ]
}

const MODULE_NAMES: Record<string, string> = {
  fundamentos: 'Módulo 1: Fundamentos de Claude Code',
  proyectos: 'Módulo 2: Proyectos Prácticos'
}

export default function CertificadoPage() {
  const router = useRouter()
  const { module } = router.query
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [completedAt, setCompletedAt] = useState<string | null>(null)
  const certificateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!module || typeof module !== 'string') return

    async function checkCompletion() {
      try {
        // Get session
        const sessionRes = await fetch('/api/auth/session')
        const sessionData = await sessionRes.json()

        if (!sessionData.authenticated) {
          router.push('/acceso')
          return
        }

        setUser(sessionData.user)

        // Get progress
        const progressRes = await fetch('/api/progress')
        const progressData = await progressRes.json()

        // Check if all lessons in module are completed
        const moduleLessons = MODULE_LESSONS[module as string] || []
        const completedLessons = progressData.completedLessons || []

        const allComplete = moduleLessons.every((lesson: string) =>
          completedLessons.includes(`${module}/${lesson}`)
        )

        setIsComplete(allComplete)
        if (allComplete) {
          setCompletedAt(new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }))
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkCompletion()
  }, [module, router])

  const printCertificate = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-gray-400">Verificando progreso...</p>
        </div>
      </div>
    )
  }

  if (!isComplete) {
    return (
      <>
        <Head>
          <title>Certificado | Claude Code en Español</title>
        </Head>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Certificado no disponible
            </h1>
            <p className="text-slate-600 dark:text-gray-400 mb-6">
              Debes completar todas las lecciones de <strong>{MODULE_NAMES[module as string] || 'este módulo'}</strong> para obtener tu certificado.
            </p>
            <Link
              href={`/${module}`}
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
            >
              Continuar el módulo →
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Certificado de {MODULE_NAMES[module as string]} | Claude Code en Español</title>
        <style>{`
          @media print {
            body * { visibility: hidden; }
            #certificate, #certificate * { visibility: visible; }
            #certificate { position: absolute; left: 0; top: 0; width: 100%; }
            .no-print { display: none !important; }
          }
        `}</style>
      </Head>

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6">
        {/* Actions */}
        <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center no-print">
          <Link href="/cuenta" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            ← Volver a mi cuenta
          </Link>
          <button
            onClick={printCertificate}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            🖨️ Imprimir / Guardar PDF
          </button>
        </div>

        {/* Certificate */}
        <div
          id="certificate"
          ref={certificateRef}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center text-white">
            <div className="text-5xl mb-4">🎓</div>
            <h1 className="text-3xl font-bold">Certificado de Completado</h1>
          </div>

          {/* Body */}
          <div className="p-12 text-center">
            <p className="text-slate-500 text-lg mb-4">Este certificado se otorga a</p>

            <p className="text-4xl font-bold text-slate-900 mb-6 pb-4 border-b-2 border-indigo-200">
              {user?.email}
            </p>

            <p className="text-slate-600 text-lg mb-2">por haber completado exitosamente</p>

            <h2 className="text-2xl font-bold text-indigo-600 mb-6">
              {MODULE_NAMES[module as string]}
            </h2>

            <p className="text-slate-500 mb-8">
              del curso <strong>Claude Code en Español</strong>
            </p>

            <div className="flex justify-center items-center gap-12 mt-12 pt-8 border-t border-slate-200">
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">Fecha</p>
                <p className="font-semibold text-slate-700">{completedAt}</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-2">
                  <svg viewBox="0 0 100 100" className="text-indigo-600">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <text x="50" y="45" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="bold">CLAUDE</text>
                    <text x="50" y="60" textAnchor="middle" fontSize="10" fill="currentColor">CODE</text>
                    <text x="50" y="72" textAnchor="middle" fontSize="8" fill="currentColor">EN ESPAÑOL</text>
                  </svg>
                </div>
                <p className="text-sm text-slate-500">Verificado</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">Instructor</p>
                <p className="font-semibold text-slate-700">Josu Sanz</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 p-4 text-center text-sm text-slate-500">
            <p>aprende.software • Curso de código abierto bajo licencia CC BY-NC-SA 4.0</p>
          </div>
        </div>

        {/* Share */}
        <div className="max-w-4xl mx-auto mt-8 text-center no-print">
          <p className="text-slate-600 dark:text-gray-400 mb-4">¡Comparte tu logro!</p>
          <div className="flex justify-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`¡Acabo de completar ${MODULE_NAMES[module as string]} en Claude Code en Español! 🎉\n\naprende.software`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Compartir en Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.aprende.software')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
            >
              Compartir en LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
