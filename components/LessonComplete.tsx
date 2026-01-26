import { useState, useEffect } from 'react'
import Link from 'next/link'

interface LessonCompleteProps {
  lessonId: string
  nextLesson?: {
    slug: string
    title: string
    basePath: string
  }
  moduleComplete?: {
    title: string
    certificateUrl?: string
  }
}

export default function LessonComplete({ lessonId, nextLesson, moduleComplete }: LessonCompleteProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check if already completed
    async function checkProgress() {
      try {
        const res = await fetch('/api/progress')
        if (res.ok) {
          const data = await res.json()
          setIsCompleted(data.completedLessons?.includes(lessonId))
        }
      } catch (error) {
        console.error('Error checking progress:', error)
      } finally {
        setChecking(false)
      }
    }
    checkProgress()
  }, [lessonId])

  const markComplete = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/progress/mark-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId })
      })
      if (res.ok) {
        setIsCompleted(true)
      }
    } catch (error) {
      console.error('Error marking complete:', error)
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="my-8 p-6 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mx-auto"></div>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="my-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700/50 text-center">
        <div className="text-4xl mb-3">✅</div>
        <p className="text-green-700 dark:text-green-400 font-semibold text-lg mb-4">
          ¡Lección completada!
        </p>

        {nextLesson && (
          <Link
            href={`${nextLesson.basePath}/${nextLesson.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Siguiente: {nextLesson.title} →
          </Link>
        )}

        {moduleComplete && (
          <div className="mt-4">
            <p className="text-green-600 dark:text-green-400 font-bold text-xl mb-3">
              🎉 ¡Has completado {moduleComplete.title}!
            </p>
            {moduleComplete.certificateUrl && (
              <Link
                href={moduleComplete.certificateUrl}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                🏆 Obtener certificado
              </Link>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700/50 text-center">
      <p className="text-slate-700 dark:text-gray-300 mb-4">
        ¿Has terminado esta lección?
      </p>
      <button
        onClick={markComplete}
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-50"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Guardando...
          </>
        ) : (
          <>
            ✓ Marcar como completada
          </>
        )}
      </button>
    </div>
  )
}
