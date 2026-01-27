import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  socialLinks: {
    x?: string
    linkedin?: string
    threads?: string
    bluesky?: string
    mastodon?: string
  }
}

interface BlogPageProps {
  posts: BlogPost[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <>
      <Head>
        <title>Blog | Claude Code en Espanol</title>
        <meta name="description" content="Articulos, tips y tutoriales sobre Claude Code, IA y productividad. Aprende a automatizar tu trabajo con inteligencia artificial." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `tailwind.config = { darkMode: 'class' }`
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
      </Head>

      <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-slate-900 dark:bg-white p-1 rounded-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-white dark:text-slate-900 text-[20px]">terminal</span>
                </div>
                <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
                  Claude Code <span className="text-slate-500 dark:text-slate-400 font-normal">en Espanol</span>
                </span>
              </Link>

              <div className="flex items-center gap-4">
                <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium">
                  Curso
                </Link>
                <Link href="/premium" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium">
                  Premium
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-sm font-medium mb-6">
              <span className="material-symbols-outlined text-lg">rss_feed</span>
              Blog
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-950 dark:text-white">
              Tips, tutoriales y mas
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Contenido sobre Claude Code, IA y productividad
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">article</span>
                <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Proximamente</h2>
                <p className="text-slate-500 dark:text-slate-400">
                  Estamos preparando contenido increible. Vuelve pronto.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => {
                  // Get primary link - prefer X, then LinkedIn, then Threads
                  const primaryLink = post.socialLinks.x || post.socialLinks.linkedin || post.socialLinks.threads || post.socialLinks.bluesky || post.socialLinks.mastodon

                  return (
                    <article
                      key={post.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                    >
                      <a href={primaryLink} target="_blank" rel="noopener noreferrer">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                              {post.title}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                              <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </time>
                              <div className="flex items-center gap-2">
                                {post.socialLinks.x && (
                                  <a href={post.socialLinks.x} target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 dark:hover:text-slate-300" onClick={e => e.stopPropagation()}>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                  </a>
                                )}
                                {post.socialLinks.linkedin && (
                                  <a href={post.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600" onClick={e => e.stopPropagation()}>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                  </a>
                                )}
                                {post.socialLinks.threads && (
                                  <a href={post.socialLinks.threads} target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 dark:hover:text-slate-300" onClick={e => e.stopPropagation()}>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.88-.73 2.106-1.165 3.456-1.225 1.155-.052 2.209.096 3.168.428-.012-.788-.146-1.404-.401-1.848-.37-.645-1.018-.975-1.926-.982h-.022c-.752 0-1.728.264-2.253.791l-1.395-1.478c.915-.866 2.186-1.33 3.67-1.33h.04c1.583.017 2.813.584 3.656 1.685.79 1.032 1.2 2.467 1.219 4.267v.04c1.151.627 2.043 1.49 2.586 2.56.757 1.49.898 3.96-.752 5.639-1.87 1.903-4.264 2.689-7.573 2.715zm-1.782-6.089c-.06 0-.12.002-.18.004-1.675.075-2.533.794-2.481 1.716.027.48.266.912.673 1.217.476.356 1.151.538 1.904.5 1.082-.058 1.89-.453 2.403-1.173.384-.539.63-1.262.73-2.163-.812-.224-1.686-.32-2.587-.275-.155.007-.309.017-.462.024z"/></svg>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-slate-400">open_in_new</span>
                        </div>
                      </a>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Claude Code en Espanol
              </Link>
              {' '}&middot;{' '}
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              {' '}&middot;{' '}
              <Link href="/premium" className="hover:text-white transition-colors">
                Premium
              </Link>
            </p>
            <p className="text-sm">
              &copy; 2026 Josu Sanz
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // For now, return empty array - posts will be fetched via API in production
  // This allows static generation to work without API key at build time
  let posts: BlogPost[] = []

  try {
    // Try to fetch from API if TYPEFULLY_API_KEY is set
    if (process.env.TYPEFULLY_API_KEY) {
      const { getPublishedPosts } = await import('../../lib/typefully')
      posts = await getPublishedPosts()
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
  }

  return {
    props: {
      posts,
    },
    // Revalidate every 5 minutes
    revalidate: 300,
  }
}
