import Link from 'next/link'
import { usePrecursoProgress, useTheme, PRECURSO_SECTIONS } from '../pages/precurso/index'

const themes = {
  light: {
    bg: 'rgba(255, 255, 255, 0.95)',
    text: '#1e293b',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    border: '#e2e8f0',
    accent: '#6366f1',
    success: '#22c55e',
  },
  dark: {
    bg: 'rgba(15, 23, 42, 0.95)',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    border: '#334155',
    accent: '#818cf8',
    success: '#4ade80',
  }
}

export default function PrecursoProgressBar() {
  const { completedCount, totalCount, progress } = usePrecursoProgress()
  const { theme } = useTheme()
  const t = themes[theme]

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: t.bg,
      backdropFilter: 'blur(10px)',
      borderTop: `1px solid ${t.border}`,
      padding: '12px 24px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px'
    }}>
      {/* Progress info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '14px', color: t.textSecondary }}>
          Precurso:
        </span>
        <div style={{
          width: '200px',
          height: '8px',
          background: t.border,
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: progress === 100 ? t.success : t.accent,
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <span style={{
          fontSize: '14px',
          fontWeight: 600,
          color: progress === 100 ? t.success : t.text
        }}>
          {completedCount}/{totalCount}
        </span>
      </div>

      {/* Quick links */}
      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        <Link href="/precurso" style={{
          padding: '8px 16px',
          background: 'transparent',
          border: `1px solid ${t.border}`,
          borderRadius: '8px',
          color: t.textSecondary,
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 500
        }}>
          📋 Ver todo
        </Link>
        {progress === 100 && (
          <Link href="/empezar/introduccion" style={{
            padding: '8px 16px',
            background: t.success,
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 600
          }}>
            🚀 Empezar curso
          </Link>
        )}
      </div>
    </div>
  )
}
