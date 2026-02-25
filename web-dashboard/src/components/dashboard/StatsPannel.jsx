import React, { useState } from "react";
import CardShell from "./CardShell.jsx";

const StatsPannel = () => {
  const [view, setView] = useState("overview");

  const downScanners = [
    { id: "SCN-04", location: "North Gate", status: "Offline" },
    { id: "SCN-12", location: "Main Lobby", status: "No Power" },
  ];

  const denialHistory = [
    { time: "10:00 AM", rate: "2.1%" },
    { time: "11:00 AM", rate: "5.4%" },
    { time: "12:00 PM", rate: "3.2%" },
    { time: "01:00 PM", rate: "4.2%" },
  ];

  const renderOverview = () => (
    <div className="flex flex-col gap-4">
      <ul className="grid gap-3 sm:grid-cols-2">
        {/* Downed Scanners Card */}
        <li>
          <button
            onClick={() => setView("scanners")}
            className="w-full text-left rounded-lg border border-error/40 bg-error/5 p-3 hover:bg-error/10 transition-all focus:ring-2 focus:ring-error outline-none"
          >
            <p className="text-xs uppercase tracking-wide text-error font-bold">Downed Scanners</p>
            <p className="mt-1 text-2xl font-bold text-error">{downScanners.length}</p>
            <p className="text-[10px] opacity-70 underline mt-1">Click to investigate</p>
          </button>
        </li>

        {/* Denial Rate Card */}
        <li>
          <button
            onClick={() => setView("denials")}
            className="w-full text-left rounded-lg border border-primary/30 bg-base-200 p-3 hover:bg-base-300 transition-all focus:ring-2 focus:ring-primary outline-none"
          >
            <p className="text-xs uppercase tracking-wide opacity-70">Denial Rate</p>
            <p className="mt-1 text-2xl font-bold text-primary">4.2%</p>
            <p className="text-[10px] opacity-70 underline mt-1">View history</p>
          </button>
        </li>
      </ul>

      {/* Static Non-Interactive Stats */}
      <ul className="grid gap-2 grid-cols-3">
        {[
          { name: "Avg Valid", value: "1.3s" },
          { name: "Peak", value: "09:00" },
          { name: "Total Scans", value: "1,248" },
        ].map((item) => (
          <li key={item.name} className="rounded-lg bg-base-300/30 p-2 border border-white/5">
            <p className="text-[10px] uppercase opacity-50 truncate">{item.name}</p>
            <p className="text-sm font-semibold">{item.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderScannerDetail = () => (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-error">Offline Units</h3>
        <button 
          onClick={() => setView("overview")} 
          className="btn btn-xs btn-circle btn-ghost"
          aria-label="Back to overview"
        >✕</button>
      </div>
      <div className="space-y-2 overflow-y-auto max-h-[140px]">
        {downScanners.map((s) => (
          <div key={s.id} className="flex justify-between items-center p-2 bg-error/10 border border-error/20 rounded text-xs">
            <div>
              <p className="font-bold">{s.id}</p>
              <p className="opacity-70">{s.location}</p>
            </div>
            <span className="badge badge-error badge-sm animate-pulse">{s.status}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDenialHistory = () => (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider">Denial History</h3>
        <button 
          onClick={() => setView("overview")} 
          className="btn btn-xs btn-circle btn-ghost"
          aria-label="Back to overview"
        >✕</button>
      </div>
      <div className="space-y-3">
        {denialHistory.map((item) => (
          <div key={item.time} className="flex items-center gap-3 text-[11px]">
            <span className="w-14 opacity-60 italic">{item.time}</span>
            <div className="flex-1 bg-base-300 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-700" 
                style={{ width: `${parseFloat(item.rate) * 10}%` }} 
              />
            </div>
            <span className="w-8 text-right font-mono font-bold">{item.rate}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <CardShell className="h-full min-h-[220px]" data-debug-label="StatsPannel">
      {view === "overview" && renderOverview()}
      {view === "scanners" && renderScannerDetail()}
      {view === "denials" && renderDenialHistory()}
    </CardShell>
  );
};

export default StatsPannel;