import { useState } from "react";
import { Link } from "react-router-dom";
import { testNewApi } from "../lib/testNewApi.js";

const TestNewPage = () => {
  const [formState, setFormState] = useState({
    registeredScannerId: "",
    rfidUid: "BE:00:28:AF",
    result: "ACCEPTED",
    unregisteredScannerId: "",
  });
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResponseData(null);
    setIsSubmitting(true);

    try {
      const payload = Object.fromEntries(
        Object.entries(formState).filter(([, value]) => value.trim() !== ""),
      );
      const data = await testNewApi.run(payload);
      setResponseData(data);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
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

        <p className="text-sm opacity-80">
          Use this page to create scanner events and emulate how an unregistered scanner would be
          handled by health-check onboarding logic.
        </p>

        <form className="card bg-base-100 shadow" onSubmit={onSubmit}>
          <div className="card-body grid gap-4 md:grid-cols-2">
            <label className="form-control">
              <span className="label-text">Registered scanner ID (optional)</span>
              <input
                className="input input-bordered"
                name="registeredScannerId"
                onChange={onChange}
                placeholder="UUID of an existing scanner"
                type="text"
                value={formState.registeredScannerId}
              />
            </label>

            <label className="form-control">
              <span className="label-text">RFID UID</span>
              <input
                className="input input-bordered"
                name="rfidUid"
                onChange={onChange}
                type="text"
                value={formState.rfidUid}
              />
            </label>

            <label className="form-control">
              <span className="label-text">Result</span>
              <select
                className="select select-bordered"
                name="result"
                onChange={onChange}
                value={formState.result}
              >
                <option value="ACCEPTED">ACCEPTED</option>
                <option value="DENIED">DENIED</option>
              </select>
            </label>

            <label className="form-control">
              <span className="label-text">Unregistered scanner ID (optional)</span>
              <input
                className="input input-bordered"
                name="unregisteredScannerId"
                onChange={onChange}
                placeholder="Custom ID for onboarding emulation"
                type="text"
                value={formState.unregisteredScannerId}
              />
            </label>
          </div>

          <div className="card-actions justify-end px-6 pb-6">
            <button className="btn btn-primary" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Running..." : "Run /TestNew"}
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
