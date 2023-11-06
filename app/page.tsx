"use client";
import CalendarPage from "./calendar/calendar-page";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import HabitPage from "./habit/habit-page";

export default function Page() {
  const { status } = useSession();

  if (status === "authenticated") {
    return(
    <div>
      <div>
        <HabitPage />
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
