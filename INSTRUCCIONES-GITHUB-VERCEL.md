# Instrucciones para Subir a GitHub y Desplegar en Vercel

## ✅ Ya completado:
- ✅ Dependencias instaladas
- ✅ Git inicializado
- ✅ Commit inicial creado

## 📦 Paso 1: Crear repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Configura el repositorio:
   - **Nombre**: `claude-code-espanol-web`
   - **Descripción**: `Aprende Claude Code en Español - Curso interactivo gratuito`
   - **Visibilidad**: Público
   - **NO marques** "Add a README file", "Add .gitignore", ni "Choose a license"
3. Haz clic en "Create repository"

## 🚀 Paso 2: Subir el código a GitHub

Después de crear el repositorio, GitHub te mostrará instrucciones. Usa estas:

```bash
git remote add origin https://github.com/TU-USUARIO/claude-code-espanol-web.git
git branch -M main
git push -u origin main
```

**Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub**

## 🌐 Paso 3: Desplegar en Vercel

### Opción A: Despliegue desde la web (Recomendado)

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "Add New..." → "Project"
4. Busca el repositorio `claude-code-espanol-web`
5. Haz clic en "Import"
6. Vercel detectará automáticamente que es un proyecto Next.js
7. No necesitas cambiar ninguna configuración
8. Haz clic en "Deploy"
9. ¡Listo! Tu sitio estará en línea en unos minutos

### Opción B: Despliegue con CLI de Vercel

Si prefieres usar la terminal:

```bash
# Instalar Vercel CLI (solo una vez)
npm install -g vercel

# Desplegar
vercel

# Seguir las instrucciones interactivas
# Cuando pregunte por el proyecto, selecciona crear uno nuevo
```

## 🎯 Resultado Esperado

Después de desplegar, tendrás:
- 🔗 URL de producción: `https://claude-code-espanol-web.vercel.app` (o similar)
- 🔄 Despliegues automáticos cada vez que hagas push a main
- 📊 Panel de control en Vercel con analytics y logs

## 🔧 Configuración Adicional (Opcional)

### Dominio Personalizado
1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Agrega tu dominio personalizado

### Variables de Entorno
No se requieren para este proyecto, pero si las necesitas:
1. Settings → Environment Variables
2. Agrega las variables necesarias

## 📝 Siguientes Pasos

1. Actualiza el `package.json` con tu URL de GitHub real
2. Prueba el sitio en Vercel
3. Comparte la URL con la comunidad

## ❓ Ayuda

Si tienes problemas:
- **GitHub**: [docs.github.com](https://docs.github.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
