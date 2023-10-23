"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type SignInErrorTypes = "CredentialsSignin" | "default";

const errors: Record<SignInErrorTypes, string> = {
  CredentialsSignin: "Sign up failed.",
  default: "Unable to sign up. Please try again later.",
};

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorType, setErrorType] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const { status } = useSession();

  if (status === "loading") {
    return <div>loading</div>;
  }

  if (status === "authenticated") {
    redirect("/");
  }

  if (signedIn) {
    redirect(redirectUrl);
  }

  const error = errorType && (errors[errorType] ?? errors.default);

  return (
    <div className="page">
      <div className="signin">
        <div className="card">
          <h1>Sign up</h1>
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
    if (valid) {
      handleClick();
    }
  }

  function handleClick() {
    signIn("signup", {
      redirect: false,
      username: username,
      password: password,
      callbackUrl: "/",
    }).then((response) => {
      const error = response.error;

      if (error) {
        setErrorType(error);
        return;
      }

      const ok = response.ok;
      const redirectUrl = response.url;
      if (ok) {
        setSignedIn(ok);
        setRedirectUrl(redirectUrl);
      }
    });
  }
}
