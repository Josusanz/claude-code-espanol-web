const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '../public/videos');
const FRAMES_DIR = path.join(__dirname, '../temp-frames-glosario');
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_3bcd0c1913c8865dc04b37fd2d9e9b4a0800d2bcc74ae4a8';

const FPS = 24;

// ============ NARRACIÓN ============
const NARRATION = `
Vamos a repasar los conceptos clave que necesitas conocer. No tienes que memorizarlos, solo entender la idea general.

Lo Básico. El Terminal es la pantalla donde escribes comandos. Piénsalo como un chat con tu computadora. Un Comando es una instrucción que le das, y las Carpetas o Directorios son donde viven tus archivos.

Arquitectura Web. Frontend es todo lo que el usuario ve: botones, colores, formularios. Backend es lo que pasa detrás: guardar datos, enviar emails. Y la API es el contrato entre ambos, como el menú de un restaurante.

Código y Desarrollo. JavaScript es el lenguaje de la web. TypeScript es JavaScript con superpoderes. Un Framework como Next.js te da piezas listas para usar. Y los Componentes son piezas reutilizables de la interfaz.

Git y Control de Versiones. Git es como el historial de versiones de Google Docs, pero para código. GitHub es donde guardas tus repositorios en la nube. Un Commit es un punto de guardado. Y un Pull Request es pedir permiso para añadir tus cambios.

Dependencias y Paquetes. npm es la tienda de paquetes de JavaScript. Un Paquete es código listo para usar. Y el archivo package.json lista todo lo que tu proyecto necesita.

Deploy y Producción. Deploy es publicar tu app para que otros la usen. Localhost es tu versión local que solo tú ves. Y el Hosting es el servicio que mantiene tu app online.

Recuerda: Claude Code hará el trabajo técnico por ti. Tú solo necesitas entender estos conceptos para poder dirigirlo.
`;

// ============ SLIDES (108s total synced with audio) ============
const SLIDES = [
  {
    type: 'title',
    emoji: '📚',
    title: 'Glosario de Términos',
    subtitle: 'Los conceptos clave que necesitas conocer',
    duration: 8  // 0-8s
  },
  // LO BÁSICO
  {
    type: 'section',
    emoji: '🏠',
    number: '1',
    title: 'Lo Básico',
    duration: 4  // 8-12s
  },
  {
    type: 'terms',
    category: 'lo-basico',
    terms: [
      { term: 'Terminal', def: 'Chat con tu computadora', icon: '💬' },
      { term: 'Comando', def: 'Instrucción que le das', icon: '⌨️' },
      { term: 'Carpeta', def: 'Donde viven tus archivos', icon: '📁' }
    ],
    duration: 12  // 12-24s
  },
  // ARQUITECTURA WEB
  {
    type: 'section',
    emoji: '🏗️',
    number: '2',
    title: 'Arquitectura Web',
    duration: 3  // 24-27s
  },
  {
    type: 'diagram',
    diagramType: 'frontend-backend',
    duration: 14  // 27-41s
  },
  // CÓDIGO
  {
    type: 'section',
    emoji: '💻',
    number: '3',
    title: 'Código y Desarrollo',
    duration: 3  // 41-44s
  },
  {
    type: 'terms',
    category: 'codigo',
    terms: [
      { term: 'JavaScript', def: 'El lenguaje de la web', icon: '🟨' },
      { term: 'TypeScript', def: 'JS con superpoderes', icon: '🔷' },
      { term: 'Framework', def: 'Piezas listas para usar', icon: '🧱' },
      { term: 'Componente', def: 'Pieza reutilizable', icon: '🧩' }
    ],
    duration: 13  // 44-57s
  },
  // GIT
  {
    type: 'section',
    emoji: '📦',
    number: '4',
    title: 'Git y Versiones',
    duration: 3  // 57-60s
  },
  {
    type: 'terms',
    category: 'git',
    terms: [
      { term: 'Git', def: 'Historial de versiones', icon: '🔀' },
      { term: 'GitHub', def: 'Tu código en la nube', icon: '☁️' },
      { term: 'Commit', def: 'Punto de guardado', icon: '💾' },
      { term: 'Pull Request', def: 'Pedir permiso para cambios', icon: '🙋' }
    ],
    duration: 13  // 60-73s
  },
  // DEPENDENCIAS
  {
    type: 'section',
    emoji: '📚',
    number: '5',
    title: 'Dependencias',
    duration: 3  // 73-76s
  },
  {
    type: 'terms',
    category: 'deps',
    terms: [
      { term: 'npm', def: 'Tienda de paquetes JS', icon: '🏪' },
      { term: 'Paquete', def: 'Código listo para usar', icon: '📦' },
      { term: 'package.json', def: 'Lista de dependencias', icon: '📋' }
    ],
    duration: 9  // 76-85s
  },
  // DEPLOY
  {
    type: 'section',
    emoji: '🚀',
    number: '6',
    title: 'Deploy y Producción',
    duration: 3  // 85-88s
  },
  {
    type: 'terms',
    category: 'deploy',
    terms: [
      { term: 'Deploy', def: 'Publicar tu app', icon: '🌍' },
      { term: 'Localhost', def: 'Solo tú lo ves', icon: '💻' },
      { term: 'Hosting', def: 'Mantiene tu app online', icon: '🏠' }
    ],
    duration: 9  // 88-97s
  },
  // FINAL
  {
    type: 'reminder',
    emoji: '🤖',
    title: 'Recuerda',
    text: 'Claude Code hará el trabajo técnico',
    subtext: 'Tú solo necesitas entender estos conceptos para dirigirlo',
    duration: 6  // 97-103s
  },
  {
    type: 'final',
    emoji: '✅',
    title: '¡Listo!',
    subtitle: 'Ya conoces los conceptos clave',
    duration: 5  // 103-108s
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
  .number { font-size: 120px; font-weight: 800; color: rgba(255,255,255,0.3); }
  .emoji { font-size: 60px; margin: -20px 0 16px; }
  h2 { font-size: 48px; font-weight: 700; color: white; }
</style></head>
<body>
  <div class="container">
    <div class="number">${slide.number}</div>
    <div class="emoji">${slide.emoji}</div>
    <h2>${slide.title}</h2>
  </div>
</body></html>`;
}

function generateTermsSlide(slide) {
  const colors = {
    'lo-basico': '#6366f1',
    'codigo': '#f59e0b',
    'git': '#22c55e',
    'deps': '#ec4899',
    'deploy': '#14b8a6'
  };
  const color = colors[slide.category] || '#6366f1';

  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #1a1a2e 0%, #0f172a 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif; padding: 60px;
  }
  .container { width: 100%; max-width: 900px; }
  .terms { display: flex; flex-direction: column; gap: 20px; }
  .term {
    background: rgba(255,255,255,0.08);
    border-radius: 16px; padding: 24px 28px;
    display: flex; align-items: center; gap: 20px;
    border-left: 4px solid ${color};
  }
  .icon { font-size: 36px; }
  .content { flex: 1; }
  .name { font-size: 24px; font-weight: 700; color: white; margin-bottom: 6px; }
  .def { font-size: 18px; color: rgba(255,255,255,0.7); }
</style></head>
<body>
  <div class="container">
    <div class="terms">
      ${slide.terms.map(t => `
        <div class="term">
          <div class="icon">${t.icon}</div>
          <div class="content">
            <div class="name">${t.term}</div>
            <div class="def">${t.def}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</body></html>`;
}

function generateDiagramSlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #1a1a2e 0%, #0f172a 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif; padding: 60px;
  }
  .container { display: flex; align-items: center; gap: 24px; justify-content: center; }
  .box {
    padding: 32px 40px; border-radius: 20px; text-align: center;
    min-width: 180px;
  }
  .frontend { background: #6366f1; }
  .backend { background: #22c55e; }
  .api { background: rgba(255,255,255,0.1); border: 2px dashed rgba(255,255,255,0.3); }
  .emoji { font-size: 48px; margin-bottom: 12px; }
  .label { font-size: 22px; font-weight: 700; color: white; }
  .sublabel { font-size: 14px; color: rgba(255,255,255,0.8); margin-top: 6px; }
  .arrow { font-size: 32px; color: rgba(255,255,255,0.5); }
</style></head>
<body>
  <div class="container">
    <div class="box frontend">
      <div class="emoji">🖥️</div>
      <div class="label">FRONTEND</div>
      <div class="sublabel">Lo que ves</div>
    </div>
    <div class="arrow">⇄</div>
    <div class="box api">
      <div class="emoji">📋</div>
      <div class="label">API</div>
      <div class="sublabel">El menú</div>
    </div>
    <div class="arrow">⇄</div>
    <div class="box backend">
      <div class="emoji">⚙️</div>
      <div class="label">BACKEND</div>
      <div class="sublabel">Lo que procesa</div>
    </div>
  </div>
</body></html>`;
}

function generateReminderSlide(slide) {
  return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: 'Inter', sans-serif; padding: 60px;
  }
  .container { text-align: center; max-width: 800px; }
  .emoji { font-size: 100px; margin-bottom: 24px; }
  h2 { font-size: 48px; font-weight: 800; color: white; margin-bottom: 20px; }
  .text { font-size: 28px; color: rgba(255,255,255,0.95); margin-bottom: 16px; }
  .subtext { font-size: 22px; color: rgba(255,255,255,0.75); }
</style></head>
<body>
  <div class="container">
    <div class="emoji">${slide.emoji}</div>
    <h2>${slide.title}</h2>
    <p class="text">${slide.text}</p>
    <p class="subtext">${slide.subtext}</p>
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
    case 'terms': return generateTermsSlide(slide);
    case 'diagram': return generateDiagramSlide(slide);
    case 'reminder': return generateReminderSlide(slide);
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
  const audioPath = path.join(OUTPUT_DIR, 'glosario-narration.mp3');
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
  const videoPath = path.join(OUTPUT_DIR, 'glosario.mp4');
  execSync(`ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame_%05d.png" -i "${audioPath}" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "${videoPath}"`, { stdio: 'pipe' });
  console.log('   ✓ Video: glosario.mp4');
}

async function cleanup() {
  if (fs.existsSync(FRAMES_DIR)) fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
}

async function main() {
  console.log('🎬 Video 3: Glosario de Términos\n');
  try {
    const audioPath = path.join(OUTPUT_DIR, 'glosario-narration.mp3');
    if (fs.existsSync(audioPath)) {
      console.log('🎙️ Usando audio existente...');
    } else {
      await generateAudio();
    }
    await generateFrames();
    await createVideo(audioPath);
    await cleanup();
    console.log('\n✅ Video creado: public/videos/glosario.mp4');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await cleanup();
    process.exit(1);
  }
}

main();
