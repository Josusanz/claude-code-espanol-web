// Genera la base de conocimiento para el bot de Discord
// desde los datos reales del curso

import { CURSO_SEMANAS, SEMANAS_FECHAS } from './curso-data'
import fs from 'fs'
import path from 'path'

// Lee archivos MDX y extrae el contenido
function extractMdxContent(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    // Remover frontmatter
    const withoutFrontmatter = content.replace(/^---[\s\S]*?---\n/, '')
    // Remover imports y exports
    const withoutImports = withoutFrontmatter.replace(/^import.*$/gm, '').replace(/^export.*$/gm, '')
    // Limpiar
    return withoutImports.trim().substring(0, 500) + '...'
  } catch {
    return ''
  }
}

// Genera resumen del curso de 10 semanas
function generateCursoSummary(): string {
  const semanas = CURSO_SEMANAS.map(s =>
    `- Semana ${s.num} (${s.fechaInicio}): ${s.emoji} ${s.titulo} - ${s.descripcion.substring(0, 80)}...`
  ).join('\n')

  return `
## CURSO 10 SEMANAS "Crea tu Software con IA"

**Fechas:** 19 febrero - 24 abril 2026
**Clases:** Viernes 19:00 CET
**Tecnologias:** Next.js 14, Supabase, Tailwind, Claude Code, Vercel, Stripe

### Calendario:
${semanas}

**Zoom:** https://us06web.zoom.us/j/81059741055
`
}

// Genera resumen de los cursos gratuitos desde MDX
function generateCursosGratisSummary(): string {
  const cursos = [
    { name: 'Modo Facil', path: 'pages/modo-facil', desc: 'Para principiantes, usa Claude web sin terminal' },
    { name: 'Fundamentos', path: 'pages/fundamentos', desc: 'Claude Code basico, comandos, crear archivos' },
    { name: 'Proyectos', path: 'pages/proyectos', desc: 'Landing page, automatizaciones, analisis datos' },
  ]

  return cursos.map(c => `- **${c.name}**: ${c.desc}`).join('\n')
}

// Genera la base de conocimiento completa
export function generateKnowledgeBase(): string {
  const cursoSummary = generateCursoSummary()
  const cursosGratis = generateCursosGratisSummary()

  return `
# BASE DE CONOCIMIENTO - aprende.software

## INSTALACION CLAUDE CODE
**IMPORTANTE: Claude Code es CLI (terminal), NO extension VS Code**

Mac/Linux:
\`\`\`
curl -fsSL https://claude.ai/install | sh
\`\`\`

Windows PowerShell (admin):
\`\`\`
irm https://claude.ai/install.ps1 | iex
\`\`\`

Verificar: \`claude --version\`
Iniciar: \`claude\`
Requiere: Claude Pro ($20/mes)

## ABRIR TERMINAL
- **Mac:** Cmd+Espacio → "Terminal" o Aplicaciones > Utilidades > Terminal
- **Windows:** Buscar "PowerShell" → click derecho → Ejecutar como administrador
- **Linux:** Ctrl+Alt+T

## CURSOS GRATUITOS
${cursosGratis}

## CURSOS PREMIUM
- **Ralph Loop:** Metodologia para tareas autonomas largas
- **Clawdbot:** Asistente IA en WhatsApp/Telegram
- **MCP:** Conectar Claude con Notion, GitHub, bases de datos
- **Course Builder:** Crear tus propios cursos interactivos

${cursoSummary}

## PRECIOS
- Claude gratis: ~30 mensajes/dia
- Claude Pro: $20/mes (necesario para Claude Code)
- Claude Max: $100/mes

## TECNOLOGIAS DEL CURSO
- **Next.js 14:** Framework React con App Router
- **Supabase:** Base de datos PostgreSQL + Auth
- **Tailwind CSS:** Framework de estilos
- **shadcn/ui:** Componentes de UI
- **Claude Code:** Programar con IA
- **Vercel:** Deploy y hosting
- **Stripe:** Pagos online

## CONTACTO
- Web: https://www.aprende.software
- Instructor: Josu Sanz
- Discord: Servidor del curso
`.trim()
}

// Exporta version corta para respuestas rapidas
export function generateQuickKnowledge(): string {
  const proximaSemana = CURSO_SEMANAS[0]

  return `Eres el asistente de aprende.software (curso de Josu Sanz).

RESPUESTAS CLAVE:

TERMINAL:
- Mac: Cmd+Espacio → "Terminal"
- Windows: Buscar "PowerShell" → Ejecutar como admin
- Linux: Ctrl+Alt+T

CLAUDE CODE (CLI, NO extension VS Code):
- Mac/Linux: curl -fsSL https://claude.ai/install | sh
- Windows: irm https://claude.ai/install.ps1 | iex
- Requiere Claude Pro ($20/mes)

CURSO 10 SEMANAS:
- Inicio: 19 febrero 2026
- Clases: Viernes 19:00 CET
- Tecnologias: Next.js, Supabase, Tailwind, Claude Code, Vercel
- Zoom: https://us06web.zoom.us/j/81059741055

CURSOS DISPONIBLES:
- Modo Facil (gratis): Principiantes, Claude web
- Fundamentos (gratis): Claude Code basico
- Proyectos (gratis): Landing, automatizaciones
- Ralph/Clawdbot/MCP/Course Builder (premium)

PRECIOS: Claude gratis (~30 msgs/dia), Pro $20/mes, Max $100/mes

Responde en espanol, conciso (max 300 chars).`
}
