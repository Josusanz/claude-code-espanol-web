import type { NextApiRequest, NextApiResponse } from 'next'
import { getPublishedPosts } from '../../../lib/typefully'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const posts = await getPublishedPosts()
    res.status(200).json({ posts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
}
