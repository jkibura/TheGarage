/* import React, { useState, useEffect } from "react";
import API from "../../api/index";
import { useAuth } from "../../context/AuthContext";

interface Job {
  _id: string;
  serviceId: { name: string };
  clientId: { username: string };
  status: string;
}

const WorkerDashboard: React.FC = () => {
  const { token } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);

  // Function to fetch jobs from the server
  const fetchJobs = async () => {
    try {
      const response = await API.get("/workers/jobs/assigned", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(response.data.orders)) {
        setJobs(response.data.orders);
      } else {
        console.error(
          "Expected an array for orders response data:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Function to update the status of a job
  const updateJobStatus = async (jobId: string, status: string) => {
    try {
      await API.put(
        `workers/jobs/${jobId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === jobId ? { ...job, status } : job))
      );
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  // Effect hook to fetch jobs when the component mounts or when token changes
  useEffect(() => {
    fetchJobs();
  }, [token]);

  // Handler for marking job as completed or in progress
  const handleStatusChange = (jobId: string, status: string) => {
    updateJobStatus(jobId, status);
  };

  return (
    <div>
      <h1>Worker Dashboard</h1>
      <ul>
        {jobs.length === 0 ? (
          <p>No jobs assigned</p>
        ) : (
          jobs.map((job) => (
            <li key={job._id}>
              <p>Service: {job.serviceId.name}</p>
              <p>Client: {job.clientId.username}</p>
              <p>Status: {job.status}</p>
              <button onClick={() => handleStatusChange(job._id, "completed")}>
                Mark as Completed
              </button>
              <button
                onClick={() => handleStatusChange(job._id, "in progress")}
              >
                Mark as In Progress
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WorkerDashboard;
 */

/* 
import React, { useState, useEffect } from "react";
import API from "../../api/index";

interface Job {
  _id: string;
  serviceId: { name: string };
  clientId: { username: string };
  status: string;
}

const WorkerDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = async () => {
    try {
      const response = await API.get("/workers/jobs/assigned");
      if (Array.isArray(response.data.orders)) {
        setJobs(response.data.orders);
      } else {
        console.error(
          "Expected an array for orders response data:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const updateJobStatus = async (jobId: string, status: string) => {
    try {
      await API.put(`workers/jobs/${jobId}/status`, { status });
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === jobId ? { ...job, status } : job))
      );
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleStatusChange = (jobId: string, status: string) => {
    updateJobStatus(jobId, status);
  };

  return (
    <div>
      <h1>Worker Dashboard</h1>
      <ul>
        {jobs.length === 0 ? (
          <p>No jobs assigned</p>
        ) : (
          jobs.map((job) => (
            <li key={job._id}>
              <p>Service: {job.serviceId.name}</p>
              <p>Client: {job.clientId.username}</p>
              <p>Status: {job.status}</p>
              <button onClick={() => handleStatusChange(job._id, "completed")}>
                Mark as Completed
              </button>
              <button
                onClick={() => handleStatusChange(job._id, "in progress")}
              >
                Mark as In Progress
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WorkerDashboard;
 */

/* import React from "react";
import { useOrders } from "../../context/OrderContext";
import API from "../../api/index";

const WorkerDashboard: React.FC = () => {
  const { orders, fetchOrders } = useOrders();

  const updateJobStatus = async (jobId: string, status: string) => {
    try {
      await API.put(`/api/workers/jobs/${jobId}/status`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const handleStatusChange = (jobId: string, status: string) => {
    updateJobStatus(jobId, status);
  };

  return (
    <div>
      <h1>Worker Dashboard</h1>
      <ul>
        {orders.length === 0 ? (
          <p>No jobs assigned</p>
        ) : (
          orders.map((job) => (
            <li key={job._id}>
              <p>Service: {job.serviceId.name}</p>
              <p>Client: {job.clientId.username}</p>
              <p>Status: {job.status}</p>
              <button onClick={() => handleStatusChange(job._id, "completed")}>
                Mark as Completed
              </button>
              <button
                onClick={() => handleStatusChange(job._id, "in progress")}
              >
                Mark as In Progress
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WorkerDashboard;
 */

/*
import React from "react";
import { useOrders } from "../../context/OrderContext";
import API from "../../api/index";

const WorkerDashboard: React.FC = () => {
  const { orders, fetchOrders } = useOrders();

  const updateJobStatus = async (jobId: string, status: string) => {
    try {
      await API.put(`/workers/jobs/${jobId}/status`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const handleStatusChange = (jobId: string, status: string) => {
    updateJobStatus(jobId, status);
  };

  return (
    <div>
      <h1>Worker Dashboard</h1>
      <ul>
        {orders.length === 0 ? (
          <p>No jobs assigned</p>
        ) : (
          orders.map((order) => (
            <li key={order._id}>
              <p>Service: {order.serviceId.name}</p>
              <p>Client: {order.clientId.username}</p>
              <p>Status: {order.status}</p>
              <button
                onClick={() => handleStatusChange(order._id, "completed")}
              >
                Mark as Completed
              </button>
              <button
                onClick={() => handleStatusChange(order._id, "in progress")}
              >
                Mark as In Progress
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WorkerDashboard;
*/

import React from "react";
import { useOrders } from "../../context/OrderContext";
import API from "../../api/index";

const WorkerDashboard: React.FC = () => {
  const { orders, fetchOrders } = useOrders();

  const updateJobStatus = async (jobId: string, status: string) => {
    try {
      await API.put(`/workers/orders/${jobId}/status`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const handleStatusChange = (jobId: string, status: string) => {
    updateJobStatus(jobId, status);
  };

  return (
    <div>
      <h1>Worker Dashboard</h1>
      <ul>
        {Array.isArray(orders) && orders.length === 0 ? (
          <p>No jobs assigned</p>
        ) : (
          Array.isArray(orders) &&
          orders.map((order) => (
            <li key={order._id}>
              <p>Service: {order.serviceId.name}</p>
              <p>Client: {order.clientId.username}</p>
              <p>Status: {order.status}</p>
              <button
                onClick={() => handleStatusChange(order._id, "completed")}
              >
                Mark as Completed
              </button>
              <button
                onClick={() => handleStatusChange(order._id, "in progress")}
              >
                Mark as In Progress
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WorkerDashboard;
