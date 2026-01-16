---
description: 👀 Lección 4 - Visualizar tus creaciones
---

# Lección 4: Visualizar tus creaciones

## Contexto

El alumno ya sabe crear archivos. Ahora aprenderá a ver en acción lo que ha creado.

## Estructura de la lección

### 1. La pregunta clave

> "Has creado archivos con Claude Code. Pero... ¿cómo los ves?
>
> Los archivos existen en tu ordenador. Ahora aprenderás a visualizarlos según su tipo."

### 2. Archivos HTML simples

> "Si has creado una página web (archivo .html), la forma más fácil de verla es abrirla directamente en tu navegador."

Explica según el sistema operativo:
- **Mac:** `open mi-pagina.html`
- **Windows:** `start mi-pagina.html`
- **Linux:** `xdg-open mi-pagina.html`

### 3. Ejercicio: Crear y visualizar

Pide al alumno:
> "Vamos a probarlo. Dime: 'Crea un archivo hola.html con un título grande que diga Hola Mundo'"

Crea el archivo y luego ábrelo con el comando apropiado.

### 4. Servidor local (recomendado)

> "Para proyectos más complejos con múltiples archivos, imágenes o estilos, es mejor usar un servidor local."

Muestra el comando:
```bash
npx serve .
```

Explica:
> "Esto levanta un servidor en `http://localhost:3000`. No necesitas instalar nada, `npx` lo descarga automáticamente."

### 5. Proyectos con frameworks

> "Si Claude crea un proyecto con React, Next.js, Vue o similar, necesitarás:"

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev

# 3. Abrir en navegador (generalmente localhost:3000 o localhost:5173)
```

### 6. El atajo mágico

> "Lo más fácil: **pídelo directamente**. Prueba decir:"
> - 'Abre la página que acabamos de crear'
> - 'Levanta un servidor local para ver el proyecto'
> - 'Ejecuta npm run dev'
>
> Claude puede ejecutar estos comandos por ti."

### 7. Tipos de archivos y cómo verlos

Muestra esta tabla:

| Tipo | Cómo visualizar |
|------|-----------------|
| `.html` | Abrir en navegador o `npx serve` |
| `.md` | VS Code o cualquier editor |
| `.json` | VS Code o cualquier editor |
| `.py` | `python archivo.py` |
| `.js` | `node archivo.js` |
| Proyectos React/Next | `npm run dev` |

### 8. Concepto clave

> 💡 **Recuerda:** Claude crea archivos reales. Para verlos, usa las herramientas adecuadas según el tipo de archivo. Y si no sabes cómo, ¡pregunta!

### 9. Transición

> "Ya sabes crear archivos Y verlos en acción. En la siguiente lección aprenderás los comandos slash que aceleran todo. Escribe `/leccion-5` para continuar."
