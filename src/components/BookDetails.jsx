// Import necessary libraries
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import checkedIcon from "C:/Users/HP/Desktop/Project/React/src/components/image/checked.png";
import moreIcon from "C:/Users/HP/Desktop/Project/React/src/components/image/more.png";
import wishlistIcon from "C:/Users/HP/Desktop/Project/React/src/components/image/wishlist.png";
import priceIcon from "C:/Users/HP/Desktop/Project/React/src/components/image/price.png";
import OverView from "./OverView";
import zoompic from "C:/Users/HP/Desktop/Project/React/src/components/image/search.png";
import Recommendations from "./Recommendations";
import BookReviews from "./BookReviews";
import ReviewForm from "./ReviewForm";
import "../styles/BookDetails.css";
import RatingsAndReviews from "./RatingsAndReviews";
import { Link } from "react-router-dom";

const BookDetails = () => {
  const { shortTitle } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null); // Track selected format
  const [isZoomed, setIsZoomed] = useState(false); // State for zoom functionality
  const [showModal1, setShowModal1] = useState(false); // Modal for Offer 1
  const [showModal2, setShowModal2] = useState(false); // Modal for Offer 2
  const [showModal3, setShowModal3] = useState(false); // Modal for Offer 3
  const [reviewCount, setReviewCount] = useState(0);


  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BE_URL}/api/books/shortTitle/${encodeURIComponent(shortTitle)}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Book with shortTitle "${shortTitle}" not found.`);
          }
          throw new Error(`Error fetching book details: ${response.statusText}`);
        }
        const data = await response.json();
        setBook(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [shortTitle]);

  const handleZoom = () => setIsZoomed(true);
  const closeZoom = () => setIsZoomed(false);

  const openModal1 = () => setShowModal1(true);
  const closeModal1 = () => setShowModal1(false);

  const openModal2 = () => setShowModal2(true);
  const closeModal2 = () => setShowModal2(false);

  const openModal3 = () => setShowModal3(true);
  const closeModal3 = () => setShowModal3(false);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars && halfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
      }
    }

    return stars;
  };
  const fetchReviewCount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BE_URL}/api/reviews/book/${shortTitle}`
      );
      if (!response.ok) throw new Error("Failed to fetch review count");
  
      const data = await response.json();
      setReviewCount(data.reviews.length || 0); // Set the count of reviews
    } catch (error) {
      console.error("Error fetching review count:", error.message);
    }
  };
  useEffect(() => {
    const fetchReviewCount = async () => {
      if (!book || !book._id) return; // Ensure the book and its ID are loaded
  
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BE_URL}/api/reviews/book/${book._id}`
        );
        if (!response.ok) throw new Error("Failed to fetch review count");
  
        const data = await response.json();
        setReviewCount(data.reviews?.length || 0); // Update the review count
      } catch (error) {
        console.error("Error fetching review count:", error.message);
      }
    };
  
    fetchReviewCount();
  }, [book]);
    

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div id="book-details-container">
      {/* Breadcrumb Section */}
      <div id="book-details-breadcrumb">
        <p>
          <a href="/books">Books</a> /{" "}
          <a href={`/category/${book.category.toLowerCase()}`}>{book.category}</a> /{" "}
          <a href={`/author/${book.author.toLowerCase()}`}>{book.author}</a>
        </p>
      </div>

      {/* Content Section */}
      <div id="book-details-content">
        {/* Image and Zoom Section */}
<div id="book-details-image-section">
  <div id="book-image-wrapper">
    <img
      src={book.image || "https://via.placeholder.com/300x450"}
      alt={book.fullTitle}
      id="book-details-main-image"
    />
    <button id="zoom-button" onClick={handleZoom}>
      <img
        src={zoompic}
        alt="Zoom"
        className="zoom-icon"
      />
    </button>
  </div>
</div>


        {/* Details Section */}
        <div id="book-details-info-section">
          <h1 id="book-details-title">{book.fullTitle}</h1>
          <p id="book-details-author">Illustrated by {book.illustratedBy || "Unknown"}</p>
          <div id="book-details-rating">
            <div className="stars">{renderStars(book.ratings)}</div>
            <span className="rating-text">
              {book.ratings.toFixed(1) || "Not Rated"} <span className="rating-text">
              &nbsp;({reviewCount} reviews)
</span>

            </span>
          </div>
          <div id="book-details-price-section">
            <h2 id="priceB">${book.price}</h2>
            <p className="book-discount">${(book.price + 5).toFixed(2)}</p>

          </div>
          <div id="book-details-offers">
            <p onClick={openModal1} style={{ cursor: "pointer" }}>
              <img src={priceIcon} alt="Offer Icon" className="offer-icon" />
              <strong>30% off Select Special Editions & Sprayed Edges. </strong>{" "}
              <span className="learn-more"> Learn More</span>
            </p>
            <p onClick={openModal2} style={{ cursor: "pointer" }}>
              <img src={priceIcon} alt="Offer Icon" className="offer-icon" />
              <strong>Up to 30% off {book.category} Books in Our Store. </strong>{" "}
              <span className="learn-more"> Learn More</span>
            </p>
            {book.ratings >= 4.5 && (
              <p onClick={openModal3} style={{ cursor: "pointer" }}>
                <img src={priceIcon} alt="Offer Icon" className="offer-icon" />
                <strong>Books with Best Ratings Get Up to 30% Off. </strong>{" "}
                <span className="learn-more"> Learn More</span>
              </p>
            )}
          </div>

          <div id="book-details-format-section">
            <div className="format-buttons-row">
              {book.formats?.paperback && (
                <button
                  className="format-button"
                  onClick={() => setSelectedFormat("Paperback")}
                >
                  <strong>Paperback</strong> ${book.price}
                </button>
              )}
              {book.formats?.hardcover && (
                <button
                  className="format-button"
                  onClick={() => setSelectedFormat("Hardcover")}
                >
                  <strong>Hardcover</strong> ${book.price}
                </button>
              )}
              {book.formats?.ebook && (
                <button
                  className="format-button"
                  onClick={() => setSelectedFormat("eBook")}
                >
                  <strong>eBook</strong> ${book.price - 2}
                </button>
              )}
            </div>
            <div className="format-divider"></div>
          </div>

          {/* Conditional Actions */}
          {selectedFormat !== "eBook" && (
            <div className="book-actions">
              <div className="book-action">
                <img  id ="ch " src={checkedIcon} alt="Checked Icon" className="action-icon" />
                <strong>Ship to me</strong>
                <div>
                  <br></br>
                  <p id="prag">Pre-order online. Free shipping on orders over $49</p>
                </div>
              </div>
              <div className="book-action">
                <img src={moreIcon} alt="More Icon" className="action-icon" />
                <strong >Buy now & pick up in store</strong>
                <div>
                <br></br>
                  <a id="buyof" a href="/LocationFinder/location.html" target="_blank" rel="noopener noreferrer" className="select-store">Select the store</a>
                </div>
              </div>
              <div className="book-action">
                <img src={moreIcon} alt="More Icon" className="action-icon" />
                <strong>Find it in store</strong>
                <div>
                <br></br>
                  <a href="/LocationFinder/location.html" target="_blank" rel="noopener noreferrer" className="select-store">Select the store</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div id="book-actions-container">
    {/* Quantity Selector and Add to Bag */}
    <div className="quantity-and-cart">
      {/* Quantity Selector */}
      <select id="quantity-selector" className="quantity-dropdown">
        {Array.from({ length: 100}, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      {/* Add to Bag Button */}
      <button className="add-to-bag-button">
        Add to Cart
      </button>
    </div>

    {/* Wishlist Button */}
    <button className="wishlis-button">
  <svg
    className="wishlis-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="white" /* Default fill color (white) */
      stroke="black" /* Default border color (black) */
      stroke-width="2" /* Border thickness */
    ></path>
  </svg>
</button>

  </div>
      {/* Zoom Modal */}
      {isZoomed && (
        <div id="zoom-modal" onClick={closeZoom}>
          <div id="zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={book.image || "https://via.placeholder.com/300x450"}
              alt={book.title}
              id="zoomed-image"
            />
            <button id="close-zoom" onClick={closeZoom}>
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Offer Modals */}
      {showModal1 && (
        <div id="promotion-modal" onClick={closeModal1}>
          <div id="promotion-modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="tit">PROMOTION DETAILS</p>
            <h2 className="ptit">30% off Select Special Editions & Sprayed Edges</h2>
            <p className="dtit">
              *Valid December 2, 2024 - December 29, 2024 at our store, while
              quantities last. Not valid on previous purchases or in conjunction with other offers.
            </p>
            <button id="close-modal" onClick={closeModal1}>
              ✖
            </button>
          </div>
        </div>
      )}

      {showModal2 && (
        <div id="promotion-modal" onClick={closeModal2}>
          <div id="promotion-modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="tit">PROMOTION DETAILS</p>
            <h2 className="ptit">Up to 30% off {book.category} Books in Our Store</h2>
            <p className="dtit">
              *Valid TUESDAY - MONDAY at Canadian stores and bookstore, while
              quantities last. Not valid on previous purchases or in conjunction with other offers.
            </p>
            <button id="close-modal" onClick={closeModal2}>
              ✖
            </button>
          </div>
        </div>
      )}

      {showModal3 && (
        <div id="promotion-modal" onClick={closeModal3}>
          <div id="promotion-modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="tit">PROMOTION DETAILS</p>
            <h2 className="ptit">Books with Best Ratings Get Up to 30% Off</h2>
            <p className="dtit">
              *Valid this month at participating stores and online. Conditions apply.
              Not valid on previous purchases or in conjunction with other offers.
            </p>
            <button id="close-modal" onClick={closeModal3}>
              ✖
            </button>
          </div>
        </div>
        
      )}
      <OverView book={book} />
      <Recommendations category={book.category} currentBookShortTitle={book.shortTitle} />
      <RatingsAndReviews book={book}/>
      <BookReviews bookId={book._id} />
    </div>
  );
};

export default BookDetails;
