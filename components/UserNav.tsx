import { useState, useEffect } from 'react'
import Link from 'next/link'

interface UserNavProps {
  className?: string
}

export default function UserNav({ className = '' }: UserNavProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/session')
        const data = await res.json()
        setIsLoggedIn(data.authenticated === true)
        setUserEmail(data.user?.email || null)
      } catch (error) {
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  if (loading) {
    return (
      <div className={`w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse ${className}`} />
    )
  }

  if (isLoggedIn) {
    return (
      <Link
        href="/cuenta"
        className={`flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${className}`}
        title={userEmail || 'Mi cuenta'}
      >
        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold">
            {userEmail ? userEmail.charAt(0).toUpperCase() : '?'}
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href="/acceso"
      className={`text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${className}`}
      title="Iniciar sesión"
    >
      <span className="material-symbols-outlined text-[22px] sm:text-[24px]">login</span>
    </Link>
  )
}
