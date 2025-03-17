import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SplashScreenn.css";
import "../styles/Partners.css";
import SplashScreen from "./SplashScreen";
import partnersImage from "../assets/imgnew/mobilopoly screen 3.jpg"; 
import logoImage from "../assets/images/dealgrabber1bg.png";

const PartnersSplash = () => {
  const navigate = useNavigate();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [fadeClass, setFadeClass] = useState(""); // Initially empty

  useEffect(() => {
    // Apply fade-in effect on mount
    setTimeout(() => {
      setFadeClass("fade-in");
    }, 10); // Small delay to ensure CSS transition applies

    // Start fade-out after 4 seconds
    const fadeOutTimer = setTimeout(() => {
      setFadeClass("fade-out");
    }, 4000); 

    // Completely remove splash screen after 5 seconds
    const removeSplashTimer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 5000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeSplashTimer);
    };
  }, []);

  if (showSplashScreen) {
    return (
      <div
        className={`splash-container ${fadeClass}`}
        style={{
          backgroundImage: `url(${partnersImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          paddingTop:"60px",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
        <SplashScreen partners={true} />
      </div>
    );
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
