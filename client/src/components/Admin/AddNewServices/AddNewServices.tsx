import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./AddNewServices.css";

interface FormData {
  email: string;
  password: string;
  name: string;
  description: string;
  price: string;
  image: File | null;
}

const AddNewServices: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        data.append(key, formData[key as keyof FormData] as string | Blob);
      }
    }

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        navigate("/success");
      } else {
        console.error("Failed to upload service");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="authenticate-users-container">
        <div className="details">
          <h1 className="large-details">Add a new service to your website</h1>
          <h3 className="small-details">
            This service will be sold to clients
          </h3>
        </div>
        <div className="input-container">
          <div className="labels-input">
            <label className="input-labels">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="line"></div>
        </div>

        <div className="input-container">
          <div className="labels-input">
            <label className="input-labels">Description</label>
            <input
              name="description"
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="line"></div>
        </div>

        <div className="input-container">
          <div className="labels-input">
            <label className="input-labels">Price (Ksh)</label>
            <input
              name="price"
              type="text"
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="line"></div>
        </div>

        <div className="input-container">
          <div className="labels-input">
            <label className="input-labels">Image</label>
            <input
              name="image"
              type="file"
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="line"></div>
        </div>

        <button type="submit" className="sign-up-log-in-btn">
          Create a service
        </button>
      </div>
    </form>
  );
};

export default AddNewServices;
