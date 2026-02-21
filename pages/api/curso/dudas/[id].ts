import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { isEmailAuthorizedForCurso } from '../../../../lib/curso-kv'
import { awardPoints, PUNTOS_TABLE } from '../../../../lib/curso-puntos'
import type { Duda, DudaRespuesta } from '../dudas'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID requerido' })
  }

  const dudaKey = `curso:duda:${id}`

  // GET — obtener duda con respuestas
  if (req.method === 'GET') {
    try {
      const duda = await kv.get<Duda>(dudaKey)
      if (!duda) return res.status(404).json({ error: 'Duda no encontrada' })
      return res.status(200).json({ duda })
    } catch (error) {
      console.error('Error getting duda:', error)
      return res.status(500).json({ error: 'Error obteniendo duda' })
    }
  }

  // POST — añadir respuesta
  if (req.method === 'POST') {
    const { email, contenido } = req.body

    if (!email || !contenido) {
      return res.status(400).json({ error: 'Email y contenido requeridos' })
    }

    const isAuthorized = await isEmailAuthorizedForCurso(email)
    if (!isAuthorized) {
      return res.status(403).json({ error: 'Email no autorizado' })
    }

    try {
      const duda = await kv.get<Duda>(dudaKey)
      if (!duda) return res.status(404).json({ error: 'Duda no encontrada' })

      const INSTRUCTOR_EMAILS = (process.env.INSTRUCTOR_EMAILS || 'josu@yenze.io').split(',').map(e => e.trim().toLowerCase())

      const respuesta: DudaRespuesta = {
        id: `r${Date.now()}`,
        autor: email.split('@')[0],
        contenido: contenido.trim().slice(0, 2000),
        createdAt: new Date().toISOString(),
        isInstructor: INSTRUCTOR_EMAILS.includes(email.toLowerCase().trim()),
      }

      duda.respuestas.push(respuesta)
      await kv.set(dudaKey, duda)

      // Award points for responding
      await awardPoints(email, PUNTOS_TABLE['responder-duda'], 'Respondió una duda', `respuesta:${respuesta.id}`)

      return res.status(201).json({ success: true, respuesta })
    } catch (error) {
      console.error('Error adding respuesta:', error)
      return res.status(500).json({ error: 'Error añadiendo respuesta' })
    }
  }

  // PATCH — marcar resuelta / votar
  if (req.method === 'PATCH') {
    const { email, action } = req.body

    if (!email || !action) {
      return res.status(400).json({ error: 'Email y action requeridos' })
    }

    try {
      const duda = await kv.get<Duda>(dudaKey)
      if (!duda) return res.status(404).json({ error: 'Duda no encontrada' })

      if (action === 'resolver') {
        // Only author or instructor can resolve
        const INSTRUCTOR_EMAILS = (process.env.INSTRUCTOR_EMAILS || 'josu@yenze.io').split(',').map(e => e.trim().toLowerCase())
        const isOwner = duda.email === email.toLowerCase().trim()
        const isInstructor = INSTRUCTOR_EMAILS.includes(email.toLowerCase().trim())

        if (!isOwner && !isInstructor) {
          return res.status(403).json({ error: 'Solo el autor o instructor pueden resolver' })
        }

        duda.resuelta = !duda.resuelta
        await kv.set(dudaKey, duda)
        return res.status(200).json({ success: true, resuelta: duda.resuelta })
      }

      if (action === 'votar') {
        const votosKey = `curso:dudas:votos:${id}`
        const yaVoto = await kv.sismember(votosKey, email.toLowerCase().trim())
        if (yaVoto) {
          return res.status(400).json({ error: 'Ya votaste esta duda' })
        }

        await kv.sadd(votosKey, email.toLowerCase().trim())
        duda.votos = (duda.votos || 0) + 1
        await kv.set(dudaKey, duda)
        return res.status(200).json({ success: true, votos: duda.votos })
      }

      return res.status(400).json({ error: 'Action no válida' })
    } catch (error) {
      console.error('Error updating duda:', error)
      return res.status(500).json({ error: 'Error actualizando duda' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
