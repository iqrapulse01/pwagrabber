import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ClaimPrize = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { prize } = location.state || {}; // Get the prize from navigation state
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your prize (${prize}) has been claimed.`);
    navigate('/'); // Redirect back to the main page
  };

  return (
    <div className="claim-form">
      <h2>Claim Your Prize: {prize}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ClaimPrize;
