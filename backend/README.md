<!-- Suggested use: Document how to develop and run the backend API service. -->
# Backend

## Overview
The backend service hosts the IMPRINT central API, ingesting scan events and managing device metadata. The current scaffold provides a health-style HTTP response and PostgreSQL connectivity checks via Prisma.

## Responsibilities
- Accept inbound scan requests and return status responses.
- Connect to PostgreSQL using the shared dev container network (`postgres`).
- Expose a simple HTTP endpoint for service health checks.

## Local Development
- Run `npm run dev -w backend` from the repo root to start the service.
- Default port: `8080` (override with `PORT`).
- Default bind address: `0.0.0.0` (override with `HOST`) so devices on your LAN can post events.
- Configure PostgreSQL credentials and `DATABASE_URL` via `.env` at the repo root (`postgres:5432` for container-to-container access).
- For host-run tooling outside the dev container, use `DATABASE_URL_HOST` (`localhost:5432`) to avoid mixing host/container database contexts.

## Scanner Connectivity (LAN)
- From another device on your network, target the backend using your host machine IP and backend port.
  - Example health check: `http://<host-ip>:8080/health`
  - Example scan endpoint: `http://<host-ip>:8080/api/event/scan`
- Ensure your firewall/router allows inbound TCP traffic to the backend port.

## Key Files
- `index.js`: HTTP server and PostgreSQL connectivity logic.
- `package.json`: Backend-specific scripts and linting commands.
