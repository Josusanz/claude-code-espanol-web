# 🎓 Course Builder - Templates

Templates para crear cursos interactivos con Claude Code.

## 📁 Archivos Incluidos

| Archivo | Descripción |
|---------|-------------|
| `CLAUDE.md.template` | Template del archivo de configuración del tutor |
| `leccion.md.template` | Template para crear lecciones |
| `iniciar.md.template` | Template del comando /iniciar |
| `progreso.md.template` | Template del comando /progreso |
| `ayuda.md.template` | Template del comando /ayuda |
| `PROGRESO.md.template` | Template del archivo de tracking |

## 🚀 Cómo Usar

### 1. Copia la estructura base

```bash
mkdir mi-curso
cd mi-curso
mkdir -p .claude/commands
mkdir materiales
```

### 2. Copia y personaliza los templates

```bash
# Archivo principal
cp CLAUDE.md.template ../CLAUDE.md

# Comandos
cp iniciar.md.template ../.claude/commands/iniciar.md
cp progreso.md.template ../.claude/commands/progreso.md
cp ayuda.md.template ../.claude/commands/ayuda.md

# Lecciones (copia y renombra para cada lección)
cp leccion.md.template ../.claude/commands/leccion-1.md
cp leccion.md.template ../.claude/commands/leccion-2.md
# etc.

# Progreso
cp PROGRESO.md.template ../PROGRESO.md
```

### 3. Personaliza cada archivo

Busca y reemplaza:
- `[NOMBRE DEL CURSO]` → Tu curso
- `[Título]` → Títulos de lecciones
- `[Descripción]` → Descripciones
- `X` → Números de lección

### 4. Prueba tu curso

```bash
cd mi-curso
claude
# Escribe /iniciar
```

## 📝 Tips

1. **Empieza simple**: 3-5 lecciones son suficientes para validar
2. **Itera**: Prueba con alguien y ajusta según feedback
3. **Sé específico**: Las instrucciones vagas dan resultados vagos

## 📖 Aprende Más

Este template es parte de **Course Builder** del curso Claude Code en Español.

[Ver curso completo →](https://claude-code-espanol.com/course-builder)

---

*Course Builder Templates v1.0 - Claude Code en Español*
