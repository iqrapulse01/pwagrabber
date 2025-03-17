import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Foodopogy.css";
import logoImage from "../assets/images/urban-eatslogo.png";

const Foodopoly = () => {
  const navigate = useNavigate(); 

  const visitLink = () => {
    window.location.href = "https://www.UrbanEats.directory";
  };

  return (
    <div className="Foodopoly">
      <img src={logoImage} alt="Urban Eats Logo" className="foodopoly-logo" />
      <h1>Urban Eats</h1>
      <p>
      Urban Eats is here to help you explore and experience the culinary delights in your area. Our mission is to connect food lovers with their next great meal, making it easier than ever to find new favorites and rediscover beloved spots.
      </p>

      {/* Buttons wrapped in flex container */}
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

export default Foodopoly;
