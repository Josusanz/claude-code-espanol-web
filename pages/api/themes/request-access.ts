import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { githubUsername } = req.body

  if (!githubUsername || typeof githubUsername !== 'string') {
    return res.status(400).json({ error: 'Falta el usuario de GitHub' })
  }

  const username = githubUsername.trim().replace(/^@/, '')

  if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(username)) {
    return res.status(400).json({ error: 'Usuario de GitHub no válido' })
  }

  const pat = process.env.GITHUB_PAT
  if (!pat) {
    return res.status(500).json({ error: 'Configuración del servidor incompleta' })
  }

  try {
    // Add user as collaborator with read-only (pull) permission
    const response = await fetch(
      `https://api.github.com/repos/Josusanz/aprende-themes/collaborators/${username}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${pat}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({ permission: 'pull' }),
      }
    )

    if (response.status === 201) {
      // Invitation created
      return res.status(200).json({ success: true, status: 'invited' })
    }

    if (response.status === 204) {
      // User already has access
      return res.status(200).json({ success: true, status: 'already_collaborator' })
    }

    if (response.status === 404) {
      return res.status(400).json({ error: `El usuario "${username}" no existe en GitHub` })
    }

    const data = await response.json().catch(() => ({}))

    // Log para diagnosticar errores de la API de GitHub
    console.error('[themes/request-access] GitHub API error:', {
      status: response.status,
      message: data.message,
      errors: data.errors,
      username,
    })

    if (response.status === 422) {
      // "Validation Failed" — puede ser PAT sin permisos, invitación duplicada, etc.
      const detail = data.errors?.[0]?.message || ''
      if (detail.toLowerCase().includes('already')) {
        return res.status(200).json({ success: true, status: 'invited' })
      }
      return res.status(400).json({
        error: 'No se pudo enviar la invitación. Comprueba que tu usuario de GitHub es correcto y que tu cuenta puede recibir invitaciones.',
      })
    }

    if (response.status === 403) {
      return res.status(500).json({
        error: 'Error de permisos del servidor. Contacta al administrador.',
      })
    }

    return res.status(response.status).json({
      error: data.message || 'Error al añadir colaborador',
    })
  } catch {
    return res.status(500).json({ error: 'Error de conexión con GitHub' })
  }
}
