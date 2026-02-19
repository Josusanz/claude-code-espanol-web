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
}

export interface PizarraSemana {
  semanaNum: number
  titulo: string
  emoji: string
  subtitulo: string
  pasos: PasoClase[]
}

export const PIZARRAS: PizarraSemana[] = [
  {
    semanaNum: 1,
    titulo: 'LaunchPad - Proyecto Conjunto',
    emoji: '🚀',
    subtitulo: 'Personalizamos un theme premium y lo lanzamos al mundo',
    pasos: [
      // — DÍA 1 (Jueves) — Bienvenida y Orientación
      {
        titulo: '📋 Día 1 (Jueves): Bienvenida y Orientación',
        descripcion: 'Hoy nos conocemos, exploramos el ecosistema del curso y nos preparamos para mañana.',
      },
      {
        titulo: '1. Bienvenida',
        descripcion: 'Contexto del curso: 10 semanas para crear tu SaaS. Qué vamos a hacer, cómo funciona, qué se espera de ti.',
      },
      {
        titulo: '2. Presentaciones',
        descripcion: 'Cada uno se presenta durante 2 minutos: quién eres, qué quieres crear, por qué ahora y un dato curioso.',
        tip: 'Si preparaste tu mini-presentación de la pre-clase, es el momento de compartirla.',
      },
      {
        titulo: '3. Rueda del Creador',
        descripcion: 'Hacemos juntos la Rueda del Creador. Puntúa del 1 al 10 cada una de las 8 áreas clave de tu vida como creador. ¿Dónde tienes más fuerza? ¿Dónde necesitas ayuda?',
        links: [
          { texto: 'Rueda del Creador interactiva', url: '/curso/rueda' },
        ],
      },
      {
        titulo: '4. Dificultades y miedos',
        descripcion: 'Ejercicio grupal: ¿Qué te frena? ¿Qué miedos tienes? Compartir y normalizar las dificultades.',
        tip: 'No hay respuestas incorrectas. Todos estamos aquí para aprender.',
      },
      {
        titulo: '5. Tour: Dashboard del curso',
        descripcion: 'Navegamos juntos el dashboard: semanas, progreso, pre-clases, entregables.',
        links: [
          { texto: 'Abrir dashboard del curso', url: '/curso' },
        ],
      },
      {
        titulo: '6. Tour: Pizarra de clase',
        descripcion: 'Así funciona la pizarra: pasos en vivo que seguimos durante la clase. ¡Estás viéndola ahora mismo!',
        links: [
          { texto: 'Pizarra de la Semana 1', url: '/curso/clase/1' },
        ],
      },
      {
        titulo: '7. Tour: Themes premium',
        descripcion: 'Exploramos la galería de 20 themes profesionales. Mañana elegirás uno como base para tu waitlist.',
        links: [
          { texto: 'Galería de themes', url: '/curso/themes' },
        ],
      },
      {
        titulo: '8. Tour: Discord',
        descripcion: 'Los canales del Discord: #dudas, #compartir, #general. Cómo pedir ayuda y compartir progreso.',
        links: [
          { texto: 'Guía de Discord', url: '/precurso/discord' },
        ],
      },
      {
        titulo: '9. Tarea: preparar la pre-clase para mañana',
        descripcion: 'Lee la pre-clase completa (setup técnico), ten terminal + Claude Code + Pencil listos, crea la carpeta ~/curso-ia, clona los themes, crea cuentas de Supabase y Vercel, y elige un theme base.',
        tip: 'Si tienes dudas con el setup, pregunta ahora o en Discord. Mañana arrancamos directamente a construir.',
      },
      // — DÍA 2 (Viernes) — Tu Primera Web
      {
        titulo: '📋 Día 2 (Viernes): Tu Primera Web',
        descripcion: 'Hoy personalizamos el theme que elegiste en la pre-clase con Claude Code, conectamos Supabase y desplegamos en Vercel.',
      },
      {
        titulo: '10. Abrir tu proyecto',
        descripcion: 'Ya tienes un theme instalado de la pre-clase. Primero mira qué proyectos tienes:',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `# Mira qué carpetas tienes en curso-ia
ls ~/curso-ia`,
          },
          {
            lenguaje: 'bash',
            codigo: `# Entra en tu proyecto (sustituye por el nombre que veas)
cd ~/curso-ia/mi-waitlist`,
          },
        ],
        tip: 'El comando ls te muestra las carpetas. Verás "themes" (el repo de themes) y la carpeta de tu proyecto (mi-waitlist, mi-fintech, etc.). Entra en la de tu proyecto, NO en "themes".',
      },
      {
        titulo: '11. Abrir Claude Code (sin confirmaciones)',
        descripcion: 'Desde la carpeta de tu proyecto, lanza Claude Code:',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'claude --dangerously-skip-permissions',
          },
        ],
        tip: 'La flag --dangerously-skip-permissions hace que Claude no te pida confirmación cada vez que ejecuta un comando o edita un archivo. Así todo fluye sin interrupciones.',
      },
      {
        titulo: '12. Arrancar el servidor de desarrollo',
        descripcion: 'Abre otra terminal (sin cerrar Claude) y arranca el proyecto:',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'cd ~/curso-ia/mi-proyecto\nnpm run dev',
          },
        ],
        tip: 'Abre http://localhost:3000 en tu navegador. Verás el theme tal cual. Ahora vamos a personalizarlo.',
        links: [
          { texto: 'Abrir localhost:3000', url: 'http://localhost:3000' },
        ],
      },
      {
        titulo: '13. Personalizar el theme con Claude',
        descripcion: 'El theme ya tiene un diseño profesional. Ahora dile a Claude que lo adapte a tu proyecto:',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Mira la web actual y personalízala para mi proyecto.

Mi proyecto es: [DESCRIBE TU IDEA AQUÍ]

Cambia:
- El título y subtítulo del hero por algo que describa mi producto
- Los textos de beneficios/features por los de mi producto
- Los colores principales si quieres
- Asegúrate de que el formulario de email funcione como captura de waitlist

Mantén el diseño profesional del theme, solo cambia el contenido.`,
          },
        ],
        tip: 'Sustituye [DESCRIBE TU IDEA AQUÍ] por tu idea real. Cuanto más contexto des, mejor resultado. Refresca localhost:3000 para ver los cambios.',
      },
      {
        titulo: '14. Iterar el diseño',
        descripcion: 'Si algo no te gusta, pídele cambios a Claude:',
        bloques: [
          {
            lenguaje: 'text',
            codigo: 'Cambia el color principal a azul oscuro. Haz el título más grande. Añade una sección más de testimonios. Cambia la imagen del hero.',
          },
        ],
        tip: 'No hace falta ser técnico. Habla como si le explicaras a un diseñador humano. Itera hasta que te guste.',
      },
      {
        titulo: '15. Crear CLAUDE.md',
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
        titulo: '16. Conectar Git con GitHub',
        descripcion: 'Antes de subir código, necesitas que tu terminal sepa quién eres y pueda acceder a GitHub.',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `# 1. Configura tu nombre y email (solo la primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# 2. Instala GitHub CLI (si no lo tienes)
brew install gh        # Mac
# o: sudo apt install gh  # Linux
# o: winget install GitHub.cli  # Windows

# 3. Autentícate con GitHub
gh auth login`,
          },
        ],
        tip: 'Al ejecutar "gh auth login", selecciona: GitHub.com → HTTPS → Login with a web browser. Se abrirá el navegador para autorizar. Solo necesitas hacer esto una vez.',
      },
      {
        titulo: '17. Crear repo y subir a GitHub',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `# Inicializar git y hacer el primer commit
git init
git add .
git commit -m "Primera versión de mi landing"

# Crear repositorio en GitHub y subirlo
# Sustituye "mi-proyecto" por el nombre de tu carpeta
gh repo create mi-proyecto --public --source=. --push`,
          },
        ],
        tip: 'Este comando crea el repo en GitHub, lo conecta con tu proyecto local y sube todo el código de una vez. Si prefieres repo privado, cambia --public por --private.',
      },
      {
        titulo: '18. Crear proyecto en Supabase',
        descripcion: 'Ve a Supabase y crea un nuevo proyecto.',
        links: [
          { texto: 'Abrir Supabase', url: 'https://supabase.com/dashboard' },
        ],
        tip: 'Apunta la contraseña de la base de datos. Usa el mismo nombre que tu proyecto local.',
      },
      {
        titulo: '19. Crear tabla de emails',
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
        titulo: '20. Instalar Supabase en el proyecto',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'npm install @supabase/supabase-js',
          },
        ],
      },
      {
        titulo: '21. Configurar variables de entorno',
        descripcion: 'Crea un archivo .env.local en la raíz del proyecto. Las keys están en Supabase → Settings → API.',
        bloques: [
          {
            lenguaje: 'env',
            archivo: '.env.local',
            codigo: `NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...`,
          },
        ],
        tip: 'Copia las keys reales de tu proyecto en Supabase. Las de arriba son de ejemplo.',
        links: [
          { texto: 'Supabase → Settings → API', url: 'https://supabase.com/dashboard/project/_/settings/api' },
        ],
      },
      {
        titulo: '22. Conectar el formulario',
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
        titulo: '23. Crear panel admin',
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
        titulo: '24. Deploy en Vercel',
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
        titulo: '25. ¡Comparte tu URL!',
        descripcion: 'Tu waitlist está en producción. Copia la URL de Vercel y compártela en el Discord del curso.',
        tip: 'Actualiza el CLAUDE.md: "Actualiza el CLAUDE.md con todo lo que hemos hecho. El proyecto está desplegado en [tu-url].vercel.app"',
      },
    ],
  },
  {
    semanaNum: 2,
    titulo: 'Tu Proyecto - Setup + UI',
    emoji: '🎨',
    subtitulo: 'Empezamos TU proyecto con shadcn/ui y Pencil',
    pasos: [
      {
        titulo: '📋 Diseña tu interfaz completa',
        descripcion: 'Esta semana cada uno trabaja en SU proyecto. Vamos a crear toda la UI (sin funcionalidad todavía).',
      },
      {
        titulo: '1. Crear tu proyecto',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: `npx create-next-app@latest mi-proyecto
cd mi-proyecto
code .`,
          },
        ],
        tip: 'Sustituye "mi-proyecto" por el nombre de tu SaaS.',
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
        titulo: '4. Diseñar en Pencil (opcional pero recomendado)',
        descripcion: 'Crea un archivo .pen para diseñar tu dashboard visualmente:',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'touch diseño-dashboard.pen',
          },
        ],
        tip: 'Los archivos .pen se abren en el canvas de Pencil. Arrastra componentes y diseña tu layout. Luego Claude puede leer este diseño desde el terminal y generar el código exacto.',
      },
      {
        titulo: '5. Crear el dashboard con Claude',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea un dashboard para [TU APP]. Necesito:
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
            codigo: `Crea las siguientes páginas para mi app:
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
        titulo: '9. Generar código desde Pencil',
        descripcion: 'Si diseñaste en Pencil, pídele a Claude que genere el código:',
        bloques: [
          {
            lenguaje: 'text',
            codigo: 'Mira mi diseño en diseño-dashboard.pen y genera los componentes React con Tailwind CSS y shadcn/ui. Respeta los colores, espaciado y layout exactos del diseño.',
          },
        ],
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
  {
    semanaNum: 3,
    titulo: 'Base de Datos con Supabase',
    emoji: '🗄️',
    subtitulo: 'Diseña tu schema y conecta tu app con datos reales',
    pasos: [
      {
        titulo: '📋 Conecta tu app con Supabase',
        descripcion: 'Hoy diseñamos las tablas de tu proyecto y las conectamos con la UI que creamos la semana pasada.',
      },
      {
        titulo: '1. Crear proyecto en Supabase',
        links: [
          { texto: 'Abrir Supabase Dashboard', url: 'https://supabase.com/dashboard' },
        ],
        tip: 'Nombre del proyecto = nombre de tu SaaS. Región: eu-west-1 (más cercano a España).',
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
        tip: 'Adapta este ejemplo a TU proyecto. Si no sabes qué tablas crear, dile a Claude: "Ayúdame a diseñar el schema de base de datos para [tu idea]"',
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
      {
        titulo: '8. Verificar',
        descripcion: 'Prueba que todo funciona:',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Checklist:
✅ Puedo crear un nuevo registro
✅ Los registros aparecen en la tabla
✅ Puedo editar un registro
✅ Puedo eliminar un registro
✅ Los datos persisten (refresca la página)`,
          },
        ],
      },
    ],
  },
  {
    semanaNum: 4,
    titulo: 'Autenticación de Usuarios',
    emoji: '🔐',
    subtitulo: 'Login, registro y protección de rutas con Supabase Auth',
    pasos: [
      {
        titulo: '📋 Sistema de autenticación completo',
        descripcion: 'Hoy añadimos login, registro, y protegemos las rutas para que cada usuario solo vea sus datos.',
      },
      {
        titulo: '1. Configurar Supabase Auth',
        descripcion: 'En Supabase Dashboard → Authentication → Providers, habilita Email.',
        links: [
          { texto: 'Supabase Auth Settings', url: 'https://supabase.com/dashboard/project/_/auth/providers' },
        ],
      },
      {
        titulo: '2. Instalar helpers de auth',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'npm install @supabase/ssr',
          },
        ],
      },
      {
        titulo: '3. Crear páginas de login/registro',
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
        titulo: '4. Proteger rutas con middleware',
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
        titulo: '5. Row Level Security (RLS)',
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
        titulo: '6. Verificar seguridad',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Checklist de seguridad:
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
  {
    semanaNum: 5,
    titulo: 'APIs y Server Actions',
    emoji: '⚡',
    subtitulo: 'Server Actions, Route Handlers y validación con Zod',
    pasos: [
      {
        titulo: '📋 APIs modernas con Next.js',
        descripcion: 'Hoy refactorizamos la lógica del servidor usando Server Actions y añadimos validación.',
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
            codigo: `Refactoriza las operaciones de mi app para usar Server Actions:
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
        tip: 'Adapta los schemas a TU proyecto. Siempre valida el input del usuario.',
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
            codigo: `Si tu app necesita recibir datos externos (webhooks), crea un Route Handler:

Crea app/api/webhook/route.ts que:
- Reciba POST requests
- Verifique la autenticidad del request
- Procese los datos
- Devuelva un status apropiado`,
          },
        ],
      },
    ],
  },
  {
    semanaNum: 6,
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
  {
    semanaNum: 7,
    titulo: 'Email y Notificaciones',
    emoji: '📧',
    subtitulo: 'Emails transaccionales con Resend y notificaciones in-app',
    pasos: [
      {
        titulo: '📋 Comunícate con tus usuarios',
        descripcion: 'Hoy añadimos emails automáticos y notificaciones dentro de la app.',
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
        titulo: '4. Crear template de email',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea un sistema de emails con Resend y React Email:
1. Template de bienvenida (cuando se registra un usuario)
2. Template de confirmación de pago
3. Template de notificación genérica
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
- Al pagar → confirmación de pago
- Al cancelar suscripción → email de feedback
Usa Server Actions o los webhooks de Stripe para triggear los envíos.`,
          },
        ],
      },
    ],
  },
  {
    semanaNum: 8,
    titulo: 'Testing y Calidad',
    emoji: '🧪',
    subtitulo: 'Tests automatizados con Vitest y Playwright',
    pasos: [
      {
        titulo: '📋 Asegura la calidad de tu código',
        descripcion: 'Hoy añadimos tests para que tu app no se rompa cuando hagas cambios.',
      },
      {
        titulo: '1. Instalar Vitest',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'npm install -D vitest @testing-library/react @testing-library/jest-dom',
          },
        ],
      },
      {
        titulo: '2. Primer unit test',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Configura Vitest y crea tests unitarios para:
- Funciones de utilidad (formateo de precios, fechas, etc.)
- Validaciones de Zod
- Lógica de negocio pura
Crea los tests en carpeta __tests__/ o junto a cada archivo con .test.ts`,
          },
        ],
      },
      {
        titulo: '3. Instalar Playwright',
        bloques: [
          {
            lenguaje: 'bash',
            codigo: 'npm install -D @playwright/test\nnpx playwright install',
          },
        ],
      },
      {
        titulo: '4. Test E2E del flujo principal',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea tests E2E con Playwright para:
1. Test de login (email + password → dashboard)
2. Test del flujo principal de tu app (crear → ver → editar → eliminar)
3. Test de que rutas protegidas redirigen a login
Pon los tests en tests/e2e/`,
          },
        ],
      },
      {
        titulo: '5. CI con GitHub Actions',
        bloques: [
          {
            lenguaje: 'text',
            codigo: `Crea un workflow de GitHub Actions que:
- Se ejecute en cada push y pull request
- Corra los unit tests con Vitest
- Corra los E2E tests con Playwright
- Reporte si algo falla
Crea el archivo en .github/workflows/tests.yml`,
          },
        ],
      },
    ],
  },
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
  {
    semanaNum: 10,
    titulo: 'Lanzamiento',
    emoji: '🎉',
    subtitulo: 'Tu SaaS en producción, listo para usuarios reales',
    pasos: [
      {
        titulo: '📋 Checklist de lanzamiento',
        descripcion: 'Hoy preparamos todo para lanzar al mundo.',
      },
      {
        titulo: '1. Checklist técnico',
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
        titulo: '2. Configurar dominio',
        descripcion: 'En Vercel → Settings → Domains, añade tu dominio.',
        links: [
          { texto: 'Vercel Domains', url: 'https://vercel.com/dashboard' },
        ],
      },
      {
        titulo: '3. Stripe en producción',
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
        titulo: '4. Legal básico',
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
        titulo: '5. Post de lanzamiento',
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
        titulo: '6. ¡LANZA! 🚀',
        descripcion: 'Publica tu post, comparte en redes, y celebra. Has creado un SaaS completo en 10 semanas.',
        tip: 'Comparte tu URL en el Discord del curso. Vamos a celebrar juntos.',
      },
    ],
  },
]

// Helper para obtener la pizarra de una semana
export function getPizarra(semanaNum: number): PizarraSemana | undefined {
  return PIZARRAS.find(p => p.semanaNum === semanaNum)
}
