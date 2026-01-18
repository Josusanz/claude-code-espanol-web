'use client'

import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

// ============ CHAT INTERFACE ============
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

function ChatInterface({
  systemPrompt,
  placeholder = 'Escribe tu mensaje...',
  className = '',
}: {
  systemPrompt?: string
  placeholder?: string
  className?: string
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const assistantMessageId = crypto.randomUUID()
    setMessages(prev => [
      ...prev,
      { id: assistantMessageId, role: 'assistant', content: '' },
    ])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          systemPrompt,
        }),
      })

      if (!response.ok) throw new Error('Failed to send message')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader available')

      const decoder = new TextDecoder()
      let assistantContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break

            try {
              const parsed = JSON.parse(data)
              if (parsed.text) {
                assistantContent += parsed.text
                setMessages(prev =>
                  prev.map(m =>
                    m.id === assistantMessageId
                      ? { ...m, content: assistantContent }
                      : m
                  )
                )
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantMessageId
            ? { ...m, content: 'Error: No se pudo obtener respuesta. Inténtalo de nuevo.' }
            : m
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 ${className}`}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-500 dark:text-slate-400 py-8">
            <p className="text-lg font-medium mb-2">¡Hola! Soy tu asistente para crear cursos</p>
            <p className="text-sm">Dime qué tipo de curso quieres crear y te ayudaré paso a paso.</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.content || (
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-medium rounded-xl transition-colors disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

// ============ SIMULATED TERMINAL ============
interface TerminalCommand {
  command: string
  output: string
  isError?: boolean
}

function SimulatedTerminal({ className = '' }: { className?: string }) {
  const [history, setHistory] = useState<TerminalCommand[]>([])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const commands: Record<string, string | ((args: string[]) => string)> = {
    'help': `Comandos disponibles:
  crear-curso <nombre>  - Crear un nuevo curso
  listar-cursos         - Ver tus cursos
  preview <id>          - Vista previa del curso
  publicar <id>         - Publicar curso
  clear                 - Limpiar terminal`,

    'listar-cursos': `📚 Tus cursos:
  1. [borrador] Curso de Meditación
  2. [publicado] Introducción a Python

Total: 2 cursos`,

    'clear': '__CLEAR__',

    'crear-curso': (args) => {
      const name = args.join(' ')
      if (!name) return 'Uso: crear-curso <nombre del curso>'
      return `✅ Curso "${name}" creado exitosamente!
ID: curso_${Date.now()}
Estado: borrador

Próximos pasos:
1. Añade lecciones con: añadir-leccion <id>
2. Configura ejercicios interactivos
3. Publica cuando esté listo`
    },

    'preview': (args) => {
      if (!args[0]) return 'Uso: preview <id del curso>'
      return `🔍 Generando vista previa...

Curso: Introducción a la Meditación
├── Módulo 1: Fundamentos
│   ├── Lección 1: ¿Qué es meditar?
│   ├── Lección 2: Beneficios científicos
│   └── Ejercicio: Quiz interactivo
├── Módulo 2: Técnicas básicas
│   ├── Lección 3: Respiración consciente
│   └── Ejercicio: Práctica guiada con IA
└── Módulo 3: Práctica diaria
    └── Lección 4: Creando tu rutina

URL de preview: https://aprende.software/preview/abc123`
    },
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    const parts = trimmedCmd.split(' ')
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    let output: string
    const handler = commands[command]

    if (handler) {
      if (typeof handler === 'function') {
        output = handler(args)
      } else {
        output = handler
      }
    } else {
      output = `comando no encontrado: ${command}. Escribe 'help' para ver comandos disponibles.`
    }

    if (output === '__CLEAR__') {
      setHistory([])
      return
    }

    setHistory(prev => [...prev, { command: trimmedCmd, output, isError: output.includes('no encontrado') }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(input)
    setInput('')
  }

  return (
    <div
      className={`bg-slate-950 rounded-xl overflow-hidden font-mono text-sm border border-slate-700 ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-slate-400 text-xs flex-1 text-center">Terminal — curso-creator</span>
      </div>

      <div ref={containerRef} className="p-4 h-80 overflow-y-auto text-slate-100">
        {history.length === 0 && (
          <div className="text-slate-500 mb-4">
            <p>Bienvenido al Creador de Cursos</p>
            <p>Escribe <span className="text-emerald-400">help</span> para ver los comandos disponibles</p>
          </div>
        )}

        {history.map((entry, i) => (
          <div key={i} className="mb-3">
            <div className="flex gap-2">
              <span className="text-emerald-400">➜</span>
              <span className="text-blue-400">~/cursos</span>
              <span className="text-white">{entry.command}</span>
            </div>
            <pre className={`mt-1 ml-4 whitespace-pre-wrap ${entry.isError ? 'text-red-400' : 'text-slate-300'}`}>
              {entry.output}
            </pre>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <span className="text-emerald-400">➜</span>
          <span className="text-blue-400">~/cursos</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none caret-white"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  )
}

// ============ MAIN PAGE ============
export default function PlataformaPage() {
  return (
    <>
      <Head>
        <title>Creador de Cursos | aprende.software</title>
        <meta name="description" content="Crea cursos interactivos con IA. Terminal de comandos, chat asistido y ejercicios personalizados." />
      </Head>

      <div className="min-h-screen bg-slate-950 text-white">
        {/* Navigation */}
        <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">a</span>
                </div>
                <span className="text-xl font-bold">aprende.software</span>
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-medium">BETA</span>
              </Link>

              <div className="flex items-center gap-4">
                <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                  ← Volver al curso
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="py-16 px-4 text-center border-b border-slate-800">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Nuevo: Curso para crear tu propia plataforma
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Crea Cursos Interactivos
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              con Inteligencia Artificial
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Aprende a construir tu propia plataforma de cursos con terminal interactivo
            y tutor IA. Incluye código fuente y licencia comercial.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/plataforma/comprar"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              🚀 Comprar Curso - 97€
            </Link>
            <Link
              href="/plataforma/demo"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl border border-slate-700 transition-colors"
            >
              🎮 Probar Demo Gratis
            </Link>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Terminal */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                    Terminal de Gestión
                  </h2>
                  <Link
                    href="/plataforma/demo"
                    className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Ver demo completa →
                  </Link>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Gestiona tus cursos con comandos. Escribe <code className="text-emerald-400 bg-slate-800 px-1.5 py-0.5 rounded">help</code> para empezar.
                </p>
                <SimulatedTerminal className="h-[400px]" />
              </div>

              {/* Chat */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                  Asistente de Contenido
                </h2>
                <p className="text-slate-400 text-sm mb-4">
                  Describe tu curso y la IA te ayudará a estructurar lecciones y ejercicios.
                </p>
                <ChatInterface
                  className="h-[400px]"
                  placeholder="Describe el curso que quieres crear..."
                  systemPrompt={`Eres un experto en diseño instruccional y creación de cursos online. Tu rol es ayudar a crear cursos interactivos.

Cuando el usuario describa un curso:
1. Sugiere una estructura de módulos y lecciones
2. Propón tipos de ejercicios interactivos (quiz, práctica con IA, proyectos)
3. Da consejos para hacer el contenido más engaging
4. Sugiere cómo medir el progreso del estudiante

Responde siempre en español, de forma concisa y práctica. Usa markdown para formatear.`}
                />
              </div>
            </div>

            {/* Features */}
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🎯',
                  title: 'Ejercicios con IA',
                  description: 'Crea ejercicios donde un tutor IA guía al estudiante en tiempo real.',
                },
                {
                  icon: '💻',
                  title: 'Terminal Interactivo',
                  description: 'Los estudiantes practican comandos en un entorno simulado y seguro.',
                },
                {
                  icon: '📊',
                  title: 'Analíticas',
                  description: 'Mide el progreso de tus estudiantes y optimiza tu contenido.',
                },
              ].map((feature, i) => (
                <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center p-8 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-2xl border border-indigo-500/30">
              <h2 className="text-2xl font-bold mb-4">¿Listo para crear tu propia plataforma?</h2>
              <p className="text-slate-400 mb-6">
                Aprende paso a paso a construir esto mismo. Incluye código fuente completo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/plataforma/comprar"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold transition-colors"
                >
                  Comprar Curso - 97€
                </Link>
                <Link
                  href="/plataforma/demo"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium border border-slate-700 transition-colors"
                >
                  Ver Demo Primero
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-slate-800 mt-12">
          <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
            © 2026 Josu Sanz · <Link href="/" className="hover:text-white">aprende.software</Link>
          </div>
        </footer>
      </div>
    </>
  )
}
