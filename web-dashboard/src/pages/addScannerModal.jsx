import React from 'react'
import ScannerFormModal from '../components/modals/AddScanBaseModal.jsx'

const BASE_URL = 'http://localhost:8080/'

function AddScannerModal({ onClose }) {
  async function addScanner(scannerData) {
    await fetch(`${BASE_URL}`, {
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
