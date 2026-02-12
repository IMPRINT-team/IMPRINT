import React from "react"

const metrics = [
  { label: "Authorized scans", value: "1,204", trend: "+8.2%" },
  { label: "Active scanners", value: "32", trend: "+2" },
  { label: "Alerts", value: "7", trend: "-3" },
]

const ChartBox = () => (
  <div className="flex h-full min-h-0 flex-col" aria-label="Summary metrics">
    <h2 id="hero-panel-title" className="text-lg font-semibold mb-2">
      Facility activity snapshot
    </h2>

    <div className="grid flex-1 min-h-0 gap-2 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-lg border border-primary/35 bg-base-200 p-3 flex flex-col justify-between"
        >
          <span className="text-xs uppercase tracking-wide opacity-75">{metric.label}</span>
          <span className="text-2xl font-bold">{metric.value}</span>
          <span className="text-sm text-success">{metric.trend}</span>
        </div>
      ))}
    </div>
  </div>
)

export default ChartBox
