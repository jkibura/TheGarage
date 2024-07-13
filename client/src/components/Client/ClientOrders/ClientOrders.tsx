import React from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../../../context/OrderContext";
import "./ClientOrders.css";

const ClientOrders: React.FC = () => {
  const { orders } = useOrders();

  return (
    <div className="client">
      <h1 className="page-h1">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => {
            const statusClasss = order.status.toLowerCase()
            return (
             
            <div className="order" key={order._id}>
              <div className="order-info">
                <h2>
                  Service: {order.serviceId ? order.serviceId.name : "Unknown"}
                </h2>
                <p className={`order-status ${statusClasss}`}>{order.status}</p>
              </div>
              <p>
                Assigned Worker:{" "}
                {order.assignedWorker?.username || "Not assigned"}
              </p>
              <p>Additional Parts: {order.additionalParts.join(", ")}</p>
              <p>Ordered At: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            )
              })}
        </div>
      )}

    </div>
  );
};

export default ClientOrders;
