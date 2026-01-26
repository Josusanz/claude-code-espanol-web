---
description: 🔄 Ralph Loop - Lección 3: Anatomía de un Loop
---

# Lección 3.3: Anatomía de un Loop

## Contexto para el tutor

Enseñar los 4 archivos fundamentales del sistema Ralph. Esta es la lección más técnica del módulo.

## Estructura de la lección

### 1. Los 4 archivos clave (2 min)

> "Todo sistema Ralph necesita exactamente 4 archivos:
>
> ```
> mi-proyecto/
> ├── loop.sh          # El script que reinicia Claude
> ├── PROMPT_build.md  # Las instrucciones para Claude
> ├── PLAN.md          # La lista de tareas
> └── PROGRESS.md      # Los aprendizajes acumulados
> ```
>
> Vamos a ver cada uno en detalle."

### 2. loop.sh - El Orquestador (5 min)

> "Este script es el corazón del sistema. Reinicia Claude indefinidamente."

Crea el archivo:

```bash
cat > loop.sh << 'EOF'
#!/bin/bash

# RALPH LOOP
ITERATION=1

echo "🔄 RALPH LOOP INICIADO"
echo "Presiona Ctrl+C para detener"

while true; do
    echo ""
    echo "───────────────────────────────"
    echo "📍 ITERACIÓN #$ITERATION"
    echo "⏰ $(date)"
    echo "───────────────────────────────"

    # Ejecutar Claude
    claude -p "$(cat PROMPT_build.md)"

    ITERATION=$((ITERATION + 1))

    echo ""
    echo "⏳ Siguiente iteración en 10 segundos..."
    sleep 10
done
EOF
chmod +x loop.sh
```

### 3. PROMPT_build.md - Las Instrucciones (8 min)

> "Este archivo contiene TODO lo que Claude necesita saber. Se lee al inicio de cada iteración."

Explica la estructura:

```markdown
# PROMPT_build.md

## Tu Rol
Eres un desarrollador senior trabajando en [proyecto].

## El Proyecto
[Descripción breve]

## Stack Técnico
- Lenguaje: [X]
- Framework: [Y]

## Convenciones
- [Lista de convenciones]

## Flujo de Trabajo
1. Lee PLAN.md para ver tareas pendientes
2. Ejecuta UNA tarea a la vez
3. Marca la tarea como completada
4. Actualiza PROGRESS.md si aprendes algo
5. Termina la sesión
```

> "💡 Este archivo es tu **contrato** con Claude. Cuanto más específico, mejores resultados."

### 4. PLAN.md - La Lista de Tareas (5 min)

> "El archivo que Claude lee y modifica para saber qué hacer."

```markdown
# PLAN.md

## ✅ Completadas
- [x] Configurar proyecto
- [x] Instalar dependencias

## 🔄 En Progreso
- [ ] Crear modelo User

## 📋 Pendientes
- [ ] Crear endpoint login
- [ ] Crear middleware auth
- [ ] Escribir tests
```

> "Reglas del PLAN.md:
> - **Tareas atómicas** - Completables en una iteración
> - **Orden lógico** - Dependencias primero
> - **Checkboxes** - `[x]` completado, `[ ]` pendiente"

### 5. PROGRESS.md - La Memoria (5 min)

> "Aquí Claude guarda lo que aprende. Crucial para no repetir errores."

```markdown
# PROGRESS.md

## Decisiones de Arquitectura
- Usamos PostgreSQL por las relaciones

## Bugs Encontrados y Solucionados
- Puerto 3000 ocupado -> cambiado a 3001

## Convenciones Establecidas
- Archivos en kebab-case
- Funciones en camelCase
```

> "Por qué es importante:
> - **Evita repetir errores**
> - **Mantiene consistencia**
> - **Acelera iteraciones**"

### 6. El flujo completo

Dibuja el diagrama:

```
loop.sh ejecuta ──▶ Claude inicia con PROMPT_build.md
                           │
                           ▼
                 Lee PLAN.md para tareas
                           │
                           ▼
                Lee PROGRESS.md para contexto
                           │
                           ▼
                   Ejecuta UNA tarea
                           │
                           ▼
           Actualiza PLAN.md (marca completada)
                           │
                           ▼
        Actualiza PROGRESS.md (si aprendió algo)
                           │
                           ▼
                   Termina la sesión
                           │
                           ▼
              loop.sh reinicia ◀────────────┘
```

### 7. Ejercicio práctico

> "Vamos a crear la estructura básica. Crea una carpeta para tu proyecto Ralph:"

```bash
mkdir mi-proyecto-ralph
cd mi-proyecto-ralph
```

Crea los 4 archivos vacíos:

```bash
touch loop.sh PROMPT_build.md PLAN.md PROGRESS.md
```

### 8. Transición

> "Ya tienes la estructura. En las siguientes lecciones aprenderás a llenar cada archivo correctamente.
>
> Escribe `/ralph-4` para aprender a crear Specs efectivas."
