# IMPRINT Architecture

## Overview
IMPRINT is a distributed RFID activation and interaction platform that treats RFID scans as intentional, authenticated physical inputs. The system is built as a monorepo with a Node.js API backend, a React web dashboard, and supporting firmware references. Development is standardized through a VS Code Dev Container and Docker Compose services. The platform is designed to scale from single-location pilots to multi-site deployments as long as devices can reach the API layer.

## Monorepo Layout
- `backend/`: Node.js API service for ingesting scan events and returning status responses.
- `web-dashboard/`: React + Vite frontend for real-time visibility into scans and device status.
- `firmware/`: Hardware and firmware reference materials for RFID devices.
- `infra/`: Docker orchestration and networking notes.
- `docs/`: Architecture and onboarding documentation.
- `scripts/` and `setup/`: Automation and connectivity verification.

## Core Components

### RFID Devices (Firmware)
- Network-connected scanners emit structured scan events and provide immediate LED feedback.
- Firmware references and hardware notes live in `firmware/` for device integration.

### Backend API (`backend/`)
- Central API for ingesting scan events and managing device metadata.
- Exposes HTTP endpoints and performs MongoDB connectivity checks.
- Runs by default on port `8080` (overridable via `PORT`).

### Web Dashboard (`web-dashboard/`)
- React SPA that consumes the backend API for real-time visibility into activity, device status, and historical events.

### Data Store (MongoDB)
- MongoDB runs as a Docker Compose service (`mongo`) in the dev container environment.
- Credentials are supplied via the repo-level `.env`; the backend uses the same network host name (`mongo`).

## Data Flow
1. RFID device detects a scan and transmits a structured event to the backend API.
2. The backend validates and records the event, responding with a status (used for device feedback such as LEDs).
3. The web dashboard consumes backend endpoints for real-time activity, device state, and historical data.

This flow aligns with the core product goal of treating RFID scans as authenticated physical inputs.

## Development Environment
- The repo is intended to run inside a VS Code Dev Container for consistency.
- Docker Compose provisions the app container and a MongoDB service on a shared network.
- Common workflows:
  - `npm run dev`: Run backend + dashboard concurrently.
  - `npm run verify`: Check database connectivity.

## Operational Notes
- MongoDB authentication is controlled through `.env` values (root username/password). Remove or blank them for unauthenticated local usage.
- Service communication in the dev container uses Docker networking (hostname `mongo`), not localhost.

## Future Documentation Areas
- API contracts and event schemas.
- Deployment runbooks and operational checklists.
- Troubleshooting guides for device onboarding.
