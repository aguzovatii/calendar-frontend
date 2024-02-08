import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import HabitDialog from "./habit-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function HabitCreator({
  onHabitCreatedHandler,
}: {
  onHabitCreatedHandler: () => void;
}) {
  const [openHabitDialog, setOpenHabitDialog] = useState(false);
  const { data: session } = useSession();

  return (
    <HabitDialog
      onSubmitEventHandler={createHabit}
      open={openHabitDialog}
      onOpenChange={setOpenHabitDialog}
      dialogTitle="Add new habit"
    >
      <DialogTrigger>
        <Plus color="green" strokeWidth={3} className="w-6 h-6 mt-2 mr-1" />
      </DialogTrigger>
    </HabitDialog>
  );

  function createHabit(name: string, description: string) {
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session!.accessToken,
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    }).then((response) => {
      response.ok ? habitCreated() : alert("The habit could not be created");
    });
  }

  function habitCreated() {
    setOpenHabitDialog(false);
    onHabitCreatedHandler();
  }
}
