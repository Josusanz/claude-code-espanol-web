const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '../public/videos');
const FRAMES_DIR = path.join(__dirname, '../temp-frames-terminal1');
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_3bcd0c1913c8865dc04b37fd2d9e9b4a0800d2bcc74ae4a8';

const FPS = 24;

// ============ NARRACIÓN ============
const NARRATION = `
Vamos a aprender a abrir el terminal en tu sistema operativo.

El terminal es donde escribirás comandos para hablar con tu computadora y con Claude Code.

Si usas Mac, pulsa Comando más Espacio para abrir Spotlight. Luego escribe Terminal y pulsa Enter.

Si usas Windows, pulsa la tecla Windows más R para abrir Ejecutar. Escribe cmd o powershell y pulsa Enter.

Si usas Linux, simplemente pulsa Control más Alt más T. Es el atajo universal en la mayoría de distribuciones.

¡Perfecto! Ya sabes cómo abrir el terminal. En el siguiente video veremos cómo instalar las herramientas necesarias.
`;

// ============ SLIDES ============
const SLIDES = [
  {
    type: 'title',
    emoji: '🖥️',
    title: 'Cómo abrir el Terminal',
    subtitle: 'Paso 1: Acceder a la línea de comandos',
    duration: 7
  },
  {
    type: 'intro',
    emoji: '💬',
    text: 'El terminal es donde escribirás comandos\npara hablar con tu computadora',
    subtext: 'y con Claude Code',
    duration: 6
  },
  {
    type: 'os',
    os: 'mac',
    emoji: '🍎',
    title: 'macOS',
    steps: [
      'Pulsa <span class="key">⌘ Cmd</span> + <span class="key">Espacio</span>',
      'Escribe <span class="key">Terminal</span>',
      'Pulsa <span class="key">Enter</span>'
    ],
    tip: 'También: Aplicaciones → Utilidades → Terminal',
    duration: 9
  },
  {
    type: 'os',
    os: 'windows',
    emoji: '🪟',
    title: 'Windows',
    steps: [
      'Pulsa <span class="key">⊞ Win</span> + <span class="key">R</span>',
      'Escribe <span class="key">cmd</span> o <span class="key">powershell</span>',
      'Pulsa <span class="key">Enter</span>'
    ],
    tip: 'Alternativa: Click derecho en menú inicio → Terminal',
    duration: 9
  },
  {
    type: 'os',
    os: 'linux',
    emoji: '🐧',
    title: 'Linux',
    steps: [
      'Pulsa <span class="key">Ctrl</span> + <span class="key">Alt</span> + <span class="key">T</span>',
      '¡Listo! Funciona en Ubuntu, Debian, Fedora y más'
    ],
    tip: 'El atajo universal en la mayoría de distribuciones',
    duration: 7
  },
  {
    type: 'final',
    emoji: '✅',
    title: '¡Listo!',
    subtitle: 'Siguiente: Instalar Node.js y Claude',
    duration: 5
  }
];

// ============ HTML GENERATORS ============

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
  h1 { font-size: 56px; font-weight: 800; color: white; margin-bottom: 20px; }
  .subtitle { font-size: 24px; color: rgba(255,255,255,0.7); }
</style></head>
<body>
  <div class="container">
    <div class="emoji">${slide.emoji}</div>
    <h1>${slide.title}</h1>
    <p class="subtitle">${slide.subtitle}</p>
  </div>
</body></html>`;
}

function generateIntroSlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #312e81 0%, #1e1b4b 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif; padding: 60px;
  }
  .container { text-align: center; max-width: 800px; }
  .emoji { font-size: 80px; margin-bottom: 24px; }
  .text { font-size: 36px; font-weight: 600; color: white; line-height: 1.4; white-space: pre-line; margin-bottom: 16px; }
  .subtext { font-size: 28px; color: #a5b4fc; }
</style></head>
<body>
  <div class="container">
    <div class="emoji">${slide.emoji}</div>
    <p class="text">${slide.text}</p>
    <p class="subtext">${slide.subtext}</p>
  </div>
</body></html>`;
}

function generateOSSlide(slide) {
  const bgColors = {
    mac: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 100%)',
    windows: 'linear-gradient(135deg, #0078d4 0%, #005a9e 100%)',
    linux: 'linear-gradient(135deg, #2e1a47 0%, #1a1a2e 100%)'
  };
  const accentColors = {
    mac: '#a855f7',
    windows: '#00bcf2',
    linux: '#f59e0b'
  };

  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: ${bgColors[slide.os]};
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif; padding: 60px;
  }
  .card {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(20px);
    border-radius: 24px; padding: 48px; width: 800px;
    border: 1px solid rgba(255,255,255,0.2);
  }
  .header { display: flex; align-items: center; gap: 20px; margin-bottom: 36px; }
  .emoji { font-size: 64px; }
  .title { color: white; font-size: 42px; font-weight: 700; }
  .step {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 20px; color: rgba(255,255,255,0.9); font-size: 22px;
  }
  .step-number {
    width: 40px; height: 40px; background: ${accentColors[slide.os]};
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 20px; color: white; flex-shrink: 0;
  }
  .key {
    background: rgba(255,255,255,0.2); padding: 8px 16px;
    border-radius: 8px; font-weight: 600;
    border: 1px solid rgba(255,255,255,0.3);
  }
  .tip {
    background: rgba(255,255,255,0.1); border-radius: 12px;
    padding: 16px 20px; color: rgba(255,255,255,0.7);
    font-size: 16px; margin-top: 24px;
    display: flex; align-items: center; gap: 12px;
  }
</style></head>
<body>
  <div class="card">
    <div class="header">
      <span class="emoji">${slide.emoji}</span>
      <h1 class="title">${slide.title}</h1>
    </div>
    <div class="steps">
      ${slide.steps.map((step, i) => `
        <div class="step">
          <div class="step-number">${i + 1}</div>
          <div>${step}</div>
        </div>
      `).join('')}
    </div>
    ${slide.tip ? `<div class="tip"><span>💡</span><span>${slide.tip}</span></div>` : ''}
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
  .emoji { font-size: 100px; margin-bottom: 24px; }
  h1 { font-size: 56px; font-weight: 800; color: white; margin-bottom: 16px; }
  .subtitle { font-size: 24px; color: rgba(255,255,255,0.9); }
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
    case 'intro': return generateIntroSlide(slide);
    case 'os': return generateOSSlide(slide);
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
  const audioPath = path.join(OUTPUT_DIR, 'open-terminal-narration.mp3');
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
  const videoPath = path.join(OUTPUT_DIR, 'abrir-terminal.mp4');
  execSync(`ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame_%05d.png" -i "${audioPath}" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "${videoPath}"`, { stdio: 'pipe' });
  console.log('   ✓ Video: abrir-terminal.mp4');
}

async function cleanup() {
  if (fs.existsSync(FRAMES_DIR)) fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
}

async function main() {
  console.log('🎬 Video 1: Cómo abrir el terminal\n');
  try {
    const audioPath = await generateAudio();
    await generateFrames();
    await createVideo(audioPath);
    await cleanup();
    console.log('\n✅ Video creado: public/videos/abrir-terminal.mp4');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await cleanup();
    process.exit(1);
  }
}

main();
