import { useState } from "react";

export default function Signup({
  onSignup,
}: {
  onSignup: (username: string, password: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  return (
    <>
      <h1>Login</h1>
      <form autoComplete="off">
        <div>
          <label>Username: </label>
          <input
            id="usernameLogin"
            type="text"
            value={usernameLogin}
            onChange={(e) => {
              setUsernameLogin(e.currentTarget.value);
            }}
          ></input>
        </div>
        <br />
        <div>
          <label>Password: </label>
          <input
            id="passwordLogin"
            type="password"
            value={passwordLogin}
            onChange={(e) => {
              setPasswordLogin(e.currentTarget.value);
            }}
          ></input>
        </div>
        <br />
        <button type="button" onClick={validateInputLogin}>
          Login
        </button>
      </form>

      <br />
      <br />

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

  function validateInputLogin() {
    var valid = true;
    var errstyle = "2px solid red";
    var initstyle = "1px solid grey";

    if (usernameLogin.length === 0) {
      const el = document.getElementById("usernameLogin");
      el.style.border = errstyle;
      valid = false;
      el.onchange = () => {
        (el.style.border = initstyle),
          (usernameLogin: string) => setUsernameLogin(usernameLogin);
      };
    }

    if (passwordLogin.length === 0) {
      const el = document.getElementById("passwordLogin");
      el.style.border = errstyle;
      valid = false;
      el.onchange = () => {
        (el.style.border = initstyle),
          (passwordLogin: string) => setPasswordLogin(passwordLogin);
      };
    }
    valid ? handleClickLogin() : alert("Invalid Input");
  }

  function handleClick() {
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      response.ok
        ? onSignup(username, password)
        : alert("There was an error. Please try again later");
    });
  }

  function handleClickLogin() {
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameLogin,
        password: passwordLogin,
      }),
    }).then((response) => {
      response.ok
        ? onSignup(usernameLogin, passwordLogin)
        : alert("There was an error. Please try again later");
    });
  }
}
