import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const config = {
  runtime: 'edge',
}

const CURSO_CONTEXT = `Eres el asistente del curso "Crea tu Software con IA" de Josu Sanz.

INFORMACIÓN DEL CURSO:
- Duración: 10 semanas (19 febrero - 24 abril 2026)
- Formato: Clases en vivo por Zoom + contenido + comunidad Discord
- Objetivo: Crear tu propio SaaS usando IA como copiloto

TECNOLOGÍAS: Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Vercel, Claude/ChatGPT

REGLAS: Responde en español, sé conciso (máx 1000 chars), usa ejemplos de código si es útil.`

async function askClaude(question: string): Promise<string> {
  const client = new Anthropic()

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 300,
      messages: [{ role: 'user', content: question }],
      system: CURSO_CONTEXT
    })

    const textBlock = response.content.find(block => block.type === 'text')
    if (textBlock && textBlock.type === 'text') {
      return textBlock.text
    }
    return 'No pude generar una respuesta.'
  } catch (error) {
    console.error('Claude API error:', error)
    return 'Error al consultar con Claude.'
  }
}

async function sendFollowup(applicationId: string, token: string, content: string) {
  const url = `https://discord.com/api/v10/webhooks/${applicationId}/${token}`
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  })
}

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const { pregunta, token } = await req.json()
  const applicationId = process.env.DISCORD_APP_ID

  if (!pregunta || !token || !applicationId) {
    return new Response('Missing params', { status: 400 })
  }

  // Call Claude
  const answer = await askClaude(pregunta)
  const formattedResponse = `**Pregunta:** ${pregunta}\n\n**Respuesta:**\n${answer}`
  const finalResponse = formattedResponse.length > 1900
    ? formattedResponse.substring(0, 1900) + '...'
    : formattedResponse

  // Send followup to Discord
  await sendFollowup(applicationId, token, finalResponse)

  return new Response('OK')
}
