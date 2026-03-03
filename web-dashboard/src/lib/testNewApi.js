import { buildApiUrl } from "./apiBase.js";

const TEST_NEW_PATH = "TestNew";

const buildHealthUrl = (scannerId) => `/health?scannerId=${encodeURIComponent(scannerId)}`;

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
