#!/usr/bin/env bash
set -euo pipefail

echo "Stopping containers and removing volumes..."
docker compose down --volumes

echo "Starting postgres..."
docker compose up -d postgres

echo "Database reset complete."
