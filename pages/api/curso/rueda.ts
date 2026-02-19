import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { isEmailAuthorizedForCurso } from '../../../lib/curso-kv'

interface RuedaData {
  scores: number[]
  savedAt: string
}

// New dual format
interface DualRuedas {
  creador?: { antes?: RuedaData; despues?: RuedaData }
  vida?: { antes?: RuedaData; despues?: RuedaData }
}

// Old format (backward compat)
interface OldRuedas {
  antes?: RuedaData
  despues?: RuedaData
}

type StoredRuedas = DualRuedas & OldRuedas

function migrateRuedas(data: StoredRuedas): DualRuedas {
  // If old format detected, migrate to new
  if (data.antes || data.despues) {
    return {
      creador: {
        antes: data.antes,
        despues: data.despues,
      },
      vida: data.vida,
    }
  }
  return {
    creador: data.creador,
    vida: data.vida,
  }
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
      const stored = await kv.get<StoredRuedas>(`${RUEDA_KEY_PREFIX}${normalizedEmail}`)

      if (!stored) {
        return res.status(200).json({ success: true, ruedas: {} })
      }

      const migrated = migrateRuedas(stored)

      // If migration happened, persist the new format
      if (stored.antes || stored.despues) {
        await kv.set(`${RUEDA_KEY_PREFIX}${normalizedEmail}`, migrated)
      }

      return res.status(200).json({
        success: true,
        ruedas: migrated,
      })
    } catch (error) {
      console.error('Error getting ruedas:', error)
      return res.status(200).json({ success: true, ruedas: {} })
    }
  }

  // POST: guardar rueda
  if (req.method === 'POST') {
    const { email, tipo, scores, ruedaType } = req.body

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email requerido' })
    }

    if (!tipo || (tipo !== 'antes' && tipo !== 'despues')) {
      return res.status(400).json({ error: 'Tipo debe ser "antes" o "despues"' })
    }

    // ruedaType defaults to 'creador' for backward compat
    const wheelType = ruedaType || 'creador'
    if (wheelType !== 'creador' && wheelType !== 'vida') {
      return res.status(400).json({ error: 'ruedaType debe ser "creador" o "vida"' })
    }

    const expectedLength = wheelType === 'creador' ? 8 : 9
    if (!scores || !Array.isArray(scores) || scores.length !== expectedLength) {
      return res.status(400).json({ error: `Scores debe ser un array de ${expectedLength} numeros` })
    }

    try {
      const normalizedEmail = email.toLowerCase().trim()

      const isAuthorized = await isEmailAuthorizedForCurso(normalizedEmail)
      if (!isAuthorized) {
        return res.status(403).json({ error: 'Email no autorizado' })
      }

      const stored = await kv.get<StoredRuedas>(`${RUEDA_KEY_PREFIX}${normalizedEmail}`) || {}
      const existing = migrateRuedas(stored)

      const newData: RuedaData = {
        scores,
        savedAt: new Date().toISOString(),
      }

      const updated: DualRuedas = {
        ...existing,
        [wheelType]: {
          ...existing[wheelType],
          [tipo]: newData,
        },
      }

      await kv.set(`${RUEDA_KEY_PREFIX}${normalizedEmail}`, updated)

      return res.status(200).json({
        success: true,
        ruedas: updated,
      })
    } catch (error) {
      console.error('Error saving rueda:', error)
      return res.status(500).json({ error: 'Error guardando rueda' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
