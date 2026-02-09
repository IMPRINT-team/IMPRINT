import React, { useEffect, useState } from "react"
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
  )
}

export default ScannerTable
