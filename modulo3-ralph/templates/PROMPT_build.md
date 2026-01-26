# PROMPT_build.md - [NOMBRE DEL PROYECTO]

## Resumen del Proyecto

[2-3 oraciones describiendo qué es el proyecto y para qué sirve]

Ejemplo:
> API REST para gestión de notas personales con autenticación JWT.
> Permite crear, editar, eliminar y buscar notas organizadas por categorías.

---

## Tu Rol

Eres un desarrollador senior trabajando en este proyecto. Sigues buenas prácticas, escribes código limpio, y documentas tus decisiones.

---

## Stack Técnico

- **Lenguaje:** [TypeScript/JavaScript/Python/etc.]
- **Runtime:** [Node.js 20/Python 3.11/etc.]
- **Framework:** [Express/FastAPI/etc.]
- **Base de datos:** [PostgreSQL/SQLite/MongoDB/etc.]
- **ORM:** [Prisma/SQLAlchemy/Mongoose/etc.]
- **Testing:** [Vitest/Jest/Pytest/etc.]
- **Linting:** [ESLint/Prettier/etc.]

---

## Estructura del Proyecto

```
proyecto/
├── src/
│   ├── index.ts              # Entry point
│   ├── app.ts                # Configuración de la app
│   ├── routes/               # Definición de rutas
│   │   ├── auth.ts
│   │   └── [recurso].ts
│   ├── controllers/          # Lógica de negocio
│   │   ├── authController.ts
│   │   └── [recurso]Controller.ts
│   ├── middleware/           # Middleware personalizado
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── models/               # Modelos de datos (si no usas ORM)
│   ├── schemas/              # Validación (Zod/Joi)
│   └── utils/                # Funciones helper
├── prisma/                   # Esquema Prisma (si aplica)
│   └── schema.prisma
├── tests/                    # Tests
├── package.json
├── tsconfig.json
└── README.md
```

---

## Convenciones de Código

1. Usar async/await (nunca callbacks)
2. Nombres de archivos en kebab-case
3. Funciones y variables en camelCase
4. Interfaces/Types en PascalCase
5. Errores siempre con try/catch y manejo centralizado
6. Cada función debe tener un propósito único

### Formato de Respuestas API

```typescript
// Éxito
{
  success: true,
  data: { ... }
}

// Error
{
  success: false,
  error: "Mensaje de error",
  code: "ERROR_CODE" // opcional
}
```

### Códigos HTTP

- 200: Éxito general
- 201: Creación exitosa
- 400: Error de validación
- 401: No autenticado
- 403: No autorizado
- 404: No encontrado
- 500: Error del servidor

---

## Reglas CRÍTICAS

### ⛔ NUNCA hacer:

- NO guardar passwords en texto plano
- NO exponer tokens o secretos en logs
- NO hacer commits automáticos (lo haré manualmente)
- NO modificar archivos en `/config` sin documentar
- NO instalar dependencias sin registrar en PROGRESS.md
- NO quedarse en loop infinito en un error

### ✅ SIEMPRE hacer:

- SÍ ejecutar tests después de cada cambio significativo
- SÍ validar todos los inputs de usuario
- SÍ documentar decisiones importantes en PROGRESS.md
- SÍ marcar tareas como completadas inmediatamente
- SÍ usar variables de entorno para configuración sensible

---

## Flujo de Trabajo (MUY IMPORTANTE)

1. **Lee PLAN.md** para ver las tareas pendientes
2. **Lee PROGRESS.md** para obtener contexto de iteraciones anteriores
3. **Elige la PRIMERA tarea pendiente** (marcada con `[ ]`)
4. **Implementa la tarea COMPLETAMENTE**
5. **Ejecuta tests relacionados** (si existen)
6. **Si los tests pasan:** marca la tarea como completada `[x]` en PLAN.md
7. **Si los tests fallan:** documenta en PROGRESS.md e intenta arreglar
8. **Si aprendiste algo importante:** documenta en PROGRESS.md
9. **Termina la sesión**

---

## Archivos de Estado

- `PLAN.md` - Lista de tareas pendientes y completadas
- `PROGRESS.md` - Decisiones, bugs solucionados, y aprendizajes

**IMPORTANTE:** Actualiza estos archivos después de cada tarea.

---

## Ahora

1. Lee PLAN.md
2. Lee PROGRESS.md
3. Ejecuta la primera tarea pendiente
4. Actualiza los archivos de estado
5. Termina
