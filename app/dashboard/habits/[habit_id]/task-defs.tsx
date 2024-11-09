import { useSession } from "next-auth/react";
import useSWR, { Fetcher } from "swr";
import TaskDefCreator from "./task-def-creator";
import { TaskDefApi } from "@/app/types";
import TaskDefinitionDetails from "./task-def-details";

const fetcher: Fetcher<TaskDefApi[], [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json(),
  );

export default function TasksDefinitions({ habitId }: { habitId: string }) {
  const { data: session } = useSession();

  const {
    data: tasksDefs,
    error,
    isLoading,
    mutate,
  } = useSWR(
    [
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL +
        "/habit/" +
        habitId +
        "/tasks_defs",
      session!.accessToken,
    ],
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <TaskDefCreator habitId={habitId} onTaskDefCreatedHandler={mutate} />
      <div className="grid gap-2 mt-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {tasksDefs!.map((taskDef) => (
          <TaskDefinitionDetails
            key={taskDef.id}
            task={taskDef}
            habitId={habitId}
            onTaskDefDeleteHandler={mutate}
          />
        ))}
      </div>
    </>
  );
}
