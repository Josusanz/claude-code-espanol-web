import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import nacl from 'tweetnacl'
import Anthropic from '@anthropic-ai/sdk'

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

// Course context for Claude
const CURSO_CONTEXT = `Eres el asistente del curso "Crea tu Software con IA" de Josu Sanz.

SOBRE JOSU SANZ (el instructor):
Josu Sanz es un Product Maker con más de 20 años de experiencia en el mundo digital.
- Ha creado 4 empresas a lo largo de su carrera
- Hizo exit con su software WPConfigurator.com (configurador visual para WordPress)
- Fundó y dirigió Innwit Digital Innovation, agencia digital en Pamplona (2010-2022)
- Ha liderado equipos de hasta 10 personas (diseñadores y programadores)
- Trabajó como Ingeniero en Acciona Windpower
- Actualmente es freelance y Product Maker (2024-presente)
- Especialidades: Diseño innovador, Branding, UI/UX, Desarrollo de Software
- Crea software y productos digitales que transforman ideas en herramientas útiles

INFORMACIÓN DEL CURSO:
- Duración: 10 semanas (19 febrero - 24 abril 2026)
- Formato: Clases en vivo por Zoom + contenido + comunidad Discord
- Objetivo: Crear tu propio SaaS usando IA como copiloto
- Web: https://www.aprende.software

TECNOLOGÍAS DEL CURSO:
- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (base de datos + auth)
- Vercel (deploy)
- Claude/ChatGPT para desarrollo con IA

ESTRUCTURA SEMANAL:
- Semana 1: LaunchPad - Proyecto conjunto (waitlist)
- Semana 2: Tu proyecto - Setup + UI con shadcn/ui
- Semana 3: Base de datos con Supabase
- Semana 4: Autenticación de usuarios
- Semana 5: CRUD y lógica de negocio
- Semana 6: Pagos con Stripe
- Semana 7: Email y notificaciones
- Semana 8: SEO y rendimiento
- Semana 9: Testing y calidad
- Semana 10: Lanzamiento y marketing

REGLAS DE RESPUESTA:
- Responde en español
- Sé conciso (máximo 1500 caracteres)
- Si la pregunta no es del curso, redirige amablemente
- Usa ejemplos de código cuando sea útil
- Menciona recursos del curso si aplica`

// Ask Claude a question (using Haiku for speed)
async function askClaude(question: string): Promise<string> {
  const client = new Anthropic()

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 400,
      messages: [
        {
          role: 'user',
          content: question
        }
      ],
      system: CURSO_CONTEXT
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
        const isEnrolled = await kv.sismember('curso:emails', email)
        const isPrecurso = !isEnrolled && await kv.sismember('precurso:emails', email)

        if (!isEnrolled && !isPrecurso) {
          return res.status(200).json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `❌ **${email}** no está registrado.\n\nContacta a Josu si crees que es un error.`,
              flags: 64,
            },
          })
        }

        const ALUMNO_ROLE_ID = process.env.DISCORD_ALUMNO_ROLE_ID
        if (ALUMNO_ROLE_ID && guild_id && member?.user?.id) {
          await assignRole(guild_id, member.user.id, ALUMNO_ROLE_ID)
          await kv.hset(`curso:user:${email}`, {
            discordId: member.user.id,
            discordVerifiedAt: new Date().toISOString(),
          })
        }

        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `✅ ¡Verificado, **${member?.user?.username || 'alumno'}**! Ya tienes acceso a los canales. 🚀`,
            flags: 64,
          },
        })
      } catch (error) {
        console.error('Error:', error)
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

      const interactionToken = body.token
      const applicationId = process.env.DISCORD_APP_ID

      // Race: Claude vs 2.5s timeout
      const claudePromise = askClaude(pregunta)
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2500))

      const result = await Promise.race([claudePromise, timeoutPromise])

      if (result !== null) {
        // Claude responded in time - send direct response
        const formattedResponse = `**Pregunta:** ${pregunta}\n\n**Respuesta:**\n${result}`
        const finalResponse = formattedResponse.length > 1900
          ? formattedResponse.substring(0, 1900) + '...'
          : formattedResponse

        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: finalResponse },
        })
      }

      // Claude is slow - send deferred, then wait for Claude and send followup
      res.status(200).json({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
      })

      // Wait for Claude to finish
      const answer = await claudePromise
      const formattedResponse = `**Pregunta:** ${pregunta}\n\n**Respuesta:**\n${answer}`
      const finalResponse = formattedResponse.length > 1900
        ? formattedResponse.substring(0, 1900) + '...'
        : formattedResponse

      // Send followup
      await sendFollowup(applicationId!, interactionToken, finalResponse)
      return
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
