import { ResponsiveCalendar } from "@nivo/calendar";
import { useEffect, useMemo, useState } from "react";
import React from "react";

const BASE_URL = "http://localhost:8080/";

const getEvents = async () => {
  const eventData = await fetch(`${BASE_URL}event`);
  return eventData;
};

const toDayKey = (value) => new Date(value).toISOString().slice(0, 10);

const HeroEventsCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventData = await getEvents();
        const data = await eventData.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
      }
    };

    loadEvents();
  }, []);

  const chartData = useMemo(() => {
    const countsByDay = events.reduce((totals, event) => {
      if (!event?.occurredAt) {
        return totals;
      }

      const dayKey = toDayKey(event.occurredAt);
      const previousCount = totals.get(dayKey) ?? 0;
      totals.set(dayKey, previousCount + 1);
      return totals;
    }, new Map());

    return Array.from(countsByDay.entries())
      .map(([day, value]) => ({ day, value }))
      .sort((left, right) => left.day.localeCompare(right.day));
  }, [events]);

  const oneYearRange = useMemo(() => {
    const to = new Date();
    const from = new Date(to);
    from.setDate(from.getDate() - 364);

    return {
      from: toDayKey(from),
      to: toDayKey(to),
    };
  }, []);

  return (
    <div className="h-full w-full px-5 py-4" aria-label="Daily event volume chart">
      <ResponsiveCalendar
        data={chartData}
        from={oneYearRange.from}
        to={oneYearRange.to}
        emptyColor="oklch(var(--b1))"
        colors={["oklch(var(--p) / 0.2)", "oklch(var(--p) / 0.45)", "oklch(var(--p) / 0.7)", "oklch(var(--p))"]}
        margin={{ top: 28, right: 24, bottom: 24, left: 24 }}
        yearSpacing={42}
        monthBorderColor="oklch(var(--b3))"
        dayBorderWidth={2}
        dayBorderColor="oklch(var(--b3))"
        theme={{
          text: {
            fill: "oklch(var(--bc))",
            fontSize: 11,
          },
          tooltip: {
            container: {
              background: "oklch(var(--b2))",
              color: "oklch(var(--bc))",
              border: "1px solid oklch(var(--p) / 0.35)",
              borderRadius: 8,
            },
          },
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 24,
            itemCount: 4,
            itemWidth: 38,
            itemHeight: 16,
            itemsSpacing: 6,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
};

export default HeroEventsCalendar;
