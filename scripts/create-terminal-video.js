const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '../public/videos');
const FRAMES_DIR = path.join(__dirname, '../temp-frames');
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_6c1dc04e5fe5cb38c2c293cd1be0d3678a3eee82af063c04';

// Spanish narration - mejor estructurada para el timing
const NARRATION_SCRIPT = `
Vamos a verificar que tienes todo instalado correctamente.

Abre tu terminal. En Mac pulsa Comando más Espacio, escribe Terminal, y pulsa Enter.

Ahora escribe node guión guión version y pulsa Enter.

Perfecto. Ves que tenemos Node versión 20 punto 11 instalada.

Ahora escribe npm guión guión version.

Bien, npm versión 10 punto 2 también está listo.

Finalmente, escribe claude y pulsa Enter.

Excelente. Ya tienes Claude Code funcionando. Estás listo para empezar a programar con inteligencia artificial.
`;

const FPS = 30;
const TYPING_SPEED = 80; // ms per character

// Definimos los comandos y sus tiempos de aparición
const TERMINAL_SCRIPT = [
  { type: 'wait', duration: 2000 },
  { type: 'type', text: 'node --version', postDelay: 500 },
  { type: 'output', text: 'v20.11.0', delay: 300 },
  { type: 'wait', duration: 2500 },
  { type: 'type', text: 'npm --version', postDelay: 500 },
  { type: 'output', text: '10.2.4', delay: 300 },
  { type: 'wait', duration: 2500 },
  { type: 'type', text: 'claude', postDelay: 500 },
  { type: 'claude-welcome', delay: 500 },
  { type: 'wait', duration: 4000 },
];

async function generateAudio() {
  console.log('🎙️ Generando audio con ElevenLabs...');

  const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/pFZP5JQG7iQjIQuC4Bku', {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
      text: NARRATION_SCRIPT,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.6,
        similarity_boost: 0.8,
        style: 0.3,
        use_speaker_boost: true
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ElevenLabs API error: ${response.status} - ${error}`);
  }

  const audioBuffer = await response.arrayBuffer();
  const audioPath = path.join(OUTPUT_DIR, 'terminal-narration.mp3');
  fs.writeFileSync(audioPath, Buffer.from(audioBuffer));
  console.log('   ✓ Audio generado: terminal-narration.mp3');
  return audioPath;
}

function generateTerminalHTML(lines, cursorVisible = true) {
  const linesHtml = lines.map(line => {
    if (line.type === 'prompt') {
      return `<div class="line"><span class="prompt">➜</span> <span class="path">~/proyectos</span> <span class="typed">${line.text || ''}</span>${cursorVisible && line.cursor ? '<span class="cursor">▊</span>' : ''}</div>`;
    } else if (line.type === 'output') {
      return `<div class="line output">${line.text}</div>`;
    } else if (line.type === 'claude') {
      return `<div class="line claude">${line.text}</div>`;
    }
    return '';
  }).join('\n          ');

  return `<!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 60px;
      font-family: 'JetBrains Mono', 'SF Mono', 'Monaco', monospace;
    }
    .terminal {
      background: rgba(22, 33, 62, 0.95);
      border-radius: 16px;
      width: 900px;
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.1),
        0 25px 80px rgba(0,0,0,0.5),
        0 0 100px rgba(99, 102, 241, 0.1);
      overflow: hidden;
    }
    .terminal-header {
      background: linear-gradient(180deg, #2d3a5a 0%, #1f2b47 100%);
      padding: 14px 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .dot.red { background: linear-gradient(180deg, #ff6b6b 0%, #ee5a5a 100%); }
    .dot.yellow { background: linear-gradient(180deg, #feca57 0%, #f5b942 100%); }
    .dot.green { background: linear-gradient(180deg, #5fd068 0%, #4ac054 100%); }
    .terminal-title {
      color: rgba(255,255,255,0.5);
      margin-left: 20px;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    .terminal-body {
      padding: 28px 24px;
      font-size: 15px;
      line-height: 1.9;
      min-height: 320px;
    }
    .line {
      white-space: pre;
    }
    .prompt {
      color: #5fd068;
      font-weight: 600;
    }
    .path {
      color: #60a5fa;
      font-weight: 500;
    }
    .typed {
      color: #f0f0f0;
    }
    .output {
      color: #94a3b8;
      padding-left: 0;
    }
    .claude {
      color: #f59e0b;
      font-weight: 500;
    }
    .cursor {
      background: #60a5fa;
      color: transparent;
      margin-left: 2px;
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  </style>
</head>
<body>
  <div class="terminal">
    <div class="terminal-header">
      <div class="dot red"></div>
      <div class="dot yellow"></div>
      <div class="dot green"></div>
      <span class="terminal-title">Terminal — zsh — 80×24</span>
    </div>
    <div class="terminal-body">
      ${linesHtml}
    </div>
  </div>
</body>
</html>`;
}

async function generateFrames() {
  console.log('🎬 Generando frames del terminal con animación...');

  if (!fs.existsSync(FRAMES_DIR)) fs.mkdirSync(FRAMES_DIR, { recursive: true });
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });

  let frameIndex = 0;
  let lines = [{ type: 'prompt', text: '', cursor: true }];

  async function captureFrame() {
    const html = generateTerminalHTML(lines);
    await page.setContent(html);
    await page.waitForTimeout(16);
    const framePath = path.join(FRAMES_DIR, `frame_${String(frameIndex).padStart(5, '0')}.png`);
    await page.screenshot({ path: framePath });
    frameIndex++;
  }

  async function captureFrames(count) {
    for (let i = 0; i < count; i++) {
      await captureFrame();
    }
  }

  async function typeText(text) {
    const currentLine = lines[lines.length - 1];
    for (let i = 0; i < text.length; i++) {
      currentLine.text = text.substring(0, i + 1);
      // Capturar 2-3 frames por carácter para que se vea fluido
      await captureFrames(Math.floor(TYPING_SPEED / (1000 / FPS)));
    }
  }

  console.log('   Generando animación...');

  // Inicio - espera con cursor parpadeante
  await captureFrames(FPS * 2); // 2 segundos

  // Comando 1: node --version
  await typeText('node --version');
  await captureFrames(FPS * 0.5); // pausa después de escribir

  // Quitar cursor de la línea actual y añadir output
  lines[lines.length - 1].cursor = false;
  lines.push({ type: 'output', text: 'v20.11.0' });
  lines.push({ type: 'prompt', text: '', cursor: true });
  await captureFrames(FPS * 3); // 3 segundos para ver el resultado

  // Comando 2: npm --version
  await typeText('npm --version');
  await captureFrames(FPS * 0.5);

  lines[lines.length - 1].cursor = false;
  lines.push({ type: 'output', text: '10.2.4' });
  lines.push({ type: 'prompt', text: '', cursor: true });
  await captureFrames(FPS * 3);

  // Comando 3: claude
  await typeText('claude');
  await captureFrames(FPS * 0.5);

  lines[lines.length - 1].cursor = false;
  lines.push({ type: 'claude', text: '╭─────────────────────────────────────────────╮' });
  await captureFrames(FPS * 0.3);
  lines.push({ type: 'claude', text: '│                                             │' });
  await captureFrames(FPS * 0.2);
  lines.push({ type: 'claude', text: '│   ✨ Welcome to Claude Code! v1.0.0        │' });
  await captureFrames(FPS * 0.2);
  lines.push({ type: 'claude', text: '│                                             │' });
  await captureFrames(FPS * 0.2);
  lines.push({ type: 'claude', text: '│   Tu asistente de programación con IA      │' });
  await captureFrames(FPS * 0.2);
  lines.push({ type: 'claude', text: '│                                             │' });
  await captureFrames(FPS * 0.2);
  lines.push({ type: 'claude', text: '╰─────────────────────────────────────────────╯' });
  await captureFrames(FPS * 0.3);

  lines.push({ type: 'prompt', text: '', cursor: true });
  await captureFrames(FPS * 5); // 5 segundos finales

  await browser.close();
  console.log(`   ✓ Total: ${frameIndex} frames generados`);
  return frameIndex;
}

async function createVideo(audioPath) {
  console.log('🎥 Creando video con ffmpeg...');

  const videoPath = path.join(OUTPUT_DIR, 'terminal-tutorial.mp4');

  // Crear video de alta calidad
  const cmd = `ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame_%05d.png" -i "${audioPath}" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "${videoPath}"`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log('   ✓ Video creado: terminal-tutorial.mp4');
    return videoPath;
  } catch (error) {
    console.error('Error creando video:', error.message);
    throw error;
  }
}

async function cleanup() {
  if (fs.existsSync(FRAMES_DIR)) {
    fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
    console.log('🧹 Frames temporales eliminados');
  }
}

async function main() {
  console.log('🎬 Creando video tutorial del terminal (versión mejorada)\n');

  try {
    const audioPath = await generateAudio();
    await generateFrames();
    await createVideo(audioPath);
    await cleanup();

    console.log('\n✅ Video tutorial creado exitosamente!');
    console.log(`📁 Ubicación: ${path.join(OUTPUT_DIR, 'terminal-tutorial.mp4')}`);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await cleanup();
    process.exit(1);
  }
}

main();
