import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface UserData {
  email: string
  progress?: {
    completedLessons: string[]
    currentLesson?: string
  }
}

const lessons = [
  {
    id: 'leccion-1',
    number: 1,
    title: '¿Qué es Claude Code?',
    description: 'Entiende qué hace Claude Code y por qué es diferente a ChatGPT',
    duration: '10 min',
    icon: 'psychology'
  },
  {
    id: 'leccion-2',
    number: 2,
    title: 'Explorando archivos',
    description: 'Aprende a navegar y explorar con el símbolo @',
    duration: '15 min',
    icon: 'folder_open'
  },
  {
    id: 'leccion-3',
    number: 3,
    title: 'Creando cosas reales',
    description: 'Crea archivos, documentos y contenido real',
    duration: '15 min',
    icon: 'edit_document'
  },
  {
    id: 'leccion-4',
    number: 4,
    title: 'Visualizar creaciones',
    description: 'Aprende a ver y previsualizar lo que creas',
    duration: '10 min',
    icon: 'visibility'
  },
  {
    id: 'leccion-5',
    number: 5,
    title: 'Comandos slash',
    description: 'Domina los atajos y comandos especiales',
    duration: '15 min',
    icon: 'terminal'
  },
  {
    id: 'leccion-6',
    number: 6,
    title: 'Agentes paralelos',
    description: 'Ejecuta múltiples tareas a la vez',
    duration: '15 min',
    icon: 'account_tree'
  },
  {
    id: 'leccion-7',
    number: 7,
    title: 'Sub-agentes',
    description: 'Crea agentes especializados para tareas específicas',
    duration: '20 min',
    icon: 'hub'
  },
  {
    id: 'leccion-8',
    number: 8,
    title: 'Memoria del proyecto',
    description: 'Configura CLAUDE.md para que Claude recuerde contexto',
    duration: '15 min',
    icon: 'memory'
  },
  {
    id: 'leccion-9',
    number: 9,
    title: 'Próximos pasos',
    description: 'Qué hacer después del curso y recursos avanzados',
    duration: '10 min',
    icon: 'rocket_launch'
  }
]

export default function CursoDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check authentication
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          router.push('/acceso')
        } else {
          setUser(data.user)
        }
        setLoading(false)
      })
      .catch(() => {
        router.push('/acceso')
      })

    // Dark mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(savedTheme === 'dark' || (!savedTheme && prefersDark))
  }, [router])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const toggleDarkMode = () => {
    const newValue = !isDark
    setIsDark(newValue)
    localStorage.setItem('theme', newValue ? 'dark' : 'light')
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  const completedLessons = user?.progress?.completedLessons || []
  const progressPercent = Math.round((completedLessons.length / lessons.length) * 100)

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Mi Curso | Claude Code en Español</title>
        <meta name="description" content="Tu progreso en el curso de Claude Code" />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-800 dark:text-white hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined text-indigo-600 text-2xl">terminal</span>
              <span className="font-bold">Claude Code en Español</span>
            </Link>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
              </button>

              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-lg">person</span>
                <span className="hidden sm:inline">{user?.email}</span>
              </div>

              <button
                onClick={handleLogout}
                className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Tu Curso
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Aprende Claude Code paso a paso con lecciones interactivas
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-indigo-100 text-sm mb-1">Tu progreso</p>
                <p className="text-2xl font-bold">{completedLessons.length} de {lessons.length} lecciones</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">{progressPercent}%</p>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Requirements Notice */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">info</span>
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">Para practicar necesitas</p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Claude Pro ($20/mes) y Claude Code instalado. <a href="/empezar/instalacion" className="underline hover:no-underline">Ver guía de instalación</a>
                </p>
              </div>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="space-y-4">
            {lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id)
              const isLocked = false // Todas las lecciones desbloqueadas por ahora
              const isNext = !isCompleted && completedLessons.length === index

              return (
                <Link
                  key={lesson.id}
                  href={isLocked ? '#' : `/curso/${lesson.id}`}
                  className={`block bg-white dark:bg-slate-800 rounded-xl border transition-all ${
                    isCompleted
                      ? 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-300'
                      : isNext
                        ? 'border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-200 dark:ring-indigo-800 hover:border-indigo-400'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  } ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
                >
                  <div className="p-5 flex items-center gap-4">
                    {/* Number/Status */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-100 dark:bg-emerald-900/30'
                        : isNext
                          ? 'bg-indigo-100 dark:bg-indigo-900/30'
                          : 'bg-slate-100 dark:bg-slate-700'
                    }`}>
                      {isCompleted ? (
                        <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400">check_circle</span>
                      ) : isLocked ? (
                        <span className="material-symbols-outlined text-slate-400">lock</span>
                      ) : (
                        <span className={`font-bold ${isNext ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}>
                          {lesson.number}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${
                          isCompleted
                            ? 'text-emerald-700 dark:text-emerald-300'
                            : 'text-slate-800 dark:text-white'
                        }`}>
                          {lesson.title}
                        </h3>
                        {isNext && (
                          <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                            Siguiente
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                        {lesson.description}
                      </p>
                    </div>

                    {/* Duration & Icon */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline">
                        {lesson.duration}
                      </span>
                      <span className={`material-symbols-outlined ${
                        isCompleted
                          ? 'text-emerald-500'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}>
                        {lesson.icon}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Premium CTA */}
          <div className="mt-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-bold mb-1">¿Quieres crear tu propio curso?</h3>
                <p className="text-amber-100">Aprende a crear cursos interactivos con IA y monetízalos</p>
              </div>
              <Link
                href="/premium"
                className="bg-white text-amber-600 font-semibold px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors flex-shrink-0"
              >
                Ver Course Builder
              </Link>
            </div>
          </div>
        </main>
      </div>

    </>
  )
}
