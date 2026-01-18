import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect, KeyboardEvent, useCallback } from 'react'

// =============================================================================
// DATOS DEL CURSO TERMINAL - "Aprende Docker desde Cero"
// =============================================================================
interface Lesson {
  id: string
  title: string
  instruction: string
  command: string
  output: string
  theory: string
  tip?: string
}

const terminalLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Verificar instalación de Docker',
    instruction: 'Primero comprobamos que Docker está instalado correctamente en tu sistema.',
    command: 'docker --version',
    output: `Docker version 24.0.7, build afdd53b

Docker está instalado correctamente.
Ahora podemos empezar a trabajar con contenedores.`,
    theory: `<h3>¿Qué es Docker?</h3>
<p>Docker es una plataforma que permite empaquetar aplicaciones en <strong>contenedores</strong>: entornos aislados que incluyen todo lo necesario para ejecutar tu app.</p>
<ul>
  <li><strong>Portabilidad</strong>: Funciona igual en desarrollo y producción</li>
  <li><strong>Aislamiento</strong>: Cada contenedor es independiente</li>
  <li><strong>Eficiencia</strong>: Más ligero que máquinas virtuales</li>
</ul>`,
    tip: 'Si no tienes Docker instalado, descárgalo de docker.com'
  },
  {
    id: 'lesson-2',
    title: 'Descargar una imagen',
    instruction: 'Las imágenes son plantillas para crear contenedores. Vamos a descargar la imagen oficial de Node.js.',
    command: 'docker pull node:20-alpine',
    output: `20-alpine: Pulling from library/node
4abcf2066143: Pull complete
c4fe30383c57: Pull complete
9b6c8e0c3c2a: Pull complete
Digest: sha256:8e012198...
Status: Downloaded newer image for node:20-alpine

✓ Imagen descargada: node:20-alpine (180MB)`,
    theory: `<h3>Imágenes Docker</h3>
<p>Una imagen es una plantilla de solo lectura con instrucciones para crear un contenedor.</p>
<ul>
  <li><strong>node:20-alpine</strong>: Node.js 20 sobre Alpine Linux (muy ligero)</li>
  <li><strong>Docker Hub</strong>: Repositorio público de imágenes</li>
  <li><strong>Tags</strong>: Versiones específicas (20-alpine, latest, etc.)</li>
</ul>`
  },
  {
    id: 'lesson-3',
    title: 'Crear tu primer contenedor',
    instruction: 'Ahora creamos un contenedor a partir de la imagen y ejecutamos un comando.',
    command: 'docker run node:20-alpine node -v',
    output: `v20.11.0

El contenedor se creó, ejecutó el comando, y se detuvo automáticamente.
Los contenedores son efímeros por defecto.`,
    theory: `<h3>docker run</h3>
<p>Este comando crea y ejecuta un contenedor:</p>
<ul>
  <li><code>docker run [imagen] [comando]</code></li>
  <li>El contenedor se detiene al terminar el comando</li>
  <li>Usa <code>-d</code> para ejecutar en segundo plano</li>
  <li>Usa <code>-it</code> para modo interactivo</li>
</ul>`,
    tip: 'El contenedor solo vive mientras el comando se ejecuta'
  },
  {
    id: 'lesson-4',
    title: 'Listar contenedores',
    instruction: 'Veamos qué contenedores tenemos activos y cuáles están detenidos.',
    command: 'docker ps -a',
    output: `CONTAINER ID   IMAGE            COMMAND      STATUS
a1b2c3d4e5f6   node:20-alpine   "node -v"    Exited (0) 30 seconds ago
f6e5d4c3b2a1   node:20-alpine   "node -v"    Exited (0) 2 minutes ago

Tienes 2 contenedores detenidos.
Usa 'docker rm' para eliminarlos.`,
    theory: `<h3>docker ps</h3>
<p>Lista los contenedores:</p>
<ul>
  <li><code>docker ps</code>: Solo contenedores activos</li>
  <li><code>docker ps -a</code>: Todos (incluyendo detenidos)</li>
  <li><code>docker ps -q</code>: Solo IDs (útil para scripts)</li>
</ul>`
  },
  {
    id: 'lesson-5',
    title: 'Contenedor interactivo',
    instruction: 'Vamos a entrar en un contenedor y ejecutar comandos dentro de él.',
    command: 'docker run -it node:20-alpine sh',
    output: `/ #
Ahora estás DENTRO del contenedor.
Puedes ejecutar comandos de Linux aquí.

/ # node -v
v20.11.0
/ # exit

Has salido del contenedor.`,
    theory: `<h3>Modo interactivo</h3>
<p>Los flags <code>-it</code> permiten interactuar con el contenedor:</p>
<ul>
  <li><code>-i</code>: Mantiene STDIN abierto</li>
  <li><code>-t</code>: Asigna un pseudo-TTY (terminal)</li>
  <li><code>sh</code>: Shell de Alpine Linux</li>
  <li><code>exit</code>: Para salir del contenedor</li>
</ul>`,
    tip: 'Escribe "exit" para salir del contenedor'
  },
  {
    id: 'lesson-6',
    title: 'Crear un Dockerfile',
    instruction: 'El Dockerfile define cómo construir tu imagen personalizada.',
    command: 'cat > Dockerfile << EOF\nFROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["npm", "start"]\nEOF',
    output: `✓ Dockerfile creado

FROM node:20-alpine    # Imagen base
WORKDIR /app           # Directorio de trabajo
COPY . .               # Copiar archivos
RUN npm install        # Instalar dependencias
CMD ["npm", "start"]   # Comando por defecto`,
    theory: `<h3>Dockerfile</h3>
<p>Un archivo de texto con instrucciones para construir una imagen:</p>
<ul>
  <li><strong>FROM</strong>: Imagen base</li>
  <li><strong>WORKDIR</strong>: Directorio de trabajo</li>
  <li><strong>COPY</strong>: Copiar archivos al contenedor</li>
  <li><strong>RUN</strong>: Ejecutar comandos durante el build</li>
  <li><strong>CMD</strong>: Comando por defecto al iniciar</li>
</ul>`
  }
]

// =============================================================================
// COMPONENTE TERMINAL
// =============================================================================
function Terminal({
  lesson,
  onSuccess
}: {
  lesson: Lesson
  onSuccess: () => void
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
  }, [lesson.id])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const processCommand = (cmd: string) => {
    if (!cmd.trim() || isProcessing) return

    setInput('')
    setHistory(prev => [...prev, { type: 'input', content: cmd }])
    setIsProcessing(true)

    setTimeout(() => {
      const normalizedCmd = cmd.toLowerCase().trim()
      const expectedCmd = lesson.command.toLowerCase().split('\n')[0]

      if (normalizedCmd.includes(expectedCmd.split(' ')[0]) || normalizedCmd.includes(expectedCmd.split(' ')[1] || '')) {
        setHistory(prev => [
          ...prev,
          { type: 'output', content: lesson.output },
          { type: 'success', content: '✓ ¡Correcto! Siguiente lección...' }
        ])
        setTimeout(onSuccess, 1500)
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'output', content: `bash: comando no reconocido\nIntenta: ${lesson.command.split('\n')[0]}` }
        ])
      }
      setIsProcessing(false)
    }, 300)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input)
    }
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-slate-400 text-sm ml-2 font-mono">bash ~ docker-tutorial</span>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto bg-slate-950"
        onClick={() => inputRef.current?.focus()}
      >
        {history.length === 0 && (
          <div className="mb-4">
            <div className="text-slate-500 text-xs mb-2">Escribe este comando:</div>
            <button
              onClick={() => {
                setInput(lesson.command.split('\n')[0])
                inputRef.current?.focus()
              }}
              className="text-emerald-400 bg-slate-800 px-3 py-2 rounded border border-slate-600 hover:border-emerald-500 transition-colors block w-full text-left"
            >
              $ {lesson.command.split('\n')[0]}
            </button>
          </div>
        )}

        {history.map((item, i) => (
          <div key={i} className={`mb-2 ${
            item.type === 'input' ? 'text-white' :
            item.type === 'success' ? 'text-emerald-400 bg-emerald-500/10 p-2 rounded' :
            'text-slate-300'
          }`}>
            {item.type === 'input' && <span className="text-emerald-400">$ </span>}
            <span className="whitespace-pre-wrap">{item.content}</span>
          </div>
        ))}

        <div className="flex items-center">
          <span className="text-emerald-400">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white ml-1 font-mono"
            disabled={isProcessing}
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// PANEL DE TEORÍA CON TUTOR IA
// =============================================================================
function TheoryPanel({
  lesson,
  lessonIndex,
  total
}: {
  lesson: Lesson
  lessonIndex: number
  total: number
}) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    setMessages([])
  }, [lesson.id])

  const handleSend = () => {
    if (!input.trim() || isTyping) return

    const question = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: question }])
    setIsTyping(true)

    setTimeout(() => {
      let response = ''
      const q = question.toLowerCase()

      if (q.includes('docker') && q.includes('qué')) {
        response = 'Docker es una plataforma de contenedores. Imagina que empaquetas tu aplicación con todo lo que necesita (código, dependencias, configuración) en una "caja" que funciona igual en cualquier lugar.'
      } else if (q.includes('imagen') || q.includes('image')) {
        response = 'Una imagen es como una plantilla o snapshot. A partir de ella creas contenedores. Es de solo lectura - cuando creas un contenedor, se añade una capa escribible encima.'
      } else if (q.includes('contenedor') || q.includes('container')) {
        response = 'Un contenedor es una instancia en ejecución de una imagen. Puedes tener múltiples contenedores de la misma imagen. Son ligeros porque comparten el kernel del host.'
      } else if (q.includes('dockerfile')) {
        response = 'El Dockerfile es un archivo de texto con instrucciones para construir tu imagen personalizada. Cada línea crea una "capa" en la imagen final.'
      } else {
        response = `Buena pregunta sobre "${question.slice(0, 30)}..."\n\nEn esta lección estamos aprendiendo: ${lesson.instruction}\n\nEl comando clave es:\n\`${lesson.command.split('\n')[0]}\``
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 600)
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <span className="text-sm">🤖</span>
          </div>
          <div>
            <span className="text-white text-sm font-medium">Tutor Docker</span>
            <span className="text-xs text-slate-400 block">Powered by Claude</span>
          </div>
        </div>
        <div className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded">
          {lessonIndex + 1}/{total}
        </div>
      </div>

      {/* Theory Content */}
      <div className="p-4 border-b border-slate-700 bg-slate-800/50">
        <h3 className="font-bold text-sm mb-2 text-cyan-400">{lesson.title}</h3>
        <p className="text-slate-300 text-sm mb-3">{lesson.instruction}</p>
        <div
          className="prose prose-invert prose-sm max-w-none text-slate-400"
          dangerouslySetInnerHTML={{ __html: lesson.theory }}
        />
        {lesson.tip && (
          <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-400">
            💡 {lesson.tip}
          </div>
        )}
      </div>

      {/* Chat */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-slate-500 text-sm py-8">
            <p>¿Tienes dudas sobre Docker?</p>
            <p className="text-xs mt-1">Pregúntame lo que quieras</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
              msg.role === 'user' ? 'bg-slate-700' : 'bg-gradient-to-br from-cyan-500 to-blue-600'
            }`}>
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
              msg.role === 'user'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-200'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs">
              🤖
            </div>
            <div className="bg-slate-800 rounded-xl px-3 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta sobre Docker..."
            className="flex-1 bg-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 rounded-lg text-sm font-medium"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// SIDEBAR DE LECCIONES
// =============================================================================
function LessonsSidebar({
  lessons,
  currentIndex,
  completedLessons,
  onSelect
}: {
  lessons: Lesson[]
  currentIndex: number
  completedLessons: Set<string>
  onSelect: (index: number) => void
}) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      <div className="p-3 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border-b border-slate-700">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <span>🐳</span> Aprende Docker
        </h3>
        <p className="text-xs text-slate-400 mt-1">{completedLessons.size}/{lessons.length} lecciones</p>
      </div>

      <div className="p-2">
        {lessons.map((lesson, index) => {
          const isActive = index === currentIndex
          const isCompleted = completedLessons.has(lesson.id)
          const isLocked = index > currentIndex && !completedLessons.has(lessons[index - 1]?.id)

          return (
            <button
              key={lesson.id}
              onClick={() => !isLocked && onSelect(index)}
              disabled={isLocked}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-3 mb-1 ${
                isActive
                  ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                  : isCompleted
                    ? 'text-emerald-400 hover:bg-slate-800'
                    : isLocked
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isCompleted
                  ? 'bg-emerald-500 text-white'
                  : isActive
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-700 text-slate-400'
              }`}>
                {isCompleted ? '✓' : index + 1}
              </span>
              <span className="flex-1 truncate">{lesson.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// =============================================================================
// PÁGINA PRINCIPAL
// =============================================================================
export default function DemoTerminalPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())

  const currentLesson = terminalLessons[currentIndex]
  const isComplete = currentIndex >= terminalLessons.length

  const handleSuccess = useCallback(() => {
    setCompletedLessons(prev => new Set([...prev, currentLesson.id]))
    if (currentIndex < terminalLessons.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(terminalLessons.length)
    }
  }, [currentIndex, currentLesson])

  const handleSelect = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <>
      <Head>
        <title>Demo: Aprende Docker | aprende.software</title>
        <meta name="description" content="Aprende Docker desde cero con un terminal interactivo y tutor IA" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/plataforma/demo" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">a</span>
                  </div>
                </Link>
                <div>
                  <h1 className="font-bold text-sm">Aprende Docker desde Cero</h1>
                  <p className="text-xs text-slate-400">Demo Terminal · Tutor IA incluido</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden sm:inline-block px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs font-medium">
                  💻 Curso Terminal
                </span>
                <Link
                  href="/plataforma/comprar"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg text-sm font-medium"
                >
                  Comprar - $147
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Intro Banner */}
        {currentIndex === 0 && completedLessons.size === 0 && (
          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-cyan-500/30">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl">🐳</div>
                <div>
                  <h2 className="font-bold">Aprende Docker en 6 lecciones</h2>
                  <p className="text-sm text-slate-400">Escribe comandos reales y el tutor IA te explica cada concepto</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {!isComplete ? (
            <div className="grid lg:grid-cols-[240px_1fr_1fr] gap-4">
              {/* Sidebar */}
              <div className="hidden lg:block">
                <LessonsSidebar
                  lessons={terminalLessons}
                  currentIndex={currentIndex}
                  completedLessons={completedLessons}
                  onSelect={handleSelect}
                />
              </div>

              {/* Terminal */}
              <div className="h-[550px]">
                <Terminal lesson={currentLesson} onSuccess={handleSuccess} />
              </div>

              {/* Theory + AI Tutor */}
              <div className="h-[550px]">
                <TheoryPanel
                  lesson={currentLesson}
                  lessonIndex={currentIndex}
                  total={terminalLessons.length}
                />
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-2xl font-bold mb-4">¡Demo completada!</h2>
              <p className="text-slate-400 mb-8">
                Has aprendido los fundamentos de Docker: imágenes, contenedores y Dockerfile.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setCurrentIndex(0)
                    setCompletedLessons(new Set())
                  }}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium"
                >
                  Repetir Demo
                </button>
                <Link
                  href="/plataforma/comprar"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-xl font-bold"
                >
                  Comprar Curso Completo - $147
                </Link>
              </div>
            </div>
          )}
        </main>

        {/* Bottom CTA */}
        <section className="border-t border-slate-800 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-xl font-bold mb-2">¿Te gusta aprender con terminal interactivo?</h3>
            <p className="text-slate-400 mb-4">
              Crea tu propia plataforma de cursos con terminal y tutor IA.
            </p>
            <Link
              href="/plataforma/comprar"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-xl font-bold"
            >
              Ver Curso Completo - $147
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
