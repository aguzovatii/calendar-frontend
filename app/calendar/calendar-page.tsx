import { Dispatch, SetStateAction } from "react";
import HabitDetails from "./habit-details";
import EventsDetails from "./events-details";

export default function CalendarPage({
  habit,
  setCurrentHabit,
}: {
  habit: string;
  setCurrentHabit: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <HabitDetails habit={habit} setCurrentHabit={setCurrentHabit} />
      <EventsDetails habit={habit} />
    </>
  );
}
