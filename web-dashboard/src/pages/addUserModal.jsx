import React, { useEffect, useRef, useState } from "react"
import UserFormModal from "../components/modals/UserFormModal.jsx"
import { buildApiUrl } from "../lib/apiBase.js"

const POLL_INTERVAL_MS = 3000

function AddUserModal({ onClose, data, setData }) {
  const [scannedRfidUid, setScannedRfidUid] = useState("")
  const [isListeningForCard, setIsListeningForCard] = useState(true)
  const latestSeenMarkerRef = useRef("")

  useEffect(() => {
    let isMounted = true

    const pollLatestScan = async () => {
      try {
        const response = await fetch(buildApiUrl("scan/latest"), {
          method: "GET",
          cache: "no-store",
        })

        if (!response.ok) {
          if (response.status === 404 && isMounted) {
            setIsListeningForCard(true)
          }
          return
        }

        const latestScan = await response.json()
        const eventMarker = `${latestScan.occurredAt}-${latestScan.scannerId}-${latestScan.rfidUid}`

        if (latestScan?.rfidUid && latestSeenMarkerRef.current !== eventMarker && isMounted) {
          latestSeenMarkerRef.current = eventMarker
          setScannedRfidUid(latestScan.rfidUid)
          setIsListeningForCard(false)
        }
      } catch (_err) {
        // Keep polling while modal is open.
      }
    }

    pollLatestScan()
    const intervalId = setInterval(pollLatestScan, POLL_INTERVAL_MS)

    return () => {
      isMounted = false
      clearInterval(intervalId)
    }
  }, [])

  async function addUser(userData) {
    const payload = {
      ...userData,
      rfidUid: userData.rfidUid || scannedRfidUid,
    }

    const response = await fetch(buildApiUrl("user/register"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const user = await response.json()

    setData(prev => [...prev, user])
    onClose()
  }

  return (
    <UserFormModal
      title="Add New User"
      submitLabel="Add User"
      onClose={onClose}
      onSubmit={addUser}
      scannedRfidUid={scannedRfidUid}
      isListeningForCard={isListeningForCard}
    />
  )
}

export default AddUserModal
