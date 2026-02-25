import React from 'react'
import ScannerFormModal from '../components/modals/ScannerFormModal.jsx'
import { buildApiUrl } from "../lib/apiBase.js"

function AddScannerModal({ onClose }) {
  async function addScanner(scannerData) {
    await fetch(buildApiUrl('/scanners'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scannerData),
    })

    onClose()
    window.location.reload()
  }

  return (
    <ScannerFormModal
      onClose={onClose}
      title="Add New Scanner"
      submitLabel="Add Scanner"
      onSubmit={addScanner}
    />
  )
}

export default AddScannerModal
