import { useSession } from "next-auth/react";
import HabitCreator from "./habit-creator";
import HabitList from "./habit-list";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<Habit[], [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json(),
  );

export default function HabitPage() {

    const { data: session, status } = useSession();

    if (status !== "authenticated") {
      return <div>{status}</div>;
    }

    const { data , error, isLoading, mutate } = useSWR(
        [
          process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
          session.accessToken,
        ],
        fetcher,
      );

    if (error) return <div>failed to load</div>;

    return(
        <>
      <div>
        <HabitList habits={!isLoading ? data! : []}/>
      </div>
      <div>
        <HabitCreator onHabitCreated={() => mutate()} />
      </div>
        </>
    )
}