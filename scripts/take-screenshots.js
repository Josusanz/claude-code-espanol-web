const { chromium } = require('playwright');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/images/precurso');

async function takeScreenshots() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  console.log('📸 Tomando screenshots...\n');

  // 1. QualifyForm Frontend (landing page)
  console.log('1/6 Frontend de QualifyForm...');
  await page.goto('https://www.qualifyform.com', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'qualifyform-frontend.png'),
    fullPage: false
  });
  console.log('   ✓ qualifyform-frontend.png');

  // 2. GitHub repo example
  console.log('2/6 GitHub repositorio...');
  await page.goto('https://github.com/vercel/next.js', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'github-repo.png'),
    fullPage: false
  });
  console.log('   ✓ github-repo.png');

  // 3. Vercel dashboard (public page)
  console.log('3/6 Vercel deploy...');
  await page.goto('https://vercel.com', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'vercel-deploy.png'),
    fullPage: false
  });
  console.log('   ✓ vercel-deploy.png');

  // 4. VS Code website (for reference)
  console.log('4/6 VS Code...');
  await page.goto('https://code.visualstudio.com', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'vscode-example.png'),
    fullPage: false
  });
  console.log('   ✓ vscode-example.png');

  // 5. Node.js website
  console.log('5/6 Node.js...');
  await page.goto('https://nodejs.org', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'nodejs-example.png'),
    fullPage: false
  });
  console.log('   ✓ nodejs-example.png');

  // 6. Terminal example (create a simple one)
  console.log('6/6 Terminal ejemplo...');
  await page.setContent(`
    <html>
      <body style="margin:0; padding:40px; background:#1e1e1e; font-family: 'SF Mono', 'Monaco', 'Menlo', monospace;">
        <div style="background:#2d2d2d; border-radius:12px; overflow:hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
          <div style="background:#3d3d3d; padding:12px 16px; display:flex; gap:8px;">
            <div style="width:12px; height:12px; border-radius:50%; background:#ff5f57;"></div>
            <div style="width:12px; height:12px; border-radius:50%; background:#febc2e;"></div>
            <div style="width:12px; height:12px; border-radius:50%; background:#28c840;"></div>
            <span style="color:#999; margin-left:20px; font-size:13px;">Terminal — bash</span>
          </div>
          <div style="padding:20px; color:#f0f0f0; font-size:14px; line-height:1.8;">
            <div><span style="color:#22c55e;">➜</span> <span style="color:#60a5fa;">~/proyectos</span> node --version</div>
            <div style="color:#a0a0a0;">v20.11.0</div>
            <div style="margin-top:8px;"><span style="color:#22c55e;">➜</span> <span style="color:#60a5fa;">~/proyectos</span> npm --version</div>
            <div style="color:#a0a0a0;">10.2.4</div>
            <div style="margin-top:8px;"><span style="color:#22c55e;">➜</span> <span style="color:#60a5fa;">~/proyectos</span> claude</div>
            <div style="color:#f59e0b;">╭─────────────────────────────────────╮</div>
            <div style="color:#f59e0b;">│  Welcome to Claude Code! 🤖        │</div>
            <div style="color:#f59e0b;">╰─────────────────────────────────────╯</div>
            <div style="margin-top:8px;"><span style="color:#22c55e;">➜</span> <span style="color:#60a5fa;">~/proyectos</span> <span style="animation: blink 1s infinite;">▊</span></div>
          </div>
        </div>
      </body>
    </html>
  `);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'terminal.png'),
    fullPage: false
  });
  console.log('   ✓ terminal.png');

  await browser.close();
  console.log('\n✅ Screenshots completados!');
  console.log(`📁 Guardados en: ${OUTPUT_DIR}`);
}

takeScreenshots().catch(console.error);
