const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '../public/videos');
const FRAMES_DIR = path.join(__dirname, '../temp-frames-ia');
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_6c1dc04e5fe5cb38c2c293cd1be0d3678a3eee82af063c04';

const FPS = 24; // Reduced for disk space

// ============ NARRACIÓN COMPLETA ============
const NARRATION = `
¿Por qué ya no necesitas saber programar para crear software?

La inteligencia artificial ha cambiado las reglas del juego. Déjame explicarte.

Antes, programar requería años de aprendizaje. Tenías que memorizar sintaxis, estudiar múltiples lenguajes, y pasarte horas depurando errores crípticos. Cada línea de código la escribías tú, manualmente.

Ahora, todo es diferente. Con herramientas como Claude Code, tú describes lo que quieres en español, la IA escribe el código por ti, y tú supervisas el resultado. Puedes iterar rápidamente hasta conseguir exactamente lo que buscas.

Piensa en ello así: No necesitas saber construir un coche para conducirlo. Pero sí necesitas saber qué hacen los pedales, el volante, y las señales de tráfico.

Entonces, ¿qué necesitas saber? Son solo cinco conceptos básicos.

Primero, estructura de archivos. Cómo se organizan las carpetas en un proyecto. La IA te preguntará dónde quieres que ponga las cosas.

Segundo, frontend versus backend. Qué parte ve el usuario y qué parte procesa datos. Para saber qué pedir.

Tercero, Git y versiones. Es tu control zeta para proyectos enteros. Puedes volver atrás si algo sale mal.

Cuarto, deploy y producción. Cómo publicar tu app para que otros la usen.

Y quinto, la más importante: saber explicar lo que quieres. Cuanto mejor describas tu idea, mejor código creará la IA.

Todo esto son conceptos, no código. No tienes que memorizar sintaxis ni comandos complicados.

Ahora hablemos de tu nuevo rol. Piensa en Claude Code como un programador muy talentoso que trabaja para ti. Tú eres el director.

Tu trabajo tiene cuatro partes. Primero, defines el objetivo: qué quieres conseguir. Segundo, das contexto: información relevante. Tercero, revisas el trabajo: verificas que funcione. Y cuarto, pides cambios: ajustas hasta que esté perfecto.

Por ejemplo, podrías decir: Crea una página web con un formulario de contacto. Que tenga campos para nombre, email y mensaje. Cuando envíen el formulario, que me llegue un email.

Y Claude Code crea todos los archivos, configura el envío de emails, y te explica qué ha hecho. Así de simple.

Resumen: Ya no necesitas aprender a programar. Solo necesitas entender los conceptos básicos para poder dirigir a la IA. Tú pones las ideas, la IA pone el código.

¡Vamos a empezar!
`;

// ============ TIMING SINCRONIZADO CON AUDIO (166s total) ============
// Narración dividida por secciones con tiempos exactos

const SLIDES = [
  // "¿Por qué ya no necesitas saber programar...? Déjame explicarte."
  {
    type: 'title',
    emoji: '🤖',
    title: '¿Por qué ya no necesitas\nsaber programar?',
    subtitle: 'Programar con Inteligencia Artificial',
    duration: 9  // 0-9s
  },

  // "Antes, programar requería años de aprendizaje..."
  {
    type: 'section',
    number: '1',
    title: 'El gran cambio',
    duration: 4  // 9-13s
  },
  // "...tenías que memorizar sintaxis, estudiar múltiples lenguajes..."
  {
    type: 'comparison',
    side: 'before',
    title: 'ANTES',
    subtitle: 'Programación tradicional',
    items: [
      { emoji: '📚', text: 'Años aprendiendo sintaxis' },
      { emoji: '🧠', text: 'Memorizar funciones y librerías' },
      { emoji: '🐛', text: 'Horas depurando errores' },
      { emoji: '⌨️', text: 'Escribir cada línea manualmente' }
    ],
    duration: 14  // 13-27s
  },

  // "Ahora, todo es diferente. Con herramientas como Claude Code..."
  {
    type: 'comparison',
    side: 'after',
    title: 'AHORA',
    subtitle: 'Programación con IA',
    items: [
      { emoji: '💬', text: 'Describes lo que quieres' },
      { emoji: '🤖', text: 'La IA escribe el código' },
      { emoji: '👀', text: 'Tú supervisas el resultado' },
      { emoji: '🔄', text: 'Iteras hasta conseguirlo' }
    ],
    duration: 14  // 27-41s
  },

  // "Piensa en ello así: No necesitas saber construir un coche..."
  {
    type: 'analogy',
    emoji: '🚗',
    text: 'No necesitas saber construir un coche\npara conducirlo',
    subtext: 'Pero sí necesitas saber qué hacen los pedales,\nel volante, y las señales de tráfico.',
    duration: 11  // 41-52s
  },

  // "Entonces, ¿qué necesitas saber? Son solo cinco conceptos básicos."
  {
    type: 'section',
    number: '2',
    title: 'Lo que SÍ necesitas saber',
    subtitle: '5 conceptos básicos',
    duration: 6  // 52-58s
  },

  // "Primero, estructura de archivos. Cómo se organizan las carpetas..."
  {
    type: 'concept',
    number: '1',
    emoji: '📂',
    title: 'Estructura de archivos',
    description: 'Cómo se organizan las carpetas en un proyecto.\nLa IA te preguntará dónde poner las cosas.',
    duration: 9  // 58-67s
  },

  // "Segundo, frontend versus backend. Qué parte ve el usuario..."
  {
    type: 'concept',
    number: '2',
    emoji: '🌐',
    title: 'Frontend vs Backend',
    description: 'Qué parte ve el usuario (frontend)\ny qué parte procesa datos (backend).',
    duration: 8  // 67-75s
  },

  // "Tercero, Git y versiones. Es tu control zeta para proyectos enteros..."
  {
    type: 'concept',
    number: '3',
    emoji: '🔀',
    title: 'Git y versiones',
    description: 'Tu Ctrl+Z para proyectos enteros.\nPuedes volver atrás si algo sale mal.',
    duration: 8  // 75-83s
  },

  // "Cuarto, deploy y producción. Cómo publicar tu app..."
  {
    type: 'concept',
    number: '4',
    emoji: '🚀',
    title: 'Deploy y producción',
    description: 'Cómo publicar tu app\npara que otros la usen.',
    duration: 6  // 83-89s
  },

  // "Y quinto, la más importante: saber explicar lo que quieres..."
  {
    type: 'concept',
    number: '5',
    emoji: '💬',
    title: 'Saber explicar lo que quieres',
    description: 'Cuanto mejor describas tu idea,\nmejor código creará la IA.',
    highlight: true,
    duration: 9  // 89-98s
  },

  // "Todo esto son conceptos, no código. No tienes que memorizar..."
  {
    type: 'note',
    emoji: '📝',
    text: 'Todo esto son conceptos, no código',
    subtext: 'No tienes que memorizar sintaxis\nni comandos complicados.',
    duration: 7  // 98-105s
  },

  // "Ahora hablemos de tu nuevo rol. Piensa en Claude Code como..."
  {
    type: 'section',
    number: '3',
    title: 'Tu nuevo rol',
    subtitle: 'Director de IA',
    duration: 6  // 105-111s
  },

  // "Tu trabajo tiene cuatro partes. Primero, defines el objetivo..."
  {
    type: 'role',
    title: 'Claude Code es tu programador',
    subtitle: 'Tú eres el director',
    steps: [
      { emoji: '🎯', title: 'Define el objetivo', desc: 'Qué quieres conseguir' },
      { emoji: '📋', title: 'Da contexto', desc: 'Información relevante' },
      { emoji: '👀', title: 'Revisa el trabajo', desc: 'Verifica que funcione' },
      { emoji: '🔄', title: 'Pide cambios', desc: 'Ajusta hasta que esté bien' }
    ],
    duration: 18  // 111-129s
  },

  // "Por ejemplo, podrías decir: Crea una página web..."
  {
    type: 'example',
    duration: 16  // 129-145s
  },

  // "Resumen: Ya no necesitas aprender a programar..."
  {
    type: 'summary',
    title: 'Resumen',
    points: [
      'No necesitas aprender a programar',
      'Solo entender conceptos básicos',
      'Tú pones las ideas',
      'La IA pone el código'
    ],
    duration: 14  // 145-159s
  },

  // "¡Vamos a empezar!"
  {
    type: 'final',
    emoji: '🚀',
    title: '¡Vamos a empezar!',
    subtitle: 'Siguiente: Glosario de términos',
    duration: 7  // 159-166s
  }
];

// ============ GENERADORES DE HTML ============

function generateTitleSlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif;
  }
  .container { text-align: center; padding: 40px; }
  .emoji { font-size: 100px; margin-bottom: 30px; }
  h1 {
    font-size: 52px; font-weight: 800; color: white;
    line-height: 1.2; margin-bottom: 24px; white-space: pre-line;
  }
  .subtitle {
    font-size: 24px; color: rgba(255,255,255,0.6);
    font-weight: 500;
  }
</style></head>
<body>
  <div class="container">
    <div class="emoji">${slide.emoji}</div>
    <h1>${slide.title}</h1>
    <p class="subtitle">${slide.subtitle}</p>
  </div>
</body></html>`;
}

function generateSectionSlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif;
  }
  .container { text-align: center; }
  .number {
    font-size: 120px; font-weight: 800; color: rgba(255,255,255,0.3);
    line-height: 1;
  }
  h2 { font-size: 56px; font-weight: 700; color: white; margin-top: -20px; }
  .subtitle { font-size: 24px; color: rgba(255,255,255,0.8); margin-top: 16px; }
</style></head>
<body>
  <div class="container">
    <div class="number">${slide.number}</div>
    <h2>${slide.title}</h2>
    ${slide.subtitle ? `<p class="subtitle">${slide.subtitle}</p>` : ''}
  </div>
</body></html>`;
}

function generateComparisonSlide(slide) {
  const isBefore = slide.side === 'before';
  const bg = isBefore
    ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
    : 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)';
  const accent = isBefore ? '#ef4444' : '#22c55e';

  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: ${bg};
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif; padding: 60px;
  }
  .card {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(20px);
    border-radius: 24px; padding: 48px; width: 800px;
    border: 2px solid ${accent};
  }
  .badge {
    display: inline-block; padding: 8px 20px;
    background: ${accent}; border-radius: 100px;
    font-size: 14px; font-weight: 700; color: white;
    letter-spacing: 2px; margin-bottom: 16px;
  }
  h3 { font-size: 32px; font-weight: 700; color: white; margin-bottom: 32px; }
  .item {
    display: flex; align-items: center; gap: 16px;
    padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .item:last-child { border-bottom: none; }
  .item-emoji { font-size: 32px; }
  .item-text { font-size: 22px; color: rgba(255,255,255,0.9); }
</style></head>
<body>
  <div class="card">
    <span class="badge">${slide.title}</span>
    <h3>${slide.subtitle}</h3>
    ${slide.items.map(item => `
      <div class="item">
        <span class="item-emoji">${item.emoji}</span>
        <span class="item-text">${item.text}</span>
      </div>
    `).join('')}
  </div>
</body></html>`;
}

function generateAnalogySlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #1a1a2e 0%, #312e81 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif; padding: 60px;
  }
  .container { text-align: center; max-width: 900px; }
  .emoji { font-size: 100px; margin-bottom: 32px; }
  .text {
    font-size: 36px; font-weight: 700; color: white;
    line-height: 1.4; margin-bottom: 24px; white-space: pre-line;
  }
  .subtext {
    font-size: 22px; color: rgba(255,255,255,0.7);
    line-height: 1.6; white-space: pre-line;
  }
</style></head>
<body>
  <div class="container">
    <div class="emoji">${slide.emoji}</div>
    <p class="text">${slide.text}</p>
    <p class="subtext">${slide.subtext}</p>
  </div>
</body></html>`;
}

function generateConceptSlide(slide) {
  const highlight = slide.highlight;
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: ${highlight
      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
      : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'};
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif; padding: 60px;
  }
  .card {
    background: rgba(255,255,255,${highlight ? '0.2' : '0.1'});
    backdrop-filter: blur(20px);
    border-radius: 24px; padding: 48px; width: 800px; text-align: center;
  }
  .number {
    display: inline-flex; align-items: center; justify-content: center;
    width: 60px; height: 60px; border-radius: 50%;
    background: ${highlight ? 'white' : '#6366f1'};
    color: ${highlight ? '#d97706' : 'white'};
    font-size: 28px; font-weight: 800; margin-bottom: 24px;
  }
  .emoji { font-size: 80px; margin-bottom: 24px; }
  h3 { font-size: 36px; font-weight: 700; color: white; margin-bottom: 20px; }
  .desc {
    font-size: 22px; color: rgba(255,255,255,0.85);
    line-height: 1.6; white-space: pre-line;
  }
</style></head>
<body>
  <div class="card">
    <div class="number">${slide.number}</div>
    <div class="emoji">${slide.emoji}</div>
    <h3>${slide.title}</h3>
    <p class="desc">${slide.description}</p>
  </div>
</body></html>`;
}

function generateNoteSlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #1e3a5f 0%, #1a1a2e 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif;
  }
  .card {
    background: rgba(99, 102, 241, 0.2);
    border: 2px solid #6366f1;
    border-radius: 24px; padding: 48px; text-align: center;
    max-width: 700px;
  }
  .emoji { font-size: 64px; margin-bottom: 24px; }
  .text { font-size: 32px; font-weight: 700; color: white; margin-bottom: 20px; }
  .subtext {
    font-size: 20px; color: rgba(255,255,255,0.7);
    line-height: 1.6; white-space: pre-line;
  }
</style></head>
<body>
  <div class="card">
    <div class="emoji">${slide.emoji}</div>
    <p class="text">${slide.text}</p>
    <p class="subtext">${slide.subtext}</p>
  </div>
</body></html>`;
}

function generateRoleSlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #1a1a2e 0%, #0f172a 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif; padding: 40px;
  }
  .container { width: 100%; max-width: 1000px; }
  .header { text-align: center; margin-bottom: 40px; }
  h2 { font-size: 36px; font-weight: 700; color: white; margin-bottom: 8px; }
  .subtitle { font-size: 20px; color: #6366f1; font-weight: 600; }
  .grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .step {
    background: rgba(255,255,255,0.05);
    border-radius: 16px; padding: 28px; text-align: center;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .step-emoji { font-size: 48px; margin-bottom: 16px; }
  .step-title { font-size: 20px; font-weight: 600; color: white; margin-bottom: 8px; }
  .step-desc { font-size: 16px; color: rgba(255,255,255,0.6); }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h2>${slide.title}</h2>
      <p class="subtitle">${slide.subtitle}</p>
    </div>
    <div class="grid">
      ${slide.steps.map(step => `
        <div class="step">
          <div class="step-emoji">${step.emoji}</div>
          <div class="step-title">${step.title}</div>
          <div class="step-desc">${step.desc}</div>
        </div>
      `).join('')}
    </div>
  </div>
</body></html>`;
}

function generateExampleSlide() {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif; padding: 40px;
  }
  .container { width: 100%; max-width: 900px; }
  h3 { font-size: 28px; font-weight: 600; color: white; margin-bottom: 24px; text-align: center; }
  .chat {
    background: rgba(255,255,255,0.05);
    border-radius: 16px; padding: 32px;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .message { margin-bottom: 24px; }
  .message:last-child { margin-bottom: 0; }
  .label { font-size: 14px; font-weight: 600; margin-bottom: 8px; }
  .label.user { color: #6366f1; }
  .label.ai { color: #22c55e; }
  .bubble {
    background: rgba(255,255,255,0.1);
    border-radius: 12px; padding: 16px;
    font-size: 18px; color: rgba(255,255,255,0.9);
    line-height: 1.6;
  }
</style></head>
<body>
  <div class="container">
    <h3>💬 Ejemplo real de cómo trabajarás</h3>
    <div class="chat">
      <div class="message">
        <div class="label user">👤 Tú:</div>
        <div class="bubble">
          "Crea una página web con un formulario de contacto.<br>
          Que tenga campos para nombre, email y mensaje.<br>
          Cuando envíen el formulario, que me llegue un email."
        </div>
      </div>
      <div class="message">
        <div class="label ai">🤖 Claude Code:</div>
        <div class="bubble">
          Crea todos los archivos, configura el envío de emails,<br>
          y te explica qué ha hecho. ✨
        </div>
      </div>
    </div>
  </div>
</body></html>`;
}

function generateSummarySlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #1a1a2e 0%, #312e81 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif; padding: 60px;
  }
  .container { text-align: center; }
  h2 { font-size: 48px; font-weight: 800; color: white; margin-bottom: 40px; }
  .points { display: flex; flex-direction: column; gap: 16px; }
  .point {
    display: flex; align-items: center; gap: 16px;
    background: rgba(255,255,255,0.1);
    padding: 20px 32px; border-radius: 12px;
  }
  .check { color: #22c55e; font-size: 28px; }
  .text { font-size: 24px; color: white; font-weight: 500; }
</style></head>
<body>
  <div class="container">
    <h2>${slide.title}</h2>
    <div class="points">
      ${slide.points.map(p => `
        <div class="point">
          <span class="check">✓</span>
          <span class="text">${p}</span>
        </div>
      `).join('')}
    </div>
  </div>
</body></html>`;
}

function generateFinalSlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif;
  }
  .container { text-align: center; }
  .emoji { font-size: 120px; margin-bottom: 32px; }
  h1 { font-size: 64px; font-weight: 800; color: white; margin-bottom: 20px; }
  .subtitle { font-size: 24px; color: rgba(255,255,255,0.8); }
</style></head>
<body>
  <div class="container">
    <div class="emoji">${slide.emoji}</div>
    <h1>${slide.title}</h1>
    <p class="subtitle">${slide.subtitle}</p>
  </div>
</body></html>`;
}

function getSlideHTML(slide) {
  switch(slide.type) {
    case 'title': return generateTitleSlide(slide);
    case 'section': return generateSectionSlide(slide);
    case 'comparison': return generateComparisonSlide(slide);
    case 'analogy': return generateAnalogySlide(slide);
    case 'concept': return generateConceptSlide(slide);
    case 'note': return generateNoteSlide(slide);
    case 'role': return generateRoleSlide(slide);
    case 'example': return generateExampleSlide();
    case 'summary': return generateSummarySlide(slide);
    case 'final': return generateFinalSlide(slide);
    default: return '';
  }
}

// ============ MAIN ============

async function generateAudio() {
  console.log('🎙️ Generando narración con ElevenLabs...');

  const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb', {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
      text: NARRATION,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.3 }
    })
  });

  if (!response.ok) throw new Error(`ElevenLabs error: ${response.status}`);

  const buffer = await response.arrayBuffer();
  const audioPath = path.join(OUTPUT_DIR, 'programar-ia-narration.mp3');
  fs.writeFileSync(audioPath, Buffer.from(buffer));
  console.log('   ✓ Audio generado');
  return audioPath;
}

async function generateFrames() {
  console.log('🎬 Generando frames...');

  if (!fs.existsSync(FRAMES_DIR)) fs.mkdirSync(FRAMES_DIR, { recursive: true });
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });

  let frameIndex = 0;
  const totalSlides = SLIDES.length;

  for (let i = 0; i < SLIDES.length; i++) {
    const slide = SLIDES[i];
    const html = getSlideHTML(slide);
    await page.setContent(html);
    await page.waitForTimeout(100);

    const frameCount = Math.floor(slide.duration * FPS);
    console.log(`   ${i+1}/${totalSlides} ${slide.type} (${slide.duration}s)...`);

    for (let f = 0; f < frameCount; f++) {
      const framePath = path.join(FRAMES_DIR, `frame_${String(frameIndex).padStart(5, '0')}.png`);
      await page.screenshot({ path: framePath });
      frameIndex++;
    }
  }

  await browser.close();
  const totalDuration = frameIndex / FPS;
  console.log(`   ✓ Total: ${frameIndex} frames (${totalDuration.toFixed(1)}s)`);
  return frameIndex;
}

async function createVideo(audioPath) {
  console.log('🎥 Creando video...');
  const videoPath = path.join(OUTPUT_DIR, 'programar-con-ia.mp4');
  const cmd = `ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame_%05d.png" -i "${audioPath}" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "${videoPath}"`;
  execSync(cmd, { stdio: 'pipe' });
  console.log('   ✓ Video creado: programar-con-ia.mp4');
}

async function cleanup() {
  if (fs.existsSync(FRAMES_DIR)) {
    fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  }
}

async function main() {
  console.log('🎬 Creando video: Programar con IA\n');
  try {
    // Usar audio existente si ya existe
    const audioPath = path.join(OUTPUT_DIR, 'programar-ia-narration.mp3');
    if (fs.existsSync(audioPath)) {
      console.log('🎙️ Usando audio existente...');
    } else {
      await generateAudio();
    }
    await generateFrames();
    await createVideo(audioPath);
    await cleanup();
    console.log('\n✅ Video creado: public/videos/programar-con-ia.mp4');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await cleanup();
    process.exit(1);
  }
}

main();
