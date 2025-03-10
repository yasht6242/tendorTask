import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Search from './components/Sidebar/pages/search/Search';
import usersData from './data/users.json';
import Login from './components/Login/Login';
import Home from './components/Sidebar/pages/menu/Home';
import Market from './components/Sidebar/pages/market/Market';
import Contact from './components/Sidebar/pages/contact/Contact';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogin = (credentials) => {
    const authenticatedUser = usersData.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Update search term in App.js
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/home/*"
          element={
            user ? (
              <div className="app-container">
                <Sidebar />
                <div className="main-layout">
                  {/* Removed Navbar from here */}
                  <div className="content">
                    <Routes>
                      <Route path="/" element={<Navigate to="/home/menu" />} />
                      <Route path="menu" element={<Home />} />
                      <Route path="market" element={<Market />} />
                      <Route path="contact" element={<Contact />} />
                      <Route
                        path="dashboard"
                        element={
                          <Dashboard
                            user={user}
                            searchTerm={searchTerm}
                            onLogout={handleLogout}
                            onSearch={handleSearch}
                          />
                        }
                      />
                      <Route path="search" element={<Search />} />
                      <Route path="*" element={<Navigate to="/home/menu" />} />
                    </Routes>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
