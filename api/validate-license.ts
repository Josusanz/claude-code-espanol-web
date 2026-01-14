import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { licenseKey } = req.body

  if (!licenseKey) {
    return res.status(400).json({ error: 'License key required' })
  }

  try {
    // Validar licencia con LemonSqueezy License API
    const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `license_key=${encodeURIComponent(licenseKey)}`
    })

    const text = await response.text()

    if (!text) {
      return res.status(200).json({
        valid: false,
        message: 'Respuesta vacía de LemonSqueezy'
      })
    }

    const data = JSON.parse(text)
    const status = data.license_key?.status

    if (data.valid === true && (status === 'active' || status === 'inactive')) {
      return res.status(200).json({
        valid: true,
        message: 'Licencia valida'
      })
    } else {
      return res.status(200).json({
        valid: false,
        message: data.error || `Licencia no valida (status: ${status || 'unknown'})`
      })
    }
  } catch (error) {
    console.error('Error validating license:', error)
    return res.status(200).json({ valid: false, error: 'Error al conectar con LemonSqueezy' })
  }
}
