"use client";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";

interface Value {
  date: Date;
  count: number;
}

export default function HeatMap({
  startDate,
  endDate,
  events,
}: {
  startDate: Date;
  endDate: Date;
  events: Event[];
}) {
  const values = getValues(events);
  const eventsByDate = getEventsByDate(events);

  return (
    <>
      {" "}
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        tooltipDataAttrs={(value: Value) => {
          return value.date != null
            ? {
                "data-tooltip-id": "my-tooltip",
                "data-tooltip-place": "top",
                "data-tooltip-content": `${format(value.date)} has count: ${
                  value.count
                }. Events: ${eventsByDate.get(format(value.date))}`,
              }
            : {
                "data-tooltip-id": "my-tooltip",
                "data-tooltip-place": "top",
                "data-tooltip-content": "0",
              };
        }}
        showWeekdayLabels={true}
        weekdayLabels={["", "Tue", "", "Thu", "", "Sat", ""]}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return "color-empty";
          }
          return `color-scale-${Math.min(Math.floor(value.count / 3), 4)}`;
        }}
      />{" "}
      <Tooltip id="my-tooltip" />{" "}
    </>
  );

  function getValues(events: Event[]): Value[] {
    for (let event of events) {
      event.date_time = new Date(event.date_time);
    }

    let newValues = [];
    let map = new Map<string, number>();
    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      map.set(format(date), 0);
    }
    for (let event of events) {
      let date = new Date(event.date_time);
      date.setHours(0, 0, 0, 0);

      const key = format(date);
      map.set(key, (map.get(key) ?? 1) + 1);
    }

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      newValues.push({ date: new Date(date), count: map.get(format(date)) ?? 1 });
    }
    return newValues;
  }

  function getEventsByDate(events: Event[]): Map<string, string[]> {
    let newEvents = new Map<string, string[]>();
    for (let event of events) {
      let key = format(event.date_time);
      if (!newEvents.has(key)) {
        newEvents.set(key, []);
      }
      newEvents.get(key)?.push(event.name);
    }
    return newEvents;
  }

  function format(date: Date): string {
    let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    let month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(
      date,
    );
    let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
    return day + "-" + month + "-" + year;
  }
}
