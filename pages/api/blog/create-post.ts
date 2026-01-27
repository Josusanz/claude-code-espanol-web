import type { NextApiRequest, NextApiResponse } from 'next'
import { createDraft } from '../../../lib/typefully'

// Simple auth - require a secret key
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'claude-code-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check auth
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { title, content, platforms, publishAt, tags } = req.body

    if (!content) {
      return res.status(400).json({ error: 'Content is required' })
    }

    // Default to all platforms if not specified
    const platformContent: any = {}

    // X (Twitter) - 280 char limit, may need thread
    if (platforms?.x !== false) {
      const xContent = content.x || content.default || content
      platformContent.x = {
        posts: typeof xContent === 'string'
          ? [{ text: xContent.slice(0, 280) }]
          : xContent.map((t: string) => ({ text: t.slice(0, 280) }))
      }
    }

    // LinkedIn - longer form
    if (platforms?.linkedin !== false) {
      const linkedinContent = content.linkedin || content.default || content
      platformContent.linkedin = {
        posts: [{ text: typeof linkedinContent === 'string' ? linkedinContent : linkedinContent[0] }]
      }
    }

    // Threads
    if (platforms?.threads !== false) {
      const threadsContent = content.threads || content.default || content
      platformContent.threads = {
        posts: typeof threadsContent === 'string'
          ? [{ text: threadsContent.slice(0, 500) }]
          : threadsContent.map((t: string) => ({ text: t.slice(0, 500) }))
      }
    }

    // Bluesky - 300 char limit
    if (platforms?.bluesky !== false) {
      const blueskyContent = content.bluesky || content.default || content
      platformContent.bluesky = {
        posts: typeof blueskyContent === 'string'
          ? [{ text: blueskyContent.slice(0, 300) }]
          : blueskyContent.map((t: string) => ({ text: t.slice(0, 300) }))
      }
    }

    // Mastodon - 500 char limit
    if (platforms?.mastodon !== false) {
      const mastodonContent = content.mastodon || content.default || content
      platformContent.mastodon = {
        posts: [{ text: typeof mastodonContent === 'string' ? mastodonContent.slice(0, 500) : mastodonContent[0]?.slice(0, 500) }]
      }
    }

    const result = await createDraft({
      title,
      platforms: platformContent,
      publishAt: publishAt || undefined,
      tags: tags || ['claude-code'],
    })

    res.status(200).json({ success: true, draft: result })
  } catch (error) {
    console.error('Error creating post:', error)
    res.status(500).json({ error: 'Failed to create post' })
  }
}
