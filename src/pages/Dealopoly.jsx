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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors
    const loadingSignup = toast.loading("Creating your account");
    // Validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully! You can login now", {id: loadingSignup});
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login")
    } catch (err) {
      setError(err.message);
      toast.error("Signup failed! " + err.message, {id: loadingSignup});
    }
  };


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
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create an Account</h2>
        <p className="auth-subtitle">Join us to get started</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="auth-input"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="auth-input"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="auth-input"
            />
          </div>
          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>
        <div className="auth-options">
          <p className="auth-switch">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default DealopolySplash;
