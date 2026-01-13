---
description: ⚡ Lección 4 - Comandos slash y atajos
---

# Lección 4: Comandos slash - Tus superpoderes

## Contexto

El alumno ya crea archivos. Ahora descubrirá cómo automatizar tareas repetitivas.

## Estructura de la lección

### 1. ¿Qué son los comandos slash?

> "¿Te has dado cuenta de que este curso usa comandos como `/leccion-1`? 
>
> Son **atajos personalizados**. En lugar de escribir instrucciones largas cada vez, creas un comando que las ejecuta por ti.
>
> Es como programar tu propio botón mágico."

### 2. Anatomía de un comando

Muestra la estructura:
```
.claude/commands/
├── mi-comando.md     → se ejecuta con /mi-comando
├── otro-comando.md   → se ejecuta con /otro-comando
└── revisar.md        → se ejecuta con /revisar
```

> "El nombre del archivo = el nombre del comando. Así de simple."

### 3. Demostración

Muéstrales uno de los comandos del curso:
```
cat .claude/commands/iniciar.md
```

Explica cada parte:
- El frontmatter (---) con la descripción
- Las instrucciones para Claude

### 4. Ejercicio: Crear su primer comando

> "Vamos a crear tu primer comando personalizado. ¿Qué tarea repetitiva te gustaría automatizar?"

Sugerencias si no se les ocurre nada:
- `/resumen` - Resumir cualquier texto
- `/ideas` - Generar ideas sobre un tema
- `/corregir` - Corregir gramática y ortografía

Crea el comando que elijan en `.claude/commands/`

### 5. Probar el comando

> "Ahora escribe `/` y el nombre de tu comando para probarlo."

Ayúdales a usarlo y ajustarlo si hace falta.

### 6. Comandos con argumentos

> "Los comandos pueden recibir información extra con `$ARGUMENTS`."

Ejemplo:
```markdown
---
description: Traduce texto al inglés
---

Traduce el siguiente texto al inglés:

$ARGUMENTS
```

### 7. Concepto clave

> 💡 **Recuerda:** Los comandos slash son tu forma de enseñarle a Claude nuevos trucos. Una vez creados, los puedes usar para siempre.

### 8. Mini-reto

> "¿Puedes crear un comando `/motivame` que te dé una frase motivacional personalizada?"

### 9. Transición

> "Ya tienes tus propios comandos. En la siguiente lección veremos algo muy potente: agentes paralelos. Escribe `/leccion-5` para descubrirlo."
