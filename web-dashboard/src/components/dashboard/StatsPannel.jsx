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
  <CardShell className="h-full overflow-hidden" data-debug-label="StatsPannel">
    <h2 id="stats-panel-title" className="shrink-0 text-lg font-semibold">
      Quick stats
    </h2>

    <div className="mt-2 flex min-h-0 flex-col gap-3 overflow-y-auto pr-1">
      {/* Basic stats */}
      <ul className="grid grid-cols-1 gap-2 xl:grid-cols-3">
        {stats.map((item) => (
          <li
            key={item.name}
            className="rounded-lg border border-primary/30 bg-base-200 p-2.5"
          >
            <p className="text-[10px] uppercase tracking-wide opacity-70">
              {item.name}
            </p>
            <p className="mt-0.5 text-lg font-semibold">{item.value}</p>
          </li>
        ))}
      </ul>

      {/* Top stats */}
      <ul className="grid grid-cols-1 gap-2">
        {topStats.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between rounded-lg border border-primary/30 bg-base-200 p-2.5"
          >
            <div>
              <p className="text-[10px] uppercase tracking-wide opacity-70">
                {item.name}
              </p>
              <p className="text-lg font-semibold leading-tight">{item.value}</p>
            </div>
            <p className="max-w-[50%] text-right text-xs opacity-70">{item.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  </CardShell>
);

export default StatsPannel;
