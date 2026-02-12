import React from "react";
import CardShell from "./CardShell.jsx";

const stats = [
  { name: "Peak hour", value: "08:00-09:00" },
  { name: "Avg. validation", value: "1.3s" },
  { name: "Denied attempts", value: "4 today" },
];

const topStats = [
  { name: "Scans today", value: "1,248", detail: "+12% vs yesterday" },
  { name: "Auth success", value: "98.4%", detail: "1,228 accepted" },
  { name: "Denied attempts", value: "20", detail: "2 high-priority" },
];

const StatsPannel = () => (
  <CardShell className="h-full" data-debug-label="StatsPannel">
    <h2 id="stats-panel-title" className="text-lg font-semibold">
      Quick stats
    </h2>

    {/* Basic stats */}
    <ul className="grid flex-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
      {stats.map((item) => (
        <li
          key={item.name}
          className="rounded-lg bg-base-200 border border-primary/30 p-3"
        >
          <p className="text-xs uppercase tracking-wide opacity-70">
            {item.name}
          </p>
          <p className="mt-1 text-xl font-semibold">{item.value}</p>
        </li>
      ))}
    </ul>

    {/* Top stats */}
    <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
      {topStats.map((item) => (
        <li
          key={item.name}
          className="rounded-lg border border-primary/30 bg-base-200 p-3"
        >
          <p className="text-xs uppercase tracking-wide opacity-70">
            {item.name}
          </p>
          <p className="mt-1 text-xl font-semibold">{item.value}</p>
          <p className="text-xs opacity-70">{item.detail}</p>
        </li>
      ))}
    </ul>
  </CardShell>
);

export default StatsPannel;
