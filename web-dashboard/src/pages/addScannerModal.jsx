import { MapPin, CuboidIcon, PlusCircleIcon } from "lucide-react"
import React from 'react'
import { useState } from 'react'

const BASE_URL = "http://localhost:8080/"

function AddScannerModal({ onClose }) {
  const [scannerData, setScannerData] = useState({
    location: "",
    specificLocation: "",
    status: "",
    authorization: "",
  })

  async function addScanner () {
    const res = await fetch(`${BASE_URL}`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(scannerData)})
    const data = await res.json()
    return window.location.reload()
  }

  return (
    <dialog id="addScannerModal" className="modal modal-open">
        <div className="modal-box">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>X</button>
            </form>
            <h3 className="font-bold text-xl mb-8">Add New Scanner</h3>

          <form onSubmit={addScanner} className="space-y-6">
              <div className="grid gap-6">
                <div className="form-control">
                    <span className="label-text text-base font-medium mb-2">Scanner General Location</span>
                        <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <CuboidIcon className="size-5" />
                </div>
                <input type="text" placeholder="Enter scanner general location" className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={scannerData.location}
                  onChange={(e) => setScannerData({ ...scannerData, location: e.target.value })}
                />
              </div>
            </div>

            {/* Scanner PRICE INPUT */}
            <div className="form-control">
                <span className="label-text text-base font-medium mb-2">Scanner Specific Location</span>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <MapPin className="size-5" />
                </div>
                <input type="text" placeholder="Enter the specific location (room number)" className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200" value={scannerData.specificLocation} onChange={(e) => setScannerData({ ...scannerData, specificLocation: e.target.value })}/>
              </div>
            </div>

            <div className="inline-flex gap-5 mx-3">
              <div className="form-control">
                <span className="label-text text-base font-medium mb-2">Scanner Status</span>
              <div className="relative">
                <select
                  className="input input-bordered py-3 text-base-content/50 focus:text-base-content focus:input-primary transition-colors duration-200"
                  value={scannerData.status}
                  onChange={(e) => setScannerData({ ...scannerData, status: e.target.value })}
                >
                  <option value="" className="text-base-content/50" disabled>-- Choose your status --</option>
                  <option value="ONLINE" className="text-base-content">Online</option>
                  <option value="OFFLINE" className="text-base-content">Offline</option>
                </select>
              </div>
            </div>

            <div className="form-control">
                <span className="label-text text-base font-medium mb-2">Scanner Authorization Level</span>
              <div className="relative">
                  <select name="AuthLevel" id="AuthLevel" className="input input-bordered py-3 me-2 w-full text-base-content/50 focus:text-base-content focus:input-primary duration-200 transition-colors" value={scannerData.authorization} onChange={(e) => setScannerData({ ...scannerData, authorization: e.target.value })}>
                    <option value="" className="text-base-content/50" disabled>-- Auth Level --</option>
                    <option value="BASIC" className="text-base-content">Basic</option>
                    <option value="ADMIN" className="text-base-content">Admin</option>
                  </select>
              </div>
            </div>
            </div>
          </div>

          {/* MODAL ACTIONS */}
          <div className="modal-action">
            <button className="btn btn-ghost" type="button" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary min-w-[120px]" disabled={!scannerData.location || !scannerData.specificLocation || !scannerData.status || !scannerData.authorization}>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add Scanner
            </button>
              </div>
            </form>
        </div>
        <form method="dialog" className="modal-backdrop">     {/* Closes if you click background */}
        <button>close</button>
      </form>
    </dialog>
  )
}

export default AddScannerModal
