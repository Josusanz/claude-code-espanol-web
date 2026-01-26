import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import RalphLessonViewer from '../../../components/RalphLessonViewer'

const VALID_LESSONS = [
  'que-es-ralph',
  'context-rot',
  'anatomia',
  'fase-specs',
  'fase-plan',
  'fase-ejecutar',
  'proyecto-practico',
  'consejos-avanzados'
]

const LESSON_TITLES: Record<string, string> = {
  'que-es-ralph': '¿Qué es Ralph Loop?',
  'context-rot': 'El Problema del Context Rot',
  'anatomia': 'Anatomía de un Ralph Loop',
  'fase-specs': 'Fase 1: Definir Specs',
  'fase-plan': 'Fase 2: El Plan',
  'fase-ejecutar': 'Fase 3: Ejecutar el Loop',
  'proyecto-practico': 'Proyecto Práctico',
  'consejos-avanzados': 'Consejos Avanzados'
}

export default function RalphLessonPage() {
  const router = useRouter()
  const { slug } = router.query
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch('/api/auth/session')
        const data = await response.json()

        if (data.authenticated && data.user?.email) {
          setUserEmail(data.user.email)
        }
      } catch (error) {
        console.error('Error checking session:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  // Validate slug
  if (typeof slug === 'string' && !VALID_LESSONS.includes(slug)) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400 mb-6">Lección no encontrada</p>
          <a href="/ralph" className="text-purple-400 hover:text-purple-300">
            Volver a Ralph Loop
          </a>
        </div>
      </div>
    )
  }

  if (loading || !slug) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const lessonSlug = typeof slug === 'string' ? slug : slug[0]
  const lessonTitle = LESSON_TITLES[lessonSlug] || 'Ralph Loop'

  return (
    <>
      <Head>
        <title>{lessonTitle} | Ralph Loop - Claude Code en Español</title>
        <meta name="description" content={`Aprende ${lessonTitle} en el módulo premium Ralph Loop`} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <RalphLessonViewer lessonSlug={lessonSlug} userEmail={userEmail} />
    </>
  )
}
