import Link from 'next/link'

interface Lesson {
  slug: string
  title: string
  module?: string
}

interface LessonNavigationProps {
  currentSlug: string
  lessons: Lesson[]
  basePath: string
}

export default function LessonNavigation({ currentSlug, lessons, basePath }: LessonNavigationProps) {
  const currentIndex = lessons.findIndex(l => l.slug === currentSlug)
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  const progress = Math.round(((currentIndex + 1) / lessons.length) * 100)

  return (
    <div className="my-12 border-t border-slate-200 dark:border-slate-700 pt-8">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400 mb-2">
          <span>Progreso del módulo</span>
          <span>{currentIndex + 1} de {lessons.length} lecciones</span>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {prevLesson ? (
          <Link
            href={`${basePath}/${prevLesson.slug}`}
            className="flex-1 p-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition group"
          >
            <div className="text-sm text-slate-500 dark:text-gray-500 mb-1">← Anterior</div>
            <div className="font-medium text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {prevLesson.title}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextLesson ? (
          <Link
            href={`${basePath}/${nextLesson.slug}`}
            className="flex-1 p-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition text-right"
          >
            <div className="text-sm text-indigo-200 mb-1">Siguiente →</div>
            <div className="font-medium text-white">
              {nextLesson.title}
            </div>
          </Link>
        ) : (
          <div className="flex-1 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg text-center">
            <div className="text-green-700 dark:text-green-400 font-medium">
              🎉 ¡Módulo completado!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
