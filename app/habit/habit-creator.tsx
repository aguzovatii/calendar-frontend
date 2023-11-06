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
    )

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
          response.ok ? habitCreated() : alert("The event could not be created");
        });
      }

    function habitCreated() {
      setOpen(false); 
      onHabitCreated();
    }
}