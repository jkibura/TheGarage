import React, { useState, useEffect } from "react";
import API from "../../../api/index";
import { useOrders } from "../../../context/OrderContext";
import { Link } from "react-router-dom";

interface Worker {
  _id: string;
  username: string;
}

const ManageOrders: React.FC = () => {
  const { orders, fetchOrders } = useOrders();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>("");
  const [selectedWorker, setSelectedWorker] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const workersResponse = await API.get("/admin/workers");

        if (Array.isArray(workersResponse.data.workers)) {
          setWorkers(workersResponse.data.workers);
        } else {
          console.error(
            "Expected an array for workers response data:",
            workersResponse.data
          );
        }
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, []);

  const handleAllocateOrder = async () => {
    try {
      await API.post("/admin/allocatejob", {
        orderId: selectedOrder,
        workerId: selectedWorker,
      });
      alert("Order allocated to worker successfully!");
      fetchOrders(); // Refresh orders after allocation
    } catch (error) {
      console.error("Error allocating order:", error);
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
      <div className="admin">
        <h1>Manage Orders</h1>
        <div className="admin-form">
          <div>
            <label>Order:</label>
            <select
              value={selectedOrder}
              onChange={(e) => setSelectedOrder(e.target.value)}
            >
              <option value="">Select an order</option>
              {orders.map((order) => {
                if (!order || !order.serviceId || !order.clientId) {
                  return null; // Skip this order if it is null or its properties are undefined
                }
                return (
                  <option key={order._id} value={order._id}>
                    {order.serviceId.name} - {order.clientId.username}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Worker:</label>
            <select
              value={selectedWorker}
              onChange={(e) => setSelectedWorker(e.target.value)}
            >
              <option value="">Select a worker</option>
              {workers.map((worker) => (
                <option key={worker._id} value={worker._id}>
                  {worker.username}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAllocateOrder}>Allocate Order</button>
        </div>
      </div>
    </>
  );
};

export default ManageOrders;
