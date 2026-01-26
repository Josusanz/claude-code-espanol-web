# 🔄 Ralph Setup para aprende.software

Este es tu setup de Ralph para construir automáticamente los Módulos 2 y 3 del curso.

## Archivos incluidos

| Archivo | Descripción |
|---------|-------------|
| `loop.sh` | El script que ejecuta Ralph en loop |
| `PROMPT_build.md` | Las instrucciones que Ralph sigue en cada iteración |
| `PLAN.md` | Las tareas a completar (27 tareas totales) |
| `PROGRESS.md` | Donde Ralph registra aprendizajes |
| `AGENTS.md` | Guía del proyecto para Ralph |

## Instalación

1. **Copia estos archivos a tu repo:**

```bash
# Desde la raíz de claude-code-espanol-web/
cp -r /ruta/a/ralph-setup/* .
```

2. **Haz ejecutable el loop:**

```bash
chmod +x loop.sh
```

3. **Verifica que tienes Claude Code instalado:**

```bash
claude --version
```

## Uso

### Opción A: Loop completo (autónomo)

```bash
./loop.sh
```

Ralph ejecutará todas las tareas una por una. Puedes dejarlo corriendo y hacer otra cosa.

### Opción B: Una iteración manual

```bash
claude --dangerously-skip-permissions -p "$(cat PROMPT_build.md)"
```

Esto ejecuta UNA sola tarea. Útil para probar o cuando quieres más control.

## Monitorear el progreso

- Revisa `PLAN.md` para ver qué tareas están completadas `[x]`
- Revisa `git log --oneline` para ver los commits de Ralph
- Revisa `PROGRESS.md` para ver qué ha aprendido Ralph

## Si algo sale mal

1. **Ralph se atasca en una tarea:**
   - Revisa `PLAN.md`, la tarea estará marcada como `[BLOCKED]`
   - Puedes arreglarla manualmente y volver a correr Ralph

2. **Error de build:**
   - Ralph debería detectarlo y arreglarlo
   - Si no, haz `npm run build` manualmente y corrige

3. **Quieres pausar:**
   - `Ctrl+C` para detener el loop
   - El progreso se guarda en commits de git

## Seguridad

⚠️ **`--dangerously-skip-permissions`** da acceso completo a Claude.

Para proyectos sensibles, considera:
- Ejecutar en una VM o Docker
- No tener credenciales en el repo
- Revisar los commits antes de pushear

## Tareas incluidas

**Módulo 2 - Proyectos (12 tareas):**
- Landing Page (3 lecciones)
- Automatizaciones (3 lecciones)
- Investigación (2 lecciones)
- Análisis de Datos (2 lecciones)

**Módulo 3 - Ralph Loop (10 tareas):**
- Conceptos básicos (3 lecciones)
- Las 3 fases (3 lecciones)
- Proyecto práctico (1 lección)
- Consejos avanzados (1 lección)

**Finales (2 tareas):**
- Actualizar landing
- Testing

---

¡Happy Ralphing! 🚀
