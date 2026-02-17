<!-- Suggested use: Start here for repository overview, setup steps, and shared workflows. -->
# IMPRINT

IMPRINT is a distributed RFID activation and interaction platform that treats RFID scans as intentional, authenticated physical inputs. The repository is designed to run inside a consistent VS Code Dev Container.

## Product Description
IMPRINT is a distributed, RFID-based activation and interaction platform that treats RFID scans as intentional, authenticated physical inputs, similar to pressing a button. Each scan generates a structured event that can trigger logging, system actions, or higher-level workflows through a centralized web system.

The platform integrates network-connected RFID scanners with a centralized backend and web-based dashboard. Scanners communicate directly with a centralized API layer, which ingests scan events, manages devices and credentials, and records when, where, and how an interaction occurred. A React-based frontend consumes this API to provide real-time visibility into activity, device status, and historical event data.

Each scanner provides immediate user feedback via LED indicators (green/red) and supports a minimum scan rate of one scan every three seconds per scanner. While IMPRINT can operate as a standalone solution for simple interaction logging or time-based actions, it is intentionally designed as an open, extensible foundation that can support more advanced RFID-driven systems. The architecture scales from small, single-location deployments to larger, multi-building environments wherever scanners can reach the API.

## Getting Started
1. Install Docker Desktop and VS Code.
2. Install the "Dev Containers" extension in VS Code.
3. Open this folder.
4. Click "Reopen in Container" when prompted.
5. Wait for initialization (npm install runs automatically).
6. Run `npm run verify` to check database connection.
7. Run `npm run dev` to start coding.

## Workspace Layout
- `backend/`: Node.js API service for ingesting scan events and returning status responses.
- `web-dashboard/`: Vite-powered React UI for real-time visibility.
- `infra/`: Docker orchestration and networking notes.
- `setup/`: Bootstrap and connectivity verification scripts.
- `docs/`: Architecture and onboarding documentation.
- `firmware/`: Hardware and firmware reference materials.
- `scripts/`: Repository-level automation scripts.

## Repository File Structure
```
.
├── backend/            # Node.js API service (Prisma, routes, services)
├── web-dashboard/      # React SPA (Vite, Tailwind, UI components)
│   ├── src/
│   │   ├── features/   # Feature-level screens and domain modules
│   │   └── ui/         # Reusable UI primitives and layout pieces
│   └── public/         # Static assets
├── packages/           # Shared packages and build tooling
├── infra/              # Docker orchestration and network notes
├── setup/              # Bootstrap scripts and connectivity checks
├── docs/               # Architecture and onboarding documentation
├── firmware/           # Hardware/firmware references
├── scripts/            # Repository-level automation
└── .devcontainer/      # VS Code dev container configuration
```

## Common Commands
- `npm run dev`: Run backend + web dashboard concurrently.
- `npm run verify`: Validate database connectivity from inside the dev container.
- `npm run db:generate`: Generate Prisma client.
- `npm run db:migrate`: Run Prisma migrations for the local database.

## Dependency Management Notes
This repo uses npm workspaces, which rely on a single root `package-lock.json`.
Keeping one lockfile is intentional so workspace dependency resolution stays
consistent across `backend/`, `web-dashboard/`, and `packages/`. To avoid
workspace lockfile conflicts, always run installs from the repository root
(`npm install`) and update dependency versions in each package’s
`package.json` rather than running `npm install` inside a workspace folder.

## Startup Order (Docker Compose)
- `postgres` starts first and is considered ready only after its `pg_isready` healthcheck succeeds.
- `app` uses `depends_on` with `condition: service_healthy`, so it waits for PostgreSQL readiness before starting.
- Inside the dev container, continue using `postgres` as the hostname in connection strings (`DATABASE_URL`).

## PostgreSQL Configuration
The dev container copies `.env.example` to `.env` on first boot. The PostgreSQL
service in `docker-compose.yml` loads values from `.env`, and Prisma reads
`DATABASE_URL` to connect. Update `POSTGRES_USER`, `POSTGRES_PASSWORD`,
`POSTGRES_DB`, or `DATABASE_URL` in `.env` if your database settings differ
from the defaults.
