import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import API from "../api/index";
import { useAuth } from "./AuthContext";

interface Order {
  _id: string;
  serviceId: { name: string };
  clientId: { username: string };
  status: string;
  assignedWorker?: { username: string };
  additionalParts: string[];
  numberPlate: string;
  timeOfService: Date;
  createdAt: string;
}

interface OrdersContextType {
  orders: Order[];
  fetchOrders: () => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const OrdersContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { role } = useAuth();
  const fetchOrders = async () => {
    try {
      let response;
      if (role === "admin") {
        response = await API.get("/admin/orders");
      } else if (role === "client") {
        response = await API.get("/client/orders");
      } else if (role === "worker") {
        response = await API.get(`/workers/orders/assigned`);
      }
      console.log("API Response:", response?.data);
      if (response && Array.isArray(response?.data)) {
        setOrders(response.data);
      } else {
        setOrders([]); // Ensure it's always an array
      }
      setOrders(response?.data ?? []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (role) {
      fetchOrders();
      const intervalId = setInterval(fetchOrders, 5000); // Poll every 5 seconds
      return () => clearInterval(intervalId);
    }
  }, [role]);

  return (
    <OrdersContext.Provider value={{ orders, fetchOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};

export default OrdersContextProvider;
