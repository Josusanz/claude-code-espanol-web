import type { NextApiRequest, NextApiResponse } from 'next'

interface FeedItem {
  title: string
  link: string
  source: string
  pubDate: string
  description?: string
}

// RSS feeds for AI news
const RSS_FEEDS = [
  { url: 'https://hnrss.org/newest?q=AI+OR+GPT+OR+Claude+OR+LLM+OR+OpenAI+OR+Anthropic&points=50', name: 'Hacker News' },
  { url: 'https://www.producthunt.com/feed?category=artificial-intelligence', name: 'Product Hunt AI' },
  { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', name: 'TechCrunch AI' },
  { url: 'https://feeds.arstechnica.com/arstechnica/technology-lab', name: 'Ars Technica' },
  { url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', name: 'The Verge AI' },
]

async function parseFeed(url: string, sourceName: string): Promise<FeedItem[]> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
      },
    })

    if (!response.ok) return []

    const xml = await response.text()
    const items: FeedItem[] = []

    // Simple XML parsing for RSS items
    const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || []

    for (const itemXml of itemMatches.slice(0, 10)) {
      const title = itemXml.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i)?.[1]?.trim()
      const link = itemXml.match(/<link[^>]*>([\s\S]*?)<\/link>/i)?.[1]?.trim()
        || itemXml.match(/<link[^>]*href="([^"]+)"/i)?.[1]
      const pubDate = itemXml.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i)?.[1]?.trim()
      const description = itemXml.match(/<description[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i)?.[1]?.trim()

      if (title && link) {
        items.push({
          title: title.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x27;/g, "'").replace(/&quot;/g, '"'),
          link: link.replace(/<[^>]+>/g, ''),
          source: sourceName,
          pubDate: pubDate || new Date().toISOString(),
          description: description?.replace(/<[^>]+>/g, '').slice(0, 200),
        })
      }
    }

    return items
  } catch (error) {
    console.error(`Error fetching ${sourceName}:`, error)
    return []
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Fetch all feeds in parallel
    const feedPromises = RSS_FEEDS.map(feed => parseFeed(feed.url, feed.name))
    const feedResults = await Promise.all(feedPromises)

    // Combine and sort by date
    const allItems = feedResults
      .flat()
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 30) // Top 30 items

    // Cache for 15 minutes
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate')
    res.status(200).json({ items: allItems })
  } catch (error) {
    console.error('Error fetching feeds:', error)
    res.status(500).json({ error: 'Error fetching feeds' })
  }
}
