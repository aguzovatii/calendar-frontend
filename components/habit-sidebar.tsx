"use client";

import * as React from "react";
import { AppSidebar } from "./app-sidebar";
import useSWR, { Fetcher } from "swr";
import { Habit } from "@/app/types";
import { useSession } from "next-auth/react";
import { AudioWaveformIcon } from "lucide-react";
import { NavMain } from "./nav-main";
import { usePathname } from "next/navigation";

const fetcher: Fetcher<Habit[], [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json(),
  );

const menuTemplate = {
  title: "Habits",
  url: "/dashboard/habits",
  icon: AudioWaveformIcon,
  itemsChangeHandler: () => {},
  items: [
    {
      title: "History",
      url: "#",
      isActive: false,
      state: "None",
    },
  ],
};

export function HabitSidebar() {
  const { data: session } = useSession();
  const pathName = usePathname();

  const { data, error, isLoading, mutate } = useSWR(
    [
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session!.accessToken,
    ],
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading</div>;
  let menuData = menuTemplate;
  menuData.itemsChangeHandler = mutate;
  menuData.items = data!.map((habit) => {
    return {
      title: habit.name,
      url: "/dashboard/habits/" + habit.id,
      isActive: pathName.includes(habit.id),
      state: habit.state,
    };
  });
  return (
    <AppSidebar projectIndex={1}>
      <NavMain items={menuData} />
    </AppSidebar>
  );
}
