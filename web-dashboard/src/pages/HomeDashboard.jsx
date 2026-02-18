import React from "react";
import ScannerTable from "../components/dashboard/ScannerTable.jsx";
import LatestEvents from "../components/dashboard/LatestEvents.jsx";
import HeroPanel from "../components/dashboard/HeroPanel.jsx";
import StatsPannel from "../components/dashboard/StatsPannel.jsx";

const HomeDashboard = () => {
  return (
    <div
      className="
        grid h-full w-full gap-3
        grid-cols-1 grid-rows-4
        lg:grid-cols-[2fr_1fr]
        lg:grid-rows-[minmax(0,1.7fr)_minmax(0,1fr)]
      "
    >
      <section className="min-h-0 min-w-0">
        <HeroPanel />
      </section>

      <section className="min-h-0 min-w-0">
        <ScannerTable />
      </section>

      <section className="min-h-0 min-w-0">
        <StatsPannel />
      </section>

      <section className="min-h-0 min-w-0">
        <LatestEvents />
      </section>
    </div>
  );
};

export default HomeDashboard;
