// src/DatePicker.tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Date.css";

const CustomDatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div className="date-picker-container">
      <label htmlFor="date-picker-input">When will you be starting *</label>
      <DatePicker
        id="date-picker-input"
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        dateFormat="MMMM d, yyyy"
        placeholderText="Select a date"
      />
    </div>
  );
};

export default CustomDatePicker;
