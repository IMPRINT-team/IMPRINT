<!-- Suggested use: Explain how to bootstrap and verify the local development environment. -->
# Setup Scripts

## Overview
Use the scripts in this folder to bootstrap the local environment and verify container connectivity.

## Scripts
- `bootstrap.sh`: Initializes the dev container experience and dependencies.
- `verify_connections.sh`: Confirms services can reach MongoDB on the Docker network.

## Usage
Run scripts from the repo root or directly within the dev container:
- `./setup/bootstrap.sh`
- `./setup/verify_connections.sh`
