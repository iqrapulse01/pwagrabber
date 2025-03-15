import React from "react";
import "../styles/SplashScreen.css";
import image1 from "../assets/images/black-couple.jpg"; // Add actual image paths
import image2 from "../assets/imgnew/deal pages logo.jpg";
import image3 from "../assets/newedit/dealpageslogo.png";

const SplashScreenDealPages = ({dealopoly}) => {
  return (
      <div className="splash-container">
        <div className="splash-images">
         {dealopoly ? <img src={image2} alt="Deal 3" className="splash-image fade-in" />: <img src={image3} alt="Deal 2" className="splash-image fade-in" />}
        </div>
        {/* <div className="splash-content">
          {dealopoly ? <p className="splash-text">Dealopoly page is loading...!</p> : <p className="splash-text">You are about to redirected from here to deal pages flipbook!</p> }
        </div> */}
      </div>
    );
}

export default SplashScreenDealPages