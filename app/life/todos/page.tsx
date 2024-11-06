"use client";

import { useSession } from "next-auth/react";
import Todo from "./todo";

export default function Page() {
  const { status } = useSession({ required: true });
  if (status === "loading") {
    return "Loading...";
  }

  return <Todo />;
}
