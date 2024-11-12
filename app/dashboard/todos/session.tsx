"use client";

import { useSession } from "next-auth/react";
import Todo from "./todo";

export default function Session({ children }: { children: React.ReactNode }) {
  const { status } = useSession({ required: true });
  if (status === "loading") {
    return "Loading...";
  }

  return <>{children}</>;
}
