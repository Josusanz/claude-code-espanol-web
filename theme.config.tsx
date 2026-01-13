import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontWeight: 800,
      fontSize: '1.1rem'
    }}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="6" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <path d="M6 12 L10 16 L6 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="14" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <span style={{ color: 'inherit' }}>
        Claude Code en Español
      </span>
    </div>
  ),
  project: {
    link: 'https://github.com/Josusanz/claude-code-espanol-web',
  },
  docsRepositoryBase: 'https://github.com/Josusanz/claude-code-espanol-web/tree/main',
  footer: {
    content: (
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <span>
            © 2026 Josu Sanz ·{' '}
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">
              CC BY-NC-SA 4.0
            </a>
          </span>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
            <a href="https://yenze.io" target="_blank" rel="noopener noreferrer">Yenze.io</a>
            <span style={{ opacity: 0.3 }}>·</span>
            <a href="https://sacred.events" target="_blank" rel="noopener noreferrer">Sacred Events</a>
          </div>
        </div>
        <p style={{ fontSize: '0.875rem', opacity: 0.7, margin: 0 }}>
          Curso gratuito de código abierto para la comunidad hispanohablante 🚀
        </p>
      </div>
    ),
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Claude Code en Español" />
      <meta property="og:description" content="Aprende Claude Code completamente en español. Curso interactivo gratuito para personas sin experiencia técnica." />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      <title>Claude Code en Español</title>
    </>
  ),
  themeSwitch: {
    useOptions() {
      return {
        light: 'Claro',
        dark: 'Oscuro',
        system: 'Sistema'
      }
    }
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
    title: 'En esta página',
  },
  editLink: {
    content: 'Editar esta página en GitHub →'
  },
  feedback: {
    content: '¿Preguntas? Abre un issue →',
    labels: 'feedback'
  },
  navigation: {
    prev: true,
    next: true,
  },
  gitTimestamp: ({ timestamp }) => (
    <span>Última actualización: {timestamp.toLocaleDateString('es-ES')}</span>
  ),
}

export default config
