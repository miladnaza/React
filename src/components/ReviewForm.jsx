
import React, { useState, useEffect } from "react";
import "../styles/ReviewForm.css";

const ReviewForm = ({ book, selectedRating, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    review: "",
    reviewTitle: "",
    nickname: "",
    email: "",
    location: "",
    incentive: "No",
  });
  const [selectedStarRating, setSelectedStarRating] = useState(selectedRating);
  const [hoveredStar, setHoveredStar] = useState(null);

  useEffect(() => {
    // Sync selectedRating from parent when the form opens
    setSelectedStarRating(selectedRating);
  }, [selectedRating]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStarClick = (rating) => {
    setSelectedStarRating(rating); // Update selected star rating on click
  };

  const handleMouseEnter = (star) => {
    setHoveredStar(star); // Highlight stars on hover
  };

  const handleMouseLeave = () => {
    setHoveredStar(null); // Reset highlight on hover out
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, rating: selectedStarRating, bookId: book._id });
  };

  const handleClose = () => {
    setFormData({
      review: "",
      reviewTitle: "",
      nickname: "",
      email: "",
      location: "",
      incentive: "No",
    });
    setSelectedStarRating(null); // Reset star rating
    setHoveredStar(null); // Reset hovered state
    onClose(); // Trigger parent close action
  };

  return (
    <div className="review-form-container">
      <div className="review-form-header">
        <img src={book.image} alt={book.shortTitle} />
        <div>
          <h4>{book.fullTitle}</h4>
          <div className="review-form-star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${
                  hoveredStar >= star || selectedStarRating >= star
                    ? "filled-star"
                    : "empty-star"
                }`}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleMouseEnter(star)}
                onMouseLeave={handleMouseLeave}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button className="review-form-close-button" onClick={handleClose}>
          ✖
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Review Title:
          <input
            type="text"
            name="reviewTitle"
            value={formData.reviewTitle}
            onChange={handleChange}
            required
            
          />
          
        </label>

        <label>
          Review:
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label>
          Nickname:
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email*:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Location*:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        <div className="radio-group-container">
  <label className="radio-group-label">Did you receive an incentive for this review?</label>

  <div className="radio-group">
    <label>
      <input type="radio" name="incentive" value="Yes" /> Yes
    </label>
    <label>
      <input type="radio" name="incentive" value="No" /> No
    </label>
  </div>


</div>


        <div className="review-form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
