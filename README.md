<!-- Suggested use: Start here for repository overview, setup steps, and shared workflows. -->
# IMPRINT

IMPRINT is a distributed RFID activation and interaction platform that treats RFID scans as intentional, authenticated physical inputs. The repository is designed to run inside a consistent VS Code Dev Container.

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

## Common Commands
- `npm run dev`: Run backend + web dashboard concurrently.
- `npm run verify`: Validate database connectivity from inside the dev container.

## MongoDB Authentication
The dev container copies `.env.example` to `.env` on first boot. The MongoDB
service in `docker-compose.yml` loads values from `.env`, so setting
`MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` enables Mongo
authentication for the local database. If you prefer an unauthenticated local
Mongo instance, remove those two variables from `.env` (or leave them empty)
and restart the container. Update `MONGO_HOST` and `MONGO_PORT` in `.env` if
your database host or port differs from the defaults.
