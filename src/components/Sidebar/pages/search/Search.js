import React, { useState } from "react";
import "./Search.css"; // Ensure you create this file for custom styles if needed

const Search = ({ user }) => {
  const [query, setQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Ensure that the user and their tenders are available.
  if (!user || !user.tenders) {
    return <p>No tender data available.</p>;
  }

  // Assume the user.tenders structure is an object with three keys:
  // "toDo", "inProgress", "notStarted"
  // If your keys differ (e.g. "toDoList") adjust accordingly.
  const tenderCategories = Object.keys(user.tenders);

  // Combine all tenders into one array, tagging each tender with its category
  let allTenders = [];
  tenderCategories.forEach((category) => {
    const tendersInCategory = user.tenders[category].map((tender) => ({
      ...tender,
      category, // Tag the tender with its category
    }));
    allTenders = allTenders.concat(tendersInCategory);
  });

  // Filter by selected category if not "all"
  let filteredTenders =
    filterCategory === "all"
      ? allTenders
      : allTenders.filter((tender) => tender.category === filterCategory);

  // Further filter by the search query (checking title, description, and assignee)
  if (query.trim() !== "") {
    filteredTenders = filteredTenders.filter((tender) =>
      [tender.title, tender.description, tender.assignee]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }

  // Sort the filtered tenders by dateAssigned (assuming it's a valid date string)
  filteredTenders.sort(
    (a, b) => new Date(b.dateAssigned) - new Date(a.dateAssigned)
  );

  return (
    <div className="search">
      <h2>Search Tenders</h2>
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search tenders by name, description, or assignee..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="toDo">To-Do List</option>
          <option value="inProgress">In Progress</option>
          <option value="notStarted">Not Started</option>
        </select>
      </div>
      <div className="search-results">
        {filteredTenders.length > 0 ? (
          <ul>
            {filteredTenders.map((tender) => (
              <li key={tender.id} className="tender-item">
                 <p>
                  <strong>Status:</strong> {tender.status}
                </p>
                <h3>{tender.title}</h3>
                <p>{tender.description}</p>
               
                <p>
                  <strong>Category:</strong> {tender.category}
                </p>
                <p>
                  <strong>Assignee:</strong> {tender.assignee}
                </p>
                {tender.assigneeImage && (
                  <img
                    src={tender.assigneeImage}
                    alt={tender.assignee}
                    className="assignee-image"
                  />
                )}
                <p>
                  <strong>Date Assigned:</strong> {tender.dateAssigned}
                </p>
                <p>
                  <strong>Difficulty:</strong> {tender.difficulty}
                </p>
                {tender.comments && tender.comments.length > 0 && (
                  <div className="comments">
                    <h4>Comments:</h4>
                    <ul>
                      {tender.comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {tender.attachments && tender.attachments.length > 0 && (
                  <div className="attachments">
                    <h4>Attachments:</h4>
                    <ul>
                      {tender.attachments.map((attachment, index) => (
                        <li key={index}>
                          <a
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {attachment.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tenders match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
