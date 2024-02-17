"use client";

import HabitDetails from "./details";
import EventsDetails from "./events-details";

export default function Page({ params }: { params: { habit_id: string } }) {
  return (
    <div className="h-full flex flex-col">
      <div className="grow border rounded-md mt-2 mr-2 mb-2 shadow-md">
        <HabitDetails habit={params.habit_id} />
        <EventsDetails habit={params.habit_id} />
      </div>
    </div>
  );
}
