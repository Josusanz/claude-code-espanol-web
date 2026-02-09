import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const GUILD_ID = '1470467868150857852'
const PRECURSO_ROLE_ID = '1470548487740325918' // 🌱 Precurso

interface UserData extends Record<string, unknown> {
  discordId?: string
  discordVerifiedAt?: string
}

async function assignRole(userId: string, roleId: string): Promise<boolean> {
  try {
    const res = await fetch(
      `https://discord.com/api/v10/guilds/${GUILD_ID}/members/${userId}/roles/${roleId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return res.ok
  } catch (error) {
    console.error('Role assignment error:', error)
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verificar secret interno
  const secret = req.headers['x-internal-secret']
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email required' })
  }

  const normalizedEmail = email.toLowerCase().trim()

  try {
    // Buscar si el usuario tiene Discord vinculado
    const userData = await kv.hgetall<UserData>(`curso:user:${normalizedEmail}`)

    if (!userData?.discordId) {
      return res.status(200).json({
        success: false,
        message: 'User has not linked Discord yet',
        email: normalizedEmail
      })
    }

    // Asignar rol 🌱 Precurso
    const assigned = await assignRole(userData.discordId, PRECURSO_ROLE_ID)

    if (assigned) {
      // Guardar que completó el precurso
      await kv.hset(`curso:user:${normalizedEmail}`, {
        precursoCompletedAt: new Date().toISOString(),
        hasPrecursoRole: true
      })

      return res.status(200).json({
        success: true,
        message: 'Precurso role assigned',
        discordId: userData.discordId
      })
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to assign role'
      })
    }
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
