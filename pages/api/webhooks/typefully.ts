import type { NextApiRequest, NextApiResponse } from 'next'

// This webhook receives notifications from Typefully when posts are published
// Configure in Typefully: Settings > API > Webhooks > Add webhook
// URL: https://aprende.software/api/webhooks/typefully

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const event = req.body

    console.log('Typefully webhook received:', JSON.stringify(event, null, 2))

    // Handle different event types
    switch (event.type) {
      case 'draft.published':
        // A draft was published - trigger revalidation of blog pages
        console.log('Post published:', event.data?.draft_id)

        // If using ISR, you can trigger revalidation here
        // For now, we rely on the 5-minute revalidation in getStaticProps
        break

      case 'draft.scheduled':
        console.log('Post scheduled:', event.data?.draft_id)
        break

      default:
        console.log('Unknown event type:', event.type)
    }

    res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(500).json({ error: 'Webhook processing failed' })
  }
}

// Disable body parsing - Typefully might send raw JSON
export const config = {
  api: {
    bodyParser: true,
  },
}
