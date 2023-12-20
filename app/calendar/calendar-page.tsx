import useSWR, { useSWRConfig, Fetcher } from "swr";
import HeatMap from "./calendar-heatmap";
import EventCreator from "./event-creator";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
  const [newHabitName, editHabitName] = useState("");
  const [open, setOpen] = useState(false);
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
        <Button
          onClick={deleteHabit}
          className="ml-1 mt-1 h-6 bg-red-800 hover:bg-red-700"
        >
          Delete
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="ml-1 mt-1 h-6 bg-red-800 hover:bg-red-700">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit habit</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={habit}
                  onChange={(e) => {
                    editHabitName(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={EditHabit}
                className="m-1.5 h-7 justify-center rounded-md bg-slate-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

  function EditHabit() {
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session!.accessToken,
      },
      body: JSON.stringify({
        name: habit,
        newName: newHabitName,
      }),
    }).then((response) => {
      response.ok ? Edit() : alert("The habit could not be modificated");
    });
  }

  function clean() {
    setCurrentHabit("");
    globalMutate([
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session!.accessToken,
    ]);
  }

  function Edit() {
    habit = newHabitName;
    setCurrentHabit("");
    globalMutate([
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session!.accessToken,
    ]);
  }
}
