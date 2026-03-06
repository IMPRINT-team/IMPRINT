let latestScanEvent = null;

const normalizeEvent = (event) => {
  if (!event) {
    return null;
  }

  return {
    rfidUid: event.userRfid,
    scannerId: event.deviceId,
    occurredAt: event.occurredAt,
  };
};

export const setLatestScanEvent = (event) => {
  latestScanEvent = normalizeEvent(event);
  return latestScanEvent;
};

export const getLatestScanEvent = () => latestScanEvent;
