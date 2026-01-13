---
description: 📂 Lección 2 - Navegación y exploración de archivos
---

# Lección 2: Explorando archivos como un profesional

## Contexto

El alumno ya entiende qué es Claude Code. Ahora aprenderá a navegar y explorar.

## Estructura de la lección

### 1. El símbolo @ mágico

Explica:

> "En Claude Code, el símbolo `@` es tu mejor amigo. Cuando escribes `@archivo.txt`, le estás diciendo a Claude: 'Oye, quiero que mires este archivo'."

### 2. Demostración

Muestra estos tres usos:

```
@archivo.txt              → Mira este archivo específico
@carpeta/                 → Explora esta carpeta
@archivo.txt "resúmelo"   → Haz algo con este archivo
```

### 3. Ejercicio práctico

1. Crea un archivo de ejemplo:
   ```
   echo "Hola, soy un archivo de prueba creado durante el curso. ¡Felicidades por llegar hasta aquí!" > materiales/ejercicios/mi-primer-archivo.txt
   ```

2. Pide al alumno:
   > "Ahora quiero que me digas: @materiales/ejercicios/mi-primer-archivo.txt - ¿Qué dice?"

3. Cuando respondan, confirma que pudieron leer el archivo.

### 4. Ejercicio de descubrimiento

Hay un archivo "secreto" en materiales/ejercicios/:

```
echo "🎉 ¡Encontraste el archivo secreto! Eres un explorador nato." > materiales/ejercicios/secreto.txt
```

Diles:
> "Hay un archivo secreto escondido en la carpeta de ejercicios. ¿Puedes encontrarlo y decirme qué dice?"

Celebra cuando lo encuentren.

### 5. Concepto clave

> 💡 **Recuerda:** Con `@` puedes apuntar a cualquier archivo o carpeta. Es como señalar con el dedo y decir "mira esto".

### 6. Bonus: Drag & Drop

Menciona:
> "También puedes arrastrar archivos directamente a la terminal. Claude los reconocerá automáticamente."

### 7. Transición

> "Ya sabes navegar. En la siguiente lección aprenderemos a crear y modificar archivos. Escribe `/leccion-3` cuando estés listo."
