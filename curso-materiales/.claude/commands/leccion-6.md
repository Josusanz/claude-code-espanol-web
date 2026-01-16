---
description: 🤖 Lección 6 - Agentes paralelos
---

# Lección 6: Agentes paralelos - Multiplica tu productividad

## Contexto

El alumno domina lo básico. Ahora descubrirá cómo hacer varias tareas a la vez.

## Estructura de la lección

### 1. El concepto

> "Imagina que pudieras clonar a Claude. Un Claude trabaja en tu documento, otro busca información, otro revisa errores... todos al mismo tiempo.
>
> Eso son los **agentes paralelos**."

### 2. ¿Cuándo usarlos?

Ejemplos prácticos:
- Procesar múltiples archivos a la vez
- Investigar varios temas simultáneamente
- Generar diferentes versiones de un contenido
- Dividir una tarea grande en subtareas

### 3. Demostración conceptual

> "Digamos que tienes 5 documentos y quieres un resumen de cada uno. Sin agentes, tendrías que hacerlo uno por uno. Con agentes paralelos, los 5 se procesan a la vez."

### 4. Ejercicio práctico

Primero, crea varios archivos:
```bash
echo "El marketing digital revoluciona cómo las empresas llegan a sus clientes." > materiales/ejercicios/doc1.txt
echo "La inteligencia artificial está transformando la medicina moderna." > materiales/ejercicios/doc2.txt
echo "El trabajo remoto ha cambiado la cultura empresarial para siempre." > materiales/ejercicios/doc3.txt
```

Luego pide al alumno:
> "Dime: 'Quiero un resumen de una línea para cada documento en la carpeta ejercicios'"

Procesa los tres archivos y muestra los resultados.

### 5. El poder real

> "Esto escala. ¿Tienes 50 archivos? 100? Claude puede manejarlos. El límite es tu imaginación (y algo de paciencia)."

### 6. Casos de uso reales

Comparte ejemplos:
- "Tengo 20 currículums y necesito identificar los 5 mejores candidatos"
- "Tengo fotos de una carpeta y quiero renombrarlas por fecha"
- "Tengo varios capítulos de un libro y quiero un índice"

### 7. Concepto clave

> 💡 **Recuerda:** No tienes que gestionar los agentes manualmente. Solo describe la tarea y Claude decidirá si tiene sentido paralelizar.

### 8. Limitación importante

> ⚠️ "Los agentes paralelos no comparten contexto entre sí. Cada uno trabaja de forma independiente. Si necesitas que colaboren, usa sub-agentes (siguiente lección)."

### 9. Transición

> "Ya sabes multiplicar a Claude. Pero ¿y si quisieras que diferentes Claudes tuvieran diferentes personalidades? Eso lo veremos en `/leccion-7`."
