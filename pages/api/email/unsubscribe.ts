import type { NextApiRequest, NextApiResponse } from 'next'
import { unsubscribeUser } from '../../../lib/email/sequences'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const email = req.method === 'GET'
    ? req.query.email as string
    : req.body.email

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email requerido' })
  }

  try {
    await unsubscribeUser(decodeURIComponent(email))

    // If GET request, redirect to confirmation page
    if (req.method === 'GET') {
      return res.redirect('/unsub-ok')
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return res.status(500).json({ error: 'Error al procesar la solicitud' })
  }
}
