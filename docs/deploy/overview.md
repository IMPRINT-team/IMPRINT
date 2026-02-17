# IMPRINT Deploy Overview

This deployment layout keeps the existing devcontainer workflow untouched while adding a dedicated homelab/prod-like stack under `deploy/`.

## Routing contract

- Public entrypoint: `caddy` on port `80`
- Frontend SPA: served by `frontend`
- API: browser calls `/api/*`, reverse proxied to `backend:8080`

This keeps Docker service hostnames internal and removes frontend dependency on hardcoded localhost API URLs.

## Environment contract

- `DATABASE_URL` is used by backend runtime.
- `POSTGRES_*` variables configure bundled PostgreSQL defaults.
- `deploy/.env.example` contains deploy-time defaults.

## Migrations contract

- `migrate` is a one-off service that runs `npx prisma migrate deploy` before backend startup.
- `backend` starts only after `migrate` exits successfully.
- This prevents first-boot API 500s caused by missing tables on a fresh PostgreSQL volume.

## Stack files

- `deploy/docker-compose.yml`: homelab/prod-like services (`caddy`, `frontend`, `migrate`, `backend`, `postgres`)
- `deploy/Caddyfile`: path-based reverse proxy (`/api` -> backend, everything else -> frontend)
