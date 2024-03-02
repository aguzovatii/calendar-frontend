import { CalendarPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import HabitDialog from "./habit-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function HabitCreator({
  onHabitCreatedHandler,
}: {
  onHabitCreatedHandler: () => void;
}) {
  const [openHabitDialog, setOpenHabitDialog] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <HabitDialog
      onSubmitEventHandler={createHabit}
      open={openHabitDialog}
      onOpenChange={setOpenHabitDialog}
      dialogTitle="New habit"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="h-6 mt-1 mr-1">
                <CalendarPlus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>New habit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
    })
      .then((response) => {
        return response.ok
          ? response.json()
          : Promise.reject("The habit could not be created");
      })
      .then((responseBody) => habitCreated(responseBody.id))
      .catch((error) => alert(error));
  }

  function habitCreated(habitId: string) {
    setOpenHabitDialog(false);
    onHabitCreatedHandler();
    toast("Habit created successfully", {
      action: {
        label: "View",
        onClick: () => router.push(`/habit/${habitId}`),
      },
    });
  }
}
