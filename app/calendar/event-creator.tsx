"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";

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

  function validateInput() {
    let valid = true;
    let errstyle = "2px solid red";
    let initstyle = "1px solid grey";

    if (date === null) {
      const el = document.getElementById("date");
      if (el !== null) {
        el.style.border = errstyle;
        valid = false;
        el.onclick = () => {
          (el.style.border = initstyle), (date: Date) => setDate(date);
        };
      }
    }
    valid ? handleClick() : alert("Invalid Input");
  }

  function handleClick() {
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

  return (
    <form autoComplete="off">
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
      <br />
      <button type="button" onClick={validateInput}>
        Create
      </button>
    </form>
  );
}
