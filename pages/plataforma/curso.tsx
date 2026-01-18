import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect, KeyboardEvent, useCallback } from 'react'
import { GetServerSideProps } from 'next'
import { kv } from '@vercel/kv'
import { courseData, Lesson, Module, getTotalLessons } from '../../lib/curso-interactivo-data'
import { AdaptiveTutor } from '../../components/AdaptiveTutor'
import { LessonContent, ModuleIntroVideo } from '../../components/LessonContent'

interface PageProps {
  hasAccess: boolean
  userEmail: string | null
}

// Verificar acceso en el servidor
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const sessionCookie = context.req.cookies.session

  if (!sessionCookie) {
    return {
      redirect: {
        destination: '/acceso?redirect=/plataforma/curso',
        permanent: false,
      },
    }
  }

  try {
    // Obtener email de la sesión
    const session = await kv.get<{ email: string }>(`session:${sessionCookie}`)

    if (!session?.email) {
      return {
        redirect: {
          destination: '/acceso?redirect=/plataforma/curso',
          permanent: false,
        },
      }
    }

    // Verificar si ha comprado
    const purchaseKey = `curso_interactivo:${session.email.toLowerCase()}`
    const purchase = await kv.get(purchaseKey)

    if (!purchase) {
      return {
        redirect: {
          destination: '/plataforma/comprar',
          permanent: false,
        },
      }
    }

    return {
      props: {
        hasAccess: true,
        userEmail: session.email,
      },
    }
  } catch (error) {
    console.error('Error checking access:', error)
    return {
      redirect: {
        destination: '/plataforma/comprar',
        permanent: false,
      },
    }
  }
}

// Función para validar comandos
function isCommandValid(cmd: string, lesson: Lesson): boolean {
  const normalized = cmd.toLowerCase().trim()

  if (lesson.isComplete) return false

  if (lesson.acceptAnyInput) {
    return normalized.length >= 3
  }

  if (lesson.successKeywords && lesson.successKeywords.length > 0) {
    return lesson.successKeywords.some(keyword =>
      normalized.includes(keyword.toLowerCase())
    )
  }

  return false
}

// Componente Terminal
function CourseTerminal({
  lesson,
  onSuccess,
  onError,
  lessonKey
}: {
  lesson: Lesson
  onSuccess: () => void
  onError: (cmd: string) => void
  lessonKey: string
}) {
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'success'; content: string }>>([])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setHistory([])
    setInput('')
    inputRef.current?.focus()
  }, [lessonKey])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const processCommand = (cmd: string) => {
    if (!cmd.trim()) return

    setHistory(prev => [...prev, { type: 'input', content: cmd }])
    setIsProcessing(true)

    setTimeout(() => {
      if (cmd.toLowerCase().trim() === 'clear') {
        setHistory([])
        setIsProcessing(false)
        return
      }

      const isValid = isCommandValid(cmd, lesson)

      if (isValid) {
        setHistory(prev => [
          ...prev,
          { type: 'output', content: lesson.terminalResponse },
          { type: 'success', content: '✓ ¡Correcto! Avanzando...' }
        ])
        // Notificar éxito al tutor
        if (typeof window !== 'undefined' && (window as any).adaptiveTutor?.notifySuccess) {
          (window as any).adaptiveTutor.notifySuccess()
        }
        setTimeout(onSuccess, 2000)
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'output', content: `Comando no reconocido: ${cmd}` }
        ])
        // Notificar error al tutor para que dé feedback adaptativo
        onError(cmd)
      }
      setIsProcessing(false)
    }, 300)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing && !lesson.isComplete) {
      processCommand(input)
      setInput('')
    }
  }

  const handleQuickType = () => {
    setInput(lesson.commandToType)
    inputRef.current?.focus()
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-slate-400 text-sm ml-2">Terminal</span>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto bg-slate-950"
        onClick={() => inputRef.current?.focus()}
      >
        {!lesson.isComplete && history.length === 0 && (
          <div className="mb-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-xs mb-2">Escribe este comando:</p>
            <button
              onClick={handleQuickType}
              className="font-mono text-emerald-400 bg-slate-900 px-3 py-1.5 rounded border border-slate-600 hover:border-emerald-500 transition-colors"
            >
              {lesson.commandToType}
            </button>
            <p className="text-slate-500 text-xs mt-2">Clic para autocompletar</p>
          </div>
        )}

        {history.map((item, i) => (
          <div key={i} className={`mb-2 ${
            item.type === 'input' ? 'text-emerald-400' :
            item.type === 'success' ? 'text-emerald-400 bg-emerald-500/10 p-2 rounded mt-2' :
            'text-slate-300'
          }`}>
            {item.type === 'input' && <span className="text-blue-400">~/proyecto $ </span>}
            <span className="whitespace-pre-wrap">{item.content}</span>
          </div>
        ))}

        {!lesson.isComplete && (
          <div className="flex items-center mt-2">
            <span className="text-blue-400">~/proyecto $ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-emerald-400 ml-1"
              disabled={isProcessing}
              autoFocus
            />
          </div>
        )}

        {lesson.isComplete && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">¡Curso Completado!</h3>
            <p className="text-slate-400">Has terminado todas las lecciones</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Sidebar de módulos
function ModuleSidebar({
  modules,
  currentModuleIndex,
  currentLessonIndex,
  onSelectLesson,
  completedLessons
}: {
  modules: Module[]
  currentModuleIndex: number
  currentLessonIndex: number
  onSelectLesson: (moduleIdx: number, lessonIdx: number) => void
  completedLessons: Set<string>
}) {
  return (
    <div className="w-80 bg-slate-900 border-r border-slate-800 overflow-y-auto">
      <div className="p-4 border-b border-slate-800">
        <h2 className="font-bold text-lg">{courseData.title}</h2>
        <p className="text-slate-400 text-sm mt-1">
          {completedLessons.size} / {getTotalLessons()} lecciones
        </p>
      </div>

      <nav className="p-2">
        {modules.map((module, moduleIdx) => (
          <div key={module.id} className="mb-2">
            <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
              moduleIdx === currentModuleIndex
                ? 'bg-indigo-600/20 text-indigo-400'
                : 'text-slate-400'
            }`}>
              <span className="text-xs opacity-60 mr-2">{module.number}</span>
              {module.title}
            </div>

            <div className="ml-4 mt-1 space-y-1">
              {module.lessons.map((lesson, lessonIdx) => {
                const lessonKey = `${moduleIdx}-${lessonIdx}`
                const isCompleted = completedLessons.has(lessonKey)
                const isCurrent = moduleIdx === currentModuleIndex && lessonIdx === currentLessonIndex

                return (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(moduleIdx, lessonIdx)}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-colors ${
                      isCurrent
                        ? 'bg-slate-800 text-white'
                        : isCompleted
                          ? 'text-emerald-400 hover:bg-slate-800/50'
                          : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-current flex-shrink-0" />
                    )}
                    <span className="truncate">{lesson.title}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}

// Página principal del curso
export default function CursoPage({ hasAccess, userEmail }: PageProps) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [isComplete, setIsComplete] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [lessonStartTime, setLessonStartTime] = useState(Date.now())

  const currentModule = courseData.modules[currentModuleIndex]
  const currentLesson = isComplete
    ? courseData.completionLesson
    : currentModule?.lessons[currentLessonIndex]

  // Reset attempts y tiempo cuando cambia la lección
  useEffect(() => {
    setAttempts(0)
    setLessonStartTime(Date.now())
  }, [currentModuleIndex, currentLessonIndex])

  // Cargar progreso guardado
  useEffect(() => {
    const saved = localStorage.getItem('curso_interactivo_progress')
    if (saved) {
      try {
        const { moduleIndex, lessonIndex, completed } = JSON.parse(saved)
        setCurrentModuleIndex(moduleIndex)
        setCurrentLessonIndex(lessonIndex)
        setCompletedLessons(new Set(completed))
      } catch (e) {
        console.error('Error loading progress:', e)
      }
    }
  }, [])

  // Guardar progreso
  useEffect(() => {
    localStorage.setItem('curso_interactivo_progress', JSON.stringify({
      moduleIndex: currentModuleIndex,
      lessonIndex: currentLessonIndex,
      completed: Array.from(completedLessons)
    }))
  }, [currentModuleIndex, currentLessonIndex, completedLessons])

  const handleLessonComplete = () => {
    const lessonKey = `${currentModuleIndex}-${currentLessonIndex}`
    setCompletedLessons(prev => new Set([...prev, lessonKey]))

    // Avanzar a siguiente lección
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1)
    } else if (currentModuleIndex < courseData.modules.length - 1) {
      setCurrentModuleIndex(prev => prev + 1)
      setCurrentLessonIndex(0)
    } else {
      setIsComplete(true)
    }
  }

  const handleError = useCallback((cmd: string) => {
    setAttempts(prev => prev + 1)
    // El tutor adaptativo recibirá la notificación a través de window.adaptiveTutor
    if (typeof window !== 'undefined' && (window as any).adaptiveTutor?.notifyError) {
      (window as any).adaptiveTutor.notifyError(cmd)
    }
  }, [])

  const handleSelectLesson = (moduleIdx: number, lessonIdx: number) => {
    setCurrentModuleIndex(moduleIdx)
    setCurrentLessonIndex(lessonIdx)
    setIsComplete(false)
  }

  const lessonKey = `${currentModuleIndex}-${currentLessonIndex}`

  // Contexto para el tutor adaptativo
  const tutorContext = {
    lessonTitle: currentLesson?.title || '',
    lessonInstruction: currentLesson?.instruction || '',
    expectedCommand: currentLesson?.commandToType || '',
    moduleTitle: currentModule?.title || '',
    completedLessons: completedLessons.size,
    totalLessons: getTotalLessons(),
    attempts,
    timeOnLesson: Math.round((Date.now() - lessonStartTime) / 1000),
  }

  return (
    <>
      <Head>
        <title>{currentLesson?.title || 'Curso'} | aprende.software</title>
      </Head>

      <div className="h-screen bg-slate-950 text-white flex flex-col">
        {/* Header */}
        <header className="h-14 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/plataforma" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">a</span>
              </div>
              <span className="font-bold">aprende.software</span>
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 text-sm">{courseData.title}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm">{userEmail}</span>
            <a
              href="https://github.com/Josusanz/curso-interactivo-ia"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              📦 Código Fuente
            </a>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <ModuleSidebar
            modules={courseData.modules}
            currentModuleIndex={currentModuleIndex}
            currentLessonIndex={currentLessonIndex}
            onSelectLesson={handleSelectLesson}
            completedLessons={completedLessons}
          />

          {/* Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Instruction banner */}
            {!isComplete && (
              <div className="p-4 bg-slate-900/50 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                    <span className="font-bold">{currentModule.number}</span>
                  </div>
                  <div>
                    <h1 className="font-bold">{currentLesson.title}</h1>
                    <p className="text-slate-400 text-sm">{currentLesson.instruction}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contenido multimedia (si existe) */}
            {(currentLesson.media || currentLesson.theory) && (
              <div className="px-4 pb-2 max-h-48 overflow-y-auto border-b border-slate-800">
                <LessonContent lesson={currentLesson} />
              </div>
            )}

            {/* Video introductorio del módulo (primera lección) */}
            {currentLessonIndex === 0 && currentModule.introVideo && (
              <div className="px-4 pb-4 border-b border-slate-800">
                <ModuleIntroVideo
                  videoId={currentModule.introVideo.videoId}
                  provider={currentModule.introVideo.provider}
                  duration={currentModule.introVideo.duration}
                  moduleTitle={currentModule.title}
                />
              </div>
            )}

            {/* Terminal + Tutor Adaptativo */}
            <div className="flex-1 grid lg:grid-cols-2 gap-4 p-4 overflow-hidden">
              <div className="h-full">
                <CourseTerminal
                  lesson={currentLesson}
                  onSuccess={handleLessonComplete}
                  onError={handleError}
                  lessonKey={lessonKey}
                />
              </div>
              <div className="h-full">
                <AdaptiveTutor
                  lessonKey={lessonKey}
                  context={tutorContext}
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
              <button
                onClick={() => {
                  if (currentLessonIndex > 0) {
                    setCurrentLessonIndex(prev => prev - 1)
                  } else if (currentModuleIndex > 0) {
                    setCurrentModuleIndex(prev => prev - 1)
                    setCurrentLessonIndex(courseData.modules[currentModuleIndex - 1].lessons.length - 1)
                  }
                  setIsComplete(false)
                }}
                disabled={currentModuleIndex === 0 && currentLessonIndex === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm transition-colors"
              >
                ← Anterior
              </button>

              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                    style={{
                      width: `${(completedLessons.size / getTotalLessons()) * 100}%`
                    }}
                  />
                </div>
                <span className="text-slate-400 text-sm">
                  {completedLessons.size}/{getTotalLessons()}
                </span>
              </div>

              <button
                onClick={() => {
                  if (!isComplete) {
                    if (currentLessonIndex < currentModule.lessons.length - 1) {
                      setCurrentLessonIndex(prev => prev + 1)
                    } else if (currentModuleIndex < courseData.modules.length - 1) {
                      setCurrentModuleIndex(prev => prev + 1)
                      setCurrentLessonIndex(0)
                    }
                  }
                }}
                disabled={isComplete}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm transition-colors"
              >
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
