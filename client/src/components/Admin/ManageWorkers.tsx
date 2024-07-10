import React, { useState, useEffect } from "react";
import API from "../../api/index";
import { useAuth } from "../../context/AuthContext";

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
      <ul>
        {workers.map((worker) => (
          <li key={worker._id}>
            <p>Username: {worker.username}</p>
            <p>Email: {worker.email}</p>
            <button onClick={() => deleteWorker(worker._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageWorkers;
