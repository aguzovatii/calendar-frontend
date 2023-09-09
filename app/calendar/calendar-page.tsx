import useSWR from "swr";
import HeatMap from "./calendar-heatmap";
import EventCreator from "./event-creator";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CalendarPage({ username }) {
  const now = new Date();

  let startDate = new Date(now);
  startDate.setMonth(startDate.getMonth() - 6);

  let endDate = new Date(now);
  endDate.setMonth(endDate.getMonth() + 6);

  const { data, error, isLoading, mutate } = useSWR(
    process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/calendar/" + username,
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <HeatMap startDate={startDate} endDate={endDate} events={data.events} />
      <EventCreator username={username} onEventCreated={() => mutate()} />
    </>
  );
}
