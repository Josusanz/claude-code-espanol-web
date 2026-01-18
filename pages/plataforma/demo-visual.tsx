import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect, KeyboardEvent, useCallback } from 'react'

// =============================================================================
// TIPOS
// =============================================================================
interface Step {
  id: string
  title: string
  description: string
  action: string // Lo que el usuario debe hacer
  hint: string // Texto a mostrar en el terminal
}

interface DemoData {
  title: string
  description: string
  steps: Step[]
}

// =============================================================================
// DATOS DE LA DEMO - Pasos simples con preview visual
// =============================================================================
const demoSteps: Step[] = [
  {
    id: 'step-1',
    title: 'Crear la estructura base',
    description: 'Empezamos con el fondo oscuro y el contenedor principal de nuestra landing.',
    action: 'Escribe: crear estructura',
    hint: 'crear estructura'
  },
  {
    id: 'step-2',
    title: 'Añadir el título principal',
    description: 'Añadimos un título con gradiente que capture la atención del visitante.',
    action: 'Escribe: añadir titulo',
    hint: 'añadir titulo'
  },
  {
    id: 'step-3',
    title: 'Añadir descripción',
    description: 'Una descripción corta que explique el propósito de la landing.',
    action: 'Escribe: añadir descripcion',
    hint: 'añadir descripcion'
  },
  {
    id: 'step-4',
    title: 'Botón Connect Wallet',
    description: 'El botón principal que conectará con MetaMask cuando el usuario lo pulse.',
    action: 'Escribe: añadir boton',
    hint: 'añadir boton'
  },
  {
    id: 'step-5',
    title: 'Sección exclusiva para holders',
    description: 'Contenido bloqueado que solo verán los usuarios con el NFT.',
    action: 'Escribe: añadir seccion nft',
    hint: 'añadir seccion nft'
  },
  {
    id: 'step-6',
    title: 'Estado conectado',
    description: 'Simulamos la conexión de wallet para ver cómo se desbloquea el contenido.',
    action: 'Escribe: conectar wallet',
    hint: 'conectar wallet'
  }
]

const totalSteps = demoSteps.length

// =============================================================================
// PREVIEW DE LA LANDING WEB3
// =============================================================================
function LandingPreview({ currentStep, isConnected }: { currentStep: number; isConnected: boolean }) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden h-full flex flex-col">
      {/* Browser Chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 mx-2">
          <div className="bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400 font-mono">
            localhost:3000
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 bg-slate-950 overflow-hidden relative">
        {currentStep === 0 && (
          <div className="h-full flex items-center justify-center text-slate-600">
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <p className="text-sm">Tu landing aparecerá aquí</p>
            </div>
          </div>
        )}

        {currentStep >= 1 && (
          <div className="h-full bg-gradient-to-b from-slate-950 to-slate-900 p-6 transition-all duration-500">
            {/* Container with animation */}
            <div className={`max-w-md mx-auto text-center transition-all duration-500 ${currentStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

              {/* Title - Step 2 */}
              {currentStep >= 2 && (
                <h1 className="text-2xl md:text-3xl font-extrabold mb-4 transition-all duration-500">
                  <span className="block text-white">Bienvenido al</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Futuro Descentralizado
                  </span>
                </h1>
              )}

              {/* Description - Step 3 */}
              {currentStep >= 3 && (
                <p className="text-slate-400 text-sm mb-6 transition-all duration-500">
                  Conecta tu wallet para acceder a contenido exclusivo para holders
                </p>
              )}

              {/* Connect Button - Step 4 */}
              {currentStep >= 4 && (
                <div className="mb-8 transition-all duration-500">
                  {!isConnected ? (
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center gap-2 mx-auto">
                      <svg className="w-5 h-5" viewBox="0 0 35 33" fill="currentColor">
                        <path d="M32.9582 1l-13.1341 9.7183 2.4424-5.7836L32.9582 1zM2.66296 1l13.0167 9.809-2.3245-5.8743L2.66296 1z" />
                      </svg>
                      Conectar MetaMask
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <span className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-xs font-mono">
                        0x7a3d...8f2e
                      </span>
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              )}

              {/* NFT Gate Section - Step 5 */}
              {currentStep >= 5 && (
                <div className="transition-all duration-500">
                  {!isConnected ? (
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                      <div className="flex items-center justify-center gap-2 text-slate-500 mb-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="font-medium text-sm">Contenido Bloqueado</span>
                      </div>
                      <p className="text-xs text-slate-600">Conecta tu wallet para verificar NFT</p>
                    </div>
                  ) : (
                    <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/30">
                      <div className="flex items-center justify-center gap-2 text-emerald-400 mb-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-xs font-medium">Holder Verificado</span>
                      </div>
                      <h3 className="font-bold text-white text-sm mb-2">🎉 Contenido Exclusivo</h3>
                      <ul className="text-xs text-slate-300 space-y-1">
                        <li>✓ Discord privado</li>
                        <li>✓ Airdrops exclusivos</li>
                        <li>✓ Eventos VIP</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step Indicator Overlay */}
        {currentStep > 0 && currentStep < 6 && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-purple-600/80 rounded-md text-xs font-medium">
            Paso {currentStep}/6
          </div>
        )}

        {/* Completion Overlay */}
        {currentStep >= 6 && isConnected && (
          <div className="absolute bottom-3 left-3 right-3 p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-center">
            <span className="text-emerald-400 text-xs font-medium">✓ Landing Web3 completada</span>
          </div>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// TERMINAL SIMPLIFICADO
// =============================================================================
function SimpleTerminal({
  step,
  onSuccess,
  isComplete
}: {
  step: Step
  onSuccess: () => void
  isComplete: boolean
}) {
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'success'; content: string }>>([])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setHistory([])
    setInput('')
    inputRef.current?.focus()
  }, [step.id])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const processCommand = (cmd: string) => {
    if (!cmd.trim() || isProcessing) return

    setInput('')
    setHistory(prev => [...prev, { type: 'input', content: cmd }])
    setIsProcessing(true)

    setTimeout(() => {
      const normalizedCmd = cmd.toLowerCase().trim()
      const normalizedHint = step.hint.toLowerCase().trim()

      if (normalizedCmd === normalizedHint || normalizedCmd.includes(normalizedHint.split(' ')[0])) {
        setHistory(prev => [
          ...prev,
          { type: 'output', content: `✓ ${step.title}` },
          { type: 'success', content: '¡Hecho! Mira el preview →' }
        ])
        setTimeout(onSuccess, 800)
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'output', content: `Escribe: ${step.hint}` }
        ])
      }
      setIsProcessing(false)
    }, 200)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input)
    }
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-slate-400 text-sm ml-2 font-mono">Terminal</span>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto bg-slate-950"
        onClick={() => inputRef.current?.focus()}
      >
        {!isComplete && history.length === 0 && (
          <div className="mb-4">
            <div className="p-3 bg-purple-600/10 rounded-lg border border-purple-500/30 mb-4">
              <h4 className="text-purple-400 font-semibold text-sm mb-1">{step.title}</h4>
              <p className="text-slate-400 text-xs">{step.description}</p>
            </div>
            <button
              onClick={() => {
                setInput(step.hint)
                inputRef.current?.focus()
              }}
              className="font-mono text-emerald-400 bg-slate-800 px-4 py-2 rounded-lg border border-slate-600 hover:border-purple-500 transition-colors text-sm w-full text-left"
            >
              {step.hint}
            </button>
            <p className="text-slate-600 text-xs mt-2 text-center">Click para autocompletar</p>
          </div>
        )}

        {history.map((item, i) => (
          <div key={i} className={`mb-2 ${
            item.type === 'input' ? 'text-white' :
            item.type === 'success' ? 'text-emerald-400 bg-emerald-500/10 p-2 rounded' :
            'text-slate-400'
          }`}>
            {item.type === 'input' && <span className="text-purple-400">❯ </span>}
            <span>{item.content}</span>
          </div>
        ))}

        {!isComplete && (
          <div className="flex items-center">
            <span className="text-purple-400">❯ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white ml-1 font-mono"
              disabled={isProcessing}
              autoFocus
            />
          </div>
        )}

        {isComplete && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-lg font-bold text-white mb-2">¡Demo completada!</h3>
            <p className="text-slate-400 text-sm mb-6">Has creado una landing Web3 con MetaMask</p>
            <Link
              href="/plataforma/comprar"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-bold text-sm"
            >
              Comprar Curso Completo - $147
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// PANEL DE PASOS
// =============================================================================
function StepsPanel({
  steps,
  currentStepIndex,
  completedSteps,
  onSelectStep
}: {
  steps: Step[]
  currentStepIndex: number
  completedSteps: Set<string>
  onSelectStep: (index: number) => void
}) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      <div className="p-3 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-slate-700">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <span>🎯</span> Construye tu Landing
        </h3>
        <p className="text-xs text-slate-400 mt-1">{completedSteps.size}/{steps.length} pasos</p>
      </div>

      <div className="p-2">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex
          const isCompleted = completedSteps.has(step.id)
          const isLocked = index > currentStepIndex && !isCompleted

          return (
            <button
              key={step.id}
              onClick={() => !isLocked && onSelectStep(index)}
              disabled={isLocked}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-3 mb-1 ${
                isActive
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                  : isCompleted
                    ? 'text-emerald-400 hover:bg-slate-800'
                    : isLocked
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isCompleted
                  ? 'bg-emerald-500 text-white'
                  : isActive
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-slate-400'
              }`}>
                {isCompleted ? '✓' : index + 1}
              </span>
              <span className="flex-1">{step.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// =============================================================================
// PÁGINA PRINCIPAL
// =============================================================================
export default function DemoPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const currentStep = demoSteps[currentStepIndex]
  const isComplete = currentStepIndex >= demoSteps.length

  const handleSuccess = useCallback(() => {
    const stepId = demoSteps[currentStepIndex].id
    setCompletedSteps(prev => new Set([...prev, stepId]))

    // Si es el paso de conectar wallet, actualizar estado
    if (currentStepIndex === 5) {
      setIsWalletConnected(true)
    }

    if (currentStepIndex < demoSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      setCurrentStepIndex(demoSteps.length) // Marca como completado
    }
  }, [currentStepIndex])

  const handleSelectStep = (index: number) => {
    if (index <= currentStepIndex || completedSteps.has(demoSteps[index].id)) {
      setCurrentStepIndex(index)
    }
  }

  // El preview muestra hasta el paso actual completado
  const previewStep = Math.min(completedSteps.size, demoSteps.length)

  return (
    <>
      <Head>
        <title>Demo: Crea tu Landing Web3 | aprende.software</title>
        <meta name="description" content="Construye una landing page Web3 con MetaMask paso a paso y mira el resultado en tiempo real" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/plataforma" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">a</span>
                  </div>
                </Link>
                <div>
                  <h1 className="font-bold text-sm">Crea tu Landing Web3</h1>
                  <p className="text-xs text-slate-400">Demo Interactiva · Mira el resultado en vivo</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-medium">
                    {completedSteps.size}/{totalSteps} pasos
                  </span>
                </div>
                <Link
                  href="/plataforma/comprar"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-sm font-medium"
                >
                  Comprar - $147
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Intro Banner */}
        {currentStepIndex === 0 && completedSteps.size === 0 && (
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-purple-500/30">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl">🚀</div>
                <div>
                  <h2 className="font-bold">Construye una landing Web3 en 6 pasos</h2>
                  <p className="text-sm text-slate-400">Escribe comandos simples y mira cómo se construye tu landing en tiempo real</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - 3 Columns */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-[240px_1fr_1fr] gap-4">
            {/* Steps Panel */}
            <div className="hidden lg:block">
              <StepsPanel
                steps={demoSteps}
                currentStepIndex={currentStepIndex}
                completedSteps={completedSteps}
                onSelectStep={handleSelectStep}
              />

              {/* What you'll learn */}
              <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <span>📚</span> En el curso completo
                </h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">→</span>
                    Crear la plataforma de cursos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">→</span>
                    Integrar Claude API
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">→</span>
                    Sistema de pagos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">→</span>
                    Deploy en Vercel
                  </li>
                </ul>
              </div>
            </div>

            {/* Terminal - Left Side */}
            <div className="h-[550px]">
              {!isComplete ? (
                <SimpleTerminal
                  step={currentStep}
                  onSuccess={handleSuccess}
                  isComplete={isComplete}
                />
              ) : (
                <div className="bg-slate-900 rounded-xl border border-slate-700 h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-5xl mb-4">🎉</div>
                    <h3 className="text-xl font-bold mb-2">¡Demo completada!</h3>
                    <p className="text-slate-400 text-sm mb-6">
                      Has construido una landing Web3 con MetaMask
                    </p>
                    <Link
                      href="/plataforma/comprar"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-bold text-sm"
                    >
                      Comprar Curso Completo - $147
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Preview - Right Side */}
            <div className="h-[550px]">
              <LandingPreview
                currentStep={previewStep}
                isConnected={isWalletConnected}
              />
            </div>
          </div>

          {/* Mobile Steps */}
          <div className="lg:hidden mt-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {demoSteps.map((step, index) => {
                const isCompleted = completedSteps.has(step.id)
                const isActive = index === currentStepIndex

                return (
                  <button
                    key={step.id}
                    onClick={() => handleSelectStep(index)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isActive
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </button>
                )
              })}
            </div>
          </div>
        </main>

        {/* Bottom CTA */}
        <section className="border-t border-slate-800 bg-gradient-to-r from-purple-900/30 to-blue-900/30 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-xl font-bold mb-2">¿Te gustaría crear tu propia plataforma de cursos?</h3>
            <p className="text-slate-400 mb-4">
              Aprende a construir este sistema completo con terminal interactivo y tutor IA.
            </p>
            <Link
              href="/plataforma/comprar"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-bold"
            >
              Ver Curso Completo - $147
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
