import React, { useState } from "react";
import "./UserRoles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGoogle,
  faApple,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const UserRoles: React.FC = () => {
  const [role, setRole] = useState("");

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="authenticate-users-container">
        <div className="details">
          <h1 className="large-details">Welcome to Fix & Fresh</h1>
          <h3 className="small-details">Sign in to continue</h3>
        </div>

        <div className="email-input-container">
          <label className="input-labels">Email </label>
          <div className="email-input-elements">
            <div className="email-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <input
              placeholder="name@gmail.com"
              type="email"
              className="email-input"
            />
          </div>
          <div className="line"></div>
        </div>

        <div className="password-input-container">
          <label className="input-labels">Password </label>
          <div className="password-input-elements">
            <div className="icon">
              <i className="fas fa-lock"></i>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />
            <div
              className="icon toggle-icon eye-icon"
              onClick={toggleShowPassword}
            >
              <i
                className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
              ></i>
            </div>
          </div>
          <div className="line"></div>
        </div>
        <div className="forgot-password">
          <span className="forgot-password-span">Forgot password?</span>
        </div>
        <button type="submit" className="sign-up-log-in-btn">
          Log in
        </button>
        <div className="alternative-login">
          <p className="alternative-icons-or">Or</p>
          <div className="alternative-icons">
            <FontAwesomeIcon
              icon={faGoogle}
              className="alternative-icons-diff"
            />
            <FontAwesomeIcon
              icon={faApple}
              className="alternative-icons-diff"
            />
            <FontAwesomeIcon
              icon={faFacebook}
              className="alternative-icons-diff"
            />
          </div>
        </div>
        <p className="alternative-authentication">
          Don't have an account?{" "}
          <span className="alternative-authentication-span">Sign up</span>
        </p>
      </div>
    </>
  );
};

export default UserRoles;
