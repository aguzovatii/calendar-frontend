"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {z} from "zod";

type SignUpErrorTypes = "CredentialsSignin" | "default";

const errors: Record<SignUpErrorTypes, string> = {
  CredentialsSignin: "Sign up failed.",
  default: "Unable to sign up. Please try again later.",
};

export default function Signin() {
  const { status: sessionStatus } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorType, setErrorType] = useState<SignUpErrorTypes | null>(null);

  if (sessionStatus === "loading") {
    return <div>loading</div>;
  }

  if (sessionStatus === "authenticated") {
    redirect("/");
  }

  const error = errorType && (errors[errorType] ?? errors.default);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" autoComplete="off">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                value={username}
                onChange={(e) => {
                  setUsername(e.currentTarget.value);
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              onClick={validateInput}
            >
              Sign up
            </button>
          </div>

          {error && (
            <div className="flex h-8 items-end text-center space-x-1">
              <>
                <p
                  aria-live="polite"
                  className="text-sm text-red-500 basis-full"
                >
                  {error}
                </p>
              </>
            </div>
          )}
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            className="font-semibold leading-6 text-slate-600 hover:text-slate-500"
            href="/auth/signin"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );

  function validateInput() {
    const result = z.string().min(1).safeParse(username);
    const result2 = z.string().min(1).safeParse(password);

    (result.success && result2.success) ? handleClick() : alert("eroareeee");
  }

  function handleClick() {
    signIn("signup", {
      redirect: false,
      username: username,
      password: password,
    }).then((response) => {
      if (response === undefined) {
        setErrorType("default");
        return;
      }

      if (response.ok) {
        setErrorType(null);
        return;
      }

      if (response.error == "CredentialsSignin") {
        setErrorType("CredentialsSignin");
        return;
      } else {
        setErrorType("default");
        return;
      }
    });
  }
}
