import type { NextApiRequest, NextApiResponse } from 'next'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const GENERAL_CHANNEL_ID = '1470470993553395772' // #general
const ANUNCIOS_CHANNEL_ID = '1470548548125982892' // #anuncios

interface ReminderType {
  type: 'clase' | 'tarea' | 'custom'
  semana?: number
  message?: string
  channel?: 'general' | 'anuncios'
}

async function sendDiscordMessage(channelId: string, content: string): Promise<boolean> {
  try {
    const res = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
    return res.ok
  } catch (error) {
    console.error('Discord send error:', error)
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar secret para proteger el endpoint
  const secret = req.headers['x-reminder-secret'] || req.query.secret
  if (secret !== process.env.REMINDER_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { type, semana, message, channel = 'general' } = req.body as ReminderType
  const channelId = channel === 'anuncios' ? ANUNCIOS_CHANNEL_ID : GENERAL_CHANNEL_ID

  let content = ''

  if (type === 'clase') {
    content = `# 🔔 ¡Recordatorio de clase!

**La clase de la Semana ${semana || '?'}** empieza en **1 hora**.

📅 Hoy a las **19:00 CET**
🔗 [Unirse a Zoom](https://us06web.zoom.us/j/81059741055?pwd=Xqh8R7S3jwIYLo0gC8X0eRvJz66YOy.1)

¡Nos vemos ahí! 🚀`
  } else if (type === 'tarea') {
    content = `# ⏰ Recordatorio de entregable

El **entregable de la Semana ${semana || '?'}** vence pronto.

📤 Sube tu progreso a **#📸-capturas**
💬 Comparte tus dudas en el canal de la semana

¡Tú puedes! 💪`
  } else if (type === 'custom' && message) {
    content = message
  } else {
    return res.status(400).json({ error: 'Invalid reminder type or missing message' })
  }

  const success = await sendDiscordMessage(channelId, content)

  if (success) {
    return res.status(200).json({ success: true, message: 'Reminder sent' })
  } else {
    return res.status(500).json({ error: 'Failed to send reminder' })
  }
}
