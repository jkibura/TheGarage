import React from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../api/index";
import "./ClientDashboard.css";
import audiImage from "../../../assets/img/bmw.avif";
import Footer from "../../Footer/Footer";

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface SpareParts {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ClientDashboard: React.FC = () => {
  const [services, setServices] = React.useState<Service[]>([]);
  const [spares, setSpares] = React.useState<SpareParts[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await API.get("/client/dashboard");
        console.log("Fetched services:", response.data.services);
        setServices(response.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();

    const fetchSpareParts = async () => {
      try {
        const response = await API.get("/client/dashboard");
        console.log("Fetched spare parts:", response.data.spares);
        setSpares(response.data.spares);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchSpareParts();
  }, []);

  const handlePurchase = (serviceId: string) => {
    navigate(`/client/purchase/${serviceId}`);
  };

  return (
    <>
      <header
        className="header"
        style={{
          backgroundImage: `url(${audiImage})`,
        }}
      >
        <div className="content-header">
          <p className="content-header-h1">Revitalize Your Ride With Us!</p>
        </div>
      </header>
      <div className="client">
        <h1>Client Home</h1>
        <h2 className="service-h2">Top Notch Servicing</h2>
        <div className="service-list">
          {services.map((service: any) => {
            return (
              <div className="card" key={service._id}>
                <img src={`${service.image}`} alt={service.name} />
                <div className="card-content">
                  <div className="category">{service.name}</div>
                  <div className="title">{service.description}</div>
                </div>
                <div className="card-purchase">
                  <p>{service.price} KSH</p>
                  <button onClick={() => handlePurchase(service._id)}>
                    Purchase
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="spares-h2">Premium Spare Parts</h2>
        <div className="service-list">
          {spares.map((spare: any) => {
            return (
              <div className="card" key={spare._id}>
                <img src={`${spare.image}`} alt={spare.name} />
                <div className="card-content">
                  <div className="category">{spare.name}</div>
                  <div className="title">{spare.description}</div>
                </div>
                <div className="card-purchase">
                  <p>{spare.price} KSH</p>
                  <button onClick={() => handlePurchase(spare._id)}>
                    Purchase
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="down-btns">
          <Link to={"/client/orders"}>Orders</Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientDashboard;
