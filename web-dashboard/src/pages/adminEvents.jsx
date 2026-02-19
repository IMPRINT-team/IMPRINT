import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { ResultPill } from '../components/ui/StatusPill.jsx'
import { ArrowLeft } from 'lucide-react'
import React from "react"

const BASE_URL = "http://localhost:8080/"

const getEvents = async () => {
    const eventData = await fetch(`${BASE_URL}event`)
    return eventData
}

const formatTime = (value) => {
  const date = new Date(value)
  let formattedDate = date.toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })
  return formattedDate;
}

const AdminEvents = () => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        const loadEvents = async () => {
            try {
                const events = await getEvents()
                const data = await events.json()
                setEvents(data)
            } catch (err) {
                console.log(err)
            }
        }
        loadEvents()
    }, [])

    return(
        
        <div className="h-svh">
            <div className="grid grid-cols-[1fr_2.5fr] items-center my-3 mt-4">
                <div className="flex align-middle justify-start ms-2">
                    <Link type="button" className="btn btn-primary" to="/playground"><ArrowLeft /></Link>
                </div>
                <div className="flex justify-left align-middle">
                    <select name="SearchFor" id="txtParam" className="select border border-primary rounded-lg">
                        <option value="" disabled>--- Choose your search type ---</option>
                        <option value="userId">Event ID</option>
                        <option value="email">Event Type</option>
                        <option value="name">Occured At</option>
                        <option value="accessLevel">Result</option>
                    </select>
                    <label htmlFor="txtReq" className="label mx-3 text-nowrap">Specific Search:</label>
                    <input type="text" className="input border border-primary" id="txtReq" placeholder="Type the user information"/>
                    <button type="button" id="btnSearch" className="btn btn-primary mx-3">Search</button>
                </div>
            </div>
            <div className="divider divider-primary mx-3 mb-3"></div>
            <div className="flex justify-center h-full">
                <div className="border-2 border-primary w-fit h-fit rounded-xl min-h-0">
                    <table className="border border-primary border-collapse rounded-xl bg-base-100 shadow-sm overflow-hidden min-w-0">
                      <thead className="sticky top-0 bg-base-300 z-10">
                        <tr className=" border-b border-secondary uppercase">
                          <th className="py-2 text-primary text-center align-middle text-sm">Event ID</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Event Type</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Occurred At</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Result</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-primary">
                        {events.map((event) => (
                          <tr key={event.id} className="bg-base-300">
                            <td className="text-center py-3">{event.id}</td>
                            <td className="text-center py-3">{event.eventType}</td>
                            <td className="text-center py-3">{formatTime(event.occurredAt)}</td>
                            <td className="text-center py-3 px-2">
                              <ResultPill result={event.result} />
                            </td>
                            <td className="text-center py-3 px-2"><button type="button" id="btnUpdateEvent" className="btn btn-primary mb-3 lg:mb-0 lg:me-3">Update Event</button><button type="button" id="btnDeleteEvent" className="btn btn-error">Delete Event</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminEvents;