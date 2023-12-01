"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export default function EventCreator({
  onEventCreated,
  habit,
}: {
  onEventCreated: EmptyFunction;
  habit: string;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [date, setDate] = useState(today);
  const { data: session } = useSession();
  const [error, setError] = useState("");

  function validateInput() {
    const isNonEmptyDate = (value: Date | null | undefined): value is Date =>
      value !== null && value !== undefined;
    const validDate = z
      .date()
      .nullable()
      .refine(isNonEmptyDate, {
        message: "Date cannot be empty",
      })
      .safeParse(date);

    if (!validDate.success) {
      const errorMessage = validDate.error.errors[0]?.message;
      setError(errorMessage);
      return 0;
    }

    setError("");
    return 1;
  }

  function handleCreate() {
    if (!validateInput()) {
      return;
    }
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session!.accessToken,
      },
      body: JSON.stringify({
        habit,
        date_time: date,
      }),
    }).then((response) => {
      response.ok ? onEventCreated() : alert("The event could not be created");
    });
  }

  function handleDelete() {
    if (!validateInput()) {
      return;
    }
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/event", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session!.accessToken,
      },
      body: JSON.stringify({
        habit,
        date_time: date,
      }),
    }).then((response) => {
      response.ok ? onEventCreated() : alert("The event could not be deleted");
    });
  }

  return (
    <>
      <div>
        <label>Date: </label>
        <DatePicker
          showTimeInput
          id="date"
          selected={date}
          onChange={(date: Date) => setDate(date)}
          shouldCloseOnSelect={false}
        />
        {error && (
          <div className="flex h-8 items-end text-left space-x-1">
            <>
              <p aria-live="polite" className="text-sm text-red-500 basis-full">
                {error}
              </p>
            </>
          </div>
        )}
      </div>
      <Button
        onClick={handleCreate}
        className="bg-green-800 hover:bg-green-700 ml-1 mt-1"
      >
        Create
      </Button>
      <Button
        onClick={handleDelete}
        className="bg-red-800 hover:bg-red-700 ml-1 mt-1"
      >
        Delete
      </Button>
    </>
  );
}
