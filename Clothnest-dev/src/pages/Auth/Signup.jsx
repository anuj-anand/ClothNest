import React, { useState } from "react";
import "./Auth.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts";

export const Signup = () => {
  const [eye, setEye] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUpHandler } = useAuth();

  const eyeHandler = () => {
    setEye((eye) => !eye);
  };

  return (
    <main className="auth-main">
      <div className="auth-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signUpHandler(firstName, lastName, email, password);
          }}
          className="login signup-form"
          method="POST"
        >
          <h2 className="page-heading">SignUp</h2>
          <div className="auth-field-row">
            <div className="auth-field">
              <label htmlFor="lName">First Name</label>
              <input
                required
                type="text"
                placeholder="John Snow"
                name="firstName"
                value={firstName}
                id="lName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="fName">Last Name</label>
              <input
                required
                type="text"
                placeholder="John Snow"
                name="secondName"
                value={lastName}
                id="fName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="auth-field">
            <label htmlFor="email">Email Address</label>
            <input
              required
              type="email"
              placeholder="user@email.com"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                required
                type={!eye ? "text" : "password"}
                placeholder="**************"
                name="password"
                id="password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {eye ? (
                <VisibilityOutlinedIcon className="on" onClick={eyeHandler} />
              ) : (
                <VisibilityOffOutlinedIcon
                  className="off"
                  onClick={eyeHandler}
                />
              )}
            </div>
          </div>

          <label htmlFor="remember">
            <input type="checkbox" name="remember" required id="remember" />I
            accept all Terms &amp; Conditions
          </label>
          <button className="btn-auth">SignUp</button>
        </form>
        <p className="redirection">
          Already have an account
          <Link to="/login" className="signUp">
            Login!
          </Link>
        </p>
      </div>
    </main>
  );
};
