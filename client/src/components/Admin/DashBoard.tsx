import React from "react";
import { useOrders } from "../../context/OrderContext";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const { orders } = useOrders();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {orders.length === 0 ? (
        <p>No orders made.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Service: {order.serviceId.name}</p>
              <p>Client: {order.clientId.username}</p>
              <p>Status: {order.status}</p>
            </li>
          ))}
        </ul>
      )}
      <Link to={"/admin/manageorders"}>Manage Orders</Link>
      <Link to={"/admin/manageworkers"}>Manage Workers</Link>
    </div>
  );
};

export default AdminDashboard;
