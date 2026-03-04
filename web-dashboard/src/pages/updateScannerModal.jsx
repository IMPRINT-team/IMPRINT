import React from 'react'
import ScannerFormModal from '../components/modals/ScannerFormModal.jsx'

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
      showStatus={false}
      authorizationLabel="Scanner Group"
      authorizationPlaceholder="-- Group --"
    />
  )
}

export default UpdateScannerModal
