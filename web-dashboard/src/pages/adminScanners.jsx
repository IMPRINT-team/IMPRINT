import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft } from 'lucide-react'
import AddScannerModal from './addScannerModal.jsx'
import UpdateScannerModal from './updateScannerModal.jsx'
import { StatusPill } from '../components/ui/StatusPill.jsx'
import { scannerApi } from "../lib/scannerApi.js"
import { testNewApi } from "../lib/testNewApi.js"
import { Link } from "react-router-dom"

const getScanners = async () => {
  const scannerData = await fetch(scannerApi.listUrl())
  return scannerData
}

const baseLinkClasses =
  "rounded-xl border border-primary/30 bg-base-100 px-3 py-3 text-left transition-all duration-200 " +
  "hover:border-primary/90 hover:bg-gradient-to-br hover:from-primary/20 hover:via-secondary/10 hover:to-base-200 hover:text-base-content " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const errLinkClasses =
  "rounded-xl border border-error/30 bg-error/40 px-3 py-3 text-left transition-all duration-200 " +
  "hover:border-error/90 hover:bg-radial hover:from-error/60 hover:via-secondary/30 hover:to-error/60 hover:text-base-content " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";


const formatTime = (value) => {
  const date = new Date(value)
  const formattedDate = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
  return formattedDate
}

const AdminScanners = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedScanner, setSelectedScanner] = useState(null)
  const [scanners, setScanners] = useState([])
  const [searchType, setSearchType] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const loadScanners = useCallback(async () => {
    try {
      const scannerResponse = await getScanners()
      const data = await scannerResponse.json()

      const scannersWithHealth = await Promise.all(
        data.map(async (scanner) => {
          if (!scanner.deviceId) {
            return {
              ...scanner,
              status: 'OFFLINE',
            }
          }

          try {
            const healthResponse = await testNewApi.healthCheck(scanner.deviceId)
            return {
              ...scanner,
              status: healthResponse.status === 'ok' && healthResponse.registered === 1
                ? 'ONLINE'
                : 'OFFLINE',
            }
          } catch {
            return {
              ...scanner,
              status: 'OFFLINE',
            }
          }
        })
      )

      setScanners(scannersWithHealth)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    loadScanners()

    const pollingInterval = setInterval(() => {
      loadScanners()
    }, 3000)

    return () => clearInterval(pollingInterval)
  }, [loadScanners])

  async function getBy() {
    let scannerData
    if (searchType === 'backToScanners') {
      scannerData = await getScanners()
    } else {
      scannerData = await fetch(scannerApi.searchUrl(searchType, searchValue))
    }

    const filteredScanners = await scannerData.json()
    return setScanners(filteredScanners)
  }

  async function deleteScanner(id) {
    await fetch(scannerApi.deleteUrl(id), { method: 'DELETE' })
    setScanners(prev => prev.filter(scanner => scanner.deviceId !== id))
  }

  function openUpdateModal(scanner) {
    setSelectedScanner(scanner)
    setShowUpdateModal(true)
  }

  function closeUpdateModal() {
    setShowUpdateModal(false)
    setSelectedScanner(null)
  }

  return (
    <>
      <div className="min-h-dvh bg-gradient-to-r from-base-100/30 to-primary/30 pt-2">
        <div className="flex items-center justify-between mb-6 gap-4 mt-2 mx-4">
          <div className="flex align-middle">
            <Link className={baseLinkClasses} to="/dashboard"><ArrowLeft /></Link>
          </div>
          <div className="flex justify-center align-middle">
            <select name="SearchFor" id="txtParam" className="select border border-primary/30 rounded-lg" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="backToScanners">Show All Scanners</option>
              <option value="location">General Area</option>
              <option value="specificLocation">Specific Location</option>
              <option value="status">Status</option>
              <option value="authorization">Authorization Level</option>
            </select>
            <label htmlFor="txtReq" className="label mx-3">Specific Search:</label>
            <input type="text" className="input form-control border border-primary/30" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} id="txtReq" placeholder="Type the scanner information" />
            <button type="button" id="btnSearch" className={`${baseLinkClasses} mx-3`} onClick={getBy}>Search</button>
          </div>
          <div>
            <button type="button" id="btnAddScanner" className={baseLinkClasses} onClick={() => setShowAddModal(true)}>Add Scanner</button>
          </div>
        </div>
        <div className="divider divider-primary mx-3 mb-3"></div>
        <div className="flex justify-center">
          <div className="border-2 border-primary h-fit rounded-xl min-h-0">
            <table className="border border-primary border-collapse rounded-xl bg-base-100 shadow-sm overflow-hidden min-w-0">
              <thead className="sticky top-0 bg-base-300 z-10">
                <tr className=" border-b border-secondary uppercase">
                  <th className="py-2 text-primary text-center align-middle text-sm">General Area</th>
                  <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Specific Location</th>
                  <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Last Seen</th>
                  <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Authorization</th>
                  <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className='bg-base-300'>
                {scanners.map((scanner) => (
                  <tr key={scanner.deviceId} className="hover:bg-gradient-to-br hover:from-primary/10 hover:via-secondary/20 hover:to-neutral/10">
                    <td className="text-center py-3">{scanner.location}</td>
                    <td className="text-center py-3">{scanner.specificLocation}</td>
                    <td className="text-center py-3">{formatTime(scanner.createdAt)}</td>
                    <td className="text-center py-3">{scanner.authorization}</td>
                    <td className="text-center py-3">
                      <button type="button" id="btnUpdateScanner" className={`${baseLinkClasses} me-2`} onClick={() => openUpdateModal(scanner)}>Update Scanner</button>
                      <button type="button" id="btnDeleteScanner" className={errLinkClasses} onClick={() => deleteScanner(scanner.deviceId)}>Delete Scanner</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showAddModal && <AddScannerModal onClose={() => setShowAddModal(false)} data={scanners} setData={setScanners}/>}
      {showUpdateModal && selectedScanner && (
        <UpdateScannerModal onClose={closeUpdateModal} scanner={selectedScanner} />
      )}
    </>
  )
}

export default AdminScanners
