import React from "react"
import UserFormModal from "../components/modals/UserFormModal.jsx"
import { buildApiUrl } from "../lib/apiBase.js"

function AddUserModal({ onClose, data, setData }) {

  async function addUser(userData) {
    const response = await fetch(buildApiUrl("user"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
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
    />
  )
}

export default AddUserModal