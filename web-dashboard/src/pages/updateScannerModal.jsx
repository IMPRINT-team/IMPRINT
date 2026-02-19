import React from 'react'
import ScannerFormModal from '../components/modals/AddScanBaseModal.jsx'

function UpdateScannerModal({ onClose, scanner }) {
  async function updateScanner(updatedScannerData) {
    console.log('Updated', updatedScannerData)
    onClose()
  }

  return (
    <ScannerFormModal
      onClose={onClose}
      title="Update Scanner"
      submitLabel="Update Scanner"
      onSubmit={updateScanner}
      initialData={scanner}
    />
  )
}

export default UpdateScannerModal
