---
description: 🔍 Investigación - Lección 2: Informe Completo
---

# Proyecto Investigación - Lección 2

## Contexto para el tutor

El alumno ya sabe investigar con Claude. Ahora va a crear un informe de investigación completo y profesional.

## Estructura de la lección

### 1. El proyecto final (2 min)

> "Vamos a crear un **informe de investigación profesional**. El tipo de documento que se presenta en una empresa o para tomar una decisión importante.
>
> Incluirá:
> - Resumen ejecutivo
> - Análisis detallado
> - Comparación de opciones
> - Recomendación final
> - Fuentes y metodología"

### 2. Elegir el tema (5 min)

Pregunta al alumno:

> "¿Sobre qué quieres hacer tu informe? Algunas ideas:
>
> 💻 **Tecnología** - Mejor laptop para programar, mejor hosting
> 📱 **Apps** - Comparar herramientas de productividad
> 💼 **Negocio** - Análisis de una idea de negocio
> 🎓 **Educación** - Comparar cursos o bootcamps
> 🏠 **Decisión personal** - Cualquier decisión que tengas pendiente
>
> ¿Qué tema te interesa?"

### 3. Estructurar la investigación (5 min)

Una vez elegido el tema:

> "Perfecto. Vamos a estructurar tu investigación. Necesito que definas:
>
> 1. **Objetivo**: ¿Qué decisión quieres tomar?
> 2. **Opciones**: ¿Qué alternativas estás considerando? (mínimo 3)
> 3. **Criterios**: ¿Qué factores son importantes? (mínimo 4)
> 4. **Contexto**: ¿Alguna restricción? (presupuesto, tiempo, etc.)"

### 4. Generar el informe (15 min)

Crea el informe en un archivo Markdown:

```bash
# Crear el archivo del informe
touch mis-investigaciones/informe-[tema].md
```

Genera cada sección del informe:

**Sección 1: Resumen Ejecutivo**
> "Primero, el resumen ejecutivo. Es lo más importante: en 3-4 párrafos debe explicar el problema, las opciones y la recomendación."

**Sección 2: Metodología**
> "Explicamos cómo se hizo el análisis y qué criterios se usaron."

**Sección 3: Análisis de Opciones**
> "Análisis detallado de cada opción, con pros y contras."

**Sección 4: Comparación**
> "Tabla comparativa según los criterios definidos."

**Sección 5: Recomendación**
> "La recomendación final con justificación clara."

### 5. Revisar y mejorar

> "Vamos a revisar el informe. ¿Hay algo que quieras:
> - Profundizar más
> - Añadir más opciones
> - Cambiar algún criterio
> - Mejorar la redacción"

### 6. Exportar (opcional)

> "Si quieres compartir el informe, puedes convertirlo a PDF."

```bash
# Si tienes pandoc instalado:
pandoc mis-investigaciones/informe-[tema].md -o informe.pdf
```

### 7. Celebrar el logro

> "🎉 ¡FELICIDADES! Has creado un informe de investigación profesional.
>
> Resumen de lo que lograste:
> ✅ Definiste objetivos y criterios claros
> ✅ Analizaste múltiples opciones
> ✅ Creaste un documento estructurado
> ✅ Tienes una recomendación fundamentada
>
> Este proceso lo puedes aplicar a cualquier decisión importante."

### 8. Siguiente proyecto

> "¿Listo para el último proyecto del módulo?
>
> - `/datos-1` - Analiza datos con IA
>
> O escribe `/progreso-m2` para ver tu avance."
