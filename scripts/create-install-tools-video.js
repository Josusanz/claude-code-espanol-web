const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '../public/videos');
const FRAMES_DIR = path.join(__dirname, '../temp-frames-install');
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_3bcd0c1913c8865dc04b37fd2d9e9b4a0800d2bcc74ae4a8';

const FPS = 24;

// ============ NARRACIÓN ============
const NARRATION = `
Ahora vamos a instalar las herramientas necesarias: Node.js y Claude Code.

Primero, Node.js. Es el motor que ejecuta JavaScript fuera del navegador.

Para instalarlo, ve a nodejs.org, descarga la versión LTS que es la más estable, y sigue el instalador. En Mac y Windows es siguiente, siguiente, finalizar.

Para verificar que está instalado, abre el terminal y escribe node guión guión version. Deberías ver algo como v20 punto algo.

También verifica npm escribiendo npm guión guión version. npm viene incluido con Node.

Ahora, Claude Code. Necesitas una suscripción de Claude Pro que cuesta 20 dólares al mes, o Claude Max por 100 dólares.

Una vez tengas la suscripción, instala Claude Code con el comando npm install guión g at anthropic slash claude code.

Para verificar, escribe claude y pulsa Enter. Verás el mensaje de bienvenida de Claude Code.

¡Excelente! Ya tienes todo instalado. Estás listo para empezar a programar con inteligencia artificial.
`;

// ============ SLIDES (72s total synced with audio) ============
const SLIDES = [
  {
    type: 'title',
    emoji: '🔧',
    title: 'Instalar herramientas',
    subtitle: 'Node.js y Claude Code',
    duration: 7  // 0-7s
  },
  // NODE.JS
  {
    type: 'section',
    emoji: '📦',
    title: 'Node.js',
    subtitle: 'El motor de JavaScript',
    duration: 5  // 7-12s
  },
  {
    type: 'install',
    tool: 'nodejs',
    emoji: '🌐',
    title: 'Descargar Node.js',
    steps: [
      'Ve a <span class="highlight">nodejs.org</span>',
      'Descarga la versión <span class="highlight">LTS</span> (recomendada)',
      'Ejecuta el instalador: Siguiente → Siguiente → Finalizar'
    ],
    note: 'LTS = Long Term Support, la versión más estable',
    duration: 12  // 12-24s
  },
  {
    type: 'terminal',
    title: 'Verificar Node.js',
    command: 'node --version',
    output: 'v20.11.0',
    explanation: 'Si ves un número de versión, Node está instalado',
    duration: 8  // 24-32s
  },
  {
    type: 'terminal',
    title: 'Verificar npm',
    command: 'npm --version',
    output: '10.2.4',
    explanation: 'npm viene incluido con Node.js',
    duration: 5  // 32-37s
  },
  // CLAUDE CODE
  {
    type: 'section',
    emoji: '🤖',
    title: 'Claude Code',
    subtitle: 'Tu asistente de programación',
    duration: 5  // 37-42s
  },
  {
    type: 'subscription',
    emoji: '💳',
    title: 'Suscripción requerida',
    options: [
      { name: 'Claude Pro', price: '$20/mes', recommended: true },
      { name: 'Claude Max', price: '$100/mes', recommended: false }
    ],
    note: 'Necesitas una suscripción activa para usar Claude Code',
    duration: 9  // 42-51s
  },
  {
    type: 'terminal',
    title: 'Instalar Claude Code',
    command: 'npm install -g @anthropic-ai/claude-code',
    output: '+ @anthropic-ai/claude-code@1.0.0',
    explanation: 'Este comando instala Claude Code globalmente',
    duration: 9  // 51-60s
  },
  {
    type: 'terminal',
    title: 'Verificar Claude Code',
    command: 'claude',
    output: '✨ Welcome to Claude Code!',
    explanation: 'Si ves este mensaje, ¡todo está listo!',
    duration: 6  // 60-66s
  },
  {
    type: 'final',
    emoji: '🎉',
    title: '¡Todo instalado!',
    subtitle: 'Estás listo para programar con IA',
    duration: 6  // 66-72s
  }
];

// ============ HTML GENERATORS ============

function generateTitleSlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif;
  }
  .container { text-align: center; }
  .emoji { font-size: 100px; margin-bottom: 30px; }
  h1 { font-size: 56px; font-weight: 800; color: white; margin-bottom: 20px; }
  .subtitle { font-size: 28px; color: rgba(255,255,255,0.7); }
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
  .emoji { font-size: 80px; margin-bottom: 20px; }
  h2 { font-size: 56px; font-weight: 800; color: white; margin-bottom: 12px; }
  .subtitle { font-size: 24px; color: rgba(255,255,255,0.85); }
</style></head>
<body>
  <div class="container">
    <div class="emoji">${slide.emoji}</div>
    <h2>${slide.title}</h2>
    <p class="subtitle">${slide.subtitle}</p>
  </div>
</body></html>`;
}

function generateInstallSlide(slide) {
  const isNode = slide.tool === 'nodejs';
  const bg = isNode
    ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
    : 'linear-gradient(135deg, #d97706 0%, #b45309 100%)';

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
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(20px);
    border-radius: 24px; padding: 48px; width: 850px;
  }
  .header { display: flex; align-items: center; gap: 20px; margin-bottom: 32px; }
  .emoji { font-size: 56px; }
  h3 { font-size: 36px; font-weight: 700; color: white; }
  .step {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 20px; font-size: 22px; color: white;
  }
  .step-num {
    width: 40px; height: 40px; background: rgba(255,255,255,0.3);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-weight: 700;
  }
  .highlight {
    background: rgba(255,255,255,0.25); padding: 4px 12px;
    border-radius: 6px; font-weight: 600;
  }
  .note {
    margin-top: 24px; padding: 16px 20px;
    background: rgba(0,0,0,0.2); border-radius: 12px;
    color: rgba(255,255,255,0.85); font-size: 16px;
    display: flex; align-items: center; gap: 12px;
  }
</style></head>
<body>
  <div class="card">
    <div class="header">
      <span class="emoji">${slide.emoji}</span>
      <h3>${slide.title}</h3>
    </div>
    ${slide.steps.map((step, i) => `
      <div class="step">
        <div class="step-num">${i+1}</div>
        <div>${step}</div>
      </div>
    `).join('')}
    ${slide.note ? `<div class="note"><span>💡</span>${slide.note}</div>` : ''}
  </div>
</body></html>`;
}

function generateTerminalSlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #1a1a2e 0%, #0f172a 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif; padding: 60px;
  }
  .container { width: 900px; }
  h3 { font-size: 28px; font-weight: 600; color: white; margin-bottom: 24px; text-align: center; }
  .terminal {
    background: #1e293b;
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 25px 80px rgba(0,0,0,0.5);
  }
  .terminal-header {
    background: #334155; padding: 12px 16px;
    display: flex; gap: 8px;
  }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .dot.r { background: #ef4444; }
  .dot.y { background: #eab308; }
  .dot.g { background: #22c55e; }
  .terminal-body {
    padding: 24px; font-family: 'JetBrains Mono', monospace; font-size: 18px;
  }
  .prompt { color: #22c55e; }
  .command { color: #f8fafc; }
  .output { color: #60a5fa; margin-top: 8px; }
  .explanation {
    margin-top: 24px; padding: 16px 20px;
    background: rgba(99, 102, 241, 0.2);
    border-radius: 12px; color: rgba(255,255,255,0.9);
    font-size: 18px; text-align: center;
    border-left: 4px solid #6366f1;
  }
</style></head>
<body>
  <div class="container">
    <h3>${slide.title}</h3>
    <div class="terminal">
      <div class="terminal-header">
        <div class="dot r"></div>
        <div class="dot y"></div>
        <div class="dot g"></div>
      </div>
      <div class="terminal-body">
        <div><span class="prompt">➜</span> <span class="command">${slide.command}</span></div>
        <div class="output">${slide.output}</div>
      </div>
    </div>
    <div class="explanation">${slide.explanation}</div>
  </div>
</body></html>`;
}

function generateSubscriptionSlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif; padding: 60px;
  }
  .container { text-align: center; }
  .emoji { font-size: 80px; margin-bottom: 20px; }
  h3 { font-size: 40px; font-weight: 700; color: white; margin-bottom: 32px; }
  .options { display: flex; gap: 24px; justify-content: center; margin-bottom: 32px; }
  .option {
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    border-radius: 20px; padding: 32px 48px;
    border: 2px solid rgba(255,255,255,0.2);
  }
  .option.recommended {
    border-color: #fbbf24;
    background: rgba(251, 191, 36, 0.2);
  }
  .option-name { font-size: 24px; font-weight: 600; color: white; margin-bottom: 8px; }
  .option-price { font-size: 36px; font-weight: 800; color: #fbbf24; }
  .badge {
    display: inline-block; background: #fbbf24; color: #1a1a2e;
    padding: 4px 12px; border-radius: 20px; font-size: 12px;
    font-weight: 700; margin-bottom: 12px;
  }
  .note {
    padding: 16px 24px; background: rgba(0,0,0,0.2);
    border-radius: 12px; color: rgba(255,255,255,0.85);
    font-size: 18px; display: inline-flex; align-items: center; gap: 10px;
  }
</style></head>
<body>
  <div class="container">
    <div class="emoji">${slide.emoji}</div>
    <h3>${slide.title}</h3>
    <div class="options">
      ${slide.options.map(opt => `
        <div class="option ${opt.recommended ? 'recommended' : ''}">
          ${opt.recommended ? '<span class="badge">RECOMENDADO</span>' : ''}
          <div class="option-name">${opt.name}</div>
          <div class="option-price">${opt.price}</div>
        </div>
      `).join('')}
    </div>
    <div class="note"><span>⚠️</span>${slide.note}</div>
  </div>
</body></html>`;
}

function generateFinalSlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif;
  }
  .container { text-align: center; }
  .emoji { font-size: 120px; margin-bottom: 24px; }
  h1 { font-size: 56px; font-weight: 800; color: white; margin-bottom: 16px; }
  .subtitle { font-size: 28px; color: rgba(255,255,255,0.9); }
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
    case 'install': return generateInstallSlide(slide);
    case 'terminal': return generateTerminalSlide(slide);
    case 'subscription': return generateSubscriptionSlide(slide);
    case 'final': return generateFinalSlide(slide);
    default: return '';
  }
}

// ============ MAIN ============

async function generateAudio() {
  console.log('🎙️ Generando narración...');
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
  const audioPath = path.join(OUTPUT_DIR, 'install-tools-narration.mp3');
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
  for (let i = 0; i < SLIDES.length; i++) {
    const slide = SLIDES[i];
    const html = getSlideHTML(slide);
    await page.setContent(html);
    await page.waitForTimeout(100);
    const frameCount = Math.floor(slide.duration * FPS);
    console.log(`   ${i+1}/${SLIDES.length} ${slide.type} (${slide.duration}s)...`);
    for (let f = 0; f < frameCount; f++) {
      await page.screenshot({ path: path.join(FRAMES_DIR, `frame_${String(frameIndex).padStart(5, '0')}.png`) });
      frameIndex++;
    }
  }
  await browser.close();
  console.log(`   ✓ Total: ${frameIndex} frames (${(frameIndex/FPS).toFixed(1)}s)`);
  return frameIndex;
}

async function createVideo(audioPath) {
  console.log('🎥 Creando video...');
  const videoPath = path.join(OUTPUT_DIR, 'instalar-herramientas.mp4');
  execSync(`ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame_%05d.png" -i "${audioPath}" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "${videoPath}"`, { stdio: 'pipe' });
  console.log('   ✓ Video: instalar-herramientas.mp4');
}

async function cleanup() {
  if (fs.existsSync(FRAMES_DIR)) fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
}

async function main() {
  console.log('🎬 Video 2: Instalar Node.js y Claude Code\n');
  try {
    const audioPath = path.join(OUTPUT_DIR, 'install-tools-narration.mp3');
    if (fs.existsSync(audioPath)) {
      console.log('🎙️ Usando audio existente...');
    } else {
      await generateAudio();
    }
    await generateFrames();
    await createVideo(audioPath);
    await cleanup();
    console.log('\n✅ Video creado: public/videos/instalar-herramientas.mp4');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await cleanup();
    process.exit(1);
  }
}

main();
