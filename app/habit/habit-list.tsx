import {ScrollArea} from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator";

export default function HabitList({
  habits,
}: {
    habits: Habit[];
  }) {

  return (
    <div className="h-full">
      <h1 className="text-xl font-bold leading-9 tracking-tight text-gray-900 ml-2 pl-0">Habits:</h1>
      <ScrollArea className="h-full">
        {habits.map((habit) => (
          <>
            <div key={habit.name} className="border-l-2 border-slate-300 hover:border-slate-500 ml-3 pl-3 text-slate-600 cursor-pointer pt-2">
              {habit.name}
            </div>
          </>
        ))}

      </ScrollArea>
    </div>
  );
}
