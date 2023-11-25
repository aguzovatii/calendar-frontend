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

  function handleCreate() {
    if (!z.date().safeParse(date).success) {
      alert("Date should be valid");
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
    if (!z.date().safeParse(date).success) {
      alert("Date should be valid");
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
