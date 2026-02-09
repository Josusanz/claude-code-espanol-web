/**
 * Script para configurar el servidor de Discord del curso
 * Ejecutar con: DISCORD_BOT_TOKEN=xxx npx ts-node scripts/setup-discord-server.ts
 */

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

if (!DISCORD_BOT_TOKEN) {
  console.error('Error: DISCORD_BOT_TOKEN is required')
  process.exit(1)
}

const API_BASE = 'https://discord.com/api/v10'

async function api(endpoint: string, method = 'GET', body?: object) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`API Error ${res.status}: ${error}`)
  }

  return res.json()
}

// Channel types
const ChannelType = {
  TEXT: 0,
  VOICE: 2,
  CATEGORY: 4,
  ANNOUNCEMENT: 5,
  FORUM: 15,
}

interface Role {
  id: string
  name: string
}

interface Channel {
  id: string
  name: string
  type: number
}

async function setupServer() {
  console.log('🔍 Buscando servidores del bot...')

  // Get guilds the bot is in
  const guilds = await api('/users/@me/guilds')
  console.log('Servidores encontrados:')
  guilds.forEach((g: { id: string; name: string }) => {
    console.log(`  - ${g.name} (ID: ${g.id})`)
  })

  // Find "aprende.software" server
  const guild = guilds.find((g: { name: string }) =>
    g.name.toLowerCase().includes('aprende') ||
    g.name.toLowerCase().includes('software')
  )

  if (!guild) {
    console.error('❌ No se encontró el servidor "aprende.software"')
    console.log('Servidores disponibles:', guilds.map((g: { name: string }) => g.name))
    process.exit(1)
  }

  const GUILD_ID = guild.id
  console.log(`\n✅ Servidor encontrado: ${guild.name} (${GUILD_ID})`)

  // Get existing roles
  console.log('\n📋 Obteniendo roles existentes...')
  const existingRoles: Role[] = await api(`/guilds/${GUILD_ID}/roles`)
  console.log('Roles existentes:', existingRoles.map(r => r.name).join(', '))

  // Create roles if they don't exist
  const rolesToCreate = [
    { name: 'Instructor', color: 0x6366F1, hoist: true, permissions: '8' }, // Admin
    { name: 'Alumno', color: 0x22C55E, hoist: true, permissions: '1024' }, // View channels
    { name: 'Invitado', color: 0x94A3B8, hoist: false, permissions: '1024' },
  ]

  const createdRoles: Record<string, string> = {}

  for (const role of rolesToCreate) {
    const existing = existingRoles.find(r => r.name === role.name)
    if (existing) {
      console.log(`  ✓ Rol "${role.name}" ya existe (${existing.id})`)
      createdRoles[role.name] = existing.id
    } else {
      console.log(`  → Creando rol "${role.name}"...`)
      const newRole = await api(`/guilds/${GUILD_ID}/roles`, 'POST', role)
      createdRoles[role.name] = newRole.id
      console.log(`  ✓ Rol "${role.name}" creado (${newRole.id})`)
    }
  }

  // Get existing channels
  console.log('\n📋 Obteniendo canales existentes...')
  const existingChannels: Channel[] = await api(`/guilds/${GUILD_ID}/channels`)
  console.log('Canales existentes:', existingChannels.map(c => c.name).join(', '))

  // Define channel structure
  const channelStructure = [
    // BIENVENIDA
    {
      name: '👋 BIENVENIDA',
      type: ChannelType.CATEGORY,
      children: [
        { name: '📢-anuncios', type: ChannelType.ANNOUNCEMENT },
        { name: '📖-reglas', type: ChannelType.TEXT },
        { name: '🎉-presentaciones', type: ChannelType.TEXT },
      ]
    },
    // CURSO
    {
      name: '🚀 CURSO',
      type: ChannelType.CATEGORY,
      children: [
        { name: '💬-general', type: ChannelType.TEXT },
        { name: '❓-dudas', type: ChannelType.TEXT },
        { name: '🏆-logros', type: ChannelType.TEXT },
        { name: '📸-capturas', type: ChannelType.TEXT },
      ]
    },
    // SEMANAS
    {
      name: '📅 SEMANAS',
      type: ChannelType.CATEGORY,
      children: [
        { name: 'semana-1', type: ChannelType.TEXT },
        { name: 'semana-2', type: ChannelType.TEXT },
        { name: 'semana-3', type: ChannelType.TEXT },
        { name: 'semana-4', type: ChannelType.TEXT },
        { name: 'semana-5', type: ChannelType.TEXT },
        { name: 'semana-6', type: ChannelType.TEXT },
        { name: 'semana-7', type: ChannelType.TEXT },
        { name: 'semana-8', type: ChannelType.TEXT },
        { name: 'semana-9', type: ChannelType.TEXT },
        { name: 'semana-10', type: ChannelType.TEXT },
      ]
    },
    // VOICE
    {
      name: '🎙️ VOZ',
      type: ChannelType.CATEGORY,
      children: [
        { name: '📞 Clase en vivo', type: ChannelType.VOICE },
        { name: '☕ Café virtual', type: ChannelType.VOICE },
        { name: '👥 Coworking', type: ChannelType.VOICE },
      ]
    },
    // RECURSOS
    {
      name: '📚 RECURSOS',
      type: ChannelType.CATEGORY,
      children: [
        { name: '🔗-links-utiles', type: ChannelType.TEXT },
        { name: '📁-archivos', type: ChannelType.TEXT },
        { name: '💡-tips', type: ChannelType.TEXT },
      ]
    },
  ]

  // Create channels
  console.log('\n📁 Creando estructura de canales...')

  let position = 0
  for (const category of channelStructure) {
    // Check if category exists
    let categoryChannel = existingChannels.find(c =>
      c.name === category.name && c.type === ChannelType.CATEGORY
    )

    if (!categoryChannel) {
      console.log(`  → Creando categoría "${category.name}"...`)
      categoryChannel = await api(`/guilds/${GUILD_ID}/channels`, 'POST', {
        name: category.name,
        type: ChannelType.CATEGORY,
        position: position++,
      })
      console.log(`  ✓ Categoría "${category.name}" creada`)
    } else {
      console.log(`  ✓ Categoría "${category.name}" ya existe`)
    }

    // Create children
    if (category.children) {
      for (const child of category.children) {
        const existing = existingChannels.find(c =>
          c.name === child.name && c.type === child.type
        )

        if (!existing) {
          console.log(`    → Creando canal "${child.name}"...`)
          await api(`/guilds/${GUILD_ID}/channels`, 'POST', {
            name: child.name,
            type: child.type,
            parent_id: categoryChannel.id,
            permission_overwrites: [
              // Hide from @everyone, show for Alumno
              {
                id: GUILD_ID, // @everyone role has same ID as guild
                type: 0, // role
                deny: '1024', // VIEW_CHANNEL
              },
              {
                id: createdRoles['Alumno'],
                type: 0,
                allow: '1024', // VIEW_CHANNEL
              },
              {
                id: createdRoles['Instructor'],
                type: 0,
                allow: '8', // ADMINISTRATOR
              },
            ],
          })
          console.log(`    ✓ Canal "${child.name}" creado`)
        } else {
          console.log(`    ✓ Canal "${child.name}" ya existe`)
        }
      }
    }
  }

  // Create verification channel (visible to everyone)
  console.log('\n🔐 Configurando canal de verificación...')
  const verifyChannel = existingChannels.find(c => c.name === '✅-verificar')
  if (!verifyChannel) {
    await api(`/guilds/${GUILD_ID}/channels`, 'POST', {
      name: '✅-verificar',
      type: ChannelType.TEXT,
      position: 0,
      topic: 'Usa /verificar email@ejemplo.com para acceder al curso',
      permission_overwrites: [
        {
          id: GUILD_ID,
          type: 0,
          allow: '2048', // SEND_MESSAGES
        },
      ],
    })
    console.log('  ✓ Canal de verificación creado')
  } else {
    console.log('  ✓ Canal de verificación ya existe')
  }

  console.log('\n✅ ¡Servidor configurado!')
  console.log('\n📋 RESUMEN:')
  console.log(`  Guild ID: ${GUILD_ID}`)
  console.log(`  Rol Alumno ID: ${createdRoles['Alumno']}`)
  console.log(`  Rol Instructor ID: ${createdRoles['Instructor']}`)
  console.log('\n⚠️  Añade estas variables a Vercel:')
  console.log(`  DISCORD_GUILD_ID=${GUILD_ID}`)
  console.log(`  DISCORD_ALUMNO_ROLE_ID=${createdRoles['Alumno']}`)
}

setupServer().catch(console.error)
