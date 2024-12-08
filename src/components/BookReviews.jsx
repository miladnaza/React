import React, { useState, useEffect } from "react";
import "../styles/BookReviews.css";

const BookReview = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2; // Show 2 reviews per page

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/reviews/book/${bookId}`);
      if (!response.ok) throw new Error("No reviews found");
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    }
  };

  useEffect(() => {
    if (bookId) fetchReviews();
  }, [bookId]);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (reviews.length === 0) {
    return null; // Do not render if there are no reviews
  }

  return (
    <div className="book-review-containerA">
      {/* Black lines at top and bottom */}
      <div className="book-review-top-lineA"></div>
      <h3 className="book-review-titleA">Book Reviews</h3>

      {/* Reviews */}
      {currentReviews.map((review, index) => (
        <div key={index} className="review-itemA">
          {/* Reviewer Info */}
          <div className="review-headerA">
            <p className="review-nicknameA">
              <strong>Reviewed by: {review.nickname}</strong>
            </p>
            <p className="review-ratingA">
              {"★".repeat(review.rating)}{" "}
              {"☆".repeat(5 - review.rating)}
            </p>
            <p className="review-dateA">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          {/* Review Content */}
          <div className="review-bodyA">{review.review}</div>
          {/* Divider Between Reviews */}
          {index < currentReviews.length - 1 && <div className="review-dividerA"></div>}
        </div>
      ))}

<div className="review-paginationA">
  <button
    className="review-pagination-buttonA previous-button"
    onClick={handlePreviousPage}
    disabled={currentPage === 1}
  >
    &lt;
  </button>
  <button
    className="review-pagination-buttonA next-button"
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
  >
    &gt;
  </button>
</div>
      
    </div>
  );
};

export default BookReview;
