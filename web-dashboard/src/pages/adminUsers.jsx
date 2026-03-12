import React, { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import AddUserModal from "./addUserModal.jsx"
import { buildApiUrl } from "../lib/apiBase.js"
import { Link } from "react-router-dom"

const getUsers = async () => {
  const response = await fetch(buildApiUrl("user"))
  return response
}

const baseLinkClasses =
  "rounded-xl border border-primary/30 bg-base-100 px-3 py-3 text-left transition-all duration-200 " +
  "hover:border-primary/90 hover:bg-gradient-to-br hover:from-primary/20 hover:via-secondary/10 hover:to-base-200 hover:text-base-content " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"

const AdminUsers = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [users, setUsers] = useState([])


  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getUsers()
        const data = await users.json()
        setUsers(data)
      } catch (err) {
        console.log(err)
      }
    }

    loadUsers()
  }, [])

  return (
    <>
      <div className="min-h-dvh bg-gradient-to-r from-base-100/30 to-primary/10 pt-2">
        <div className="flex items-center justify-between mb-6 gap-4 mt-2 mx-4">
          
          {/* Back Button */}
          <div className="flex align-middle">
            <Link className={baseLinkClasses} to="/dashboard">
              <ArrowLeft />
            </Link>
          </div>

          {/* Add User Button */}
          <div>
            <button
              type="button"
              className={baseLinkClasses}
              onClick={() => setShowAddModal(true)}
            >
              Add User
            </button>
          </div>
        </div>

        <div className="divider divider-primary mx-3 mb-3"></div>

        {/* Table Section — MATCHED */}
        <div className="flex justify-center">
          <div className="border-2 border-primary h-fit rounded-xl min-h-0 w-3/4">
            <table className="border border-primary border-collapse rounded-xl bg-base-100 shadow-sm overflow-hidden min-w-0 w-full justify-center">
              
              <thead className="sticky top-0 bg-base-300 z-10">
                <tr className="border-b border-secondary uppercase">
                  <th className="py-2 text-primary text-center text-sm">
                    Card ID
                  </th>
                  <th className="py-2 text-primary text-center text-sm">
                    Name
                  </th>
                  <th className="py-2 text-primary text-center text-sm">
                    Group
                  </th>
                </tr>
              </thead>

              <tbody className="bg-base-300">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gradient-to-br hover:from-primary/10 hover:via-secondary/20 hover:to-neutral/10"
                  >
                    <td className="text-center py-3">
                      {user.rfidUid}
                    </td>

                    <td className="text-center py-3">
                      {user.name}
                    </td>

                    <td className="text-center py-3">
                      {user.accessLevel}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          data={users}
          setData={setUsers}
        />
      )}
    </>
  )
}

export default AdminUsers