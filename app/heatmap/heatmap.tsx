"use client";
import CalendarHeatmap, {
  ReactCalendarHeatmapValue,
} from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Task } from "../habit/[habit_id]/tasks-details";

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
  tasks,
  today,
}: {
  startDate: Date;
  endDate: Date;
  tasks: Task[];
  today: Date;
}) {
  const values = getValues(tasks);

  return (
    <ScrollArea className="grow border rounded-md mt-2 p-2 min-w-56">
      <div className="w-full min-w-[1300px]">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={values}
          tooltipDataAttrs={(
            value: ReactCalendarHeatmapValue<Date> | undefined,
          ) => {
            return value != undefined && value.date != null
              ? {
                  id: "my-tooltip",
                  "data-tooltip-id": "my-tooltip",
                  "data-tooltip-place": "top",
                  "data-tooltip-content": `${format(new Date(value.date))} has count: ${value.count}`,
                }
              : {
                  id: "my-tooltip",
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

  function getValues(tasks: Task[]): Value[] {
    tasks = tasks.filter(
      (task) => task.done_on != null && task.state === "Done",
    );
    for (let task of tasks) {
      task.done_on = new Date(task.done_on);
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
    for (let task of tasks) {
      let date = new Date(task.done_on);
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
