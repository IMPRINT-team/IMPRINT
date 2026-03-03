import { buildApiUrl } from "./apiBase.js";

const SCANNERS_BASE_PATH = "/scanners";

// Dashboard onboarding endpoints (mounted under backend /api).
const ONBOARDING_BASE_PATH = "/onboarding/scanners";

export const scannerApi = {
  listUrl: () => buildApiUrl(SCANNERS_BASE_PATH),
  createUrl: () => buildApiUrl(SCANNERS_BASE_PATH),
  updateUrl: (deviceId) => buildApiUrl(`${SCANNERS_BASE_PATH}/${deviceId}`),
  deleteUrl: (deviceId) => buildApiUrl(`/admin/scanners/${deviceId}`),
  searchUrl: (searchType, searchValue) =>
    buildApiUrl(`/search/${searchType}/${encodeURIComponent(searchValue)}`),
  listOnboardingUrl: () => buildApiUrl(ONBOARDING_BASE_PATH),
  targetOnboardingUrl: (scannerId) =>
    buildApiUrl(`${ONBOARDING_BASE_PATH}/${encodeURIComponent(scannerId)}/target`),
  registerOnboardingUrl: (scannerId) =>
    buildApiUrl(`${ONBOARDING_BASE_PATH}/${encodeURIComponent(scannerId)}/register`),
};
