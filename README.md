<!-- Suggested use: Start here for repository overview, setup steps, and shared workflows. -->
# IMPRINT

IMPRINT is a distributed RFID activation and interaction platform that treats RFID scans as intentional, authenticated physical inputs. The repository is designed to run inside a consistent VS Code Dev Container.

## Product Description
IMPRINT is a distributed, RFID-based activation and interaction platform that treats RFID scans as intentional, authenticated physical inputs, similar to pressing a button. Each scan generates a structured event that can trigger logging, system actions, or higher-level workflows through a centralized web system.

The platform integrates network-connected RFID scanners with a centralized backend and web-based dashboard. Scanners communicate directly with a centralized API layer, which ingests scan events, manages devices and credentials, and records when, where, and how an interaction occurred. A React-based frontend consumes this API to provide real-time visibility into activity, device status, and historical event data.

Each scanner provides immediate user feedback via LED indicators (green/red) and supports a minimum scan rate of one scan every three seconds per scanner. While IMPRINT can operate as a standalone solution for simple interaction logging or time-based actions, it is intentionally designed as an open, extensible foundation that can support more advanced RFID-driven systems. The architecture scales from small, single-location deployments to larger, multi-building environments wherever scanners can reach the API.

## Getting Started (Dev Container)
1. Install Docker Desktop and VS Code.
2. Install the "Dev Containers" extension in VS Code.
3. Open this folder.
4. Click "Reopen in Container" when prompted.
5. Wait for initialization (npm install runs automatically).
6. Run `npm run verify` to check database connection.
7. Run `npm run dev` to start coding.

## Deploy Quickstart (Homelab / Prod-like)
1. `cp deploy/.env.example deploy/.env`
2. `docker compose -f deploy/docker-compose.yml up -d`
3. Open `http://Imprint` (or use your host LAN IP if DNS/hosts for `Imprint` is not configured).

Routing in deploy mode is single-origin through Caddy:
- `/api/*` -> backend API (`backend:8080`)
- everything else -> frontend SPA

The deploy stack also runs a one-off `migrate` service (`prisma migrate deploy`) before backend startup.

## Access from LAN (phone/tablet/other devices)
To access the deploy stack from another device on your local network, ensure the client can resolve `Imprint` to the machine running Docker/Caddy.

1. Find the host machine LAN IP (example: `192.168.1.42`).
2. Configure name resolution for `Imprint`:
   - Preferred: add a DNS `A` record in your router/local DNS (`Imprint` -> host LAN IP).
   - Quick test: add a hosts entry on the client device (`192.168.1.42 Imprint`).
3. Ensure firewall rules allow inbound HTTP on TCP `80`.
4. From the client device, open `http://Imprint`.

If you cannot configure DNS/hosts, open `http://<host-lan-ip>` directly instead.

## Workspace Layout
- `backend/`: Node.js API service (Express + Prisma).
- `web-dashboard/`: Vite-powered React UI.
- `deploy/`: homelab/prod-like compose stack (Caddy + frontend + migrate + backend + postgres).
- `docs/`: architecture, onboarding, and deploy documentation.
- `infra/`: Docker orchestration and networking notes.
- `setup/`: bootstrap and connectivity verification scripts.
- `firmware/`: hardware and firmware reference materials.
- `scripts/`: repository-level automation scripts.

## Repository File Structure
```
.
├── backend/              # Node.js API service (Express, Prisma)
├── web-dashboard/        # React SPA (Vite, Tailwind, DaisyUI)
│   ├── src/
│   │   ├── components/   # UI components, dashboard modules, stores
│   │   ├── lib/          # Shared frontend helpers (e.g., API base)
│   │   └── pages/        # Route-level pages
│   └── public/           # Static assets
├── deploy/               # Caddy + compose deploy stack (+ migrate job)
├── packages/             # Shared packages and build tooling
├── docs/                 # Architecture and onboarding docs
├── infra/                # Docker/network notes
├── setup/                # Bootstrap scripts and connectivity checks
├── firmware/             # Hardware/firmware references
├── scripts/              # Repository-level automation
└── .devcontainer/        # VS Code dev container configuration
```

## Common Commands
- `npm run dev`: run backend + web dashboard concurrently.
- `npm run verify`: validate database connectivity from inside the dev container.
- `npm run db:generate`: generate Prisma client.
- `npm run db:migrate`: run Prisma migrations for the local database.
- `docker compose -f deploy/docker-compose.yml up -d`: run deploy stack.

## API/Networking Conventions
- Browser-facing API base defaults to `/api` in the frontend.
- In dev, Vite proxies `/api` to `http://localhost:8080` by default (override with `VITE_DEV_API_TARGET`).
- Backend exposes API routes under `/api` (with temporary root compatibility routes).
- Docker service hostnames like `backend` and `postgres` are internal to Docker networks, not browser URLs.

## Dependency Management Notes
This repo uses npm workspaces, which rely on a single root `package-lock.json`.
Keeping one lockfile is intentional so workspace dependency resolution stays
consistent across `backend/`, `web-dashboard/`, and `packages/`. To avoid
workspace lockfile conflicts, always run installs from the repository root
(`npm install`) and update dependency versions in each package’s
`package.json` rather than running `npm install` inside a workspace folder.

## Startup Order (Dev Docker Compose)
- `postgres` starts first and is considered ready only after its `pg_isready` healthcheck succeeds.
- `backend` depends on `postgres`.
- `web-dashboard` depends on `backend`.
- `app` container depends on all runtime services and is used for the devcontainer workflow.
- Inside the dev container, continue using `postgres` as the hostname in connection strings (`DATABASE_URL`).

## PostgreSQL Configuration
The dev container copies `.env.example` to `.env` on first boot. The PostgreSQL
service in root `docker-compose.yml` loads values from `.env`, and Prisma reads
`DATABASE_URL` to connect. Update `POSTGRES_USER`, `POSTGRES_PASSWORD`,
`POSTGRES_DB`, or `DATABASE_URL` in `.env` if your database settings differ
from the defaults.
