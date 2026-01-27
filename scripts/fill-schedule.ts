// Script para llenar los huecos del calendario de Typefully
// Ejecutar con: npx ts-node scripts/fill-schedule.ts

const TYPEFULLY_API_KEY = 'aSJLJtd71NatgLxvFhxhk8c5IH2VH5UD'
const SOCIAL_SET_ID = '257216'

// Posts para los huecos (08:30 y 21:00) - NO promocionales
const FILL_POSTS = [
  // LUNES 27 - Ya tienes 07:30 y 18:00
  {
    date: '2026-01-27T12:00:00Z', // 13:00 España
    content: `¿Cuál es tu stack de herramientas de IA ahora mismo?

El mío:
• Claude para código
• Perplexity para research
• Midjourney para diseño
• Notion AI para docs

Dime el tuyo 👇`
  },
  {
    date: '2026-01-27T20:00:00Z', // 21:00 España
    content: `💡 Tip: Antes de pedirle algo a una IA, piensa:

"¿Cómo se lo explicaría a un junior muy capaz?"

Contexto + Objetivo + Formato = Respuestas útiles.

Así de simple.`
  },

  // MARTES 28 - Tienes 13:30 y 18:00
  {
    date: '2026-01-28T07:30:00Z', // 08:30 España
    content: `📊 Dato curioso:

El 73% de los desarrolladores ya usa alguna herramienta de IA.

Pero solo el 15% la usa de forma "avanzada".

La diferencia está en los prompts y el flujo de trabajo.

#DevLife #IA`
  },
  {
    date: '2026-01-28T20:00:00Z', // 21:00 España
    content: `La IA no es magia.

Es una herramienta muy potente que amplifica lo que ya sabes hacer.

Si no sabes programar, no te hará programador.
Si sabes, te hará 10x mejor.

Primero aprende los fundamentos.`
  },

  // MIÉRCOLES 29 - Tienes 13:30 y 18:00
  {
    date: '2026-01-29T07:30:00Z', // 08:30 España
    content: `☕ Empezar el día con claridad > empezar con emails.

Mi rutina:
1. 10 min definir la tarea más importante
2. 2h de trabajo profundo (sin distracciones)
3. Después ya miro emails/Slack

Productividad real.`
  },
  {
    date: '2026-01-29T20:00:00Z', // 21:00 España
    content: `💡 Cuando uses IA para código, siempre revisa:

1. ¿Hace lo que pedí?
2. ¿Es seguro? (SQL injection, XSS, etc)
3. ¿Es eficiente?
4. ¿Lo entiendo?

Copiar sin entender = deuda técnica.

#Programación`
  },

  // JUEVES 30 - Tienes 13:30 y 18:00
  {
    date: '2026-01-30T07:30:00Z', // 08:30 España
    content: `🎯 El mejor código es el que no escribes.

Antes de programar algo, pregúntate:
• ¿Ya existe una librería?
• ¿Es realmente necesario?
• ¿Puedo simplificarlo?

Menos código = menos bugs.`
  },
  {
    date: '2026-01-30T20:00:00Z', // 21:00 España
    content: `Si pudieras automatizar UNA cosa de tu trabajo, ¿qué sería?

Pista: probablemente ya se puede hacer con IA.

Cuéntame y te digo cómo 👇`
  },

  // VIERNES 31 - Tienes 13:30 y 18:00
  {
    date: '2026-01-31T07:30:00Z', // 08:30 España
    content: `🔥 Viernes = día de cerrar pendientes.

Mi regla: no empezar nada nuevo los viernes.

Solo:
• Terminar lo empezado
• Documentar
• Preparar la semana siguiente

¿Cómo organizas tus viernes?`
  },
  {
    date: '2026-01-31T20:00:00Z', // 21:00 España
    content: `🎉 Fin de semana = tiempo de side projects.

¿Qué vas a construir?

Ideas rápidas:
• Bot de Telegram
• Chrome extension
• CLI tool
• Landing page

Comparte tu proyecto 👇`
  },

  // SÁBADO 1 FEB - Tienes 13:30 y 18:00
  {
    date: '2026-02-01T07:30:00Z', // 08:30 España
    content: `☕ Sábado de café y código.

Hoy es buen día para:
• Explorar una nueva herramienta
• Terminar ese side project
• Aprender algo nuevo sin presión

¿Qué tienes planeado?`
  },
  {
    date: '2026-02-01T20:00:00Z', // 21:00 España
    content: `El código perfecto no existe.

El código que funciona y puedes mejorar después > el código que nunca escribes por perfeccionismo.

Ship it. 🚀`
  },

  // DOMINGO 2 FEB - No tienes nada
  {
    date: '2026-02-02T07:30:00Z', // 08:30 España
    content: `🌅 Domingo para recargar.

Pero si te pica el gusanillo de construir algo...

Permítete hacerlo.

Los side projects nacen cuando no hay presión.`
  },
  {
    date: '2026-02-02T12:00:00Z', // 13:00 España
    content: `Mi filosofía con la IA:

No es reemplazo, es apalancamiento.

Tú pones:
• Creatividad
• Criterio
• Dirección

La IA pone:
• Velocidad
• Ejecución
• Opciones

Juntos = superpoderes.`
  },
  {
    date: '2026-02-02T17:00:00Z', // 18:00 España
    content: `📚 Para esta semana me propongo:

1. Terminar un feature pendiente
2. Escribir documentación
3. Probar una herramienta nueva

¿Cuáles son tus objetivos de la semana?`
  },
  {
    date: '2026-02-02T20:00:00Z', // 21:00 España
    content: `Mañana empieza una nueva semana.

3 preguntas para prepararla:

1. ¿Qué es lo MÁS importante?
2. ¿Qué puedo delegar o automatizar?
3. ¿Qué NO voy a hacer?

Claridad = productividad.

Buenas noches 🌙`
  },
]

async function schedulePosts() {
  console.log('📅 Programando posts complementarios...\n')

  for (const post of FILL_POSTS) {
    try {
      const response = await fetch(
        `https://api.typefully.com/v2/social-sets/${SOCIAL_SET_ID}/drafts`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${TYPEFULLY_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            platforms: {
              x: {
                enabled: true,
                posts: [{ text: post.content }],
              },
              linkedin: {
                enabled: true,
                posts: [{ text: post.content }],
              },
              threads: {
                enabled: true,
                posts: [{ text: post.content.slice(0, 500) }],
              },
            },
            scheduled_date: post.date,
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        const dateStr = new Date(post.date).toLocaleString('es-ES', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        })
        console.log(`✅ ${dateStr}: "${post.content.slice(0, 40)}..."`)
      } else {
        const error = await response.text()
        console.log(`❌ Error: ${error}`)
      }
    } catch (error) {
      console.log(`❌ Error: ${error}`)
    }
  }

  console.log('\n✨ ¡Listo! Revisa tu cola en Typefully.')
}

schedulePosts()
