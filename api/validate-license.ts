export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request) {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await request.json()
    const { licenseKey } = body

    if (!licenseKey) {
      return new Response(JSON.stringify({ error: 'License key required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

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
      return new Response(JSON.stringify({
        valid: false,
        message: 'Respuesta vacia de LemonSqueezy'
      }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    const data = JSON.parse(text)
    const status = data.license_key?.status

    if (data.valid === true && (status === 'active' || status === 'inactive')) {
      return new Response(JSON.stringify({
        valid: true,
        message: 'Licencia valida'
      }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    } else {
      return new Response(JSON.stringify({
        valid: false,
        message: data.error || `Licencia no valida (status: ${status || 'unknown'})`
      }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }
  } catch (error) {
    console.error('Error validating license:', error)
    return new Response(JSON.stringify({ valid: false, error: 'Error al procesar la solicitud' }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
}
