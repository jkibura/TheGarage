import React from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";

const ClientDashboard: React.FC = () => {
  const [services, setServices] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await API.get("/client/dashboard");
        setServices(response.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handlePurchase = (serviceId: string) => {
    navigate(`/client/purchase/${serviceId}`);
  };

  return (
    <div>
      <h1>Client Dashboard</h1>
      <ul>
        {services.map((service: any) => (
          <li key={service._id}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <p>{service.price} KSH</p>
            <button onClick={() => handlePurchase(service._id)}>
              Purchase
            </button>
          </li>
        ))}
      </ul>
      <Link to={"/client/orders"}>View Your Orders</Link>
    </div>
  );
};

export default ClientDashboard;
