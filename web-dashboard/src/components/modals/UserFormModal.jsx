import React, { useEffect, useState } from "react"
import BaseModal from "./BaseModal.jsx"

const baseLinkClasses =
  "rounded-xl border border-primary/30 bg-base-100 px-3 py-3 text-left transition-all duration-200 " +
  "hover:border-primary/90 hover:bg-gradient-to-br hover:from-primary/20 hover:via-secondary/10 hover:to-base-200 hover:text-base-content " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"

const errLinkClasses =
  "rounded-xl border border-error/30 bg-error/40 px-3 py-3 text-left transition-all duration-200 " +
  "hover:border-error/90 hover:bg-radial hover:from-error/60 hover:via-secondary/30 hover:to-error/60 hover:text-base-content " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"

function UserFormModal({ onClose, title, submitLabel, onSubmit, scannedRfidUid = "", isListeningForCard = false }) {
  const [formData, setFormData] = useState({
    name: "",
    accessLevel: "",
    rfidUid: ""
  })


  useEffect(() => {
    if (!scannedRfidUid) {
      return
    }

    setFormData(prev => ({
      ...prev,
      rfidUid: scannedRfidUid,
    }))
  }, [scannedRfidUid])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <BaseModal title={title} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Group */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Group</span>
          </label>
          <select
            name="accessLevel"
            className="select select-bordered w-full"
            value={formData.accessLevel}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select group</option>
            <option value="Admin">Admin</option>
            <option value="User">Basic</option>
          </select>
        </div>

        <p className="text-sm text-base-content/70">
          {isListeningForCard ? "Waiting for RFID card scan..." : "RFID card detected. You can continue editing details."}
        </p>

        {/* Card ID */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Card ID</span>
          </label>
          <input
            type="text"
            name="rfidUid"
            className="input input-bordered w-full"
            value={formData.rfidUid}
            onChange={handleChange}
            required
          />
        </div>

        {/* Buttons */}
        <div className="modal-action">

          <button type="button" className="btn btn-ghost" onClick={onClose} > Cancel </button>

          <button type="submit" className={baseLinkClasses}>
            {submitLabel}
          </button>

        </div>

      </form>
    </BaseModal>
  )
}

export default UserFormModal