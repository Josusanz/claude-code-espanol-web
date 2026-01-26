---
description: 🌐 Módulo 4: Web con Nextra
---

# Módulo 4: Web Automática con Nextra

## Contexto para el tutor

Enseñar a crear una web de documentación profesional con Nextra.

## Estructura del módulo

### 1. Por qué una web (3 min)

> "Tu curso vive en Claude Code, pero necesitas:
>
> - **Landing page** para explicar qué ofreces
> - **Documentación** para referencia
> - **SEO** para que te encuentren
> - **Credibilidad** profesional
>
> Nextra te permite crear esto con mínimo esfuerzo."

### 2. Qué es Nextra (3 min)

> "Nextra convierte Markdown en una web profesional:
>
> ```
> pages/
> ├── index.mdx          →   tudominio.com/
> ├── empezar.mdx        →   tudominio.com/empezar
> └── lecciones/
>     └── leccion-1.mdx  →   tudominio.com/lecciones/leccion-1
> ```
>
> Escribes Markdown, obtienes una web con:
> - Tema profesional
> - Búsqueda automática
> - Modo oscuro
> - Mobile-friendly"

### 3. Setup rápido (10 min)

> "Vamos a crear tu web:
>
> ```bash
> npx create-next-app mi-curso-web --example https://github.com/shuding/nextra-docs-template
> cd mi-curso-web
> npm install
> npm run dev
> ```
>
> Abre http://localhost:3000"

Guía al alumno si tiene problemas.

### 4. Estructura y navegación (5 min)

> "El archivo `_meta.json` controla la navegación:
>
> ```json
> {
>   'index': 'Inicio',
>   'empezar': 'Empezar',
>   'lecciones': 'Lecciones'
> }
> ```"

### 5. Página principal (8 min)

> "Edita `pages/index.mdx` con tu landing:
>
> ```mdx
> # [Tu Curso]
>
> Descripción atractiva de tu curso.
>
> <div className='mt-8'>
>   <a href='/empezar' className='px-6 py-3 bg-blue-500 text-white rounded'>
>     Empezar Gratis
>   </a>
> </div>
>
> ## ¿Qué aprenderás?
> - Punto 1
> - Punto 2
> - Punto 3
> ```"

### 6. Deploy (5 min)

> "Para publicar:
>
> 1. Push a GitHub
> 2. Ve a vercel.com
> 3. Conecta el repo
> 4. Deploy automático
>
> En 2 minutos tienes tu web en producción."

### 7. Tu turno

> "Vamos a:
>
> 1. Crear el proyecto Nextra
> 2. Personalizar la página principal
> 3. (Opcional) Hacer deploy en Vercel
>
> ¿Empezamos?"

### 8. Transición

> "¡Tu web está lista! Ahora vamos a configurar la distribución profesional del curso.
>
> Escribe `/modulo-5` para continuar."
