import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import checkedIcon from "./image/checked.png";
import moreIcon from "./image/more.png";
import priceIcon from "./image/price.png";
import OverView from "./OverView";
import zoompic from "./image/search.png";
import Recommendations from "./Recommendations";
import BookReviews from "./BookReviews";
import "../styles/Bookdetails.css";
import RatingsAndReviews from "./RatingsAndReviews";

const BookDetails = () => {
  const { shortTitle } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartPopupVisible, setCartPopupVisible] = useState(false);
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);
  const [hover, setHover] = useState(false);
  
  const [wishlistPopupVisible, setWishlistPopupVisible] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BE_URL}/api/books/shortTitle/${encodeURIComponent(shortTitle)}`
        );
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? `Book with shortTitle "${shortTitle}" not found.`
              : `Error fetching book details: ${response.statusText}`
          );
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

  const handleAddToCart = async () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname); // Save current path
      setLoginPopupVisible(true);
      return;
    }

    if (!book || !book._id) {
      alert("Book details are not fully loaded. Please try again.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, bookId: book._id, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add book to cart");
      }

      setCartPopupVisible(true);
    } catch (error) {
      console.error("Error adding book to cart:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const closeCartPopup = () => {
    setCartPopupVisible(false);
    //window.location.reload();
  };

  const closeLoginPopup = () => {
    setLoginPopupVisible(false);
    navigate("/login");
  };
  //Check if the book is already in the wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId || !book || !book._id) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BE_URL}/api/wishlist/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data = await response.json();
        const isBookInWishlist = data.items.some(
          (item) => item.bookId === book._id
        );
        setIsInWishlist(isBookInWishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error.message);
      }
    };

    checkWishlist();
  }, [book]);

  // Handle adding or removing the book from the wishlist
  const handleWishlistToggle = async () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      setWishlistPopupVisible(true);
      return;
    }

    try {
      const url = isInWishlist
        ? `${import.meta.env.VITE_BE_URL}/api/wishlist/${userId}/${book._id}`
        : `${import.meta.env.VITE_BE_URL}/api/wishlist`;

      const method = isInWishlist ? "DELETE" : "POST";
      const body = isInWishlist ? null : JSON.stringify({ userId, bookId: book._id });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        throw new Error(
          isInWishlist ? "Failed to remove from wishlist" : "Failed to add to wishlist"
        );
      }

      setIsInWishlist(!isInWishlist);

      // Show a pop-up message
      setWishlistMessage(
        isInWishlist
          ? "Book removed from wishlist!"
          : "Book added to wishlist!"
      );
      setTimeout(() => setWishlistMessage(""), 10000); // Remove the message after 10 seconds
    } catch (error) {
      console.error(
        isInWishlist
          ? "Error removing from wishlist:"
          : "Error adding to wishlist:",
        error.message
      );
    }
  };

  const closeWishlistPopup = () => {
    setWishlistPopupVisible(false);
  };

  const redirectToLogin = () => {
    // Redirect to login and keep the current page
    navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
  };


  useEffect(() => {
    const fetchReviewCount = async () => {
      if (!book || !book._id) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BE_URL}/api/reviews/book/${book._id}`
        );
        if (!response.ok) throw new Error("Failed to fetch review count");

        const data = await response.json();
        setReviewCount(data.reviews?.length || 0);
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
      
          <select 
            id="quantity-selector"
            className="quantity-dropdown"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button  className="add-to-bag-button" onClick={handleAddToCart}>Add to Cart</button>
    
          </div>

    {cartPopupVisible && (
  <div className="popup">
    <div className="popup-content">
      <button className="close-button" onClick={closeCartPopup}>
        ✖
      </button>
      <h2 id = "closepageto" >Book added to cart successfully!</h2>
      <button className="popup-signin-button"  onClick={() => navigate("/Bookslist")}>
        View Cart
      </button>
    </div>
  </div>
)}

      {/* Login Popup */}
      {loginPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={() => setLoginPopupVisible(false)} >
              ✖
            </button>
            <h2 id = "closepageto" >Please log in to add items to your cart</h2 >
            <button className="popup-signin-button" onClick={closeLoginPopup}>
              Log In
            </button>
          </div>
        </div>
      )}
    {/* Wishlist Button */}
    <button
      onClick={handleWishlistToggle}
      id="whishlistbutton"
      onMouseEnter={() => setHover(true)} // Set hover state to true
      onMouseLeave={() => setHover(false)} // Set hover state to false
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={{
          width: "26px",
          height: "26px",
          fill: hover || isInWishlist ? "black" : "white", // Black on hover or if in wishlist
          stroke: "black",
          strokeWidth: "2",
        }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  </div>
  {/* Wishlist pop-up */}
  {wishlistPopupVisible && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", padding: "20px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              border: "none",
              background: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={closeWishlistPopup}
          >
            ✖
          </button>
          <h2>Please log in to add items to your wishlist</h2>
          <button onClick={redirectToLogin}>Log In</button>
        </div>
      )}

      {/* Wishlist message */}
      {wishlistMessage && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "lightgreen", padding: "20px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
          {wishlistMessage}
        </div>
      )}
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
