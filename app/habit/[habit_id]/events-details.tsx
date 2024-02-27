import useSWR, { Fetcher } from "swr";
import EventCreator from "./event-creator";
import { useSession } from "next-auth/react";
import HeatMap from "@/app/heatmap/heatmap";
import { Event } from "../../types";

interface Events {
  events: Event[];
}

const fetcher: Fetcher<Events, [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json(),
  );

export default function EventsDetails({ habit }: { habit: string }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 6);

  let endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + 6);

  const { data: session } = useSession();

  const { data, error, isLoading, mutate } = useSWR(
    [
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL +
        "/habit/" +
        habit +
        "/event",
      session!.accessToken,
    ],
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row">
      <EventCreator onEventCreated={() => mutate()} habit={habit} />
      <HeatMap
        startDate={startDate}
        endDate={endDate}
        events={data!.events}
        today={today}
      />
    </div>
  );
}
