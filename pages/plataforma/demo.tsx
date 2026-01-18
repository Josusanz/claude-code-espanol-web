import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react'

// Datos del curso de demostración
const demoCourse = {
  title: 'Introducción a Claude Code',
  description: 'Aprende los comandos básicos de Claude Code en 5 minutos',
  lessons: [
    {
      id: 1,
      title: 'Tu primer comando',
      instruction: 'Claude Code se inicia escribiendo `claude` en tu terminal. Pruébalo ahora:',
      expectedCommand: 'claude',
      terminalResponse: `╭─────────────────────────────────────────╮
│     Claude Code - Terminal Asistente    │
│         Versión 1.0.0                   │
╰─────────────────────────────────────────╯

¡Bienvenido! Claude Code está listo para ayudarte.
Escribe tu pregunta o usa /help para ver comandos.`,
      hint: 'Escribe "claude" y presiona Enter',
      aiMessage: '¡Excelente! Has iniciado Claude Code correctamente. En tu terminal real, esto abrirá una sesión interactiva donde puedes hacer preguntas y ejecutar tareas.',
    },
    {
      id: 2,
      title: 'Obtener ayuda',
      instruction: 'Para ver todos los comandos disponibles, usa el comando `/help`:',
      expectedCommand: '/help',
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
      hint: 'Escribe "/help" para ver la lista de comandos',
      aiMessage: 'El comando /help te muestra todas las opciones disponibles. Los comandos más útiles son /clear para empezar de nuevo y /init para crear un archivo de contexto del proyecto.',
    },
    {
      id: 3,
      title: 'Hacer una pregunta',
      instruction: 'Ahora prueba a hacerle una pregunta a Claude. Escribe algo como:',
      expectedCommand: 'qué es git',
      alternativeCommands: ['que es git', 'qué es git?', 'que es git?', 'explica git', 'explícame git'],
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
      hint: 'Escribe una pregunta, por ejemplo: "qué es git"',
      aiMessage: '¡Muy bien! Así es como interactúas con Claude Code. Puedes preguntarle sobre cualquier tema de programación, pedirle que escriba código, o que te ayude a debuggear errores.',
    },
    {
      id: 4,
      title: 'Crear un archivo',
      instruction: 'Claude Code puede crear archivos. Pídele que cree un archivo:',
      expectedCommand: 'crea un archivo hello.js',
      alternativeCommands: ['crear archivo hello.js', 'crea hello.js', 'genera un archivo hello.js', 'escribe hello.js'],
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
      hint: 'Escribe: "crea un archivo hello.js"',
      aiMessage: '¡Perfecto! Claude Code no solo responde preguntas, sino que puede crear, modificar y eliminar archivos en tu proyecto. En la versión real, el archivo se crearía en tu sistema.',
    },
    {
      id: 5,
      title: '¡Completado!',
      instruction: '🎉 ¡Has completado la introducción a Claude Code!',
      expectedCommand: '',
      terminalResponse: '',
      hint: '',
      aiMessage: '¡Felicidades! Ahora conoces los conceptos básicos de Claude Code. En el curso completo aprenderás a usar todas sus funcionalidades avanzadas como el modo Plan, hooks personalizados, y más.',
      isComplete: true,
    },
  ],
}

// Componente del Terminal
function DemoTerminal({
  currentLesson,
  onCommandSuccess
}: {
  currentLesson: typeof demoCourse.lessons[0]
  onCommandSuccess: () => void
}) {
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'error'; content: string }>>([
    { type: 'output', content: '~/proyecto $ ' }
  ])
  const [currentInput, setCurrentInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const processCommand = (cmd: string) => {
    const normalizedCmd = cmd.toLowerCase().trim()
    const expected = currentLesson.expectedCommand.toLowerCase()
    const alternatives = currentLesson.alternativeCommands?.map(c => c.toLowerCase()) || []

    const isCorrect = normalizedCmd === expected ||
                      alternatives.some(alt => normalizedCmd.includes(alt) || alt.includes(normalizedCmd))

    setHistory(prev => [...prev, { type: 'input', content: cmd }])
    setIsProcessing(true)

    setTimeout(() => {
      if (isCorrect && currentLesson.terminalResponse) {
        setHistory(prev => [
          ...prev,
          { type: 'output', content: currentLesson.terminalResponse },
          { type: 'output', content: '\n~/proyecto $ ' }
        ])
        setTimeout(() => onCommandSuccess(), 500)
      } else if (cmd === 'clear') {
        setHistory([{ type: 'output', content: '~/proyecto $ ' }])
      } else if (cmd === 'help') {
        setHistory(prev => [
          ...prev,
          { type: 'output', content: `💡 Pista: ${currentLesson.hint}` },
          { type: 'output', content: '\n~/proyecto $ ' }
        ])
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'error', content: `Intenta de nuevo. Escribe "help" para ver una pista.` },
          { type: 'output', content: '\n~/proyecto $ ' }
        ])
      }
      setIsProcessing(false)
    }, 300)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!currentInput.trim() || isProcessing || currentLesson.isComplete) return
    processCommand(currentInput.trim())
    setCurrentInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as FormEvent)
    }
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-slate-400 text-sm ml-2">Terminal — Demo Interactiva</span>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className={`whitespace-pre-wrap ${
            item.type === 'input' ? 'text-emerald-400' :
            item.type === 'error' ? 'text-red-400' : 'text-slate-300'
          }`}>
            {item.type === 'input' ? `$ ${item.content}` : item.content}
          </div>
        ))}

        {!currentLesson.isComplete && (
          <div className="flex items-center text-slate-300">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-emerald-400"
              placeholder={isProcessing ? 'Procesando...' : 'Escribe aquí...'}
              disabled={isProcessing}
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  )
}

// Componente del Chat del Tutor
function TutorChat({
  message,
  lessonTitle
}: {
  message: string
  lessonTitle: string
}) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
          <span className="text-white text-sm">🤖</span>
        </div>
        <span className="text-white font-medium">Tutor IA</span>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-lg p-4 mb-4">
          <span className="text-indigo-400 text-xs font-medium uppercase">Lección actual</span>
          <h3 className="text-white font-semibold mt-1">{lessonTitle}</h3>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-sm">🤖</span>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 flex-1">
            <p className="text-slate-300 text-sm leading-relaxed">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente de progreso
function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = (current / total) * 100

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-slate-400 text-sm font-medium">{current}/{total}</span>
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
                  DEMO
                </span>
              </div>

              <Link
                href="/plataforma"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                ← Volver a Plataforma
              </Link>
            </div>
          </div>
        </header>

        {/* Course Info */}
        <section className="border-b border-slate-800 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{demoCourse.title}</h1>
                <p className="text-slate-400 mt-1">{demoCourse.description}</p>
              </div>
              <div className="w-full md:w-64">
                <ProgressBar
                  current={currentLessonIndex + 1}
                  total={demoCourse.lessons.length}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Lesson Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Instruction */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">{currentLesson.isComplete ? '🎉' : '📚'}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">
                  {currentLesson.isComplete ? currentLesson.title : `Paso ${currentLessonIndex + 1}: ${currentLesson.title}`}
                </h2>
                <p className="text-slate-300">{currentLesson.instruction}</p>

                {currentLesson.expectedCommand && !currentLesson.isComplete && (
                  <div className="mt-4 inline-block bg-slate-900 border border-slate-600 rounded-lg px-4 py-2">
                    <code className="text-emerald-400 font-mono">{currentLesson.expectedCommand}</code>
                  </div>
                )}

                {currentLesson.isComplete && (
                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={handleRestart}
                      className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
                    >
                      Repetir Demo
                    </button>
                    <Link
                      href="/empezar/introduccion"
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
                    >
                      Ver Curso Completo →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Terminal and Chat */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="h-96">
              <DemoTerminal
                currentLesson={currentLesson}
                onCommandSuccess={handleCommandSuccess}
              />
            </div>
            <div className="h-96">
              <TutorChat
                message={currentLesson.aiMessage}
                lessonTitle={currentLesson.title}
              />
            </div>
          </div>

          {/* Lesson Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setCurrentLessonIndex(prev => Math.max(0, prev - 1))}
              disabled={currentLessonIndex === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              ← Anterior
            </button>

            <div className="flex gap-2">
              {demoCourse.lessons.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentLessonIndex(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === currentLessonIndex
                      ? 'bg-indigo-500'
                      : i < currentLessonIndex
                        ? 'bg-emerald-500'
                        : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentLessonIndex(prev => Math.min(demoCourse.lessons.length - 1, prev + 1))}
              disabled={currentLessonIndex === demoCourse.lessons.length - 1}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Siguiente →
            </button>
          </div>
        </main>

        {/* CTA */}
        <section className="border-t border-slate-800 bg-slate-900/50 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Te ha gustado la demo?</h2>
            <p className="text-slate-400 mb-8">
              Así funcionan nuestros cursos interactivos. Aprende programación con un tutor IA que te guía paso a paso.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/empezar/introduccion"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all"
              >
                Empezar Curso Gratis
              </Link>
              <Link
                href="/plataforma"
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium border border-slate-700 transition-colors"
              >
                Crear tu Propio Curso
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
