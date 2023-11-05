import {ScrollArea} from "@/components/ui/scroll-area"

export default function HabitList() {

  return (
    <>
      <h1>Habits:</h1>
      <ScrollArea>
        <div key="habit1" className="text-sm">
              habit1
        </div>
        <div key="habit2" className="text-sm">
              habit2
        </div>
      </ScrollArea>
    </>
  );
}
