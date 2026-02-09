import React from "react"
import chartBox from "../dashboard/chartBox.jsx"
import BoxB from "../dashboard/BoxB.jsx"
import BoxC from "../dashboard/BoxC.jsx"
import HeroPanel from "../dashboard/HeroPanel.jsx"
import NavBar from "../dashboard/NavBar.jsx"
import ImprintLogo from "../branding/ImprintLogo.jsx"
import ThemeSelector from "../dashboard/ThemeSelector.jsx"
import { useState, useEffect } from 'react'
import { StatusPill, ResultPill } from '../ui/StatusPill.tsx'

const BASE_URL = "http://localhost:8080/"

const getScanners = async () => {
  const scanners = await fetch(`${BASE_URL}`)
  return scanners
}

const formatTime = (value) => {
  const date = new Date(value)
  let formattedDate = date.toLocaleString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  hour: 'numeric',
                                  minute: 'numeric',
                                  hour12: true,
                                })
  return formattedDate;
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
    <div className="flex bg-base-100 grid-rows-12 px-6 pt-6 text-base-content min-h-screen">
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
        <main className="hidden lg:flex flex-1 mb-2 min-h-0">
          <div className="grid h-full grid-cols-1 gap-2 lg:grid-cols-12">
            <section className="order-1 flex flex-col gap-2 lg:col-span-7 lg:grid lg:grid-rows-[3fr_1fr] min-h-0">
              <HeroPanel />
              <chartBox />
            </section>
            <section className="order-2 flex flex-col gap-2 lg:col-span-5 lg:grid lg:grid-rows-[2fr_1fr] min-h-0">
                  <div className="border border-primary rounded-xl overflow-y-auto">
                    <div className="flex-1 overflow-y-auto min-h-0 min-w-0">
                      <table className="border mb-2 border-primary rounded-xl border-collapse bg-base-100 shadow-sm overflow-hidden h-full min-w-0">
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
                              <td className="text-center py-3">{scanner.location}</td>
                              <td className="text-center py-3">{scanner.specificLocation}</td>
                              <td className="text-center py-3 px-2">
                                <StatusPill status={scanner.status} />
                              </td>
                              <td className="text-center py-3">{formatTime(scanner.createdAt)}</td>
                              <td className="text-center py-3">{scanner.authorization}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                <BoxB  />
            </section>
          </div>
        </main>
      </div>
    </div>
    </>
  )
}

export default Dashboard
