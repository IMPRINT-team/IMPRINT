# IMPRINT Agents Guide

## Purpose
Defines how contributors (human or AI) should work within the IMPRINT Distributed RFID Platform repository.

## Project Overview
IMPRINT is a distributed platform that treats RFID scans as intentional, authenticated physical inputs. It provides real-time logging, device management, and visual feedback via a web dashboard.

## Architecture Philosophy
- **Explicit & Inspectable:** All subsystems must be clearly defined.
- **System of Record:** MongoDB stores all event logs and device configurations.
- **Real-Time Backbone:** Event propagation is designed to be immediate and observable across services.
- **Environment:** Local development mirrors production container separation.

## Ownership Boundaries
- firmware/: Embedded device logic references.
- backend/: API ingestion and persistence.
- web-dashboard/: React UI for real-time visibility.
- setup/: Environment bootstrapping and connection verification.
- infra/: Container orchestration.
- .github/workflows/: CI automation.
