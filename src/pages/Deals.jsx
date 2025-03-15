import React, { useState, useEffect } from "react";
import "../styles/Deals.css";
import { db } from "../utils/firebaseConfig"; // Ensure correct Firestore import
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SprinkleBackground = () => {
  const [sprinkles, setSprinkles] = useState([]);

  useEffect(() => {
    const generateSprinkles = () => {
      const newSprinkles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
      }));
      setSprinkles(newSprinkles);
    };

    generateSprinkles();
    const interval = setInterval(generateSprinkles, 3000); // Sprinkles regenerate every 3s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sprinkle-background">
      {sprinkles.map((sprinkle) => (
        <div
          key={sprinkle.id}
          className="sprinkle-dot"
          style={{ left: sprinkle.left, top: sprinkle.top }}
        ></div>
      ))}
    </div>
  );
};

const Deals = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const dealsCollection = collection(db, "deals");
        const dealsSnapshot = await getDocs(dealsCollection);
        const dealsList = dealsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDeals(dealsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return (
      <h1
        style={{
          textAlign: "center",
          color: "#148446",
          fontSize: "20px", // Reduced size
          WebkitTextStroke: "1px #f7faf8", // Correct camelCase
          textShadow:
            "-1px -1px 2px #039e50, -4px -4px 20px rgba(0, 0, 0, 0.2)", // 3D Text effect
        }}
      >
        Unlocking savings🔑💵!
      </h1>
    );
  }

  return (
    <>
      <SprinkleBackground /> {/* Sprinkles added here in background */}
      <div className="deals">
        <h1 className="large rise">Deals</h1>
        <h2 className="large rise">
          AI-enabled offers right at your fingertips!
        </h2>

        <div className="deal-buttons">
          {/* <button
            style={{ color: "#047028" }}
            className="deal-button"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/Guide-print-file.pdf"; 
              link.download = "Guide-print-file.pdf";
              link.target = "_blank"; 
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Deal Pages
          </button> */}

          {/* <button
            style={{ color: "#044f70" }}
            className="deal-button"
            onClick={() =>
              (window.location.href =
                "https://13-1-localopoly.vercel.app/the-localopoly-ecosystem.html")
            }
          >
            Localopoly
          </button> */}
        </div>

        <div className="deals-grid">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="deal-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/deals/${deal.id}`)}
            >
              <img src={deal.image} alt={deal.name} />
              <h3>{deal.name}</h3>
              <p>{deal.description}</p>
              <button
                className="add-to-wallet"
                onClick={() => navigate(`/deals/${deal.id}`)}
              >
                Grab Deal
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Deals;
