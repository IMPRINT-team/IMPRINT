import React from "react"
import ScannerTable from "../components/dashboard/ScannerTable.jsx"
import LatestEvents from "../components/dashboard/LatestEvents.jsx"
import HeroPanel from "../components/dashboard/HeroPanel.jsx"
import NavBar from "../components/dashboard/NavBar.jsx"
import ImprintLogo from "../components/branding/ImprintLogo.jsx"
import ThemeSelector from "../components/dashboard/ThemeSelector.jsx"

const Dashboard = () => (
  <>
    <div className="flex bg-base-100 grid-rows-12 px-6 pt-6 text-base-content min-h-screen">
      <div className="flex h-full flex-col">
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
        <main className="hidden lg:flex flex-1 mb-2 min-h-0">
          <div className="grid h-full grid-cols-1 gap-2 lg:grid-cols-12">
            <section className="order-1 flex flex-col gap-2 lg:col-span-7 lg:grid lg:grid-rows-[3fr_1fr] min-h-0">
              <HeroPanel />
              <chartBox />
            </section>
            <section className="order-2 flex flex-col gap-2 lg:col-span-5 lg:grid lg:grid-rows-[2fr_1fr] min-h-0">
              <ScannerTable />
              <LatestEvents />
            </section>
          </div>
        </main>
      </div>
    </div>
  </>
)

export default Dashboard
