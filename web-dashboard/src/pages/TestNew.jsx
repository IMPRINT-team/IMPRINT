import { useState } from "react";
import { Link } from "react-router-dom";
import { testNewApi } from "../lib/testNewApi.js";

const TestNewPage = () => {
  const [eventFormState, setEventFormState] = useState({
    registeredScannerId: "",
    rfidUid: "BE:00:28:AF",
    result: "ACCEPTED",
  });
  const [healthCheckFormState, setHealthCheckFormState] = useState({
    unregisteredScannerId: "",
  });
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [activeSubmit, setActiveSubmit] = useState("");

  const onEventChange = (event) => {
    const { name, value } = event.target;
    setEventFormState((current) => ({ ...current, [name]: value }));
  };

  const onHealthCheckChange = (event) => {
    const { name, value } = event.target;
    setHealthCheckFormState((current) => ({ ...current, [name]: value }));
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
    await runEmulation({ emulationType: "health-check", values: healthCheckFormState });
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

            <label className="form-control md:col-span-2">
              <span className="label-text">Unregistered scanner ID (optional)</span>
              <input
                className="input input-bordered"
                name="unregisteredScannerId"
                onChange={onHealthCheckChange}
                placeholder="Custom ID for onboarding emulation"
                type="text"
                value={healthCheckFormState.unregisteredScannerId}
              />
            </label>
          </div>

          <div className="card-actions justify-end px-6 pb-6">
            <button className="btn btn-primary" disabled={activeSubmit !== ""} type="submit">
              {activeSubmit === "health-check" ? "Running..." : "Run health-check emulation"}
            </button>
          </div>
        </form>

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
