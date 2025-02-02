import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaSearch, FaChartLine, FaPhone, FaAddressBook } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <button onClick={() => navigate("/home/menu")}><FaBars /></button>
      <button onClick={() => navigate("/home/search")}><FaSearch /></button>
      <button onClick={() => navigate("/home/dashboard")}><FaAddressBook /></button>
      <button onClick={() => navigate("/home/market")}><FaChartLine /></button>
      <button onClick={() => navigate("/home/contact")}><FaPhone /></button>
      
    </div>
  );
};

export default Sidebar;
