import { useState } from "react";

export default function Signup({ onSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h1>Signup</h1>
      <form autoComplete="off">
        {" "}
        <div>
          {" "}
          <label>Username: </label>{" "}
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
          ></input>{" "}
        </div>{" "}
        <br />{" "}
        <div>
          {" "}
          <label>Password: </label>{" "}
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          ></input>{" "}
        </div>{" "}
        <br />{" "}
        <button type="button" onClick={validateInput}>
          {" "}
          Create{" "}
        </button>{" "}
      </form>
    </>
  );

  function validateInput() {
    var valid = true;
    var errstyle = "2px solid red";
    var initstyle = "1px solid grey";

    if (username.length == 0) {
      const el = document.getElementById("username");
      el.style.border = errstyle;
      valid = false;
      el.onchange = () => {
        (el.style.border = initstyle), (username) => setUsername(username);
      };
    }

    if (password.length == 0) {
      const el = document.getElementById("password");
      el.style.border = errstyle;
      valid = false;
      el.onchange = () => {
        (el.style.border = initstyle), (password) => setPassword(password);
      };
    }
    valid ? handleClick() : alert("Invalid Input");
  }

  function handleClick() {
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      response.ok
        ? onSignup(username, password)
        : alert("There was an error. Please try again later");
    });
  }
}
