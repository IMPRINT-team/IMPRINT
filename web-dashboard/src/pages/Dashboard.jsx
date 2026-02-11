import React from "react"
import ScannerTable from "../components/dashboard/ScannerTable.jsx"
import LatestEvents from "../components/dashboard/LatestEvents.jsx"
import HeroPanel from "../components/dashboard/HeroPanel.jsx"
import NavBar from "../components/dashboard/NavBar.jsx"
import ImprintLogo from "../components/branding/ImprintLogo.jsx"
import ThemeSelector from "../components/dashboard/ThemeSelector.jsx"
import StatsPannel from "../components/dashboard/StatsPannel.jsx"

const Dashboard = () => (
  <>
    <div className="flex bg-base-100 grid-rows-12 px-6 pt-6 text-base-content min-h-screen border">
      <div className="h-full w-full flex-col grid grid_cols_[auto_1fr_auto] justify-between">
        <header className="flex items-center justify-center">
          <div>
            <ImprintLogo className="text-primary size-20" />
          </div>
          <div className="flex-1 mx-40">
            <NavBar />
          </div>
          <ThemeSelector />
        </header>
        <div className="divider divider-primary"></div>
        <main className="hidden lg:flex flex-1 mb-2 min-h-0 h-full w-full">
          <div className="grid h-full grid-cols-1 gap-2 lg:grid-cols-3 lg:grid-rows-3">
            <section className="order-1 flex min-h-0 flex-col lg:col-span-2 lg:row-span-2">
              <HeroPanel />
            </section>
            <section className="order-2 flex min-h-0 flex-col lg:col-span-1 lg:row-span-2">
              <ScannerTable />
            </section>
            <section className="order-3 flex min-h-0 flex-col lg:col-span-2 lg:row-span-1">
              <StatsPannel/>
            </section>
            <section className="order-4 flex min-h-0 flex-col lg:col-span-1 lg:row-span-1">
              <LatestEvents />
            </section>
          </div>
        </main>
      </div>
    </div>
  </>
)

export default Dashboard
