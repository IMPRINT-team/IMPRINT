import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BaseModal from "./BaseModal.jsx";
import { scannerApi } from "../../lib/scannerApi.js";

// Keep polling lightweight while modal is open.
const POLL_INTERVAL_MS = 2000;

const ListeningModal = ({ isOpen, onClose, onRegisterSuccess }) => {
  const [scanners, setScanners] = useState([]);
  const [error, setError] = useState("");
  const [pendingRegisterScannerId, setPendingRegisterScannerId] = useState(null);
  const [pendingTargetScannerId, setPendingTargetScannerId] = useState(null);

  // Poll onboarding scanners only while modal is visible.
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    let isCancelled = false;

    const loadScanners = async () => {
      try {
        const response = await fetch(scannerApi.listOnboardingUrl());

        if (!response.ok) {
          throw new Error("Unable to load onboarding scanners.");
        }

        const data = await response.json();
        if (!isCancelled) {
          setScanners(data);
          setError("");
        }
      } catch (loadError) {
        if (!isCancelled) {
          setError(loadError.message);
        }
      }
    };

    loadScanners();
    const intervalId = setInterval(loadScanners, POLL_INTERVAL_MS);

    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, [isOpen]);

  // Toggle targeted state for a scanner card.
  const handleTarget = async (scannerId, targeted) => {
    setPendingTargetScannerId(scannerId);

    try {
      const response = await fetch(scannerApi.targetOnboardingUrl(scannerId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targeted }),
      });

      if (!response.ok) {
        throw new Error("Unable to update target state.");
      }

      const updated = await response.json();
      setScanners((current) =>
        current.map((scanner) =>
          scanner.scannerId === updated.scannerId ? { ...scanner, ...updated } : scanner,
        ),
      );
      setError("");
    } catch (targetError) {
      setError(targetError.message);
    } finally {
      setPendingTargetScannerId(null);
    }
  };

  // Register scanner then hand off to existing ScannerModal flow.
  const handleRegister = async (scannerId) => {
    setPendingRegisterScannerId(scannerId);

    try {
      const response = await fetch(scannerApi.registerOnboardingUrl(scannerId), {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Unable to register scanner.");
      }

      const scanner = await response.json();
      onRegisterSuccess(scanner);
    } catch (registerError) {
      setError(registerError.message);
    } finally {
      setPendingRegisterScannerId(null);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <BaseModal id="listening-modal" title="Listening" onClose={onClose}>
      <div className="space-y-3">
        {error ? <p className="text-sm text-error">{error}</p> : null}

        {scanners.length === 0 ? (
          <p className="text-sm text-base-content/70">Waiting for unregistered scanners...</p>
        ) : (
          scanners.map((scanner) => {
            const isPendingTarget = pendingTargetScannerId === scanner.scannerId;
            const isPendingRegister = pendingRegisterScannerId === scanner.scannerId;
            const isScannerPending = isPendingTarget || isPendingRegister;

            return (
              <div
                key={scanner.scannerId}
                className="rounded-lg border border-base-300 p-3"
              >
                <p className="text-sm font-semibold">{scanner.scannerId}</p>
                <p className="text-xs text-base-content/70">
                  Last seen: {new Date(scanner.lastSeenAt).toLocaleTimeString()}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => handleTarget(scanner.scannerId, !scanner.targeted)}
                    disabled={isScannerPending}
                  >
                    {isPendingTarget ? "Updating..." : scanner.targeted ? "Untarget" : "Target"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => handleRegister(scanner.scannerId)}
                    disabled={isScannerPending}
                  >
                    {isPendingRegister ? "Registering..." : "Register"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </BaseModal>
  );
};

ListeningModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegisterSuccess: PropTypes.func.isRequired,
};

export default ListeningModal;
