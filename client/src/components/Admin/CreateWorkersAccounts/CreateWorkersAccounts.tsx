import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../api/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CreateWorkersAccounts.css";
import {
  faLock,
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const CreateWorkersAccounts = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    <>
      <div className="admin-dashboard">
        <div className="top-buttons">
          <button className="toggle-btn" onClick={handleToggleSidebar}>
            {isSidebarOpen ? "X" : "☰"}
          </button>
        </div>
        <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <ul>
            <li className="admin-links">
              <Link to={"/admin/vieworders"}>View Orders</Link>
            </li>
            <li className="admin-links">
              <Link to={"/admin/manageorders"}>Manage Orders</Link>
            </li>
            <li className="admin-links">
              <Link to={"/admin/manageworkers"}>Manage Workers</Link>
            </li>
            <li className="admin-links">
              <Link to={"/admin/createworkersaccounts"}>Add New Workers</Link>
            </li>
            <li className="admin-links">
              <Link to={"/admin/addnewservices"}>Add New Services</Link>
            </li>
            <li className="admin-links">
              <Link to={"/admin/addnewspares"}>Add New Spares</Link>
            </li>
          </ul>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="authenticate-users-container">
          <div className="details">
            <h1 className="large-details">
              Create an account for your employee
            </h1>
            <h3 className="small-details">Enter employee details</h3>
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
    </>
  );
};

export default CreateWorkersAccounts;
