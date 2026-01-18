import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect, KeyboardEvent, useCallback } from 'react'

// =============================================================================
// DATOS DEL CURSO DE DEMOSTRACIÓN - "Crea tu Landing Web3 con MetaMask"
// =============================================================================
const demoCourse = {
  title: 'Crea tu Landing Web3 con MetaMask',
  description: 'Aprende a crear una landing page con conexión a wallet y verificación de NFTs',
  modules: [
    {
      id: 'setup',
      number: '01',
      title: 'Setup del Proyecto',
      description: 'Configura Next.js con las herramientas Web3',
      lessons: [
        {
          id: '1-1',
          title: 'Crear proyecto Next.js',
          instruction: 'Creamos un proyecto Next.js que será la base de nuestra landing Web3.',
          commandToType: 'npx create-next-app@latest mi-landing-web3 --typescript --tailwind',
          terminalResponse: `Creating a new Next.js app in ./mi-landing-web3

✓ Would you like to use TypeScript? Yes
✓ Would you like to use ESLint? Yes
✓ Would you like to use Tailwind CSS? Yes
✓ Would you like to use src/ directory? No
✓ Would you like to use App Router? Yes

Installing dependencies:
- react
- react-dom
- next
- typescript
- tailwindcss

✓ Success! Created mi-landing-web3

cd mi-landing-web3`,
          successKeywords: ['create-next-app', 'npx', 'next', 'web3', 'landing'],
          theory: `<h3>Stack Web3 Moderno</h3>
<p>Usaremos las mejores herramientas para desarrollo Web3:</p>
<ul>
  <li><strong>Next.js 14</strong>: Framework React con App Router</li>
  <li><strong>TypeScript</strong>: Tipos para evitar errores</li>
  <li><strong>Tailwind CSS</strong>: Estilos rápidos y responsive</li>
  <li><strong>wagmi + viem</strong>: Conexión con wallets</li>
</ul>`,
          media: [
            {
              type: 'diagram',
              code: `
┌─────────────────────────────────────────────────────────────┐
│                    Tu Landing Web3                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Usuario                 Tu App                  Blockchain │
│  ┌─────────┐          ┌──────────────┐         ┌──────────┐ │
│  │MetaMask │◄────────►│   Next.js    │◄───────►│ Ethereum │ │
│  │ Wallet  │   wagmi  │   + wagmi    │   viem  │ Mainnet  │ │
│  └─────────┘          └──────────────┘         └──────────┘ │
│       │                      │                       │       │
│       └──────────────────────┼───────────────────────┘       │
│                              │                               │
│                    Firma transacciones                       │
│                    Lee balance / NFTs                        │
└─────────────────────────────────────────────────────────────┘`,
              caption: 'Arquitectura de una dApp con MetaMask'
            }
          ]
        },
        {
          id: '1-2',
          title: 'Instalar dependencias Web3',
          instruction: 'Instalamos wagmi, viem y las herramientas para conectar con MetaMask.',
          commandToType: 'npm install wagmi viem @tanstack/react-query',
          terminalResponse: `added 89 packages in 12s

✓ Installed:
  wagmi@2.5.7        - React hooks para Ethereum
  viem@2.7.8         - Cliente Ethereum moderno
  @tanstack/react-query@5.17.9 - Cache de datos

Estas librerías reemplazan a ethers.js y web3.js
con una API más moderna y type-safe.`,
          successKeywords: ['npm', 'install', 'wagmi', 'viem', 'query', 'web3'],
          theory: `<h3>¿Por qué wagmi + viem?</h3>
<p>Son las librerías más modernas para Web3 en React:</p>
<ul>
  <li><strong>wagmi</strong>: Hooks de React para conectar wallets, leer balances, firmar</li>
  <li><strong>viem</strong>: Cliente Ethereum rápido y tipado (reemplaza a ethers.js)</li>
  <li><strong>TanStack Query</strong>: Cache inteligente para datos de blockchain</li>
</ul>
<p>Son más ligeras y tienen mejor DX que ethers.js o web3.js.</p>`,
          media: [
            {
              type: 'code',
              language: 'typescript',
              code: `// wagmi hace todo más simple
import { useAccount, useConnect } from 'wagmi'

function App() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()

  if (isConnected) {
    return <p>Conectado: {address}</p>
  }

  return (
    <button onClick={() => connect({ connector: connectors[0] })}>
      Conectar Wallet
    </button>
  )
}`,
              caption: 'Así de simple es conectar MetaMask con wagmi'
            }
          ]
        },
        {
          id: '1-3',
          title: 'Configurar wagmi',
          instruction: 'Creamos el archivo de configuración de wagmi con las chains soportadas.',
          commandToType: 'touch lib/wagmi.ts',
          terminalResponse: `✓ Archivo creado: lib/wagmi.ts

Ahora configuraremos las chains (Ethereum, Polygon, etc)
y los conectores (MetaMask, WalletConnect, etc).`,
          successKeywords: ['touch', 'wagmi', 'config', 'crear', 'lib'],
          media: [
            {
              type: 'code',
              language: 'typescript',
              code: `// lib/wagmi.ts
import { http, createConfig } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum],
  connectors: [
    injected(), // MetaMask, Rabby, etc.
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
})`,
              caption: 'Configuración multi-chain con MetaMask y WalletConnect'
            }
          ],
          theory: `<h3>Configuración Multi-Chain</h3>
<p>Nuestra dApp soportará múltiples redes:</p>
<ul>
  <li><strong>Ethereum Mainnet</strong>: La red principal</li>
  <li><strong>Polygon</strong>: Transacciones baratas</li>
  <li><strong>Arbitrum</strong>: L2 rápida de Ethereum</li>
</ul>
<p>Los usuarios pueden cambiar de red desde MetaMask.</p>`
        }
      ]
    },
    {
      id: 'connect',
      number: '02',
      title: 'Botón Connect Wallet',
      description: 'Implementa la conexión con MetaMask',
      lessons: [
        {
          id: '2-1',
          title: 'Provider de wagmi',
          instruction: 'Envolvemos la app con el provider de wagmi para habilitar los hooks.',
          commandToType: 'code app/providers.tsx',
          terminalResponse: `Opening app/providers.tsx in VS Code...

Este archivo envuelve tu app con los providers necesarios
para que wagmi funcione en todos los componentes.`,
          successKeywords: ['code', 'providers', 'provider', 'app', 'vim', 'nano', 'edit'],
          media: [
            {
              type: 'code',
              language: 'typescript',
              code: `// app/providers.tsx
'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/lib/wagmi'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}`,
              caption: 'Provider que habilita wagmi en toda la app'
            }
          ],
          theory: `<p>El patrón Provider es común en React. Wagmi necesita:</p>
<ul>
  <li><code>WagmiProvider</code>: Contexto de conexión wallet</li>
  <li><code>QueryClientProvider</code>: Cache de datos blockchain</li>
</ul>
<p>Marcamos <code>'use client'</code> porque usa hooks de React.</p>`
        },
        {
          id: '2-2',
          title: 'Componente ConnectButton',
          instruction: 'Creamos el botón de conexión con diseño profesional.',
          commandToType: 'touch components/ConnectButton.tsx',
          terminalResponse: `✓ Archivo creado: components/ConnectButton.tsx

Este será el botón principal de tu landing.
Detectará si MetaMask está instalado y manejará estados.`,
          successKeywords: ['touch', 'connect', 'button', 'component', 'crear'],
          media: [
            {
              type: 'code',
              language: 'typescript',
              code: `// components/ConnectButton.tsx
'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-xl text-sm font-mono">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <button
          onClick={() => disconnect()}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all"
        >
          Desconectar
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      disabled={isPending}
      className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-bold text-lg transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-50"
    >
      <span className="flex items-center gap-3">
        <svg className="w-6 h-6" viewBox="0 0 35 33" fill="currentColor">
          <path d="M32.9 1l-13.1 9.7 2.4-5.8z M2.7 1l13 9.8-2.3-5.9z"/>
        </svg>
        {isPending ? 'Conectando...' : 'Conectar MetaMask'}
      </span>
    </button>
  )
}`,
              caption: 'Botón con estados: conectado, desconectado, cargando'
            }
          ],
          theory: `<h3>Estados del Botón</h3>
<p>El botón maneja 3 estados:</p>
<ul>
  <li><strong>Desconectado</strong>: Muestra "Conectar MetaMask"</li>
  <li><strong>Conectando</strong>: Muestra "Conectando..." deshabilitado</li>
  <li><strong>Conectado</strong>: Muestra address truncada + botón desconectar</li>
</ul>`
        },
        {
          id: '2-3',
          title: 'Probar la conexión',
          instruction: 'Iniciamos el servidor de desarrollo para probar la conexión.',
          commandToType: 'npm run dev',
          terminalResponse: `   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 2.3s

Abre http://localhost:3000 en tu navegador.
Asegúrate de tener MetaMask instalado.

Prueba:
1. Click en "Conectar MetaMask"
2. Aprueba la conexión en MetaMask
3. Verás tu address truncada`,
          successKeywords: ['npm', 'run', 'dev', 'start', 'servidor'],
          theory: `<p>Para probar necesitas:</p>
<ul>
  <li>MetaMask instalado en tu navegador</li>
  <li>Una cuenta (puede ser de prueba)</li>
</ul>
<p>Si no tienes MetaMask, la extensión te redirigirá a instalarlo.</p>`,
          media: [
            {
              type: 'image',
              url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
              alt: 'MetaMask logo',
              caption: 'MetaMask es la wallet más popular para dApps'
            }
          ]
        }
      ]
    },
    {
      id: 'nft',
      number: '03',
      title: 'Verificar NFTs',
      description: 'Gate content basado en NFT ownership',
      lessons: [
        {
          id: '3-1',
          title: 'Hook para verificar NFT',
          instruction: 'Creamos un hook que verifica si el usuario tiene un NFT específico.',
          commandToType: 'touch hooks/useNFTGate.ts',
          terminalResponse: `✓ Archivo creado: hooks/useNFTGate.ts

Este hook leerá el balance de NFTs de una colección
y determinará si el usuario tiene acceso.`,
          successKeywords: ['touch', 'hook', 'nft', 'gate', 'crear', 'use'],
          media: [
            {
              type: 'code',
              language: 'typescript',
              code: `// hooks/useNFTGate.ts
import { useReadContract, useAccount } from 'wagmi'
import { erc721Abi } from 'viem'

const NFT_CONTRACT = '0x...' // Tu colección NFT

export function useNFTGate() {
  const { address } = useAccount()

  const { data: balance, isLoading } = useReadContract({
    address: NFT_CONTRACT,
    abi: erc721Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  return {
    hasAccess: balance ? balance > 0n : false,
    isLoading,
    balance: balance ? Number(balance) : 0,
  }
}`,
              caption: 'Hook que verifica ownership de NFT usando el ABI estándar ERC-721'
            }
          ],
          theory: `<h3>Token Gating</h3>
<p>Token gating permite restringir contenido a holders de NFTs:</p>
<ul>
  <li>Leemos <code>balanceOf(address)</code> del contrato ERC-721</li>
  <li>Si balance > 0, el usuario tiene al menos 1 NFT</li>
  <li>Mostramos contenido exclusivo solo a holders</li>
</ul>
<p>Es común en comunidades Web3 para dar beneficios.</p>`
        },
        {
          id: '3-2',
          title: 'Componente NFTGate',
          instruction: 'Creamos el componente que muestra contenido exclusivo a holders.',
          commandToType: 'touch components/NFTGate.tsx',
          terminalResponse: `✓ Archivo creado: components/NFTGate.tsx

Este componente envuelve el contenido exclusivo
y solo lo muestra si el usuario tiene el NFT.`,
          successKeywords: ['touch', 'nft', 'gate', 'component', 'crear'],
          media: [
            {
              type: 'code',
              language: 'typescript',
              code: `// components/NFTGate.tsx
'use client'

import { useNFTGate } from '@/hooks/useNFTGate'
import { useAccount } from 'wagmi'
import { ConnectButton } from './ConnectButton'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function NFTGate({ children, fallback }: Props) {
  const { isConnected } = useAccount()
  const { hasAccess, isLoading, balance } = useNFTGate()

  if (!isConnected) {
    return (
      <div className="text-center p-8 bg-slate-900 rounded-2xl border border-slate-700">
        <h3 className="text-xl font-bold mb-4">🔒 Contenido Exclusivo</h3>
        <p className="text-slate-400 mb-6">Conecta tu wallet para verificar acceso</p>
        <ConnectButton />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 mt-4">Verificando NFTs...</p>
      </div>
    )
  }

  if (!hasAccess) {
    return fallback || (
      <div className="text-center p-8 bg-slate-900 rounded-2xl border border-red-500/30">
        <h3 className="text-xl font-bold mb-2">❌ Acceso Denegado</h3>
        <p className="text-slate-400">Necesitas un NFT de la colección para acceder</p>
        <a href="https://opensea.io" className="text-purple-400 hover:underline mt-4 inline-block">
          Comprar NFT en OpenSea →
        </a>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-xl inline-flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-green-400 text-sm">Holder verificado · {balance} NFT(s)</span>
      </div>
      {children}
    </div>
  )
}`,
              caption: 'Componente que verifica NFT antes de mostrar contenido'
            }
          ],
          theory: `<h3>Flujo de Verificación</h3>
<ol>
  <li>Usuario conecta wallet</li>
  <li>Leemos balance de NFT del contrato</li>
  <li>Si tiene NFT → mostramos contenido</li>
  <li>Si no tiene → mostramos mensaje + link a comprar</li>
</ol>`
        },
        {
          id: '3-3',
          title: 'Landing page completa',
          instruction: 'Finalizamos la landing page con todos los componentes.',
          commandToType: 'code app/page.tsx',
          terminalResponse: `Opening app/page.tsx...

Aquí juntamos todo: hero, connect button, y NFT gate.
Tu landing Web3 está lista para producción.`,
          successKeywords: ['code', 'page', 'app', 'landing', 'final', 'vim', 'nano'],
          media: [
            {
              type: 'code',
              language: 'typescript',
              code: `// app/page.tsx
import { ConnectButton } from '@/components/ConnectButton'
import { NFTGate } from '@/components/NFTGate'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Bienvenido al
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Futuro Descentralizado
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            Conecta tu wallet para acceder a contenido exclusivo
          </p>
          <ConnectButton />
        </div>
      </section>

      {/* NFT Gated Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <NFTGate>
            <div className="p-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl border border-purple-500/30">
              <h2 className="text-3xl font-bold mb-4">🎉 Contenido Exclusivo</h2>
              <p className="text-slate-300 mb-4">
                ¡Felicidades! Como holder de nuestra colección tienes acceso a:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Discord privado</li>
                <li>✓ Airdrops exclusivos</li>
                <li>✓ Eventos VIP</li>
              </ul>
            </div>
          </NFTGate>
        </div>
      </section>
    </main>
  )
}`,
              caption: 'Landing page completa con connect wallet y NFT gating'
            }
          ],
          theory: `<h3>¡Landing Web3 Completa!</h3>
<p>Tu landing ahora tiene:</p>
<ul>
  <li>✓ Hero con gradientes Web3</li>
  <li>✓ Botón de conexión MetaMask</li>
  <li>✓ Contenido exclusivo para holders</li>
  <li>✓ Soporte multi-chain</li>
</ul>`
        },
        {
          id: 'complete',
          title: '¡Curso Completado!',
          instruction: '🎉 ¡Has creado tu primera landing Web3 con MetaMask!',
          commandToType: '',
          terminalResponse: '',
          isComplete: true
        }
      ]
    }
  ]
}

// Aplanar lecciones para navegación fácil
const allLessons = demoCourse.modules.flatMap(m => m.lessons)
const totalLessons = allLessons.filter(l => !l.isComplete).length

// =============================================================================
// TIPOS
// =============================================================================
interface MediaContent {
  type: 'video' | 'image' | 'gif' | 'diagram' | 'code'
  url?: string
  videoId?: string
  videoProvider?: 'youtube' | 'vimeo'
  code?: string
  language?: string
  caption?: string
  alt?: string
}

interface Lesson {
  id: string
  title: string
  instruction: string
  commandToType: string
  terminalResponse: string
  successKeywords?: string[]
  theory?: string
  media?: MediaContent[]
  isComplete?: boolean
}

// =============================================================================
// COMPONENTES DE CONTENIDO MULTIMEDIA
// =============================================================================
function LessonMedia({ media }: { media: MediaContent[] }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-3">
      {media.map((item, i) => {
        if (item.type === 'code') {
          return (
            <div key={i} className="bg-slate-950 rounded-lg border border-slate-700 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 border-b border-slate-700">
                <span className="text-xs text-slate-400 font-mono">{item.language}</span>
                <button
                  onClick={() => handleCopy(item.code || '', i)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copiedIndex === i ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copiado
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copiar
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 text-xs overflow-x-auto max-h-64">
                <code className="text-slate-300">{item.code}</code>
              </pre>
              {item.caption && (
                <div className="px-3 py-2 bg-slate-800/50 border-t border-slate-700">
                  <p className="text-xs text-slate-400 italic">{item.caption}</p>
                </div>
              )}
            </div>
          )
        }

        if (item.type === 'diagram') {
          return (
            <div key={i} className="bg-slate-950 rounded-lg border border-slate-700 p-3">
              <pre className="text-xs text-slate-300 font-mono overflow-x-auto whitespace-pre">
                {item.code}
              </pre>
              {item.caption && (
                <p className="text-xs text-slate-400 italic mt-2 text-center">{item.caption}</p>
              )}
            </div>
          )
        }

        if (item.type === 'image') {
          return (
            <div key={i} className="rounded-lg border border-slate-700 overflow-hidden bg-slate-900 p-4">
              <img src={item.url} alt={item.alt} className="max-w-[100px] mx-auto" />
              {item.caption && (
                <p className="text-xs text-slate-400 italic mt-3 text-center">{item.caption}</p>
              )}
            </div>
          )
        }

        return null
      })}
    </div>
  )
}

function LessonTheory({ html }: { html: string }) {
  return (
    <div
      className="prose prose-invert prose-sm max-w-none prose-headings:text-sm prose-headings:font-semibold prose-headings:mb-2 prose-headings:mt-0 prose-p:text-slate-300 prose-p:my-2 prose-li:text-slate-300 prose-li:my-0.5 prose-code:text-purple-400 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded prose-ul:my-2 prose-ol:my-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

// =============================================================================
// COMPONENTE DEL TERMINAL
// =============================================================================
function DemoTerminal({
  lesson,
  onSuccess,
  onError,
  lessonKey
}: {
  lesson: Lesson
  onSuccess: () => void
  onError: (cmd: string) => void
  lessonKey: string
}) {
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'success' | 'error'; content: string }>>([])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setHistory([])
    setInput('')
    inputRef.current?.focus()
  }, [lessonKey])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const isCommandValid = (cmd: string): boolean => {
    const normalized = cmd.toLowerCase().trim()
    if (!lesson.successKeywords) return false
    return lesson.successKeywords.some(kw => normalized.includes(kw.toLowerCase()))
  }

  const processCommand = (cmd: string) => {
    if (!cmd.trim() || isProcessing || lesson.isComplete) return

    setInput('')
    setHistory(prev => [...prev, { type: 'input', content: cmd }])
    setIsProcessing(true)

    setTimeout(() => {
      if (cmd.toLowerCase().trim() === 'clear') {
        setHistory([])
        setIsProcessing(false)
        return
      }

      if (isCommandValid(cmd)) {
        setHistory(prev => [
          ...prev,
          { type: 'output', content: lesson.terminalResponse },
          { type: 'success', content: '✓ ¡Correcto! Siguiente lección...' }
        ])
        setTimeout(onSuccess, 1500)
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'error', content: `bash: comando no reconocido. Intenta: ${lesson.commandToType.slice(0, 30)}...` }
        ])
        onError(cmd)
      }
      setIsProcessing(false)
    }, 300)
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
        <span className="text-slate-400 text-sm ml-2 font-mono">~/mi-landing-web3</span>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto bg-slate-950"
        onClick={() => inputRef.current?.focus()}
      >
        {!lesson.isComplete && history.length === 0 && (
          <div className="mb-4 p-3 bg-purple-600/10 rounded-lg border border-purple-500/30">
            <p className="text-purple-400 text-xs mb-2">Escribe este comando:</p>
            <button
              onClick={() => {
                setInput(lesson.commandToType)
                inputRef.current?.focus()
              }}
              className="font-mono text-emerald-400 bg-slate-900 px-3 py-1.5 rounded border border-slate-600 hover:border-purple-500 transition-colors text-left w-full text-xs"
            >
              {lesson.commandToType}
            </button>
            <p className="text-slate-500 text-xs mt-2">Click para autocompletar</p>
          </div>
        )}

        {history.map((item, i) => (
          <div key={i} className={`mb-2 ${
            item.type === 'input' ? 'text-white' :
            item.type === 'success' ? 'text-emerald-400 bg-emerald-500/10 p-2 rounded' :
            item.type === 'error' ? 'text-red-400' :
            'text-slate-300'
          }`}>
            {item.type === 'input' && <span className="text-purple-400">❯ </span>}
            <span className="whitespace-pre-wrap">{item.content}</span>
          </div>
        ))}

        {!lesson.isComplete && (
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

        {lesson.isComplete && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">¡Demo completada!</h3>
            <p className="text-slate-400 mb-6">Has aprendido a crear una landing Web3 con MetaMask</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/plataforma/comprar"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-bold"
              >
                Comprar Curso Completo
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// COMPONENTE DEL TUTOR IA
// =============================================================================
function AITutor({
  lesson,
  lessonKey,
  currentModule,
  progress
}: {
  lesson: Lesson
  lessonKey: string
  currentModule: typeof demoCourse.modules[0]
  progress: { current: number; total: number }
}) {
  const [messages, setMessages] = useState<Array<{ role: 'assistant' | 'user'; content: string }>>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initialMessage = lesson.isComplete
      ? '🎉 ¡Excelente trabajo! Has completado la demo.\n\nEn el curso completo aprenderás a:\n• Integrar smart contracts\n• Minting de NFTs\n• Firmar mensajes\n• Deploy en mainnet\n\n¿Listo para el siguiente nivel?'
      : `**${lesson.title}**\n\n${lesson.instruction}\n\n💡 Escribe el comando en el terminal. Si tienes dudas, pregúntame.`

    setMessages([{ role: 'assistant', content: initialMessage }])
  }, [lessonKey, lesson])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || isTyping) return

    const question = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: question }])
    setIsTyping(true)

    setTimeout(() => {
      const lowerQ = question.toLowerCase()
      let response = ''

      if (lowerQ.includes('metamask') || lowerQ.includes('wallet')) {
        response = 'MetaMask es la wallet más popular para interactuar con dApps. Cuando el usuario hace click en "Conectar", wagmi abre MetaMask y pide permiso para ver la dirección.\n\nEl usuario nunca comparte su clave privada, solo firma con ella.'
      } else if (lowerQ.includes('nft') || lowerQ.includes('token')) {
        response = 'Los NFTs son tokens únicos en la blockchain. Con el hook useNFTGate leemos el balance del usuario en el contrato ERC-721.\n\nSi balance > 0, tiene al menos un NFT y le damos acceso al contenido exclusivo.'
      } else if (lowerQ.includes('wagmi') || lowerQ.includes('viem')) {
        response = 'wagmi es una librería de React hooks para Web3. viem es el cliente Ethereum que usa por debajo.\n\nJuntas reemplazan a ethers.js con una API más moderna y 100% tipada con TypeScript.'
      } else if (lowerQ.includes('chain') || lowerQ.includes('network') || lowerQ.includes('red')) {
        response = 'Nuestra config soporta múltiples chains: Ethereum, Polygon, Arbitrum.\n\nEl usuario puede cambiar de red desde MetaMask y wagmi detecta el cambio automáticamente.'
      } else {
        response = `Buena pregunta sobre "${question.slice(0, 25)}..."\n\nEn este módulo de ${currentModule.title}, el concepto clave es ${lesson.instruction.toLowerCase()}\n\nEl comando que necesitas es:\n\`${lesson.commandToType}\``
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 800)
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <span className="text-sm">🤖</span>
          </div>
          <div>
            <span className="text-white text-sm font-medium">Tutor Web3</span>
            <span className="text-xs text-slate-400 block">Powered by Claude</span>
          </div>
        </div>
        <div className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
          {progress.current}/{progress.total}
        </div>
      </div>

      <div ref={messagesRef} className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm ${
              msg.role === 'user' ? 'bg-slate-700' : 'bg-gradient-to-br from-purple-500 to-blue-600'
            }`}>
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
              msg.role === 'user'
                ? 'bg-purple-600 text-white rounded-tr-sm'
                : 'bg-slate-800 text-slate-200 rounded-tl-sm'
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-sm">
              🤖
            </div>
            <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-2.5">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {!lesson.isComplete && (lesson.theory || lesson.media) && (
        <div className="border-t border-slate-700 p-3 bg-slate-800/50 max-h-52 overflow-y-auto">
          {lesson.theory && <LessonTheory html={lesson.theory} />}
          {lesson.media && <div className="mt-2"><LessonMedia media={lesson.media} /></div>}
        </div>
      )}

      <div className="p-3 border-t border-slate-700 bg-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta sobre Web3, MetaMask, NFTs..."
            className="flex-1 bg-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg text-sm font-medium"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// SIDEBAR DE MÓDULOS
// =============================================================================
function ModuleSidebar({
  modules,
  currentLessonId,
  completedLessons,
  onSelectLesson
}: {
  modules: typeof demoCourse.modules
  currentLessonId: string
  completedLessons: Set<string>
  onSelectLesson: (lessonId: string) => void
}) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      <div className="p-3 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-slate-700">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <span>🌐</span> Contenido del Curso
        </h3>
        <p className="text-xs text-slate-400 mt-1">{completedLessons.size}/{totalLessons} lecciones</p>
      </div>

      <div className="p-2 max-h-[500px] overflow-y-auto">
        {modules.map((module) => (
          <div key={module.id} className="mb-3">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <div className="w-6 h-6 rounded bg-purple-600/20 flex items-center justify-center text-xs text-purple-400 font-bold">
                {module.number}
              </div>
              <span className="text-sm font-medium text-slate-300">{module.title}</span>
            </div>

            <div className="ml-4 space-y-0.5">
              {module.lessons.filter(l => !l.isComplete).map((lesson) => {
                const isActive = lesson.id === currentLessonId
                const isCompleted = completedLessons.has(lesson.id)

                return (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson.id)}
                    className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors flex items-center gap-2 ${
                      isActive
                        ? 'bg-purple-600/20 text-purple-400'
                        : isCompleted
                          ? 'text-emerald-400 hover:bg-slate-800'
                          : 'text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : isActive
                          ? 'border-purple-500'
                          : 'border-slate-600'
                    }`}>
                      {isCompleted ? '✓' : ''}
                    </span>
                    {lesson.title}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// PÁGINA PRINCIPAL
// =============================================================================
export default function DemoPage() {
  const [currentLessonId, setCurrentLessonId] = useState(allLessons[0].id)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())

  const currentLessonIndex = allLessons.findIndex(l => l.id === currentLessonId)
  const currentLesson = allLessons[currentLessonIndex]
  const currentModule = demoCourse.modules.find(m => m.lessons.some(l => l.id === currentLessonId))!

  const handleSuccess = useCallback(() => {
    setCompletedLessons(prev => new Set([...prev, currentLessonId]))
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentLessonIndex + 1].id)
    }
  }, [currentLessonId, currentLessonIndex])

  const handleError = useCallback(() => {}, [])

  const handleSelectLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId)
  }

  const lessonKey = `${currentLessonId}-${completedLessons.size}`

  return (
    <>
      <Head>
        <title>Demo: {demoCourse.title} | aprende.software</title>
        <meta name="description" content={demoCourse.description} />
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
                  <h1 className="font-bold text-sm">{demoCourse.title}</h1>
                  <p className="text-xs text-slate-400">Demo Interactiva · Web3</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-medium">
                    {completedLessons.size}/{totalLessons} lecciones
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

        {/* Current Lesson Banner */}
        {!currentLesson.isComplete && (
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-purple-500/30">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center font-bold">
                  {currentModule.number}
                </div>
                <div>
                  <p className="text-xs text-purple-400">{currentModule.title}</p>
                  <h2 className="font-bold">{currentLesson.title}</h2>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-[280px_1fr_1fr] gap-4">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <ModuleSidebar
                modules={demoCourse.modules}
                currentLessonId={currentLessonId}
                completedLessons={completedLessons}
                onSelectLesson={handleSelectLesson}
              />
            </div>

            {/* Terminal */}
            <div className="h-[600px]">
              <DemoTerminal
                lesson={currentLesson}
                onSuccess={handleSuccess}
                onError={handleError}
                lessonKey={lessonKey}
              />
            </div>

            {/* AI Tutor */}
            <div className="h-[600px]">
              <AITutor
                lesson={currentLesson}
                lessonKey={lessonKey}
                currentModule={currentModule}
                progress={{ current: completedLessons.size, total: totalLessons }}
              />
            </div>
          </div>
        </main>

        {/* Bottom CTA */}
        <section className="border-t border-slate-800 bg-gradient-to-r from-purple-900/30 to-blue-900/30 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-xl font-bold mb-2">¿Te gusta esta experiencia de aprendizaje?</h3>
            <p className="text-slate-400 mb-4">
              En el curso completo aprenderás a crear tu propia plataforma de cursos interactivos.
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
