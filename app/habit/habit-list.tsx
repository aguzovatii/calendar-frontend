import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch, SetStateAction } from "react";

export default function HabitList({
  habits,
  currentHabit,
  setCurrentHabit,
}: {
  habits: Habit[];
  currentHabit: string;
  setCurrentHabit: Dispatch<SetStateAction<string>>;
}) {
  if (habits.length === 0) {
    return <div className="h-full">Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-xl flex h-7 font-bold leading-9 tracking-tight text-gray-900 ml-2 pl-0">
        Habits:
      </h1>
      <ScrollArea className="h-max flex-1">
        {habits.map((habit) => (
          <div
            key={habit.name}
            className="border-l-2 border-slate-300 hover:border-slate-500 ml-3 pl-3 text-slate-600 cursor-pointer pt-2"
            onClick={() => {
              setCurrentHabit(habit.name);
            }}
          >
            {habit.name}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
