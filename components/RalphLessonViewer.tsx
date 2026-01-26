import { useState, useEffect } from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'

interface RalphLessonViewerProps {
  lessonSlug: string
  userEmail: string | null
}

const LESSONS = [
  { slug: 'que-es-ralph', title: '3.1 ¿Qué es Ralph Loop?', duration: '~15 min' },
  { slug: 'context-rot', title: '3.2 El Problema del Context Rot', duration: '~15 min' },
  { slug: 'anatomia', title: '3.3 Anatomía de un Ralph Loop', duration: '~20 min' },
  { slug: 'fase-specs', title: '3.4 Fase 1: Definir Specs', duration: '~30 min' },
  { slug: 'fase-plan', title: '3.5 Fase 2: El Plan', duration: '~20 min' },
  { slug: 'fase-ejecutar', title: '3.6 Fase 3: Ejecutar el Loop', duration: '~30 min' },
  { slug: 'proyecto-practico', title: '3.7 Proyecto Práctico', duration: '~45 min' },
  { slug: 'consejos-avanzados', title: '3.8 Consejos Avanzados', duration: '~20 min' },
]

// Componentes MDX personalizados
const mdxComponents = {
  // Callout component
  Callout: ({ type = 'info', children }: { type?: 'info' | 'warning' | 'error', children: React.ReactNode }) => {
    const styles = {
      info: 'bg-blue-900/30 border-blue-500/50 text-blue-200',
      warning: 'bg-yellow-900/30 border-yellow-500/50 text-yellow-200',
      error: 'bg-red-900/30 border-red-500/50 text-red-200',
    }
    const icons = {
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌',
    }
    return (
      <div className={`my-4 p-4 rounded-lg border ${styles[type]}`}>
        <span className="mr-2">{icons[type]}</span>
        {children}
      </div>
    )
  },
  // Steps component
  Steps: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 ml-4 border-l-2 border-gray-700 pl-6 space-y-6">
      {children}
    </div>
  ),
  // FileTree placeholder
  FileTree: ({ children }: { children: React.ReactNode }) => (
    <div className="my-4 p-4 bg-gray-800/50 rounded-lg font-mono text-sm">
      {children}
    </div>
  ),
  // Code blocks
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="my-4 p-4 bg-gray-900 rounded-lg overflow-x-auto border border-gray-700">
      {children}
    </pre>
  ),
  code: ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const isInline = !className
    if (isInline) {
      return <code className="px-1.5 py-0.5 bg-gray-800 rounded text-purple-300 text-sm">{children}</code>
    }
    return <code className="text-sm text-gray-300">{children}</code>
  },
  // Headings
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-bold mt-8 mb-4 text-white border-b border-gray-700 pb-2">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold mt-6 mb-3 text-white">{children}</h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-200">{children}</h4>
  ),
  // Paragraphs and text
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-4 text-gray-300 leading-relaxed">{children}</p>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  // Lists
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-gray-300">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-gray-300">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-gray-300">{children}</li>
  ),
  // Links
  a: ({ href, children }: { href?: string, children: React.ReactNode }) => (
    <a href={href} className="text-purple-400 hover:text-purple-300 underline" target={href?.startsWith('http') ? '_blank' : undefined}>
      {children}
    </a>
  ),
  // Tables
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border border-gray-700 px-4 py-2 bg-gray-800 text-left font-semibold">{children}</th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-gray-700 px-4 py-2">{children}</td>
  ),
  // Blockquote
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="my-4 pl-4 border-l-4 border-purple-500 text-gray-400 italic">
      {children}
    </blockquote>
  ),
  // Horizontal rule
  hr: () => <hr className="my-8 border-gray-700" />,
}

export default function RalphLessonViewer({ lessonSlug, userEmail }: RalphLessonViewerProps) {
  const [content, setContent] = useState<MDXRemoteSerializeResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentIndex = LESSONS.findIndex(l => l.slug === lessonSlug)
  const currentLesson = LESSONS[currentIndex]
  const prevLesson = currentIndex > 0 ? LESSONS[currentIndex - 1] : null
  const nextLesson = currentIndex < LESSONS.length - 1 ? LESSONS[currentIndex + 1] : null

  useEffect(() => {
    async function fetchContent() {
      if (!userEmail) {
        setError('Necesitas iniciar sesión para ver este contenido')
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/ralph-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, lesson: lessonSlug })
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.message || data.error || 'Error al cargar el contenido')
          setLoading(false)
          return
        }

        // Serialize MDX on client
        const { serialize } = await import('next-mdx-remote/serialize')
        const mdxSource = await serialize(data.content, {
          parseFrontmatter: true,
        })

        setContent(mdxSource)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching content:', err)
        setError('Error al cargar el contenido')
        setLoading(false)
      }
    }

    fetchContent()
  }, [lessonSlug, userEmail])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando lección...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-4">Acceso Restringido</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <div className="space-y-3">
            <Link
              href="/ralph"
              className="block w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              Ver información del módulo
            </Link>
            <Link
              href="/acceso"
              className="block w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/ralph" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Ralph Loop
            </Link>
            <span className="text-gray-500 text-sm">{currentLesson?.duration}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Lesson navigation sidebar */}
        <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Lecciones del módulo</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {LESSONS.map((lesson, idx) => (
              <Link
                key={lesson.slug}
                href={`/ralph/leccion/${lesson.slug}`}
                className={`px-3 py-2 rounded text-sm transition ${
                  lesson.slug === lessonSlug
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {idx + 1}. {lesson.title.split(' ').slice(1).join(' ').substring(0, 15)}...
              </Link>
            ))}
          </div>
        </div>

        {/* MDX Content */}
        {content && (
          <article className="prose prose-invert max-w-none">
            <MDXRemote {...content} components={mdxComponents} />
          </article>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex justify-between">
          {prevLesson ? (
            <Link
              href={`/ralph/leccion/${prevLesson.slug}`}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-500">Anterior</div>
                <div className="text-sm text-white">{prevLesson.title}</div>
              </div>
            </Link>
          ) : <div />}

          {nextLesson ? (
            <Link
              href={`/ralph/leccion/${nextLesson.slug}`}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
            >
              <div className="text-right">
                <div className="text-xs text-purple-200">Siguiente</div>
                <div className="text-sm text-white">{nextLesson.title}</div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/ralph"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
              <div className="text-right">
                <div className="text-xs text-green-200">Completado</div>
                <div className="text-sm text-white">Volver al índice</div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
