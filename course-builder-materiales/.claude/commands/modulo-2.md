---
description: 📝 Módulo 2: CLAUDE.md Efectivo
---

# Módulo 2: CLAUDE.md Efectivo

## Contexto para el tutor

Enseñar a configurar el archivo CLAUDE.md para crear un tutor IA efectivo.

## Estructura del módulo

### 1. Concepto (3 min)

> "CLAUDE.md es el 'manual de instrucciones' para Claude. Define:
>
> - La personalidad del tutor
> - El contexto del curso
> - Las reglas de enseñanza
> - Los comandos disponibles
>
> Claude lee este archivo automáticamente al iniciar."

### 2. Dónde va (2 min)

> "En la raíz de tu proyecto:
>
> ```
> mi-curso/
> ├── CLAUDE.md           # ← Aquí
> ├── .claude/
> │   └── commands/
> └── materiales/
> ```"

### 3. Estructura recomendada (10 min)

Muestra el template:

```markdown
# [Nombre del Curso]

## Sobre este curso
[Descripción, nivel, duración]

## Estructura del curso
[Lista de lecciones]

## Comandos disponibles
| Comando | Descripción |
|---------|-------------|
| /iniciar | ... |

## Instrucciones para Claude

### Filosofía de enseñanza
[Cómo debe enseñar]

### Tono de comunicación
[Cómo debe comunicarse]

### Reglas importantes
[Lo que debe/no debe hacer]
```

### 4. La sección crítica (5 min)

> "La parte más importante es **Instrucciones para Claude**. Aquí defines:
>
> **Filosofía:** 'Aprender haciendo, sin jerga innecesaria'
>
> **Tono:** 'Amigable pero profesional, usa tú'
>
> **Reglas:** 'NUNCA asumas conocimiento previo sin preguntar'
>
> Sé específico. 'Sé amable' es vago. 'Felicita cada ejercicio completado' es específico."

### 5. Tu turno: Crear CLAUDE.md

> "Ahora crea el CLAUDE.md para tu curso.
>
> Incluye:
> 1. Descripción del curso
> 2. Lista de lecciones (aunque estén vacías)
> 3. Tabla de comandos
> 4. Al menos 3 reglas específicas para el tutor
>
> ¿Lo hacemos juntos?"

Guía al alumno. Usa su tema si lo tiene.

### 6. Probar el resultado

> "Vamos a probar. Reinicia Claude (o escribe `/init`) y pídele que te dé una lección.
>
> ¿Se comporta como esperas? Si no, ajustamos las instrucciones."

### 7. Transición

> "¡Perfecto! Ya tienes el tutor configurado. Ahora necesitamos que trackee el progreso de los alumnos.
>
> Escribe `/modulo-3` para continuar."
