import React, { useState } from "react";
import api from "../../../api/index";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

import {
  faGoogle,
  faApple,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const { role } = response.data;
      // const role = response.data.role

      login(role);

      // Redirect based on user role
      switch (role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "client":
          navigate("/client/dashboard");
          break;
        case "worker":
          navigate("/worker/dashboard");
          break;
        default:
          console.error("Unknown user role:", role);
          break;
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="authenticate-users-container">
        <div className="details">
          <h1 className="large-detailss">Welcome to Fix & Fresh</h1>
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
          <span className="alternative-authentication-span">
            <Link to={"/register"} className="alternative-authentication-span">
              Sign up
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
