import React, { useRef, useState } from "react";
import { useJwt } from "react-jwt";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { user } from "./types";

const users: user[] = [
  {
    email: "aman@gmail.com",
    password: "Aman@1234",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiJBbWFuQDEyMzQiLCJleHAiOjE2Nzk3MDI0MDAsInJvbGUiOiJhZG1pbiJ9.utVkoGEUJdeIulYiX8KEPvgQ6hdci9Wsn1bQIZZWovA",
  },
  {
    email: "deepanshu@gmail.com",
    password: "deepanshu@1234",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBhbnNodUBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImRlZXBhbnNodUAxMjM0Iiwicm9sZSI6InVzZXIiLCJleHAiOjE2Nzk3MDI0MDB9.S_Cj3r95f64mQZAL3ZwoOJuPR5JPrPQhoUusgNGtAko",
  },
  {
    email: "adarsh@gmail.com",
    password: "adarsh@1234",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkYXJzaEBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImFkYXJzaEAxMjM0Iiwicm9sZSI6InVzZXIiLCJleHAiOjE2Nzk3MDI0MDB9.PnLKq7eZzXI_BNN-P7lCj9y3L20lWLA-KC0VFZfc8F0",
  },
];

function App() {
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<user>({ email: "", token: "" });
  const [error, setError] = useState("");
  const { decodedToken, isExpired } = useJwt<user>(user.token);

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    let obj = users.find((ele) => {
      return ele.email === refEmail.current?.value;
    });
    if (obj !== undefined) {
      if (obj.password === refPassword.current!.value) {
        if (!isExpired) {
          setError("");
          setUser(obj);
        }
        else{
          setError("Token expired");
        }
      } else {
        setError("Incorrect Password");
      }
    } else {
      setError("User does not exist");
    }
  };

  return (
    <div className="App">
      {decodedToken === null ? (
        <>
          <form
            className=" col-10 col-md-4 my-2 mx-auto border p-4 text-start"
            onSubmit={(e) => {
              e.preventDefault();
              login(e);
            }}
          >
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                required
                ref={refEmail}
                type="email"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                required
                ref={refPassword}
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
        </>
      ) : (
        <Dashboard details={decodedToken} />
      )}
    </div>
  );
}

export default App;
