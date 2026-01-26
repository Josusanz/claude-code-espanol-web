# PROGRESS.md - [NOMBRE DEL PROYECTO]

## 📌 Sobre Este Archivo

Este archivo persiste entre iteraciones de Ralph. Claude lo lee al inicio de cada sesión para obtener contexto de lo que ha sucedido antes.

**IMPORTANTE:** Mantén este archivo conciso. Solo documenta información que sea útil para futuras iteraciones.

---

## 🏗️ Decisiones de Arquitectura

Documenta aquí las decisiones técnicas importantes y el razonamiento detrás de ellas.

Ejemplo:
> - Elegimos SQLite para desarrollo por simplicidad, PostgreSQL para producción
> - Usamos JWT en lugar de sesiones para escalabilidad horizontal
> - Implementamos repository pattern para facilitar testing

---

## 🐛 Bugs Encontrados y Solucionados

Documenta bugs que encontraste y cómo los solucionaste para no repetir los mismos errores.

Ejemplo:
> - **Bug:** Puerto 3000 ya estaba ocupado
>   **Solución:** Cambiado a puerto 3001 en configuración
>
> - **Bug:** Error de CORS con frontend
>   **Solución:** Añadido middleware cors con origin específico

---

## 📦 Dependencias Instaladas

Lista las dependencias añadidas y para qué se usan.

Ejemplo:
> - `express`: Servidor web
> - `jsonwebtoken`: Manejo de JWT
> - `bcrypt`: Hash de passwords
> - `zod`: Validación de schemas
> - `prisma`: ORM para base de datos

---

## 📐 Convenciones Establecidas

Documenta patrones y convenciones que has establecido durante el desarrollo.

Ejemplo:
> - Nombres de archivos en kebab-case
> - Funciones en camelCase
> - Interfaces con prefijo I (IUser, INote)
> - Errores siempre con formato { error: string, code: number }

---

## ⚠️ Notas del Operador

Espacio para que el operador (tú) deje notas que Claude debe leer.

Ejemplo:
> **[2024-01-15 15:30]** No usar console.log, usar el logger en /src/utils/logger.ts

---

## 📊 Resumen de Iteraciones

| # | Fecha | Tareas Completadas | Notas |
|---|-------|-------------------|-------|
| 1 | - | - | - |

---

## 🔮 Para Futuras Iteraciones

Notas y recordatorios para las próximas sesiones.

Ejemplo:
> - Recordar ejecutar `npm test` antes de marcar tareas como completadas
> - El usuario admin tiene ID=1, no borrarlo durante tests
> - Antes de hacer deploy, verificar variables de entorno
