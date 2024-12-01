import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./image/logo.png";
import searchIcon from "./image/search.png";
import locationIcon from "./image/location.png";
import wishlistIcon from "./image/wishlist.png";
import accountIcon from "./image/account.png";
import cartIcon from "./image/cart2.png";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // State for managing the search query
  const [ads, setAds] = useState([]); // State to store ads
  const [currentAdIndex, setCurrentAdIndex] = useState(0); // State to track current ad

  // Fetch ads when the component mounts
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/ads`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAds(data);
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };

    fetchAds();
  }, []);

  // Auto-cycle ads every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length); // Cycle through ads
    }, 10000); // 10 seconds for ad cycle

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [ads]);

  // Handle previous ad
  const handlePrevious = () => {
    setCurrentAdIndex((prevIndex) =>
      prevIndex === 0 ? ads.length - 1 : prevIndex - 1 // Go to previous ad, wrap around to the last one if needed
    );
  };

  // Handle next ad
  const handleNext = () => {
    setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length); // Go to next ad, cycle back to the first if needed
  };

  const handleSearch = () => {
    onSearch(query.trim()); // Trigger search with trimmed query
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <header>
      {/* Ads Section */}
      <div id="black">
        <span
          className="arrow"
          onClick={handlePrevious} // Click to go to previous ad
          style={{ cursor: "pointer" }}
        >
          &lt;
        </span>
        <span id="add" style={{ margin: "0 20px" }}>
          {ads.length > 0
            ? ads[currentAdIndex]?.text.replace(/^Ad \d+:\s*/, "") // Remove the "Ad" prefix dynamically
            : "No ads available"}
        </span>
        <span
          className="arrow"
          onClick={handleNext} // Click to go to next ad
          style={{ cursor: "pointer" }}
        >
          &gt;
        </span>
      </div>

      <div id="gray">
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <div className="separator"></div>
          <Link to="/Bookslist" className="nav-link">Order Status</Link>
          <div className="separator"></div>
          <Link to="/account" className="nav-link">Dashboard</Link>
          <div className="separator"></div>
          <Link to="/try" className="nav-link sign-in-button">Sign In</Link>
        </nav>
      </div>

      <div id="hea">
        <img src={logo} className="img" alt="Logo" />
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            className="search-box"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update query state
            onKeyUp={handleKeyUp} // Trigger search on Enter key press
          />
          <img
            src={searchIcon}
            alt="Search Icon"
            className="search-icon"
            onClick={handleSearch} // Trigger search on click
          />
        </div>
        <div className="header-icons">
          <div className="icon-container">
            <a href="/LocationFinder/location.html" target="_blank" rel="noopener noreferrer">
              <img src={locationIcon} alt="Location Icon" className="icon" id="location" />
              <div className="tooltip">View Location</div>
            </a>
          </div>
          <div className="icon-container">
            <Link to="/try">
              <img src={wishlistIcon} alt="Wishlist Icon" className="icon" id="wish" />
              <div className="tooltip">View Wishlist</div>
            </Link>
          </div>
          <div className="icon-container">
            <Link to="/account">
              <img src={accountIcon} alt="Account Icon" className="icon" />
              <div className="tooltip">Account</div>
            </Link>
          </div>
          <div className="icon-container">
            <Link to="/Bookslist">
              <img src={cartIcon} alt="Cart Icon" className="icon" />
              <div className="tooltip">View Cart</div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
