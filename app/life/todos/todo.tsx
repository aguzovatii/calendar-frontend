"use client";

import useSWR, { Fetcher } from "swr";
import Checkbox from "./checkbox";
import { Task, TaskArraySchema } from "@/app/types";
import { useSession } from "next-auth/react";

const fetcher: Fetcher<Task[], [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json().then((t) => {
      const res = TaskArraySchema.safeParse(t);
      return res.data!;
    }),
  );

export default function Todo() {
  const { data: session } = useSession();
  const {
    data: tasks,
    error,
    isLoading,
    mutate,
  } = useSWR(
    [
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/tasks",
      session!.accessToken,
    ],
    fetcher,
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="h-full flex flex-row space-x-16 justify-center items-center">
      <div className="max-w-96 p-2">
        <div className="w-full text-center mb-8">
          <h1 className="text-2xl">Today</h1>
        </div>
        <div className="flex flex-col space-y-4">
          {tasks!
            .filter(
              (task: Task) =>
                task.state === "Pending" ||
                task.due_on.getTime() === today.getTime(),
            )
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
