#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════════
#                              RALPH LOOP v1.0
#                    Claude Code en Piloto Automático
#           Curso: Claude Code en Español - Módulo 3
# ═══════════════════════════════════════════════════════════════════════════════

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuración
MAX_ITERATIONS=${MAX_ITERATIONS:-0}  # 0 = infinito
PAUSE_SECONDS=${PAUSE_SECONDS:-10}
LOG_FILE="ralph_log_$(date +%Y%m%d_%H%M%S).txt"

# Contador de iteraciones
ITERATION=1

# Función para mostrar el banner
show_banner() {
    echo -e "${PURPLE}"
    echo "╔═══════════════════════════════════════════════════════════╗"
    echo "║                                                           ║"
    echo "║   ██████╗  █████╗ ██╗     ██████╗ ██╗  ██╗               ║"
    echo "║   ██╔══██╗██╔══██╗██║     ██╔══██╗██║  ██║               ║"
    echo "║   ██████╔╝███████║██║     ██████╔╝███████║               ║"
    echo "║   ██╔══██╗██╔══██║██║     ██╔═══╝ ██╔══██║               ║"
    echo "║   ██║  ██║██║  ██║███████╗██║     ██║  ██║               ║"
    echo "║   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝               ║"
    echo "║                                                           ║"
    echo "║              Claude Code en Piloto Automático             ║"
    echo "║                                                           ║"
    echo "╚═══════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Función para mostrar estado del plan
show_plan_status() {
    if [ -f "PLAN.md" ]; then
        local completed=$(grep -c "\[x\]" PLAN.md 2>/dev/null || echo "0")
        local pending=$(grep -c "\[ \]" PLAN.md 2>/dev/null || echo "0")
        local total=$((completed + pending))

        if [ $total -gt 0 ]; then
            local percent=$((completed * 100 / total))
            echo -e "${CYAN}📊 Progreso: ${GREEN}$completed${NC}/${YELLOW}$total${NC} tareas (${percent}%)"

            # Barra de progreso
            local bar_width=30
            local filled=$((percent * bar_width / 100))
            local empty=$((bar_width - filled))

            echo -n "   ["
            printf "${GREEN}%${filled}s${NC}" | tr ' ' '█'
            printf "${YELLOW}%${empty}s${NC}" | tr ' ' '░'
            echo "]"
        fi
    fi
}

# Función para logging
log() {
    local message="$1"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $message" >> "$LOG_FILE"
}

# Función de limpieza al salir
cleanup() {
    echo ""
    echo -e "${YELLOW}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}  🛑 RALPH LOOP DETENIDO${NC}"
    echo -e "${YELLOW}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "📊 Resumen de la sesión:"
    echo -e "   • Iteraciones completadas: ${GREEN}$((ITERATION - 1))${NC}"
    echo -e "   • Log guardado en: ${CYAN}$LOG_FILE${NC}"

    show_plan_status

    echo ""
    log "=== SESIÓN TERMINADA ==="
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT SIGTERM

# Verificar archivos necesarios
check_requirements() {
    local missing=0

    if [ ! -f "PROMPT_build.md" ]; then
        echo -e "${RED}❌ Falta: PROMPT_build.md${NC}"
        missing=1
    fi

    if [ ! -f "PLAN.md" ]; then
        echo -e "${RED}❌ Falta: PLAN.md${NC}"
        missing=1
    fi

    if [ ! -f "PROGRESS.md" ]; then
        echo -e "${YELLOW}⚠️  Creando PROGRESS.md vacío...${NC}"
        echo "# PROGRESS.md - Aprendizajes del Proyecto" > PROGRESS.md
        echo "" >> PROGRESS.md
        echo "## Decisiones de Arquitectura" >> PROGRESS.md
        echo "(se llenarán durante el desarrollo)" >> PROGRESS.md
    fi

    if ! command -v claude &> /dev/null; then
        echo -e "${RED}❌ Claude Code no está instalado${NC}"
        echo "   Instálalo con: npm install -g @anthropic-ai/claude-code"
        missing=1
    fi

    return $missing
}

# === INICIO DEL SCRIPT ===

clear
show_banner

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  🚀 INICIANDO RALPH LOOP${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "📁 Proyecto: ${CYAN}$(pwd)${NC}"
echo -e "📝 Log: ${CYAN}$LOG_FILE${NC}"
echo -e "⏰ Inicio: ${CYAN}$(date)${NC}"
echo ""

# Verificar requisitos
echo -e "${YELLOW}🔍 Verificando requisitos...${NC}"
if ! check_requirements; then
    echo ""
    echo -e "${RED}Por favor, crea los archivos faltantes antes de continuar.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Todos los archivos están listos${NC}"
echo ""

show_plan_status
echo ""

echo -e "${YELLOW}⌨️  Presiona Ctrl+C para detener${NC}"
echo ""

# Guardar inicio en log
log "=== RALPH LOOP INICIADO ==="
log "Directorio: $(pwd)"

# Loop principal
while true; do
    echo -e "${GREEN}───────────────────────────────────────────────────────────${NC}"
    echo -e "${GREEN}  📍 ITERACIÓN #$ITERATION${NC}"
    echo -e "${GREEN}───────────────────────────────────────────────────────────${NC}"
    echo -e "⏰ $(date)"
    echo ""

    show_plan_status
    echo ""

    # Guardar en log
    log "--- Iteración #$ITERATION ---"

    # Ejecutar Claude
    echo -e "${BLUE}🤖 Ejecutando Claude...${NC}"
    echo ""

    # El comando principal
    if claude -p "$(cat PROMPT_build.md)" 2>&1 | tee -a "$LOG_FILE"; then
        echo ""
        echo -e "${GREEN}✅ Iteración #$ITERATION completada${NC}"
        log "Iteración #$ITERATION: ÉXITO"
    else
        echo ""
        echo -e "${YELLOW}⚠️  Iteración #$ITERATION terminó con warnings${NC}"
        log "Iteración #$ITERATION: WARNING"
    fi

    # Verificar límite de iteraciones
    if [ $MAX_ITERATIONS -gt 0 ] && [ $ITERATION -ge $MAX_ITERATIONS ]; then
        echo ""
        echo -e "${YELLOW}🏁 Alcanzado límite de $MAX_ITERATIONS iteraciones${NC}"
        cleanup
    fi

    # Incrementar contador
    ITERATION=$((ITERATION + 1))

    # Pausa antes de siguiente iteración
    echo ""
    echo -e "${CYAN}⏳ Siguiente iteración en $PAUSE_SECONDS segundos...${NC}"
    echo -e "${CYAN}   (Ctrl+C para detener)${NC}"
    sleep $PAUSE_SECONDS
done
