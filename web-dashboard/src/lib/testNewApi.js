import { buildApiUrl, buildRootUrl } from "./apiBase.js";

const TEST_NEW_PATH = "TestNew";
const HEALTH_PATH = "health";

const buildHealthUrl = (scannerId) => {
  const params = new URLSearchParams({ scannerId });
  return buildRootUrl(`${HEALTH_PATH}?${params.toString()}`);
};

export const testNewApi = {
  runUrl: () => buildApiUrl(TEST_NEW_PATH),
  run: async (payload) => {
    const response = await fetch(testNewApi.runUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data?.error ?? "Unable to run TestNew emulation.");
    }

    return data;
  },
  healthCheckUrl: (scannerId) => buildHealthUrl(scannerId),
  healthCheck: async (scannerId) => {
    const response = await fetch(testNewApi.healthCheckUrl(scannerId));
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data?.error ?? `Unable to run health check for ${scannerId}.`);
    }

    return data;
  },
};
