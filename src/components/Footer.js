import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
          <h3>Bajaj Insurance</h3>
          <p>Providing the best insurance solutions across India</p>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-list">
            <li>
              <FaPhone /> 1800-200-200
            </li>
            <li>
              <FaEnvelope /> support@bajajinsurance.com
            </li>
            <li>
              <FaMapMarkerAlt /> Bajaj House, Jorhat, India
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="quick-links">
            <li><a href="/">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>@BajajInsurance</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Bajaj Insurance. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
