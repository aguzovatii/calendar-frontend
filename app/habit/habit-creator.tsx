import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Plus } from "lucide-react";

export default function HabitCreator({
  onHabitCreated,
}: {
  onHabitCreated: EmptyFunction;
}) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [habitName, setHabitName] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Plus color="green" strokeWidth={3} className="w-5 h-5 mt-2 ml-1" />
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
          <Button
            type="submit"
            onClick={addHabit}
            className="m-1.5 h-7 justify-center rounded-md bg-slate-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  function addHabit() {
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session!.accessToken,
      },
      body: JSON.stringify({
        name: habitName,
      }),
    }).then((response) => {
      response.ok ? habitCreated() : alert("The habit could not be created");
    });
  }

  function habitCreated() {
    setOpen(false);
    setHabitName("");
    onHabitCreated();
  }
}
