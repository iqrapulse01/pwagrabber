import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SplashScreenn.css";
import { auth } from "../utils/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from 'react-hot-toast';
import dealopolyImage from "../assets/images/young-man.jpg"; // Placeholder Image
import { Link } from "react-router-dom";
import SplashScreenDealPages from "./SplashScreenDealPages";

import "../styles/DealDynasty.css"

const DealopolySplash = () => {
  


  const [showSplashScreen, setShowSplashScreen] = useState(true)


  useEffect(() => {
      const timer = setTimeout(() => {
        setShowSplashScreen(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }, []);
    
  
    if(showSplashScreen){
      return <SplashScreenDealPages dealopoly={true}/>
    }



  return (

    <>
    <div className="dealDynasty-wrapper">
    <h1 className="text-center">
    "3S" Super Savers Squad: Level Up Your Discount Game
    </h1>
    <p className="dealDynasty-para">Join the "3S" to unlock deeper-than-ever discounts, AI-powered personalization, and VIP-only Power Moves.</p>
    <Link to={'/dealopoly-dynasty'}>Create Account</Link>
    </div>
    </>
  );
};

export default DealopolySplash;
