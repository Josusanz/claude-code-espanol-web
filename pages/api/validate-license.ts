import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { licenseKey } = req.body

  if (!licenseKey) {
    return res.status(400).json({ error: 'License key required' })
  }

  try {
    // Validar licencia con LemonSqueezy License API
    // Nota: La License API es pública y usa form data, no JSON
    const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `license_key=${encodeURIComponent(licenseKey)}`
    })

    const text = await response.text()
    console.log('LemonSqueezy raw response:', text)

    if (!text) {
      return res.status(200).json({
        valid: false,
        message: 'Respuesta vacía de LemonSqueezy. Verifica que el producto tenga licencias habilitadas.'
      })
    }

    const data = JSON.parse(text)
    console.log('LemonSqueezy response:', JSON.stringify(data))

    if (data.valid === true) {
      // Licencia valida
      return res.status(200).json({
        valid: true,
        message: 'Licencia valida'
      })
    } else {
      return res.status(200).json({
        valid: false,
        message: data.error || 'Licencia no valida'
      })
    }
  } catch (error) {
    console.error('Error validating license:', error)
    return res.status(200).json({ valid: false, error: 'Error al conectar con LemonSqueezy' })
  }
}
