import { useSession } from "next-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import HabitCreator from "./habit-creator";
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
      <div className="h-7 flex flex-row">
        <h1 className="text-xl flex h-7 font-bold leading-9 tracking-tight text-gray-900 ml-2 pl-0">
          Habits
        </h1>
        <div className="flex h-7">
          <HabitCreator onHabitCreated={() => mutate()} />
        </div>
      </div>
      <ScrollArea className="h-max flex-1">
        {(!isLoading ? data! : []).map((habit) => (
          <div
            key={habit.name}
            className={"border-l-2 hover:border-slate-500 ml-3 pl-3 text-slate-600 cursor-pointer pt-2 " + (currentHabit === habit.name ? "border-slate-500" : "border-slate-300")}
            onClick={() => {
              setCurrentHabit(habit.name);
            }}
          >
            {habit.name}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
