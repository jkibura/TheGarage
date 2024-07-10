import React, { useState, useEffect } from "react";
import API from "../../api/index";
import { useOrders } from "../../context/OrderContext";

interface Worker {
  _id: string;
  username: string;
}

const ManageOrders: React.FC = () => {
  const { orders, fetchOrders } = useOrders();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>("");
  const [selectedWorker, setSelectedWorker] = useState<string>("");

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
    <div>
      <h1>Manage Orders</h1>
      <div>
        <label>Order:</label>
        <select
          value={selectedOrder}
          onChange={(e) => setSelectedOrder(e.target.value)}
        >
          <option value="">Select an order</option>
          {orders.map((order) => (
            <option key={order._id} value={order._id}>
              {order.serviceId.name} - {order.clientId.username}
            </option>
          ))}
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
  );
};

export default ManageOrders;
