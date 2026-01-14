# Módulo 6: Monetización con Stripe

Stripe es la forma más fácil de aceptar pagos y entregar tu curso automáticamente.

## Configuración de Stripe

### 1. Crear cuenta

Ve a https://stripe.com y crea una cuenta.

### 2. Crear producto

1. Dashboard → Products → Add Product
2. Nombre: "Nombre de tu curso"
3. Precio: El que hayas decidido
4. Tipo: One-time (pago único)

### 3. Crear Payment Link

1. En el producto, click "Create payment link"
2. Configura opciones:
   - Permitir códigos promocionales (opcional)
   - Recoger dirección (no necesario para digital)
3. Copia el link

## Integración en tu web

### Opción 1: Link directo (Simple)

```html
<a href="https://buy.stripe.com/tu-link">
  Comprar Curso - $97
</a>
```

### Opción 2: Página de venta dedicada

Crea una landing page como `/premium` con:
- Propuesta de valor clara
- Lista de beneficios
- Precio destacado
- Botón de compra
- Garantía/FAQ

## Entrega del producto

### Opción A: Email manual

1. Stripe te notifica cada venta
2. Envías el ZIP por email manualmente
3. Simple pero no escala

### Opción B: Entrega automática

1. Usa Stripe + Webhook
2. Al pagar, envía email automático con link de descarga
3. Servicios: SendOwl, Gumroad, o custom

### Opción C: Acceso a repo privado

1. El alumno paga
2. Le das acceso a un repo privado de GitHub
3. Puede clonar y recibir actualizaciones

## Precios sugeridos

- Curso básico: $27-47
- Curso intermedio: $67-97
- Curso avanzado: $147-297
- Mentoría incluida: $497+

## Ejercicio final

1. Crea tu producto en Stripe
2. Genera el Payment Link
3. Integra el botón en tu web
4. Haz una compra de prueba (modo test)
5. Configura la entrega del producto

---

## Felicidades

Has completado el curso. Ahora tienes todo lo necesario para:

- Crear cursos interactivos con Claude Code
- Generar una web profesional
- Distribuir con GitHub Releases
- Monetizar con Stripe

El siguiente paso es HACERLO. Crea tu primer curso y lánzalo.

¿Dudas? Contacta en josu@yenze.io
