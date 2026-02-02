import BoxA from "../components/dashboard/BoxA.jsx"
import BoxB from "../components/dashboard/BoxB.jsx"
import BoxC from "../components/dashboard/BoxC.jsx"
import HeroPanel from "../components/dashboard/HeroPanel.jsx"
import NavBar from "../components/dashboard/NavBar.jsx"

const Dashboard = () => (
  <div className="min-h-screen bg-void px-6 py-6 text-slate-300 lg:h-svh">
    <div className="flex h-full flex-col gap-6">
      <header className="lg:h-[12vh]">
        <NavBar />
      </header>
      <main className="flex-1">
        <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="order-1 flex flex-col gap-6 lg:col-span-8 lg:grid lg:grid-rows-[4fr_1fr]">
            <HeroPanel />
            <BoxA />
          </section>
          <section className="order-2 flex flex-col gap-6 lg:col-span-4 lg:grid lg:grid-rows-[2fr_1fr]">
            <BoxB />
            <BoxC />
          </section>
        </div>
      </main>
    </div>
  </div>
)

export default Dashboard
