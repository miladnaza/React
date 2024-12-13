
import React, { useEffect, useState } from "react";
import "../styles/Wishlist.css";


import cartIcon from "./image/cart2.png"; // Import cart icon
import trashIcon from "./image/trash.png"; // Import trash icon for delete

// this is the wishlist that we add in the wish list the book with one click 
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination current page
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    const fetchWishlist = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/wishlist/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist.");
        }
        const data = await response.json();
        setWishlist(data.items || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // this one is used to remove book from whishlist
  const handleRemoveFromWishlist = async (bookId) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setError("User not logged in.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/wishlist/${userId}/${bookId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from wishlist.");
      }

      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.bookId !== bookId));
    } catch (error) {
      console.error("Error removing book from wishlist:", error.message);
    }
  };
// we add the book in the wish list from there
  const handleAddToCart = async (bookId, bookTitle) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setError("User not logged in.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, bookId, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart.");
      }

      setPopupMessage(`Item is added to your cart`);
      setTimeout(() => {
        setPopupMessage(""); // Clear popup after 2 seconds
      }, 2000);
      
    } catch (error) {
      console.error("Error adding book to cart:", error.message);
    }
     
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = wishlist.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);
// this one hadels if there are many books that goes to different pages 
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) return <p className="wl-loading">Loading wishlist...</p>;
  if (error) return <p className="wl-error">Error: {error}</p>;

  return (
    
    <div className="wl-container">
        
      <div className="wl-header">
        <p className="wl-updated">
          UPDATED: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }).toUpperCase()}
        </p>
        <h1 className="wl-title">My List</h1>
      </div>
      <p className="wl-item-count">{wishlist.length} Item(s)</p>
      <hr className="wl-divider" />

      {wishlist.length === 0 ? (
        <div className="wl-empty-message">
          <p>Your list is empty</p>
        </div>
      ) : (
        <ul className="wl-items">
          {displayedItems.map((item) => (
            <li key={item.bookId} className="wl-item">
            <img
            
              src={item.image || "https://via.placeholder.com/100x150"}
              alt={item.fullTitle}
              className="wl-item-image"
            />
            <div className="wl-item-details">
              <h3>{item.shortTitle}</h3>
              <p>{item.author}</p>
              <p>Paperback</p> {/* This can be dynamic if needed */}
            </div>
            <div className="wl-item-actions">
              <p className="wl-item-price">${item.price.toFixed(2)}</p>
              {item.stock === 0 ? (
                <div className="wl-out-of-stock-label">Out of Stock</div>
              ) : (
                <button
                  className="wl-add-to-cart-button"
                  onClick={() => handleAddToCart(item.bookId, item.fullTitle)}
                >
                  Add to Bag
                </button>
              )}
              <button
                className="wl-remove-button"
                onClick={() => handleRemoveFromWishlist(item.bookId)}
              >
                <img src={trashIcon} alt="Delete" className="wl-delete-icon" />
              </button>
            </div>
          </li>
          
          ))}
        </ul>
      )}

{totalPages > 1 && wishlist.length > 0 && (
  <div className="wl-pagination">
    <button
      className="wl-pagination-button"
      onClick={() => handlePageChange("prev")}
      disabled={currentPage === 1}
    >
      &lt;
    </button>
    <span className="wl-pagination-info">
      Page {currentPage} of {totalPages}
    </span>
    <button
      className="wl-pagination-button"
      onClick={() => handlePageChange("next")}
      disabled={currentPage === totalPages}
    >
      &gt;
    </button>
  </div>
)}


{popupMessage && (
  <>
    {/* Dark overlay */}
    <div className="wl-overlay"></div>
    {/* Popup */}
    <div className="wl-popup">
      <img src={cartIcon} alt="Cart Icon" className="wl-popup-icon" />
      <p>{popupMessage}</p>
    </div>
  </>
)}

    </div>
  );
};

export default Wishlist;
