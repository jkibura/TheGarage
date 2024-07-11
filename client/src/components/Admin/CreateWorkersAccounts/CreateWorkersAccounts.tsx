import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api/index";
import "./CreateWorkersAccounts.css";

const CreateWorkersAccounts = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", {
        username,
        email,
        password,
        role: "worker",
      });
      console.log("Worker registration successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="authenticate-users-container">
        <div className="details">
          <h1 className="large-details">Create an account for your employee</h1>
          <h3 className="small-details">Enter employee details</h3>
        </div>
        <div className="username-input-container">
          <label className="input-labels">Name </label>
          <div className="username-input-elements">
            <div className="username-icon">
              <i className="fas fa-user"></i>
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
              <i className="fas fa-envelope"></i>
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
              <i className="fas fa-lock"></i>
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
              <i
                className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
              ></i>
            </div>
          </div>
          <div className="line"></div>
        </div>
        <button type="submit" className="sign-up-log-in-btn">
          Create Worker
        </button>
      </div>
    </form>
  );
};

export default CreateWorkersAccounts;
