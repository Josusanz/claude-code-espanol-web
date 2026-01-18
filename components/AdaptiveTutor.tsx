import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

interface StudentContext {
  lessonTitle: string
  lessonInstruction: string
  expectedCommand: string
  moduleTitle: string
  completedLessons: number
  totalLessons: number
  attempts: number
  lastError?: string
  timeOnLesson: number // segundos
}

interface AdaptiveTutorProps {
  lessonKey: string
  context: StudentContext
  onAskQuestion?: (question: string) => void
}

// System prompt que hace al tutor adaptativo
function buildSystemPrompt(context: StudentContext): string {
  const progressPercent = Math.round((context.completedLessons / context.totalLessons) * 100)

  return `Eres un tutor de programación experto, empático y adaptativo. Tu estudiante está aprendiendo a crear una plataforma de cursos interactivos con IA.

## Contexto actual del estudiante:
- **Lección**: ${context.lessonTitle}
- **Módulo**: ${context.moduleTitle}
- **Instrucción**: ${context.lessonInstruction}
- **Comando esperado**: ${context.expectedCommand}
- **Progreso total**: ${progressPercent}% (${context.completedLessons}/${context.totalLessons} lecciones)
- **Intentos en esta lección**: ${context.attempts}
- **Tiempo en esta lección**: ${Math.round(context.timeOnLesson / 60)} minutos
${context.lastError ? `- **Último error**: ${context.lastError}` : ''}

## Tu rol:
1. **Adapta tu explicación** al nivel del estudiante:
   - Si lleva muchos intentos (>3), da pistas más directas
   - Si va rápido, ofrece información extra o retos
   - Si lleva mucho tiempo (>5 min), pregunta si necesita ayuda

2. **Sé conversacional**: El estudiante puede preguntarte cualquier cosa sobre la lección o el tema en general.

3. **Da feedback personalizado**: No repitas siempre lo mismo. Varía tus explicaciones y usa diferentes enfoques.

4. **Motiva**: Celebra los logros, normaliza los errores como parte del aprendizaje.

5. **Anticípate**: Si ves que el estudiante está atascado, ofrece ayuda proactivamente.

## Formato:
- Respuestas concisas (2-4 párrafos máximo)
- Usa markdown para código: \`comando\`
- Responde siempre en español
- Sé cálido pero profesional`
}

export function AdaptiveTutor({ lessonKey, context, onAskQuestion }: AdaptiveTutorProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [initialMessageSent, setInitialMessageSent] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const prevLessonKey = useRef(lessonKey)

  // Scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Generar mensaje inicial adaptativo cuando cambia la lección
  useEffect(() => {
    if (lessonKey !== prevLessonKey.current) {
      prevLessonKey.current = lessonKey
      setMessages([])
      setInitialMessageSent(false)
    }

    if (!initialMessageSent && context.lessonTitle) {
      generateInitialMessage()
      setInitialMessageSent(true)
    }
  }, [lessonKey, context.lessonTitle, initialMessageSent])

  // Generar mensaje inicial basado en contexto
  const generateInitialMessage = async () => {
    setIsLoading(true)

    // Mensaje inicial diferente según el contexto
    let initialPrompt = ''

    if (context.completedLessons === 0) {
      initialPrompt = 'El estudiante acaba de empezar el curso. Dale la bienvenida de forma cálida y explica brevemente qué va a aprender en esta primera lección.'
    } else if (context.attempts > 0) {
      initialPrompt = `El estudiante ha vuelto a esta lección después de ${context.attempts} intentos previos. Anímale y ofrece un enfoque diferente para explicar el concepto.`
    } else {
      initialPrompt = 'Introduce la lección de forma breve y motivadora. Explica qué va a aprender y por qué es importante.'
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: initialPrompt }],
          systemPrompt: buildSystemPrompt(context),
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let content = ''
      const messageId = crypto.randomUUID()

      setMessages([{
        id: messageId,
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }])

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
                content += parsed.text
                setMessages(prev => prev.map(m =>
                  m.id === messageId ? { ...m, content } : m
                ))
              }
            } catch {}
          }
        }
      }
    } catch (error) {
      console.error('Error generating initial message:', error)
      setMessages([{
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `¡Hola! En esta lección vamos a aprender sobre **${context.lessonTitle}**.\n\n${context.lessonInstruction}\n\nEscribe el comando en el terminal de la izquierda. Si tienes dudas, pregúntame aquí.`,
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Enviar pregunta del estudiante
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const assistantMessageId = crypto.randomUUID()
    setMessages(prev => [...prev, {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages
            .filter(m => m.role !== 'system')
            .concat(userMessage)
            .map(m => ({ role: m.role, content: m.content })),
          systemPrompt: buildSystemPrompt(context),
        }),
      })

      if (!response.ok) throw new Error('Failed to send message')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let content = ''

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
                content += parsed.text
                setMessages(prev => prev.map(m =>
                  m.id === assistantMessageId ? { ...m, content } : m
                ))
              }
            } catch {}
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => prev.map(m =>
        m.id === assistantMessageId
          ? { ...m, content: 'Lo siento, hubo un error. ¿Puedes repetir tu pregunta?' }
          : m
      ))
    } finally {
      setIsLoading(false)
    }
  }

  // Notificar error del estudiante (llamado desde el terminal)
  const notifyError = async (error: string) => {
    const errorContext = { ...context, lastError: error, attempts: context.attempts + 1 }

    const systemMessage = `El estudiante acaba de cometer un error: "${error}".
Dale feedback constructivo y una pista sutil sin dar la respuesta directa.
Si ya lleva ${context.attempts + 1} intentos, sé más directo con la ayuda.`

    setIsLoading(true)
    const messageId = crypto.randomUUID()

    setMessages(prev => [...prev, {
      id: messageId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: systemMessage }],
          systemPrompt: buildSystemPrompt(errorContext),
        }),
      })

      if (!response.ok) throw new Error('Failed')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let content = ''

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
                content += parsed.text
                setMessages(prev => prev.map(m =>
                  m.id === messageId ? { ...m, content } : m
                ))
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages(prev => prev.map(m =>
        m.id === messageId
          ? { ...m, content: `Hmm, eso no es exactamente lo que buscamos. Recuerda que el comando esperado es similar a: \`${context.expectedCommand}\`` }
          : m
      ))
    } finally {
      setIsLoading(false)
    }
  }

  // Notificar éxito
  const notifySuccess = async () => {
    const successPrompt = context.attempts === 0
      ? 'El estudiante completó la lección al primer intento. Felicítale efusivamente y menciona algo interesante sobre lo que acaba de aprender.'
      : `El estudiante completó la lección después de ${context.attempts} intentos. Felicítale y refuerza que los errores son parte del aprendizaje.`

    setIsLoading(true)
    const messageId = crypto.randomUUID()

    setMessages(prev => [...prev, {
      id: messageId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: successPrompt }],
          systemPrompt: buildSystemPrompt(context),
        }),
      })

      if (!response.ok) throw new Error('Failed')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let content = ''

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
                content += parsed.text
                setMessages(prev => prev.map(m =>
                  m.id === messageId ? { ...m, content } : m
                ))
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages(prev => prev.map(m =>
        m.id === messageId
          ? { ...m, content: '¡Excelente trabajo! 🎉 Has completado esta lección correctamente. ¡Sigue así!' }
          : m
      ))
    } finally {
      setIsLoading(false)
    }
  }

  // Exponer métodos para el componente padre
  useEffect(() => {
    // @ts-ignore - Exponemos los métodos en window para comunicación con el terminal
    window.adaptiveTutor = { notifyError, notifySuccess }
    return () => {
      // @ts-ignore
      delete window.adaptiveTutor
    }
  }, [context])

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-xl">🤖</span>
        </div>
        <div className="flex-1">
          <span className="text-white font-medium block">Tutor IA Adaptativo</span>
          <span className="text-xs text-slate-400">Se adapta a tu ritmo de aprendizaje</span>
        </div>
        {isLoading && (
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-400 text-xs font-medium">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
          {context.lessonTitle}
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
                <span className="text-sm">🤖</span>
              </div>
            )}
            <div className={`rounded-2xl p-3 max-w-[85%] ${
              message.role === 'user'
                ? 'bg-indigo-600 text-white rounded-tr-sm'
                : 'bg-slate-800 text-slate-200 rounded-tl-sm'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content || (
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 bg-current rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregúntame lo que quieras..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 rounded-xl text-white transition-colors disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">
          Pregúntame sobre la lección, pide ejemplos, o solicita más explicaciones
        </p>
      </form>
    </div>
  )
}
