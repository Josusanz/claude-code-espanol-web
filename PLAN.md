# PLAN.md - Tareas para Ralph

## Módulo 2: Proyectos Prácticos

### M2-001: Estructura base del módulo
- [x] Crear carpeta `/pages/proyectos/` si no existe
- [x] Crear `_meta.json` con orden de lecciones
- [x] Actualizar `/pages/proyectos/index.mdx` como índice del módulo

### M2-002: Landing Page - Introducción
- [x] Crear `/pages/proyectos/landing-intro.mdx`
- [x] Explicar qué vamos a construir (landing page simple)
- [x] Mostrar ejemplo del resultado final
- [x] Duración: ~10 min lectura

### M2-003: Landing Page - Estructura HTML
- [x] Crear `/pages/proyectos/landing-estructura.mdx`
- [x] Enseñar a pedir a Claude que cree estructura básica
- [x] Ejercicio: crear index.html con secciones (hero, features, CTA)
- [x] Duración: ~30 min

### M2-004: Landing Page - Estilos y Deploy
- [x] Crear `/pages/proyectos/landing-estilos.mdx`
- [x] Añadir Tailwind CSS con Claude
- [x] Deploy gratuito en Vercel/Netlify
- [x] Ejercicio: publicar la landing
- [x] Duración: ~30 min

### M2-005: Automatizaciones - Introducción
- [x] Crear `/pages/proyectos/automatizaciones-intro.mdx`
- [x] Explicar qué son las automatizaciones con Claude Code
- [x] Casos de uso: renombrar archivos, procesar CSVs, backups
- [x] Duración: ~10 min

### M2-006: Automatizaciones - Scripts Básicos
- [x] Crear `/pages/proyectos/automatizaciones-scripts.mdx`
- [x] Crear script para organizar descargas por tipo
- [x] Crear script para renombrar fotos con fecha
- [x] Ejercicio práctico con archivos del usuario
- [x] Duración: ~30 min

### M2-007: Automatizaciones - Tareas Programadas
- [x] Crear `/pages/proyectos/automatizaciones-cron.mdx`
- [x] Explicar cron jobs / tareas programadas
- [x] Crear backup automático de carpeta
- [x] Duración: ~20 min

### M2-008: Investigación - Introducción
- [x] Crear `/pages/proyectos/investigacion-intro.mdx`
- [x] Claude como asistente de investigación
- [x] Búsqueda web, resumen de artículos, síntesis
- [x] Duración: ~10 min

### M2-009: Investigación - Proyecto Práctico
- [x] Crear `/pages/proyectos/investigacion-proyecto.mdx`
- [x] Investigar un tema y generar informe
- [x] Usar web search + síntesis
- [x] Ejercicio: investigar competidores de un nicho
- [x] Duración: ~30 min

### M2-010: Análisis de Datos - Introducción
- [x] Crear `/pages/proyectos/datos-intro.mdx`
- [x] Procesar CSVs y hojas de cálculo con Claude
- [x] Casos de uso: ventas, encuestas, métricas
- [x] Duración: ~10 min

### M2-011: Análisis de Datos - Proyecto Práctico
- [x] Crear `/pages/proyectos/datos-proyecto.mdx`
- [x] Analizar CSV de ejemplo (ventas ficticias)
- [x] Generar gráficos y conclusiones
- [x] Ejercicio con datos propios del usuario
- [x] Duración: ~30 min

### M2-012: Actualizar navegación
- [x] Actualizar `_meta.json` de proyectos con todas las lecciones
- [x] Verificar que navegación funciona correctamente
- [x] Actualizar índice del módulo con links a cada lección

---

## Módulo 3: Ralph Loop (Automatización Autónoma)

### M3-001: Estructura base del módulo Ralph
- [x] Crear carpeta `/pages/ralph/`
- [x] Crear `_meta.json` con orden de lecciones
- [x] Crear `/pages/ralph/index.mdx` como índice del módulo

### M3-002: ¿Qué es Ralph Loop?
- [x] Crear `/pages/ralph/que-es-ralph.mdx`
- [x] Explicar el concepto de loops autónomos
- [x] Por qué se llama "Ralph Wiggum"
- [x] Diferencia entre estar "en el loop" vs "sobre el loop"
- [x] Duración: ~15 min

### M3-003: El problema del Context Rot
- [x] Crear `/pages/ralph/context-rot.mdx`
- [x] Explicar degradación del contexto en sesiones largas
- [x] Por qué reiniciar el contexto es mejor
- [x] Cómo Ralph resuelve este problema
- [x] Duración: ~15 min

### M3-004: Anatomía de un Ralph Loop
- [x] Crear `/pages/ralph/anatomia.mdx`
- [x] Los 4 archivos clave: loop.sh, PROMPT_build.md, PLAN.md, PROGRESS.md
- [x] Explicar cada uno con ejemplos
- [x] Duración: ~20 min

### M3-005: Fase 1 - Definir Specs
- [x] Crear `/pages/ralph/fase-specs.mdx`
- [x] La conversación inicial de 30+ minutos
- [x] Cómo hacer las preguntas correctas
- [x] Ejercicio: definir specs para un proyecto simple
- [x] Duración: ~30 min

### M3-006: Fase 2 - El Plan
- [x] Crear `/pages/ralph/fase-plan.mdx`
- [x] Crear PLAN.md con tareas atómicas
- [x] Tamaño correcto de cada tarea (una por contexto)
- [x] Criterios de aceptación claros
- [x] Duración: ~20 min

### M3-007: Fase 3 - Ejecutar el Loop
- [x] Crear `/pages/ralph/fase-ejecutar.mdx`
- [x] Configurar loop.sh
- [x] Lanzar Ralph y monitorear
- [x] Qué hacer si se atasca
- [x] Duración: ~30 min

### M3-008: Proyecto Práctico con Ralph
- [x] Crear `/pages/ralph/proyecto-practico.mdx`
- [x] Construir una mini-app completa usando Ralph
- [x] Desde specs hasta deploy
- [x] Ejercicio guiado paso a paso
- [x] Duración: ~45 min

### M3-009: Consejos Avanzados
- [x] Crear `/pages/ralph/consejos-avanzados.mdx`
- [x] Sandboxing y seguridad (Docker, VMs)
- [x] Cuándo NO usar Ralph
- [x] Múltiples agentes vs un solo Ralph
- [x] Duración: ~20 min

### M3-010: Actualizar navegación Ralph
- [x] Actualizar `_meta.json` de ralph con todas las lecciones
- [x] Verificar navegación
- [x] Actualizar índice con links

---

## Tareas Finales

### FINAL-001: Actualizar landing principal
- [x] Añadir Módulo 2 y Módulo 3 a la landing page
- [x] Actualizar contador de lecciones
- [x] Añadir badges de "Nuevo" a los módulos

### FINAL-002: Testing completo
- [x] Ejecutar `npm run build` sin errores
- [x] Verificar todos los links funcionan
- [x] Revisar responsive en móvil
