const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '../public/videos');
const FRAMES_DIR = path.join(__dirname, '../temp-frames');
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_6c1dc04e5fe5cb38c2c293cd1be0d3678a3eee82af063c04';

// Narración sincronizada con tiempos específicos
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

// TIEMPOS SINCRONIZADOS CON EL AUDIO (en segundos)
// Audio total: ~51 segundos
const TIMING = {
  intro: 3,           // "Primero, vamos a abrir el terminal..."
  macOS: 7,           // "Si usas Mac..."
  windows: 7,         // "Si usas Windows..."
  linux: 5,           // "Si usas Linux..."
  transition: 5,      // "Ahora que tienes el terminal abierto..."
  typeNode: 2,        // Escribiendo "node --version"
  nodeResult: 5,      // "Escribe node..." + "Perfecto..."
  typeNpm: 2,         // Escribiendo "npm --version"
  npmResult: 4,       // "Ahora escribe npm..." + "Bien..."
  typeClaude: 2,      // Escribiendo "claude"
  claudeResult: 9,    // "Finalmente..." + "Excelente..."
};

const FPS = 30;

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
    .emoji { font-size: 64px; }
    .title { color: white; font-size: 42px; font-weight: 700; }
    .steps { margin-bottom: 32px; }
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
      flex-shrink: 0;
    }
    .key {
      background: rgba(255,255,255,0.2);
      padding: 6px 14px;
      border-radius: 8px;
      font-weight: 600;
      border: 1px solid rgba(255,255,255,0.3);
      white-space: nowrap;
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
    ${tip ? `<div class="tip"><span>💡</span><span>${tip}</span></div>` : ''}
  </div>
</body>
</html>`;
}

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
  }).join('\n');

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
      font-family: 'JetBrains Mono', monospace;
    }
    .terminal {
      background: rgba(22, 33, 62, 0.95);
      border-radius: 16px;
      width: 900px;
      box-shadow: 0 25px 80px rgba(0,0,0,0.5);
      overflow: hidden;
    }
    .terminal-header {
      background: linear-gradient(180deg, #2d3a5a 0%, #1f2b47 100%);
      padding: 14px 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .dot { width: 14px; height: 14px; border-radius: 50%; }
    .dot.red { background: #ff6b6b; }
    .dot.yellow { background: #feca57; }
    .dot.green { background: #5fd068; }
    .terminal-title { color: rgba(255,255,255,0.5); margin-left: 20px; font-size: 13px; }
    .terminal-body { padding: 28px 24px; font-size: 15px; line-height: 1.9; min-height: 320px; }
    .line { white-space: pre; }
    .prompt { color: #5fd068; font-weight: 600; }
    .path { color: #60a5fa; }
    .typed { color: #f0f0f0; }
    .output { color: #94a3b8; }
    .claude { color: #f59e0b; }
    .cursor { background: #60a5fa; color: transparent; }
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
    <div class="terminal-body">${linesHtml}</div>
  </div>
</body>
</html>`;
}

function generateIntroHTML() {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: 'Inter', sans-serif;
    }
    .container {
      text-align: center;
    }
    h1 {
      color: white;
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    p {
      color: rgba(255,255,255,0.7);
      font-size: 24px;
    }
    .emoji {
      font-size: 80px;
      margin-bottom: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="emoji">🖥️</div>
    <h1>Cómo abrir el Terminal</h1>
    <p>Según tu sistema operativo</p>
  </div>
</body>
</html>`;
}

async function generateAudio() {
  console.log('🎙️ Generando audio...');

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
    throw new Error(`ElevenLabs error: ${response.status}`);
  }

  const audioBuffer = await response.arrayBuffer();
  const audioPath = path.join(OUTPUT_DIR, 'terminal-narration.mp3');
  fs.writeFileSync(audioPath, Buffer.from(audioBuffer));
  console.log('   ✓ Audio generado');
  return audioPath;
}

async function generateFrames() {
  console.log('🎬 Generando frames sincronizados...');

  if (!fs.existsSync(FRAMES_DIR)) fs.mkdirSync(FRAMES_DIR, { recursive: true });
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });

  let frameIndex = 0;

  async function captureFrames(html, seconds) {
    await page.setContent(html);
    await page.waitForTimeout(50);
    const count = Math.floor(seconds * FPS);
    for (let i = 0; i < count; i++) {
      const framePath = path.join(FRAMES_DIR, `frame_${String(frameIndex).padStart(5, '0')}.png`);
      await page.screenshot({ path: framePath });
      frameIndex++;
    }
    return count;
  }

  // === INTRO: "Primero, vamos a abrir el terminal..." ===
  console.log('   1/7 Intro...');
  await captureFrames(generateIntroHTML(), TIMING.intro);

  // === macOS: "Si usas Mac..." ===
  console.log('   2/7 macOS...');
  const macHTML = generateOSInstructionHTML('mac', [
    'Pulsa <span class="key">⌘ Cmd</span> + <span class="key">Espacio</span>',
    'Escribe <span class="key">Terminal</span>',
    'Pulsa <span class="key">Enter</span>'
  ], 'También: Aplicaciones → Utilidades → Terminal', '🍎');
  await captureFrames(macHTML, TIMING.macOS);

  // === Windows: "Si usas Windows..." ===
  console.log('   3/7 Windows...');
  const windowsHTML = generateOSInstructionHTML('windows', [
    'Pulsa <span class="key">⊞ Win</span> + <span class="key">R</span>',
    'Escribe <span class="key">cmd</span> o <span class="key">powershell</span>',
    'Pulsa <span class="key">Enter</span>'
  ], 'Alternativa: Click derecho en menú inicio → Terminal', '🪟');
  await captureFrames(windowsHTML, TIMING.windows);

  // === Linux: "Si usas Linux..." ===
  console.log('   4/7 Linux...');
  const linuxHTML = generateOSInstructionHTML('linux', [
    'Pulsa <span class="key">Ctrl</span> + <span class="key">Alt</span> + <span class="key">T</span>',
    '¡Listo! Funciona en Ubuntu, Debian y más'
  ], null, '🐧');
  await captureFrames(linuxHTML, TIMING.linux);

  // === TERMINAL ===
  console.log('   5/7 Terminal (transición)...');
  let lines = [{ type: 'prompt', text: '', cursor: true }];

  // Transición: "Ahora que tienes el terminal abierto..."
  await captureFrames(generateTerminalHTML(lines), TIMING.transition);

  // === node --version ===
  console.log('   6/7 Comandos node/npm...');

  // Escribir "node --version" durante TIMING.typeNode segundos
  const nodeCmd = 'node --version';
  const framesPerChar = Math.floor((TIMING.typeNode * FPS) / nodeCmd.length);
  for (let i = 0; i < nodeCmd.length; i++) {
    lines[lines.length - 1].text = nodeCmd.substring(0, i + 1);
    await captureFrames(generateTerminalHTML(lines), framesPerChar / FPS);
  }

  // Mostrar resultado: "Escribe node..." + "Perfecto..."
  lines[lines.length - 1].cursor = false;
  lines.push({ type: 'output', text: 'v20.11.0' });
  lines.push({ type: 'prompt', text: '', cursor: true });
  await captureFrames(generateTerminalHTML(lines), TIMING.nodeResult);

  // Escribir "npm --version"
  const npmCmd = 'npm --version';
  const framesPerCharNpm = Math.floor((TIMING.typeNpm * FPS) / npmCmd.length);
  for (let i = 0; i < npmCmd.length; i++) {
    lines[lines.length - 1].text = npmCmd.substring(0, i + 1);
    await captureFrames(generateTerminalHTML(lines), framesPerCharNpm / FPS);
  }

  // Mostrar resultado npm
  lines[lines.length - 1].cursor = false;
  lines.push({ type: 'output', text: '10.2.4' });
  lines.push({ type: 'prompt', text: '', cursor: true });
  await captureFrames(generateTerminalHTML(lines), TIMING.npmResult);

  // === claude ===
  console.log('   7/7 Comando claude...');

  const claudeCmd = 'claude';
  const framesPerCharClaude = Math.floor((TIMING.typeClaude * FPS) / claudeCmd.length);
  for (let i = 0; i < claudeCmd.length; i++) {
    lines[lines.length - 1].text = claudeCmd.substring(0, i + 1);
    await captureFrames(generateTerminalHTML(lines), framesPerCharClaude / FPS);
  }

  // Claude welcome
  lines[lines.length - 1].cursor = false;
  const claudeWelcome = [
    '╭─────────────────────────────────────────────╮',
    '│                                             │',
    '│   ✨ Welcome to Claude Code! v1.0.0        │',
    '│                                             │',
    '│   Tu asistente de programación con IA      │',
    '│                                             │',
    '╰─────────────────────────────────────────────╯'
  ];

  for (const line of claudeWelcome) {
    lines.push({ type: 'claude', text: line });
  }
  lines.push({ type: 'prompt', text: '', cursor: true });

  await captureFrames(generateTerminalHTML(lines), TIMING.claudeResult);

  await browser.close();
  console.log(`   ✓ Total: ${frameIndex} frames (${(frameIndex/FPS).toFixed(1)}s)`);
  return frameIndex;
}

async function createVideo(audioPath) {
  console.log('🎥 Creando video...');
  const videoPath = path.join(OUTPUT_DIR, 'terminal-tutorial.mp4');
  const cmd = `ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame_%05d.png" -i "${audioPath}" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "${videoPath}"`;
  execSync(cmd, { stdio: 'pipe' });
  console.log('   ✓ Video creado');
}

async function cleanup() {
  if (fs.existsSync(FRAMES_DIR)) {
    fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  }
}

async function main() {
  console.log('🎬 Creando video tutorial SINCRONIZADO\n');
  try {
    const audioPath = await generateAudio();
    await generateFrames();
    await createVideo(audioPath);
    await cleanup();
    console.log('\n✅ Video sincronizado: public/videos/terminal-tutorial.mp4');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await cleanup();
    process.exit(1);
  }
}

main();
