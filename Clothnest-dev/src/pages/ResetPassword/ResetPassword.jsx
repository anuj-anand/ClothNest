import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { ToastHandler } from "../../utilities/toastUtils";

export const ResetPassword = () => {
  const { resetPasswordHandler } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfrmPass, setCnfrmPass] = useState("");
  const [eye, setEye] = useState({
    password: true,
    cnfrmPass: true,
  });

  const eyeHandler = (name) => {
    if (name === "password")
      setEye((eye) => ({ ...eye, password: !eye.password }));
    else if (name === "cnfrmPass")
      setEye((eye) => ({ ...eye, cnfrmPass: !eye.cnfrmPass }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === cnfrmPass) {
      resetPasswordHandler(email, password);
    } else {
      ToastHandler("error", "Password and Confirm Password should match");
    }
  };

  return (
    <main className="auth-main">
      <div className="auth-container">
        <form
          onSubmit={(e) => submitHandler(e)}
          className="login"
          method="POST"
        >
          <h3 className="forgot-page-heading page-heading">Forgot Password</h3>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
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
                type={eye.password ? "password" : "text"}
                placeholder="*************"
                name="password"
                id="password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {eye.password ? (
                <VisibilityOutlinedIcon
                  className="on"
                  onClick={() => eyeHandler("password")}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  className="off"
                  onClick={() => eyeHandler("password")}
                />
              )}
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="cnfrmPass">Confirm Password</label>
            <div className="password-field">
              <input
                required
                type={eye.cnfrmPass ? "password" : "text"}
                placeholder="*************"
                name="password"
                id="cnfrmPass"
                minLength={8}
                value={cnfrmPass}
                onChange={(e) => setCnfrmPass(e.target.value)}
              />
              {eye.cnfrmPass ? (
                <VisibilityOutlinedIcon
                  className="on"
                  onClick={() => eyeHandler("cnfrmPass")}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  className="off"
                  onClick={() => eyeHandler("cnfrmPass")}
                />
              )}
            </div>
          </div>

          <button className="btn-auth" type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </main>
  );
};
