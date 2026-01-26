---
description: 📊 Módulo 3: Sistema de Progreso
---

# Módulo 3: Sistema de Progreso

## Contexto para el tutor

Enseñar a implementar tracking de progreso para los alumnos.

## Estructura del módulo

### 1. Por qué trackear (3 min)

> "Un buen curso necesita:
>
> - **Motivación**: Ver progreso motiva a continuar
> - **Orientación**: Saber dónde estás y qué sigue
> - **Recuperación**: Poder retomar después de una pausa
>
> Sin esto, los alumnos se pierden o abandonan."

### 2. La opción simple (5 min)

> "La forma más fácil: un archivo PROGRESO.md que Claude actualiza.
>
> ```markdown
> # Progreso del Curso
>
> ## Estado actual
> Última lección: Lección 3
>
> ## Lecciones
> - [x] Lección 1
> - [x] Lección 2
> - [x] Lección 3
> - [ ] Lección 4
> - [ ] Lección 5
>
> ## Notas
> - Dudas sobre bucles
> ```"

### 3. Comando /progreso (5 min)

> "Crea `.claude/commands/progreso.md`:
>
> ```markdown
> ---
> description: 📊 Ver tu progreso
> ---
>
> # Ver Progreso
>
> ## Contexto para el tutor
> Lee PROGRESO.md y muéstralo de forma visual.
>
> ## Instrucciones
> 1. Lee PROGRESO.md
> 2. Cuenta lecciones completadas vs totales
> 3. Muestra barra de progreso:
>
> > '📊 Tu progreso: X/Y lecciones (Z%)
> > [██████░░░░░░] 50%
> > Siguiente: Lección X'
> ```"

### 4. Actualizar al completar (5 min)

> "En cada lección, añade al final:
>
> ```markdown
> ### Al completar
>
> Actualiza PROGRESO.md:
> - Marca esta lección como completada
> - Añade notas si el alumno tuvo dificultades
> ```"

### 5. Tu turno: Implementar progreso

> "Vamos a:
>
> 1. Crear PROGRESO.md con tus lecciones
> 2. Crear el comando /progreso
> 3. Modificar /iniciar para detectar alumno nuevo vs existente
>
> ¿Empezamos?"

Guía paso a paso.

### 6. Bonus: Gamificación simple

> "Opcional: Añade logros simples:
>
> ```markdown
> ## Logros
> - 🌟 Primera línea: Escribiste tu primer código
> - 🔥 En racha: 3 lecciones en un día
> - 🏆 Graduado: Terminaste el curso
> ```"

### 7. Transición

> "¡Genial! Tu curso ya trackea progreso. Ahora vamos a crear una web profesional para que los alumnos te encuentren.
>
> Escribe `/modulo-4` para continuar."
