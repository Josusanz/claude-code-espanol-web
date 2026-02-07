const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '../public/videos');
const FRAMES_DIR = path.join(__dirname, '../temp-frames');
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_6c1dc04e5fe5cb38c2c293cd1be0d3678a3eee82af063c04';

// Spanish narration script
const NARRATION_SCRIPT = `
Vamos a ver cómo abrir el terminal y verificar que tienes todo instalado.
Primero, abre tu terminal. En Mac, pulsa Comando más Espacio y escribe Terminal.
Ahora vamos a verificar que Node está instalado. Escribe node guión guión version.
Perfecto, tenemos Node versión 20 instalada.
Ahora verificamos npm. Escribe npm guión guión version.
Excelente, npm también está listo.
Finalmente, iniciamos Claude Code escribiendo claude.
¡Y ya estás listo para empezar a programar con inteligencia artificial!
`;

// Terminal frames - each step of the animation
const TERMINAL_STEPS = [
  { // Initial state
    lines: [
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> <span class="cursor">▊</span>'
    ],
    duration: 2
  },
  { // Typing node --version
    lines: [
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> node --version<span class="cursor">▊</span>'
    ],
    duration: 1.5
  },
  { // Node version result
    lines: [
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> node --version',
      '<span class="output">v20.11.0</span>',
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> <span class="cursor">▊</span>'
    ],
    duration: 2
  },
  { // Typing npm --version
    lines: [
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> node --version',
      '<span class="output">v20.11.0</span>',
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> npm --version<span class="cursor">▊</span>'
    ],
    duration: 1.5
  },
  { // npm version result
    lines: [
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> node --version',
      '<span class="output">v20.11.0</span>',
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> npm --version',
      '<span class="output">10.2.4</span>',
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> <span class="cursor">▊</span>'
    ],
    duration: 2
  },
  { // Typing claude
    lines: [
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> node --version',
      '<span class="output">v20.11.0</span>',
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> npm --version',
      '<span class="output">10.2.4</span>',
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> claude<span class="cursor">▊</span>'
    ],
    duration: 1.5
  },
  { // Claude welcome
    lines: [
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> node --version',
      '<span class="output">v20.11.0</span>',
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> npm --version',
      '<span class="output">10.2.4</span>',
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> claude',
      '<span class="claude">╭─────────────────────────────────────╮</span>',
      '<span class="claude">│  Welcome to Claude Code! 🤖        │</span>',
      '<span class="claude">╰─────────────────────────────────────╯</span>',
      '<span class="prompt">➜</span> <span class="path">~/proyectos</span> <span class="cursor">▊</span>'
    ],
    duration: 3
  }
];

async function generateAudio() {
  console.log('🎙️ Generando audio con ElevenLabs...');

  const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL', {
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
        stability: 0.5,
        similarity_boost: 0.75
      }
    })
  });

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.status} ${await response.text()}`);
  }

  const audioBuffer = await response.arrayBuffer();
  const audioPath = path.join(OUTPUT_DIR, 'terminal-narration.mp3');
  fs.writeFileSync(audioPath, Buffer.from(audioBuffer));
  console.log('   ✓ Audio generado: terminal-narration.mp3');
  return audioPath;
}

function generateTerminalHTML(step) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: #1a1a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 40px;
          font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', monospace;
        }
        .terminal {
          background: #16213e;
          border-radius: 12px;
          width: 800px;
          box-shadow: 0 25px 80px rgba(0,0,0,0.5);
          overflow: hidden;
        }
        .terminal-header {
          background: #1f4068;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .dot.red { background: #ff5f57; }
        .dot.yellow { background: #febc2e; }
        .dot.green { background: #28c840; }
        .terminal-title {
          color: #94a3b8;
          margin-left: 16px;
          font-size: 13px;
        }
        .terminal-body {
          padding: 24px;
          font-size: 15px;
          line-height: 1.8;
        }
        .prompt { color: #22c55e; }
        .path { color: #60a5fa; }
        .output { color: #94a3b8; }
        .claude { color: #f59e0b; }
        .cursor {
          background: #60a5fa;
          color: #60a5fa;
          animation: blink 1s infinite;
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
          <span class="terminal-title">Terminal — zsh</span>
        </div>
        <div class="terminal-body">
          ${step.lines.map(line => `<div>${line}</div>`).join('\n          ')}
        </div>
      </div>
    </body>
    </html>
  `;
}

async function generateFrames() {
  console.log('🎬 Generando frames del terminal...');

  // Create directories
  if (!fs.existsSync(FRAMES_DIR)) fs.mkdirSync(FRAMES_DIR, { recursive: true });
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });

  let frameIndex = 0;
  const FPS = 30;

  for (let i = 0; i < TERMINAL_STEPS.length; i++) {
    const step = TERMINAL_STEPS[i];
    const html = generateTerminalHTML(step);
    await page.setContent(html);
    await page.waitForTimeout(100);

    // Generate frames for this step's duration
    const framesForStep = Math.floor(step.duration * FPS);
    for (let f = 0; f < framesForStep; f++) {
      const framePath = path.join(FRAMES_DIR, `frame_${String(frameIndex).padStart(5, '0')}.png`);
      await page.screenshot({ path: framePath });
      frameIndex++;
    }
    console.log(`   ✓ Step ${i + 1}/${TERMINAL_STEPS.length}: ${framesForStep} frames`);
  }

  await browser.close();
  console.log(`   Total: ${frameIndex} frames generados`);
  return frameIndex;
}

async function createVideo(audioPath, totalFrames) {
  console.log('🎥 Creando video con ffmpeg...');

  const videoPath = path.join(OUTPUT_DIR, 'terminal-tutorial.mp4');

  // Combine frames into video with audio
  const cmd = `ffmpeg -y -framerate 30 -i "${FRAMES_DIR}/frame_%05d.png" -i "${audioPath}" -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest "${videoPath}"`;

  try {
    execSync(cmd, { stdio: 'inherit' });
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
  console.log('🎬 Creando video tutorial del terminal\n');

  try {
    // Generate audio first
    const audioPath = await generateAudio();

    // Generate video frames
    await generateFrames();

    // Create final video
    await createVideo(audioPath, 0);

    // Cleanup
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
