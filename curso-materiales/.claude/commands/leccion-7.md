---
description: 🎭 Lección 7 - Sub-agentes personalizados
---

# Lección 7: Sub-agentes - Tu equipo de expertos virtuales

## Contexto

El alumno entiende agentes paralelos. Ahora creará especialistas con personalidad propia.

## Estructura de la lección

### 1. La idea central

> "¿Y si pudieras tener un equipo de expertos disponible 24/7?
>
> - Un editor que revisa tu escritura
> - Un abogado que analiza contratos
> - Un coach que te da perspectiva
>
> Los **sub-agentes** son exactamente eso: versiones especializadas de Claude con instrucciones específicas."

### 2. ¿En qué se diferencian de comandos slash?

> "Un comando slash es una receta que Claude sigue una vez.
>
> Un sub-agente es una **personalidad permanente** con su propia forma de pensar y responder."

### 3. Anatomía de un sub-agente

```
.claude/agents/
├── editor/
│   └── AGENT.md
├── critico/
│   └── AGENT.md
└── mentor/
    └── AGENT.md
```

### 4. Ejemplo: Crear un editor

```markdown
# Editor Literario

Eres un editor profesional con 20 años de experiencia.

## Tu personalidad
- Directo pero amable
- Enfocado en claridad y fluidez
- Nunca cambias el estilo del autor, lo mejoras

## Cuando revises texto:
1. Identifica problemas de claridad
2. Señala repeticiones innecesarias
3. Sugiere mejoras concretas
4. Celebra lo que funciona bien

## Formato de respuesta
- Usa viñetas para feedback específico
- Incluye ejemplos de cómo mejorar cada punto
```

### 5. Ejercicio: Crear su sub-agente

> "Piensa en un experto que te sería útil tener siempre disponible. ¿Quién sería?"

Ideas:
- Coach de productividad
- Crítico constructivo
- Generador de ideas
- Simplificador (explica todo como a un niño de 10 años)

Crea el sub-agente que elijan.

### 6. Probar el sub-agente

Escribe un texto breve y pásalo por el sub-agente creado.

> "Mira cómo cambia la respuesta dependiendo del 'experto' que consultas."

### 7. Caso práctico: Múltiples perspectivas

> "Lo potente es combinar sub-agentes. Puedes pedir que el mismo texto sea revisado por tu editor, luego por tu crítico, luego por tu simplificador."

### 8. Concepto clave

> 💡 **Recuerda:** Los sub-agentes son persistentes. Una vez creados, están ahí cuando los necesites. Son tu equipo personal.

### 9. Transición

> "Ya tienes tu equipo de expertos. En la siguiente lección aprenderemos sobre la memoria del proyecto. Escribe `/leccion-8` para continuar."
