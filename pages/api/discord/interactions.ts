import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'

// Discord interaction types
const InteractionType = {
  PING: 1,
  APPLICATION_COMMAND: 2,
}

const InteractionResponseType = {
  PONG: 1,
  CHANNEL_MESSAGE_WITH_SOURCE: 4,
}

// Verify Discord request signature
async function verifyDiscordRequest(req: NextApiRequest): Promise<boolean> {
  const signature = req.headers['x-signature-ed25519'] as string
  const timestamp = req.headers['x-signature-timestamp'] as string
  const publicKey = process.env.DISCORD_PUBLIC_KEY

  if (!signature || !timestamp || !publicKey) {
    return false
  }

  try {
    const { subtle } = await import('crypto').then(c => c.webcrypto)

    const body = JSON.stringify(req.body)
    const message = timestamp + body

    const signatureBuffer = hexToUint8Array(signature)
    const publicKeyBuffer = hexToUint8Array(publicKey)
    const messageBuffer = new TextEncoder().encode(message)

    const key = await subtle.importKey(
      'raw',
      publicKeyBuffer,
      { name: 'Ed25519' },
      false,
      ['verify']
    )

    return await subtle.verify(
      'Ed25519',
      key,
      signatureBuffer,
      messageBuffer
    )
  } catch (error) {
    console.error('Verification error:', error)
    return false
  }
}

function hexToUint8Array(hex: string): Uint8Array {
  const matches = hex.match(/.{1,2}/g)
  if (!matches) return new Uint8Array()
  return new Uint8Array(matches.map(byte => parseInt(byte, 16)))
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

  // Verify the request is from Discord
  const isValid = await verifyDiscordRequest(req)
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid request signature' })
  }

  const { type, data, member, guild_id } = req.body

  // Handle Discord PING (required for verification)
  if (type === InteractionType.PING) {
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
                content: `❌ El email **${email}** no está registrado en el curso.\n\nSi crees que es un error, contacta con el instructor.`,
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
                content: `✅ ¡Verificado! Bienvenido/a al curso, **${member.user.username}**!\n\nAhora tienes acceso a todos los canales del curso. 🚀`,
                flags: 64,
              },
            })
          }
        }

        // Fallback if role assignment failed but email was valid
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `✅ Email verificado: **${email}**\n\nSi no tienes acceso a los canales, contacta al instructor.`,
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
  }

  return res.status(200).json({ type: InteractionResponseType.PONG })
}

// Disable body parsing to get raw body for signature verification
export const config = {
  api: {
    bodyParser: true,
  },
}
