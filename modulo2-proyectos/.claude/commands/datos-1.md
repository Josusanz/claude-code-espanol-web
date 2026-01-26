---
description: 📊 Datos - Lección 1: Procesar CSVs
---

# Proyecto Análisis de Datos - Lección 1

## Contexto para el tutor

Primera lección del proyecto de análisis de datos. El alumno aprenderá a procesar archivos CSV con Claude Code.

## Estructura de la lección

### 1. El poder del análisis de datos (3 min)

> "Los datos están en todas partes: ventas, métricas, encuestas, logs... Pero datos sin análisis no sirven de nada.
>
> Con Claude Code puedes:
> - Leer y entender archivos de datos
> - Calcular estadísticas
> - Encontrar patrones
> - Crear visualizaciones
> - Todo sin saber programar análisis complejos"

### 2. Crear datos de práctica (5 min)

> "Primero, vamos a crear unos datos de ejemplo para practicar."

```bash
mkdir -p mis-datos
cat > mis-datos/ventas.csv << 'EOF'
fecha,producto,cantidad,precio,region
2024-01-15,Laptop,3,999.99,Norte
2024-01-15,Mouse,10,29.99,Norte
2024-01-16,Laptop,2,999.99,Sur
2024-01-16,Teclado,5,79.99,Sur
2024-01-17,Monitor,4,299.99,Norte
2024-01-17,Mouse,8,29.99,Centro
2024-01-18,Laptop,1,999.99,Centro
2024-01-18,Teclado,3,79.99,Norte
2024-01-19,Monitor,2,299.99,Sur
2024-01-19,Mouse,15,29.99,Norte
2024-01-20,Laptop,4,999.99,Norte
2024-01-20,Teclado,7,79.99,Centro
EOF
```

### 3. Explorar los datos (5 min)

> "Primero, entendamos qué tenemos."

```bash
# Ver las primeras líneas
head mis-datos/ventas.csv

# Contar filas
wc -l mis-datos/ventas.csv
```

> "Tenemos datos de ventas con: fecha, producto, cantidad, precio y región. Ahora hagamos preguntas."

### 4. Hacer preguntas a los datos (10 min)

Guía al alumno a hacer preguntas:

> "¿Qué te gustaría saber de estos datos? Por ejemplo:
>
> - ¿Cuántas ventas totales hay?
> - ¿Qué producto se vende más?
> - ¿Qué región genera más ingresos?
> - ¿Cuál es el ticket promedio?
>
> Dime qué quieres saber y lo calculamos."

Para cada pregunta, muestra cómo Claude puede responderla con un script simple o explicación.

Ejemplo - Total de ventas por producto:

```bash
# Calcular total por producto
awk -F',' 'NR>1 {sum[$2]+=$3} END {for(p in sum) print p": "sum[p]" unidades"}' mis-datos/ventas.csv
```

### 5. Concepto: Preguntas → Código → Respuestas

> "💡 **El patrón del análisis de datos:**
>
> 1. **Pregunta**: ¿Qué quiero saber?
> 2. **Código**: Claude genera el script
> 3. **Respuesta**: Obtienes el insight
>
> No necesitas saber programar. Solo necesitas saber **qué preguntar**."

### 6. Transición

> "¡Genial! Ya sabes explorar datos con Claude. En la siguiente lección haremos un análisis completo con visualizaciones.
>
> Escribe `/datos-2` para continuar."
