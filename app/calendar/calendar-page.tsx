import useSWR from "swr";
import HeatMap from "./calendar-heatmap";
import EventCreator from "./event-creator";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CalendarPage({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 6);

  let endDate = new Date(today);
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
      <EventCreator
        username={username}
        password={password}
        onEventCreated={() => mutate()}
      />
    </>
  );
}
