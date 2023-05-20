import React from "react";
import "../pages/Home.css";

const HomeCover = () => {
  return (
    <div>
      <div className="container-fluid mainDiv main p-0">
        <div className="overlay "></div>
        <div className="d-flex flex-column text-center content">
          <h1>MY TRENDS</h1>
          <p style={{ fontFamily: "monospace" }}>
            An Elegant and timeless style for you to wear on any occasion
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeCover;
