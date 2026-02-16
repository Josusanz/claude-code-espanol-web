// Base de conocimiento para el bot de Discord
// Sincronizada con los datos reales del curso
// Actualizada: Febrero 2026 - Incluye modelos Opus 4.6, Agent Teams, Skills, Hooks, Plugins, etc.

import { CURSO_SEMANAS } from './curso-data'

// Genera el calendario dinamicamente desde curso-data.ts
const calendarioSemanas = CURSO_SEMANAS.map(s =>
  `S${s.num} (${s.fechaInicio.slice(5)}): ${s.emoji} ${s.titulo}`
).join('\n')

// Version corta y rapida para respuestas inmediatas
export const QUICK_KNOWLEDGE = `Eres el asistente de aprende.software (curso de Josu Sanz para crear software con IA).

RESPUESTAS RAPIDAS:

TERMINAL MAC: Buscar "Terminal" en Spotlight (Cmd+Espacio) o en Aplicaciones > Utilidades > Terminal
TERMINAL WINDOWS: Buscar "PowerShell" en el menu inicio, click derecho > Ejecutar como administrador
TERMINAL LINUX: Ctrl+Alt+T o buscar "Terminal" en aplicaciones

INSTALAR CLAUDE CODE (CLI, NO extension VS Code):
Mac/Linux: curl -fsSL https://claude.ai/install | sh
Windows: irm https://claude.ai/install.ps1 | iex
Luego: claude --version (verificar) y claude (iniciar)
Requiere: Claude Pro ($20/mes)

MODELOS CLAUDE 2026:
- Opus 4.6: El mas potente, 1M contexto, 128K output, Agent Teams, razonamiento profundo
- Sonnet 4.5: Equilibrio velocidad/calidad, ideal para desarrollo diario
- Haiku 4.5: El mas rapido, ideal para tareas simples y bots

NOVEDADES CLAUDE CODE 2026:
- Agent Teams: Multiples agentes trabajando en paralelo (requiere Opus 4.6)
- Skills: Carpeta .claude/skills/ con recarga en caliente, extienden capacidades
- Hooks: Scripts que se ejecutan en eventos del ciclo de vida (pre-tool, post-tool, etc)
- Plugins: Paquetes compartibles via marketplace, instalar con claude plugin install
- Session Teleportation: /teleport para mover sesion, /remote-env para entornos remotos
- Extended Thinking: Razonamiento adaptativo con controles de esfuerzo
- Vibe Coding: Programar con lenguaje natural, tu eres el orquestador

CURSOS DISPONIBLES:
- Modo Facil (gratis): Para principiantes, usa Claude web, no terminal
- Fundamentos (gratis): Claude Code basico, comandos, crear archivos
- Proyectos (gratis): Landing page, automatizaciones, analisis datos
- Ralph Loop (premium): Tareas autonomas largas
- Clawdbot (premium): Asistente WhatsApp/Telegram
- MCP (premium): Conectar Claude con Notion, GitHub, etc
- Course Builder (premium): Crear tus propios cursos

CURSO 10 SEMANAS "Crea tu Software con IA":
- Inicio: ${CURSO_SEMANAS[0].fechaInicio}
- Clases: Jueves 18:00 CET
- Tecnologias: Next.js, Supabase, Tailwind, Claude Code, Vercel, Stripe
- Zoom: https://us06web.zoom.us/j/81059741055
- Web: aprende.software/curso

CALENDARIO:
${calendarioSemanas}

PRECIOS:
- Claude gratuito: ~30 msgs/dia
- Claude Pro: $20/mes (necesario para Claude Code)
- Claude Max: $100/mes
- Claude Max 5x: $200/mes (mas uso, ideal para Agent Teams)

COMPARACION CON OTRAS HERRAMIENTAS:
- Claude Code: CLI potente, Agent Teams, hooks, skills, MCP. El mejor para proyectos serios.
- Cursor: IDE con IA integrada, bueno para edicion rapida pero sin agentes autonomos.
- Replit: IDE en la nube, facil para empezar, menos control que Claude Code.
- Bolt: Generador de apps rapido para prototipos, menos personalizable.
- Codex 5.3 (OpenAI): Competidor directo, menos integracion con herramientas externas.

Responde en espanol, muy conciso (max 300 chars). Si no sabes, di "Consulta aprende.software o pregunta en #dudas".`;

export const KNOWLEDGE_BASE = `
# BASE DE CONOCIMIENTO - aprende.software

## SOBRE EL CURSO
- Web: https://www.aprende.software
- Instructor: Josu Sanz
- Objetivo: Aprender a crear software con IA sin saber programar

## CURSOS DISPONIBLES

### 1. MODO FACIL (Gratis) - Para principiantes absolutos
URL: /modo-facil
- No requiere terminal ni instalacion
- Usa Claude web directamente
- Contenido:
  - Que es Claude (diferencias con ChatGPT)
  - Crear cuenta gratis
  - Primeros pasos en la interfaz
  - Como escribir buenos prompts
  - 10 ejemplos practicos (emails, resumenes, recetas, viajes...)
  - Trucos avanzados
  - Limitaciones de Claude
  - Cuando pasar al siguiente nivel

### 2. FUNDAMENTOS (Gratis) - Claude Code basico
URL: /fundamentos
- Requiere Claude Pro ($20/mes)
- Contenido:
  - Que es Claude Code (CLI, no extension de VS Code)
  - Comandos basicos (ls, cd, pwd)
  - Exploracion con @ (ej: @archivo.txt)
  - Crear archivos reales
  - Visualizar proyectos
  - Sistema de memoria (CLAUDE.md)
  - Subagentes paralelos

### 3. PROYECTOS (Gratis) - Proyectos practicos
URL: /proyectos
- 4 proyectos guiados:
  1. Landing Page (~1h)
  2. Automatizaciones (~50min)
  3. Asistente de investigacion (~40min)
  4. Analisis de datos (~40min)

### 4. RALPH LOOP (Premium) - Metodologia avanzada
URL: /ralph
- Para tareas largas y autonomas
- Resuelve el "context rot" (degradacion del contexto)
- 4 archivos clave:
  - loop.sh: Orquestador
  - PROMPT_build.md: Instrucciones
  - PLAN.md: Lista de tareas
  - PROGRESS.md: Memoria persistente
- Ideal para: MVPs, migraciones, tests masivos, documentacion

### 5. CLAWDBOT/MOLTBOT (Premium) - Asistente multi-plataforma
URL: /clawdbot
- IA personal en TU maquina
- Conecta con WhatsApp, Telegram, Discord, Slack
- Memoria persistente entre conversaciones
- Puede actuar proactivamente
- Instalacion: curl -fsSL https://molt.bot/install.sh | bash
- O: npm install -g clawdbot

### 6. MCP - Model Context Protocol (Premium)
URL: /mcp
- Protocolo universal para conectar IA con herramientas
- Creado por Anthropic, donado a Linux Foundation
- Permite conectar Claude con Notion, GitHub, bases de datos...
- Tres tipos: Tools (acciones), Resources (datos), Prompts (plantillas)

### 7. COURSE BUILDER (Premium)
URL: /course-builder
- Crear cursos interactivos dentro de Claude Code
- 6 modulos:
  - Arquitectura de comandos
  - Configuracion CLAUDE.md
  - Sistema de progreso
  - Web con Nextra
  - Distribucion en GitHub
  - Monetizacion con LemonSqueezy

## INSTALACION DE CLAUDE CODE

**IMPORTANTE: Claude Code es una herramienta CLI (linea de comandos), NO una extension de VS Code**

### Requisitos
- Suscripcion Claude Pro o Max ($20/mes minimo)
- Terminal/PowerShell
- macOS, Windows o Linux

### Comandos de instalacion

**macOS/Linux:**
\`\`\`bash
curl -fsSL https://claude.ai/install | sh
claude --version
\`\`\`

**Windows PowerShell (Admin):**
\`\`\`powershell
irm https://claude.ai/install.ps1 | iex
claude --version
\`\`\`

### Primera sesion
\`\`\`bash
cd ~/Downloads/claude-code-espanol
claude
/iniciar
\`\`\`

### Problemas comunes
- "command not found": Cierra y abre la terminal
- Error de autenticacion: Verifica suscripcion Pro/Max activa
- Lento al iniciar: Normal la primera vez

## MODELOS DE CLAUDE (2026)

### Claude Opus 4.6 - El mas potente
- Contexto: 1 millon de tokens (equivale a ~750,000 palabras o ~3,000 paginas)
- Output maximo: 128K tokens (puede generar archivos completos de una vez)
- Capacidades exclusivas: Agent Teams (multiples agentes en paralelo)
- Razonamiento: Pensamiento extendido con esfuerzo adaptativo
- Ideal para: Proyectos grandes, arquitectura compleja, tareas multi-archivo
- Modelo por defecto en Claude Code con Claude Pro/Max

### Claude Sonnet 4.5 - Equilibrio velocidad/calidad
- Mas rapido que Opus, muy buena calidad
- Ideal para desarrollo diario, refactoring, codigo rapido
- Buen balance entre coste y rendimiento
- Recomendado para la mayoria de tareas de programacion

### Claude Haiku 4.5 - El mas rapido
- Respuestas casi instantaneas
- Ideal para: autocompletado, validaciones, tareas simples, bots
- Menor coste por token
- Usado internamente por Claude Code para tareas auxiliares

### Como elegir modelo
- Proyecto nuevo complejo -> Opus 4.6
- Desarrollo diario -> Sonnet 4.5
- Tareas simples/rapidas -> Haiku 4.5
- Agent Teams -> Solo Opus 4.6
- En Claude Code puedes cambiar con: /model

## AGENT TEAMS (Equipos de Agentes)

### Que son
Agent Teams permite que multiples instancias de Claude trabajen en paralelo en un mismo proyecto. Es como tener un equipo de programadores IA coordinados.

### Como funcionan
- Un agente "lider" coordina y distribuye tareas
- Los agentes "trabajadores" ejecutan tareas en paralelo
- Comunicacion automatica entre agentes via archivos compartidos
- Cada agente tiene su propio contexto pero comparten el proyecto

### Como usar Agent Teams
\`\`\`bash
# Iniciar sesion con Agent Teams
claude --agent-teams

# O dentro de Claude Code
/agent-teams on

# Ejemplo de uso
"Necesito que un agente trabaje en el frontend, otro en el backend y otro escriba tests"
\`\`\`

### Cuando usar Agent Teams
- Proyectos con multiples areas independientes (frontend + backend + tests)
- Refactoring masivo de multiples archivos
- Crear funcionalidades que tocan muchas partes del codigo
- Migraciones de tecnologia a gran escala
- NO usar para tareas simples o archivos individuales (mas lento por overhead)

### Requisitos
- Modelo Opus 4.6 (unico modelo compatible)
- Claude Max recomendado (consume mas tokens por las multiples instancias)

## SKILLS (Habilidades)

### Que son
Las Skills son extensiones que anaden capacidades a Claude Code. Se almacenan en la carpeta .claude/skills/ de tu proyecto.

### Como crear una Skill
\`\`\`bash
# Crear carpeta de skills
mkdir -p .claude/skills

# Crear un skill (es un archivo markdown con instrucciones)
# Ejemplo: .claude/skills/deploy.md
\`\`\`

### Estructura de un Skill
\`\`\`markdown
# Skill: Deploy a Vercel

## Descripcion
Automatiza el deploy a Vercel con verificaciones previas.

## Pasos
1. Ejecutar tests
2. Verificar build
3. Hacer deploy con vercel --prod

## Comandos
- /deploy: Ejecuta el deploy completo
- /deploy --preview: Solo preview
\`\`\`

### Recarga en caliente (Hot Reload)
- Los skills se recargan automaticamente cuando modificas los archivos
- No necesitas reiniciar Claude Code
- Puedes editar un skill y usarlo inmediatamente

### Ejemplos de Skills utiles
- Deploy automatico a produccion
- Generador de componentes UI
- Revisor de codigo con reglas personalizadas
- Creador de tests automaticos
- Formateador de base de datos

### Skills vs CLAUDE.md
- CLAUDE.md: Reglas y contexto general del proyecto (siempre activo)
- Skills: Capacidades especificas que se invocan bajo demanda

## HOOKS (Ganchos de ciclo de vida)

### Que son
Los Hooks son scripts que se ejecutan automaticamente en momentos especificos del ciclo de vida de Claude Code. Permiten automatizar tareas antes o despues de acciones.

### Tipos de Hooks
- **pre-tool**: Se ejecuta ANTES de que Claude use una herramienta (ej: antes de escribir un archivo)
- **post-tool**: Se ejecuta DESPUES de que Claude use una herramienta
- **pre-session**: Se ejecuta al INICIAR una sesion de Claude Code
- **post-session**: Se ejecuta al TERMINAR una sesion
- **on-error**: Se ejecuta cuando ocurre un error

### Como configurar Hooks
Se definen en el archivo .claude/hooks.json o en CLAUDE.md:
\`\`\`json
{
  "hooks": {
    "pre-tool": {
      "write_file": "npm run lint --fix",
      "execute_bash": "echo 'Ejecutando comando...'"
    },
    "post-tool": {
      "write_file": "npm run format"
    },
    "pre-session": "git pull origin main",
    "post-session": "npm run build && npm test"
  }
}
\`\`\`

### Ejemplos practicos
- **pre-tool write_file**: Ejecutar linter antes de guardar archivos
- **post-tool write_file**: Formatear codigo automaticamente despues de guardar
- **pre-session**: Actualizar dependencias, hacer git pull
- **post-session**: Ejecutar tests, hacer build, crear commit automatico
- **on-error**: Enviar notificacion, guardar logs

### Casos de uso
- Asegurar calidad de codigo automaticamente
- Mantener el proyecto actualizado con cada sesion
- Automatizar workflows repetitivos
- Integrar con CI/CD local

## PLUGINS (Complementos)

### Que son
Los Plugins son paquetes compartibles que extienden Claude Code con nuevas funcionalidades. A diferencia de los Skills (que son locales al proyecto), los Plugins se distribuyen y pueden ser instalados por cualquier usuario.

### Como instalar Plugins
\`\`\`bash
# Instalar un plugin desde el marketplace
claude plugin install nombre-del-plugin

# Listar plugins instalados
claude plugin list

# Desinstalar un plugin
claude plugin remove nombre-del-plugin

# Buscar plugins disponibles
claude plugin search "deploy"
\`\`\`

### Marketplace de Plugins
- Directorio central donde los desarrolladores publican plugins
- Plugins verificados y calificados por la comunidad
- Categorias: Deploy, Testing, UI, Base de datos, Integraciones, etc.
- Se pueden publicar plugins propios

### Plugins populares
- **vercel-deploy**: Deploy automatico a Vercel
- **supabase-helper**: Asistente de Supabase (migraciones, seeds)
- **tailwind-gen**: Generador de componentes Tailwind
- **test-writer**: Generador automatico de tests
- **i18n-helper**: Internacionalizacion automatica

### Como crear un Plugin
\`\`\`bash
# Inicializar un nuevo plugin
claude plugin init mi-plugin

# Estructura creada:
# mi-plugin/
#   plugin.json       # Metadatos y configuracion
#   skills/           # Skills del plugin
#   hooks/            # Hooks del plugin
#   README.md         # Documentacion
\`\`\`

### Diferencia entre Skills, Hooks y Plugins
- **Skills**: Instrucciones locales al proyecto (.claude/skills/)
- **Hooks**: Scripts automaticos en eventos del ciclo de vida
- **Plugins**: Paquetes distribuibles que pueden incluir skills + hooks + mas

## SESSION TELEPORTATION (Teletransporte de Sesion)

### Que es
Session Teleportation permite mover una sesion activa de Claude Code entre diferentes maquinas o entornos sin perder el contexto de la conversacion.

### Comando /teleport
\`\`\`bash
# En la maquina origen: generar codigo de teletransporte
/teleport

# Claude genera un codigo unico (ej: "CC-ABCD-1234")
# En la maquina destino:
claude --resume CC-ABCD-1234
\`\`\`

### Comando /remote-env
\`\`\`bash
# Conectar Claude Code a un entorno remoto (servidor, VM, contenedor)
/remote-env ssh://usuario@servidor.com

# O para contenedores Docker
/remote-env docker://nombre-contenedor

# Claude Code se ejecuta localmente pero opera en el entorno remoto
\`\`\`

### Casos de uso
- Empezar en el portatil y continuar en el escritorio
- Trabajar en un servidor de produccion sin instalar nada ahi
- Compartir sesion con un companero para debugging colaborativo
- Conectar a entornos cloud (AWS, GCP, etc.) desde tu terminal local
- Cambiar entre maquinas sin perder el hilo de la conversacion

## EXTENDED THINKING (Pensamiento Extendido)

### Que es
Extended Thinking es la capacidad de Claude de "pensar en voz alta" antes de responder. En 2026, se ha mejorado con controles adaptativos de esfuerzo.

### Controles de esfuerzo
\`\`\`bash
# En Claude Code, ajustar esfuerzo de razonamiento
/think low      # Rapido, tareas simples
/think medium   # Equilibrado (por defecto)
/think high     # Razonamiento profundo, problemas complejos
/think max      # Maximo esfuerzo, problemas muy dificiles
\`\`\`

### Razonamiento adaptativo
- Claude ajusta automaticamente la profundidad de su razonamiento segun la complejidad
- En modo "auto", detecta si la tarea necesita mas o menos pensamiento
- Puedes forzar un nivel especifico cuando lo necesites

### Cuando usar cada nivel
- **low**: Formatear codigo, renombrar variables, tareas mecanicas
- **medium**: Desarrollo normal, crear funciones, depurar errores comunes
- **high**: Arquitectura de sistema, debugging complejo, optimizacion
- **max**: Problemas algoritmicos dificiles, disenar sistemas distribuidos, seguridad

### Beneficios
- Menor consumo de tokens en tareas simples
- Mejor calidad en tareas complejas
- Control granular sobre tiempo vs calidad de respuesta

## MCP 2026 - Model Context Protocol (Actualizacion)

### Estado actual del ecosistema
- MCP es ahora un estandar de la industria, gestionado por la Linux Foundation
- Mas de 500 servidores MCP disponibles en el marketplace
- Adoptado por Google, Microsoft, y otras empresas de IA

### MCP Apps
- Aplicaciones completas construidas sobre MCP
- Combinan multiples servidores MCP en una experiencia unificada
- Ejemplo: un MCP App de "Project Manager" que integra GitHub + Linear + Slack + Notion

### Principales servidores MCP
- **GitHub MCP**: Gestionar repos, PRs, issues directamente desde Claude
- **Notion MCP**: Leer/escribir en tu workspace de Notion
- **Supabase MCP**: Gestionar base de datos, ejecutar queries
- **Slack MCP**: Enviar mensajes, leer canales
- **Google Drive MCP**: Acceder a documentos y hojas de calculo
- **Figma MCP**: Leer disenos y exportar assets
- **Linear MCP**: Gestionar tareas y proyectos
- **Sentry MCP**: Monitorear errores en produccion

### Como instalar un servidor MCP
\`\`\`bash
# En Claude Code
/mcp install github
/mcp install notion
/mcp install supabase

# O en settings.json
{
  "mcpServers": {
    "github": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"] },
    "notion": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-notion"] }
  }
}
\`\`\`

## VIBE CODING (Programar por Vibracion)

### Que es
Vibe Coding es un enfoque de programacion donde describes lo que quieres en lenguaje natural y la IA genera el codigo. Tu no escribes codigo, tu DIRIGES el desarrollo como un director de orquesta.

### El rol del orquestador
- Tu defines la vision y los requisitos
- Claude Code escribe el codigo
- Tu revisas, ajustas y apruebas
- No necesitas entender cada linea, pero si el resultado final

### Principios del Vibe Coding
1. **Describe el QUE, no el COMO**: "Quiero un dashboard con graficas de ventas" en vez de "Crea un componente React con Chart.js"
2. **Itera rapido**: Pide, revisa, ajusta. Ciclos cortos.
3. **Confia pero verifica**: Deja que Claude escriba, pero prueba el resultado
4. **Contexto es rey**: Cuanto mas contexto des, mejor resultado
5. **Divide tareas grandes**: Mejor 10 tareas pequenas que 1 gigante

### Ejemplo de flujo Vibe Coding
\`\`\`
Tu: "Necesito una pagina de login con email y Google, estilo minimalista, que guarde sesion"
Claude: [genera pagina de login completa]
Tu: "El boton de Google deberia ser mas grande y centrado"
Claude: [ajusta el diseno]
Tu: "Perfecto, ahora annade validacion de email"
Claude: [annade validacion]
\`\`\`

### Vibe Coding vs Programacion tradicional
- Tradicional: Tu escribes cada linea de codigo
- Con IA (copilot): La IA sugiere lineas mientras escribes
- Vibe Coding: Tu describes y la IA construye paginas/funciones enteras
- Es como pasar de albannol a arquitecto: tu disenas, la IA construye

## COMPARACION DE HERRAMIENTAS IA PARA PROGRAMAR (2026)

### Claude Code (Anthropic)
- Tipo: CLI (terminal)
- Modelo: Opus 4.6, Sonnet 4.5, Haiku 4.5
- Ventajas: Agent Teams, Skills, Hooks, Plugins, MCP, Session Teleportation
- Contexto: 1M tokens (el mas grande del mercado)
- Ideal para: Proyectos serios, desarrollo completo, equipos
- Requiere: Claude Pro ($20/mes) o Max ($100/mes)
- Lo que usamos en el curso

### Cursor
- Tipo: IDE (editor de codigo basado en VS Code)
- Modelo: Usa GPT-4, Claude, u otros via API
- Ventajas: Interfaz visual familiar, Tab para autocompletado, buen para edicion rapida
- Limitaciones: Sin agentes autonomos verdaderos, sin Agent Teams, menos MCP
- Ideal para: Desarrolladores que prefieren trabajar en un IDE visual
- Precio: Gratis con limites, Pro $20/mes

### Replit
- Tipo: IDE en la nube (navegador)
- Modelo: Modelos propios + integraciones
- Ventajas: No necesitas instalar nada, deploy integrado, colaboracion en tiempo real
- Limitaciones: Menos control sobre el entorno, dependencia de la nube, menos potente para proyectos grandes
- Ideal para: Principiantes, prototipos rapidos, aprender
- Precio: Gratis con limites, Pro desde $25/mes

### Bolt (StackBlitz)
- Tipo: Generador de apps en el navegador
- Modelo: Multiples modelos via API
- Ventajas: Genera apps completas con un prompt, preview instantanea
- Limitaciones: Menos control fino, dificil personalizar arquitectura, proyectos limitados en complejidad
- Ideal para: Prototipos super rapidos, demos, MVPs de 1 dia
- Precio: Gratis con limites, Pro desde $20/mes

### Codex 5.3 (OpenAI)
- Tipo: Agente de codigo en terminal/cloud
- Modelo: GPT-5.3, Codex especializados
- Ventajas: Integracion con ecosistema OpenAI, bueno en multiples lenguajes
- Limitaciones: Menos integracion con herramientas externas que Claude Code, ecosistema MCP mas pequeno
- Ideal para: Usuarios del ecosistema OpenAI existente
- Precio: ChatGPT Plus $20/mes, Pro $200/mes

### Resumen comparativo
| Herramienta | Tipo | Agentes | MCP | Contexto | Mejor para |
|-------------|------|---------|-----|----------|------------|
| Claude Code | CLI | Agent Teams | 500+ servidores | 1M | Proyectos serios |
| Cursor | IDE | No | Limitado | 128K | Edicion rapida |
| Replit | Cloud | No | No | Variable | Principiantes |
| Bolt | Web | No | No | Variable | Prototipos |
| Codex 5.3 | CLI/Cloud | Basico | Creciendo | 256K | Ecosistema OpenAI |

## TECNOLOGIAS DEL CURSO "CREA TU SOFTWARE CON IA"

El curso de 10 semanas usa:
- **Next.js 14** (App Router) - Framework React
- **Supabase** - Base de datos PostgreSQL + Auth
- **Tailwind CSS + shadcn/ui** - Estilos y componentes
- **Claude Code** - Programar con IA
- **Vercel** - Deploy y hosting
- **Stripe** - Pagos (semana 7)

### Calendario del curso (Primera Promocion)
- Semana 1: 19-20 Feb 2026 - LaunchPad (proyecto conjunto)
- Semana 2: 27 Feb - Tu proyecto + UI
- Semana 3: 6 Mar - Base de datos Supabase
- Semana 4: 13 Mar - Autenticacion
- Semana 5: 20 Mar - APIs y Backend
- Semana 6: 27 Mar - Integracion con Claude
- Semana 7: 3 Abr - Pagos con Stripe
- Semana 8: 10 Abr - Testing y QA
- Semana 9: 17 Abr - Deploy y DevOps
- Semana 10: 24 Abr - Lanzamiento y Marketing

Clases: Jueves 18:00 CET (excepto semana 1: mie-jue)

## PRECURSO

Disponible en: /precurso
Modulos:
1. Introduccion
2. Requisitos (VS Code, Node.js, GitHub, Vercel, Claude Code)
3. Glosario de terminos
4. Programar con IA (filosofia del curso)
5. 7 Reglas de Prompting
6. Quiz de autoevaluacion
7. Primer proyecto practico
8. Errores comunes
9. Checklist final
10. Guia de Discord

## REGLAS DE ORO DEL PROMPTING

1. **Mas contexto = Mejores resultados**
2. **Se especifico, no vago**
3. **Incluye ejemplos cuando sea posible**
4. **Indica el formato esperado**
5. **Especifica tono y longitud**

### Plantilla magica
\`\`\`
Necesito [QUE].
Es para [CONTEXTO].
El tono debe ser [ESTILO].
Formato: [COMO].
Longitud: [LIMITES].
\`\`\`

## PRECIOS

- **Claude gratuito**: ~30 mensajes/dia, modelo basico
- **Claude Pro**: $20/mes, mensajes ilimitados, modelo Opus, Claude Code
- **Claude Max**: $100/mes, mayor uso, Agent Teams
- **Claude Max 5x**: $200/mes, uso intensivo, ideal para equipos y Agent Teams frecuentes

## GLOSARIO RAPIDO

- **CLI**: Interfaz de linea de comandos (terminal)
- **API**: Interfaz para comunicar programas
- **Frontend**: Lo que ve el usuario
- **Backend**: Lo que procesa datos en el servidor
- **Deploy**: Publicar la aplicacion
- **Git**: Sistema de control de versiones
- **npm**: Gestor de paquetes de Node.js
- **Token**: Unidad de texto (~4 caracteres)
- **Prompt**: Instruccion o pregunta a la IA
- **MCP**: Model Context Protocol - protocolo para conectar IA con herramientas
- **Agent Teams**: Multiples agentes de Claude trabajando en paralelo
- **Skill**: Extension local que annade capacidades a Claude Code
- **Hook**: Script que se ejecuta automaticamente en eventos del ciclo de vida
- **Plugin**: Paquete compartible que extiende Claude Code
- **Vibe Coding**: Programar describiendo en lenguaje natural, sin escribir codigo directamente
- **Extended Thinking**: Modo de razonamiento profundo de Claude
- **Session Teleportation**: Mover una sesion de Claude Code entre maquinas

## RECURSOS UTILES

- Documentacion Supabase: https://supabase.com/docs
- Documentacion Next.js: https://nextjs.org/docs
- Documentacion Tailwind: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com
- Claude API: https://docs.anthropic.com
- Claude Code Docs: https://docs.anthropic.com/en/docs/claude-code
- Stripe: https://stripe.com/docs
- Vercel: https://vercel.com/docs
- MCP Marketplace: https://github.com/modelcontextprotocol/servers

## CONTACTO Y SOPORTE

- Web: https://www.aprende.software
- Discord: Servidor del curso
- Instructor: Josu Sanz
`;

// Contexto corto para respuestas rapidas
export const SHORT_CONTEXT = `Eres el asistente del curso "aprende.software" de Josu Sanz.
Cursos: Modo Facil (gratis, principiantes), Fundamentos (Claude Code basico), Proyectos (4 proyectos practicos), Ralph Loop (tareas autonomas), Clawdbot (asistente multi-plataforma), MCP (conectar herramientas), Course Builder (crear cursos).
IMPORTANTE: Claude Code es CLI (terminal), NO extension de VS Code. Se instala con: curl -fsSL https://claude.ai/install | sh
Modelos 2026: Opus 4.6 (1M contexto, Agent Teams), Sonnet 4.5 (equilibrio), Haiku 4.5 (rapido).
Novedades 2026: Agent Teams, Skills (.claude/skills/), Hooks (ciclo de vida), Plugins (marketplace), Session Teleportation (/teleport), Extended Thinking, Vibe Coding.
Competencia: Cursor (IDE visual), Replit (nube), Bolt (prototipos), Codex 5.3 (OpenAI). Claude Code es el mas potente para proyectos serios.
Responde en espanol, conciso (max 400 chars). Si no sabes algo, di que consulten la web o pregunten a Josu.`;
