#!/usr/bin/env bash
set -euo pipefail

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

docker compose build

echo "Bootstrap complete. Next steps:"
echo "1) docker compose up -d"
echo "2) ./setup/verify_connections.sh"
