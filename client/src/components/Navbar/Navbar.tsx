import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-text">Garage and Carwash</h1>
      {isAuthenticated && <button onClick={handleLogout} className="logout-button"><span className="material-symbols-outlined">logout</span></button>}
    </nav>
  );
};

export default Navbar;
