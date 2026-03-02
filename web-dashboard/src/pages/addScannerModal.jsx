import React from 'react'
import ScannerFormModal from '../components/modals/ScannerFormModal.jsx'
import { scannerApi } from "../lib/scannerApi.js"

function AddScannerModal({ onClose, data, setData }) {
  async function addScanner(scannerData) {
    const response = await fetch(scannerApi.createUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scannerData),
    })
    const scanner = await response.json()
    onClose()
    setData(prev => [...prev, scanner])
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
