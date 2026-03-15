#!/usr/bin/env bash
set -euo pipefail

ARTIFACT_DIR="${1:?Usage: convert-to-spring-ui.sh <artifact-dir>}"
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE_DIR="$SKILL_DIR/template"

if [ ! -d "$ARTIFACT_DIR" ]; then
  echo "ERROR: artifact directory '$ARTIFACT_DIR' does not exist" >&2
  exit 1
fi

echo "==> Converting Expo artifact to Spring UI tokens: $ARTIFACT_DIR"

mkdir -p "$ARTIFACT_DIR/constants"

cp "$TEMPLATE_DIR/constants/theme.ts" "$ARTIFACT_DIR/constants/theme.ts"
echo "    copied constants/theme.ts (Spring UI design tokens)"

cp "$TEMPLATE_DIR/constants/colors.ts" "$ARTIFACT_DIR/constants/colors.ts"
echo "    copied constants/colors.ts (updated to use Spring theme)"

echo "==> Done. Spring UI token-only conversion complete."
echo "    No npm packages changed — tokens are pure TypeScript values."
echo "    Use lightTheme/darkTheme from constants/theme.ts in StyleSheet.create()."
