// Datos del curso interactivo completo
// "Crea tu Plataforma de Cursos Interactivos con IA"

// Tipos para contenido multimedia
export interface MediaContent {
  type: 'video' | 'image' | 'gif' | 'diagram' | 'code'
  url?: string // URL para video/image/gif
  videoId?: string // ID de YouTube/Vimeo
  videoProvider?: 'youtube' | 'vimeo' | 'self'
  code?: string // Código para mostrar
  language?: string // Lenguaje para syntax highlighting
  caption?: string // Descripción del contenido
  alt?: string // Alt text para accesibilidad
}

export interface Lesson {
  id: string
  title: string
  instruction: string
  commandToType: string
  terminalResponse: string
  aiMessage: string
  successKeywords?: string[]
  acceptAnyInput?: boolean
  isComplete?: boolean
  // Contenido multimedia opcional
  media?: MediaContent[]
  // Contenido teórico antes del ejercicio práctico
  theory?: string // Markdown con explicación teórica
  // Recursos adicionales
  resources?: Array<{
    title: string
    url: string
    type: 'docs' | 'video' | 'article' | 'github'
  }>
}

export interface Module {
  id: string
  number: string
  title: string
  description: string
  lessons: Lesson[]
  // Video introductorio del módulo (opcional)
  introVideo?: {
    videoId: string
    provider: 'youtube' | 'vimeo'
    duration: string // "5:30"
  }
}

export const courseData = {
  title: 'Crea tu Plataforma de Cursos Interactivos con IA',
  description: 'Construye paso a paso una plataforma completa para vender cursos interactivos',
  modules: [
    // MÓDULO 1: FUNDAMENTOS
    {
      id: 'fundamentos',
      number: '01',
      title: 'Fundamentos',
      description: 'Configura el proyecto y entiende la arquitectura',
      lessons: [
        {
          id: '1-1',
          title: 'Crear el proyecto',
          instruction: 'Empezamos creando un nuevo proyecto con Next.js. Este será la base de tu plataforma.',
          commandToType: 'npx create-next-app@latest mi-plataforma',
          terminalResponse: `Creating a new Next.js app in /mi-plataforma

Using npm.

Initializing project with template: default

Installing dependencies:
- react
- react-dom
- next

✓ Project created successfully!

cd mi-plataforma`,
          aiMessage: 'Hemos creado un proyecto Next.js que será la base de tu plataforma. Next.js es perfecto porque incluye SSR, API routes, y un sistema de routing basado en archivos. En la siguiente lección instalaremos las dependencias adicionales.',
          successKeywords: ['create-next-app', 'npx', 'next', 'mi-plataforma'],
        },
        {
          id: '1-2',
          title: 'Instalar dependencias',
          instruction: 'Ahora instalamos las dependencias necesarias: Tailwind para estilos y el SDK de Anthropic para la IA.',
          commandToType: 'npm install @anthropic-ai/sdk tailwindcss',
          terminalResponse: `added 142 packages in 8s

Dependencies installed:
✓ @anthropic-ai/sdk@0.71.2
✓ tailwindcss@3.4.1
✓ autoprefixer@10.4.16
✓ postcss@8.4.32

Run 'npx tailwindcss init -p' to create config files.`,
          aiMessage: 'Excelente. El SDK de Anthropic nos permite conectar con Claude para crear el tutor IA. Tailwind CSS nos da utilidades para crear interfaces modernas rápidamente. En el siguiente paso configuraremos Tailwind.',
          successKeywords: ['npm', 'install', 'anthropic', 'tailwind'],
        },
        {
          id: '1-3',
          title: 'Configurar Tailwind',
          instruction: 'Inicializa la configuración de Tailwind CSS.',
          commandToType: 'npx tailwindcss init -p',
          terminalResponse: `Created Tailwind CSS config file: tailwind.config.js
Created PostCSS config file: postcss.config.js

✓ Tailwind CSS initialized successfully!

Next steps:
1. Add Tailwind directives to your CSS
2. Configure content paths in tailwind.config.js`,
          aiMessage: 'Tailwind está listo. Ahora tenemos los archivos de configuración. En la siguiente lección crearemos la estructura de carpetas del proyecto.',
          successKeywords: ['tailwindcss', 'init', 'npx'],
        },
        {
          id: '1-4',
          title: 'Estructura del proyecto',
          instruction: 'Veamos la estructura de carpetas que usaremos. Ejecuta este comando para ver los archivos.',
          commandToType: 'ls -la',
          terminalResponse: `total 456
drwxr-xr-x  12 user  staff    384 Jan 17 10:00 .
drwxr-xr-x   5 user  staff    160 Jan 17 10:00 ..
-rw-r--r--   1 user  staff    524 Jan 17 10:00 .gitignore
-rw-r--r--   1 user  staff    227 Jan 17 10:00 next.config.js
-rw-r--r--   1 user  staff   1842 Jan 17 10:00 package.json
drwxr-xr-x   4 user  staff    128 Jan 17 10:00 pages
drwxr-xr-x   3 user  staff     96 Jan 17 10:00 public
drwxr-xr-x   3 user  staff     96 Jan 17 10:00 styles
-rw-r--r--   1 user  staff    532 Jan 17 10:00 tailwind.config.js
-rw-r--r--   1 user  staff    451 Jan 17 10:00 tsconfig.json`,
          aiMessage: 'Esta es la estructura estándar de Next.js. La carpeta "pages" contiene las rutas, "public" los assets estáticos, y "styles" los estilos globales. Crearemos carpetas adicionales para componentes y utilidades.',
          successKeywords: ['ls', 'dir', 'estructura', 'carpetas'],
        },
      ],
    },

    // MÓDULO 2: TERMINAL INTERACTIVO
    {
      id: 'terminal',
      number: '02',
      title: 'Terminal Interactivo',
      description: 'Crea el componente de terminal simulado',
      lessons: [
        {
          id: '2-1',
          title: 'Componente Terminal',
          instruction: 'Creamos el componente del terminal. Escribe el comando para crear el archivo.',
          commandToType: 'touch components/Terminal.tsx',
          terminalResponse: `✓ Created: components/Terminal.tsx

File ready for editing.
This component will simulate a terminal interface
where students can practice commands.`,
          aiMessage: 'El terminal será el corazón de tu plataforma. Los estudiantes escribirán comandos aquí y recibirán feedback instantáneo. Vamos a construirlo paso a paso.',
          successKeywords: ['touch', 'terminal', 'components', 'crear'],
        },
        {
          id: '2-2',
          title: 'Estado del Terminal',
          instruction: 'El terminal necesita guardar el historial de comandos. Añade el estado con useState.',
          commandToType: 'const [history, setHistory] = useState([])',
          terminalResponse: `// Terminal.tsx
import { useState } from 'react'

export function Terminal() {
  const [history, setHistory] = useState<string[]>([])
  const [input, setInput] = useState('')

  return (
    <div className="bg-slate-900 rounded-xl">
      {/* Terminal UI */}
    </div>
  )
}`,
          aiMessage: 'Usamos useState para manejar el historial de comandos y el input actual. El historial guardará todos los comandos ejecutados y sus respuestas. Esto permite que el estudiante vea su progreso.',
          successKeywords: ['usestate', 'history', 'estado', 'const'],
        },
        {
          id: '2-3',
          title: 'Procesar comandos',
          instruction: 'Ahora creamos la función que procesa los comandos del usuario.',
          commandToType: 'function processCommand(cmd)',
          terminalResponse: `const processCommand = (cmd: string) => {
  const normalized = cmd.toLowerCase().trim()

  // Añadir al historial
  setHistory(prev => [...prev, { type: 'input', content: cmd }])

  // Verificar si es correcto
  if (isCommandValid(cmd, currentLesson)) {
    setHistory(prev => [...prev, {
      type: 'output',
      content: currentLesson.response
    }])
    onSuccess() // Avanzar a siguiente lección
  } else {
    setHistory(prev => [...prev, {
      type: 'error',
      content: 'Intenta de nuevo...'
    }])
  }
}`,
          aiMessage: 'Esta función es clave. Recibe el comando, lo normaliza, lo añade al historial, y verifica si coincide con lo esperado. Si es correcto, muestra la respuesta y avanza. Si no, da feedback para intentar de nuevo.',
          successKeywords: ['function', 'process', 'command', 'procesar', 'cmd'],
        },
        {
          id: '2-4',
          title: 'Validación flexible',
          instruction: 'Creamos una validación que acepte variaciones del comando esperado.',
          commandToType: 'function isCommandValid(cmd, lesson)',
          terminalResponse: `function isCommandValid(cmd: string, lesson: Lesson): boolean {
  const normalized = cmd.toLowerCase().trim()

  // Verificar keywords
  if (lesson.successKeywords) {
    return lesson.successKeywords.some(keyword =>
      normalized.includes(keyword.toLowerCase())
    )
  }

  // Acepta cualquier input (para preguntas libres)
  if (lesson.acceptAnyInput) {
    return normalized.length >= 3
  }

  return false
}`,
          aiMessage: 'La validación flexible es importante para la UX. En lugar de requerir el comando exacto, usamos keywords. Así "npm install tailwind" y "npm i tailwind" son ambos válidos. Esto reduce la frustración del estudiante.',
          successKeywords: ['function', 'valid', 'iscommand', 'validar', 'verificar'],
        },
      ],
    },

    // MÓDULO 3: TUTOR IA
    {
      id: 'tutor-ia',
      number: '03',
      title: 'Tutor IA',
      description: 'Integra Claude para crear el asistente inteligente',
      lessons: [
        {
          id: '3-1',
          title: 'API Route para Claude',
          instruction: 'Creamos la API route que conecta con Claude.',
          commandToType: 'touch pages/api/chat.ts',
          terminalResponse: `✓ Created: pages/api/chat.ts

This API route will:
- Receive messages from the frontend
- Send them to Claude API
- Stream the response back`,
          aiMessage: 'Las API routes de Next.js son perfectas para esto. El frontend enviará mensajes aquí, nosotros los procesamos con Claude, y devolvemos la respuesta en streaming para que se vea en tiempo real.',
          successKeywords: ['touch', 'api', 'chat', 'crear', 'route'],
        },
        {
          id: '3-2',
          title: 'Configurar Anthropic SDK',
          instruction: 'Inicializa el cliente de Anthropic con tu API key.',
          commandToType: 'const anthropic = new Anthropic({ apiKey })',
          terminalResponse: `import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// La API key se guarda en .env.local
// ANTHROPIC_API_KEY=sk-ant-...`,
          aiMessage: 'Nunca pongas la API key directamente en el código. Usamos variables de entorno que se configuran en Vercel. Así el código es seguro para compartir y cada usuario usa su propia key.',
          successKeywords: ['anthropic', 'new', 'apikey', 'const', 'sdk'],
        },
        {
          id: '3-3',
          title: 'Streaming de respuestas',
          instruction: 'Implementamos streaming para que las respuestas aparezcan en tiempo real.',
          commandToType: 'anthropic.messages.stream({ model, messages })',
          terminalResponse: `const stream = anthropic.messages.stream({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 4096,
  system: systemPrompt,
  messages: messages,
})

for await (const event of stream) {
  if (event.type === 'content_block_delta') {
    // Enviar cada chunk al cliente
    res.write(\`data: \${JSON.stringify({
      text: event.delta.text
    })}\\n\\n\`)
  }
}`,
          aiMessage: 'El streaming es clave para la UX. Sin él, el usuario esperaría segundos sin ver nada. Con streaming, ve las palabras aparecer en tiempo real, como si Claude estuviera escribiendo. Esto hace la experiencia mucho más interactiva.',
          successKeywords: ['stream', 'messages', 'anthropic', 'model'],
        },
        {
          id: '3-4',
          title: 'System prompt efectivo',
          instruction: 'Definimos el prompt del sistema que convierte a Claude en un tutor.',
          commandToType: 'const systemPrompt = "Eres un tutor..."',
          terminalResponse: `const systemPrompt = \`Eres un tutor experto y amigable que enseña
programación de forma interactiva.

Tu rol:
- Dar explicaciones claras y concisas
- Proporcionar ejemplos prácticos
- Ofrecer feedback constructivo y motivador
- Hacer preguntas para verificar la comprensión

Formato:
- Usa markdown para formatear
- Incluye bloques de código cuando sea relevante
- Mantén las respuestas concisas pero completas
- Responde siempre en español\``,
          aiMessage: 'El system prompt define la personalidad y comportamiento de tu tutor IA. Un buen prompt hace que Claude sea consistente, útil y pedagógico. Puedes personalizarlo según el tipo de curso que crees.',
          successKeywords: ['systemprompt', 'prompt', 'tutor', 'eres'],
        },
      ],
    },

    // MÓDULO 4: SISTEMA DE LECCIONES
    {
      id: 'lecciones',
      number: '04',
      title: 'Sistema de Lecciones',
      description: 'Estructura los datos del curso y gestiona el progreso',
      lessons: [
        {
          id: '4-1',
          title: 'Estructura de datos',
          instruction: 'Definimos la estructura TypeScript para las lecciones.',
          commandToType: 'interface Lesson { id, title, command }',
          terminalResponse: `export interface Lesson {
  id: string
  title: string
  instruction: string
  commandToType: string
  terminalResponse: string
  aiMessage: string
  successKeywords?: string[]
  acceptAnyInput?: boolean
}

export interface Module {
  id: string
  number: string
  title: string
  lessons: Lesson[]
}`,
          aiMessage: 'TypeScript nos ayuda a mantener consistencia en los datos del curso. Cada lección tiene un comando esperado, la respuesta del terminal, y el mensaje del tutor IA. Los keywords hacen la validación flexible.',
          successKeywords: ['interface', 'lesson', 'type', 'estructura'],
        },
        {
          id: '4-2',
          title: 'Estado del progreso',
          instruction: 'Creamos el estado para trackear en qué lección está el usuario.',
          commandToType: 'const [lessonIndex, setLessonIndex] = useState(0)',
          terminalResponse: `const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
const [currentLessonIndex, setCurrentLessonIndex] = useState(0)

const currentModule = courseData.modules[currentModuleIndex]
const currentLesson = currentModule.lessons[currentLessonIndex]

const handleLessonComplete = () => {
  if (currentLessonIndex < currentModule.lessons.length - 1) {
    // Siguiente lección del módulo
    setCurrentLessonIndex(prev => prev + 1)
  } else if (currentModuleIndex < courseData.modules.length - 1) {
    // Siguiente módulo
    setCurrentModuleIndex(prev => prev + 1)
    setCurrentLessonIndex(0)
  }
}`,
          aiMessage: 'Manejamos dos índices: el módulo actual y la lección dentro de ese módulo. Cuando completas todas las lecciones de un módulo, avanzas al siguiente automáticamente.',
          successKeywords: ['usestate', 'lesson', 'index', 'progress', 'estado'],
        },
        {
          id: '4-3',
          title: 'Guardar progreso',
          instruction: 'Guardamos el progreso del usuario para que no pierda su avance.',
          commandToType: 'localStorage.setItem("progress", JSON.stringify(data))',
          terminalResponse: `// Guardar progreso
useEffect(() => {
  const progress = {
    moduleIndex: currentModuleIndex,
    lessonIndex: currentLessonIndex,
    completedAt: new Date().toISOString()
  }
  localStorage.setItem('course_progress', JSON.stringify(progress))
}, [currentModuleIndex, currentLessonIndex])

// Cargar progreso al iniciar
useEffect(() => {
  const saved = localStorage.getItem('course_progress')
  if (saved) {
    const { moduleIndex, lessonIndex } = JSON.parse(saved)
    setCurrentModuleIndex(moduleIndex)
    setCurrentLessonIndex(lessonIndex)
  }
}, [])`,
          aiMessage: 'Usamos localStorage para persistir el progreso en el navegador. Así el usuario puede cerrar la pestaña y volver después sin perder su avance. Para producción, podrías guardarlo también en base de datos.',
          successKeywords: ['localstorage', 'setitem', 'guardar', 'progress', 'save'],
        },
        {
          id: '4-4',
          title: 'Barra de progreso',
          instruction: 'Creamos un componente visual para mostrar el progreso.',
          commandToType: 'function ProgressBar({ current, total })',
          terminalResponse: `function ProgressBar({ current, total }: {
  current: number
  total: number
}) {
  const percentage = (current / total) * 100

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-2 bg-slate-700 rounded-full">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all"
          style={{ width: \`\${percentage}%\` }}
        />
      </div>
      <span className="text-slate-400 text-sm">
        {current}/{total}
      </span>
    </div>
  )
}`,
          aiMessage: 'La barra de progreso da feedback visual al estudiante. Ver el progreso aumentar es motivador y les ayuda a saber cuánto les falta para completar el curso.',
          successKeywords: ['function', 'progressbar', 'progress', 'barra'],
        },
      ],
    },

    // MÓDULO 5: MONETIZACIÓN
    {
      id: 'monetizacion',
      number: '05',
      title: 'Monetización',
      description: 'Integra pagos con Lemon Squeezy',
      lessons: [
        {
          id: '5-1',
          title: 'Configurar Lemon Squeezy',
          instruction: 'Creamos el producto en Lemon Squeezy y obtenemos las credenciales.',
          commandToType: 'npm install @lemonsqueezy/lemonsqueezy.js',
          terminalResponse: `added 1 package in 2s

✓ @lemonsqueezy/lemonsqueezy.js installed

Next steps:
1. Create a store at lemonsqueezy.com
2. Add a product (your course)
3. Get API key from Settings > API
4. Add to .env.local:
   LEMONSQUEEZY_API_KEY=...
   LEMONSQUEEZY_STORE_ID=...`,
          aiMessage: 'Lemon Squeezy es ideal para vender productos digitales. No necesitas cuenta de empresa, acepta pagos globales, y maneja IVA automáticamente. Crearás tu producto en su dashboard y obtendrás las credenciales.',
          successKeywords: ['npm', 'install', 'lemonsqueezy', 'lemon'],
        },
        {
          id: '5-2',
          title: 'Botón de compra',
          instruction: 'Creamos el botón que lleva al checkout de Lemon Squeezy.',
          commandToType: 'window.open(checkoutUrl)',
          terminalResponse: `const handleCheckout = () => {
  const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL
  const emailParam = email
    ? \`?checkout[email]=\${encodeURIComponent(email)}\`
    : ''

  window.open(checkoutUrl + emailParam, '_blank')
}

<button
  onClick={handleCheckout}
  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold"
>
  Comprar Curso - 49€
</button>`,
          aiMessage: 'El checkout de Lemon Squeezy es hosted, lo que significa que no manejas datos de pago directamente. Simplemente rediriges al usuario a su página segura. Puedes pre-rellenar el email para mejor UX.',
          successKeywords: ['window', 'open', 'checkout', 'comprar', 'button'],
        },
        {
          id: '5-3',
          title: 'Webhook de compra',
          instruction: 'Creamos el webhook que recibe notificaciones cuando alguien compra.',
          commandToType: 'touch pages/api/webhooks/lemonsqueezy.ts',
          terminalResponse: `✓ Created: pages/api/webhooks/lemonsqueezy.ts

// Verificar firma del webhook
const signature = req.headers['x-signature']
const isValid = verifySignature(rawBody, signature)

// Procesar evento
if (event === 'order_created' && status === 'paid') {
  // Dar acceso al usuario
  await grantAccess(userEmail)
}`,
          aiMessage: 'Los webhooks son cruciales. Cuando alguien paga, Lemon Squeezy envía una notificación a tu servidor. Tú verificas que sea auténtica y das acceso al curso automáticamente.',
          successKeywords: ['webhook', 'touch', 'api', 'lemon'],
        },
        {
          id: '5-4',
          title: 'Verificar acceso',
          instruction: 'Creamos la función que verifica si el usuario tiene acceso al curso.',
          commandToType: 'async function checkAccess(email)',
          terminalResponse: `import { kv } from '@vercel/kv'

export async function checkAccess(email: string): Promise<boolean> {
  const purchaseKey = \`course:\${email.toLowerCase()}\`
  const purchase = await kv.get(purchaseKey)
  return !!purchase
}

// En el middleware o página
const hasAccess = await checkAccess(userEmail)
if (!hasAccess) {
  redirect('/plataforma/comprar')
}`,
          aiMessage: 'Usamos Vercel KV (Redis) para guardar quién ha comprado. Es rápido y económico. Al verificar acceso, buscamos si existe un registro de compra para ese email. Si no, redirigimos a la página de compra.',
          successKeywords: ['function', 'check', 'access', 'verificar', 'async'],
        },
      ],
    },

    // MÓDULO 6: DEPLOY
    {
      id: 'deploy',
      number: '06',
      title: 'Deploy',
      description: 'Despliega tu plataforma en Vercel',
      lessons: [
        {
          id: '6-1',
          title: 'Preparar para deploy',
          instruction: 'Verificamos que todo esté listo para producción.',
          commandToType: 'npm run build',
          terminalResponse: `> next build

   Creating an optimized production build...
   Compiled successfully

   Route (pages)                              Size
   ┌ ○ /                                      5.2 kB
   ├ ○ /plataforma                            12.4 kB
   ├ ○ /plataforma/comprar                    8.7 kB
   ├ ○ /plataforma/curso                      15.2 kB
   ├ λ /api/chat                              1.2 kB
   └ λ /api/webhooks/lemonsqueezy             0.8 kB

   ✓ Build completed successfully!`,
          aiMessage: 'El build verifica que no hay errores y optimiza el código para producción. Si hay problemas de TypeScript o imports, aparecerán aquí. Un build exitoso significa que estamos listos para deploy.',
          successKeywords: ['npm', 'run', 'build', 'next'],
        },
        {
          id: '6-2',
          title: 'Conectar con Vercel',
          instruction: 'Subimos el proyecto a GitHub y lo conectamos con Vercel.',
          commandToType: 'git push origin main',
          terminalResponse: `Enumerating objects: 42, done.
Counting objects: 100% (42/42), done.
Delta compression using up to 8 threads
Compressing objects: 100% (38/38), done.
Writing objects: 100% (42/42), 156.23 KiB | 2.44 MiB/s, done.
Total 42 (delta 12), reused 0 (delta 0)

To github.com:usuario/mi-plataforma.git
 * [new branch]      main -> main

✓ Pushed to GitHub!
  Now import in vercel.com/new`,
          aiMessage: 'Vercel detecta automáticamente proyectos Next.js de GitHub. Solo tienes que ir a vercel.com/new, seleccionar el repositorio, y Vercel se encarga del resto. El deploy es automático en cada push.',
          successKeywords: ['git', 'push', 'origin', 'main', 'github'],
        },
        {
          id: '6-3',
          title: 'Variables de entorno',
          instruction: 'Configuramos las variables de entorno en Vercel.',
          commandToType: 'vercel env add ANTHROPIC_API_KEY',
          terminalResponse: `Environment Variables for Production:

ANTHROPIC_API_KEY      = sk-ant-api03-***
LEMONSQUEEZY_API_KEY   = eyJ***
LEMONSQUEEZY_STORE_ID  = 12345
LEMONSQUEEZY_WEBHOOK_SECRET = whsec_***
KV_REST_API_URL        = https://***
KV_REST_API_TOKEN      = AYz***

✓ All environment variables configured

⚠️ Remember to add webhook URL in Lemon Squeezy:
   https://tu-dominio.com/api/webhooks/lemonsqueezy`,
          aiMessage: 'Las variables de entorno guardan tus secretos de forma segura. Nunca las subas a Git. En Vercel Dashboard > Settings > Environment Variables puedes añadirlas. También recuerda configurar el webhook en Lemon Squeezy.',
          successKeywords: ['vercel', 'env', 'variables', 'entorno', 'environment'],
        },
        {
          id: '6-4',
          title: 'Dominio personalizado',
          instruction: 'Conectamos tu dominio personalizado al proyecto.',
          commandToType: 'vercel domains add midominio.com',
          terminalResponse: `Adding domain midominio.com...

✓ Domain added successfully!

Configure DNS:
  Type: CNAME
  Name: @
  Value: cname.vercel-dns.com

Or for apex domain:
  Type: A
  Value: 76.76.21.21

SSL certificate will be provisioned automatically.

Your site will be live at:
  https://midominio.com`,
          aiMessage: '¡Felicidades! Tu plataforma está online. Vercel gestiona SSL automáticamente. Ahora tienes tu propia plataforma de cursos interactivos con IA, lista para vender. El siguiente paso es crear el contenido de tus cursos.',
          successKeywords: ['vercel', 'domains', 'dominio', 'add'],
        },
      ],
    },
  ] as Module[],

  // Lección final
  completionLesson: {
    id: 'complete',
    title: '¡Curso Completado!',
    instruction: '🎉 ¡Has completado el curso!',
    commandToType: '',
    terminalResponse: '',
    aiMessage: `¡Enhorabuena! Has aprendido a crear una plataforma completa de cursos interactivos con IA.

Ahora tienes:
✓ Terminal interactivo para ejercicios
✓ Tutor IA con Claude para feedback
✓ Sistema de lecciones y progreso
✓ Pagos con Lemon Squeezy
✓ Deploy en Vercel

Tu código fuente está disponible en el repositorio privado. Clónalo y empieza a crear tus propios cursos.

¡Mucha suerte con tu plataforma!`,
    isComplete: true,
  } as Lesson,
}

// Helpers
export function getTotalLessons(): number {
  return courseData.modules.reduce((total, module) => total + module.lessons.length, 0)
}

export function getLessonByIndex(moduleIndex: number, lessonIndex: number): Lesson | null {
  const module = courseData.modules[moduleIndex]
  if (!module) return null
  return module.lessons[lessonIndex] || null
}
