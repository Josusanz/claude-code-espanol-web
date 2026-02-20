import Head from 'next/head'
import Link from 'next/link'
import CursoEmailGate from '../../components/CursoEmailGate'
import { usePrecursoProgress } from '../../lib/precurso-data'

// Componente para mostrar screenshots
const Screenshot = ({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) => (
  <div style={{
    background: '#f1f5f9',
    borderRadius: '12px',
    padding: '12px',
    marginTop: '16px',
    marginBottom: '8px'
  }}>
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        borderRadius: '8px',
        border: '1px solid rgba(0,0,0,0.06)'
      }}
    />
    {caption && (
      <p style={{
        margin: '10px 0 0',
        fontSize: '12px',
        color: '#94a3b8',
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        {caption}
      </p>
    )}
  </div>
)

// Screenshots para ilustrar conceptos
const SCREENSHOTS = {
  frontend: '/images/precurso/qualifyform-frontend.png',
  terminal: '/images/precurso/terminal.png',
  vscode: '/images/precurso/vscode-example.png',
  github: '/images/precurso/github-repo.png',
  vercel: '/images/precurso/vercel-deploy.png',
  nodejs: '/images/precurso/nodejs-example.png',
}

// Diagrama visual Frontend vs Backend
const FrontendBackendDiagram = () => (
  <div style={{
    background: '#f1f5f9',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }}>
    {/* Usuario */}
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '40px', marginBottom: '8px' }}>👤</div>
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Usuario</div>
    </div>

    {/* Flecha */}
    <div style={{ fontSize: '24px', color: '#94a3b8' }}>→</div>

    {/* Frontend */}
    <div style={{
      background: '#6366f1',
      color: 'white',
      padding: '16px 24px',
      borderRadius: '12px',
      textAlign: 'center',
      minWidth: '120px'
    }}>
      <div style={{ fontSize: '24px', marginBottom: '4px' }}>🖥️</div>
      <div style={{ fontWeight: 700, fontSize: '14px' }}>FRONTEND</div>
      <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>Lo que ves</div>
    </div>

    {/* Flecha doble */}
    <div style={{ fontSize: '24px', color: '#94a3b8' }}>⇄</div>

    {/* Backend */}
    <div style={{
      background: '#22c55e',
      color: 'white',
      padding: '16px 24px',
      borderRadius: '12px',
      textAlign: 'center',
      minWidth: '120px'
    }}>
      <div style={{ fontSize: '24px', marginBottom: '4px' }}>⚙️</div>
      <div style={{ fontWeight: 700, fontSize: '14px' }}>BACKEND</div>
      <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>Lo que procesa</div>
    </div>

    {/* Flecha */}
    <div style={{ fontSize: '24px', color: '#94a3b8' }}>→</div>

    {/* Base de datos */}
    <div style={{
      background: '#fafbfc',
      border: '2px solid rgba(0,0,0,0.06)',
      padding: '16px 24px',
      borderRadius: '12px',
      textAlign: 'center',
      minWidth: '120px'
    }}>
      <div style={{ fontSize: '24px', marginBottom: '4px' }}>🗄️</div>
      <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>BASE DE DATOS</div>
      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Donde se guarda</div>
    </div>
  </div>
)

// Diagrama Git Flow
const GitFlowDiagram = () => (
  <div style={{
    background: '#f1f5f9',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
      <span style={{ fontSize: '20px' }}>📁</span>
      <span style={{ fontWeight: 600, color: '#1e293b' }}>Tu codigo local</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <div style={{
        background: '#fafbfc',
        border: '2px solid rgba(0,0,0,0.06)',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: 500
      }}>
        1. Editas codigo
      </div>
      <span style={{ color: '#94a3b8' }}>→</span>
      <div style={{
        background: '#f59e0b',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: 600
      }}>
        2. git add
      </div>
      <span style={{ color: '#94a3b8' }}>→</span>
      <div style={{
        background: '#6366f1',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: 600
      }}>
        3. git commit
      </div>
      <span style={{ color: '#94a3b8' }}>→</span>
      <div style={{
        background: '#22c55e',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: 600
      }}>
        4. git push
      </div>
      <span style={{ color: '#94a3b8' }}>→</span>
      <div style={{
        background: '#24292f',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span>GitHub</span>
        <span style={{ fontSize: '16px' }}>☁️</span>
      </div>
    </div>
  </div>
)

// Diagrama Deploy
const DeployDiagram = () => (
  <div style={{
    background: '#f1f5f9',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{
        background: '#fafbfc',
        border: '2px solid rgba(0,0,0,0.06)',
        padding: '16px 20px',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '28px', marginBottom: '4px' }}>💻</div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>localhost:3000</div>
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Solo tu lo ves</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px' }}>
        <div style={{
          background: '#22c55e',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '6px',
          fontWeight: 600,
          fontSize: '13px'
        }}>
          DEPLOY
        </div>
        <span style={{ fontSize: '20px' }}>→</span>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        padding: '16px 20px',
        borderRadius: '10px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ fontSize: '28px', marginBottom: '4px' }}>🌍</div>
        <div style={{ fontSize: '12px', fontWeight: 600 }}>tu-app.vercel.app</div>
        <div style={{ fontSize: '11px', opacity: 0.8 }}>Todo el mundo</div>
      </div>
    </div>
  </div>
)

const SECCIONES = [
  {
    id: 'lo-basico',
    titulo: 'Lo Basico',
    emoji: '🏠',
    descripcion: 'Los conceptos fundamentales que necesitas para empezar.',
    terminos: [
      {
        termino: 'Terminal',
        definicion: 'La pantalla donde escribes comandos. Es como enviar mensajes de texto a tu computadora.',
        ejemplo: 'Escribes "claude" → se abre Claude Code. Escribes "npm install" → instala dependencias.',
        analogia: 'Como el chat de WhatsApp, pero para hablar con tu computadora.',
        screenshot: '/images/precurso/terminal.png',
        screenshotCaption: 'Asi se ve una terminal con comandos'
      },
      {
        termino: 'Comando',
        definicion: 'Una instruccion que escribes en la terminal para que la computadora haga algo.',
        ejemplo: 'node --version te dice que version de Node tienes instalada.',
        analogia: 'Como dar una orden: "Abre la puerta" vs "node --version".'
      },
      {
        termino: 'Carpeta / Directorio',
        definicion: 'Donde viven tus archivos. "Directorio" es el termino tecnico, pero es lo mismo.',
        ejemplo: '/Users/tu-nombre/Proyectos/mi-app',
        analogia: 'Las carpetas fisicas de toda la vida.',
        screenshot: '/images/precurso/vscode-carpetas.png',
        screenshotCaption: 'Estructura de carpetas en VS Code'
      },
      {
        termino: 'Ruta / Path',
        definicion: 'La direccion completa de un archivo o carpeta en tu computadora.',
        ejemplo: '/Users/josu/proyectos/mi-app/src/index.js',
        analogia: 'Como la direccion de tu casa: Calle Mayor 5, 3o B.'
      },
      {
        termino: 'Archivo',
        definicion: 'Un documento individual. Puede ser codigo (.js, .tsx), texto (.md), imagenes (.png), etc.',
        ejemplo: 'index.html, styles.css, app.js, README.md',
        analogia: 'Como los documentos de Word, pero para todo tipo de contenido.'
      }
    ]
  },
  {
    id: 'arquitectura-web',
    titulo: 'Arquitectura Web',
    emoji: '🏗️',
    descripcion: 'Como estan construidas las aplicaciones web.',
    terminos: [
      {
        termino: 'Frontend',
        definicion: 'Todo lo que el usuario ve y toca: botones, colores, texto, animaciones, formularios.',
        ejemplo: 'La pagina de QualifyForm que ves al entrar: el formulario, los botones, el diseno.',
        analogia: 'El escaparate de una tienda: lo que ves desde la calle.',
        screenshot: '/images/precurso/qualifyform-frontend.png',
        screenshotCaption: 'Frontend de QualifyForm: lo que el usuario ve'
      },
      {
        termino: 'Backend',
        definicion: 'Lo que pasa "detras": verificar contrasenas, guardar datos, enviar emails, procesar pagos.',
        ejemplo: 'QualifyForm guarda las respuestas, calcula puntuaciones y dispara pixels. Eso es backend.',
        analogia: 'La trastienda: donde se hace el trabajo que el cliente no ve.'
      },
      {
        termino: 'Full Stack',
        definicion: 'Alguien (o algo) que trabaja tanto en frontend como en backend.',
        ejemplo: 'Claude Code puede crear tanto la parte visual como la logica del servidor.',
        analogia: 'Un empleado que atiende en caja Y gestiona el almacen.'
      },
      {
        termino: 'API',
        definicion: 'El "contrato" entre frontend y backend. Define que datos puedes pedir y como.',
        ejemplo: 'QualifyForm tiene API para webhooks: cuando alguien responde, envia los datos a tu CRM.',
        analogia: 'El menu de un restaurante: lista que puedes pedir y como.'
      },
      {
        termino: 'Endpoint',
        definicion: 'Una URL especifica de la API a la que puedes hacer peticiones.',
        ejemplo: '/api/forms/123/responses → devuelve las respuestas del formulario 123.',
        analogia: 'Cada plato del menu tiene su propio nombre y precio.'
      },
      {
        termino: 'Base de datos',
        definicion: 'Donde se guardan los datos de forma permanente. Usuarios, productos, mensajes, todo.',
        ejemplo: 'QualifyForm guarda cada respuesta, puntuacion y evento de pixel en su base de datos.',
        analogia: 'Un archivador gigante organizado donde guardas toda la informacion.'
      },
      {
        termino: 'Servidor',
        definicion: 'Una computadora que esta siempre encendida y disponible para recibir peticiones.',
        ejemplo: 'Los servidores de Netflix guardan las peliculas y las envian cuando las pides.',
        analogia: 'Como un empleado que trabaja 24/7 esperando peticiones.'
      }
    ]
  },
  {
    id: 'codigo-desarrollo',
    titulo: 'Codigo y Desarrollo',
    emoji: '💻',
    descripcion: 'Terminos que escucharas cuando trabajes con codigo.',
    terminos: [
      {
        termino: 'Codigo fuente',
        definicion: 'El texto que los programadores escriben. Las instrucciones que entiende la computadora.',
        ejemplo: 'const nombre = "Josu"; console.log(nombre);',
        analogia: 'La receta de cocina: instrucciones paso a paso.'
      },
      {
        termino: 'Lenguaje de programacion',
        definicion: 'El "idioma" en el que se escribe el codigo. Cada uno tiene su sintaxis.',
        ejemplo: 'JavaScript, Python, TypeScript, Java, C++...',
        analogia: 'Como el espanol, ingles o frances. Cada uno con sus reglas.'
      },
      {
        termino: 'JavaScript (JS)',
        definicion: 'El lenguaje de programacion de la web. Funciona en navegadores y servidores.',
        ejemplo: 'Casi todo lo que ves en la web usa JavaScript de alguna forma.',
        analogia: 'El ingles de la programacion web: lo habla todo el mundo.'
      },
      {
        termino: 'TypeScript (TS)',
        definicion: 'JavaScript con superpoderes. Anade tipos para evitar errores.',
        ejemplo: 'En vez de "const x = 5", escribes "const x: number = 5".',
        analogia: 'Como JavaScript pero con corrector ortografico integrado.'
      },
      {
        termino: 'Framework',
        definicion: 'Un kit de construccion con piezas listas para usar. Te ahorra escribir codigo desde cero.',
        ejemplo: 'Next.js, React, Vue, Angular, Django...',
        analogia: 'Como comprar muebles de IKEA vs fabricarlos tu mismo.'
      },
      {
        termino: 'Libreria / Biblioteca',
        definicion: 'Codigo que otros escribieron y tu reutilizas para tareas especificas.',
        ejemplo: 'date-fns para manejar fechas, lodash para manipular datos.',
        analogia: 'Herramientas de una caja de herramientas: las usas cuando las necesitas.'
      },
      {
        termino: 'Componente',
        definicion: 'Una pieza reutilizable de la interfaz: un boton, un formulario, una tarjeta.',
        ejemplo: 'En QualifyForm: el selector de pregunta, el boton de continuar, la barra de progreso.',
        analogia: 'Como las piezas de LEGO: las combinas para crear cosas mas grandes.'
      },
      {
        termino: 'Variable',
        definicion: 'Un contenedor con nombre donde guardas un valor.',
        ejemplo: 'const precio = 29.99; const nombre = "iPhone";',
        analogia: 'Una caja con etiqueta donde guardas algo.'
      },
      {
        termino: 'Funcion',
        definicion: 'Un bloque de codigo que hace algo especifico y que puedes reutilizar.',
        ejemplo: 'function saludar(nombre) { return "Hola " + nombre; }',
        analogia: 'Una maquina: le das algo, hace un proceso, y te devuelve algo.'
      },
      {
        termino: 'Bug',
        definicion: 'Un error en el codigo que hace que algo no funcione como deberia.',
        ejemplo: 'El boton de "Comprar" no hace nada cuando lo pulsas.',
        analogia: 'Una errata en un libro: algo que deberia estar bien pero no lo esta.'
      },
      {
        termino: 'Debug / Depurar',
        definicion: 'El proceso de encontrar y arreglar bugs.',
        ejemplo: 'Revisar el codigo linea por linea hasta encontrar el problema.',
        analogia: 'Jugar a detective: buscar pistas hasta encontrar el culpable.'
      }
    ]
  },
  {
    id: 'git-versiones',
    titulo: 'Git y Control de Versiones',
    emoji: '📦',
    descripcion: 'Como guardar y gestionar las versiones de tu codigo.',
    terminos: [
      {
        termino: 'Git',
        definicion: 'Sistema para guardar versiones de tu codigo. Si rompes algo, vuelves atras.',
        ejemplo: 'Guardas v1, haces cambios, guardas v2. Si v2 falla, vuelves a v1.',
        analogia: 'El historial de versiones de Google Docs, pero para codigo.'
      },
      {
        termino: 'GitHub',
        definicion: 'Una web donde guardas tus repositorios en la nube. Como Google Drive para codigo.',
        ejemplo: 'El codigo de QualifyForm esta en github.com/josusanz/qualifyform',
        analogia: 'Dropbox o Google Drive, pero disenado para codigo.',
        screenshot: '/images/precurso/github-repo.png',
        screenshotCaption: 'Repositorio de QualifyForm en GitHub'
      },
      {
        termino: 'Repositorio (Repo)',
        definicion: 'Tu proyecto guardado con todo su historial de cambios.',
        ejemplo: 'El repo de tu app tiene todo: codigo, commits, branches...',
        analogia: 'Una carpeta con memoria: recuerda todo lo que ha pasado.'
      },
      {
        termino: 'Commit',
        definicion: 'Un punto de guardado. Capturas el estado actual del codigo con un mensaje.',
        ejemplo: '"Commit: anadido boton de login" → ahora puedes volver aqui cuando quieras.',
        analogia: 'Guardar partida en un videojuego.'
      },
      {
        termino: 'Branch / Rama',
        definicion: 'Una copia paralela del codigo para experimentar sin afectar lo principal.',
        ejemplo: 'Creas rama "nueva-feature", trabajas, si funciona la unes a main.',
        analogia: 'Un universo paralelo donde pruebas cosas sin riesgo.'
      },
      {
        termino: 'Main / Master',
        definicion: 'La rama principal. El codigo "oficial" que funciona y esta en produccion.',
        ejemplo: 'Solo subes a main cuando el codigo esta probado y listo.',
        analogia: 'La version final del documento, no el borrador.'
      },
      {
        termino: 'Merge',
        definicion: 'Unir los cambios de una rama a otra.',
        ejemplo: 'Terminas tu feature en una rama y la unes (merge) a main.',
        analogia: 'Incorporar las correcciones del borrador al documento final.'
      },
      {
        termino: 'Pull Request (PR)',
        definicion: 'Una peticion para unir tus cambios a la rama principal. Otros pueden revisarla.',
        ejemplo: 'Abres un PR, tu companero lo revisa, lo aprueba, y se hace merge.',
        analogia: 'Pedir permiso antes de anadir algo al documento oficial.'
      },
      {
        termino: 'Push',
        definicion: 'Subir tus commits locales a GitHub (la nube).',
        ejemplo: 'git push → tus cambios locales ahora estan en GitHub.',
        analogia: 'Sincronizar tus archivos locales con la nube.'
      },
      {
        termino: 'Pull',
        definicion: 'Descargar los cambios de GitHub a tu computadora.',
        ejemplo: 'git pull → traes los cambios que otros han subido.',
        analogia: 'Descargar las actualizaciones de la nube a tu computadora.'
      },
      {
        termino: 'Clone',
        definicion: 'Descargar un repositorio completo de GitHub a tu computadora.',
        ejemplo: 'git clone https://github.com/user/repo → tienes una copia local.',
        analogia: 'Hacer una copia completa de un proyecto para trabajar en el.'
      }
    ]
  },
  {
    id: 'dependencias-paquetes',
    titulo: 'Dependencias y Paquetes',
    emoji: '📚',
    descripcion: 'Como reutilizar codigo que otros ya han escrito.',
    terminos: [
      {
        termino: 'npm',
        definicion: 'La tienda de paquetes de JavaScript. Descargas codigo que otros crearon.',
        ejemplo: 'npm install react → instala React en tu proyecto.',
        analogia: 'La App Store pero para codigo.'
      },
      {
        termino: 'Paquete / Package',
        definicion: 'Un conjunto de codigo listo para usar que instalas con npm.',
        ejemplo: 'next, react, tailwindcss, prisma...',
        analogia: 'Una app que descargas e instalas.'
      },
      {
        termino: 'Dependencia',
        definicion: 'Un paquete que tu proyecto necesita para funcionar.',
        ejemplo: 'Tu app depende de React para funcionar → React es una dependencia.',
        analogia: 'Los ingredientes que necesitas para una receta.'
      },
      {
        termino: 'package.json',
        definicion: 'El archivo que lista todas las dependencias de tu proyecto.',
        ejemplo: 'Ahi dice que paquetes usar y que versiones.',
        analogia: 'La lista de la compra: todo lo que tu proyecto necesita.'
      },
      {
        termino: 'node_modules',
        definicion: 'La carpeta donde se instalan todas las dependencias. Puede pesar mucho.',
        ejemplo: 'Despues de npm install, aparece esta carpeta con todo el codigo instalado.',
        analogia: 'El almacen donde guardas todos los ingredientes.'
      },
      {
        termino: 'npm install',
        definicion: 'El comando que instala todas las dependencias listadas en package.json.',
        ejemplo: 'Clonas un repo, ejecutas npm install, y ya tienes todo listo.',
        analogia: 'Ir al supermercado y comprar todo lo de la lista.'
      }
    ]
  },
  {
    id: 'deploy-produccion',
    titulo: 'Deploy y Produccion',
    emoji: '🚀',
    descripcion: 'Como publicar tu app para que otros la usen.',
    terminos: [
      {
        termino: 'Deploy',
        definicion: 'Publicar tu app para que cualquiera en el mundo pueda acceder.',
        ejemplo: 'QualifyForm esta desplegado en qualifyform.com. Tu haras lo mismo.',
        analogia: 'Abrir las puertas de tu tienda al publico.',
        screenshot: '/images/precurso/vercel-deploy.png',
        screenshotCaption: 'Deploy de QualifyForm en Vercel'
      },
      {
        termino: 'Produccion',
        definicion: 'El entorno donde los usuarios reales usan tu app. Lo contrario de desarrollo.',
        ejemplo: 'qualifyform.com es produccion. localhost:3000 es desarrollo.',
        analogia: 'La version final, no el ensayo.'
      },
      {
        termino: 'Localhost',
        definicion: 'Tu computadora actuando como servidor. Solo tu puedes ver la app.',
        ejemplo: 'http://localhost:3000 → tu app corriendo localmente mientras desarrollas.',
        analogia: 'Cocinar en casa antes de abrir el restaurante.'
      },
      {
        termino: 'Variable de entorno',
        definicion: 'Configuraciones secretas: contrasenas, API keys, URLs privadas.',
        ejemplo: 'DATABASE_URL, STRIPE_SECRET_KEY, NEXT_PUBLIC_API_URL',
        analogia: 'Informacion confidencial que no quieres que nadie vea.'
      },
      {
        termino: '.env',
        definicion: 'El archivo donde guardas tus variables de entorno localmente.',
        ejemplo: 'API_KEY=abc123 (nunca subas este archivo a GitHub!)',
        analogia: 'Tu caja fuerte con las llaves del negocio.'
      },
      {
        termino: 'Dominio',
        definicion: 'La direccion web de tu app. Lo que escribes en el navegador.',
        ejemplo: 'google.com, twitter.com, mi-app.com',
        analogia: 'La direccion de tu tienda: Calle Mayor 5.'
      },
      {
        termino: 'HTTPS / SSL',
        definicion: 'El candadito verde. Significa que la conexion es segura y encriptada.',
        ejemplo: 'https://mi-app.com (seguro) vs http://mi-app.com (inseguro)',
        analogia: 'Enviar una carta en un sobre sellado vs en una postal abierta.'
      },
      {
        termino: 'Hosting',
        definicion: 'El servicio que mantiene tu app online 24/7.',
        ejemplo: 'Vercel, Netlify, AWS, Railway...',
        analogia: 'El local donde montas tu tienda. Alguien tiene que darte espacio.'
      }
    ]
  }
]

function GlosarioContent() {
  const { completed, toggle } = usePrecursoProgress()

  const glosarioCompleted = completed['glosario-completo']

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafbfc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#1e293b'
    }}>
      <Head>
        <title>Glosario | Curso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'rgba(250, 251, 252, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '12px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/curso" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '8px',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </Link>
          <span style={{ fontWeight: 600, fontSize: '16px', color: '#0f172a' }}>Glosario</span>
        </div>
        <button
          onClick={() => { localStorage.removeItem('precurso-access'); window.location.href = '/curso' }}
          style={{
            padding: '8px 18px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#64748b',
            background: 'white',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
          }}
        >
          Salir
        </button>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Hero */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>
            Todo lo que necesitas saber 📚
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
            Este glosario tiene todos los conceptos que usaras durante el curso.
            No tienes que memorizarlos — solo entender la idea general.
            Claude Code (con modelos como Opus 4.6 y Sonnet 4.5) hara el trabajo tecnico por ti.
          </p>
        </div>

        {/* Video tutorial */}
        <div style={{
          marginBottom: '48px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.06)',
          background: 'white'
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '24px' }}>🎬</span>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                Video resumen del glosario
              </div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                Si prefieres ver en vez de leer (2 min)
              </div>
            </div>
          </div>
          <video
            controls
            style={{
              width: '100%',
              display: 'block',
              background: '#1a1a2e'
            }}
          >
            <source src="/videos/glosario.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
          <div style={{
            padding: '12px 20px',
            background: '#f1f5f9',
            fontSize: '13px',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>🔊</span>
            <span>Este video incluye narracion en espanol</span>
          </div>
        </div>

        {/* Indice rapido */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '48px',
          border: '1px solid rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Secciones
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {SECCIONES.map(seccion => (
              <a
                key={seccion.id}
                href={`#${seccion.id}`}
                style={{
                  padding: '10px 16px',
                  background: '#f1f5f9',
                  borderRadius: '10px',
                  color: '#1e293b',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{seccion.emoji}</span>
                {seccion.titulo}
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>({seccion.terminos.length})</span>
              </a>
            ))}
          </div>
        </div>

        {/* Secciones */}
        {SECCIONES.map(seccion => (
          <div key={seccion.id} id={seccion.id} style={{ marginBottom: '56px' }}>
            {/* Header de seccion */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '32px' }}>{seccion.emoji}</span>
                <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>{seccion.titulo}</h2>
              </div>
              <p style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>
                {seccion.descripcion}
              </p>
            </div>

            {/* Diagrama visual para secciones especificas */}
            {seccion.id === 'arquitectura-web' && <FrontendBackendDiagram />}
            {seccion.id === 'git-versiones' && <GitFlowDiagram />}
            {seccion.id === 'deploy-produccion' && <DeployDiagram />}

            {/* Terminos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {seccion.terminos.map((item, index) => (
                <div key={index} style={{
                  background: 'white',
                  borderRadius: '14px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  padding: '24px'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 12px', color: '#1e293b' }}>
                    {item.termino}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#1e293b', lineHeight: 1.7, margin: '0 0 16px' }}>
                    {item.definicion}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{
                      background: '#f1f5f9',
                      borderRadius: '10px',
                      padding: '14px 18px'
                    }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Ejemplo
                      </span>
                      <p style={{ fontSize: '14px', color: '#64748b', margin: '6px 0 0', lineHeight: 1.6 }}>
                        {item.ejemplo}
                      </p>
                    </div>

                    <div style={{
                      background: '#eef2ff',
                      borderRadius: '10px',
                      padding: '14px 18px',
                      borderLeft: '3px solid #5e6ad2'
                    }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#5e6ad2', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        💡 Piensalo asi
                      </span>
                      <p style={{ fontSize: '14px', color: '#1e293b', margin: '6px 0 0', lineHeight: 1.6 }}>
                        {item.analogia}
                      </p>
                    </div>

                    {/* Screenshot si existe */}
                    {item.screenshot && (
                      <Screenshot
                        src={item.screenshot}
                        alt={item.termino}
                        caption={item.screenshotCaption}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Boton de completado al FINAL */}
        <div style={{
          marginTop: '48px',
          padding: '32px',
          background: glosarioCompleted ? '#f0fdf4' : 'white',
          borderRadius: '20px',
          border: `2px solid ${glosarioCompleted ? '#22c55e' : 'rgba(0,0,0,0.06)'}`,
          textAlign: 'center'
        }}>
          {glosarioCompleted ? (
            <>
              <span style={{ fontSize: '48px' }}>✅</span>
              <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#22c55e', margin: '12px 0 8px' }}>
                ¡Glosario completado!
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', margin: '0 0 16px' }}>
                Ya conoces todos los conceptos. Siguiente paso: instalar las herramientas.
              </p>
              <button
                onClick={() => toggle('glosario-completo')}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '8px',
                  color: '#94a3b8',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Desmarcar
              </button>
            </>
          ) : (
            <>
              <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#1e293b', margin: '0 0 8px' }}>
                ¿Has leido todo el glosario?
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', margin: '0 0 24px' }}>
                No hace falta memorizarlo. Siempre puedes volver aqui a consultar cualquier termino.
              </p>
              <button
                onClick={() => toggle('glosario-completo')}
                style={{
                  padding: '16px 40px',
                  background: '#5e6ad2',
                  border: 'none',
                  borderRadius: '14px',
                  color: 'white',
                  fontSize: '17px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ✓ Entendido, siguiente paso
              </button>
            </>
          )}
        </div>

        {/* Navegacion */}
        <div style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Link href="/curso/programar-con-ia" style={{
            padding: '14px 24px',
            background: 'white',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '12px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 500
          }}>
            ← Programar con IA
          </Link>
          <Link href="/curso/requisitos" style={{
            padding: '14px 24px',
            background: '#5e6ad2',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 500
          }}>
            Requisitos →
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function GlosarioPage() {
  return (
    <CursoEmailGate>
      <GlosarioContent />
    </CursoEmailGate>
  )
}
