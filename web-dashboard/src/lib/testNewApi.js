import { buildApiUrl } from "./apiBase.js";

const TEST_NEW_PATH = "TestNew";

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
};
