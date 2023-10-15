"use client";
import CalendarPage from "./calendar/calendar-page";
import { useSession} from "next-auth/react"
import Signup from "./user/user-creator";

export default function Page() {
  const { status } = useSession();

  if (status === "authenticated") {
    return <CalendarPage/>;
  }

  if(status === "unauthenticated"){
    return <Signup/>
  }

  return <div>{status}</div>;
}
