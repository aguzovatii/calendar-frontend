import useSWR, { Fetcher } from "swr";
import HeatMap from "./calendar-heatmap";
import EventCreator from "./event-creator";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

interface Events {
  events: Event[];
}

const fetcher: Fetcher<Events, [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json(),
  );

export default function CalendarPage() {
  console.log("calendarPage")
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
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/calendar",
      session.accessToken,
    ],
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <HeatMap startDate={startDate} endDate={endDate} events={data!.events} />
      <EventCreator onEventCreated={() => mutate()} />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
