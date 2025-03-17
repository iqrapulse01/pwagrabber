import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Foodopogy.css";
import logoImage from "../assets/images/shopchilogo.png";

const ShopCh = () => {

  const navigate = useNavigate(); 
  const visitLink = ()=> {
    window.location.href = 'https://shopchibiz.com/';
  }
  return (
    <div className="Foodopoly">
      <br /><br />
      <img src={logoImage} alt="Shop Chi Logo" className="foodopoly-logo" />
      {/* <h1>Shop CHI</h1> */}
      <p>ShopChiBiz.com, your premier local business directory dedicated to celebrating and supporting the dynamic businesses of Chicago. Our mission is to connect consumers with the diverse array of local businesses that make Chicago one of the most vibrant cities in the world, fostering community growth and encouraging the support of our local economy.</p>
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

export default ShopCh;