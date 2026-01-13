# 📋 Guía Rápida de Claude Code

## Comandos básicos de terminal

| Comando | Qué hace | Ejemplo |
|---------|----------|---------|
| `ls` | Lista archivos | `ls materiales/` |
| `cd` | Cambia de carpeta | `cd materiales` |
| `pwd` | Muestra ubicación actual | `pwd` |
| `cat` | Muestra contenido de archivo | `cat archivo.txt` |

## Símbolos especiales en Claude Code

| Símbolo | Uso | Ejemplo |
|---------|-----|---------|
| `@` | Referenciar archivo | `@documento.pdf` |
| `/` | Ejecutar comando slash | `/ayuda` |
| `$ARGUMENTS` | Parámetros en comandos | `Traduce: $ARGUMENTS` |

## Atajos de teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl+C` | Cancelar operación |
| `Tab` | Autocompletar |
| `↑ / ↓` | Navegar historial |
| `Ctrl+L` | Limpiar pantalla |

## Estructura de archivos típica

```
mi-proyecto/
├── CLAUDE.md           # Contexto del proyecto
├── .claude/
│   ├── commands/       # Tus comandos personalizados
│   └── agents/         # Tus sub-agentes
├── src/                # Tu código (si aplica)
└── docs/               # Documentación
```

## Plantilla básica de CLAUDE.md

```markdown
# Mi Proyecto

## Descripción
[Qué hace este proyecto]

## Contexto
[Información importante que Claude debe saber]

## Reglas
- [Hacer siempre...]
- [Evitar...]

## Preferencias
- Idioma: Español
- Tono: [formal/informal]
```

## Plantilla de comando slash

```markdown
---
description: Breve descripción del comando
---

Instrucciones para Claude sobre qué hacer.

Si hay argumentos: $ARGUMENTS
```

## Recursos útiles

- [Documentación oficial](https://docs.claude.com)
- [Comunidad de Claude](https://claude.ai/community)

---

*Guía creada para el curso Claude Code en Español*
