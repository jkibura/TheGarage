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
    <div className="client">
      <h2>Client Dashboard</h2>
      <div className="service-list">
        {services.map((service: any) => (
          <div className="service" key={service._id}>
            <img src={service.image} alt={service.name} />
            <div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>{service.price} KSH</p>
            </div>
            <button onClick={() => handlePurchase(service._id)}>
                Purchase
            </button>
              
          </div>
        ))}
      </div>
      <div className="down-btns">
        <Link to={"/"}>Home</Link>
        <Link to={"/client/orders"}>Orders</Link>
      </div>
    </div>
  );
};

export default ClientDashboard;
