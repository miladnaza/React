import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./image/logo.png";
import searchIcon from "./image/search.png";
import locationIcon from "./image/location.png";
import wishlistIcon from "./image/wishlist.png";
import accountIcon from "./image/account.png";
import cartIcon from "./image/cart2.png";
import WishlistPage from "../pages/WhishlistPage";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [ads, setAds] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("userLoggedIn") === "true"
  );
  const [cartCount, setCartCount] = useState(0); // State to track cart items count
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State for logout popup
  const navigate = useNavigate();

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

  // Fetch cart count when the user logs in or the component mounts
  useEffect(() => {
    const fetchCartCount = async () => {
      if (isLoggedIn) {
        const userId = sessionStorage.getItem("userId");
        if (!userId) return;

        try {
          const response = await fetch(
            `${import.meta.env.VITE_BE_URL}/api/cart/${userId}`
          );
          if (!response.ok) throw new Error("Failed to fetch cart details");

          const data = await response.json();
          const totalItems = data.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          setCartCount(totalItems || 0);
        } catch (error) {
          console.error("Error fetching cart count:", error.message);
        }
      } else {
        setCartCount(0); // Reset cart count if the user is not logged in
      }
    };

    fetchCartCount();
  }, [isLoggedIn]); // Run this effect whenever `isLoggedIn` changes

  // Auto-cycle ads every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [ads]);

  const handleSearch = () => {
    onSearch(query.trim());
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClick = (event, redirectPath) => {
    if (!isLoggedIn) {
      event.preventDefault();
      sessionStorage.setItem("redirectAfterLogin", redirectPath);
      setShowLoginPopup(true);
    }
  };

  const handleLogin = () => {
    setShowLoginPopup(false);
    navigate("/Login");
  };

  const handleRegister = () => {
    setShowLoginPopup(false);
    navigate("/Register");
  };

  const handleLogout = () => {
    setShowLogoutPopup(true); // Show logout confirmation popup
  };

  const confirmLogout = () => {
    sessionStorage.removeItem("userLoggedIn"); // Remove login state
    sessionStorage.removeItem("userId"); // Remove user ID
    setIsLoggedIn(false); // Update state
    setCartCount(0); // Reset cart count
    setShowLogoutPopup(false); // Close popup
    navigate("/"); // Redirect to main page
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false); // Close popup
  };

  return (
    <header>
      {/* Ads Section */}
      <div id="black">
        <span
          className="arrow"
          onClick={() =>
            setCurrentAdIndex(
              (prevIndex) => (prevIndex - 1 + ads.length) % ads.length
            )
          }
          style={{ cursor: "pointer" }}
        >
          &lt;
        </span>
        <span id="add" style={{ margin: "0 20px" }}>
          {ads.length > 0
            ? ads[currentAdIndex]?.text.replace(/^Ad \d+:\s*/, "")
            : "No ads available"}
        </span>
        <span
          className="arrow"
          onClick={() =>
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length)
          }
          style={{ cursor: "pointer" }}
        >
          &gt;
        </span>
      </div>

      <div id="gray">
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <div className="separator"></div>
          <Link to="/Bookslist" className="nav-link">
            Order Status
          </Link>
          <div className="separator"></div>
          <Link to="/account" className="nav-link">
            Dashboard
          </Link>
          <div className="separator"></div>
          {isLoggedIn ? (
            <span className="nav-link sign-in-button" onClick={handleLogout}>
              Sign Out
            </span>
          ) : (
            <Link to="/Login" className="nav-link sign-in-button">
              Sign In
            </Link>
          )}
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
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <img
            src={searchIcon}
            alt="Search Icon"
            className="search-icon"
            onClick={handleSearch}
          />
        </div>
        <div className="header-icons">
          <div className="icon-container">
            <a
              href="/LocationFinder/location.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={locationIcon}
                alt="Location Icon"
                className="icon"
                id="location"
              />
              <div className="tooltip">View Location</div>
            </a>
          </div>
          <div className="icon-container">
            <Link to="/WishlistPage" onClick={(e) => handleClick(e, "/WishlistPage")}>
              <img
                id="wishpic"
                src={wishlistIcon}
                alt="Wishlist Icon"
                className="icon"
              />
              <div className="tooltip">View Wishlist</div>
            </Link>
          </div>
          <div className="icon-container">
            <Link to="/account" onClick={(e) => handleClick(e, "/account")}>
              <img src={accountIcon} alt="Account Icon" className="icon" />
              <div className="tooltip">Account</div>
            </Link>
          </div>

          <div className="icon-container">
  <Link to="/Bookslist" onClick={(e) => handleClick(e, "/Bookslist")}>
    <img src={cartIcon} alt="Cart Icon" className="icon" />
    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
    <div className="tooltip">View Cart</div>
  </Link>
</div>

        </div>

        {/* Login Popup */}
        {showLoginPopup && (
          <div className="popup" id="hhshshhsh">
            <div className="popup-content">
              <button
                className="close-button"
                onClick={() => setShowLoginPopup(false)}
              >
                ×
              </button>
              <h2 className="popup-title">Welcome</h2>
              <button
                className="popup-signin-button"
                onClick={handleLogin}
              >
                Sign In
              </button>
              <button
                className="popup-create-account-button"
                onClick={handleRegister}
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* Logout Popup */}
        {showLogoutPopup && (
          <div className="popup">
            <div className="popup-content">
              <button
                className="close-button"
                onClick={() => setShowLogoutPopup(false)}
              >
                X
              </button>
              <h2 className="popup-titl">Confirm Logout</h2>
              <p>Are you sure you want to log out?</p>
              <button
                className="popup-signin-button"
                onClick={confirmLogout}
              >
                Yes
              </button>
              <button
                className="popup-signin-button"
                onClick={cancelLogout}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
