# aprende.software — Curso de Claude Code en Español

## Descripción
Plataforma educativa en español para aprender Claude Code. Público: personas sin experiencia en programación que quieren crear software con IA ("vibe coding"). Creado por Josu Sanz.

URL: aprende.software
Repo: github.com/Josusanz/claude-code-espanol-web

## Stack técnico
- **Framework**: Next.js (Pages Router) + TypeScript
- **Docs/MDX**: Nextra (tema `nextra-theme-docs`)
- **Estilos**: Tailwind CSS
- **Auth**: Cloudflare KV (precurso-kv.ts, curso-kv.ts) + LemonSqueezy (pagos)
- **API de IA**: Anthropic SDK (@anthropic-ai/sdk)
- **Deploy**: Vercel
- **Bot Discord**: API Routes en /pages/api/discord/

## Estructura del proyecto

```
pages/
├── modo-facil/        → Módulo gratuito para usar Claude desde el navegador (sin terminal)
├── precurso/          → Precurso de pago: glosario, requisitos, quiz, primer proyecto (.tsx pages)
├── empezar/           → Guía de instalación de Claude Code
├── fundamentos/       → Módulo 1: 11 lecciones (1.1-1.11) sobre fundamentos de Claude Code (.mdx)
├── proyectos/         → Módulo 2: 11 lecciones (2.1-2.11) proyectos prácticos (.mdx)
├── ralph/             → Módulo 3: 9 lecciones (3.1-3.9) Ralph Loop + Agent Teams (.mdx)
├── mcp/               → Módulo MCP: 6 lecciones sobre Model Context Protocol (.mdx)
├── clawdbot/          → Módulo ClawdBot: crear bot de Discord con Claude
├── curso/             → Curso de pago (10 semanas SaaS bootcamp, datos en lib/curso-data.ts)
├── course-builder/    → Course Builder premium
├── admin/             → Panel admin (Josu)
├── api/               → API Routes (chat, discord, admin, precurso, curso)
├── blog/              → Blog posts
└── index.tsx          → Landing page principal
```

```
lib/
├── curso-data.ts              → Datos de las 10 semanas del curso de pago (estructura, contenido, fechas)
├── curso-interactivo-data.ts  → Datos del curso interactivo en terminal
├── discord-knowledge-base.ts  → Knowledge base para el bot de Discord
├── curso-kv.ts                → Auth/progreso del curso (Cloudflare KV)
├── precurso-kv.ts             → Auth/progreso del precurso
└── email/                     → Templates de email
```

```
components/
├── PrecursoEmailGate.tsx    → Gate de acceso al precurso
├── CursoEmailGate.tsx       → Gate de acceso al curso de pago
├── RalphAccessGate.tsx      → Gate para lecciones del módulo Ralph
├── CourseBuilderAccessGate.tsx → Gate para Course Builder
├── PremiumCTA.tsx           → CTAs de venta
├── RuedaCreador.tsx         → Componente interactivo Rueda del Creador
└── AdaptiveTutor.tsx        → Tutor adaptativo con IA
```

## Modelos de IA en uso
- **API calls**: `claude-sonnet-4-5-20250929` (chat, admin, curso interactivo)
- **Discord bot**: `claude-haiku-4-5-20250929` (respuestas rápidas)
- **Referencias en contenido**: Opus 4.6, Sonnet 4.5, Haiku 4.5

## Convenciones
- **Idioma del contenido**: Español de España, tuteo
- **Tono**: Cercano, motivador, sin jerga innecesaria
- **Lecciones gratuitas**: `.mdx` con Nextra components (Callout, Steps, FileTree, Tabs)
- **Precurso/Curso de pago**: `.tsx` con diseño custom (temas light/dark, progress tracking)
- **Gates de acceso**: Cada sección de pago tiene su EmailGate component
- **Navegación**: `_meta.ts` en cada carpeta define orden y títulos (ej: "1.1 ¿Qué es?")
- **Lecciones Ralph**: Envueltas en `<RalphAccessGate>` para control de acceso

## Comandos
- `npm run dev` — Desarrollo local
- `npm run build` — Build de producción
- `npm run start` — Servidor de producción

## Estado actual (Febrero 2026)

### Contenido completo
- Modo Fácil: 8 lecciones (gratis, sin terminal)
- Precurso: 7 páginas (programar-con-ia, glosario, requisitos, errores, quiz, primer-proyecto, discord)
- Fundamentos: 11 lecciones (1.1-1.11 incluyendo por-que-claude-code y skills-hooks-plugins)
- Proyectos: 11 lecciones (2.1-2.11 incluyendo seguridad-codigo-ia)
- Ralph Loop: 9 lecciones (3.1-3.9 incluyendo agent-teams)
- MCP: 6 lecciones (actualizado con ecosistema 2026, MCP Apps, cloud providers)
- ClawdBot: completo
- Curso de pago: 10 semanas (LaunchPad → Lanzamiento)

### Última actualización grande (16 Feb 2026)
- Todos los modelos actualizados a Opus 4.6 / Sonnet 4.5 / Haiku 4.5
- Nuevas lecciones: Agent Teams, Skills/Hooks/Plugins, Por qué Claude Code, Seguridad del código IA
- MCP actualizado con ecosistema 2026 (AWS, Google Cloud, Microsoft, MCP Apps)
- Discord knowledge base reescrita con info 2026
- Concepto "vibe coding" integrado en Modo Fácil, Precurso y Fundamentos
- Tip de "actualizar CLAUDE.md al final de sesión" añadido al curso de pago y lección de memoria
