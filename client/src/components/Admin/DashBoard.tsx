import React, { useState } from "react";
import "./DashBoard.css";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="admin-dashboard">
        <h1 className="admin-dashboard-h1">Welcome to the Admin Dashboard</h1>
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
    </>
  );
};

export default AdminDashboard;
