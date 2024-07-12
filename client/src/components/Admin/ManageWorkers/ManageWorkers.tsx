import React, { useState, useEffect } from "react";
import API from "../../../api/index";
import { useAuth } from "../../../context/AuthContext";
import "./ManageWorkers.css";
import { Link } from "react-router-dom";

interface Worker {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const ManageWorkers: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const { role } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await API.get("/admin/workers");
        setWorkers(response.data.workers);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    if (role === "admin") {
      fetchWorkers();
    }
  }, [role]);

  const deleteWorker = async (workerId: string) => {
    try {
      await API.delete(`admin/workers/${workerId}`);
      setWorkers(workers.filter((worker) => worker._id !== workerId));
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };

  if (role !== "admin") {
    return <div>Access denied</div>;
  }

  return (
    <>
      <div className="admin-dashboard">
        <div className="top-buttons">
          <button className="toggle-btn" onClick={handleToggleSidebar}>
            {isSidebarOpen ? "X" : "☰"}
          </button>
        </div>
        <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <ul>
            <li className="admin-links">
              <Link to={"/admin/vieworders"}>View Orders</Link>
            </li>
            <li className="admin-links">
              <Link to={"/admin/manageorders"}>Manage Orders</Link>
            </li>
            <li className="admin-links">
              <Link to={"/admin/manageworkers"}>Manage Workers</Link>
            </li>
            <li className="admin-links">
              <Link to={"/admin/createworkersaccounts"}>Add New Workers</Link>
            </li>
            <li className="admin-links">
              <Link to={"/admin/addnewservices"}>Add New Services</Link>
            </li>
            <li className="admin-links">
              <Link to={"/admin/addnewspares"}>Add New Spares</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h1 className="manage-workers-h1">Manage Workers</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => (
                <tr key={worker._id}>
                  <td>{worker.username}</td>
                  <td>{worker.email}</td>
                  <td>
                    <button
                      onClick={() => deleteWorker(worker._id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageWorkers;
