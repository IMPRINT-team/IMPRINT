import React, { useEffect, useMemo, useState } from "react";
import CardShell from "./CardShell.jsx";
import { ResultPill } from "../ui/StatusPill.jsx"; // Assuming ResultPill handles 'accepted/denied'
import { eventApi } from "../../lib/eventApi.js";

const formatTime = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const LatestEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    const loadEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await eventApi.getEvents();
        if (!isCancelled) setEvents(Array.isArray(data) ? data : []);
      } catch (loadError) {
        if (!isCancelled) {
          console.error(loadError);
          setError(loadError.message);
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };
    loadEvents();
    return () => { isCancelled = true; };
  }, []);

  const latestEvents = useMemo(() => {
    return [...events]
      .sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt))
      .slice(0, 5);
  }, [events]);

  return (
    <CardShell className="h-full flex flex-col gap-4" data-debug-label="LatestEvents">
      <div className="flex items-center justify-between">
        <h2 id="latest-events-title" className="text-lg font-semibold">
          Recent Events
        </h2>
        {!isLoading && (
          <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">
            Live Feed
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto px-0.5 py-0.5">
        {isLoading && (
          <div className="flex h-32 w-full animate-pulse items-center justify-center rounded-xl bg-base-300/50 text-sm opacity-70">
            Loading events...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-error/20 bg-error/5 p-4 text-center text-sm text-error">
            Unable to load recent events.
          </div>
        )}

        {!isLoading && !error && latestEvents.length > 0 ? (
          latestEvents.map((event) => (
            <div
              key={event.id}
              className="group flex w-full items-center justify-between gap-4 rounded-xl bg-base-200/50 px-3 py-2.5 transition-all hover:bg-base-200 hover:ring-1 hover:ring-primary/40"
            >
              {/* Left Side: Accent + Info */}
              <div className="flex min-w-0 flex-1 items-center gap-3">
                {/* Accent bar matches ScannerCard style */}
                <span 
                  className={`h-8 w-1.5 shrink-0 rounded-full ${
                    event.result === 'denied' ? 'bg-error/60' : 'bg-success/60'
                  }`} 
                  aria-hidden="true" 
                />

                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate text-sm font-bold uppercase tracking-wide text-base-content">
                    {event.eventType}
                  </p>
                  <div className="flex items-center">
                    <ResultPill result={event.result} />
                  </div>
                </div>
              </div>

              {/* Right Side: Timestamp (Matches Heartbeat font) */}
              <div className="flex flex-col items-end gap-1">
                 <span className="shrink-0 font-mono text-xs font-semibold text-primary/80">
                  {formatTime(event.occurredAt)}
                </span>
              </div>
            </div>
          ))
        ) : !isLoading && !error && (
          <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-base-300 opacity-50">
            <p className="text-sm">No recent events.</p>
          </div>
        )}
      </div>
    </CardShell>
  );
};

export default LatestEvents;