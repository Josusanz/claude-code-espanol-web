---
description: 🔄 Ralph Loop - Lección 6: Fase 3 - Ejecutar
---

# Lección 3.6: Fase 3 - Ejecutar

## Contexto para el tutor

El momento de lanzar Ralph. Enseñar monitoreo e intervención.

## Estructura de la lección

### 1. Preparación final (3 min)

> "Antes de lanzar, verifica:
>
> ✅ `loop.sh` tiene permisos de ejecución
> ✅ `PROMPT_build.md` está completo
> ✅ `PLAN.md` tiene tareas listas
> ✅ `PROGRESS.md` existe (puede estar vacío)
> ✅ Estás en el directorio correcto"

### 2. Lanzar Ralph (5 min)

> "Es el momento. Ejecuta:"

```bash
./loop.sh
```

> "Verás algo como esto:
>
> ```
> 🔄 RALPH LOOP INICIADO
> Presiona Ctrl+C para detener
>
> ───────────────────────────────
> 📍 ITERACIÓN #1
> ⏰ Mon Jan 15 10:30:00 2024
> ───────────────────────────────
>
> [Claude comienza a trabajar...]
> ```"

### 3. Monitoreo en tiempo real (5 min)

> "Mientras Ralph trabaja, puedes monitorear en otra terminal:"

```bash
# Ver progreso del plan
cat PLAN.md | grep -E "\[.\]"

# Ver últimos cambios en archivos
ls -lt src/ | head -10

# Ver aprendizajes acumulados
cat PROGRESS.md

# Ver log en tiempo real (si lo configuraste)
tail -f ralph_log_*.txt
```

### 4. Cuándo intervenir (8 min)

> "**✅ Dejar que continúe:**
> - Las tareas se completan correctamente
> - Los tests pasan
> - PROGRESS.md se actualiza con información útil
>
> **⚠️ Revisar pero no detener:**
> - Una tarea tarda más de lo esperado
> - Claude añade notas en PROGRESS.md
> - Hay warnings pero no errores
>
> **🛑 Detener e intervenir:**
> - La misma tarea falla múltiples veces
> - Claude pide clarificación que no puede obtener
> - Los tests fallan repetidamente
> - Se detecta un error en las specs"

### 5. Intervención suave (5 min)

> "Si necesitas corregir algo sin detener Ralph:"

**Opción 1: Editar PROGRESS.md**
```markdown
## ⚠️ NOTA DEL OPERADOR (2024-01-15 15:30)
No usar console.log, usar el logger en /src/utils/logger.ts
```

**Opción 2: Editar PLAN.md**
- Reordenar tareas
- Clarificar descripciones
- Añadir tareas faltantes

> "Claude leerá estos cambios en la siguiente iteración."

### 6. Intervención fuerte (3 min)

> "Si necesitas detener Ralph:"

```bash
# Presiona Ctrl+C

# O desde otra terminal:
pkill -f "loop.sh"
```

> "Después de corregir el problema, reinicia:"

```bash
./loop.sh
```

### 7. Métricas de éxito

> "Al final de una sesión, evalúa:
>
> | Métrica | Objetivo |
> |---------|----------|
> | Tareas completadas | 80%+ del plan |
> | Tests pasando | 100% |
> | Intervenciones necesarias | < 3 |
> | Errores repetidos | 0 |"

### 8. Troubleshooting común

> "**Claude repite la misma tarea:**
> Verifica que PLAN.md se actualiza. Puede ser problema de permisos.
>
> **Las iteraciones son muy cortas:**
> Las tareas pueden ser demasiado simples. Agrúpalas.
>
> **Claude pide información que no tiene:**
> Tus specs no son suficientemente detalladas. Detén, mejora PROMPT_build.md, reinicia."

### 9. Transición

> "¡Excelente! Ya sabes ejecutar y monitorear Ralph. Es hora de aplicarlo a un proyecto real.
>
> Escribe `/ralph-7` para el Proyecto Práctico."
