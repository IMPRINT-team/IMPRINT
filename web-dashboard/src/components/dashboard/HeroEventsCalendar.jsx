import React, { useEffect, useMemo, useState } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { eventApi } from "../../lib/eventApi.js";

const CALENDAR_ERROR_MESSAGE = "Unable to load events.";

const getUtcDay = (value) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10);
};

const getDateWindow = () => {
  const year = new Date().getUTCFullYear();

  return {
    from: `${year}-01-01`,
    to: `${year}-12-31`,
  };
};

const isWithinDateWindow = (day, dateWindow) =>
  day >= dateWindow.from && day <= dateWindow.to;

const HeroEventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompact, setIsCompact] = useState(() => window.innerWidth < 1024);

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
        setError(loadError.message || CALENDAR_ERROR_MESSAGE);
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

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dateWindow = getDateWindow();

  const calendarData = useMemo(() => {
    const totalsByDay = new Map();

    events.forEach((event) => {
      const day = getUtcDay(event?.occurredAt);

      if (!day) {
        return;
      }

      if (!isWithinDateWindow(day, dateWindow)) {
        return;
      }

      totalsByDay.set(day, (totalsByDay.get(day) ?? 0) + 1);
    });

    return Array.from(totalsByDay.entries())
      .map(([day, value]) => ({
        day,
        value,
      }))
      .sort((a, b) => a.day.localeCompare(b.day));
  }, [dateWindow.from, dateWindow.to, events]);

  const nivoTheme = useMemo(
    () => ({
      background: "transparent", // Let the container handle background
      text: {
        fill: "oklch(var(--bc))",
      },
      // This lightens the month names and weekday labels
      labels: {
        text: {
          fill: "oklch(var(--bc) / 0.6)", // Lower opacity for a softer look
          fontSize: 11,
          fontWeight: 500,
        },
      },
      // This targets the grid lines specifically
      grid: {
        line: {
          stroke: "oklch(var(--bc) / 0.1)", // Very light grid lines
          strokeWidth: 1,
        },
      },
      tooltip: {
        container: {
          background: "oklch(var(--b1))",
          color: "oklch(var(--bc))",
          border: "1px solid oklch(var(--b3))",
          borderRadius: "0.5rem",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
        },
      },
    }),
    [],
  );

  return (
    <div className="flex h-full min-h-0 flex-col" aria-label="Events calendar">
      <h2 id="hero-panel-title" className="mb-2 text-lg font-semibold">
        Event Activity Calendar
      </h2>

      <div className="relative flex-1 min-h-0 w-full rounded-lg border border-base-300 bg-base-100 p-2 sm:p-3">
        <div className="h-full min-h-[16rem] w-full">
          {isLoading ? (
            <div className="flex h-full w-full animate-pulse items-center justify-center rounded-md bg-base-200 text-sm opacity-70">
              Loading calendar...
            </div>
          ) : null}

          {!isLoading && error ? (
            <div className="flex h-full w-full items-center justify-center text-sm text-error">
              {CALENDAR_ERROR_MESSAGE}
            </div>
          ) : null}

          {!isLoading && !error && calendarData.length === 0 ? (
            <div className="flex h-full w-full items-center justify-center text-sm opacity-70">
              No events in selected range
            </div>
          ) : null}

          {!isLoading && !error && calendarData.length > 0 ? (
            <ResponsiveCalendar
              data={calendarData}
              from={dateWindow.from}
              to={dateWindow.to}
              /* emptyColor: Using --b2 or --b3 makes empty cells slightly 
                visible but not black. 
              */
              emptyColor="oklch(var(--b2) / 0.4)" 
              /* colors: Using primary (--p) but ensuring the start of the 
                gradient isn't too dark. 
              */
              colors={["oklch(var(--p) / 0.2)", "oklch(var(--p))"]}
              margin={
                isCompact
                  ? { top: 18, right: 18, bottom: 18, left: 20 }
                  : { top: 28, right: 28, bottom: 28, left: 36 }
              }
              yearSpacing={40}
              monthBorderColor="oklch(var(--bc) / 0.15)"
              monthBorderWidth={2}
              dayBorderWidth={1}
              dayBorderColor="oklch(var(--bc) / 0.15)"
              monthLegendOffset={8}
              monthLegendPosition="before"
              weekdayTicks={isCompact ? [1, 3, 5] : [0, 1, 2, 3, 4, 5, 6]}
              theme={nivoTheme}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HeroEventsCalendar;
