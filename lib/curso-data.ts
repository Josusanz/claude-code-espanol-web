// Datos del curso: 10 semanas

export interface Recurso {
  titulo: string
  url: string
  tipo: 'pdf' | 'link' | 'video' | 'github'
}

export interface PreClase {
  titulo: string
  duracion: string
  contenido: string // Markdown
  recursos: Recurso[]
  videoIntro?: string
}

export interface ClaseEnVivo {
  fecha: string
  hora: string
  duracion: string
  videoUrl?: string
  notas?: string // Markdown
  slides?: string
}

export interface Entregable {
  titulo: string
  descripcion: string
  fechaLimite: string
  checklist: string[]
}

export interface Semana {
  num: number
  titulo: string
  descripcion: string
  fechaInicio: string
  emoji: string
  preclase: PreClase
  clase: ClaseEnVivo
  entregable: Entregable
}

// Fechas de inicio de cada semana (para desbloqueo automático)
export const SEMANAS_FECHAS: Record<number, string> = {
  1: '2026-02-19',  // Miércoles
  2: '2026-02-27',  // Jueves
  3: '2026-03-06',  // Viernes
  4: '2026-03-13',
  5: '2026-03-20',
  6: '2026-03-27',
  7: '2026-04-03',
  8: '2026-04-10',
  9: '2026-04-17',
  10: '2026-04-24',
}

export const CURSO_SEMANAS: Semana[] = [
  {
    num: 1,
    titulo: 'LaunchPad - Proyecto Conjunto',
    descripcion: 'Nos conocemos, definimos tu visión, y construimos juntos una waitlist profesional.',
    fechaInicio: '2026-02-19',
    emoji: '🚀',
    preclase: {
      titulo: 'Preparación para el LaunchPad',
      duracion: '30 min',
      contenido: `
## Bienvenido a la Primera Promoción 🎉

Este no es solo un curso técnico. Es un viaje de transformación donde vas a crear algo real, conectar con personas increíbles, y descubrir de qué eres capaz.

---

## 🎯 La Rueda del Creador

Antes de escribir una línea de código, necesitas claridad. Completa este ejercicio de reflexión.

Puntúa del 1 al 10 cada área de tu vida como creador:

### Las 8 áreas:

1. **Claridad de visión** - ¿Sabes exactamente qué quieres crear y por qué?
2. **Habilidades técnicas** - ¿Tienes las herramientas para ejecutar tu idea?
3. **Tiempo disponible** - ¿Tienes bloques de tiempo protegidos para crear?
4. **Energía y salud** - ¿Tu cuerpo y mente están listos para el reto?
5. **Apoyo social** - ¿Tienes personas que creen en ti y te apoyan?
6. **Finanzas** - ¿Tienes runway o ingresos que te permitan enfocarte?
7. **Mentalidad** - ¿Crees genuinamente que puedes lograrlo?
8. **Conexión con tu propósito** - ¿Este proyecto está alineado con quién eres?

### Instrucciones:
1. Dibuja un círculo dividido en 8 secciones (como una pizza)
2. Cada sección representa un área
3. Pinta desde el centro hacia afuera según tu puntuación
4. Observa: ¿dónde está tu rueda "desinflada"?

> "Una rueda desequilibrada no rueda bien. Identificar tus áreas débiles es el primer paso para fortalecerlas."

**Trae tu rueda completada a la primera clase.** La compartiremos en el grupo.

---

## 📝 Tu Presentación (2 minutos)

Prepara una mini-presentación para el primer día:

1. **¿Quién eres?** - Nombre, de dónde eres, a qué te dedicas
2. **¿Qué quieres crear?** - Tu idea de proyecto (puede ser vaga todavía)
3. **¿Por qué ahora?** - Qué te motivó a dar este paso
4. **Un dato curioso** - Algo personal que nos ayude a conocerte

---

## 🛠️ Preparación técnica

Para la parte práctica, necesitas tener listo:

1. **VS Code** abierto y funcionando
2. **Claude Code** instalado (del precurso)
3. **Cuenta de Supabase** creada (gratis)
4. **Cuenta de Vercel** conectada a GitHub

### Lo que vamos a construir juntos:
- Landing page atractiva
- Formulario de captura de emails
- Base de datos con Supabase
- Panel admin para ver registros
- Desplegado en tu propio dominio

### 🧠 CLAUDE.md — El truco que marca la diferencia

Cada vez que abres Claude Code en un proyecto, **empieza de cero**. No recuerda lo que hicieron ayer.

La solución: crea un archivo \`CLAUDE.md\` en la raíz de tu proyecto. Claude lo lee automáticamente al iniciar.

\`\`\`markdown
# Mi Proyecto SaaS

## Arquitectura
- Next.js 15 App Router + TypeScript
- Supabase (auth + DB)
- shadcn/ui para componentes
- Desplegado en Vercel

## Estado actual
- Landing page terminada
- Formulario de captura funcionando
- Pendiente: conectar pagos con Stripe

## Convenciones
- Componentes en /components
- Servidor en /app/api
- Estilos con Tailwind
\`\`\`

**Truco pro:** Al final de cada sesión de trabajo, dile a Claude:

> "Actualiza el CLAUDE.md con lo que hemos trabajado hoy y el estado actual del proyecto"

Así la próxima vez que abras el proyecto, Claude arranca con todo el contexto. Es como dejarle notas a tu "yo del futuro".

También puedes tener un CLAUDE.md global en \`~/.claude/CLAUDE.md\` con tus preferencias generales (idioma, estilo de código, etc.) que aplica a todos tus proyectos.

---

## 💻 Terminal vs VS Code: ¿Dónde usar Claude Code?

Claude Code funciona en dos entornos. Cada uno tiene ventajas:

### Terminal (standalone)

\`\`\`bash
# Abres una terminal normal y escribes:
claude
\`\`\`

**Ventajas:**
- **Pantalla completa** para Claude — ves todo el output sin distracciones
- **Más rápido** — no carga extensiones ni UI adicional
- **Multi-monitor** — Claude en una pantalla, código en otra
- **Ideal para tareas largas** — refactoring masivo, migraciones, análisis

**Cuándo usarlo:**
- Proyectos nuevos desde cero (vibe coding)
- Tareas de infraestructura (deploy, CI/CD, Docker)
- Cuando quieres máxima velocidad

### VS Code (terminal integrado)

\`\`\`
# Abres VS Code → Terminal → escribes: claude
\`\`\`

**Ventajas:**
- **Ves los cambios en tiempo real** — Claude edita y tú ves el diff al instante
- **Extensiones** — Pencil, GitHub Copilot, linters al lado
- **Explorador de archivos** — navegas el proyecto visualmente
- **Preview integrado** — ves tu web mientras Claude la modifica

**Cuándo usarlo:**
- Editar código existente (ves los cambios mientras ocurren)
- Diseño de UI (con Pencil puedes ver el canvas)
- Debugging (ves errores en el editor + terminal)

### Recomendación

Para este curso usaremos **VS Code** porque es más visual y puedes ver todo junto. Pero prueba ambos y quédate con lo que te funcione mejor — el resultado es idéntico.

---

## ⚡ Quitar las confirmaciones de Claude Code

Por defecto, Claude Code te pide confirmación cada vez que va a ejecutar un comando o editar un archivo. Esto está bien para empezar, pero cuando estás en flujo creativo es un freno constante.

### Opción 1: Modo auto-accept (la más directa)

\`\`\`bash
claude --dangerously-skip-permissions
\`\`\`

Con esta flag, Claude ejecuta todo sin preguntar. Ideal para trabajar rápido.

### Opción 2: Allowlist de herramientas (más segura)

Crea o edita \`~/.claude/settings.json\`:

\`\`\`json
{
  "permissions": {
    "allow": [
      "Bash(npm run*)",
      "Bash(cd*)",
      "Bash(ls*)",
      "Bash(mkdir*)",
      "Read",
      "Write",
      "Edit"
    ]
  }
}
\`\`\`

Así solo le das permiso a los comandos habituales y el resto sí te lo pregunta.

### Opción 3: "Always allow" durante la sesión

Cuando Claude te pide confirmación, fíjate que a veces aparece la opción **"Always allow"**. Si la aceptas, no te vuelve a preguntar por esa acción en esa sesión.

### ¿Cuál usar?

| Situación | Recomendación |
|-----------|---------------|
| Clase en vivo / vibe coding | \`--dangerously-skip-permissions\` |
| Proyecto personal | Allowlist en settings.json |
| Proyecto de cliente / producción | Confirmaciones manuales |

> **Para este curso**, usaremos \`--dangerously-skip-permissions\` en clase para que todo fluya sin interrupciones.

---

### Mentalidad para esta semana

> "No te preocupes por entender todo el código. Enfócate en el FLUJO: crear → conectar → desplegar."

La IA escribirá el código por ti. Tu trabajo es:
1. Saber qué quieres
2. Revisar que funcione
3. Iterar hasta que esté perfecto
      `,
      recursos: [
        { titulo: 'Plantilla Rueda del Creador (PDF)', url: '/recursos/rueda-creador.pdf', tipo: 'pdf' },
        { titulo: 'Crear cuenta en Supabase', url: 'https://supabase.com', tipo: 'link' },
        { titulo: 'Documentación Next.js App Router', url: 'https://nextjs.org/docs/app', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-02-19',
      hora: '18:00 CET',
      duracion: '2h + 2h',
      notas: `
### Día 1 (Miércoles 19)

**Primera hora: Conexión y visión**
- Bienvenida y contexto del curso
- Ronda de presentaciones (2 min cada uno)
- Compartir la Rueda del Creador
- Ejercicio: Visualización del "yo del futuro"

**Segunda hora: Manos a la obra**
- Creamos el proyecto Next.js
- Diseñamos la landing page
- Implementamos el formulario

### Día 2 (Jueves 20)
- Conectamos Supabase
- Creamos el panel admin
- Desplegamos en Vercel
      `,
    },
    entregable: {
      titulo: 'Waitlist desplegada + Rueda del Creador',
      descripcion: 'Tu waitlist funcionando en internet y tu Rueda del Creador compartida en Discord.',
      fechaLimite: '2026-02-26',
      checklist: [
        'Rueda del Creador completada y compartida',
        'Presentación hecha en la primera clase',
        'Proyecto creado con Next.js',
        'Landing page con formulario',
        'Base de datos conectada (Supabase)',
        'Emails guardándose correctamente',
        'Desplegado en Vercel',
        'CLAUDE.md creado en la raíz del proyecto',
        'URL compartida en Discord',
      ],
    },
  },
  {
    num: 2,
    titulo: 'Tu Proyecto - Setup + UI',
    descripcion: 'Empezamos TU proyecto. Crearás la estructura y diseñarás toda la interfaz con shadcn/ui.',
    fechaInicio: '2026-02-27',
    emoji: '🎨',
    preclase: {
      titulo: 'Diseño de interfaces con shadcn/ui',
      duracion: '30 min',
      contenido: `
## ¿Qué es shadcn/ui?

shadcn/ui NO es una librería. Es una colección de componentes que copias directamente a tu proyecto.

### ¿Por qué shadcn/ui?
- **No hay dependencias**: El código es tuyo
- **Personalizable**: Puedes modificar todo
- **Profesional**: Usado por empresas como Vercel
- **Accesible**: Cumple estándares de accesibilidad

### Componentes que usaremos:
- Button, Input, Card
- Dialog, Sheet, Dropdown
- Table, Tabs, Toast
- Form (con validación)

### Inspiración: Los mejores diseños SaaS

Antes de diseñar, observa:
- [Linear](https://linear.app) - Minimalista y potente
- [Notion](https://notion.so) - Limpio y flexible
- [Vercel](https://vercel.com) - Moderno y rápido

---

## ✏️ Pencil: Diseño visual que Claude entiende

[Pencil](https://www.pencil.dev/) es un canvas de diseño integrado en VS Code. La magia: Claude Code puede **leer y escribir** archivos \`.pen\` directamente.

### ¿Por qué Pencil y no Figma?

| | Figma | Pencil |
|---|---|---|
| ¿Dónde? | Navegador | VS Code |
| ¿Archivos? | En la nube | \`.pen\` en tu repo |
| ¿Claude lo lee? | No | **Sí, directamente** |
| ¿Git? | No | **Sí** |
| ¿Precio? | De pago | **Gratis** |

### El flujo de trabajo

1. **Diseñas** en Pencil (arrastras componentes, ajustas layout)
2. **Claude lee** el archivo \`.pen\` via MCP (Model Context Protocol)
3. **Claude genera** el código React/Tailwind exacto de tu diseño
4. **Iteras**: ajustas el diseño → Claude actualiza el código

### Ejemplo práctico

\`\`\`bash
# 1. Crea un archivo de diseño
touch mi-dashboard.pen
# 2. Ábrelo en VS Code (se abre el canvas de Pencil)
# 3. Diseña tu dashboard arrastrando componentes
# 4. Luego dile a Claude:
\`\`\`

> "Mira mi diseño en mi-dashboard.pen y genera los componentes React con Tailwind"

Claude lee las coordenadas exactas, colores, tipografía y estructura del \`.pen\` y genera código pixel-perfect.

### Configurar Pencil con Claude Code (MCP)

Pencil se conecta con Claude Code automáticamente via MCP. Cuando tienes la extensión instalada y un archivo \`.pen\` en tu proyecto, Claude puede:

- **Leer** el diseño completo (layout, colores, componentes)
- **Modificar** el diseño desde la terminal
- **Generar screenshots** para verificar el resultado
- **Extraer variables** de estilo (tokens de diseño)

> "Pencil convierte tu diseño en código. Es como tener un diseñador y un frontend developer trabajando juntos."

---

### Tu tarea antes de la clase

1. **Define tu proyecto**: ¿Qué problema resuelve?
2. **Crea un archivo \`.pen\`** y dibuja 3 pantallas: Dashboard, formulario principal, settings
3. **Elige colores**: Máximo 3 colores principales
4. **Prueba el flujo**: Pídele a Claude que genere código desde tu \`.pen\`

> "Un buen diseño no es decoración, es comunicación clara."
      `,
      recursos: [
        { titulo: 'Catálogo shadcn/ui', url: 'https://ui.shadcn.com', tipo: 'link' },
        { titulo: 'Pencil — Diseño en VS Code', url: 'https://www.pencil.dev/', tipo: 'link' },
        { titulo: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs', tipo: 'link' },
        { titulo: 'Colores Tailwind', url: 'https://tailwindcss.com/docs/customizing-colors', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-02-27',
      hora: '18:00 CET',
      duracion: '2h',
    },
    entregable: {
      titulo: 'UI completa de tu proyecto',
      descripcion: 'Todas las pantallas de tu aplicación diseñadas (sin funcionalidad todavía).',
      fechaLimite: '2026-03-05',
      checklist: [
        'Proyecto creado en GitHub',
        'shadcn/ui instalado y configurado',
        'Diseño en Pencil (.pen) de las pantallas principales',
        'Dashboard principal diseñado',
        'Al menos 3 páginas creadas',
        'Navegación funcionando',
        'Responsive (móvil y desktop)',
      ],
    },
  },
  {
    num: 3,
    titulo: 'Base de Datos con Supabase',
    descripcion: 'Diseña tu schema de base de datos y conecta tu aplicación con Supabase.',
    fechaInicio: '2026-03-06',
    emoji: '🗄️',
    preclase: {
      titulo: 'Fundamentos de bases de datos',
      duracion: '30 min',
      contenido: `
## ¿Qué es una base de datos?

Piensa en Excel, pero más potente:
- **Tablas** = Hojas de cálculo
- **Filas** = Registros individuales
- **Columnas** = Campos/propiedades
- **Relaciones** = Conexiones entre tablas

### SQL básico que necesitas saber

No tienes que escribir SQL (Claude lo hará), pero entiende qué hace:

\`\`\`sql
-- Obtener todos los usuarios
SELECT * FROM users;

-- Insertar un nuevo usuario
INSERT INTO users (name, email) VALUES ('Juan', 'juan@email.com');

-- Actualizar un usuario
UPDATE users SET name = 'Juan Pablo' WHERE id = 1;

-- Eliminar un usuario
DELETE FROM users WHERE id = 1;
\`\`\`

### ¿Por qué Supabase?

1. **Gratis para empezar**: 500MB, suficiente para prototipos
2. **PostgreSQL**: Base de datos profesional
3. **API automática**: No tienes que crear endpoints
4. **Autenticación incluida**: Login listo para usar
5. **Tiempo real**: Actualizaciones en vivo

### Diseñando tu schema

Antes de crear tablas, piensa:
1. ¿Qué datos necesito guardar?
2. ¿Cómo se relacionan entre sí?
3. ¿Qué campos son obligatorios?

### Ejemplo: App de tareas

\`\`\`
users
  - id (auto)
  - email
  - name
  - created_at

projects
  - id (auto)
  - user_id → users.id
  - name
  - created_at

tasks
  - id (auto)
  - project_id → projects.id
  - title
  - completed
  - due_date
\`\`\`
      `,
      recursos: [
        { titulo: 'Supabase Quickstart', url: 'https://supabase.com/docs/guides/getting-started', tipo: 'link' },
        { titulo: 'SQL Cheatsheet', url: 'https://www.sqltutorial.org/sql-cheat-sheet/', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-03-06',
      hora: '18:00 CET',
      duracion: '2h',
    },
    entregable: {
      titulo: 'Base de datos conectada',
      descripcion: 'Tu aplicación leyendo y escribiendo datos de Supabase.',
      fechaLimite: '2026-03-12',
      checklist: [
        'Proyecto Supabase creado',
        'Al menos 3 tablas diseñadas',
        'Relaciones configuradas (foreign keys)',
        'CRUD funcionando desde la app',
        'Variables de entorno configuradas',
        'RLS básico habilitado',
      ],
    },
  },
  {
    num: 4,
    titulo: 'Autenticación de Usuarios',
    descripcion: 'Implementa login, registro, y protección de rutas con Supabase Auth.',
    fechaInicio: '2026-03-13',
    emoji: '🔐',
    preclase: {
      titulo: 'Seguridad y autenticación',
      duracion: '25 min',
      contenido: `
## ¿Qué es la autenticación?

Autenticación = Verificar QUIÉN eres
Autorización = Verificar QUÉ puedes hacer

### Métodos de autenticación

1. **Email + Password**: El clásico
2. **Magic Link**: Email con enlace (sin password)
3. **OAuth**: "Iniciar sesión con Google/GitHub"
4. **SMS/OTP**: Código por mensaje

### Supabase Auth

Supabase incluye autenticación lista para usar:

\`\`\`typescript
// Registro
await supabase.auth.signUp({
  email: 'user@email.com',
  password: 'password123'
})

// Login
await supabase.auth.signInWithPassword({
  email: 'user@email.com',
  password: 'password123'
})

// Logout
await supabase.auth.signOut()

// Usuario actual
const { data: { user } } = await supabase.auth.getUser()
\`\`\`

### Row Level Security (RLS)

RLS protege tus datos A NIVEL DE BASE DE DATOS:

\`\`\`sql
-- Solo el dueño puede ver sus proyectos
CREATE POLICY "Users can view own projects"
ON projects FOR SELECT
USING (auth.uid() = user_id);
\`\`\`

### Protegiendo rutas en Next.js

Con middleware puedes redirigir usuarios no autenticados:

\`\`\`typescript
// middleware.ts
export function middleware(request) {
  const session = request.cookies.get('session')
  if (!session) {
    return NextResponse.redirect('/login')
  }
}
\`\`\`
      `,
      recursos: [
        { titulo: 'Supabase Auth Docs', url: 'https://supabase.com/docs/guides/auth', tipo: 'link' },
        { titulo: 'Next.js Middleware', url: 'https://nextjs.org/docs/app/building-your-application/routing/middleware', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-03-13',
      hora: '18:00 CET',
      duracion: '2h',
    },
    entregable: {
      titulo: 'Sistema de auth completo',
      descripcion: 'Usuarios pueden registrarse, loguearse, y solo ver sus propios datos.',
      fechaLimite: '2026-03-19',
      checklist: [
        'Página de registro funcionando',
        'Página de login funcionando',
        'Sesión persistente (refresh)',
        'Rutas protegidas con middleware',
        'RLS configurado en todas las tablas',
        'Logout funcionando',
      ],
    },
  },
  {
    num: 5,
    titulo: 'APIs y Server Actions',
    descripcion: 'Crea endpoints de API y aprende a usar Server Actions de Next.js.',
    fechaInicio: '2026-03-20',
    emoji: '⚡',
    preclase: {
      titulo: 'APIs modernas con Next.js',
      duracion: '25 min',
      contenido: `
## APIs en Next.js

Tienes DOS formas de manejar lógica del servidor:

### 1. Route Handlers (API tradicional)

\`\`\`typescript
// app/api/users/route.ts
export async function GET() {
  const users = await db.query('SELECT * FROM users')
  return Response.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await db.insert('users', body)
  return Response.json(user)
}
\`\`\`

### 2. Server Actions (Moderno, recomendado)

\`\`\`typescript
// app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  const name = formData.get('name')
  await db.insert('users', { name })
  revalidatePath('/users')
}
\`\`\`

### ¿Cuándo usar cada uno?

| Caso | Solución |
|------|----------|
| Formularios | Server Actions |
| Mutaciones simples | Server Actions |
| Webhooks externos | Route Handlers |
| API pública | Route Handlers |
| Integraciones | Route Handlers |

### Validación con Zod

Siempre valida los datos del usuario:

\`\`\`typescript
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

export async function createUser(data: unknown) {
  const validated = UserSchema.parse(data)
  // Ahora 'validated' tiene tipos seguros
}
\`\`\`
      `,
      recursos: [
        { titulo: 'Server Actions Docs', url: 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions', tipo: 'link' },
        { titulo: 'Zod Documentation', url: 'https://zod.dev', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-03-20',
      hora: '18:00 CET',
      duracion: '2h',
    },
    entregable: {
      titulo: 'APIs implementadas',
      descripcion: 'Tu app usando Server Actions o Route Handlers para todas las operaciones.',
      fechaLimite: '2026-03-26',
      checklist: [
        'Server Actions para formularios',
        'Validación con Zod implementada',
        'Manejo de errores apropiado',
        'Loading states en la UI',
        'Al menos 1 Route Handler (si aplica)',
        'Revalidación de datos funcionando',
      ],
    },
  },
  {
    num: 6,
    titulo: 'Pagos con Stripe',
    descripcion: 'Integra Stripe para cobrar a tus usuarios. Planes, suscripciones, y webhooks.',
    fechaInicio: '2026-03-27',
    emoji: '💳',
    preclase: {
      titulo: 'Monetización con Stripe',
      duracion: '30 min',
      contenido: `
## ¿Por qué Stripe?

- Líder del mercado
- Excelente documentación
- API developer-friendly
- Modo test para desarrollo

### Conceptos clave

1. **Products**: Lo que vendes (Plan Pro, Plan Enterprise)
2. **Prices**: El precio de un producto ($10/mes, $100/año)
3. **Customers**: Tus usuarios en Stripe
4. **Subscriptions**: Pagos recurrentes
5. **Checkout**: Página de pago hosted

### Flujo de suscripción

1. Usuario hace clic en "Suscribirse"
2. Redirigimos a Stripe Checkout
3. Usuario paga
4. Stripe nos avisa (webhook)
5. Actualizamos la base de datos

### Webhooks

Stripe te envía eventos cuando algo pasa:

\`\`\`typescript
// app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const event = await stripe.webhooks.constructEvent(...)

  switch (event.type) {
    case 'checkout.session.completed':
      // Activar suscripción
      break
    case 'invoice.payment_failed':
      // Notificar al usuario
      break
  }
}
\`\`\`

### Antes de la clase

1. Crea cuenta en [Stripe](https://stripe.com)
2. Activa el modo Test
3. Copia tus API keys (test)
4. Crea un producto de prueba
      `,
      recursos: [
        { titulo: 'Stripe Dashboard', url: 'https://dashboard.stripe.com', tipo: 'link' },
        { titulo: 'Stripe Docs', url: 'https://stripe.com/docs', tipo: 'link' },
        { titulo: 'Stripe + Next.js', url: 'https://stripe.com/docs/checkout/quickstart', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-03-27',
      hora: '18:00 CET',
      duracion: '2h',
    },
    entregable: {
      titulo: 'Pagos funcionando',
      descripcion: 'Usuarios pueden pagar y sus suscripciones se reflejan en la app.',
      fechaLimite: '2026-04-02',
      checklist: [
        'Cuenta Stripe configurada (test mode)',
        'Productos y precios creados',
        'Checkout Session implementado',
        'Webhook recibiendo eventos',
        'Suscripción guardada en base de datos',
        'UI muestra estado de suscripción',
      ],
    },
  },
  {
    num: 7,
    titulo: 'Email y Notificaciones',
    descripcion: 'Envía emails transaccionales con Resend y notificaciones en la app.',
    fechaInicio: '2026-04-03',
    emoji: '📧',
    preclase: {
      titulo: 'Comunicación con usuarios',
      duracion: '25 min',
      contenido: `
## Tipos de emails

1. **Transaccionales**: Confirmaciones, recibos, reset password
2. **Marketing**: Newsletters, promociones
3. **Notificaciones**: Alertas, recordatorios

### Resend: Email moderno

Resend es como Stripe pero para emails:
- API simple
- React Email para templates
- Tracking de opens/clicks

\`\`\`typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'Tu App <noreply@tuapp.com>',
  to: 'usuario@email.com',
  subject: 'Bienvenido!',
  react: WelcomeEmail({ name: 'Juan' }),
})
\`\`\`

### React Email: Templates con componentes

\`\`\`tsx
// emails/welcome.tsx
import { Html, Button, Text } from '@react-email/components'

export function WelcomeEmail({ name }) {
  return (
    <Html>
      <Text>Hola {name}!</Text>
      <Button href="https://tuapp.com/dashboard">
        Ir al Dashboard
      </Button>
    </Html>
  )
}
\`\`\`

### Notificaciones in-app

Para notificaciones dentro de la app:
- Toasts para confirmaciones rápidas
- Badge counter en el header
- Lista de notificaciones

### Cuándo enviar cada tipo

| Evento | Email | In-app |
|--------|-------|--------|
| Registro | ✅ | ✅ |
| Pago recibido | ✅ | ✅ |
| Nuevo comentario | ❌ | ✅ |
| Password reset | ✅ | ❌ |
      `,
      recursos: [
        { titulo: 'Resend', url: 'https://resend.com', tipo: 'link' },
        { titulo: 'React Email', url: 'https://react.email', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-04-03',
      hora: '18:00 CET',
      duracion: '2h',
    },
    entregable: {
      titulo: 'Sistema de emails',
      descripcion: 'Tu app enviando emails automáticos en eventos clave.',
      fechaLimite: '2026-04-09',
      checklist: [
        'Cuenta Resend configurada',
        'Dominio verificado (o usar sandbox)',
        'Email de bienvenida implementado',
        'Al menos 2 templates creados',
        'Emails enviándose en eventos reales',
        'Notificaciones in-app funcionando',
      ],
    },
  },
  {
    num: 8,
    titulo: 'Testing y Calidad',
    descripcion: 'Añade tests a tu aplicación para asegurar que todo funciona correctamente.',
    fechaInicio: '2026-04-10',
    emoji: '🧪',
    preclase: {
      titulo: 'Testing para no-programadores',
      duracion: '25 min',
      contenido: `
## ¿Por qué testear?

- Detectar bugs antes de que los usuarios los vean
- Refactorizar con confianza
- Documentar cómo funciona tu código

### Tipos de tests

1. **Unit tests**: Prueban funciones individuales
2. **Integration tests**: Prueban flujos completos
3. **E2E tests**: Simulan usuarios reales

### Para SaaS, enfócate en:

1. **Flujos críticos**: Login, pago, acciones principales
2. **Validaciones**: Formularios, permisos
3. **Integraciones**: Stripe webhooks, emails

### Vitest: Tests rápidos

\`\`\`typescript
// tests/utils.test.ts
import { describe, it, expect } from 'vitest'
import { formatPrice } from '@/lib/utils'

describe('formatPrice', () => {
  it('formatea correctamente', () => {
    expect(formatPrice(1000)).toBe('$10.00')
  })

  it('maneja cero', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })
})
\`\`\`

### Playwright: Tests E2E

\`\`\`typescript
// tests/e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test('usuario puede loguearse', async ({ page }) => {
  await page.goto('/login')
  await page.fill('input[name=email]', 'test@test.com')
  await page.fill('input[name=password]', 'password')
  await page.click('button[type=submit]')
  await expect(page).toHaveURL('/dashboard')
})
\`\`\`

### Regla de oro

> "Testea comportamientos, no implementación"
      `,
      recursos: [
        { titulo: 'Vitest', url: 'https://vitest.dev', tipo: 'link' },
        { titulo: 'Playwright', url: 'https://playwright.dev', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-04-10',
      hora: '18:00 CET',
      duracion: '2h',
    },
    entregable: {
      titulo: 'Tests implementados',
      descripcion: 'Tu app con suite de tests cubriendo los flujos principales.',
      fechaLimite: '2026-04-16',
      checklist: [
        'Vitest configurado',
        'Al menos 5 unit tests',
        'Playwright instalado',
        'Test E2E de login',
        'Test E2E del flujo principal',
        'Tests pasando en CI (GitHub Actions)',
      ],
    },
  },
  {
    num: 9,
    titulo: 'Performance y SEO',
    descripcion: 'Optimiza tu app para que cargue rápido y aparezca en Google.',
    fechaInicio: '2026-04-17',
    emoji: '🚄',
    preclase: {
      titulo: 'Optimización web',
      duracion: '25 min',
      contenido: `
## Core Web Vitals

Google mide tu web con 3 métricas:

1. **LCP** (Largest Contentful Paint): ¿Cuándo aparece el contenido principal?
2. **FID** (First Input Delay): ¿Cuándo responde a clicks?
3. **CLS** (Cumulative Layout Shift): ¿Se mueve el contenido?

### Objetivos
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

### Optimizaciones en Next.js

**Imágenes:**
\`\`\`tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Para imágenes above the fold
/>
\`\`\`

**Fonts:**
\`\`\`tsx
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
\`\`\`

**Loading states:**
\`\`\`tsx
import { Suspense } from 'react'

<Suspense fallback={<Skeleton />}>
  <SlowComponent />
</Suspense>
\`\`\`

### SEO básico

\`\`\`tsx
// app/layout.tsx
export const metadata = {
  title: 'Tu SaaS - Descripción corta',
  description: 'Descripción de 150-160 caracteres...',
  openGraph: {
    title: 'Tu SaaS',
    description: '...',
    images: ['/og-image.png'],
  },
}
\`\`\`

### Herramientas

- [PageSpeed Insights](https://pagespeed.web.dev)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- Vercel Analytics (gratis)
      `,
      recursos: [
        { titulo: 'Next.js Image Optimization', url: 'https://nextjs.org/docs/app/building-your-application/optimizing/images', tipo: 'link' },
        { titulo: 'Core Web Vitals', url: 'https://web.dev/vitals/', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-04-17',
      hora: '18:00 CET',
      duracion: '2h',
    },
    entregable: {
      titulo: 'App optimizada',
      descripcion: 'Tu app pasando los Core Web Vitals y con SEO configurado.',
      fechaLimite: '2026-04-23',
      checklist: [
        'PageSpeed score > 90 en móvil',
        'Imágenes optimizadas con next/image',
        'Fonts optimizadas',
        'Metadata configurado en todas las páginas',
        'OG images para compartir',
        'Sitemap.xml generado',
      ],
    },
  },
  {
    num: 10,
    titulo: 'Lanzamiento',
    descripcion: 'Prepara tu producto para el lanzamiento. Dominio, analytics, y estrategia.',
    fechaInicio: '2026-04-24',
    emoji: '🎉',
    preclase: {
      titulo: 'Preparando el lanzamiento',
      duracion: '30 min',
      contenido: `
## Checklist pre-lanzamiento

### Técnico
- [ ] Dominio propio configurado
- [ ] SSL activo (HTTPS)
- [ ] Emails funcionando
- [ ] Pagos en modo producción
- [ ] Error tracking (Sentry)
- [ ] Analytics configurado

### Legal (básico)
- [ ] Términos de servicio
- [ ] Política de privacidad
- [ ] Aviso de cookies (si aplica)

### Marketing
- [ ] Landing page lista
- [ ] Cuenta de Twitter/X
- [ ] Post de lanzamiento preparado

## Dónde lanzar

1. **Product Hunt**: El clásico para SaaS
2. **Hacker News**: Comunidad tech
3. **Reddit**: r/SaaS, r/startups, nichos específicos
4. **Twitter/X**: Tu audiencia personal
5. **IndieHackers**: Comunidad de makers

## Después del lanzamiento

### Semana 1
- Responde TODOS los comentarios
- Arregla bugs reportados inmediatamente
- Celebra pequeñas victorias

### Mes 1
- Habla con usuarios (calls de 15 min)
- Identifica features más pedidos
- Empieza a iterar

### El mantra

> "Done is better than perfect. Ship it."

Tu producto no tiene que ser perfecto. Tiene que resolver un problema real para personas reales. El feedback del mercado vale más que meses de desarrollo en silencio.
      `,
      recursos: [
        { titulo: 'Product Hunt', url: 'https://producthunt.com', tipo: 'link' },
        { titulo: 'Checklist de lanzamiento', url: 'https://www.saasstarters.com/launch-checklist', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-04-24',
      hora: '18:00 CET',
      duracion: '2h',
    },
    entregable: {
      titulo: 'Producto lanzado',
      descripcion: 'Tu SaaS en producción, con dominio propio, listo para usuarios reales.',
      fechaLimite: '2026-04-30',
      checklist: [
        'Dominio propio configurado',
        'Stripe en modo producción',
        'Analytics instalado',
        'Al menos 1 usuario de prueba (que no seas tú)',
        'Post de lanzamiento publicado',
        'Link compartido en Discord del curso',
      ],
    },
  },
]

// Helper para verificar si una semana está desbloqueada por fecha
export function isSemanaDesbloqueadaPorFecha(semanaNum: number): boolean {
  const fechaInicio = SEMANAS_FECHAS[semanaNum]
  if (!fechaInicio) return false

  const hoy = new Date()
  const fechaSemana = new Date(fechaInicio)

  return hoy >= fechaSemana
}

// IDs de tracking para el progreso
export function getCursoTrackingIds(semanaNum: number): {
  preclase: string
  clase: string
  entregable: string
} {
  return {
    preclase: `semana-${semanaNum}-preclase`,
    clase: `semana-${semanaNum}-clase`,
    entregable: `semana-${semanaNum}-entregable`,
  }
}
