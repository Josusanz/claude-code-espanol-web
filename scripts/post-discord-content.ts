/**
 * Script para publicar contenido inicial en Discord
 * Ejecutar con: DISCORD_BOT_TOKEN=xxx npx ts-node scripts/post-discord-content.ts
 */

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const GUILD_ID = '1470467868150857852'

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

async function findChannel(name: string) {
  const channels = await api(`/guilds/${GUILD_ID}/channels`)
  return channels.find((c: { name: string }) => c.name === name)
}

async function postMessage(channelId: string, content: string) {
  return api(`/channels/${channelId}/messages`, 'POST', { content })
}

async function postEmbed(channelId: string, embed: object) {
  return api(`/channels/${channelId}/messages`, 'POST', { embeds: [embed] })
}

const REGLAS = `# 📜 Reglas del Servidor

Bienvenido al servidor de **Crea tu Software con IA**. Para mantener una comunidad positiva y productiva, sigue estas reglas:

## 🤝 Respeto
- Trata a todos con respeto y amabilidad
- No se tolera acoso, discriminación o lenguaje ofensivo
- Las críticas deben ser constructivas

## 💬 Comunicación
- Usa el canal apropiado para cada tema
- Evita spam o mensajes repetitivos
- No compartas contenido inapropiado o ilegal

## 📚 Contenido del Curso
- No compartas el contenido del curso fuera de este servidor
- Respeta la propiedad intelectual
- Puedes compartir tu código y proyectos con otros alumnos

## 🔐 Privacidad
- No compartas información personal de otros
- Respeta la privacidad de todos los miembros
- No hagas capturas sin permiso en las llamadas

## 🚀 Participación
- ¡Participa! Pregunta, comparte y ayuda a otros
- Celebra los logros de tus compañeros
- Comparte tu progreso en #🏆-logros

---

**El incumplimiento de estas reglas puede resultar en advertencia o expulsión.**

¿Dudas? Contacta a @Josu Sanz`

const BIENVENIDA = `# 👋 ¡Bienvenido al curso!

## 🚀 Crea tu Software con IA
**Primera Promoción - 10 semanas de transformación**

### 📅 Información
- **Inicio:** 19 febrero 2026
- **Duración:** 10 semanas
- **Formato:** Clases en vivo + contenido + comunidad

### 🔐 Primeros pasos

1️⃣ **Verifica tu email**
   Ve a #✅-verificar y escribe:
   \`/verificar email:tu@email.com\`

2️⃣ **Preséntate**
   Cuéntanos en #🎉-presentaciones:
   - ¿Cómo te llamas?
   - ¿De dónde eres?
   - ¿Qué proyecto quieres crear?

3️⃣ **Explora los canales**
   - 💬-general → Conversación libre
   - ❓-dudas → Preguntas del curso
   - 📅-semanas → Contenido por semana

### 🔗 Enlaces útiles
- 📚 Plataforma: https://www.aprende.software/curso
- 🎯 Rueda del Creador: https://www.aprende.software/curso/rueda

---

**¿Listo para crear tu software? ¡Vamos! 🚀**`

const VERIFICAR_INFO = `# ✅ Verificación de Alumnos

Para acceder a todos los canales del curso, necesitas verificar tu email.

## Cómo verificar

Escribe el siguiente comando con el email que usaste al registrarte:

\`\`\`
/verificar email:tu@email.com
\`\`\`

## ¿Problemas?

- Asegúrate de usar el mismo email con el que te registraste
- Si cambiaste de email, contacta a @Josu Sanz
- Si sigues teniendo problemas, escribe aquí y te ayudamos

---

Una vez verificado, tendrás acceso a todos los canales del curso. 🎉`

async function main() {
  console.log('📝 Publicando contenido en Discord...\n')

  // Post rules
  const reglasChannel = await findChannel('📖-reglas')
  if (reglasChannel) {
    console.log('→ Publicando reglas...')
    await postMessage(reglasChannel.id, REGLAS)
    console.log('✓ Reglas publicadas')
  } else {
    console.log('✗ Canal de reglas no encontrado')
  }

  // Post welcome in anuncios
  const anunciosChannel = await findChannel('📢-anuncios')
  if (anunciosChannel) {
    console.log('→ Publicando bienvenida...')
    await postMessage(anunciosChannel.id, BIENVENIDA)
    console.log('✓ Bienvenida publicada')
  } else {
    console.log('✗ Canal de anuncios no encontrado')
  }

  // Post verification info
  const verificarChannel = await findChannel('✅-verificar')
  if (verificarChannel) {
    console.log('→ Publicando info de verificación...')
    await postMessage(verificarChannel.id, VERIFICAR_INFO)
    console.log('✓ Info de verificación publicada')
  } else {
    console.log('✗ Canal de verificación no encontrado')
  }

  console.log('\n✅ ¡Contenido publicado!')
}

main().catch(console.error)
