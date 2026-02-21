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
  gratis?: boolean      // true = accesible sin login
  leccionesRelacionadas?: { titulo: string; url: string }[]
  contenidoCustom?: string  // solo para módulo 0
}

export const MODULOS_AUTOGUIADO: ModuloAutoguiado[] = [
  {
    num: 0,
    titulo: 'Tu Primera Web con IA',
    emoji: '🌐',
    descripcion: 'Crea y publica una web profesional en 1 hora. Gratis, sin experiencia previa.',
    duracion: '1-2 horas',
    nivel: 'principiante',
    semanaNum: null,
    gratis: true,
    intro: 'En este módulo gratuito vas a crear una web real y publicarla en internet. Sin experiencia previa. Solo tú, Claude Code y una idea.',
    leccionesRelacionadas: [
      { titulo: 'Instalar Claude Code', url: '/empezar' },
      { titulo: 'Modo Fácil (sin terminal)', url: '/modo-facil' },
      { titulo: 'Fundamentos de Claude Code', url: '/fundamentos' },
    ],
    contenidoCustom: `## Vas a crear una web real y publicarla en internet

En los próximos 30-60 minutos vas a:

1. **Instalar Claude Code** (5 min)
2. **Crear una landing page profesional** (15 min)
3. **Añadir diseño con Tailwind CSS** (10 min)
4. **Publicarla en internet** para que cualquiera la vea (5 min)

Al terminar tendrás una URL pública con tu web funcionando. Sin escribir una sola línea de código.

---

## Paso 1: Instalar Claude Code

Claude Code es la herramienta de Anthropic que crea software desde el terminal. Le describes lo que quieres y Claude lo construye.

**Requisitos:**
- Un ordenador (Mac, Windows o Linux)
- Conexión a internet
- Una suscripción a Claude Pro ($20/mes) — incluye Claude Code

### Abre tu terminal
- **Mac**: Busca "Terminal" en Spotlight (Cmd + Espacio)
- **Windows**: Abre PowerShell o Windows Terminal
- **Linux**: Ctrl + Alt + T

### Instala Node.js (si no lo tienes)
Node.js es el motor que necesita Claude Code para funcionar. Comprueba si ya lo tienes:

\`\`\`bash
node --version
\`\`\`

Si no aparece un número de versión, descárgalo de [nodejs.org](https://nodejs.org) (versión LTS).

### Instala Claude Code

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

Verifica que funciona:

\`\`\`bash
claude --version
\`\`\`

> Si tienes problemas, consulta la [guía completa de instalación](/empezar).

---

## Paso 2: Tu primera landing page

Vamos a crear una web profesional con un solo mensaje a Claude. Abre el terminal y escribe:

\`\`\`bash
mkdir mi-landing
cd mi-landing
claude
\`\`\`

Claude se abrirá y estará listo para recibir instrucciones. Copia y pega este prompt, **cambiando los datos entre corchetes por los tuyos**:

\`\`\`
Crea un archivo index.html para una landing page con estas secciones:

1. HERO SECTION:
   - Título: [TU TÍTULO PRINCIPAL]
   - Subtítulo: [DESCRIPCIÓN DE 1 LÍNEA]
   - Botón CTA: [TEXTO DEL BOTÓN]

2. FEATURES (3 características):
   - [Feature 1]
   - [Feature 2]
   - [Feature 3]

3. CTA FINAL:
   - Texto motivador
   - Botón de acción

4. FOOTER:
   - Copyright 2026
   - Enlaces básicos

Usa HTML semántico con clases descriptivas.
No añadas estilos CSS todavía.
\`\`\`

### Ejemplo práctico: academia de fotografía

Si no se te ocurre nada, usa este ejemplo tal cual:

\`\`\`
Crea un archivo index.html para una landing page con estas secciones:

1. HERO SECTION:
   - Título: Aprende Fotografía desde Cero
   - Subtítulo: Domina tu cámara en 30 días con ejercicios prácticos
   - Botón CTA: Empezar Ahora

2. FEATURES (3 características):
   - Aprende a tu ritmo con videos cortos
   - Ejercicios prácticos cada semana
   - Comunidad de estudiantes para feedback

3. CTA FINAL:
   - Texto motivador
   - Botón de acción

4. FOOTER:
   - Copyright 2026
   - Enlaces básicos

Usa HTML semántico con clases descriptivas.
No añadas estilos CSS todavía.
\`\`\`

### Comprueba el resultado

Abre el archivo en tu navegador:

- **Mac**: \`open index.html\`
- **Windows**: \`start index.html\`
- **Linux**: \`xdg-open index.html\`

Se verá sencilla (sin colores ni diseño), pero la estructura está ahí. Vamos a darle estilo.

---

## Paso 3: Diseño profesional con Tailwind CSS

Ahora dile a Claude que le ponga estilo. Escribe esto en el mismo chat:

\`\`\`
Añade Tailwind CSS a mi index.html usando el CDN.
Aplica estilos modernos y profesionales:
- Hero: fondo con gradiente, texto centrado, botón con hover
- Features: grid de 3 columnas, iconos o emojis, sombras suaves
- CTA: fondo de color contrastante, botón destacado
- Footer: fondo oscuro, texto claro
- Responsive: que se vea bien en móvil y desktop
\`\`\`

Recarga el navegador. Tu web ahora debería verse profesional.

### Personalizar colores

Si quieres cambiar los colores, dile a Claude:

\`\`\`
Cambia el esquema de colores a tonos verdes en lugar de morados
\`\`\`

O usa colores específicos:

\`\`\`
Usa estos colores: primario #FF6B35, secundario #004E89
\`\`\`

### Verificar en móvil

Reduce el ancho de tu navegador para simular un móvil. Si algo no se ve bien:

\`\`\`
El hero no se ve bien en móvil, ajusta el tamaño del texto y los márgenes
\`\`\`

---

## Paso 4: Publicar en internet

Tu web existe en tu ordenador. Vamos a subirla para que cualquiera pueda verla.

### Opción A: Netlify Drop (la más fácil, sin cuenta)

1. Ve a [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra tu carpeta \`mi-landing\` a la zona de "drop"
3. En segundos tendrás una URL pública como \`https://nombre-random-12345.netlify.app\`

### Opción B: GitHub Pages (si ya tienes GitHub)

Crea un repositorio en [github.com/new](https://github.com/new) y dile a Claude:

\`\`\`
Inicializa git, añade el archivo index.html y haz push a github.com/TU_USUARIO/mi-landing
\`\`\`

Después, en tu repositorio de GitHub: Settings → Pages → Source: main branch.
Tu URL será: \`https://TU_USUARIO.github.io/mi-landing\`

### Opción C: Vercel CLI (para proyectos futuros)

\`\`\`bash
npm install -g vercel
cd mi-landing
vercel
\`\`\`

Sigue las instrucciones y tendrás tu URL en segundos.

---

## Checklist final

Si has llegado hasta aquí, comprueba que tienes todo:

- Tu título describe claramente lo que ofreces
- El botón CTA tiene un texto de acción claro
- Los colores son consistentes y profesionales
- Se ve bien en móvil (reduce el ancho del navegador)
- Tu URL pública funciona y se ve desde otro dispositivo

---

## Lo has conseguido

Acabas de crear una web profesional con IA y la has publicado en internet. Sin escribir una sola línea de código. Sin saber programar.

Esto es **vibe coding**: tú pones la visión, la IA escribe el código.

Y esto es solo el principio. Lo que has hecho hoy es la base de todo lo que viene después.`,
  },
  {
    num: 1,
    titulo: 'LaunchPad: Tu Landing Profesional',
    emoji: '🚀',
    descripcion: 'Personaliza un theme premium con Next.js, conecta Supabase para capturar emails y despliega en Vercel.',
    duracion: '3-4 horas',
    nivel: 'principiante',
    semanaNum: 1,
    intro: 'Aquí empieza tu producto real. Vas a personalizar un theme profesional de Next.js con Claude Code, conectar una base de datos con Supabase para capturar emails de usuarios interesados y desplegar tu web en Vercel con dominio propio.',
    leccionesRelacionadas: [
      { titulo: '¿Qué es Claude Code?', url: '/fundamentos/que-es' },
      { titulo: 'CLAUDE.md y memoria', url: '/fundamentos/memoria' },
    ],
  },
  {
    num: 2,
    titulo: 'Conectar y Desplegar',
    emoji: '🌐',
    descripcion: 'Conecta tu web con GitHub, Supabase y Vercel para que sea real.',
    duracion: '3-4 horas',
    nivel: 'principiante',
    semanaNum: 2,
    intro: 'Tu web ya existe en local. Ahora la conectamos con una base de datos con Supabase, la subimos a GitHub y la desplegamos en Vercel para que sea accesible desde cualquier lugar.',
    leccionesRelacionadas: [
      { titulo: 'Skills, Hooks y Plugins', url: '/fundamentos/skills-hooks-plugins' },
    ],
  },
  {
    num: 3,
    titulo: 'Diseño + UI',
    emoji: '🎨',
    descripcion: 'Diseña una app completa con shadcn/ui y Pencil. Técnicas de interfaz profesional.',
    duracion: '3-4 horas',
    nivel: 'intermedio',
    semanaNum: 3,
    intro: 'Aprenderás a diseñar interfaces profesionales con shadcn/ui y Pencil. Todos los componentes, layouts y patrones que necesitas para crear cualquier app.',
  },
  {
    num: 4,
    titulo: 'Base de Datos + Auth',
    emoji: '🔐',
    descripcion: 'Supabase: tablas, CRUD, login, registro y Row Level Security.',
    duracion: '3-4 horas',
    nivel: 'intermedio',
    semanaNum: 4,
    intro: 'Añadimos datos reales y autenticación. Diseñarás tablas en Supabase, implementarás CRUD completo, login/registro y protegerás los datos con Row Level Security.',
  },
  {
    num: 5,
    titulo: 'APIs + Tu Proyecto',
    emoji: '⚡',
    descripcion: 'Server Actions, Route Handlers, Zod + arranca tu proyecto propio.',
    duracion: '4-5 horas',
    nivel: 'intermedio',
    semanaNum: 5,
    intro: 'Aprenderás Server Actions y Route Handlers para manejar datos. Después, aplicarás todo lo aprendido en S1-S5 para arrancar tu proyecto propio desde cero.',
  },
  {
    num: 6,
    titulo: 'Tu Proyecto — De Idea a MVP',
    emoji: '🎯',
    descripcion: 'Sprint de MVP: aplica DB, Auth y APIs a tu proyecto propio.',
    duracion: '3-4 horas',
    nivel: 'intermedio',
    semanaNum: 6,
    intro: 'Aplicas todo lo aprendido en S1-S5 para construir el MVP de TU proyecto. Sprint guiado donde cada uno avanza su app con ayuda en tiempo real.',
  },
  {
    num: 7,
    titulo: 'Pagos con Stripe',
    emoji: '💳',
    descripcion: 'Integra Stripe para cobrar: checkout, suscripciones y webhooks.',
    duracion: '4-5 horas',
    nivel: 'avanzado',
    semanaNum: 7,
    intro: 'Es hora de monetizar tu SaaS. Integrarás Stripe para aceptar pagos, gestionar suscripciones y recibir notificaciones automáticas cuando alguien paga o cancela.',
  },
  {
    num: 8,
    titulo: 'Email + Testing',
    emoji: '📧',
    descripcion: 'Emails con Resend + tests con Vitest y Playwright.',
    duracion: '3-4 horas',
    nivel: 'avanzado',
    semanaNum: 8,
    intro: 'Emails transaccionales con Resend y React Email para comunicarte con tus usuarios. Tests con Vitest y Playwright para asegurar que todo funciona.',
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
