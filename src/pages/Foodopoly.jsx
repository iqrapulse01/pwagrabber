import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Foodopogy.css";
import logoImage from "../assets/images/foodopoly.png";

const Foodopoly = () => {
  const navigate = useNavigate(); 

  const visitLink = () => {
    window.location.href = "https://www.UrbanEats.directory";
  };

  return (
    <div className="Foodopoly">
      <img src={logoImage} alt="Foodopoly Logo" className="foodopoly-logo" />
      <h1>Foodopoly</h1>
      <p>
        Experience Foodopoly, where every meal transforms into an exciting
        culinary adventure filled with exclusive rewards. Engage in fun
        challenges, collect tokens, and unlock mouthwatering deals at your
        favorite local restaurants.
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
