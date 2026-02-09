import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { requireAdmin } from '../../../lib/admin-auth'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Obtener todos los emails de ambos sets
    const precursoEmails = await kv.smembers('precurso:emails')
    const cursoEmails = await kv.smembers('curso:emails')

    // Verificar un email específico si se proporciona
    const testEmail = req.query.email as string
    let testResults: { precurso: number | null; curso: number | null } | null = null

    if (testEmail) {
      const normalized = testEmail.toLowerCase().trim()
      const inPrecurso = await kv.sismember('precurso:emails', normalized)
      const inCurso = await kv.sismember('curso:emails', normalized)
      testResults = {
        precurso: inPrecurso,
        curso: inCurso
      }
    }

    return res.status(200).json({
      precursoEmails: precursoEmails.sort(),
      precursoCount: precursoEmails.length,
      cursoEmails: cursoEmails.sort(),
      cursoCount: cursoEmails.length,
      testEmail: testEmail || null,
      testResults
    })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Error al obtener datos', details: String(error) })
  }
}

export default requireAdmin(handler)
