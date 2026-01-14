# Módulo 3: Sistema de Progreso

Tus alumnos necesitan saber dónde están y cuánto les falta. Un buen sistema de progreso aumenta la retención.

## Opciones de implementación

### Opción 1: Archivo de progreso (Simple)

Crea un archivo `progreso.json` que Claude actualiza:

```json
{
  "leccionesCompletadas": ["leccion-1", "leccion-2"],
  "leccionActual": "leccion-3",
  "porcentaje": 25
}
```

### Opción 2: Comando /progreso (Recomendado)

Crea `.claude/commands/progreso.md`:

```markdown
# Comando Progreso

Lee el archivo progreso.json y muestra:
- Lecciones completadas con checkmark
- Lección actual destacada
- Lecciones pendientes
- Barra de progreso visual
```

### Opción 3: Progreso en CLAUDE.md

Añade una sección que Claude actualiza manualmente.

## Diseño visual sugerido

```
Tu progreso: ████████░░░░░░░░ 50%

✅ Lección 1 - Introducción
✅ Lección 2 - Conceptos básicos
📍 Lección 3 - Práctica (actual)
⬚ Lección 4 - Avanzado
⬚ Lección 5 - Proyecto final
```

## Ejercicio práctico

1. Decide qué método usarás
2. Crea el comando `/progreso` para tu curso
3. Define qué información mostrar
4. Pruébalo con datos de ejemplo

## Siguiente paso

Ejecuta `/modulo-4` para aprender a crear la web automática.
