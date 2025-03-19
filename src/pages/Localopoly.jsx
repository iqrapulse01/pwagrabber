import "../styles/Localopoly.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SplashScreenn.css";
import image1 from "../assets/images/black-couple.jpg";
import SplashScreenDealPages from "./SplashScreenDealPages";

const Localopoly = () => {
  const navigate = useNavigate();
  
  const [showSplashScreen, setShowSplashScreen] = useState(true)


  useEffect(() => {
      const timer = setTimeout(() => {
        setShowSplashScreen(false);
        window.location.href = "https://heyzine.com/flip-book/533434d45a.html"
      }, 5000); // Show splash for 3 sec
      return () => clearTimeout(timer);
    }, []);
    
  
    if(showSplashScreen){
      return <SplashScreenDealPages/>
    }

  return (
    <div className="splash-screen">
    </div>
  );
};

export default Localopoly;