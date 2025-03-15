import React from "react";
import { Link } from "react-router-dom";
import "../styles/Urbaneats.css";

const UrbanEats = () => {
  return (
    <div className="urban-eats">
      <h1>Urban Eats Directory</h1>
      <div className="categories">
        <div className="category-card">
          <h2>Restaurants</h2>
          <p>Explore the best restaurants in town.</p>
          <Link to="/mobilopoly" className="explore-button">
            Explore
          </Link>
        </div>
        <div className="category-card">
          <h2>Cafes</h2>
          <p>Discover cozy cafes and coffee shops.</p>
          <Link to="/localopoly" className="explore-button">
            Explore
          </Link>
        </div>
        <div className="category-card">
          <h2>Bars</h2>
          <p>Find the best bars and happy hour deals.</p>
          <Link to="/dealopoly" className="explore-button">
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UrbanEats;