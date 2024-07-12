import React from "react";
import "./SpecialOffers.css";

const SpecialOffers: React.FC = () => {
  return (
    <div className="special-offers">
      <h2>Special Offers</h2>
      <div className="offer-card">
        <h3>Minor Service</h3>
        <p>What is included in a Minor Service?</p>
        <p className="price">KES 30,000</p>
        <p>Starting From</p>
        <button className="book-now">Book Now</button>
        <ul className="offer-details">
          <li>✔ Oil with Filter replacement</li>
          <li>✔ Cleaning air & ac filter</li>
          <li>✔ Coolant brake fluid</li>
          <li>✔ Power steering fluid top-up</li>
          <li>✔ Full Inspection</li>
          <li>✔ Free car wash & Vaccuming</li>
        </ul>
      </div>
    </div>
  );
};

export default SpecialOffers;
