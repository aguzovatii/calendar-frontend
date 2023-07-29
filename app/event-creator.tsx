'use client'

import React from "react";

export default function EventCreator() {

    const [name, setName] = React.useState();

    function handleClick() {
        let endpoint = 'http://127.0.0.1:8080/event';

      }

    return (
        <>
            <label>Name: </label>
            <input type="text" id = "name"></input>
            <br/>
            <label>Date: </label>
            <input type="text"></input>
            <br/>
            <label>Calendar: </label>
            <input type="text"></input>
            <br/>
            <button type="button" onClick={handleClick}>Create</button>
        </>
    )
}