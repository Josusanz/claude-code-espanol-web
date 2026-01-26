---
description: ⚡ Automatizaciones - Lección 3: Tareas Programadas
---

# Proyecto Automatizaciones - Lección 3

## Contexto para el tutor

El alumno tiene scripts funcionando. Ahora aprenderá a programarlos para que se ejecuten automáticamente.

## Estructura de la lección

### 1. La magia de la programación automática (2 min)

> "Tus scripts funcionan, pero tienes que ejecutarlos manualmente. ¿No sería mejor que se ejecutaran solos?
>
> Con **cron** (en Mac/Linux) puedes programar cualquier script para que se ejecute:
> - Cada hora
> - Cada día a una hora específica
> - Cada semana
> - Cuando tú quieras"

### 2. Entender cron (5 min)

Explica la sintaxis básica:

> "Un cron tiene 5 campos que definen cuándo ejecutar:
>
> ```
> * * * * * comando
> │ │ │ │ │
> │ │ │ │ └─ Día de la semana (0-7)
> │ │ │ └─── Mes (1-12)
> │ │ └───── Día del mes (1-31)
> │ └─────── Hora (0-23)
> └───────── Minuto (0-59)
> ```
>
> Ejemplos:
> - `0 9 * * *` - Todos los días a las 9:00
> - `0 * * * *` - Cada hora en punto
> - `0 9 * * 1` - Cada lunes a las 9:00"

### 3. Programar el organizador (10 min)

> "Vamos a programar tu organizador para que se ejecute todos los días."

```bash
# Ver tareas programadas actuales
crontab -l

# Editar las tareas (se abre un editor)
crontab -e
```

Añadir la línea:

```bash
# Organizar descargas todos los días a las 20:00
0 20 * * * /ruta/completa/mis-scripts/organizar-descargas.sh >> /tmp/organizador.log 2>&1
```

> "Importante: Usa la **ruta completa** al script. Puedes obtenerla con `pwd`."

### 4. Verificar que funciona

```bash
# Ver las tareas programadas
crontab -l

# Ver el log después de que se ejecute
cat /tmp/organizador.log
```

### 5. Script de notificación (opcional)

> "¿Quieres recibir una notificación cuando termine? Añadamos una alerta."

```bash
# En Mac, añadir al final del script:
osascript -e 'display notification "Archivos organizados" with title "Automatización"'
```

### 6. Celebrar el logro

> "🎉 ¡FELICIDADES! Has completado el proyecto de automatizaciones.
>
> Resumen de lo que lograste:
> ✅ Creaste scripts de automatización
> ✅ Organizas archivos automáticamente
> ✅ Programaste tareas con cron
>
> Ahora tienes un sistema que trabaja por ti."

### 7. Siguiente proyecto

> "¿Listo para el siguiente proyecto?
>
> - `/investigacion-1` - Usa Claude para investigar
> - `/datos-1` - Analiza datos con IA
>
> O escribe `/progreso-m2` para ver tu avance."
