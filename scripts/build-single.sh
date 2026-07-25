#!/bin/sh
# Build the single-file version (dist/incorporation.html) for artifacts/itch.
set -e
cd "$(dirname "$0")/.."
mkdir -p dist
{
  echo '<title>Incorporation</title>'
  echo '<style>'; cat style.css; echo '</style>'
  sed -n '/<body>/,/<script src/p' index.html | sed '1d;$d'
  echo '<script>'
  cat js/helpers.js js/data.js js/world.js js/state.js js/render.js js/main.js
  echo '</script>'
} > dist/incorporation.html
echo "built dist/incorporation.html ($(wc -c < dist/incorporation.html) bytes)"
