import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { isEmailAuthorizedForCurso } from '../../../lib/curso-kv'

interface RuedaData {
  scores: number[]
  savedAt: string
}

interface UserRuedas {
  antes?: RuedaData
  despues?: RuedaData
}

const RUEDA_KEY_PREFIX = 'curso:rueda:'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: obtener ruedas del usuario
  if (req.method === 'GET') {
    const { email } = req.query

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email requerido' })
    }

    try {
      const normalizedEmail = email.toLowerCase().trim()
      const ruedas = await kv.get<UserRuedas>(`${RUEDA_KEY_PREFIX}${normalizedEmail}`)

      return res.status(200).json({
        success: true,
        ruedas: ruedas || {}
      })
    } catch (error) {
      console.error('Error getting ruedas:', error)
      return res.status(200).json({
        success: true,
        ruedas: {}
      })
    }
  }

  // POST: guardar rueda
  if (req.method === 'POST') {
    const { email, tipo, scores } = req.body

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email requerido' })
    }

    if (!tipo || (tipo !== 'antes' && tipo !== 'despues')) {
      return res.status(400).json({ error: 'Tipo debe ser "antes" o "despues"' })
    }

    if (!scores || !Array.isArray(scores) || scores.length !== 8) {
      return res.status(400).json({ error: 'Scores debe ser un array de 8 números' })
    }

    try {
      const normalizedEmail = email.toLowerCase().trim()

      // Verificar que el email está autorizado
      const isAuthorized = await isEmailAuthorizedForCurso(normalizedEmail)
      if (!isAuthorized) {
        return res.status(403).json({ error: 'Email no autorizado' })
      }

      // Obtener ruedas existentes
      const existingRuedas = await kv.get<UserRuedas>(`${RUEDA_KEY_PREFIX}${normalizedEmail}`) || {}

      // Actualizar con la nueva rueda
      const updatedRuedas: UserRuedas = {
        ...existingRuedas,
        [tipo]: {
          scores,
          savedAt: new Date().toISOString()
        }
      }

      await kv.set(`${RUEDA_KEY_PREFIX}${normalizedEmail}`, updatedRuedas)

      return res.status(200).json({
        success: true,
        ruedas: updatedRuedas
      })
    } catch (error) {
      console.error('Error saving rueda:', error)
      return res.status(500).json({ error: 'Error guardando rueda' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
