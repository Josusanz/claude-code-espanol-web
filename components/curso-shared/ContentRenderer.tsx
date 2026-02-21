import React, { useState, useEffect } from 'react'
import { THEMES } from '../../lib/themes-data'

// ============= PrepChecklistBlock =============

function PrepChecklistBlock({ items }: { items: { text: string; checked: boolean }[] }) {
  const storageKey = 'prep-checklist-' + items.map(i => i.text).join('|').slice(0, 80)
  const [checked, setChecked] = useState<Record<number, boolean>>({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setChecked(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [storageKey])

  const toggleItem = (index: number) => {
    const next = { ...checked, [index]: !checked[index] }
    setChecked(next)
    try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch { /* ignore */ }
  }

  const completedCount = Object.values(checked).filter(Boolean).length
  const allDone = completedCount === items.length

  return (
    <div style={{ margin: '12px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: allDone ? '#16a34a' : '#94a3b8' }}>
          {completedCount}/{items.length} completados
        </span>
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {items.map((item, i) => (
          <li
            key={i}
            onClick={() => toggleItem(i)}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: '12px',
              padding: '10px 0',
              borderBottom: i < items.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
              fontSize: '14px',
              color: checked[i] ? '#94a3b8' : '#374151',
              textDecoration: checked[i] ? 'line-through' : 'none',
              cursor: 'pointer', userSelect: 'none', transition: 'all 0.15s',
            }}
          >
            <span style={{
              width: '20px', height: '20px',
              border: checked[i] ? 'none' : '2px solid #cbd5e1',
              background: checked[i] ? '#22c55e' : 'transparent',
              borderRadius: '5px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: '1px', fontSize: '12px', color: '#fff',
              transition: 'all 0.15s',
            }}>
              {checked[i] ? '✓' : ''}
            </span>
            <span dangerouslySetInnerHTML={{ __html: renderInline(item.text) }} />
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============= CopyButton =============

export function CopyButton({ texto }: { texto: string }) {
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

// ============= Inline markdown renderer =============

export function renderInline(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code style="background:#e2e8f0;padding:2px 6px;border-radius:4px;font-size:13px;color:#0f172a;">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#0f172a;">$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#6366f1;text-decoration:none;font-weight:500;">$1</a>')
}

// ============= ThemeSelector =============

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

export function ThemeSelectorInline() {
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

// ============= parseContentBlocks =============

export function parseContentBlocks(text: string, codeBlocks: { lang: string; code: string }[]) {
  const elements: any[] = []
  const lines = text.split('\n')
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    // Interactive theme selector placeholder
    if (line.trim() === '{{THEME_SELECTOR}}') {
      elements.push(<ThemeSelectorInline key={key++} />)
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

    // ## heading
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

    // Blockquote -> yellow callout
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

    // Checkbox list (- [ ] items)
    if (line.match(/^- \[[ x]\] /)) {
      const items: { text: string; checked: boolean }[] = []
      while (i < lines.length && lines[i].match(/^- \[[ x]\] /)) {
        const isChecked = lines[i].startsWith('- [x] ')
        items.push({ text: lines[i].replace(/^- \[[ x]\] /, ''), checked: isChecked })
        i++
      }
      elements.push(<PrepChecklistBlock key={key++} items={items} />)
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

    // Paragraph
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

// ============= renderPreclaseContent =============

export function renderPreclaseContent(contenido: string) {
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
