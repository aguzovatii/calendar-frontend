import useSWR, { Fetcher } from "swr";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HeatMap from "./calendar-heatmap";
import EventCreator from "./event-creator";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface Events {
  events: Event[];
}

const fetcher: Fetcher<Events, [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json(),
  );

export default function CalendarPage() {
  const [open, setOpen] = useState(false);
  const [habitName, setHabitName] = useState("");

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
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button variant="outline">Add new habit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new habit</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={habitName}
                  onChange={(e) => {
                    setHabitName(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={addHabit}>
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );

  function addHabit() {
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session!.accessToken,
      },
      body: JSON.stringify({
        habitName,
      }),
    }).then((response) => {
      response.ok ? setOpen(false) : alert("The event could not be created");
    });
  }
}
