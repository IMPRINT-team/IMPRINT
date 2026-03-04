import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { testNewApi } from "../lib/testNewApi.js";

const TestNewPage = () => {
  const [eventFormState, setEventFormState] = useState({
    registeredScannerId: "",
    rfidUid: "BE:00:28:AF",
    result: "ACCEPTED",
  });
  const [dummyScanners, setDummyScanners] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [removedScannerIds, setRemovedScannerIds] = useState([]);
  const [error, setError] = useState("");
  const [activeSubmit, setActiveSubmit] = useState("");
  const dummyScannersRef = useRef([]);

  useEffect(() => {
    dummyScannersRef.current = dummyScanners;
  }, [dummyScanners]);

  useEffect(() => {
    if (dummyScanners.length === 0) {
      return undefined;
    }

    let isCancelled = false;

    const pollHealthChecks = async () => {
      const scanners = dummyScannersRef.current;
      if (scanners.length === 0) {
        return;
      }

      const updatedScanners = await Promise.all(
        scanners.map(async (scanner) => {
          try {
            const healthResponse = await testNewApi.healthCheck(scanner.scannerId);
            return {
              ...scanner,
              targeted: Boolean(healthResponse?.targeted),
              registered: Boolean(healthResponse?.registered),
              status: healthResponse?.status ?? "unknown",
              lastHealthCheckAt: Date.now(),
              healthError: "",
            };
          } catch (pollError) {
            return {
              ...scanner,
              status: "error",
              healthError: pollError.message,
            };
          }
        }),
      );

      if (!isCancelled) {
        setDummyScanners((current) => {
          const activeScanners = updatedScanners.filter((scanner) => !scanner.registered);
          const newlyRemovedScannerIds = updatedScanners
            .filter((scanner) => scanner.registered)
            .map((scanner) => scanner.scannerId);

          if (newlyRemovedScannerIds.length > 0) {
            setRemovedScannerIds((existingIds) => {
              const mergedIds = [...newlyRemovedScannerIds, ...existingIds];
              return [...new Set(mergedIds)].slice(0, 5);
            });
          }

          if (current.length !== activeScanners.length) {
            return activeScanners;
          }

          const hasMeaningfulChange = current.some((scanner, index) => {
            const updated = activeScanners[index];
            return (
              scanner.scannerId !== updated.scannerId ||
              scanner.targeted !== updated.targeted ||
              scanner.registered !== updated.registered ||
              scanner.status !== updated.status ||
              scanner.healthError !== updated.healthError
            );
          });

          return hasMeaningfulChange ? activeScanners : current;
        });
      }
    };

    pollHealthChecks();
    const intervalId = setInterval(pollHealthChecks, 1000);

    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, [dummyScanners.length]);

  const onEventChange = (event) => {
    const { name, value } = event.target;
    setEventFormState((current) => ({ ...current, [name]: value }));
  };

  const runEmulation = async ({ emulationType, values }) => {
    setError("");
    setResponseData(null);
    setActiveSubmit(emulationType);

    try {
      const payload = Object.fromEntries(
        Object.entries(values).filter(([, value]) => value.trim() !== ""),
      );
      const data = await testNewApi.run({ ...payload, emulationType });
      setResponseData(data);

    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setActiveSubmit("");
    }
  };

  const onEventSubmit = async (event) => {
    event.preventDefault();
    await runEmulation({ emulationType: "event-and-health-check", values: eventFormState });
  };

  const onHealthCheckSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setResponseData(null);
    setActiveSubmit("health-check");

    const scannerId = crypto.randomUUID();

    try {
      const healthResponse = await testNewApi.healthCheck(scannerId);
      const nextResponseData = {
        success: true,
        emulationType: "health-check",
        emulatedHealthCheck: {
          scannerId,
          response: healthResponse,
        },
      };

      setResponseData(nextResponseData);

      if (!healthResponse?.registered) {
        setDummyScanners((current) => {
          if (current.some((scanner) => scanner.scannerId === scannerId)) {
            return current;
          }

          return [
            {
              scannerId,
              targeted: Boolean(healthResponse?.targeted),
              registered: Boolean(healthResponse?.registered),
              status: healthResponse?.status ?? "ok",
              healthError: "",
              lastHealthCheckAt: Date.now(),
            },
            ...current,
          ];
        });
      }

    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setActiveSubmit("");
    }
  };

  const clearDummyScanners = () => {
    setDummyScanners([]);
    setRemovedScannerIds([]);
  };

  return (
    <div className="min-h-dvh bg-base-200 px-4 py-6 md:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">TestNew Emulator</h1>
          <Link className="btn btn-outline btn-primary btn-sm" to="/dashboard">
            Back to Dashboard
          </Link>
        </div>

        <p className="text-sm opacity-80">Use the sections below to emulate specific TestNew flows.</p>

        <form className="card bg-base-100 shadow" onSubmit={onEventSubmit}>
          <div className="card-body grid gap-4 md:grid-cols-2">
            <h2 className="card-title md:col-span-2">Section 1: Emulate a scanner event</h2>

            <label className="form-control">
              <span className="label-text">Registered scanner ID (optional)</span>
              <input
                className="input input-bordered"
                name="registeredScannerId"
                onChange={onEventChange}
                placeholder="UUID of an existing scanner"
                type="text"
                value={eventFormState.registeredScannerId}
              />
            </label>

            <label className="form-control">
              <span className="label-text">RFID UID</span>
              <input
                className="input input-bordered"
                name="rfidUid"
                onChange={onEventChange}
                type="text"
                value={eventFormState.rfidUid}
              />
            </label>

            <label className="form-control">
              <span className="label-text">Result</span>
              <select
                className="select select-bordered"
                name="result"
                onChange={onEventChange}
                value={eventFormState.result}
              >
                <option value="ACCEPTED">ACCEPTED</option>
                <option value="DENIED">DENIED</option>
              </select>
            </label>
          </div>

          <div className="card-actions justify-end px-6 pb-6">
            <button className="btn btn-primary" disabled={activeSubmit !== ""} type="submit">
              {activeSubmit === "event-and-health-check" ? "Running..." : "Run event emulation"}
            </button>
          </div>
        </form>

        <form className="card bg-base-100 shadow" onSubmit={onHealthCheckSubmit}>
          <div className="card-body grid gap-4 md:grid-cols-2">
            <h2 className="card-title md:col-span-2">
              Section 2: Emulate an unregistered scanner health check
            </h2>

            <p className="text-sm text-base-content/70 md:col-span-2">
              Scanner ID is auto-generated as a UUID for each health-check request.
            </p>
          </div>

          <div className="card-actions justify-end px-6 pb-6">
            <button className="btn btn-primary" disabled={activeSubmit !== ""} type="submit">
              {activeSubmit === "health-check" ? "Running..." : "Create test unregistered scanner"}
            </button>
          </div>
        </form>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between gap-2">
              <h2 className="card-title">Dummy unregistered scanners</h2>
              <button
                type="button"
                className="btn btn-outline btn-error btn-sm"
                disabled={dummyScanners.length === 0}
                onClick={clearDummyScanners}
              >
                Clear all dummy unregistered scanners
              </button>
            </div>

            {dummyScanners.length === 0 ? (
              <p className="text-sm text-base-content/70">No dummy scanners yet.</p>
            ) : (
              <div className="space-y-2">
                {dummyScanners.map((scanner) => (
                  <div
                    key={scanner.scannerId}
                    className={`rounded-lg border p-3 ${
                      scanner.targeted
                        ? "border-warning bg-warning/10"
                        : "border-success bg-success/10"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{scanner.scannerId}</p>
                      <span className={`badge ${scanner.targeted ? "badge-warning" : "badge-success"}`}>
                        {scanner.targeted ? "TARGETED" : "NOT TARGETED"}
                      </span>
                      <span className="badge badge-ghost">{scanner.status}</span>
                    </div>
                    {scanner.healthError ? (
                      <p className="text-xs text-error">{scanner.healthError}</p>
                    ) : (
                      <p className="text-xs text-base-content/70">
                        Last health check: {new Date(scanner.lastHealthCheckAt).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {removedScannerIds.length > 0 ? (
              <p className="text-xs text-base-content/70">
                Stopped monitoring registered scanners: {removedScannerIds.join(", ")}
              </p>
            ) : null}

            <p className="text-xs text-base-content/70">
              Monitoring sends a 1s heartbeat while listed here. If you clear a scanner and do not send more
              heartbeats, onboarding presence expires after ~90s.
            </p>
          </div>
        </div>

        {error ? <div className="alert alert-error">{error}</div> : null}

        {responseData ? (
          <div className="card bg-neutral text-neutral-content shadow">
            <div className="card-body">
              <h2 className="card-title">Response</h2>
              <pre className="overflow-auto rounded-md bg-black/40 p-3 text-xs">
                {JSON.stringify(responseData, null, 2)}
              </pre>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TestNewPage;
