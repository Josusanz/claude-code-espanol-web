// Email templates for nurturing sequence

const baseStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #1e293b;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`

const buttonStyle = `
  display: inline-block;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  font-weight: bold;
  text-decoration: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-size: 16px;
`

const footerStyle = `
  text-align: center;
  color: #94a3b8;
  font-size: 12px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
`

interface EmailTemplate {
  subject: string
  html: string
}

export function bienvenidaEmail(nombre?: string): EmailTemplate {
  return {
    subject: '🎉 ¡Bienvenido al curso de Claude Code!',
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="${baseStyles}">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4f46e5;">¡Hola${nombre ? ` ${nombre}` : ''}! 👋</h1>
          </div>

          <p>Gracias por unirte al <strong>curso de Claude Code en español</strong>.</p>

          <p>Esto es lo que te espera:</p>

          <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="margin: 0 0 12px 0;">✅ <strong>Módulo 0:</strong> Modo Fácil (sin instalar nada)</p>
            <p style="margin: 0 0 12px 0;">✅ <strong>Módulo 1:</strong> Instalación paso a paso</p>
            <p style="margin: 0 0 12px 0;">✅ <strong>Módulo 2:</strong> Fundamentos y Comandos Slash</p>
            <p style="margin: 0;">✅ <strong>4 proyectos</strong> prácticos para aplicar lo aprendido</p>
          </div>

          <p><strong>Mi recomendación:</strong> Empieza por el Modo Fácil si nunca has usado Claude Code. Es la forma más rápida de ver resultados.</p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="https://www.aprende.software/modo-facil" style="${buttonStyle}">
              Empezar el Curso →
            </a>
          </div>

          <p>¿Tienes dudas? Responde a este email y te ayudo.</p>

          <p>¡A por ello!</p>
          <p><strong>Josu</strong></p>

          <div style="${footerStyle}">
            <p>aprende.software · Claude Code en Español</p>
            <p><a href="https://www.aprende.software/unsub?email={{email}}" style="color: #94a3b8;">Darme de baja</a></p>
          </div>
        </body>
      </html>
    `
  }
}

export function tipRapidoEmail(): EmailTemplate {
  return {
    subject: '💡 Un truco de Claude Code que el 90% no conoce',
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="${baseStyles}">
          <h1 style="color: #4f46e5;">¿Sabías esto? 💡</h1>

          <p>La mayoría de la gente usa Claude Code escribiendo prompts largos...</p>

          <p>Pero hay un truco que ahorra mucho tiempo:</p>

          <div style="background: #1e1b4b; color: #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0; font-family: monospace;">
            <p style="color: #a78bfa; margin: 0 0 8px 0;"># En vez de escribir esto:</p>
            <p style="margin: 0 0 16px 0;">"Lee el archivo config.ts y dime qué hace"</p>

            <p style="color: #a78bfa; margin: 0 0 8px 0;"># Usa esto:</p>
            <p style="margin: 0; color: #4ade80;">/read config.ts</p>
          </div>

          <p>Los <strong>Comandos Slash</strong> son atajos que hacen que Claude trabaje más rápido.</p>

          <p>Algunos de mis favoritos:</p>

          <ul style="background: #f8fafc; border-radius: 12px; padding: 24px 24px 24px 44px; margin: 24px 0;">
            <li><code>/init</code> - Crea CLAUDE.md automáticamente</li>
            <li><code>/compact</code> - Comprime el contexto sin perder info</li>
            <li><code>/review</code> - Revisa tu código buscando bugs</li>
            <li><code>/cost</code> - Ver cuánto llevas gastado</li>
          </ul>

          <p>Todo esto lo explico en el <strong>Módulo 2: Fundamentos</strong>.</p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="https://www.aprende.software/fundamentos/comandos-slash" style="${buttonStyle}">
              Ver Comandos Slash →
            </a>
          </div>

          <p>Mañana te cuento otro truco bueno.</p>

          <p><strong>Josu</strong></p>

          <div style="${footerStyle}">
            <p>aprende.software · Claude Code en Español</p>
            <p><a href="https://www.aprende.software/unsub?email={{email}}" style="color: #94a3b8;">Darme de baja</a></p>
          </div>
        </body>
      </html>
    `
  }
}

export function recordatorioEmail(): EmailTemplate {
  return {
    subject: '🎮 ¿Ya probaste el modo interactivo?',
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="${baseStyles}">
          <h1 style="color: #4f46e5;">¿Cómo vas con el curso? 🤔</h1>

          <p>Han pasado unos días desde que te registraste...</p>

          <p>Quería recordarte que ahora hay <strong>2 formas de aprender</strong>:</p>

          <div style="display: flex; gap: 16px; margin: 24px 0;">
            <div style="flex: 1; background: #f8fafc; border-radius: 12px; padding: 20px;">
              <h3 style="margin: 0 0 12px 0;">📖 Tutorial</h3>
              <p style="margin: 0; color: #64748b; font-size: 14px;">Lee a tu ritmo, copia los ejemplos</p>
            </div>
            <div style="flex: 1; background: #1e3a5f; color: white; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
              <h3 style="margin: 0 0 12px 0;">🎮 Interactivo <span style="background: #3b82f6; padding: 2px 8px; border-radius: 4px; font-size: 10px;">NUEVO</span></h3>
              <p style="margin: 0; color: #93c5fd; font-size: 14px;">Practica en un terminal simulado</p>
            </div>
          </div>

          <p>El modo interactivo es nuevo y la mejor forma de aprender si te gusta <strong>practicar haciendo</strong>.</p>

          <p>Es como tener a Claude al lado guiándote paso a paso.</p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="https://www.aprende.software/empezar/interactivo" style="${buttonStyle}">
              Probar Modo Interactivo →
            </a>
          </div>

          <p>Si tienes dudas o algo no funciona, responde a este email.</p>

          <p><strong>Josu</strong></p>

          <div style="${footerStyle}">
            <p>aprende.software · Claude Code en Español</p>
            <p><a href="https://www.aprende.software/unsub?email={{email}}" style="color: #94a3b8;">Darme de baja</a></p>
          </div>
        </body>
      </html>
    `
  }
}

export function casoRalphEmail(): EmailTemplate {
  return {
    subject: '⏱️ Cómo terminé un proyecto de 2 días en 4 horas',
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="${baseStyles}">
          <h1 style="color: #4f46e5;">Una historia real ⏱️</h1>

          <p>La semana pasada tenía que crear una web con:</p>
          <ul>
            <li>Landing page</li>
            <li>Sistema de autenticación</li>
            <li>Dashboard con gráficas</li>
            <li>API para datos</li>
          </ul>

          <p>Normalmente = 2 días de trabajo.</p>

          <p>Pero usé <strong>Ralph Loop</strong> y lo terminé en <strong>4 horas</strong>.</p>

          <div style="background: #fef3c7; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; font-weight: bold;">¿Qué es Ralph Loop?</p>
            <p style="margin: 12px 0 0 0;">Es una técnica para poner a Claude en "piloto automático".</p>
            <p style="margin: 8px 0 0 0;">En vez de supervisar cada paso, defines el objetivo y Claude trabaja solo hasta completarlo.</p>
          </div>

          <p>El problema con Claude Code normal es el <strong>"Context Rot"</strong>:</p>
          <p>A medida que avanza la conversación, Claude "olvida" cosas y empieza a cometer errores.</p>

          <p>Ralph Loop resuelve esto con un sistema de contexto que se regenera automáticamente.</p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="https://www.aprende.software/ralph" style="${buttonStyle}">
              Descubre Ralph Loop →
            </a>
          </div>

          <p>Mañana te cuento más sobre cómo funciona.</p>

          <p><strong>Josu</strong></p>

          <div style="${footerStyle}">
            <p>aprende.software · Claude Code en Español</p>
            <p><a href="https://www.aprende.software/unsub?email={{email}}" style="color: #94a3b8;">Darme de baja</a></p>
          </div>
        </body>
      </html>
    `
  }
}

export function ofertaRalphEmail(): EmailTemplate {
  return {
    subject: '🚀 Ralph Loop: Claude en piloto automático ($47)',
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="${baseStyles}">
          <h1 style="color: #4f46e5;">¿Listo para el siguiente nivel? 🚀</h1>

          <p>Si ya has probado el curso gratuito, sabes que Claude Code es potente.</p>

          <p>Pero hay un problema: para proyectos grandes, tienes que supervisar cada paso.</p>

          <p><strong>Ralph Loop</strong> cambia eso.</p>

          <div style="background: #1e1b4b; border-radius: 16px; padding: 32px; margin: 24px 0; text-align: center;">
            <div style="background: rgba(255,255,255,0.1); display: inline-block; padding: 8px 20px; border-radius: 100px; margin-bottom: 16px;">
              <span style="color: white; font-weight: bold; letter-spacing: 2px;">MÓDULO PREMIUM</span>
            </div>

            <h2 style="color: white; font-size: 36px; margin: 16px 0 8px 0;">Ralph Loop</h2>
            <p style="color: #c4b5fd; margin: 0 0 24px 0;">Claude en piloto automático</p>

            <div style="margin-bottom: 24px;">
              <span style="color: white; font-size: 48px; font-weight: bold;">$47</span>
              <span style="color: #a78bfa; font-size: 24px; text-decoration: line-through; margin-left: 12px;">$97</span>
              <span style="background: #22c55e; color: white; padding: 4px 12px; border-radius: 6px; margin-left: 12px; font-size: 14px; font-weight: bold;">50% OFF</span>
            </div>

            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px;">
              <span style="background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 8px; color: white; font-size: 14px;">📚 8 lecciones</span>
              <span style="background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 8px; color: white; font-size: 14px;">📦 Templates</span>
              <span style="background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 8px; color: white; font-size: 14px;">🚀 Proyecto</span>
              <span style="background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 8px; color: white; font-size: 14px;">♾️ Acceso de por vida</span>
            </div>

            <a href="https://www.aprende.software/ralph" style="display: inline-block; background: white; color: #4f46e5; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px;">
              Quiero Ralph Loop →
            </a>
          </div>

          <p><strong>¿Qué aprenderás?</strong></p>
          <ul>
            <li>Configurar Claude para que trabaje sin supervisión</li>
            <li>El sistema de contexto regenerativo</li>
            <li>Cómo evitar el "Context Rot"</li>
            <li>Templates listos para usar</li>
            <li>Proyecto completo paso a paso</li>
          </ul>

          <p>Un proyecto que antes me llevaba 2 días, ahora lo termino en 4 horas.</p>

          <p>El ROI es inmediato.</p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="https://www.aprende.software/ralph" style="${buttonStyle}">
              Acceder a Ralph Loop →
            </a>
          </div>

          <p><strong>Josu</strong></p>

          <div style="${footerStyle}">
            <p>aprende.software · Claude Code en Español</p>
            <p><a href="https://www.aprende.software/unsub?email={{email}}" style="color: #94a3b8;">Darme de baja</a></p>
          </div>
        </body>
      </html>
    `
  }
}

export const emailSequence = [
  { day: 0, template: 'bienvenida', getEmail: bienvenidaEmail },
  { day: 2, template: 'tip-rapido', getEmail: tipRapidoEmail },
  { day: 5, template: 'recordatorio', getEmail: recordatorioEmail },
  { day: 7, template: 'caso-ralph', getEmail: casoRalphEmail },
  { day: 10, template: 'oferta-ralph', getEmail: ofertaRalphEmail },
]
