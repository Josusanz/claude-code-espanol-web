import type { NextApiRequest, NextApiResponse } from 'next'
import { CURSO_SEMANAS } from '../../../lib/curso-data'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const GENERAL_CHANNEL_ID = '1470470993553395772'
const ZOOM_LINK = 'https://us06web.zoom.us/j/81059741055?pwd=Xqh8R7S3jwIYLo0gC8X0eRvJz66YOy.1'

// Calendario generado desde curso-data.ts (fuente de verdad)
const CLASES: Record<string, { semana: number; tema: string; hora: string }> = {}
for (const s of CURSO_SEMANAS) {
  CLASES[s.clase.fecha] = { semana: s.num, tema: s.titulo, hora: s.clase.hora }
  // Multi-day weeks: add Día 2 entries from dias array
  if (s.dias && s.dias.length > 1) {
    const dia2 = s.dias[1]
    if (dia2.clase?.fecha) {
      CLASES[dia2.clase.fecha] = { semana: s.num, tema: `${s.titulo} - Día 2`, hora: dia2.clase.hora }
    }
  }
}

function getMadridHour(): number {
  const now = new Date()
  const madridTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Madrid' }))
  return madridTime.getHours()
}

async function sendDiscordMessage(content: string): Promise<boolean> {
  try {
    const res = await fetch(`https://discord.com/api/v10/channels/${GENERAL_CHANNEL_ID}/messages`, {
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
  // Verificar que es una llamada de Vercel Cron
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // En desarrollo, permitir sin auth
    if (process.env.NODE_ENV === 'production') {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }

  // Verificar que son las 18:00 hora de Madrid (1h antes de la clase a las 19:00)
  // El cron se ejecuta a las 16 y 17 UTC para cubrir CET (UTC+1) y CEST (UTC+2)
  const madridHour = getMadridHour()
  if (madridHour !== 18) {
    return res.status(200).json({ message: 'No es la hora del recordatorio en Madrid', madridHour })
  }

  // Obtener fecha de hoy en zona horaria de Madrid
  const madridDate = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Madrid' })
  const clase = CLASES[madridDate]

  if (!clase) {
    return res.status(200).json({ message: 'No hay clase hoy', fecha: madridDate })
  }

  const mensaje = `# 🔔 ¡Clase en 1 hora!

**Semana ${clase.semana}: ${clase.tema}**

⏰ **${clase.hora}** (en 1 hora)
📹 [**Unirse a Zoom**](${ZOOM_LINK})

¡Nos vemos ahí! 🚀`

  const success = await sendDiscordMessage(mensaje)

  if (success) {
    return res.status(200).json({ success: true, semana: clase.semana, tema: clase.tema })
  } else {
    return res.status(500).json({ error: 'Failed to send reminder' })
  }
}
