#!/usr/bin/env bash
set -euo pipefail

ARTIFACT_DIR="${1:?Usage: convert-to-spring-ui.sh <artifact-dir>}"
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE_DIR="${SKILL_DIR}/template"

if [ ! -d "$ARTIFACT_DIR" ]; then
  echo "Error: artifact directory '$ARTIFACT_DIR' does not exist" >&2
  exit 1
fi

BASENAME="$(basename "$ARTIFACT_DIR")"

TITLE="$(echo "$BASENAME" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')"

echo "Converting ${ARTIFACT_DIR} to Spring UI..."
echo "  Workspace name: @workspace/${BASENAME}"
echo "  Title: ${TITLE}"

echo "  Removing existing files (preserving .replit-artifact/)..."
find "$ARTIFACT_DIR" -mindepth 1 -maxdepth 1 ! -name '.replit-artifact' -exec rm -rf {} +

echo "  Copying Spring UI template..."
tar -C "$TEMPLATE_DIR" -cf - . | tar -C "$ARTIFACT_DIR" -xf -

echo "  Setting workspace name and title..."
sed -i "s|@workspace/PLACEHOLDER_NAME|@workspace/${BASENAME}|g" "${ARTIFACT_DIR}/package.json"
sed -i "s|<title>PLACEHOLDER_TITLE</title>|<title>${TITLE}</title>|g" "${ARTIFACT_DIR}/index.html"

echo "  Running pnpm install..."
pnpm install

echo "Done! ${ARTIFACT_DIR} is now a Spring UI mockup-sandbox app."
