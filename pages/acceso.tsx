import { useState, useEffect, ReactElement } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextPageWithLayout } from './_app'

const Acceso: NextPageWithLayout = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Verificar si ya tiene sesión
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          router.push('/empezar/introduccion')
        }
      })
      .catch(() => {})

    // Dark mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(savedTheme === 'dark' || (!savedTheme && prefersDark))
  }, [router])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    // Mostrar errores de la URL
    const { error } = router.query
    if (error === 'token_invalido') {
      setErrorMessage('El enlace no es válido. Solicita uno nuevo.')
      setStatus('error')
    } else if (error === 'token_expirado') {
      setErrorMessage('El enlace ha expirado. Solicita uno nuevo.')
      setStatus('error')
    } else if (error === 'error_verificacion') {
      setErrorMessage('Error al verificar el acceso. Inténtalo de nuevo.')
      setStatus('error')
    }
  }, [router.query])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error enviando el email')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Error desconocido')
    }
  }

  return (
    <>
      <Head>
        <title>Acceder al Curso | Claude Code en Español</title>
        <meta name="description" content="Accede al curso gratuito de Claude Code en español" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center p-4">
        {/* Logo/Header */}
        <Link href="/" className="flex items-center gap-2 mb-8 text-slate-800 dark:text-white hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-indigo-600 text-3xl">terminal</span>
          <span className="font-bold text-xl">Claude Code en Español</span>
        </Link>

        {/* Card */}
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          {status === 'success' ? (
            /* Success State */
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-3xl">mark_email_read</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Revisa tu email
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Te hemos enviado un enlace mágico a <strong className="text-indigo-600 dark:text-indigo-400">{email}</strong>
              </p>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 text-sm text-slate-600 dark:text-slate-400">
                <p className="mb-2">El enlace expira en 15 minutos.</p>
                <p>¿No lo ves? Revisa tu carpeta de spam.</p>
              </div>
              <button
                onClick={() => {
                  setStatus('idle')
                  setEmail('')
                }}
                className="mt-6 text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
              >
                Usar otro email
              </button>
            </div>
          ) : (
            /* Form State */
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  Accede al curso gratis
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Introduce tu email para recibir acceso instantáneo
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                    boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)'
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-xl">rocket_launch</span>
                      Acceder al Curso
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  Te enviaremos un enlace mágico. Sin contraseñas, sin complicaciones.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
          ¿Ya tienes cuenta? El enlace mágico funciona igual.
        </p>
      </div>

    </>
  )
}

Acceso.getLayout = (page: ReactElement) => page

export default Acceso
