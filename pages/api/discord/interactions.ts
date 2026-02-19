import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import nacl from 'tweetnacl'
import Anthropic from '@anthropic-ai/sdk'
import { QUICK_KNOWLEDGE } from '../../../lib/discord-knowledge-base'
import { CURSO_SEMANAS } from '../../../lib/curso-data'

// Discord interaction types
const InteractionType = {
  PING: 1,
  APPLICATION_COMMAND: 2,
}

const InteractionResponseType = {
  PONG: 1,
  CHANNEL_MESSAGE_WITH_SOURCE: 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
}

// Recursos predefinidos (respuestas instantáneas)
const RECURSOS: Record<string, { titulo: string; descripcion: string; url: string }> = {
  supabase: {
    titulo: '🗄️ Supabase',
    descripcion: 'Base de datos y autenticación',
    url: 'https://supabase.com/docs'
  },
  nextjs: {
    titulo: '⚡ Next.js',
    descripcion: 'Framework de React',
    url: 'https://nextjs.org/docs'
  },
  tailwind: {
    titulo: '🎨 Tailwind CSS',
    descripcion: 'Framework de estilos',
    url: 'https://tailwindcss.com/docs'
  },
  shadcn: {
    titulo: '🧩 shadcn/ui',
    descripcion: 'Componentes de UI',
    url: 'https://ui.shadcn.com'
  },
  claude: {
    titulo: '🤖 Claude API',
    descripcion: 'Inteligencia artificial',
    url: 'https://docs.anthropic.com'
  },
  stripe: {
    titulo: '💳 Stripe',
    descripcion: 'Pagos online',
    url: 'https://stripe.com/docs'
  },
  vercel: {
    titulo: '🚀 Vercel',
    descripcion: 'Deploy y hosting',
    url: 'https://vercel.com/docs'
  },
  github: {
    titulo: '📦 GitHub',
    descripcion: 'Control de versiones',
    url: 'https://docs.github.com'
  },
  typescript: {
    titulo: '📘 TypeScript',
    descripcion: 'JavaScript con tipos',
    url: 'https://www.typescriptlang.org/docs'
  },
  precurso: {
    titulo: '📚 Precurso',
    descripcion: 'Contenido preparatorio',
    url: 'https://www.aprende.software/precurso'
  },
  zoom: {
    titulo: '📹 Zoom',
    descripcion: 'Link de clases en vivo',
    url: 'https://us06web.zoom.us/j/81059741055?pwd=Xqh8R7S3jwIYLo0gC8X0eRvJz66YOy.1'
  },
  calendario: {
    titulo: '📅 Calendario',
    descripcion: 'Añadir eventos a tu calendario',
    url: 'https://calendar.google.com/calendar/u/0/r?cid=43979bc920a7c33e572266e10021d4934f9ce7eea323fa948471566d5f25d11f@group.calendar.google.com'
  }
}

// Horario de clases — generado desde CURSO_SEMANAS (fuente de verdad)
const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MESES_CORTOS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const CLASES = CURSO_SEMANAS.map(s => {
  const d = new Date(s.clase.fecha + 'T12:00:00')
  const diaSemana = DIAS_SEMANA[d.getDay()]
  const fechaHumana = `${d.getDate()} ${MESES_CORTOS[d.getMonth()]} ${d.getFullYear()}`
  return {
    semana: s.num,
    fecha: s.num === 1 ? '19-20 Feb 2026' : fechaHumana,
    dia: s.num === 1 ? 'Jue-Vie' : diaSemana,
    hora: s.clase.hora,
    tema: s.titulo,
    isoDate: s.clase.fecha,
  }
})

function getProximaClase(): typeof CLASES[0] | null {
  const hoy = new Date()
  const proxima = CLASES.find(c => new Date(c.isoDate + 'T23:59:59') >= hoy)
  return proxima || null
}

// Canal de proyectos (forum)
const PROYECTOS_CHANNEL_ID = '1470560307049926779'

// Crear hilo de proyecto
async function crearHiloProyecto(nombre: string, contenido: string): Promise<{ id: string; name: string } | null> {
  try {
    const res = await fetch(`https://discord.com/api/v10/channels/${PROYECTOS_CHANNEL_ID}/threads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nombre,
        message: { content: contenido },
        applied_tags: []
      })
    })
    if (res.ok) {
      return await res.json()
    }
    return null
  } catch (error) {
    console.error('Error creating thread:', error)
    return null
  }
}

// Ask Claude a question (using Haiku for speed, with optimized knowledge)
async function askClaude(question: string): Promise<string> {
  const client = new Anthropic()

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20250929',
      max_tokens: 250,
      system: QUICK_KNOWLEDGE,
      messages: [
        {
          role: 'user',
          content: question
        }
      ]
    })

    const textBlock = response.content.find(block => block.type === 'text')
    if (textBlock && textBlock.type === 'text') {
      return textBlock.text
    }
    return 'No pude generar una respuesta.'
  } catch (error) {
    console.error('Claude API error:', error)
    return 'Error al consultar con Claude. Inténtalo de nuevo.'
  }
}

// Send followup message to Discord
async function sendFollowup(applicationId: string, token: string, content: string): Promise<void> {
  const url = `https://discord.com/api/v10/webhooks/${applicationId}/${token}`

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  })
}

// Get raw body from request
async function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      resolve(data)
    })
    req.on('error', reject)
  })
}

// Verify Discord request signature using tweetnacl
function verifyDiscordRequest(
  rawBody: string,
  signature: string,
  timestamp: string
): boolean {
  const publicKey = process.env.DISCORD_PUBLIC_KEY

  if (!signature || !timestamp || !publicKey) {
    console.log('Missing params:', { sig: !!signature, ts: !!timestamp, pk: !!publicKey })
    return false
  }

  try {
    const message = timestamp + rawBody
    return nacl.sign.detached.verify(
      Buffer.from(message),
      Buffer.from(signature, 'hex'),
      Buffer.from(publicKey, 'hex')
    )
  } catch (error) {
    console.error('Verify error:', error)
    return false
  }
}

// Assign role to user
async function assignRole(guildId: string, userId: string, roleId: string): Promise<boolean> {
  const token = process.env.DISCORD_BOT_TOKEN
  try {
    const res = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/members/${userId}/roles/${roleId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bot ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return res.ok
  } catch (error) {
    console.error('Role error:', error)
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const signature = req.headers['x-signature-ed25519'] as string
  const timestamp = req.headers['x-signature-timestamp'] as string

  // Get raw body for signature verification
  const rawBody = await getRawBody(req)

  // Verify the request is from Discord
  const isValid = verifyDiscordRequest(rawBody, signature, timestamp)
  if (!isValid) {
    console.log('Invalid signature for body:', rawBody.substring(0, 100))
    return res.status(401).json({ error: 'Invalid request signature' })
  }

  // Parse the body
  const body = JSON.parse(rawBody)
  const { type, data, member, guild_id } = body

  // Handle Discord PING
  if (type === InteractionType.PING) {
    console.log('PING received, sending PONG')
    return res.status(200).json({ type: InteractionResponseType.PONG })
  }

  // Handle slash commands
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name, options } = data

    if (name === 'verificar') {
      const email = options?.find((o: { name: string }) => o.name === 'email')?.value?.toLowerCase().trim()

      if (!email) {
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '❌ Usa: `/verificar email:tu@email.com`',
            flags: 64,
          },
        })
      }

      try {
        // Verificar en paralelo para mayor velocidad
        const [isEnrolled, isPrecurso] = await Promise.all([
          kv.sismember('curso:emails', email),
          kv.sismember('precurso:emails', email)
        ])

        if (!isEnrolled && !isPrecurso) {
          return res.status(200).json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `❌ **${email}** no está registrado.\n\nContacta a Josu si crees que es un error.`,
              flags: 64,
            },
          })
        }

        // Asignar rol y guardar en background (no esperar)
        const ALUMNO_ROLE_ID = process.env.DISCORD_ALUMNO_ROLE_ID
        if (ALUMNO_ROLE_ID && guild_id && member?.user?.id) {
          // No await - ejecutar en background
          Promise.all([
            assignRole(guild_id, member.user.id, ALUMNO_ROLE_ID),
            kv.hset(`curso:user:${email}`, {
              discordId: member.user.id,
              discordVerifiedAt: new Date().toISOString(),
            })
          ]).catch(console.error)
        }

        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `✅ ¡Verificado, **${member?.user?.username || 'alumno'}**! Ya tienes acceso a los canales. 🚀`,
            flags: 64,
          },
        })
      } catch (error) {
        console.error('Verificar error:', error)
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '❌ Error al verificar. Inténtalo de nuevo.',
            flags: 64,
          },
        })
      }
    }

    if (name === 'info') {
      return res.status(200).json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `📚 **Crea tu Software con IA**\n🔗 https://www.aprende.software/curso\n📅 Inicio: 19 febrero 2026`,
          flags: 64,
        },
      })
    }

    // Comando /recurso - respuestas instantáneas
    if (name === 'recurso') {
      const tema = options?.find((o: { name: string }) => o.name === 'tema')?.value?.toLowerCase()

      if (!tema) {
        const lista = Object.keys(RECURSOS).join(', ')
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `📚 **Recursos disponibles:**\n\`${lista}\`\n\nUsa: \`/recurso tema:supabase\``,
            flags: 64,
          },
        })
      }

      const recurso = RECURSOS[tema]
      if (!recurso) {
        const lista = Object.keys(RECURSOS).join(', ')
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `❌ No encontré "${tema}".\n\n**Disponibles:** \`${lista}\``,
            flags: 64,
          },
        })
      }

      return res.status(200).json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${recurso.titulo}\n${recurso.descripcion}\n🔗 ${recurso.url}`,
          flags: 64,
        },
      })
    }

    // Comando /horario - próxima clase
    if (name === 'horario') {
      const proxima = getProximaClase()
      const todas = options?.find((o: { name: string }) => o.name === 'todas')?.value

      if (todas) {
        const lista = CLASES.map(c =>
          `**S${c.semana}** - ${c.fecha} (${c.dia}) → ${c.tema}`
        ).join('\n')
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `📅 **Calendario completo:**\n\n${lista}`,
            flags: 64,
          },
        })
      }

      if (proxima) {
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `📅 **Próxima clase:**\n\n**Semana ${proxima.semana}: ${proxima.tema}**\n🗓️ ${proxima.fecha} (${proxima.dia})\n⏰ ${proxima.hora}\n🔗 [Unirse a Zoom](https://us06web.zoom.us/j/81059741055?pwd=Xqh8R7S3jwIYLo0gC8X0eRvJz66YOy.1)`,
            flags: 64,
          },
        })
      }

      return res.status(200).json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `📅 No hay más clases programadas. ¡El curso ha terminado! 🎓`,
          flags: 64,
        },
      })
    }

    // Comando /miproyecto - Crear hilo en #proyectos
    if (name === 'miproyecto') {
      const nombreProyecto = options?.find((o: { name: string }) => o.name === 'nombre')?.value
      const descripcion = options?.find((o: { name: string }) => o.name === 'descripcion')?.value || ''
      const username = member?.user?.username || 'Alumno'

      if (!nombreProyecto) {
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '❌ Usa: `/miproyecto nombre:Mi SaaS descripcion:Herramienta para...`',
            flags: 64,
          },
        })
      }

      const contenidoHilo = `# 🚀 ${nombreProyecto}

**Creado por:** ${username}

---

${descripcion || '_Sin descripción todavía_'}

---

**Plantilla sugerida para actualizar:**
\`\`\`
📅 Semana: X
✅ Completado: ...
🔨 Trabajando en: ...
🆘 Bloqueado por: ...
📸 Captura: [imagen]
\`\`\`

¡Actualiza este hilo cada semana con tu progreso! 💪`

      const hilo = await crearHiloProyecto(`🛠️ ${nombreProyecto} - ${username}`, contenidoHilo)

      if (hilo) {
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `✅ ¡Proyecto creado!\n\n**${nombreProyecto}**\n🔗 <#${hilo.id}>\n\n¡Ve a tu hilo y actualiza tu progreso cada semana!`,
            flags: 64,
          },
        })
      } else {
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '❌ Error al crear el proyecto. Inténtalo de nuevo.',
            flags: 64,
          },
        })
      }
    }

    if (name === 'duda') {
      const pregunta = options?.find((o: { name: string }) => o.name === 'pregunta')?.value

      if (!pregunta) {
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '❌ Usa: `/duda pregunta:¿Cómo conecto Supabase?`',
            flags: 64,
          },
        })
      }

      // Respuestas instantaneas desde datos reales del curso (sin API)
      const preguntaLower = pregunta.toLowerCase()

      // Genera calendario dinamico desde curso-data.ts
      const calendario = CURSO_SEMANAS.slice(0, 5).map(s =>
        `• S${s.num} (${s.fechaInicio.slice(5).replace('-', '/')}): ${s.emoji} ${s.titulo}`
      ).join('\n')

      const QUICK_ANSWERS: Record<string, string> = {
        'terminal': '**Abrir Terminal:**\n• **Mac:** Cmd+Espacio → escribe "Terminal"\n• **Windows:** Busca "PowerShell" → click derecho → Ejecutar como admin\n• **Linux:** Ctrl+Alt+T',
        'instalar claude': '**Instalar Claude Code:**\n```\n# Mac/Linux:\ncurl -fsSL https://claude.ai/install | sh\n\n# Windows PowerShell (admin):\nirm https://claude.ai/install.ps1 | iex\n```\nLuego: `claude --version` y `claude` para iniciar.\nRequiere Claude Pro ($20/mes)',
        'claude code': '**Claude Code** es una herramienta CLI (linea de comandos), NO una extension de VS Code.\n\nInstalacion: `curl -fsSL https://claude.ai/install | sh`\nRequiere: Claude Pro ($20/mes)',
        'precio': '**Precios:**\n• Claude gratis: ~30 msgs/dia\n• Claude Pro: $20/mes (necesario para Claude Code)\n• Claude Max: $100/mes',
        'cuando': `**Curso "Crea tu Software con IA":**\n• Inicio: ${CURSO_SEMANAS[0].fechaInicio}\n• Clases: Viernes 19:00 CET (S1: Jue-Vie 19-20 Feb)\n• Duracion: 10 semanas\n• Zoom: https://us06web.zoom.us/j/81059741055`,
        'calendario': `**Calendario del curso:**\n${calendario}\n... y 5 semanas mas`,
        'semana': `**Proximas semanas:**\n${calendario}`,
        'supabase': '**Supabase** es la base de datos del curso.\nDocs: https://supabase.com/docs\nUsa `/recurso supabase` para el link directo.',
        'nextjs': '**Next.js 14** es el framework del curso.\nDocs: https://nextjs.org/docs\nUsa `/recurso nextjs` para el link directo.',
        'zoom': '**Link de Zoom para clases:**\nhttps://us06web.zoom.us/j/81059741055\n\nClases: Viernes 19:00 CET (S1: Jue-Vie 19-20 Feb)',
      }

      for (const [key, answer] of Object.entries(QUICK_ANSWERS)) {
        if (preguntaLower.includes(key)) {
          return res.status(200).json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: answer, flags: 64 },
          })
        }
      }

      // Si no hay respuesta rapida, intentar con Claude API (timeout 2.3s)
      try {
        const timeoutPromise = new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 2300)
        )

        const answer = await Promise.race([
          askClaude(pregunta),
          timeoutPromise
        ])

        const formattedResponse = `**${pregunta}**\n\n${answer}`
        const finalResponse = formattedResponse.length > 1900
          ? formattedResponse.substring(0, 1900) + '...'
          : formattedResponse

        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: finalResponse, flags: 64 },
        })
      } catch (error) {
        console.error('Duda error:', error)
        // Si hay timeout, sugerir alternativa
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `❓ **${pregunta}**\n\n⏳ La respuesta tardó demasiado. Prueba:\n• Usa \`/recurso\` para links a documentación\n• Pregunta en #❓-dudas para respuesta de compañeros\n• Consulta directamente en [claude.ai](https://claude.ai)`,
            flags: 64,
          },
        })
      }
    }
  }

  return res.status(200).json({ type: InteractionResponseType.PONG })
}

// Disable body parsing to get raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
  maxDuration: 30, // Allow up to 30 seconds for Claude responses
}
