#!/usr/bin/env bash
set -euo pipefail

slugify() {
  echo "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g'
}

if [[ $# -lt 1 ]]; then
  echo "Usage: npm run memory:new -- \"short title\""
  exit 1
fi

TITLE_INPUT="$*"
ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
MEMORY_DIR="$ROOT_DIR/.github/memory"
INDEX_FILE="$MEMORY_DIR/index.md"

mkdir -p "$MEMORY_DIR"

if [[ ! -f "$INDEX_FILE" ]]; then
  cat > "$INDEX_FILE" <<'EOF'
# Memory Index

Track every feature request or significant change here.

| Index | Date | Branch | Title | Note |
|---|---|---|---|---|
EOF
fi

BRANCH_RAW="$(git -C "$ROOT_DIR" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "no-branch")"
BRANCH_SLUG="$(slugify "$BRANCH_RAW")"
TITLE_SLUG="$(slugify "$TITLE_INPUT")"
DATE="$(date +%F)"

MAX_INDEX=0
for file in "$MEMORY_DIR"/[0-9][0-9][0-9][0-9]-*.md; do
  [[ -e "$file" ]] || continue
  base_name="$(basename "$file")"
  idx="${base_name:0:4}"
  if [[ "$idx" =~ ^[0-9]{4}$ ]]; then
    num=$((10#$idx))
    if (( num > MAX_INDEX )); then
      MAX_INDEX=$num
    fi
  fi
done

NEXT_NUM=$((MAX_INDEX + 1))
NEXT_INDEX="$(printf "%04d" "$NEXT_NUM")"
FILE_NAME="$NEXT_INDEX-$BRANCH_SLUG-$TITLE_SLUG.md"
FILE_PATH="$MEMORY_DIR/$FILE_NAME"

if [[ -f "$FILE_PATH" ]]; then
  echo "Memory file already exists: $FILE_PATH"
  exit 1
fi

cat > "$FILE_PATH" <<EOF
# Memory $NEXT_INDEX - $TITLE_INPUT

- **Index:** $NEXT_INDEX
- **Date:** $DATE
- **Branch:** $BRANCH_RAW
- **Request:** $TITLE_INPUT

## Implemented Changes

- <change 1>
- <change 2>

## Files Touched

- <path/to/file>

## Follow-ups / TODOs

- <todo or none>
EOF

TABLE_TITLE="${TITLE_INPUT//|/\\|}"
echo "| $NEXT_INDEX | $DATE | $BRANCH_RAW | $TABLE_TITLE | [$FILE_NAME](./$FILE_NAME) |" >> "$INDEX_FILE"

echo "Created: $FILE_PATH"
echo "Updated: $INDEX_FILE"
