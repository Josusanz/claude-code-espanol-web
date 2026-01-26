import { NextApiRequest, NextApiResponse } from 'next'

// URL de descarga de GitHub Releases
const DOWNLOAD_URL = 'https://github.com/Josusanz/claude-code-espanol-web/releases/download/course-builder-v1.0.0/course-builder-v1.0.0.zip'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verificar que el usuario tiene una licencia valida
  const licenseKey = req.cookies.course_license

  if (!licenseKey) {
    return res.redirect('/curso-premium')
  }

  // Validar la licencia con LemonSqueezy
  try {
    const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        license_key: licenseKey,
      }),
    })

    const data = await response.json()

    if (!data.valid) {
      return res.redirect('/curso-premium?error=invalid_license')
    }

    // Redirigir a la URL de descarga
    return res.redirect(DOWNLOAD_URL)
  } catch (error) {
    console.error('Error validating license:', error)
    return res.redirect('/curso-premium?error=validation_error')
  }
}
