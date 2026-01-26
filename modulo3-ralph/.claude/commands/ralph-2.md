---
description: 🔄 Ralph Loop - Lección 2: Context Rot
---

# Lección 3.2: Context Rot

## Contexto para el tutor

Profundizar en el problema que Ralph resuelve. Entender Context Rot es clave para diseñar buenos sistemas.

## Estructura de la lección

### 1. Definición técnica (3 min)

> "**Context Rot** es el fenómeno donde Claude pierde efectividad a medida que la conversación se hace más larga.
>
> Imagina que tienes una pizarra. Al principio escribes con claridad. Pero cada vez que añades información, el espacio se reduce. Eventualmente, empiezas a borrar cosas antiguas.
>
> Eso es exactamente lo que pasa con el contexto de Claude."

### 2. Los síntomas (5 min)

> "¿Cómo sabes que estás experimentando Context Rot?
>
> 🔴 **Olvida instrucciones iniciales**
> Le dijiste 'usa TypeScript' al inicio, pero ahora genera JavaScript
>
> 🟠 **Repite errores corregidos**
> Corregiste un bug hace 10 mensajes, pero lo vuelve a introducir
>
> 🟡 **Pierde consistencia**
> Usaba un patrón específico y ahora usa otro diferente
>
> 🟣 **Respuestas más cortas**
> Las explicaciones se vuelven superficiales"

### 3. Por qué ocurre técnicamente (5 min)

> "El modelo tiene una **ventana de contexto** - un límite de tokens que puede procesar.
>
> ```
> ┌─────────────────────────────────────────────────────────────┐
> │                    VENTANA DE CONTEXTO                       │
> │  ┌─────────────────────────────────────────────────────────┐ │
> │  │ Sistema │ Historial │ Archivo1 │ Archivo2 │ ... │ Nuevo │ │
> │  └─────────────────────────────────────────────────────────┘ │
> │                                                              │
> │  Con el tiempo:                                              │
> │  ┌─────────────────────────────────────────────────────────┐ │
> │  │ Comprimido │ Comprimido │ ... │ Reciente │ Reciente │New│ │
> │  └─────────────────────────────────────────────────────────┘ │
> │                    ▲                                         │
> │                    │                                         │
> │           Lo antiguo se 'olvida'                            │
> └─────────────────────────────────────────────────────────────┘
> ```
>
> Cuando excedes el límite:
> 1. El contenido antiguo se **comprime** o **descarta**
> 2. Las instrucciones iniciales pierden peso
> 3. El contexto reciente domina las decisiones"

### 4. El ciclo óptimo (3 min)

> "Basado en experimentación:
>
> | Fase | Duración | Estado |
> |------|----------|--------|
> | Contexto fresco | 0-15 min | Óptimo |
> | Productivo | 15-45 min | Bueno |
> | Degradación leve | 45-90 min | Aceptable |
> | Degradación notable | 90+ min | Problemático |
>
> **Recomendación:** Reinicia cada 30-60 minutos o después de completar una tarea significativa."

### 5. Métricas para detectar degradación

> "Señales de que es hora de reiniciar:
>
> 1. Claude pide clarificaciones que ya diste
> 2. El código ignora convenciones establecidas
> 3. Las respuestas se vuelven genéricas
> 4. Los errores corregidos reaparecen
>
> Cuando notes 2 o más de estos síntomas: **reinicia**."

### 6. Concepto clave

> "💡 **Context Rot no es un bug, es una característica del modelo.**
>
> No puedes evitarlo, pero puedes **diseñar para él**. Ralph es exactamente eso: un sistema diseñado para funcionar a pesar del Context Rot."

### 7. Transición

> "Ahora que entiendes el problema, veamos la solución en detalle.
>
> Escribe `/ralph-3` para aprender la anatomía de un Loop."
