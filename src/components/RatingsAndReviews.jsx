
import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import "../styles/RatingsAndReviews.css";
// this is my difficult componete because this one killed me that was diffult 
const RatingsAndReviews = ({ book }) => {
  const [ratingSnapshot, setRatingSnapshot] = useState({});
  const [bookRating, setBookRating] = useState(book.ratings || 0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [selectedRating, setSelectedRating] = useState(null); // Track the selected rating
  const [hoverRating, setHoverRating] = useState(null); // Track hover state
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchRatingSnapshot = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/reviews/book/${book._id}`);
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();

      // Initialize default rating snapshot
      const defaultSnapshot = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

      // Merge with fetched snapshot (if data exists)
      const updatedSnapshot = { ...defaultSnapshot, ...data.ratingSnapshot };

      setRatingSnapshot(updatedSnapshot);
      setTotalReviews(data.reviews.length || 0);

      // Calculate and update the average book rating
      if (data.reviews.length > 0) {
        const avgRating =
          data.reviews.reduce((sum, review) => sum + review.rating, 0) / data.reviews.length;
        setBookRating(avgRating.toFixed(1)); // Round to 1 decimal place
      } else {
        setBookRating(book.ratings || 0); // Use book rating if no reviews exist
      }
    } catch (error) {
      console.error("Error fetching reviews:", error.message);

      // Ensure default snapshot is set on error or empty data
      setRatingSnapshot({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
      setTotalReviews(0);
      setBookRating(book.ratings || 0); // Use book rating as fallback
    }
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating); // Update selected star rating
    setShowForm(true); // Open the form
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating); // Update hover state
  };

  const handleStarLeave = () => {
    setHoverRating(null); // Reset hover state when the mouse leaves
  };

  const handleCloseForm = () => {
    setSelectedRating(null); // Reset star rating when the form is closed
    setShowForm(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review.");
      }

      setSuccessMessage("Review submitted successfully!");
      setShowForm(false);
      setSelectedRating(null); // Reset star rating after submission
      fetchRatingSnapshot(); // Refresh rating snapshot after submission
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchRatingSnapshot();
  }, [book._id]);

  return (
    <div className="ratings-reviews-container">
      <h2 className="ratings-reviews-title">Reviews</h2>

      <div className="ratings-reviews-row">
        {/* Rating Snapshot */}
        <div className="rating-snapshot">
          <h4>Rating Snapshot</h4>
          {Object.keys(ratingSnapshot)
            .sort((a, b) => b - a) // Sort keys in descending order
            .map((star) => (
              <div key={star} className="snapshot-row">
                <span>{star} stars</span>
                <div className="progress-bar">
                  <div
                    className="progress-filled"
                    style={{
                      width: `${(ratingSnapshot[star] / totalReviews) * 100 || 0}%`,
                    }}
                  ></div>
                </div>
                <span>{ratingSnapshot[star] || 0}</span>
              </div>
            ))}
        </div>

        {/* Overall Rating */}
        <div className="overall-rating">
          <p>Overall Rating</p>
          <div className="rating-value">{bookRating > 0 ? bookRating : "N/A"}</div>
          <div>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`star ${i < bookRating ? "filled-star" : ""}`}>
                ★
              </span>
            ))}
          </div>
          <p>({totalReviews} Reviews)</p>
        </div>

        {/* Review Stars */}
        <div className="review-stars">
          <h4>Review this product</h4>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${
                hoverRating >= star || selectedRating >= star ? "hovered-star" : ""
              }`}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
            >
              ★
            </span>
          ))}
          <p id="starsik">Adding a review will require a valid email for verification</p>
        </div>
      </div>

      {/* Success and Error Messages */}
      {successMessage && <div className="success-message">✅ {successMessage}</div>}
      {errorMessage && <div className="error-message">❌ {errorMessage}</div>}

      {/* Review Form */}
      {showForm && (
        <ReviewForm
          book={book}
          selectedRating={selectedRating}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default RatingsAndReviews;
