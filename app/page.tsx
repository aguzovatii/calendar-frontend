"use client";
import CalendarPage from "./calendar/calendar-page";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import HabitPage from "./habit/habit-page";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const { status } = useSession();

  if (status === "authenticated") {
    return(
    <div className="h-full flex flex-row">
      <div className="h-full basis-1/12">
        <HabitPage />
      </div>
      <Separator orientation="vertical" />
      <div className="h-full basis-11/12">
        <CalendarPage />
      </div>
    </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  return <div>{status}</div>;
}
