import { useSWRConfig } from "swr";
import { useState } from "react";
import { useSession } from "next-auth/react";
import HabitDialog from "./habit-dialog";
import { DialogTrigger } from "@/components/ui/dialog";

export default function HabitEditor({
  habit,
  habitDescription,
  onHabitChangeHandler,
}: {
  habit: string;
  habitDescription: string;
  onHabitChangeHandler(habit: string): void;
}) {
  const [open, setOpen] = useState(false);
  const { mutate: globalMutate } = useSWRConfig();

  const { data: session } = useSession();

  return (
    <HabitDialog
      open={open}
      onOpenChange={setOpen}
      onSubmitEventHandler={editHabit}
      defaultHabitName={habit}
      defaultHabitDescription={habitDescription}
      dialogTitle="Edit habit"
    >
      <DialogTrigger className="ml-1 mt-1 h-6 bg-green-800 hover:bg-green-700 rounded-md text-white w-20 text-sm font-medium text-primary-foreground h-10">
        Edit
      </DialogTrigger>
    </HabitDialog>
  );

  function editHabit(name: string, description: string) {
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit/" + habit, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session!.accessToken,
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    }).then((response) => {
      response.ok
        ? onSuccessHandler(name)
        : alert("The habit could not be modified");
    });
  }

  function onSuccessHandler(newHabitName: string) {
    onHabitChangeHandler(newHabitName);
    setOpen(false);
    globalMutate([
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session!.accessToken,
    ]);
  }
}
