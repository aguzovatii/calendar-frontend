'use client'

import React from "react";

export default function EventCreator() {

    const [name, setName] = React.useState("");
    const [date, setDate] = React.useState("");
    const [calendarId, setCalendarId] = React.useState("");

    function handleClick() {
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
        <>
            <label>Name: </label>
            <input type="text" value={name} onChange={e => { setName(e.currentTarget.value); }}></input>
            <br/>
            <label>Date: </label>
            <input type="text" value={date} onChange={e => { setDate(e.currentTarget.value); }}></input>
            <br/>
            <label>Calendar: </label>
            <input type="text" value={calendarId} onChange={e => { setCalendarId(e.currentTarget.value); }}></input>
            <br/>
            <button type="button" onClick={handleClick}>Create</button>
        </>
    )
}