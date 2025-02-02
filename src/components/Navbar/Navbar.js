import React, { useState } from "react";
import "./Navbar.css";
import bell from "../../images/icons8-bell-100.png";

const Navbar = ({ user, onLogout, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass the search term to the parent component
  };

  return (
    <div className="navbar">
      <h2>Tender Tasks</h2>

      {/* Search Bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for Tenders..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <img
          style={{ height: "2.5rem", width: "2.5rem" }}
          src={bell}
          alt="bell"
        />

        <div className="profile-menu">
          <button>👤</button>
          <div className="dropdown">
            <button>Profile</button>
            <button onClick={onLogout}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
