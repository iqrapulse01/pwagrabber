import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Foodopogy.css";
import logoImage from "../assets/imgnew/mobilopoly.png";

const Mobilopoly = () => {

  const navigate = useNavigate(); 
  const visitLink = ()=> {
    window.location.href = 'https://shopchibiz.com/';
  }
  return (
    <div className="Foodopoly">
      <img src={logoImage} alt="Mobilopoly Logo" className="foodopoly-logo" />
      <h1>Mobilopoly</h1>
      <p>Experience Mobilopoly, where each swipe opens a dynamic world of exclusive offers and surprise deals. Engage on the go, tackle fun challenges, and score amazing rewards right from your mobile device.</p>
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

export default Mobilopoly;