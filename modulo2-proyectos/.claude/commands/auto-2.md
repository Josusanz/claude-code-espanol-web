---
description: ⚡ Automatizaciones - Lección 2: Organizar Archivos
---

# Proyecto Automatizaciones - Lección 2

## Contexto para el tutor

El alumno ya tiene la carpeta de scripts. Ahora va a crear un organizador de archivos real.

## Estructura de la lección

### 1. El problema a resolver (2 min)

> "¿Tienes una carpeta de Descargas llena de archivos desordenados? Hoy vamos a crear un script que los organice automáticamente."

### 2. Diseñar el organizador (3 min)

Pregunta al alumno:

> "¿Cómo te gustaría organizar tus archivos? Las opciones comunes son:
>
> 1. **Por tipo** - Imágenes, documentos, videos, etc.
> 2. **Por fecha** - Carpetas por mes o año
> 3. **Por proyecto** - Según el nombre del archivo
>
> ¿Cuál prefieres?"

### 3. Crear el script organizador (10 min)

Basado en su elección, crea el script. Ejemplo para organizar por tipo:

```bash
cat > organizar-descargas.sh << 'EOF'
#!/bin/bash

# Configuración
ORIGEN="${1:-$HOME/Downloads}"
echo "🗂️ Organizando archivos en: $ORIGEN"

# Crear carpetas
mkdir -p "$ORIGEN/Imagenes"
mkdir -p "$ORIGEN/Documentos"
mkdir -p "$ORIGEN/Videos"
mkdir -p "$ORIGEN/Audio"
mkdir -p "$ORIGEN/Comprimidos"
mkdir -p "$ORIGEN/Otros"

# Mover imágenes
mv "$ORIGEN"/*.{jpg,jpeg,png,gif,webp,svg} "$ORIGEN/Imagenes/" 2>/dev/null
echo "✅ Imágenes organizadas"

# Mover documentos
mv "$ORIGEN"/*.{pdf,doc,docx,txt,xlsx,pptx,csv} "$ORIGEN/Documentos/" 2>/dev/null
echo "✅ Documentos organizados"

# Mover videos
mv "$ORIGEN"/*.{mp4,mov,avi,mkv,webm} "$ORIGEN/Videos/" 2>/dev/null
echo "✅ Videos organizados"

# Mover audio
mv "$ORIGEN"/*.{mp3,wav,flac,aac,ogg} "$ORIGEN/Audio/" 2>/dev/null
echo "✅ Audio organizado"

# Mover comprimidos
mv "$ORIGEN"/*.{zip,rar,7z,tar,gz} "$ORIGEN/Comprimidos/" 2>/dev/null
echo "✅ Comprimidos organizados"

echo ""
echo "🎉 ¡Organización completada!"
EOF
chmod +x organizar-descargas.sh
```

### 4. Probar el script (5 min)

> "Antes de usarlo con archivos reales, vamos a probarlo con archivos de prueba."

```bash
# Crear archivos de prueba
mkdir -p prueba-organizador
cd prueba-organizador
touch foto1.jpg foto2.png documento.pdf video.mp4 musica.mp3

# Ejecutar el script
../organizar-descargas.sh .

# Ver el resultado
ls -la */
```

### 5. Explicar qué hace el script

> "El script hace esto:
>
> 1. **Crea carpetas** para cada tipo de archivo
> 2. **Mueve los archivos** según su extensión
> 3. **Ignora errores** si no hay archivos de algún tipo
>
> Puedes modificarlo para añadir más tipos o cambiar las carpetas."

### 6. Transición

> "¡Genial! Ya tienes un organizador funcional. En la siguiente lección aprenderás a programar estos scripts para que se ejecuten automáticamente.
>
> Escribe `/auto-3` para continuar."
