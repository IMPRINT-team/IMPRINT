// Keep registered scanner pings for 2 seconds before expiring them.
const TTL_MS = 2_000;

// Process-local store keyed by scannerId.
const scannerPresence = new Map();

const cleanupExpired = (now = Date.now()) => {
  for (const [scannerId, entry] of scannerPresence.entries()) {
    if (now - entry.lastSeenAt > TTL_MS) {
      scannerPresence.delete(scannerId);
    }
  }
};

// Record a registered scanner health ping.
export const upsertOnlineSeen = (scannerId) => {
  if (!scannerId) {
    return null;
  }

  const now = Date.now();
  cleanupExpired(now);

  const nextEntry = {
    scannerId,
    lastSeenAt: now,
  };

  scannerPresence.set(scannerId, nextEntry);
  return nextEntry;
};

// Return only currently active (non-expired) registered scanners.
export const listActiveOnlineScanners = (now = Date.now()) => {
  cleanupExpired(now);
  return Array.from(scannerPresence.values());
};

