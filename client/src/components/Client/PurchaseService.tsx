import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/index";

const PurchaseService: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [additionalParts, setAdditionalParts] = useState<string>("");
  const navigate = useNavigate();

  const handlePurchase = async () => {
    const partsArray = additionalParts.split(",").map((part) => part.trim());
    try {
      await API.post(`/client/purchase/${serviceId}`, {
        additionalParts: partsArray,
      });
      alert("Service purchased successfully!");
      navigate("/client/dashboard");
    } catch (error) {
      console.error("Error purchasing service:", error);
    }
  };

  return (
    <div className="purchase-container">
      <h1>Purchase Service</h1>
      <div>
        <label className="purchase-label">Additional Parts:</label>
        <input
          type="text"
          value={additionalParts}
          onChange={(e) => setAdditionalParts(e.target.value)}
          placeholder="Enter additional parts (comma separated)"
          className="purchase-input"
        />
      </div>
      <button onClick={handlePurchase}>Purchase</button>
    </div>
  );
};

export default PurchaseService;
