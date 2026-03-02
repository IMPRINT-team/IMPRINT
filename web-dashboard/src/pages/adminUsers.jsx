import { useState, useEffect } from 'react';
import React from "react"
import { ArrowLeft } from 'lucide-react';
import { buildApiUrl } from "../lib/apiBase.js"
import { Link } from "react-router-dom"

const getUsers = async () => {
    const scannerData = await fetch(buildApiUrl('user'))
    return scannerData
}

const baseLinkClasses =
  "rounded-xl border border-primary/30 bg-base-100 px-3 py-3 text-left transition-all duration-200 " +
  "hover:border-primary/90 hover:bg-gradient-to-br hover:from-primary/20 hover:via-secondary/10 hover:to-base-200 hover:text-base-content " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const errLinkClasses =
  "rounded-xl border border-error/30 bg-error/40 px-3 py-3 text-left transition-all duration-200 " +
  "hover:border-error/90 hover:bg-radial hover:from-error/60 hover:via-secondary/30 hover:to-error/60 hover:text-base-content " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const AdminUsers = () => {
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

    const userMap = new Map(users.map((user) => [user.id, user]))

    return(
        
        <div className="min-h-dvh bg-gradient-to-r from-base-100/30 to-primary/30 pt-2">
            <div className="flex items-center justify-between mb-6 gap-4 mt-2 mx-4">
                <div className="flex align-middle">
                    <Link type="button" className={baseLinkClasses} to="/dashboard"><ArrowLeft /></Link>
                </div>
                <div className="flex justify-center align-middle">
                    <select name="SearchFor" id="txtParam" className="select border border-primary/30 rounded-lg">
                        <option value="" disabled>--- Choose your search type ---</option>
                        <option value="userId">User ID</option>
                        <option value="email">Email</option>
                        <option value="name">Name</option>
                        <option value="accessLevel">Access Level</option>
                    </select>
                    <label htmlFor="txtReq" className="label mx-3">Specific Search:</label>
                    <input type="text" className="input form-control border border-primary/30" id="txtReq" placeholder="Type the user information"/>
                    <button type="button" id="btnSearch" className={`${baseLinkClasses} mx-3`}>Search</button>
                </div>
                <div>
                    <button type="button" id="btnAddUser" className={baseLinkClasses}>Add User</button>
                </div>
            </div>
            <div className="divider divider-primary mx-3 mb-3"></div>
            <div className="flex justify-center h-full">
                <div className="border-2 border-primary w-fit h-fit rounded-xl min-h-0">
                    <table className="border border-primary border-collapse rounded-xl bg-base-100 shadow-sm overflow-hidden min-w-0">
                      <thead className="sticky top-0 bg-base-300 z-10">
                        <tr className=" border-b border-secondary uppercase">
                          <th className="py-2 text-primary text-center align-middle text-sm">User ID</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Email</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">RFID UID</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Access Level</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-base-300">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gradient-to-br hover:from-primary/10 hover:via-secondary/20 hover:to-neutral/10">
                            <td className="text-center py-3 px-3">{user.id}</td>
                            <td className="text-center py-3 px-3">{user.email}</td>
                            <td className="text-center py-3 px-3">{user.rfidUid}</td>
                            <td className="text-center py-3 px-3">{user.accessLevel}</td>
                            <td className="text-center py-3 px-3"><button type="button" id="btnUpdateUser" className={`${baseLinkClasses} me-2`}>Update User</button><button type="button" id="btnDeleteUser" className={errLinkClasses}>Delete User</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminUsers;
