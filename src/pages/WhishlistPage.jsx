import React, { useState, useEffect } from "react";
import Header from "../components/Header"; // Header component
import Navigation from "../components/Navigation"; // Navigation component
import Wishlist from "../components/Wishlist"; // Wishlist component
import Recommendations from "../components/Recommendations"; // Recommendations component
import Footer from "../components/Footer"; // Footer component

const WishlistPage = () => {
  const [firstBook, setFirstBook] = useState(null);

  // Fetch the first book from the wishlist to pass to Recommendations
  useEffect(() => {
    const fetchWishlist = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BE_URL}/api/wishlist/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist.");
        }
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setFirstBook(data.items[0]); // Set the first book
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error.message);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Navigation */}
      <Navigation />

      {/* Wishlist */}
      <Wishlist />

      {/* Recommendations */}
      {firstBook && (
        <Recommendations
          category={firstBook.category || "All"}
          currentBookShortTitle={firstBook.shortTitle || ""}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WishlistPage;
