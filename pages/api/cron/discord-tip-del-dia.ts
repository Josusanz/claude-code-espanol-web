import type { NextApiRequest, NextApiResponse } from 'next'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const GENERAL_CHANNEL_ID = '1470470993553395772'

// Tips del día - uno diferente cada día
const TIPS = [
  {
    emoji: '🚀',
    titulo: 'Deploy temprano, deploy seguido',
    contenido: 'No esperes a tener todo perfecto. Despliega desde el día 1 y ve iterando. Vercel hace esto súper fácil con `vercel --prod`.'
  },
  {
    emoji: '🎨',
    titulo: 'shadcn/ui es tu mejor amigo',
    contenido: 'No reinventes la rueda. Usa `npx shadcn-ui@latest add button` y tendrás componentes profesionales en segundos.'
  },
  {
    emoji: '🗄️',
    titulo: 'Supabase RLS desde el inicio',
    contenido: 'Activa Row Level Security desde el primer momento. Es más fácil empezar seguro que arreglarlo después.'
  },
  {
    emoji: '🤖',
    titulo: 'Claude como pair programmer',
    contenido: 'No solo uses Claude para generar código. Úsalo para revisar tu código, explicarte errores y sugerir mejoras.'
  },
  {
    emoji: '📱',
    titulo: 'Mobile first siempre',
    contenido: 'Diseña primero para móvil con Tailwind (`sm:`, `md:`, `lg:`). Es más fácil escalar hacia arriba que hacia abajo.'
  },
  {
    emoji: '🔐',
    titulo: 'Variables de entorno',
    contenido: 'Nunca pongas API keys en el código. Usa `.env.local` y añádelo a `.gitignore`. Vercel las gestiona por ti.'
  },
  {
    emoji: '📝',
    titulo: 'Commits pequeños y frecuentes',
    contenido: 'Mejor 10 commits pequeños que 1 gigante. Así puedes volver atrás fácilmente si algo se rompe.'
  },
  {
    emoji: '🧪',
    titulo: 'Prueba en producción (con cuidado)',
    contenido: 'Tu app en local y en Vercel pueden comportarse diferente. Prueba en el entorno real lo antes posible.'
  },
  {
    emoji: '💡',
    titulo: 'Valida tu idea primero',
    contenido: 'Antes de construir 3 meses, lanza una landing con waitlist. Si nadie se apunta, pivota rápido.'
  },
  {
    emoji: '🎯',
    titulo: 'Una feature a la vez',
    contenido: 'No intentes hacer todo. Enfócate en UNA cosa que haga tu app útil. El resto puede esperar.'
  },
  {
    emoji: '📸',
    titulo: 'Comparte tu progreso',
    contenido: 'Sube capturas a #📸-capturas. Ver el progreso de otros motiva, y el feedback te ayuda a mejorar.'
  },
  {
    emoji: '🆘',
    titulo: 'Pregunta sin miedo',
    contenido: 'Si llevas más de 30 minutos atascado, pregunta en #❓-dudas. Todos hemos estado ahí.'
  },
  {
    emoji: '⚡',
    titulo: 'Keyboard shortcuts',
    contenido: 'Aprende los atajos de VS Code. `Cmd+P` para archivos, `Cmd+Shift+P` para comandos. Tu yo futuro te lo agradecerá.'
  },
  {
    emoji: '🔄',
    titulo: 'Git branch para features',
    contenido: 'Crea una rama para cada feature: `git checkout -b feature/login`. Así main siempre funciona.'
  },
]

function getTipDelDia(): typeof TIPS[0] {
  const diaDelAño = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  return TIPS[diaDelAño % TIPS.length]
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
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }

  const tip = getTipDelDia()

  const mensaje = `# ${tip.emoji} Tip del día

**${tip.titulo}**

${tip.contenido}

---
_¿Tienes un tip? Compártelo en #💡-tips_`

  const success = await sendDiscordMessage(mensaje)

  if (success) {
    return res.status(200).json({ success: true, tip: tip.titulo })
  } else {
    return res.status(500).json({ error: 'Failed to send tip' })
  }
}
