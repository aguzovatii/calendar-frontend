"use client";
import CalendarPage from "./calendar/calendar-page";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { status } = useSession();

  if (status === "authenticated") {
    return <CalendarPage />;
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  return <div>{status}</div>;
}
