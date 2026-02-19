// Guías del instructor para cada semana

export interface ChecklistItem {
  texto: string
  checked?: boolean
}

export interface AgendaItem {
  tiempo: string
  titulo: string
  detalles: string[]
}

export interface GuiaInstructor {
  semanaNum: number
  antesDeClase: ChecklistItem[]
  agenda: AgendaItem[]
  frasesClave: string[]
  erroresComunes: string[]
  despuesDeClase: ChecklistItem[]
  notasAdicionales?: string
}

export const GUIAS_INSTRUCTOR: GuiaInstructor[] = [
  {
    semanaNum: 1,
    antesDeClase: [
      // Día 1 (Jueves) — Orientación
      { texto: 'Preparar música suave de fondo para la bienvenida' },
      { texto: 'Tener tu propia Rueda del Creador completada (para modelar el ejercicio)' },
      { texto: 'Tener /curso/rueda abierta para que hagan la Rueda en vivo' },
      { texto: 'Lista de nombres de todos los alumnos impresa' },
      { texto: 'Verificar que Zoom funciona y compartir pantalla OK' },
      { texto: 'Preparar ejercicio de visualización (guión en notas adicionales)' },
      { texto: 'Tener abierto: /curso, /curso/clase/1, /curso/themes, /precurso/discord' },
      { texto: 'Revisar presentaciones del Discord si alguien las subió antes' },
      // Día 2 (Viernes) — Técnico
      { texto: 'Tener terminal abierta con proyecto limpio (para Día 2)' },
      { texto: 'Supabase abierto con proyecto demo (para Día 2)' },
      { texto: 'Galería de themes abierta /curso/themes (para Día 2)' },
    ],
    agenda: [
      // — DÍA 1 (Jueves): Bienvenida y Orientación —
      {
        tiempo: '— DÍA 1 (JUEVES) —',
        titulo: 'Bienvenida y Orientación',
        detalles: [
          'Hoy NO hay código. Es una sesión de conexión humana y orientación.',
          'Objetivo: que se conozcan, que conozcan el ecosistema, que preparen el Día 2.',
        ],
      },
      {
        tiempo: '0:00-0:05',
        titulo: 'Bienvenida con intención',
        detalles: [
          'Música suave de fondo mientras la gente entra',
          'Dar la bienvenida: "Este es el comienzo de algo especial"',
          'Explicar: no es solo un curso técnico, es una comunidad',
          'Contexto: Primera Promoción = grupo fundador',
        ],
      },
      {
        tiempo: '0:05-0:25',
        titulo: 'Ronda de presentaciones',
        detalles: [
          'Cada persona: 2 minutos máximo',
          'Formato: Nombre, de dónde eres, qué quieres crear, por qué ahora, dato curioso',
          'Tú vas primero como ejemplo (sé vulnerable, comparte tu historia)',
          'Tomar notas de cada persona para recordar después',
          'Celebrar cada presentación con aplausos o reacción',
        ],
      },
      {
        tiempo: '0:25-0:45',
        titulo: 'La Rueda del Creador — Hacerla juntos',
        detalles: [
          'Abrir /curso/rueda en pantalla compartida',
          'Explicar las 8 áreas una por una brevemente',
          'Dar 5 minutos para que todos la completen en vivo',
          'Compartir la tuya primero (modelar vulnerabilidad)',
          'Pedir 2-3 voluntarios que compartan sus insights',
          'Reflexión: "¿Qué área necesita más atención estas 10 semanas?"',
          'Mensaje clave: Somos un equipo, nos apoyamos',
        ],
      },
      {
        tiempo: '0:45-0:55',
        titulo: 'Ejercicio: Dificultades y miedos',
        detalles: [
          'Preguntar: "¿Qué te frena? ¿Qué miedos tienes?"',
          'Cada uno comparte brevemente (1 min)',
          'Normalizar: todos tienen miedos, incluso los seniors',
          'Agrupar: miedos técnicos vs miedos personales vs síndrome del impostor',
          'Cerrar con: "Estos miedos son normales. Estamos aquí para superarlos juntos."',
        ],
      },
      {
        tiempo: '0:55-1:05',
        titulo: 'Visualización: Tu yo del futuro',
        detalles: [
          'Pedir que cierren los ojos (cámaras opcionales apagadas)',
          'Guiar: "Imagina que han pasado 10 semanas..."',
          '"Tu proyecto está en producción, tienes usuarios..."',
          '"¿Cómo te sientes? ¿Qué has aprendido? ¿Quién eres ahora?"',
          'Pedir que escriban 3 palabras que describan ese futuro',
          'Compartir en chat algunas palabras',
        ],
      },
      {
        tiempo: '1:05-1:15',
        titulo: 'DESCANSO',
        detalles: [
          'Poner música de nuevo',
          'Invitar a estirarse, beber agua',
        ],
      },
      {
        tiempo: '1:15-1:25',
        titulo: 'Tour: Dashboard del curso',
        detalles: [
          'Compartir pantalla y navegar /curso',
          'Mostrar: semanas, progreso, pre-clases, entregables',
          'Explicar: cómo funciona el desbloqueo semanal',
          'Mostrar: la barra de progreso y la sidebar de navegación',
        ],
      },
      {
        tiempo: '1:25-1:35',
        titulo: 'Tour: Pizarra de clase',
        detalles: [
          'Navegar a /curso/clase/1',
          'Explicar: "Esto es lo que seguimos en cada clase en vivo"',
          'Mostrar: los pasos, bloques de código, tips, links',
          'Mostrar: el Día 2 que haremos mañana',
        ],
      },
      {
        tiempo: '1:35-1:45',
        titulo: 'Tour: Themes premium',
        detalles: [
          'Navegar a /curso/themes',
          'Mostrar la galería de 20 themes incluidos',
          'Recomendar: Simple, Waitlist o Gray para la primera landing',
          'Explicar: mañana elegirán uno como base y Claude lo personaliza',
        ],
      },
      {
        tiempo: '1:45-1:50',
        titulo: 'Tour: Discord',
        detalles: [
          'Mostrar canales: #dudas, #compartir, #general',
          'Explicar: cómo pedir ayuda (contexto, screenshots, código)',
          'Recordar: aquí se comparten los entregables',
        ],
      },
      {
        tiempo: '1:50-2:00',
        titulo: 'Cierre del Día 1 + Tarea para mañana',
        detalles: [
          'Resumen: lo que hicimos hoy (conexión + ecosistema)',
          'Tarea OBLIGATORIA para mañana:',
          '  - Leer la pre-clase completa (sección de setup técnico)',
          '  - Tener terminal + Claude Code instalados y funcionando',
          '  - Crear cuentas de Supabase y Vercel',
          '  - Elegir un theme base de /curso/themes',
          'Cerrar con gratitud: "Gracias por confiar en este proceso"',
          'Invitar a compartir una palabra en el chat: ¿cómo te sientes?',
        ],
      },
      // — DÍA 2 (Viernes): Tu Primera Web —
      {
        tiempo: '— DÍA 2 (VIERNES) —',
        titulo: 'Tu Primera Web',
        detalles: [
          'Hoy sí hay código. Todo el mundo construye su waitlist.',
          'Objetivo: salir con una web desplegada en internet.',
        ],
      },
      {
        tiempo: '0:00-0:10',
        titulo: 'Check-in rápido',
        detalles: [
          '¿Todos hicieron la tarea? ¿Terminal + Claude Code listo? ¿Theme elegido?',
          'Resolver problemas de setup rápidamente',
          'Si alguien no tiene Claude Code → ayudar ahora',
        ],
      },
      {
        tiempo: '0:10-0:25',
        titulo: 'Crear proyecto y elegir theme',
        detalles: [
          'npx create-next-app@latest mi-waitlist (o clonar theme)',
          'Mostrar cómo clonar un theme de /curso/themes',
          'Verificar que todos lo tienen corriendo con npm run dev',
        ],
      },
      {
        tiempo: '0:25-0:50',
        titulo: 'Personalizar con Claude Code',
        detalles: [
          'Abrir Claude Code: claude --dangerously-skip-permissions',
          'Prompt en vivo: personalizar colores, textos, imágenes del theme',
          'Mostrar cómo Claude modifica el código en tiempo real',
          'Crear CLAUDE.md con contexto del proyecto',
          'Verificar que todos van siguiendo',
        ],
      },
      {
        tiempo: '0:50-1:00',
        titulo: 'DESCANSO',
        detalles: [
          'Poner música',
          'Invitar a estirarse',
          '"Cuando volvamos: base de datos y deploy"',
        ],
      },
      {
        tiempo: '1:00-1:25',
        titulo: 'Supabase + Formulario de emails',
        detalles: [
          'Crear proyecto en Supabase',
          'Crear tabla waitlist con SQL',
          'Configurar .env.local con las keys',
          'Conectar formulario con Supabase',
          'Mostrar Table Editor para verificar datos',
        ],
      },
      {
        tiempo: '1:25-1:40',
        titulo: 'Panel admin + Git/GitHub',
        detalles: [
          'Crear página /admin con Claude',
          'Configurar Git: git config + gh auth login',
          'Crear repo: gh repo create mi-waitlist --public --source=. --push',
        ],
      },
      {
        tiempo: '1:40-1:55',
        titulo: 'Deploy en Vercel',
        detalles: [
          'Conectar repo en vercel.com/new',
          'Añadir variables de entorno',
          'Deploy y verificar que funciona en producción',
          'Celebrar: ¡primer proyecto en internet!',
        ],
      },
      {
        tiempo: '1:55-2:00',
        titulo: 'Cierre de la semana',
        detalles: [
          'Compartir URLs en Discord',
          'Recordar: actualizar CLAUDE.md con el estado actual',
          'Entregable: URL en producción + Rueda del Creador compartida',
          'Próxima semana: empezamos TU proyecto con shadcn/ui',
        ],
      },
    ],
    frasesClave: [
      'Este no es solo un curso, es una comunidad de creadores',
      'Todos empezamos sin saber. El coraje es dar el primer paso',
      'La rueda desequilibrada no rueda bien — conocerte es el primer paso',
      'No te preocupes por entender todo. Enfócate en el flujo',
      'Claude hace el trabajo pesado, tú eres el director',
      'En 10 semanas serás una persona diferente',
      'El mejor momento para empezar fue hace un año. El segundo mejor es ahora',
      'El Día 1 es para conectar. El Día 2 es para construir.',
    ],
    erroresComunes: [
      // Día 1
      'Alguien no completa la Rueda en clase → darle más tiempo o ayudarle en el descanso',
      'Presentaciones muy largas → intervenir amablemente a los 2 min',
      'Alguien muy tímido → no forzar, decir "cuando estés listo"',
      'No pueden acceder a /curso/themes → verificar email gate',
      // Día 2
      'Node.js no instalado → verificar con "node --version"',
      'npm no encontrado → reinstalar Node.js',
      'Puerto 3000 ocupado → cerrar otras apps o usar otro puerto',
      'Claude Code no instalado → npm install -g @anthropic-ai/claude-code',
      'Theme no clonado → ayudar con git clone del repo de themes',
      'Supabase keys copiadas mal → verificar en Settings → API',
    ],
    despuesDeClase: [
      { texto: 'Subir grabaciones de ambos días a la plataforma' },
      { texto: 'Escribir resumen del Día 1 (incluir momento emocional)' },
      { texto: 'Mensaje en Discord agradeciendo la apertura del grupo' },
      { texto: 'Crear canal #presentaciones si no existe' },
      { texto: 'Verificar que todos tienen repo en GitHub y URL de Vercel' },
      { texto: 'Revisar las Ruedas compartidas y dar feedback personal' },
    ],
    notasAdicionales: `
## Guión para la Visualización (Día 1, ~10 min)

"Vamos a hacer un pequeño ejercicio. Si te sientes cómodo, cierra los ojos. Si no, simplemente mira hacia abajo.

Respira profundo... inhala... exhala...

Imagina que han pasado 10 semanas. Es abril de 2026. Estás sentado exactamente donde estás ahora, pero algo es diferente.

Tu proyecto existe. Está en internet. Tiene usuarios reales. Gente que nunca conociste está usando algo que TÚ creaste.

¿Cómo se siente eso? Nota las sensaciones en tu cuerpo...

Mira hacia atrás estos 10 semanas. ¿Qué obstáculos superaste? ¿Qué aprendiste sobre ti mismo?

¿Quién eres ahora que no eras hace 10 semanas?

Cuando estés listo, abre los ojos y escribe 3 palabras que describan a ese tú del futuro."

---

## Estructura de los 2 días

Esta es la única semana con 2 días (Jue-Vie en vez de solo Vie). El motivo:
- **Día 1 = conexión**: necesitan conocerse y sentirse seguros antes de tocar código
- **Día 2 = acción**: con la confianza del grupo, construyen su primera web

Si alguien no puede asistir al Día 1, puede ver la grabación. Pero el Día 2 es imprescindible porque es 100% práctico.

### Puntos clave del Día 2
- Verificar que TODOS tienen terminal + Claude Code antes de empezar
- Los themes de /curso/themes son la base — no crear desde cero
- Explicar env variables (.env.local) con cuidado, es concepto nuevo
- Deploy con Vercel debe ser el momento de celebración
- Actualizar CLAUDE.md al final: es el hábito que queremos instalar
    `,
  },
  {
    semanaNum: 2,
    antesDeClase: [
      { texto: 'Revisar proyectos que subieron a GitHub' },
      { texto: 'Tener shadcn/ui docs abierto' },
      { texto: 'Preparar ejemplos de buenos UI (Linear, Notion)' },
      { texto: 'Terminal con proyecto demo limpio' },
      { texto: 'Tener skills.sh abierto para mostrar ejemplos' },
      { texto: 'Revisar preguntas del Discord' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:15',
        titulo: 'Recap + Revisión de waitlists',
        detalles: [
          'Mostrar 2-3 waitlists de alumnos',
          'Destacar lo bueno de cada una',
          'Resolver dudas pendientes de la semana pasada',
        ],
      },
      {
        tiempo: '0:15-0:40',
        titulo: 'Introducción a shadcn/ui',
        detalles: [
          'Qué es y por qué usarlo',
          'Instalación: npx shadcn@latest init',
          'Añadir componentes: npx shadcn@latest add button card input',
          'Mostrar catálogo de componentes',
        ],
      },
      {
        tiempo: '0:40-1:00',
        titulo: 'Diseño de dashboard + Pencil',
        detalles: [
          'Estructura: sidebar + main content',
          'Componentes: Card, Button, Input',
          'Layout responsivo con Tailwind',
          'Opcional: diseñar en Pencil (.pen) y que Claude genere el código',
        ],
      },
      {
        tiempo: '1:00-1:15',
        titulo: 'DESCANSO',
        detalles: [
          'Preguntas sobre sus proyectos',
          'Ayuda individual si alguien está bloqueado',
        ],
      },
      {
        tiempo: '1:15-1:30',
        titulo: 'Skills: enseña a Claude tus procesos',
        detalles: [
          'Explicar: la semana pasada creamos CLAUDE.md (contexto general)',
          'Skills = instrucciones especializadas que Claude consulta bajo demanda',
          'Demo: crear .claude/skills/crear-componente.md',
          'Mostrar skills.sh: directorio de skills de la comunidad',
          'Cada uno crea al menos 1 skill para su proyecto',
        ],
      },
      {
        tiempo: '1:30-1:50',
        titulo: 'Práctica guiada: Cada uno diseña su UI',
        detalles: [
          'Cada alumno trabaja en SU proyecto',
          'Ir pasando por breakout rooms o preguntas',
          'Resolver problemas en tiempo real',
          'Mostrar ejemplos de prompts efectivos para UI',
        ],
      },
      {
        tiempo: '1:50-2:00',
        titulo: 'Cierre + Entregable',
        detalles: [
          'Explicar entregable: UI completa + al menos 1 skill',
          'Recordar: responsive obligatorio',
          'Próxima clase: base de datos con Supabase',
        ],
      },
    ],
    frasesClave: [
      'Un buen diseño no es decoración, es comunicación',
      'Menos es más — no llenes todo de componentes',
      'Copia descaradamente de los mejores (Linear, Notion)',
      'shadcn te da el 80%, tú personalizas el 20%',
      'Las Skills son como recetas: las defines una vez y Claude las sigue siempre',
    ],
    erroresComunes: [
      'Tailwind no funciona → verificar tailwind.config.js',
      'Componentes no estilizados → falta globals.css import',
      'Confusión con clases → usar Tailwind IntelliSense extension',
      'Diseño no responsivo → empezar mobile-first',
      'Skills no se detectan → verificar que están en .claude/skills/ (con punto)',
    ],
    despuesDeClase: [
      { texto: 'Subir grabación' },
      { texto: 'Revisar proyectos subidos a GitHub' },
      { texto: 'Dar feedback individual en Discord' },
      { texto: 'Verificar que cada proyecto tiene al menos 1 skill creada' },
      { texto: 'Preparar ejemplos de schemas para semana 3' },
    ],
  },
  {
    semanaNum: 3,
    antesDeClase: [
      { texto: 'Tener Supabase con proyecto demo' },
      { texto: 'Preparar diagrama ER de ejemplo' },
      { texto: 'SQL cheatsheet listo para compartir' },
      { texto: 'Verificar que todos tienen cuenta Supabase' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:10',
        titulo: 'Bienvenida + Recap semana anterior',
        detalles: [
          'Preguntar: ¿Cómo os fue con el UI?',
          'Resolver 2-3 dudas rápidas',
          'Mostrar 1-2 UIs destacadas',
        ],
      },
      {
        tiempo: '0:10-0:30',
        titulo: 'Teoría: Qué es una base de datos',
        detalles: [
          'Explicar tablas, filas, columnas',
          'Mostrar diagrama ER simple',
          'SQL básico: SELECT, INSERT, UPDATE',
          'Analogía: Excel pero más potente',
        ],
      },
      {
        tiempo: '0:30-0:45',
        titulo: 'Demo: Crear proyecto en Supabase',
        detalles: [
          'Ir a supabase.com → New Project',
          'Crear tabla "users" con columnas',
          'Mostrar Table Editor',
          'Insertar datos de prueba',
        ],
      },
      {
        tiempo: '0:45-1:00',
        titulo: 'DESCANSO',
        detalles: [],
      },
      {
        tiempo: '1:00-1:30',
        titulo: 'Práctica guiada: Todos crean tabla',
        detalles: [
          'Cada alumno crea su proyecto Supabase',
          'Crear tabla principal de su SaaS',
          'Resolver problemas en tiempo real',
          'Verificar que todos tienen datos insertados',
        ],
      },
      {
        tiempo: '1:30-1:50',
        titulo: 'Conectar con Next.js',
        detalles: [
          'Instalar @supabase/supabase-js',
          'Crear cliente en lib/supabase.ts',
          'Hacer primera query',
          'Mostrar datos en la UI',
        ],
      },
      {
        tiempo: '1:50-2:00',
        titulo: 'Cierre + Tarea',
        detalles: [
          'Explicar entregable',
          'Recordar: subir a Discord',
          'Próxima clase: Autenticación',
        ],
      },
    ],
    frasesClave: [
      'Una base de datos es como un Excel gigante con superpoderes',
      'Supabase te da Postgres gratis para siempre',
      'No te preocupes por optimizar, eso viene después',
      'Las relaciones son la clave de un buen schema',
    ],
    erroresComunes: [
      'Olvidar habilitar RLS → datos públicos',
      'No poner .env en .gitignore → secrets expuestos',
      'Confundir anon key con service role key',
      'Tipos incorrectos en columnas (text vs int)',
    ],
    despuesDeClase: [
      { texto: 'Subir grabación de Zoom' },
      { texto: 'Escribir resumen en notas' },
      { texto: 'Responder preguntas del Discord' },
      { texto: 'Verificar que todos conectaron Supabase' },
    ],
  },
  {
    semanaNum: 4,
    antesDeClase: [
      { texto: 'Supabase Auth docs abierto' },
      { texto: 'Proyecto demo con auth listo' },
      { texto: 'Ejemplos de RLS policies preparados' },
      { texto: 'Next.js middleware docs' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:15',
        titulo: 'Recap + Estado de proyectos',
        detalles: [
          '¿Todos tienen datos en Supabase?',
          'Resolver dudas de conexión',
          'Introducir tema: seguridad',
        ],
      },
      {
        tiempo: '0:15-0:40',
        titulo: 'Supabase Auth setup',
        detalles: [
          'Habilitar providers (email)',
          'Configurar redirect URLs',
          'Crear página de login',
          'signUp, signIn, signOut',
        ],
      },
      {
        tiempo: '0:40-1:00',
        titulo: 'Sesiones y protección de rutas',
        detalles: [
          'getUser() vs getSession()',
          'Middleware para proteger rutas',
          'Redirect a login si no autenticado',
        ],
      },
      {
        tiempo: '1:00-1:15',
        titulo: 'DESCANSO',
        detalles: [],
      },
      {
        tiempo: '1:15-1:45',
        titulo: 'Row Level Security',
        detalles: [
          'Por qué RLS es crucial',
          'Crear policies básicas',
          'Testear que funciona',
          'Debugging con Supabase dashboard',
        ],
      },
      {
        tiempo: '1:45-2:00',
        titulo: 'Cierre',
        detalles: [
          'Entregable: auth completo',
          'Próxima semana: APIs',
        ],
      },
    ],
    frasesClave: [
      'Autenticación = quién eres, Autorización = qué puedes hacer',
      'RLS protege a nivel de base de datos, no solo de UI',
      'Nunca confíes en el frontend para seguridad',
      'El anon key es público, service role NUNCA',
    ],
    erroresComunes: [
      'Redirect URL mal configurada',
      'Olvidar refrescar sesión',
      'RLS muy permisivo o muy restrictivo',
      'Confundir auth.uid() con custom user id',
    ],
    despuesDeClase: [
      { texto: 'Subir grabación' },
      { texto: 'Verificar que todos tienen login funcionando' },
      { texto: 'Revisar RLS de cada proyecto' },
    ],
  },
  {
    semanaNum: 5,
    antesDeClase: [
      { texto: 'Server Actions docs abierto' },
      { texto: 'Zod playground preparado' },
      { texto: 'Ejemplos de Route Handlers' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:15',
        titulo: 'Recap de auth',
        detalles: [
          '¿Todos tienen login funcionando?',
          'Resolver problemas de RLS',
        ],
      },
      {
        tiempo: '0:15-0:45',
        titulo: 'Server Actions',
        detalles: [
          'Qué son y cuándo usarlos',
          'Crear action para formulario',
          'useFormStatus para loading',
          'revalidatePath para refrescar',
        ],
      },
      {
        tiempo: '0:45-1:00',
        titulo: 'Validación con Zod',
        detalles: [
          'Por qué validar siempre',
          'Schemas básicos',
          'Integrar con Server Actions',
        ],
      },
      {
        tiempo: '1:00-1:15',
        titulo: 'DESCANSO',
        detalles: [],
      },
      {
        tiempo: '1:15-1:45',
        titulo: 'Route Handlers (cuando son necesarios)',
        detalles: [
          'Webhooks externos',
          'APIs públicas',
          'Integraciones',
        ],
      },
      {
        tiempo: '1:45-2:00',
        titulo: 'Cierre',
        detalles: [
          'Entregable: todas las operaciones con Server Actions',
        ],
      },
    ],
    frasesClave: [
      'Server Actions = la forma moderna de mutar datos',
      'Siempre valida, nunca confíes en el input',
      'Route Handlers para APIs, Server Actions para forms',
    ],
    erroresComunes: [
      'Olvidar "use server" al inicio',
      'No manejar errores correctamente',
      'Olvidar revalidatePath después de mutación',
    ],
    despuesDeClase: [
      { texto: 'Subir grabación' },
      { texto: 'Revisar implementación de cada proyecto' },
    ],
  },
  {
    semanaNum: 6,
    antesDeClase: [
      { texto: 'Stripe dashboard abierto (test mode)' },
      { texto: 'Productos de prueba creados' },
      { texto: 'Stripe CLI instalado para webhooks' },
      { texto: 'ngrok o similar para testing local' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:15',
        titulo: 'Intro a Stripe',
        detalles: [
          'Tour del dashboard',
          'Modo test vs producción',
          'Conceptos: products, prices, customers',
        ],
      },
      {
        tiempo: '0:15-0:45',
        titulo: 'Checkout Session',
        detalles: [
          'Crear producto y precio',
          'Implementar checkout button',
          'Redirect a Stripe hosted page',
          'Success y cancel URLs',
        ],
      },
      {
        tiempo: '0:45-1:00',
        titulo: 'Práctica: Cada uno crea su producto',
        detalles: [
          'Definir pricing de su SaaS',
          'Crear en Stripe',
          'Integrar botón',
        ],
      },
      {
        tiempo: '1:00-1:15',
        titulo: 'DESCANSO',
        detalles: [],
      },
      {
        tiempo: '1:15-1:50',
        titulo: 'Webhooks',
        detalles: [
          'Por qué son necesarios',
          'Implementar endpoint',
          'Verificar firma',
          'Actualizar base de datos',
        ],
      },
      {
        tiempo: '1:50-2:00',
        titulo: 'Cierre',
        detalles: [
          'Entregable: pagos funcionando en test',
        ],
      },
    ],
    frasesClave: [
      'Stripe maneja la complejidad de pagos por ti',
      'Nunca guardes tarjetas, deja que Stripe lo haga',
      'Los webhooks son la fuente de verdad',
      'Test mode es idéntico a producción',
    ],
    erroresComunes: [
      'Webhook signature verification failing',
      'Olvidar await en llamadas async',
      'No manejar eventos duplicados',
      'Confundir test keys con live keys',
    ],
    despuesDeClase: [
      { texto: 'Subir grabación' },
      { texto: 'Verificar webhooks de cada proyecto' },
      { texto: 'Hacer pago de prueba en cada app' },
    ],
  },
  {
    semanaNum: 7,
    antesDeClase: [
      { texto: 'Resend dashboard abierto' },
      { texto: 'React Email docs' },
      { texto: 'Templates de ejemplo preparados' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:15',
        titulo: 'Recap de Stripe',
        detalles: [
          '¿Todos tienen pagos funcionando?',
          'Resolver problemas de webhooks',
        ],
      },
      {
        tiempo: '0:15-0:45',
        titulo: 'Setup de Resend + React Email',
        detalles: [
          'Crear cuenta Resend',
          'Verificar dominio o usar sandbox',
          'Instalar React Email',
          'Primer email de prueba',
        ],
      },
      {
        tiempo: '0:45-1:00',
        titulo: 'Crear templates',
        detalles: [
          'Welcome email',
          'Payment confirmation',
          'Password reset',
        ],
      },
      {
        tiempo: '1:00-1:15',
        titulo: 'DESCANSO',
        detalles: [],
      },
      {
        tiempo: '1:15-1:45',
        titulo: 'Integrar en flujos reales',
        detalles: [
          'Email en registro',
          'Email en pago exitoso',
          'Testing de envíos',
        ],
      },
      {
        tiempo: '1:45-2:00',
        titulo: 'Notificaciones in-app',
        detalles: [
          'Toast notifications',
          'Sistema básico de notificaciones',
        ],
      },
    ],
    frasesClave: [
      'Los emails transaccionales aumentan confianza',
      'Menos es más en emails',
      'Siempre incluye opción de unsubscribe',
    ],
    erroresComunes: [
      'Dominio no verificado',
      'Email en spam',
      'HTML roto en algunos clientes',
      'Rate limits excedidos',
    ],
    despuesDeClase: [
      { texto: 'Subir grabación' },
      { texto: 'Recibir email de prueba de cada alumno' },
    ],
  },
  {
    semanaNum: 8,
    antesDeClase: [
      { texto: 'Vitest configurado en proyecto demo' },
      { texto: 'Playwright instalado' },
      { texto: 'GitHub Actions ejemplo' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:15',
        titulo: 'Por qué testear',
        detalles: [
          'Beneficios reales',
          'Tipos de tests',
          'Cuánto testear (pragmatismo)',
        ],
      },
      {
        tiempo: '0:15-0:45',
        titulo: 'Unit tests con Vitest',
        detalles: [
          'Setup básico',
          'Primer test',
          'Testing utilities',
          'Mocking',
        ],
      },
      {
        tiempo: '0:45-1:00',
        titulo: 'Práctica: Tests para sus utils',
        detalles: [
          'Cada uno escribe 2-3 tests',
          'Resolver errores',
        ],
      },
      {
        tiempo: '1:00-1:15',
        titulo: 'DESCANSO',
        detalles: [],
      },
      {
        tiempo: '1:15-1:45',
        titulo: 'E2E con Playwright',
        detalles: [
          'Instalación',
          'Test de login',
          'Test del flujo principal',
        ],
      },
      {
        tiempo: '1:45-2:00',
        titulo: 'CI con GitHub Actions',
        detalles: [
          'Configurar workflow',
          'Tests en cada push',
        ],
      },
    ],
    frasesClave: [
      'Testea comportamientos, no implementación',
      'Un test que nunca falla es inútil',
      'E2E para flujos críticos, unit para lógica',
    ],
    erroresComunes: [
      'Tests muy frágiles (dependen de detalles)',
      'No limpiar estado entre tests',
      'Timeouts en E2E',
      'Mocking incorrecto',
    ],
    despuesDeClase: [
      { texto: 'Subir grabación' },
      { texto: 'Verificar que CI pasa en cada proyecto' },
    ],
  },
  {
    semanaNum: 9,
    antesDeClase: [
      { texto: 'PageSpeed Insights abierto' },
      { texto: 'Lighthouse configurado' },
      { texto: 'Ejemplos de optimizaciones' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:15',
        titulo: 'Core Web Vitals explicados',
        detalles: [
          'LCP, FID, CLS',
          'Por qué importan',
          'Herramientas de medición',
        ],
      },
      {
        tiempo: '0:15-0:45',
        titulo: 'Optimizaciones de Next.js',
        detalles: [
          'next/image',
          'next/font',
          'Lazy loading',
          'Suspense boundaries',
        ],
      },
      {
        tiempo: '0:45-1:00',
        titulo: 'Auditoría de proyectos',
        detalles: [
          'Cada uno corre Lighthouse',
          'Identificar problemas',
        ],
      },
      {
        tiempo: '1:00-1:15',
        titulo: 'DESCANSO',
        detalles: [],
      },
      {
        tiempo: '1:15-1:45',
        titulo: 'SEO técnico',
        detalles: [
          'Metadata',
          'Open Graph',
          'Sitemap',
          'robots.txt',
        ],
      },
      {
        tiempo: '1:45-2:00',
        titulo: 'Cierre',
        detalles: [
          'Entregable: score > 90',
        ],
      },
    ],
    frasesClave: [
      'La velocidad afecta conversiones directamente',
      'Optimiza para móvil primero',
      'Las imágenes son el mayor culpable',
    ],
    erroresComunes: [
      'Imágenes sin optimizar',
      'Fonts bloqueando render',
      'JavaScript excesivo',
      'CLS por imágenes sin dimensiones',
    ],
    despuesDeClase: [
      { texto: 'Subir grabación' },
      { texto: 'Verificar scores de cada proyecto' },
    ],
  },
  {
    semanaNum: 10,
    antesDeClase: [
      { texto: 'Checklist de lanzamiento impreso' },
      { texto: 'Ejemplos de posts de lanzamiento' },
      { texto: 'Product Hunt tips' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:15',
        titulo: 'Estado de proyectos',
        detalles: [
          'Revisión rápida de cada uno',
          'Identificar blockers',
        ],
      },
      {
        tiempo: '0:15-0:45',
        titulo: 'Checklist técnico',
        detalles: [
          'Dominio',
          'SSL',
          'Stripe en producción',
          'Error tracking',
          'Analytics',
        ],
      },
      {
        tiempo: '0:45-1:00',
        titulo: 'Legal básico',
        detalles: [
          'Terms of Service',
          'Privacy Policy',
          'Cookies (si aplica)',
        ],
      },
      {
        tiempo: '1:00-1:15',
        titulo: 'DESCANSO',
        detalles: [],
      },
      {
        tiempo: '1:15-1:45',
        titulo: 'Estrategia de lanzamiento',
        detalles: [
          'Dónde lanzar',
          'Cómo escribir el post',
          'Timing',
          'Responder comentarios',
        ],
      },
      {
        tiempo: '1:45-2:00',
        titulo: 'Cierre del curso',
        detalles: [
          'Celebración',
          'Próximos pasos',
          'Comunidad después del curso',
          'Feedback',
        ],
      },
    ],
    frasesClave: [
      'Done is better than perfect',
      'El feedback del mercado vale más que meses de desarrollo',
      'Tu primer usuario es el más importante',
      'Esto es solo el principio',
    ],
    erroresComunes: [
      'Perfeccionismo que impide lanzar',
      'No tener analytics desde día 1',
      'Olvidar cambiar Stripe a producción',
      'No monitorear errores',
    ],
    despuesDeClase: [
      { texto: 'Celebrar con el equipo' },
      { texto: 'Recopilar links de todos los proyectos' },
      { texto: 'Enviar email de felicitación' },
      { texto: 'Crear showcase de la promoción' },
    ],
  },
]

// Helper para obtener la guía de una semana específica
export function getGuiaInstructor(semanaNum: number): GuiaInstructor | undefined {
  return GUIAS_INSTRUCTOR.find(g => g.semanaNum === semanaNum)
}
