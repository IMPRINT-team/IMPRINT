import React from "react";
import ScannerTable from "../components/dashboard/ScannerTable.jsx";
import LatestEvents from "../components/dashboard/LatestEvents.jsx";
import HeroPanel from "../components/dashboard/HeroPanel.jsx";
import NavBar from "../components/dashboard/NavBar.jsx";
import ImprintLogo from "../components/branding/ImprintLogo.jsx";
import ThemeSelector from "../components/dashboard/ThemeSelector.jsx";
import StatsPannel from "../components/dashboard/StatsPannel.jsx";

const Dashboard = () => (
  <div className="min-h-screen bg-base-100 text-base-content">
    <div className="mx-auto max-w-screen-2xl min-h-screen flex flex-col px-12 pt-12">
      
      {/* Header */}
      <header className="flex items-center gap-4 shrink-0">
        <ImprintLogo
          className="text-primary size-20 shrink-0"
          aria-hidden="true"
        />

        <div className="flex-1 min-w-0">
          <NavBar />
        </div>

        <ThemeSelector />
      </header>

      <div className="divider divider-primary shrink-0" />

      {/* Main */}
      <main className="flex-1 min-h-0 overflow-hidden">
        <div
          className="
            grid h-full w-full gap-3
            grid-cols-1 grid-rows-4
            lg:grid-cols-[2fr_1fr]
            lg:grid-rows-[minmax(0,2fr)_minmax(0,1fr)]
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
      </main>
    </div>
  </div>
);

export default Dashboard;
