import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";  // Adjust the path as needed
import "./Dashboard.css";

const Dashboard = ({ user, searchTerm, onLogout, onSearch }) => {
  const [view, setView] = useState("list");

  if (!user) {
    return <p>Loading...</p>;
  }

  // Function to filter tenders based on search term
  const filterTenders = (category) => {
    return user.tenders[category].filter(
      (tender) =>
        tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "low":
        return "green";
      case "high":
        return "red";
      default:
        return "orange";
    }
  };

  const getStatusColor = (status) => {
    switch (status.trim().toLowerCase()) {
      case "in progress":
        return "#3869af";
      case "not started":
        return "rgb(153,54,13)";
      default:
        return "gray";
    }
  };

  const getStatusDotColor = (status) => {
    switch (status.trim().toLowerCase()) {
      case "in progress":
        return "#1c5592";
      case "not started":
        return "rgb(214,202,42)";
      default:
        return "gray";
    }
  };

  return (
    <div className="dashboard dashboard-container" style={{ 
      height: "100vh", 
      overflowY: "auto", 
      paddingRight: "10px" // Avoid content shifting 
    }}>
      {/* Added Navbar at the top */}
      <Navbar user={user} onLogout={onLogout} onSearch={onSearch} />
      
      <div className="view-tender-details-header">
        <div className="view-toggle">
          <button
            onClick={() => setView("list")}
            className={view === "list" ? "active" : ""}
          >
            List View
          </button>
          <button
            onClick={() => setView("board")}
            className={view === "board" ? "active" : ""}
          >
            Board View
          </button>
        </div>
        <div className="view-tendor-columns">
          <button>View Tender Details</button>
          <button>Columns</button>
        </div>
      </div>

      {view === "list" ? (
        <div className="list-view">
          {Object.keys(user.tenders).map((category) => (
            <div key={category}>
              <div
                style={{ display: "flex", alignItems: "center", justifyContent:"space-between"}}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <h3 style={{color:"white"}}>{category.replace(/([A-Z])/g, " $1").toUpperCase()}</h3>
                  <p
                    style={{
                      width: "2rem",
                      height: "2rem",
                      backgroundColor: "#1c5592",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "1rem",
                    }}
                  >
                    {user.tenders[category]?.length || 0}
                  </p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <h3 style={{fontSize:"1.5rem"}}>+</h3>
                  <div style={{ display: "flex", gap: "0.2rem" }}>
                    <div
                      style={{
                        width: "0.3rem",
                        height: "0.3rem",
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "0.3rem",
                        height: "0.3rem",
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "0.3rem",
                        height: "0.3rem",
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {Array.isArray(user.tenders[category]) &&
              user.tenders[category].length > 0 ? (
                <ul style={{display:"flex", flexDirection:"column", gap:"1rem", background:"black", padding:"2rem", borderRadius:"1rem"}}>
                  {filterTenders(category).map((tender) => (
                    <li key={tender.id} className="tender-item">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center",
                            backgroundColor: getStatusColor(tender.status),
                            padding: "0.5rem",
                            borderRadius: "1rem",
                            fontSize: "10px",
                          }}
                        >
                          <p
                            style={{
                              backgroundColor: getStatusDotColor(tender.status),
                              height: "0.5rem",
                              width: "0.5rem",
                              borderRadius: "50%",
                            }}
                          ></p>
                          <h2 style={{ margin: "0" }}>{tender.status}</h2>
                        </div>

                        <div style={{ display: "flex", gap: "0.2rem" }}>
                          <div
                            style={{
                              width: "0.3rem",
                              height: "0.3rem",
                              backgroundColor: "white",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "0.3rem",
                              height: "0.3rem",
                              backgroundColor: "white",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "0.3rem",
                              height: "0.3rem",
                              backgroundColor: "white",
                              borderRadius: "50%",
                            }}
                          ></div>
                        </div>
                      </div>
                      <h4 style={{margin:"0"}}>{tender.title}</h4>
                      <p>{tender.description}</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>{tender.assignee}</p>
                        <img src={tender.assigneeImage} alt={tender.assignee} />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>{tender.dateAssigned}</p>
                        <p>{tender.difficulty}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>📜 {tender.comments.length} Comments</p>
                        <p>📎 {tender.attachments.length} Attachments</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tenders in this category</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="board-view">
          {["toDo", "inProgress", "notStarted"].map((category) => (
            <div key={category} className="board-column">
              <div
                style={{ display: "flex", alignItems: "center", justifyContent:"space-between"}}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <h3>{category.replace(/([A-Z])/g, " $1").toUpperCase()}</h3>
                  <p
                    style={{
                      width: "2rem",
                      height: "2rem",
                      backgroundColor: "#1c5592",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "1rem",
                    }}
                  >
                    {user.tenders[category]?.length || 0}
                  </p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <h3 style={{fontSize:"1.5rem"}}>+</h3>
                  <div style={{ display: "flex", gap: "0.2rem" }}>
                    <div
                      style={{
                        width: "0.3rem",
                        height: "0.3rem",
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "0.3rem",
                        height: "0.3rem",
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "0.3rem",
                        height: "0.3rem",
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {Array.isArray(user.tenders[category]) &&
              user.tenders[category].length > 0 ? (
                <div className="tender-cards">
                  {filterTenders(category).map((tender) => (
                    <div key={tender.id} className="tender-card">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center",
                            backgroundColor: getStatusColor(tender.status),
                            padding: "0.5rem",
                            borderRadius: "1rem",
                            fontSize: "10px",
                          }}
                        >
                          <p
                            style={{
                              backgroundColor: getStatusDotColor(tender.status),
                              height: "0.5rem",
                              width: "0.5rem",
                              borderRadius: "50%",
                            }}
                          ></p>
                          <h2 style={{ margin: "0" }}>{tender.status}</h2>
                        </div>
                        <div style={{ display: "flex", gap: "0.2rem" }}>
                          <div
                            style={{
                              width: "0.3rem",
                              height: "0.3rem",
                              backgroundColor: "white",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "0.3rem",
                              height: "0.3rem",
                              backgroundColor: "white",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "0.3rem",
                              height: "0.3rem",
                              backgroundColor: "white",
                              borderRadius: "50%",
                            }}
                          ></div>
                        </div>
                      </div>
                      <h3 style={{ margin: "0" }}>{tender.title}</h3>
                      <p>{tender.description}</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>{tender.assignee}</p>
                        <img src={tender.assigneeImage} alt={tender.assignee} />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          borderBottom:"1px solid gray",
                          paddingBottom:"0.5rem"
                        }}
                      >
                        <p>{tender.dateAssigned}</p>
                        <p
                          style={{
                            backgroundColor: getDifficultyColor(tender.difficulty),
                            paddingLeft: "0.5rem",
                            paddingRight: "0.5rem",
                            borderRadius: "0.5rem",
                            fontSize: "10px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {tender.difficulty}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <p>📜 {tender.comments.length} Comments</p>
                        <p>📎 {tender.attachments.length} Attachments</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No tenders in this category</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
