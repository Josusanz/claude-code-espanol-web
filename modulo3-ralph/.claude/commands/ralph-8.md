---
description: 🔄 Ralph Loop - Lección 8: Consejos Avanzados
---

# Lección 3.8: Consejos Avanzados

## Contexto para el tutor

Última lección. Técnicas avanzadas para proyectos complejos y entornos de producción.

## Estructura de la lección

### 1. Seguridad con Docker (8 min)

> "Ejecutar código autónomo tiene riesgos. Docker añade protección."

**Dockerfile.ralph:**
```dockerfile
FROM node:20-slim
RUN useradd -m -s /bin/bash ralph
WORKDIR /project
COPY --chown=ralph:ralph . .
USER ralph
CMD ["./loop.sh"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  ralph:
    build:
      context: .
      dockerfile: Dockerfile.ralph
    volumes:
      - ./src:/project/src
      - ./PLAN.md:/project/PLAN.md
      - ./PROGRESS.md:/project/PROGRESS.md
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4G
```

> "Beneficios:
> - **Aislamiento** - No puede tocar nada fuera del contenedor
> - **Límites** - No consume toda tu CPU/RAM
> - **Sin root** - Minimiza daños potenciales"

### 2. Múltiples agentes (5 min)

> "Para proyectos grandes, varios Ralphs en paralelo:"

```
mi-proyecto/
├── ralph-backend/
│   ├── loop.sh
│   ├── PROMPT_build.md
│   ├── PLAN.md
│   └── PROGRESS.md
├── ralph-frontend/
│   └── [mismos archivos]
└── SHARED_PROGRESS.md  # Coordinación
```

> "SHARED_PROGRESS.md contiene contratos de API y decisiones globales."

### 3. Git automático (5 min)

> "Añade commits automáticos para checkpoints:"

```bash
# En loop.sh, después de claude:
if [[ $(git status --porcelain) ]]; then
    git add -A
    git commit -m "Ralph: Iteración #$ITERATION"
fi
```

> "Si algo sale mal, rollback fácil:
> ```bash
> git log --oneline | grep 'Ralph:'
> git revert HEAD~3..HEAD
> ```"

### 4. Recuperación de errores (5 min)

> "Añade al PROMPT_build.md:"

```markdown
## Si Algo Falla
1. Documenta el error en PROGRESS.md
2. Intenta una solución
3. Si falla 2 veces: marca tarea como bloqueada
4. Pasa a la siguiente tarea
5. NO te quedes en loop infinito
```

### 5. Estimación de costos (3 min)

> "| Iteraciones | Tokens aprox. | Costo (Sonnet) |
> |-------------|---------------|----------------|
> | 10 | ~500k | ~$1.50 |
> | 50 | ~2.5M | ~$7.50 |
> | 100 | ~5M | ~$15.00 |
>
> **Reducir costos:**
> - Tareas más atómicas = menos contexto
> - PROGRESS.md conciso
> - Modelo económico para tareas simples"

### 6. Checklist final de Ralph

> "Antes de cada proyecto con Ralph:
>
> - [ ] Specs detalladas (30+ min escritas)
> - [ ] Plan con tareas atómicas (15-25 tareas)
> - [ ] Entorno aislado (Docker si es sensible)
> - [ ] Git configurado para checkpoints
> - [ ] Tiempo disponible para supervisar inicio"

### 7. Celebración final

> "🎉 **¡FELICIDADES!** Has completado el Módulo Ralph Loop.
>
> Ahora tienes las herramientas para poner a Claude en piloto automático:
>
> ✅ Entiendes Context Rot y cómo superarlo
> ✅ Dominas los 4 archivos del sistema
> ✅ Puedes escribir specs efectivas
> ✅ Sabes crear planes atómicos
> ✅ Puedes monitorear e intervenir
> ✅ Conoces técnicas de seguridad
>
> **Úsalo con responsabilidad.** Ralph es poderoso."

### 8. Siguiente paso

> "Te recomiendo:
>
> 1. **Aplica Ralph a un proyecto real** - Elige algo pequeño primero
> 2. **Itera tus specs** - Cada proyecto mejora tu habilidad
> 3. **Comparte resultados** - La comunidad aprende de tus experimentos
>
> Si quieres ir más allá, el **Course Builder** te enseña a crear cursos completos con IA."

### 9. Comandos finales

> "Recuerda los comandos de este módulo:
>
> - `/iniciar-ralph` - Volver al inicio
> - `/ralph-1` a `/ralph-8` - Lecciones individuales
> - `/progreso-ralph` - Ver tu progreso
> - `/ayuda-ralph` - Ver ayuda"
