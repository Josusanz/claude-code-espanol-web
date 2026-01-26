---
description: 📊 Datos - Lección 2: Análisis y Visualización
---

# Proyecto Análisis de Datos - Lección 2

## Contexto para el tutor

El alumno ya sabe explorar CSVs. Ahora va a crear un análisis completo con visualizaciones.

## Estructura de la lección

### 1. El proyecto final (2 min)

> "Vamos a crear un **informe de análisis de datos** completo. Incluirá:
>
> - Resumen de métricas clave
> - Análisis por dimensiones (producto, región, tiempo)
> - Visualizaciones (gráficos ASCII o HTML)
> - Conclusiones y recomendaciones"

### 2. Elegir los datos (5 min)

Pregunta al alumno:

> "¿Qué datos quieres analizar?
>
> **Opción A**: Usar los datos de ventas de la lección anterior
> **Opción B**: Traer tu propio archivo CSV
> **Opción C**: Crear datos ficticios de algo que te interese
>
> ¿Cuál prefieres?"

Si elige opción B, ayúdale a cargar su archivo.
Si elige opción C, ayúdale a generar datos realistas.

### 3. Análisis estructurado (15 min)

Realiza el análisis paso a paso:

**Paso 1: Métricas generales**

```bash
# Total de registros
echo "📊 RESUMEN GENERAL"
echo "=================="
wc -l < mis-datos/ventas.csv | xargs -I {} echo "Total registros: {} (sin cabecera: $((${} - 1)))"
```

> "Primero, las métricas básicas: cuántos registros, rango de fechas, totales."

**Paso 2: Análisis por dimensión**

> "Ahora analizamos por cada dimensión importante."

```bash
# Ventas por producto
echo ""
echo "📦 VENTAS POR PRODUCTO"
echo "======================"
awk -F',' 'NR>1 {
  cant[$2]+=$3;
  ing[$2]+=$3*$4
} END {
  for(p in cant) printf "%s: %d unidades ($%.2f)\n", p, cant[p], ing[p]
}' mis-datos/ventas.csv | sort -t'$' -k2 -rn
```

```bash
# Ventas por región
echo ""
echo "🗺️ VENTAS POR REGIÓN"
echo "===================="
awk -F',' 'NR>1 {
  ing[$5]+=$3*$4
} END {
  for(r in ing) printf "%s: $%.2f\n", r, ing[r]
}' mis-datos/ventas.csv | sort -t'$' -k2 -rn
```

**Paso 3: Visualización simple**

> "Creemos un gráfico de barras ASCII."

```bash
# Gráfico de barras ASCII
echo ""
echo "📊 GRÁFICO DE VENTAS POR REGIÓN"
echo "==============================="
awk -F',' 'NR>1 {ing[$5]+=$3*$4} END {
  max=0; for(r in ing) if(ing[r]>max) max=ing[r]
  for(r in ing) {
    bars=int(ing[r]/max*30)
    printf "%-8s |", r
    for(i=0;i<bars;i++) printf "█"
    printf " $%.0f\n", ing[r]
  }
}' mis-datos/ventas.csv
```

### 4. Crear el informe (10 min)

> "Vamos a guardar todo en un informe Markdown."

```bash
# Crear informe completo
cat > mis-datos/informe-analisis.md << 'EOF'
# Informe de Análisis de Ventas

## Resumen Ejecutivo

[Métricas principales aquí]

## Análisis por Producto

[Tabla con ventas por producto]

## Análisis por Región

[Tabla con ventas por región]

## Visualizaciones

[Gráficos]

## Conclusiones

1. [Primera conclusión]
2. [Segunda conclusión]
3. [Tercera conclusión]

## Recomendaciones

- [Recomendación 1]
- [Recomendación 2]

---
*Informe generado con Claude Code*
EOF
```

Ayuda al alumno a llenar cada sección con los datos reales del análisis.

### 5. Conclusiones del análisis

> "¿Qué conclusiones sacas de los datos? Por ejemplo:
>
> - ¿Qué producto deberían promocionar más?
> - ¿Qué región necesita más atención?
> - ¿Hay tendencias que deberían investigar?"

### 6. Celebrar el logro

> "🎉 ¡FELICIDADES! Has completado el Módulo 2: Proyectos Prácticos.
>
> **Resumen de lo que lograste:**
> ✅ Creaste una landing page profesional
> ✅ Automatizaste tareas repetitivas
> ✅ Realizaste investigaciones estructuradas
> ✅ Analizaste datos y creaste informes
>
> **Has demostrado que puedes:**
> - Usar Claude Code para crear proyectos reales
> - Aplicar un flujo de trabajo profesional
> - Pasar de idea a resultado terminado"

### 7. Siguiente módulo

> "¿Listo para el siguiente nivel?
>
> El **Módulo 3: Ralph Loop** te enseña a poner Claude en piloto automático. Es contenido premium.
>
> Escribe `/progreso-m2` para ver tu progreso completo, o visita la página de Ralph Loop para más información."
