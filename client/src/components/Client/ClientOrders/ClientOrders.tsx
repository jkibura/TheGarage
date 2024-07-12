import React from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../../../context/OrderContext";
import "./ClientOrders.css";

const ClientOrders: React.FC = () => {
  const { orders } = useOrders();

  return (
    <div className="client">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div className="order" key={order._id}>
              <h2>
                Service: {order.serviceId ? order.serviceId.name : "Unknown"}
              </h2>
              <p>Status: {order.status}</p>
              <p>
                Assigned Worker:{" "}
                {order.assignedWorker?.username || "Not assigned"}
              </p>
              <p>Additional Parts: {order.additionalParts.join(", ")}</p>
              <p>Ordered At: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
      <div className="down-btns">
        <Link to={"/"}>Home</Link>
        <Link to={"/client/purchase"}>Purchase</Link>
      </div>
    </div>
  );
};

export default ClientOrders;
