import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { AuthContextProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFounds";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ClientDashboard from "./components/Client/DashBoard";
import PurchaseService from "./components/Client/PurchaseService";
import AdminDashboard from "./components/Admin/DashBoard";
import ManageOrders from "./components/Admin/ManageOrders";
import WorkerDashboard from "./components/Worker/DashBoard";
import ClientOrders from "./components/Client/ClientOrders";
import OrdersContextProvider from "./context/OrderContext";
import Navbar from "./components/Navbar/Navbar";
import ManageWorkers from "./components/Admin/ManageWorkers";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <AuthContextProvider>
          <OrdersContextProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/client/dashboard" element={<ClientDashboard />} />
              <Route
                path="/client/purchase/:serviceId"
                element={<PurchaseService />}
              />
              <Route path="/client/orders" element={<ClientOrders />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/manageorders" element={<ManageOrders />} />
              <Route path="/admin/manageworkers" element={<ManageWorkers />} />
              <Route path="/worker/dashboard" element={<WorkerDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </OrdersContextProvider>
        </AuthContextProvider>
      </Router>
    </div>
  );
};

export default App;
