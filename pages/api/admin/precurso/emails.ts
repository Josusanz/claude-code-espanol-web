import type { NextApiRequest, NextApiResponse } from 'next'
import { requireAdmin } from '../../../../lib/admin-auth'
import {
  getAuthorizedEmails,
  addAuthorizedEmail,
  addAuthorizedEmails,
  removeAuthorizedEmail
} from '../../../../lib/precurso-kv'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: Lista todos los emails autorizados
  if (req.method === 'GET') {
    try {
      const emails = await getAuthorizedEmails()
      return res.status(200).json({ emails })
    } catch (error) {
      console.error('Error fetching emails:', error)
      return res.status(500).json({ error: 'Error al obtener emails' })
    }
  }

  // POST: Añade uno o varios emails
  if (req.method === 'POST') {
    const { email, emails } = req.body

    try {
      // Si es un solo email
      if (email && typeof email === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: 'Email inválido' })
        }

        await addAuthorizedEmail(email)
        return res.status(200).json({ success: true, email: email.toLowerCase() })
      }

      // Si son varios emails (array o string separado por comas/espacios/saltos de línea)
      if (emails) {
        let emailList: string[]

        if (Array.isArray(emails)) {
          emailList = emails
        } else if (typeof emails === 'string') {
          emailList = emails.split(/[\s,;]+/).filter(Boolean)
        } else {
          return res.status(400).json({ error: 'Formato de emails inválido' })
        }

        const result = await addAuthorizedEmails(emailList)
        return res.status(200).json({
          success: true,
          added: result.added,
          skipped: result.skipped
        })
      }

      return res.status(400).json({ error: 'Email o emails requeridos' })
    } catch (error) {
      console.error('Error adding email:', error)
      return res.status(500).json({ error: 'Error al añadir email' })
    }
  }

  // DELETE: Elimina un email
  if (req.method === 'DELETE') {
    const { email } = req.body

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email requerido' })
    }

    try {
      await removeAuthorizedEmail(email)
      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Error removing email:', error)
      return res.status(500).json({ error: 'Error al eliminar email' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export default requireAdmin(handler)
