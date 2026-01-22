<!-- Suggested use: Document how to develop and run the backend API service. -->
# Backend

## Overview
The backend service hosts the IMPRINT central API, ingesting scan events and managing device metadata. The current scaffold provides a health-style HTTP response and MongoDB connectivity checks.

## Responsibilities
- Accept inbound scan requests and return status responses.
- Connect to MongoDB using the shared dev container network (`mongo`).
- Expose a simple HTTP endpoint for service health checks.

## Local Development
- Run `npm run dev -w backend` from the repo root to start the service.
- Default port: `8080` (override with `PORT`).
- Configure MongoDB credentials and host via `.env` at the repo root.

## Key Files
- `index.js`: HTTP server and MongoDB connectivity logic.
- `package.json`: Backend-specific scripts and linting commands.
