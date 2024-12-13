
import React from "react";

const Card = ({ title, description, buttons }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-buttons">
        {buttons.map((button, index) => (
          <button
          key={index}
          className={`card-btn ${button.type || ""}`}
          onClick={button.onClick} // Attach the onClick handler here
        >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Card;
