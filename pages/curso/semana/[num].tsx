import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import CursoEmailGate from '../../../components/CursoEmailGate'
import { CURSO_SEMANAS, getCursoTrackingIds, Semana } from '../../../lib/curso-data'
import { THEMES } from '../../../lib/themes-data'

function getUserEmail(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const savedAccess = localStorage.getItem('precurso-access')
    if (savedAccess) {
      const data = JSON.parse(savedAccess)
      return data.email ? data.email.toLowerCase().trim() : null
    }
  } catch {
    // Ignore
  }
  return null
}

function useSemanaProgress(semanaNum: number) {
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const ids = getCursoTrackingIds(semanaNum)

  useEffect(() => {
    const email = getUserEmail()
    setUserEmail(email)

    try {
      const saved = localStorage.getItem('curso-progress')
      if (saved) {
        setProgress(JSON.parse(saved))
      }
    } catch {
      // Ignore
    }

    if (email) {
      fetch(`/api/curso/sync-progress?email=${encodeURIComponent(email)}`)
        .then(res => res.json())
        .then(data => {
          if (data.progress) {
            setProgress(prev => ({ ...prev, ...data.progress }))
          }
        })
        .catch(() => {})
    }

    setLoading(false)
  }, [semanaNum])

  const toggle = async (id: string) => {
    const newProgress = { ...progress, [id]: !progress[id] }
    setProgress(newProgress)
    localStorage.setItem('curso-progress', JSON.stringify(newProgress))

    if (userEmail) {
      try {
        await fetch('/api/curso/sync-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, progress: newProgress })
        })
      } catch {
        // Ignore
      }
    }
  }

  return {
    progress,
    loading,
    toggle,
    ids,
    preclaseCompleted: progress[ids.preclase] || false,
    claseCompleted: progress[ids.clase] || false,
    entregableCompleted: progress[ids.entregable] || false
  }
}

function useChecklist(semanaNum: number, totalItems: number) {
  const [checked, setChecked] = useState<Record<number, boolean>>({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem('curso-checklist')
      if (saved) {
        const all = JSON.parse(saved)
        if (all[semanaNum]) {
          setChecked(all[semanaNum])
        }
      }
    } catch {
      // Ignore
    }
  }, [semanaNum])

  const toggleItem = (index: number) => {
    const newChecked = { ...checked, [index]: !checked[index] }
    setChecked(newChecked)
    try {
      const saved = localStorage.getItem('curso-checklist')
      const all = saved ? JSON.parse(saved) : {}
      all[semanaNum] = newChecked
      localStorage.setItem('curso-checklist', JSON.stringify(all))
    } catch {
      // Ignore
    }
  }

  const completedCount = Object.values(checked).filter(Boolean).length

  return { checked, toggleItem, completedCount, totalItems }
}

type SectionKey = 'preclase' | 'clase' | 'entregable'

const SECTIONS: { key: SectionKey; label: string; icon: string; completedIcon: string }[] = [
  { key: 'preclase', label: 'Pre-clase', icon: '📚', completedIcon: '✓' },
  { key: 'clase', label: 'Clase en vivo', icon: '🎥', completedIcon: '✓' },
  { key: 'entregable', label: 'Entregable', icon: '📦', completedIcon: '✓' },
]

function CopyButton({ texto }: { texto: string }) {
  const [copiado, setCopiado] = useState(false)

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = texto
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  return (
    <button
      onClick={copiar}
      style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        padding: '6px 12px',
        background: copiado ? '#22c55e' : 'rgba(255,255,255,0.1)',
        color: copiado ? 'white' : '#94a3b8',
        border: `1px solid ${copiado ? '#22c55e' : 'rgba(255,255,255,0.15)'}`,
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'inherit',
      }}
    >
      {copiado ? '✓ Copiado' : 'Copiar'}
    </button>
  )
}

const CATEGORIA_EMOJI: Record<string, string> = {
  Landing: '🌐', Dashboard: '📊', SaaS: '⚡', Blog: '📝', Portfolio: '🎨', Docs: '📚',
}

const CATEGORIA_COLORS: Record<string, { bg: string; text: string }> = {
  Landing: { bg: '#ede9fe', text: '#7c3aed' },
  Dashboard: { bg: '#dbeafe', text: '#2563eb' },
  SaaS: { bg: '#d1fae5', text: '#059669' },
  Blog: { bg: '#fef3c7', text: '#d97706' },
  Portfolio: { bg: '#fce7f3', text: '#db2777' },
  Docs: { bg: '#e0e7ff', text: '#4338ca' },
}

function ThemeSelector() {
  const defaultTheme = THEMES.find(t => t.slug === 'simple-next') || THEMES[0]
  const [selected, setSelected] = useState(defaultTheme)
  const [projectName, setProjectName] = useState('mi-landing')

  const deriveProjectName = (slug: string) => 'mi-' + slug.replace(/-next$/, '')

  const safeName = projectName.replace(/[^a-zA-Z0-9_-]/g, '') || 'mi-proyecto'

  const commands = `cd ~/curso-ia
git clone https://github.com/Josusanz/aprende-themes.git
cp -r aprende-themes/${selected.slug} ${safeName}
cd ${safeName}
npm install
npm run dev`

  return (
    <div style={{ margin: '16px 0' }}>
      {/* Step 1: Theme grid */}
      <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        1. Elige theme
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: '8px',
        marginBottom: '12px',
      }}>
        {THEMES.map(theme => {
          const isSelected = selected.slug === theme.slug
          const catColor = CATEGORIA_COLORS[theme.categoria]
          return (
            <button
              key={theme.slug}
              onClick={() => {
                setSelected(theme)
                setProjectName(deriveProjectName(theme.slug))
              }}
              style={{
                padding: '10px 10px 8px',
                background: isSelected ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#fff',
                color: isSelected ? '#fff' : '#374151',
                border: `2px solid ${isSelected ? '#6366f1' : '#e2e8f0'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, display: 'block', lineHeight: 1.3 }}>
                {theme.nombre}
              </span>
              <span style={{
                display: 'inline-block',
                marginTop: '4px',
                fontSize: '10px',
                fontWeight: 600,
                padding: '2px 6px',
                borderRadius: '4px',
                background: isSelected ? 'rgba(255,255,255,0.2)' : catColor.bg,
                color: isSelected ? 'rgba(255,255,255,0.9)' : catColor.text,
              }}>
                {theme.categoria}
              </span>
            </button>
          )
        })}
      </div>

      {/* Selected theme info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 14px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        marginBottom: '16px',
        fontSize: '13px',
        color: '#475569',
        lineHeight: 1.5,
      }}>
        <span style={{ fontSize: '16px', flexShrink: 0 }}>{CATEGORIA_EMOJI[selected.categoria] || '🌐'}</span>
        <span style={{ flex: 1 }}>
          <strong style={{ color: '#0f172a' }}>{selected.nombre}</strong> — {selected.descripcion}
        </span>
        {selected.demoUrl && (
          <a
            href={selected.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flexShrink: 0,
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#6366f1',
              background: '#eef2ff',
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            Ver demo
          </a>
        )}
      </div>

      {/* Step 2: Project name */}
      <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        2. Nombre de tu proyecto
      </p>
      <input
        type="text"
        value={projectName}
        onChange={e => setProjectName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
        placeholder="mi-proyecto"
        style={{
          width: '100%',
          padding: '10px 14px',
          fontSize: '14px',
          border: '2px solid #e2e8f0',
          borderRadius: '8px',
          boxSizing: 'border-box',
          fontFamily: "'JetBrains Mono', monospace",
          marginBottom: '16px',
          outline: 'none',
          transition: 'border 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = '#6366f1'}
        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
      />

      {/* Step 3: Generated commands */}
      <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        3. Ejecuta en tu terminal
      </p>
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'relative',
          background: '#0f172a',
          borderRadius: '8px',
          padding: '16px 60px 16px 16px',
          overflow: 'auto',
        }}>
          <CopyButton texto={commands} />
          <pre style={{
            margin: 0,
            fontSize: '14px',
            lineHeight: 1.7,
            color: '#e2e8f0',
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {commands}
          </pre>
        </div>
      </div>

      {/* Step 4: localhost hint */}
      <div style={{
        margin: '12px 0 0',
        padding: '10px 14px',
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#166534',
      }}>
        4. Abre <code style={{ background: '#dcfce7', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>http://localhost:3000</code> en tu navegador para ver el theme
      </div>
    </div>
  )
}

function renderInline(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code style="background:#e2e8f0;padding:2px 6px;border-radius:4px;font-size:13px;color:#0f172a;">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#0f172a;">$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#6366f1;text-decoration:none;font-weight:500;">$1</a>')
}

function parseContentBlocks(text: string, codeBlocks: { lang: string; code: string }[]) {
  const elements: any[] = []
  const lines = text.split('\n')
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    // Interactive theme selector placeholder
    if (line.trim() === '{{THEME_SELECTOR}}') {
      elements.push(<ThemeSelector key={key++} />)
      i++
      continue
    }

    // Code block placeholder
    const codeMatch = line.match(/^__CODEBLOCK_(\d+)__$/)
    if (codeMatch) {
      const block = codeBlocks[parseInt(codeMatch[1])]
      elements.push(
        <div key={key++} style={{ position: 'relative', margin: '16px 0' }}>
          <div style={{
            position: 'relative',
            background: '#0f172a',
            borderRadius: '8px',
            padding: '16px 60px 16px 16px',
            overflow: 'auto',
          }}>
            <CopyButton texto={block.code} />
            <pre style={{
              margin: 0,
              fontSize: '14px',
              lineHeight: 1.7,
              color: '#e2e8f0',
              fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {block.code}
            </pre>
          </div>
        </div>
      )
      i++
      continue
    }

    // ## heading (within section body)
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={key++} style={{
          fontSize: '17px',
          fontWeight: 600,
          color: '#0f172a',
          margin: '24px 0 12px',
        }}>
          {line.slice(3)}
        </h3>
      )
      i++
      continue
    }

    // ### heading with left border accent
    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={key++} style={{
          fontSize: '15px',
          fontWeight: 600,
          color: '#1e293b',
          margin: '20px 0 10px',
          paddingLeft: '12px',
          borderLeft: '3px solid #6366f1',
        }}>
          {line.slice(4)}
        </h4>
      )
      i++
      continue
    }

    // Blockquote → yellow callout
    if (line.startsWith('> ')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <div key={key++} style={{
          margin: '16px 0',
          padding: '12px 16px',
          background: '#fef9c3',
          border: '1px solid #fde047',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#854d0e',
          lineHeight: 1.6,
        }}>
          <span dangerouslySetInnerHTML={{ __html: renderInline('💡 ' + quoteLines.join(' ')) }} />
        </div>
      )
      continue
    }

    // Table
    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      const parsedRows = tableLines
        .filter(l => !l.match(/^\|[\s\-:|]+\|$/))
        .map(l => l.split('|').slice(1, -1).map(c => c.trim()))

      if (parsedRows.length > 1) {
        elements.push(
          <div key={key++} style={{ margin: '16px 0', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr>
                  {parsedRows[0].map((h, hi) => (
                    <th key={hi} style={{
                      padding: '10px 14px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: '#1e293b',
                      background: '#f8fafc',
                      borderBottom: '2px solid #e2e8f0',
                    }}>
                      <span dangerouslySetInnerHTML={{ __html: renderInline(h) }} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsedRows.slice(1).map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        padding: '10px 14px',
                        borderBottom: '1px solid #e2e8f0',
                        color: '#374151',
                      }}>
                        <span dangerouslySetInnerHTML={{ __html: renderInline(cell) }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      continue
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      const items: string[] = []
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i++
      }
      elements.push(
        <ol key={key++} style={{ margin: '12px 0', paddingLeft: '24px' }}>
          {items.map((item, ii) => (
            <li key={ii} style={{ marginBottom: '8px', lineHeight: 1.6 }}>
              <span dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Unordered list
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={key++} style={{ margin: '12px 0', paddingLeft: '24px' }}>
          {items.map((item, ii) => (
            <li key={ii} style={{ marginBottom: '8px', lineHeight: 1.6 }}>
              <span dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph — collect consecutive non-special lines
    const paraLines: string[] = []
    while (i < lines.length && lines[i].trim() !== '' &&
           !lines[i].startsWith('## ') && !lines[i].startsWith('### ') &&
           !lines[i].startsWith('> ') && !lines[i].startsWith('- ') &&
           !lines[i].match(/^\d+\. /) &&
           !(lines[i].includes('|') && lines[i].trim().startsWith('|')) &&
           !lines[i].match(/^__CODEBLOCK_\d+__$/) &&
           lines[i].trim() !== '{{THEME_SELECTOR}}') {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length > 0) {
      elements.push(
        <p key={key++} style={{ margin: '12px 0' }}>
          <span dangerouslySetInnerHTML={{ __html: renderInline(paraLines.join(' ')) }} />
        </p>
      )
    }
  }

  return elements
}

function renderPreclaseContent(contenido: string) {
  // Step 1: Extract code blocks and replace with placeholders
  const codeBlocks: { lang: string; code: string }[] = []
  const withPlaceholders = contenido.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length
    codeBlocks.push({ lang: lang || '', code: code.replace(/\n$/, '') })
    return `__CODEBLOCK_${idx}__`
  })

  // Step 2: Split by --- separators
  const rawSections = withPlaceholders.trim().split(/\n---\n/)

  // Step 3: Render each section as a card
  return rawSections.filter(s => s.trim()).map((section, idx) => {
    const trimmed = section.trim()
    const lines = trimmed.split('\n')

    // Extract ## heading from start of section as card title
    let title = ''
    let bodyLines: string[]
    const firstContentLine = lines.findIndex(l => l.trim() !== '')
    if (firstContentLine >= 0 && lines[firstContentLine].startsWith('## ')) {
      title = lines[firstContentLine].slice(3)
      bodyLines = lines.slice(firstContentLine + 1)
    } else {
      bodyLines = lines
    }

    const blocks = parseContentBlocks(bodyLines.join('\n'), codeBlocks)

    return (
      <div key={idx} style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        {title && (
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            padding: '20px 24px',
            color: 'white',
          }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, lineHeight: 1.3 }}>
              {title}
            </h3>
          </div>
        )}
        <div style={{ padding: '20px 24px', fontSize: '15px', lineHeight: 1.7, color: '#374151' }}>
          {blocks}
        </div>
      </div>
    )
  })
}

function SemanaContent({ semana }: { semana: Semana }) {
  const { toggle, ids, preclaseCompleted, claseCompleted, entregableCompleted } = useSemanaProgress(semana.num)
  const checklist = useChecklist(semana.num, semana.entregable.checklist.length)
  const [activeSection, setActiveSection] = useState<SectionKey>('preclase')

  const completedMap: Record<SectionKey, boolean> = {
    preclase: preclaseCompleted,
    clase: claseCompleted,
    entregable: entregableCompleted,
  }

  const sectionIndex = SECTIONS.findIndex(s => s.key === activeSection)

  const goNext = () => {
    if (sectionIndex < SECTIONS.length - 1) {
      setActiveSection(SECTIONS[sectionIndex + 1].key)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goPrev = () => {
    if (sectionIndex > 0) {
      setActiveSection(SECTIONS[sectionIndex - 1].key)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('precurso-access')
    localStorage.removeItem('curso-progress')
    window.location.href = '/curso'
  }

  const sidebarColors: Record<SectionKey, string> = {
    preclase: '#f59e0b',
    clase: '#6366f1',
    entregable: '#ec4899',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#0f172a'
    }}>
      <Head>
        <title>Semana {semana.num}: {semana.titulo} | Curso</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/curso" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            ← Volver
          </Link>
          <div style={{
            width: '1px',
            height: '24px',
            background: 'rgba(0,0,0,0.08)'
          }} />
          <h1 className="header-title" style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#0f172a' }}>
            {semana.emoji} Semana {semana.num}: {semana.titulo}
          </h1>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#64748b',
            background: 'transparent',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Salir
        </button>
      </header>

      {/* Mobile tabs */}
      <div className="mobile-tabs" style={{
        display: 'none',
        gap: '6px',
        padding: '12px 16px',
        background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        overflowX: 'auto',
      }}>
        {SECTIONS.map((s) => {
          const isActive = activeSection === s.key
          const isCompleted = completedMap[s.key]
          return (
            <button
              key={s.key}
              onClick={() => { setActiveSection(s.key); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#fff' : isCompleted ? '#16a34a' : '#64748b',
                background: isActive ? sidebarColors[s.key] : isCompleted ? 'rgba(34,197,94,0.08)' : '#f8fafc',
                border: `1px solid ${isActive ? sidebarColors[s.key] : isCompleted ? 'rgba(34,197,94,0.2)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '14px' }}>{isCompleted ? '✓' : s.icon}</span>
              {s.label}
            </button>
          )
        })}
      </div>

      <div className="layout-wrapper" style={{
        display: 'flex',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '24px',
        gap: '24px',
      }}>
        {/* Sidebar — desktop only */}
        <aside className="sidebar" style={{
          width: '240px',
          flexShrink: 0,
          position: 'sticky',
          top: '80px',
          alignSelf: 'flex-start',
        }}>
          {/* Semana info */}
          <div style={{
            padding: '16px',
            marginBottom: '12px',
          }}>
            <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Semana {semana.num}
            </p>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>
              {semana.titulo}
            </p>
            <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>
              {semana.descripcion}
            </p>
          </div>

          {/* Nav items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {SECTIONS.map((s, i) => {
              const isActive = activeSection === s.key
              const isCompleted = completedMap[s.key]
              return (
                <button
                  key={s.key}
                  onClick={() => { setActiveSection(s.key); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="sidebar-btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#0f172a' : isCompleted ? '#16a34a' : '#64748b',
                    background: isActive ? '#fff' : 'transparent',
                    border: isActive ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                    boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.04)' : 'none',
                  }}
                >
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isCompleted ? '13px' : '14px',
                    fontWeight: 700,
                    color: isCompleted ? '#fff' : isActive ? '#fff' : '#64748b',
                    background: isCompleted
                      ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                      : isActive
                        ? sidebarColors[s.key]
                        : '#e2e8f0',
                    flexShrink: 0,
                    transition: 'all 0.15s',
                  }}>
                    {isCompleted ? '✓' : s.icon}
                  </span>
                  <span>
                    {s.label}
                    {s.key === 'preclase' && (
                      <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: 400, marginTop: '2px' }}>
                        {semana.preclase.duracion}
                      </span>
                    )}
                    {s.key === 'clase' && (
                      <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: 400, marginTop: '2px' }}>
                        {semana.clase.duracion}
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Progress summary */}
          <div style={{
            marginTop: '16px',
            padding: '14px 16px',
            background: '#fff',
            borderRadius: '10px',
            border: '1px solid rgba(0,0,0,0.06)',
          }}>
            <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>Progreso</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {SECTIONS.map(s => (
                <div key={s.key} style={{
                  flex: 1,
                  height: '6px',
                  borderRadius: '3px',
                  background: completedMap[s.key] ? '#22c55e' : '#e2e8f0',
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#64748b' }}>
              {Object.values(completedMap).filter(Boolean).length}/3 completados
            </p>
          </div>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* ===== PRE-CLASE ===== */}
          {activeSection === 'preclase' && (
            <section>
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <h2 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                    Pre-clase
                  </h2>
                  <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                    {semana.preclase.titulo} • {semana.preclase.duracion}
                  </p>
                </div>
                <button
                  onClick={() => toggle(ids.preclase)}
                  className="complete-btn"
                  style={{
                    padding: '10px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: preclaseCompleted ? '#22c55e' : '#fff',
                    background: preclaseCompleted ? 'rgba(34, 197, 94, 0.1)' : '#334155',
                    border: `1px solid ${preclaseCompleted ? 'rgba(34, 197, 94, 0.3)' : '#475569'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {preclaseCompleted ? '✓ Completado' : 'Marcar completado'}
                </button>
              </div>

              {/* Content cards */}
              <div style={{ marginBottom: '20px' }}>
                {renderPreclaseContent(semana.preclase.contenido)}
              </div>

              {/* Resources */}
              {semana.preclase.recursos.length > 0 && (
                <div style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '16px',
                  padding: '20px',
                  marginBottom: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
                    📎 Recursos
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {semana.preclase.recursos.map((recurso, i) => (
                      <a
                        key={i}
                        href={recurso.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '12px 16px',
                          background: '#f8fafc',
                          border: '1px solid rgba(0,0,0,0.06)',
                          borderRadius: '10px',
                          color: '#6366f1',
                          textDecoration: 'none',
                          fontSize: '14px',
                          transition: 'all 0.2s'
                        }}
                      >
                        <span>
                          {recurso.tipo === 'pdf' ? '📄' :
                           recurso.tipo === 'video' ? '🎥' :
                           recurso.tipo === 'github' ? '💻' : '🔗'}
                        </span>
                        {recurso.titulo}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ===== CLASE EN VIVO ===== */}
          {activeSection === 'clase' && (
            <section>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <h2 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                    Clase en vivo
                  </h2>
                  <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                    {semana.clase.fecha} • {semana.clase.hora} • {semana.clase.duracion}
                  </p>
                </div>
                <button
                  onClick={() => toggle(ids.clase)}
                  className="complete-btn"
                  style={{
                    padding: '10px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: claseCompleted ? '#22c55e' : '#fff',
                    background: claseCompleted ? 'rgba(34, 197, 94, 0.1)' : '#334155',
                    border: `1px solid ${claseCompleted ? 'rgba(34, 197, 94, 0.3)' : '#475569'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {claseCompleted ? '✓ Vista' : 'Marcar como vista'}
                </button>
              </div>

              {/* Video */}
              {semana.clase.videoUrl ? (
                <div style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  background: '#0f172a',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '20px'
                }}>
                  <iframe
                    src={semana.clase.videoUrl}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '16px',
                  padding: '40px',
                  textAlign: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>📹</span>
                  <p style={{ margin: 0, fontSize: '15px', color: '#64748b' }}>
                    El video de la clase se publicará después de la sesión en vivo
                  </p>
                </div>
              )}

              {/* Pizarra button */}
              <Link href={`/curso/clase/${semana.num}`} className="pizarra-btn" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                transition: 'all 0.2s',
                marginBottom: '20px'
              }}>
                📋 Abrir Pizarra de clase
              </Link>

              {/* Notas */}
              {semana.clase.notas && (
                <div style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
                    📝 Notas de la clase
                  </h4>
                  <div style={{
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: '#374151'
                  }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: semana.clase.notas
                          .replace(/^### (.+)$/gm, '<h5 style="font-size: 15px; font-weight: 600; color: #1e293b; margin: 20px 0 8px;">$1</h5>')
                          .replace(/^- (.+)$/gm, '<li style="margin-left: 16px; margin-bottom: 4px;">$1</li>')
                          .replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #0f172a;">$1</strong>')
                          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #6366f1; text-decoration: underline;">$1</a>')
                          .replace(/\n\n/g, '<br/>')
                      }}
                    />
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ===== ENTREGABLE ===== */}
          {activeSection === 'entregable' && (
            <section>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <h2 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                    Entregable
                  </h2>
                  <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                    {semana.entregable.titulo} • Fecha límite: {semana.entregable.fechaLimite}
                  </p>
                </div>
                <button
                  onClick={() => toggle(ids.entregable)}
                  className="complete-btn"
                  style={{
                    padding: '10px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: entregableCompleted ? '#22c55e' : '#fff',
                    background: entregableCompleted ? 'rgba(34, 197, 94, 0.1)' : '#334155',
                    border: `1px solid ${entregableCompleted ? 'rgba(34, 197, 94, 0.3)' : '#475569'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {entregableCompleted ? '✓ Completado' : 'Marcar completado'}
                </button>
              </div>

              <p style={{
                margin: '0 0 20px',
                fontSize: '15px',
                color: '#374151',
                lineHeight: 1.6,
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                {semana.entregable.descripcion}
              </p>

              {/* Checklist */}
              <div style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>
                    Checklist
                  </h4>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: checklist.completedCount === checklist.totalItems ? '#22c55e' : '#64748b',
                    background: checklist.completedCount === checklist.totalItems ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.04)',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}>
                    {checklist.completedCount}/{checklist.totalItems}
                  </span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {semana.entregable.checklist.map((item, i) => (
                    <li
                      key={i}
                      onClick={() => checklist.toggleItem(i)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '10px 0',
                        borderBottom: i < semana.entregable.checklist.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                        fontSize: '14px',
                        color: checklist.checked[i] ? '#94a3b8' : '#374151',
                        textDecoration: checklist.checked[i] ? 'line-through' : 'none',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'all 0.15s'
                      }}
                    >
                      <span style={{
                        width: '20px',
                        height: '20px',
                        border: checklist.checked[i] ? 'none' : '2px solid #cbd5e1',
                        background: checklist.checked[i] ? '#22c55e' : 'transparent',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px',
                        fontSize: '12px',
                        color: '#fff',
                        transition: 'all 0.15s'
                      }}>
                        {checklist.checked[i] ? '✓' : ''}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Section navigation: Anterior / Siguiente */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}>
            {sectionIndex > 0 ? (
              <button
                onClick={goPrev}
                className="nav-section-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#64748b',
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                ← {SECTIONS[sectionIndex - 1].label}
              </button>
            ) : <div />}

            {sectionIndex < SECTIONS.length - 1 ? (
              <button
                onClick={goNext}
                className="nav-section-btn next-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#fff',
                  background: sidebarColors[SECTIONS[sectionIndex + 1].key],
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                {SECTIONS[sectionIndex + 1].label} →
              </button>
            ) : (
              /* Last section: show link to next/prev semana */
              <div style={{ display: 'flex', gap: '12px' }}>
                {semana.num < 10 && (
                  <Link href={`/curso/semana/${semana.num + 1}`} className="nav-section-btn next-btn" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#fff',
                    background: '#6366f1',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>
                    Semana {semana.num + 1} →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Semana nav (bottom) */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '16px',
            fontSize: '13px',
          }}>
            {semana.num > 1 ? (
              <Link href={`/curso/semana/${semana.num - 1}`} style={{
                color: '#94a3b8',
                textDecoration: 'none',
              }}>
                ← Semana {semana.num - 1}
              </Link>
            ) : <div />}

            {semana.num < 10 ? (
              <Link href={`/curso/semana/${semana.num + 1}`} style={{
                color: '#94a3b8',
                textDecoration: 'none',
              }}>
                Semana {semana.num + 1} →
              </Link>
            ) : <div />}
          </div>
        </main>
      </div>

      <style jsx global>{`
        .pizarra-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4) !important;
        }
        .nav-section-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.12) !important;
        }
        .sidebar-btn:hover {
          background: rgba(255,255,255,0.7) !important;
        }
        .complete-btn:hover {
          opacity: 0.9;
        }
        /* Desktop: show sidebar, hide mobile tabs */
        @media (min-width: 769px) {
          .mobile-tabs { display: none !important; }
          .sidebar { display: block !important; }
        }
        /* Mobile: hide sidebar, show mobile tabs */
        @media (max-width: 768px) {
          .mobile-tabs { display: flex !important; }
          .sidebar { display: none !important; }
          .layout-wrapper { padding: 16px !important; }
          .header-title { font-size: 14px !important; }
          h2 { font-size: 20px !important; }
          .complete-btn { padding: 8px 12px !important; font-size: 12px !important; }
        }
      `}</style>
    </div>
  )
}

function SemanaLockGuard({ semana, children }: { semana: Semana; children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check admin bypass
    const adminPass = localStorage.getItem('josu-admin-password')
    if (adminPass) {
      setIsAdmin(true)
      setUnlocked(true)
      return
    }

    // Check if week is unlocked via API
    fetch('/api/curso/config')
      .then(res => res.json())
      .then(data => {
        setUnlocked(data.semanasStatus?.[semana.num] || false)
      })
      .catch(() => setUnlocked(false))
  }, [semana.num])

  if (unlocked === null) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #6366f1',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!unlocked) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#0f172a',
        padding: '24px'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '440px',
          background: '#fff',
          borderRadius: '20px',
          padding: '48px 32px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
        }}>
          <span style={{ fontSize: '56px', display: 'block', marginBottom: '20px' }}>🔒</span>
          <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
            Semana {semana.num} bloqueada
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, marginBottom: '28px' }}>
            Esta semana aún no está disponible. Se desbloqueará cuando el instructor la active.
          </p>
          <Link href="/curso" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: 600,
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
          }}>
            ← Volver al curso
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {isAdmin && (
        <div style={{
          background: '#fef3c7',
          borderBottom: '1px solid #fde047',
          padding: '8px 24px',
          fontSize: '13px',
          color: '#92400e',
          fontWeight: 500,
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif"
        }}>
          👨‍🏫 Vista de admin — Los alumnos ven esto mismo
        </div>
      )}
      {children}
    </>
  )
}

function SemanaPage() {
  const router = useRouter()
  const { num } = router.query
  const semanaNum = parseInt(num as string, 10)

  if (!num || isNaN(semanaNum) || semanaNum < 1 || semanaNum > 10) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0f172a',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Semana no encontrada</h1>
          <Link href="/curso" style={{ color: '#6366f1' }}>← Volver al curso</Link>
        </div>
      </div>
    )
  }

  const semana = CURSO_SEMANAS.find(s => s.num === semanaNum)

  if (!semana) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #eef2f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0f172a',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Semana no encontrada</h1>
          <Link href="/curso" style={{ color: '#6366f1' }}>← Volver al curso</Link>
        </div>
      </div>
    )
  }

  return (
    <CursoEmailGate>
      <SemanaLockGuard semana={semana}>
        <SemanaContent semana={semana} />
      </SemanaLockGuard>
    </CursoEmailGate>
  )
}

export default SemanaPage
