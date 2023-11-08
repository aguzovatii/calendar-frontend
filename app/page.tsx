"use client";
import { LogOut } from "lucide-react";
import CalendarPage from "./calendar/calendar-page";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import HabitPage from "./habit/habit-page";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function Page() {
  const { status } = useSession();
  const [currentHabit, setCurrentHabit] = useState("");

  if (status === "authenticated") {
    return (
      <div className="h-full flex flex-row">
        <div className="h-full w-7 bg-slate-800 flex flex-col-reverse">
          <LogOut
            color="white"
            size={16}
            className="m-1.5 cursor-pointer"
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
              <CalendarPage habit={currentHabit} />
            ) : (
              <h1>Select a habit to see the details</h1>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  return <div>{status}</div>;
}
