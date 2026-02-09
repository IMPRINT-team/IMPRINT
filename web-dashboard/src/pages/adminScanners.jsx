import { useState, useEffect } from 'react';
import { StatusPill } from '../components/ui/StatusPill.jsx'

const BASE_URL = "http://localhost:8080/"

const getScanners = async () => {
    const scannerData = await fetch(`${BASE_URL}`)
    return scannerData
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

const AdminScanners = () => {
    const [scanners, setScanners] = useState([])
    useEffect(() => {
        const loadScanners = async () => {
            try {
                const scanners = await getScanners()
                const data = await scanners.json()
                setScanners(data)
            } catch (err) {
                console.log(err)
            }
        }
        loadScanners()
    }, [])

    const scannerMap = new Map(scanners.map((scanner) => [scanner.deviceId, scanner]))

    return(
        
        <div className="h-svh">
            <div className="flex items-center justify-center my-3">
                Actions: Add, Delete, Edit
            </div>
            <div className="divider divider-primary mx-3 mb-3"></div>
            <div className="flex justify-center h-full">
                <div className="border-2 border-primary w-fit h-fit rounded-xl min-h-0">
                    <table className="border border-primary border-collapse rounded-xl bg-base-100 shadow-sm overflow-hidden min-w-0">
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
        </div>
    )
}

export default AdminScanners;
