import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// =============================================================================
// DATOS DEL CURSO TRADICIONAL - "Yoga para Principiantes"
// =============================================================================
interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

interface Quiz {
  question: string
  options: QuizOption[]
  explanation: string
}

interface Lesson {
  id: string
  title: string
  duration: string
  videoPlaceholder: string // En producción sería videoId
  content: string // Markdown/HTML
  images?: Array<{ url: string; caption: string }>
  quiz?: Quiz
}

interface Module {
  id: string
  number: string
  title: string
  lessons: Lesson[]
}

const courseModules: Module[] = [
  {
    id: 'intro',
    number: '01',
    title: 'Introducción al Yoga',
    lessons: [
      {
        id: '1-1',
        title: 'Bienvenida al curso',
        duration: '3:45',
        videoPlaceholder: '🧘',
        content: `
          <h3>¡Bienvenido a Yoga para Principiantes!</h3>
          <p>En este curso aprenderás las bases del yoga de forma segura y progresiva.</p>
          <h4>Lo que aprenderás:</h4>
          <ul>
            <li>Posturas fundamentales (asanas)</li>
            <li>Técnicas de respiración (pranayama)</li>
            <li>Meditación básica</li>
            <li>Rutinas para practicar en casa</li>
          </ul>
          <p><strong>Duración total:</strong> 6 lecciones · 45 minutos</p>
        `
      },
      {
        id: '1-2',
        title: 'Preparando tu espacio',
        duration: '4:20',
        videoPlaceholder: '🏠',
        content: `
          <h3>Crea tu espacio de práctica</h3>
          <p>No necesitas mucho para empezar a practicar yoga en casa:</p>
          <h4>Equipamiento básico:</h4>
          <ul>
            <li><strong>Esterilla de yoga</strong>: Cualquier superficie antideslizante</li>
            <li><strong>Ropa cómoda</strong>: Que permita movimiento</li>
            <li><strong>Espacio libre</strong>: 2x2 metros es suficiente</li>
          </ul>
          <h4>Consejos:</h4>
          <ul>
            <li>Practica en un lugar tranquilo</li>
            <li>Evita comer 2 horas antes</li>
            <li>Ten agua cerca</li>
          </ul>
        `,
        quiz: {
          question: '¿Cuánto espacio mínimo necesitas para practicar yoga?',
          options: [
            { id: 'a', text: '1x1 metros', isCorrect: false },
            { id: 'b', text: '2x2 metros', isCorrect: true },
            { id: 'c', text: '3x3 metros', isCorrect: false },
            { id: 'd', text: 'Una habitación entera', isCorrect: false }
          ],
          explanation: 'Con 2x2 metros tienes espacio suficiente para la mayoría de posturas. Lo importante es poder estirar brazos y piernas sin obstáculos.'
        }
      }
    ]
  },
  {
    id: 'posturas',
    number: '02',
    title: 'Posturas Fundamentales',
    lessons: [
      {
        id: '2-1',
        title: 'Postura de la Montaña',
        duration: '5:15',
        videoPlaceholder: '🏔️',
        content: `
          <h3>Tadasana - Postura de la Montaña</h3>
          <p>La base de todas las posturas de pie. Parece simple, pero requiere atención.</p>
          <h4>Cómo hacerla:</h4>
          <ol>
            <li>Pies juntos, peso distribuido</li>
            <li>Rodillas ligeramente flexionadas</li>
            <li>Pelvis en posición neutral</li>
            <li>Hombros relajados</li>
            <li>Coronilla hacia el cielo</li>
          </ol>
          <h4>Beneficios:</h4>
          <ul>
            <li>Mejora la postura</li>
            <li>Fortalece piernas y core</li>
            <li>Aumenta la concentración</li>
          </ul>
        `,
        quiz: {
          question: '¿Cómo deben estar las rodillas en Tadasana?',
          options: [
            { id: 'a', text: 'Completamente bloqueadas', isCorrect: false },
            { id: 'b', text: 'Muy flexionadas', isCorrect: false },
            { id: 'c', text: 'Ligeramente flexionadas', isCorrect: true },
            { id: 'd', text: 'Cruzadas', isCorrect: false }
          ],
          explanation: 'Las rodillas ligeramente flexionadas protegen las articulaciones y permiten una mejor alineación de la pelvis.'
        }
      },
      {
        id: '2-2',
        title: 'Postura del Guerrero I',
        duration: '6:30',
        videoPlaceholder: '⚔️',
        content: `
          <h3>Virabhadrasana I - Guerrero I</h3>
          <p>Una postura de fuerza que trabaja todo el cuerpo.</p>
          <h4>Cómo hacerla:</h4>
          <ol>
            <li>Desde Tadasana, da un gran paso atrás</li>
            <li>Pie trasero girado 45 grados</li>
            <li>Rodilla delantera sobre el tobillo</li>
            <li>Brazos arriba, palmas juntas</li>
            <li>Mirada al frente o hacia arriba</li>
          </ol>
          <h4>Beneficios:</h4>
          <ul>
            <li>Fortalece piernas y glúteos</li>
            <li>Abre caderas y pecho</li>
            <li>Mejora el equilibrio</li>
          </ul>
        `
      },
      {
        id: '2-3',
        title: 'Postura del Perro Boca Abajo',
        duration: '5:45',
        videoPlaceholder: '🐕',
        content: `
          <h3>Adho Mukha Svanasana - Perro Boca Abajo</h3>
          <p>Una de las posturas más reconocidas del yoga.</p>
          <h4>Cómo hacerla:</h4>
          <ol>
            <li>Empieza en cuatro apoyos</li>
            <li>Manos separadas al ancho de hombros</li>
            <li>Eleva las caderas hacia el cielo</li>
            <li>Piernas estiradas (o rodillas flexionadas)</li>
            <li>Cabeza relajada entre los brazos</li>
          </ol>
          <h4>Beneficios:</h4>
          <ul>
            <li>Estira toda la espalda</li>
            <li>Fortalece brazos y hombros</li>
            <li>Calma la mente</li>
          </ul>
        `,
        quiz: {
          question: '¿Qué parte del cuerpo debe estar más alta en el Perro Boca Abajo?',
          options: [
            { id: 'a', text: 'La cabeza', isCorrect: false },
            { id: 'b', text: 'Los hombros', isCorrect: false },
            { id: 'c', text: 'Las caderas', isCorrect: true },
            { id: 'd', text: 'Los pies', isCorrect: false }
          ],
          explanation: 'Las caderas son el punto más alto, formando una "V" invertida con el cuerpo.'
        }
      }
    ]
  },
  {
    id: 'cierre',
    number: '03',
    title: 'Cierre y Relajación',
    lessons: [
      {
        id: '3-1',
        title: 'Postura del Niño y Savasana',
        duration: '7:00',
        videoPlaceholder: '😌',
        content: `
          <h3>Posturas de Relajación</h3>

          <h4>Balasana - Postura del Niño</h4>
          <p>Perfecta para descansar entre posturas:</p>
          <ul>
            <li>Rodillas al suelo, glúteos a los talones</li>
            <li>Brazos extendidos o a los lados</li>
            <li>Frente en el suelo</li>
          </ul>

          <h4>Savasana - Postura del Cadáver</h4>
          <p>La postura final de toda práctica:</p>
          <ul>
            <li>Tumbado boca arriba</li>
            <li>Brazos y piernas relajados</li>
            <li>Ojos cerrados</li>
            <li>Respiración natural</li>
            <li>Permanece 5-10 minutos</li>
          </ul>
        `,
        quiz: {
          question: '¿Cuánto tiempo se recomienda permanecer en Savasana?',
          options: [
            { id: 'a', text: '30 segundos', isCorrect: false },
            { id: 'b', text: '1 minuto', isCorrect: false },
            { id: 'c', text: '5-10 minutos', isCorrect: true },
            { id: 'd', text: '30 minutos', isCorrect: false }
          ],
          explanation: 'Savasana de 5-10 minutos permite que el cuerpo integre los beneficios de la práctica y la mente se calme completamente.'
        }
      }
    ]
  }
]

// Aplanar lecciones
const allLessons = courseModules.flatMap(m => m.lessons)

// =============================================================================
// COMPONENTE VIDEO PLAYER (PLACEHOLDER)
// =============================================================================
function VideoPlayer({ lesson }: { lesson: Lesson }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
        {!isPlaying ? (
          <>
            <div className="text-8xl opacity-50">{lesson.videoPlaceholder}</div>
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
            >
              <div className="w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </>
        ) : (
          <div className="text-center p-8">
            <div className="text-6xl mb-4">{lesson.videoPlaceholder}</div>
            <p className="text-slate-400">Video reproduciéndose...</p>
            <p className="text-slate-500 text-sm mt-2">Duración: {lesson.duration}</p>
            <button
              onClick={() => setIsPlaying(false)}
              className="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
            >
              Pausar
            </button>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-slate-700">
        <h2 className="font-bold text-lg">{lesson.title}</h2>
        <p className="text-slate-400 text-sm">{lesson.duration}</p>
      </div>
    </div>
  )
}

// =============================================================================
// COMPONENTE QUIZ
// =============================================================================
function QuizComponent({ quiz, onComplete }: { quiz: Quiz; onComplete: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = () => {
    if (selected) {
      setShowResult(true)
    }
  }

  const isCorrect = quiz.options.find(o => o.id === selected)?.isCorrect

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📝</span>
        <h3 className="font-bold">Quiz</h3>
      </div>

      <p className="text-lg mb-4">{quiz.question}</p>

      <div className="space-y-2 mb-4">
        {quiz.options.map((option) => (
          <button
            key={option.id}
            onClick={() => !showResult && setSelected(option.id)}
            disabled={showResult}
            className={`w-full text-left p-3 rounded-lg border transition-all ${
              showResult
                ? option.isCorrect
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : selected === option.id
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-slate-700 border-slate-600 text-slate-400'
                : selected === option.id
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-slate-700 border-slate-600 hover:border-slate-500'
            }`}
          >
            <span className="font-medium mr-2">{option.id.toUpperCase()}.</span>
            {option.text}
          </button>
        ))}
      </div>

      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="w-full py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold"
        >
          Comprobar respuesta
        </button>
      ) : (
        <div>
          <div className={`p-4 rounded-lg mb-4 ${
            isCorrect ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-red-500/20 border border-red-500/30'
          }`}>
            <p className={`font-bold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
              {isCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto'}
            </p>
            <p className="text-sm text-slate-300">{quiz.explanation}</p>
          </div>
          <button
            onClick={onComplete}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-bold"
          >
            Continuar →
          </button>
        </div>
      )}
    </div>
  )
}

// =============================================================================
// SIDEBAR DE MÓDULOS
// =============================================================================
function ModulesSidebar({
  modules,
  currentLessonId,
  completedLessons,
  onSelect
}: {
  modules: Module[]
  currentLessonId: string
  completedLessons: Set<string>
  onSelect: (lessonId: string) => void
}) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      <div className="p-3 bg-gradient-to-r from-amber-900/50 to-orange-900/50 border-b border-slate-700">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <span>🧘</span> Yoga para Principiantes
        </h3>
        <p className="text-xs text-slate-400 mt-1">{completedLessons.size}/{allLessons.length} lecciones</p>
      </div>

      <div className="p-2 max-h-[500px] overflow-y-auto">
        {modules.map((module) => (
          <div key={module.id} className="mb-3">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <div className="w-6 h-6 rounded bg-amber-600/20 flex items-center justify-center text-xs text-amber-400 font-bold">
                {module.number}
              </div>
              <span className="text-sm font-medium text-slate-300">{module.title}</span>
            </div>

            <div className="ml-4 space-y-0.5">
              {module.lessons.map((lesson) => {
                const isActive = lesson.id === currentLessonId
                const isCompleted = completedLessons.has(lesson.id)

                return (
                  <button
                    key={lesson.id}
                    onClick={() => onSelect(lesson.id)}
                    className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors flex items-center gap-2 ${
                      isActive
                        ? 'bg-amber-600/20 text-amber-400'
                        : isCompleted
                          ? 'text-emerald-400 hover:bg-slate-800'
                          : 'text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : isActive
                          ? 'border-amber-500'
                          : 'border-slate-600'
                    }`}>
                      {isCompleted ? '✓' : ''}
                    </span>
                    <span className="flex-1 truncate">{lesson.title}</span>
                    <span className="text-slate-500">{lesson.duration}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// PÁGINA PRINCIPAL
// =============================================================================
export default function DemoTradicionalPage() {
  const [currentLessonId, setCurrentLessonId] = useState(allLessons[0].id)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [showQuiz, setShowQuiz] = useState(false)

  const currentLessonIndex = allLessons.findIndex(l => l.id === currentLessonId)
  const currentLesson = allLessons[currentLessonIndex]
  const currentModule = courseModules.find(m => m.lessons.some(l => l.id === currentLessonId))!
  const isComplete = completedLessons.size === allLessons.length

  const handleNextLesson = () => {
    setCompletedLessons(prev => new Set([...prev, currentLessonId]))
    setShowQuiz(false)
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentLessonIndex + 1].id)
    }
  }

  const handleQuizComplete = () => {
    handleNextLesson()
  }

  const handleSelectLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId)
    setShowQuiz(false)
  }

  return (
    <>
      <Head>
        <title>Demo: Yoga para Principiantes | aprende.software</title>
        <meta name="description" content="Aprende yoga desde cero con videos, explicaciones y quizzes interactivos" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/plataforma/demo" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">a</span>
                  </div>
                </Link>
                <div>
                  <h1 className="font-bold text-sm">Yoga para Principiantes</h1>
                  <p className="text-xs text-slate-400">Demo Tradicional · Videos + Quizzes</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden sm:inline-block px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs font-medium">
                  📚 Curso Tradicional
                </span>
                <Link
                  href="/plataforma/comprar"
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-lg text-sm font-medium"
                >
                  Comprar - $147
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Intro Banner */}
        {currentLessonIndex === 0 && completedLessons.size === 0 && (
          <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-b border-amber-500/30">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl">🧘</div>
                <div>
                  <h2 className="font-bold">Yoga para Principiantes</h2>
                  <p className="text-sm text-slate-400">Aprende posturas básicas con videos paso a paso y quizzes</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {!isComplete ? (
            <div className="grid lg:grid-cols-[280px_1fr] gap-6">
              {/* Sidebar */}
              <div className="hidden lg:block">
                <ModulesSidebar
                  modules={courseModules}
                  currentLessonId={currentLessonId}
                  completedLessons={completedLessons}
                  onSelect={handleSelectLesson}
                />

                {/* Instructor */}
                <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl">
                      🧘‍♀️
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Ana García</p>
                      <p className="text-xs text-slate-400">Instructora de Yoga</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    10 años de experiencia · Certificada Yoga Alliance RYT-500
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Video */}
                <VideoPlayer lesson={currentLesson} />

                {/* Lesson Content */}
                <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4 text-sm text-slate-400">
                    <span className="px-2 py-0.5 bg-amber-600/20 text-amber-400 rounded">
                      Módulo {currentModule.number}
                    </span>
                    <span>·</span>
                    <span>{currentModule.title}</span>
                  </div>

                  <div
                    className="prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                  />

                  {/* Quiz or Next Button */}
                  <div className="mt-6 pt-6 border-t border-slate-700">
                    {currentLesson.quiz && !showQuiz && !completedLessons.has(currentLesson.id) ? (
                      <button
                        onClick={() => setShowQuiz(true)}
                        className="w-full py-3 bg-amber-600 hover:bg-amber-700 rounded-lg font-bold"
                      >
                        Hacer Quiz para Continuar
                      </button>
                    ) : currentLesson.quiz && showQuiz ? (
                      <QuizComponent quiz={currentLesson.quiz} onComplete={handleQuizComplete} />
                    ) : (
                      <button
                        onClick={handleNextLesson}
                        disabled={currentLessonIndex >= allLessons.length - 1}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg font-bold"
                      >
                        {currentLessonIndex >= allLessons.length - 1 ? 'Última lección' : 'Siguiente lección →'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-2xl font-bold mb-4">¡Demo completada!</h2>
              <p className="text-slate-400 mb-8">
                Has completado el curso de Yoga para Principiantes. ¡Namaste! 🙏
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setCurrentLessonId(allLessons[0].id)
                    setCompletedLessons(new Set())
                    setShowQuiz(false)
                  }}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium"
                >
                  Repetir Demo
                </button>
                <Link
                  href="/plataforma/comprar"
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-xl font-bold"
                >
                  Comprar Curso Completo - $147
                </Link>
              </div>
            </div>
          )}
        </main>

        {/* Bottom CTA */}
        <section className="border-t border-slate-800 bg-gradient-to-r from-amber-900/30 to-orange-900/30 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-xl font-bold mb-2">¿Quieres crear cursos como este?</h3>
            <p className="text-slate-400 mb-4">
              Videos, contenido y quizzes interactivos para cualquier tema.
            </p>
            <Link
              href="/plataforma/comprar"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-xl font-bold"
            >
              Ver Curso Completo - $147
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
