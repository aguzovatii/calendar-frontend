"use client";
import CalendarPage from "./calendar/calendar-page";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import HabitPage from "./calendar/habit-creator";
import HabitList from "./calendar/habit-list";

export default function Page() {
  const { status } = useSession();

  if (status === "authenticated") {
    return(
    <div>
      <div>
      <div>
        <HabitList />
      </div>
      <div>
        <HabitPage />
      </div>
      </div>
      <CalendarPage />
    </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  return <div>{status}</div>;
}
