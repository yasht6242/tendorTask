import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Tender Tasks</h1>
      <p>
        Welcome to Tender Tasks – your one-stop solution for managing and bidding on tenders efficiently.
      </p>
      <div className="home-links">
        <Link to="/home/dashboard">Dashboard</Link>
        <Link to="/home/market">Market</Link>
        <Link to="/home/contact">Contact</Link>
      </div>
    </div>
  );
};

export default Home;
