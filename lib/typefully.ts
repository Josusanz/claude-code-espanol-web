// Typefully API Helper
const TYPEFULLY_API_KEY = process.env.TYPEFULLY_API_KEY
const TYPEFULLY_API_BASE = 'https://api.typefully.com/v2'
const SOCIAL_SET_ID = '257216' // @solosetups

export interface TypefullyPost {
  id: string
  status: 'draft' | 'scheduled' | 'published' | 'publishing' | 'error'
  created_at: string
  updated_at: string
  published_at: string | null
  preview: string
  draft_title: string | null
  x_published_url: string | null
  linkedin_published_url: string | null
  threads_published_url: string | null
  bluesky_published_url: string | null
  mastodon_published_url: string | null
  share_url: string | null
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  publishedAt: string
  socialLinks: {
    x: string | null
    linkedin: string | null
    threads: string | null
    bluesky: string | null
    mastodon: string | null
  }
}

async function typefullyFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${TYPEFULLY_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${TYPEFULLY_API_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Typefully API error: ${response.status}`)
  }

  return response.json()
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const data = await typefullyFetch(`/social-sets/${SOCIAL_SET_ID}/drafts?limit=50`)

    if (!data?.results || !Array.isArray(data.results)) {
      return []
    }

    // Filter only published posts
    const publishedPosts = data.results.filter(
      (post: TypefullyPost) => post.status === 'published' && post.published_at
    )

    return publishedPosts.map((post: TypefullyPost) => {
      const preview = post.preview || ''
      return {
        id: String(post.id),
        title: post.draft_title || generateTitleFromContent(preview),
        slug: generateSlug(String(post.id), post.draft_title || preview),
        content: preview,
        excerpt: preview.length > 160 ? preview.slice(0, 160) + '...' : preview,
        publishedAt: post.published_at!,
        socialLinks: {
          x: post.x_published_url || null,
          linkedin: post.linkedin_published_url || null,
          threads: post.threads_published_url || null,
          bluesky: post.bluesky_published_url || null,
          mastodon: post.mastodon_published_url || null,
        },
      }
    })
  } catch (error) {
    console.error('Error fetching published posts:', error)
    return []
  }
}

export async function getPostById(draftId: string): Promise<any> {
  return typefullyFetch(`/social-sets/${SOCIAL_SET_ID}/drafts/${draftId}`)
}

export async function createDraft(content: {
  title?: string
  platforms: {
    x?: { posts: Array<{ text: string }> }
    linkedin?: { posts: Array<{ text: string }> }
    threads?: { posts: Array<{ text: string }> }
    bluesky?: { posts: Array<{ text: string }> }
    mastodon?: { posts: Array<{ text: string }> }
  }
  publishAt?: string | 'now' | 'next-free-slot'
  tags?: string[]
}) {
  const body: any = {
    platforms: {},
    draft_title: content.title,
  }

  // Build platform-specific content
  if (content.platforms.x) {
    body.platforms.x = {
      enabled: true,
      posts: content.platforms.x.posts.map(p => ({ text: p.text })),
    }
  }
  if (content.platforms.linkedin) {
    body.platforms.linkedin = {
      enabled: true,
      posts: content.platforms.linkedin.posts.map(p => ({ text: p.text })),
    }
  }
  if (content.platforms.threads) {
    body.platforms.threads = {
      enabled: true,
      posts: content.platforms.threads.posts.map(p => ({ text: p.text })),
    }
  }
  if (content.platforms.bluesky) {
    body.platforms.bluesky = {
      enabled: true,
      posts: content.platforms.bluesky.posts.map(p => ({ text: p.text })),
    }
  }
  if (content.platforms.mastodon) {
    body.platforms.mastodon = {
      enabled: true,
      posts: content.platforms.mastodon.posts.map(p => ({ text: p.text })),
    }
  }

  if (content.publishAt) {
    body.publish_at = content.publishAt
  }

  if (content.tags) {
    body.tags = content.tags
  }

  return typefullyFetch(`/social-sets/${SOCIAL_SET_ID}/drafts`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

function generateTitleFromContent(content: string): string {
  // Get first line or first 60 chars as title
  const firstLine = content.split('\n')[0]
  if (firstLine.length <= 60) return firstLine
  return firstLine.slice(0, 57) + '...'
}

function generateSlug(id: string, content: string): string {
  const baseSlug = content
    .toLowerCase()
    .slice(0, 50)
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  return `${baseSlug}-${id.slice(-6)}`
}
