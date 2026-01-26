#!/bin/bash
# 🔄 Ralph Loop para aprende.software
# Ejecuta tareas de forma autónoma hasta completar el plan

set -e

echo "🚀 Iniciando Ralph Loop..."
echo "📋 Leyendo PLAN.md para tareas pendientes"
echo ""

ITERATION=0

while true; do
  ITERATION=$((ITERATION + 1))
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🔄 Iteración #$ITERATION - $(date '+%H:%M:%S')"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  # Ejecutar Claude Code con el prompt de build
  OUTPUT=$(claude --dangerously-skip-permissions -p "$(cat PROMPT_build.md)" 2>&1) || true
  
  echo "$OUTPUT"
  
  # Detectar si Ralph terminó todas las tareas
  if echo "$OUTPUT" | grep -q "<ralph>COMPLETE</ralph>"; then
    echo ""
    echo "✅ ¡Ralph ha completado todas las tareas!"
    echo "📊 Total de iteraciones: $ITERATION"
    exit 0
  fi
  
  # Detectar si Ralph está bloqueado
  if echo "$OUTPUT" | grep -q "<ralph>STUCK</ralph>"; then
    echo ""
    echo "⚠️  Ralph está bloqueado. Revisa PLAN.md para ver qué tareas fallaron."
    exit 1
  fi
  
  echo ""
  echo "⏳ Esperando 3 segundos antes de siguiente iteración..."
  sleep 3
done
