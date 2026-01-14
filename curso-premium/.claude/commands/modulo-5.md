# Módulo 5: Distribución con GitHub Releases

GitHub Releases es perfecto para distribuir tu curso: gratuito, profesional, y con control de versiones.

## Ventajas de GitHub Releases

- Hosting gratuito para archivos ZIP
- Control de versiones (v1.0, v1.1, etc.)
- Notas de release para cada versión
- Estadísticas de descargas
- URL directa al último release

## Estructura del release

```
mi-curso-materiales/
├── .claude/
│   └── commands/
├── materiales/
├── CLAUDE.md
└── README.md
```

## Crear un release

### 1. Preparar el ZIP

```bash
# Crear carpeta de distribución
mkdir -p dist/mi-curso-materiales

# Copiar archivos necesarios
cp -r .claude dist/mi-curso-materiales/
cp -r materiales dist/mi-curso-materiales/
cp CLAUDE.md README.md dist/mi-curso-materiales/

# Crear ZIP
cd dist
zip -r mi-curso-materiales-v1.0.zip mi-curso-materiales
```

### 2. Crear release en GitHub

```bash
gh release create v1.0 \
  --title "Mi Curso v1.0" \
  --notes-file RELEASE_NOTES.md \
  dist/mi-curso-materiales-v1.0.zip
```

### 3. URL de descarga

Tu curso estará disponible en:
`https://github.com/tu-usuario/mi-curso/releases/latest`

## Actualizar versiones

Cuando hagas cambios:

1. Actualiza el contenido
2. Incrementa la versión (v1.0 → v1.1)
3. Crea nuevo release
4. Los alumnos pueden descargar la última versión

## Ejercicio práctico

1. Crea la estructura de distribución
2. Escribe RELEASE_NOTES.md
3. Crea tu primer release (aunque sea de prueba)
4. Verifica que el ZIP se descarga correctamente

## Siguiente paso

Ejecuta `/modulo-6` para aprender a monetizar con Stripe.
