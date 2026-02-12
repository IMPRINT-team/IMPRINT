import React from "react"
import CardShell from "./CardShell.jsx"

const events = [
  { id: 1, area: "Main Entrance", status: "Authorized", time: "2 min ago" },
  { id: 2, area: "Server Room", status: "Denied", time: "7 min ago" },
  { id: 3, area: "Loading Dock", status: "Authorized", time: "12 min ago" },
]

const LatestEvents = () => (
  <CardShell className="h-full" data-debug-label="LatestEvents">
    <h2 id="latest-events-title" className="text-lg font-semibold">
      Latest events
    </h2>
    <ul className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
      {events.map((event) => (
        <li
          key={event.id}
          className="flex items-center justify-between rounded-lg border border-primary/30 bg-base-200 px-3 py-2"
        >
          <div>
            <p className="font-medium">{event.area}</p>
            <p className="text-xs opacity-70">{event.time}</p>
          </div>
          <span className="badge badge-outline">{event.status}</span>
        </li>
      ))}
    </ul>
  </CardShell>
)

export default LatestEvents
