"use client";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Event } from "../types";

interface Value {
  date: Date;
  count: number;
}

const yearFormatter = new Intl.DateTimeFormat("en", { year: "numeric" });
const monthFormatter = new Intl.DateTimeFormat("en", { month: "2-digit" });
const dayFormatter = new Intl.DateTimeFormat("en", { day: "2-digit" });

export default function HeatMap({
  startDate,
  endDate,
  events,
  today,
}: {
  startDate: Date;
  endDate: Date;
  events: Event[];
  today: Date;
}) {
  const values = getValues(events);

  return (
    <ScrollArea className="grow border rounded-md m-2 mt-0 lg:ml-0 lg:mt-2 p-2 min-w-56 max-h-[228px]">
      <div className="w-full min-w-[1300px]">
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
                  }`,
                }
              : {
                  "data-tooltip-id": "my-tooltip",
                  "data-tooltip-place": "top",
                  "data-tooltip-content": "0",
                };
          }}
          classForValue={(value) => {
            const todayBorder: string =
              value && today.getTime() === value.date.getTime()
                ? "today-border "
                : "";

            if (!value || value.count === 0) {
              return todayBorder + "color-empty1";
            }
            return (
              todayBorder +
              `color-scale-${Math.min(Math.floor(value.count / 3), 4)}`
            );
          }}
        />
        <Tooltip id="my-tooltip" />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
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
      newValues.push({
        date: new Date(date),
        count: map.get(format(date)) ?? 1,
      });
    }
    return newValues;
  }

  function format(date: Date): string {
    let year = yearFormatter.format(date);
    let month = monthFormatter.format(date);
    let day = dayFormatter.format(date);
    return day + "-" + month + "-" + year;
  }
}
