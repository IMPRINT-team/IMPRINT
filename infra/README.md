<!-- Suggested use: Describe Docker orchestration, networking, and environment expectations. -->
# Infrastructure

## Overview
The infrastructure folder documents Docker orchestration and networking details for IMPRINT. It complements the root-level `docker-compose.yml` by tracking environment assumptions and service topology.

## Responsibilities
- Describe container relationships and shared networks.
- Document PostgreSQL host expectations (`postgres` within the Docker network).
- Capture deployment or hosting notes as they evolve.

## Key References
- `docker-compose.yml` (root): primary development container orchestration.
- `.env`: runtime configuration for services and database credentials.
