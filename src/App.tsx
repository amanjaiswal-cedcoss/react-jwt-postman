import React, { useRef, useState } from "react";
import { useJwt } from "react-jwt";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { user } from "./types";

const users: user[] = [
  {
    email: "aman@gmail.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiJBbWFuQDEyMzQiLCJleHAiOjE2Nzk3MDI0MDAsInJvbGUiOiJhZG1pbiJ9.utVkoGEUJdeIulYiX8KEPvgQ6hdci9Wsn1bQIZZWovA",
  },
  {
    email: "deepanshu@gmail.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBhbnNodUBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImRlZXBhbnNodUAxMjM0Iiwicm9sZSI6InVzZXIiLCJleHAiOjE2Nzk3MDI0MDB9.S_Cj3r95f64mQZAL3ZwoOJuPR5JPrPQhoUusgNGtAko",
  },
  {
    email: "adarsh@gmail.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkYXJzaEBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImFkYXJzaEAxMjM0Iiwicm9sZSI6InVzZXIiLCJleHAiOjE2Nzk3MDI0MDB9.PnLKq7eZzXI_BNN-P7lCj9y3L20lWLA-KC0VFZfc8F0",
  },
];

function App() {
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<user>({ email: "", token: "" });
  const [error, setError] = useState("");
  const {decodedToken,isExpired} = useJwt<user>(user.token);

  const checkUser = () => {
    let obj = users.find((ele) => {
      return ele.email === refEmail.current?.value;
    });
    if (obj !== undefined) {
      setUser({...obj});
      setError("");
    } else {
      setError("User does not exist");
    }
  };
  
  console.log(decodedToken)
  console.log(isExpired);

  const authenticate = (e: React.FormEvent<HTMLFormElement>) => {
    if(decodedToken!.password===refPassword.current!.value){
      setError('')
      alert('Login Successful!!')
    }
    else{
      setError('Incorrect Password')
    }
  };

  return (
    <div className="App">
      {decodedToken===null?<><form
        className=" col-10 col-md-4 my-2 mx-auto border p-4 text-start"
        onSubmit={(e) => {
          e.preventDefault();
          user.email !== "" ? authenticate(e) : checkUser();
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
        {user.email !== "" ? (
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              required
              ref={refPassword}
              type="password"
              className="form-control"
            />
          </div>
        ) : (
          ""
        )}
        {user.email !== "" ? (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Check User
          </button>
        )}
      </form>
      {error !== "" ? (
        <div className="alert alert-danger d-inline-flex">{error}</div>
      ) : (
        ""
      )}</>:<Dashboard details={decodedToken}/>}
    </div>
  );
}

export default App;
