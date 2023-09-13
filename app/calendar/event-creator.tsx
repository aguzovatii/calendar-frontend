"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EventCreator({ username, onEventCreated }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [name, setName] = useState("");
  const [date, setDate] = useState(today);

  function validateInput() {
    var valid = true;
    var errstyle = "2px solid red";
    var initstyle = "1px solid grey";

    if (name.length === 0) {
      const el = document.getElementById("name");
      el.style.border = errstyle;
      valid = false;
      el.onchange = () => {
        (el.style.border = initstyle), (name) => setName(name);
      };
    }

    if (date === null) {
      const el = document.getElementById("date");
      el.style.border = errstyle;
      valid = false;
      el.onclick = () => {
        (el.style.border = initstyle), (date) => setDate(date);
      };
    }
    valid ? handleClick() : alert("Invalid Input");
  }

  function handleClick() {
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
          onChange={(date) => setDate(date)}
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
