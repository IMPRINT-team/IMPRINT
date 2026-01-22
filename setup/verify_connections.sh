#!/usr/bin/env bash
set -euo pipefail

services=(mongo backend web-dashboard)
missing=0

echo "Checking running containers..."
for service in "${services[@]}"; do
  if docker compose ps --status running --services | grep -qx "$service"; then
    echo "✓ $service is running"
  else
    echo "✗ $service is not running"
    missing=1
  fi
done

if [ "$missing" -ne 0 ]; then
  echo "One or more services are not running. Start the stack with 'docker compose up -d'."
  exit 1
fi

failures=0

check() {
  local label="$1"
  local command="$2"

  if eval "$command"; then
    echo "✓ $label"
  else
    echo "✗ $label"
    failures=1
  fi
}

echo "Verifying container connectivity..."
check "backend can reach mongo" "docker compose exec -T backend sh -c 'nc -z mongo 27017'"
check "web-dashboard can reach backend" "docker compose exec -T web-dashboard sh -c 'curl -sf http://backend:8080/ >/dev/null'"

if [ "$failures" -eq 0 ]; then
  echo "All connectivity checks passed."
  exit 0
fi

echo "One or more connectivity checks failed."
exit 1
