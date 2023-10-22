"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type SignInErrorTypes =
  | "Signin"
  | "CredentialsSignin"
  | "SessionRequired"
  | "default";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const params = useSearchParams();

  const errors: Record<SignInErrorTypes, string> = {
    Signin: "Try signing in with a different account.",
    CredentialsSignin: "Sign in failed. Wrong username and/or password.",
    SessionRequired: "Please sign in to access this page.",
    default: "Unable to sign in.",
  };

  const errorType = params.get("error");
  const error = errorType && (errors[errorType] ?? errors.default);

  return (
    <div className="page">
      <div className="signin">
        <div className="card">
          <h1>Sign in</h1>
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
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
              Sign in
            </button>
          </form>

          <Link href="/auth/signup">Sign up</Link>
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
    signIn("signin", {
      username: username,
      password: password,
      callbackUrl: "/",
    });
  }
}
