import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { isEmailAuthorizedForCurso } from '../../../lib/curso-kv'
import { awardPoints, PUNTOS_TABLE } from '../../../lib/curso-puntos'

export interface ProyectoHito {
  id: string
  tipo: 'localhost' | 'database' | 'auth' | 'design' | 'payments' | 'deploy' | 'production' | 'custom'
  titulo: string
  descripcion?: string
  createdAt: string
}

export interface Proyecto {
  id: string
  email: string
  nombre: string
  descripcion: string
  tecnologias: string[]
  repoUrl?: string
  produccionUrl?: string
  discordThreadId?: string
  createdAt: string
  updatedAt: string
  hitos: ProyectoHito[]
}

const HITO_EMOJIS: Record<string, string> = {
  localhost: '🖥️',
  database: '🗄️',
  auth: '🔐',
  design: '🎨',
  payments: '💳',
  deploy: '🚀',
  production: '🌍',
  custom: '⭐',
}

export { HITO_EMOJIS }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET — listar proyectos
  if (req.method === 'GET') {
    try {
      const projectIds = await kv.smembers<string[]>('curso:proyectos')
      if (!projectIds || projectIds.length === 0) {
        return res.status(200).json({ proyectos: [] })
      }

      const proyectos: Proyecto[] = []
      for (const id of projectIds) {
        const proyecto = await kv.get<Proyecto>(`curso:proyecto:${id}`)
        if (proyecto) proyectos.push(proyecto)
      }

      // Sort by most recent
      proyectos.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

      return res.status(200).json({ proyectos })
    } catch (error) {
      console.error('Error listing proyectos:', error)
      return res.status(200).json({ proyectos: [] })
    }
  }

  // POST — crear proyecto
  if (req.method === 'POST') {
    const { email, nombre, descripcion, tecnologias, repoUrl, produccionUrl } = req.body

    if (!email || !nombre || !descripcion) {
      return res.status(400).json({ error: 'Email, nombre y descripción requeridos' })
    }

    const isAuthorized = await isEmailAuthorizedForCurso(email)
    if (!isAuthorized) {
      return res.status(403).json({ error: 'Email no autorizado' })
    }

    try {
      const id = `p${Date.now()}`
      const now = new Date().toISOString()
      const proyecto: Proyecto = {
        id,
        email: email.toLowerCase().trim(),
        nombre: nombre.trim().slice(0, 100),
        descripcion: descripcion.trim().slice(0, 1000),
        tecnologias: (tecnologias || []).slice(0, 10),
        repoUrl: repoUrl?.trim() || undefined,
        produccionUrl: produccionUrl?.trim() || undefined,
        createdAt: now,
        updatedAt: now,
        hitos: [],
      }

      await kv.set(`curso:proyecto:${id}`, proyecto)
      await kv.sadd('curso:proyectos', id)

      // Award points
      await awardPoints(email, PUNTOS_TABLE['crear-proyecto'], 'Creó un proyecto', `proyecto:${id}`)

      // Post to Discord #proyectos (best-effort)
      try {
        const botToken = process.env.DISCORD_BOT_TOKEN
        const channelId = process.env.DISCORD_PROYECTOS_CHANNEL_ID || '1470560307049926779'
        if (botToken) {
          const discordRes = await fetch(`https://discord.com/api/v10/channels/${channelId}/threads`, {
            method: 'POST',
            headers: {
              'Authorization': `Bot ${botToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: `${proyecto.nombre} — ${email.split('@')[0]}`,
              message: {
                content: `**Nuevo proyecto: ${proyecto.nombre}**\n\n${proyecto.descripcion}\n\nTecnologías: ${proyecto.tecnologias.join(', ') || 'N/A'}${proyecto.repoUrl ? `\nRepo: ${proyecto.repoUrl}` : ''}${proyecto.produccionUrl ? `\nURL: ${proyecto.produccionUrl}` : ''}\n\n_Ver en la web: https://www.aprende.software/curso/proyectos/${id}_`,
              },
            }),
          })
          if (discordRes.ok) {
            const thread = await discordRes.json()
            proyecto.discordThreadId = thread.id
            await kv.set(`curso:proyecto:${id}`, proyecto)
          }
        }
      } catch { /* Discord is best-effort */ }

      return res.status(201).json({ success: true, proyecto })
    } catch (error) {
      console.error('Error creating proyecto:', error)
      return res.status(500).json({ error: 'Error creando proyecto' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
