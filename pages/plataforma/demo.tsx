import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Tipos de curso disponibles
const courseTypes = [
  {
    id: 'visual',
    icon: '🎨',
    title: 'Visual Builder',
    subtitle: 'Construye interfaces paso a paso',
    description: 'Ideal para cursos de diseño web, landing pages, e-commerce y desarrollo frontend. Los estudiantes escriben comandos y ven el resultado en tiempo real.',
    features: [
      'Preview en vivo mientras construyes',
      'Aprende diseño de forma práctica',
      'Resultados visuales inmediatos',
      'Perfecto para creativos'
    ],
    examples: ['Landing Pages', 'Portfolios', 'E-commerce', 'Web3 Apps'],
    color: 'purple',
    gradient: 'from-purple-500 to-blue-500',
    bgGradient: 'from-purple-500/10 to-blue-500/10',
    borderColor: 'border-purple-500/30',
    hoverBorder: 'hover:border-purple-500/60',
    textColor: 'text-purple-400',
    href: '/plataforma/demo-visual'
  },
  {
    id: 'terminal',
    icon: '💻',
    title: 'Terminal Interactivo',
    subtitle: 'Aprende comandos con tutor IA',
    description: 'Perfecto para cursos técnicos de programación, DevOps, CLI y backend. Terminal simulado con un tutor IA que te guía y responde tus dudas.',
    features: [
      'Terminal realista interactivo',
      'Tutor IA que responde dudas',
      'Teoría integrada en cada paso',
      'Validación de comandos'
    ],
    examples: ['Docker', 'Git', 'Linux', 'Kubernetes', 'AWS CLI'],
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    bgGradient: 'from-cyan-500/10 to-blue-500/10',
    borderColor: 'border-cyan-500/30',
    hoverBorder: 'hover:border-cyan-500/60',
    textColor: 'text-cyan-400',
    href: '/plataforma/demo-terminal'
  },
  {
    id: 'traditional',
    icon: '📚',
    title: 'Curso Tradicional',
    subtitle: 'Videos, texto y quizzes',
    description: 'El formato clásico mejorado. Ideal para cualquier tema: yoga, cocina, música, idiomas. Videos, contenido rico y quizzes interactivos.',
    features: [
      'Reproductor de video integrado',
      'Contenido multimedia rico',
      'Quizzes con explicaciones',
      'Recursos descargables'
    ],
    examples: ['Yoga', 'Cocina', 'Música', 'Fotografía', 'Marketing'],
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/60',
    textColor: 'text-amber-400',
    href: '/plataforma/demo-tradicional'
  }
]

export default function DemoSelector() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <>
      <Head>
        <title>Demos Interactivas | Plataforma de Cursos con IA</title>
        <meta name="description" content="Explora los 3 tipos de cursos interactivos: Visual Builder, Terminal con IA, y Cursos Tradicionales mejorados." />
      </Head>

      <div className="min-h-screen bg-[#0a0a0f] text-white">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/plataforma" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-lg">
                  📚
                </div>
                <span className="font-semibold">Plataforma de Cursos</span>
              </Link>

              <Link
                href="/plataforma"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Volver
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-2xl">✨</span>
              <span className="text-sm text-gray-300">3 formatos de curso disponibles</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Explora las{' '}
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
                Demos Interactivas
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Descubre los 3 tipos de cursos que puedes crear. Cada formato está diseñado
              para diferentes tipos de contenido y estilos de aprendizaje.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Visual para creativos
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                Terminal para técnicos
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Tradicional para todo
              </span>
            </div>
          </div>
        </section>

        {/* Course Type Cards */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {courseTypes.map((type) => (
                <Link
                  key={type.id}
                  href={type.href}
                  className={`group relative rounded-2xl border ${type.borderColor} ${type.hoverBorder} bg-gradient-to-b ${type.bgGradient} to-transparent p-6 lg:p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
                  onMouseEnter={() => setHoveredCard(type.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                    {type.icon}
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">
                    {type.title}
                  </h2>
                  <p className={`${type.textColor} font-medium mb-4`}>
                    {type.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {type.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {type.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <svg className={`w-4 h-4 ${type.textColor} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Examples */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Ejemplos de uso:</p>
                    <div className="flex flex-wrap gap-2">
                      {type.examples.map((example, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className={`flex items-center justify-between pt-4 border-t border-white/10`}>
                    <span className={`text-sm font-medium ${type.textColor}`}>
                      Ver demo
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${type.gradient} flex items-center justify-center group-hover:translate-x-1 transition-transform`}>
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover Effect Glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${type.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">
              Compara los formatos
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Caracteristica</th>
                    <th className="text-center py-4 px-4 text-purple-400 font-medium">Visual Builder</th>
                    <th className="text-center py-4 px-4 text-cyan-400 font-medium">Terminal</th>
                    <th className="text-center py-4 px-4 text-amber-400 font-medium">Tradicional</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">Preview en vivo</td>
                    <td className="py-4 px-4 text-center text-green-400">✓</td>
                    <td className="py-4 px-4 text-center text-gray-600">—</td>
                    <td className="py-4 px-4 text-center text-gray-600">—</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">Terminal interactivo</td>
                    <td className="py-4 px-4 text-center text-green-400">✓</td>
                    <td className="py-4 px-4 text-center text-green-400">✓</td>
                    <td className="py-4 px-4 text-center text-gray-600">—</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">Tutor IA</td>
                    <td className="py-4 px-4 text-center text-green-400">✓</td>
                    <td className="py-4 px-4 text-center text-green-400">✓</td>
                    <td className="py-4 px-4 text-center text-gray-600">—</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">Videos</td>
                    <td className="py-4 px-4 text-center text-gray-600">—</td>
                    <td className="py-4 px-4 text-center text-yellow-400">Opcional</td>
                    <td className="py-4 px-4 text-center text-green-400">✓</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">Quizzes</td>
                    <td className="py-4 px-4 text-center text-gray-600">—</td>
                    <td className="py-4 px-4 text-center text-gray-600">—</td>
                    <td className="py-4 px-4 text-center text-green-400">✓</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">Contenido multimedia</td>
                    <td className="py-4 px-4 text-center text-yellow-400">Código</td>
                    <td className="py-4 px-4 text-center text-yellow-400">Texto</td>
                    <td className="py-4 px-4 text-center text-green-400">Todo</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-300">Ideal para</td>
                    <td className="py-4 px-4 text-center text-purple-300 text-xs">Frontend, Diseño</td>
                    <td className="py-4 px-4 text-center text-cyan-300 text-xs">DevOps, CLI</td>
                    <td className="py-4 px-4 text-center text-amber-300 text-xs">Todo lo demás</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-4">
                ¿Listo para crear tu curso?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Elige el formato que mejor se adapte a tu contenido y empieza a crear
                experiencias de aprendizaje inolvidables.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/plataforma"
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Empezar ahora
                </Link>
                <Link
                  href="/plataforma#pricing"
                  className="px-8 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
                >
                  Ver precios
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 aprende.software — Plataforma de Cursos con IA
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/plataforma" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <Link href="/docs" className="hover:text-white transition-colors">
                Documentación
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
