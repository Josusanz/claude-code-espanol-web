import type { NextApiRequest, NextApiResponse } from 'next'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const GENERAL_CHANNEL_ID = '1470470993553395772'
const ZOOM_LINK = 'https://us06web.zoom.us/j/81059741055?pwd=Xqh8R7S3jwIYLo0gC8X0eRvJz66YOy.1'

// Calendario de clases (fechas en formato YYYY-MM-DD)
const CLASES: Record<string, { semana: number; tema: string }> = {
  '2026-02-19': { semana: 1, tema: 'LaunchPad - Día 1' },
  '2026-02-20': { semana: 1, tema: 'LaunchPad - Día 2' },
  '2026-02-27': { semana: 2, tema: 'Tu proyecto - Setup + UI' },
  '2026-03-06': { semana: 3, tema: 'Base de datos con Supabase' },
  '2026-03-13': { semana: 4, tema: 'Autenticación' },
  '2026-03-20': { semana: 5, tema: 'APIs y Backend' },
  '2026-03-27': { semana: 6, tema: 'Integración con Claude' },
  '2026-04-03': { semana: 7, tema: 'Pagos con Stripe' },
  '2026-04-10': { semana: 8, tema: 'Testing y QA' },
  '2026-04-17': { semana: 9, tema: 'Deploy y DevOps' },
  '2026-04-24': { semana: 10, tema: 'Lanzamiento y Marketing' },
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

  // Obtener fecha de hoy
  const hoy = new Date().toISOString().split('T')[0]
  const clase = CLASES[hoy]

  if (!clase) {
    return res.status(200).json({ message: 'No hay clase hoy', fecha: hoy })
  }

  const mensaje = `# 🔔 ¡Clase en 1 hora!

**Semana ${clase.semana}: ${clase.tema}**

⏰ **18:00 CET** (en 1 hora)
📹 [**Unirse a Zoom**](${ZOOM_LINK})

¡Nos vemos ahí! 🚀`

  const success = await sendDiscordMessage(mensaje)

  if (success) {
    return res.status(200).json({ success: true, semana: clase.semana, tema: clase.tema })
  } else {
    return res.status(500).json({ error: 'Failed to send reminder' })
  }
}
