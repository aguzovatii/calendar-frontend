"use client";

import { useSession } from "next-auth/react";
import Todo from "./todo";

export default function Session({ date, today }: { date: Date; today: Date }) {
  const { status } = useSession({ required: true });
  if (status === "loading") {
    return "Loading...";
  }

  return <Todo date={date} today={today} />;
}
