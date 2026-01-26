import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import fs from 'fs'
import path from 'path'

const VALID_LESSONS = [
  'que-es-ralph',
  'context-rot',
  'anatomia',
  'fase-specs',
  'fase-plan',
  'fase-ejecutar',
  'proyecto-practico',
  'consejos-avanzados'
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, lesson } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email required' })
  }

  if (!lesson || !VALID_LESSONS.includes(lesson)) {
    return res.status(400).json({ error: 'Invalid lesson' })
  }

  try {
    // Verificar acceso
    const ralphKey = `ralph_loop:${email.toLowerCase()}`
    const purchase = await kv.get(ralphKey)

    if (!purchase) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Necesitas comprar Ralph Loop para acceder a este contenido'
      })
    }

    // Leer archivo MDX
    const filePath = path.join(process.cwd(), 'content', 'premium', 'ralph', `${lesson}.mdx`)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Lesson not found' })
    }

    const content = fs.readFileSync(filePath, 'utf-8')

    return res.status(200).json({
      success: true,
      lesson,
      content
    })
  } catch (error) {
    console.error('Error fetching Ralph content:', error)
    return res.status(500).json({ error: 'Failed to fetch content' })
  }
}
