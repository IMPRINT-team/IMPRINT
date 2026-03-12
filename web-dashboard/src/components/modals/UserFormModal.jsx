import React, { useEffect, useRef, useState } from "react"
import BaseModal from "./BaseModal.jsx"

const baseLinkClasses =
  "rounded-xl border border-primary/30 bg-base-100 px-3 py-3 text-left transition-all duration-200 " +
  "hover:border-primary/90 hover:bg-gradient-to-br hover:from-primary/20 hover:via-secondary/10 hover:to-base-200 hover:text-base-content " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"

const errLinkClasses =
  "rounded-xl border border-error/30 bg-error/40 px-3 py-3 text-left transition-all duration-200 " +
  "hover:border-error/90 hover:bg-radial hover:from-error/60 hover:via-secondary/30 hover:to-error/60 hover:text-base-content " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"

// Keyboard-wedge RFID scanners type quickly and usually terminate with Enter.
const SCANNER_INPUT_TIMEOUT_MS = 120
const SCANNER_MIN_LENGTH = 4

function UserFormModal({ onClose, title, submitLabel, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    accessLevel: "",
    rfidUid: ""
  })
  const [hasScannedUid, setHasScannedUid] = useState(false)
  const [scanStatus, setScanStatus] = useState("Waiting for card scan...")
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const scanBufferRef = useRef("")
  const scanTimerRef = useRef(null)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === "rfidUid") {
      const hasManualUid = value.trim().length > 0
      setHasScannedUid(hasManualUid)
      setScanStatus(hasManualUid ? "Card UID ready." : "Waiting for card scan...")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!hasScannedUid || !formData.rfidUid.trim()) {
      setSubmitError("Please scan an RFID card before submitting.")
      return
    }

    setSubmitError("")
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } catch (error) {
      setSubmitError(error?.message ?? "Unable to create user.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    // Listen for HID keyboard scanner input only while this modal is mounted.
    const handleScannerKeydown = (event) => {
      if (event.key === "Shift" || event.key === "Control" || event.key === "Alt") {
        return
      }

      if (scanTimerRef.current) {
        clearTimeout(scanTimerRef.current)
      }

      if (event.key === "Enter") {
        const uid = scanBufferRef.current.trim()
        scanBufferRef.current = ""

        if (uid.length >= SCANNER_MIN_LENGTH) {
          setFormData((prev) => ({ ...prev, rfidUid: uid }))
          setHasScannedUid(true)
          setSubmitError("")
          setScanStatus(`Scanned UID: ${uid}`)
        }

        return
      }

      if (event.key.length === 1) {
        scanBufferRef.current += event.key
        scanTimerRef.current = setTimeout(() => {
          scanBufferRef.current = ""
        }, SCANNER_INPUT_TIMEOUT_MS)
      }
    }

    window.addEventListener("keydown", handleScannerKeydown)

    return () => {
      window.removeEventListener("keydown", handleScannerKeydown)
      if (scanTimerRef.current) {
        clearTimeout(scanTimerRef.current)
      }
    }
  }, [])

  return (
    <BaseModal title={title} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">

        <p className="text-sm text-base-content/70">{scanStatus}</p>
        {submitError ? <p className="text-sm text-error">{submitError}</p> : null}

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
            <option value="ADMIN">Admin</option>
            <option value="BASIC">Basic</option>
          </select>
        </div>

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
            placeholder="Scan a card to auto-fill"
            required
          />
        </div>

        {/* Buttons */}
        <div className="modal-action">

          <button type="button" className="btn btn-ghost" onClick={onClose} > Cancel </button>

          <button type="submit" className={hasScannedUid ? baseLinkClasses : errLinkClasses} disabled={!hasScannedUid || isSubmitting}>
            {isSubmitting ? "Saving..." : submitLabel}
          </button>

        </div>

      </form>
    </BaseModal>
  )
}

export default UserFormModal
