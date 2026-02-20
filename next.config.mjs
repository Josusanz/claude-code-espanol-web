import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
})

export default withNextra({
  images: {
    unoptimized: true,
  },
  basePath: '',
  async redirects() {
    return [
      { source: '/precurso', destination: '/curso', permanent: true },
      { source: '/precurso/:path*', destination: '/curso/:path*', permanent: true },
    ]
  },
})
