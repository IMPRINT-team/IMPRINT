import { useState, useEffect } from 'react';
import React from "react"
import { ArrowLeft } from 'lucide-react';

const BASE_URL = "http://localhost:8080/"

const getUsers = async () => {
    const scannerData = await fetch(`${BASE_URL}user`)
    return scannerData
}

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
        
        <div className="h-svh">
            <div className="flex align-middle justify-around my-3 mt-4">
                <div className="flex align-middle">
                    <a type="button" className="btn btn-primary" href="/playground"><ArrowLeft /></a>
                </div>
                <div className="flex justify-center align-middle">
                    <select name="SearchFor" id="txtParam" className="select border border-primary rounded-lg">
                        <option value="" select disabled>--- Choose your search type ---</option>
                        <option value="userId">User ID</option>
                        <option value="email">Email</option>
                        <option value="name">Name</option>
                        <option value="accessLevel">Access Level</option>
                    </select>
                    <label for="txtReq" className="label mx-3">Specific Search:</label>
                    <input type="text" className="input border border-primary" id="txtReq" placeholder="Type the user information"/>
                    <button type="button" id="btnSearch" className="btn btn-primary mx-3">Search</button>
                </div>
                <div>
                    <button type="button" id="btnAddUser" className="btn btn-primary">Add User</button>
                </div>
            </div>
            <div className="divider divider-primary mx-3 mb-3"></div>
            <div className="flex justify-center h-full">
                <div className="border-2 border-primary w-fit h-fit rounded-xl min-h-0">
                    <table className="border border-primary border-collapse rounded-xl bg-base-100 shadow-sm overflow-hidden min-w-0" options={{dom: 'ftip', pagingType: 'simple',}}>
                      <thead className="sticky top-0 bg-base-300 z-10">
                        <tr className=" border-b border-secondary uppercase">
                          <th className="py-2 text-primary text-center align-middle text-sm">User ID</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Email</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">RFID UID</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Access Level</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-primary">
                        {users.map((user) => (
                          <tr key={user.id} className="bg-base-300">
                            <td className="text-center py-3 px-3">{user.id}</td>
                            <td className="text-center py-3 px-3">{user.email}</td>
                            <td className="text-center py-3 px-3">{user.rfidUid}</td>
                            <td className="text-center py-3 px-3">{user.accessLevel}</td>
                            <td className="text-center py-3 px-3"><button type="button" id="btnUpdateUser" className="btn btn-primary mb-3 lg:mb-0 lg:me-3">Update User</button><button type="button" id="btnDeleteUser" className="btn btn-error">Delete User</button></td>
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