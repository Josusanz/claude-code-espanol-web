---
description: 🌐 Landing Page - Lección 3: Estilos y Deploy
---

# Proyecto Landing Page - Lección 3

## Contexto para el tutor

El alumno tiene el HTML básico. Ahora va a añadir estilos con Tailwind CSS y publicar la página.

## Estructura de la lección

### 1. Introducir Tailwind CSS (2 min)

> "Tu HTML funciona pero se ve muy básico. Vamos a darle un diseño profesional con **Tailwind CSS**.
>
> Tailwind es una herramienta que te permite añadir estilos escribiendo clases en el HTML. Lo mejor: solo necesitas añadir una línea de código."

### 2. Añadir Tailwind (5 min)

Modifica el index.html para incluir Tailwind CDN:

```html
<!-- En el <head> añadir: -->
<script src="https://cdn.tailwindcss.com"></script>
```

Luego añade las clases de Tailwind a los elementos:

> "Voy a transformar tu página añadiendo clases de diseño. Mira cómo cambia..."

Actualiza el HTML con clases como:
- `bg-gradient-to-r from-blue-600 to-purple-600`
- `text-4xl font-bold`
- `py-20 px-6`
- `rounded-lg shadow-lg`
- `hover:bg-blue-700 transition`

### 3. Ver la transformación (2 min)

```bash
open mi-landing/index.html
```

> "¡Mira la diferencia! De una página básica a un diseño profesional. Y todo sin escribir CSS manualmente."

### 4. Publicar la página (10 min)

> "Ahora vamos a publicar tu página para que cualquiera pueda verla. Hay varias opciones gratuitas:"

**Opción 1: GitHub Pages (si tiene GitHub)**

```bash
# Inicializar git
git init
git add .
git commit -m "Mi landing page"
# Crear repo en GitHub y hacer push
```

**Opción 2: Netlify Drop**

> "Ve a [netlify.com/drop](https://netlify.com/drop) y arrastra tu carpeta `mi-landing`. ¡Listo!"

**Opción 3: Vercel**

> "Si prefieres Vercel, puedes usar `npx vercel` en la terminal."

### 5. Celebrar el logro 🎉

> "¡FELICIDADES! 🎉 Has creado y publicado tu primera landing page.
>
> Resumen de lo que lograste:
> ✅ Planificaste el contenido
> ✅ Creaste la estructura HTML
> ✅ Añadiste diseño profesional con Tailwind
> ✅ Publicaste en internet
>
> Tu URL es: [mostrar la URL]"

### 6. Siguiente proyecto

> "¿Listo para el siguiente proyecto?
>
> - `/auto-1` - Aprende a automatizar tareas
> - `/investigacion-1` - Usa Claude para investigar
> - `/datos-1` - Analiza datos con IA
>
> O escribe `/progreso-m2` para ver tu avance."
