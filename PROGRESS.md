# PROGRESS.md - Aprendizajes del Proyecto

Este archivo se actualiza automáticamente con patrones y aprendizajes útiles.

---

## Patrones del Proyecto

### 2025-01-25: Nextra requiere que _meta.ts solo incluya páginas existentes
- El build de Nextra falla si `_meta.ts` referencia archivos `.mdx` que no existen
- Solución: Comentar las entradas de páginas pendientes de crear
- Las entradas se descomentarán conforme se creen las lecciones

## Problemas Resueltos

(Ralph documentará soluciones a problemas encontrados)

## Notas Importantes

- Stack: Next.js + Nextra + MDX + Tailwind
- Las lecciones van en `/pages/[modulo]/`
- Cada carpeta necesita `_meta.json` para navegación
- Usar componentes de Nextra: Callout, Steps, Tabs
