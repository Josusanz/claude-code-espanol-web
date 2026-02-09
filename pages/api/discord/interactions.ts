import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import nacl from 'tweetnacl'

// Discord interaction types
const InteractionType = {
  PING: 1,
  APPLICATION_COMMAND: 2,
}

const InteractionResponseType = {
  PONG: 1,
  CHANNEL_MESSAGE_WITH_SOURCE: 4,
}

// Verify Discord request signature using tweetnacl
function verifyDiscordRequest(
  rawBody: string,
  signature: string,
  timestamp: string
): boolean {
  const publicKey = process.env.DISCORD_PUBLIC_KEY

  if (!signature || !timestamp || !publicKey) {
    console.log('Missing verification params:', { signature: !!signature, timestamp: !!timestamp, publicKey: !!publicKey })
    return false
  }

  try {
    const message = timestamp + rawBody
    const signatureBuffer = Buffer.from(signature, 'hex')
    const publicKeyBuffer = Buffer.from(publicKey, 'hex')
    const messageBuffer = Buffer.from(message)

    return nacl.sign.detached.verify(
      messageBuffer,
      signatureBuffer,
      publicKeyBuffer
    )
  } catch (error) {
    console.error('Verification error:', error)
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
    console.error('Error assigning role:', error)
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get raw body for signature verification
  const rawBody = JSON.stringify(req.body)
  const signature = req.headers['x-signature-ed25519'] as string
  const timestamp = req.headers['x-signature-timestamp'] as string

  // Verify the request is from Discord
  const isValid = verifyDiscordRequest(rawBody, signature, timestamp)
  if (!isValid) {
    console.log('Invalid signature')
    return res.status(401).json({ error: 'Invalid request signature' })
  }

  const { type, data, member, guild_id } = req.body

  // Handle Discord PING (required for endpoint verification)
  if (type === InteractionType.PING) {
    console.log('Received PING, responding with PONG')
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
            content: '❌ Por favor, proporciona tu email: `/verificar email:tu@email.com`',
            flags: 64, // Ephemeral (only visible to user)
          },
        })
      }

      try {
        // Check if email is enrolled in the course
        const isEnrolled = await kv.sismember('curso:emails', email)

        if (!isEnrolled) {
          // Also check precurso emails
          const isPrecurso = await kv.sismember('precurso:emails', email)

          if (!isPrecurso) {
            return res.status(200).json({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: `❌ El email **${email}** no está registrado en el curso.\n\nSi crees que es un error, contacta con Josu.`,
                flags: 64,
              },
            })
          }
        }

        // Email is enrolled - assign role
        const ALUMNO_ROLE_ID = process.env.DISCORD_ALUMNO_ROLE_ID

        if (ALUMNO_ROLE_ID && guild_id && member?.user?.id) {
          const assigned = await assignRole(guild_id, member.user.id, ALUMNO_ROLE_ID)

          if (assigned) {
            // Save verification to KV
            await kv.hset(`curso:user:${email}`, {
              discordId: member.user.id,
              discordVerifiedAt: new Date().toISOString(),
            })

            return res.status(200).json({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: `✅ ¡Verificado! Bienvenido/a al curso, **${member.user.username}**!\n\nYa tienes acceso a todos los canales. 🚀`,
                flags: 64,
              },
            })
          }
        }

        // Fallback if role assignment failed but email was valid
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `✅ Email verificado: **${email}**\n\nSi no tienes acceso a los canales, contacta a Josu.`,
            flags: 64,
          },
        })

      } catch (error) {
        console.error('Verification error:', error)
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '❌ Error al verificar. Inténtalo de nuevo más tarde.',
            flags: 64,
          },
        })
      }
    }

    if (name === 'info') {
      return res.status(200).json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `📚 **Crea tu Software con IA**\n\n` +
            `Este es el servidor del curso de 10 semanas.\n\n` +
            `🔗 Accede al curso: https://www.aprende.software/curso\n` +
            `📅 Inicio: 19 febrero 2026\n` +
            `👨‍🏫 Instructor: Josu Sanz`,
          flags: 64,
        },
      })
    }
  }

  return res.status(200).json({ type: InteractionResponseType.PONG })
}

export const config = {
  api: {
    bodyParser: true,
  },
}
