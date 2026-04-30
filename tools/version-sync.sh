#!/bin/bash

# Forge Version Sync Utility
# Usage: ./version-sync.sh <new_version>

NEW_VERSION=$1

if [ -z "$NEW_VERSION" ]; then
    echo "Usage: $0 <new_version> (e.g., 3.1.2)"
    exit 1
fi

# Strip 'v' if present
CLEAN_VERSION=$(echo $NEW_VERSION | sed 's/^v//')

echo "Synchronizing Forge Engine to v$CLEAN_VERSION..."

# 1. Update package.json
if [ -f "tools/forge-cli/package.json" ]; then
    sed -i '' "s/\"version\": \".*\"/\"version\": \"$CLEAN_VERSION\"/" tools/forge-cli/package.json
    echo "[OK] tools/forge-cli/package.json updated"
fi

# 2. Update README.md
if [ -f "README.md" ]; then
    # Update Version header
    sed -i '' "s/\*\*Version:\*\* .* (Stable)/**Version:** $CLEAN_VERSION (Stable)/" README.md
    # Update living library reference
    sed -i '' "s/Forge Engine (v.*) is a living library/Forge Engine (v$CLEAN_VERSION) is a living library/" README.md
    # Update footer
    sed -i '' "s/\*\*Version:\*\* .* (Stable)/**Version:** $CLEAN_VERSION (Stable)/" README.md # Matches the footer too
    echo "[OK] README.md updated"
fi

# 3. Update CLI source (if hardcoded fallback exists)
if [ -f "tools/forge-cli/src/commands/init.ts" ]; then
    sed -i '' "s/FORGE_VERSION: string = pkg.version ?? '.*'/FORGE_VERSION: string = pkg.version ?? '$CLEAN_VERSION'/" tools/forge-cli/src/commands/init.ts
    echo "[OK] tools/forge-cli/src/commands/init.ts updated"
fi

# 4. Update install.sh fallback
if [ -f "install.sh" ]; then
    sed -i '' "s/version=\"v.*\"/version=\"v$CLEAN_VERSION\"/" install.sh
    echo "[OK] install.sh fallback updated"
fi

echo "Done. Don't forget to run 'npm install' in tools/forge-cli and commit changes."
