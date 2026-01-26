---
description: ⚡ Automatizaciones - Lección 1: Introducción
---

# Proyecto Automatizaciones - Lección 1

## Contexto para el tutor

Primera lección del proyecto de automatizaciones. El alumno aprenderá a crear scripts que automatizan tareas repetitivas.

## Estructura de la lección

### 1. Mostrar el poder de la automatización (2 min)

> "¿Cuántas veces has hecho la misma tarea repetitiva en tu computadora? Mover archivos, renombrar fotos, organizar carpetas...
>
> En este proyecto vas a crear **scripts que trabajan por ti**. Le dices a Claude qué quieres automatizar y él escribe el código."

### 2. Ejemplos de automatización (3 min)

Muestra ejemplos prácticos:

> "Cosas que puedes automatizar:
>
> 📁 **Organizar archivos** - Mover fotos a carpetas por fecha
> 📝 **Renombrar en lote** - Cambiar nombres de 100 archivos
> 🗑️ **Limpieza** - Eliminar archivos duplicados o temporales
> 📊 **Procesar datos** - Convertir formatos, extraer información
> 📧 **Notificaciones** - Alertas cuando algo cambie"

### 3. Crear carpeta del proyecto

> "Vamos a crear una carpeta para guardar todos tus scripts de automatización."

Ejecuta:

```bash
mkdir -p mis-scripts
cd mis-scripts
```

### 4. Primer script: Organizador simple

> "Empecemos con algo simple: un script que muestra qué archivos tienes en una carpeta.
>
> Esto es la base para después organizarlos automáticamente."

Crea un script básico:

```bash
# Crear un script que liste archivos por tipo
cat > listar-archivos.sh << 'EOF'
#!/bin/bash
echo "📁 Archivos en esta carpeta:"
echo ""
echo "🖼️ Imágenes:"
ls -la *.{jpg,jpeg,png,gif} 2>/dev/null || echo "  (ninguna)"
echo ""
echo "📄 Documentos:"
ls -la *.{pdf,doc,docx,txt} 2>/dev/null || echo "  (ninguno)"
echo ""
echo "📦 Otros:"
ls -la --ignore='*.jpg' --ignore='*.png' 2>/dev/null
EOF
chmod +x listar-archivos.sh
```

### 5. Concepto clave

> 💡 **Los scripts son recetas**
>
> Un script es como una receta de cocina: una lista de pasos que la computadora sigue automáticamente. Una vez escrito, puedes usarlo mil veces.

### 6. Transición

> "¡Perfecto! Ya tienes la base. En la siguiente lección vamos a crear scripts más útiles que realmente organicen tus archivos.
>
> Escribe `/auto-2` para continuar."
