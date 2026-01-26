---
description: 🔄 Ralph Loop - Lección 4: Fase 1 - Specs
---

# Lección 3.4: Fase 1 - Specs

## Contexto para el tutor

La fase más importante del sistema. Specs bien escritas = proyectos exitosos.

## Estructura de la lección

### 1. Por qué las Specs importan tanto (3 min)

> "El 80% del éxito de Ralph depende de esta fase.
>
> **Si las specs son malas, el resultado será malo** - no importa cuánto tiempo trabaje Claude.
>
> 'Dame 6 horas para cortar un árbol y pasaré las primeras 4 afilando el hacha.' - Abraham Lincoln
>
> En Ralph, afilar el hacha = escribir buenas specs."

### 2. Specs malas vs buenas (5 min)

Muestra ejemplos:

> "❌ **Spec mala:**
> 'Necesito una app de tareas'
>
> ✅ **Spec buena:**
> 'App de tareas con: crear, editar, eliminar, marcar completadas. Persistencia en localStorage. UI minimalista con Tailwind.'
>
> La diferencia: **especificidad**. Claude no puede leer tu mente."

### 3. Los 5 elementos esenciales (10 min)

> "Toda buena spec tiene estos elementos:"

**1. Objetivo Claro**
```markdown
## Objetivo
Crear un sistema de autenticación completo:
- Registro de usuarios (email + password)
- Login con JWT
- Middleware de protección de rutas
```

**2. Stack Definido**
```markdown
## Stack
- Express 4.18+
- TypeScript 5+
- Prisma ORM
- PostgreSQL 15
```

**3. Estructura Clara**
```markdown
## Estructura
- `/src/routes/auth.ts` - Rutas de autenticación
- `/src/controllers/authController.ts` - Lógica de auth
- `/src/middleware/authMiddleware.ts` - Verificación JWT
```

**4. Convenciones Explícitas**
```markdown
## Convenciones
- Passwords: mínimo 8 caracteres, bcrypt (10 rounds)
- JWT: expira en 1 hora
- Errores: formato { error: string, code: number }
```

**5. Reglas Negativas**
```markdown
## NO Hacer
- No guardar passwords en texto plano
- No exponer tokens en logs
- No modificar .env
```

### 4. Template completo (5 min)

> "Aquí tienes un template que puedes usar:"

```markdown
# PROMPT_build.md

## Resumen del Proyecto
[2-3 oraciones describiendo qué es]

## Tu Rol
Eres un desarrollador senior trabajando en este proyecto.

## Stack Técnico
- **Lenguaje:**
- **Framework:**
- **Base de datos:**

## Estructura del Proyecto
[Árbol de carpetas]

## Convenciones de Código
1. [Convención 1]
2. [Convención 2]

## Reglas CRÍTICAS
- ⛔ [Lo que NO hacer]
- ✅ [Lo que SÍ hacer]

## Flujo de Trabajo
1. Lee PLAN.md
2. Elige la primera tarea pendiente
3. Ejecútala completamente
4. Actualiza archivos de estado
5. Termina la sesión
```

### 5. Ejercicio: Convertir idea en specs

> "Practiquemos. Convierte esta idea vaga en specs concretas:
>
> 'Quiero una API para un blog'
>
> Intenta escribir los 5 elementos antes de ver mi solución."

Espera su intento, luego muestra:

```markdown
## Resumen
API REST para blog personal. CRUD de posts con auth.

## Objetivo
- CRUD de posts
- Autenticación de autor
- Paginación

## Stack
- Node.js 20 + Express 4
- SQLite
- JWT para auth

## Endpoints
POST /auth/login
GET /posts
GET /posts/:id
POST /posts (auth)
PUT /posts/:id (auth)
DELETE /posts/:id (auth)

## Modelo Post
{ id, title, content, author, createdAt, updatedAt }
```

### 6. Concepto clave

> "💡 **Dedica al menos 30 minutos a escribir specs** antes de lanzar Ralph.
>
> Es la mejor inversión de tiempo que puedes hacer. Specs vagas = iteraciones desperdiciadas."

### 7. Transición

> "Ahora que sabes escribir specs, el siguiente paso es convertirlas en un plan de tareas atómicas.
>
> Escribe `/ralph-5` para la Fase 2: El Plan."
