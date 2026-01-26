import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

interface UserData {
  email: string
  createdAt: string
  lastLoginAt: string
  progress?: {
    completedLessons: string[]
    currentLesson?: string
  }
}

interface PurchaseData {
  hasRalph: boolean
  ralphPurchase?: {
    purchasedAt: string
    orderId: string
  }
}

export default function CuentaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserData | null>(null)
  const [purchases, setPurchases] = useState<PurchaseData>({ hasRalph: false })
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        // Get session
        const sessionRes = await fetch('/api/auth/session')
        const sessionData = await sessionRes.json()

        if (!sessionData.authenticated) {
          router.push('/acceso')
          return
        }

        setUser(sessionData.user)

        // Check Ralph access
        if (sessionData.user?.email) {
          const ralphRes = await fetch('/api/check-ralph-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: sessionData.user.email })
          })
          const ralphData = await ralphRes.json()
          setPurchases({
            hasRalph: ralphData.hasAccess === true,
            ralphPurchase: ralphData.purchaseData
          })
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (error) {
      console.error('Error logging out:', error)
      setLoggingOut(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Mi Cuenta | Claude Code en Español</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-slate-900 dark:bg-white p-1 rounded-md">
                <span className="text-white dark:text-slate-900 text-sm">⌘</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">Claude Code en Español</span>
            </Link>
            <Link href="/empezar/introduccion" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
              ← Volver al curso
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Mi Cuenta</h1>

          {/* User Info */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Información de la cuenta</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-gray-400">Email</span>
                <span className="font-medium text-slate-900 dark:text-white">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-gray-400">Miembro desde</span>
                <span className="text-slate-900 dark:text-white">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : '-'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600 dark:text-gray-400">Último acceso</span>
                <span className="text-slate-900 dark:text-white">
                  {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : '-'}
                </span>
              </div>
            </div>
          </section>

          {/* Purchases */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Mis compras</h2>

            {/* Free Course */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Módulo 1 & 2: Fundamentos + Proyectos</p>
                  <p className="text-sm text-slate-500">Curso gratuito</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
                Activo
              </span>
            </div>

            {/* Ralph Loop */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Módulo 3: Ralph Loop</p>
                  <p className="text-sm text-slate-500">
                    {purchases.hasRalph
                      ? `Comprado el ${purchases.ralphPurchase?.purchasedAt ? new Date(purchases.ralphPurchase.purchasedAt).toLocaleDateString('es-ES') : '-'}`
                      : 'Módulo premium - $47'
                    }
                  </p>
                </div>
              </div>
              {purchases.hasRalph ? (
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm font-medium rounded-full">
                  Activo
                </span>
              ) : (
                <Link
                  href="/ralph"
                  className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition"
                >
                  Obtener
                </Link>
              )}
            </div>
          </section>

          {/* Progress */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Mi progreso</h2>
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-gray-400">
                {user?.progress?.completedLessons?.length
                  ? `Has completado ${user.progress.completedLessons.length} lecciones`
                  : 'Aún no has comenzado ninguna lección'
                }
              </p>
              <Link
                href="/empezar/introduccion"
                className="inline-block mt-4 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                {user?.progress?.completedLessons?.length ? 'Continuar aprendiendo →' : 'Comenzar el curso →'}
              </Link>
            </div>
          </section>

          {/* Logout */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Sesión</h2>
            <p className="text-slate-600 dark:text-gray-400 mb-4">
              Cerrar sesión te desconectará de este dispositivo. Podrás volver a acceder con tu email.
            </p>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-medium rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition disabled:opacity-50"
            >
              {loggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
            </button>
          </section>

          {/* Support */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 dark:text-gray-400 text-sm">
              ¿Necesitas ayuda? <a href="mailto:soporte@aprende.software" className="text-indigo-600 dark:text-indigo-400 hover:underline">Contáctanos</a>
            </p>
          </div>
        </main>
      </div>
    </>
  )
}
