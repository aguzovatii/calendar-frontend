"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Base64 } from "js-base64";
import { getSession, useSession } from "next-auth/react";

interface EmptyFunction {
  (): void;
}

export default function EventCreator({
  username,
  password,
  onEventCreated,
}: {
  username: string;
  password: string;
  onEventCreated: EmptyFunction;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [name, setName] = useState("");
  const [date, setDate] = useState(today);

  const { data: session, status } = useSession();
  console.log("event - session: " + JSON.stringify(session.accessToken));

  function validateInput() {
    let valid = true;
    let errstyle = "2px solid red";
    let initstyle = "1px solid grey";

    if (name.length === 0) {
      const el = document.getElementById("name");
      el.style.border = errstyle;
      valid = false;
      el.onchange = () => {
        (el.style.border = initstyle), (name: string) => setName(name);
      };
    }

    if (date === null) {
      const el = document.getElementById("date");
      el.style.border = errstyle;
      valid = false;
      el.onclick = () => {
        (el.style.border = initstyle), (date: Date) => setDate(date);
      };
    }
    valid ? handleClick() : alert("Invalid Input");
  }

  function handleClick() {
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.accessToken,
      },
      body: JSON.stringify({
        username,
        name,
        date_time: date,
      }),
    }).then((response) => {
      response.ok ? onEventCreated() : alert("The event could not be created");
    });
  }

  return (
    <form autoComplete="off">
      {" "}
      <div>
        {" "}
        <label>Name: </label>{" "}
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        ></input>{" "}
      </div>{" "}
      <br />{" "}
      <div>
        {" "}
        <label>Date: </label>{" "}
        <DatePicker
          showTimeInput
          id="date"
          selected={date}
          onChange={(date: Date) => setDate(date)}
          shouldCloseOnSelect={false}
        />{" "}
      </div>{" "}
      <br />{" "}
      <button type="button" onClick={validateInput}>
        {" "}
        Create{" "}
      </button>{" "}
    </form>
  );
}
