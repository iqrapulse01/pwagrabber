import React, { useState, useEffect } from "react";
import "../styles/SplashScreen.css";
import logo from "../assets/images/dealgrabber1bg.png";
import desktopImage1 from "../assets/desktop/1.png";
import desktopImage2 from "../assets/desktop/2.png";
import desktopImage3 from "../assets/desktop/3.png";
import mobileImage1 from "../assets/mobileview/1.png";
import mobileImage2 from "../assets/mobileview/2.png";
import mobileImage3 from "../assets/mobileview/3.png";

const SplashScreen = ({ partners }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="splash-container">
      {partners ? (
        <div className="splash-images">
          <img
            src={isMobile ? mobileImage1 : desktopImage1}
            alt="Deal 1"
            className="splash-image fade-in"
          />
        </div>
      ) : (
        <div className="splash-images">
          <img
            src={isMobile ? mobileImage1 : desktopImage1}
            alt="Deal 1"
            className="splash-image fade-in"
          />
          <img
            src={isMobile ? mobileImage2 : desktopImage2}
            alt="Deal 2"
            className="splash-image fade-in"
          />
          <img
            src={isMobile ? mobileImage3 : desktopImage3}
            alt="Deal 3"
            className="splash-image fade-in"
          />
        </div>
      )}
      {partners ? (
        <div className="splash-content">
          <p className="splash-text"></p>
        </div>
      ) : (
        <div className="splash-content">
          <p className="splash-text"> 
          <img src={logo} alt="Deal Grabber Logo" className="splash-logo" />
          <br />
            Find the best deals in town!</p>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
