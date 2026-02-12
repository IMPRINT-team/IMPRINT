import React, { useEffect, useState } from "react"
import CardShell from "./CardShell.jsx"
import { StatusPill } from "../ui/StatusPill.jsx"

const BASE_URL = "http://localhost:8080/"

const getScanners = async () => {
  const scanners = await fetch(`${BASE_URL}`)
  return scanners
}

const formatTime = (value) => {
  const date = new Date(value)
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
  return formattedDate
}

const ScannerTable = () => {
  const [scanners, setScanners] = useState([])

  useEffect(() => {
    const loadScanners = async () => {
      try {
        const scannerData = await getScanners()
        const data = await scannerData.json()
        setScanners(data)
      } catch (err) {
        console.log(err)
      }
    }

    loadScanners()
  }, [])

  return (
    <CardShell className="h-full overflow-hidden" data-debug-label="ScannerTable">
      <h2 id="scanner-table-title" className="text-base font-semibold">Scanner status</h2>
      <div className="flex-1 overflow-y-auto min-h-0 min-w-0">
        <table className="border mb-1 border-primary rounded-xl border-collapse bg-base-100 shadow-sm overflow-hidden h-full min-w-0 text-sm">
          <thead className="sticky top-0 bg-base-300 z-10">
            <tr className=" border-b border-secondary uppercase">
              <th className="py-1.5 text-primary text-center align-middle text-xs">General Area</th>
              <th className="py-1.5 text-primary text-center align-middle pe-2 text-xs">Specific Location</th>
              <th className="py-1.5 text-primary text-center align-middle pe-2 text-xs">Status</th>
              <th className="py-1.5 text-primary text-center align-middle pe-2 text-xs">Last Seen</th>
              <th className="py-1.5 text-primary text-center align-middle pe-2 text-xs">Authorization</th>
            </tr>
          </thead>
          <tbody className="bg-primary">
            {scanners.length === 0 ? (
              <tr className="bg-base-300">
                <td className="py-4 text-center" colSpan={5}>No scanner data yet.</td>
              </tr>
            ) : scanners.map((scanner) => (
              <tr key={scanner.deviceId} className="bg-base-300">
                <td className="text-center py-2">{scanner.location}</td>
                <td className="text-center py-2">{scanner.specificLocation}</td>
                <td className="text-center py-2 px-2">
                  <StatusPill status={scanner.status} />
                </td>
                <td className="text-center py-2">{formatTime(scanner.createdAt)}</td>
                <td className="text-center py-2">{scanner.authorization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardShell>
  )
}

export default ScannerTable
