import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect, KeyboardEvent } from 'react'

// =============================================================================
// EJEMPLOS DE PROMPTS SUGERIDOS
// =============================================================================
const suggestedPrompts = [
  {
    id: 'landing',
    label: 'Landing Page',
    prompt: 'Crea una landing page moderna para una startup de IA con hero, features y CTA',
    icon: '🚀'
  },
  {
    id: 'pricing',
    label: 'Tabla de Precios',
    prompt: 'Diseña una sección de pricing con 3 planes: Free, Pro y Enterprise',
    icon: '💰'
  },
  {
    id: 'testimonials',
    label: 'Testimonios',
    prompt: 'Crea una sección de testimonios con cards animadas y avatares',
    icon: '💬'
  },
  {
    id: 'navbar',
    label: 'Navbar',
    prompt: 'Diseña un navbar responsive con logo, links y botón de login',
    icon: '📱'
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    prompt: 'Crea el layout de un dashboard con sidebar, stats y gráficos',
    icon: '📊'
  },
  {
    id: 'form',
    label: 'Formulario',
    prompt: 'Diseña un formulario de contacto con validación visual',
    icon: '📝'
  }
]

// =============================================================================
// CÓDIGO GENERADO SIMULADO (respuestas predefinidas realistas)
// =============================================================================
const generatedResponses: Record<string, { thinking: string; code: string; preview: 'landing' | 'pricing' | 'testimonials' | 'navbar' | 'dashboard' | 'form' | 'custom' }> = {
  landing: {
    thinking: 'Analizando la solicitud... Voy a crear una landing page moderna con:\n- Hero section con gradiente\n- Grid de features con iconos\n- CTA con botón principal',
    code: `// Hero Section
<section className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
  <nav className="flex items-center justify-between p-6">
    <span className="text-2xl font-bold text-white">NexaAI</span>
    <button className="px-4 py-2 bg-purple-600 rounded-lg">
      Empezar
    </button>
  </nav>

  <div className="max-w-4xl mx-auto text-center pt-20">
    <h1 className="text-5xl font-bold text-white mb-6">
      La IA que transforma tu negocio
    </h1>
    <p className="text-xl text-slate-400 mb-8">
      Automatiza procesos, genera contenido y escala tu empresa
    </p>
    <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-lg font-bold">
      Prueba Gratis →
    </button>
  </div>

  <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto mt-20">
    {['Automatización', 'Análisis', 'Escalabilidad'].map(f => (
      <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
        <h3 className="text-lg font-bold text-white">{f}</h3>
      </div>
    ))}
  </div>
</section>`,
    preview: 'landing'
  },
  pricing: {
    thinking: 'Entendido. Crearé una sección de pricing con:\n- 3 cards de planes\n- Plan Pro destacado\n- Lista de features por plan\n- Botones de acción',
    code: `// Pricing Section
<section className="py-20 bg-slate-950">
  <h2 className="text-3xl font-bold text-center text-white mb-12">
    Elige tu plan
  </h2>

  <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
    {/* Free */}
    <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
      <h3 className="text-xl font-bold text-white">Free</h3>
      <p className="text-4xl font-bold text-white mt-4">$0</p>
      <ul className="mt-6 space-y-3 text-slate-400">
        <li>✓ 100 requests/mes</li>
        <li>✓ API básica</li>
        <li>✗ Soporte prioritario</li>
      </ul>
      <button className="w-full mt-6 py-3 border border-slate-700 rounded-xl">
        Empezar gratis
      </button>
    </div>

    {/* Pro - Destacado */}
    <div className="p-6 bg-gradient-to-b from-purple-900/50 to-slate-900 rounded-2xl border-2 border-purple-500 relative">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 rounded-full text-xs">
        Popular
      </span>
      <h3 className="text-xl font-bold text-white">Pro</h3>
      <p className="text-4xl font-bold text-white mt-4">$29<span className="text-lg">/mes</span></p>
      <ul className="mt-6 space-y-3 text-slate-300">
        <li>✓ Requests ilimitados</li>
        <li>✓ API completa</li>
        <li>✓ Soporte 24/7</li>
      </ul>
      <button className="w-full mt-6 py-3 bg-purple-600 rounded-xl font-bold">
        Elegir Pro
      </button>
    </div>

    {/* Enterprise */}
    <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
      <h3 className="text-xl font-bold text-white">Enterprise</h3>
      <p className="text-4xl font-bold text-white mt-4">Custom</p>
      <ul className="mt-6 space-y-3 text-slate-400">
        <li>✓ Todo de Pro</li>
        <li>✓ SLA garantizado</li>
        <li>✓ Onboarding dedicado</li>
      </ul>
      <button className="w-full mt-6 py-3 border border-slate-700 rounded-xl">
        Contactar
      </button>
    </div>
  </div>
</section>`,
    preview: 'pricing'
  },
  testimonials: {
    thinking: 'Perfecto. Voy a crear una sección de testimonios con:\n- Cards con avatar y cita\n- Estrellas de rating\n- Layout en grid responsive',
    code: `// Testimonials Section
<section className="py-20 bg-slate-950">
  <h2 className="text-3xl font-bold text-center text-white mb-4">
    Lo que dicen nuestros clientes
  </h2>
  <p className="text-center text-slate-400 mb-12">
    +2,000 empresas confían en nosotros
  </p>

  <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
    {[
      { name: 'María García', role: 'CEO, TechCorp', text: 'Increíble herramienta. Nos ahorró meses de trabajo.' },
      { name: 'Carlos López', role: 'CTO, StartupAI', text: 'La mejor inversión que hemos hecho este año.' },
      { name: 'Ana Martín', role: 'Founder, DataFlow', text: 'Soporte excepcional y resultados inmediatos.' }
    ].map((t, i) => (
      <div key={i} className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
        <div className="flex text-yellow-400 mb-4">
          {'★★★★★'.split('').map((s, j) => <span key={j}>{s}</span>)}
        </div>
        <p className="text-slate-300 mb-6">"{t.text}"</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
          <div>
            <p className="font-bold text-white text-sm">{t.name}</p>
            <p className="text-slate-500 text-xs">{t.role}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>`,
    preview: 'testimonials'
  },
  navbar: {
    thinking: 'Voy a diseñar un navbar responsive con:\n- Logo a la izquierda\n- Links de navegación\n- Botón de login/CTA\n- Menú hamburguesa en móvil',
    code: `// Responsive Navbar
<nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-lg border-b border-slate-800 z-50">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500" />
        <span className="font-bold text-white">NexaAI</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-slate-400 hover:text-white transition">Producto</a>
        <a href="#" className="text-slate-400 hover:text-white transition">Precios</a>
        <a href="#" className="text-slate-400 hover:text-white transition">Docs</a>
        <a href="#" className="text-slate-400 hover:text-white transition">Blog</a>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-4">
        <button className="hidden md:block text-slate-400 hover:text-white">
          Login
        </button>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition">
          Empezar gratis
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden p-2 text-slate-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  </div>
</nav>`,
    preview: 'navbar'
  },
  dashboard: {
    thinking: 'Excelente. Crearé un layout de dashboard con:\n- Sidebar con navegación\n- Header con búsqueda\n- Grid de stats cards\n- Área para gráficos',
    code: `// Dashboard Layout
<div className="flex min-h-screen bg-slate-950">
  {/* Sidebar */}
  <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4">
    <div className="flex items-center gap-2 mb-8">
      <div className="w-8 h-8 rounded-lg bg-purple-600" />
      <span className="font-bold text-white">Dashboard</span>
    </div>

    <nav className="space-y-2">
      {['Overview', 'Analytics', 'Customers', 'Settings'].map((item, i) => (
        <a key={i} className={\`flex items-center gap-3 px-3 py-2 rounded-lg \${i === 0 ? 'bg-purple-600/20 text-purple-400' : 'text-slate-400 hover:bg-slate-800'}\`}>
          <span className="w-5 h-5 rounded bg-slate-700" />
          {item}
        </a>
      ))}
    </nav>
  </aside>

  {/* Main Content */}
  <main className="flex-1 p-6">
    <header className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-white">Overview</h1>
      <input className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white" placeholder="Buscar..." />
    </header>

    {/* Stats Grid */}
    <div className="grid grid-cols-4 gap-4 mb-8">
      {[
        { label: 'Usuarios', value: '12,543', change: '+12%' },
        { label: 'Revenue', value: '$45,231', change: '+8%' },
        { label: 'Orders', value: '1,234', change: '+23%' },
        { label: 'Conversion', value: '3.2%', change: '+2%' }
      ].map((s, i) => (
        <div key={i} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <p className="text-slate-400 text-sm">{s.label}</p>
          <p className="text-2xl font-bold text-white">{s.value}</p>
          <span className="text-emerald-400 text-sm">{s.change}</span>
        </div>
      ))}
    </div>

    {/* Chart Area */}
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 h-64 flex items-center justify-center">
      <span className="text-slate-600">📊 Área de gráficos</span>
    </div>
  </main>
</div>`,
    preview: 'dashboard'
  },
  form: {
    thinking: 'Voy a crear un formulario de contacto con:\n- Campos con labels flotantes\n- Validación visual\n- Botón de envío con estado',
    code: `// Contact Form
<section className="py-20 bg-slate-950">
  <div className="max-w-md mx-auto px-4">
    <h2 className="text-2xl font-bold text-white text-center mb-2">
      Contáctanos
    </h2>
    <p className="text-slate-400 text-center mb-8">
      Te respondemos en menos de 24h
    </p>

    <form className="space-y-4">
      <div>
        <label className="block text-sm text-slate-400 mb-1">Nombre</label>
        <input
          type="text"
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Email</label>
        <input
          type="email"
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Mensaje</label>
        <textarea
          rows={4}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition resize-none"
          placeholder="¿En qué podemos ayudarte?"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-bold text-white transition"
      >
        Enviar mensaje →
      </button>
    </form>
  </div>
</section>`,
    preview: 'form'
  }
}

// =============================================================================
// PREVIEW COMPONENTS
// =============================================================================
function PreviewLanding() {
  return (
    <div className="h-full bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950 p-4 overflow-auto">
      <nav className="flex items-center justify-between mb-8">
        <span className="text-lg font-bold text-white">NexaAI</span>
        <button className="px-3 py-1.5 bg-purple-600 rounded-lg text-xs">Empezar</button>
      </nav>
      <div className="text-center pt-8">
        <h1 className="text-2xl font-bold text-white mb-3">La IA que transforma tu negocio</h1>
        <p className="text-slate-400 text-sm mb-6">Automatiza procesos, genera contenido y escala tu empresa</p>
        <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-sm font-bold">Prueba Gratis →</button>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-12">
        {['Automatización', 'Análisis', 'Escalabilidad'].map(f => (
          <div key={f} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <span className="text-xs font-medium text-white">{f}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PreviewPricing() {
  return (
    <div className="h-full bg-slate-950 p-4 overflow-auto">
      <h2 className="text-lg font-bold text-center text-white mb-6">Elige tu plan</h2>
      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
          <h3 className="text-sm font-bold text-white">Free</h3>
          <p className="text-lg font-bold text-white">$0</p>
          <ul className="mt-2 space-y-1 text-[10px] text-slate-400">
            <li>✓ 100 req/mes</li>
            <li>✓ API básica</li>
          </ul>
        </div>
        <div className="p-3 bg-purple-900/30 rounded-xl border-2 border-purple-500 relative">
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-purple-600 rounded-full text-[8px]">Popular</span>
          <h3 className="text-sm font-bold text-white">Pro</h3>
          <p className="text-lg font-bold text-white">$29</p>
          <ul className="mt-2 space-y-1 text-[10px] text-slate-300">
            <li>✓ Ilimitado</li>
            <li>✓ Soporte 24/7</li>
          </ul>
        </div>
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
          <h3 className="text-sm font-bold text-white">Enterprise</h3>
          <p className="text-lg font-bold text-white">Custom</p>
          <ul className="mt-2 space-y-1 text-[10px] text-slate-400">
            <li>✓ Todo Pro</li>
            <li>✓ SLA</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function PreviewTestimonials() {
  return (
    <div className="h-full bg-slate-950 p-4 overflow-auto">
      <h2 className="text-lg font-bold text-center text-white mb-2">Lo que dicen nuestros clientes</h2>
      <p className="text-center text-slate-400 text-xs mb-4">+2,000 empresas confían en nosotros</p>
      <div className="space-y-3">
        {[
          { name: 'María G.', text: 'Increíble herramienta.' },
          { name: 'Carlos L.', text: 'La mejor inversión.' },
        ].map((t, i) => (
          <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex text-yellow-400 text-xs mb-2">★★★★★</div>
            <p className="text-slate-300 text-xs mb-2">"{t.text}"</p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
              <span className="text-xs font-bold text-white">{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PreviewNavbar() {
  return (
    <div className="h-full bg-slate-900">
      <nav className="bg-slate-950 border-b border-slate-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-blue-500" />
            <span className="font-bold text-white text-sm">NexaAI</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400">Producto</span>
            <span className="text-slate-400">Precios</span>
            <button className="px-3 py-1 bg-purple-600 rounded text-white">Empezar</button>
          </div>
        </div>
      </nav>
      <div className="p-4 text-center text-slate-600 text-sm">
        ↑ Navbar responsive con menú móvil
      </div>
    </div>
  )
}

function PreviewDashboard() {
  return (
    <div className="h-full flex bg-slate-950 overflow-hidden">
      <aside className="w-16 bg-slate-900 border-r border-slate-800 p-2">
        <div className="w-8 h-8 rounded bg-purple-600 mx-auto mb-4" />
        <div className="space-y-2">
          {[1,2,3,4].map(i => (
            <div key={i} className={`w-8 h-8 rounded mx-auto ${i === 1 ? 'bg-purple-600/30' : 'bg-slate-800'}`} />
          ))}
        </div>
      </aside>
      <main className="flex-1 p-3 overflow-auto">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { label: 'Usuarios', value: '12K' },
            { label: 'Revenue', value: '$45K' },
          ].map((s, i) => (
            <div key={i} className="p-2 bg-slate-900 rounded-lg border border-slate-800">
              <p className="text-slate-400 text-[10px]">{s.label}</p>
              <p className="text-lg font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 h-24 flex items-center justify-center">
          <span className="text-slate-600 text-xs">📊 Gráficos</span>
        </div>
      </main>
    </div>
  )
}

function PreviewForm() {
  return (
    <div className="h-full bg-slate-950 p-4 overflow-auto">
      <h2 className="text-lg font-bold text-white text-center mb-1">Contáctanos</h2>
      <p className="text-slate-400 text-xs text-center mb-4">Te respondemos en menos de 24h</p>
      <div className="space-y-3 max-w-xs mx-auto">
        <div>
          <label className="block text-[10px] text-slate-400 mb-1">Nombre</label>
          <div className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-500">Tu nombre</div>
        </div>
        <div>
          <label className="block text-[10px] text-slate-400 mb-1">Email</label>
          <div className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-500">tu@email.com</div>
        </div>
        <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-sm font-bold text-white">
          Enviar →
        </button>
      </div>
    </div>
  )
}

function PreviewEmpty() {
  return (
    <div className="h-full flex items-center justify-center bg-slate-950 text-slate-600">
      <div className="text-center">
        <div className="text-4xl mb-3">✨</div>
        <p className="text-sm">Tu diseño aparecerá aquí</p>
      </div>
    </div>
  )
}

// =============================================================================
// TERMINAL CON STREAMING SIMULADO
// =============================================================================
function AITerminal({
  onGenerate
}: {
  onGenerate: (type: keyof typeof generatedResponses | 'custom') => void
}) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<Array<{ type: 'user' | 'thinking' | 'code' | 'system'; content: string }>>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [streamedText, setStreamedText] = useState('')
  const [streamPhase, setStreamPhase] = useState<'thinking' | 'code' | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history, streamedText])

  // Simular streaming de texto
  const streamText = (text: string, phase: 'thinking' | 'code', onComplete: () => void) => {
    setStreamPhase(phase)
    let index = 0
    setStreamedText('')

    const interval = setInterval(() => {
      if (index < text.length) {
        const chunkSize = phase === 'thinking' ? 3 : 5
        setStreamedText(prev => prev + text.slice(index, index + chunkSize))
        index += chunkSize
      } else {
        clearInterval(interval)
        setHistory(prev => [...prev, { type: phase, content: text }])
        setStreamedText('')
        setStreamPhase(null)
        onComplete()
      }
    }, 20)
  }

  const handleSubmit = (prompt: string) => {
    if (!prompt.trim() || isGenerating) return

    setInput('')
    setHistory(prev => [...prev, { type: 'user', content: prompt }])
    setIsGenerating(true)

    // Determinar qué respuesta usar
    const promptLower = prompt.toLowerCase()
    let responseKey: keyof typeof generatedResponses | null = null

    if (promptLower.includes('landing') || promptLower.includes('hero')) {
      responseKey = 'landing'
    } else if (promptLower.includes('precio') || promptLower.includes('pricing') || promptLower.includes('plan')) {
      responseKey = 'pricing'
    } else if (promptLower.includes('testimonio') || promptLower.includes('review') || promptLower.includes('cliente')) {
      responseKey = 'testimonials'
    } else if (promptLower.includes('nav') || promptLower.includes('menu') || promptLower.includes('header')) {
      responseKey = 'navbar'
    } else if (promptLower.includes('dashboard') || promptLower.includes('panel') || promptLower.includes('admin')) {
      responseKey = 'dashboard'
    } else if (promptLower.includes('form') || promptLower.includes('contacto') || promptLower.includes('input')) {
      responseKey = 'form'
    }

    setTimeout(() => {
      if (responseKey && generatedResponses[responseKey]) {
        const response = generatedResponses[responseKey]

        // Primero streamear el "thinking"
        streamText(response.thinking, 'thinking', () => {
          // Luego streamear el código
          setTimeout(() => {
            streamText(response.code, 'code', () => {
              setIsGenerating(false)
              onGenerate(responseKey!)
            })
          }, 500)
        })
      } else {
        // Respuesta genérica para prompts no reconocidos
        const genericThinking = '🤔 Analizando tu solicitud...\n\nPrueba con uno de estos prompts:\n• "landing page"\n• "pricing"\n• "testimonios"\n• "navbar"\n• "dashboard"\n• "formulario"'
        streamText(genericThinking, 'thinking', () => {
          setIsGenerating(false)
        })
      }
    }, 300)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(input)
    }
  }

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt)
    inputRef.current?.focus()
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-slate-400 text-sm ml-2 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Claude AI Playground
        </span>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto bg-slate-950"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Welcome Message */}
        {history.length === 0 && !streamPhase && (
          <div className="mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/30 mb-4">
              <h3 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                <span>✨</span> AI Playground
              </h3>
              <p className="text-slate-300 text-xs mb-3">
                Escribe lo que quieres crear y mira cómo Claude genera el código en tiempo real.
              </p>
              <p className="text-slate-500 text-xs">
                Prueba: "Crea una landing page para una startup de IA"
              </p>
            </div>

            {/* Suggested Prompts */}
            <p className="text-slate-500 text-xs mb-2">Ejemplos rápidos:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestedPrompts.slice(0, 4).map(s => (
                <button
                  key={s.id}
                  onClick={() => handleSuggestionClick(s.prompt)}
                  className="flex items-center gap-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left text-xs transition-colors border border-slate-700 hover:border-purple-500"
                >
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-slate-300">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        {history.map((item, i) => (
          <div key={i} className="mb-4">
            {item.type === 'user' && (
              <div className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">→</span>
                <span className="text-white">{item.content}</span>
              </div>
            )}
            {item.type === 'thinking' && (
              <div className="mt-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <span className="text-slate-400 whitespace-pre-wrap">{item.content}</span>
              </div>
            )}
            {item.type === 'code' && (
              <div className="mt-2">
                <div className="flex items-center gap-2 text-xs text-emerald-400 mb-1">
                  <span>✓</span> Código generado
                </div>
                <pre className="p-3 bg-slate-800 rounded-lg overflow-x-auto text-xs">
                  <code className="text-slate-300">{item.content}</code>
                </pre>
              </div>
            )}
          </div>
        ))}

        {/* Streaming Text */}
        {streamPhase && (
          <div className="mb-4">
            {streamPhase === 'thinking' && (
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <span className="text-slate-400 whitespace-pre-wrap">{streamedText}</span>
                <span className="inline-block w-2 h-4 bg-purple-500 animate-pulse ml-1" />
              </div>
            )}
            {streamPhase === 'code' && (
              <div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 mb-1">
                  <span className="animate-spin">⚡</span> Generando código...
                </div>
                <pre className="p-3 bg-slate-800 rounded-lg overflow-x-auto text-xs">
                  <code className="text-slate-300">{streamedText}</code>
                  <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse" />
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Input */}
        {!isGenerating && (
          <div className="flex items-center">
            <span className="text-purple-400">❯ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe lo que quieres crear..."
              className="flex-1 bg-transparent outline-none text-white ml-2 placeholder:text-slate-600"
              autoFocus
            />
          </div>
        )}

        {isGenerating && !streamPhase && (
          <div className="flex items-center gap-2 text-slate-400">
            <span className="animate-spin">⚡</span>
            <span>Pensando...</span>
          </div>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// PÁGINA PRINCIPAL
// =============================================================================
export default function DemoVisualPage() {
  const [currentPreview, setCurrentPreview] = useState<'landing' | 'pricing' | 'testimonials' | 'navbar' | 'dashboard' | 'form' | 'custom' | null>(null)

  const handleGenerate = (type: keyof typeof generatedResponses | 'custom') => {
    if (type !== 'custom' && generatedResponses[type]) {
      setCurrentPreview(generatedResponses[type].preview)
    }
  }

  const renderPreview = () => {
    switch (currentPreview) {
      case 'landing': return <PreviewLanding />
      case 'pricing': return <PreviewPricing />
      case 'testimonials': return <PreviewTestimonials />
      case 'navbar': return <PreviewNavbar />
      case 'dashboard': return <PreviewDashboard />
      case 'form': return <PreviewForm />
      default: return <PreviewEmpty />
    }
  }

  return (
    <>
      <Head>
        <title>AI Playground | Genera código con IA</title>
        <meta name="description" content="Escribe prompts y mira cómo Claude genera código React/Tailwind en tiempo real" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/plataforma/demo" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">a</span>
                  </div>
                </Link>
                <div>
                  <h1 className="font-bold text-sm flex items-center gap-2">
                    AI Playground
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs">Demo</span>
                  </h1>
                  <p className="text-xs text-slate-400">Genera código React + Tailwind con IA</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="/plataforma/demo"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  ← Volver
                </Link>
                <Link
                  href="/plataforma"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-sm font-medium"
                >
                  Ver Curso - $147
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="text-sm text-slate-300">
                  <strong>Demo interactiva:</strong> Escribe un prompt y observa cómo la IA genera código en streaming.
                </p>
                <p className="text-xs text-slate-500">
                  En el curso completo aprenderás a crear tu propia plataforma con esta funcionalidad.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - 2 Columns */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
            {/* Terminal */}
            <AITerminal onGenerate={handleGenerate} />

            {/* Preview */}
            <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400 font-mono">
                    Preview en vivo
                  </div>
                </div>
                {currentPreview && (
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                    ✓ Renderizado
                  </span>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                {renderPreview()}
              </div>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="mt-6">
            <p className="text-sm text-slate-400 mb-3">Prueba estos prompts:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    const terminal = document.querySelector('input[placeholder*="Describe"]') as HTMLInputElement
                    if (terminal) {
                      terminal.value = s.prompt
                      terminal.dispatchEvent(new Event('input', { bubbles: true }))
                      terminal.focus()
                    }
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors border border-slate-700 hover:border-purple-500"
                >
                  <span>{s.icon}</span>
                  <span className="text-slate-300">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </main>

        {/* Bottom CTA */}
        <section className="border-t border-slate-800 bg-gradient-to-r from-purple-900/20 to-blue-900/20 py-12 mt-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-3">¿Quieres crear tu propia plataforma con IA?</h3>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
              Aprende a construir este sistema completo: terminal interactivo,
              streaming de respuestas, y tutor IA personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plataforma"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-bold"
              >
                Ver Curso Completo - $147
              </Link>
              <Link
                href="/plataforma/demo"
                className="px-8 py-3 border border-slate-700 hover:border-purple-500 rounded-xl font-medium"
              >
                Ver otras demos
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
