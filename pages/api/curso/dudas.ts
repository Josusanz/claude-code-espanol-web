import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { isEmailAuthorizedForCurso } from '../../../lib/curso-kv'
import { awardPoints, PUNTOS_TABLE } from '../../../lib/curso-puntos'

export interface DudaRespuesta {
  id: string
  autor: string
  contenido: string
  createdAt: string
  isInstructor: boolean
}

export interface Duda {
  id: string
  email: string
  nombre: string
  pregunta: string
  categoria: string
  createdAt: string
  discordMessageId?: string
  respuestas: DudaRespuesta[]
  resuelta: boolean
  votos: number
}

const CATEGORIAS_VALIDAS = ['general', 'setup', 'proyecto', 'supabase', 'auth', 'api', 'pagos', 'deploy', 'diseño', 'otro']

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET — listar dudas
  if (req.method === 'GET') {
    const { categoria, page: pageStr, limit: limitStr } = req.query
    const page = parseInt(pageStr as string) || 1
    const limit = Math.min(parseInt(limitStr as string) || 20, 50)

    try {
      // Get all duda IDs from sorted set (newest first)
      const start = (page - 1) * limit
      const dudaIds = await kv.zrange<string[]>('curso:dudas', start, start + limit - 1, { rev: true })

      if (!dudaIds || dudaIds.length === 0) {
        return res.status(200).json({ dudas: [], total: 0, page, limit })
      }

      // Fetch all dudas in parallel
      const dudas: Duda[] = []
      for (const id of dudaIds) {
        const duda = await kv.get<Duda>(`curso:duda:${id}`)
        if (duda) {
          if (categoria && categoria !== 'todas' && duda.categoria !== categoria) continue
          dudas.push(duda)
        }
      }

      const total = await kv.zcard('curso:dudas')

      return res.status(200).json({ dudas, total, page, limit })
    } catch (error) {
      console.error('Error listing dudas:', error)
      return res.status(200).json({ dudas: [], total: 0, page, limit })
    }
  }

  // POST — crear duda
  if (req.method === 'POST') {
    const { email, nombre, pregunta, categoria } = req.body

    if (!email || !pregunta) {
      return res.status(400).json({ error: 'Email y pregunta requeridos' })
    }

    const isAuthorized = await isEmailAuthorizedForCurso(email)
    if (!isAuthorized) {
      return res.status(403).json({ error: 'Email no autorizado' })
    }

    if (categoria && !CATEGORIAS_VALIDAS.includes(categoria)) {
      return res.status(400).json({ error: 'Categoría no válida' })
    }

    try {
      const id = `d${Date.now()}`
      const duda: Duda = {
        id,
        email: email.toLowerCase().trim(),
        nombre: nombre || email.split('@')[0],
        pregunta: pregunta.trim().slice(0, 2000),
        categoria: categoria || 'general',
        createdAt: new Date().toISOString(),
        respuestas: [],
        resuelta: false,
        votos: 0,
      }

      // Save duda
      await kv.set(`curso:duda:${id}`, duda)
      // Add to sorted set (score = timestamp)
      await kv.zadd('curso:dudas', { score: Date.now(), member: id })

      // Award points
      await awardPoints(email, PUNTOS_TABLE['publicar-duda'], 'Publicó una duda', `duda:${id}`)

      // Post to Discord (best-effort)
      try {
        const botToken = process.env.DISCORD_BOT_TOKEN
        const channelId = process.env.DISCORD_DUDAS_CHANNEL_ID
        if (botToken && channelId) {
          const discordRes = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
            method: 'POST',
            headers: {
              'Authorization': `Bot ${botToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: `**Nueva duda de ${duda.nombre}** [${duda.categoria}]\n\n${duda.pregunta}\n\n_Responde en la web: https://www.aprende.software/curso/dudas/${id}_`,
            }),
          })
          if (discordRes.ok) {
            const msg = await discordRes.json()
            duda.discordMessageId = msg.id
            await kv.set(`curso:duda:${id}`, duda)
          }
        }
      } catch { /* Discord is best-effort */ }

      return res.status(201).json({ success: true, duda })
    } catch (error) {
      console.error('Error creating duda:', error)
      return res.status(500).json({ error: 'Error creando duda' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
