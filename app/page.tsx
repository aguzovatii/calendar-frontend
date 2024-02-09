"use client";
import { LogOut } from "lucide-react";
import CalendarPage from "./calendar/calendar-page";
import HabitPage from "./habit/habit-page";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Page() {
  const [currentHabit, setCurrentHabit] = useState("");
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return "Loading...";
  }

  return (
    <div className="h-full flex flex-row">
      <div className="h-full w-7 bg-slate-800 flex flex-col-reverse">
        <LogOut
          color="white"
          className="h-4 w-4 m-1.5 cursor-pointer"
          onClick={() => signOut()}
        />
      </div>
      <div className="h-full flex flex-row flex-1">
        <div className="h-full basis-1/12">
          <HabitPage
            currentHabit={currentHabit}
            setCurrentHabit={setCurrentHabit}
          />
        </div>
        <Separator orientation="vertical" className="h-full" />
        <div className="h-full basis-11/12">
          {currentHabit !== "" ? (
            <CalendarPage
              habit={currentHabit}
              setCurrentHabit={setCurrentHabit}
            />
          ) : (
            <h1>Select a habit to see the details</h1>
          )}
        </div>
      </div>
    </div>
  );
}
