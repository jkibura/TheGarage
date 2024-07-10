import React from "react";
import { useOrders } from "../../context/OrderContext";

const ClientOrders: React.FC = () => {
  const { orders } = useOrders();

  return (
    <div>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h2>Service: {order.serviceId.name}</h2>
              <p>Status: {order.status}</p>
              <p>
                Assigned Worker:{" "}
                {order.assignedWorker?.username || "Not assigned"}
              </p>
              <p>Additional Parts: {order.additionalParts.join(", ")}</p>
              <p>Ordered At: {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientOrders;
