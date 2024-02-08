"use client";

import HabitDetails from "./details";
import EventsDetails from "./events-details";

export default function Page({ params }: { params: { habit_id: string } }) {
  return (
    <>
      <HabitDetails habit={params.habit_id} />
      <EventsDetails habit={params.habit_id} />
    </>
  );
}
