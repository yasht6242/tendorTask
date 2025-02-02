import React from "react";
import "./Market.css";


const marketData = [
  {
    id: 1,
    title: "Construction Tender A",
    currentBid: "$5,000",
    bidCount: 12,
    trend: "up",
  },
  {
    id: 2,
    title: "Construction Tender B",
    currentBid: "$3,000",
    bidCount: 8,
    trend: "down",
  },
  {
    id: 3,
    title: "Construction Tender C",
    currentBid: "$7,500",
    bidCount: 15,
    trend: "stable",
  },
];

const Market = () => {
  return (
    <div className="market-container">
      <h1>Market Details</h1>
      <div className="market-list">
        {marketData.map((item) => (
          <div key={item.id} className="market-item">
            <h3>{item.title}</h3>
            <p>
              Current Bid: <span>{item.currentBid}</span>
            </p>
            <p>
              Bid Count: <span>{item.bidCount}</span>
            </p>
            <p>
              Trend: <span>{item.trend}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
