const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '../public/videos');
const FRAMES_DIR = path.join(__dirname, '../temp-frames');
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_6c1dc04e5fe5cb38c2c293cd1be0d3678a3eee82af063c04';

// Spanish narration - sincronizada con las pantallas
const NARRATION_SCRIPT = `
Primero, vamos a abrir el terminal en tu sistema operativo.

Si usas Mac, pulsa Comando más Espacio para abrir Spotlight, escribe Terminal, y pulsa Enter.

Si usas Windows, pulsa la tecla Windows más R, escribe cmd o powershell, y pulsa Enter.

Si usas Linux, simplemente pulsa Control más Alt más T.

Ahora que tienes el terminal abierto, vamos a verificar que todo está instalado.

Escribe node guión guión version y pulsa Enter.

Perfecto. Tenemos Node versión 20 instalada.

Ahora escribe npm guión guión version.

Bien, npm también está listo.

Finalmente, escribe claude y pulsa Enter.

Excelente. Claude Code está funcionando. Ya estás listo para programar con inteligencia artificial.
`;

const FPS = 30;
const TYPING_SPEED = 80;

// Función para generar HTML de instrucciones de OS
function generateOSInstructionHTML(os, steps, tip, emoji) {
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
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: ${bgColors[os]};
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 60px;
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 48px;
      width: 800px;
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 0 25px 80px rgba(0,0,0,0.3);
    }
    .header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 36px;
    }
    .emoji {
      font-size: 64px;
    }
    .title {
      color: white;
      font-size: 42px;
      font-weight: 700;
    }
    .steps {
      margin-bottom: 32px;
    }
    .step {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
      color: rgba(255,255,255,0.9);
      font-size: 22px;
    }
    .step-number {
      width: 36px;
      height: 36px;
      background: ${accentColors[os]};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18px;
      color: white;
    }
    .key {
      background: rgba(255,255,255,0.2);
      padding: 6px 14px;
      border-radius: 8px;
      font-weight: 600;
      border: 1px solid rgba(255,255,255,0.3);
    }
    .tip {
      background: rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 16px 20px;
      color: rgba(255,255,255,0.7);
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .tip-icon {
      font-size: 20px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="emoji">${emoji}</span>
      <h1 class="title">${os === 'mac' ? 'macOS' : os === 'windows' ? 'Windows' : 'Linux'}</h1>
    </div>
    <div class="steps">
      ${steps.map((step, i) => `
        <div class="step">
          <div class="step-number">${i + 1}</div>
          <div>${step}</div>
        </div>
      `).join('')}
    </div>
    ${tip ? `
    <div class="tip">
      <span class="tip-icon">💡</span>
      <span>${tip}</span>
    </div>
    ` : ''}
  </div>
</body>
</html>`;
}

// Función para generar HTML del terminal
function generateTerminalHTML(lines) {
  const linesHtml = lines.map(line => {
    if (line.type === 'prompt') {
      return `<div class="line"><span class="prompt">➜</span> <span class="path">~/proyectos</span> <span class="typed">${line.text || ''}</span>${line.cursor ? '<span class="cursor">▊</span>' : ''}</div>`;
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
    .dot { width: 14px; height: 14px; border-radius: 50%; }
    .dot.red { background: linear-gradient(180deg, #ff6b6b 0%, #ee5a5a 100%); }
    .dot.yellow { background: linear-gradient(180deg, #feca57 0%, #f5b942 100%); }
    .dot.green { background: linear-gradient(180deg, #5fd068 0%, #4ac054 100%); }
    .terminal-title {
      color: rgba(255,255,255,0.5);
      margin-left: 20px;
      font-size: 13px;
    }
    .terminal-body {
      padding: 28px 24px;
      font-size: 15px;
      line-height: 1.9;
      min-height: 320px;
    }
    .line { white-space: pre; }
    .prompt { color: #5fd068; font-weight: 600; }
    .path { color: #60a5fa; font-weight: 500; }
    .typed { color: #f0f0f0; }
    .output { color: #94a3b8; }
    .claude { color: #f59e0b; font-weight: 500; }
    .cursor {
      background: #60a5fa;
      color: transparent;
      margin-left: 2px;
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
      ${linesHtml}
    </div>
  </div>
</body>
</html>`;
}

async function generateAudio() {
  console.log('🎙️ Generando audio con ElevenLabs...');

  // Usar voz masculina "George" (narrador cálido) con modelo multilingüe para español natural
  const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb', {
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
        similarity_boost: 0.75,
        style: 0.4,
        use_speaker_boost: true
      }
    })
  });

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.status}`);
  }

  const audioBuffer = await response.arrayBuffer();
  const audioPath = path.join(OUTPUT_DIR, 'terminal-narration.mp3');
  fs.writeFileSync(audioPath, Buffer.from(audioBuffer));
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

  async function captureFrame(html) {
    await page.setContent(html);
    await page.waitForTimeout(20);
    const framePath = path.join(FRAMES_DIR, `frame_${String(frameIndex).padStart(5, '0')}.png`);
    await page.screenshot({ path: framePath });
    frameIndex++;
  }

  async function captureFrames(html, seconds) {
    const count = Math.floor(seconds * FPS);
    for (let i = 0; i < count; i++) {
      await captureFrame(html);
    }
  }

  // === SECCIÓN 1: Instrucciones de OS ===
  console.log('   1/4 Instrucciones macOS...');
  const macHTML = generateOSInstructionHTML('mac', [
    'Pulsa <span class="key">⌘ Cmd</span> + <span class="key">Espacio</span>',
    'Escribe <span class="key">Terminal</span>',
    'Pulsa <span class="key">Enter</span>'
  ], 'También: Aplicaciones → Utilidades → Terminal', '🍎');
  await captureFrames(macHTML, 5);

  console.log('   2/4 Instrucciones Windows...');
  const windowsHTML = generateOSInstructionHTML('windows', [
    'Pulsa <span class="key">⊞ Win</span> + <span class="key">R</span>',
    'Escribe <span class="key">cmd</span> o <span class="key">powershell</span>',
    'Pulsa <span class="key">Enter</span>'
  ], 'Alternativa: Click derecho en menú inicio → Terminal', '🪟');
  await captureFrames(windowsHTML, 5);

  console.log('   3/4 Instrucciones Linux...');
  const linuxHTML = generateOSInstructionHTML('linux', [
    'Pulsa <span class="key">Ctrl</span> + <span class="key">Alt</span> + <span class="key">T</span>',
    '¡Listo! Funciona en Ubuntu, Debian y la mayoría de distros'
  ], null, '🐧');
  await captureFrames(linuxHTML, 4);

  // === SECCIÓN 2: Terminal con comandos ===
  console.log('   4/4 Animación terminal...');

  let lines = [{ type: 'prompt', text: '', cursor: true }];

  async function typeText(text) {
    const currentLine = lines[lines.length - 1];
    for (let i = 0; i < text.length; i++) {
      currentLine.text = text.substring(0, i + 1);
      await captureFrame(generateTerminalHTML(lines));
      await captureFrame(generateTerminalHTML(lines)); // 2 frames por caracter
    }
  }

  // Espera inicial
  await captureFrames(generateTerminalHTML(lines), 2);

  // node --version
  await typeText('node --version');
  await captureFrames(generateTerminalHTML(lines), 0.5);
  lines[lines.length - 1].cursor = false;
  lines.push({ type: 'output', text: 'v20.11.0' });
  lines.push({ type: 'prompt', text: '', cursor: true });
  await captureFrames(generateTerminalHTML(lines), 3);

  // npm --version
  await typeText('npm --version');
  await captureFrames(generateTerminalHTML(lines), 0.5);
  lines[lines.length - 1].cursor = false;
  lines.push({ type: 'output', text: '10.2.4' });
  lines.push({ type: 'prompt', text: '', cursor: true });
  await captureFrames(generateTerminalHTML(lines), 3);

  // claude
  await typeText('claude');
  await captureFrames(generateTerminalHTML(lines), 0.5);
  lines[lines.length - 1].cursor = false;

  // Claude welcome animation
  const claudeLines = [
    '╭─────────────────────────────────────────────╮',
    '│                                             │',
    '│   ✨ Welcome to Claude Code! v1.0.0        │',
    '│                                             │',
    '│   Tu asistente de programación con IA      │',
    '│                                             │',
    '╰─────────────────────────────────────────────╯'
  ];

  for (const claudeLine of claudeLines) {
    lines.push({ type: 'claude', text: claudeLine });
    await captureFrames(generateTerminalHTML(lines), 0.2);
  }

  lines.push({ type: 'prompt', text: '', cursor: true });
  await captureFrames(generateTerminalHTML(lines), 4);

  await browser.close();
  console.log(`   ✓ Total: ${frameIndex} frames`);
  return frameIndex;
}

async function createVideo(audioPath) {
  console.log('🎥 Creando video...');
  const videoPath = path.join(OUTPUT_DIR, 'terminal-tutorial.mp4');
  const cmd = `ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame_%05d.png" -i "${audioPath}" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "${videoPath}"`;
  execSync(cmd, { stdio: 'pipe' });
  console.log('   ✓ Video creado');
  return videoPath;
}

async function cleanup() {
  if (fs.existsSync(FRAMES_DIR)) {
    fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  }
}

async function main() {
  console.log('🎬 Creando video tutorial completo\n');
  try {
    const audioPath = await generateAudio();
    await generateFrames();
    await createVideo(audioPath);
    await cleanup();
    console.log('\n✅ Video creado: public/videos/terminal-tutorial.mp4');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await cleanup();
    process.exit(1);
  }
}

main();
