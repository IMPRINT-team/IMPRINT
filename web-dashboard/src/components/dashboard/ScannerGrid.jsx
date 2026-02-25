import React from "react";
import PropTypes from "prop-types";
import CardShell from "./CardShell.jsx";
import ScannerCard from "./ScannerCard.jsx";

const ScannerGrid = ({ scanners, onSelect }) => {
  return (
    <CardShell className="h-full" data-debug-label="ScannerGrid">
      <h2 id="scanner-grid-title" className="text-base font-semibold">Scanner status</h2>
      {scanners.length === 0 ? (
        <div className="flex min-h-0 flex-1 items-center justify-center rounded-xl border border-primary/40 bg-base-300 px-4 text-center text-sm">
          No scanner data yet.
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
          {scanners.map((scanner, index) => (
            <ScannerCard
              key={scanner.deviceId ?? scanner.id ?? scanner.name ?? index}
              scanner={scanner}
              onClick={onSelect}
            />
          ))}
        </div>
      )}
    </CardShell>
  );
};

ScannerGrid.propTypes = {
  scanners: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ScannerGrid;
