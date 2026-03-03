// Keep unregistered scanner pings for 90 seconds before expiring them.
const TTL_MS = 90_000;

// Process-local MVP store keyed by scannerId.
const scannerPresence = new Map();

// Lazy cleanup keeps implementation simple without background timers.
const cleanupExpired = (now = Date.now()) => {
  for (const [scannerId, entry] of scannerPresence.entries()) {
    if (now - entry.lastSeenAt > TTL_MS) {
      scannerPresence.delete(scannerId);
    }
  }
};

// Record an unregistered scanner ping while preserving current target state.
export const upsertSeen = (scannerId, meta = {}) => {
  if (!scannerId) {
    return null;
  }

  const now = Date.now();
  cleanupExpired(now);

  const current = scannerPresence.get(scannerId);
  const nextEntry = {
    scannerId,
    lastSeenAt: now,
    targeted: current?.targeted ?? false,
    ...meta,
  };

  scannerPresence.set(scannerId, nextEntry);
  return nextEntry;
};

// Return only currently active (non-expired) unregistered scanners.
export const listActiveUnregistered = (now = Date.now()) => {
  cleanupExpired(now);
  return Array.from(scannerPresence.values());
};

// Update target flag for a known scanner; returns null when scanner is not active.
export const setTargeted = (scannerId, targeted) => {
  const now = Date.now();
  cleanupExpired(now);

  const current = scannerPresence.get(scannerId);
  if (!current) {
    return null;
  }

  const nextEntry = {
    ...current,
    targeted: Boolean(targeted),
    lastSeenAt: now,
  };

  scannerPresence.set(scannerId, nextEntry);
  return nextEntry;
};

// Remove scanner from presence store once onboarding is completed.
export const consume = (scannerId) => {
  const current = scannerPresence.get(scannerId) ?? null;
  scannerPresence.delete(scannerId);
  return current;
};

