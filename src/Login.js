import { Input } from "@mui/material";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { auth } from "./firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    //firebase login things
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    //firebase register
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }

        console.log(auth);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            // by using onchange we are going to track what use is typing
            // e means event handler and it will catch what is typed
            onChange={(e) => {
              //by using e.target.value we are taking exact unput of user
              //and we are setting our email to be equal to that value
              setEmail(e.target.value);
            }}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              //doing the same here to set the password
              setPassword(e.target.value);
            }}
          />
          <div>
            <button
              className="login__signInButton"
              type="submit"
              onClick={signIn}
            >
              Sign In
            </button>
          </div>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button className="login__registerButton" onClick={register}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;
