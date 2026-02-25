import { buildApiUrl } from "./apiBase.js";

const SCANNERS_BASE_PATH = "/scanners";

export const scannerApi = {
  listUrl: () => buildApiUrl(SCANNERS_BASE_PATH),
  createUrl: () => buildApiUrl(SCANNERS_BASE_PATH),
  updateUrl: (deviceId) => buildApiUrl(`${SCANNERS_BASE_PATH}/${deviceId}`),
  deleteUrl: (deviceId) => buildApiUrl(`/admin/scanners/${deviceId}`),
  searchUrl: (searchType, searchValue) =>
    buildApiUrl(`/search/${searchType}/${encodeURIComponent(searchValue)}`),
};
