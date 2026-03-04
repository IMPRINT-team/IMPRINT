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

const deferred = () => {
  let resolve;
  const promise = new Promise((resolvePromise) => {
    resolve = resolvePromise;
  });

  return { promise, resolve };
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

    const targetButton = renderer.root
      .findAllByType("button")
      .find((button) => button.children[0] === "Target");

    await act(async () => {
      targetButton.props.onClick();
    });
    await flushPromises();

    const buttonLabels = renderer.root
      .findAllByType("button")
      .map((button) => button.children.join(""));

    expect(buttonLabels).toContain("Untarget");
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      expect.any(String),
      expect.objectContaining({ cache: "no-store" }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      expect.any(String),
      expect.objectContaining({ cache: "no-store" }),
    );
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

    const targetButton = renderer.root
      .findAllByType("button")
      .find((button) => button.children[0] === "Target");

    await act(async () => {
      targetButton.props.onClick();
    });
    await flushPromises();

    const textContent = renderer.root
      .findAllByType("p")
      .map((node) => node.children.join(""));

    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      expect.any(String),
      expect.objectContaining({ cache: "no-store" }),
    );
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      expect.any(String),
      expect.objectContaining({ cache: "no-store" }),
    );

    expect(textContent).toContain("Unable to update target state.");

    const buttonLabels = renderer.root
      .findAllByType("button")
      .map((button) => button.children.join(""));

    expect(buttonLabels).toContain("Target");
    expect(buttonLabels).not.toContain("Untarget");
  });


  it("sends no-store cache policy when registering scanner", async () => {
    const scanner = {
      scannerId: "scanner-a",
      targeted: false,
      lastSeenAt: "2026-01-01T10:00:00.000Z",
    };

    const onRegisterSuccess = vi.fn();
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({ ok: true, json: async () => [scanner] })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ deviceId: "dev-1" }) });

    let renderer;
    await act(async () => {
      renderer = TestRenderer.create(
        <ListeningModal isOpen onClose={() => {}} onRegisterSuccess={onRegisterSuccess} />,
      );
    });
    await flushPromises();

    const registerButton = renderer.root
      .findAllByType("button")
      .find((button) => button.children[0] === "Register");

    await act(async () => {
      registerButton.props.onClick();
    });
    await flushPromises();

    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      expect.any(String),
      expect.objectContaining({ method: "POST", cache: "no-store" }),
    );
    expect(onRegisterSuccess).toHaveBeenCalledWith({ deviceId: "dev-1" });
  });

  it("keeps scanner-specific pending target state isolated", async () => {
    const scannerA = {
      scannerId: "scanner-a",
      targeted: false,
      lastSeenAt: "2026-01-01T10:00:00.000Z",
    };
    const scannerB = {
      scannerId: "scanner-b",
      targeted: false,
      lastSeenAt: "2026-01-01T10:00:01.000Z",
    };

    const targetAResponse = deferred();
    const targetBResponse = deferred();

    vi.spyOn(global, "fetch")
      .mockResolvedValueOnce({ ok: true, json: async () => [scannerA, scannerB] })
      .mockImplementationOnce(() => targetAResponse.promise)
      .mockImplementationOnce(() => targetBResponse.promise);

    let renderer;
    await act(async () => {
      renderer = TestRenderer.create(
        <ListeningModal isOpen onClose={() => {}} onRegisterSuccess={() => {}} />,
      );
    });
    await flushPromises();

    const targetButtons = () =>
      renderer.root.findAllByType("button").filter((button) => {
        const text = button.children.join("");
        return text === "Target" || text === "Updating...";
      });

    await act(async () => {
      targetButtons()[0].props.onClick();
      targetButtons()[1].props.onClick();
    });
    await flushPromises();

    let currentTargetButtons = targetButtons();
    expect(currentTargetButtons[0].children.join("")).toBe("Updating...");
    expect(currentTargetButtons[1].children.join("")).toBe("Updating...");

    await act(async () => {
      targetAResponse.resolve({ ok: true, json: async () => ({ ...scannerA, targeted: true }) });
    });
    await flushPromises();

    const buttonLabels = renderer.root
      .findAllByType("button")
      .map((button) => button.children.join(""));

    expect(buttonLabels.filter((label) => label === "Updating...")).toHaveLength(1);
    expect(buttonLabels).toContain("Untarget");
  });
});
