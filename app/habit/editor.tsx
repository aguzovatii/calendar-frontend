import { useSWRConfig } from "swr";
import { useState } from "react";
import { useSession } from "next-auth/react";
import HabitDialog from "./habit-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HabitDetails } from "../types";

export default function HabitEditor({
  habit,
  onHabitChangeHandler,
}: {
  habit: HabitDetails;
  onHabitChangeHandler(): void;
}) {
  const [open, setOpen] = useState(false);
  const { mutate: globalMutate } = useSWRConfig();

  const { data: session } = useSession();

  return (
    <HabitDialog
      open={open}
      onOpenChange={setOpen}
      onSubmitEventHandler={editHabit}
      defaultHabitName={habit.name}
      defaultHabitDescription={habit.description}
      dialogTitle="Edit habit"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="h-6 mt-1 ml-1">
                <SquarePen className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit habit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </HabitDialog>
  );

  function editHabit(name: string, description: string) {
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit/" + habit.id, {
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
        ? onSuccessHandler()
        : alert("The habit could not be modified");
    });
  }

  function onSuccessHandler() {
    onHabitChangeHandler();
    setOpen(false);

    globalMutate([
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session!.accessToken,
    ]);
  }
}
