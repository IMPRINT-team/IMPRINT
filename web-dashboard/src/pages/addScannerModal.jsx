import React from 'react'
import ScannerFormModal from '../components/modals/ScannerFormModal.jsx'

const BASE_URL = 'http://localhost:8080/'

function AddScannerModal({ onClose }) {
  async function addScanner(scannerData) {
    await fetch(`${BASE_URL}admin/scanners`, {
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
