import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getAllPosts, BlogPost } from '../../lib/blog'

interface BlogPageProps {
  posts: BlogPost[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribeStatus('loading')

    try {
      const res = await fetch('/api/blog/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setSubscribeStatus('success')
        setEmail('')
      } else {
        setSubscribeStatus('error')
      }
    } catch {
      setSubscribeStatus('error')
    }
  }

  return (
    <>
      <Head>
        <title>Blog | Claude Code en Espanol</title>
        <meta
          name="description"
          content="Articulos, tips y tutoriales sobre Claude Code, IA y productividad. Aprende a automatizar tu trabajo con inteligencia artificial."
        />
      </Head>

      <div className="min-h-screen bg-white dark:bg-slate-950">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-slate-900 dark:bg-white p-1.5 rounded-md flex items-center justify-center">
                  <svg className="w-4 h-4 text-white dark:text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
                  Claude Code <span className="text-slate-500 dark:text-slate-400 font-normal">en Espanol</span>
                </span>
              </Link>

              <div className="flex items-center gap-4">
                <Link href="/empezar" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium">
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
        <section className="py-16 px-6 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-sm font-medium mb-6">
              Blog
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-950 dark:text-white">
              Tips, tutoriales y mas
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Contenido sobre Claude Code, IA y productividad
            </p>

            {/* Subscribe form */}
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={subscribeStatus === 'loading'}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {subscribeStatus === 'loading' ? '...' : 'Suscribirse'}
                </button>
              </div>
              {subscribeStatus === 'success' && (
                <p className="mt-2 text-green-600 dark:text-green-400 text-sm">
                  Listo! Te avisaremos cuando publiquemos algo nuevo.
                </p>
              )}
              {subscribeStatus === 'error' && (
                <p className="mt-2 text-red-600 dark:text-red-400 text-sm">
                  Algo salio mal. Intenta de nuevo.
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Posts */}
        <section className="py-12 px-6">
          <div className="max-w-3xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-slate-500 dark:text-slate-400">
                  Proximamente publicaremos contenido. Suscribete para no perdertelo.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article key={post.slug} className="group">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="p-6 -mx-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-2">
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                          {post.tags.length > 0 && (
                            <>
                              <span>·</span>
                              <span>{post.tags[0]}</span>
                            </>
                          )}
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
                          {post.description}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-3 text-indigo-600 dark:text-indigo-400 font-medium">
                          Leer articulo
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts()

  return {
    props: {
      posts,
    },
  }
}
