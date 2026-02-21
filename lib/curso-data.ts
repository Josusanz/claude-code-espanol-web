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

export interface ClaseVideo {
  titulo: string
  url: string
  tipo: 'embed' | 'link' // embed = iframe (YouTube etc), link = abre en nueva pestaña (Zoom)
  passcode?: string
}

export interface ClaseEnVivo {
  fecha: string
  hora: string
  duracion: string
  videoUrl?: string
  videos?: ClaseVideo[]
  zoomUrl?: string
  notas?: string // Markdown
  slides?: string
}

export interface Entregable {
  titulo: string
  descripcion: string
  fechaLimite: string
  checklist: string[]
}

export interface DiaSemana {
  titulo: string
  emoji: string
  preclase: PreClase
  clase: ClaseEnVivo
  entregable?: Entregable
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
  dias?: DiaSemana[] // For multi-day weeks (e.g. LaunchPad)
}

// Fechas de inicio de cada semana (para desbloqueo automático)
export const SEMANAS_FECHAS: Record<number, string> = {
  1: '2026-02-19',  // Jueves
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
  // ==========================================
  // SEMANA 1 — LaunchPad (2 días)
  // ==========================================
  {
    num: 1,
    titulo: 'LaunchPad - Primeros Pasos',
    descripcion: 'Día 1 (Jue 19): Bienvenida y orientación · Día 2 (Vie 20): Setup + tu primera web',
    fechaInicio: '2026-02-19',
    emoji: '🚀',
    preclase: {
      titulo: 'Preparación para el LaunchPad',
      duracion: '15 min',
      contenido: `
## Bienvenido a la Primera Promoción 🎉

Este no es solo un curso técnico. Es un viaje de transformación donde vas a crear algo real, conectar con personas increíbles, y descubrir de qué eres capaz.

La Semana 1 es especial: tiene **dos días**. Usa las pestañas de arriba para ver la preparación y grabación de cada día.

- **Día 1 (Jueves):** Bienvenida, presentaciones y Rueda del Creador
- **Día 2 (Viernes):** Setup técnico completo con Claude Code
      `,
      recursos: [
        { titulo: 'Crear cuenta en Supabase', url: 'https://supabase.com', tipo: 'link' },
        { titulo: 'Documentación Next.js App Router', url: 'https://nextjs.org/docs/app', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-02-19',
      hora: '19:00 CET',
      duracion: '2h + 2h',
      zoomUrl: 'https://us02web.zoom.us/j/81636452979',
    },
    entregable: {
      titulo: 'Rueda del Creador + Primera web',
      descripcion: 'Tu Rueda del Creador compartida, setup técnico completo y tu primera web personalizada con Claude Code.',
      fechaLimite: '2026-02-26',
      checklist: [
        'Rueda del Creador completada (se hace en la clase del Día 1)',
        'Presentación hecha en la primera clase',
        'Terminal funcionando correctamente',
        'Claude Code responde a comandos (claude --version)',
        'Cuenta de GitHub creada y autenticada',
        'Cuenta de Supabase creada',
        'Cuenta de Vercel conectada a GitHub',
        'Carpeta ~/curso-ia creada',
        'Pencil instalado',
        'Theme elegido de la galería',
        'Web personalizada con Claude Code',
      ],
    },
    dias: [
      {
        titulo: 'Bienvenida y orientación',
        emoji: '👋',
        preclase: {
          titulo: 'Preparación Día 1',
          duracion: '10 min',
          contenido: `
## 📋 Antes del Día 1 (Jueves 19)

El Día 1 es una sesión de bienvenida y orientación. **No hay código.** Ven preparado para conectar con el grupo.

### 📝 Tu Presentación (2 minutos)

Prepara una mini-presentación para el Día 1:

1. **¿Quién eres?** — Nombre, de dónde eres, a qué te dedicas
2. **¿Qué quieres crear?** — Tu idea de proyecto (puede ser vaga todavía)
3. **¿Por qué ahora?** — Qué te motivó a dar este paso
4. **Un dato curioso** — Algo personal que nos ayude a conocerte

> No necesitas preparar nada técnico ni completar ningún ejercicio antes del Día 1. Solo tu presentación. La Rueda del Creador la haremos juntos durante la clase.
          `,
          recursos: [],
        },
        clase: {
          fecha: '2026-02-19',
          hora: '19:00 CET',
          duracion: '2h',
          zoomUrl: 'https://us02web.zoom.us/j/81636452979',
          videos: [
            {
              titulo: 'Día 1 — Bienvenida y conexión',
              url: 'https://us02web.zoom.us/rec/share/1sjG06twWJxAgcoEFeGf5RZLRo8Ib8Ab1gTJ1FyOgU7J1DLe_-PZJO79KMtuEDJ0.75Kr_1vBWsqhEV7U?startTime=1771528087000',
              tipo: 'link',
              passcode: 'MH+%g63Q',
            },
          ],
          notas: `
**Bienvenida y conexión**
- Bienvenida al curso y contexto
- Ronda de presentaciones (2 min cada uno)
- Hacemos juntos la Rueda del Creador
- Ejercicio: dificultades y miedos — ¿qué te frena?

**Conocer el ecosistema**
- Tour del [dashboard del curso](/curso): semanas, progreso, pizarra
- Cómo funciona la [pizarra de clase](/curso/clase/1): pasos en vivo
- La [galería de themes](/curso/themes): 20 templates premium
- La comunidad de [Discord](/precurso/discord): canales, cómo pedir ayuda
- Cómo funciona la pre-clase y el entregable

**Tarea para mañana**
- Leer la pre-clase del Día 2 (verificar setup)
- Tener el terminal + Claude Code listos
- Crear cuentas de Supabase y Vercel
          `,
        },
        entregable: {
          titulo: 'Rueda del Creador y presentación',
          descripcion: 'Completa tu Rueda del Creador durante la clase y haz tu presentación al grupo.',
          fechaLimite: '2026-02-19',
          checklist: [
            'Presentación hecha en la primera clase',
            'Rueda del Creador completada (se hace en la clase del Día 1)',
          ],
        },
      },
      {
        titulo: 'Setup + Tu Primera Web',
        emoji: '🛠️',
        preclase: {
          titulo: 'Verificación antes de la clase',
          duracion: '5 min',
          contenido: `
## ✅ Verificación antes de la clase

Comprueba que tienes todo listo. Si algo falla, **tráelo a la clase y lo resolvemos juntos**.

- [ ] Terminal abierta y funcionando
- [ ] Claude Code instalado (\`claude --version\`)
- [ ] Cuenta de GitHub creada
- [ ] Cuenta de Supabase creada (supabase.com)
- [ ] Cuenta de Vercel conectada a GitHub

> No te preocupes si algo no funciona. En la clase lo configuramos todo juntos paso a paso.
          `,
          recursos: [
            { titulo: 'Guía de instalación de Claude Code', url: '/empezar', tipo: 'link' },
            { titulo: 'Crear cuenta en Supabase', url: 'https://supabase.com', tipo: 'link' },
            { titulo: 'Crear cuenta en Vercel', url: 'https://vercel.com', tipo: 'link' },
          ],
        },
        clase: {
          fecha: '2026-02-20',
          hora: '19:00 CET',
          duracion: '2h',
          zoomUrl: 'https://us02web.zoom.us/j/81636452979',
          videos: [
            {
              titulo: 'Día 2 — Setup técnico + Tu primera web',
              url: 'https://us02web.zoom.us/rec/share/vlIuuI9VmGKf8F_BhBpFwcmB7BbQs3FNuIF8j-ZqBUMNt2vZlpOJCxfR32MJmhgF.R0cfGOCGCDLzP2Sh?startTime=1771614427000',
              tipo: 'link',
              passcode: '1l!Kz*ra',
            },
          ],
          notas: `
**Setup técnico (30 min)**
- Verificamos el setup: terminal, Claude Code, cuentas
- Instalamos y configuramos Pencil (MCP)
- Configuramos Git y GitHub CLI
- Creamos la carpeta ~/curso-ia

**Tu primera web (1h 30 min)**
- Elegimos theme de la [galería](/curso/themes)
- Creamos el proyecto desde el theme
- Personalizamos con Claude Code (colores, textos, secciones)
- Iteramos el diseño pidiendo cambios a Claude
          `,
        },
        entregable: {
          titulo: 'Setup completo + web personalizada',
          descripcion: 'Tu entorno técnico funcionando y tu primera web personalizada con Claude Code.',
          fechaLimite: '2026-02-20',
          checklist: [
            'Terminal funcionando correctamente',
            'Claude Code responde a comandos (claude --version)',
            'Cuenta de GitHub creada y autenticada',
            'Cuenta de Supabase creada',
            'Cuenta de Vercel conectada a GitHub',
            'Carpeta ~/curso-ia creada',
            'Pencil instalado',
            'Theme elegido de la galería',
            'Web personalizada con Claude Code (colores, textos, secciones)',
          ],
        },
      },
    ],
  },
  // ==========================================
  // SEMANA 2 — Tu Primera Web (NUEVA)
  // ==========================================
  {
    num: 2,
    titulo: 'Conectar y Desplegar',
    descripcion: 'Tu web ya existe. Ahora la conectamos con GitHub, Supabase y Vercel para que sea real.',
    fechaInicio: '2026-02-27',
    emoji: '🌐',
    preclase: {
      titulo: 'Verificación antes de la clase',
      duracion: '5 min',
      contenido: `
## ✅ Verificación antes de la clase

- [ ] Tu web del Día 2 funciona en local (\`npm run dev\`)
- [ ] Has seguido personalizando con Claude Code (colores, textos, secciones)
- [ ] Setup del Día 2 completo (terminal, Claude Code, Git, cuentas)

En clase conectaremos tu web con GitHub, Supabase y la desplegaremos en Vercel.
      `,
      recursos: [
        { titulo: 'Galería de themes (por si quieres cambiar)', url: '/curso/themes', tipo: 'link' },
        { titulo: 'Documentación Next.js App Router', url: 'https://nextjs.org/docs/app', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-02-27',
      hora: '19:00 CET',
      duracion: '2h',
      zoomUrl: 'https://us02web.zoom.us/j/81636452979',
    },
    entregable: {
      titulo: 'Waitlist desplegada',
      descripcion: 'Tu waitlist funcionando en internet con formulario de captura de emails y base de datos conectada.',
      fechaLimite: '2026-03-05',
      checklist: [
        'Theme base elegido y personalizado',
        'Proyecto creado a partir del theme',
        'Landing page personalizada con formulario',
        'Base de datos conectada (Supabase)',
        'Emails guardándose correctamente',
        'Desplegado en Vercel',
        'CLAUDE.md creado en la raíz del proyecto',
        'URL compartida en Discord',
      ],
    },
  },
  // ==========================================
  // SEMANA 3 — Tu Proyecto: Diseño + UI (era S2)
  // ==========================================
  {
    num: 3,
    titulo: 'Tu Proyecto — Diseño + UI',
    descripcion: 'Empezamos TU proyecto. Diseñarás toda la interfaz con shadcn/ui y Pencil.',
    fechaInicio: '2026-03-06',
    emoji: '🎨',
    preclase: {
      titulo: 'Verificación antes de la clase',
      duracion: '5 min',
      contenido: `
## ✅ Verificación antes de la clase

- [ ] Tu waitlist de S2 está desplegada y funcionando
- [ ] Tienes una idea clara de tu proyecto propio
- [ ] Claude Code funcionando en tu carpeta de proyecto

En clase: diseñaremos toda la UI de tu proyecto con shadcn/ui y Pencil.
      `,
      recursos: [
        { titulo: 'Catálogo shadcn/ui', url: 'https://ui.shadcn.com', tipo: 'link' },
        { titulo: 'Pencil — Diseño visual para Claude', url: 'https://www.pencil.dev/', tipo: 'link' },
        { titulo: 'Skills.sh — Directorio de Skills', url: 'https://skills.sh/', tipo: 'link' },
        { titulo: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs', tipo: 'link' },
        { titulo: 'Colores Tailwind', url: 'https://tailwindcss.com/docs/customizing-colors', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-03-06',
      hora: '19:00 CET',
      duracion: '2h',
      zoomUrl: 'https://us02web.zoom.us/j/81636452979',
    },
    entregable: {
      titulo: 'UI completa de tu proyecto',
      descripcion: 'Todas las pantallas de tu aplicación diseñadas con shadcn/ui (sin funcionalidad todavía).',
      fechaLimite: '2026-03-12',
      checklist: [
        'Proyecto propio creado en GitHub',
        'shadcn/ui instalado y configurado',
        'Diseño en Pencil (.pen) de las pantallas principales',
        'Dashboard principal diseñado',
        'Al menos 3 páginas creadas',
        'Navegación funcionando',
        'Responsive (móvil y desktop)',
        'Al menos 1 skill creada en .claude/skills/',
      ],
    },
  },
  // ==========================================
  // SEMANA 4 — Base de Datos + Autenticación (FUSIÓN S3+S4)
  // ==========================================
  {
    num: 4,
    titulo: 'Base de Datos + Autenticación',
    descripcion: 'Diseña tu schema, conecta Supabase, implementa auth y protege datos con RLS — todo en una sesión.',
    fechaInicio: '2026-03-13',
    emoji: '🔐',
    preclase: {
      titulo: 'Verificación + concepto clave',
      duracion: '10 min',
      contenido: `
## ✅ Verificación (3 min)

- [ ] Proyecto de S3 con UI funcionando
- [ ] Cuenta de Supabase activa
- [ ] Claude Code funcionando

## 🧠 Concepto clave: Row Level Security (7 min)

RLS protege tus datos **a nivel de base de datos**. Cada fila tiene reglas de quién puede leerla o modificarla.

**Ejemplo:** "Solo el dueño puede ver sus proyectos"
→ La base de datos RECHAZA peticiones de otros usuarios automáticamente.

\`\`\`sql
-- Solo el dueño puede ver sus proyectos
CREATE POLICY "Users can view own projects"
ON projects FOR SELECT
USING (auth.uid() = user_id);
\`\`\`

¿Por qué importa? Sin RLS, cualquier usuario podría ver los datos de otros manipulando las peticiones. Con RLS, la base de datos se protege sola.

👉 En clase implementaremos DB + Auth + RLS juntos.
      `,
      recursos: [
        { titulo: 'Supabase Quickstart', url: 'https://supabase.com/docs/guides/getting-started', tipo: 'link' },
        { titulo: 'Supabase Auth Docs', url: 'https://supabase.com/docs/guides/auth', tipo: 'link' },
        { titulo: 'Next.js Middleware', url: 'https://nextjs.org/docs/app/building-your-application/routing/middleware', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-03-13',
      hora: '19:00 CET',
      duracion: '2h',
      zoomUrl: 'https://us02web.zoom.us/j/81636452979',
    },
    entregable: {
      titulo: 'Base de datos + autenticación completa',
      descripcion: 'Tu app con datos reales, usuarios autenticados y datos protegidos con RLS.',
      fechaLimite: '2026-03-19',
      checklist: [
        'Proyecto Supabase creado',
        'Al menos 3 tablas diseñadas',
        'Relaciones configuradas (foreign keys)',
        'CRUD funcionando desde la app',
        'Página de registro funcionando',
        'Página de login funcionando',
        'Sesión persistente',
        'Rutas protegidas con middleware',
        'RLS configurado en todas las tablas',
        'Logout funcionando',
      ],
    },
  },
  // ==========================================
  // SEMANA 5 — APIs y Server Actions
  // ==========================================
  {
    num: 5,
    titulo: 'APIs y Server Actions',
    descripcion: 'Crea endpoints de API y aprende a usar Server Actions de Next.js.',
    fechaInicio: '2026-03-20',
    emoji: '⚡',
    preclase: {
      titulo: 'Verificación + concepto clave',
      duracion: '10 min',
      contenido: `
## ✅ Verificación (3 min)

- [ ] DB + Auth de S4 funcionando
- [ ] CRUD operando correctamente
- [ ] Login/logout funcionando

## 🧠 Concepto clave: Server Actions vs Route Handlers (7 min)

Next.js te da DOS formas de manejar lógica del servidor:

| | Server Actions | Route Handlers |
|---|---|---|
| **Cuándo** | Formularios, mutaciones | Webhooks, APIs externas |
| **Archivo** | \`app/actions.ts\` | \`app/api/*/route.ts\` |
| **Dirección** | Cliente → Servidor | Cualquier → Servidor |
| **Revalidación** | Automática con \`revalidatePath\` | Manual |

**Regla simple:** Si es un formulario o botón → Server Action. Si es un webhook o API pública → Route Handler.

👉 En clase implementaremos ambos en tu proyecto.
      `,
      recursos: [
        { titulo: 'Server Actions Docs', url: 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions', tipo: 'link' },
        { titulo: 'Zod Documentation', url: 'https://zod.dev', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-03-20',
      hora: '19:00 CET',
      duracion: '2h',
      zoomUrl: 'https://us02web.zoom.us/j/81636452979',
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
  // ==========================================
  // SEMANA 6 — Pagos con Stripe
  // ==========================================
  {
    num: 6,
    titulo: 'Pagos con Stripe',
    descripcion: 'Integra Stripe para cobrar a tus usuarios. Planes, suscripciones, y webhooks.',
    fechaInicio: '2026-03-27',
    emoji: '💳',
    preclase: {
      titulo: 'Verificación + concepto clave',
      duracion: '10 min',
      contenido: `
## ✅ Verificación (3 min)

- [ ] Cuenta de Stripe creada (dashboard.stripe.com)
- [ ] Modo Test activado
- [ ] API keys copiadas (test mode)

## 🧠 Concepto clave: El flujo de pago (7 min)

Así funciona un pago online con Stripe:

\`\`\`
Usuario → Click "Pagar" → Stripe Checkout → Paga → Webhook → Tu DB actualizada
\`\`\`

1. Tu app crea una **Checkout Session** (Server Action)
2. El usuario va a la **página de pago de Stripe** (hosted, segura)
3. Stripe te avisa con un **webhook** cuando el pago se completa
4. Tu app **actualiza la base de datos** con el nuevo estado

> El webhook es clave: nunca confíes solo en el redirect del navegador para confirmar un pago.

👉 En clase integraremos Stripe paso a paso.
      `,
      recursos: [
        { titulo: 'Stripe Dashboard', url: 'https://dashboard.stripe.com', tipo: 'link' },
        { titulo: 'Stripe Docs', url: 'https://stripe.com/docs', tipo: 'link' },
        { titulo: 'Stripe + Next.js', url: 'https://stripe.com/docs/checkout/quickstart', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-03-27',
      hora: '19:00 CET',
      duracion: '2h',
      zoomUrl: 'https://us02web.zoom.us/j/81636452979',
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
  // ==========================================
  // SEMANA 7 — Email y Notificaciones
  // ==========================================
  {
    num: 7,
    titulo: 'Email y Notificaciones',
    descripcion: 'Envía emails transaccionales con Resend y notificaciones en la app.',
    fechaInicio: '2026-04-03',
    emoji: '📧',
    preclase: {
      titulo: 'Resumen rápido + verificación',
      duracion: '15 min',
      contenido: `
## ✅ Verificación (3 min)

- [ ] Cuenta de Resend creada (resend.com)
- [ ] Pagos de S6 funcionando

## 📖 Resumen rápido (12 min)

### Tipos de emails

- **Transaccionales**: Se envían por una acción del usuario (registro, compra, reset password). Siempre se envían.
- **Marketing**: Newsletters, promociones. El usuario puede desuscribirse.
- **Notificaciones**: Alertas dentro de la app (no son emails).

### Resend + React Email

Resend es el servicio que envía los emails. React Email es la librería para diseñar los templates como componentes React — igual que tu UI.

### Cuándo enviar cada tipo

| Evento | Email | In-app |
|--------|-------|--------|
| Registro | ✅ Bienvenida | ✅ |
| Pago recibido | ✅ Recibo | ✅ |
| Nuevo comentario | ❌ | ✅ |
| Password reset | ✅ | ❌ |

👉 En clase configuraremos Resend, crearemos templates con React Email y añadiremos notificaciones in-app.
      `,
      recursos: [
        { titulo: 'Resend', url: 'https://resend.com', tipo: 'link' },
        { titulo: 'React Email', url: 'https://react.email', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-04-03',
      hora: '19:00 CET',
      duracion: '2h',
      zoomUrl: 'https://us02web.zoom.us/j/81636452979',
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
  // ==========================================
  // SEMANA 8 — Testing y Calidad
  // ==========================================
  {
    num: 8,
    titulo: 'Testing y Calidad',
    descripcion: 'Añade tests a tu aplicación para asegurar que todo funciona correctamente.',
    fechaInicio: '2026-04-10',
    emoji: '🧪',
    preclase: {
      titulo: 'Resumen rápido + verificación',
      duracion: '15 min',
      contenido: `
## ✅ Verificación (3 min)

- [ ] Proyecto con todas las features de S1-S7
- [ ] \`npm run dev\` funciona sin errores

## 📖 Resumen rápido (12 min)

### ¿Por qué testear?

Los tests detectan bugs ANTES de que los vean tus usuarios. También te dan confianza para hacer cambios sin miedo a romper algo.

### Tipos de tests

1. **Unit tests** (Vitest): Prueban funciones individuales. Rápidos.
2. **E2E tests** (Playwright): Simulan un usuario real navegando tu app. Más lentos pero más realistas.

### ¿Qué testear primero?

Enfócate en los **flujos críticos** de tu app:
- Login/registro
- El flujo principal (crear, editar, eliminar)
- Pagos (si aplica)

> Regla de oro: "Testea comportamientos, no implementación."

👉 En clase escribiremos tests de los flujos críticos de tu proyecto.
      `,
      recursos: [
        { titulo: 'Vitest', url: 'https://vitest.dev', tipo: 'link' },
        { titulo: 'Playwright', url: 'https://playwright.dev', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-04-10',
      hora: '19:00 CET',
      duracion: '2h',
      zoomUrl: 'https://us02web.zoom.us/j/81636452979',
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
  // ==========================================
  // SEMANA 9 — Performance y SEO
  // ==========================================
  {
    num: 9,
    titulo: 'Performance y SEO',
    descripcion: 'Optimiza tu app para que cargue rápido y aparezca en Google.',
    fechaInicio: '2026-04-17',
    emoji: '🚄',
    preclase: {
      titulo: 'Resumen rápido + verificación',
      duracion: '15 min',
      contenido: `
## ✅ Verificación (3 min)

- [ ] Tests de S8 pasando
- [ ] App desplegada en Vercel

## 📖 Resumen rápido (12 min)

### Core Web Vitals

Google mide tu web con 3 métricas:
- **LCP** (Largest Contentful Paint): ¿Cuándo aparece el contenido principal? Meta: < 2.5s
- **INP** (Interaction to Next Paint): ¿Cuánto tarda en responder? Meta: < 200ms
- **CLS** (Cumulative Layout Shift): ¿Se mueve el contenido? Meta: < 0.1

### Optimizaciones rápidas en Next.js

- **Imágenes**: Usa \`next/image\` en vez de \`<img>\`
- **Fonts**: Usa \`next/font\` en vez de Google Fonts manual
- **Lazy loading**: Usa \`Suspense\` para componentes pesados

### SEO básico

- Title y description únicos por página
- Open Graph tags para compartir en redes
- Sitemap.xml generado automáticamente

### Herramientas

- **PageSpeed Insights** — mide tu web al instante
- **Lighthouse** — auditoría completa en Chrome DevTools

👉 En clase optimizaremos tu app para que pase PageSpeed >90.
      `,
      recursos: [
        { titulo: 'Next.js Image Optimization', url: 'https://nextjs.org/docs/app/building-your-application/optimizing/images', tipo: 'link' },
        { titulo: 'Core Web Vitals', url: 'https://web.dev/vitals/', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-04-17',
      hora: '19:00 CET',
      duracion: '2h',
      zoomUrl: 'https://us02web.zoom.us/j/81636452979',
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
  // ==========================================
  // SEMANA 10 — Agent Swarms y Lanzamiento
  // ==========================================
  {
    num: 10,
    titulo: 'Agent Swarms y Lanzamiento',
    descripcion: 'Claude Code como equipo completo + lanzamiento de tu SaaS al mundo.',
    fechaInicio: '2026-04-24',
    emoji: '🤖',
    preclase: {
      titulo: 'Pre-lanzamiento + verificación',
      duracion: '15 min',
      contenido: `
## ✅ Verificación (3 min)

- [ ] App optimizada de S9
- [ ] Dominio propio (si lo tienes)

## 📖 Pre-lanzamiento (12 min)

### Checklist técnico

- [ ] Dominio propio configurado
- [ ] HTTPS activo
- [ ] Stripe en modo producción
- [ ] Emails enviándose correctamente
- [ ] Error tracking (Sentry)
- [ ] Analytics configurado

### Checklist legal (básico)

- [ ] Términos de servicio
- [ ] Política de privacidad
- [ ] Aviso de cookies (si aplica)

### Dónde lanzar

1. **Product Hunt** — El clásico para SaaS
2. **Hacker News** — Comunidad tech
3. **Reddit** — r/SaaS, r/startups
4. **Twitter/X** — Tu audiencia personal
5. **IndieHackers** — Comunidad de makers

> "Done is better than perfect. Ship it."

👉 En clase: Agent Swarms + ¡LANZAMOS!
      `,
      recursos: [
        { titulo: 'Lección: Agent Teams', url: '/ralph/agent-teams', tipo: 'link' },
        { titulo: 'Lección: Skills, Hooks y Plugins', url: '/fundamentos/skills-hooks-plugins', tipo: 'link' },
        { titulo: 'skills.sh — Directorio de Skills', url: 'https://skills.sh/', tipo: 'link' },
        { titulo: 'Product Hunt', url: 'https://producthunt.com', tipo: 'link' },
      ],
    },
    clase: {
      fecha: '2026-04-24',
      hora: '19:00 CET',
      duracion: '2h',
      zoomUrl: 'https://us02web.zoom.us/j/81636452979',
    },
    entregable: {
      titulo: 'Agent Swarm + Producto lanzado',
      descripcion: 'Tu proyecto con skills de agentes configuradas y tu SaaS lanzado al mundo.',
      fechaLimite: '2026-04-30',
      checklist: [
        'CLAUDE.md con roles y responsabilidades definidos',
        'Al menos 3 skills especializadas creadas (.claude/skills/)',
        'Skill de revisión de código (/review) funcionando',
        'Dominio propio configurado',
        'Stripe en modo producción',
        'Analytics instalado',
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
