"use client";

import useSWR, { Fetcher } from "swr";
import Checkbox from "./checkbox";
import { Task, TaskArraySchema } from "@/app/types";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

const fetcher: Fetcher<Task[], [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json().then((t) => {
      const res = TaskArraySchema.safeParse(t);
      return res.data!;
    }),
  );

export default function Todo({ date, today }: { date: Date; today: Date }) {
  const { data: session } = useSession();
  const {
    data: tasks,
    error,
    isLoading,
    mutate,
  } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL}/tasks/${format(date, "dd-MM-yyyy")}`,
      session!.accessToken,
    ],
    fetcher,
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="h-full w-full flex">
      <div className="w-full">
        <div className="w-full text-center mb-8">
          <h1 className="text-2xl">
            {date.getTime() === today.getTime() ? "Today" : format(date, "PP")}
          </h1>
        </div>
        <div className="w-full flex flex-col space-y-4">
          {tasks!
            .filter((task: Task) => task.due_on.getTime() === today.getTime())
            .map((task: Task) => (
              <Checkbox
                task={task}
                key={task.id}
                onTaskStateChange={() => mutate()}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
