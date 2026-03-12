const DEFAULT_API_BASE_URL = "/api";

const trimTrailingSlashes = (value) => value.replace(/\/+$/, "");
const trimLeadingSlashes = (value) => value.replace(/^\/+/, "");
const ensureLeadingSlash = (value) => (value.startsWith("/") ? value : `/${value}`);

const isAbsoluteHttpUrl = (value) => /^https?:\/\//i.test(value);

const readConfiguredBaseUrl = () => {
  if (typeof import.meta !== "undefined" && import.meta?.env?.VITE_API_BASE_URL !== undefined) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  return undefined;
};

export const normalizeApiBaseUrl = (configuredBaseUrl) => {
  const fallbackValue = configuredBaseUrl ?? DEFAULT_API_BASE_URL;
  const trimmedValue = `${fallbackValue}`.trim();

  if (!trimmedValue) {
    return DEFAULT_API_BASE_URL;
  }

  if (isAbsoluteHttpUrl(trimmedValue)) {
    return trimTrailingSlashes(trimmedValue);
  }

  const withoutTrailingSlash = trimTrailingSlashes(trimmedValue);
  if (!withoutTrailingSlash) {
    return DEFAULT_API_BASE_URL;
  }

  return ensureLeadingSlash(withoutTrailingSlash);
};

const getApiOriginBase = (baseUrl) => {
  if (!isAbsoluteHttpUrl(baseUrl)) {
    return "";
  }

  const parsedBaseUrl = new URL(baseUrl);
  return trimTrailingSlashes(parsedBaseUrl.origin);
};

export const buildApiUrlWithBase = (baseUrl, path = "") => {
  if (!path) {
    return `${baseUrl}/`;
  }

  return `${baseUrl}/${trimLeadingSlashes(path)}`;
};

export const buildRootUrlWithBase = (baseUrl, path = "") => {
  const normalizedPath = trimLeadingSlashes(path);
  const basePrefix = getApiOriginBase(baseUrl);

  if (!normalizedPath) {
    return `${basePrefix}/`;
  }

  return `${basePrefix}/${normalizedPath}`;
};

export const apiBaseUrl = normalizeApiBaseUrl(readConfiguredBaseUrl());

export const buildApiUrl = (path = "") => buildApiUrlWithBase(apiBaseUrl, path);

export const buildRootUrl = (path = "") => buildRootUrlWithBase(apiBaseUrl, path);
