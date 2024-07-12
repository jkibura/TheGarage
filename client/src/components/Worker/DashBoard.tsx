/* import React from "react";
import { useOrders } from "../../context/OrderContext";
import API from "../../api/index";

const WorkerDashboard: React.FC = () => {
  const { orders, fetchOrders } = useOrders();

  const updateJobStatus = async (jobId: string, status: string) => {
    try {
      await API.put(`/workers/orders/${jobId}/status`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const handleStatusChange = (jobId: string, status: string) => {
    updateJobStatus(jobId, status);
  };

  return (
    <div className="worker">
      <h1>Worker Dashboard</h1>
      <div>
        {Array.isArray(orders) && orders.length === 0 ? (
          <p>No jobs assigned</p>
        ) : (
          Array.isArray(orders) &&
          orders.map((order) => (
            <div key={order._id}>
              <p>Service: {order.serviceId.name}</p>
              <p>Client: {order.clientId.username}</p>
              <p>Status: {order.status}</p>
              <button
                onClick={() => handleStatusChange(order._id, "completed")}
              >
                Mark as Completed
              </button>
              <button
                onClick={() => handleStatusChange(order._id, "in progress")}
              >
                Mark as In Progress
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;
 */

import React from "react";
import { useOrders } from "../../context/OrderContext";
import API from "../../api/index";

const WorkerDashboard: React.FC = () => {
  const { orders, fetchOrders } = useOrders();

  const updateJobStatus = async (jobId: string, status: string) => {
    try {
      await API.put(`/workers/orders/${jobId}/status`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const handleStatusChange = (jobId: string, status: string) => {
    updateJobStatus(jobId, status);
  };

  return (
    <div className="worker">
      <h1>Worker Dashboard</h1>
      <div>
        {Array.isArray(orders) && orders.length === 0 ? (
          <p>No jobs assigned</p>
        ) : (
          Array.isArray(orders) &&
          orders.map((order) => (
            <div key={order._id}>
              <p>
                Service:{" "}
                {order.serviceId
                  ? order.serviceId.name
                  : "Service not specified"}
              </p>
              <p>
                Client:{" "}
                {order.clientId
                  ? order.clientId.username
                  : "Client not specified"}
              </p>
              <p>Status: {order.status}</p>
              <button
                onClick={() => handleStatusChange(order._id, "completed")}
              >
                Mark as Completed
              </button>
              <button
                onClick={() => handleStatusChange(order._id, "in progress")}
              >
                Mark as In Progress
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;
