// Metadata de los 11 módulos del curso autoguiado "Crea tu Software"
// No duplica contenido: importa de curso-data.ts y curso-pizarra-data.ts

export interface ModuloAutoguiado {
  num: number           // 0-10
  titulo: string
  emoji: string
  descripcion: string
  duracion: string      // "3-4 horas"
  nivel: 'principiante' | 'intermedio' | 'avanzado'
  semanaNum: number | null  // mapeo a CURSO_SEMANAS (null para módulo 0)
  intro: string         // párrafo de intro antes del contenido
  leccionesRelacionadas?: { titulo: string; url: string }[]
  contenidoCustom?: string  // solo para módulo 0
}

export const MODULOS_AUTOGUIADO: ModuloAutoguiado[] = [
  {
    num: 0,
    titulo: 'Preparación: Tu Entorno',
    emoji: '🛠️',
    descripcion: 'Instala todo lo necesario y familiarízate con los conceptos básicos del vibe coding.',
    duracion: '1-2 horas',
    nivel: 'principiante',
    semanaNum: null,
    intro: 'Antes de crear tu primer proyecto, necesitas preparar tu entorno de trabajo. En este módulo instalarás las herramientas necesarias, aprenderás los términos clave del vibe coding y resolverás los errores más comunes.',
    leccionesRelacionadas: [
      { titulo: 'Instalar Claude Code', url: '/empezar' },
      { titulo: 'Modo Fácil (sin terminal)', url: '/modo-facil' },
      { titulo: 'Fundamentos de Claude Code', url: '/fundamentos' },
    ],
    contenidoCustom: `## ¿Qué es el vibe coding?

Vibe coding es crear software describiéndole a una IA lo que quieres, en lugar de escribir código tú mismo. Tú pones la visión y las decisiones; la IA escribe el código.

No necesitas saber programar. Solo necesitas:
- Saber **qué** quieres crear
- Saber **describir** lo que quieres con claridad
- Revisar que el resultado funcione

---

## Glosario de términos clave

Estos son los conceptos que verás a lo largo del curso:

- **Terminal** — La ventana donde escribes comandos. En Mac se llama Terminal, en Windows PowerShell.
- **Claude Code** — La herramienta de Anthropic que crea software desde el terminal. Le describes lo que quieres y Claude lo construye.
- **Prompt** — El mensaje que le envías a Claude. Cuanto más claro y específico, mejor resultado.
- **CLAUDE.md** — Un archivo que le da contexto a Claude sobre tu proyecto. Lo lee automáticamente al iniciar.
- **Next.js** — Un framework para crear webs y aplicaciones. Es lo que usaremos en el curso.
- **Supabase** — Base de datos + autenticación gratis. Donde guardarás los datos de tu app.
- **Vercel** — Plataforma para publicar tu web en internet. Gratis para proyectos personales.
- **GitHub** — Donde guardas tu código en la nube. Como un Google Drive para programadores.
- **npm** — El "instalador de paquetes" de JavaScript. Instala librerías con un solo comando.
- **Tailwind CSS** — Sistema de estilos que Claude usa para diseñar interfaces bonitas.
- **shadcn/ui** — Componentes de interfaz profesionales (botones, tarjetas, formularios...).
- **MCP** — Model Context Protocol. Permite a Claude conectarse con herramientas externas.
- **Pencil** — Editor visual de diseño que Claude puede leer y escribir directamente.

---

## Requisitos: lo que necesitas instalar

### 1. Terminal
- **Mac**: Abre la app "Terminal" (ya viene instalada)
- **Windows**: Usa PowerShell o instala Windows Terminal desde la Microsoft Store
- **Linux**: Ctrl+Alt+T abre el terminal

### 2. Node.js
Node.js es el motor que ejecuta las aplicaciones JavaScript.

\`\`\`bash
node --version
\`\`\`

Si no lo tienes, descárgalo de [nodejs.org](https://nodejs.org) (versión LTS).

### 3. Claude Code

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

Verifica que funciona:

\`\`\`bash
claude --version
\`\`\`

> Si tienes problemas con la instalación, consulta la [guía completa de instalación](/empezar).

### 4. Git + GitHub
Git guarda el historial de tu proyecto. GitHub lo sube a la nube.

\`\`\`bash
git --version
\`\`\`

Si no lo tienes:
- **Mac**: \`xcode-select --install\`
- **Windows**: Descarga de [git-scm.com](https://git-scm.com)

Para GitHub, crea una cuenta en [github.com](https://github.com) e instala GitHub CLI:

\`\`\`bash
brew install gh
gh auth login
\`\`\`

### 5. Cuenta de Supabase
Crea una cuenta gratuita en [supabase.com](https://supabase.com).

### 6. Cuenta de Vercel
Crea una cuenta en [vercel.com](https://vercel.com) y conéctala con tu cuenta de GitHub.

---

## Errores comunes y cómo solucionarlos

### "command not found: claude"
Claude Code no está instalado o no está en el PATH.

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

Si sigue fallando, cierra y vuelve a abrir el terminal.

### "permission denied"
En Mac/Linux, usa sudo:

\`\`\`bash
sudo npm install -g @anthropic-ai/claude-code
\`\`\`

### "node: command not found"
Node.js no está instalado. Descárgalo de [nodejs.org](https://nodejs.org).

### "EACCES: permission denied"
Problema de permisos de npm. Solución:

\`\`\`bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
\`\`\`

Añade \`export PATH=~/.npm-global/bin:$PATH\` a tu \`~/.zshrc\` o \`~/.bashrc\`.

### Claude se queda "pensando" mucho tiempo
Es normal en tareas complejas. Si pasan más de 5 minutos, pulsa Ctrl+C y reformula tu prompt con instrucciones más específicas.

### "Module not found" al ejecutar npm run dev
Falta instalar dependencias:

\`\`\`bash
npm install
\`\`\`

---

## Tu carpeta de trabajo

Crea la carpeta donde vivirán todos tus proyectos:

\`\`\`bash
mkdir ~/curso-ia
cd ~/curso-ia
\`\`\`

A partir de aquí, todos los proyectos del curso irán dentro de esta carpeta.

---

## Siguiente paso

Con todo instalado y configurado, estás listo para crear tu primera web en el Módulo 1. ¡Vamos!`,
  },
  {
    num: 1,
    titulo: 'Tu Primera Web con IA',
    emoji: '🚀',
    descripcion: 'Crea y publica una landing page con formulario de emails usando Claude Code.',
    duracion: '3-4 horas',
    nivel: 'principiante',
    semanaNum: 1,
    intro: 'En este módulo vas a crear tu primera web completa: una landing page con formulario de captura de emails, base de datos, panel admin y deploy en producción. Todo guiado por Claude Code.',
    leccionesRelacionadas: [
      { titulo: '¿Qué es Claude Code?', url: '/fundamentos/que-es' },
      { titulo: 'CLAUDE.md y memoria', url: '/fundamentos/memoria' },
    ],
  },
  {
    num: 2,
    titulo: 'Diseño → Código con Pencil',
    emoji: '🎨',
    descripcion: 'Diseña tu interfaz con shadcn/ui y Pencil, y convierte diseños en código.',
    duracion: '3-4 horas',
    nivel: 'principiante',
    semanaNum: 2,
    intro: 'Ahora que sabes crear una web, vamos a diseñar TU proyecto. Aprenderás a usar shadcn/ui para componentes profesionales y Pencil para diseño visual que Claude convierte directamente en código.',
    leccionesRelacionadas: [
      { titulo: 'Skills, Hooks y Plugins', url: '/fundamentos/skills-hooks-plugins' },
    ],
  },
  {
    num: 3,
    titulo: 'Tu Primer SaaS',
    emoji: '🗄️',
    descripcion: 'Conecta tu app con Supabase: tablas, relaciones y CRUD completo.',
    duracion: '3-4 horas',
    nivel: 'intermedio',
    semanaNum: 3,
    intro: 'Una app sin datos no sirve de mucho. En este módulo conectarás tu proyecto con Supabase para guardar, leer, actualizar y eliminar datos. Es el paso que convierte una web estática en una aplicación real.',
  },
  {
    num: 4,
    titulo: 'APIs y Automatización',
    emoji: '🔐',
    descripcion: 'Implementa login, registro y protección de rutas con Supabase Auth.',
    duracion: '3-4 horas',
    nivel: 'intermedio',
    semanaNum: 4,
    intro: 'Los usuarios necesitan poder registrarse, loguearse y ver solo sus propios datos. En este módulo implementarás un sistema de autenticación completo con Supabase Auth y Row Level Security.',
  },
  {
    num: 5,
    titulo: 'Testing + CI/CD',
    emoji: '⚡',
    descripcion: 'Server Actions, Route Handlers y validación de datos con Zod.',
    duracion: '3-4 horas',
    nivel: 'intermedio',
    semanaNum: 5,
    intro: 'Hasta ahora has manejado datos directamente. Ahora aprenderás las formas modernas de hacerlo: Server Actions para formularios, Route Handlers para APIs externas y validación con Zod para que nada rompa tu app.',
  },
  {
    num: 6,
    titulo: 'Bases de Datos Avanzadas',
    emoji: '💳',
    descripcion: 'Integra Stripe para cobrar: checkout, suscripciones y webhooks.',
    duracion: '4-5 horas',
    nivel: 'intermedio',
    semanaNum: 6,
    intro: 'Es hora de monetizar tu SaaS. En este módulo integrarás Stripe para aceptar pagos, gestionar suscripciones y recibir notificaciones automáticas cuando alguien paga o cancela.',
  },
  {
    num: 7,
    titulo: 'Auth Pro + Seguridad',
    emoji: '📧',
    descripcion: 'Emails transaccionales con Resend y notificaciones dentro de la app.',
    duracion: '3-4 horas',
    nivel: 'avanzado',
    semanaNum: 7,
    intro: 'Un SaaS profesional se comunica con sus usuarios. Aprenderás a enviar emails automáticos (bienvenida, confirmación de pago, alertas) con Resend y a crear un sistema de notificaciones in-app.',
  },
  {
    num: 8,
    titulo: 'Performance + Escalabilidad',
    emoji: '🧪',
    descripcion: 'Añade tests con Vitest y Playwright para asegurar la calidad.',
    duracion: '3-4 horas',
    nivel: 'avanzado',
    semanaNum: 8,
    intro: 'Los tests son tu red de seguridad. En este módulo añadirás unit tests con Vitest y tests end-to-end con Playwright, y configurarás CI/CD con GitHub Actions para que todo se verifique automáticamente.',
  },
  {
    num: 9,
    titulo: 'Mobile + PWA',
    emoji: '🚄',
    descripcion: 'Optimiza velocidad, Core Web Vitals y posicionamiento en Google.',
    duracion: '3-4 horas',
    nivel: 'avanzado',
    semanaNum: 9,
    intro: 'Una app lenta pierde usuarios. En este módulo optimizarás imágenes, fonts, y SEO para que tu app cargue rápido y aparezca en Google. Medirás todo con Lighthouse y PageSpeed Insights.',
  },
  {
    num: 10,
    titulo: 'Agent Swarms + Lanzamiento',
    emoji: '🤖',
    descripcion: 'Claude Code como equipo completo de agentes + lanzamiento al mundo.',
    duracion: '4-5 horas',
    nivel: 'avanzado',
    semanaNum: 10,
    intro: 'El módulo final. Configurarás Claude Code como un equipo de agentes especializados (arquitecto, frontend, QA, DevOps) usando Skills y un CLAUDE.md reforzado. Después, lanzarás tu SaaS al mundo.',
    leccionesRelacionadas: [
      { titulo: 'Agent Teams', url: '/ralph/agent-teams' },
      { titulo: 'Skills, Hooks y Plugins', url: '/fundamentos/skills-hooks-plugins' },
    ],
  },
]

export function getModuloAutoguiado(num: number): ModuloAutoguiado | undefined {
  return MODULOS_AUTOGUIADO.find(m => m.num === num)
}
