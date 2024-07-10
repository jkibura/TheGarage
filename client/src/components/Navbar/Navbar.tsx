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
    <nav>
      <h1>Garage and Carwash</h1>
      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
