import React, { useEffect, useMemo, useState } from "react";
import CardShell from "./CardShell.jsx";
import { ResultPill } from "../ui/StatusPill.jsx";
import { eventApi } from "../../lib/eventApi.js";

const formatTime = (value) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
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

        if (isCancelled) {
          return;
        }

        setEvents(Array.isArray(data) ? data : []);
      } catch (loadError) {
        if (isCancelled) {
          return;
        }

        console.error(loadError);
        setError(loadError.message);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      isCancelled = true;
    };
  }, []);

  const latestEvents = useMemo(() => {
    return [...events]
      .sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt))
      .slice(0, 5);
  }, [events]);

  return (
    <CardShell className="h-full" data-debug-label="LatestEvents">
      <h2 id="latest-events-title" className="text-lg font-semibold">
        Events
      </h2>

      {isLoading ? <p className="text-sm opacity-70">Loading events...</p> : null}

      {error ? <p className="text-sm text-error">Unable to load recent events.</p> : null}

      {!isLoading && !error ? (
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th className="text-xs uppercase">Event Type</th>
                <th className="text-xs uppercase">Occurred At</th>
                <th className="text-xs uppercase text-center">Result</th>
              </tr>
            </thead>
            <tbody>
              {latestEvents.length > 0 ? (
                latestEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.eventType}</td>
                    <td>{formatTime(event.occurredAt)}</td>
                    <td className="text-center">
                      <ResultPill result={event.result} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center opacity-70">
                    No recent events.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </CardShell>
  );
};

export default LatestEvents;
