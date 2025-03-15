import React, { useEffect, useState } from "react";
import "../styles/About.css";

const About = () => {
  const [step, setStep] = useState(0); // 0 = initial, 1 = flipped, 2 = sprinkle

  useEffect(() => {
    const flipTimeout = setTimeout(() => {
      setStep(1); // Flip after 1 second
    }, 1000);

    const sprinkleTimeout = setTimeout(() => {
      setStep(2); // Start sprinkles after flip is complete
      setTimeout(() => setStep(3), 1000); // Stop sprinkles after 1 second
    }, 2000); // Adjust timing to match flip duration

    return () => {
      clearTimeout(flipTimeout);
      clearTimeout(sprinkleTimeout);
    };
  }, []);

  return (
    <div className="about-container">
      <div className={`about-content ${step >= 1 ? "flip" : ""}`}>
        <h1 className="large rise">Welcome to Deal Grabber!</h1>
        <h2 className="large rise">
          Your Digital Passport for Amazing Deals and Discounts from local
          Businesses
        </h2>

        <p>
          As a proud channel partner of{" "}
          <span className="highlight">
            Localopoly and Local Directories, Deal Grabber unites restaurants,
            retail
          </span>{" "}
          stores, and{" "}
          <span className="highlight">
            service businesses with cost-conscious consumers
          </span>{" "}
          like you, who are eager to discover unbeatable deals and discounts at
          local destinations.
        </p>
        <p>
          Whether you are a savvy shopper looking to stretch your dollars or a
          local business seeking innovative ways to attract new customers, our{" "}
          <strong style={{ color: "#148446", textTransform: "uppercase" }}>
            AI-powered gamified platform
          </strong>{" "}
          is the ultimate solution.
        </p>
      </div>

      {/* Sprinkle Effect */}
      <div className={`sprinkles ${step === 2 ? "active" : ""}`}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="sprinkle-dot"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`, // Random delay for sprinkles
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default About;
