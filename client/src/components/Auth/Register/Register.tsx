import React, { useState } from "react";
import API from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.css";
import {
  faLock,
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import {
  faGoogle,
  faApple,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "worker" | "client">("client");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { username, email, password, role });
      console.log("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="authenticate-users-container">
        <div>
          <h1 className="large-details">Create an account</h1>
          <h3 className="small-detailss">Start your car experience with us</h3>
        </div>
        <div className="username-input-container">
          <label className="input-labels">Name </label>
          <div className="username-input-elements">
            <div className="username-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="User"
              className="username-input"
            />
          </div>
          <div className="line"></div>
        </div>

        <div className="email-input-container">
          <label className="input-labels">Email </label>
          <div className="email-input-elements">
            <div className="email-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <input
              placeholder="name@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
            />
          </div>
          <div className="line"></div>
        </div>

        <div className="password-input-container">
          <label className="input-labels">Password </label>
          <div className="password-input-elements">
            <div className="icon">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="password-input"
            />
            <div className="icon toggle-icon" onClick={toggleShowPassword}>
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={toggleShowPassword}
              />
            </div>
          </div>
          <div className="line"></div>
        </div>
        <button type="submit" className="sign-up-log-in-btn">
          Sign Up
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
          Already have an account?{" "}
          <span className="alternative-authentication-span">
            <Link to={"/login"} className="alternative-authentication-span">
              Log in
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
};

export default Register;
