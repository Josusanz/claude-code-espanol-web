import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'

interface EmailGateProps {
  children: ReactNode
  lessonNumber: number
  lessonTitle: string
}

interface AccessState {
  loading: boolean
  hasEmail: boolean
  email: string | null
}

export default function ClawdbotEmailGate({ children, lessonNumber, lessonTitle }: EmailGateProps) {
  const [state, setState] = useState<AccessState>({
    loading: true,
    hasEmail: false,
    email: null
  })

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/session')
        const data = await res.json()

        if (data.authenticated && data.user?.email) {
          setState({
            loading: false,
            hasEmail: true,
            email: data.user.email
          })
        } else {
          setState({
            loading: false,
            hasEmail: false,
            email: null
          })
        }
      } catch (error) {
        console.error('Error checking session:', error)
        setState({ loading: false, hasEmail: false, email: null })
      }
    }

    checkSession()
  }, [])

  if (state.loading) {
    return (
      <div className="my-8 p-8 bg-slate-100 dark:bg-gray-800/50 rounded-xl text-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600 dark:text-gray-400">Cargando...</p>
      </div>
    )
  }

  // User has email - show content
  if (state.hasEmail) {
    return <>{children}</>
  }

  // User doesn't have email - show gate
  return (
    <div className="my-8">
      {/* Preview teaser */}
      <div className="mb-8 p-6 bg-slate-50 dark:bg-gray-800/30 rounded-xl border border-slate-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🦞</span>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white">Leccion {lessonNumber}: {lessonTitle}</h3>
            <p className="text-sm text-slate-500 dark:text-gray-400">Curso gratuito de Clawdbot en espanol</p>
          </div>
        </div>
        <div className="h-32 bg-gradient-to-b from-slate-100 to-transparent dark:from-gray-800 dark:to-transparent relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
            <span className="material-symbols-outlined text-4xl text-slate-400">lock</span>
          </div>
        </div>
      </div>

      {/* Email capture form */}
      <div className="p-8 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl border border-red-200 dark:border-red-500/30 text-center">
        <span className="text-5xl mb-4 block">🦞</span>
        <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">
          Accede al curso gratuito
        </h3>
        <p className="text-slate-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          Registra tu email para acceder a las {7} lecciones del curso de Clawdbot.
          Es gratis y te notificaremos cuando publiquemos nuevo contenido.
        </p>

        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Gratis
            </span>
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              7 lecciones
            </span>
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              En espanol
            </span>
          </div>
        </div>

        <Link
          href="/acceso?redirect=/clawdbot/instalacion"
          className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-lg font-semibold shadow-lg shadow-red-600/25"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Acceder con Email
        </Link>

        <p className="text-sm text-slate-500 dark:text-gray-500 mt-4">
          Solo te enviaremos contenido relevante. Nada de spam.
        </p>

        <div className="mt-6 pt-6 border-t border-red-200 dark:border-red-500/20">
          <p className="text-sm text-slate-600 dark:text-gray-400">
            La leccion 1 es de acceso libre:{' '}
            <Link href="/clawdbot/que-es" className="text-red-600 dark:text-red-400 hover:underline font-medium">
              ¿Que es Clawdbot? →
            </Link>
          </p>
        </div>
      </div>

      {/* Course outline teaser */}
      <div className="mt-8 p-6 bg-slate-50 dark:bg-gray-800/30 rounded-xl border border-slate-200 dark:border-gray-700">
        <h4 className="font-bold text-slate-800 dark:text-white mb-4">Contenido del curso</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <span className="w-6 h-6 flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-bold">1</span>
            <span className="text-slate-600 dark:text-gray-400">¿Que es Clawdbot?</span>
            <span className="ml-auto text-xs text-green-600 dark:text-green-400 font-medium">GRATIS</span>
          </div>
          <div className="flex items-center gap-3 text-sm opacity-60">
            <span className="w-6 h-6 flex items-center justify-center bg-slate-200 dark:bg-gray-700 text-slate-500 rounded-full text-xs font-bold">2</span>
            <span className="text-slate-600 dark:text-gray-400">Instalacion</span>
            <span className="material-symbols-outlined text-sm ml-auto">lock</span>
          </div>
          <div className="flex items-center gap-3 text-sm opacity-60">
            <span className="w-6 h-6 flex items-center justify-center bg-slate-200 dark:bg-gray-700 text-slate-500 rounded-full text-xs font-bold">3</span>
            <span className="text-slate-600 dark:text-gray-400">Conectar WhatsApp/Telegram</span>
            <span className="material-symbols-outlined text-sm ml-auto">lock</span>
          </div>
          <div className="flex items-center gap-3 text-sm opacity-60">
            <span className="w-6 h-6 flex items-center justify-center bg-slate-200 dark:bg-gray-700 text-slate-500 rounded-full text-xs font-bold">4</span>
            <span className="text-slate-600 dark:text-gray-400">Primeras automatizaciones</span>
            <span className="material-symbols-outlined text-sm ml-auto">lock</span>
          </div>
          <div className="flex items-center gap-3 text-sm opacity-60">
            <span className="w-6 h-6 flex items-center justify-center bg-slate-200 dark:bg-gray-700 text-slate-500 rounded-full text-xs font-bold">5</span>
            <span className="text-slate-600 dark:text-gray-400">Skills y ClawdHub</span>
            <span className="material-symbols-outlined text-sm ml-auto">lock</span>
          </div>
          <div className="flex items-center gap-3 text-sm opacity-60">
            <span className="w-6 h-6 flex items-center justify-center bg-slate-200 dark:bg-gray-700 text-slate-500 rounded-full text-xs font-bold">6</span>
            <span className="text-slate-600 dark:text-gray-400">Tareas proactivas</span>
            <span className="material-symbols-outlined text-sm ml-auto">lock</span>
          </div>
          <div className="flex items-center gap-3 text-sm opacity-60">
            <span className="w-6 h-6 flex items-center justify-center bg-slate-200 dark:bg-gray-700 text-slate-500 rounded-full text-xs font-bold">7</span>
            <span className="text-slate-600 dark:text-gray-400">Proyecto: Tu asistente personal</span>
            <span className="material-symbols-outlined text-sm ml-auto">lock</span>
          </div>
        </div>
      </div>
    </div>
  )
}
