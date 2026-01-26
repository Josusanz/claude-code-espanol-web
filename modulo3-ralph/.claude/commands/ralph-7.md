---
description: 🔄 Ralph Loop - Lección 7: Proyecto Práctico
---

# Lección 3.7: Proyecto Práctico

## Contexto para el tutor

Aplicar todo lo aprendido construyendo una API completa con Ralph.

## Estructura de la lección

### 1. El proyecto (2 min)

> "Vamos a construir una **API de gestión de notas** desde cero usando Ralph Loop.
>
> Incluirá:
> - CRUD de notas
> - Autenticación JWT
> - Categorías
> - Búsqueda de texto
> - Tests automatizados
>
> **Tiempo estimado:** 2-4 horas de Ralph"

### 2. Crear la estructura (5 min)

```bash
mkdir notes-api
cd notes-api
```

### 3. Crear PROMPT_build.md (10 min)

> "Este es el PROMPT_build.md para el proyecto:"

```markdown
# PROMPT_build.md - Notes API

## Resumen
API REST para gestión de notas personales con autenticación.

## Tu Rol
Eres un desarrollador senior. Sigues buenas prácticas y escribes tests.

## Stack Técnico
- Node.js 20 + TypeScript 5
- Express.js 4
- Prisma + SQLite
- JWT para auth
- Vitest para testing

## Estructura
```
notes-api/
├── src/
│   ├── index.ts
│   ├── app.ts
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── utils/
├── prisma/
├── tests/
└── package.json
```

## Convenciones
- Async/await siempre
- Respuestas: { success, data?, error? }
- Códigos HTTP correctos

## Flujo de Trabajo
1. Lee PLAN.md
2. Ejecuta UNA tarea
3. Marca completada
4. Actualiza PROGRESS.md
5. Termina sesión
```

### 4. Crear PLAN.md (8 min)

```markdown
# PLAN.md - Notes API

## ✅ Completadas
(ninguna aún)

## 🔄 En Progreso
(ninguna)

## 📋 Pendientes

### Fase 1: Setup
- [ ] Crear package.json
- [ ] Configurar TypeScript
- [ ] Configurar Vitest
- [ ] Crear estructura carpetas

### Fase 2: Base de Datos
- [ ] Configurar Prisma
- [ ] Modelo User
- [ ] Modelo Note
- [ ] Migración inicial

### Fase 3: Auth
- [ ] Utils password (hash/verify)
- [ ] Utils JWT (sign/verify)
- [ ] Controller auth (register, login)
- [ ] Routes auth
- [ ] Middleware auth
- [ ] Tests auth

### Fase 4: CRUD Notes
- [ ] Controller create
- [ ] Controller list
- [ ] Controller getById
- [ ] Controller update
- [ ] Controller delete
- [ ] Routes notes
- [ ] Tests notes

### Fase 5: Finalización
- [ ] Middleware errores
- [ ] Entry point
- [ ] README
```

### 5. Crear loop.sh y PROGRESS.md (3 min)

```bash
# loop.sh
cat > loop.sh << 'EOF'
#!/bin/bash
ITERATION=1
while true; do
    echo "📍 ITERACIÓN #$ITERATION - $(date)"
    claude -p "$(cat PROMPT_build.md)"
    ITERATION=$((ITERATION + 1))
    sleep 10
done
EOF
chmod +x loop.sh

# PROGRESS.md vacío
echo "# PROGRESS.md" > PROGRESS.md
```

### 6. Lanzar y monitorear (15 min)

> "¡Lanza Ralph!"

```bash
./loop.sh
```

> "En otra terminal, monitorea:"

```bash
# Ver progreso cada 30 segundos
watch -n 30 "cat PLAN.md | grep -E '\[.\]'"
```

### 7. Puntos de verificación

> "Verifica estos hitos:
>
> | Tiempo | Verificar |
> |--------|-----------|
> | ~15 min | Setup completo |
> | ~30 min | Prisma configurado |
> | ~60 min | Auth funciona |
> | ~90 min | CRUD básico |
> | ~120 min | Tests pasan |"

### 8. Resultado esperado

> "Al terminar deberías tener:
>
> ```
> ✅ src/index.ts
> ✅ src/app.ts
> ✅ src/routes/auth.ts
> ✅ src/routes/notes.ts
> ✅ src/controllers/
> ✅ src/middleware/
> ✅ prisma/schema.prisma
> ✅ tests/
> ✅ README.md
> ```
>
> Y todos los tests pasando."

### 9. Reflexión

> "¿Cómo fue tu experiencia?
>
> - ¿Cuántas intervenciones necesitaste?
> - ¿Las specs fueron suficientemente claras?
> - ¿El plan tenía el tamaño correcto de tareas?"

### 10. Transición

> "¡Has construido una API completa con Ralph! En la última lección veremos técnicas avanzadas.
>
> Escribe `/ralph-8` para Consejos Avanzados."
