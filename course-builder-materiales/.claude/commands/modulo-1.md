---
description: 📁 Módulo 1: Arquitectura de Comandos Slash
---

# Módulo 1: Arquitectura de Comandos Slash

## Contexto para el tutor

Primer módulo. Enseñar cómo funcionan los comandos slash y cómo diseñar lecciones efectivas.

## Estructura del módulo

### 1. Concepto (5 min)

> "Los comandos slash son la **interfaz de tu curso**. Cuando un alumno escribe `/leccion-1`, Claude lee el archivo correspondiente y se convierte en tutor.
>
> Es como tener un guion que Claude sigue, pero con la flexibilidad de adaptarse a cada alumno."

### 2. Cómo funciona (5 min)

Explica la estructura:

> "Los comandos viven en `.claude/commands/`:
>
> ```
> mi-curso/
> └── .claude/
>     └── commands/
>         ├── iniciar.md       # /iniciar
>         ├── leccion-1.md     # /leccion-1
>         └── ayuda.md         # /ayuda
> ```
>
> El nombre del archivo = el comando. Simple."

### 3. Anatomía de una lección (10 min)

> "Cada archivo `.md` tiene esta estructura:
>
> ```markdown
> ---
> description: 📘 Lección 1: Título
> ---
>
> # Nombre de la Lección
>
> ## Contexto para el tutor
> [Info que Claude necesita]
>
> ## Estructura de la lección
>
> ### 1. Introducción
> > 'Texto que Claude dirá'
>
> ### 2. Demostración
> [Código o ejemplos]
>
> ### 3. Práctica
> [Ejercicios]
>
> ### 4. Transición
> > 'Para continuar, escribe /leccion-2'
> ```"

### 4. El truco del `>` (3 min)

> "Los bloques con `>` son diálogos que Claude dirá literalmente:
>
> ```markdown
> > '¡Bienvenido! Hoy vas a aprender Python.'
> ```
>
> Todo lo demás son instrucciones para Claude."

### 5. Tu turno: Crear tu primer comando

> "Vamos a crear el comando `/iniciar` para tu curso.
>
> Crea el archivo `.claude/commands/iniciar.md` con:
> - Frontmatter con descripción
> - Bienvenida al alumno
> - Explicación de qué aprenderá
> - Transición a la primera lección
>
> ¿Empezamos?"

Guía al alumno paso a paso. Si tiene tema definido, úsalo. Si no, usa un ejemplo genérico.

### 6. Verificación

Verifica que el archivo:
- Tiene frontmatter correcto
- Tiene sección de contexto
- Tiene diálogos con `>`
- Tiene transición clara

### 7. Transición

> "¡Excelente! Ya tienes tu primer comando. El problema es que Claude no sabe nada sobre tu curso. En el siguiente módulo configuraremos CLAUDE.md para que sea el tutor perfecto.
>
> Escribe `/modulo-2` para continuar."
