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
    // Validar licencia con LemonSqueezy API
    const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`
      },
      body: JSON.stringify({
        license_key: licenseKey
      })
    })

    const data = await response.json()

    if (data.valid || data.license_key?.status === 'active' || data.license_key?.status === 'inactive') {
      // Licencia valida
      return res.status(200).json({
        valid: true,
        message: 'Licencia valida'
      })
    } else {
      return res.status(401).json({
        valid: false,
        message: 'Licencia no valida'
      })
    }
  } catch (error) {
    console.error('Error validating license:', error)
    return res.status(500).json({ error: 'Error validating license' })
  }
}
