import { useSession } from "next-auth/react";
import HabitCreator from "./habit-creator";
import HabitList from "./habit-list";
import useSWR, { Fetcher } from "swr";
import { Dispatch, SetStateAction } from "react";

const fetcher: Fetcher<Habit[], [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json(),
  );

export default function HabitPage({
  currentHabit,
  setCurrentHabit,
}: {
  currentHabit: string;
  setCurrentHabit: Dispatch<SetStateAction<string>>;
}) {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return <div>{status}</div>;
  }

  const { data, error, isLoading, mutate } = useSWR(
    [
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session.accessToken,
    ],
    fetcher,
  );

  if (error) return <div>failed to load</div>;

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-1">
        <HabitList
          habits={!isLoading ? data! : []}
          currentHabit={currentHabit}
          setCurrentHabit={setCurrentHabit}
        />
      </div>
      <div className="h-10 flex flex-col-reverse">
        <HabitCreator onHabitCreated={() => mutate()} />
      </div>
    </div>
  );
}
