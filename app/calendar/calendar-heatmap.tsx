"use client";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";

export default function HeatMap({ startDate, endDate, events }) {
  const values = getValues(events);
  const eventsByDate = getEventsByDate(events);

  return (
    <>
      {" "}
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        tooltipDataAttrs={(value) => {
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

  function getValues(events: Event[]) {
    for (var event of events) {
      event.date_time = new Date(event.date_time);
    }
    let newValues = [];
    for (
      var d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      let count = 0;
      for (var event of events) {
        if (
          event.date_time.getFullYear() === d.getFullYear() &&
          event.date_time.getMonth() === d.getMonth() &&
          event.date_time.getDate() === d.getDate()
        ) {
          count = count + 1;
        }
      }
      newValues.push({ date: new Date(d), count: count });
    }
    return newValues;
  }

  function getEventsByDate(events: Event[]) {
    let newEvents = new Map<string, string[]>();
    for (var event of events) {
      let key = format(event.date_time);
      if (!newEvents.has(key)) {
        newEvents.set(key, []);
      }
      newEvents.get(key).push(event.name);
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