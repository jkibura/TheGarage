import React, { useState } from "react";
import { useOrders } from "../../../context/OrderContext";
import "./ViewOrders.css";
import { Link } from "react-router-dom";

const ViewOrders = () => {
  const { orders } = useOrders();
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
      <div className="view-orders">
        <h1 className="title">Client Orders</h1>
        {orders.length === 0 ? (
          <p className="no-orders">No orders made.</p>
        ) : (
          <div className="orders-container">
            {orders.map((order) => {
              if (!order || !order.serviceId || !order.clientId) {
                return null;
              }
              const statusClass = order.status.toLowerCase();
              return (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <h2 className="order-service">{order.serviceId.name}</h2>
                    <p className={`order-status ${statusClass}`}>
                      {order.status}
                    </p>
                  </div>
                  <div className="order-body">
                    <p className="order-client">
                      Client: {order.clientId.username}
                    </p>
                    <p className="order-date">
                      Date of order:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="order-date">
                      Bring at:{" "}
                      {new Date(order.timeOfService).toLocaleDateString()}{" "}
                      {new Date(order.timeOfService).toLocaleTimeString()}
                    </p>

                    <p className="order-client">
                      Number Plate: {order.numberPlate}
                    </p>
                    <p className="order-client">
                      Additional Parts: {order.additionalParts}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewOrders;
