import React from "react"

const metrics = [
  { label: "Authorized scans", value: "1,204", trend: "+8.2%" },
  { label: "Active scanners", value: "32", trend: "+2" },
  { label: "Alerts", value: "7", trend: "-3" },
]

const ChartBox = () => (
  <div className="flex h-full min-h-0 flex-col" aria-label="Summary metrics">
    <h2 id="hero-panel-title" className="text-xl font-semibold mb-2">
      Facility activity snapshot
    </h2>
    <p className="text-sm opacity-80 mb-4">
      Placeholder data to demonstrate proportions and visual hierarchy.
    </p>

    <div className="grid flex-1 min-h-0 gap-3 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-lg border border-primary/35 bg-base-200 p-4 flex flex-col justify-between"
        >
          <span className="text-xs uppercase tracking-wide opacity-75">{metric.label}</span>
          <span className="text-3xl font-bold">{metric.value}</span>
          <span className="text-sm text-success">{metric.trend}</span>
        </div>
      ))}
    </div>
  </div>
)

export default ChartBox
