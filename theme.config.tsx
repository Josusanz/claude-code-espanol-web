import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>
      🇪🇸 Claude Code en Español
    </span>
  ),
  project: {
    link: 'https://github.com/TU-USUARIO/claude-code-espanol',
  },
  docsRepositoryBase: 'https://github.com/TU-USUARIO/claude-code-espanol/tree/main',
  footer: {
    content: (
      <span>
        © {new Date().getFullYear()} Josu. Licencia{' '}
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
          CC BY-NC-SA 4.0
        </a>
      </span>
    ),
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Claude Code en Español" />
      <meta property="og:description" content="Aprende Claude Code completamente en español. Curso interactivo gratuito para personas sin experiencia técnica." />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Claude Code en Español'
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
  primaryHue: 210,
  primarySaturation: 100,
}

export default config
