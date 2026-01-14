import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 700 }}>
      Tu Curso
    </span>
  ),
  project: {
    link: 'https://github.com/tu-usuario/tu-curso',
  },
  docsRepositoryBase: 'https://github.com/tu-usuario/tu-curso',
  footer: {
    content: '© 2026 Tu Nombre',
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Tu Curso" />
      <meta property="og:description" content="Descripción de tu curso" />
    </>
  ),
  primaryHue: 220, // Azul por defecto, cambia el número para otro color
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
}

export default config
