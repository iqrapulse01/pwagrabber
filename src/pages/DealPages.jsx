import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SplashScreenn.css";
import dealPagesImage from "../assets/images/young-man.jpg";
import SplashScreenDealPages from "./SplashScreenDealPages";

const DealPagesSplash = () => {
  const navigate = useNavigate();

  const [showSplashScreen, setShowSplashScreen] = useState(true)


  useEffect(() => {
      const timer = setTimeout(() => {
        setShowSplashScreen(false);
        window.location.href = "https://heyzine.com/flip-book/8ad5f1bf4e.html"
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

export default DealPagesSplash;
