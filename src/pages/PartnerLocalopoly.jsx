import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Foodopogy.css";
import logoImage from "../assets/images/localopolylogo.png";

const Partnerlocalopoly = () => {

  const navigate = useNavigate(); 
  const visitLink = ()=> {
    window.location.href = 'https://13-1-localopoly.vercel.app/the-localopoly-ecosystem.html';
  }
  return (
    <div className="Foodopoly">
      <img src={logoImage} alt="Mobilopoly Logo" className="foodopoly-logo" />
      <h1>Localopoly</h1>
      <p>The Ultimate Local Business & Rewards Ecosystem. Localopoly is an innovative, gamified platform designed to supercharge local commerce while rewarding customers for shopping, dining, and engaging with their communities.</p>
      <div className="button-container">
        <button className="claim-deal-button" onClick={() => navigate("/Partners")}>
          Back
        </button>
        <button className="claim-deal-button" onClick={visitLink}>
          Visit
        </button>
      </div>
    </div>
  );
};

export default Partnerlocalopoly;