import React from 'react'
import ScannerFormModal from '../components/modals/ScannerFormModal.jsx'
import { buildApiUrl } from "../lib/apiBase.js"

function AddScannerModal({ onClose }) {
  async function addScanner(scannerData) {
    await fetch(buildApiUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scannerData),
    })

    onClose()
  }

  return (
    <ScannerFormModal
      onClose={onClose}
      title="Add New Scanner"
      submitLabel="Add Scanner"
      purpose={addScanner}
    />
  )
}

export default AddScannerModal
