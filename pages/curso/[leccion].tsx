import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'

interface LessonData {
  id: string
  number: number
  title: string
  description: string
  duration: string
  content: string
  keyTakeaway: string
  nextLesson: string | null
  prevLesson: string | null
}

const lessonsData: Record<string, LessonData> = {
  'leccion-1': {
    id: 'leccion-1',
    number: 1,
    title: '¿Qué es Claude Code?',
    description: 'Entiende qué hace Claude Code y por qué es diferente',
    duration: '10 min',
    content: `
## ¿Qué hace especial a Claude Code?

Claude Code es como tener un **asistente superinteligente que vive en tu terminal** (esa ventana con texto que usan los programadores).

### La diferencia clave con ChatGPT o Claude web:

| ChatGPT/Claude Web | Claude Code |
|-------------------|-------------|
| Solo hablas con él | **Ve tus archivos reales** |
| Copia y pega código | **Ejecuta comandos por ti** |
| Simula resultados | **Crea cosas de verdad** |

Es como la diferencia entre hablar con alguien por teléfono vs tenerlo sentado a tu lado mirando tu pantalla.

### ¿Qué puede hacer?

- **Leer** cualquier archivo de tu ordenador
- **Crear** documentos, código, páginas web
- **Modificar** archivos existentes
- **Ejecutar** comandos en la terminal
- **Analizar** proyectos completos

### Ejemplo práctico

Imagina que le dices:

> "Crea una página web sencilla que diga 'Hola Mundo'"

Claude Code no te dirá cómo hacerlo. **Lo hará**. Creará un archivo HTML real en tu ordenador que puedes abrir en el navegador.

### ¿Qué necesitas para usarlo?

1. **Claude Pro** ($20/mes) - La suscripción a Claude de Anthropic
2. **Claude Code instalado** - Una aplicación que conecta Claude con tu ordenador
3. **Una terminal** - Ya viene con tu Mac, Windows o Linux
    `,
    keyTakeaway: 'Claude Code no simula, crea cosas reales en tu ordenador. Tú describes qué quieres, él se encarga de los detalles técnicos.',
    nextLesson: 'leccion-2',
    prevLesson: null
  },
  'leccion-2': {
    id: 'leccion-2',
    number: 2,
    title: 'Explorando archivos',
    description: 'Aprende a navegar y explorar con el símbolo @',
    duration: '15 min',
    content: `
## El símbolo @ mágico

En Claude Code, el símbolo **@** es tu mejor amigo. Cuando escribes \`@archivo.txt\`, le estás diciendo a Claude:

> "Oye, quiero que mires este archivo"

### Tres formas de usar @

| Comando | Qué hace |
|---------|----------|
| \`@archivo.txt\` | Mira este archivo específico |
| \`@carpeta/\` | Explora esta carpeta |
| \`@archivo.txt "resúmelo"\` | Haz algo con este archivo |

### Ejemplos prácticos

**Ver un archivo:**
\`\`\`
@notas.md
\`\`\`
Claude leerá y mostrará el contenido del archivo.

**Explorar una carpeta:**
\`\`\`
@documentos/
\`\`\`
Claude listará todo lo que hay dentro.

**Pedir una acción:**
\`\`\`
@informe.pdf "hazme un resumen de los puntos principales"
\`\`\`
Claude leerá el PDF y te dará el resumen.

### Drag & Drop

También puedes **arrastrar archivos** directamente a la terminal. Claude los reconocerá automáticamente.

Esto es útil cuando:
- No recuerdas la ruta exacta
- El nombre del archivo es muy largo
- Quieres añadir varios archivos a la vez

### Navegación relativa vs absoluta

- **Relativa:** \`@carpeta/archivo.txt\` (desde donde estás)
- **Absoluta:** \`@/Users/tu-nombre/Documentos/archivo.txt\` (ruta completa)

Para empezar, la relativa es más fácil. Solo asegúrate de estar en la carpeta correcta.
    `,
    keyTakeaway: 'Con @ puedes apuntar a cualquier archivo o carpeta. Es como señalar con el dedo y decir "mira esto".',
    nextLesson: 'leccion-3',
    prevLesson: 'leccion-1'
  },
  'leccion-3': {
    id: 'leccion-3',
    number: 3,
    title: 'Creando cosas reales',
    description: 'Crea archivos, documentos y contenido real',
    duration: '15 min',
    content: `
## El poder de crear

Hasta ahora hemos explorado. Ahora viene lo bueno: Claude puede **crear archivos reales** que puedes usar después.

### Qué puede crear Claude

- **Documentos** - Notas, informes, listas
- **Código** - Scripts, páginas web, aplicaciones
- **Datos** - CSVs, JSON, hojas de cálculo
- **Configuraciones** - Archivos de sistema

### Tu primera creación

Prueba a decirle:

> "Crea un archivo llamado 'ideas.md' con 5 ideas de negocios online"

Claude creará el archivo en tu carpeta actual. **Es real**. Puedes abrirlo con cualquier editor.

### Modificar archivos

¿Quieres cambiar algo? Solo dilo:

> "Añade una sexta idea sobre inteligencia artificial"

O más específico:

> "Cambia el título del archivo a '10 Ideas de Negocio'"

### Ejemplo completo

1. **Crear:** "Crea un documento con mis tareas para hoy"
2. **Claude crea** \`tareas-hoy.md\` con una plantilla
3. **Modificar:** "Añade 'Llamar al dentista' a la lista"
4. **Claude actualiza** el archivo
5. **Verificar:** "Muéstrame cómo quedó el archivo"

### Formatos útiles

| Para... | Usa formato... | Extensión |
|---------|---------------|-----------|
| Notas y documentos | Markdown | .md |
| Datos tabulares | CSV | .csv |
| Páginas web | HTML | .html |
| Código Python | Python | .py |
| Configuraciones | JSON/YAML | .json/.yaml |

### Advertencia importante

⚠️ **Con gran poder viene gran responsabilidad**

Claude puede modificar archivos existentes. Siempre:
- Confirma antes de modificar archivos importantes
- Trabaja en copias cuando sea posible
- Revisa los cambios antes de aceptarlos
    `,
    keyTakeaway: 'Claude Code no simula crear archivos. Los crea DE VERDAD. Todo lo que ves existe en tu ordenador.',
    nextLesson: 'leccion-4',
    prevLesson: 'leccion-2'
  },
  'leccion-4': {
    id: 'leccion-4',
    number: 4,
    title: 'Visualizar creaciones',
    description: 'Aprende a ver y previsualizar lo que creas',
    duration: '10 min',
    content: `
## Ver lo que creas

Crear archivos está bien, pero ¿cómo los ves? Aquí aprenderás a visualizar tus creaciones.

### Comando open (Mac/Linux)

El comando más útil:

\`\`\`
open archivo.html
\`\`\`

Esto abre el archivo con la aplicación predeterminada:
- **.html** → Navegador
- **.pdf** → Preview/Lector PDF
- **.md** → Editor de texto
- **.png/.jpg** → Visor de imágenes

### En Windows

Usa \`start\` en lugar de \`open\`:

\`\`\`
start archivo.html
\`\`\`

### Previsualización en terminal

Para ver contenido rápido sin abrir otra app:

> "Muéstrame las primeras 20 líneas de archivo.txt"

Claude usará comandos como \`head\` o \`cat\` para mostrarte el contenido directamente.

### Servidor local para webs

Si creas una página web con múltiples archivos:

> "Levanta un servidor local para ver mi página web"

Claude ejecutará algo como:
\`\`\`
python -m http.server 8000
\`\`\`

Y podrás ver tu web en \`http://localhost:8000\`

### Flujo de trabajo recomendado

1. **Crea** el archivo con Claude
2. **Verifica** el contenido: "Muéstrame cómo quedó"
3. **Abre** si necesitas verlo: "Abre el archivo en el navegador"
4. **Modifica** si hace falta: "Cambia X por Y"
5. **Repite** hasta que esté perfecto
    `,
    keyTakeaway: 'Usa "open" (Mac/Linux) o "start" (Windows) para abrir archivos con su aplicación predeterminada.',
    nextLesson: 'leccion-5',
    prevLesson: 'leccion-3'
  },
  'leccion-5': {
    id: 'leccion-5',
    number: 5,
    title: 'Comandos slash',
    description: 'Domina los atajos y comandos especiales',
    duration: '15 min',
    content: `
## Los comandos slash

Los comandos que empiezan con **/** son atajos especiales en Claude Code.

### Comandos básicos

| Comando | Qué hace |
|---------|----------|
| \`/help\` | Muestra ayuda y comandos disponibles |
| \`/clear\` | Limpia la conversación |
| \`/compact\` | Compacta el historial (ahorra tokens) |
| \`/status\` | Muestra estado de tareas en progreso |

### Comandos de memoria

| Comando | Qué hace |
|---------|----------|
| \`/memory\` | Ver qué recuerda Claude del proyecto |
| \`/init\` | Crear archivo CLAUDE.md inicial |

### Comandos personalizados

Lo más potente: puedes crear **tus propios comandos**.

Por ejemplo, si creas un archivo en \`.claude/commands/analiza.md\`:

\`\`\`markdown
Analiza el código del proyecto y dame:
1. Resumen de la estructura
2. Problemas potenciales
3. Sugerencias de mejora
\`\`\`

Ahora puedes escribir \`/analiza\` y Claude ejecutará esas instrucciones.

### Crear tu primer comando personalizado

1. Pide a Claude: "Crea un comando /resumen que me haga un resumen del día"

2. Claude creará:
   \`\`\`
   .claude/commands/resumen.md
   \`\`\`

3. Ahora puedes usar \`/resumen\` cuando quieras

### Ideas de comandos útiles

- \`/tareas\` - Lista de tareas pendientes del proyecto
- \`/deploy\` - Pasos para publicar
- \`/test\` - Ejecutar pruebas
- \`/review\` - Revisar código reciente
- \`/docs\` - Generar documentación
    `,
    keyTakeaway: 'Los comandos / son atajos. Puedes crear los tuyos propios para automatizar tareas repetitivas.',
    nextLesson: 'leccion-6',
    prevLesson: 'leccion-4'
  },
  'leccion-6': {
    id: 'leccion-6',
    number: 6,
    title: 'Agentes paralelos',
    description: 'Ejecuta múltiples tareas a la vez',
    duration: '15 min',
    content: `
## Trabajar en paralelo

Claude Code puede ejecutar **varias tareas al mismo tiempo**. Esto acelera mucho el trabajo.

### ¿Cuándo usar agentes paralelos?

- Crear varios archivos a la vez
- Buscar en múltiples carpetas
- Ejecutar varios comandos independientes
- Analizar diferentes partes de un proyecto

### Cómo activarlo

Simplemente pide tareas que puedan hacerse en paralelo:

> "Crea tres archivos: home.html, about.html y contact.html con contenido básico para cada uno"

Claude detectará que puede crear los tres archivos simultáneamente.

### Ejemplo práctico

**Sin paralelismo:**
1. Crea home.html ⏳
2. Espera...
3. Crea about.html ⏳
4. Espera...
5. Crea contact.html ⏳

**Con paralelismo:**
1. Crea home.html ⏳
   Crea about.html ⏳
   Crea contact.html ⏳
2. ¡Todo listo!

### Indicadores visuales

Cuando Claude trabaja en paralelo, verás:
- Múltiples spinners o indicadores de progreso
- Resultados que aparecen "de golpe"
- Mensajes indicando trabajo paralelo

### Limitaciones

No todo puede ser paralelo:
- Tareas que dependen unas de otras
- Modificar el mismo archivo
- Comandos que necesitan orden específico

Claude es inteligente y decide automáticamente qué puede paralelizar.

### Consejo pro

Para forzar trabajo paralelo, sé explícito:

> "Simultáneamente, haz estas tres cosas: ..."

O agrupa tareas independientes en una sola petición.
    `,
    keyTakeaway: 'Claude puede hacer varias cosas a la vez. Agrupa tareas independientes para trabajar más rápido.',
    nextLesson: 'leccion-7',
    prevLesson: 'leccion-5'
  },
  'leccion-7': {
    id: 'leccion-7',
    number: 7,
    title: 'Sub-agentes',
    description: 'Crea agentes especializados para tareas específicas',
    duration: '20 min',
    content: `
## Sub-agentes especializados

Los sub-agentes son como "mini-Claudes" especializados en tareas específicas.

### ¿Para qué sirven?

- **Dividir tareas complejas** en partes manejables
- **Especializar** en dominios específicos
- **Mantener contexto** separado por tarea

### Cómo funcionan

Cuando le das una tarea grande a Claude, puede decidir:

1. Crear un sub-agente para investigar
2. Crear otro para escribir código
3. Crear otro para probar
4. Combinar los resultados

### Ejemplo: Crear una web completa

> "Crea una página web de portfolio con sección de proyectos, sobre mí y contacto"

Claude podría:
- **Sub-agente 1:** Diseñar la estructura HTML
- **Sub-agente 2:** Crear los estilos CSS
- **Sub-agente 3:** Escribir el contenido
- **Agente principal:** Ensamblar todo

### Comandos personalizados como sub-agentes

Puedes crear comandos que actúen como agentes especializados:

**/.claude/commands/diseñador.md:**
\`\`\`
Actúa como diseñador web. Tu trabajo es:
- Proponer colores y tipografías
- Sugerir layouts
- Crear mockups en ASCII
\`\`\`

**/.claude/commands/copywriter.md:**
\`\`\`
Actúa como copywriter. Tu trabajo es:
- Escribir textos persuasivos
- Crear CTAs efectivos
- Revisar tono y voz
\`\`\`

### Flujo de trabajo avanzado

1. \`/diseñador\` → Obtener propuesta visual
2. \`/copywriter\` → Obtener textos
3. "Ahora combina el diseño con los textos y crea la página"

### Cuándo usar sub-agentes

✅ Proyectos grandes con múltiples partes
✅ Tareas que requieren diferentes "personalidades"
✅ Cuando quieres revisar partes por separado

❌ Tareas simples de un solo paso
❌ Cuando necesitas coherencia total
    `,
    keyTakeaway: 'Los sub-agentes son especialistas. Úsalos para dividir tareas complejas y obtener mejores resultados.',
    nextLesson: 'leccion-8',
    prevLesson: 'leccion-6'
  },
  'leccion-8': {
    id: 'leccion-8',
    number: 8,
    title: 'Memoria del proyecto',
    description: 'Configura CLAUDE.md para que Claude recuerde contexto',
    duration: '15 min',
    content: `
## CLAUDE.md: La memoria de Claude

**CLAUDE.md** es un archivo especial que Claude lee automáticamente al iniciar. Es la "memoria" del proyecto.

### ¿Por qué lo necesitas?

Sin CLAUDE.md, cada vez que inicias Claude:
- No sabe qué es tu proyecto
- No conoce tus preferencias
- No recuerda decisiones anteriores

Con CLAUDE.md:
- Entiende el contexto inmediatamente
- Sigue tus convenciones
- Mantiene coherencia

### Crear tu CLAUDE.md

Pide a Claude:

> "Crea un archivo CLAUDE.md para este proyecto"

O usa el comando:

\`\`\`
/init
\`\`\`

### Estructura recomendada

\`\`\`markdown
# Proyecto: Mi Aplicación

## Descripción
Aplicación web para gestionar tareas personales.

## Stack técnico
- Frontend: React
- Backend: Node.js
- Base de datos: PostgreSQL

## Convenciones
- Usar TypeScript siempre
- Componentes en PascalCase
- Funciones en camelCase
- Commits en español

## Archivos importantes
- /src/index.ts - Punto de entrada
- /config/ - Configuraciones
- /docs/ - Documentación

## Comandos útiles
- npm run dev - Desarrollo
- npm run build - Producción
- npm test - Pruebas
\`\`\`

### Qué incluir

✅ **Incluye:**
- Descripción del proyecto
- Tecnologías usadas
- Convenciones de código
- Estructura de carpetas
- Comandos frecuentes

❌ **No incluyas:**
- Secretos o contraseñas
- Información sensible
- Cosas que cambian mucho

### Actualizar la memoria

Cuando algo cambie:

> "Actualiza CLAUDE.md con la nueva estructura de carpetas"

Claude modificará el archivo para reflejar los cambios.
    `,
    keyTakeaway: 'CLAUDE.md es la memoria del proyecto. Mantenerlo actualizado hace que Claude sea más útil.',
    nextLesson: 'leccion-9',
    prevLesson: 'leccion-7'
  },
  'leccion-9': {
    id: 'leccion-9',
    number: 9,
    title: 'Próximos pasos',
    description: 'Qué hacer después del curso y recursos avanzados',
    duration: '10 min',
    content: `
## ¡Felicidades!

Has completado el curso de fundamentos de Claude Code. Ahora sabes:

- ✅ Qué es Claude Code y cómo funciona
- ✅ Navegar y explorar archivos con @
- ✅ Crear y modificar contenido real
- ✅ Visualizar tus creaciones
- ✅ Usar comandos slash
- ✅ Trabajar con agentes paralelos
- ✅ Crear sub-agentes especializados
- ✅ Configurar la memoria del proyecto

## ¿Qué hacer ahora?

### 1. Practica con proyectos reales

Ideas para empezar:
- **Blog personal** - Crea una web con varias páginas
- **Organizador** - Sistema de notas y tareas
- **Portfolio** - Muestra tus trabajos
- **Automatizaciones** - Scripts para tareas repetitivas

### 2. Explora funciones avanzadas

- **MCP (Model Context Protocol)** - Conectar con APIs externas
- **Hooks** - Automatizar acciones
- **Integración con editores** - VSCode, Cursor, etc.

### 3. Únete a la comunidad

- [Documentación oficial de Claude](https://docs.anthropic.com)
- [Discord de Anthropic](https://discord.gg/anthropic)
- [GitHub de Claude Code](https://github.com/anthropics/claude-code)

## Recursos adicionales

### Guía rápida de comandos

| Acción | Cómo hacerlo |
|--------|--------------|
| Ver archivo | \`@archivo.txt\` |
| Crear archivo | "Crea archivo.md con..." |
| Modificar | "Cambia X por Y en archivo" |
| Abrir | "Abre archivo en navegador" |
| Comando custom | Crear en \`.claude/commands/\` |

### Plantillas útiles

Pide a Claude que te cree plantillas para:
- Landing pages
- Documentación técnica
- Scripts de automatización
- Emails profesionales

## Curso Premium

¿Quieres aprender a **crear tus propios cursos interactivos** como este?

El **Course Builder** te enseña:
- Arquitectura de comandos slash
- Sistema de progreso
- Monetización con LemonSqueezy
- Distribución profesional

[Ver Course Builder →](/premium)

---

**¡Gracias por completar el curso!**

Cualquier duda, el mejor lugar para practicar es con Claude Code directamente. Experimenta, rompe cosas, aprende.

*- Josu Sanz*
    `,
    keyTakeaway: 'La mejor forma de aprender es practicando. Empieza un proyecto real hoy mismo.',
    nextLesson: null,
    prevLesson: 'leccion-8'
  }
}

interface Props {
  lesson: LessonData
}

export default function LeccionPage({ lesson }: Props) {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; progress?: { completedLessons: string[] } } | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)
  const [marking, setMarking] = useState(false)

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          router.push('/acceso')
        } else {
          setUser(data.user)
        }
        setLoading(false)
      })
      .catch(() => {
        router.push('/acceso')
      })

    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(savedTheme === 'dark' || (!savedTheme && prefersDark))
  }, [router])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const isCompleted = user?.progress?.completedLessons?.includes(lesson.id) || false

  const markComplete = async () => {
    if (isCompleted || marking) return
    setMarking(true)

    try {
      await fetch('/api/auth/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: lesson.id })
      })

      // Update local state
      setUser(prev => prev ? {
        ...prev,
        progress: {
          ...prev.progress,
          completedLessons: [...(prev.progress?.completedLessons || []), lesson.id]
        }
      } : null)
    } catch (error) {
      console.error('Error marking complete:', error)
    }

    setMarking(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Lección {lesson.number}: {lesson.title} | Claude Code en Español</title>
        <meta name="description" content={lesson.description} />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/curso" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Volver al curso</span>
            </Link>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500 dark:text-slate-400">Lección {lesson.number}/9</span>
              {isCompleted && (
                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check</span>
                  Completada
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-3xl mx-auto px-4 py-8">
          {/* Lesson Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm mb-2">
              <span className="material-symbols-outlined text-lg">school</span>
              <span>Lección {lesson.number}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 dark:text-slate-400">{lesson.duration} de lectura</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">
              {lesson.title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {lesson.description}
            </p>
          </div>

          {/* Lesson Content */}
          <article className="prose prose-slate dark:prose-invert max-w-none mb-12
            prose-headings:text-slate-800 dark:prose-headings:text-white
            prose-p:text-slate-600 dark:prose-p:text-slate-300
            prose-strong:text-slate-800 dark:prose-strong:text-white
            prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-slate-800 dark:prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700
            prose-table:text-sm
            prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-th:px-4 prose-th:py-2
            prose-td:px-4 prose-td:py-2 prose-td:border-t prose-td:border-slate-200 dark:prose-td:border-slate-700
            prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-900/20 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            prose-li:text-slate-600 dark:prose-li:text-slate-300"
            dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(lesson.content) }}
          />

          {/* Key Takeaway */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-2xl">lightbulb</span>
              <div>
                <p className="font-semibold text-indigo-800 dark:text-indigo-200 mb-1">Concepto clave</p>
                <p className="text-indigo-700 dark:text-indigo-300">{lesson.keyTakeaway}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
            {lesson.prevLesson ? (
              <Link
                href={`/curso/${lesson.prevLesson}`}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Lección anterior</span>
              </Link>
            ) : (
              <div />
            )}

            {!isCompleted && (
              <button
                onClick={markComplete}
                disabled={marking}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <span className="material-symbols-outlined">check_circle</span>
                {marking ? 'Guardando...' : 'Marcar como completada'}
              </button>
            )}

            {lesson.nextLesson ? (
              <Link
                href={`/curso/${lesson.nextLesson}`}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <span>Siguiente lección</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            ) : (
              <Link
                href="/curso"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <span>Volver al curso</span>
                <span className="material-symbols-outlined">home</span>
              </Link>
            )}
          </div>
        </main>
      </div>

      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
    </>
  )
}

// Simple markdown to HTML conversion
function convertMarkdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Tables
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter(c => c.trim())
      if (cells.every(c => /^[-:]+$/.test(c.trim()))) {
        return ''
      }
      const isHeader = !match.includes('---')
      const tag = isHeader ? 'td' : 'td'
      return `<tr>${cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('')}</tr>`
    })
    // Wrap tables
    .replace(/(<tr>.*<\/tr>\n?)+/g, '<table><tbody>$&</tbody></table>')
    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote><p>$1</p></blockquote>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // Numbered lists
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Line breaks
    .replace(/\n/g, '<br>')
    // Wrap in paragraph
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match
      return match
    })
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(lessonsData).map(leccion => ({
    params: { leccion }
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const leccion = params?.leccion as string
  const lesson = lessonsData[leccion]

  if (!lesson) {
    return { notFound: true }
  }

  return { props: { lesson } }
}
