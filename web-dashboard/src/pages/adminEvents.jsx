import { useState, useEffect, useRef } from 'react';
import { ResultPill } from '../components/ui/StatusPill.jsx'
import { ArrowLeft } from 'lucide-react'
import React from "react"
import { buildApiUrl } from "../lib/apiBase.js"
import { Link } from "react-router-dom"
import { eventApi } from "../lib/eventApi.js"

const getEvents = async (signal) => {
    const eventData = await fetch(buildApiUrl('event'), { signal })
    return eventData
}

const baseLinkClasses =
  "rounded-xl border border-primary/30 bg-base-100 px-3 py-3 text-left transition-all duration-200 " +
  "hover:border-primary/90 hover:bg-gradient-to-br hover:from-primary/20 hover:via-secondary/10 hover:to-base-200 hover:text-base-content " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const formatTime = (value) => {
  const date = new Date(value)
  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
}

const AdminEvents = () => {
    const abortRef = useRef(null)
    const debounceRef = useRef(null)

    const [events, setEvents] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [searchDate, setSearchDate] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchEvents = async (value = '', date = '') => {
      try {
        if (abortRef.current) {
          abortRef.current.abort()
        }

        const controller = new AbortController()
        abortRef.current = controller

        setLoading(true)

        let eventData

        if (value.trim() === '' && date === '') {
          eventData = await getEvents(controller.signal)
        } else {
          eventData = await fetch(
            eventApi.searchUrl(value.trim(), date),
            { signal: controller.signal }
          )
        }

        const data = await eventData.json()

        if (!Array.isArray(data)) {
          setEvents([])
        } else {
          setEvents(data)
        }

      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err)
          setEvents([])
        }
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      fetchEvents('')
    }, [])

    useEffect(() => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }

      debounceRef.current = setTimeout(() => {
        fetchEvents(searchValue, searchDate)
      }, 300)

      return () => clearTimeout(debounceRef.current)
    }, [searchValue, searchDate])

    const handleSearchChange = (e) => {
      setSearchValue(e.target.value)
    }

    const handleDateChange = (e) => {
      setSearchDate(e.target.value)
    }

    return(
        
        <div className="min-h-dvh bg-gradient-to-r from-base-100/30 to-primary/30 pt-2">
            <div className="grid grid-cols-[1fr_2fr] items-center my-3 mt-4">
                <div className="flex align-middle justify-start ms-2">
                    <Link type="button" className={baseLinkClasses} to="/dashboard">
                      <ArrowLeft />
                    </Link>
                </div>
                <div className="flex justify-left align-middle">
                    
                    <label htmlFor="txtReq" className="label mx-10 text-nowrap">
                      Search:
                    </label>
                    <input
                      type="text"
                      className="input border border-primary/30 focus:border-primary/90 transition-all duration-300"
                      id="txtReq"
                      placeholder="Type the user information"
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                    <input type="date" className="input border border-primary/30 ms-2 focus:border-primary/90 transition-all duration-300" value={searchDate} onChange={handleDateChange}/>
                </div>
            </div>

            <div className="divider divider-primary mx-3 mb-3"></div>

            <div className="flex justify-center h-full">
                <div className="border-2 border-primary w-fit h-fit rounded-xl min-h-0 w-4/5">
                    <table className="border border-primary border-collapse rounded-xl bg-base-100 shadow-sm overflow-hidden min-w-0 w-full">
                      <thead className="sticky top-0 bg-base-300 z-10">
                        <tr className=" border-b border-secondary uppercase">
                          <th className="py-2 text-primary text-center align-middle text-sm">User ID</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Location</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Occurred</th>
                          <th className="py-2 text-primary text-center align-middle pe-2 text-sm">Result</th>
                        </tr>
                      </thead>

                      <tbody className="bg-primary">
                        {events.map((event) => (
                          <tr key={event.id} className="bg-base-300 hover:bg-gradient-to-br hover:from-primary/10 hover:via-secondary/20 hover:to-neutral/10">
                            <td className="text-center py-3">{event.user.rfidUid}</td>
                            <td className="text-center py-3">{event.scanner.location}</td>
                            <td className="text-center py-3">{formatTime(event.occurredAt)}</td>
                            <td className="text-center py-3 px-2">
                              <ResultPill result={event.result} />
                            </td>
                          </tr>
                        ) : events.length === 0 ? (
                          <tr className="bg-base-300">
                            <td colSpan="4" className="text-center py-6 text-base-content/70">
                              No events found
                            </td>
                          </tr>
                        ) : (
                          events.map((event) => (
                            <tr
                              key={event.id}
                              className="bg-base-300 hover:bg-gradient-to-br hover:from-primary/10 hover:via-secondary/20 hover:to-neutral/10"
                            >
                              <td className="text-center py-3">{event.id}</td>
                              <td className="text-center py-3">{event.eventType}</td>
                              <td className="text-center py-3">
                                {formatTime(event.occurredAt)}
                              </td>
                              <td className="text-center py-3 px-2">
                                <ResultPill result={event.result} />
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminEvents