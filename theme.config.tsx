import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  banner: {
    key: 'premium-banner-2026',
    content: (
      <a href="/premium" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        ✨ <span className="banner-text-full">Cursos avanzados con soporte personalizado</span><span className="banner-text-short">Cursos avanzados</span> →
      </a>
    ),
    dismissible: true,
  },
  logo: (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.625rem',
      width: '100%'
    }}>
      <div className="logo-icon-container" style={{
        background: 'var(--logo-bg, #18181B)',
        borderRadius: '0.375rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        flexShrink: 0
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 17L10 11L4 5" stroke="var(--logo-icon, #FAFAFA)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 19H20" stroke="var(--logo-icon, #FAFAFA)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="logo-text" style={{
        fontSize: '0.9375rem',
        fontWeight: 600,
        letterSpacing: '-0.02em'
      }}>
        Aprende <span style={{ fontSize: '0.8125rem', fontWeight: 400, opacity: 0.7 }}>Software</span>
      </span>
      <a
        href="/premium"
        className="premium-btn-nav"
        onClick={(e) => e.stopPropagation()}
        style={{
          marginLeft: 'auto',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.25rem 0.625rem',
          borderRadius: '0.375rem',
          background: 'linear-gradient(to right, #f59e0b, #ea580c)',
          color: 'white',
          fontSize: '0.75rem',
          fontWeight: 600,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}
      >
        <span>✨</span>
        <span className="premium-text-nav">Avanzados</span>
      </a>
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
              Licencia CC BY-NC-SA 4.0
            </a>
          </span>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
            <a href="/privacidad">Privacidad</a>
            <span style={{ opacity: 0.3 }}>·</span>
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
      <meta name="description" content="Aprende Claude Code en español. Curso gratuito de IA para no programadores. Tutoriales, ejemplos prácticos y proyectos reales." />
      <meta name="keywords" content="claude code tutorial, curso claude español, aprender ia gratis, anthropic claude, programar con inteligencia artificial" />
      <meta name="author" content="Josu Sanz" />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="aprende.software" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:title" content="Claude Code en Español - Curso Gratis de IA" />
      <meta property="og:description" content="Aprende Claude Code completamente en español. Curso interactivo gratuito para personas sin experiencia técnica." />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Claude Code en Español" />
      <meta name="twitter:description" content="Curso gratuito de Claude Code en español para no programadores." />
      <meta property="og:image" content="https://www.aprende.software/images/og-image.png" />
      <meta name="twitter:image" content="https://www.aprende.software/images/og-image.png" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      <link rel="canonical" href="https://www.aprende.software/" />
      <title>Claude Code en Español | aprende.software</title>
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
