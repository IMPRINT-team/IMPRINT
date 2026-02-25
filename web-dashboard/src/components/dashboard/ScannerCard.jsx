import React from "react";
import PropTypes from "prop-types";
import { StatusPill } from "../ui/StatusPill.jsx";

const padNumber = (value) => String(value).padStart(2, "0");

const formatDuration = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
};

const resolveHeartbeatValue = (scanner) => (
  scanner.lastHeartbeat
  || scanner.last_seen
  || scanner.lastSeen
  || scanner.updatedAt
  || scanner.createdAt
);

const formatHeartbeat = (value) => {
  if (!value) {
    return "--:--:--";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return "--:--:--";
  }

  const diffInSeconds = Math.max(0, Math.floor((Date.now() - parsed.getTime()) / 1000));
  return formatDuration(diffInSeconds);
};

const ScannerCard = ({ scanner, onClick, className = "" }) => {
  const heartbeat = formatHeartbeat(resolveHeartbeatValue(scanner));
  const scannerName = scanner.name || scanner.location || "Unknown Scanner";

  const handleClick = () => {
    if (onClick) {
      onClick(scanner);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group flex w-full items-center justify-between gap-4 rounded-xl bg-base-300 px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:ring-1 hover:ring-primary/70 ${className}`}
      aria-label={`Open scanner details for ${scannerName}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="h-8 w-2 shrink-0 rounded-full bg-primary/70" aria-hidden="true" />

        <div className="flex min-w-0 flex-col gap-1">
          <p className="truncate text-sm font-bold uppercase tracking-wide text-base-content">{scannerName}</p>
          <StatusPill status={scanner.status} />
        </div>
      </div>

      <span className="shrink-0 font-mono text-xs font-semibold text-primary">{heartbeat}</span>
    </button>
  );
};

ScannerCard.propTypes = {
  scanner: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    deviceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string,
    lastHeartbeat: PropTypes.string,
    last_seen: PropTypes.string,
    lastSeen: PropTypes.string,
    updatedAt: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default ScannerCard;
