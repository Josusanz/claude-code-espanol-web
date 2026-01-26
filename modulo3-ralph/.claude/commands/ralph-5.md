---
description: 🔄 Ralph Loop - Lección 5: Fase 2 - El Plan
---

# Lección 3.5: Fase 2 - El Plan

## Contexto para el tutor

Enseñar a convertir specs en tareas atómicas ejecutables.

## Estructura de la lección

### 1. De Specs a Tareas (3 min)

> "Ya tienes specs claras. Ahora necesitas convertirlas en **tareas atómicas** que Claude pueda ejecutar una por una.
>
> La clave: **cada tarea debe ser completable en UNA iteración** (típicamente 15-45 minutos)."

### 2. ¿Qué es una tarea atómica? (5 min)

> "Una tarea atómica tiene estas características:
>
> ✅ **Atómica:**
> - Tiene un objetivo único y claro
> - Se puede verificar si está completa
> - No depende de tareas pendientes
> - Cabe en una iteración
>
> ❌ **No Atómica:**
> - 'Implementar el backend'
> - 'Hacer que funcione'
> - Depende de algo no hecho"

Muestra ejemplos:

| ❌ No Atómica | ✅ Atómica |
|--------------|-----------|
| Crear sistema de auth | Crear modelo User en Prisma |
| Implementar API | Crear endpoint GET /posts |
| Añadir tests | Escribir test para createUser() |

### 3. Técnica de descomposición (5 min)

> "Si una tarea parece grande, descomponla:"

```
"Implementar autenticación"
         │
         ▼
┌────────────────────────────────┐
│ 1. Crear modelo User           │
│ 2. Endpoint de registro        │
│ 3. Endpoint de login           │
│ 4. Generación de JWT           │
│ 5. Middleware de verificación  │
│ 6. Tests de auth               │
└────────────────────────────────┘
```

### 4. Estructura del PLAN.md (8 min)

> "Usa esta estructura:"

```markdown
# PLAN.md

## 📊 Estado del Proyecto
- Inicio: [fecha]
- Progreso estimado: X%

## ✅ Completadas
- [x] Tarea completada 1
- [x] Tarea completada 2

## 🔄 En Progreso
- [ ] Tarea actual

## 📋 Pendientes

### Fase: Setup
- [ ] Inicializar proyecto
- [ ] Configurar TypeScript

### Fase: Base de Datos
- [ ] Configurar Prisma
- [ ] Crear modelo User
- [ ] Crear modelo Post

### Fase: Auth
- [ ] Endpoint registro
- [ ] Endpoint login
- [ ] Middleware auth

### Fase: API
- [ ] GET /posts
- [ ] POST /posts
- [ ] PUT /posts/:id
- [ ] DELETE /posts/:id

## 🚫 Bloqueados
(ninguno)

## 📝 Notas
- [Notas importantes]
```

### 5. El orden importa (3 min)

> "Organiza las tareas para minimizar dependencias:
>
> ```
> ✅ CORRECTO                      ❌ INCORRECTO
> 1. Crear modelo User             1. Crear endpoint /posts
> 2. Endpoint registro             2. Crear middleware auth
> 3. Endpoint login                3. Crear modelo User
> 4. Middleware auth               4. Crear endpoint login
> 5. Endpoints protegidos          5. Crear endpoint registro
> ```
>
> En el orden correcto, cada tarea puede completarse sin depender de algo pendiente."

### 6. Crear plan con Claude (5 min)

> "Pro tip: Usa Claude para generar el plan inicial, luego revísalo."

Prompt sugerido:

```
Tengo estas specs para un proyecto:
[pegar PROMPT_build.md]

Genera un PLAN.md con tareas atómicas, organizadas por fases.
Cada tarea debe:
1. Ser completable en 15-45 minutos
2. Tener un criterio de verificación claro
3. No depender de tareas pendientes
```

### 7. Checklist de verificación

> "Antes de lanzar Ralph, verifica tu plan:
>
> - [ ] ¿Cada tarea tiene un objetivo único?
> - [ ] ¿El orden minimiza dependencias?
> - [ ] ¿Hay suficiente detalle para ejecutar sin preguntas?
> - [ ] ¿Los criterios de 'completado' son claros?
> - [ ] ¿Hay fases lógicas?"

### 8. Transición

> "Ya tienes specs y plan. ¡Es hora de ejecutar!
>
> Escribe `/ralph-6` para la Fase 3: Ejecutar."
