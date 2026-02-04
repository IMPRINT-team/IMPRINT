import BoxA from "../components/dashboard/BoxA.jsx"
import BoxB from "../components/dashboard/BoxB.jsx"
import BoxC from "../components/dashboard/BoxC.jsx"
import HeroPanel from "../components/dashboard/HeroPanel.jsx"
import NavBar from "../components/dashboard/NavBar.jsx"
import ImprintLogo from "../components/branding/ImprintLogo.jsx"
import ThemeSelector from "../components/dashboard/ThemeSelector.jsx"
import { useState, useEffect } from 'react'
import { StatusPill, ResultPill } from '../ui/StatusPill.tsx'

const BASE_URL = "http://localhost:8080/"

const getScanners = async () => {
  const scanners = await fetch(`${BASE_URL}`)
  return scanners
}

const Dashboard = () => {
  const [scanners, setScanners] = useState([]);
  useEffect(() => {
    const loadScanners = async () => {
      try {
        const scannerData = await getScanners();
        const data = await scannerData.json()
        setScanners(data);
      } catch (err) {
          console.log(err)
      }
    }
    loadScanners()
  }, [])

  const scannerMap = new Map(scanners.map((scanner) => [scanner.deviceId, scanner]))

  return(
    <>
    <div className="min-h-screen bg-base-100 grid-rows-12 px-6 pt-6 text-base-content ring-4 ring-primary lg:h-svh">
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-center">
          <div >
            <ImprintLogo className="text-primary size-20"/>
          </div>
          <div className="flex-1 mx-40">
            <NavBar />
          </div>
          <ThemeSelector />
        </header>
        <div className="divider divider-primary"></div>
        <main className="flex-1 mb-2 min-h-0">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
            <section className="order-1 flex flex-col gap-2 lg:col-span-8 lg:grid lg:grid-rows-[4fr_1fr]">
              <HeroPanel />
              <BoxA />
            </section>
            <section className="order-2 flex flex-col gap-2 lg:col-span-4 lg:grid lg:grid-rows-[2fr_1fr]">
              <BoxB />
              <div className="card border border-primary rounded-xl bg-base-100 shadow-sm h-full">
                <div className="h-full overflow-y-auto">
                  <table className="card-body w-full text-left">
                    <thead className="sticky top-0 bg-base-300 z-10">
                      <tr className=" border-b border-secondary uppercase">
                        <th className="py-2 text-primary text-center align-middle text-sm">General Area</th>
                        <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Specific Location</th>
                        <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Status</th>
                        <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Last Seen</th>
                        <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Authorization</th>
                      </tr>
                    </thead>
                    <tbody className="bg-primary">
                      {scanners.map((scanner) => (
                        <tr key={scanner.deviceId} className="bg-base-300">
                          <td>{scanner.location}</td>
                          <td>{scanner.specificLocation}</td>
                          <td>
                            <StatusPill status={scanner.status} />
                          </td>
                          <td>{scanner.createdAt}</td>
                          <td>{scanner.authorization}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
    </>
  )
}

export default Dashboard

