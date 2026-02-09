import type { NextApiRequest, NextApiResponse } from 'next'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const GENERAL_CHANNEL_ID = '1470470993553395772'

// Semanas del curso con fechas de inicio
const SEMANAS = [
  { num: 1, inicio: '2026-02-19', fin: '2026-02-26', entregable: 'Waitlist desplegada con dominio propio' },
  { num: 2, inicio: '2026-02-27', fin: '2026-03-05', entregable: 'Proyecto en GitHub con UI completa' },
  { num: 3, inicio: '2026-03-06', fin: '2026-03-12', entregable: 'Base de datos configurada con CRUD' },
  { num: 4, inicio: '2026-03-13', fin: '2026-03-19', entregable: 'Autenticación funcionando' },
  { num: 5, inicio: '2026-03-20', fin: '2026-03-26', entregable: 'API endpoints creados' },
  { num: 6, inicio: '2026-03-27', fin: '2026-04-02', entregable: 'Integración con Claude funcionando' },
  { num: 7, inicio: '2026-04-03', fin: '2026-04-09', entregable: 'Pagos con Stripe configurados' },
  { num: 8, inicio: '2026-04-10', fin: '2026-04-16', entregable: 'Tests básicos implementados' },
  { num: 9, inicio: '2026-04-17', fin: '2026-04-23', entregable: 'App desplegada en producción' },
  { num: 10, inicio: '2026-04-24', fin: '2026-04-30', entregable: '¡MVP lanzado!' },
]

function getSemanaActual(): typeof SEMANAS[0] | null {
  const hoy = new Date().toISOString().split('T')[0]

  for (const semana of SEMANAS) {
    if (hoy >= semana.inicio && hoy <= semana.fin) {
      return semana
    }
  }
  return null
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
    if (process.env.NODE_ENV === 'production') {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }

  const semana = getSemanaActual()

  if (!semana) {
    return res.status(200).json({ message: 'No estamos en semana de curso activa' })
  }

  const mensaje = `# ⏰ Recordatorio de entregable

**Semana ${semana.num}** termina pronto.

📦 **Tu entregable:** ${semana.entregable}

---

✅ ¿Ya lo terminaste? ¡Comparte en #📸-capturas!
🆘 ¿Necesitas ayuda? Pregunta en #❓-dudas
🛠️ Actualiza tu progreso en #🛠️-proyectos

¡Tú puedes! 💪`

  const success = await sendDiscordMessage(mensaje)

  if (success) {
    return res.status(200).json({ success: true, semana: semana.num })
  } else {
    return res.status(500).json({ error: 'Failed to send reminder' })
  }
}
