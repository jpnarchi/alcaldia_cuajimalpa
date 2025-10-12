#!/bin/bash

# Script para establecer el túnel SSH a MongoDB
# Uso: ./connect-ssh.sh

echo "╔════════════════════════════════════════════╗"
echo "║   Conexión SSH a MongoDB - TC2007B        ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Verificar si ya existe un túnel SSH activo
if lsof -Pi :27017 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  ADVERTENCIA: Ya existe un servicio escuchando en el puerto 27017"
    echo ""
    read -p "¿Deseas continuar de todos modos? (s/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo "❌ Operación cancelada"
        exit 1
    fi
fi

# Solicitar datos al usuario
echo "📝 Ingresa los datos de conexión:"
echo ""
read -p "IP del servidor (ej: 192.168.1.100): " SSH_HOST
read -p "Usuario SSH (ej: alumno): " SSH_USER

# Verificar que no estén vacíos
if [ -z "$SSH_HOST" ] || [ -z "$SSH_USER" ]; then
    echo ""
    echo "❌ Error: Debes proporcionar la IP y el usuario"
    exit 1
fi

# Mostrar resumen
echo ""
echo "📋 Resumen de conexión:"
echo "   Host: $SSH_USER@$SSH_HOST"
echo "   Puerto local: 27017"
echo "   Puerto remoto: 27017"
echo ""
echo "🔐 Se te pedirá la contraseña SSH..."
echo ""
echo "💡 Tip: Mantén esta terminal abierta mientras trabajas"
echo "   Presiona Ctrl+C para cerrar el túnel cuando termines"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Establecer el túnel SSH
ssh -L 27017:localhost:27017 "$SSH_USER@$SSH_HOST"

# Si el túnel se cierra
echo ""
echo "🔌 Túnel SSH cerrado"


