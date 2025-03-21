import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SplashScreenn.css";
import "../styles/Partners.css";
import SplashScreen from "./SplashScreen";
import partnersImage from "../assets/imgnew/mobilopoly screen 3.jpg"; 
import logoImage from "../assets/images/dealgrabber1bg.png";
import SplashScreenPartners from "./SplashScreenPartners";

const PartnersSplash = () => {
  const navigate = useNavigate();
  const [showSplashScreen, setShowSplashScreen] = useState(true);


  useEffect(() => {
      const timer = setTimeout(() => {
        setShowSplashScreen(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }, []);
    
  
    if(showSplashScreen){
      return <SplashScreenPartners/>
    }

  return (
    <>
      <div className="partnerbtn">
        <button onClick={() => navigate("/foodopoly")}>Urban Eats</button>
        <button onClick={() => navigate("/shopch")}>Shop CHI</button>
        <button onClick={() => navigate("/partnerlocalopoly")}>Localopoly</button>
      </div>
    </>
  );
};

export default PartnersSplash;
