import React from "react";
import ScannerTable from "../components/dashboard/ScannerTable.jsx";
import LatestEvents from "../components/dashboard/LatestEvents.jsx";
import HeroPanel from "../components/dashboard/HeroPanel.jsx";
import NavBar from "../components/dashboard/NavBar.jsx";
import ImprintLogo from "../components/branding/ImprintLogo.jsx";
import ThemeSelector from "../components/dashboard/ThemeSelector.jsx";
import StatsPannel from "../components/dashboard/StatsPannel.jsx";

const Dashboard = () => (
  <>
    {/* Skip to main content (keyboard users) */}
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-base-100 px-4 py-2 rounded shadow"
    >
      Skip to main content
    </a>

    <div className="min-h-screen bg-base-100 text-base-content border">
      <div className="mx-auto flex h-full max-w-screen-2xl flex-col px-6 pt-6">
        {/* Header / Branding / Navigation */}
        <header className="flex items-center gap-4">
          <ImprintLogo
            className="text-primary size-20"
            aria-hidden="true"
          />

          <div className="flex-1 min-w-0">
            <NavBar />
          </div>

          <ThemeSelector />
        </header>

        <div className="divider divider-primary" role="separator" />

        {/* Main dashboard content */}
        <main
          id="main-content"
          className="flex flex-1 min-h-0"
          tabIndex={-1}
        >
          {/* Hide layout visually on small screens, not from screen readers */}
          <div className="sr-only lg:not-sr-only lg:flex w-full">
            <div className="grid h-full w-full grid-cols-1 gap-2 lg:grid-cols-3 lg:grid-rows-3">
              <section
                className="order-1 flex min-h-0 flex-col lg:col-span-2 lg:row-span-2"
                aria-labelledby="hero-panel-title"
              >
                <HeroPanel />
              </section>

              <section
                className="order-2 flex min-h-0 flex-col lg:col-span-1 lg:row-span-2"
                aria-labelledby="scanner-table-title"
              >
                <ScannerTable />
              </section>

              <section
                className="order-3 flex min-h-0 flex-col lg:col-span-2 lg:row-span-1"
                aria-labelledby="stats-panel-title"
              >
                <StatsPannel />
              </section>

              <section
                className="order-4 flex min-h-0 flex-col lg:col-span-1 lg:row-span-1"
                aria-labelledby="latest-events-title"
              >
                <LatestEvents />
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  </>
);

export default Dashboard;
