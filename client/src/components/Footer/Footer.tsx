import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="footer-link-div">
          <a href="#" className="footer-link">
            SUPPORT
          </a>
        </div>
        <div className="footer-link-div">
          <a href="#" className="footer-link">
            COMPANY
          </a>
        </div>
        <div className="footer-link-div">
          <a href="#" className="footer-link">
            DEALERS
          </a>
        </div>
        <div className="footer-link-div">
          <a href="#" className="footer-link">
            BACK TO TOP
          </a>
        </div>
      </div>
      <div className="footer-social">
        <a href="#" className="footer-social-icon">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="footer-social-icon">
          <i className="fab fa-facebook-f"></i>
        </a>
      </div>
      <p className="footer-copyright">&copy; 2024 Fix & Fresh LTD</p>
    </footer>
  );
};

export default Footer;
