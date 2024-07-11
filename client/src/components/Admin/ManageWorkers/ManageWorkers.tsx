import React, { useState, useEffect } from "react";
import API from "../../../api/index";
import { useAuth } from "../../../context/AuthContext";
import "./ManageWorkers.css";

interface Worker {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const ManageWorkers: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const { role } = useAuth();

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
    <div>
      <h1>Manage Workers</h1>
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
  );
};

export default ManageWorkers;
