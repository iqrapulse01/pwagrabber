import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SplashScreenn.css";
import { auth } from "../utils/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from 'react-hot-toast';
import dealopolyImage from "../assets/images/young-man.jpg"; // Placeholder Image
import { Link } from "react-router-dom";
import SplashScreenDealPages from "./SplashScreenDealPages";

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
    <h1>
      Hello
    </h1>
    <Link to={'/dealopoly-dynasty'}>Create Account</Link>
    </>
  );
};

export default DealopolySplash;
