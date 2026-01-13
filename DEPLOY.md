# 🚀 Guía de Despliegue

## Paso 1: Crear repositorio en GitHub

### Opción A: Desde GitHub Web

1. Ve a [github.com/new](https://github.com/new)
2. Nombre: `claude-code-espanol`
3. Descripción: "Aprende Claude Code en Español - Curso interactivo gratuito"
4. Público ✅
5. **NO** inicialices con README (ya tenemos uno)
6. Click "Create repository"

### Opción B: Con GitHub CLI

```bash
gh repo create claude-code-espanol --public --description "Aprende Claude Code en Español"
```

## Paso 2: Subir el código

```bash
# Desde la carpeta del proyecto
cd claude-code-espanol-web

# Inicializar git
git init

# Añadir todos los archivos
git add .

# Primer commit
git commit -m "🎉 Lanzamiento inicial del curso"

# Conectar con GitHub (cambia TU-USUARIO por tu usuario)
git remote add origin https://github.com/TU-USUARIO/claude-code-espanol.git

# Subir
git branch -M main
git push -u origin main
```

## Paso 3: Desplegar en Vercel

### Opción A: Desde Vercel Web (recomendado)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click "Add New..." → "Project"
3. Importa desde GitHub: `claude-code-espanol`
4. Configuración:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `out`
5. Click "Deploy"

### Opción B: Con Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Para producción
vercel --prod
```

## Paso 4: Crear Release con materiales

1. Ve a tu repo en GitHub
2. Click "Releases" → "Create a new release"
3. Tag: `v1.0.0`
4. Título: "Claude Code en Español - Módulo 1"
5. Descripción:
```markdown
## 🎉 Lanzamiento inicial

### Incluye:
- ✅ Módulo 1 completo (7 lecciones)
- ✅ 10 comandos slash
- ✅ Materiales de práctica
- ✅ Guía de referencia rápida

### Cómo usar:
1. Descarga el ZIP
2. Descomprime
3. `cd curso-materiales && claude`
4. Escribe `/iniciar`
```
6. Arrastra el archivo `curso-materiales.zip` (créalo primero)
7. Click "Publish release"

## Paso 5: Configurar dominio personalizado (opcional)

Si tienes un dominio propio:

1. En Vercel, ve a tu proyecto → Settings → Domains
2. Añade tu dominio
3. Configura los DNS según las instrucciones

## Verificación final

- [ ] Web accesible en `tu-proyecto.vercel.app`
- [ ] GitHub repo público con README visible
- [ ] Release creado con ZIP descargable
- [ ] Todos los enlaces actualizados (busca "TU-USUARIO" y reemplaza)

## Comandos útiles

```bash
# Ver estado del repo
git status

# Ver historial
git log --oneline

# Actualizar después de cambios
git add .
git commit -m "Descripción del cambio"
git push

# Redesplegar en Vercel (automático con push a main)
```

## Solución de problemas

### Error de build en Vercel
- Verifica que `npm run build` funciona localmente
- Revisa los logs en Vercel Dashboard

### Imágenes no cargan
- Asegúrate de que están en `public/images/`
- Usa rutas relativas: `/images/hero.png`

### 404 en páginas
- Verifica que los archivos `.mdx` tienen frontmatter válido
- El nombre del archivo debe coincidir con `_meta.json`
