import { useState } from 'react'
import { MediaContent, Lesson } from '../lib/curso-interactivo-data'

// Componente para videos embebidos
function VideoEmbed({
  videoId,
  provider = 'youtube',
  caption
}: {
  videoId: string
  provider?: 'youtube' | 'vimeo' | 'self'
  caption?: string
}) {
  const [isLoading, setIsLoading] = useState(true)

  const getEmbedUrl = () => {
    switch (provider) {
      case 'youtube':
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
      case 'vimeo':
        return `https://player.vimeo.com/video/${videoId}`
      default:
        return videoId // URL directa para self-hosted
    }
  }

  return (
    <div className="my-4">
      <div className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <iframe
          src={getEmbedUrl()}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>
      {caption && (
        <p className="text-slate-400 text-sm mt-2 text-center italic">{caption}</p>
      )}
    </div>
  )
}

// Componente para imágenes
function ImageContent({
  url,
  alt,
  caption
}: {
  url: string
  alt?: string
  caption?: string
}) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <>
      <div className="my-4">
        <div
          className="relative rounded-xl overflow-hidden border border-slate-700 cursor-zoom-in hover:border-indigo-500 transition-colors"
          onClick={() => setIsZoomed(true)}
        >
          <img
            src={url}
            alt={alt || caption || 'Imagen del curso'}
            className="w-full h-auto"
          />
          <div className="absolute top-2 right-2 bg-slate-900/80 px-2 py-1 rounded text-xs text-slate-400">
            Click para ampliar
          </div>
        </div>
        {caption && (
          <p className="text-slate-400 text-sm mt-2 text-center italic">{caption}</p>
        )}
      </div>

      {/* Modal de zoom */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-slate-300"
            onClick={() => setIsZoomed(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={url}
            alt={alt || caption || 'Imagen del curso'}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  )
}

// Componente para código con syntax highlighting básico
function CodeBlock({
  code,
  language = 'javascript',
  caption
}: {
  code: string
  language?: string
  caption?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-4">
      <div className="relative bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-xs text-slate-400 font-mono">{language}</span>
          <button
            onClick={handleCopy}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copiado
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar
              </>
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-slate-300 font-mono whitespace-pre">{code}</code>
        </pre>
      </div>
      {caption && (
        <p className="text-slate-400 text-sm mt-2 text-center italic">{caption}</p>
      )}
    </div>
  )
}

// Componente para diagramas (usando imágenes o ASCII art)
function DiagramContent({
  url,
  code,
  caption
}: {
  url?: string
  code?: string
  caption?: string
}) {
  if (url) {
    return <ImageContent url={url} caption={caption} />
  }

  if (code) {
    return (
      <div className="my-4">
        <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 font-mono text-sm text-slate-300 overflow-x-auto">
          <pre className="whitespace-pre">{code}</pre>
        </div>
        {caption && (
          <p className="text-slate-400 text-sm mt-2 text-center italic">{caption}</p>
        )}
      </div>
    )
  }

  return null
}

// Componente para renderizar un item de media
function MediaItem({ media }: { media: MediaContent }) {
  switch (media.type) {
    case 'video':
      return (
        <VideoEmbed
          videoId={media.videoId || media.url || ''}
          provider={media.videoProvider}
          caption={media.caption}
        />
      )
    case 'image':
    case 'gif':
      return (
        <ImageContent
          url={media.url || ''}
          alt={media.alt}
          caption={media.caption}
        />
      )
    case 'code':
      return (
        <CodeBlock
          code={media.code || ''}
          language={media.language}
          caption={media.caption}
        />
      )
    case 'diagram':
      return (
        <DiagramContent
          url={media.url}
          code={media.code}
          caption={media.caption}
        />
      )
    default:
      return null
  }
}

// Componente para recursos adicionales
function ResourcesList({ resources }: { resources: Lesson['resources'] }) {
  if (!resources || resources.length === 0) return null

  const getIcon = (type: string) => {
    switch (type) {
      case 'docs':
        return '📄'
      case 'video':
        return '🎥'
      case 'article':
        return '📝'
      case 'github':
        return '💻'
      default:
        return '🔗'
    }
  }

  return (
    <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
      <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
        <span>📚</span> Recursos adicionales
      </h4>
      <ul className="space-y-2">
        {resources.map((resource, i) => (
          <li key={i}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>{getIcon(resource.type)}</span>
              <span>{resource.title}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Componente principal para el contenido de una lección
export function LessonContent({ lesson }: { lesson: Lesson }) {
  return (
    <div className="space-y-4">
      {/* Contenido teórico (si existe) */}
      {lesson.theory && (
        <div className="prose prose-invert prose-sm max-w-none">
          <div
            className="text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: lesson.theory }}
          />
        </div>
      )}

      {/* Contenido multimedia */}
      {lesson.media && lesson.media.length > 0 && (
        <div className="space-y-4">
          {lesson.media.map((media, index) => (
            <MediaItem key={index} media={media} />
          ))}
        </div>
      )}

      {/* Recursos adicionales */}
      <ResourcesList resources={lesson.resources} />
    </div>
  )
}

// Componente para video introductorio de módulo
export function ModuleIntroVideo({
  videoId,
  provider,
  duration,
  moduleTitle
}: {
  videoId: string
  provider: 'youtube' | 'vimeo'
  duration: string
  moduleTitle: string
}) {
  const [showVideo, setShowVideo] = useState(false)

  if (!showVideo) {
    return (
      <div
        className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden border border-slate-700 cursor-pointer group"
        onClick={() => setShowVideo(true)}
      >
        {/* Thumbnail placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white">{moduleTitle}</h3>
          <p className="text-slate-400 text-sm mt-1">Video introductorio · {duration}</p>
        </div>
      </div>
    )
  }

  return (
    <VideoEmbed
      videoId={videoId}
      provider={provider}
      caption={`Introducción al módulo: ${moduleTitle}`}
    />
  )
}
