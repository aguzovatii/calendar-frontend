"use client";

import * as React from "react";
import { AppSidebar } from "./app-sidebar";
import useSWR, { Fetcher } from "swr";
import { Habit } from "@/app/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CheckCircleIcon, CircleDashed, CircleIcon } from "lucide-react";

const fetcher: Fetcher<Habit[], [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json(),
  );

export function HabitSidebar() {
  const { data: session } = useSession();

  const { data, error, isLoading, mutate } = useSWR(
    [
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session!.accessToken,
    ],
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading</div>;
  return (
    <AppSidebar projectIndex={1}>
      {data!.map((habit) => (
        <Link
          key={habit.id}
          className={"ml-2 hover:underline pt-2 flex flex-row "}
          href={"/dashboard/habits/" + habit.id}
        >
          <div className="flex flex-col justify-center">
            <HabitState state={habit.state} className="mr-2 h-3 w-3 shrink-0" />
          </div>
          <h2 className="text-lg flex shrink">{habit.name}</h2>
        </Link>
      ))}
    </AppSidebar>
  );
}

export function HabitState({
  state,
  className = "",
}: {
  state: string;
  className?: string;
}) {
  switch (state) {
    case "Pending": {
      return <CircleIcon size={12} className={className} />;
    }
    case "Done": {
      return <CheckCircleIcon size={12} className={className} />;
    }
    case "None": {
      return <CircleDashed size={12} className={className} />;
    }
  }
}
