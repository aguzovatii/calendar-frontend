'use client'

import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EventCreator() {

   

    const [name, setName] = React.useState("");
    const [date, setDate] = React.useState("");
    const [calendarId, setCalendarId] = React.useState("");


    function validateInput() {

        var valid = true;

        if (name.length == 0) {
            const el = document.getElementById("name");
            el.style.border = "2px solid red";

            valid = false;
            el.onchange = () => {el.style.border = "1px solid grey"};
        }

        if (date.length == 0) {
            const el = document.getElementById("date");
            el.style.border = "2px solid red";

            valid = false;
            el.onclick = () => { el.style.border = "1px solid grey" };
        }

        if (calendarId.length == 0) {
            const el = document.getElementById("calendar");
            el.style.border = "2px solid red";

            valid = false;
            el.onchange = () => { el.style.border = "1px solid grey" };
        }

        if (!valid) {

            alert('Invalid Input')
            return;
        }


        if (valid)
            handleClick();



    }

    function handleClick() {

        console.log("a mers");
        let endpoint = 'http://localhost:8080/event';

        fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, "date_time":date, "calendar_id":calendarId}),
          }).then(e => console.log(e))
    }

    return (
        <form autoComplete="off">
            <div>
            <label>Name: </label>
                <input id="name" type="text" value={name} onChange={e => { setName(e.currentTarget.value); }}></input>
            </div>
            <br />
            <div>
            <label>Date: </label>
                <DatePicker id = "date" selected={date} onChange={(date) => setDate(date)} />
            </div>
            <br />
            <div>
            <label>Calendar: </label>
                <input type="text" id="calendar" value={calendarId} onChange={e => { setCalendarId(e.currentTarget.value); }}></input>
            </div>
            <br/>
            <button type="button" onClick={validateInput}>Create</button>
        </form>
    )
}
