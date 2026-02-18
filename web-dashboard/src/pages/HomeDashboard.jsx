import React from "react";
import ScannerTable from "../components/dashboard/ScannerTable.jsx";
import LatestEvents from "../components/dashboard/LatestEvents.jsx";
import HeroPanel from "../components/dashboard/HeroPanel.jsx";
import StatsPannel from "../components/dashboard/StatsPannel.jsx";

const HomeDashboard = () => {
  return (
    <div
      className="
        grid h-full w-full grid-cols-1 grid-rows-4 gap-3 md:gap-4
        md:grid-cols-3
        md:grid-rows-[1.5fr_1fr]
      "
    >
      {/* Top Left: Main Chart (Span 2 cols) */}
      <section className="min-h-0 min-w-0 md:col-span-2">
        <HeroPanel />
      </section>

      {/* Top Right: Stats (Span 1 col) */}
      <section className="min-h-0 min-w-0">
        <StatsPannel />
      </section>

      {/* Bottom Left: Scanner Table (Span 2 cols) */}
      <section className="min-h-0 min-w-0 md:col-span-2">
        <ScannerTable />
      </section>

      {/* Bottom Right: Latest Events (Span 1 col) */}
      <section className="min-h-0 min-w-0">
        <LatestEvents />
      </section>
    </div>
  );
};

export default HomeDashboard;
