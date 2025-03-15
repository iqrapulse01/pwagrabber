import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Email: support@urbaneats.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Foodie Street, City, Country</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;