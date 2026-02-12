import React from "react"
import CardShell from "./CardShell.jsx"

const stats = [
  { name: "Peak hour", value: "08:00-09:00" },
  { name: "Avg. validation", value: "1.3s" },
  { name: "Denied attempts", value: "4 today" },
]

const StatsPannel = () => (
  <CardShell className="h-full" data-debug-label="StatsPannel">
    <h2 id="stats-panel-title" className="text-lg font-semibold">
      Quick stats
    </h2>
    <ul className="grid flex-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
      {stats.map((item) => (
        <li key={item.name} className="rounded-lg bg-base-200 border border-primary/30 p-3">
          <p className="text-xs uppercase tracking-wide opacity-70">{item.name}</p>
          <p className="mt-1 font-semibold">{item.value}</p>
        </li>
      ))}
    </ul>
  </CardShell>
)

export default StatsPannel
