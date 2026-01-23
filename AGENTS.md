# IMPRINT Agents Guide

## Purpose
Defines how contributors work within the IMPRINT Dev Container.

## Project Overview
IMPRINT is a distributed platform that treats RFID scans as intentional, authenticated physical inputs.

## Architecture Philosophy
- **Dev Container:** Development occurs inside a standardized Docker container managed by VS Code.
- **Monorepo:** Uses NPM Workspaces.
- **Network:** Services communicate via Docker network (hostname: `postgres`), not localhost.

## Ownership Boundaries
- .devcontainer/: Configuration for the VS Code environment.
- backend/: Node.js API server.
- web-dashboard/: React SPA.
