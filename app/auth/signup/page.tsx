"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="page">
      <div className="signin">
        <div className="card">
          <h1>Sign up</h1>
          <form autoComplete="off">
            <div>
              <label>Username</label>
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
              <label>Password</label>
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
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
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
    signIn("signup", {
      username: username,
      password: password,
      callbackUrl: "/",
    });
  }
}
