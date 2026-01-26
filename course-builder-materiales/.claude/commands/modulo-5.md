---
description: 📦 Módulo 5: Distribución con GitHub
---

# Módulo 5: Distribución con GitHub

## Contexto para el tutor

Enseñar a distribuir el curso de forma profesional usando GitHub.

## Estructura del módulo

### 1. Opciones de distribución (3 min)

> "Tienes dos opciones principales:
>
> | Método | Público | Privado |
> |--------|---------|---------|
> | **Repo público** | Cursos gratuitos | ❌ |
> | **Releases/ZIP** | ✅ | Cursos de pago |"

### 2. Repo público (5 min)

> "Para cursos gratuitos, un repo público funciona:
>
> ```
> mi-curso/
> ├── .claude/commands/
> ├── materiales/
> ├── CLAUDE.md
> ├── LICENSE
> └── README.md
> ```
>
> El README debe explicar cómo clonar e iniciar."

### 3. README efectivo (5 min)

> "Tu README necesita:
>
> ```markdown
> # 🐍 Mi Curso
>
> Descripción breve.
>
> ## 🚀 Cómo empezar
>
> 1. Clona: `git clone ...`
> 2. Entra: `cd mi-curso`
> 3. Inicia: `claude`
> 4. Escribe: `/iniciar`
>
> ## 📚 Contenido
> - Lección 1: ...
> - Lección 2: ...
>
> ## 📋 Requisitos
> - Claude Code instalado
> ```"

### 4. Releases para pago (8 min)

> "Para cursos de pago, usa GitHub Releases:
>
> ```bash
> # Preparar release
> mkdir release
> cp -r .claude release/
> cp -r materiales release/
> cp CLAUDE.md README.md release/
>
> # Crear ZIP
> cd release && zip -r ../mi-curso-v1.0.zip . && cd ..
> ```
>
> Luego:
> 1. Ve a tu repo → Releases → Create new release
> 2. Tag: v1.0
> 3. Sube el ZIP
> 4. Publica"

### 5. Versionado (3 min)

> "Usa versionado semántico:
>
> - `v1.0.0` - Primera versión
> - `v1.1.0` - Nueva lección
> - `v1.1.1` - Correcciones
> - `v2.0.0` - Cambios grandes"

### 6. Tu turno

> "Vamos a:
>
> 1. Crear el README para tu curso
> 2. Preparar la estructura para release
> 3. (Opcional) Crear el primer release
>
> ¿Empezamos?"

### 7. Script de automatización

> "Para futuros releases, crea `release.sh`:
>
> ```bash
> #!/bin/bash
> VERSION=$1
> mkdir -p release-$VERSION
> cp -r .claude release-$VERSION/
> cp -r materiales release-$VERSION/
> cp CLAUDE.md README.md release-$VERSION/
> cd release-$VERSION
> zip -r ../mi-curso-$VERSION.zip .
> cd ..
> rm -rf release-$VERSION
> echo '✅ Creado: mi-curso-$VERSION.zip'
> ```"

### 8. Transición

> "¡Tu curso está listo para distribuir! Solo falta un paso: monetizar.
>
> Escribe `/modulo-6` para el módulo final."
