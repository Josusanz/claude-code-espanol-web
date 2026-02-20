import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const PROGRESS_KEY = 'curso-gratis-progress'

// Paths that are part of the free course modules
const FREE_LESSON_PREFIXES = [
  '/modo-facil',
  '/empezar',
  '/fundamentos',
  '/proyectos',
  '/mcp',
  '/clawdbot',
]

function getLessonKey(path: string): string | null {
  // Map path to module:lesson key
  if (path.startsWith('/modo-facil')) return `modo-facil:${path}`
  if (path.startsWith('/empezar')) return `empezar:${path}`
  if (path.startsWith('/fundamentos')) return `fundamentos:${path}`
  if (path.startsWith('/proyectos')) return `proyectos:${path}`
  if (path.startsWith('/mcp')) return `mcp:${path}`
  if (path.startsWith('/clawdbot')) return `clawdbot:${path}`
  return null
}

export default function LessonProgress() {
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(false)
  const [mounted, setMounted] = useState(false)

  const lessonKey = getLessonKey(router.asPath.split('#')[0].split('?')[0])

  useEffect(() => {
    setMounted(true)
    if (!lessonKey) return
    try {
      const saved = localStorage.getItem(PROGRESS_KEY)
      if (saved) {
        const progress = JSON.parse(saved)
        setIsCompleted(!!progress[lessonKey])
      }
    } catch { /* ignore */ }
  }, [lessonKey])

  if (!mounted || !lessonKey) return null

  // Don't show on index pages of modules (they're overviews, not lessons)
  const path = router.asPath.split('#')[0].split('?')[0]
  const isIndex = FREE_LESSON_PREFIXES.some(prefix => path === prefix || path === prefix + '/')
  // Exception: /modo-facil index IS a lesson (Introducción)
  if (isIndex && !path.startsWith('/modo-facil')) return null

  const handleToggle = () => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY)
      const progress = saved ? JSON.parse(saved) : {}
      if (isCompleted) {
        delete progress[lessonKey]
      } else {
        progress[lessonKey] = true
      }
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
      setIsCompleted(!isCompleted)
    } catch { /* ignore */ }
  }

  return (
    <div style={{
      marginTop: '3rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid var(--nextra-border, #e5e7eb)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
    }}>
      <button
        onClick={handleToggle}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: 600,
          color: isCompleted ? '#fff' : '#059669',
          background: isCompleted ? '#059669' : 'transparent',
          border: `2px solid ${isCompleted ? '#059669' : '#d1fae5'}`,
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <span style={{ fontSize: '18px' }}>{isCompleted ? '✓' : '○'}</span>
        {isCompleted ? 'Completada' : 'Marcar como completada'}
      </button>

      <Link
        href="/curso-gratis"
        style={{
          fontSize: '13px',
          color: '#6366f1',
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        ← Ver tu progreso
      </Link>
    </div>
  )
}
