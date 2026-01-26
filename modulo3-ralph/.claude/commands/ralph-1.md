---
description: 🔄 Ralph Loop - Lección 1: ¿Qué es Ralph Loop?
---

# Lección 3.1: ¿Qué es Ralph Loop?

## Contexto para el tutor

Primera lección del módulo. Establecer el concepto fundamental y mostrar el valor del sistema.

## Estructura de la lección

### 1. El problema (3 min)

> "Cuando trabajas con Claude en proyectos grandes, notas algo:
>
> - Las **primeras horas** son increíbles - Claude entiende todo
> - **Después de 2-3 horas** empieza a olvidar contexto
> - En **sesiones muy largas** puede ignorar instrucciones
>
> Esto se llama **Context Rot** - la degradación del contexto."

### 2. La solución tradicional vs Ralph (3 min)

> "**Lo que muchos hacen:**
> - Repetir instrucciones constantemente
> - Copiar/pegar contexto importante
> - Empezar sesiones nuevas manualmente
>
> **Problema:** Pierdes tiempo y el flujo se interrumpe.
>
> **La solución Ralph:**
> En vez de luchar contra el Context Rot, lo **aprovechamos**:
> 1. Claude trabaja en una tarea específica
> 2. Guarda su progreso en archivos
> 3. Se **reinicia** con contexto fresco
> 4. Lee el progreso y continúa"

### 3. Demostración conceptual (5 min)

Dibuja el diagrama:

```
┌─────────────────────────────────────────────────────┐
│                    RALPH LOOP                        │
│                                                      │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐         │
│   │  SPECS  │───▶│  PLAN   │───▶│ EXECUTE │─────┐   │
│   │   .md   │    │   .md   │    │         │     │   │
│   └─────────┘    └─────────┘    └─────────┘     │   │
│                                                  │   │
│   ┌─────────────────────────────────────────┐   │   │
│   │              PROGRESS.md                 │◀──┘   │
│   │  (Aprendizajes persistentes)            │       │
│   └─────────────────────────────────────────┘       │
│                        │                             │
│                        ▼                             │
│              ┌─────────────────┐                    │
│              │   REINICIAR     │────────────────────│
│              │   (loop.sh)     │                    │
│              └─────────────────┘                    │
└─────────────────────────────────────────────────────┘
```

> "El truco está en que la **información persiste en archivos**, no en la memoria de Claude. Cada iteración empieza fresca pero con todo el contexto necesario."

### 4. Casos de uso ideales (3 min)

> "Ralph es perfecto para:
>
> ✅ **MVPs y prototipos** - Construir apps mientras duermes
> ✅ **Migraciones** - Refactorizar cientos de archivos
> ✅ **Tests** - Generar tests para codebases existentes
> ✅ **Documentación** - Documentar proyectos automáticamente
>
> **No es ideal para:**
> ❌ Tareas que requieren creatividad continua
> ❌ Problemas sin definición clara
> ❌ Sistemas de producción críticos"

### 5. Concepto clave

> "💡 **El secreto de Ralph:**
>
> No es evitar el Context Rot. Es **diseñar sistemas que funcionan a pesar de él**.
>
> Piensa en Claude como un trabajador muy capaz pero con amnesia de corto plazo. Tu trabajo es darle notas claras que lea cada mañana."

### 6. Transición

> "En la siguiente lección profundizaremos en Context Rot: qué es exactamente y por qué ocurre.
>
> Escribe `/ralph-2` para continuar."
