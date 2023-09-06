"use client";
import { useState } from "react";
import Signup from "./user/signup";
import CalendarPage from "./calendar/calendar-page";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (username.length > 0 ) {
    return <CalendarPage username={username} />;
  }

  return (
    <Signup
      onSignup={(username: string, password: string) => {
        setUsername(username), setPassword(password);
      }}
    />
  );
}
