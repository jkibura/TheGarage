import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      
      <Link to="/"><span className="material-symbols-outlined">home</span>Go Home</Link>
      <div>also, Anguka nayo 🕺🏾</div>
    </div>
  );
};

export default NotFound;
