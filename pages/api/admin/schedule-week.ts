import type { NextApiRequest, NextApiResponse } from 'next'
import { createDraft } from '../../../lib/typefully'

// Contenido variado para la semana - NO todo sobre Claude
const WEEKLY_POSTS = [
  // LUNES 27
  { time: '08:30', content: '🧠 La mayoría piensa que la IA reemplazará programadores.\n\nLa realidad: reemplazará a los que NO usen IA.\n\nLos que la dominen multiplicarán su productividad x10.\n\n¿De qué lado quieres estar?\n\n#IA #Productividad' },
  { time: '13:00', content: '¿Cuál es tu stack de herramientas de IA ahora mismo?\n\nEl mío:\n- Claude para código\n- Perplexity para research\n- Midjourney para diseño\n- Notion AI para docs\n\nDime el tuyo 👇' },
  { time: '18:00', content: '🔥 Hot take: El 90% de los "cursos de IA" son solo screenshots de ChatGPT.\n\nNo necesitas un curso de $500 para aprender prompting.\n\nNecesitas práctica real resolviendo TUS problemas.\n\n#IA #Aprendizaje' },
  { time: '21:00', content: '💡 Tip: Antes de pedirle algo a una IA, piensa:\n\n"¿Cómo se lo explicaría a un junior muy capaz?"\n\nContexto + Objetivo + Formato = Respuestas útiles.\n\nAsí de simple.' },

  // MARTES 28
  { time: '08:30', content: '📊 Dato curioso:\n\nEl 73% de los desarrolladores ya usa alguna herramienta de IA.\n\nPero solo el 15% la usa de forma "avanzada".\n\nLa diferencia está en los prompts y el flujo de trabajo.\n\n#DevLife #IA' },
  { time: '13:00', content: '¿Qué tarea repetitiva haces cada semana que podrías automatizar con IA?\n\nYo automaticé:\n- Resumen de emails\n- Transcripción de reuniones\n- Primer borrador de docs\n\nAhorro: ~5h/semana\n\n¿Y tú?' },
  { time: '18:00', content: '🚀 Claude Code es brutal para refactorizar código legacy.\n\nLe pasas el archivo, le dices "moderniza esto siguiendo mejores prácticas" y boom.\n\nLo que tardabas 2 días, en 20 minutos.\n\n#ClaudeCode #Programación' },
  { time: '21:00', content: 'La IA no es magia.\n\nEs una herramienta muy potente que amplifica lo que ya sabes hacer.\n\nSi no sabes programar, no te hará programador.\nSi sabes, te hará 10x mejor.\n\nPrimero aprende los fundamentos.' },

  // MIÉRCOLES 29
  { time: '08:30', content: '☕ Empezar el día con claridad > empezar con emails.\n\nMi rutina:\n1. 10 min definir la tarea más importante\n2. 2h de trabajo profundo (sin distracciones)\n3. Después ya miro emails/Slack\n\nProductividad real.' },
  { time: '13:00', content: '¿Cuál fue el último proyecto personal que terminaste?\n\nNo vale decir "estoy en ello" 😅\n\nEl secreto: proyectos pequeños que puedas acabar en un fin de semana.\n\nDime el tuyo 👇' },
  { time: '18:00', content: '🤖 Perplexity está infravalorado.\n\nPara research técnico es mejor que Google:\n- Fuentes citadas\n- Sin SEO spam\n- Respuestas directas\n\nLo uso todos los días.\n\n#Perplexity #Research' },
  { time: '21:00', content: '💡 Cuando uses IA para código, siempre revisa:\n\n1. ¿Hace lo que pedí?\n2. ¿Es seguro? (SQL injection, XSS, etc)\n3. ¿Es eficiente?\n4. ¿Lo entiendo?\n\nCopiar sin entender = deuda técnica.\n\n#Programación' },

  // JUEVES 30
  { time: '08:30', content: '🎯 El mejor código es el que no escribes.\n\nAntes de programar algo, pregúntate:\n- ¿Ya existe una librería?\n- ¿Es realmente necesario?\n- ¿Puedo simplificarlo?\n\nMenos código = menos bugs.' },
  { time: '13:00', content: 'Debate: ¿Es mejor dominar UNA herramienta de IA o saber usar VARIAS?\n\n🅰️ Especialízate en una\n🅱️ Aprende varias para cada tarea\n\nYo soy más del B, pero depende del contexto.\n\n¿Tú?' },
  { time: '18:00', content: '📱 Las apps que más uso en 2025:\n\n• Arc (navegador)\n• Raycast (launcher)\n• Claude (código)\n• Notion (docs)\n• Linear (tareas)\n• Figma (diseño)\n\n¿Cuáles añadirías?' },
  { time: '21:00', content: 'Si pudieras automatizar UNA cosa de tu trabajo, ¿qué sería?\n\nPista: probablemente ya se puede hacer con IA.\n\nCuéntame y te digo cómo 👇' },

  // VIERNES 31
  { time: '08:30', content: '🔥 Viernes = día de cerrar pendientes.\n\nMi regla: no empezar nada nuevo los viernes.\n\nSolo:\n- Terminar lo empezado\n- Documentar\n- Preparar la semana siguiente\n\n¿Cómo organizas tus viernes?' },
  { time: '13:00', content: 'La mejor forma de aprender IA:\n\n1. Elige UN problema real que tengas\n2. Intenta resolverlo con IA\n3. Documenta qué funcionó y qué no\n4. Repite\n\nNada de tutoriales infinitos.\nProblemas reales = aprendizaje real.' },
  { time: '18:00', content: '💻 Con Claude Code puedes crear una landing page en 30 minutos.\n\nSin saber diseño.\nSin templates.\nSolo describiendo lo que quieres.\n\nEl futuro del desarrollo web ya llegó.\n\n#ClaudeCode #WebDev' },
  { time: '21:00', content: '🎉 Fin de semana = tiempo de side projects.\n\n¿Qué vas a construir?\n\nIdeas rápidas:\n- Bot de Telegram\n- Chrome extension\n- CLI tool\n- Landing page\n\nComparte tu proyecto 👇' },

  // SÁBADO 1 FEB
  { time: '08:30', content: '☕ Sábado de café y código.\n\nHoy es buen día para:\n- Explorar una nueva herramienta\n- Terminar ese side project\n- Aprender algo nuevo sin presión\n\n¿Qué tienes planeado?' },
  { time: '13:00', content: 'Las mejores cuentas de tech/IA que sigo:\n\n@levelsio - indie hacking\n@swyx - AI engineering  \n@karpathy - deep learning\n@sama - visión de futuro\n\n¿A quién más debería seguir?' },
  { time: '18:00', content: '🧪 Experimento del finde:\n\nCrea algo pequeño con IA que te ahorre 10 minutos a la semana.\n\nParece poco, pero son 8+ horas al año.\n\nLas pequeñas automatizaciones suman.' },
  { time: '21:00', content: 'El código perfecto no existe.\n\nEl código que funciona y puedes mejorar después > el código que nunca escribes por perfeccionismo.\n\nShip it. 🚀' },

  // DOMINGO 2 FEB
  { time: '08:30', content: '🌅 Domingo para recargar.\n\nPero si te pica el gusanillo de construir algo...\n\nPermítete hacerlo.\n\nLos side projects nacen cuando no hay presión.' },
  { time: '13:00', content: 'Mi filosofía con la IA:\n\nNo es reemplazo, es apalancamiento.\n\nTú pones:\n- Creatividad\n- Criterio\n- Dirección\n\nLa IA pone:\n- Velocidad\n- Ejecución\n- Opciones\n\nJuntos = superpoderes.' },
  { time: '18:00', content: '📚 Para esta semana me propongo:\n\n1. Terminar un feature pendiente\n2. Escribir documentación\n3. Probar una herramienta nueva\n\n¿Cuáles son tus objetivos de la semana?' },
  { time: '21:00', content: 'Mañana empieza una nueva semana.\n\n3 preguntas para prepararla:\n\n1. ¿Qué es lo MÁS importante?\n2. ¿Qué puedo delegar o automatizar?\n3. ¿Qué NO voy a hacer?\n\nClaridad = productividad.\n\nBuenas noches 🌙' },
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { dryRun = true } = req.body

  try {
    const results = []

    for (const post of WEEKLY_POSTS) {
      if (dryRun) {
        results.push({ status: 'dry-run', content: post.content, time: post.time })
      } else {
        try {
          const result = await createDraft({
            platforms: {
              x: { posts: [{ text: post.content }] },
            },
            publishAt: 'next-free-slot',
          })
          results.push({ status: 'scheduled', content: post.content.slice(0, 50) + '...', result })
        } catch (error) {
          results.push({ status: 'error', content: post.content.slice(0, 50) + '...', error: String(error) })
        }
      }
    }

    res.status(200).json({
      message: dryRun ? 'Vista previa de posts' : 'Posts programados',
      totalPosts: WEEKLY_POSTS.length,
      results
    })
  } catch (error) {
    console.error('Error scheduling week:', error)
    res.status(500).json({ error: 'Error scheduling posts' })
  }
}
