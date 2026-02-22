// Datos de la "Pizarra de Clase" - pasos y código para cada semana

export interface BloqueCodigo {
  lenguaje: string
  codigo: string
  archivo?: string // ruta del archivo (opcional)
}

export interface PasoClase {
  titulo: string
  descripcion?: string
  bloques?: BloqueCodigo[]
  tip?: string
  links?: { texto: string; url: string }[]
  componente?: string // componente interactivo especial (ej: 'prompt-builder')
}

export interface PizarraSemana {
  semanaNum: number
  dia?: number // Optional: for multi-day weeks (e.g. S1 Day 1 = dia:1, S1 Day 2 = dia:2)
  titulo: string
  emoji: string
  subtitulo: string
  pasos: PasoClase[]
}

export const PIZARRAS: PizarraSemana[] = [
  // ==========================================
  // SEMANA 1 — DÍA 1: Bienvenida y Orientación
  // ==========================================
  {
    semanaNum: 1,
    dia: 1,
    titulo: 'Bienvenida y Orientación',
    emoji: '👋',
    subtitulo: 'Nos conocemos, evaluamos dónde estamos y definimos nuestro proyecto',
    pasos: [
      {
        titulo: '📋 Día 1 (Jueves): Bienvenida y Orientación',
        descripcion: 'Hoy nos conocemos, evaluamos dónde estamos, definimos nuestro proyecto y nos preparamos para mañana.',
      },
      {
        titulo: '1. Bienvenida',
        descripcion: 'Contexto del curso: 10 semanas para crear tu SaaS con IA. Qué vamos a hacer, cómo funciona, qué se espera de ti.',
      },
      {
        titulo: '2. Presentaciones',
        descripcion: 'Cada uno se presenta durante 2 minutos: quién eres, qué quieres crear, por qué ahora y un dato curioso.',
        tip: 'Si preparaste tu mini-presentación de la pre-clase, es el momento de compartirla.',
      },
      {
        titulo: '3. Rueda de la Vida Personal',
        descripcion: 'Evaluamos cómo estamos AHORA en 9 áreas de nuestra vida: Salud, Familia, Amigos, Vínculos, Crecimiento, Diversión, Ambiente, Carrera y Economía. Puntúa cada una del 1 al 10.',
        links: [
          { texto: 'Abrir Rueda (tab Persona)', url: '/curso/rueda' },
        ],
        tip: 'Asegúrate de estar en el tab "🌿 Persona". Guarda tu rueda al terminar.',
      },
      {
        titulo: '4. Rueda del Creador',
        descripcion: 'Ahora evaluamos 8 áreas clave para crear tu proyecto: Claridad de visión, Habilidades técnicas, Tiempo, Energía, Apoyo social, Finanzas, Mentalidad y Propósito. Al terminar, ve al tab Estadísticas para ver tu puntuación global.',
        links: [
          { texto: 'Abrir Rueda (tab Creador)', url: '/curso/rueda' },
        ],
      },
      {
        titulo: '5. Define tu proyecto con Claude',
        descripcion: 'Responde unas preguntas y te generamos el prompt perfecto para que Claude te ayude a definir tu proyecto. Solo tienes que copiarlo y pegarlo.',
        componente: 'prompt-builder',
      },
      {
        titulo: '6. Tour: herramientas del curso',
        descripcion: 'Exploramos juntos las 4 herramientas que usarás cada semana: dashboard, pizarra de clase, galería de themes y Discord.',
        links: [
          { texto: 'Dashboard del curso', url: '/curso' },
          { texto: 'Pizarra de clase', url: '/curso/clase/1' },
          { texto: 'Galería de themes', url: '/curso/themes' },
          { texto: 'Guía de Discord', url: '/precurso/discord' },
        ],
      },
      {
        titulo: '7. Dificultades y miedos',
        descripcion: 'Ejercicio grupal: ¿Qué te frena? ¿Qué miedos tienes? Compartimos y normalizamos las dificultades.',
        tip: 'No hay respuestas incorrectas. Todos estamos aquí para aprender.',
      },
      {
        titulo: '8. Visualización: tu yo del futuro',
        descripcion: 'Un ejercicio guiado de 5 minutos. Sigue las instrucciones paso a paso.',
        componente: 'visualizacion',
      },
      {
        titulo: '9. Tarea para mañana',
        descripcion: 'Lee la pre-clase del Día 2 (verificar setup), ten terminal + Claude Code listos, crea cuentas de Supabase y Vercel.',
        tip: 'Si tienes dudas con el setup, pregunta en Discord. Mañana arrancamos con la configuración.',
      },
    ],
  },
  // ==========================================
  // SEMANA 1 — DÍA 2: Setup + Tu Primera Web
  // ==========================================
  {
    semanaNum: 1,
    dia: 2,
    titulo: 'Setup + Tu Primera Web',
    emoji: '🛠️',
    subtitulo: 'Configuramos las herramientas, elegimos un theme y creamos tu primera web con Claude Code',
    pasos: [
      {
        titulo: '📋 Día 2 (Viernes): Setup + Tu Primera Web',
        descripcion: 'Hoy configuramos todo, elegimos un theme y creamos tu primera web personalizada con Claude Code.',
      },
      // — BLOQUE 1: Setup técnico (30 min) —
      {
        titulo: '1. Verificar terminal y Claude Code',
        descripcion: 'Comprobamos que el terminal y Claude Code funcionan correctamente:',
        bloques: [
          {
            lenguaje: 'bash',
            archivo: '1. Comprueba tu versión de Claude Code',
            codigo: 'claude --version',
          },
          {
            lenguaje: 'bash',
            archivo: '2. Inicia Claude Code',
            codigo: 'claude',
          },
        ],
        tip: 'Si no tienes Claude Code instalado, sigue la guía de instalación en /empezar.',
      },
      {
        titulo: '2. Crear carpeta del curso',
        descripcion: 'Creamos la carpeta donde vivirán todos tus proyectos:',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'mkdir ~/curso-ia\ncd ~/curso-ia',
          },
        ],
      },
      {
        titulo: '3. Conectar Git con GitHub',
        descripcion: 'Instalamos GitHub CLI y configuramos git con tus datos:',
        bloques: [
          {
            lenguaje: 'bash',
            archivo: '1. Instala GitHub CLI',
            codigo: 'brew install gh',
          },
          {
            lenguaje: 'bash',
            archivo: '2. Autentícate con GitHub (se abre el navegador)',
            codigo: 'gh auth login',
          },
          {
            lenguaje: 'bash',
            archivo: '3. Configura git con tu nombre y email de GitHub',
            codigo: `gh api user --jq '.name' | xargs -I {} git config --global user.name "{}"
gh api user --jq '.email // empty' | xargs -I {} git config --global user.email "{}"`,
          },
          {
            lenguaje: 'bash',
            archivo: '4. Comprueba que se guardó bien',
            codigo: `git config --global user.name
git config --global user.email`,
          },
        ],
        tip: 'Al ejecutar "gh auth login", selecciona: GitHub.com → HTTPS → Login with a web browser. En Linux: sudo apt install gh. En Windows: winget install GitHub.cli. Si el email sale vacío, ponlo a mano: git config --global user.email "tu@email.com"',
      },
      {
        titulo: '4. Quitar confirmaciones de Claude Code',
        descripcion: 'Para trabajar más rápido en clase, activamos el modo sin confirmaciones:',
        bloques: [
          {
            lenguaje: 'bash',
            archivo: 'Modo auto-accept (recomendado para clase)',
            codigo: 'claude --dangerously-skip-permissions',
          },
        ],
        tip: 'Para proyectos de cliente o producción, usa las confirmaciones normales o una allowlist.',
      },
      // — BLOQUE 2: Tu primera web (1h 30 min) —
      {
        titulo: '📋 ¡Ahora creamos tu primera web!',
        descripcion: 'Setup listo. Ahora viene lo divertido: vamos a crear una web personalizada con Claude Code.',
      },
      {
        titulo: '5. Elegir tu theme',
        descripcion: 'Abre la galería de themes y elige el que más te guste. Va a ser la base de tu primera web.',
        links: [
          { texto: 'Galería de themes', url: '/curso/themes' },
        ],
        tip: 'Elige un theme que se parezca a lo que quieres construir. No te preocupes por los detalles, vamos a personalizarlo todo.',
      },
      {
        titulo: '6. Crear proyecto desde el theme',
        descripcion: 'Sigue los pasos del componente interactivo: confirma tu theme, crea el proyecto y lanza Claude Code.',
        componente: 'dia2-setup',
      },
      {
        titulo: '7. Personalizar con Claude',
        descripcion: 'Ahora viene la magia. Pídele a Claude que personalice tu web:',
        bloques: [
          {
            lenguaje: 'text',
            archivo: 'Ejemplo de prompt de personalización',
            codigo: `Personaliza esta landing page:
- Cambia el nombre a [TU PROYECTO]
- Cambia la descripción a [LO QUE HACE]
- Cambia los colores principales a [TUS COLORES]
- Actualiza las secciones de features con [TUS FEATURES]
- Cambia los testimonios por textos relevantes`,
          },
        ],
        tip: 'Habla en español, como si le explicaras a un diseñador. Claude entiende perfectamente. Si tienes Pencil instalado y Claude te abre el canvas en vez de cambiar el código directamente, dile: "Haz los cambios directamente en el código, sin usar Pencil".',
      },
      {
        titulo: '8. Iterar y jugar con cambios',
        descripcion: 'Si algo no te gusta, pídele cambios. Elige cómo quieres trabajar el diseño:',
        componente: 'design-method-picker',
      },
      {
        titulo: '9. Tarea para la Semana 2',
        descripcion: 'Para la semana que viene, sigue personalizando tu web en casa. En la Semana 2 la conectaremos con una base de datos y la desplegaremos en internet.',
        links: [
          { texto: 'Galería de themes (por si quieres cambiar)', url: '/curso/themes' },
        ],
        tip: 'Si te atascas, pregunta en Discord. La semana que viene conectaremos Supabase, GitHub y Vercel.',
      },
    ],
  },
  // ==========================================
  // SEMANA 2 — Tu Primera Web: Conectar y Desplegar
  // ==========================================
  {
    semanaNum: 2,
    titulo: 'Conectar y Desplegar',
    emoji: '🌐',
    subtitulo: 'Conectamos tu web con GitHub, Supabase y Vercel — tu primera web en producción',
    pasos: [
      {
        titulo: '📋 De web local a web en producción',
        descripcion: 'Ya tienes tu web personalizada del Día 2. Hoy la conectamos con una base de datos, la subimos a GitHub y la desplegamos en internet.',
      },
      {
        titulo: '1. Revisar tu web del Día 2',
        descripcion: '¿Seguiste personalizando en casa? Si no, vamos a darle unos toques rápidos ahora:',
        bloques: [
          {
            lenguaje: 'text',
            codigo: 'Revisa mi landing page y sugiere 3 mejoras rápidas de diseño. Implementa las que yo apruebe.',
          },
        ],
        tip: 'Si no pudiste avanzar en casa, no pasa nada. Dedicamos 10 minutos a ponerla a punto.',
      },
      {
        titulo: '2. Crear CLAUDE.md',
        descripcion: 'Esto es la "memoria" de tu proyecto. Claude lo lee cada vez que abres una sesión nueva.',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea un archivo CLAUDE.md en la raíz del proyecto con:
- Nombre del proyecto y descripción
- Arquitectura: Next.js 15, Tailwind, Supabase, Vercel
- Estado actual del proyecto
- Convenciones de código`,
          },
        ],
        tip: 'Al final de cada sesión, dile a Claude: "Actualiza el CLAUDE.md con lo que hemos trabajado hoy"',
      },
      {
        titulo: '4. Crear repo y subir a GitHub',
        descripcion: 'Inicializa git y sube tu proyecto (sustituye "mi-proyecto" por el nombre de tu carpeta):',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `git init
git add .
git commit -m "Primera versión de mi landing"`,
          },
          {
            lenguaje: 'bash',
            codigo: 'gh repo create mi-proyecto --public --source=. --push',
          },
        ],
        tip: 'Si prefieres repo privado, cambia --public por --private.',
      },
      {
        titulo: '5. Crear proyecto en Supabase',
        descripcion: 'Ve a Supabase y crea un nuevo proyecto.',
        links: [
          { texto: 'Abrir Supabase', url: 'https://supabase.com/dashboard' },
        ],
        tip: 'Apunta la contraseña de la base de datos. Usa el mismo nombre que tu proyecto local.',
      },
      {
        titulo: '6. Crear tabla de emails',
        descripcion: 'En el SQL Editor de Supabase, ejecuta:',
        bloques: [
          {
            lenguaje: 'sql',
            codigo: `CREATE TABLE waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Permitir inserciones desde la web
CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT WITH CHECK (true);`,
          },
        ],
      },
      {
        titulo: '7. Instalar Supabase en el proyecto',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'npm install @supabase/supabase-js',
          },
        ],
      },
      {
        titulo: '8. Configurar variables de entorno',
        descripcion: 'Conecta Vercel con Supabase desde el terminal (recomendado) o pega tus keys manualmente.',
        componente: 'env-configurator',
        links: [
          { texto: 'Supabase → Settings → API', url: 'https://supabase.com/dashboard/project/_/settings/api' },
        ],
      },
      {
        titulo: '9. Conectar el formulario',
        descripcion: 'Dile a Claude que conecte el formulario con Supabase:',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Conecta el formulario de email de la landing page con Supabase.
Cuando alguien introduce su email:
1. Guárdalo en la tabla 'waitlist'
2. Muestra un mensaje de éxito
3. Si el email ya existe, muestra un mensaje diferente
4. Maneja errores correctamente

Usa las variables de entorno NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.`,
          },
        ],
      },
      {
        titulo: '10. Crear panel admin',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea una página /admin que:
- Muestre todos los emails de la tabla waitlist
- Los muestre en una tabla bonita con fecha de registro
- Muestre el total de registros
- Tenga un diseño tipo dashboard limpio`,
          },
        ],
      },
      {
        titulo: '11. Deploy en Vercel',
        descripcion: 'La forma más fácil: conecta tu repo de GitHub a Vercel.',
        links: [
          { texto: 'Abrir Vercel', url: 'https://vercel.com/new' },
        ],
        bloques: [
          {
            lenguaje: 'text',
            codigo: `En Vercel:
1. Import Git Repository → selecciona tu repo
2. En Environment Variables, añade:
   - NEXT_PUBLIC_SUPABASE_URL = tu URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = tu key
3. Click Deploy`,
          },
        ],
        tip: 'También puedes hacer: npx vercel (desde la terminal)',
      },
      {
        titulo: '12. ¡Comparte tu URL!',
        descripcion: 'Tu waitlist está en producción. Copia la URL de Vercel y compártela en el Discord del curso.',
        tip: 'Actualiza el CLAUDE.md: "Actualiza el CLAUDE.md con todo lo que hemos hecho. El proyecto está desplegado en [tu-url].vercel.app"',
      },
    ],
  },
  // ==========================================
  // SEMANA 3 — Diseño + UI (guiado)
  // ==========================================
  {
    semanaNum: 3,
    titulo: 'Diseño + UI',
    emoji: '🎨',
    subtitulo: 'Diseñamos juntos una app completa con shadcn/ui y Pencil',
    pasos: [
      {
        titulo: '📋 Diseñamos juntos la interfaz',
        descripcion: 'Esta semana todos diseñamos la misma app paso a paso. Aprenderás las técnicas para diseñar cualquier interfaz.',
      },
      {
        titulo: '1. Crear el proyecto',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `npx create-next-app@latest nuestra-app
cd nuestra-app
code .`,
          },
        ],
        tip: 'Todos usamos el mismo nombre para seguir el paso juntos.',
      },
      {
        titulo: '2. Instalar shadcn/ui',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `npx shadcn@latest init`,
          },
        ],
        tip: 'Acepta las opciones por defecto. Esto configura Tailwind + los componentes base.',
      },
      {
        titulo: '3. Añadir componentes',
        descripcion: 'Añade los componentes que necesitas:',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `npx shadcn@latest add button card input table tabs dialog sheet dropdown-menu avatar badge`,
          },
        ],
        links: [
          { texto: 'Catálogo shadcn/ui', url: 'https://ui.shadcn.com/docs/components' },
        ],
      },
      {
        titulo: '4. Diseñar tu interfaz (elige tu camino)',
        descripcion: 'Elige cómo quieres trabajar el diseño de tu dashboard:',
        componente: 'design-method-picker',
      },
      {
        titulo: '5. Crear el dashboard con Claude',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea un dashboard para nuestra app. Necesito:
- Sidebar con navegación (Dashboard, [Sección 1], [Sección 2], Settings)
- Header con nombre de la app y avatar de usuario
- Contenido principal con cards de estadísticas
- Tabla de datos principal
- Usa shadcn/ui components
- Responsive: en móvil la sidebar se convierte en menú hamburguesa`,
          },
        ],
      },
      {
        titulo: '6. Crear páginas adicionales',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea las siguientes páginas para nuestra app:
1. /dashboard - Lo que ya tenemos
2. /dashboard/[sección] - Lista/tabla de [datos]
3. /dashboard/[sección]/new - Formulario para crear nuevo
4. /dashboard/settings - Configuración del usuario
Mantén el mismo layout (sidebar + header) en todas.`,
          },
        ],
      },
      {
        titulo: '7. Hacer responsive',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Revisa todas las páginas y asegúrate de que:
- En móvil (< 768px): sidebar oculta, menú hamburguesa
- En tablet: sidebar colapsada (solo iconos)
- En desktop: sidebar completa
- Tablas con scroll horizontal en móvil
- Formularios a ancho completo en móvil`,
          },
        ],
      },
      {
        titulo: '8. Crear Skills para tu proyecto',
        descripcion: 'Las Skills son instrucciones que Claude sigue automáticamente. Crea al menos una para tu proyecto:',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'mkdir -p .claude/skills',
          },
          {
            lenguaje: 'text',
            codigo: `Crea un archivo .claude/skills/crear-componente.md con instrucciones para crear componentes en mi proyecto:
- Usar shadcn/ui como base
- Estilos con Tailwind, nunca CSS inline
- Componentes responsive por defecto
- Exportar desde /components
- Incluir tipos TypeScript`,
          },
        ],
        tip: 'Explora skills.sh para ver skills creadas por la comunidad. Puedes copiar las que te sirvan y adaptarlas a tu proyecto.',
        links: [
          { texto: 'skills.sh — Directorio de Skills', url: 'https://skills.sh/' },
          { texto: 'Lección: Skills, Hooks y Plugins', url: '/fundamentos/skills-hooks-plugins' },
        ],
      },
      {
        titulo: '9. Iterar el diseño',
        descripcion: '¿Quieres hacer más cambios? Elige cómo:',
        componente: 'design-method-picker',
      },
      {
        titulo: '10. Inspiración',
        descripcion: 'Mira estos ejemplos de diseño SaaS:',
        links: [
          { texto: 'Linear (minimalista)', url: 'https://linear.app' },
          { texto: 'Notion (limpio)', url: 'https://notion.so' },
          { texto: 'Vercel (moderno)', url: 'https://vercel.com/dashboard' },
        ],
      },
      {
        titulo: '11. Subir a GitHub',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `git add .
git commit -m "UI completa del dashboard"
git push`,
          },
        ],
        tip: 'Comparte tu repo en Discord para que te demos feedback.',
      },
    ],
  },
  // ==========================================
  // SEMANA 4 — Base de Datos + Autenticación (FUSIÓN S3+S4)
  // ==========================================
  {
    semanaNum: 4,
    titulo: 'Base de Datos + Autenticación',
    emoji: '🔐',
    subtitulo: 'Añadimos datos reales y login a nuestra app guiada',
    pasos: [
      {
        titulo: '📋 Base de datos + Auth completo',
        descripcion: 'Hoy añadimos base de datos y autenticación a nuestra app guiada. Diseñamos tablas, las conectamos con la UI, y protegemos con RLS.',
      },
      // — Primera mitad: Base de datos —
      {
        titulo: '1. Crear proyecto en Supabase',
        links: [
          { texto: 'Abrir Supabase Dashboard', url: 'https://supabase.com/dashboard' },
        ],
        tip: 'Usamos el mismo nombre de proyecto que en S3. Región: eu-west-1 (más cercano a España).',
      },
      {
        titulo: '2. Diseñar tu schema',
        descripcion: 'Antes de crear tablas, piensa qué datos necesitas. Ejemplo para una app de tareas:',
        bloques: [
          {
            lenguaje: 'sql',
            codigo: `-- Tabla de usuarios (Supabase Auth la crea automáticamente)

-- Tus tablas personalizadas:
CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  completed boolean DEFAULT false,
  due_date date,
  created_at timestamp with time zone DEFAULT now()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;`,
          },
        ],
        tip: 'Todos seguimos el mismo schema para la app guiada. En tu proyecto propio (S6+) lo adaptarás.',
      },
      {
        titulo: '3. Instalar Supabase',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'npm install @supabase/supabase-js',
          },
        ],
      },
      {
        titulo: '4. Crear cliente de Supabase',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea un archivo lib/supabase.ts que:
- Exporte un cliente de Supabase
- Use las variables de entorno NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
- Sea reutilizable desde cualquier componente`,
          },
        ],
      },
      {
        titulo: '5. Variables de entorno',
        bloques: [
          {
            lenguaje: 'env',
            archivo: '.env.local',
            codigo: `NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...`,
          },
        ],
        links: [
          { texto: 'Supabase → Settings → API', url: 'https://supabase.com/dashboard/project/_/settings/api' },
        ],
      },
      {
        titulo: '6. Conectar con la UI',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Conecta las tablas de Supabase con la UI:
- El dashboard debe mostrar datos reales de la base de datos
- La tabla principal debe hacer fetch de los datos al cargar
- El formulario de "crear nuevo" debe insertar en la base de datos
- Después de crear, debe refrescar la lista automáticamente`,
          },
        ],
      },
      {
        titulo: '7. CRUD completo',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Implementa las 4 operaciones CRUD:
- CREATE: Formulario para crear nuevo registro
- READ: Listar todos los registros del usuario
- UPDATE: Editar un registro existente (inline o modal)
- DELETE: Botón para eliminar con confirmación`,
          },
        ],
      },
      // — Segunda mitad: Autenticación —
      {
        titulo: '📋 Ahora añadimos autenticación',
        descripcion: 'Con la base de datos conectada, es hora de proteger los datos con auth + RLS.',
      },
      {
        titulo: '8. Configurar Supabase Auth',
        descripcion: 'En Supabase Dashboard → Authentication → Providers, habilita Email.',
        links: [
          { texto: 'Supabase Auth Settings', url: 'https://supabase.com/dashboard/project/_/auth/providers' },
        ],
      },
      {
        titulo: '9. Instalar helpers de auth',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'npm install @supabase/ssr',
          },
        ],
      },
      {
        titulo: '10. Crear páginas de login/registro',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea un sistema de autenticación con Supabase Auth:
1. Página /login con formulario de email + password
2. Página /register con formulario de registro
3. Botón de logout en el header del dashboard
4. Redirigir a /login si el usuario no está autenticado
5. Redirigir a /dashboard si ya está logueado
6. Usa shadcn/ui para los formularios`,
          },
        ],
      },
      {
        titulo: '11. Proteger rutas con middleware',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea un middleware de Next.js que:
- Verifique si el usuario tiene sesión activa
- Si no la tiene, redirige a /login
- Las rutas /login y /register deben ser accesibles sin sesión
- Las rutas /dashboard/* deben requerir sesión`,
          },
        ],
      },
      {
        titulo: '12. Row Level Security (RLS)',
        descripcion: 'Protege tus datos a nivel de base de datos:',
        bloques: [
          {
            lenguaje: 'sql',
            codigo: `-- Los usuarios solo ven SUS proyectos
CREATE POLICY "Users can view own projects"
ON projects FOR SELECT
USING (auth.uid() = user_id);

-- Los usuarios solo crean proyectos propios
CREATE POLICY "Users can create own projects"
ON projects FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Los usuarios solo editan SUS proyectos
CREATE POLICY "Users can update own projects"
ON projects FOR UPDATE
USING (auth.uid() = user_id);

-- Los usuarios solo borran SUS proyectos
CREATE POLICY "Users can delete own projects"
ON projects FOR DELETE
USING (auth.uid() = user_id);`,
          },
        ],
        tip: 'Crea policies similares para TODAS tus tablas. Sin RLS, cualquier usuario puede ver los datos de otros.',
      },
      {
        titulo: '13. Verificar todo',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Checklist completo:
✅ Puedo crear un nuevo registro
✅ Los registros aparecen en la tabla
✅ Puedo editar un registro
✅ Puedo eliminar un registro
✅ Los datos persisten (refresca la página)
✅ No puedo acceder a /dashboard sin login
✅ Después de login, veo solo MIS datos
✅ Si abro otra ventana de incógnito, no veo datos del otro usuario
✅ El logout funciona correctamente
✅ Refrescar la página mantiene la sesión`,
          },
        ],
      },
    ],
  },
  // ==========================================
  // SEMANA 5 — DÍA 1: APIs y Server Actions
  // ==========================================
  {
    semanaNum: 5,
    dia: 1,
    titulo: 'APIs y Server Actions',
    emoji: '⚡',
    subtitulo: 'Server Actions, Route Handlers y validación con Zod en la app guiada',
    pasos: [
      {
        titulo: '📋 Día 1 (Jueves): APIs modernas con Next.js',
        descripcion: 'Hoy implementamos APIs en la app guiada usando Server Actions y añadimos validación.',
      },
      {
        titulo: '1. Instalar Zod',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'npm install zod',
          },
        ],
      },
      {
        titulo: '2. Crear Server Actions',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Refactoriza las operaciones de nuestra app para usar Server Actions:
1. Crea un archivo app/actions.ts con "use server"
2. Mueve toda la lógica de crear/editar/eliminar a Server Actions
3. Añade validación con Zod para cada action
4. Usa revalidatePath para refrescar los datos después de cada mutación
5. Maneja errores y devuelve mensajes útiles al usuario`,
          },
        ],
      },
      {
        titulo: '3. Schema de validación ejemplo',
        bloques: [
          {
            lenguaje: 'typescript',
            archivo: 'lib/validations.ts',
            codigo: `import { z } from 'zod'

export const ProjectSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().optional(),
})

export const TaskSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  projectId: z.string().uuid(),
  dueDate: z.string().optional(),
})`,
          },
        ],
        tip: 'Siempre valida el input del usuario. Estos schemas los usarás luego en tu proyecto propio.',
      },
      {
        titulo: '4. Loading states',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Añade estados de carga a todos los formularios:
- Botón "Guardando..." mientras se procesa
- Deshabilitar el formulario mientras se envía
- Toast de éxito o error después de cada acción
- Usa useFormStatus de React para los loading states`,
          },
        ],
      },
      {
        titulo: '5. Route Handler para webhooks (si aplica)',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Si la app necesita recibir datos externos (webhooks), crea un Route Handler:

Crea app/api/webhook/route.ts que:
- Reciba POST requests
- Verifique la autenticidad del request
- Procese los datos
- Devuelva un status apropiado`,
          },
        ],
      },
      {
        titulo: '6. Preparación para mañana',
        descripcion: 'Mañana empieza TU proyecto propio. Lee la pre-clase del Día 2 y ven con tu idea clara.',
        tip: 'Piensa: ¿Qué problema resuelve tu app? ¿Quién la usaría? ¿Cuáles son las 3 features mínimas?',
      },
    ],
  },
  // ==========================================
  // SEMANA 5 — DÍA 2: Workshop — Arranca Tu Proyecto
  // ==========================================
  {
    semanaNum: 5,
    dia: 2,
    titulo: 'Workshop — Arranca Tu Proyecto',
    emoji: '🎯',
    subtitulo: 'Aplicamos todo lo aprendido para crear TU proyecto desde cero',
    pasos: [
      {
        titulo: '📋 Workshop: Tu Proyecto Propio',
        descripcion: 'Hoy arrancas tu proyecto propio. Aplicamos todo lo que hemos aprendido en S1-S5 para crear algo tuyo desde cero.',
      },
      {
        titulo: '1. Define tu MVP',
        descripcion: 'Comparte tu idea con el grupo. Josu te ayuda a definir las 3 features mínimas.',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Mi proyecto es [NOMBRE]:
- Problema que resuelve: [...]
- Público objetivo: [...]
- 3 features mínimas:
  1. [...]
  2. [...]
  3. [...]`,
          },
        ],
      },
      {
        titulo: '2. Crea el repositorio',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `cd ~/curso-ia
npx create-next-app@latest mi-proyecto
cd mi-proyecto
gh repo create mi-proyecto --public --source=. --push`,
          },
        ],
        tip: 'Sustituye "mi-proyecto" por el nombre de tu SaaS.',
      },
      {
        titulo: '3. Setup Next.js + shadcn/ui',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `npx shadcn@latest init
npx shadcn@latest add button card input table tabs dialog sheet dropdown-menu avatar badge`,
          },
        ],
      },
      {
        titulo: '4. CLAUDE.md personalizado',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea un archivo CLAUDE.md en la raíz del proyecto con:
- Nombre del proyecto y descripción
- Arquitectura: Next.js 15, Tailwind, shadcn/ui, Supabase, Vercel
- Features del MVP planificadas
- Convenciones de código`,
          },
        ],
      },
      {
        titulo: '5. Diseña las pantallas principales',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea las pantallas principales de mi app:
1. Landing page con hero, features y CTA
2. Dashboard con sidebar y contenido principal
3. Al menos 1 página más específica de mi app
Usa shadcn/ui y Tailwind. Hazlo responsive.`,
          },
        ],
      },
      {
        titulo: '6. Conecta Supabase',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'npm install @supabase/supabase-js',
          },
          {
            lenguaje: 'text',
            codigo: `Configura Supabase:
1. Crea proyecto en supabase.com
2. Copia las keys a .env.local
3. Crea la tabla principal de tu app
4. Conecta un formulario básico`,
          },
        ],
      },
      {
        titulo: '7. Despliega en Vercel',
        links: [
          { texto: 'Abrir Vercel', url: 'https://vercel.com/new' },
        ],
        bloques: [
          {
            lenguaje: 'text',
            codigo: `En Vercel:
1. Import Git Repository → selecciona tu repo
2. Añade las variables de entorno de Supabase
3. Click Deploy`,
          },
        ],
      },
      {
        titulo: '8. Comparte en Discord',
        descripcion: '¡Tu proyecto propio está en internet! Comparte la URL en Discord y cuéntanos qué estás construyendo.',
        tip: 'Actualiza el CLAUDE.md: "Actualiza el CLAUDE.md con el estado actual del proyecto"',
      },
    ],
  },
  // ==========================================
  // SEMANA 6 — Tu Proyecto: De Idea a MVP
  // ==========================================
  {
    semanaNum: 6,
    titulo: 'Tu Proyecto — De Idea a MVP',
    emoji: '🎯',
    subtitulo: 'Sprint de 2 horas para avanzar tu MVP con ayuda en tiempo real',
    pasos: [
      {
        titulo: '📋 Sprint de MVP',
        descripcion: 'Hoy es un sprint de 2 horas. Cada uno avanza su proyecto propio con ayuda de Josu en tiempo real.',
      },
      {
        titulo: '1. Revisión de avance',
        descripcion: 'Ronda rápida: cada uno comparte qué ha avanzado desde S5 y qué planea hacer hoy.',
      },
      {
        titulo: '2. Feature principal',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Implementa la feature principal de tu MVP:
- ¿Qué hace tu app que nadie más hace?
- Enfócate en UNA cosa bien hecha
- Usa Server Actions + Zod para formularios
- Conecta con Supabase para datos`,
          },
        ],
      },
      {
        titulo: '3. Base de datos (si aplica)',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Si necesitas más tablas:
- Diseña el schema con Claude
- Crea las tablas en Supabase
- Habilita RLS en todas
- Conecta con la UI`,
          },
        ],
      },
      {
        titulo: '4. Autenticación (si aplica)',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Si tu app necesita login:
- Configura Supabase Auth
- Crea páginas de login/registro
- Protege rutas con middleware
- Añade RLS policies`,
          },
        ],
      },
      {
        titulo: '5. APIs/Server Actions',
        descripcion: 'Implementa las operaciones CRUD que necesite tu app.',
      },
      {
        titulo: '6. Pulir UI',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Revisa la UI de tu app:
- ¿Es responsive?
- ¿Los loading states están implementados?
- ¿Los errores se manejan bien?
- ¿La navegación funciona?`,
          },
        ],
      },
      {
        titulo: '7. Desplegar actualización',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `git add .
git commit -m "MVP: feature principal implementada"
git push`,
          },
        ],
        tip: 'Vercel despliega automáticamente al hacer push. Verifica que funciona en producción.',
      },
      {
        titulo: '8. Demo al grupo',
        descripcion: 'Cada uno hace una demo de 2 minutos mostrando su MVP. Celebramos los avances.',
      },
    ],
  },
  // ==========================================
  // SEMANA 7 — Pagos con Stripe
  // ==========================================
  {
    semanaNum: 7,
    titulo: 'Pagos con Stripe',
    emoji: '💳',
    subtitulo: 'Integra Stripe para cobrar a tus usuarios',
    pasos: [
      {
        titulo: '📋 Monetiza tu SaaS',
        descripcion: 'Hoy integramos Stripe para aceptar pagos y gestionar suscripciones.',
      },
      {
        titulo: '1. Crear cuenta Stripe (test mode)',
        links: [
          { texto: 'Stripe Dashboard', url: 'https://dashboard.stripe.com/test/dashboard' },
        ],
        tip: 'Asegúrate de estar en TEST MODE (interruptor arriba a la derecha).',
      },
      {
        titulo: '2. Instalar Stripe',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'npm install stripe @stripe/stripe-js',
          },
        ],
      },
      {
        titulo: '3. Variables de entorno',
        bloques: [
          {
            lenguaje: 'env',
            archivo: '.env.local',
            codigo: `STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...`,
          },
        ],
        links: [
          { texto: 'Stripe API Keys', url: 'https://dashboard.stripe.com/test/apikeys' },
        ],
      },
      {
        titulo: '4. Crear productos en Stripe',
        descripcion: 'En Stripe Dashboard → Products, crea tus planes:',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Ejemplo de pricing para SaaS:
- Plan Free: $0/mes (sin crear en Stripe)
- Plan Pro: $10/mes (crear en Stripe)
- Plan Enterprise: $30/mes (crear en Stripe)`,
          },
        ],
        links: [
          { texto: 'Stripe → Products', url: 'https://dashboard.stripe.com/test/products' },
        ],
      },
      {
        titulo: '5. Implementar checkout',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Implementa el flujo de pago con Stripe Checkout:
1. Botón "Suscribirse" en la página de pricing
2. Al hacer clic, crea una Checkout Session (Server Action)
3. Redirige al usuario a la página de pago de Stripe
4. Configura success_url y cancel_url
5. Después del pago, muestra página de éxito`,
          },
        ],
      },
      {
        titulo: '6. Webhook para confirmar pagos',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea un webhook endpoint en app/api/webhooks/stripe/route.ts que:
- Reciba eventos de Stripe
- Verifique la firma del webhook
- En checkout.session.completed: active la suscripción del usuario en la base de datos
- En invoice.payment_failed: envíe notificación al usuario
- En customer.subscription.deleted: desactive la suscripción`,
          },
        ],
      },
      {
        titulo: '7. Probar con tarjeta de test',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Tarjetas de prueba de Stripe:
✅ Pago exitoso:   4242 4242 4242 4242
❌ Pago rechazado: 4000 0000 0000 0002
⏳ Requiere auth:  4000 0025 0000 3155

Fecha: cualquier fecha futura
CVC: cualquier 3 dígitos`,
          },
        ],
      },
    ],
  },
  // ==========================================
  // SEMANA 8 — Email + Testing (fusión)
  // ==========================================
  {
    semanaNum: 8,
    titulo: 'Email + Testing',
    emoji: '📧',
    subtitulo: 'Emails transaccionales con Resend + tests con Vitest y Playwright',
    pasos: [
      {
        titulo: '📋 Emails + Tests en una sesión',
        descripcion: 'Primera mitad: emails con Resend. Segunda mitad: tests con Vitest y Playwright.',
      },
      // — Primera mitad: Emails —
      {
        titulo: '📧 Bloque 1: Emails con Resend',
        descripcion: 'Configuramos emails transaccionales para tu app (~1 hora).',
      },
      {
        titulo: '1. Crear cuenta en Resend',
        links: [
          { texto: 'Resend Dashboard', url: 'https://resend.com' },
        ],
      },
      {
        titulo: '2. Instalar dependencias',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'npm install resend @react-email/components',
          },
        ],
      },
      {
        titulo: '3. Variable de entorno',
        bloques: [
          {
            lenguaje: 'env',
            archivo: '.env.local',
            codigo: 'RESEND_API_KEY=re_xxxxx...',
          },
        ],
      },
      {
        titulo: '4. Crear templates de email',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea un sistema de emails con Resend y React Email:
1. Template de bienvenida (cuando se registra un usuario)
2. Al menos 1 template más (confirmación de pago, notificación, etc.)
Usa React Email components para un diseño profesional.
Crea los templates en una carpeta /emails.`,
          },
        ],
      },
      {
        titulo: '5. Integrar en flujos reales',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Envía emails automáticamente en estos eventos:
- Al registrarse → email de bienvenida
- Al pagar → confirmación de pago (si aplica)
Usa Server Actions para triggear los envíos.`,
          },
        ],
      },
      // — Segunda mitad: Testing —
      {
        titulo: '🧪 Bloque 2: Testing',
        descripcion: 'Añadimos tests para los flujos críticos (~1 hora).',
      },
      {
        titulo: '6. Instalar Vitest',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'npm install -D vitest @testing-library/react @testing-library/jest-dom',
          },
        ],
      },
      {
        titulo: '7. Crear unit tests',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Configura Vitest y crea tests unitarios para:
- Funciones de utilidad (formateo de precios, fechas, etc.)
- Validaciones de Zod
- Lógica de negocio pura
Al menos 3 unit tests.`,
          },
        ],
      },
      {
        titulo: '8. Test E2E del flujo principal',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'npm install -D @playwright/test\nnpx playwright install',
          },
          {
            lenguaje: 'text',
            codigo: `Crea al menos 1 test E2E con Playwright:
- Test de login (email + password → dashboard)
- O test del flujo principal de tu app
Pon los tests en tests/e2e/`,
          },
        ],
      },
      {
        titulo: '9. Subir todo',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `git add .
git commit -m "Emails + tests implementados"
git push`,
          },
        ],
      },
    ],
  },
  // ==========================================
  // SEMANA 9 — Performance y SEO (sin cambios)
  // ==========================================
  {
    semanaNum: 9,
    titulo: 'Performance y SEO',
    emoji: '🚄',
    subtitulo: 'Optimiza tu app para velocidad y posicionamiento',
    pasos: [
      {
        titulo: '📋 Haz tu app rápida y visible',
        descripcion: 'Hoy optimizamos para que cargue rápido y aparezca en Google.',
      },
      {
        titulo: '1. Auditoría con Lighthouse',
        descripcion: 'Abre Chrome DevTools → Lighthouse → Generate Report',
        tip: 'Anota tu score actual. El objetivo: > 90 en todas las categorías.',
      },
      {
        titulo: '2. Optimizar imágenes',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Revisa todas las imágenes de la app y:
- Usa next/image en lugar de <img>
- Añade width y height a todas las imágenes
- Usa priority en imágenes above the fold
- Convierte PNGs grandes a WebP`,
          },
        ],
      },
      {
        titulo: '3. Optimizar fonts',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Usa next/font para cargar las fuentes de forma óptima:
- Import desde next/font/google
- Aplica como className al body
- Elimina cualquier <link> manual de Google Fonts`,
          },
        ],
      },
      {
        titulo: '4. SEO metadata',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Añade metadata SEO a todas las páginas:
- title y description únicos por página
- Open Graph tags (og:title, og:description, og:image)
- Twitter card tags
- Crea una OG image con el nombre de tu app
- Genera sitemap.xml automático`,
          },
        ],
      },
      {
        titulo: '5. Verificar mejoras',
        descripcion: 'Corre Lighthouse de nuevo y compara.',
        links: [
          { texto: 'PageSpeed Insights', url: 'https://pagespeed.web.dev' },
        ],
      },
    ],
  },
  // ==========================================
  // SEMANA 10 — Agent Swarms y Lanzamiento (sin cambios)
  // ==========================================
  {
    semanaNum: 10,
    titulo: 'Agent Swarms y Lanzamiento',
    emoji: '🤖',
    subtitulo: 'Claude Code como tu equipo completo + lanzamiento al mundo',
    pasos: [
      {
        titulo: '📋 Agent Swarms + Lanzamiento',
        descripcion: 'Hoy configuramos agentes especializados para tu proyecto y lo lanzamos al mundo.',
      },
      {
        titulo: '1. Reforzar tu CLAUDE.md',
        descripcion: 'Tu CLAUDE.md es el "briefing" del equipo. Vamos a añadir roles y responsabilidades:',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Actualiza el CLAUDE.md de mi proyecto añadiendo:

## Roles y responsabilidades
- Frontend: carpetas /app y /components, usar shadcn/ui + Tailwind
- Backend: /app/api y /app/actions.ts, Server Actions con Zod
- Base de datos: Supabase, migrations, types, RLS policies
- Tests: Vitest para unit tests, Playwright para E2E

## Reglas de calidad
- Validar con Zod antes de insertar en DB
- RLS obligatorio en todas las tablas
- Componentes responsive por defecto
- Commits descriptivos en español

Mantén lo que ya hay y añade estas secciones nuevas.`,
          },
        ],
      },
      {
        titulo: '2. Crear skill de revisión de código',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'mkdir -p .claude/skills',
          },
          {
            lenguaje: 'text',
            codigo: `Crea un archivo .claude/skills/review.md con este contenido:

# /review - Revisión de código

Revisa los cambios recientes del proyecto:
1. Busca vulnerabilidades de seguridad (SQL injection, XSS, secrets expuestos)
2. Verifica que hay validación con Zod en todos los inputs del usuario
3. Comprueba que las RLS policies cubren todos los casos
4. Busca console.log o código de debug olvidado
5. Verifica que los componentes nuevos son responsive
6. Sugiere mejoras de rendimiento si las hay`,
          },
        ],
        tip: 'Después de crear la skill, pruébala: escribe /review en Claude Code.',
      },
      {
        titulo: '3. Crear skill de pre-deploy',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea un archivo .claude/skills/deploy-check.md con este contenido:

# /deploy-check - Verificación pre-deploy

Antes de hacer deploy, verifica:
1. npm run build sin errores ni warnings
2. Variables de entorno documentadas en .env.example
3. No hay secrets hardcodeados en el código (busca strings con "sk_", "key", passwords)
4. Tests pasando
5. Migrations de Supabase aplicadas
6. CLAUDE.md actualizado con el estado actual`,
          },
        ],
      },
      {
        titulo: '4. Crear skill de nueva feature',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea un archivo .claude/skills/new-feature.md con este contenido:

# /new-feature - Implementar feature completa

Cuando implementes una nueva feature, sigue este proceso:
1. PLANIFICA: Antes de escribir código, describe qué vas a hacer y qué archivos tocas
2. IMPLEMENTA: Escribe el código siguiendo las convenciones del CLAUDE.md
3. VALIDA: Añade validación Zod si hay inputs del usuario
4. PROTEGE: Añade RLS policies si hay nuevas tablas o columnas
5. TESTA: Corre npm run build para verificar que no hay errores
6. DOCUMENTA: Actualiza el CLAUDE.md con los cambios`,
          },
        ],
      },
      {
        titulo: '5. Practicar: feature compleja con delegación',
        descripcion: 'Vamos a pedirle a Claude una feature compleja y ver cómo delega a sub-agentes:',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Implementa un sistema de notificaciones para mi app:
1. Tabla "notifications" en Supabase con tipo, mensaje, leída/no leída
2. Icono de campana en el header con badge del número de no leídas
3. Dropdown que muestra las últimas 10 notificaciones
4. Marcar como leída al hacer clic
5. Server Action para crear notificaciones desde el backend
6. RLS: cada usuario solo ve sus notificaciones

Usa el proceso de /new-feature para implementarlo.`,
          },
        ],
        tip: 'Fíjate cómo Claude planifica primero, luego implementa paso a paso. Eso es un agent swarm en acción: un agente planifica, otros ejecutan.',
      },
      {
        titulo: '6. Flujo de revisión automatizado',
        descripcion: 'Después de implementar la feature, usa tus skills:',
        bloques: [
          {
            lenguaje: 'text',
            codigo: '/review',
          },
          {
            lenguaje: 'text',
            codigo: '/deploy-check',
          },
        ],
        tip: 'Este es tu flujo profesional: implementar → revisar → verificar → deploy. Como un equipo real pero tú solo con Claude.',
      },
      {
        titulo: '7. Hooks: automatizar acciones',
        descripcion: 'Los hooks ejecutan comandos automáticamente en ciertos momentos. Ejemplo: lint después de cada edición.',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Configura un hook en mi settings de Claude Code que ejecute "npm run build" automáticamente después de cada cambio grande, para detectar errores al momento.`,
          },
        ],
        links: [
          { texto: 'Lección: Skills, Hooks y Plugins', url: '/fundamentos/skills-hooks-plugins' },
        ],
      },
      {
        titulo: '8. Subir cambios de Agent Swarm',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `git add .
git commit -m "Agent swarm: skills, CLAUDE.md reforzado"
git push`,
          },
        ],
        tip: 'Comparte tus skills en Discord. Las mejores las compartimos con todo el grupo.',
      },
      // — LANZAMIENTO —
      {
        titulo: '📋 ¡Hora de lanzar! 🎉',
        descripcion: 'Ahora que tienes un equipo de agentes, vamos a preparar el lanzamiento de tu SaaS.',
      },
      {
        titulo: '9. Checklist técnico',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Antes de lanzar, verifica:
✅ Dominio propio configurado en Vercel
✅ HTTPS activo (automático en Vercel)
✅ Variables de entorno en producción
✅ Stripe en modo LIVE (no test)
✅ Emails enviándose correctamente
✅ RLS activo en todas las tablas
✅ Error tracking instalado (Sentry)
✅ Analytics configurado (Vercel Analytics o Plausible)`,
          },
        ],
      },
      {
        titulo: '10. Configurar dominio',
        descripcion: 'En Vercel → Settings → Domains, añade tu dominio.',
        links: [
          { texto: 'Vercel Domains', url: 'https://vercel.com/dashboard' },
        ],
      },
      {
        titulo: '11. Stripe en producción',
        descripcion: 'Cambia de test mode a live mode:',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `En Vercel → Environment Variables:
1. Cambia STRIPE_SECRET_KEY a la key live (sk_live_...)
2. Cambia NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY a la key live (pk_live_...)
3. Actualiza STRIPE_WEBHOOK_SECRET con el nuevo webhook de producción
4. Redeploy`,
          },
        ],
        tip: 'Haz un pago real de prueba con tu propia tarjeta. Puedes reembolsártelo después.',
      },
      {
        titulo: '12. Legal básico',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Pide a Claude que genere:
- Página /terms (Términos de Servicio)
- Página /privacy (Política de Privacidad)
- Banner de cookies (si aplica)
Personaliza con el nombre de tu empresa y datos de contacto.`,
          },
        ],
      },
      {
        titulo: '13. Post de lanzamiento',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Escribe tu post de lanzamiento:
- Título: Qué problema resuelves
- Story: Por qué lo creaste (tu historia personal)
- Features: 3-4 características principales
- Link: URL de tu app
- CTA: "Pruébalo gratis" o "Regístrate"`,
          },
        ],
        links: [
          { texto: 'Product Hunt', url: 'https://producthunt.com' },
          { texto: 'IndieHackers', url: 'https://indiehackers.com' },
        ],
      },
      {
        titulo: '14. ¡LANZA! 🚀',
        descripcion: 'Publica tu post, comparte en redes, y celebra. Has creado un SaaS completo en 10 semanas.',
        tip: 'Comparte tu URL en el Discord del curso. Vamos a celebrar juntos.',
      },
    ],
  },
]

// Helper para obtener la pizarra de una semana (con soporte para día específico)
export function getPizarra(semanaNum: number, dia?: number): PizarraSemana | undefined {
  if (dia) {
    return PIZARRAS.find(p => p.semanaNum === semanaNum && p.dia === dia)
  }
  // For weeks without dia field, return the single pizarra
  // For weeks with dia field but no dia specified, return dia 1 as default
  return PIZARRAS.find(p => p.semanaNum === semanaNum && !p.dia) ||
         PIZARRAS.find(p => p.semanaNum === semanaNum && p.dia === 1)
}

// Helper para obtener todas las pizarras de una semana (para semanas multi-día)
export function getPizarrasForSemana(semanaNum: number): PizarraSemana[] {
  return PIZARRAS.filter(p => p.semanaNum === semanaNum)
}
