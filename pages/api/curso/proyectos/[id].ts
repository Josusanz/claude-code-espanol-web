import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { isEmailAuthorizedForCurso } from '../../../../lib/curso-kv'
import { awardPoints, PUNTOS_TABLE } from '../../../../lib/curso-puntos'
import type { Proyecto, ProyectoHito } from '../proyectos'

const HITO_TIPOS = ['localhost', 'database', 'auth', 'design', 'payments', 'deploy', 'production', 'custom']

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID requerido' })
  }

  const proyectoKey = `curso:proyecto:${id}`

  // GET — obtener proyecto con hitos
  if (req.method === 'GET') {
    try {
      const proyecto = await kv.get<Proyecto>(proyectoKey)
      if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' })
      return res.status(200).json({ proyecto })
    } catch (error) {
      console.error('Error getting proyecto:', error)
      return res.status(500).json({ error: 'Error obteniendo proyecto' })
    }
  }

  // POST — añadir hito
  if (req.method === 'POST') {
    const { email, tipo, titulo, descripcion } = req.body

    if (!email || !tipo || !titulo) {
      return res.status(400).json({ error: 'Email, tipo y título requeridos' })
    }

    if (!HITO_TIPOS.includes(tipo)) {
      return res.status(400).json({ error: 'Tipo de hito no válido' })
    }

    const isAuthorized = await isEmailAuthorizedForCurso(email)
    if (!isAuthorized) {
      return res.status(403).json({ error: 'Email no autorizado' })
    }

    try {
      const proyecto = await kv.get<Proyecto>(proyectoKey)
      if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' })

      // Only owner can add milestones
      if (proyecto.email !== email.toLowerCase().trim()) {
        return res.status(403).json({ error: 'Solo el dueño puede añadir hitos' })
      }

      const hito: ProyectoHito = {
        id: `h${Date.now()}`,
        tipo: tipo as ProyectoHito['tipo'],
        titulo: titulo.trim().slice(0, 200),
        descripcion: descripcion?.trim().slice(0, 500) || undefined,
        createdAt: new Date().toISOString(),
      }

      proyecto.hitos.push(hito)
      proyecto.updatedAt = new Date().toISOString()
      await kv.set(proyectoKey, proyecto)

      // Award points
      await awardPoints(email, PUNTOS_TABLE['añadir-hito'], 'Añadió hito al proyecto', `hito:${hito.id}`)

      // Post update to Discord thread (best-effort)
      try {
        const botToken = process.env.DISCORD_BOT_TOKEN
        if (botToken && proyecto.discordThreadId) {
          await fetch(`https://discord.com/api/v10/channels/${proyecto.discordThreadId}/messages`, {
            method: 'POST',
            headers: {
              'Authorization': `Bot ${botToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: `**Nuevo hito:** ${titulo}${descripcion ? `\n${descripcion}` : ''}`,
            }),
          })
        }
      } catch { /* Discord is best-effort */ }

      return res.status(201).json({ success: true, hito })
    } catch (error) {
      console.error('Error adding hito:', error)
      return res.status(500).json({ error: 'Error añadiendo hito' })
    }
  }

  // PATCH — actualizar proyecto
  if (req.method === 'PATCH') {
    const { email, nombre, descripcion, tecnologias, repoUrl, produccionUrl } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email requerido' })
    }

    try {
      const proyecto = await kv.get<Proyecto>(proyectoKey)
      if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' })

      if (proyecto.email !== email.toLowerCase().trim()) {
        return res.status(403).json({ error: 'Solo el dueño puede editar' })
      }

      if (nombre) proyecto.nombre = nombre.trim().slice(0, 100)
      if (descripcion) proyecto.descripcion = descripcion.trim().slice(0, 1000)
      if (tecnologias) proyecto.tecnologias = tecnologias.slice(0, 10)
      if (repoUrl !== undefined) proyecto.repoUrl = repoUrl?.trim() || undefined
      if (produccionUrl !== undefined) proyecto.produccionUrl = produccionUrl?.trim() || undefined
      proyecto.updatedAt = new Date().toISOString()

      await kv.set(proyectoKey, proyecto)

      return res.status(200).json({ success: true, proyecto })
    } catch (error) {
      console.error('Error updating proyecto:', error)
      return res.status(500).json({ error: 'Error actualizando proyecto' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
