import Link from 'next/link'
import { useState } from 'react'
import Modulo0Layout from '../../components/Modulo0Layout'

const ERRORES = [
  {
    id: 'node-not-recognized',
    categoria: 'Node.js',
    emoji: '📦',
    error: '"node" no se reconoce como un comando',
    variantes: [
      'node: command not found',
      'node is not recognized as an internal or external command',
      'zsh: command not found: node'
    ],
    causa: 'Node.js no está instalado o no está en el PATH del sistema.',
    solucion: [
      'Cierra y vuelve a abrir la terminal',
      'Si sigue sin funcionar, reinstala Node.js desde nodejs.org',
      'En Windows: marca la opción "Add to PATH" durante la instalación',
      'Verifica con: node --version'
    ],
    nivel: 'facil'
  },
  {
    id: 'npm-not-recognized',
    categoria: 'npm',
    emoji: '📚',
    error: '"npm" no se reconoce como un comando',
    variantes: [
      'npm: command not found',
      'npm is not recognized'
    ],
    causa: 'npm viene con Node.js. Si npm no funciona, Node.js no se instaló correctamente.',
    solucion: [
      'Reinstala Node.js desde nodejs.org',
      'npm se instala automáticamente con Node',
      'Cierra y abre la terminal después de instalar'
    ],
    nivel: 'facil'
  },
  {
    id: 'permission-denied',
    categoria: 'Permisos',
    emoji: '🔐',
    error: 'Permission denied / EACCES',
    variantes: [
      'Error: EACCES: permission denied',
      'Permission denied',
      'npm ERR! code EACCES'
    ],
    causa: 'No tienes permisos para instalar paquetes globalmente.',
    solucion: [
      'En Mac/Linux: usa sudo antes del comando',
      'Ejemplo: sudo npm install -g @anthropic-ai/claude-code',
      'Te pedirá tu contraseña (es normal que no veas lo que escribes)',
      'En Windows: abre la terminal como Administrador'
    ],
    nivel: 'medio'
  },
  {
    id: 'claude-not-found',
    categoria: 'Claude Code',
    emoji: '🤖',
    error: '"claude" no se reconoce como un comando',
    variantes: [
      'claude: command not found',
      'zsh: command not found: claude'
    ],
    causa: 'Claude Code no está instalado o la instalación falló.',
    solucion: [
      'Reinstala con: npm install -g @anthropic-ai/claude-code',
      'Si da error de permisos, usa sudo (Mac/Linux)',
      'Cierra y abre la terminal después de instalar',
      'Verifica que tienes una suscripción activa de Claude Pro'
    ],
    nivel: 'medio'
  },
  {
    id: 'claude-no-subscription',
    categoria: 'Claude Code',
    emoji: '💳',
    error: 'Claude Code no responde o pide autenticación',
    variantes: [
      'Authentication required',
      'Please log in',
      'Subscription required',
      'La pantalla se queda en blanco'
    ],
    causa: 'No tienes una suscripción activa de Claude Pro o Max.',
    solucion: [
      'Ve a claude.ai y verifica tu suscripción',
      'Necesitas Claude Pro ($20/mes) o Max ($100/mes)',
      'Si ya tienes suscripción, haz logout y login de nuevo',
      'Ejecuta: claude logout y luego claude'
    ],
    nivel: 'facil'
  },
  {
    id: 'git-not-found',
    categoria: 'Git',
    emoji: '🔀',
    error: '"git" no se reconoce como un comando',
    variantes: [
      'git: command not found',
      'git is not recognized'
    ],
    causa: 'Git no está instalado en tu sistema.',
    solucion: [
      'Mac: Ejecuta xcode-select --install en la terminal',
      'Windows: Descarga Git desde git-scm.com',
      'Linux: sudo apt install git (Ubuntu/Debian)',
      'Cierra y abre la terminal después de instalar'
    ],
    nivel: 'facil'
  },
  {
    id: 'port-in-use',
    categoria: 'Servidor local',
    emoji: '🔌',
    error: 'El puerto 3000 ya está en uso',
    variantes: [
      'Port 3000 is already in use',
      'EADDRINUSE',
      'address already in use'
    ],
    causa: 'Otra aplicación o proceso está usando el puerto 3000.',
    solucion: [
      'Busca la terminal donde está corriendo otro servidor y ciérrala',
      'O cambia el puerto: npm run dev -- -p 3001',
      'Mac/Linux: Mata el proceso con kill $(lsof -t -i:3000)',
      'Windows: Reinicia la computadora si no encuentras el proceso'
    ],
    nivel: 'medio'
  },
  {
    id: 'module-not-found',
    categoria: 'Dependencias',
    emoji: '📦',
    error: 'Cannot find module / Module not found',
    variantes: [
      'Error: Cannot find module',
      'Module not found: Error',
      "Cannot find module 'react'"
    ],
    causa: 'Las dependencias del proyecto no están instaladas.',
    solucion: [
      'Ejecuta: npm install en la carpeta del proyecto',
      'Esto instalará todas las dependencias de package.json',
      'Si sigue fallando, borra node_modules y vuelve a instalar:',
      'rm -rf node_modules && npm install'
    ],
    nivel: 'facil'
  },
  {
    id: 'syntax-error',
    categoria: 'Código',
    emoji: '🐛',
    error: 'Syntax Error / Unexpected token',
    variantes: [
      'SyntaxError: Unexpected token',
      'Parsing error',
      'Unexpected identifier'
    ],
    causa: 'Hay un error de sintaxis en el código (falta una coma, paréntesis, etc).',
    solucion: [
      'Pide a Claude que revise el código',
      'Di: "Hay un error de sintaxis, ¿puedes revisar el código?"',
      'Claude encontrará y arreglará el error',
      'Los errores de sintaxis son muy comunes, no te preocupes'
    ],
    nivel: 'facil'
  },
  {
    id: 'fetch-failed',
    categoria: 'Red',
    emoji: '🌐',
    error: 'fetch failed / Network Error',
    variantes: [
      'TypeError: fetch failed',
      'Network request failed',
      'ENOTFOUND',
      'getaddrinfo ENOTFOUND'
    ],
    causa: 'No hay conexión a internet o el servidor está caído.',
    solucion: [
      'Verifica tu conexión a internet',
      'Comprueba si el servicio al que intentas conectar está funcionando',
      'Si usas VPN, intenta desactivarla',
      'Espera unos minutos y vuelve a intentar'
    ],
    nivel: 'medio'
  }
]

function ErroresContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedError, setExpandedError] = useState<string | null>(null)
  const [filterCategoria, setFilterCategoria] = useState<string | null>(null)

  const categorias = [...new Set(ERRORES.map(e => e.categoria))]

  const filteredErrors = ERRORES.filter(error => {
    const matchesSearch = searchQuery === '' ||
      error.error.toLowerCase().includes(searchQuery.toLowerCase()) ||
      error.variantes.some(v => v.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategoria = filterCategoria === null || error.categoria === filterCategoria
    return matchesSearch && matchesCategoria
  })

  return (
    <>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>
            🔧 Troubleshooting
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', lineHeight: 1.7 }}>
            ¿Algo no funciona? Aquí encontrarás la solución a los errores más comunes.
          </p>
        </div>

        {/* Search */}
        <div style={{
          marginBottom: '24px',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="🔍 Busca tu error (ej: 'command not found', 'permission denied')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '18px 24px',
              fontSize: '16px',
              border: '2px solid rgba(0,0,0,0.06)',
              borderRadius: '14px',
              background: 'white',
              color: '#1e293b',
              outline: 'none'
            }}
          />
        </div>

        {/* Category filters */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => setFilterCategoria(null)}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: `1px solid ${filterCategoria === null ? '#5e6ad2' : 'rgba(0,0,0,0.06)'}`,
              background: filterCategoria === null ? '#eef2ff' : '#fafbfc',
              color: filterCategoria === null ? '#5e6ad2' : '#64748b',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Todos ({ERRORES.length})
          </button>
          {categorias.map(cat => {
            const count = ERRORES.filter(e => e.categoria === cat).length
            return (
              <button
                key={cat}
                onClick={() => setFilterCategoria(cat)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: `1px solid ${filterCategoria === cat ? '#5e6ad2' : 'rgba(0,0,0,0.06)'}`,
                  background: filterCategoria === cat ? '#eef2ff' : '#fafbfc',
                  color: filterCategoria === cat ? '#5e6ad2' : '#64748b',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                {cat} ({count})
              </button>
            )
          })}
        </div>

        {/* Errors list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredErrors.map(error => {
            const isExpanded = expandedError === error.id
            return (
              <div
                key={error.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: `1px solid ${isExpanded ? '#5e6ad2' : 'rgba(0,0,0,0.06)'}`,
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedError(isExpanded ? null : error.id)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '28px' }}>{error.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#94a3b8',
                      marginBottom: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {error.categoria}
                    </div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: 600,
                      color: '#ef4444',
                      fontFamily: "'JetBrains Mono', monospace"
                    }}>
                      {error.error}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    color: error.nivel === 'facil' ? '#22c55e' : '#f59e0b',
                    background: error.nivel === 'facil' ? '#f0fdf4' : '#fffbeb',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontWeight: 500
                  }}>
                    {error.nivel === 'facil' ? '✓ Fácil' : '⚡ Medio'}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div style={{
                    padding: '0 24px 24px',
                    borderTop: '1px solid rgba(0,0,0,0.06)'
                  }}>
                    {/* Variantes */}
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#94a3b8',
                        marginBottom: '10px',
                        textTransform: 'uppercase'
                      }}>
                        También puede aparecer como:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {error.variantes.map((v, i) => (
                          <code key={i} style={{
                            padding: '6px 12px',
                            background: '#f1f5f9',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: '#64748b',
                            fontFamily: "'JetBrains Mono', monospace"
                          }}>
                            {v}
                          </code>
                        ))}
                      </div>
                    </div>

                    {/* Causa */}
                    <div style={{
                      padding: '16px',
                      background: '#fef2f2',
                      borderRadius: '10px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ fontWeight: 600, color: '#ef4444', marginBottom: '6px' }}>
                        ❌ ¿Por qué pasa esto?
                      </div>
                      <p style={{ margin: 0, color: '#64748b', lineHeight: 1.6 }}>
                        {error.causa}
                      </p>
                    </div>

                    {/* Solución */}
                    <div style={{
                      padding: '16px',
                      background: '#f0fdf4',
                      borderRadius: '10px'
                    }}>
                      <div style={{ fontWeight: 600, color: '#22c55e', marginBottom: '12px' }}>
                        ✅ Solución
                      </div>
                      <ol style={{
                        margin: 0,
                        paddingLeft: '20px',
                        color: '#64748b',
                        lineHeight: 2
                      }}>
                        {error.solucion.map((paso, i) => (
                          <li key={i}>{paso}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {filteredErrors.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#94a3b8'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <p>No se encontraron errores que coincidan con tu búsqueda.</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>
              Prueba con otras palabras clave o revisa el glosario.
            </p>
          </div>
        )}

        {/* Help section */}
        <div style={{
          marginTop: '48px',
          padding: '32px',
          background: 'white',
          borderRadius: '20px',
          border: '1px solid rgba(0,0,0,0.06)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '12px' }}>
            ¿Tu error no está aquí?
          </h3>
          <p style={{ color: '#64748b', marginBottom: '24px', lineHeight: 1.7 }}>
            Copia el mensaje de error exacto y pregúntale a Claude Code directamente.<br />
            Di: "Tengo este error: [pega el error]. ¿Cómo lo soluciono?"
          </p>
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/curso/glosario" style={{
              padding: '14px 28px',
              background: '#fafbfc',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '12px',
              color: '#64748b',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 500
            }}>
              📚 Ver glosario
            </Link>
            <Link href="/curso/requisitos" style={{
              padding: '14px 28px',
              background: '#5e6ad2',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 500
            }}>
              🔧 Reinstalar herramientas
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Link href="/curso/requisitos" style={{
            padding: '14px 24px',
            background: 'white',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '12px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 500
          }}>
            ← Requisitos
          </Link>
          <Link href="/curso/quiz" style={{
            padding: '14px 24px',
            background: '#5e6ad2',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 500
          }}>
            Quiz →
          </Link>
        </div>
    </>
  )
}

export default function ErroresComunesPage() {
  return (
    <Modulo0Layout title="Errores comunes">
      <ErroresContent />
    </Modulo0Layout>
  )
}
