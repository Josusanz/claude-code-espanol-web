import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

// Guiones de videos para grabar
const VIDEO_SCRIPTS = {
  precurso: [
    {
      id: 'bienvenida-precurso',
      titulo: 'Bienvenida al Precurso',
      duracion: '2-3 min',
      ubicacion: '/curso (inicio)',
      grabado: false,
      guion: `
# Bienvenida al Precurso

## INTRO (30 seg)
"Hola! Soy Josu Sanz y quiero darte la bienvenida al precurso de 'Crea tu Software con IA'.

Si estas viendo esto, es porque has dado un paso importante: has decidido aprender a crear software, aunque no sepas programar."

## EL PROBLEMA (30 seg)
"Hasta hace poco, crear una app o un SaaS requeria años de estudio, miles de horas practicando, y mucha frustracion con errores incomprensibles.

Pero eso ha cambiado. Con herramientas como Claude Code, ahora puedes crear software real describiendo lo que quieres en español."

## QUE VAS A APRENDER (45 seg)
"En este precurso vas a:
- Entender los conceptos basicos que necesitas (sin codigo)
- Instalar las herramientas necesarias paso a paso
- Completar tu primer proyecto real con IA
- Prepararte para las 10 semanas del curso

No necesitas saber programar. Solo necesitas curiosidad y ganas de crear."

## CALL TO ACTION (15 seg)
"Empieza por el primer modulo: 'Programar con IA'. Te veo ahi!"
      `
    },
    {
      id: 'requisitos-instalacion',
      titulo: 'Como Instalar los Requisitos',
      duracion: '8-10 min',
      ubicacion: '/curso/requisitos',
      grabado: false,
      guion: `
# Como Instalar los Requisitos

## INTRO (30 seg)
"En este video vamos a instalar todo lo que necesitas para el curso. Son 5 cosas:
1. Node.js (para ejecutar JavaScript)
2. Una cuenta en GitHub
3. Una cuenta en Vercel
4. Claude Code (la herramienta de IA)
5. Pencil (para diseñar interfaces)

La buena noticia: tu terminal ya la tienes. Es la herramienta que vamos a usar durante todo el curso.

Vamos paso a paso."

## TERMINAL (30 seg)
"Lo primero: tu terminal. Ya la tienes instalada en tu ordenador.

[MOSTRAR PANTALLA]
- En Mac: abre Spotlight (Cmd+Espacio) y escribe 'Terminal'
- En Windows: busca 'Terminal' o 'PowerShell'

Esta es la herramienta principal del curso. Todo lo haremos desde aqui: crear proyectos, ejecutar Claude Code, desplegar tu app.

Nota: hay alternativas como VS Code, Cursor o Antigravity que tambien funcionan con Claude Code. Lo veremos en la primera clase."

## NODE.JS (2 min)
"Ahora Node.js. Esto permite que tu computadora ejecute codigo JavaScript.

[MOSTRAR PANTALLA]
1. Ve a nodejs.org
2. Descarga la version LTS (la de la izquierda)
3. Instala con todas las opciones por defecto
4. Abre la terminal y escribe: node --version
5. Si ves un numero, funciona!"

## GITHUB (1.5 min)
"GitHub es donde guardaras tu codigo. Es como Google Drive pero para proyectos.

[MOSTRAR PANTALLA]
1. Ve a github.com
2. Click en Sign Up
3. Usa tu email personal
4. Verifica tu cuenta

Ya tienes donde guardar tus proyectos."

## VERCEL (1.5 min)
"Vercel es donde publicaras tu app para que todo el mundo la vea.

[MOSTRAR PANTALLA]
1. Ve a vercel.com
2. Click en Sign Up
3. Conecta con tu cuenta de GitHub (mas facil)
4. Listo!

Con Vercel, publicar es un click."

## CLAUDE CODE (2.5 min)
"Por ultimo, Claude Code. Esta es la herramienta de IA que usaremos.

IMPORTANTE: Claude Code NO es una extension de VS Code. Es una herramienta de terminal.

[MOSTRAR PANTALLA]
1. Necesitas Claude Pro ($20/mes) - ve a claude.ai/pro
2. Abre la terminal (Cmd+Espacio > Terminal en Mac)
3. Pega este comando:
   curl -fsSL https://claude.ai/install | sh
4. Espera a que termine
5. Escribe: claude --version
6. Si ves un numero, funciona!

Para Windows es diferente, lo tienes en la pagina de requisitos."

## PENCIL (1.5 min)
"Por ultimo, Pencil. Es una herramienta de diseño visual que se conecta con Claude Code.

[MOSTRAR PANTALLA]
1. Ve a pencil.dev
2. Descarga e instala
3. Pencil se conecta con Claude Code via MCP
4. Claude puede leer y escribir diseños directamente

Lo configuraremos en la Semana 2, pero dejalo instalado."

## CIERRE (30 seg)
"Ya tienes todo instalado! Si algo fallo, no te preocupes - en la pagina de requisitos tienes instrucciones mas detalladas y solucion a errores comunes.

Nos vemos en el siguiente video!"
      `
    },
    {
      id: 'primer-proyecto',
      titulo: 'Tu Primer Proyecto con Claude Code',
      duracion: '8-10 min',
      ubicacion: '/curso/primer-proyecto',
      grabado: false,
      guion: `
# Tu Primer Proyecto con Claude Code

## INTRO (30 seg)
"Llegamos al momento de la verdad. Vamos a crear tu primer proyecto real con Claude Code.

Sera una pagina web sencilla, pero REAL. Algo que podras enseñar y decir: 'Esto lo hice yo'."

## PREPARACION (1 min)
"Antes de empezar:
1. Abre la terminal
2. Crea tu carpeta de trabajo para el curso:
   mkdir ~/curso-ia
   cd ~/curso-ia
3. Ahora crea la carpeta del proyecto:
   mkdir mi-primer-proyecto
   cd mi-primer-proyecto

[MOSTRAR PANTALLA]"

## INICIANDO CLAUDE CODE (1 min)
"Ahora iniciamos Claude Code:
1. Escribe: claude
2. Espera a que cargue
3. Ya puedes hablarle en español!

[MOSTRAR PANTALLA]
Voy a escribir: 'Crea una pagina web personal con mi nombre, una foto, y links a mis redes sociales'"

## VIENDO LA MAGIA (3 min)
"[MOSTRAR CLAUDE TRABAJANDO]

Mira lo que esta haciendo:
- Esta creando archivos HTML
- Añadiendo estilos CSS
- Todo automaticamente

Cuando termine, vamos a ver el resultado..."

## VISUALIZANDO (1.5 min)
"Para ver tu pagina:

[MOSTRAR PANTALLA]
1. Busca el archivo index.html que creo
2. Doble click para abrirlo en el navegador
3. Ahi esta! Tu primera pagina web.

Si quieres cambios, solo pidelos:
'Cambia el color de fondo a azul oscuro'
'Añade un boton para descargar mi CV'"

## ITERANDO (2 min)
"[MOSTRAR CAMBIOS EN VIVO]

Esta es la magia de trabajar con IA:
- No necesitas saber CSS para cambiar colores
- No necesitas saber HTML para añadir secciones
- Solo describes lo que quieres

Vamos a hacer algunos cambios mas..."

## CIERRE (1 min)
"Felicidades! Has creado tu primer proyecto con Claude Code.

Esto que acabas de hacer es exactamente lo que haremos en el curso de 10 semanas, pero con proyectos mas ambiciosos: SaaS completos con bases de datos, login, pagos...

Guarda este proyecto. Es el primero de muchos.

Nos vemos en el curso!"
      `
    }
  ],
  curso: [
    {
      id: 'intro-semana-1',
      titulo: 'Intro Semana 1: LaunchPad',
      duracion: '2-3 min',
      ubicacion: '/curso/semana/1',
      grabado: false,
      guion: `
# Intro Semana 1: LaunchPad

## BIENVENIDA (30 seg)
"Bienvenido a la semana 1 del curso! Esta semana es especial porque vamos a construir algo JUNTOS.

En lugar de empezar cada uno por su lado, vamos a crear un proyecto conjunto: una waitlist profesional."

## QUE VAMOS A HACER (45 seg)
"Una waitlist es una pagina donde la gente se apunta para ser notificada cuando lances algo.

Es perfecta para:
- Validar si tu idea interesa a alguien
- Empezar a construir tu audiencia
- Practicar deploy real

Al final de esta semana tendras una waitlist publicada con tu propio dominio."

## ESTRUCTURA (45 seg)
"La semana tiene 2 dias de clase:
- Dia 1: Repasamos el setup (terminal, Claude Code, Pencil) y la teoria
- Dia 2: Construimos juntos tu primera web a partir de un theme premium

Antes de la clase, revisa la 'Pre-clase'. Ahi tienes el setup tecnico, un selector interactivo para elegir tu theme, y los comandos para clonarlo."

## ENTREGABLE (30 seg)
"Tu entregable esta semana: tu waitlist publicada.

Asegurate de tener terminal + Claude Code + Pencil listos, la carpeta ~/curso-ia creada, y un theme elegido antes de la clase.

Sube el link al canal de Discord de la semana 1. Quiero ver lo que creas!"
      `
    },
    {
      id: 'intro-semana-2',
      titulo: 'Intro Semana 2: Tu Proyecto + UI',
      duracion: '2-3 min',
      ubicacion: '/curso/semana/2',
      grabado: false,
      guion: `
# Intro Semana 2: Tu Proyecto + UI

## INTRO (30 seg)
"Semana 2! Esta semana dejamos el proyecto conjunto y empezamos con TU proyecto.

Es momento de darle forma a esa idea que tienes en la cabeza."

## QUE VAMOS A HACER (45 seg)
"Esta semana nos enfocamos en:
1. Definir tu proyecto (que problema resuelve, para quien)
2. Crear la estructura inicial con Next.js
3. Diseñar la interfaz con Pencil, shadcn/ui y Tailwind

Al final tendras un proyecto con todas las pantallas diseñadas, aunque todavia sin funcionalidad."

## PENCIL + SHADCN/UI (30 seg)
"Esta semana configuramos Pencil con Claude Code. Pencil te deja diseñar visualmente y Claude traduce esos diseños a codigo.

Ademas usamos shadcn/ui, una libreria de componentes: botones, formularios, modales... todo listo para usar.

En la pre-clase te muestro como configurarlo todo."

## ENTREGABLE (30 seg)
"Tu entregable: el repositorio de GitHub con tu proyecto y la UI completa.

No te preocupes si no es perfecta. La iremos mejorando cada semana.

Nos vemos el jueves!"
      `
    },
    {
      id: 'intro-semana-3',
      titulo: 'Intro Semana 3: Base de Datos',
      duracion: '2-3 min',
      ubicacion: '/curso/semana/3',
      grabado: false,
      guion: `
# Intro Semana 3: Base de Datos con Supabase

## INTRO (30 seg)
"Semana 3! Tu app ya tiene cara, ahora le damos cerebro.

Esta semana conectamos Supabase, una base de datos que va a guardar toda la informacion de tu app."

## QUE ES SUPABASE (45 seg)
"Supabase es como Firebase pero mejor:
- Base de datos PostgreSQL (la que usan las grandes empresas)
- Gratis para empezar
- Panel visual para ver tus datos
- Se conecta super facil con Next.js

Es lo que vamos a usar durante todo el curso."

## QUE VAMOS A HACER (45 seg)
"En la clase vamos a:
1. Crear tu proyecto en Supabase
2. Diseñar las tablas que necesitas
3. Conectar tu app con la base de datos
4. Hacer tu primera query (traer datos)

Al final, tu app guardara y mostrara datos reales."

## ENTREGABLE (30 seg)
"Tu entregable: screenshot de tu base de datos funcionando + una pagina que muestre datos de Supabase.

Esta semana es clave. Supabase lo usaremos en todas las semanas siguientes.

Nos vemos el jueves!"
      `
    },
    {
      id: 'intro-semana-4',
      titulo: 'Intro Semana 4: Autenticacion',
      duracion: '2-3 min',
      ubicacion: '/curso/semana/4',
      grabado: false,
      guion: `
# Intro Semana 4: Autenticacion

## INTRO (30 seg)
"Semana 4! Tu app ya guarda datos, pero cualquiera puede verlos.

Esta semana añadimos login: usuarios, contraseñas, sesiones."

## POR QUE IMPORTA (30 seg)
"La autenticacion es lo que separa una demo de un producto real.

Con login puedes:
- Saber quien usa tu app
- Mostrar datos personalizados
- Proteger funciones premium"

## QUE VAMOS A HACER (45 seg)
"Supabase tiene auth integrado, asi que es bastante facil:
1. Configurar Supabase Auth
2. Crear paginas de login/registro
3. Proteger rutas (solo usuarios logueados)
4. Mostrar datos del usuario logueado

Usaremos login con email, pero tambien veremos Google/GitHub."

## ENTREGABLE (30 seg)
"Tu entregable: tu app con login funcionando. Un usuario debe poder registrarse, entrar, y ver su perfil.

Esta es una semana importante. Concentrate en la pre-clase.

Nos vemos el jueves!"
      `
    },
    {
      id: 'intro-semana-5',
      titulo: 'Intro Semana 5: APIs y Backend',
      duracion: '2-3 min',
      ubicacion: '/curso/semana/5',
      grabado: false,
      guion: `
# Intro Semana 5: APIs y Backend

## INTRO (30 seg)
"Semana 5! Ya tienes frontend, base de datos, y login.

Ahora conectamos todo con APIs: el puente entre tu interfaz y tus datos."

## QUE ES UNA API (45 seg)
"Una API es como un camarero en un restaurante:
- Tu (el frontend) pides algo
- El camarero (API) va a la cocina (backend/base de datos)
- Te trae lo que pediste

En Next.js, las APIs se crean en la carpeta /api. Es muy facil."

## QUE VAMOS A HACER (45 seg)
"Esta semana:
1. Crear endpoints API para tu app
2. Conectar formularios con la base de datos
3. Manejar errores correctamente
4. Validar datos antes de guardarlos

Al final, tu app tendra un backend completo."

## ENTREGABLE (30 seg)
"Tu entregable: al menos 3 endpoints API funcionando (crear, leer, actualizar o borrar datos).

Ya estas a mitad del curso. Tu app empieza a verse real!

Nos vemos el jueves!"
      `
    },
    {
      id: 'intro-semana-6',
      titulo: 'Intro Semana 6: Integracion con Claude',
      duracion: '2-3 min',
      ubicacion: '/curso/semana/6',
      grabado: false,
      guion: `
# Intro Semana 6: Integracion con Claude

## INTRO (30 seg)
"Semana 6! Esta es mi favorita.

Vamos a añadir inteligencia artificial a tu app usando la API de Claude."

## POR QUE IA (45 seg)
"Añadir IA a tu SaaS es lo que lo hace especial en 2026:
- Chatbots que responden preguntas
- Generacion de contenido automatica
- Analisis inteligente de datos
- Asistentes personalizados

Y lo mejor: es mas facil de lo que parece."

## QUE VAMOS A HACER (45 seg)
"Esta semana:
1. Obtener tu API key de Anthropic
2. Conectar Claude a tu app
3. Crear un chat o asistente
4. Streaming de respuestas (que se vea escribiendo)

Al final, tu app tendra IA integrada."

## ENTREGABLE (30 seg)
"Tu entregable: una funcionalidad con IA en tu app. Puede ser un chat, un generador de texto, lo que tenga sentido para tu proyecto.

Esta semana es la que mas impresiona a la gente. Aprovechala!

Nos vemos el jueves!"
      `
    },
    {
      id: 'intro-semana-7',
      titulo: 'Intro Semana 7: Pagos con Stripe',
      duracion: '2-3 min',
      ubicacion: '/curso/semana/7',
      grabado: false,
      guion: `
# Intro Semana 7: Pagos con Stripe

## INTRO (30 seg)
"Semana 7! Llegamos a la parte del dinero.

Esta semana añadimos pagos con Stripe para que puedas cobrar por tu SaaS."

## POR QUE STRIPE (30 seg)
"Stripe es el estandar para pagos online:
- Lo usan empresas como Shopify, Amazon, Google
- Maneja todo: tarjetas, facturas, suscripciones
- Muy buena documentacion
- Funciona en todo el mundo"

## QUE VAMOS A HACER (1 min)
"Esta semana:
1. Crear cuenta de Stripe
2. Configurar productos y precios
3. Integrar checkout en tu app
4. Manejar webhooks (Stripe te avisa cuando alguien paga)
5. Dar acceso premium a usuarios que pagan

Al final, podras cobrar por tu SaaS."

## ENTREGABLE (30 seg)
"Tu entregable: un flujo de pago funcionando. Un usuario puede pagar y obtener acceso a algo premium.

Usaremos el modo test de Stripe, no necesitas dinero real.

Nos vemos el jueves!"
      `
    },
    {
      id: 'intro-semana-8',
      titulo: 'Intro Semana 8: Testing y QA',
      duracion: '2-3 min',
      ubicacion: '/curso/semana/8',
      grabado: false,
      guion: `
# Intro Semana 8: Testing y QA

## INTRO (30 seg)
"Semana 8! Tu app funciona, pero... como sabes que no tiene bugs?

Esta semana aprendemos a probar nuestra app sistematicamente."

## POR QUE TESTING (45 seg)
"Los tests son tu red de seguridad:
- Detectan bugs antes que tus usuarios
- Te dan confianza para hacer cambios
- Documentan como funciona tu codigo

No necesitas testear todo, pero si lo critico."

## QUE VAMOS A HACER (45 seg)
"Esta semana:
1. Tests basicos con Vitest
2. Probar componentes de React
3. Probar APIs
4. Testing manual: como encontrar bugs

Al final, tendras tests para las partes criticas de tu app."

## ENTREGABLE (30 seg)
"Tu entregable: al menos 5 tests funcionando para tu app.

Esta semana es menos glamurosa pero muy importante para un producto profesional.

Nos vemos el jueves!"
      `
    },
    {
      id: 'intro-semana-9',
      titulo: 'Intro Semana 9: Deploy y DevOps',
      duracion: '2-3 min',
      ubicacion: '/curso/semana/9',
      grabado: false,
      guion: `
# Intro Semana 9: Deploy y DevOps

## INTRO (30 seg)
"Semana 9! Tu app esta lista para el mundo.

Esta semana nos aseguramos de que funcione perfectamente en produccion."

## QUE ES DEVOPS (45 seg)
"DevOps es todo lo que rodea al desarrollo:
- Deploy automatico
- Monitoreo de errores
- Variables de entorno
- Dominios personalizados
- Performance y velocidad"

## QUE VAMOS A HACER (45 seg)
"Esta semana:
1. Configurar Vercel correctamente
2. Variables de entorno para produccion
3. Dominio personalizado
4. Monitoreo con Vercel Analytics
5. Optimizacion de performance

Al final, tu app estara lista para trafico real."

## ENTREGABLE (30 seg)
"Tu entregable: tu app desplegada con dominio propio y analytics configurado.

Ya casi llegamos! La proxima semana es el lanzamiento.

Nos vemos el jueves!"
      `
    },
    {
      id: 'intro-semana-10',
      titulo: 'Intro Semana 10: Lanzamiento',
      duracion: '2-3 min',
      ubicacion: '/curso/semana/10',
      grabado: false,
      guion: `
# Intro Semana 10: Lanzamiento y Marketing

## INTRO (30 seg)
"Semana 10! La ultima semana. El gran final.

Tu app esta lista. Ahora toca que el mundo la conozca."

## QUE VAMOS A HACER (1 min)
"Esta semana:
1. Preparar tu landing page de lanzamiento
2. Escribir copy que venda
3. Estrategia de lanzamiento en redes
4. Product Hunt y otras plataformas
5. Primeros usuarios y feedback

Al final, habras lanzado tu SaaS al mundo."

## EL FUTURO (45 seg)
"Esto no es el fin, es el principio.

Tienes un SaaS real, funcionando, que puedes:
- Seguir mejorando
- Monetizar
- Añadir a tu portfolio
- Usar como base para el siguiente proyecto

Y tienes una comunidad de compañeros que estan en lo mismo."

## CIERRE (30 seg)
"Gracias por estas 10 semanas. Ha sido un viaje increible.

Estoy muy orgulloso de lo que has construido. Ahora sal ahi y enseñaselo al mundo!

Nos vemos en el directo del jueves para el gran lanzamiento."
      `
    }
  ]
}

export default function AdminVideosPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text.trim())
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const totalVideos = VIDEO_SCRIPTS.precurso.length + VIDEO_SCRIPTS.curso.length
  const grabados = [...VIDEO_SCRIPTS.precurso, ...VIDEO_SCRIPTS.curso].filter(v => v.grabado).length

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <Head>
        <title>Guiones de Videos | Admin</title>
      </Head>

      <div style={{ marginBottom: '24px' }}>
        <Link href="/josu-admin/curso" style={{ color: '#6366f1', textDecoration: 'none' }}>
          ← Volver al panel
        </Link>
      </div>

      <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Guiones de Videos</h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>
        {grabados}/{totalVideos} videos grabados
      </p>

      {/* Precurso Videos */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📚</span> Videos del Precurso ({VIDEO_SCRIPTS.precurso.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {VIDEO_SCRIPTS.precurso.map((video) => (
            <div key={video.id} style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              borderLeft: video.grabado ? '4px solid #22c55e' : '4px solid #f59e0b'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                    {video.grabado ? '✅' : '⏳'} {video.titulo}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '14px' }}>
                    {video.duracion} • {video.ubicacion}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(video.guion, video.id)}
                  style={{
                    padding: '8px 16px',
                    background: copiedId === video.id ? '#22c55e' : '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {copiedId === video.id ? 'Copiado!' : 'Copiar guion'}
                </button>
              </div>

              <details>
                <summary style={{ cursor: 'pointer', color: '#6366f1', fontWeight: 500 }}>
                  Ver guion completo
                </summary>
                <pre style={{
                  background: '#1e293b',
                  color: '#e2e8f0',
                  padding: '16px',
                  borderRadius: '8px',
                  marginTop: '12px',
                  whiteSpace: 'pre-wrap',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  maxHeight: '400px',
                  overflow: 'auto'
                }}>
                  {video.guion.trim()}
                </pre>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* Curso Videos */}
      <section>
        <h2 style={{ fontSize: '22px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🎓</span> Videos del Curso - 10 Semanas ({VIDEO_SCRIPTS.curso.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {VIDEO_SCRIPTS.curso.map((video) => (
            <div key={video.id} style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              borderLeft: video.grabado ? '4px solid #22c55e' : '4px solid #f59e0b'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                    {video.grabado ? '✅' : '⏳'} {video.titulo}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '14px' }}>
                    {video.duracion} • {video.ubicacion}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(video.guion, video.id)}
                  style={{
                    padding: '8px 16px',
                    background: copiedId === video.id ? '#22c55e' : '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {copiedId === video.id ? 'Copiado!' : 'Copiar guion'}
                </button>
              </div>

              <details>
                <summary style={{ cursor: 'pointer', color: '#6366f1', fontWeight: 500 }}>
                  Ver guion completo
                </summary>
                <pre style={{
                  background: '#1e293b',
                  color: '#e2e8f0',
                  padding: '16px',
                  borderRadius: '8px',
                  marginTop: '12px',
                  whiteSpace: 'pre-wrap',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  maxHeight: '400px',
                  overflow: 'auto'
                }}>
                  {video.guion.trim()}
                </pre>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section style={{ marginTop: '48px', padding: '20px', background: '#fef3c7', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '12px' }}>💡 Tips para grabar</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>Graba en un lugar tranquilo sin eco</li>
          <li>Usa luz natural o una lampara frontal</li>
          <li>Mira a la camara, no a la pantalla</li>
          <li>Habla despacio y claro</li>
          <li>Los videos cortos (2-3 min) funcionan mejor</li>
          <li>Puedes usar Loom o grabar directo en YouTube</li>
        </ul>
      </section>
    </div>
  )
}
