import React from "react";
import PropTypes from "prop-types";
import CardShell from "./CardShell.jsx";
import ScannerCard from "./ScannerCard.jsx";
import { useState } from 'react';
import AddScannerModal from '../../pages/addScannerModal.jsx'

const baseLinkClasses =
  "rounded-xl border border-primary/30 bg-base-100 px-3 py-3 text-left transition-all duration-200 " +
  "hover:border-primary/90 hover:bg-gradient-to-br hover:from-primary/20 hover:via-secondary/10 hover:to-base-200 hover:text-base-content " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const ScannerGrid = ({ scanners, setScanners, onSelect }) => {
  const [AddModalOpen, SetAddModalOpen] = useState(false)
  return (
    <CardShell className="h-full" data-debug-label="ScannerGrid">
      <div className="flex items-center justify-between">
        <h2 id="scanner-grid-title" className="text-base font-semibold">Scanners</h2>
        <button className={baseLinkClasses} onClick ={() => SetAddModalOpen(true)}>Add Scanner</button>
      </div>
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
      {AddModalOpen && <AddScannerModal onClose={() => SetAddModalOpen(false)} data={scanners} setData={setScanners}/>}
    </CardShell>
  );
};

ScannerGrid.propTypes = {
  scanners: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ScannerGrid;
