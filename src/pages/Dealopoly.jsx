import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SplashScreenn.css";
import { auth } from "../utils/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import dealopolyImage from "../assets/images/young-man.jpg"; // Placeholder Image
import { Link } from "react-router-dom";
import SplashScreenDealPages from "./SplashScreenDealPages";


import "../styles/DealDynasty.css";

const DealopolySplash = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [flipped, setFlipped] = useState(null);

  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplashScreen) {
    return <SplashScreenDealPages dealopoly={true} />;
  }

  return (
    <div className="super-savers-wrapper">
      <h1 className="headline">
        <span>"3S"</span> Super Savers Squad:
        <br />
        <span>Level Up Your Discount Game</span>
      </h1>

      <p className="intro-text">
        Join the <strong>"3S"</strong> to unlock deeper-than-ever discounts, AI-powered
        personalization, and VIP-only Power Moves.
      </p>

      <div className="tiers-container">
        {["free", "pro", "vip"].map((tier) => (
          <div
            key={tier}
            className={`tier-card ${flipped === tier ? "flipped" : ""}`}
            onClick={() => setFlipped(flipped === tier ? null : tier)}
          >
            <div className="card-inner">
              <div className="card-front">
                <h2>
                  {tier === "free" && "Free Member"}
                  {tier === "pro" && "Pro Saver"}
                  {tier === "vip" && "VIP Inner Circle"} <br />
                  {tier !== "free" && <span>{tier === "pro" ? "$9.99" : "$19.99"}/month</span>}
                </h2>
              </div>
              <div className="card-back">
                <ul>
                  {tier === "free" && <li>Access 5+ curated vouchers monthly (20-30% off).</li>}
                  {tier === "pro" && (
                    <>
                      <li>40-60% off trending restaurants & events.</li>
                      <li>Early access to deals.</li>
                      <li>Stack discounts with friends.</li>
                    </>
                  )}
                  {tier === "vip" && (
                    <>
                      <li>Free premium experiences.</li>
                      <li>All Pro perks + priority support.</li>
                      <li>Surprise "mystery vouchers".</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="note">
        No spam—just hyper-relevant alerts via push notifications. Upgrade your savings, upgrade your life! 
        <strong className="cancellation"> No hassle Cancellation.</strong>
      </p>

      <Link to="/dealopoly-dynasty" className="create-account-link">
        Create Account
      </Link>
    </div>
  );
};

export default DealopolySplash;
