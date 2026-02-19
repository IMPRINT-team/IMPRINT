/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { MapPin, CuboidIcon, PlusCircleIcon } from 'lucide-react'
import BaseModal from './BaseModal.jsx'

const EMPTY_SCANNER_DATA = {
  location: '',
  specificLocation: '',
  status: '',
  authorization: '',
}

function ScannerFormModal({
  onClose,
  title,
  submitLabel,
  purpose,
  initialData = EMPTY_SCANNER_DATA,
}) {
  const [scannerData, setScannerData] = useState({
    ...EMPTY_SCANNER_DATA,
    ...initialData,
  })

  const isSubmitDisabled =
    !scannerData.location ||
    !scannerData.specificLocation ||
    !scannerData.status ||
    !scannerData.authorization

  async function handleSubmit(event) {
    event.preventDefault()
    await onSubmit(scannerData)
  }

  return(
    <BaseModal id="scannerModal" title={title} onClose={onClose}>
      <form className="space-y-6">
        <div className="grid gap-6">
          <div className="form-control">
            <span className="label-text text-base font-medium mb-2">Scanner General Location</span>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <CuboidIcon className="size-5" />
              </div>
              <input
                type="text"
                placeholder="Enter scanner general location"
                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                value={scannerData.location}
                onChange={(e) => setScannerData({ ...scannerData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control">
            <span className="label-text text-base font-medium mb-2">Scanner Specific Location</span>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <MapPin className="size-5" />
              </div>
              <input
                type="text"
                placeholder="Enter the specific location (room number)"
                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                value={scannerData.specificLocation}
                onChange={(e) => setScannerData({ ...scannerData, specificLocation: e.target.value })}
              />
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
                <select
                  name="AuthLevel"
                  id="AuthLevel"
                  className="input input-bordered py-3 me-2 w-full text-base-content/50 focus:text-base-content focus:input-primary duration-200 transition-colors"
                  value={scannerData.authorization}
                  onChange={(e) => setScannerData({ ...scannerData, authorization: e.target.value })}
                >
                  <option value="" className="text-base-content/50" disabled>-- Auth Level --</option>
                  <option value="BASIC" className="text-base-content">Basic</option>
                  <option value="ADMIN" className="text-base-content">Admin</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" type="button" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary min-w-[120px]" disabled={isSubmitDisabled} onClick={purpose(scannerData)}>
            <PlusCircleIcon />
            Add Scanner
          </button>
        </div>
      </form>
    </BaseModal>
  )
}

export default ScannerFormModal
