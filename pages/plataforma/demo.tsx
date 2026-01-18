import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect, KeyboardEvent } from 'react'

// Datos del curso de demostración
const demoCourse = {
  title: 'Introducción a Claude Code',
  description: 'Aprende los comandos básicos de Claude Code en 5 minutos',
  lessons: [
    {
      id: 1,
      title: 'Tu primer comando',
      instruction: 'Claude Code se inicia escribiendo `claude` en tu terminal.',
      commandToType: 'claude',
      terminalResponse: `╭─────────────────────────────────────────╮
│     Claude Code - Terminal Asistente    │
│         Versión 1.0.0                   │
╰─────────────────────────────────────────╯

¡Bienvenido! Claude Code está listo para ayudarte.
Escribe tu pregunta o usa /help para ver comandos.`,
      aiMessage: '¡Excelente! Has iniciado Claude Code correctamente. En tu terminal real, esto abrirá una sesión interactiva donde puedes hacer preguntas y ejecutar tareas.',
      successKeywords: ['claude'],
    },
    {
      id: 2,
      title: 'Obtener ayuda',
      instruction: 'Para ver todos los comandos disponibles, usa el comando `/help`.',
      commandToType: '/help',
      terminalResponse: `Comandos disponibles:

  /help          - Muestra esta ayuda
  /clear         - Limpia la conversación
  /compact       - Compacta el historial
  /config        - Configuración
  /cost          - Muestra costes de la sesión
  /doctor        - Diagnóstico del sistema
  /init          - Inicializa CLAUDE.md
  /review        - Revisa cambios pendientes
  /vim           - Alterna modo vim

Escribe cualquier pregunta para empezar.`,
      aiMessage: 'El comando /help te muestra todas las opciones disponibles. Los comandos más útiles son /clear para empezar de nuevo y /init para crear un archivo de contexto del proyecto.',
      successKeywords: ['help', '/help'],
    },
    {
      id: 3,
      title: 'Hacer una pregunta',
      instruction: 'Ahora prueba a hacerle una pregunta a Claude. Puedes preguntarle lo que quieras.',
      commandToType: '¿qué es git?',
      terminalResponse: `Git es un sistema de control de versiones distribuido
que te permite:

• Guardar el historial de cambios de tu código
• Trabajar en equipo sin sobrescribir cambios
• Crear ramas para desarrollar features
• Volver a versiones anteriores si algo falla

Comandos básicos:
  git init      - Inicia un repositorio
  git add .     - Añade cambios
  git commit    - Guarda los cambios
  git push      - Sube al servidor remoto`,
      aiMessage: '¡Muy bien! Así es como interactúas con Claude Code. Puedes preguntarle sobre cualquier tema de programación, pedirle que escriba código, o que te ayude a debuggear errores.',
      // Acepta cualquier pregunta (mínimo 3 caracteres que no sea un comando)
      acceptAnyQuestion: true,
    },
    {
      id: 4,
      title: 'Crear un archivo',
      instruction: 'Claude Code puede crear archivos. Pídele que cree uno.',
      commandToType: 'crea un archivo hello.js',
      terminalResponse: `Voy a crear el archivo hello.js:

📄 hello.js
───────────────────────────────────
// Programa de bienvenida
console.log("¡Hola, mundo!");

function saludar(nombre) {
  return \`¡Hola, \${nombre}!\`;
}

module.exports = { saludar };
───────────────────────────────────

✅ Archivo creado: hello.js`,
      aiMessage: '¡Perfecto! Claude Code no solo responde preguntas, sino que puede crear, modificar y eliminar archivos en tu proyecto. En la versión real, el archivo se crearía en tu sistema.',
      successKeywords: ['crea', 'crear', 'archivo', 'genera', 'escribe', 'haz', 'hazme', 'file', 'make'],
    },
    {
      id: 5,
      title: '¡Completado!',
      instruction: '🎉 ¡Has completado la introducción a Claude Code!',
      commandToType: '',
      terminalResponse: '',
      aiMessage: '¡Felicidades! Ahora conoces los conceptos básicos de Claude Code. En el curso completo aprenderás a usar todas sus funcionalidades avanzadas como el modo Plan, hooks personalizados, y más.',
      isComplete: true,
    },
  ],
}

type Lesson = typeof demoCourse.lessons[0]

// Función para verificar si el comando es válido para la lección
function isCommandValid(cmd: string, lesson: Lesson): boolean {
  const normalizedCmd = cmd.toLowerCase().trim()

  // Lección completada no necesita comando
  if (lesson.isComplete) return false

  // Si acepta cualquier pregunta (paso 3)
  if (lesson.acceptAnyQuestion) {
    // Debe tener al menos 3 caracteres y no ser solo espacios
    return normalizedCmd.length >= 3 && !normalizedCmd.startsWith('/')
  }

  // Verificar con keywords
  if (lesson.successKeywords && lesson.successKeywords.length > 0) {
    return lesson.successKeywords.some(keyword =>
      normalizedCmd.includes(keyword.toLowerCase())
    )
  }

  return false
}

// Componente del Terminal
function DemoTerminal({
  currentLesson,
  onCommandSuccess,
  lessonIndex
}: {
  currentLesson: Lesson
  onCommandSuccess: () => void
  lessonIndex: number
}) {
  const [history, setHistory] = useState<Array<{ type: 'prompt' | 'input' | 'output' | 'success'; content: string }>>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset terminal cuando cambia la lección
  useEffect(() => {
    setHistory([])
    setCurrentInput('')
    setShowHint(false)
    inputRef.current?.focus()
  }, [lessonIndex])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Mostrar hint después de 5 segundos de inactividad
  useEffect(() => {
    if (currentLesson.isComplete) return

    const timer = setTimeout(() => {
      setShowHint(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [lessonIndex, currentLesson.isComplete])

  const processCommand = (cmd: string) => {
    if (!cmd.trim()) return

    setHistory(prev => [...prev, { type: 'input', content: cmd }])
    setIsProcessing(true)
    setShowHint(false)

    setTimeout(() => {
      // Comando clear
      if (cmd.toLowerCase().trim() === 'clear') {
        setHistory([])
        setIsProcessing(false)
        return
      }

      const isValid = isCommandValid(cmd, currentLesson)

      if (isValid) {
        setHistory(prev => [
          ...prev,
          { type: 'output', content: currentLesson.terminalResponse },
          { type: 'success', content: '✓ ¡Correcto! Avanzando a la siguiente lección...' }
        ])
        setTimeout(() => {
          onCommandSuccess()
        }, 1200)
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'output', content: `Hmm, eso no es exactamente lo que buscamos.\n\n💡 Intenta escribir: ${currentLesson.commandToType}` }
        ])
      }
      setIsProcessing(false)
    }, 400)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing && !currentLesson.isComplete) {
      processCommand(currentInput)
      setCurrentInput('')
    }
  }

  const handleQuickType = () => {
    if (currentLesson.commandToType) {
      setCurrentInput(currentLesson.commandToType)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-slate-400 text-sm ml-2">Terminal</span>
        </div>
        {!currentLesson.isComplete && (
          <span className="text-xs text-slate-500">Paso {lessonIndex + 1} de {demoCourse.lessons.length}</span>
        )}
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto bg-slate-950"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Mostrar qué escribir */}
        {!currentLesson.isComplete && history.length === 0 && (
          <div className="mb-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-xs mb-2">Escribe este comando:</p>
            <button
              onClick={handleQuickType}
              className="font-mono text-emerald-400 bg-slate-900 px-3 py-1.5 rounded border border-slate-600 hover:border-emerald-500 transition-colors cursor-pointer"
            >
              {currentLesson.commandToType}
            </button>
            <p className="text-slate-500 text-xs mt-2">
              Haz clic para autocompletar o escríbelo tú
            </p>
          </div>
        )}

        {/* History */}
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

        {/* Hint */}
        {showHint && !currentLesson.isComplete && history.length === 0 && (
          <div className="text-amber-400/80 text-xs mt-4 animate-pulse">
            💡 Pista: Escribe "{currentLesson.commandToType}" y presiona Enter
          </div>
        )}

        {/* Input line */}
        {!currentLesson.isComplete && (
          <div className="flex items-center mt-2">
            <span className="text-blue-400">~/proyecto $ </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-emerald-400 ml-1"
              placeholder={isProcessing ? 'Procesando...' : ''}
              disabled={isProcessing}
              autoFocus
            />
            {currentInput && (
              <span className="text-slate-600 text-xs mr-2">Enter ↵</span>
            )}
          </div>
        )}

        {/* Completed state */}
        {currentLesson.isComplete && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">¡Demo completada!</h3>
            <p className="text-slate-400">Has aprendido los conceptos básicos</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente del Chat del Tutor
function TutorChat({
  message,
  lessonTitle,
  lessonIndex,
  isComplete
}: {
  message: string
  lessonTitle: string
  lessonIndex: number
  isComplete?: boolean
}) {
  const [displayedMessage, setDisplayedMessage] = useState('')

  // Efecto de escritura
  useEffect(() => {
    setDisplayedMessage('')
    let i = 0
    const interval = setInterval(() => {
      if (i < message.length) {
        setDisplayedMessage(prev => prev + message[i])
        i++
      } else {
        clearInterval(interval)
      }
    }, 15)

    return () => clearInterval(interval)
  }, [message, lessonIndex])

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-xl">🤖</span>
        </div>
        <div>
          <span className="text-white font-medium block">Tutor IA</span>
          <span className="text-xs text-slate-400">Te guía en cada paso</span>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {/* Current lesson badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-400 text-xs font-medium mb-4">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
          {isComplete ? 'Completado' : `Lección ${lessonIndex + 1}: ${lessonTitle}`}
        </div>

        {/* AI Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
            <span className="text-sm">🤖</span>
          </div>
          <div className="bg-slate-800 rounded-2xl rounded-tl-sm p-4 flex-1">
            <p className="text-slate-200 text-sm leading-relaxed">
              {displayedMessage}
              <span className="inline-block w-1 h-4 bg-indigo-400 ml-1 animate-pulse"></span>
            </p>
          </div>
        </div>

        {/* Quick tips */}
        {!isComplete && (
          <div className="mt-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-xs font-medium mb-2">💡 Consejos:</p>
            <ul className="text-slate-500 text-xs space-y-1">
              <li>• Escribe el comando en el terminal de la izquierda</li>
              <li>• Puedes hacer clic en el comando para autocompletarlo</li>
              <li>• Escribe "clear" para limpiar el terminal</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente de progreso
function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = ((current) / (total - 1)) * 100 // -1 porque el último es "completado"

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <span className="text-slate-400 text-sm font-medium whitespace-nowrap">
        {current < total - 1 ? `${current + 1}/${total - 1}` : '✓'}
      </span>
    </div>
  )
}

export default function DemoPage() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const currentLesson = demoCourse.lessons[currentLessonIndex]

  const handleCommandSuccess = () => {
    if (currentLessonIndex < demoCourse.lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1)
    }
  }

  const handleRestart = () => {
    setCurrentLessonIndex(0)
  }

  return (
    <>
      <Head>
        <title>Demo Interactiva | aprende.software</title>
        <meta name="description" content="Prueba cómo funciona un curso interactivo con IA" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">a</span>
                  </div>
                  <span className="text-xl font-bold">aprende.software</span>
                </Link>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                  DEMO INTERACTIVA
                </span>
              </div>

              <Link
                href="/plataforma"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                ← Volver
              </Link>
            </div>
          </div>
        </header>

        {/* Course Info */}
        <section className="border-b border-slate-800 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold">{demoCourse.title}</h1>
                <p className="text-slate-400 text-sm">{demoCourse.description}</p>
              </div>
              <div className="w-full sm:w-48">
                <ProgressBar
                  current={currentLessonIndex}
                  total={demoCourse.lessons.length}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Instruction Banner */}
          {!currentLesson.isComplete && (
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📚</span>
                </div>
                <div>
                  <h2 className="font-bold text-lg">
                    Paso {currentLessonIndex + 1}: {currentLesson.title}
                  </h2>
                  <p className="text-slate-300 text-sm">{currentLesson.instruction}</p>
                </div>
              </div>
            </div>
          )}

          {/* Terminal and Chat */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="h-[450px]">
              <DemoTerminal
                currentLesson={currentLesson}
                onCommandSuccess={handleCommandSuccess}
                lessonIndex={currentLessonIndex}
              />
            </div>
            <div className="h-[450px]">
              <TutorChat
                message={currentLesson.aiMessage}
                lessonTitle={currentLesson.title}
                lessonIndex={currentLessonIndex}
                isComplete={currentLesson.isComplete}
              />
            </div>
          </div>

          {/* Navigation dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {demoCourse.lessons.slice(0, -1).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentLessonIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentLessonIndex
                    ? 'bg-indigo-500 w-6'
                    : i < currentLessonIndex
                      ? 'bg-emerald-500'
                      : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Ir a lección ${i + 1}`}
              />
            ))}
          </div>

          {/* Completed Actions */}
          {currentLesson.isComplete && (
            <div className="mt-8 text-center">
              <div className="inline-flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium transition-colors border border-slate-700"
                >
                  🔄 Repetir Demo
                </button>
                <Link
                  href="/empezar/introduccion"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-bold transition-all"
                >
                  📚 Ver Curso Completo →
                </Link>
              </div>
            </div>
          )}
        </main>

        {/* Bottom CTA */}
        {!currentLesson.isComplete && (
          <section className="border-t border-slate-800 bg-slate-900/30 mt-8">
            <div className="max-w-4xl mx-auto px-4 py-6 text-center">
              <p className="text-slate-400 text-sm">
                ¿Te gusta esta experiencia de aprendizaje?{' '}
                <Link href="/empezar/introduccion" className="text-indigo-400 hover:text-indigo-300 underline">
                  Empieza el curso completo gratis
                </Link>
              </p>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
