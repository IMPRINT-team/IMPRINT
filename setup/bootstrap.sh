#!/usr/bin/env bash
set -euo pipefail

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

cp .env backend/.env

docker compose up -d postgres
npm install

npm run db:generate -w backend
npm run db:migrate -w backend
npm run verify

echo "Bootstrap complete."
