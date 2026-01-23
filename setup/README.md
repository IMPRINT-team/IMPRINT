<!-- Suggested use: Explain how to bootstrap and verify the local development environment. -->
# Setup Scripts

## Overview
Use the scripts in this folder to bootstrap the local environment and verify container connectivity.

## Scripts
- `bootstrap.sh`: Initializes the dev container experience and dependencies.
- `bootstrap.sh` syncs the root `.env` into `backend/.env` so Prisma CLI commands can read `DATABASE_URL`.
- `verify_connections.sh`: Confirms services can reach PostgreSQL on the Docker network.
- `reset-db.sh`: Drops the local Postgres volume and restarts the service.

## Usage
Run scripts from the repo root or directly within the dev container:
- `./setup/bootstrap.sh`
- `./setup/verify_connections.sh`
- `./setup/reset-db.sh`

## Prisma Workflow
- Generate client: `npm run db:generate`
- Run initial migration: `npm run db:migrate`
