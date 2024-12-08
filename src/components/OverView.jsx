import React from "react";
import "../styles/OverView.css";

const OverView = ({ book }) => {
  return (
    
    <div className="overview-container">
        <hr className="overview-line" />
      <p className="overview-title">Overview</p>
      

      {/* Key Details Section */}
      <div className="overview-details">
        <div className="detail-box">
          <h3>Appropriate For</h3>
          <p>{book.appropriateFor || "N/A"}</p>
        </div>
        <div className="detail-box">
          <h3>Language</h3>
          <p>{book.language || "N/A"}</p>
        </div>
        <div className="detail-box">
          <h3>No. of Pages</h3>
          <p>{book.noOfPages || "N/A"}</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="overview-description">
        <p>{book.description || "Description not available."}</p>
      </div>

      {/* Publisher and Other Details */}
      <div className="overview-publisher">
        <p><strong>Publisher:</strong> {book.publisher || "Unknown"}</p>
        <p><strong>Shipping dimensions:</strong> {book.shippingDimensions || "N/A"}</p>
        <p><strong>ISBN:</strong> {book.isbn || "N/A"}</p>
      </div>
      <hr className="overview-line" />
    </div>
  );
};

export default OverView;
