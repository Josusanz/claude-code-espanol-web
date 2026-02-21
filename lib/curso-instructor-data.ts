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
      { texto: 'Completar las dos ruedas tú primero (/curso/rueda — tab Persona y Creador) para modelar el ejercicio' },
      { texto: 'Tener /curso/rueda abierta en una pestaña' },
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
        titulo: 'Bienvenida y Orientación (~90 min)',
        detalles: [
          'Hoy NO hay código. Es una sesión de conexión humana, autodiagnóstico y definición de proyecto.',
          'Objetivo: que se conozcan, sepan dónde están, definan qué van a construir, y preparen el Día 2.',
        ],
      },
      {
        tiempo: '0:00-0:10',
        titulo: 'Bienvenida',
        detalles: [
          '"Bienvenidos al curso. Durante 10 semanas vamos a crear un SaaS completo — desde cero hasta tener usuarios reales pagando."',
          '"No necesitáis saber programar: vais a usar Claude Code, que es la IA que escribe el código por vosotros. Vosotros ponéis la visión, Claude pone el código."',
          '"El curso funciona así: cada semana tenéis una pre-clase (teoría que leéis antes), dos días de clase en vivo donde construimos juntos, y un entregable que subís al Discord."',
          '"Lo más importante: vais a terminar con algo REAL publicado en internet. No es un curso teórico."',
        ],
      },
      {
        tiempo: '0:10-0:25',
        titulo: 'Ronda de presentaciones',
        detalles: [
          '"Vamos a presentarnos. Cada uno tiene 2 minutos. Quiero saber 4 cosas:"',
          '  1. ¿Quién eres? (nombre, de dónde eres)',
          '  2. ¿Qué quieres crear? (tu idea de proyecto — si la tienes)',
          '  3. ¿Por qué ahora? (qué te ha motivado a empezar)',
          '  4. Un dato curioso sobre ti',
          'TÚ VAS PRIMERO como ejemplo. Sé vulnerable, comparte tu historia.',
          'Toma notas de cada persona para recordar después.',
          'Celebra cada presentación con aplausos o reacción.',
          '"Perfecto. Ya veis que hay ideas muy diferentes — eso es bueno. Si alguien no tiene idea todavía, no pasa nada, lo trabajamos hoy."',
        ],
      },
      {
        tiempo: '0:25-0:40',
        titulo: 'Rueda de la Vida Personal — tab Persona',
        detalles: [
          'Abre /curso/rueda en pantalla compartida. Asegúrate de estar en el TAB "🌿 Persona".',
          '"Antes de meternos en el curso, quiero que evaluéis cómo estáis AHORA como personas. Crear un proyecto requiere energía, tiempo y claridad — y si hay áreas de tu vida que están flojas, es mejor saberlo."',
          '"Esta rueda tiene 9 áreas: Salud, Familia, Amigos, Vínculos, Crecimiento, Diversión, Ambiente, Carrera y Economía. Puntúa cada una del 1 al 10. Sed honestos — esto es solo para vosotros."',
          '⏱ DARLES 5 MINUTOS para rellenar y guardar.',
          'Comparte la tuya primero (modelar vulnerabilidad).',
          '"¿Alguien quiere compartir qué área tiene más baja? No hace falta decir el número, solo el área."',
          '"Esto es normal. Al final del curso rellenáis otra vez y comparáis."',
        ],
      },
      {
        tiempo: '0:40-0:50',
        titulo: 'Rueda del Creador — tab Creador',
        detalles: [
          '"Ahora pasad al segundo tab: 🎯 Creador. Esta evalúa 8 áreas para crear tu proyecto: Claridad de visión, Habilidades técnicas, Tiempo, Energía, Apoyo social, Finanzas, Mentalidad y Propósito."',
          '"Rellenadla igual — del 1 al 10 cada área. Cuando terminéis, guardad."',
          '⏱ DARLES 4 MINUTOS.',
          '"Si vais al tab 📊 Estadísticas, veis vuestra puntuación global combinando las dos ruedas. Este número es vuestro punto de partida. En la semana 10 lo comparamos."',
          'Pedir a 2-3 voluntarios que compartan un insight.',
        ],
      },
      {
        tiempo: '0:50-1:05',
        titulo: 'Definir tu proyecto con Claude',
        detalles: [
          '"Ahora la parte más importante del día: definir QUÉ vais a construir."',
          '"Si ya tenéis una idea clara, genial. Si no la tenéis o no estáis seguros, vamos a trabajarlo ahora con Claude."',
          '"Abrid la pizarra — paso 5 — y seguid el asistente interactivo que os genera el prompt."',
          'Señala la pizarra: /curso/clase/1 → paso 5.',
          '  - SIN IDEA: prompt que pide a Claude 3 ideas basadas en intereses y problemas',
          '  - CON IDEA: prompt que pide a Claude evaluar viabilidad, MVP, modelo de negocio',
          '⏱ DARLES 10 MINUTOS para trabajar con Claude.',
          'PASEA por las pantallas mientras trabajan. Ayuda a los bloqueados.',
          'Pide a 2-3 personas que compartan su idea y el feedback de Claude.',
          '"No hace falta que sea perfecta. La vais a ir afinando durante el curso. Lo importante es tener un punto de partida."',
        ],
      },
      {
        tiempo: '1:05-1:15',
        titulo: 'Dificultades y miedos',
        detalles: [
          '"Antes de hacer un descanso, quiero que compartamos algo: ¿qué os da miedo de este curso? ¿Qué creéis que os va a costar más?"',
          '"Yo empiezo: [comparte algo tuyo genuino]."',
          'Dejar que hablen. Si nadie habla, ve preguntando uno a uno.',
          'Miedos comunes: "no sé programar", "no tengo tiempo", "mi idea no es lo bastante buena".',
          '"Todo lo que habéis dicho es completamente normal. La clave es: no tenéis que saber programar. Claude lo hace. Vosotros solo tenéis que tener clara la visión — y eso ya lo hemos trabajado hoy."',
        ],
      },
      {
        tiempo: '1:15-1:25',
        titulo: 'DESCANSO',
        detalles: [
          '"10 minutos de descanso. Estirad, bebed agua. Cuando volvamos hacemos el tour rápido de herramientas y cerramos."',
        ],
      },
      {
        tiempo: '1:25-1:40',
        titulo: 'Tour rápido: herramientas del curso',
        detalles: [
          'Comparte pantalla y navega cada una ~3 min:',
          '1. /curso — "Aquí veis las 10 semanas, vuestro progreso, y accedéis a las pre-clases y entregables."',
          '2. /curso/clase/1 — "Esto es la pizarra. Cada clase tiene una con los pasos que seguimos en vivo. La estáis viendo ahora."',
          '3. /curso/themes — "Mañana vais a elegir uno de estos themes como base para vuestra primera web. Echadles un ojo esta noche."',
          '4. Discord — "El canal #dudas es para preguntas técnicas, #compartir para enseñar lo que hacéis. Preguntad sin miedo."',
        ],
      },
      {
        tiempo: '1:40-1:50',
        titulo: 'Visualización: Tu yo del futuro',
        detalles: [
          '"Para cerrar, quiero que cerréis los ojos un momento."',
          '"Imaginad que han pasado 10 semanas. Vuestro proyecto está en producción, tenéis usuarios..."',
          '"¿Cómo os sentís? ¿Qué habéis aprendido? ¿Quién sois ahora?"',
          'Que abran la pizarra → paso 8 (Visualización interactiva) y sigan los pasos.',
          '"Escribid las 3 palabras en la pizarra y en el chat."',
          'Lee algunas en voz alta y celebra.',
        ],
      },
      {
        tiempo: '1:50-1:55',
        titulo: 'Tarea para mañana',
        detalles: [
          '"Para mañana necesito 3 cosas:"',
          '  1. Leed la pre-clase completa — es el setup técnico. Si ya hicisteis el precurso, verificad que todo sigue funcionando.',
          '  2. Tened todo listo: terminal + Claude Code + cuentas de Supabase y Vercel.',
          '  3. Elegid un theme de la galería — mañana lo personalizamos con Claude Code.',
          '"Si algo no funciona, preguntad en Discord esta noche y os ayudo. Mañana arrancamos directamente a construir."',
          'Si alguien tiene dudas de setup, quédate 5 min extra.',
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

**Preparación**: Baja las luces de tu pantalla si puedes. Habla despacio, con pausas reales (los "..." son silencios de 3-5 segundos).

"Vale, vamos a hacer algo diferente. No hace falta que hagáis nada. Solo escuchad.

Si os apetece, cerrad los ojos. Si no, simplemente bajad la mirada hacia un punto fijo. Lo que os resulte más cómodo.

...

Vamos a respirar juntos. Inhala por la nariz... dos, tres, cuatro... y exhala por la boca... dos, tres, cuatro, cinco, seis...

Una vez más. Inhala... y exhala despacio...

...

Bien. Ahora quiero que imaginéis algo conmigo.

Han pasado diez semanas. Estamos a finales de abril de 2026. Es un jueves por la noche, como hoy. Acabáis de terminar la última clase del curso.

Pero esta noche es diferente. Porque lo que empezó como una idea — esa idea que tenéis ahora mismo en la cabeza — existe. De verdad. Está en internet. Tiene una URL. Tiene usuarios.

Alguien que no conocéis, en algún lugar, está usando algo que vosotros creasteis.

...

Fijaos en cómo os hace sentir eso. No penséis en ello — sentidlo. ¿Dónde lo notáis? ¿En el pecho? ¿En las manos? ¿En la sonrisa que se os está escapando?

...

Ahora rebobinad. Mirad hacia atrás estas diez semanas. Hubo momentos difíciles. Hubo un día en que algo no funcionaba y no sabíais por qué. Hubo una semana en que pensasteis que igual esto no era para vosotros.

Pero seguisteis. ¿Qué fue lo que os hizo seguir?

...

Pensad en lo que sabéis hacer ahora que hace diez semanas no sabíais. En la confianza que habéis ganado. En la sensación de crear algo de la nada.

¿Quiénes sois ahora que no erais hace diez semanas?

...

Vale. Cuando estéis listos, abrid los ojos despacio.

En la pizarra, en el paso 8, tenéis un espacio para escribir tres palabras. Tres palabras que describan a ese yo del futuro. El que acaba de lanzar su proyecto.

Tomad un momento y escribidlas."

**Después**: Lee algunas respuestas en voz alta. Celebra cada una. Conecta las palabras con el viaje que van a hacer juntos.

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
      { texto: 'Revisar webs que personalizaron en casa' },
      { texto: 'Tener Supabase y Vercel docs abiertos' },
      { texto: 'Terminal con proyecto demo limpio' },
      { texto: 'Revisar preguntas del Discord' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:15',
        titulo: 'Recap + Revisión de webs',
        detalles: [
          'Mostrar 2-3 webs personalizadas de alumnos',
          'Destacar lo bueno de cada una',
          'Resolver dudas pendientes de S1',
        ],
      },
      {
        tiempo: '0:15-0:35',
        titulo: 'CLAUDE.md + Git/GitHub',
        detalles: [
          'Crear CLAUDE.md con contexto del proyecto',
          'Configurar Git: git init, git config',
          'Subir a GitHub: gh repo create',
        ],
      },
      {
        tiempo: '0:35-0:55',
        titulo: 'Supabase: tabla de waitlist',
        detalles: [
          'Crear proyecto en Supabase',
          'Crear tabla waitlist con SQL',
          'Configurar .env.local',
          'Conectar formulario',
        ],
      },
      {
        tiempo: '0:55-1:10',
        titulo: 'DESCANSO',
        detalles: [],
      },
      {
        tiempo: '1:10-1:35',
        titulo: 'Panel admin + pulir',
        detalles: [
          'Crear /admin con Claude',
          'Verificar que emails se guardan',
          'Mejoras rápidas a la landing',
        ],
      },
      {
        tiempo: '1:35-1:55',
        titulo: 'Deploy en Vercel',
        detalles: [
          'Conectar repo en vercel.com/new',
          'Añadir variables de entorno',
          'Deploy y verificar en producción',
          'Celebrar: ¡primera web en internet!',
        ],
      },
      {
        tiempo: '1:55-2:00',
        titulo: 'Cierre + Entregable',
        detalles: [
          'Compartir URLs en Discord',
          'Recordar: actualizar CLAUDE.md',
          'Próxima clase: diseño + UI con shadcn/ui y Pencil',
        ],
      },
    ],
    frasesClave: [
      'CLAUDE.md es la memoria de tu proyecto — actualízalo siempre',
      'Git = control de versiones, GitHub = tu código en la nube',
      'Supabase te da Postgres gratis para siempre',
      'Deploy en Vercel: de local a internet en 2 minutos',
    ],
    erroresComunes: [
      'No poner .env en .gitignore → secrets expuestos',
      'Confundir anon key con service role key',
      'Variables de entorno mal copiadas en Vercel',
      'Puerto 3000 ocupado → cerrar otras apps',
    ],
    despuesDeClase: [
      { texto: 'Subir grabación' },
      { texto: 'Verificar que todos tienen URL de Vercel funcionando' },
      { texto: 'Dar feedback individual en Discord' },
      { texto: 'Preparar proyecto base para S3 (diseño guiado)' },
    ],
  },
  {
    semanaNum: 3,
    antesDeClase: [
      { texto: 'Tener shadcn/ui docs abierto' },
      { texto: 'Preparar ejemplos de buenos UI (Linear, Notion)' },
      { texto: 'Terminal con proyecto demo limpio' },
      { texto: 'Tener skills.sh abierto para mostrar ejemplos' },
      { texto: 'Pencil instalado y funcionando para demo' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:15',
        titulo: 'Recap + Revisión de waitlists',
        detalles: [
          'Mostrar 2-3 waitlists de alumnos',
          'Destacar lo bueno de cada una',
          'Resolver dudas pendientes de S2',
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
        titulo: 'Diseño guiado: dashboard + Pencil',
        detalles: [
          'TODOS hacemos el mismo dashboard juntos',
          'Estructura: sidebar + main content',
          'Componentes: Card, Button, Input, Table',
          'Layout responsivo con Tailwind',
          'Opcional: diseñar en Pencil (.pen) y que Claude genere el código',
        ],
      },
      {
        tiempo: '1:00-1:15',
        titulo: 'DESCANSO',
        detalles: [],
      },
      {
        tiempo: '1:15-1:30',
        titulo: 'Skills: enseña a Claude tus procesos',
        detalles: [
          'Skills = instrucciones especializadas que Claude consulta bajo demanda',
          'Demo: crear .claude/skills/crear-componente.md',
          'Mostrar skills.sh: directorio de skills de la comunidad',
          'Cada uno crea al menos 1 skill',
        ],
      },
      {
        tiempo: '1:30-1:50',
        titulo: 'Práctica guiada: páginas adicionales',
        detalles: [
          'Todos añadimos las mismas páginas a la app guiada',
          'Responsive obligatorio',
          'Resolver problemas en tiempo real',
        ],
      },
      {
        tiempo: '1:50-2:00',
        titulo: 'Cierre + Entregable',
        detalles: [
          'Entregable: UI completa de la app guiada + al menos 1 skill',
          'Próxima clase: base de datos + auth',
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
      { texto: 'Revisar UIs de la app guiada subidas a GitHub' },
      { texto: 'Dar feedback individual en Discord' },
      { texto: 'Verificar que cada proyecto tiene al menos 1 skill creada' },
    ],
  },
  {
    semanaNum: 4,
    antesDeClase: [
      { texto: 'Supabase Auth docs abierto' },
      { texto: 'Proyecto demo con auth listo' },
      { texto: 'Ejemplos de RLS policies preparados' },
      { texto: 'Next.js middleware docs' },
      { texto: 'Diagrama ER de ejemplo para la app guiada' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:10',
        titulo: 'Recap + Estado de la app guiada',
        detalles: [
          '¿Todos tienen la UI de S3 funcionando?',
          'Resolver dudas de shadcn/ui',
          'Introducir: hoy añadimos datos reales y login',
        ],
      },
      {
        tiempo: '0:10-0:30',
        titulo: 'Base de datos: diseñar schema',
        detalles: [
          'Explicar tablas, filas, columnas',
          'Crear schema para la app guiada (todos el mismo)',
          'SQL básico: SELECT, INSERT, UPDATE',
          'Instalar Supabase y conectar',
        ],
      },
      {
        tiempo: '0:30-0:50',
        titulo: 'CRUD + conectar con la UI',
        detalles: [
          'Crear cliente Supabase',
          'Conectar datos con el dashboard',
          'Implementar CREATE, READ, UPDATE, DELETE',
        ],
      },
      {
        tiempo: '0:50-1:05',
        titulo: 'DESCANSO',
        detalles: [],
      },
      {
        tiempo: '1:05-1:25',
        titulo: 'Supabase Auth setup',
        detalles: [
          'Habilitar providers (email)',
          'Crear páginas de login/registro',
          'signUp, signIn, signOut',
          'Middleware para proteger rutas',
        ],
      },
      {
        tiempo: '1:25-1:50',
        titulo: 'Row Level Security',
        detalles: [
          'Por qué RLS es crucial',
          'Crear policies para la app guiada',
          'Testear que funciona',
          'Debugging con Supabase dashboard',
        ],
      },
      {
        tiempo: '1:50-2:00',
        titulo: 'Cierre',
        detalles: [
          'Entregable: app guiada con DB + Auth completa',
          'Próxima semana: APIs + arrancamos tu proyecto propio',
        ],
      },
    ],
    frasesClave: [
      'Una base de datos es como un Excel gigante con superpoderes',
      'Autenticación = quién eres, Autorización = qué puedes hacer',
      'RLS protege a nivel de base de datos, no solo de UI',
      'Nunca confíes en el frontend para seguridad',
    ],
    erroresComunes: [
      'Olvidar habilitar RLS → datos públicos',
      'No poner .env en .gitignore → secrets expuestos',
      'Confundir anon key con service role key',
      'Redirect URL mal configurada para auth',
      'RLS muy permisivo o muy restrictivo',
    ],
    despuesDeClase: [
      { texto: 'Subir grabación' },
      { texto: 'Verificar que todos tienen DB + Auth funcionando' },
      { texto: 'Revisar RLS de cada proyecto' },
    ],
  },
  {
    semanaNum: 5,
    antesDeClase: [
      // Día 1
      { texto: 'Server Actions docs abierto' },
      { texto: 'Zod playground preparado' },
      { texto: 'Ejemplos de Route Handlers' },
      // Día 2
      { texto: 'Template de proyecto Next.js listo para demo' },
      { texto: 'Lista de ideas de alumnos del Discord (si las compartieron)' },
    ],
    agenda: [
      // — DÍA 1 (Jueves): APIs —
      {
        tiempo: '— DÍA 1 (JUEVES) —',
        titulo: 'APIs y Server Actions',
        detalles: [
          'Objetivo: implementar APIs en la app guiada.',
        ],
      },
      {
        tiempo: '0:00-0:15',
        titulo: 'Recap de DB + Auth',
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
        titulo: 'Route Handlers + práctica',
        detalles: [
          'Cuándo usar Route Handlers',
          'Implementar en la app guiada',
          'Verificar que todo funciona',
        ],
      },
      {
        tiempo: '1:45-2:00',
        titulo: 'Cierre Día 1 + preparar Día 2',
        detalles: [
          'Recordar: mañana empieza TU proyecto propio',
          'Leer la pre-clase del Día 2',
          'Venir con una idea clara de proyecto',
        ],
      },
      // — DÍA 2 (Viernes): Workshop —
      {
        tiempo: '— DÍA 2 (VIERNES) —',
        titulo: 'Workshop — Arranca Tu Proyecto',
        detalles: [
          'Objetivo: cada alumno sale con su proyecto propio creado, en GitHub y desplegado.',
        ],
      },
      {
        tiempo: '0:00-0:15',
        titulo: 'Ronda de ideas',
        detalles: [
          'Cada uno comparte su idea de proyecto (1 min)',
          'Feedback rápido del grupo',
          'Definir las 3 features mínimas del MVP',
        ],
      },
      {
        tiempo: '0:15-0:45',
        titulo: 'Setup del proyecto',
        detalles: [
          'npx create-next-app + shadcn/ui',
          'Crear repo en GitHub',
          'CLAUDE.md personalizado',
          'Ir pasando para ayudar individualmente',
        ],
      },
      {
        tiempo: '0:45-1:00',
        titulo: 'DESCANSO',
        detalles: [],
      },
      {
        tiempo: '1:00-1:30',
        titulo: 'Diseño + Supabase',
        detalles: [
          'Crear pantallas principales con Claude',
          'Conectar Supabase (tabla principal)',
          'Ayuda individual en tiempo real',
        ],
      },
      {
        tiempo: '1:30-1:50',
        titulo: 'Deploy + compartir',
        detalles: [
          'Deploy en Vercel',
          'Verificar que funciona en producción',
          'Compartir URL en Discord',
        ],
      },
      {
        tiempo: '1:50-2:00',
        titulo: 'Cierre',
        detalles: [
          'Celebrar: todos tienen su proyecto propio en internet',
          'Próxima semana: sprint de MVP',
        ],
      },
    ],
    frasesClave: [
      'Server Actions = la forma moderna de mutar datos',
      'Siempre valida, nunca confíes en el input',
      'Route Handlers para APIs, Server Actions para forms',
      'Tu proyecto propio empieza AHORA — aplica todo lo que aprendiste',
    ],
    erroresComunes: [
      'Olvidar "use server" al inicio',
      'No manejar errores correctamente',
      'Olvidar revalidatePath después de mutación',
      'Día 2: idea demasiado ambiciosa → ayudar a reducir a MVP',
      'Día 2: bloqueo por "no sé qué hacer" → sugerir ideas',
    ],
    despuesDeClase: [
      { texto: 'Subir grabaciones de ambos días' },
      { texto: 'Verificar que todos tienen proyecto propio en GitHub + Vercel' },
      { texto: 'Mensaje en Discord celebrando los proyectos' },
    ],
  },
  {
    semanaNum: 6,
    antesDeClase: [
      { texto: 'Revisar repos de proyectos propios creados en S5 Día 2' },
      { texto: 'Preparar lista de quién necesita más ayuda' },
      { texto: 'Tener Supabase y shadcn/ui docs abiertos' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:15',
        titulo: 'Ronda de avance',
        detalles: [
          'Cada uno comparte: qué avanzó desde S5 y qué planea hacer hoy',
          'Identificar quién necesita más ayuda',
          'Definir objetivos individuales para la sesión',
        ],
      },
      {
        tiempo: '0:15-0:55',
        titulo: 'Sprint de MVP — Bloque 1',
        detalles: [
          'Cada uno trabaja en su proyecto',
          'Josu pasa por cada alumno dando ayuda individual',
          'Enfoque: feature principal + DB/Auth si necesitan',
        ],
      },
      {
        tiempo: '0:55-1:10',
        titulo: 'DESCANSO',
        detalles: [],
      },
      {
        tiempo: '1:10-1:45',
        titulo: 'Sprint de MVP — Bloque 2',
        detalles: [
          'Continuar con el MVP',
          'Pulir UI',
          'Resolver bugs',
          'Preparar deploy',
        ],
      },
      {
        tiempo: '1:45-2:00',
        titulo: 'Demos + Cierre',
        detalles: [
          'Cada uno hace demo de 2 min',
          'Celebrar avances',
          'Próxima semana: Stripe (pagos)',
        ],
      },
    ],
    frasesClave: [
      'Hoy es TU día — construye lo que quieras',
      'MVP = la versión más simple que funciona',
      'No te preocupes por perfecto, preocúpate por funcional',
      'Pide ayuda — para eso estamos aquí',
    ],
    erroresComunes: [
      'Scope creep: querer hacer demasiado en 2 horas',
      'Perfeccionismo: pulir detalles antes de tener lo básico',
      'Bloqueo: no saber por dónde empezar → definir 1 feature y empezar por ahí',
      'Problemas de deploy → verificar env vars en Vercel',
    ],
    despuesDeClase: [
      { texto: 'Subir grabación' },
      { texto: 'Revisar MVPs y dar feedback en Discord' },
      { texto: 'Celebrar los avances del grupo' },
    ],
  },
  {
    semanaNum: 7,
    antesDeClase: [
      { texto: 'Stripe dashboard abierto (test mode)' },
      { texto: 'Productos de prueba creados' },
      { texto: 'Stripe CLI instalado para webhooks' },
      { texto: 'ngrok o similar para testing local' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:15',
        titulo: 'Recap + estado de MVPs',
        detalles: [
          '¿Cómo van los proyectos propios?',
          'Resolver blockers rápidos',
          'Intro a Stripe: tour del dashboard',
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
    semanaNum: 8,
    antesDeClase: [
      { texto: 'Resend dashboard abierto' },
      { texto: 'React Email docs' },
      { texto: 'Vitest configurado en proyecto demo' },
      { texto: 'Playwright instalado' },
    ],
    agenda: [
      {
        tiempo: '0:00-0:10',
        titulo: 'Recap de Stripe',
        detalles: [
          '¿Todos tienen pagos funcionando?',
          'Resolver problemas de webhooks',
        ],
      },
      // — Primera mitad: Emails —
      {
        tiempo: '0:10-0:30',
        titulo: 'Setup Resend + React Email',
        detalles: [
          'Crear cuenta Resend',
          'Verificar dominio o usar sandbox',
          'Instalar dependencias',
          'Primer email de prueba',
        ],
      },
      {
        tiempo: '0:30-0:55',
        titulo: 'Templates + integración',
        detalles: [
          'Crear template de bienvenida',
          'Integrar en flujo de registro',
          'Crear al menos 1 template más',
        ],
      },
      {
        tiempo: '0:55-1:10',
        titulo: 'DESCANSO',
        detalles: [],
      },
      // — Segunda mitad: Testing —
      {
        tiempo: '1:10-1:30',
        titulo: 'Unit tests con Vitest',
        detalles: [
          'Setup de Vitest',
          'Primer unit test',
          'Cada uno escribe 2-3 tests para su proyecto',
        ],
      },
      {
        tiempo: '1:30-1:50',
        titulo: 'E2E con Playwright',
        detalles: [
          'Instalación rápida',
          'Test del flujo principal (login o feature clave)',
          'Al menos 1 test E2E funcionando',
        ],
      },
      {
        tiempo: '1:50-2:00',
        titulo: 'Cierre',
        detalles: [
          'Entregable: emails + tests',
          'Próxima semana: performance y SEO',
        ],
      },
    ],
    frasesClave: [
      'Los emails transaccionales aumentan confianza',
      'Testea comportamientos, no implementación',
      'Menos es más en emails',
      'Un test que nunca falla es inútil',
    ],
    erroresComunes: [
      'Dominio no verificado en Resend',
      'Email en spam',
      'Tests muy frágiles (dependen de detalles)',
      'Timeouts en E2E',
    ],
    despuesDeClase: [
      { texto: 'Subir grabación' },
      { texto: 'Recibir email de prueba de cada alumno' },
      { texto: 'Verificar que cada proyecto tiene al menos 1 test' },
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
