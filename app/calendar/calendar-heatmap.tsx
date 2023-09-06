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
                "data-tooltip-content": `${value.date
                  .toISOString()
                  .slice(0, 10)} has count: ${
                  value.count
                }. Events: ${eventsByDate.get(
                  value.date.toISOString().slice(0, 10)
                )}`,
              }
            : {
                "data-tooltip-id": "my-tooltip",
                "data-tooltip-place": "top",
                "data-tooltip-content": "0",
              };
        }}
        showWeekdayLabels={true}
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
          event.date_time.getUTCFullYear() === d.getUTCFullYear() &&
          event.date_time.getUTCMonth() === d.getUTCMonth() &&
          event.date_time.getUTCDate() === d.getUTCDate()
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
      let key = event.date_time.toISOString().slice(0, 10);
      if (!newEvents.has(key)) {
        newEvents.set(key, []);
      }
      newEvents.get(key).push(event.name);
    }
    return newEvents;
  }
}
