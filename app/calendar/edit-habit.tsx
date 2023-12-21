import { useSWRConfig, Fetcher } from "swr";
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
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

export default function EditHabit({
  habit,
  setCurrentHabit,
}: {
  habit: string;
  setCurrentHabit: Dispatch<SetStateAction<string>>;
}) {
  const [newHabitName, editHabitName] = useState(habit);
  const [open, setOpen] = useState(false);
  const { mutate: globalMutate } = useSWRConfig();

  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return <div>{status}</div>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="ml-1 mt-1 h-6 bg-green-800 hover:bg-green-700">
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
              value={newHabitName}
              onChange={(e) => {
                editHabitName(e.currentTarget.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={editHabit}
            className="m-1.5 h-7 justify-center rounded-md bg-slate-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  function editHabit() {
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
      response.ok ? edit() : alert("The habit could not be modificated");
    });
  }

  function edit() {
    habit = newHabitName;
    setCurrentHabit("");
    globalMutate([
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session!.accessToken,
    ]);
  }
}
