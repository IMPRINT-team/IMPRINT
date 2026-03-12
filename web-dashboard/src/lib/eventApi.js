import { buildApiUrl } from "./apiBase.js";

const EVENTS_BASE_PATH = "event";
const EVENTS_ERROR_MESSAGE = "Unable to load events.";

export const eventApi = {
  listUrl: () => buildApiUrl(EVENTS_BASE_PATH),
  searchUrl: (searchValue, searchDate) => {
    const params = new URLSearchParams();

    if (searchValue) params.append("value", searchValue);
    if (searchDate) params.append("date", searchDate);

    return buildApiUrl(`event/search?${params.toString()}`);
  },
  getEvents: async () => {
    try {
      const response = await fetch(eventApi.listUrl());

      if (!response.ok) {
        throw new Error(EVENTS_ERROR_MESSAGE);
      }

      return await response.json();
    } catch {
      throw new Error(EVENTS_ERROR_MESSAGE);
    }
  },
};
