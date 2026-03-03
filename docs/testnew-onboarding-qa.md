# TestNew + Onboarding QA Checks

This checklist verifies that TestNew's unregistered scanner emulation uses `GET /health` as the only discovery heartbeat and remains compatible with onboarding endpoints.

## Preconditions
- Backend and web dashboard are running.
- Use a scanner ID that does not exist in the database, for example `UNREGISTERED-QA-001`.

## Steps
1. **Discovery heartbeat creates onboarding presence**
   - Call `GET /health?scannerId=UNREGISTERED-QA-001`.
   - Expect `200` with `registered: 0`.
   - Call `GET /api/onboarding/scanners` and verify scanner appears.

2. **Targeting reflects in health + onboarding list**
   - Call `POST /api/onboarding/scanners/UNREGISTERED-QA-001/target`.
   - Call `GET /health?scannerId=UNREGISTERED-QA-001` and verify `targeted: 1`.
   - Call `GET /api/onboarding/scanners` and verify scanner is marked targeted.

3. **Registration clears onboarding presence and flips health status**
   - Call `POST /api/onboarding/scanners/UNREGISTERED-QA-001/register`.
   - Call `GET /api/onboarding/scanners` and verify scanner is no longer listed as unregistered.
   - Call `GET /health?scannerId=UNREGISTERED-QA-001` and verify `registered: 1`.

4. **Validation payload on missing scannerId**
   - Call `GET /health`.
   - Expect `400` with `error: "scannerId query parameter is required"`.

5. **TTL behavior for emulated unregistered scanners**
   - Stop sending health heartbeats for an unregistered scanner.
   - Wait ~90 seconds.
   - Call `GET /api/onboarding/scanners` and verify scanner presence has expired.
