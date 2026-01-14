import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function CursoPremiumPage() {
  const [licenseKey, setLicenseKey] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const validateLicense = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/validate-license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ licenseKey }),
      })

      const data = await response.json()

      if (data.valid) {
        setIsValid(true)
        // Guardar en localStorage para no pedir cada vez
        localStorage.setItem('course_license', licenseKey)
      } else {
        setError('Licencia no valida. Verifica que la hayas copiado correctamente.')
      }
    } catch (err: any) {
      setError(err?.message || 'Error al validar la licencia. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  // Verificar si ya hay licencia guardada
  React.useEffect(() => {
    const savedLicense = localStorage.getItem('course_license')
    if (savedLicense) {
      setLicenseKey(savedLicense)
      // Validar automaticamente
      fetch('/api/validate-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: savedLicense }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.valid) setIsValid(true)
        })
        .catch(() => {})
    }
  }, [])

  return (
    <>
      <Head>
        <title>Area de Miembros - Claude Code Course Builder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        body { font-family: 'Inter', sans-serif; background: #f8fafc; }
      `}</style>

      <div className="min-h-screen bg-slate-50">
        {/* Nav */}
        <nav className="border-b border-slate-200 bg-white">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="font-semibold text-slate-900">
              Claude Code en Espanol
            </Link>
            {isValid && (
              <button
                onClick={() => {
                  localStorage.removeItem('course_license')
                  setIsValid(false)
                  setLicenseKey('')
                }}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Cerrar sesion
              </button>
            )}
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-12">
          {!isValid ? (
            /* Formulario de licencia */
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl text-amber-600">lock</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Area de Miembros</h1>
                <p className="text-slate-600">Ingresa tu licencia para acceder al curso</p>
              </div>

              <form onSubmit={validateLicense} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Licencia
                  </label>
                  <input
                    type="text"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Validando...' : 'Acceder al curso'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                No tienes licencia?{' '}
                <Link href="/premium" className="text-amber-600 hover:underline">
                  Comprar curso
                </Link>
              </p>
            </div>
          ) : (
            /* Contenido del curso */
            <div>
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Claude Code Course Builder</h1>
                <p className="text-slate-600">Bienvenido al curso. Aqui tienes todo el contenido.</p>
              </div>

              {/* Descarga */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-amber-600">download</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">Descargar materiales</h3>
                    <p className="text-sm text-slate-500">ZIP con comandos, templates y ejemplos</p>
                  </div>
                  <a
                    href="https://github.com/Josusanz/claude-code-course-builder/archive/refs/heads/main.zip"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Descargar ZIP
                  </a>
                </div>
              </div>

              {/* Modulos */}
              <h2 className="text-xl font-bold text-slate-900 mb-4">Los 6 Modulos</h2>
              <div className="space-y-3 mb-12">
                {[
                  { num: '01', title: 'Arquitectura de comandos slash', desc: 'Disena lecciones interactivas con comandos' },
                  { num: '02', title: 'CLAUDE.md efectivo', desc: 'Configura el contexto perfecto para tu curso' },
                  { num: '03', title: 'Sistema de progreso', desc: 'Tracking del avance del alumno' },
                  { num: '04', title: 'Web automatica con Nextra', desc: 'Genera documentacion profesional' },
                  { num: '05', title: 'Distribucion con GitHub', desc: 'Releases y control de versiones' },
                  { num: '06', title: 'Monetizacion', desc: 'Vende tu curso con LemonSqueezy' },
                ].map((mod, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-amber-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400 font-mono text-sm">{mod.num}</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">{mod.title}</h3>
                        <p className="text-sm text-slate-500">{mod.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instrucciones */}
              <div className="bg-slate-100 rounded-2xl p-6">
                <h2 className="font-bold text-slate-900 mb-4">Como empezar</h2>
                <ol className="space-y-3 text-slate-700">
                  <li className="flex gap-3">
                    <span className="font-bold text-amber-600">1.</span>
                    Descarga el ZIP y descomprimelo en una carpeta
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-amber-600">2.</span>
                    Abre la terminal en esa carpeta
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-amber-600">3.</span>
                    Ejecuta <code className="bg-slate-200 px-2 py-0.5 rounded">claude</code>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-amber-600">4.</span>
                    Escribe <code className="bg-slate-200 px-2 py-0.5 rounded">/modulo-1</code> para comenzar
                  </li>
                </ol>
              </div>

              {/* Soporte */}
              <div className="mt-8 text-center text-sm text-slate-500">
                Dudas? Escribe a <a href="mailto:josu@yenze.io" className="text-amber-600 hover:underline">josu@yenze.io</a>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
