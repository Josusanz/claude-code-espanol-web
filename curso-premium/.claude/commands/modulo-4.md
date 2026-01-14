# Módulo 4: Web Automática con Nextra

Una web profesional da credibilidad a tu curso y facilita que la gente lo encuentre.

## Por qué Nextra

- Genera sitios estáticos desde archivos MDX
- Tema de documentación profesional incluido
- Buscador integrado
- Modo oscuro automático
- Deploy gratis en Vercel

## Estructura del proyecto

```
mi-curso-web/
├── pages/
│   ├── _meta.json          # Navegación
│   ├── index.mdx           # Landing page
│   ├── empezar/
│   │   └── introduccion.mdx
│   └── lecciones/
│       ├── leccion-1.mdx
│       └── leccion-2.mdx
├── theme.config.tsx        # Configuración del tema
├── next.config.mjs         # Config de Next.js
└── package.json
```

## Pasos para crear tu web

### 1. Crear proyecto

```bash
npx create-next-app mi-curso-web
cd mi-curso-web
npm install nextra nextra-theme-docs
```

### 2. Configurar Next.js

Copia el archivo `templates/next.config.mjs` a tu proyecto.

### 3. Crear theme.config.tsx

Copia y personaliza `templates/theme.config.tsx`.

### 4. Crear páginas

Convierte tus comandos slash a archivos MDX.

### 5. Deploy en Vercel

```bash
npx vercel
```

## Ejercicio práctico

1. Crea la estructura básica del proyecto
2. Convierte al menos 2 lecciones a MDX
3. Personaliza theme.config.tsx con tu marca
4. Haz deploy en Vercel

## Siguiente paso

Ejecuta `/modulo-5` para aprender sobre distribución con GitHub Releases.
