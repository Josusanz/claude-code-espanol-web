import type { NextApiRequest, NextApiResponse } from 'next'
import { createDraft } from '../../../lib/typefully'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { content, publishAt = 'next-free-slot' } = req.body

  if (!content) {
    return res.status(400).json({ error: 'Content is required' })
  }

  try {
    // Check if it's a thread (multiple tweets separated by ---)
    const isThread = content.includes('---')
    const tweets = isThread
      ? content.split('---').map((t: string) => t.trim()).filter(Boolean)
      : [content.trim()]

    // Create draft in Typefully
    const result = await createDraft({
      platforms: {
        x: {
          posts: tweets.map((text: string) => ({ text: text.slice(0, 280) })),
        },
        // Also post to other platforms if single tweet
        ...(tweets.length === 1 ? {
          linkedin: {
            posts: [{ text: content }],
          },
          threads: {
            posts: [{ text: content.slice(0, 500) }],
          },
        } : {}),
      },
      publishAt: publishAt,
    })

    res.status(200).json({
      success: true,
      draft: result,
      scheduledFor: publishAt === 'now' ? 'Publicando ahora...' : 'Próximo slot disponible',
    })
  } catch (error) {
    console.error('Error scheduling post:', error)
    res.status(500).json({ error: 'Error scheduling post' })
  }
}
