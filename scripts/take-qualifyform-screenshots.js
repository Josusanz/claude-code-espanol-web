const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const os = require('os');

const OUTPUT_DIR = path.join(__dirname, '../public/images/precurso');

// Copy Chrome cookies to a temp directory
const CHROME_USER_DATA = path.join(os.homedir(), 'Library/Application Support/Google/Chrome');
const TEMP_USER_DATA = path.join(os.tmpdir(), 'playwright-chrome-profile');

async function takeQualifyFormScreenshots() {
  console.log('📸 Preparando para tomar screenshots de QualifyForm...\n');

  // Create temp directory
  if (!fs.existsSync(TEMP_USER_DATA)) {
    fs.mkdirSync(TEMP_USER_DATA, { recursive: true });
  }

  // Copy cookies and Local State from Chrome to temp
  const filesToCopy = ['Default/Cookies', 'Default/Login Data', 'Local State'];
  for (const file of filesToCopy) {
    const src = path.join(CHROME_USER_DATA, file);
    const dst = path.join(TEMP_USER_DATA, file);
    if (fs.existsSync(src)) {
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      try {
        fs.copyFileSync(src, dst);
        console.log(`   Copiado: ${file}`);
      } catch (e) {
        console.log(`   No se pudo copiar: ${file} (${e.message})`);
      }
    }
  }

  console.log('\n📸 Iniciando navegador...\n');

  const context = await chromium.launchPersistentContext(TEMP_USER_DATA, {
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    viewport: { width: 1280, height: 800 },
    args: ['--disable-blink-features=AutomationControlled']
  });

  const page = await context.newPage();

  // 1. Dashboard
  console.log('1/4 Dashboard...');
  await page.goto('https://www.qualifyform.com/dashboard', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Check if we're logged in
  const url = page.url();
  if (url.includes('login')) {
    console.log('\n⚠️  No hay sesión activa. Necesitas cerrar Chrome y ejecutar de nuevo.');
    console.log('   O puedes iniciar sesión manualmente en la ventana que se abrió.\n');
    console.log('   Esperando 30 segundos para que inicies sesión...');
    await page.waitForTimeout(30000);
    await page.goto('https://www.qualifyform.com/dashboard', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'qualifyform-dashboard.png'),
    fullPage: false
  });
  console.log('   ✓ qualifyform-dashboard.png');

  // 2. Form Builder
  console.log('2/4 Form Builder...');
  await page.waitForSelector('a[href*="/form/"]', { timeout: 5000 }).catch(() => {});
  const formLink = await page.$('a[href*="/form/"]');
  if (formLink) {
    await formLink.click();
    await page.waitForTimeout(3000);
  }
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'qualifyform-builder.png'),
    fullPage: false
  });
  console.log('   ✓ qualifyform-builder.png');

  // 3. Responses
  console.log('3/4 Responses...');
  const responsesTab = await page.$('button:has-text("Responses"), a:has-text("Responses"), [role="tab"]:has-text("Responses")');
  if (responsesTab) {
    await responsesTab.click();
    await page.waitForTimeout(2000);
  }
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'qualifyform-responses.png'),
    fullPage: false
  });
  console.log('   ✓ qualifyform-responses.png');

  // 4. Settings
  console.log('4/4 Settings/Webhooks...');
  const settingsTab = await page.$('button:has-text("Settings"), a:has-text("Settings"), [role="tab"]:has-text("Settings")');
  if (settingsTab) {
    await settingsTab.click();
    await page.waitForTimeout(2000);
  }
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'qualifyform-webhooks.png'),
    fullPage: false
  });
  console.log('   ✓ qualifyform-webhooks.png');

  await context.close();

  // Cleanup temp directory
  fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true });

  console.log('\n✅ Screenshots de QualifyForm completados!');
  console.log(`📁 Guardados en: ${OUTPUT_DIR}`);
}

takeQualifyFormScreenshots().catch(console.error);
