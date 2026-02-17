const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "/api";

const trimTrailingSlashes = (value) => value.replace(/\/+$/, "");
const trimLeadingSlashes = (value) => value.replace(/^\/+/, "");

export const apiBaseUrl = trimTrailingSlashes(configuredBaseUrl);

export const buildApiUrl = (path = "") => {
  if (!path) {
    return `${apiBaseUrl}/`;
  }

  return `${apiBaseUrl}/${trimLeadingSlashes(path)}`;
};
