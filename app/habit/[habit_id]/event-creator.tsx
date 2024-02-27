"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useSWRConfig } from "swr";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyFunction } from "@/app/types";

export default function EventCreator({
  onEventCreated,
  habit,
}: {
  onEventCreated: EmptyFunction;
  habit: string;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [date, setDate] = useState<Date | undefined>(today);
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const { mutate: globalMutate } = useSWRConfig();

  function validateInput() {
    const validDate = z
      .date({ invalid_type_error: "That's not a date!" })
      .safeParse(date);

    if (!validDate.success) {
      const errorMessage = validDate.error.errors[0]?.message;
      setError(errorMessage);
      return false;
    }

    setError("");
    return true;
  }

  function handleCreate() {
    if (!validateInput()) {
      return;
    }
    fetch(
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL +
        "/habit/" +
        habit +
        "/event",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session!.accessToken,
        },
        body: JSON.stringify({
          date_time: date,
        }),
      },
    ).then((response) => {
      response.ok
        ? handleSuccessfulOperation()
        : alert("The event could not be created");
    });
  }

  function handleDelete() {
    if (!validateInput()) {
      return;
    }
    fetch(
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL +
        "/habit/" +
        habit +
        "/event",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session!.accessToken,
        },
        body: JSON.stringify({
          date_time: date,
        }),
      },
    ).then((response) => {
      response.ok
        ? handleSuccessfulOperation()
        : alert("The event could not be deleted");
    });
  }

  function handleSuccessfulOperation() {
    onEventCreated();
    globalMutate([
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session!.accessToken,
    ]);
  }

  return (
    <div className="m-2 flex flew-row">
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Edit events</CardTitle>
          <CardDescription>Add or delete events</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>

            {error && (
              <div className="flex h-8 items-end text-left space-x-1">
                <>
                  <p
                    aria-live="polite"
                    className="text-sm text-red-500 basis-full"
                  >
                    {error}
                  </p>
                </>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleDelete}>
            <Minus className="h-4 w-4 mr-2" /> Delete
          </Button>
          <Button variant="outline" onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
