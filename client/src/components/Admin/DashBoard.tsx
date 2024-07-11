import React from "react";
import { useOrders } from "../../context/OrderContext";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const { orders } = useOrders();

  return (
    <div>
      <div className="admin">
        <h2><span className="material-symbols-outlined">shield-person</span>admin</h2>
        {orders.length === 0 ? (
          <p>No orders made.</p>
        ) : (
          <div className="admin-list">
            {orders.map((order) => (
              <div className='admin-list-item'key={order._id}>
                <p>Service: {order.serviceId.name}</p>
                <p>Client: {order.clientId.username}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        )}
        
      </div>
    <div className="side-btns">
      <Link to={"/admin/manageorders"}>Manage Orders</Link>
      <Link to={"/admin/manageworkers"}>Manage Workers</Link>
    </div>
  </div>
  );
};

export default AdminDashboard;
