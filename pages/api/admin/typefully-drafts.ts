import type { NextApiRequest, NextApiResponse } from 'next'

const TYPEFULLY_API_KEY = process.env.TYPEFULLY_API_KEY
const TYPEFULLY_API_BASE = 'https://api.typefully.com/v2'
const SOCIAL_SET_ID = '257216'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await fetch(
      `${TYPEFULLY_API_BASE}/social-sets/${SOCIAL_SET_ID}/drafts?limit=50`,
      {
        headers: {
          'Authorization': `Bearer ${TYPEFULLY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Typefully API error: ${response.status}`)
    }

    const data = await response.json()

    // Filter to show scheduled and draft posts
    const drafts = data.results?.filter(
      (post: any) => post.status === 'scheduled' || post.status === 'draft'
    ) || []

    res.status(200).json({ drafts })
  } catch (error) {
    console.error('Error fetching Typefully drafts:', error)
    res.status(500).json({ error: 'Error fetching drafts' })
  }
}
