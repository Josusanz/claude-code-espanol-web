/**
 * Script para registrar los comandos de Discord
 * Ejecutar con: npx ts-node scripts/register-discord-commands.ts
 *
 * O usando las variables directamente:
 * DISCORD_APP_ID=xxx DISCORD_BOT_TOKEN=xxx npx ts-node scripts/register-discord-commands.ts
 */

const DISCORD_APP_ID = process.env.DISCORD_APP_ID || '1470468387544236104'
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

if (!DISCORD_BOT_TOKEN) {
  console.error('Error: DISCORD_BOT_TOKEN is required')
  console.log('Usage: DISCORD_BOT_TOKEN=xxx npx ts-node scripts/register-discord-commands.ts')
  process.exit(1)
}

const commands = [
  {
    name: 'verificar',
    description: 'Verifica tu email para acceder al curso',
    options: [
      {
        name: 'email',
        description: 'Tu email registrado en el curso',
        type: 3, // STRING
        required: true,
      },
    ],
  },
  {
    name: 'info',
    description: 'Información sobre el curso',
  },
]

async function registerCommands() {
  const url = `https://discord.com/api/v10/applications/${DISCORD_APP_ID}/commands`

  console.log('Registering Discord commands...')
  console.log('URL:', url)

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commands),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Error registering commands:', response.status, error)
      process.exit(1)
    }

    const data = await response.json()
    console.log('Commands registered successfully!')
    console.log('Registered commands:', data.map((c: { name: string }) => c.name).join(', '))
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

registerCommands()
