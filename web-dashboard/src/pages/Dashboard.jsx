import React, { useState } from "react";
import { Menu } from "lucide-react";
import ScannerTable from "../components/dashboard/ScannerTable.jsx";
import LatestEvents from "../components/dashboard/LatestEvents.jsx";
import HeroPanel from "../components/dashboard/HeroPanel.jsx";
import NavBar from "../components/dashboard/NavBar.jsx";
import ImprintLogo from "../components/branding/ImprintLogo.jsx";
import ThemeSelector from "../components/dashboard/ThemeSelector.jsx";
import StatsPannel from "../components/dashboard/StatsPannel.jsx";

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-base-100 text-base-content">
      <div className="mx-auto flex h-full max-w-screen-2xl flex-col p-3 lg:p-4">
        <header className="shrink-0">
          <div className="flex items-center justify-between gap-4">
            <ImprintLogo
              className="text-primary size-14 shrink-0"
              aria-hidden="true"
            />
            <ThemeSelector />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="btn btn-sm btn-outline border-primary"
              aria-label="Open navigation menu"
              aria-controls="dashboard-drawer"
              aria-expanded={isDrawerOpen}
            >
              <Menu className="size-4" aria-hidden="true" />
              Menu
            </button>
            <div className="divider divider-primary my-0 flex-1" />
          </div>
        </header>

        <NavBar isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

        <main className="mt-3 min-h-0 flex-1 overflow-hidden">
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
