import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  image?: string
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'pages/blog')

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR)

  const posts = files
    .filter((file) => file.endsWith('.mdx') && file !== 'index.mdx')
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)

      return {
        slug: file.replace('.mdx', ''),
        title: data.title || 'Sin titulo',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'Josu Sanz',
        tags: data.tags || [],
        image: data.image,
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title || 'Sin titulo',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    author: data.author || 'Josu Sanz',
    tags: data.tags || [],
    image: data.image,
    content,
  }
}
