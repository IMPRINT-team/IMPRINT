import test from "node:test";
import assert from "node:assert/strict";
import {
  buildApiUrlWithBase,
  buildRootUrlWithBase,
  normalizeApiBaseUrl,
} from "./apiBase.js";
import { testNewApi } from "./testNewApi.js";
import { scannerApi } from "./scannerApi.js";

test("normalizeApiBaseUrl defaults to /api when unset", () => {
  assert.equal(normalizeApiBaseUrl(undefined), "/api");
});

test("normalizeApiBaseUrl normalizes local api base", () => {
  assert.equal(normalizeApiBaseUrl("api"), "/api");
  assert.equal(normalizeApiBaseUrl("/api"), "/api");
});

test("normalizeApiBaseUrl preserves absolute base URLs", () => {
  assert.equal(normalizeApiBaseUrl("https://example.com/api/"), "https://example.com/api");
});

test("buildApiUrlWithBase and buildRootUrlWithBase generate environment-safe URLs", () => {
  assert.equal(buildApiUrlWithBase("/api", "TestNew"), "/api/TestNew");
  assert.equal(buildRootUrlWithBase("/api", "health?scannerId=abc"), "/health?scannerId=abc");

  assert.equal(
    buildApiUrlWithBase("https://example.com/api", "TestNew"),
    "https://example.com/api/TestNew",
  );
  assert.equal(
    buildRootUrlWithBase("https://example.com/api", "health?scannerId=abc"),
    "https://example.com/health?scannerId=abc",
  );
});


test("buildRootUrlWithBase maps api base to backend health endpoint on localhost", () => {
  assert.equal(
    buildRootUrlWithBase(
      "http://localhost:8080/api",
      "health?scannerId=550e8400-e29b-41d4-a716-446655440000",
    ),
    "http://localhost:8080/health?scannerId=550e8400-e29b-41d4-a716-446655440000",
  );
});

test("testNewApi uses normalized URL helpers", () => {
  assert.equal(testNewApi.runUrl(), "/api/TestNew");
  assert.equal(
    testNewApi.healthCheckUrl("scanner 1"),
    "/health?scannerId=scanner+1",
  );
});


test("scannerApi onboarding list URL remains under /api", () => {
  assert.equal(scannerApi.listOnboardingUrl(), "/api/onboarding/scanners");
});
