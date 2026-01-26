# 🔄 Ralph Loop - Templates

Templates del sistema Ralph Loop para Claude Code en piloto automático.

## 📁 Archivos Incluidos

| Archivo | Descripción |
|---------|-------------|
| `loop.sh` | Script principal que ejecuta el loop |
| `PROMPT_build.md` | Template de instrucciones para Claude |
| `PLAN.md` | Template de lista de tareas |
| `PROGRESS.md` | Template de memoria persistente |

## 🚀 Cómo Usar

### 1. Copia los archivos a tu proyecto

```bash
cp -r templates/* mi-proyecto/
cd mi-proyecto
```

### 2. Personaliza los archivos

1. **PROMPT_build.md**: Ajusta según tu proyecto
   - Describe tu proyecto
   - Define el stack técnico
   - Establece convenciones

2. **PLAN.md**: Crea tus tareas
   - Descompón en tareas atómicas
   - Ordena por dependencias
   - Agrupa en fases

3. **PROGRESS.md**: Déjalo casi vacío
   - Se llenará durante la ejecución

### 3. Ejecuta Ralph

```bash
chmod +x loop.sh
./loop.sh
```

### 4. Monitorea

En otra terminal:

```bash
# Ver progreso
watch -n 30 "cat PLAN.md | grep -E '\[.\]'"

# Ver log
tail -f ralph_log_*.txt
```

## ⚙️ Configuración

Variables de entorno para `loop.sh`:

```bash
# Limitar iteraciones (0 = infinito)
MAX_ITERATIONS=10 ./loop.sh

# Cambiar pausa entre iteraciones
PAUSE_SECONDS=30 ./loop.sh
```

## 📖 Aprende Más

Este template es parte del **Módulo 3: Ralph Loop** del curso Claude Code en Español.

[Ver curso completo →](https://claude-code-espanol.com/ralph)

---

*Claude Code en Español - Ralph Loop Templates v1.0*
