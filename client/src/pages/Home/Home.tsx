import React from "react";
import { Link } from "react-router-dom";
import carImage from "../../assets/img/audinew.avif";
import aboutusImage from "../../assets/img/audinew.avif";
import "./Home.css";
import getOurServicesImage from "../../assets/img/cars.webp";
import carWashCar from "../../assets/img/carwash-3.jpeg";
import Footer from "../../components/Footer/Footer";
import Features from "../../components/HomeFeatures/Features";
import SpecialOffers from "../../components/SpecialOffers/SpecialOffers";

const Home: React.FC = () => {
  return (
    <div>
      <div
        className="welcome-home"
        style={{
          backgroundImage: `url(${carImage})`,
        }}
      >
        <div className="welcome-home-description-btn">
          <p className="welcome-home-description">
            FIX & FRESH AUTO SERVICES. AN ALL CARS SPECIALIST
          </p>

          <Link to={"/register"} className="welcome-home-link">
            <button className="welcome-home-btn">SIGN UP</button>
          </Link>
        </div>
      </div>

      <div className="aboutus-section">
        <div className="aboutus-image">
          <img src={aboutusImage} alt="aboutus" />
        </div>
        <div className="aboutus-content">
          <h1 className="aboutus-h1">Welcome to FIX & FRESH AUTO!</h1>
          <p className="aboutus-p">
            We are glad to be a leading Car Garage in Kenya. We deal in almost
            every car and fulfill all your requirements for the car. Small
            things make significant changes same goes for the vehicle; if the
            small wear and tear are done timely and well-maintained, it helps
            consistency in the vehicle's performance.We facilitate Car Repair
            Kenya Service in compliance with the client's feasibility. Every
            day, we start with a clear goal in mind and strive to deliver
            quality services to our valued customers. Fix & Fresh Auto has the
            best qualified and experienced auto repair technicians. They provide
            all valuable services at a reputable Car Repair, Car Wash and Spare
            parts dealer in Kenya.
          </p>
        </div>
      </div>

      <div
        className="get-our-services"
        style={{
          backgroundImage: `url(${carWashCar})`,
        }}
      >
        <div className="get-our-services-blue">GET OUR SERVICES</div>

        <h2 className="get-our-services-h2">
          Expert Car Wash, Premium Spare Parts, and Top-Notch Servicing - All in
          one place!
        </h2>
        <p className="get-our-services-p">High customer satisfaction</p>
        <div className="static-five-stars">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className="star">
              ★
            </span>
          ))}
        </div>
        <button className="get-our-services-btn">CONTACT US</button>
      </div>
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
