import React, { useEffect, useId, useRef, useState } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const createInitialState = (scanner) => ({
  location: scanner?.location ?? "",
  specificLocation: scanner?.specificLocation ?? "",
  status: scanner?.status ?? "ONLINE",
  authorization: scanner?.authorization ?? "BASIC",
});

const baseLinkClasses =
  "rounded-xl border border-primary/30 bg-base-100 px-3 py-3 text-left transition-all duration-200 " +
  "hover:border-primary/90 hover:bg-gradient-to-br hover:from-primary/20 hover:via-secondary/10 hover:to-base-200 hover:text-base-content " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";


const ScannerModal = ({
  isOpen,
  scanner = null,
  isSaving,
  saveError = null,
  onClose,
  onSave,
  restoreFocusRef = null,
}) => {
  const modalRef = useRef(null);
  const headingId = useId();
  const [formState, setFormState] = useState(createInitialState(scanner));

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFormState(createInitialState(scanner));
  }, [isOpen, scanner]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusable = modalRef.current.querySelectorAll(FOCUSABLE_SELECTOR);

      if (focusable.length === 0) {
        return;
      }

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !modalRef.current) {
      return;
    }

    const firstFocusable = modalRef.current.querySelector(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      return;
    }

    restoreFocusRef?.current?.focus?.();
  }, [isOpen, restoreFocusRef]);

  if (!isOpen || !scanner) {
    return null;
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSave(formState);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/60 p-4"
      onMouseDown={handleBackdropClick}
    >
      <section
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="w-full max-w-2xl rounded-2xl border border-primary/40 bg-base-100 p-5 shadow-2xl"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 id={headingId} className="text-xl font-semibold">Scanner Details</h3>
            <p className="mt-1 text-sm text-base-content/70">Device ID: {scanner.deviceId}</p>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost"
            onClick={onClose}
            aria-label="Close scanner details"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="form-control">
            <span className="label-text mb-1 text-sm font-medium">General area</span>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formState.location}
              onChange={(event) =>
                setFormState((current) => ({ ...current, location: event.target.value }))
              }
              required
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-1 text-sm font-medium">Specific location</span>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formState.specificLocation}
              onChange={(event) =>
                setFormState((current) => ({ ...current, specificLocation: event.target.value }))
              }
              required
            />
          </label>

          <div className="grid gap-4">
            

            <label className="form-control">
              <span className="label-text mb-1 text-sm font-medium">Authorization</span>
              <select
                className="select select-bordered"
                value={formState.authorization}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, authorization: event.target.value }))
                }
              >
                <option value="BASIC">Basic</option>
                <option value="ADMIN">Admin</option>
              </select>
            </label>
          </div>

          {saveError ? <p className="text-sm text-error">{saveError}</p> : null}

          <div className="mt-6 flex justify-end gap-2">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isSaving}>
              Close
            </button>
            <button type="submit" className={`btn ${baseLinkClasses}`} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );

  return createPortal(modalContent, document.body);
};

ScannerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  scanner: PropTypes.shape({
    deviceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    location: PropTypes.string,
    specificLocation: PropTypes.string,
    status: PropTypes.string,
    authorization: PropTypes.string,
  }),
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  restoreFocusRef: PropTypes.shape({ current: PropTypes.any }),
};

export default ScannerModal;
