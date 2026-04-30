#!/bin/bash

# Forge Zero-Config Installer
# Autonomous agent orchestration infrastructure

set -e

# Colors
PURPLE='\033[0;35m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'
BOLD='\033[1m'

print_logo() {
    echo -e "${PURPLE}${BOLD}"
    echo " /$$$$$$$$ /$$$$$$  /$$$$$$$   /$$$$$$  /$$$$$$$$"
    echo "| $$_____//$$__  $$| $$__  $$ /$$__  $$| $$_____/"
    echo "| $$     | $$  \ $$| $$  \ $$| $$  \__/| $$"
    echo "| $$$$$  | $$  | $$| $$$$$$$/| $$ /$$$$| $$$$$"
    echo "| $$__/  | $$  | $$| $$__  $$| $$|_  $$| $$__/"
    echo "| $$     | $$  | $$| $$  \ $$| $$  \ $$| $$"
    echo "| $$     |  $$$$$$/| $$  | $$|  $$$$$$/| $$$$$$$$"
    echo "|__/      \______/ |__/  |__/ \______/ |________/"
    echo -e "${NC}"
    echo -e "${BOLD}  WiBX Labs  |  Forge Engine  |  Installer${NC}"
    echo ""
}

# 0. Version Detection
get_latest_version() {
    local version=""
    # Try using git ls-remote if git is installed
    if command -v git >/dev/null 2>&1; then
        version=$(git ls-remote --tags --sort='v:refname' https://github.com/Wibx-LABS/forge.git | tail -n1 | sed 's/.*\///')
    fi

    # Fallback to GitHub API if git fails or version is empty
    if [ -z "$version" ]; then
        version=$(curl -s "https://api.github.com/repos/Wibx-LABS/forge/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
    fi

    # Final fallback to current known version
    if [ -z "$version" ]; then
        version="v3.1.3"
    fi
    echo "$version"
}

FORGE_VERSION=$(get_latest_version)

print_logo
echo -e "${BOLD}Iniciando a instalação do Forge Engine ${FORGE_VERSION}...${NC}"
echo "------------------------------------------------"

# 1. Environment Detection
OS="$(uname -s)"
ARCH="$(uname -m)"

case "${OS}" in
    Darwin)  PLATFORM="macos" ;;
    Linux)   PLATFORM="linux" ;;
    *)       echo -e "${RED}Erro: Sistema operacional não suportado: ${OS}${NC}"; exit 1 ;;
esac

case "${ARCH}" in
    x86_64) BIN_ARCH="x64" ;;
    arm64)  BIN_ARCH="arm64" ;;
    *)      echo -e "${RED}Erro: Arquitetura não suportada: ${ARCH}${NC}"; exit 1 ;;
esac

echo -e "${BLUE}[1/5]${NC} Detectado: ${BOLD}${PLATFORM} (${ARCH})${NC}"

# 2. Prepare Directory
FORGE_HOME="$HOME/.forge-framework"
FORGE_BIN_DIR="$FORGE_HOME/bin"

if [ -d "$FORGE_HOME" ]; then
    echo -e "${YELLOW}Atualizando instalação existente em $FORGE_HOME...${NC}"
else
    echo -e "${BLUE}[2/5]${NC} Criando diretório base em $FORGE_HOME..."
    mkdir -p "$FORGE_HOME"
fi

# Clone repository for knowledge and templates
if [ -d "$FORGE_HOME/.git" ]; then
    cd "$FORGE_HOME" && git pull origin main
else
    git clone --depth 1 https://github.com/Wibx-LABS/forge.git "$FORGE_HOME"
fi

mkdir -p "$FORGE_BIN_DIR"

# 3. Download Standalone Binary
BINARY_URL="https://github.com/Wibx-LABS/forge/releases/latest/download/forge-${PLATFORM}-${BIN_ARCH}"
echo -e "${BLUE}[3/5]${NC} Baixando o binário executável..."

if ! curl -sL --fail -o "$FORGE_BIN_DIR/forge" "$BINARY_URL"; then
    echo -e "${YELLOW}Aviso: Binário pré-compilado não encontrado.${NC}"
    echo -e "Tentando instalar via NPM (requer Node.js)..."
    if command -v npm >/dev/null 2>&1; then
        cd "$FORGE_HOME/tools/forge-cli"
        npm install && npm run build
        ln -sf "$FORGE_HOME/tools/forge-cli/bin/run.js" "$FORGE_BIN_DIR/forge"
        chmod +x "$FORGE_BIN_DIR/forge"
    else
        echo -e "${RED}Erro: Binário não encontrado e Node.js não instalado.${NC}"
        exit 1
    fi
else
    chmod +x "$FORGE_BIN_DIR/forge"
fi

# 4. Configuration
echo -e "${BLUE}[4/5]${NC} Configurando o ambiente..."

RC_FILE="$HOME/.forgerc.json"
cat > "$RC_FILE" <<EOF
{
  "forgePath": "$FORGE_HOME",
  "defaultAutonomyLevel": "phase-gated"
}
EOF

# 5. Path Setup
SHELL_RC=""
if [[ "$SHELL" == */zsh ]]; then
    SHELL_RC="$HOME/.zshrc"
elif [[ "$SHELL" == */bash ]]; then
    if [ -f "$HOME/.bashrc" ]; then
        SHELL_RC="$HOME/.bashrc"
    else
        SHELL_RC="$HOME/.bash_profile"
    fi
fi

if [ -n "$SHELL_RC" ]; then
    if ! grep -q ".forge-framework/bin" "$SHELL_RC"; then
        echo -e "\n# Forge CLI\nexport PATH=\"\$HOME/.forge-framework/bin:\$PATH\"" >> "$SHELL_RC"
        echo -e "${GREEN}Sucesso: PATH adicionado ao seu $SHELL_RC${NC}"
    fi
else
    echo -e "${YELLOW}Aviso: Adicione manualmente ao seu PATH:${NC}"
    echo "export PATH=\"\$HOME/.forge-framework/bin:\$PATH\""
fi

echo "------------------------------------------------"
echo -e "${GREEN}${BOLD}Forge instalado com sucesso!${NC}"
echo ""
echo -e "Para começar, reinicie o terminal ou execute:"
echo -e "${CYAN}source $SHELL_RC${NC}"
echo ""
echo -e "Depois, execute seu primeiro comando:"
echo -e "${BOLD}forge init${NC}"
echo ""
