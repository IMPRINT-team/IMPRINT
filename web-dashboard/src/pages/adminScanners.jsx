import React from 'react'
import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import AddScannerModal from './addScannerModal.jsx'
import UpdateScannerModal from './updateScannerModal.jsx'
import { StatusPill } from '../components/ui/StatusPill.jsx'
import { scannerApi } from "../lib/scannerApi.js"

const getScanners = async () => {
  const scannerData = await fetch(scannerApi.listUrl())
  return scannerData
}

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
    window.location.reload()
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
      <div className="h-dvh">
        <div className="flex align-middle justify-around my-3 mt-4">
          <div className="flex align-middle">
            <a type="button" className="btn btn-primary" href="/playground"><ArrowLeft /></a>
          </div>
          <div className="flex justify-center align-middle">
            <select name="SearchFor" id="txtParam" className="select border border-primary rounded-lg" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="backToScanners">Show All Scanners</option>
              <option value="location">General Area</option>
              <option value="specificLocation">Specific Location</option>
              <option value="status">Status</option>
              <option value="authorization">Authorization Level</option>
            </select>
            <label htmlFor="txtReq" className="label mx-3">Specific Search:</label>
            <input type="text" className="input form-control border border-primary" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} id="txtReq" placeholder="Type the scanner information" />
            <button type="button" id="btnSearch" className="btn btn-primary mx-3" onClick={getBy}>Search</button>
          </div>
          <div>
            <button type="button" id="btnAddScanner" className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add Scanner</button>
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
                  <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Status</th>
                  <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Last Seen</th>
                  <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Authorization</th>
                  <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Actions</th>
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
                    <td className="text-center py-3">
                      <button type="button" id="btnUpdateScanner" className="btn btn-primary mb-3 lg:mb-0 lg:me-3" onClick={() => openUpdateModal(scanner)}>Update Scanner</button>
                      <button type="button" id="btnDeleteScanner" className="btn btn-error" onClick={() => deleteScanner(scanner.deviceId)}>Delete Scanner</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showAddModal && <AddScannerModal onClose={() => setShowAddModal(false)} />}
      {showUpdateModal && selectedScanner && (
        <UpdateScannerModal onClose={closeUpdateModal} scanner={selectedScanner} />
      )}
    </>
  )
}

export default AdminScanners
