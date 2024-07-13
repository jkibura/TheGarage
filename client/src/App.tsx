import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { AuthContextProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFounds";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import ClientDashboard from "./components/Client/ClientDashboard/ClientDashboard";
import PurchaseService from "./components/Client/PurchaseService/PurchaseService";
import AdminDashboard from "./components/Admin/DashBoard";
import ManageOrders from "./components/Admin/ManageOrders/ManageOrders";
import WorkerDashboard from "./components/Worker/DashBoard";
import ClientOrders from "./components/Client/ClientOrders/ClientOrders";
import OrdersContextProvider from "./context/OrderContext";
import Navbar from "./components/Navbar/Navbar";
import ManageWorkers from "./components/Admin/ManageWorkers/ManageWorkers";
import UserRoles from "./components/UserRoles/UserRoles";
import CreateWorkersAccounts from "./components/Admin/CreateWorkersAccounts/CreateWorkersAccounts";
import AddNewServices from "./components/Admin/AddNewServices/AddNewServices";
import ViewOrders from "./components/Admin/ViewOrders/ViewOrders";
import AddNewSpares from "./components/Admin/AddNewSpares/AddNewSpares";

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
              <Route path="/admin/vieworders" element={<ViewOrders />} />
              <Route path="/admin/manageorders" element={<ManageOrders />} />
              <Route path="/admin/manageworkers" element={<ManageWorkers />} />
              <Route
                path="/admin/addnewservices"
                element={<AddNewServices />}
              />
              <Route path="/admin/addnewspares" element={<AddNewSpares />} />
              <Route
                path="/admin/createworkersaccounts"
                element={<CreateWorkersAccounts />}
              />
              <Route path="/worker/dashboard" element={<WorkerDashboard />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/userroles" element={<UserRoles />} />
            </Routes>
          </OrdersContextProvider>
        </AuthContextProvider>
      </Router>
    </div>
  );
};

export default App;
