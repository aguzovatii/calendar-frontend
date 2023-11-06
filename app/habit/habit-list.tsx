import {ScrollArea} from "@/components/ui/scroll-area"

export default function HabitList({
  habits,
}: {
  habits: Habit[];
}) {

  return (
    <>
      <h1>Habits:</h1>
      <ScrollArea>
      {habits.map((habit) => (
          <>
            <div key={habit.name} className="text-sm">
              {habit.name}
            </div>
          </>
        ))}
      </ScrollArea>
    </>
  );
}
