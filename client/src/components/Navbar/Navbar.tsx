import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-text">Fix & Fresh</h1>
      <div className="login-logout">
        <Link to={"/"}>
          <FontAwesomeIcon
            icon={faHome}
            size="2x"
            className="fa-home-icon-nav"
          />
        </Link>
        {role === "client" && (
          <div>
            <Link to={"/client/orders"} className="orders">
              Orders
            </Link>
          </div>
        )}
        {!isAuthenticated && (
          <Link to={"/login"} className="login">
            Login
          </Link>
        )}

        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-button">
            <span className="material-symbols-outlined">logout</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
