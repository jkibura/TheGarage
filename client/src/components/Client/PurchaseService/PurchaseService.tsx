import React, { useEffect, useState } from "react";
import "./PurchaseService.css";
import API from "../../../api/index";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const PurchaseService: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [additionalParts, setAdditionalParts] = useState<string>("");
  const [numberPlate, setNumberPlate] = useState<string>("");
  const [openAdditionalInformation, setOpenAdditionalInformation] = useState<
    string | null
  >(null);
  const [openPaymentOption, setOpenPaymentOption] = useState<string | null>(
    null
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [couponCode, setCouponCode] = useState<string>("");
  const [visaDetails, setVisaDetails] = useState<string>("");
  const [mastercardDetails, setMastercardDetails] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await API.get(`/client/purchase/${serviceId}`);
        setService(response.data);
      } catch (error) {
        console.error("Error purchasing service:", error);
      }
    };

    fetchService();
  }, [serviceId]);

  const handlePurchase = async () => {
    if (!additionalParts || !numberPlate || !startDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const partsArray = additionalParts.split(",").map((part) => part.trim());
    try {
      await API.post(`/client/purchase/${serviceId}`, {
        additionalParts: partsArray,
        numberPlate: numberPlate,
        timeOfService: startDate,
      });
      alert("Service purchased successfully!");
      navigate("/client/dashboard");
    } catch (error) {
      console.error("Error purchasing service:", error);
    }
  };

  const togglePaymentOption = (method: string) => {
    setOpenPaymentOption(openPaymentOption === method ? null : method);
  };
  const closePaymentOption = () => {
    setOpenPaymentOption(null);
  };

  const toggleAdditionalInformation = (method: string) => {
    setOpenAdditionalInformation(
      openAdditionalInformation === method ? null : method
    );
  };

  const closeAdditionalInformation = () => {
    setOpenAdditionalInformation(null);
  };

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const isFormValid = () => {
    return additionalParts && numberPlate && startDate;
  };

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="purchase">
      <h1>Purchase Service</h1>
      <div className="purchase-item">
        <div className="purchase-details">
          <img
            src={`${service.image}`}
            alt={service.name}
            className="service-image"
          />
          <div className="purchase-content">
            <div className="category">{service.name}</div>
            <div className="title">{service.description}</div>
            <div className="price">{service.price} KSH</div>
          </div>
        </div>
      </div>
      <div className="purchase-container">
        <div>
          <div className="purchase-methods-h3">
            <h3>Additional Information</h3>
          </div>
          <div className="purchase-method">
            <div
              className="purchase-method-name"
              onClick={() => toggleAdditionalInformation("PARTS")}
            >
              <p>Enter Additional Parts that your car came with</p>
              <FontAwesomeIcon
                onClick={closeAdditionalInformation}
                icon={
                  openAdditionalInformation === "PARTS"
                    ? faChevronUp
                    : faChevronDown
                }
              />
            </div>
            {openAdditionalInformation === "PARTS" && (
              <div
                className="purchase-additional-input"
                onClick={stopPropagation}
              >
                <input
                  type="text"
                  value={additionalParts}
                  onChange={(e) => setAdditionalParts(e.target.value)}
                  placeholder="Enter additional parts (comma separated)"
                  className="purchase-input"
                />
              </div>
            )}
          </div>

          <div className="purchase-method">
            <div
              className="purchase-method-name"
              onClick={() => toggleAdditionalInformation("NUMBERPLATE")}
            >
              <p>Enter Car Number Plate</p>
              <FontAwesomeIcon
                onClick={closeAdditionalInformation}
                icon={
                  openAdditionalInformation === "NUMBERPLATE"
                    ? faChevronUp
                    : faChevronDown
                }
              />
            </div>
            {openAdditionalInformation === "NUMBERPLATE" && (
              <div
                className="purchase-additional-input"
                onClick={stopPropagation}
              >
                <input
                  type="text"
                  value={numberPlate}
                  onChange={(e) => setNumberPlate(e.target.value)}
                  placeholder="Enter Car Number Plate"
                  className="purchase-input"
                />
              </div>
            )}
          </div>

          <div className="purchase-method">
            <div
              className="purchase-method-name"
              onClick={() => toggleAdditionalInformation("TIME")}
            >
              <p>When will the car arrive for service?</p>
              <FontAwesomeIcon
                onClick={closeAdditionalInformation}
                icon={
                  openAdditionalInformation === "TIME"
                    ? faChevronUp
                    : faChevronDown
                }
              />
            </div>
            {openAdditionalInformation === "TIME" && (
              <div
                className="purchase-additional-input"
                onClick={stopPropagation}
              >
                <DatePicker
                  id="date-picker-input"
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Select a date and time"
                  timeIntervals={15}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="purchase-methods">
        <div className="purchase-methods-h3">
          <h3>Choose your payment method</h3>
        </div>
        <div
          className="purchase-method"
          onClick={() => togglePaymentOption("MPESA")}
        >
          <div className="purchase-method-name">
            <p>MPESA</p>{" "}
            <FontAwesomeIcon
              onClick={closePaymentOption}
              icon={openPaymentOption === "MPESA" ? faChevronUp : faChevronDown}
            />
          </div>{" "}
          {openPaymentOption === "MPESA" && (
            <div className="payment-details" onClick={stopPropagation}>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="purchase-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          )}
        </div>
        <div
          className="purchase-method"
          onClick={() => togglePaymentOption("COUPON")}
        >
          <div className="purchase-method-name">
            <p>COUPON</p>
            <FontAwesomeIcon
              onClick={closePaymentOption}
              icon={
                openPaymentOption === "COUPON" ? faChevronUp : faChevronDown
              }
            />
          </div>
          {openPaymentOption === "COUPON" && (
            <div className="payment-details" onClick={stopPropagation}>
              <input
                type="text"
                placeholder="Enter your coupon code"
                className="purchase-input"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>
          )}
        </div>
        <div
          className="purchase-method"
          onClick={() => togglePaymentOption("VISA")}
        >
          <div className="purchase-method-name">
            <p>VISA</p>{" "}
            <FontAwesomeIcon
              onClick={closePaymentOption}
              icon={openPaymentOption === "VISA" ? faChevronUp : faChevronDown}
            />
          </div>
          {openPaymentOption === "VISA" && (
            <div className="payment-details" onClick={stopPropagation}>
              <input
                type="text"
                placeholder="Enter your visa card details"
                className="purchase-input"
                value={visaDetails}
                onChange={(e) => setVisaDetails(e.target.value)}
              />
            </div>
          )}
        </div>
        <div
          className="purchase-method"
          onClick={() => togglePaymentOption("MASTERCARD")}
        >
          <div className="purchase-method-name">
            <p>MASTERCARD</p>{" "}
            <FontAwesomeIcon
              onClick={closePaymentOption}
              icon={
                openPaymentOption === "MASTERCARD" ? faChevronUp : faChevronDown
              }
            />
          </div>
          {openPaymentOption === "MASTERCARD" && (
            <div className="payment-details" onClick={stopPropagation}>
              <input
                type="text"
                placeholder="Enter your mastercard details"
                className="purchase-input"
                value={mastercardDetails}
                onChange={(e) => setMastercardDetails(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="purchase-summary">
        <div className="purchase-summary-item">
          <span className="purchase-summary-label">Item (1)</span>
          <span className="purchase-summary-value">{service.price} KSH</span>
        </div>
        <div className="purchase-summary-item">
          <span className="purchase-summary-label">Delivery</span>
          <span className="purchase-summary-value free">Free</span>
        </div>
        <div className="purchase-summary-item">
          <span className="purchase-summary-label">Tax*</span>
          <span className="purchase-summary-value">0 KSH</span>
        </div>
        <div className="purchase-summary-total">
          <span className="purchase-summary-total-label">Purchase total</span>
          <span className="purchase-summary-total-value">
            {service.price} KSH
          </span>
        </div>
        <button
          className="purchase-summary-button"
          onClick={handlePurchase}
          disabled={!isFormValid()}
        >
          Confirm and pay
        </button>
      </div>
    </div>
  );
};

export default PurchaseService;
