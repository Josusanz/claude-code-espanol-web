# AGENTS.md - Guía para trabajar en aprende.software

## Stack del proyecto

- **Framework**: Next.js con Nextra (documentación)
- **Contenido**: Archivos MDX en `/pages/`
- **Estilos**: Tailwind CSS
- **Lenguaje**: TypeScript
- **Deploy**: Vercel

## Estructura de archivos

```
/pages/
  ├── index.mdx              # Landing page
  ├── empezar/               # Módulo intro
  │   └── introduccion.mdx
  ├── fundamentos/           # Módulo 1
  │   ├── que-es.mdx
  │   ├── exploracion.mdx
  │   └── ...
  ├── proyectos/             # Módulo 2 (POR CONSTRUIR)
  │   └── index.mdx
  └── ralph/                 # Módulo 3 (POR CONSTRUIR)
      └── index.mdx
```

## Cómo crear una nueva lección

1. Crea archivo `.mdx` en la carpeta del módulo
2. Añade frontmatter con título
3. Usa componentes existentes (Callout, Steps, etc.)
4. Actualiza `_meta.json` para el orden de navegación

### Ejemplo de lección:

```mdx
---
title: Título de la Lección
---

import { Callout, Steps } from 'nextra/components'

# Título de la Lección

Introducción breve explicando qué aprenderán.

## Concepto Principal

Explicación del concepto...

<Callout type="info">
  💡 Tip importante para el usuario
</Callout>

## Ejercicio Práctico

<Steps>
### Paso 1
Instrucciones...

### Paso 2
Más instrucciones...
</Steps>

## Resumen

- Punto clave 1
- Punto clave 2
```

## Navegación (_meta.json)

Cada carpeta necesita un `_meta.json` para definir orden:

```json
{
  "index": "Introducción",
  "leccion-1": "Primera Lección",
  "leccion-2": "Segunda Lección"
}
```

## Comandos útiles

```bash
npm run dev      # Desarrollo local (localhost:3000)
npm run build    # Verificar que compila
npm run start    # Servidor de producción
```

## Estilo de escritura

- **Tono**: Cercano, directo, sin jerga innecesaria
- **Audiencia**: No programadores que quieren usar IA
- **Formato**: Explicación breve → Ejemplo práctico → Ejercicio
- **Idioma**: Español (España/Latinoamérica neutral)

## Componentes disponibles

- `<Callout type="info|warning|error">` - Notas destacadas
- `<Steps>` - Pasos numerados
- `<Tabs>` - Contenido en pestañas
- `<Cards>` - Grid de tarjetas
- `<FileTree>` - Árbol de archivos

## Patrones a seguir

1. Cada lección ~30 min de contenido
2. Siempre incluir ejercicio práctico
3. Terminar con resumen de puntos clave
4. Usar emojis con moderación (títulos y callouts)
5. Código siempre con bloques de código con lenguaje especificado
