import { useState, useEffect } from 'react'
import Head from 'next/head'

type ContentType = 'news' | 'thread' | 'hottake' | 'tip' | 'demo'

interface FeedItem {
  title: string
  link: string
  source: string
  pubDate: string
  description?: string
}

const CONTENT_TEMPLATES: Record<ContentType, { label: string; emoji: string; description: string }> = {
  news: { label: 'Noticia IA', emoji: '📰', description: 'Traduce y adapta una noticia de IA' },
  thread: { label: 'Hilo educativo', emoji: '🧵', description: 'Crea un hilo explicando un concepto' },
  hottake: { label: 'Hot Take', emoji: '🔥', description: 'Opinión fuerte sobre un tema' },
  tip: { label: 'Tip rápido', emoji: '💡', description: 'Consejo práctico de Claude Code' },
  demo: { label: 'Demo/Resultado', emoji: '🎯', description: 'Muestra un resultado o demo' },
}

export default function ContentAdminPage() {
  const [originalContent, setOriginalContent] = useState('')
  const [contentType, setContentType] = useState<ContentType>('news')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)
  const [scheduleTime, setScheduleTime] = useState<'now' | 'next-free-slot' | 'custom'>('next-free-slot')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])
  const [isLoadingFeed, setIsLoadingFeed] = useState(true)
  const [selectedSource, setSelectedSource] = useState<string>('all')

  // Fetch RSS feed on mount
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch('/api/admin/feed')
        const data = await res.json()
        if (data.items) {
          setFeedItems(data.items)
        }
      } catch (error) {
        console.error('Error fetching feed:', error)
      } finally {
        setIsLoadingFeed(false)
      }
    }
    fetchFeed()
  }, [])

  const handleSelectFeedItem = (item: FeedItem) => {
    setOriginalContent(`${item.title}\n\n${item.description || ''}\n\nFuente: ${item.source}\n${item.link}`)
    setContentType('news')
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const uniqueSources = ['all', ...new Set(feedItems.map(item => item.source))]
  const filteredFeedItems = selectedSource === 'all'
    ? feedItems
    : feedItems.filter(item => item.source === selectedSource)

  const handleGenerate = async () => {
    if (!originalContent.trim()) return

    setIsGenerating(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: originalContent,
          type: contentType,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setGeneratedContent(data.content)
      } else {
        setMessage({ type: 'error', text: data.error || 'Error generando contenido' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de conexión' })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSchedule = async () => {
    if (!generatedContent.trim()) return

    setIsScheduling(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/schedule-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: generatedContent,
          publishAt: scheduleTime,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage({ type: 'success', text: '¡Post programado! ' + (data.scheduledFor || '') })
        setOriginalContent('')
        setGeneratedContent('')
      } else {
        setMessage({ type: 'error', text: data.error || 'Error programando' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de conexión' })
    } finally {
      setIsScheduling(false)
    }
  }

  return (
    <>
      <Head>
        <title>Content Manager | Admin</title>
      </Head>

      <div className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Content Manager</h1>
            <span className="text-sm text-slate-400">@solosetups</span>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
              {message.text}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-300">1. Contenido original</h2>

              {/* Content Type Selector */}
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(CONTENT_TEMPLATES).map(([key, { label, emoji }]) => (
                  <button
                    key={key}
                    onClick={() => setContentType(key as ContentType)}
                    className={`p-3 rounded-lg text-sm font-medium transition ${
                      contentType === key
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {emoji} {label}
                  </button>
                ))}
              </div>

              <p className="text-sm text-slate-400">
                {CONTENT_TEMPLATES[contentType].description}
              </p>

              <textarea
                value={originalContent}
                onChange={(e) => setOriginalContent(e.target.value)}
                placeholder="Pega aquí el tweet original, noticia, o describe lo que quieres publicar..."
                className="w-full h-48 p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !originalContent.trim()}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg font-semibold transition"
              >
                {isGenerating ? 'Generando...' : '✨ Generar con Claude'}
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-300">2. Contenido adaptado</h2>

              <textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                placeholder="El contenido adaptado aparecerá aquí. Puedes editarlo antes de programar."
                className="w-full h-48 p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />

              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Programar:</span>
                <select
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value as typeof scheduleTime)}
                  className="flex-1 p-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                >
                  <option value="next-free-slot">Próximo slot libre</option>
                  <option value="now">Publicar ahora</option>
                </select>
              </div>

              <button
                onClick={handleSchedule}
                disabled={isScheduling || !generatedContent.trim()}
                className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg font-semibold transition"
              >
                {isScheduling ? 'Programando...' : '📅 Programar en Typefully'}
              </button>

              {generatedContent && (
                <p className="text-xs text-slate-500 text-center">
                  {generatedContent.length}/280 caracteres
                </p>
              )}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-12 p-6 bg-slate-900 rounded-xl">
            <h3 className="font-semibold mb-4">💡 Tips para contenido viral</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• <strong>Noticias:</strong> Sé el primero en español. Añade tu opinión al final.</li>
              <li>• <strong>Hilos:</strong> Empieza con un hook fuerte. Termina con CTA.</li>
              <li>• <strong>Hot takes:</strong> Sé contrario pero con argumentos. Genera debate.</li>
              <li>• <strong>Tips:</strong> Un consejo = un tweet. Simple y accionable.</li>
              <li>• <strong>Demos:</strong> Muestra antes/después. Los resultados venden.</li>
            </ul>
          </div>

          {/* Cuentas a seguir */}
          <div className="mt-6 p-6 bg-slate-900 rounded-xl">
            <h3 className="font-semibold mb-4">🎯 Cuentas para monitorear</h3>
            <div className="flex flex-wrap gap-2">
              {[
                '@AnthropicAI', '@OpenAI', '@GoogleAI', '@levelsio', '@sama',
                '@kaboringathy', '@swyx', '@TheRundownAI', '@LinusEkenstam', '@rowancheung'
              ].map(handle => (
                <a
                  key={handle}
                  href={`https://x.com/${handle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-full text-sm text-slate-300 transition"
                >
                  {handle}
                </a>
              ))}
            </div>
          </div>

          {/* RSS Feed - AI News */}
          <div className="mt-6 p-6 bg-slate-900 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">📡 Noticias de IA (RSS)</h3>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white"
              >
                {uniqueSources.map(source => (
                  <option key={source} value={source}>
                    {source === 'all' ? 'Todas las fuentes' : source}
                  </option>
                ))}
              </select>
            </div>

            {isLoadingFeed ? (
              <div className="text-center py-8 text-slate-400">
                Cargando noticias...
              </div>
            ) : filteredFeedItems.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                No hay noticias disponibles
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredFeedItems.map((item, index) => (
                  <div
                    key={`${item.link}-${index}`}
                    className="p-4 bg-slate-800 hover:bg-slate-750 rounded-lg cursor-pointer transition group"
                    onClick={() => handleSelectFeedItem(item)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-white group-hover:text-indigo-400 transition line-clamp-2">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs px-2 py-0.5 bg-slate-700 rounded text-slate-300">
                            {item.source}
                          </span>
                          <span className="text-xs text-slate-500">
                            {new Date(item.pubDate).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                      <button
                        className="shrink-0 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectFeedItem(item)
                        }}
                      >
                        Adaptar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-slate-500 mt-4 text-center">
              Haz clic en una noticia para adaptarla al español con Claude
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
