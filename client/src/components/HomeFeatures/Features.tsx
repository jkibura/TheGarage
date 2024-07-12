import React from "react";
import "./Features.css";

const features = [
  { icon: "fa-car", title: "Car Diagnostics" },
  { icon: "fa-wrench", title: "Service Progress" },
  { icon: "fa-book", title: "Service Log" },
  { icon: "fa-map-marker-alt", title: "Live Tracking" },
  { icon: "fa-exchange-alt", title: "Pick up/ Drop Off" },
  { icon: "fa-headset", title: "Online Support" },
];

const Features: React.FC = () => {
  return (
    <div className="features">
      <div className="features-header">
        <h2>OUR FEATURES</h2>
        <h3>Why Choose Us</h3>
        <p>High customer satisfaction</p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <i className={`fas ${feature.icon}`}></i>
            <p>{feature.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
