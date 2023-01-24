import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const authenticate = (e: React.FormEvent<HTMLFormElement>) => {
    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: refEmail.current?.value,
        password: refPassword.current?.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).includes("error")) {
          throw new Error(data.error);
        } else if (data.token === "QpwL5tke4Pnpja7X4") {
          setError("");
          alert("Sign in successful");
          e.currentTarget !== null && e.currentTarget.reset();
        }
      })
      .catch((err) => {
        setError(err.toString());
      });
  };

  return (
    <div className="App">
      <form
        className=" col-10 col-md-4 my-2 mx-auto border p-4 text-start"
        onSubmit={(e) => {
          e.preventDefault();
          authenticate(e);
        }}
      >
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            ref={refEmail}
            type="email"
            className="form-control"
            defaultValue="eve.holt@reqres.in"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            ref={refPassword}
            defaultValue="cityslicka"
            type="password"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {error !== "" ? (
        <div className="alert alert-danger d-inline-flex">{error}</div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
