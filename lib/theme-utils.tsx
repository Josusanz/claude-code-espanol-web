import { useState, useEffect } from 'react'

export interface Theme {
  bg: string
  bgSecondary: string
  bgTertiary: string
  text: string
  textSecondary: string
  textTertiary: string
  accent: string
  accentHover: string
  border: string
  borderHover: string
  glow: string
  glowStrong: string
  navBg: string
  cardHover: string
}

const lightTheme: Theme = {
  bg: '#fafbfc',
  bgSecondary: '#ffffff',
  bgTertiary: '#f1f5f9',
  text: '#1a1a2e',
  textSecondary: '#4a5568',
  textTertiary: '#718096',
  accent: '#5e6ad2',
  accentHover: '#7c85e3',
  border: 'rgba(0,0,0,0.06)',
  borderHover: 'rgba(0,0,0,0.12)',
  glow: 'rgba(94,106,210,0.04)',
  glowStrong: 'rgba(94,106,210,0.08)',
  navBg: 'rgba(255,255,255,0.9)',
  cardHover: '#f8fafc',
}

const darkTheme: Theme = {
  bg: '#08090a',
  bgSecondary: '#0f1011',
  bgTertiary: '#161718',
  text: '#f5f5f5',
  textSecondary: '#a1a1a1',
  textTertiary: '#6b6b6b',
  accent: '#5e6ad2',
  accentHover: '#7c85e3',
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.15)',
  glow: 'rgba(94,106,210,0.08)',
  glowStrong: 'rgba(94,106,210,0.15)',
  navBg: 'rgba(8,9,10,0.8)',
  cardHover: '#161718',
}

const STORAGE_KEY = 'theme-curso'

export function useTheme() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setIsDark(saved === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
  }

  const t: Theme = isDark ? darkTheme : lightTheme

  return { isDark, toggleTheme, t, mounted }
}

export function ThemeToggleButton({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        border: '1px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        background: isDark ? '#161718' : '#f8fafc',
        color: isDark ? '#a1a1a1' : '#64748b',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        transition: 'all 0.2s',
        flexShrink: 0,
      }}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}

// Global CSS for theme animations
export const THEME_GLOBAL_CSS = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.6s ease forwards;
  }
  .delay-1 { animation-delay: 0.1s; opacity: 0; }
  .delay-2 { animation-delay: 0.2s; opacity: 0; }
  .delay-3 { animation-delay: 0.3s; opacity: 0; }
  .delay-4 { animation-delay: 0.4s; opacity: 0; }
  html { scroll-behavior: smooth; }
  ::selection { background: rgba(94, 106, 210, 0.3); }
`
