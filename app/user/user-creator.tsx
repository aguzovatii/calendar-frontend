import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h1>Signup</h1>
      <form autoComplete="off">
        <div>
          <label>Username: </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
          ></input>
        </div>
        <br />
        <div>
          <label>Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          ></input>
        </div>
        <br />
        <button type="button" onClick={validateInput}>
          Create
        </button>
      </form>
    </>
  );

  function validateInput() {
    let valid = true;
    let errstyle = "2px solid red";
    let initstyle = "1px solid grey";

    if (username.length === 0) {
      const el = document.getElementById("username");
      el.style.border = errstyle;
      valid = false;
      el.onchange = () => {
        (el.style.border = initstyle),
          (username: string) => setUsername(username);
      };
    }

    if (password.length === 0) {
      const el = document.getElementById("password");
      el.style.border = errstyle;
      valid = false;
      el.onchange = () => {
        (el.style.border = initstyle),
          (password: string) => setPassword(password);
      };
    }
    valid ? handleClick() : alert("Invalid Input");
  }

  function handleClick() {
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      response.ok
        ? alert("Successfully created the user")
        : alert("There was an error. Please try again later");
    });
  }
}
