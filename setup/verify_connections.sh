#!/usr/bin/env bash
set -euo pipefail

if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

services=(postgres)
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

postgres_user="${POSTGRES_USER:-imprint}"
postgres_db="${POSTGRES_DB:-imprint}"

echo "Verifying container connectivity..."
check "postgres is accepting connections" "docker compose exec -T postgres pg_isready -U \"$postgres_user\" -d \"$postgres_db\""
check "prisma can reach postgres" "npm run verify"

if [ "$failures" -eq 0 ]; then
  echo "All connectivity checks passed."
  exit 0
fi

echo "One or more connectivity checks failed."
exit 1
