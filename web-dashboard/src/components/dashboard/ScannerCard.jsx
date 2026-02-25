import React from "react";
import PropTypes from "prop-types";
import { StatusPill } from "../ui/StatusPill.jsx";
import { formatTime } from "../../lib/formatTime.js";

const ScannerCard = ({ scanner, onClick, className = "" }) => {
  const handleClick = () => {
    onClick(scanner);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full rounded-xl border border-primary/40 bg-base-300 p-4 text-left shadow-sm transition hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 ${className}`}
      aria-label={`Open scanner details for ${scanner.location} ${scanner.specificLocation}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-base-content/60">General Area</p>
          <p className="text-sm font-semibold">{scanner.location || "Unknown"}</p>
          <p className="mt-1 text-xs text-base-content/70">{scanner.specificLocation || "Unknown"}</p>
        </div>
        <StatusPill status={scanner.status} />
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
        <div>
          <dt className="uppercase tracking-wide text-base-content/60">Last Seen</dt>
          <dd className="mt-0.5 text-sm text-base-content">{formatTime(scanner.createdAt)}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-wide text-base-content/60">Authorization</dt>
          <dd className="mt-0.5 text-sm text-base-content">{scanner.authorization || "Unknown"}</dd>
        </div>
      </dl>
    </button>
  );
};

ScannerCard.propTypes = {
  scanner: PropTypes.shape({
    deviceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    location: PropTypes.string,
    specificLocation: PropTypes.string,
    status: PropTypes.string,
    createdAt: PropTypes.string,
    authorization: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ScannerCard;
