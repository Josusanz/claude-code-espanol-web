import type { NextApiRequest, NextApiResponse } from 'next'
import Anthropic from '@anthropic-ai/sdk'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'claude-code-admin'

const PROMPTS: Record<string, string> = {
  news: `Eres un experto en IA y tecnología que escribe para Twitter/X en español.

Tu tarea es traducir y adaptar esta noticia de IA al español para la audiencia hispanohablante.

Reglas:
- Máximo 280 caracteres (es UN tweet, no un hilo)
- Empieza con un emoji relevante
- Traduce pero adapta el tono para España/LATAM
- Añade hashtags relevantes al final (#IA #ClaudeCode etc)
- Si es muy largo, resume lo esencial
- Termina con un gancho o pregunta si cabe

Contenido original:`,

  thread: `Eres un experto en IA que crea hilos educativos virales en español.

Tu tarea es crear un hilo de Twitter (3-5 tweets) explicando este concepto.

Reglas:
- Tweet 1: Hook potente que genere curiosidad (empieza con emoji)
- Tweets 2-4: Explica paso a paso, simple y claro
- Tweet final: CTA o reflexión + hashtags
- Cada tweet máximo 280 caracteres
- Separa tweets con ---
- Usa emojis con moderación (1-2 por tweet)

Tema a explicar:`,

  hottake: `Eres un experto en IA con opiniones fuertes pero fundamentadas.

Tu tarea es escribir un "hot take" (opinión controvertida) sobre este tema.

Reglas:
- Máximo 280 caracteres
- Empieza fuerte, sin rodeos
- Sé contrario al consenso pero con lógica
- Genera debate (la gente querrá responder)
- Termina con pregunta o afirmación provocadora
- Un emoji máximo al inicio

Tema:`,

  tip: `Eres un experto en Claude Code que comparte tips prácticos.

Tu tarea es crear un tip rápido y accionable sobre Claude Code o IA.

Reglas:
- Máximo 280 caracteres
- Empieza con "💡 Tip:" o similar
- Un solo consejo, muy específico
- Que se pueda aplicar inmediatamente
- Incluye ejemplo si cabe
- Hashtag #ClaudeCode al final

Contexto o tema:`,

  demo: `Eres un creador que muestra resultados impresionantes con IA.

Tu tarea es escribir un tweet mostrando un resultado o demo.

Reglas:
- Máximo 280 caracteres
- Empieza con el resultado/logro (números si hay)
- Menciona la herramienta usada
- Genera curiosidad ("¿Cómo? En el hilo...")
- Si es apropiado, menciona el tiempo ahorrado
- Termina con CTA sutil

Resultado a mostrar:`,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Simple auth check (in production, use proper auth)
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${ADMIN_SECRET}` && !req.headers.cookie?.includes('admin')) {
    // Allow for now during development - add proper auth later
  }

  const { content, type } = req.body

  if (!content || !type) {
    return res.status(400).json({ error: 'Content and type are required' })
  }

  const systemPrompt = PROMPTS[type]
  if (!systemPrompt) {
    return res.status(400).json({ error: 'Invalid content type' })
  }

  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `${systemPrompt}\n\n${content}`,
        },
      ],
    })

    const generatedContent = response.content[0].type === 'text'
      ? response.content[0].text
      : ''

    res.status(200).json({ content: generatedContent })
  } catch (error) {
    console.error('Error generating content:', error)
    res.status(500).json({ error: 'Error generating content' })
  }
}
