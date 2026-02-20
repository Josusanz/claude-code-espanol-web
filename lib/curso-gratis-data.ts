// Metadata de los 7 módulos gratuitos de aprende.software
// Estructura basada en ModuloAutoguiado

export interface ModuloGratis {
  id: string
  num: number
  titulo: string
  emoji: string
  descripcion: string
  duracion: string
  nivel: 'principiante' | 'intermedio'
  totalLecciones: number
  href: string
  lecciones: { titulo: string; href: string }[]
}

export const MODULOS_GRATIS: ModuloGratis[] = [
  {
    id: 'modo-facil',
    num: 1,
    titulo: 'Modo Fácil',
    emoji: '🌱',
    descripcion: 'Usa Claude desde el navegador, sin instalar nada. Perfecto si nunca has tocado una terminal.',
    duracion: '2-3 horas',
    nivel: 'principiante',
    totalLecciones: 8,
    href: '/modo-facil',
    lecciones: [
      { titulo: 'Introducción', href: '/modo-facil' },
      { titulo: '¿Qué es Claude?', href: '/modo-facil/que-es-claude' },
      { titulo: 'Crear tu cuenta', href: '/modo-facil/crear-cuenta' },
      { titulo: 'Primeros pasos', href: '/modo-facil/primeros-pasos' },
      { titulo: 'Cómo pedir las cosas', href: '/modo-facil/escribir-prompts' },
      { titulo: 'Ejemplos prácticos', href: '/modo-facil/ejemplos-practicos' },
      { titulo: 'Trucos y consejos', href: '/modo-facil/trucos' },
      { titulo: 'Siguiente nivel', href: '/modo-facil/siguiente-nivel' },
    ],
  },
  {
    id: 'empezar',
    num: 2,
    titulo: 'Instalación',
    emoji: '⚡',
    descripcion: 'Instala Claude Code en tu ordenador y crea tu primer proyecto desde la terminal.',
    duracion: '30-60 min',
    nivel: 'principiante',
    totalLecciones: 3,
    href: '/empezar',
    lecciones: [
      { titulo: 'Introducción', href: '/empezar/introduccion' },
      { titulo: 'Instalación', href: '/empezar/instalacion' },
      { titulo: 'Descargar y empezar', href: '/empezar/descargar' },
    ],
  },
  {
    id: 'fundamentos',
    num: 3,
    titulo: 'Fundamentos',
    emoji: '📚',
    descripcion: 'Domina los conceptos clave: exploración, creación, comandos, agentes y memoria.',
    duracion: '4-5 horas',
    nivel: 'principiante',
    totalLecciones: 11,
    href: '/fundamentos',
    lecciones: [
      { titulo: '¿Qué es Claude Code?', href: '/fundamentos/que-es' },
      { titulo: '¿Por qué Claude Code?', href: '/fundamentos/por-que-claude-code' },
      { titulo: 'Exploración de archivos', href: '/fundamentos/exploracion' },
      { titulo: 'Crear y modificar', href: '/fundamentos/crear-archivos' },
      { titulo: 'Visualizar creaciones', href: '/fundamentos/visualizar' },
      { titulo: 'Comandos slash', href: '/fundamentos/comandos' },
      { titulo: 'Agentes paralelos', href: '/fundamentos/agentes' },
      { titulo: 'Sub-agentes', href: '/fundamentos/subagentes' },
      { titulo: 'Memoria (CLAUDE.md)', href: '/fundamentos/memoria' },
      { titulo: 'Skills, Hooks y Plugins', href: '/fundamentos/skills-hooks-plugins' },
      { titulo: 'Próximos pasos', href: '/fundamentos/proximos-pasos' },
    ],
  },
  {
    id: 'proyectos',
    num: 4,
    titulo: 'Proyectos Prácticos',
    emoji: '🛠️',
    descripcion: '4 proyectos reales: landing page, automatizaciones, investigación y análisis de datos.',
    duracion: '5-6 horas',
    nivel: 'intermedio',
    totalLecciones: 11,
    href: '/proyectos',
    lecciones: [
      { titulo: 'Introducción', href: '/proyectos' },
      { titulo: 'Landing Page: Intro', href: '/proyectos/landing-intro' },
      { titulo: 'Landing Page: Estructura', href: '/proyectos/landing-estructura' },
      { titulo: 'Landing Page: Estilos y Deploy', href: '/proyectos/landing-estilos' },
      { titulo: 'Automatizaciones: Intro', href: '/proyectos/automatizaciones-intro' },
      { titulo: 'Automatizaciones: Scripts', href: '/proyectos/automatizaciones-scripts' },
      { titulo: 'Tareas Programadas', href: '/proyectos/automatizaciones-cron' },
      { titulo: 'Investigación: Intro', href: '/proyectos/investigacion-intro' },
      { titulo: 'Investigación: Proyecto', href: '/proyectos/investigacion-proyecto' },
      { titulo: 'Análisis de Datos: Intro', href: '/proyectos/datos-intro' },
      { titulo: 'Análisis de Datos: Proyecto', href: '/proyectos/datos-proyecto' },
    ],
  },
  {
    id: 'mcp',
    num: 5,
    titulo: 'MCP (Model Context Protocol)',
    emoji: '🔌',
    descripcion: 'Conecta Claude con APIs, bases de datos y servicios externos con MCP.',
    duracion: '2-3 horas',
    nivel: 'intermedio',
    totalLecciones: 6,
    href: '/mcp',
    lecciones: [
      { titulo: '¿Qué es MCP?', href: '/mcp/que-es' },
      { titulo: 'Cómo funciona', href: '/mcp/arquitectura' },
      { titulo: 'Servidores populares', href: '/mcp/servidores-populares' },
      { titulo: 'Configurar en Claude Code', href: '/mcp/instalar-servidores' },
      { titulo: 'Casos de uso', href: '/mcp/casos-de-uso' },
      { titulo: 'MCP Pro', href: '/mcp/mcp-pro' },
    ],
  },
  {
    id: 'clawdbot',
    num: 6,
    titulo: 'Clawdbot',
    emoji: '🦞',
    descripcion: 'Crea tu asistente personal de IA para WhatsApp y Telegram, open-source.',
    duracion: '3-4 horas',
    nivel: 'intermedio',
    totalLecciones: 7,
    href: '/clawdbot',
    lecciones: [
      { titulo: '¿Qué es Clawdbot?', href: '/clawdbot/que-es' },
      { titulo: 'Instalación', href: '/clawdbot/instalacion' },
      { titulo: 'Conectar WhatsApp/Telegram', href: '/clawdbot/conectar-plataformas' },
      { titulo: 'Primeras automatizaciones', href: '/clawdbot/primeras-automatizaciones' },
      { titulo: 'Skills y ClawdHub', href: '/clawdbot/skills' },
      { titulo: 'Tareas proactivas', href: '/clawdbot/tareas-proactivas' },
      { titulo: 'Proyecto: Tu asistente', href: '/clawdbot/proyecto-asistente' },
    ],
  },
  {
    id: 'primera-web',
    num: 7,
    titulo: 'Tu Primera Web con IA',
    emoji: '🌐',
    descripcion: 'Crea y publica una web profesional en 1 hora. El proyecto perfecto para poner todo en práctica.',
    duracion: '1-2 horas',
    nivel: 'principiante',
    totalLecciones: 1,
    href: '/curso-crea-tu-software/modulo/0',
    lecciones: [
      { titulo: 'Tu Primera Web con IA', href: '/curso-crea-tu-software/modulo/0' },
    ],
  },
]

export const TOTAL_LECCIONES_GRATIS = MODULOS_GRATIS.reduce((acc, m) => acc + m.totalLecciones, 0)

export function getModuloGratis(id: string): ModuloGratis | undefined {
  return MODULOS_GRATIS.find(m => m.id === id)
}
