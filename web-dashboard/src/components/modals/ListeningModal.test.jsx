import { describe, expect, it, vi, afterEach } from "vitest";
import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import ListeningModal from "./ListeningModal.jsx";

vi.mock("./BaseModal.jsx", () => ({
  default: ({ children }) => <div>{children}</div>,
}));

const flushPromises = async () => {
  await act(async () => {
    await Promise.resolve();
  });
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ListeningModal", () => {
  it("updates badge/button text after successful target toggle", async () => {
    const scanner = {
      scannerId: "scanner-a",
      targeted: false,
      lastSeenAt: "2026-01-01T10:00:00.000Z",
    };

    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({ ok: true, json: async () => [scanner] })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ ...scanner, targeted: true }) });

    let renderer;
    await act(async () => {
      renderer = TestRenderer.create(
        <ListeningModal isOpen onClose={() => {}} onRegisterSuccess={() => {}} />,
      );
    });
    await flushPromises();

    const targetButton = renderer.root.findAllByType("button").find((button) => button.children[0] === "Target");
    await act(async () => {
      targetButton.props.onClick();
    });
    await flushPromises();

    const buttonLabels = renderer.root.findAllByType("button").map((button) => button.children.join(""));
    expect(buttonLabels).toContain("Untarget");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("shows error and preserves previous state when target toggle fails", async () => {
    const scanner = {
      scannerId: "scanner-a",
      targeted: false,
      lastSeenAt: "2026-01-01T10:00:00.000Z",
    };

    vi.spyOn(global, "fetch")
      .mockResolvedValueOnce({ ok: true, json: async () => [scanner] })
      .mockResolvedValueOnce({ ok: false });

    let renderer;
    await act(async () => {
      renderer = TestRenderer.create(
        <ListeningModal isOpen onClose={() => {}} onRegisterSuccess={() => {}} />,
      );
    });
    await flushPromises();

    const targetButton = renderer.root.findAllByType("button").find((button) => button.children[0] === "Target");
    await act(async () => {
      targetButton.props.onClick();
    });
    await flushPromises();

    const textContent = renderer.root.findAllByType("p").map((node) => node.children.join(""));
    expect(textContent).toContain("Unable to update target state.");

    const buttonLabels = renderer.root.findAllByType("button").map((button) => button.children.join(""));
    expect(buttonLabels).toContain("Target");
    expect(buttonLabels).not.toContain("Untarget");
  });
});
