# Módulo 1: Arquitectura de Comandos Slash

Bienvenido al primer módulo. Aquí aprenderás a diseñar la estructura de comandos para tu curso.

## Conceptos clave

### 1. Que es un comando slash

Un comando slash es un archivo `.md` en `.claude/commands/` que Claude ejecuta cuando el usuario escribe `/nombre-comando`.

### 2. Estructura de un comando

```markdown
# Título del comando

Instrucciones para Claude sobre qué hacer cuando se ejecuta este comando.

## Secciones opcionales

- Objetivos de aprendizaje
- Contenido a mostrar
- Ejercicios prácticos
- Siguiente paso sugerido
```

### 3. Nomenclatura recomendada

- `leccion-1.md`, `leccion-2.md` - Para lecciones secuenciales
- `modulo-1.md`, `modulo-2.md` - Para módulos más largos
- `ejercicio-nombre.md` - Para prácticas específicas
- `ayuda.md` - Comando de ayuda general
- `progreso.md` - Para mostrar avance del alumno

## Ejercicio práctico

Crea tu primer comando. En la carpeta `templates/` encontrarás `comando-template.md`.

1. Copia el template a `.claude/commands/`
2. Renómbralo como `mi-primer-comando.md`
3. Personaliza el contenido
4. Pruébalo ejecutando `/mi-primer-comando`

## Siguiente paso

Cuando termines, ejecuta `/modulo-2` para aprender sobre CLAUDE.md.
