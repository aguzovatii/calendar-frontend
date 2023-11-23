import useSWR, { useSWRConfig, Fetcher } from "swr";
import HeatMap from "./calendar-heatmap";
import EventCreator from "./event-creator";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface Events {
  events: Event[];
}

const fetcher: Fetcher<Events, [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json(),
  );

export default function CalendarPage({
  habit,
  setCurrentHabit,
}: {
  habit: string;
  setCurrentHabit: Dispatch<SetStateAction<string>>;
}) {
  const { mutate: globalMutate } = useSWRConfig();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 6);

  let endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + 6);

  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return <div>{status}</div>;
  }

  const { data, error, isLoading, mutate } = useSWR(
    [
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/calendar/" + habit,
      session.accessToken,
    ],
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="flex flex-row">
        <h1 className="text-xl ml-1">{habit}</h1>
        <Button onClick={deleteHabit} className="ml-1 mt-1 h-6 bg-red-800 hover:bg-red-700">Delete</Button>
      </div>
      <HeatMap startDate={startDate} endDate={endDate} events={data!.events} />
      <EventCreator onEventCreated={() => mutate()} habit={habit} />
    </>
  );

  function deleteHabit() {
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session!.accessToken,
      },
      body: JSON.stringify({
        name: habit,
      }),
    }).then((response) => {
      response.ok ? clean() : alert("The habit could not be deleted");
    });
  }

  function clean() {
    setCurrentHabit("");
    globalMutate([
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session!.accessToken,
    ]);
  }
}
