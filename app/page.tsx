"use client";
import { useState } from "react";
import CalendarPage from "./calendar/calendar-page";
import Signup from "./user/user-creator";
import { useSession, getSession } from "next-auth/react"

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();

  console.log("Status: " + status);
  console.log("Session: " + ((session !== undefined && session !== null) ? session.user.name : "undefined"));

  if (username.length > 0) {
    return <CalendarPage username={username} password={password} />;
  }

  return (
    <Signup
      onSignup={(username: string, password: string) => {
        setUsername(username), setPassword(password);
      }}
    />
  );
}
